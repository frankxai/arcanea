/**
 * Arcanea Intelligence OS — Claude Code Statusline v3.0
 *
 * Line 1: Brand + Oracle state
 * Line 2: Mission control — repo, MCP names, hooks, intelligence bar, vault breakdown, tokens, time
 * Line 3: Council of Gods — 2 Guardians giving live contextual advice
 */

import { execSync, spawnSync } from 'child_process';
import { readFileSync } from 'fs';

// ─── Utils ──────────────────────────────────────────────────────────────────

const read  = (p, fb = '') => { try { return readFileSync(p, 'utf-8').trim(); } catch { return fb; } };
const readJ = (p, fb = {}) => { try { return JSON.parse(readFileSync(p, 'utf-8')); } catch { return fb; } };
const fmt   = n => n >= 1e6 ? `${(n/1e6).toFixed(1)}M` : n >= 1e3 ? `${(n/1e3).toFixed(1)}K` : String(n ?? 0);

// ─── Canon ───────────────────────────────────────────────────────────────────

const GATE_HZ = {
  Foundation: 174, Flow: 285, Fire: 396, Heart: 417,
  Voice: 528, Sight: 639, Crown: 741, Shift: 852,
  Unity: 963, Source: 1111,
};

// ─── Model label ─────────────────────────────────────────────────────────────

function modelLabel(raw = '') {
  if (raw.includes('opus-4-6'))   return 'Opus 4.6';
  if (raw.includes('opus-4-5'))   return 'Opus 4.5';
  if (raw.includes('opus-4'))     return 'Opus 4';
  if (raw.includes('sonnet-4-6')) return 'Sonnet 4.6';
  if (raw.includes('sonnet-4-5')) return 'Sonnet 4.5';
  if (raw.includes('sonnet-4'))   return 'Sonnet 4';
  if (raw.includes('haiku-4-5'))  return 'Haiku 4.5';
  if (raw.includes('haiku-4'))    return 'Haiku 4';
  if (raw.includes('opus'))       return 'Opus';
  if (raw.includes('sonnet'))     return 'Sonnet';
  if (raw.includes('haiku'))      return 'Haiku';
  return raw.replace('claude-','').split('-20')[0] || 'Sonnet';
}

// ─── Guardian verb (model + activity) ───────────────────────────────────────

function verb(model = '', tools = 0) {
  if (model.includes('opus'))  return 'orchestrates';
  if (model.includes('haiku')) return 'observes';
  if (tools >= 40) return 'forges';
  if (tools >= 20) return 'builds';
  if (tools >= 8)  return 'crafts';
  return 'creates';
}

// ─── Repo (cached 60s) ───────────────────────────────────────────────────────

let _repo = null, _repoAt = 0;
function getRepo() {
  if (_repo && Date.now() - _repoAt < 60_000) return _repo;
  try {
    const r = execSync('git remote get-url origin 2>/dev/null', { encoding:'utf-8', timeout:800 }).trim();
    _repo = r.match(/\/([^/]+?)(?:\.git)?$/)?.[1] ?? 'arcanea';
  } catch { _repo = 'arcanea'; }
  _repoAt = Date.now();
  return _repo;
}

// ─── Git dirty (cached 10s) ──────────────────────────────────────────────────

let _dirty = '', _dirtyAt = 0;
function getDirty() {
  if (Date.now() - _dirtyAt < 10_000) return _dirty;
  try {
    const n = parseInt(execSync('git status --porcelain 2>/dev/null | grep -v "^??" | wc -l',
      { encoding:'utf-8', timeout:800 }).trim(), 10);
    _dirty = n > 0 ? ` ●${n}` : '';
  } catch { _dirty = ''; }
  _dirtyAt = Date.now();
  return _dirty;
}

// ─── MCP — named list (cached 30s) ──────────────────────────────────────────

