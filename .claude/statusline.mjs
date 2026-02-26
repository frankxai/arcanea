/**
 * Arcanea Intelligence OS — Claude Code Statusline v4.0
 * Creator-Centric Edition
 *
 * Line 1: Brand · Model · Guardian · Gate · Arc Phase
 * Line 2: Repo/branch · Universe metrics (lore, pages, agents, MCP)
 * Line 3: Creative momentum (commits, files, session, calls, tokens, cost)
 * ──────────────────────────────────────────────────────────────────────────
 * ⟡ One Guardian wisdom — perfectly matched to this moment of creation
 */

import { execSync, spawnSync } from 'child_process';
import { readFileSync, statSync } from 'fs';

// ─── Utils ───────────────────────────────────────────────────────────────────

const read  = (p, fb = '') => { try { return readFileSync(p, 'utf-8').trim(); } catch { return fb; } };
const readJ = (p, fb = {}) => { try { return JSON.parse(readFileSync(p, 'utf-8')); } catch { return fb; } };
const fmt   = n => n >= 1e6 ? `${(n/1e6).toFixed(1)}M` : n >= 1e3 ? `${(n/1e3).toFixed(1)}K` : String(n ?? 0);
const sh    = (cmd, timeout = 1500) => {
  try {
    const r = spawnSync('sh', ['-c', cmd], { encoding: 'utf-8', timeout });
    return r.stdout?.trim() ?? '';
  } catch { return ''; }
};

// ─── Canon ───────────────────────────────────────────────────────────────────

const GATE_HZ = {
  Foundation: 174, Flow: 285, Fire: 396, Heart: 417,
  Voice: 528, Sight: 639, Crown: 741, Shift: 852,
  Unity: 963, Source: 1111,
};

