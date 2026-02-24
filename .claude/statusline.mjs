/**
 * Arcanea Intelligence OS — Claude Code Statusline v2.0
 *
 * Line 1: Arcanea ⟡ {model}  │  {guardian} {verb}  │  {gate} · {hz} Hz  │  {element}  │  {cost}
 * Line 2: ⎇ {repo}/{branch}{dirty}  │  {realm}  │  ⚙ {mcp}  │  🪝 {hooks}  │  🧠 {intel}{trend}  │  🔧 {tools}  │  ↑{in} ↓{out}  │  {duration}
 */

import { execSync, spawnSync } from 'child_process';
import { readFileSync, existsSync, statSync } from 'fs';

// ─── Utils ──────────────────────────────────────────────────────────────────

const read  = (p, fb = '') => { try { return readFileSync(p, 'utf-8').trim(); } catch { return fb; } };
const readJ = (p, fb = {}) => { try { return JSON.parse(readFileSync(p, 'utf-8')); } catch { return fb; } };
const fmt   = n => n >= 1e6 ? `${(n/1e6).toFixed(1)}M` : n >= 1e3 ? `${(n/1e3).toFixed(1)}K` : String(n);
const mins  = ms => { const s = Math.floor(ms/1000); const m = Math.floor(s/60); return m > 0 ? `${m}m` : `${s}s`; };

// ─── Canon: Gate Frequencies ────────────────────────────────────────────────

const GATE_HZ = {
  Foundation: 174, Flow: 285, Fire: 396, Heart: 417,
  Voice: 528, Sight: 639, Crown: 741, Shift: 852,
  Unity: 963, Source: 1111,
};

const ELEMENT_GLYPH = {
  Fire: '🔥', Water: '💧', Earth: '🌿', Wind: '🌬',
  Void: '✦ Void', Spirit: '✧ Spirit',
};

// ─── Guardian → verb (based on model tier + activity) ───────────────────────

function getVerb(model, toolCount) {
  // Tier-based primary verb
  if (model.includes('opus'))   return 'orchestrates';
  if (model.includes('haiku'))  return 'observes';
  // Sonnet — activity-based
  if (toolCount >= 30) return 'forges';
  if (toolCount >= 15) return 'builds';
  if (toolCount >= 5)  return 'crafts';
  return 'creates';
}

// ─── Model label ────────────────────────────────────────────────────────────

function modelLabel(raw) {
  if (!raw) return 'Sonnet';
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
  return raw.replace('claude-','').split('-20')[0];
}

// ─── Repo from git remote (cached 60s) ──────────────────────────────────────

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

// ─── Git dirty indicator (cached 10s) ───────────────────────────────────────

let _dirty = '', _dirtyAt = 0;
function getDirty() {
  if (Date.now() - _dirtyAt < 10_000) return _dirty;
  try {
    const r = execSync('git status --porcelain 2>/dev/null | grep -v "^??" | wc -l', {
      encoding:'utf-8', timeout:800
    }).trim();
    _dirty = parseInt(r,10) > 0 ? ` ●${r}` : '';
  } catch { _dirty = ''; }
  _dirtyAt = Date.now();
  return _dirty;
}

// ─── Tool call count from session log ───────────────────────────────────────

function getToolCount() {
  try {
    const log = read('/tmp/arcanea-session/tool-count', '0');
    return parseInt(log, 10) || 0;
  } catch { return 0; }
}

// ─── MCP count (all sources, cached 30s) ────────────────────────────────────

let _mcp = 0, _mcpAt = 0;
function getMcp() {
  if (Date.now() - _mcpAt < 30_000) return _mcp;
  const paths = [
    '/home/frankx/.claude/settings.json',
    '/home/frankx/.claude/mcp.json',
    `${process.env.HOME}/.claude/settings.json`,
    `${process.env.HOME}/.claude/mcp.json`,
  ];
  const seen = new Set();
  for (const p of paths) {
    const d = readJ(p);
    for (const k of Object.keys(d.mcpServers ?? {})) seen.add(k);
  }
  // Claude.ai integration MCPs are deferred tools — count distinct prefixes
  // mcp__claude_ai_Slack, mcp__claude_ai_Notion, mcp__claude_ai_Vercel,
  // mcp__claude_ai_Figma, mcp__claude_ai_Zapier, mcp__claude_ai_Miro,
  // mcp__v0, mcp__arcanea-infogenius (8 known integrations)
  const CLAUDE_AI_MCPS = 8;
  _mcp = seen.size + CLAUDE_AI_MCPS;
  _mcpAt = Date.now();
  return _mcp;
}

// ─── Hooks count (cached) ────────────────────────────────────────────────────

