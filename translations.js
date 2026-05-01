/* translations.js — Quality Week Escape Room
   Supported languages: en, de, es, pt-BR
   Add more by copying the 'en' block and translating each value.
*/
const TRANSLATIONS = {

  /* ─── ENGLISH ──────────────────────────────────────────── */
  en: {
    /* Login */
    'login.lang':           'Language',
    'login.select_group':   'Select Your Group',
    'login.group_pin':      'Group PIN',
    'login.your_name':      'Your Name',
    'login.enter_pin':      'Enter your group PIN',
    'login.enter_name':     'e.g. Alice',
    'login.btn':            'LOGIN & ENTER FACILITY',
    'login.demo':           '▶ Demo / Admin Mode',
    'login.leaderboard':    '📊 Leaderboard',
    'login.admin_pw_label': 'Admin Password (required for Demo)',
    'login.admin_pw_ph':    'Enter admin password',
    'login.demo_btn':       'Enter Demo Mode',

    /* Start screen */
    'start.title':          'QUALITY WEEK',
    'start.sub':            'ESCAPE ROOM — INTERNAL AUDIT SIMULATION',
    'start.briefing_h':     'Situation Briefing',
    'start.briefing':       'A <strong>critical non-conformance alarm</strong> has triggered a facility lockdown at MediSeal\'s plunger production plant. The batch <strong>BN-2024-3200</strong> — rubber plungers destined for insulin vials and diabetic injection devices — is on hold pending investigation.<br><br>As the on-call <strong>Quality Inspector</strong>, you must work through every station: verify incoming materials, complete an AQL inspection, calibrate instruments, raise a CAPA, and authorise the final batch disposition — all before the <strong>external FDA auditor arrives in 25 minutes</strong>.',
    'start.topics_h':       'Quality Topics Covered',
    'start.how_h':          'How to Play',
    'start.rules_h':        'Rules',
    'start.scoring_h':      'Scoring',
    'start.ready_btn':      "I'M READY — BEGIN",
    'start.waiting':        '⏳ Waiting for teammates to confirm…',
    'start.lobby_h':        '👥 TEAM LOBBY',
    'start.lobby_hint':     'Groups of <strong>3–5 members</strong> must all be connected before starting.<br>All members click <strong>I\'m Ready</strong> to begin simultaneously.',

    /* Room names */
    'room.receiving':   'Receiving Dock',
    'room.production':  'Production Line',
    'room.qclab':       'Quality Control Laboratory',
    'room.qaoffice':    'QA & Compliance Office',
    'room.dispatch':    'Dispatch & Release Bay',

    /* Hotspot labels */
    'hs.inspect_pallet':     'Inspect Pallet (Rubber Compound)',
    'hs.check_clipboard':    'Check Clipboard',
    'hs.gmp_terminal':       'GMP Receiving Terminal',
    'hs.read_noticeboard':   'Quality Week Noticeboard',
    'hs.read_aql_chart':     'AQL Sampling Chart (Wall)',
    'hs.use_lightbox':       'Visual Inspection Light Box',
    'hs.examine_mould':      'Examine Station 3 Mould',
    'hs.check_station3_log': 'Station 3 Instrument Log',
    'hs.file_ncr':           'NCR Filing Station',
    'hs.read_quality_poster':'Quality Improvement Poster',
    'hs.open_cal_cabinet':   'Calibration Reference Cabinet',
    'hs.use_micrometer':     'Micrometer Station',
    'hs.check_sop_rack':     'SOP Document Rack',
    'hs.check_equip_log':    'Equipment Logbook',
    'hs.check_iso15378':     'ISO 15378 Packaging Compliance File',
    'hs.read_maint_log':     'Maintenance Log (Side Table)',
    'hs.use_capa_station':   'CAPA Workstation',
    'hs.check_iso_files':    'ISO 13485 Filing Cabinet',
    'hs.check_iso9001':      'ISO 9001 Management Review',
    'hs.open_batch_safe':    'Batch Record Safe',
    'hs.read_quality_pledge':'Quality Pledge (Wall Frame)',
    'hs.use_release_terminal':'Batch Release Terminal',
    'hs.inspect_quarantine': 'Quarantine Cage',
    'hs.read_qw_banner':     'Quality Week Banner',

    /* Navigation */
    'nav.you_are_in':   'You are in:',
    'nav.exits':        'Exits',
    'nav.hint_btn':     '💡 Use Hint (−60s / −50 pts)',
    'nav.hint_used':    '(hint used)',
    'nav.lock.production': 'Raw material verification required first (GMP Receiving Terminal).',
    'nav.lock.qclab':      'File the NCR at the NCR Filing Station on the production line first.',
    'nav.lock.qaoffice':   'Complete instrument calibration in the QC Lab first (Micrometer Station).',
    'nav.lock.dispatch':   'Complete and authorise the CAPA report in the QA Office first.',

    /* Alarm overlay */
    'alarm.title':      '⚠ STOP — GO BACK!',
    'alarm.sub.pin':    'PIN is correct — but you have unfinished checks!',
    'alarm.sub.depart': 'You have not finished this room! Complete all puzzles before moving on.',
    'alarm.go_to':      'Go to:',
    'alarm.press':      '→ Press button:',
    'alarm.ok':         '✓ UNDERSTOOD — I WILL GO BACK NOW',

    /* Progress bar */
    'progress': 'Quality checks: {done} / {total} complete',

    /* Hints */
    'hint.receiving':  'The AQL chart and the CoA you receive both describe the same material — compare their numbers before making a decision.',
    'hint.production': 'The maintenance log records what was scheduled and what actually happened. A single line difference tells the whole story.',
    'hint.qclab':      'The micrometer reads a current value. The calibration reference gives a target. The gap between them is what matters.',
    'hint.qaoffice':   'The NCR and the CAPA are linked documents — one names the problem, the other names the solution. Trace the chain.',
    'hint.dispatch':   'The Quality Week motto appears on every wall for a reason. Think about which ISO 9001:2015 principle drives improvement at every step.',

    /* Puzzle question prompts (shown below English body for non-EN) */
    'q.gmp':           'Enter the material lot number from the CoA to release the material from HOLD:',
    'q.gmp.ph':        'e.g. RM-XXXX',
    'q.inspection':    'How many defective plungers did you find in the inspection tray?',
    'q.aql':           'Based on the AQL chart, what is your batch disposition? Type ACCEPT or REJECT:',
    'q.ncr':           'Enter the batch number to raise this NCR:',
    'q.ncr.ph':        'e.g. BN-XXXX-XXXX',
    'q.calibration':   'Calculate and enter the correction factor (include the sign + or −):',
    'q.calibration.ph':'e.g. −0.03',
    'q.capa_root':     'Select the ROOT CAUSE of the dimensional non-conformances in batch BN-2024-3200:',
    'q.capa_prev':     'Select the MOST EFFECTIVE preventive action to stop this error from recurring:',
    'q.iso15378_1':    'Under GMP and ISO 15378, what is the mandatory FIRST ACTION for nonconforming incoming packaging materials?',
    'q.iso15378_2':    'Under Good Documentation Practice (GDP), is Leon\'s correction method (correction fluid) acceptable?',
    'q.iso9001_1':     'Which process failure BEST explains why the lubricant incident went undetected for 3 months?',
    'q.iso9001_2':     'Which combination of inputs BEST belongs on the Management Review agenda?',
    'q.motto_prod':    'Beyond simply rejecting the batch, what does this motto suggest we should do?',
    'q.motto_qa':      'Under GMP\'s principle of "quality ownership," who was responsible for raising a deviation when the lubricant was changed?',
    'q.motto_dis':     'Which ISO 9001:2015 Quality Management Principle does this motto BEST reflect?',
    'q.pin':           'Enter the 4-digit QA authorisation PIN from the Batch Release Certificate:',
    'q.pin.ph':        '4-digit PIN',

    /* Multiple-choice options */
    'ch.capa_root.a': 'A)  Operator fatigue during the night shift',
    'ch.capa_root.b': 'B)  Wrong lubricant grade used on mould tooling (Grade B-7 instead of Grade A-3)',
    'ch.capa_root.c': 'C)  Incoming rubber compound out of specification',
    'ch.capa_root.d': 'D)  Autoclave temperature excursion during sterilisation',

    'ch.capa_prev.a': 'A)  Order Grade B-7 lubricant as an official approved alternative to reduce risk of error',
    'ch.capa_prev.b': 'B)  Update SOP-MAINT-009 with lubricant grade verification step AND retrain all maintenance staff on the SOP',
    'ch.capa_prev.c': 'C)  Increase the AQL sample size for future batches to catch any future lubricant-related defects earlier',
    'ch.capa_prev.d': 'D)  Attach a warning label to the lubricant storage cupboard and rely on operator awareness',

    'ch.iso15378_1.a': 'A)  Use them for non-patient-contact production to avoid waste',
    'ch.iso15378_1.b': 'B)  Physically segregate, apply a REJECT/HOLD label, and raise a supplier NCR before any disposition decision',
    'ch.iso15378_1.c': 'C)  Return them to the supplier immediately without raising any internal documentation',
    'ch.iso15378_1.d': 'D)  Blend them with conforming stock from another supplier lot to dilute the defect rate',

    'ch.iso15378_2.a': 'A)  Yes — as long as the correct information is visible, the method does not matter',
    'ch.iso15378_2.b': 'B)  No — GDP requires a single line through the error leaving it legible, then the correct value, with date and initials',
    'ch.iso15378_2.c': 'C)  Yes — correction fluid is standard practice in most pharmaceutical facilities',
    'ch.iso15378_2.d': 'D)  No — the entire form must be destroyed and restarted to maintain data integrity',

    'ch.iso9001_1.a': 'A)  The monthly audit schedule was too infrequent to catch daily errors',
    'ch.iso9001_1.b': 'B)  There was no risk assessment on the lubricant change-over procedure — the risk was never identified',
    'ch.iso9001_1.c': 'C)  The maintenance log was not stored in the correct folder',
    'ch.iso9001_1.d': 'D)  The AQL sampling plan did not include visual inspection',

    'ch.iso9001_2.a': 'A)  Customer delivery schedules and production throughput targets only',
    'ch.iso9001_2.b': 'B)  NCR trends, CAPA status, audit results, and process performance data',
    'ch.iso9001_2.c': 'C)  Equipment purchase requests and IT infrastructure upgrades',
    'ch.iso9001_2.d': 'D)  Individual employee performance reviews and salary discussions',

    'ch.motto_prod.a': 'A)  Reject, quarantine, and move on — the rejection itself is the corrective action',
    'ch.motto_prod.b': 'B)  Reject, raise an NCR, investigate root cause, and raise a CAPA to prevent recurrence',
    'ch.motto_prod.c': 'C)  Reject and increase the sample size for future batches only',
    'ch.motto_prod.d': 'D)  Accept the batch under concession to maintain production schedule',

    'ch.motto_qa.a': 'A)  Only the QA department — they own all deviation records',
    'ch.motto_qa.b': "B)  Only the maintenance manager — it was their department's change",
    'ch.motto_qa.c': 'C)  The technician who performed the action — anyone who deviates from an SOP must raise a deviation',
    'ch.motto_qa.d': 'D)  Nobody — the process still ran, so no deviation existed at that point',

    'ch.motto_dis.a': 'A)  Leadership — management sets the direction and culture for quality',
    'ch.motto_dis.b': 'B)  Customer Focus — understanding and meeting patient and customer requirements',
    'ch.motto_dis.c': 'C)  Continual Improvement — enhancing all processes and outputs, step by step',
    'ch.motto_dis.d': 'D)  Evidence-Based Decision Making — using data and facts to guide decisions',

    /* End screen */
    'end.won':    '🏆 BATCH RELEASED!',
    'end.lost':   '⏱ TIME EXPIRED — BATCH UNRELEASED',
    'end.new_game': '↺ New Game',

    /* Modal chrome */
    'modal.close':  'Close',
    'modal.submit': 'Submit',
  },

  /* ─── GERMAN ────────────────────────────────────────────── */
  de: {
    'login.lang':           'Sprache',
    'login.select_group':   'Gruppe auswählen',
    'login.group_pin':      'Gruppen-PIN',
    'login.your_name':      'Ihr Name',
    'login.enter_pin':      'Gruppen-PIN eingeben',
    'login.enter_name':     'z. B. Alice',
    'login.btn':            'ANMELDEN & ANLAGE BETRETEN',
    'login.demo':           '▶ Demo / Admin-Modus',
    'login.leaderboard':    '📊 Rangliste',
    'login.admin_pw_label': 'Admin-Passwort (für Demo erforderlich)',
    'login.admin_pw_ph':    'Admin-Passwort eingeben',
    'login.demo_btn':       'Demo-Modus starten',

    'start.title':      'QUALITÄTSWOCHE',
    'start.sub':        'ESCAPE ROOM — INTERNE AUDITSIMULATION',
    'start.briefing_h': 'Situationsbeschreibung',
    'start.briefing':   'Ein <strong>kritischer Nichtkonformitätsalarm</strong> hat eine Anlagensperre bei MediSeals Kolbenproduktionsstätte ausgelöst. Die Charge <strong>BN-2024-3200</strong> — Gummikolben für Insulinfläschchen und Injektionsgeräte — liegt auf Eis, bis die Untersuchung abgeschlossen ist.<br><br>Als diensthabender <strong>Qualitätsinspektor</strong> müssen Sie jeden Bereich durcharbeiten: Eingehende Materialien prüfen, AQL-Inspektion durchführen, Instrumente kalibrieren, eine CAPA einleiten und die abschließende Chargenfreigabe autorisieren — alles, bevor der <strong>externe FDA-Prüfer in 25 Minuten eintrifft</strong>.',
    'start.topics_h':   'Behandelte Qualitätsthemen',
    'start.how_h':      'Spielanleitung',
    'start.rules_h':    'Regeln',
    'start.scoring_h':  'Punktewertung',
    'start.ready_btn':  'ICH BIN BEREIT — BEGINNEN',
    'start.waiting':    '⏳ Warten auf Bestätigung der Teammitglieder…',
    'start.lobby_h':    '👥 TEAM-LOBBY',
    'start.lobby_hint': 'Gruppen mit <strong>3–5 Mitgliedern</strong> müssen alle verbunden sein, bevor sie beginnen.<br>Alle Mitglieder klicken auf <strong>Ich bin bereit</strong>, um gleichzeitig zu starten.',

    'room.receiving':  'Wareneingang',
    'room.production': 'Produktionslinie',
    'room.qclab':      'Qualitätskontrolllabor',
    'room.qaoffice':   'QS- und Compliance-Büro',
    'room.dispatch':   'Versand- und Freigabebereich',

    'hs.inspect_pallet':     'Palette prüfen (Gummimischung)',
    'hs.check_clipboard':    'Klemmbrett prüfen',
    'hs.gmp_terminal':       'GMP-Eingangsterminal',
    'hs.read_noticeboard':   'Qualitätswoche-Aushang',
    'hs.read_aql_chart':     'AQL-Stichprobendiagramm (Wand)',
    'hs.use_lightbox':       'Visuelle Inspektions-Leuchtbox',
    'hs.examine_mould':      'Station 3-Werkzeug prüfen',
    'hs.check_station3_log': 'Geräteprotokoll Station 3',
    'hs.file_ncr':           'NCR-Einreichungsstation',
    'hs.read_quality_poster':'Qualitätsverbesserungsplakat',
    'hs.open_cal_cabinet':   'Kalibrierungsreferenzschrank',
    'hs.use_micrometer':     'Mikrometerschrauben-Station',
    'hs.check_sop_rack':     'SOP-Dokumentenregal',
    'hs.check_equip_log':    'Gerätelogbuch',
    'hs.check_iso15378':     'ISO 15378-Verpackungskonformitätsakte',
    'hs.read_maint_log':     'Wartungsprotokoll (Beistelltisch)',
    'hs.use_capa_station':   'CAPA-Arbeitsplatz',
    'hs.check_iso_files':    'ISO 13485-Aktenablage',
    'hs.check_iso9001':      'ISO 9001-Management-Review',
    'hs.open_batch_safe':    'Chargendokumenten-Safe',
    'hs.read_quality_pledge':'Qualitätsversprechen (Wandrahmen)',
    'hs.use_release_terminal':'Chargenfreigabe-Terminal',
    'hs.inspect_quarantine': 'Quarantänekäfig',
    'hs.read_qw_banner':     'Qualitätswoche-Banner',

    'nav.you_are_in':      'Sie befinden sich in:',
    'nav.exits':           'Ausgänge',
    'nav.hint_btn':        '💡 Hinweis nutzen (−60s / −50 Pkt)',
    'nav.hint_used':       '(Hinweis genutzt)',
    'nav.lock.production': 'Zunächst Rohstoffprüfung erforderlich (GMP-Eingangsterminal).',
    'nav.lock.qclab':      'Zuerst NCR an der NCR-Einreichungsstation einreichen.',
    'nav.lock.qaoffice':   'Zuerst Kalibrierung im QC-Labor abschließen (Mikrometerschrauben-Station).',
    'nav.lock.dispatch':   'Zuerst CAPA-Bericht im QS-Büro abschließen und autorisieren.',

    'alarm.title':      '⚠ STOP — ZURÜCK GEHEN!',
    'alarm.sub.pin':    'PIN ist korrekt — aber Sie haben unabgeschlossene Prüfungen!',
    'alarm.sub.depart': 'Sie haben diesen Bereich nicht abgeschlossen! Lösen Sie alle Aufgaben, bevor Sie weitergehen.',
    'alarm.go_to':      'Gehen Sie zu:',
    'alarm.press':      '→ Schaltfläche drücken:',
    'alarm.ok':         '✓ VERSTANDEN — ICH GEHE JETZT ZURÜCK',

    'progress': 'Qualitätsprüfungen: {done} / {total} abgeschlossen',

    'hint.receiving':  'Das AQL-Diagramm und das CoA beschreiben dasselbe Material — vergleichen Sie deren Zahlen, bevor Sie entscheiden.',
    'hint.production': 'Das Wartungsprotokoll zeigt, was geplant war und was tatsächlich passiert ist. Ein einziger Unterschied erzählt die ganze Geschichte.',
    'hint.qclab':      'Das Mikrometer zeigt den Istwert. Die Kalibrierungsreferenz gibt den Sollwert vor. Der Unterschied zwischen beiden ist entscheidend.',
    'hint.qaoffice':   'NCR und CAPA sind verknüpfte Dokumente — eines benennt das Problem, das andere die Lösung. Verfolgen Sie den Zusammenhang.',
    'hint.dispatch':   'Das Qualitätswoche-Motto erscheint aus gutem Grund an jeder Wand. Überlegen Sie, welches ISO 9001:2015-Prinzip bei jedem Schritt für Verbesserung sorgt.',

    'q.gmp':           'Geben Sie die Material-Losnummer aus dem CoA ein, um das Material aus der Haltesperre zu lösen:',
    'q.gmp.ph':        'z. B. RM-XXXX',
    'q.inspection':    'Wie viele fehlerhafte Kolben haben Sie in der Inspektionswanne gezählt?',
    'q.aql':           'Gemäß Ihrem AQL-Diagramm: Was ist Ihre Chargenentscheidung? Geben Sie ACCEPT oder REJECT ein:',
    'q.ncr':           'Geben Sie die Chargennummer für diesen NCR ein:',
    'q.ncr.ph':        'z. B. BN-XXXX-XXXX',
    'q.calibration':   'Berechnen und geben Sie den Korrekturfaktor ein (mit Vorzeichen + oder −):',
    'q.calibration.ph':'z. B. −0,03',
    'q.capa_root':     'Wählen Sie die HAUPTURSACHE der Maßabweichungen in Charge BN-2024-3200:',
    'q.capa_prev':     'Wählen Sie die WIRKSAMSTE Vorbeugungsmaßnahme gegen eine Wiederholung:',
    'q.iso15378_1':    'Welche ERSTE PFLICHTMASSNAHME gilt gemäß GMP und ISO 15378 für nicht konforme Verpackungsmaterialien?',
    'q.iso15378_2':    'Ist Leons Korrekturmethode (Korrekturflüssigkeit) gemäß GDP akzeptabel?',
    'q.iso9001_1':     'Welcher Prozessfehler erklärt am BESTEN, warum der Schmiervorfall 3 Monate unentdeckt blieb?',
    'q.iso9001_2':     'Welche Kombination von Eingaben gehört am BESTEN auf die Management-Review-Agenda?',
    'q.motto_prod':    'Was schlägt dieses Motto vor — über das bloße Ablehnen der Charge hinaus?',
    'q.motto_qa':      'Wer war gemäß GMP-Qualitätsverantwortung für die Abweichungsmeldung zuständig?',
    'q.motto_dis':     'Welches ISO 9001:2015-Qualitätsmanagementprinzip spiegelt dieses Motto am BESTEN wider?',
    'q.pin':           'Geben Sie die 4-stellige QA-Autorisierungs-PIN aus dem Chargenfreigabezertifikat ein:',
    'q.pin.ph':        '4-stellige PIN',

    'ch.capa_root.a': 'A)  Bedienermüdigkeit während der Nachtschicht',
    'ch.capa_root.b': 'B)  Falscher Schmierstoffgrad an den Formenwerkzeugen verwendet (Grad B-7 statt Grad A-3)',
    'ch.capa_root.c': 'C)  Eingehende Gummimischung außerhalb der Spezifikation',
    'ch.capa_root.d': 'D)  Autoklavtemperaturabweichung während der Sterilisation',

    'ch.capa_prev.a': 'A)  Schmierstoff Grad B-7 als offiziell zugelassene Alternative bestellen',
    'ch.capa_prev.b': 'B)  SOP-MAINT-009 um Schmierstoffgrad-Prüfschritt ergänzen UND alle Wartungsmitarbeiter schulen',
    'ch.capa_prev.c': 'C)  AQL-Stichprobengröße für künftige Chargen erhöhen',
    'ch.capa_prev.d': 'D)  Warnhinweis am Schmierstofflager anbringen und auf Bedienerbewusstsein vertrauen',

    'ch.iso15378_1.a': 'A)  Für patientenfernere Produktion verwenden, um Verschwendung zu vermeiden',
    'ch.iso15378_1.b': 'B)  Physisch trennen, ABLEHNEN/HALTEN-Etikett anbringen und Lieferanten-NCR einreichen',
    'ch.iso15378_1.c': 'C)  Sofort ohne interne Dokumentation an den Lieferanten zurücksenden',
    'ch.iso15378_1.d': 'D)  Mit konformem Material aus einem anderen Lieferantenlos mischen',

    'ch.iso15378_2.a': 'A)  Ja — solange die korrekte Information sichtbar ist, spielt die Methode keine Rolle',
    'ch.iso15378_2.b': 'B)  Nein — GDP verlangt eine einzelne Linie durch den Fehler (lesbar), dann korrekten Wert mit Datum und Initialen',
    'ch.iso15378_2.c': 'C)  Ja — Korrekturflüssigkeit ist in pharmazeutischen Betrieben gängige Praxis',
    'ch.iso15378_2.d': 'D)  Nein — das gesamte Formular muss vernichtet und neu begonnen werden',

    'ch.iso9001_1.a': 'A)  Der monatliche Auditplan war zu unregelmäßig, um tägliche Fehler zu erfassen',
    'ch.iso9001_1.b': 'B)  Es gab keine Risikobewertung für den Schmierstoffwechsel — das Risiko wurde nie erkannt',
    'ch.iso9001_1.c': 'C)  Das Wartungsprotokoll wurde nicht im richtigen Ordner abgelegt',
    'ch.iso9001_1.d': 'D)  Der AQL-Stichprobenplan enthielt keine Sichtprüfung',

    'ch.iso9001_2.a': 'A)  Nur Kundenlieferpläne und Produktionsdurchsatzziele',
    'ch.iso9001_2.b': 'B)  NCR-Trends, CAPA-Status, Prüfergebnisse und Prozesskennzahlen',
    'ch.iso9001_2.c': 'C)  Gerätebeschaffungsanträge und IT-Infrastruktur-Upgrades',
    'ch.iso9001_2.d': 'D)  Individuelle Mitarbeiterleistungsbeurteilungen und Gehaltsgespräche',

    'ch.motto_prod.a': 'A)  Ablehnen, unter Quarantäne stellen und weitermachen — die Ablehnung ist die Korrekturmaßnahme',
    'ch.motto_prod.b': 'B)  Ablehnen, NCR einreichen, Grundursache untersuchen und CAPA einleiten',
    'ch.motto_prod.c': 'C)  Ablehnen und nur die Stichprobengröße für künftige Chargen erhöhen',
    'ch.motto_prod.d': 'D)  Charge unter Konzession akzeptieren, um den Produktionsplan einzuhalten',

    'ch.motto_qa.a': 'A)  Nur die QS-Abteilung — sie ist für alle Abweichungsprotokolle verantwortlich',
    'ch.motto_qa.b': 'B)  Nur der Wartungsleiter — es war eine Änderung seiner Abteilung',
    'ch.motto_qa.c': 'C)  Der Techniker, der die Maßnahme durchgeführt hat — jeder SOP-Abweicher muss eine Meldung machen',
    'ch.motto_qa.d': 'D)  Niemand — der Prozess lief weiter, also gab es keine Abweichung',

    'ch.motto_dis.a': 'A)  Führung — Management gibt Richtung und Qualitätskultur vor',
    'ch.motto_dis.b': 'B)  Kundenorientierung — Anforderungen von Patienten und Kunden verstehen und erfüllen',
    'ch.motto_dis.c': 'C)  Kontinuierliche Verbesserung — alle Prozesse und Ergebnisse Schritt für Schritt verbessern',
    'ch.motto_dis.d': 'D)  Evidenzbasierte Entscheidungsfindung — Daten und Fakten zur Entscheidungssteuerung nutzen',

    'end.won':      '🏆 CHARGE FREIGEGEBEN!',
    'end.lost':     '⏱ ZEIT ABGELAUFEN — CHARGE NICHT FREIGEGEBEN',
    'end.new_game': '↺ Neues Spiel',

    'modal.close':  'Schließen',
    'modal.submit': 'Absenden',
  },

  /* ─── SPANISH ───────────────────────────────────────────── */
  es: {
    'login.lang':           'Idioma',
    'login.select_group':   'Seleccionar Grupo',
    'login.group_pin':      'PIN del Grupo',
    'login.your_name':      'Tu Nombre',
    'login.enter_pin':      'Ingresa el PIN de tu grupo',
    'login.enter_name':     'p. ej. Alicia',
    'login.btn':            'INGRESAR & ACCEDER A LA INSTALACIÓN',
    'login.demo':           '▶ Modo Demo / Admin',
    'login.leaderboard':    '📊 Tabla de Clasificación',
    'login.admin_pw_label': 'Contraseña de Administrador (para Demo)',
    'login.admin_pw_ph':    'Ingresa la contraseña de admin',
    'login.demo_btn':       'Iniciar Modo Demo',

    'start.title':      'SEMANA DE CALIDAD',
    'start.sub':        'ESCAPE ROOM — SIMULACIÓN DE AUDITORÍA INTERNA',
    'start.briefing_h': 'Descripción de la Situación',
    'start.briefing':   'Una <strong>alarma crítica de no conformidad</strong> ha desencadenado un bloqueo en la planta de producción de émbolos de MediSeal. El lote <strong>BN-2024-3200</strong> — émbolos de goma destinados a viales de insulina y dispositivos de inyección — está en espera de investigación.<br><br>Como <strong>Inspector de Calidad</strong> de guardia, debes trabajar en cada estación: verificar materiales entrantes, completar una inspección AQL, calibrar instrumentos, iniciar un CAPA y autorizar la disposición final del lote — todo antes de que el <strong>auditor externo de la FDA llegue en 25 minutos</strong>.',
    'start.topics_h':   'Temas de Calidad Cubiertos',
    'start.how_h':      'Cómo Jugar',
    'start.rules_h':    'Reglas',
    'start.scoring_h':  'Puntuación',
    'start.ready_btn':  'ESTOY LISTO — COMENZAR',
    'start.waiting':    '⏳ Esperando confirmación de los compañeros…',
    'start.lobby_h':    '👥 SALA DE ESPERA DEL EQUIPO',
    'start.lobby_hint': 'Grupos de <strong>3–5 miembros</strong> deben estar todos conectados antes de comenzar.<br>Todos los miembros hacen clic en <strong>Estoy Listo</strong> para comenzar simultáneamente.',

    'room.receiving':  'Muelle de Recepción',
    'room.production': 'Línea de Producción',
    'room.qclab':      'Laboratorio de Control de Calidad',
    'room.qaoffice':   'Oficina de QA y Cumplimiento',
    'room.dispatch':   'Zona de Despacho y Liberación',

    'hs.inspect_pallet':     'Inspeccionar Paleta (Compuesto de Caucho)',
    'hs.check_clipboard':    'Revisar Portapapeles',
    'hs.gmp_terminal':       'Terminal GMP de Recepción',
    'hs.read_noticeboard':   'Tablero de la Semana de Calidad',
    'hs.read_aql_chart':     'Gráfico de Muestreo AQL (Pared)',
    'hs.use_lightbox':       'Caja de Luz para Inspección Visual',
    'hs.examine_mould':      'Examinar Molde de la Estación 3',
    'hs.check_station3_log': 'Registro de Instrumentos Estación 3',
    'hs.file_ncr':           'Estación de Registro de NCR',
    'hs.read_quality_poster':'Póster de Mejora de Calidad',
    'hs.open_cal_cabinet':   'Gabinete de Referencia de Calibración',
    'hs.use_micrometer':     'Estación de Micrómetro',
    'hs.check_sop_rack':     'Estante de Documentos SOP',
    'hs.check_equip_log':    'Libro de Registro de Equipos',
    'hs.check_iso15378':     'Archivo de Cumplimiento ISO 15378',
    'hs.read_maint_log':     'Registro de Mantenimiento (Mesa Lateral)',
    'hs.use_capa_station':   'Estación de Trabajo CAPA',
    'hs.check_iso_files':    'Archivador ISO 13485',
    'hs.check_iso9001':      'Revisión de Gestión ISO 9001',
    'hs.open_batch_safe':    'Caja Fuerte de Registros de Lote',
    'hs.read_quality_pledge':'Compromiso de Calidad (Marco en Pared)',
    'hs.use_release_terminal':'Terminal de Liberación de Lote',
    'hs.inspect_quarantine': 'Jaula de Cuarentena',
    'hs.read_qw_banner':     'Pancarta de la Semana de Calidad',

    'nav.you_are_in':      'Estás en:',
    'nav.exits':           'Salidas',
    'nav.hint_btn':        '💡 Usar Pista (−60s / −50 pts)',
    'nav.hint_used':       '(pista usada)',
    'nav.lock.production': 'Primero se requiere verificación de materia prima (Terminal GMP de Recepción).',
    'nav.lock.qclab':      'Primero registra el NCR en la Estación de Registro de NCR en la línea de producción.',
    'nav.lock.qaoffice':   'Primero completa la calibración de instrumentos en el Lab de CQ (Estación de Micrómetro).',
    'nav.lock.dispatch':   'Primero completa y autoriza el informe CAPA en la Oficina de QA.',

    'alarm.title':      '⚠ DETENTE — ¡VUELVE ATRÁS!',
    'alarm.sub.pin':    'El PIN es correcto — ¡pero tienes verificaciones incompletas!',
    'alarm.sub.depart': '¡No has terminado esta sala! Completa todos los puzzles antes de continuar.',
    'alarm.go_to':      'Ve a:',
    'alarm.press':      '→ Presiona el botón:',
    'alarm.ok':         '✓ ENTENDIDO — VOLVERÉ AHORA',

    'progress': 'Controles de calidad: {done} / {total} completados',

    'hint.receiving':  'El gráfico AQL y el CoA que recibes describen el mismo material — compara sus números antes de tomar una decisión.',
    'hint.production': 'El registro de mantenimiento muestra lo que estaba programado y lo que realmente sucedió. Una sola diferencia cuenta toda la historia.',
    'hint.qclab':      'El micrómetro muestra el valor actual. La referencia de calibración da el objetivo. La diferencia entre ambos es lo que importa.',
    'hint.qaoffice':   'El NCR y el CAPA son documentos vinculados — uno nombra el problema, el otro la solución. Sigue la cadena.',
    'hint.dispatch':   'El lema de la Semana de Calidad aparece en cada pared por una razón. Piensa qué principio de ISO 9001:2015 impulsa la mejora en cada paso.',

    'q.gmp':           'Ingresa el número de lote del material del CoA para liberar el material de la retención:',
    'q.gmp.ph':        'p. ej. RM-XXXX',
    'q.inspection':    '¿Cuántos émbolos defectuosos encontraste en la bandeja de inspección?',
    'q.aql':           'Según el gráfico AQL, ¿cuál es tu disposición del lote? Escribe ACCEPT o REJECT:',
    'q.ncr':           'Ingresa el número de lote para registrar este NCR:',
    'q.ncr.ph':        'p. ej. BN-XXXX-XXXX',
    'q.calibration':   'Calcula e ingresa el factor de corrección (incluye el signo + o −):',
    'q.calibration.ph':'p. ej. −0.03',
    'q.capa_root':     'Selecciona la CAUSA RAÍZ de las no conformidades dimensionales en el lote BN-2024-3200:',
    'q.capa_prev':     'Selecciona la acción preventiva MÁS EFECTIVA para evitar que este error se repita:',
    'q.iso15378_1':    'Según GMP e ISO 15378, ¿cuál es la PRIMERA ACCIÓN obligatoria para materiales de embalaje no conformes?',
    'q.iso15378_2':    'Según las Buenas Prácticas de Documentación (GDP), ¿es aceptable el método de corrección de León (líquido corrector)?',
    'q.iso9001_1':     '¿Qué falla de proceso explica MEJOR por qué el incidente del lubricante pasó desapercibido durante 3 meses?',
    'q.iso9001_2':     '¿Qué combinación de entradas corresponde MEJOR a la agenda de Revisión por la Dirección?',
    'q.motto_prod':    'Más allá de simplemente rechazar el lote, ¿qué sugiere este lema que debemos hacer?',
    'q.motto_qa':      'Según el principio GMP de "propiedad de la calidad", ¿quién era responsable de registrar la desviación cuando se cambió el lubricante?',
    'q.motto_dis':     '¿Qué Principio de Gestión de Calidad de ISO 9001:2015 refleja MEJOR este lema?',
    'q.pin':           'Ingresa el PIN de autorización QA de 4 dígitos del Certificado de Liberación de Lote:',
    'q.pin.ph':        'PIN de 4 dígitos',

    'ch.capa_root.a': 'A)  Fatiga del operario durante el turno de noche',
    'ch.capa_root.b': 'B)  Grado de lubricante incorrecto usado en las herramientas del molde (Grado B-7 en lugar de Grado A-3)',
    'ch.capa_root.c': 'C)  Compuesto de caucho entrante fuera de especificación',
    'ch.capa_root.d': 'D)  Excursión de temperatura del autoclave durante la esterilización',

    'ch.capa_prev.a': 'A)  Pedir lubricante Grado B-7 como alternativa aprobada oficial para reducir el riesgo de error',
    'ch.capa_prev.b': 'B)  Actualizar SOP-MAINT-009 con paso de verificación del grado de lubricante Y reentrenar a todo el personal de mantenimiento',
    'ch.capa_prev.c': 'C)  Aumentar el tamaño de muestra AQL para lotes futuros para detectar defectos relacionados con lubricantes',
    'ch.capa_prev.d': 'D)  Colocar una etiqueta de advertencia en el armario de lubricantes y confiar en la conciencia del operario',

    'ch.iso15378_1.a': 'A)  Usarlos para producción sin contacto con el paciente para evitar desperdicios',
    'ch.iso15378_1.b': 'B)  Segregar físicamente, aplicar etiqueta RECHAZADO/EN ESPERA y registrar NCR al proveedor antes de cualquier disposición',
    'ch.iso15378_1.c': 'C)  Devolvérselos al proveedor inmediatamente sin levantar documentación interna',
    'ch.iso15378_1.d': 'D)  Mezclarlos con stock conforme de otro lote de proveedor para diluir la tasa de defectos',

    'ch.iso15378_2.a': 'A)  Sí — siempre que la información correcta sea visible, el método no importa',
    'ch.iso15378_2.b': 'B)  No — GDP requiere una línea simple sobre el error dejándolo legible, luego el valor correcto con fecha e iniciales',
    'ch.iso15378_2.c': 'C)  Sí — el líquido corrector es práctica estándar en la mayoría de instalaciones farmacéuticas',
    'ch.iso15378_2.d': 'D)  No — el formulario completo debe destruirse y rehacerse para mantener la integridad de datos',

    'ch.iso9001_1.a': 'A)  El programa de auditoría mensual era demasiado infrecuente para detectar errores diarios',
    'ch.iso9001_1.b': 'B)  No había evaluación de riesgo sobre el procedimiento de cambio de lubricante — el riesgo nunca fue identificado',
    'ch.iso9001_1.c': 'C)  El registro de mantenimiento no estaba almacenado en la carpeta correcta',
    'ch.iso9001_1.d': 'D)  El plan de muestreo AQL no incluía inspección visual',

    'ch.iso9001_2.a': 'A)  Solo programas de entrega de clientes y objetivos de producción',
    'ch.iso9001_2.b': 'B)  Tendencias de NCR, estado de CAPA, resultados de auditorías y datos de rendimiento de procesos',
    'ch.iso9001_2.c': 'C)  Solicitudes de compra de equipos y mejoras de infraestructura de TI',
    'ch.iso9001_2.d': 'D)  Revisiones de rendimiento individual de empleados y discusiones salariales',

    'ch.motto_prod.a': 'A)  Rechazar, poner en cuarentena y seguir adelante — el rechazo en sí es la acción correctiva',
    'ch.motto_prod.b': 'B)  Rechazar, registrar NCR, investigar la causa raíz y levantar un CAPA para prevenir recurrencia',
    'ch.motto_prod.c': 'C)  Rechazar y solo aumentar el tamaño de muestra para lotes futuros',
    'ch.motto_prod.d': 'D)  Aceptar el lote bajo concesión para mantener el programa de producción',

    'ch.motto_qa.a': 'A)  Solo el departamento de QA — ellos son dueños de todos los registros de desviación',
    'ch.motto_qa.b': 'B)  Solo el gerente de mantenimiento — fue el cambio de su departamento',
    'ch.motto_qa.c': 'C)  El técnico que realizó la acción — cualquiera que se desvíe de un SOP debe registrar una desviación',
    'ch.motto_qa.d': 'D)  Nadie — el proceso siguió funcionando, así que en ese momento no había ninguna desviación',

    'ch.motto_dis.a': 'A)  Liderazgo — la dirección establece la cultura y dirección de calidad',
    'ch.motto_dis.b': 'B)  Enfoque en el Cliente — entender y satisfacer los requisitos de pacientes y clientes',
    'ch.motto_dis.c': 'C)  Mejora Continua — mejorar todos los procesos y resultados, paso a paso',
    'ch.motto_dis.d': 'D)  Toma de Decisiones Basada en Evidencia — usar datos y hechos para guiar decisiones',

    'end.won':      '🏆 ¡LOTE LIBERADO!',
    'end.lost':     '⏱ TIEMPO AGOTADO — LOTE NO LIBERADO',
    'end.new_game': '↺ Nuevo Juego',

    'modal.close':  'Cerrar',
    'modal.submit': 'Enviar',
  },

  /* ─── BRAZILIAN PORTUGUESE ──────────────────────────────── */
  'pt-BR': {
    'login.lang':           'Idioma',
    'login.select_group':   'Selecionar Grupo',
    'login.group_pin':      'PIN do Grupo',
    'login.your_name':      'Seu Nome',
    'login.enter_pin':      'Digite o PIN do seu grupo',
    'login.enter_name':     'ex: Alice',
    'login.btn':            'ENTRAR & ACESSAR A INSTALAÇÃO',
    'login.demo':           '▶ Modo Demo / Admin',
    'login.leaderboard':    '📊 Placar',
    'login.admin_pw_label': 'Senha de Administrador (para Demo)',
    'login.admin_pw_ph':    'Digite a senha de admin',
    'login.demo_btn':       'Iniciar Modo Demo',

    'start.title':      'SEMANA DA QUALIDADE',
    'start.sub':        'ESCAPE ROOM — SIMULAÇÃO DE AUDITORIA INTERNA',
    'start.briefing_h': 'Descrição da Situação',
    'start.briefing':   'Um <strong>alarme crítico de não conformidade</strong> desencadeou um bloqueio na fábrica de produção de êmbolos da MediSeal. O lote <strong>BN-2024-3200</strong> — êmbolos de borracha destinados a frascos de insulina e dispositivos de injeção — está retido aguardando investigação.<br><br>Como <strong>Inspetor de Qualidade</strong> de plantão, você deve trabalhar em cada estação: verificar materiais recebidos, realizar uma inspeção AQL, calibrar instrumentos, iniciar um CAPA e autorizar a disposição final do lote — tudo antes de o <strong>auditor externo da FDA chegar em 25 minutos</strong>.',
    'start.topics_h':   'Tópicos de Qualidade Abordados',
    'start.how_h':      'Como Jogar',
    'start.rules_h':    'Regras',
    'start.scoring_h':  'Pontuação',
    'start.ready_btn':  'ESTOU PRONTO — COMEÇAR',
    'start.waiting':    '⏳ Aguardando confirmação dos colegas…',
    'start.lobby_h':    '👥 SALA DE ESPERA DA EQUIPE',
    'start.lobby_hint': 'Grupos de <strong>3–5 membros</strong> devem estar todos conectados antes de iniciar.<br>Todos os membros clicam em <strong>Estou Pronto</strong> para começar simultaneamente.',

    'room.receiving':  'Doca de Recebimento',
    'room.production': 'Linha de Produção',
    'room.qclab':      'Laboratório de Controle de Qualidade',
    'room.qaoffice':   'Escritório de QA e Conformidade',
    'room.dispatch':   'Área de Expedição e Liberação',

    'hs.inspect_pallet':     'Inspecionar Palete (Composto de Borracha)',
    'hs.check_clipboard':    'Verificar Prancheta',
    'hs.gmp_terminal':       'Terminal GMP de Recebimento',
    'hs.read_noticeboard':   'Quadro de Avisos da Semana da Qualidade',
    'hs.read_aql_chart':     'Gráfico de Amostragem AQL (Parede)',
    'hs.use_lightbox':       'Caixa de Luz para Inspeção Visual',
    'hs.examine_mould':      'Examinar Molde da Estação 3',
    'hs.check_station3_log': 'Registro de Instrumentos Estação 3',
    'hs.file_ncr':           'Estação de Registro de NCR',
    'hs.read_quality_poster':'Pôster de Melhoria de Qualidade',
    'hs.open_cal_cabinet':   'Armário de Referência de Calibração',
    'hs.use_micrometer':     'Estação de Micrômetro',
    'hs.check_sop_rack':     'Estante de Documentos SOP',
    'hs.check_equip_log':    'Livro de Registro de Equipamentos',
    'hs.check_iso15378':     'Arquivo de Conformidade ISO 15378',
    'hs.read_maint_log':     'Registro de Manutenção (Mesa Lateral)',
    'hs.use_capa_station':   'Estação de Trabalho CAPA',
    'hs.check_iso_files':    'Arquivo ISO 13485',
    'hs.check_iso9001':      'Revisão de Gestão ISO 9001',
    'hs.open_batch_safe':    'Cofre de Registros de Lote',
    'hs.read_quality_pledge':'Compromisso de Qualidade (Quadro na Parede)',
    'hs.use_release_terminal':'Terminal de Liberação de Lote',
    'hs.inspect_quarantine': 'Gaiola de Quarentena',
    'hs.read_qw_banner':     'Banner da Semana da Qualidade',

    'nav.you_are_in':      'Você está em:',
    'nav.exits':           'Saídas',
    'nav.hint_btn':        '💡 Usar Dica (−60s / −50 pts)',
    'nav.hint_used':       '(dica usada)',
    'nav.lock.production': 'Verificação de matéria-prima é necessária primeiro (Terminal GMP de Recebimento).',
    'nav.lock.qclab':      'Registre o NCR na Estação de Registro de NCR na linha de produção primeiro.',
    'nav.lock.qaoffice':   'Conclua a calibração de instrumentos no Lab de CQ primeiro (Estação de Micrômetro).',
    'nav.lock.dispatch':   'Conclua e autorize o relatório CAPA no Escritório de QA primeiro.',

    'alarm.title':      '⚠ PARE — VOLTE ATRÁS!',
    'alarm.sub.pin':    'O PIN está correto — mas você tem verificações incompletas!',
    'alarm.sub.depart': 'Você não terminou esta sala! Complete todos os puzzles antes de continuar.',
    'alarm.go_to':      'Vá para:',
    'alarm.press':      '→ Pressione o botão:',
    'alarm.ok':         '✓ ENTENDIDO — VOLTAREI AGORA',

    'progress': 'Verificações de qualidade: {done} / {total} concluídas',

    'hint.receiving':  'O gráfico AQL e o CoA que você recebe descrevem o mesmo material — compare os números antes de tomar uma decisão.',
    'hint.production': 'O registro de manutenção mostra o que foi programado e o que realmente aconteceu. Uma única diferença conta toda a história.',
    'hint.qclab':      'O micrômetro mostra o valor atual. A referência de calibração fornece o alvo. A diferença entre eles é o que importa.',
    'hint.qaoffice':   'O NCR e o CAPA são documentos vinculados — um nomeia o problema, o outro a solução. Siga a cadeia.',
    'hint.dispatch':   'O lema da Semana da Qualidade aparece em cada parede por uma razão. Pense em qual princípio da ISO 9001:2015 impulsiona a melhoria a cada passo.',

    'q.gmp':           'Digite o número de lote do material do CoA para liberar o material da retenção:',
    'q.gmp.ph':        'ex: RM-XXXX',
    'q.inspection':    'Quantos êmbolos defeituosos você encontrou na bandeja de inspeção?',
    'q.aql':           'Com base no gráfico AQL, qual é a disposição do lote? Digite ACCEPT ou REJECT:',
    'q.ncr':           'Digite o número do lote para registrar este NCR:',
    'q.ncr.ph':        'ex: BN-XXXX-XXXX',
    'q.calibration':   'Calcule e insira o fator de correção (inclua o sinal + ou −):',
    'q.calibration.ph':'ex: −0,03',
    'q.capa_root':     'Selecione a CAUSA RAIZ das não conformidades dimensionais no lote BN-2024-3200:',
    'q.capa_prev':     'Selecione a ação preventiva MAIS EFICAZ para impedir que este erro se repita:',
    'q.iso15378_1':    'Segundo GMP e ISO 15378, qual é a PRIMEIRA AÇÃO obrigatória para materiais de embalagem recebidos não conformes?',
    'q.iso15378_2':    'Segundo as Boas Práticas de Documentação (GDP), o método de correção de Leon (líquido corretor) é aceitável?',
    'q.iso9001_1':     'Qual falha de processo explica MELHOR por que o incidente do lubrificante passou despercebido por 3 meses?',
    'q.iso9001_2':     'Qual combinação de entradas corresponde MELHOR à pauta da Revisão pela Direção?',
    'q.motto_prod':    'Além de simplesmente rejeitar o lote, o que este lema sugere que devemos fazer?',
    'q.motto_qa':      'Segundo o princípio GMP de "propriedade da qualidade", quem era responsável por registrar o desvio quando o lubrificante foi trocado?',
    'q.motto_dis':     'Qual Princípio de Gestão da Qualidade da ISO 9001:2015 este lema reflete MELHOR?',
    'q.pin':           'Digite o PIN de autorização QA de 4 dígitos do Certificado de Liberação de Lote:',
    'q.pin.ph':        'PIN de 4 dígitos',

    'ch.capa_root.a': 'A)  Fadiga do operador durante o turno noturno',
    'ch.capa_root.b': 'B)  Grau de lubrificante errado usado nas ferramentas do molde (Grau B-7 em vez de Grau A-3)',
    'ch.capa_root.c': 'C)  Composto de borracha recebido fora de especificação',
    'ch.capa_root.d': 'D)  Excursão de temperatura do autoclave durante a esterilização',

    'ch.capa_prev.a': 'A)  Pedir lubrificante Grau B-7 como alternativa aprovada oficial para reduzir o risco de erro',
    'ch.capa_prev.b': 'B)  Atualizar SOP-MAINT-009 com etapa de verificação do grau de lubrificante E retreinar todo o pessoal de manutenção',
    'ch.capa_prev.c': 'C)  Aumentar o tamanho da amostra AQL para lotes futuros para detectar defeitos relacionados ao lubrificante',
    'ch.capa_prev.d': 'D)  Colocar etiqueta de aviso no armário de lubrificantes e confiar na consciência do operador',

    'ch.iso15378_1.a': 'A)  Usá-los para produção sem contato com o paciente para evitar desperdício',
    'ch.iso15378_1.b': 'B)  Segregar fisicamente, aplicar etiqueta REJEITADO/RETIDO e registrar NCR ao fornecedor antes de qualquer disposição',
    'ch.iso15378_1.c': 'C)  Devolvê-los ao fornecedor imediatamente sem levantar documentação interna',
    'ch.iso15378_1.d': 'D)  Misturá-los com estoque conforme de outro lote de fornecedor para diluir a taxa de defeitos',

    'ch.iso15378_2.a': 'A)  Sim — desde que a informação correta esteja visível, o método não importa',
    'ch.iso15378_2.b': 'B)  Não — GDP exige uma linha simples sobre o erro deixando-o legível, depois o valor correto com data e iniciais',
    'ch.iso15378_2.c': 'C)  Sim — líquido corretor é prática padrão na maioria das instalações farmacêuticas',
    'ch.iso15378_2.d': 'D)  Não — o formulário inteiro deve ser destruído e refeito para manter a integridade dos dados',

    'ch.iso9001_1.a': 'A)  O cronograma de auditoria mensal era muito pouco frequente para detectar erros diários',
    'ch.iso9001_1.b': 'B)  Não havia avaliação de risco sobre o procedimento de troca de lubrificante — o risco nunca foi identificado',
    'ch.iso9001_1.c': 'C)  O registro de manutenção não estava armazenado na pasta correta',
    'ch.iso9001_1.d': 'D)  O plano de amostragem AQL não incluía inspeção visual',

    'ch.iso9001_2.a': 'A)  Apenas cronogramas de entrega de clientes e metas de produção',
    'ch.iso9001_2.b': 'B)  Tendências de NCR, status de CAPA, resultados de auditorias e dados de desempenho de processos',
    'ch.iso9001_2.c': 'C)  Solicitações de compra de equipamentos e atualizações de infraestrutura de TI',
    'ch.iso9001_2.d': 'D)  Avaliações individuais de desempenho de funcionários e discussões salariais',

    'ch.motto_prod.a': 'A)  Rejeitar, colocar em quarentena e seguir em frente — a rejeição em si é a ação corretiva',
    'ch.motto_prod.b': 'B)  Rejeitar, registrar NCR, investigar a causa raiz e levantar um CAPA para prevenir recorrência',
    'ch.motto_prod.c': 'C)  Rejeitar e apenas aumentar o tamanho da amostra para lotes futuros',
    'ch.motto_prod.d': 'D)  Aceitar o lote sob concessão para manter o programa de produção',

    'ch.motto_qa.a': 'A)  Apenas o departamento de QA — eles são donos de todos os registros de desvio',
    'ch.motto_qa.b': 'B)  Apenas o gerente de manutenção — foi a mudança do departamento dele',
    'ch.motto_qa.c': 'C)  O técnico que realizou a ação — qualquer um que se desvie de um SOP deve registrar um desvio',
    'ch.motto_qa.d': 'D)  Ninguém — o processo continuou funcionando, então naquele momento não havia desvio',

    'ch.motto_dis.a': 'A)  Liderança — a gestão define a direção e cultura de qualidade',
    'ch.motto_dis.b': 'B)  Foco no Cliente — entender e atender os requisitos de pacientes e clientes',
    'ch.motto_dis.c': 'C)  Melhoria Contínua — aprimorar todos os processos e resultados, passo a passo',
    'ch.motto_dis.d': 'D)  Tomada de Decisão Baseada em Evidências — usar dados e fatos para orientar decisões',

    'end.won':      '🏆 LOTE LIBERADO!',
    'end.lost':     '⏱ TEMPO ESGOTADO — LOTE NÃO LIBERADO',
    'end.new_game': '↺ Novo Jogo',

    'modal.close':  'Fechar',
    'modal.submit': 'Enviar',
  },
};

