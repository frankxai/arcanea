#!/usr/bin/env node
// lore-lint.mjs — the model-free half of the lore release gate.
//
// The `lore-release-gate` and `canon-evaluation` skills need a model: they
// judge whether a faction is interesting, whether prose has voice, whether an
// artifact earns its place. This file covers only the subset that is pure
// pattern matching against CANON_LOCKED.md, so it can run in CI on every PR and
// catch canon drift between sessions.
//
//   node lore-lint.mjs <file...>          # explicit files, every line
//   node lore-lint.mjs --changed          # ONLY lines this PR added
//   node lore-lint.mjs --changed --base origin/develop
//   node lore-lint.mjs --changed --all-lines    # whole changed files
//
// Exit 1 if any ERROR fires. WARN never fails the build.
//
// Why this exists: in August 2026 a human reviewer found that two locked
// godbeast renames (Thessara→Vaelith, Amaterasu→Source) had never propagated —
// ~15 files still named the superseded entities as current, including an active
// section of a published Library text. That drift is exactly what a machine can
// see for free and a reviewer can only catch by luck. Issue #98.
//
// `--changed` is a RATCHET, not an audit. The repo has real pre-existing drift
// (see #98) and failing a PR for a line it merely sat next to is how a linter
// gets switched off. You cannot make it worse; you are not forced to fix
// everything you touch. Use `--all-lines`, or pass files explicitly, when you
// actually want the full audit.
//
// Design rule, inherited from web-guidelines-lint.mjs: every check here must be
// near-zero false positive. Judgment calls belong in the skills, not here. A
// name appearing in prose is not a violation — only a name appearing in an
// *assignment* position, claiming to be current canon, is.

import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';

function git(argv, opts = {}) {
  return execFileSync('git', argv, { encoding: 'utf8', ...opts });
}

// ---------------------------------------------------------------------------
// Canon, transcribed from .arcanea/lore/CANON_LOCKED.md (the vault).
// If these disagree with the vault, the vault wins and this file is the bug.
// ---------------------------------------------------------------------------

const GATE_FREQUENCIES = {
  foundation: 174,
  flow: 285,
  fire: 396,
  heart: 417,
  voice: 528,
  sight: 639,
  crown: 741,
  starweave: 852,
  unity: 963,
  source: 1111,
};

// The vault's locked Gate table (CANON_LOCKED.md:62) names the 852 Hz Gate
// "Starweave". Much of the repo — including .claude/CLAUDE.md — calls it
// "Shift", and there is NO rename entry in the vault's approval log. So this is
// an unrecorded divergence, not a logged supersession: the alias still resolves
// for the frequency check (a "Shift Gate — 1111 Hz" line must still error), but
// using the name earns a warning pointing at the vault. Promote to ERROR only
// once a /lock-decision records which name is canonical.
const GATE_ALIASES = { shift: 'starweave' };

const GODBEASTS = {
  lyssandria: 'Kaelith',
  leyla: 'Veloura',
  draconia: 'Draconis',
  maylinn: 'Laeylinn',
  alera: 'Otome',
  lyria: 'Yumiko',
  aiyami: 'Sol',
  elara: 'Vaelith',
  ino: 'Kyuro',
  shinkami: 'Source',
};

// Names that were canon once and are not canon now. Naming these as a current
// entity is the drift this linter exists to stop.
const SUPERSEDED = {
  thessara: 'Vaelith (Elara’s godbeast). "Thessara" is reserved for redeployment — see .arcanea/lore/THESSARA.md',
  amaterasu: 'Source (Shinkami’s godbeast, renamed 2026-03-30)',
};

