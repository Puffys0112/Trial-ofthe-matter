'use strict';
const express  = require('express');
const fs       = require('fs');
const path     = require('path');
const crypto   = require('crypto');
const os       = require('os');

const app       = express();
const PORT      = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'groups.json');

app.use(express.json());
app.use(express.static(__dirname));

// ── In-memory session stores ───────────────────────────────────────────────
// { token: { groupId, loginTime } }
const groupTokens = {};
// Set of valid admin tokens
const adminTokens = new Set();

// ── Data helpers ───────────────────────────────────────────────────────────
function load() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}
function save(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ── Auth middleware ────────────────────────────────────────────────────────
function requireGroup(req, res, next) {
  const token = req.headers['x-auth-token'];
  if (!token || !groupTokens[token]) return res.status(401).json({ error: 'Unauthorized' });
  req.groupId = groupTokens[token].groupId;
  next();
}
function requireAdmin(req, res, next) {
  const token = req.headers['x-auth-token'];
  if (!token || !adminTokens.has(token)) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// ── Public endpoints ───────────────────────────────────────────────────────

// List group names (for the login dropdown)
app.get('/api/groups', (req, res) => {
  const data = load();
  res.json(data.groups.map(g => ({ id: g.id, name: g.name })));
});

// Group login
app.post('/api/login', (req, res) => {
  const { groupId, pin } = req.body || {};
  if (!groupId || !pin) return res.status(400).json({ error: 'Group and PIN required.' });

  const data  = load();
  const group = data.groups.find(g => g.id === groupId);
  if (!group || group.pin !== String(pin)) {
    return res.status(401).json({ error: 'Invalid group or PIN. Please try again.' });
  }

  if (group.status === 'completed') {
    return res.json({ status: 'completed', groupName: group.name });
  }

  // Invalidate any old tokens for this group
  Object.keys(groupTokens).forEach(t => {
    if (groupTokens[t].groupId === groupId) delete groupTokens[t];
  });

  const token = crypto.randomBytes(20).toString('hex');
  groupTokens[token] = { groupId: group.id, loginTime: Date.now() };

  res.json({ token, groupName: group.name, status: group.status });
});

// Mark game as started (called when the group clicks "Begin Audit Simulation")
app.post('/api/game/start', requireGroup, (req, res) => {
  const data  = load();
  const group = data.groups.find(g => g.id === req.groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });
  if (group.status === 'completed') return res.status(403).json({ error: 'Already completed.' });

  group.status    = 'playing';
  group.startedAt = new Date().toISOString();
  save(data);
  res.json({ ok: true });
});

// Submit final score
app.post('/api/game/submit', requireGroup, (req, res) => {
  const { puzzlesDone, secondsRemaining, wrongAnswers, won } = req.body || {};
  const data  = load();
  const group = data.groups.find(g => g.id === req.groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });
  if (group.status === 'completed') return res.json({ score: group.score }); // idempotent

  const score = Math.max(0,
    (Number(puzzlesDone)      * 200) +
    (won ? Number(secondsRemaining) * 2 : 0) -
    (Number(wrongAnswers)     * 10)
  );

  group.status           = 'completed';
  group.score            = score;
  group.puzzlesDone      = Number(puzzlesDone);
  group.wrongAnswers     = Number(wrongAnswers);
  group.won              = !!won;
  group.secondsRemaining = Number(secondsRemaining);
  group.completedAt      = new Date().toISOString();
  save(data);

  res.json({ score });
});

// Public leaderboard (score + summary only)
app.get('/api/leaderboard', (req, res) => {
  const data = load();
  const board = data.groups
    .filter(g => g.status === 'completed')
    .map(g => ({
      name:             g.name,
      score:            g.score,
      puzzlesDone:      g.puzzlesDone,
      won:              g.won,
      wrongAnswers:     g.wrongAnswers,
      secondsRemaining: g.secondsRemaining,
      completedAt:      g.completedAt,
    }))
    .sort((a, b) => b.score - a.score);
  res.json(board);
});

// Group count summary (for admin dashboard cards)
app.get('/api/summary', (req, res) => {
  const data = load();
  res.json({
    total:     data.groups.length,
    pending:   data.groups.filter(g => g.status === 'pending').length,
    playing:   data.groups.filter(g => g.status === 'playing').length,
    completed: data.groups.filter(g => g.status === 'completed').length,
  });
});

// ── Admin endpoints ────────────────────────────────────────────────────────

// Admin login
app.post('/api/admin/login', (req, res) => {
  const data = load();
  if (!req.body || req.body.password !== data.adminPassword) {
    return res.status(401).json({ error: 'Incorrect admin password.' });
  }
  const token = crypto.randomBytes(20).toString('hex');
  adminTokens.add(token);
  res.json({ token });
});

// Admin: full group data (PINs included)
app.get('/api/admin/groups', requireAdmin, (req, res) => {
  const data = load();
  res.json(data.groups);
});

// Admin: reset a group back to pending
app.post('/api/admin/reset', requireAdmin, (req, res) => {
  const { groupId } = req.body || {};
  const data  = load();
  const group = data.groups.find(g => g.id === groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });

  group.status           = 'pending';
  group.score            = null;
  group.puzzlesDone      = 0;
  group.wrongAnswers     = 0;
  group.won              = false;
  group.secondsRemaining = 0;
  group.completedAt      = null;
  group.startedAt        = null;

  // Invalidate any active tokens for this group
  Object.keys(groupTokens).forEach(t => {
    if (groupTokens[t].groupId === groupId) delete groupTokens[t];
  });

  save(data);
  res.json({ ok: true });
});

// Admin: add a new group
app.post('/api/admin/groups', requireAdmin, (req, res) => {
  const { name, pin } = req.body || {};
  if (!name || !pin) return res.status(400).json({ error: 'Name and PIN required.' });

  const data = load();
  const id   = 'g_' + Date.now();
  data.groups.push({
    id, name, pin: String(pin),
    status: 'pending', score: null, puzzlesDone: 0,
    wrongAnswers: 0, won: false, secondsRemaining: 0,
    completedAt: null, startedAt: null,
  });
  save(data);
  res.json({ id });
});

// ── Server info endpoint (for admin page to display share URL) ─────────────
app.get('/api/server-info', (req, res) => {
  res.json({ host: req.headers.host });
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

app.listen(PORT, '0.0.0.0', () => {
  const ip = getLanIP();
  console.log('\n🏭  MediSeal Quality Week — Game Server');
  console.log('─'.repeat(42));
  console.log(`  Local:    http://localhost:${PORT}`);
  console.log(`  Network:  http://${ip}:${PORT}`);
  console.log(`  Admin:    http://${ip}:${PORT}/admin.html`);
  console.log('─'.repeat(42));
  console.log('  Share the Network URL with participants.');
  console.log('  Admin password: see data/groups.json\n');
});
