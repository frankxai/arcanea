/**
 * Arcanea Intelligence OS — Claude Code Statusline
 *
 * Line 1 (top):  Arcanea ⟡ {model} │ {guardian} │ {gate} │ {element}
 * Line 2 (main): ⟡ {repo} │ {branch} │ {mcp} MCPs │ ⚙ {hooks} hooks │ 🧠 {vault} vault │ ↑{in} ↓{out}
 */

import { execSync, spawnSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';

// ─── Helpers ────────────────────────────────────────────────────────────────

function read(path, fallback = '') {
  try { return readFileSync(path, 'utf-8').trim(); } catch { return fallback; }
}

function readJson(path, fallback = {}) {
  try { return JSON.parse(readFileSync(path, 'utf-8')); } catch { return fallback; }
}

function fmt(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

// ─── Live state ─────────────────────────────────────────────────────────────

function getGuardian() {
  return read('/tmp/arcanea-guardian', 'Shinkami');
}

function getGate() {
  return read('/tmp/arcanea-gate', 'Source');
}

function getElement() {
  const el = read('/tmp/arcanea-element', 'Void');
  // Element → symbol
  const symbols = { Fire: '✦ Fire', Water: '✦ Water', Earth: '✦ Earth', Wind: '✦ Wind', Void: '✦ Void', Spirit: '✦ Spirit' };
  return symbols[el] || `✦ ${el}`;
}

function getModel(ctx) {
  if (!ctx.model) return 'Sonnet';
  const m = ctx.model;
  if (m.includes('opus-4'))   return 'Opus 4';
  if (m.includes('sonnet-4')) return 'Sonnet 4';
  if (m.includes('haiku-4'))  return 'Haiku 4';
  if (m.includes('sonnet'))   return 'Sonnet';
  if (m.includes('opus'))     return 'Opus';
  if (m.includes('haiku'))    return 'Haiku';
  return m.replace('claude-', '').split('-')[0];
}

// ─── Repo detection ─────────────────────────────────────────────────────────

let _repoCache = null;
function getRepo() {
  if (_repoCache) return _repoCache;
  try {
    const remote = execSync('git remote get-url origin 2>/dev/null', { encoding: 'utf-8', timeout: 1000 }).trim();
    const match = remote.match(/\/([^/]+?)(?:\.git)?$/);
    _repoCache = match ? match[1] : 'arcanea';
  } catch {
    _repoCache = 'arcanea';
  }
  return _repoCache;
}

function getBranch(ctx) {
  return ctx.gitBranch || 'main';
}

// ─── MCP count ──────────────────────────────────────────────────────────────

let _mcpCache = null;
let _mcpAt = 0;
function getMcpCount() {
  const now = Date.now();
  if (_mcpCache !== null && now - _mcpAt < 30_000) return _mcpCache;

  // Count from settings files
  const paths = [
    '/home/frankx/.claude/settings.json',
    '/home/frankx/.claude/mcp.json',
    `${process.env.HOME || '/home/frankx'}/.claude/settings.json`,
  ];

  let total = 0;
  const seen = new Set();
  for (const p of paths) {
    try {
      const d = readJson(p);
      const servers = d.mcpServers || {};
      for (const k of Object.keys(servers)) {
        if (!seen.has(k)) { seen.add(k); total++; }
      }
    } catch {}
  }
  // Also check claude.ai MCP tools (deferred tools = connected MCPs)
  // Conservative: count from what we know is connected
  _mcpCache = total || '—';
  _mcpAt = now;
  return _mcpCache;
}

// ─── Hooks count ────────────────────────────────────────────────────────────

let _hooksCache = null;
function getHooksCount() {
  if (_hooksCache) return _hooksCache;
  try {
    const result = spawnSync('ls', ['/mnt/c/Users/frank/Arcanea/.claude/hooks/'], { encoding: 'utf-8', timeout: 500 });
    _hooksCache = (result.stdout || '').split('\n').filter(Boolean).length;
  } catch {
    _hooksCache = 13; // known count
  }
  return _hooksCache;
}

// ─── AgentDB vault ──────────────────────────────────────────────────────────

let _vaultCache = null;
let _vaultAt = 0;
function getVaultCount() {
  const now = Date.now();
  if (_vaultCache !== null && now - _vaultAt < 60_000) return _vaultCache;
  try {
    const result = spawnSync('python3', [
      '-c',
      `import sqlite3; db=sqlite3.connect('/home/frankx/.arcanea/agentdb.sqlite3'); c=db.cursor(); c.execute('SELECT COUNT(*) FROM vault_entries'); print(c.fetchone()[0]); db.close()`
    ], { encoding: 'utf-8', timeout: 1000 });
    _vaultCache = parseInt(result.stdout.trim(), 10) || 0;
  } catch {
    _vaultCache = 0;
  }
  _vaultAt = now;
  return _vaultCache;
}

// ─── Intelligence level ─────────────────────────────────────────────────────

let _intelCache = null;
let _intelAt = 0;
function getIntelligence() {
  const now = Date.now();
  if (_intelCache !== null && now - _intelAt < 30_000) return _intelCache;
  try {
    const d = readJson('/mnt/c/Users/frank/Arcanea/.claude-flow/.trend-cache.json');
    _intelCache = d.intelligence || 75;
  } catch {
    _intelCache = 75;
  }
  _intelAt = now;
  return _intelCache;
}

// ─── Cost ───────────────────────────────────────────────────────────────────

function fmtCost(cost) {
  if (!cost || cost === 0) return null;
  return cost >= 1 ? `$${cost.toFixed(2)}` : `$${cost.toFixed(4)}`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function statusline(ctx) {
  const guardian = getGuardian();
  const gate     = getGate();
  const element  = getElement();
  const model    = getModel(ctx);
  const repo     = getRepo();
  const branch   = getBranch(ctx);
  const mcp      = getMcpCount();
  const hooks    = getHooksCount();
  const vault    = getVaultCount();
  const intel    = getIntelligence();

  // Token row
  const inTok  = ctx.inputTokens  ? `↑${fmt(ctx.inputTokens)}`  : '';
  const outTok = ctx.outputTokens ? `↓${fmt(ctx.outputTokens)}` : '';
  const cost   = fmtCost(ctx.totalCost);

  // ── Line 1: Brand + Oracle state ──────────────────────────────────────────
  const line1Parts = [
    `Arcanea ⟡ ${model}`,
    `${guardian} │ ${gate}`,
    element,
  ];
  if (cost) line1Parts.push(cost);

  // ── Line 2: Dev context + metrics ─────────────────────────────────────────
  const line2Parts = [
    `⎇ ${repo}/${branch}`,
    `⚙ ${mcp} MCP`,
    `🪝 ${hooks} hooks`,
    `🧠 ${intel}%`,
    `🗄 ${vault} vault`,
  ];
  if (inTok || outTok) {
    line2Parts.push([inTok, outTok].filter(Boolean).join(' '));
  }

  return line1Parts.join(' │ ') + '\n' + line2Parts.join('  ');
}