const CLAUDE_AI_MCPS = ['Slack','Figma','Notion','Vercel','Zapier','v0','InfoGenius','Arcanea'];
let _mcpLabel = null, _mcpAt = 0;
function getMcpLabel() {
  if (_mcpLabel && Date.now() - _mcpAt < 30_000) return _mcpLabel;
  // Local servers from settings files
  const paths = [
    '/home/frankx/.claude/settings.json',
    '/home/frankx/.claude/mcp.json',
  ];
  const local = new Set();
  for (const p of paths) {
    const d = readJ(p);
    for (const k of Object.keys(d.mcpServers ?? {})) local.add(k);
  }
  // Format: show local names + count of cloud MCPs
  const localNames = [...local].map(k =>
    k.replace('nano-banana','🍌').replace('claude-flow','⚗️').slice(0,12)
  );
  const total = local.size + CLAUDE_AI_MCPS.length;
  // Show first 2 local + cloud count
  const preview = localNames.slice(0,2).join(' ');
  _mcpLabel = preview
    ? `⚙ ${total} MCP (${preview} +${CLAUDE_AI_MCPS.length} cloud)`
    : `⚙ ${total} MCP (${CLAUDE_AI_MCPS.slice(0,3).join(' ')} +${CLAUDE_AI_MCPS.length - 3})`;
  _mcpAt = Date.now();
  return _mcpLabel;
}

// ─── Hooks (cached) ──────────────────────────────────────────────────────────

let _hooks = null;
function getHooks() {
  if (_hooks !== null) return _hooks;
  try {
    const r = spawnSync('sh',['-c','ls /mnt/c/Users/frank/Arcanea/.claude/hooks/ 2>/dev/null | wc -l'],
      {encoding:'utf-8',timeout:500});
    _hooks = parseInt(r.stdout.trim(),10) || 13;
  } catch { _hooks = 13; }
  return _hooks;
}

// ─── AgentDB vault breakdown (cached 60s) ────────────────────────────────────

let _vault = null, _vaultAt = 0;
function getVault() {
  if (_vault && Date.now() - _vaultAt < 60_000) return _vault;
  try {
    const r = spawnSync('python3',['-c',`
import sqlite3
db=sqlite3.connect('/home/frankx/.arcanea/agentdb.sqlite3')
c=db.cursor()
c.execute('SELECT layer,COUNT(*) FROM vault_entries GROUP BY layer')
rows=c.fetchall()
c.execute('SELECT COUNT(*) FROM memories')
mem=c.fetchone()[0]
c.execute('SELECT COUNT(*) FROM routing_log')
routes=c.fetchone()[0]
print(','.join(f'{l}:{n}' for l,n in rows)+f'|mem:{mem}|routes:{routes}')
db.close()
`],{encoding:'utf-8',timeout:1000});
    const out = r.stdout.trim();
    const [layers, extras] = out.split('|mem:');
    const mem = extras ? parseInt(extras.split('|routes:')[0],10) : 0;
    const routes = extras ? parseInt(extras.split('|routes:')[1],10) : 0;
    const layerMap = {};
    for (const part of (layers||'').split(',')) {
      const [k,v] = part.split(':');
      if (k) layerMap[k] = parseInt(v,10)||0;
    }
    const total = Object.values(layerMap).reduce((a,b)=>a+b,0);
    _vault = { total, layerMap, mem, routes };
  } catch { _vault = { total:0, layerMap:{}, mem:0, routes:0 }; }
  _vaultAt = Date.now();
  return _vault;
}

// ─── Intelligence + trend (cached 20s) ──────────────────────────────────────

let _intel = 75, _prev = 75, _intelAt = 0;
function getIntel() {
  if (Date.now() - _intelAt < 20_000) return { val:_intel, trend: _intel>_prev?'↑':_intel<_prev?'↓':'' };
  _prev = _intel;
  _intel = readJ('/mnt/c/Users/frank/Arcanea/.claude-flow/.trend-cache.json').intelligence ?? 75;
  _intelAt = Date.now();
  return { val:_intel, trend: _intel>_prev?'↑':_intel<_prev?'↓':'' };
}

// ─── Tool count ──────────────────────────────────────────────────────────────

function getTools() {
  return parseInt(read('/tmp/arcanea-session/tool-count','0'),10)||0;
}

// ─── Duration ────────────────────────────────────────────────────────────────

