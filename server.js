'use strict';
const express  = require('express');
const http     = require('http');
const { Server: SocketIO } = require('socket.io');
const fs       = require('fs');
const path     = require('path');
const crypto   = require('crypto');
const os       = require('os');

const app        = express();
const httpServer = http.createServer(app);
const io         = new SocketIO(httpServer);

const PORT      = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'groups.json');

// Timer constants
const REG_SECS   = 25 * 60;   // 1500 — regulation time
const MAX_SECS   = 60 * 60;   // 3600 — hard stop (60 min total)
const OT_THRESH  = MAX_SECS - REG_SECS;  // 2100 — timerSec below this = overtime

app.use(express.json());
app.use(express.static(__dirname));

// ── Token store ────────────────────────────────────────────────────────────
const groupTokens = new Map();  // token → { groupId, loginTime }
const adminTokens = new Set();

// ── Per-group live game session ────────────────────────────────────────────
const groupSessions = new Map();

// ── Per-group chat history ─────────────────────────────────────────────────
const groupChats = new Map();

// ── Collaborative code confirmations ──────────────────────────────────────
const pendingConfirms = new Map();

// ── Per-group lobby ready state ────────────────────────────────────────────
const groupReadyState = new Map();

// ── Data helpers ───────────────────────────────────────────────────────────
function load() { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
function save(d) { fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2)); }

// ── Auth middleware ────────────────────────────────────────────────────────
function requireGroup(req, res, next) {
  const token = req.headers['x-auth-token'];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  const sess = groupTokens.get(token);
  if (!sess) return res.status(401).json({ error: 'Unauthorized' });
  if (Date.now() - sess.loginTime > 4 * 60 * 60 * 1000) {
    groupTokens.delete(token);
    return res.status(401).json({ error: 'Session expired. Please login again.' });
  }
  req.groupId = sess.groupId;
  next();
}

function requireAdmin(req, res, next) {
  const token = req.headers['x-auth-token'];
  if (!token || !adminTokens.has(token)) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// ── Timer helpers ──────────────────────────────────────────────────────────
function calcSecsRemaining(groupId) {
  const sess = groupSessions.get(groupId);
  if (!sess || !sess.startedAt) return MAX_SECS;
  return Math.max(0, MAX_SECS - Math.floor((Date.now() - sess.startedAt) / 1000));
}

// ── Score calculation ──────────────────────────────────────────────────────
// timerSec: remaining seconds out of MAX_SECS (3600)
// OT_THRESH = 2100: when timerSec < OT_THRESH, we are in overtime
function calcScore({ puzzlesDone, wrongAnswers, hintPenalty, timerSec, won, resumed }) {
  const isOvertime      = timerSec < OT_THRESH;
  const ptPerPuzzle     = resumed ? 100 : (isOvertime ? 180 : 200);
  const regSecsLeft     = isOvertime ? 0 : (timerSec - OT_THRESH);
  const timeBonus       = (won && !isOvertime) ? regSecsLeft * 2 : 0;
  const overtimeSecs    = isOvertime ? (OT_THRESH - timerSec) : 0;
  const overtimeMins    = Math.ceil(overtimeSecs / 60);
  const overtimePenalty = overtimeMins * 30;

  return Math.max(0,
    (puzzlesDone  * ptPerPuzzle) +
    timeBonus -
    (wrongAnswers * 10) -
    (hintPenalty  || 0) -
    overtimePenalty
  );
}

// ── Online members helper ──────────────────────────────────────────────────
function getOnlineMembers(groupId) {
  const room = io.sockets.adapter.rooms.get(groupId);
  if (!room) return [];
  const names = [];
  for (const sid of room) {
    const s = io.sockets.sockets.get(sid);
    if (s && s.memberName) names.push(s.memberName);
  }
  return names;
}

// ── HTTP Routes ────────────────────────────────────────────────────────────

// List all groups (for login dropdown)
app.get('/api/groups', (req, res) => {
  const data = load();
  res.json(data.groups.map(g => ({ id: g.id, name: g.name })));
});

// Group member login
app.post('/api/login', (req, res) => {
  const { groupId, pin } = req.body || {};
  if (!groupId || !pin) return res.status(400).json({ error: 'Group and PIN required.' });

  const data  = load();
  const group = data.groups.find(g => g.id === groupId);
  if (!group || group.pin !== String(pin)) {
    return res.status(401).json({ error: 'Invalid group or PIN.' });
  }
  if (group.status === 'completed') {
    return res.json({ status: 'completed', groupName: group.name });
  }

  const token = crypto.randomBytes(22).toString('hex');
  groupTokens.set(token, { groupId, loginTime: Date.now() });

  res.json({ token, groupName: group.name, status: group.status });
});

// Mark game as started
app.post('/api/game/start', requireGroup, (req, res) => {
  const data  = load();
  const group = data.groups.find(g => g.id === req.groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });
  if (group.status === 'completed') return res.status(403).json({ error: 'Already completed.' });

  const isFirstStart = group.status !== 'playing';
  if (isFirstStart) {
    group.status    = 'playing';
    group.startedAt = new Date().toISOString();
    save(data);
  }

  if (!groupSessions.has(req.groupId)) {
    groupSessions.set(req.groupId, {
      solved: {}, inventory: [], notes: [],
      puzzlesDone: 0, wrongAnswers: 0, hintPenalty: 0,
      startedAt: Date.now(),
      resumed: !!group.resumed,
    });
  }

  res.json({ ok: true, timerSec: calcSecsRemaining(req.groupId) });
});