// Files whose job IS to record the supersession, discuss other franchises, or
// deliberately detect the old spelling. Naming a superseded entity here is
// correct, not drift. Keep this list short and justified.
// Deliberately NOT allowlisted: packages/os/src/canon-validator.ts. Its 714 Hz
// entry is a genuine typo detector, but the file also hard-codes BOTH
// superseded godbeast names as current canon (lines 164, 166) and normalizes
// misspellings *toward* them (lines 327-333, one annotated "// correct"). It
// does not miss the drift; it certifies it. It must be checked.
// SCOPE: this exempts the superseded-name check ONLY. These files legitimately
// name retired entities; they do not get a pass on Gate frequencies, godbeast
// pairings, or tier banners, all of which they can still get wrong.
const SUPERSEDED_ALLOWLIST = [
  '.arcanea/lore/NAMING_REGISTRY.md',       // maintains the superseded inventory
  '.arcanea/lore/THESSARA.md',              // the redeployment proposal itself
  'docs/worldbuilding/research/',           // per-world files discuss other franchises' canon
];

// The linter's own source states every canonical and superseded name as data,
// and its fixtures contain deliberate drift — a superseded godbeast in
// assignment position, a mispaired god, a shifted frequency ladder — precisely
// so the checks can be proven to fire. Both are excluded from every check.
// Without this the linter reports its own test suite as canon drift, which it
// did on the first CI run after the fixtures landed.
const SELF_PREFIX = '.claude/ci/lore-lint';

const LORE_EXT = /\.(md|mdx|ts|tsx|js|mjs|json|yaml|yml)$/;

// Paths that are lore-bearing. Deliberately broad on the lore side (a godbeast
// name hardcoded in a TS constant is exactly as wrong as one in a markdown
// table) and narrow everywhere else.
const LORE_PATH =
  /(^|\/)(\.arcanea\/lore|arcanea-lore|book|lore|sync\/aios\/lore)\//;
// Matches anywhere in the PATH, not just the basename — `lore/notes.md` and
// `guardians/index.md` are both lore-bearing even though neither basename says so.
const LORE_HINT = /(canon|lore|guardian|godbeast|mythology|gates?)/i;

function isLoreFile(path) {
  if (!LORE_EXT.test(path)) return false;
  return LORE_PATH.test(path) || LORE_HINT.test(path);
}