let _hooks = null;
function getHooks() {
  if (_hooks !== null) return _hooks;
  try {
    const r = spawnSync('sh', ['-c', 'ls /mnt/c/Users/frank/Arcanea/.claude/hooks/ 2>/dev/null | wc -l'],
      { encoding:'utf-8', timeout:500 });
    _hooks = parseInt(r.stdout.trim(), 10) || 13;
  } catch { _hooks = 13; }
  return _hooks;
}

// ─── Intelligence % + trend (cached 20s) ────────────────────────────────────

let _intel = 75, _intelPrev = 75, _intelAt = 0;
function getIntel() {
  if (Date.now() - _intelAt < 20_000) return { val: _intel, trend: _intelTrend() };
  _intelPrev = _intel;
  const d = readJ('/mnt/c/Users/frank/Arcanea/.claude-flow/.trend-cache.json');
  _intel = d.intelligence ?? 75;
  _intelAt = Date.now();
  return { val: _intel, trend: _intelTrend() };
}
function _intelTrend() {
  if (_intel > _intelPrev) return '↑';
  if (_intel < _intelPrev) return '↓';
  return '';
}

// ─── Vault count (cached 60s) ────────────────────────────────────────────────

let _vault = 0, _vaultAt = 0;
function getVault() {
  if (Date.now() - _vaultAt < 60_000) return _vault;
  try {
    const r = spawnSync('python3', ['-c',
      `import sqlite3; db=sqlite3.connect('/home/frankx/.arcanea/agentdb.sqlite3'); ` +
      `c=db.cursor(); c.execute('SELECT COUNT(*) FROM vault_entries'); print(c.fetchone()[0]); db.close()`
    ], { encoding:'utf-8', timeout:800 });
    _vault = parseInt(r.stdout.trim(), 10) || 0;
  } catch { _vault = 0; }
  _vaultAt = Date.now();
  return _vault;
}

// ─── Cost formatter ──────────────────────────────────────────────────────────

function fmtCost(c) {
  if (!c || c < 0.0001) return null;
  return c >= 1 ? `$${c.toFixed(2)}` : `$${c.toFixed(4)}`;
}

// ─── Duration ────────────────────────────────────────────────────────────────

function duration(startMs) {
  if (!startMs) return null;
  const s = Math.floor((Date.now() - startMs) / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  if (h > 0)  return `${h}h${String(m).padStart(2,'0')}m`;
  if (m > 0)  return `${m}m${String(ss).padStart(2,'0')}s`;
  return `${ss}s`;
}

// ─── Intelligence bar (5-block) ──────────────────────────────────────────────

function intelBar(pct) {
  const filled = Math.round(pct / 20); // 0-5
  return '█'.repeat(filled) + '░'.repeat(5 - filled);
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function statusline(ctx) {
  // State files
  const guardian = read('/tmp/arcanea-guardian', 'Shinkami');
  const gate      = read('/tmp/arcanea-gate',     'Source');
  const element   = read('/tmp/arcanea-element',  'Void');
  const realm     = read('/tmp/arcanea-realm',    'Intelligence Sanctum');
  const focus     = read('/tmp/arcanea-focus',    '');

  // Derived
  const hz        = GATE_HZ[gate] ?? '?';
  const elGlyph   = ELEMENT_GLYPH[element] ?? `✦ ${element}`;
  const model     = modelLabel(ctx.model ?? '');
  const toolCount = getToolCount();
  const verb      = getVerb(ctx.model ?? '', toolCount);
  const repo      = getRepo();
  const branch    = ctx.gitBranch ?? 'main';
  const dirty     = getDirty();
  const mcp       = getMcp();
  const hooks     = getHooks();
  const { val: intel, trend } = getIntel();
  const vault     = getVault();
  const cost      = fmtCost(ctx.totalCost);
  const dur       = duration(ctx.sessionStartTime);

  const inTok  = ctx.inputTokens  ? `↑${fmt(ctx.inputTokens)}`  : '';
  const outTok = ctx.outputTokens ? `↓${fmt(ctx.outputTokens)}` : '';

  // ── Line 1: Oracle state ──────────────────────────────────────────────────
  const l1 = [
    `Arcanea ⟡ ${model}`,
    `${guardian} ${verb}`,
    `${gate} · ${hz} Hz`,
    elGlyph,
  ];
  if (cost) l1.push(cost);
  if (focus) l1.push(`↳ ${focus}`);

  // ── Line 2: Mission control ───────────────────────────────────────────────
  const l2 = [
    `⎇ ${repo}/${branch}${dirty}`,
    realm,
    `⚙ ${mcp} MCP`,
    `🪝 ${hooks} hooks`,
    `🧠 [${intelBar(intel)}] ${intel}%${trend}`,
    `🗄 ${vault}`,
  ];
  if (toolCount > 0) l2.push(`🔧 ${toolCount} calls`);
  if (inTok || outTok) l2.push([inTok, outTok].filter(Boolean).join(' '));
  if (dur) l2.push(dur);

  return l1.join('  │  ') + '\n' + l2.join('  │  ');
}