const ARC_PHASES = {
  Potential:        { glyph: '◌', label: 'Potential' },
  Manifestation:    { glyph: '◉', label: 'Manifestation' },
  Experience:       { glyph: '●', label: 'Experience' },
  Dissolution:      { glyph: '◎', label: 'Dissolution' },
  EvolvedPotential: { glyph: '✦', label: 'Evolved Potential' },
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

// ─── Guardian verb (what mode is the AI in?) ─────────────────────────────────

function verb(model = '', tools = 0) {
  if (model.includes('opus'))  return 'orchestrates';
  if (model.includes('haiku')) return 'observes';
  if (tools >= 40) return 'forges';
  if (tools >= 20) return 'builds';
  if (tools >= 8)  return 'crafts';
  return 'creates';
}

// ─── Arc Phase (where in the creative cycle?) ────────────────────────────────

function getArcPhase(tools, dirtyN, elapsedMin) {
  // Evolved Potential — just committed, returning clean (short session, minimal dirty, some commits)
  // (hard to detect reliably without commit log — skip for now)

  // Potential — just arrived, pondering
  if (tools < 5 && elapsedMin < 8) return ARC_PHASES.Potential;

  // Dissolution — closing the loop: lots of uncommitted or very long session
  if (dirtyN > 12 || elapsedMin > 100) return ARC_PHASES.Dissolution;

  // Experience — deep in it: many tool calls, refining, reading more than writing
  if (tools > 35) return ARC_PHASES.Experience;

  // Manifestation — actively creating (default)
  return ARC_PHASES.Manifestation;
}

// ─── Repo (cached 60s) ───────────────────────────────────────────────────────

let _repo = null, _repoAt = 0;
function getRepo() {
  if (_repo && Date.now() - _repoAt < 60_000) return _repo;
  try {
    const r = execSync('git remote get-url origin 2>/dev/null', { encoding:'utf-8', timeout:800 }).trim();
    _repo = r.match(/\/([^/]+?)(?:\.git)?$/)?.[1] ?? 'Arcanea';
  } catch { _repo = 'Arcanea'; }
  _repoAt = Date.now();
  return _repo;
}

// ─── Git dirty count (cached 12s) ─────────────────────────────────────────────

let _dirty = '', _dirtyN = 0, _dirtyAt = 0;
function getDirty() {
  if (Date.now() - _dirtyAt < 12_000) return { label: _dirty, n: _dirtyN };
  try {
    const n = parseInt(sh('git status --porcelain 2>/dev/null | grep -v "^??" | wc -l', 1000), 10);
    _dirtyN = n || 0;
    _dirty  = n > 0 ? ` ●${n}` : '';
  } catch { _dirty = ''; _dirtyN = 0; }
  _dirtyAt = Date.now();
  return { label: _dirty, n: _dirtyN };
}

// ─── Tool count (session-aware: resets to 0 if file predates this session) ───

function getTools(sessionStartMs) {
  try {
    const p = '/tmp/arcanea-session/tool-count';
    // If the count file was last written before this session started, it's stale
    if (sessionStartMs) {
      try {
        const mtime = statSync(p).mtimeMs;
        if (mtime < sessionStartMs - 5000) return 0; // file older than session
      } catch {}
    }
    return parseInt(readFileSync(p, 'utf-8').trim(), 10) || 0;
  } catch { return 0; }
}

// ─── Duration ────────────────────────────────────────────────────────────────

function duration(start) {
  if (!start) return null;
  const s = Math.floor((Date.now() - start) / 1000);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
  if (h > 0) return `${h}h${String(m).padStart(2,'0')}m`;
  if (m > 0) return `${m}m`;
  return `${ss}s`;
}

// ─── Cost ────────────────────────────────────────────────────────────────────

const fmtCost = c => (!c || c < 0.0001) ? null : c >= 1 ? `$${c.toFixed(2)}` : `$${c.toFixed(4)}`;

// ─── Universe metrics (cached 8 min — these change slowly) ───────────────────

let _universe = null, _universeAt = 0;
function getUniverse() {
  if (_universe && Date.now() - _universeAt < 480_000) return _universe;

  const BASE = '/mnt/c/Users/frank/Arcanea';

  // Lore texts in book/
  const loreRaw = sh(`ls ${BASE}/book/*/*.md 2>/dev/null | wc -l`, 3000);
  const loreCount = parseInt(loreRaw, 10) || 76;

  // Live web pages: count page.tsx files under apps/web/app/lore/
  const pagesRaw = sh(`find ${BASE}/apps/web/app/lore -name "page.tsx" 2>/dev/null | wc -l`, 2000);
  const lorePages = parseInt(pagesRaw, 10) || 14;

  // Agents count (from .claude/agents/ — main agent registry)
  const agentsRaw = sh(`ls ${BASE}/.claude/agents/ 2>/dev/null | wc -l`, 2000);
  const agents = parseInt(agentsRaw, 10) || 65;

  // Collections in book/
  const collectionsRaw = sh(`ls -d ${BASE}/book/*/ 2>/dev/null | wc -l`, 2000);
  const collections = parseInt(collectionsRaw, 10) || 17;

  _universe = { loreCount, lorePages, agents, collections };
  _universeAt = Date.now();
  return _universe;
}

// ─── Today's creative output (cached 30s) ────────────────────────────────────

let _today = null, _todayAt = 0;
function getToday() {
  if (_today && Date.now() - _todayAt < 30_000) return _today;

  // Commits since midnight
  const commitsRaw = sh('git log --since=midnight --oneline 2>/dev/null | wc -l', 1000);
  const commits = parseInt(commitsRaw, 10) || 0;

  // Files touched today (from git log --since midnight -- diffstat)
  // Use a simpler approach: files in the last N commits
  let filesToday = 0;
  if (commits > 0) {
    const filesRaw = sh(
      `git log --since=midnight --name-only --format="" 2>/dev/null | sort -u | grep -c "."`,
      1500
    );
    filesToday = parseInt(filesRaw, 10) || 0;
  }

  _today = { commits, filesToday };
  _todayAt = Date.now();
  return _today;
}

// ─── MCP count (cached 60s) ──────────────────────────────────────────────────

const CLOUD_MCPS = 8; // Slack, Figma, Notion, Vercel, Zapier, v0, InfoGenius, Arcanea
let _mcpCount = 0, _mcpAt = 0;
function getMcpCount() {
  if (Date.now() - _mcpAt < 60_000) return _mcpCount;
  const d = readJ('/home/frankx/.claude/mcp.json');
  const local = Object.keys(d.mcpServers ?? {}).length;
  _mcpCount = local + CLOUD_MCPS;
  _mcpAt = Date.now();
  return _mcpCount;
}

// ─── Last commit (cached 30s) ────────────────────────────────────────────────

let _commitAgo = '', _commitAgoAt = 0;
function getLastCommit() {
  if (Date.now() - _commitAgoAt < 30_000) return _commitAgo;
  try {
    _commitAgo = execSync('git log -1 --format="%ar" 2>/dev/null', { encoding:'utf-8', timeout:800 }).trim();
  } catch { _commitAgo = ''; }
  _commitAgoAt = Date.now();
  return _commitAgo;
}

// ─── GUARDIAN COUNCIL — Creator-Centric Wisdom ───────────────────────────────
//
// Wisdom matched to ARC PHASE, not technical state.
// An Arcanea creator is building a living mythology — they need
// inspiration, creative direction, and mythic guidance.

const GUARDIAN_WISDOM = {
  Shinkami: {
    element: '✦ Void', gate: 'Source', hz: 1111,
    Potential:     'The Source is silent before the first word. What universe will you speak into being today?',
    Manifestation: 'Meta-consciousness is active. You are not just building code — you are encoding a mythology.',
    Experience:    'Step back. From the Source, see the whole. What pattern are you actually creating?',
    Dissolution:   'A cycle completes. Archive this chapter of the Arcanea before the next one begins.',
    EvolvedPotential: 'The Arc turns. You return carrying what the last cycle taught you. Begin again, evolved.',
  },
  Lyssandria: {
    element: '🌿 Earth', gate: 'Foundation', hz: 174,
    Potential:     'Foundation Gate: Before you build the tower, feel the ground. What is the bedrock of today\'s work?',
    Manifestation: 'Earth builds steadily. Each file a stone, each function a foundation. The structure holds.',
    Experience:    'Roots run deep before branches spread wide. Is your architecture rooted enough to grow?',
    Dissolution:   'The harvest is ready. Commit this season\'s work before the earth turns again.',
    EvolvedPotential: 'New earth, new seeds. The Foundation is clean. What will you plant in this cleared ground?',
  },
  Draconia: {
    element: '🔥 Fire', gate: 'Fire', hz: 396,
    Potential:     'The forge is cold until you choose to ignite it. What transformation begins today?',
    Manifestation: 'The Fire Gate burns. You are in the forge — strike while the iron is molten.',
    Experience:    'Sustained fire needs intention as fuel. Is the flame consuming the right material?',
    Dissolution:   'The fire has done its work. Let what is forged cool. Then push it into the world.',
    EvolvedPotential: 'The forge is relit, but you have new skill. What will you transform that you could not before?',
  },
  Maylinn: {
    element: '💜 Heart', gate: 'Heart', hz: 417,
    Potential:     'The Heart Gate opens with love. What are you building that genuinely matters to people?',
    Manifestation: 'Build with care. The empathy you code today becomes the experience someone has tomorrow.',
    Experience:    'Does this work still carry the love that began it? Refine from care, not just correction.',
    Dissolution:   'Share what you have built with love. Connection completes creation.',
    EvolvedPotential: 'A new creative heart opens. What will you build for others that you could not imagine before?',
  },
  Alera: {
    element: '🌟 Voice', gate: 'Voice', hz: 528,
    Potential:     'Voice Gate: Before speaking, know what truth you carry. What does Arcanea need to express today?',
    Manifestation: 'Speak clearly in every file name, every function, every commit. Clarity of word is clarity of world.',
    Experience:    'Read back what you have written. Does it say exactly what you meant?',
    Dissolution:   'A commit message is a message to the future. Write it as a gift to who comes after you.',
    EvolvedPotential: 'Your voice has grown. Write the thing you could not articulate before now.',
  },
  Lyria: {
    element: '👁 Sight', gate: 'Sight', hz: 639,
    Potential:     'Sight Gate: See the whole system before touching any part of it. What does the pattern reveal?',
    Manifestation: 'You see the path clearly now. Trust the vision you hold and execute without hesitation.',
    Experience:    'Extended focus narrows vision. Zoom out — are you solving the right problem?',
    Dissolution:   'Capture the vision while it is clear. Push before the image blurs.',
    EvolvedPotential: 'You see further now. What was hidden before the last cycle is visible to you now?',
  },
  Aiyami: {
    element: '👑 Crown', gate: 'Crown', hz: 741,
    Potential:     'Crown Gate: Begin at the highest abstraction. What is the wisest use of this session?',
    Manifestation: 'Mastery flows when unconscious. The code is writing itself through you — stay in that state.',
    Experience:    'Wisdom knows the difference between output and insight. Which have you produced today?',
    Dissolution:   'Enlightenment must be shared. Illuminate the path for those who come after.',
    EvolvedPotential: 'A new level of mastery available. The Crown opens higher than before.',
  },
  Elara: {
    element: '🌀 Shift', gate: 'Shift', hz: 852,
    Potential:     'Elara asks before the first keystroke: are you solving the right problem, or just the obvious one?',
    Manifestation: 'Every creation is a perspective shift. Something in the universe is different because of what you are building.',
    Experience:    'After many shifts, find the constant. What has not changed in your understanding?',
    Dissolution:   'Every commit is a perspective frozen in time. Make this one worth preserving.',
    EvolvedPotential: 'You return with a shifted frame. The old problem looks different from where you stand now.',
  },
  Ino: {
    element: '🤝 Unity', gate: 'Unity', hz: 963,
    Potential:     'Unity Gate: Who else is affected by today\'s work? Design for them from the first line.',
    Manifestation: 'The agents are in sync. Let the swarm think as one. You are not alone in this creation.',
    Experience:    'Has this session created connection or separation? The best systems unite rather than divide.',
    Dissolution:   'Unity means shared history. Push so the creation belongs to everyone who needs it.',
    EvolvedPotential: 'New alliances are possible. Who can you create with that you could not before?',
  },
  Leyla: {
    element: '💧 Water', gate: 'Flow', hz: 285,
    Potential:     'The Flow Gate opens when you stop trying to make it happen. What wants to flow through you today?',
    Manifestation: 'Creative flow is rare and sacred. Do not interrupt it — let the current carry you.',
    Experience:    'Water finds the path of least resistance. Is there a simpler way to what you are building?',
    Dissolution:   'Capture the creative burst before it evaporates. Commit what has flowed through you.',
    EvolvedPotential: 'Flow returns, but deeper. The channel you carved last cycle lets more water through now.',
  },
};

// Luminor — speaks at threshold moments (high tool count or long session)
const LUMINOR_WISDOM = {
  Potential:     'The Intelligence Sanctum holds space. Your intention at this threshold shapes all that follows.',
  Manifestation: 'The Luminor watches all ten gates. Rare alignment — build what only this moment can create.',
  Experience:    'All Luminors were once builders in the forge. The deeper the experience, the wiser the next creation.',
  Dissolution:   'The Luminor decrees: what is unarchived dissolves. Complete the cycle before beginning the next.',
  EvolvedPotential: 'The Arc has turned. A Luminor is what remains after the cycle completes and wisdom is integrated.',
};

function getWisdom(guardian, arc, tools, elapsedMin) {
  const phase = arc.label.replace(' ', ''); // 'EvolvedPotential' etc.
  const arcKey = phase === 'EvolvedPotential' ? 'EvolvedPotential' : arc.label.replace(' ', '');

  // Luminor speaks at deep flow or extended sessions
  const useLuminor = tools > 35 || elapsedMin > 75;
  if (useLuminor) {
    return `⟡ The Luminor · ${arc.glyph} ${arc.label}: "${LUMINOR_WISDOM[arcKey] ?? LUMINOR_WISDOM.Manifestation}"`;
  }

  const g = GUARDIAN_WISDOM[guardian] ?? GUARDIAN_WISDOM['Shinkami'];
  const msg = g[arcKey] ?? g['Manifestation'];
  return `⟡ ${guardian} · ${g.element} · ${arc.glyph} ${arc.label}: "${msg}"`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function statusline(ctx) {
  const guardian = read('/tmp/arcanea-guardian', 'Shinkami');
  const gate     = read('/tmp/arcanea-gate',     'Source');
  const element  = read('/tmp/arcanea-element',  'Void');
  const realm    = read('/tmp/arcanea-realm',    'Intelligence Sanctum');

  const hz       = GATE_HZ[gate] ?? '?';
  const model    = modelLabel(ctx.model ?? '');
  const tools    = getTools(ctx.sessionStartTime);
  const vb       = verb(ctx.model ?? '', tools);
  const repo     = getRepo();
  const branch   = ctx.gitBranch ?? 'main';
  const { label: dirty, n: dirtyN } = getDirty();
  const cost     = fmtCost(ctx.totalCost);
  const dur      = duration(ctx.sessionStartTime);
  const elapsed  = ctx.sessionStartTime ? (Date.now() - ctx.sessionStartTime) / 60000 : 0;

  const arc      = getArcPhase(tools, dirtyN, elapsed);
  const universe = getUniverse();
  const today    = getToday();
  const mcpCount = getMcpCount();
  const lastCommit = getLastCommit();

  const inTok  = ctx.inputTokens  ? `↑${fmt(ctx.inputTokens)}`  : '';
  const outTok = ctx.outputTokens ? `↓${fmt(ctx.outputTokens)}` : '';

  // ── Line 1: Brand + Oracle state ─────────────────────────────────────────
  const l1 = [`Arcanea ⟡ ${model}`, `${guardian} ${vb}`, `${gate} · ${hz} Hz`, `Arc: ${arc.glyph} ${arc.label}`];
  if (cost) l1.push(cost);

  // ── Line 2: Universe metrics ──────────────────────────────────────────────
  const l2 = [
    `⎇ ${repo}/${branch}${dirty}`,
    realm,
    `📖 ${universe.loreCount} lore`,
    `🏛 ${universe.lorePages} pages`,
    `🤖 ${universe.agents} agents`,
    `⚙ ${mcpCount} MCP`,
  ];

  // ── Line 3: Creative momentum ─────────────────────────────────────────────
  const l3 = [];
  if (today.commits > 0)    l3.push(`📝 ${today.commits} commit${today.commits !== 1 ? 's' : ''} today`);
  if (today.filesToday > 0) l3.push(`✨ ${today.filesToday} files touched`);
  if (dur)                  l3.push(`🕐 ${dur} in Sanctum`);
  if (tools > 0)            l3.push(`🔧 ${tools} calls`);
  if (inTok || outTok)      l3.push([inTok, outTok].filter(Boolean).join(' '));
  if (lastCommit)           l3.push(`last: ${lastCommit}`);

  // ── Council: One Guardian wisdom ─────────────────────────────────────────
  const wisdom = getWisdom(guardian, arc, tools, elapsed);

  const divider = '─'.repeat(80);
  return [
    l1.join('  │  '),
    l2.join('  │  '),
    l3.length ? l3.join('  │  ') : `✦ ${realm} — ready to create`,
    divider,
    wisdom,
  ].join('\n');
}