function allowsSupersededNames(path) {
  return SUPERSEDED_ALLOWLIST.some((entry) =>
    entry.endsWith('/') ? path.startsWith(entry) : path === entry
  );
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

const findings = [];

// A changelog/approval-log row records what WAS decided, including decisions
// later reversed — CANON_LOCKED.md's own log contains "Corrected frequencies
// (639 Hz Heart)" from January, superseded that February. Auditing history
// against present canon is a category error, so date-led table rows and
// STAGING LOG entries are exempt from every canon-assertion check.
const LOG_ROW = /^\s*\|\s*\d{4}-\d{2}-\d{2}\s*\|/;

function isHistoricalRecord(line) {
  return LOG_ROW.test(line);
}

function report(level, path, lineNo, rule, message) {
  findings.push({ level, path, lineNo, rule, message });
}

// A superseded name only counts when it sits in an ASSIGNMENT position —
// something claiming "this entity is X". Bare prose mentions ("the name
// Thessara was retired") are legitimate and must never fire.
//
//   **Godbeast**: Thessara          <- fires
//   godbeast: "amaterasu"           <- fires
//   | Shinkami | Amaterasu |        <- fires (god-and-beast table row)
//   godbeast="Thessara"             <- fires
//   the Thessara question           <- silent
const ASSIGNMENT_PATTERNS = [
  // key: value / key = value / key" : "value, with optional markdown emphasis
  /\b(godbeast|beast|companion|bonded)\b\s*\**\s*["']?\s*[:=]\s*["'*\s]*([A-Za-z]+)/i,
];

function checkSupersededNames(path, lineNo, line) {
  if (allowsSupersededNames(path)) return;
  for (const [stale, replacement] of Object.entries(SUPERSEDED)) {
    if (!line.toLowerCase().includes(stale)) continue;

    let assigned = false;

    for (const pattern of ASSIGNMENT_PATTERNS) {
      const m = line.match(pattern);
      if (m && m[2] && m[2].toLowerCase() === stale) assigned = true;
    }

    // A heading naming a superseded entity. You do not title a section after a
    // retired name unless you are presenting it as a current thing — this is
    // how `VII_THE_GODBEAST_CODEX.md` kept an active "Amaterasu" chapter.
    if (!assigned && /^#{1,6}\s/.test(line)) {
      const heading = line.replace(/^#{1,6}\s*/, '').toLowerCase();
      if (new RegExp(`\\b${stale}\\b`).test(heading)) assigned = true;
    }

    // `**Shinkami**: amaterasu, orakis` — a god keyed to a related-entity list
    // that still names the superseded beast.
    if (!assigned) {
      const keyed = line.match(/^\s*[-*]?\s*\**([A-Za-z]+)\**\s*:\s*(.+)$/);
      if (keyed && Object.keys(GODBEASTS).includes(keyed[1].toLowerCase())) {
        const values = keyed[2].toLowerCase();
        if (new RegExp(`\\b${stale}\\b`).test(values)) assigned = true;
      }
    }

    // Markdown table row naming a god and a superseded beast in the same row.
    if (!assigned && line.includes('|')) {
      const cells = line.split('|').map((c) => c.trim().toLowerCase().replace(/\*/g, ''));
      const namesAGod = cells.some((c) => Object.keys(GODBEASTS).includes(c));
      const namesTheStale = cells.some((c) => c === stale);
      if (namesAGod && namesTheStale) assigned = true;
    }

    if (assigned) {
      report(
        'ERROR',
        path,
        lineNo,
        'superseded-name',
        `"${stale}" is superseded canon. Current: ${replacement}. See issue #98.`
      );
    }
  }
}

// A Gate mapped to the wrong frequency. Only fires when a Gate name and a Hz
// value appear on the same line, so prose that mentions a frequency alone is
// silent. This is the check that catches the 714/741 Crown typo class.
const HZ = /(\d{3,4})\s*Hz\b/i;

// Nearly every Gate name is also an ordinary English word — voice, source, flow,
// heart, crown, shift, sight, unity, fire, foundation. Matching them bare turns
// any sentence that happens to use one near a frequency into a false error: the
// line "one legend per House voice ... (174→1111 Hz)" reported the Voice Gate as
// misnumbered. So a name only counts as naming a Gate when it appears in Gate
// context — "the Crown Gate", "Gate of Crown" — or alone in a table cell.
function namesGate(lower, gate) {
  if (new RegExp(`\\b${gate}\\s+gate\\b`).test(lower)) return true;
  if (new RegExp(`\\bgate\\s+of\\s+(the\\s+)?${gate}\\b`).test(lower)) return true;
  if (lower.includes('|')) {
    return lower
      .split('|')
      .map((c) => c.trim().replace(/[*_`]/g, ''))
      .some((c) => c === gate);
  }
  return false;
}

function checkGateFrequency(path, lineNo, line) {
  const hz = line.match(HZ);
  if (!hz) return;
  const value = Number(hz[1]);
  let lower = line.toLowerCase();

  // Resolve unrecorded name divergences before matching, and warn on the name.
  // Gated on the same Gate-context test, so the ordinary verb "shift" is silent.
  //
  // Reach is deliberately narrow: this whole function returns early without a Hz
  // value, so a bare "the Shift Gate" with no frequency nearby is not reported.
  // Catching every unrecorded name divergence would mean matching "shift" in
  // Gate context anywhere, and "shift" is a common enough word near lore prose
  // that the noise would outweigh a WARN nobody can act on until /lock-decision
  // settles the name. Revisit if the Starweave/Shift question is resolved.
  for (const [alias, canonicalName] of Object.entries(GATE_ALIASES)) {
    if (namesGate(lower, alias)) {
      report(
        'WARN',
        path,
        lineNo,
        'gate-name',
        `CANON_LOCKED.md names the ${GATE_FREQUENCIES[canonicalName]} Hz Gate "${canonicalName}", not "${alias}". No rename is recorded in the vault's approval log — resolve via /lock-decision.`
      );
      lower = lower.replace(new RegExp(`\\b${alias}\\b`, 'g'), canonicalName);
    }
  }

  for (const [gate, canonical] of Object.entries(GATE_FREQUENCIES)) {
    if (!namesGate(lower, gate)) continue;
    if (value === canonical) return;
    // A line naming several gates is a table header or a summary; skip it
    // rather than guess which gate the number belongs to.
    const gatesNamed = Object.keys(GATE_FREQUENCIES).filter((g) => namesGate(lower, g));
    if (gatesNamed.length > 1) return;

    report(
      'ERROR',
      path,
      lineNo,
      'gate-frequency',
      `${gate} Gate is ${canonical} Hz in CANON_LOCKED.md, not ${value} Hz.`
    );
    return;
  }
}

// A god paired with the wrong godbeast.
function checkGodbeastPairing(path, lineNo, line) {
  if (!line.includes('|')) return;
  const cells = line.split('|').map((c) => c.trim().replace(/\*/g, ''));
  const lowered = cells.map((c) => c.toLowerCase());

  // A row naming several gods is a full canon table or a comparison row; which
  // beast belongs to which god is a column-correspondence question this line-based
  // check cannot answer. Guessing produces confident false errors — a two-pair row
  // like `| Aiyami | Sol | Ino | Kyuro |` would report BOTH pairings wrong. Skip,
  // matching the same single-subject rule checkGateFrequency uses.
  const godsNamed = Object.keys(GODBEASTS).filter((g) => lowered.includes(g));
  if (godsNamed.length !== 1) return;

  for (const [god, beast] of Object.entries(GODBEASTS)) {
    if (!lowered.includes(god)) continue;
    // Does the row name a DIFFERENT canonical godbeast?
    const wrong = Object.values(GODBEASTS).find(
      (b) => b.toLowerCase() !== beast.toLowerCase() && lowered.includes(b.toLowerCase())
    );
    if (wrong) {
      report(
        'ERROR',
        path,
        lineNo,
        'godbeast-pairing',
        `${god} is bonded to ${beast}, not ${wrong}.`
      );
    }
  }
}

// New lore under .arcanea/lore/ must declare a canon tier. Silence is how
// STAGING content gets mistaken for locked canon six months later.
const TIER_MARKER = /\b(LOCKED|STAGING|EVOLVING|SUPERSEDED)\b/;

function checkTierBanner(path, contents) {
  if (!path.startsWith('.arcanea/lore/')) return;
  if (!path.endsWith('.md')) return;
  if (path.endsWith('CANON_LOCKED.md')) return;
  const head = contents.split('\n').slice(0, 15).join('\n');
  if (!TIER_MARKER.test(head)) {
    report(
      'WARN',
      path,
      1,
      'missing-tier',
      'No canon tier (LOCKED / STAGING / EVOLVING) declared in the first 15 lines.'
    );
  }
}

// Prose asserting that a file is locked canon.
//
// Deliberately NOT a ban on the word LOCKED outside the vault: locked content
// legitimately lives in other files once the Creator has approved it —
// `.arcanea/lore/MAGIC_SYSTEM.md:3` carries "Status: LOCKED ✅ — Approved by
// Frank (Creator) 2026-06-23" and is correct. A status banner records a decision
// that was made; this rule targets running prose that *asserts* lock status,
// which is how a STAGING file talks itself into being treated as canon.
//
// So status banners and tier-vocabulary listings ("LOCKED ✅ / STAGING ⏳") stay
// silent by design, and WARN never fails the build — an agent that has genuinely
// earned a lock should not be blocked by a linter, only asked to show the
// /lock-decision that granted it.
function checkLockClaim(path, lineNo, line) {
  if (path === '.arcanea/lore/CANON_LOCKED.md') return;
  if (/\bLOCKED\s*(✅|:)/.test(line) && /this (document|file|section) is/i.test(line)) {
    report(
      'WARN',
      path,
      lineNo,
      'lock-claim',
      'Prose declaring this file LOCKED. Promotion to locked canon goes through /lock-decision by the Creator; record it in a status banner with the approval date rather than asserting it inline.'
    );
  }
}

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

function addedLinesFor(files, base) {
  // Map of path -> Set of line numbers this diff adds.
  const added = new Map();
  for (const file of files) {
    let diff;
    try {
      diff = git(['diff', '-U0', `${base}...HEAD`, '--', file]);
    } catch (err) {
      // Never fail silently: a file dropping out of --changed with no output
      // looks exactly like "nothing to check", which is the one failure mode a
      // drift linter cannot afford.
      console.error(
        `lore-lint: WARN could not diff ${file} against ${base} (${err.message.trim()}); ` +
          `it was NOT checked. Re-run with the file passed explicitly for a full audit.`
      );
      continue;
    }
    const lines = new Set();
    // 0 means "no hunk seen yet". Everything before the first @@ is file header
    // noise (`diff --git`, `index`, `--- a/`, `+++ b/`) and must not advance the
    // cursor. It happens to be harmless today because every @@ resets the cursor
    // absolutely, but that is an accident of ordering rather than an invariant —
    // so skip headers explicitly instead of relying on it surviving a future
    // edit to the hunk regex.
    let cursor = 0;
    for (const line of diff.split('\n')) {
      const hunk = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/);
      if (!hunk && cursor === 0) continue;
      if (hunk) {
        cursor = Number(hunk[1]);
        continue;
      }
      if (line.startsWith('+') && !line.startsWith('+++')) {
        lines.add(cursor);
        cursor += 1;
      } else if (!line.startsWith('-') && !line.startsWith('\\')) {
        cursor += 1;
      }
    }
    added.set(file, lines);
  }
  return added;
}

function main() {
  const argv = process.argv.slice(2);
  const changedMode = argv.includes('--changed');
  const allLines = argv.includes('--all-lines');
  const baseIdx = argv.indexOf('--base');
  const base = baseIdx !== -1 ? argv[baseIdx + 1] : 'origin/main';

  let files;
  if (changedMode) {
    let raw = '';
    try {
      raw = git(['diff', '--name-only', '--diff-filter=ACMR', `${base}...HEAD`]);
    } catch {
      console.error(`lore-lint: cannot diff against ${base}; nothing checked.`);
      process.exit(0);
    }
    files = raw.split('\n').filter(Boolean).filter(isLoreFile);
  } else {
    files = argv.filter((a) => !a.startsWith('--') && a !== base);
  }

  files = files.filter((f) => !f.startsWith(SELF_PREFIX));
  if (files.length === 0) {
    console.log('lore-lint: no lore files to check.');
    process.exit(0);
  }

  const added = changedMode && !allLines ? addedLinesFor(files, base) : null;

  for (const path of files) {
    let contents;
    try {
      if (!statSync(path).isFile()) continue;
      contents = readFileSync(path, 'utf8');
    } catch {
      continue;
    }

    checkTierBanner(path, contents);

    const lines = contents.split('\n');
    for (let i = 0; i < lines.length; i += 1) {
      const lineNo = i + 1;
      if (added && !added.get(path)?.has(lineNo)) continue;
      const line = lines[i];
      if (isHistoricalRecord(line)) continue;
      checkSupersededNames(path, lineNo, line);
      checkGateFrequency(path, lineNo, line);
      checkGodbeastPairing(path, lineNo, line);
      checkLockClaim(path, lineNo, line);
    }
  }

  if (findings.length === 0) {
    console.log(`lore-lint: clean (${files.length} file${files.length === 1 ? '' : 's'} checked).`);
    process.exit(0);
  }

  const errors = findings.filter((f) => f.level === 'ERROR');
  for (const f of findings) {
    console.log(`${f.level} ${f.path}:${f.lineNo} [${f.rule}] ${f.message}`);
  }
  console.log(
    `\nlore-lint: ${errors.length} error(s), ${findings.length - errors.length} warning(s).`
  );
  process.exit(errors.length > 0 ? 1 : 0);
}

main();