// Submit final score
app.post('/api/game/submit', requireGroup, (req, res) => {
  const { won } = req.body || {};
  const data  = load();
  const group = data.groups.find(g => g.id === req.groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });
  if (group.status === 'completed') return res.json({ score: group.score, alreadyDone: true });

  const sess         = groupSessions.get(req.groupId) || {};
  const puzzlesDone  = sess.puzzlesDone  || 0;
  const wrongAnswers = sess.wrongAnswers || 0;
  const hintPenalty  = sess.hintPenalty  || 0;
  const secsLeft     = calcSecsRemaining(req.groupId);
  const resumed      = !!sess.resumed;

  const score = calcScore({ puzzlesDone, wrongAnswers, hintPenalty, timerSec: secsLeft, won: !!won, resumed });

  // Compute time spent
  const startedAtMs  = sess.startedAt || Date.now();
  const completedAt  = new Date().toISOString();
  const timeSpentSec = Math.round((Date.now() - startedAtMs) / 1000);

  group.status           = 'completed';
  group.score            = score;
  group.puzzlesDone      = puzzlesDone;
  group.wrongAnswers     = wrongAnswers;
  group.hintPenalty      = hintPenalty;
  group.won              = !!won;
  group.secondsRemaining = secsLeft;
  group.timeSpentSec     = timeSpentSec;
  group.completedAt      = completedAt;

  // Append to trial history
  if (!Array.isArray(group.trials)) group.trials = [];
  group.trials.push({
    trialNumber:    group.trials.length + 1,
    score,
    puzzlesDone,
    wrongAnswers,
    hintPenalty,
    won:            !!won,
    secondsRemaining: secsLeft,
    timeSpentSec,
    completedAt,
    resumed,
  });

  save(data);

  io.to(req.groupId).emit('game_over', { won: !!won, score, puzzlesDone, wrongAnswers, secondsRemaining: secsLeft });

  res.json({ score, puzzlesDone, wrongAnswers, secondsRemaining: secsLeft, timeSpentSec });
});