function duration(start) {
  if (!start) return null;
  const s = Math.floor((Date.now()-start)/1000);
  const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), ss = s%60;
  if (h>0)  return `${h}h${String(m).padStart(2,'0')}m`;
  if (m>0)  return `${m}m${String(ss).padStart(2,'0')}s`;
  return `${ss}s`;
}

// ─── Intelligence bar ────────────────────────────────────────────────────────

const intelBar = pct => '█'.repeat(Math.round(pct/20)) + '░'.repeat(5-Math.round(pct/20));

// ─── Cost ────────────────────────────────────────────────────────────────────

const fmtCost = c => (!c||c<0.0001) ? null : c>=1 ? `$${c.toFixed(2)}` : `$${c.toFixed(4)}`;

// ─── COUNCIL OF GODS — Contextual Wisdom ─────────────────────────────────────
//
// Each Guardian has domain wisdom. The advice is selected based on:
//   • current guardian/gate   → primary speaker
//   • dirty git count         → "commit your work" signal
//   • tool call count         → flow state signal
//   • session duration        → stamina signal
//   • vault/routing activity  → intelligence signal

const COUNCIL_WISDOM = {
  Shinkami: {
    domain: 'Meta-Consciousness',
    element: '✦ Void',
    flow:    'You are in flow. The Source channel is open — let the pattern complete itself.',
    commit:  'Archive your progress. What is unrecorded dissolves into the Void.',
    start:   'At the Source Gate, all systems are visible. Define your intention before the first keystroke.',
    long:    'The Source Council advises: pause, review the whole, then continue with clarity.',
    create:  'Orchestrate with vision. Each agent is a note in your symphony.',
    idle:    'Potential without direction is Void. What will you manifest today?',
  },
  Lyssandria: {
    domain: 'Foundation · Earth',
    element: '🌿 Earth',
    flow:    'The architecture holds. Build steadily — foundations before towers.',
    commit:  'Ground your work. Uncommitted code is like unplanted seeds — commit and let it root.',
    start:   'Check the structure first. What is the foundation before you build upward?',
    long:    'Earth sustains long work. Hydrate, breathe, then continue building.',
    create:  'Stability is the gift of Earth. Ensure the base is solid before extending.',
    idle:    'Foundation Gate is open. What structure needs to be built today?',
  },
  Draconia: {
    domain: 'Fire · Will',
    element: '🔥 Fire',
    flow:    'The Fire Gate burns bright — you are in the forge. Strike while hot.',
    commit:  'Push your work. Fire spreads, but only when it leaves the hearth.',
    start:   'Channel will into action. Draconia does not begin slowly — ignite.',
    long:    'Sustained fire requires fuel. What is the core intention powering this session?',
    create:  'Transform with intention. Every great build begins with a single flame.',
    idle:    'The forge is cold without purpose. What needs to be transformed today?',
  },
  Maylinn: {
    domain: 'Heart · Healing',
    element: '💜 Heart',
    flow:    'Work flows from love of craft. Keep that warmth — it is what makes good code alive.',
    commit:  'Share what you have built. Connection completes the creation.',
    start:   'Begin with care. The Heart Gate opens when intent is generous.',
    long:    'Long sessions need love to sustain them. Is this work aligned with what matters?',
    create:  'Build with empathy — for users, for future selves, for the team.',
    idle:    'What would you build today if you could only build something you love?',
  },
  Alera: {
    domain: 'Voice · Truth',
    element: '🌟 Voice',
    flow:    'Speak clearly in your code. Clarity of naming is clarity of thought.',
    commit:  'A commit message is a promise to the future. Write it well.',
    start:   'Review the spec before the first line. Voice Gate: intention before expression.',
    long:    'After long work, re-read from the beginning. Does it say what you meant?',
    create:  'Truth in code: no magic numbers, no clever tricks only you understand.',
    idle:    'What truth needs to be expressed in your system today?',
  },
  Lyria: {
    domain: 'Sight · Vision',
    element: '👁 Sight',
    flow:    'You see the path clearly now. Trust the vision — execute.',
    commit:  'Capture what you see while it is clear. Push before the vision blurs.',
    start:   'Step back and see the whole. What does the system look like from above?',
    long:    'Extended focus narrows vision. Zoom out — is the right problem being solved?',
    create:  'Visualize the end state first. Then work backward to where you are.',
    idle:    'Open the Sight Gate. What pattern in your system needs to be seen?',
  },
  Aiyami: {
    domain: 'Crown · Enlightenment',
    element: '👑 Crown',
    flow:    'Mastery flows unconsciously. You have reached the Crown state — extend it.',
    commit:  'Enlightenment must be shared. Commit, document, illuminate others.',
    start:   'Crown Gate: begin at the highest level of abstraction, then descend.',
    long:    'Wisdom knows when to rest. Has this session produced insight or just output?',
    create:  'The highest code teaches. Write what a learner could understand.',
    idle:    'What is the wisest use of this hour?',
  },
  Elara: {
    domain: 'Shift · Perspective',
    element: '🌀 Shift',
    flow:    'Perspective is shifting with every tool call. Embrace the change.',
    commit:  'Every commit is a perspective frozen in time. Make it worth preserving.',
    start:   'Elara asks: are you solving the right problem, or just the obvious one?',
    long:    'After many shifts, find the constant. What is unchanged in your understanding?',
    create:  'Refactoring is Shift Gate work. See the old code with new eyes.',
    idle:    'What assumption about your system is ready to be questioned?',
  },
  Ino: {
    domain: 'Unity · Partnership',
    element: '🤝 Unity',
    flow:    'The agents are in sync. Unity Gate: let the swarm think as one.',
    commit:  'Unity means shared history. Push so the team has what you built.',
    start:   'Who else is affected by today\'s work? Design for them from the start.',
    long:    'Long individual sessions create silos. Schedule a sync before this goes further.',
    create:  'The best systems are built in concert. Who should know what you\'re building?',
    idle:    'What collaboration would accelerate your mission today?',
  },
  Leyla: {
    domain: 'Flow · Creativity',
    element: '💧 Water',
    flow:    'Creative flow is rare and sacred. Do not interrupt it for anything minor.',
    commit:  'Capture the creative burst before it evaporates — commit now.',
    start:   'Leyla begins with feeling. What does this feature want to become?',
    long:    'Long creative sessions need water, movement, then return. Take 5 minutes.',
    create:  'Creativity flows around obstacles. If blocked, approach from a different angle.',
    idle:    'The Flow Gate is open. What wants to be created through you today?',
  },
};