/* ── Helper functions ─────────────────────────────────────── */

function t(key) {
  const lang = (typeof S !== 'undefined' && S.lang) || localStorage.getItem('qw_lang') || 'en';
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return (dict[key] !== undefined ? dict[key] : (TRANSLATIONS.en[key] !== undefined ? TRANSLATIONS.en[key] : key));
}

// Returns a translated copy of a choices array.
// puzzleId e.g. 'capa_root' maps to keys ch.capa_root.a / .b / .c / .d
function tChoices(puzzleId, choices) {
  const lang = (typeof S !== 'undefined' && S.lang) || localStorage.getItem('qw_lang') || 'en';
  if (lang === 'en') return choices;
  const letters = ['a','b','c','d'];
  return choices.map((ch, i) => {
    const k = `ch.${puzzleId}.${letters[i]}`;
    const tx = t(k);
    return (tx !== k) ? { ...ch, label: tx } : ch;
  });
}

// Apply data-t / data-t-html / data-t-ph attributes across the page
function applyTranslations() {
  document.querySelectorAll('[data-t]').forEach(el => {
    el.textContent = t(el.dataset.t);
  });
  document.querySelectorAll('[data-t-html]').forEach(el => {
    el.innerHTML = t(el.dataset.tHtml);
  });
  document.querySelectorAll('[data-t-ph]').forEach(el => {
    el.placeholder = t(el.dataset.tPh);
  });
}