// Admin-only leaderboard — returns every trial as a separate row
app.get('/api/leaderboard', requireAdmin, (req, res) => {
  const data = load();
  const rows = [];

  data.groups.forEach(g => {
    const trialList = Array.isArray(g.trials) ? g.trials : [];
    if (trialList.length > 0) {
      trialList.forEach(t => {
        rows.push({
          name:             g.name,
          trialNumber:      t.trialNumber,
          score:            t.score,
          puzzlesDone:      t.puzzlesDone,
          won:              t.won,
          wrongAnswers:     t.wrongAnswers,
          hintPenalty:      t.hintPenalty || 0,
          secondsRemaining: t.secondsRemaining,
          timeSpentSec:     t.timeSpentSec,
          completedAt:      t.completedAt,
          resumed:          t.resumed,
        });
      });
    } else if (g.status === 'completed') {
      // Legacy entry without trials array
      rows.push({
        name:             g.name,
        trialNumber:      1,
        score:            g.score,
        puzzlesDone:      g.puzzlesDone,
        won:              g.won,
        wrongAnswers:     g.wrongAnswers,
        hintPenalty:      g.hintPenalty || 0,
        secondsRemaining: g.secondsRemaining,
        timeSpentSec:     g.timeSpentSec,
        completedAt:      g.completedAt,
        resumed:          false,
      });
    }
  });

  // Sort: score DESC, then completedAt ASC (earlier finish wins ties)
  rows.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(a.completedAt) - new Date(b.completedAt);
  });

  res.json(rows);
});

// Summary for admin cards
app.get('/api/summary', (req, res) => {
  const data = load();
  res.json({
    total:     data.groups.length,
    pending:   data.groups.filter(g => g.status === 'pending').length,
    playing:   data.groups.filter(g => g.status === 'playing').length,
    completed: data.groups.filter(g => g.status === 'completed').length,
  });
});

// Admin login
app.post('/api/admin/login', (req, res) => {
  const data = load();
  if (!req.body || req.body.password !== data.adminPassword) {
    return res.status(401).json({ error: 'Incorrect admin password.' });
  }
  const token = crypto.randomBytes(22).toString('hex');
  adminTokens.add(token);
  res.json({ token });
});

// Admin: full group data
app.get('/api/admin/groups', requireAdmin, (req, res) => {
  const data = load();
  const groups = data.groups.map(g => {
    const sess = groupSessions.get(g.id);
    return {
      ...g,
      liveMembers: getOnlineMembers(g.id).length,
      livePuzzles: sess ? sess.puzzlesDone : (g.puzzlesDone || 0),
      liveWrong:   sess ? sess.wrongAnswers : (g.wrongAnswers || 0),
    };
  });
  res.json(groups);
});

// Admin: reset a group — preserves trial history
app.post('/api/admin/reset', requireAdmin, (req, res) => {
  const { groupId } = req.body || {};
  const data  = load();
  const group = data.groups.find(g => g.id === groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });

  // Preserve trial history
  const trials = Array.isArray(group.trials) ? group.trials : [];

  group.status           = 'pending';
  group.score            = null;
  group.puzzlesDone      = 0;
  group.wrongAnswers     = 0;
  group.hintPenalty      = 0;
  group.won              = false;
  group.secondsRemaining = 0;
  group.timeSpentSec     = 0;
  group.completedAt      = null;
  group.startedAt        = null;
  group.resumed          = false;
  group.trials           = trials;  // keep history

  groupSessions.delete(groupId);
  groupChats.delete(groupId);
  pendingConfirms.delete(groupId);
  groupReadyState.delete(groupId);

  for (const [tok, sess] of groupTokens) {
    if (sess.groupId === groupId) groupTokens.delete(tok);
  }

  io.to(groupId).emit('kicked', { reason: 'Group has been reset by admin.' });

  save(data);
  res.json({ ok: true });
});

