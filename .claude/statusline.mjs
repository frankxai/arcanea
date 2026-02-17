// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Arcanea Statusline v3.0 — Context-Adaptive Living Display
//
// The statusline SHAPE-SHIFTS based on what you're doing:
//   Writing  → collection, focus character
//   Building → branch +changes, directory, errors
//   Debugging → branch, error context
//   Deploying → target, last status
//   Planning → tasks, realm
//   Reviewing → branch, focus
//
// Base: Arcanea ⟡ Model │ Guardian verb │ Mode │ [adaptive...] │ ✦ Element
// Works as: ESM import (Claude Code) and `node statusline.mjs` (command)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { readFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SYM = "\u27e1"; // ⟡
const SEP = "\u2502"; // │
const STAR = "\u2726"; // ✦
const FALLBACK = `Arcanea ${SYM} Ready`;
const PROJECT = "/mnt/c/Users/frank/Arcanea";

// ── Helpers ──────────────────────────────────────────────────────────────────

async function read(path, fallback = "") {
  try {
    const c = await readFile(path, "utf-8");
    return c.trim() || fallback;
  } catch { return fallback; }
}

function exec(cmd) {
  try {
    return execSync(cmd, { cwd: PROJECT, timeout: 2000, encoding: "utf-8" }).trim();
  } catch { return ""; }
}

// ── Guardian Canon ───────────────────────────────────────────────────────────
// verb: what the Guardian DOES (poetic, one word)
// mode: what YOU'RE doing (plain human language)

const G = {
  Shinkami:    { verb: "observes",  mode: "Orchestrating", element: "Void",  gate: "Source" },
  Lyssandria:  { verb: "grounds",   mode: "Architecting",  element: "Earth", gate: "Foundation" },
  Draconia:    { verb: "forges",    mode: "Building",      element: "Fire",  gate: "Fire" },
  Maylinn:     { verb: "heals",     mode: "Designing",     element: "Earth", gate: "Heart" },
  Alera:       { verb: "judges",    mode: "Reviewing",     element: "Wind",  gate: "Voice" },
  Lyria:       { verb: "sees",      mode: "Planning",      element: "Void",  gate: "Sight" },
  Aiyami:      { verb: "crowns",    mode: "Envisioning",   element: "Void",  gate: "Crown" },
  Elara:       { verb: "shifts",    mode: "Debugging",     element: "Wind",  gate: "Shift" },
  Ino:         { verb: "bridges",   mode: "Collaborating", element: "Water", gate: "Unity" },
  Leyla:       { verb: "weaves",    mode: "Writing",       element: "Water", gate: "Flow" },
};

// ── Git State ────────────────────────────────────────────────────────────────

function gitBranchAndChanges() {
  const branch = exec("git branch --show-current") || "detached";
  const raw = exec("git status --porcelain 2>/dev/null | wc -l");
  const changes = parseInt(raw, 10) || 0;
  return changes > 0 ? `${branch} +${changes}` : branch;
}

// ── Context-Adaptive Segments ────────────────────────────────────────────────
// Each mode surfaces different information based on what matters MOST.

function adaptive(gate, git, realm, focus) {
  const segs = [];

  switch (gate) {
    case "Flow":
      // WRITING: where you're writing, who/what, then git
      if (realm) segs.push(realm);
      if (focus) segs.push(focus);
      segs.push(git);
      break;

    case "Fire":
      // BUILDING: git first (branch matters), then where
      segs.push(git);
      if (realm) segs.push(realm);
      break;

    case "Shift":
      // DEBUGGING: git, where the problem is, focus entity
      segs.push(git);
      if (realm) segs.push(realm);
      if (focus) segs.push(focus);
      break;

    case "Foundation":
      // ARCHITECTING: git, structural context
      segs.push(git);
      if (realm) segs.push(realm);
      break;

    case "Voice":
      // REVIEWING: git, then what you're reviewing
      segs.push(git);
      if (focus) segs.push(focus);
      break;

    case "Sight":
      // PLANNING: git state, then the vision/realm
      segs.push(git);
      if (realm) segs.push(realm);
      break;

    case "Heart":
      // DESIGNING: where you're designing, then git
      if (realm) segs.push(realm);
      segs.push(git);
      break;

    case "Unity":
      // COLLABORATING: git first (branch crucial), then realm
      segs.push(git);
      if (realm) segs.push(realm);
      break;

    case "Crown":
      // ENVISIONING: vision first, then focus, then git
      if (realm) segs.push(realm);
      if (focus) segs.push(focus);
      segs.push(git);
      break;

    default:
      // SOURCE/ORCHESTRATING: git, realm
      segs.push(git);
      if (realm) segs.push(realm);
      break;
  }

  return segs;
}

// ── Main ────────────────────────────────────────────────────────────────────

async function statusline() {
  try {
    const [guardian, realm, focus] = await Promise.all([
      read("/tmp/arcanea-guardian", "Shinkami"),
      read("/tmp/arcanea-realm"),
      read("/tmp/arcanea-focus"),
    ]);

    // Model name
    const raw = process.env.ANTHROPIC_MODEL || process.env.CLAUDE_MODEL || "claude-opus-4-6";
    let model = raw;
    if (raw.includes("opus")) model = "Opus";
    else if (raw.includes("sonnet")) model = "Sonnet";
    else if (raw.includes("haiku")) model = "Haiku";

    // Guardian data
    const g = G[guardian] || G.Shinkami;

    // Git state
    const git = gitBranchAndChanges();

    // Adaptive segments for this mode
    const segs = adaptive(g.gate, git, realm, focus);

    // Assemble: Arcanea ⟡ Model │ Guardian verb │ Mode │ [adaptive...] │ ✦ Element
    const parts = [
      `Arcanea ${SYM} ${model}`,
      `${guardian} ${g.verb}`,
      g.mode,
      ...segs,
      `${STAR} ${g.element}`,
    ];

    return parts.join(` ${SEP} `);
  } catch {
    return FALLBACK;
  }
}

// ── Export + Self-invoke ─────────────────────────────────────────────────────
export default statusline;

// Only self-invoke when run directly as command (`node statusline.mjs`)
// Not when imported via `import()` by Claude Code's ESM loader
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  statusline().then(s => process.stdout.write(s));
}