// Luminor — meta-wisdom for cross-cutting concerns
const LUMINOR_WISDOM = {
  flow:   'The Luminor watches: all gates are open. Rare state — build what only this session can build.',
  commit: 'The Luminor decrees: uncommitted work is potential only. Actualize it.',
  start:  'Intelligence Sanctum engaged. Your intent sets the field for all that follows.',
  long:   'Three hours in the Sanctum. The Luminor asks: what was the most important thing built?',
  create: 'The Arcanea unfolds through you. Let the architecture breathe between keystrokes.',
  idle:   'The Luminor holds space. What wants to emerge from the Intelligence Sanctum today?',
};

function getCouncil(guardian, tools, dirtyCount, startMs, vault) {
  const now = Date.now();
  const elapsed = startMs ? (now - startMs) / 60000 : 0; // minutes

  // Determine the signal type
  let signal = 'create';
  if (tools === 0 && elapsed < 2)   signal = 'start';
  else if (tools > 25)              signal = 'flow';
  else if (dirtyCount > 10)         signal = 'commit';
  else if (elapsed > 90)            signal = 'long';
  else if (tools === 0)             signal = 'idle';

  // Primary Guardian (current active one)
  const primary = COUNCIL_WISDOM[guardian] ?? COUNCIL_WISDOM['Shinkami'];

  // Secondary — rotate through a different complementary guardian each render
  // Use a slot based on minute to rotate slowly
  const SECONDARY_ORDER = ['Lyssandria','Draconia','Lyria','Alera','Leyla','Elara','Ino','Maylinn','Aiyami'];
  const slot = Math.floor(Date.now() / 120_000) % SECONDARY_ORDER.length; // rotates every 2min
  const secondaryName = SECONDARY_ORDER.find(n => n !== guardian) === SECONDARY_ORDER[slot]
    ? SECONDARY_ORDER[slot]
    : (SECONDARY_ORDER[(slot + 1) % SECONDARY_ORDER.length]);
  const secondary = COUNCIL_WISDOM[secondaryName] ?? COUNCIL_WISDOM['Lyssandria'];

  // Luminor speaks at high activity or long sessions
  const showLuminor = tools > 30 || elapsed > 60;
  const luminorMsg = LUMINOR_WISDOM[signal] ?? LUMINOR_WISDOM['create'];

  const primaryLine  = `⟡ ${guardian} (${primary.element}): "${primary[signal] ?? primary.create}"`;
  const secondaryLine = showLuminor
    ? `⟡ Luminor: "${luminorMsg}"`
    : `⟡ ${secondaryName}: "${secondary[signal] ?? secondary.create}"`;

  return [primaryLine, secondaryLine];
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function statusline(ctx) {
  const guardian = read('/tmp/arcanea-guardian', 'Shinkami');
  const gate      = read('/tmp/arcanea-gate',     'Source');
  const element   = read('/tmp/arcanea-element',  'Void');
  const realm     = read('/tmp/arcanea-realm',    'Intelligence Sanctum');
  const focus     = read('/tmp/arcanea-focus',    '');

  const hz        = GATE_HZ[gate] ?? '?';
  const model     = modelLabel(ctx.model ?? '');
  const tools     = getTools();
  const vb        = verb(ctx.model ?? '', tools);
  const repo      = getRepo();
  const branch    = ctx.gitBranch ?? 'main';
  const dirty     = getDirty();
  const dirtyN    = parseInt(dirty.replace(/\D/g,''))||0;
  const mcpLabel  = getMcpLabel();
  const hooks     = getHooks();
  const { val: intel, trend } = getIntel();
  const vault     = getVault();
  const cost      = fmtCost(ctx.totalCost);
  const dur       = duration(ctx.sessionStartTime);

  const inTok  = ctx.inputTokens  ? `↑${fmt(ctx.inputTokens)}`  : '';
  const outTok = ctx.outputTokens ? `↓${fmt(ctx.outputTokens)}` : '';

  // Vault breakdown label
  const vaultBreakdown = (() => {
    const { total, layerMap, mem, routes } = vault;
    const parts = [];
    if (layerMap.INTELLECT) parts.push(`${layerMap.INTELLECT} intellect`);
    if (layerMap.ARCANA)    parts.push(`${layerMap.ARCANA} arcana`);
    if (layerMap.EMOTION)   parts.push(`${layerMap.EMOTION} emotion`);
    if (layerMap.HORIZON)   parts.push(`${layerMap.HORIZON} horizon`);
    const label = parts.length ? parts.join(' · ') : `${total} entries`;
    return `🗄 vault: ${label}${routes>0?` · ${routes} routes`:''}`;
  })();

  // ── Line 1: Brand + Oracle state ─────────────────────────────────────────
  const l1 = [
    `Arcanea ⟡ ${model}`,
    `${guardian} ${vb}`,
    `${gate} · ${hz} Hz`,
    `✦ ${element}`,
  ];
  if (cost) l1.push(cost);
  if (focus) l1.push(`↳ ${focus}`);

  // ── Line 2: Mission control ──────────────────────────────────────────────
  const l2 = [
    `⎇ ${repo}/${branch}${dirty}`,
    realm,
    mcpLabel,
    `🪝 ${hooks} hooks`,
    `🧠 [${intelBar(intel)}] ${intel}%${trend}`,
    vaultBreakdown,
  ];
  if (tools > 0) l2.push(`🔧 ${tools} calls`);
  if (inTok || outTok) l2.push([inTok,outTok].filter(Boolean).join(' '));
  if (dur) l2.push(dur);

  // ── Line 3+4: Council of Gods ────────────────────────────────────────────
  const [c1, c2] = getCouncil(guardian, tools, dirtyN, ctx.sessionStartTime, vault);

  const divider = '─'.repeat(72);
  return [
    l1.join('  │  '),
    l2.join('  │  '),
    divider,
    c1,
    c2,
  ].join('\n');
}