// Admin: resume a group from where they left off (reduced scoring: 100 pts/puzzle)
app.post('/api/admin/resume', requireAdmin, (req, res) => {
  const { groupId } = req.body || {};
  const data  = load();
  const group = data.groups.find(g => g.id === groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });
  if (group.status !== 'completed' && group.status !== 'playing') {
    return res.status(400).json({ error: 'Group must be completed or mid-game to resume.' });
  }

  // Restore to playing with resumed flag
  group.status  = 'playing';
  group.resumed = true;
  if (!group.startedAt) group.startedAt = new Date().toISOString();

  // Restore server session from saved state (or create fresh with progress)
  if (!groupSessions.has(groupId)) {
    groupSessions.set(groupId, {
      solved:       group.solved || {},
      inventory:    group.inventory || [],
      notes:        group.notes || [],
      puzzlesDone:  group.puzzlesDone || 0,
      wrongAnswers: 0,  // reset wrong answers for resumed game
      hintPenalty:  0,
      startedAt:    Date.now() - (REG_SECS * 1000),  // start in overtime already
      resumed:      true,
    });
  } else {
    const sess = groupSessions.get(groupId);
    sess.resumed     = true;
    sess.wrongAnswers = 0;
    sess.hintPenalty = 0;
  }

  save(data);
  res.json({ ok: true, message: 'Group resumed. Scoring reduced to 100 pts/puzzle.' });
});

// Admin: add group
app.post('/api/admin/groups', requireAdmin, (req, res) => {
  const { name, pin } = req.body || {};
  if (!name || !pin) return res.status(400).json({ error: 'Name and PIN required.' });
  const data = load();
  const id   = 'g_' + Date.now();
  data.groups.push({
    id, name, pin: String(pin),
    status: 'pending', score: null, puzzlesDone: 0,
    wrongAnswers: 0, hintPenalty: 0, won: false,
    secondsRemaining: 0, timeSpentSec: 0,
    completedAt: null, startedAt: null,
    resumed: false, trials: [],
  });
  save(data);
  res.json({ id });
});

// ── Socket.io auth middleware ──────────────────────────────────────────────
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Unauthorized'));

  const sess = groupTokens.get(token);
  if (!sess) return next(new Error('Unauthorized'));
  if (Date.now() - sess.loginTime > 4 * 60 * 60 * 1000) {
    groupTokens.delete(token);
    return next(new Error('Session expired'));
  }

  socket.groupId    = sess.groupId;
  socket.memberName = String(socket.handshake.auth.memberName || 'Member').slice(0, 24);
  next();
});

// ── Socket.io connection handler ───────────────────────────────────────────
io.on('connection', (socket) => {
  const { groupId, memberName } = socket;

  socket.join(groupId);

  const sess = groupSessions.get(groupId);
  socket.emit('state_init', {
    state: sess ? {
      solved:       sess.solved,
      inventory:    sess.inventory,
      notes:        sess.notes,
      puzzlesDone:  sess.puzzlesDone,
      wrongAnswers: sess.wrongAnswers,
      timerSec:     calcSecsRemaining(groupId),
      resumed:      !!sess.resumed,
    } : null,
    chats:   groupChats.get(groupId) || [],
    members: getOnlineMembers(groupId),
  });

  socket.to(groupId).emit('member_join', {
    memberName,
    members: getOnlineMembers(groupId),
  });

  // ── Puzzle solved ─────────────────────────────────────────────────────────
  socket.on('puzzle_solved', ({ key, puzzlesDone }) => {
    const gs = groupSessions.get(groupId);
    if (!gs || gs.solved[key]) return;
    gs.solved[key] = true;
    gs.puzzlesDone = Math.max(gs.puzzlesDone, Number(puzzlesDone) || 0);
    socket.to(groupId).emit('puzzle_solved', {
      key, puzzlesDone: gs.puzzlesDone, fromName: memberName,
    });
  });

  // ── Item found ────────────────────────────────────────────────────────────
  socket.on('item_found', ({ itemId }) => {
    const gs = groupSessions.get(groupId);
    if (!gs || gs.inventory.includes(itemId)) return;
    gs.inventory.push(itemId);
    socket.to(groupId).emit('item_found', { itemId, fromName: memberName });
  });

  // ── Note added ────────────────────────────────────────────────────────────
  socket.on('note_added', ({ html, important }) => {
    const gs = groupSessions.get(groupId);
    if (!gs) return;
    const note = { html: String(html || ''), important: !!important };
    gs.notes.push(note);
    socket.to(groupId).emit('note_added', { ...note, fromName: memberName });
  });

  // ── Wrong answer ──────────────────────────────────────────────────────────
  socket.on('wrong_answer', () => {
    const gs = groupSessions.get(groupId);
    if (gs) gs.wrongAnswers++;
  });

  // ── Hint used ─────────────────────────────────────────────────────────────
  socket.on('hint_used', ({ room, timeCost, ptsCost }) => {
    const gs = groupSessions.get(groupId);
    if (!gs) return;
    gs.hintPenalty = (gs.hintPenalty || 0) + (ptsCost || 50);
    // Notify other group members
    socket.to(groupId).emit('hint_broadcast', { room, timeCost, ptsCost, fromName: memberName });
  });

  // ── Lobby: player ready ───────────────────────────────────────────────────
  socket.on('player_ready', () => {
    if (groupSessions.has(groupId)) return;

    if (!groupReadyState.has(groupId)) groupReadyState.set(groupId, new Map());
    const rs = groupReadyState.get(groupId);
    rs.set(socket.id, memberName);

    const room   = io.sockets.adapter.rooms.get(groupId);
    const online = room ? room.size : 1;
    const readyNames = [...rs.values()];
    const readyCount = readyNames.length;

    if (online < 3) {
      socket.emit('lobby_error', { message: `Need at least 3 members online to start. Currently ${online} connected.` });
      rs.delete(socket.id);
      return;
    }
    if (online > 5) {
      socket.emit('lobby_error', { message: `Maximum group size is 5. Currently ${online} connected.` });
      rs.delete(socket.id);
      return;
    }

    io.to(groupId).emit('ready_update', { readyCount, total: online, readyNames });

    if (readyCount >= online) {
      const data  = load();
      const group = data.groups.find(g => g.id === groupId);
      if (!group || group.status === 'completed') return;

      if (group.status !== 'playing') {
        group.status    = 'playing';
        group.startedAt = new Date().toISOString();
        save(data);
      }

      if (!groupSessions.has(groupId)) {
        groupSessions.set(groupId, {
          solved: {}, inventory: [], notes: [],
          puzzlesDone: 0, wrongAnswers: 0, hintPenalty: 0,
          startedAt: Date.now(),
          groupSize: online,
          resumed: false,
        });
      }

      groupReadyState.delete(groupId);
      io.to(groupId).emit('game_start', { timerSec: MAX_SECS });
    }
  });

  // ── Collaborative: code found ─────────────────────────────────────────────
  socket.on('code_found', ({ puzzleKey, code, label }) => {
    const gs = groupSessions.get(groupId);
    if (!gs || gs.solved[puzzleKey]) return;

    if (!pendingConfirms.has(groupId)) pendingConfirms.set(groupId, new Map());
    const gConfirms = pendingConfirms.get(groupId);
    if (gConfirms.has(puzzleKey)) return;

    const room     = io.sockets.adapter.rooms.get(groupId);
    const required = room ? room.size : 1;
    const confirmed = new Set([socket.id]);
    gConfirms.set(puzzleKey, { code, fromName: memberName, confirmed, required });

    if (required <= 1) {
      gs.solved[puzzleKey] = true;
      gs.puzzlesDone++;
      gConfirms.delete(puzzleKey);
      io.to(groupId).emit('puzzle_complete', { puzzleKey, puzzlesDone: gs.puzzlesDone, code });
      return;
    }

    io.to(groupId).emit('code_revealed', {
      puzzleKey, code, fromName: memberName, label, required, confirmed: 1,
    });
  });

  // ── Collaborative: code confirmed ─────────────────────────────────────────
  socket.on('confirm_code', ({ puzzleKey, code }) => {
    const gs = groupSessions.get(groupId);
    if (!gs || gs.solved[puzzleKey]) return;

    const gConfirms = pendingConfirms.get(groupId);
    if (!gConfirms) return;
    const pend = gConfirms.get(puzzleKey);
    if (!pend) return;

    const normalise = s => String(s || '').trim().toUpperCase().replace(/[-\s]/g, '');
    if (normalise(code) !== normalise(pend.code)) return;
    if (pend.confirmed.has(socket.id)) return;

    pend.confirmed.add(socket.id);
    const count = pend.confirmed.size;

    io.to(groupId).emit('confirm_progress', {
      puzzleKey, count, required: pend.required, fromName: memberName,
    });

    const room   = io.sockets.adapter.rooms.get(groupId);
    const online = room ? room.size : 1;

    if (count >= online || count >= pend.required) {
      gs.solved[puzzleKey] = true;
      gs.puzzlesDone++;
      gConfirms.delete(puzzleKey);
      io.to(groupId).emit('puzzle_complete', { puzzleKey, puzzlesDone: gs.puzzlesDone, code: pend.code });
    }
  });

  // ── Group chat ────────────────────────────────────────────────────────────
  socket.on('chat', ({ text }) => {
    const txt = String(text || '').trim().slice(0, 200);
    if (!txt) return;
    const msg = { from: memberName, text: txt, ts: Date.now() };

    if (!groupChats.has(groupId)) groupChats.set(groupId, []);
    const chats = groupChats.get(groupId);
    chats.push(msg);
    if (chats.length > 60) chats.shift();

    io.to(groupId).emit('chat', msg);
  });

  // ── Hard stop: force game end after 60 min ────────────────────────────────
  socket.on('overtime_hardstop', () => {
    const gs = groupSessions.get(groupId);
    if (!gs || gs.solved.game_won) return;
    // Force lose (time expired)
    const secsLeft = 0;
    const score    = calcScore({
      puzzlesDone:  gs.puzzlesDone,
      wrongAnswers: gs.wrongAnswers,
      hintPenalty:  gs.hintPenalty || 0,
      timerSec:     secsLeft,
      won:          false,
      resumed:      !!gs.resumed,
    });
    io.to(groupId).emit('game_over', {
      won: false, score, puzzlesDone: gs.puzzlesDone,
      wrongAnswers: gs.wrongAnswers, secondsRemaining: 0,
    });
  });

  // ── Disconnect ────────────────────────────────────────────────────────────
  socket.on('disconnect', () => {
    const rs = groupReadyState.get(groupId);
    if (rs) {
      rs.delete(socket.id);
      if (rs.size === 0) groupReadyState.delete(groupId);
      else {
        const room   = io.sockets.adapter.rooms.get(groupId);
        const online = room ? room.size : 0;
        io.to(groupId).emit('ready_update', {
          readyCount: rs.size, total: Math.max(online - 1, rs.size),
          readyNames: [...rs.values()],
        });
      }
    }
    setTimeout(() => {
      const remaining = getOnlineMembers(groupId);
      socket.to(groupId).emit('member_leave', { memberName, members: remaining });
    }, 500);
  });
});

// ── Start ──────────────────────────────────────────────────────────────────
function getLanIP() {
  const nets = os.networkInterfaces();
  for (const list of Object.values(nets)) {
    for (const iface of list) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return 'localhost';
}

httpServer.listen(PORT, '0.0.0.0', () => {
  const ip = getLanIP();
  console.log('\n🏭  MediSeal Quality Week — Game Server v3');
  console.log('─'.repeat(46));
  console.log(`  Local:    http://localhost:${PORT}`);
  console.log(`  Network:  http://${ip}:${PORT}   ← share with groups`);
  console.log(`  Admin:    http://${ip}:${PORT}/admin.html`);
  console.log('─'.repeat(46));
  console.log(`  Regulation: 25 min | Hard stop: 60 min | Overtime: −30 pts/min`);
  console.log(`  Admin password: see data/groups.json\n`);
});
