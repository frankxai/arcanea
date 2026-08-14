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
// "Shift". Frank ruled on 2026-08-14 that the vault is canonical and "Shift" is
// drift, so the vault needed no edit and every other file is what moves.
// "Shift" therefore stays an alias — it resolves for the frequency check, so a
// "Shift Gate — 1111 Hz" line still errors on the number — but writing the name
// is now an ERROR rather than a WARN. Safe because the CI run is a ratchet on
// newly added lines: the ~30 pre-existing files fail nothing until issue #98
// sweeps them, while no NEW line can reintroduce the drift.
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
  /(^|\/)(\.arcanea\/lore|arcanea-lore|book|lore|sync\/aios\/lore|docs\/worldbuilding)\//;

// Instruction files carry canon tables and no lore word in their names, so
// neither pattern above reaches them. That made the single most drift-prone
// file in the repo invisible to the ratchet: .claude/CLAUDE.md holds 17 errors
// today (the whole Gate ladder shifted one position, in two duplicate tables)
// and is what every agent reads at session start. A ratchet that cannot see the
// file agents learn canon from is not a ratchet.
const LORE_NAMED = /(^|\/)(CLAUDE|AGENTS|GEMINI)\.md$/;
// Matches anywhere in the PATH, not just the basename — `lore/notes.md` and
// `guardians/index.md` are both lore-bearing even though neither basename says so.
const LORE_HINT = /(canon|lore|guardian|godbeast|mythology|gates?)/i;

// Path heuristics cannot enumerate where canon hides. Round 7 widened the CI
// trigger to .mjs after finding four real errors in
// packages/chrome-extension/tests/chrome-extension.test.mjs — but that path
// matches none of the patterns above, so the linter kept skipping it anyway.
// The trigger and the selector disagreed and nothing noticed.
//
// So: names decide fast, content decides the rest. Over-selecting is cheap and
// safe (the checks are themselves near-zero-false-positive, and a selected file
// with no drift simply reports nothing); under-selecting is the failure that
// looks identical to success. Bias wide.
const CANON_TOKENS = new RegExp(
  [
    ...Object.keys(GODBEASTS),
    ...Object.values(GODBEASTS),
    ...Object.keys(SUPERSEDED),
    'godbeast',
    '\\d{3,4}\\s*Hz',
  ].join('|'),
  'i'
);

function looksLoreBearing(path) {
  try {
    return CANON_TOKENS.test(readFileSync(path, 'utf8'));
  } catch {
    return false;
  }
}

function isLoreFile(path) {
  if (!LORE_EXT.test(path)) return false;
  if (LORE_PATH.test(path) || LORE_HINT.test(path) || LORE_NAMED.test(path)) return true;
  return looksLoreBearing(path);
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
// against present canon is a category error, so those rows are exempt from
// every canon-assertion check.
//
// The exemption requires BOTH a date-led row and a log section heading above
// it. Date-shape alone used to be enough, which made a date prefix a universal
// bypass: `| 2026-08-14 | The Foundation Gate is 963 Hz. |` in any ordinary
// table skipped frequency, superseded-name, pairing and lock-claim checks
// alike. An exemption keyed on shape rather than on context is the widest hole
// a drift linter can have, because it is spelled the same as a normal row.
//
// Safe to require the heading: every log in the corpus carries one —
// `## APPROVAL LOG` in CANON_LOCKED.md and MAGIC_SYSTEM.md, `## STAGING LOG` in
// THE_UNMARRED.md, ARBOR_OF_FIRST_LIGHT.md, KINGDOM_OF_PROOF.md — and the skill
// mandates that shape for new files.
const LOG_ROW = /^\s*\|\s*\d{4}-\d{2}-\d{2}\s*\|/;
const LOG_HEADING = /^#{1,6}\s+.*\b((staging|approval|change|revision)\s*log|changelog|log\s*format)\b/i;

function isHistoricalRecord(line, inLogSection) {
  return inLogSection && LOG_ROW.test(line);
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

    // Every assignment on the line, not just the first. `line.match` returns
    // one match, so a correct pairing earlier in the line hid a superseded one
    // later: `{"beast":"veloura","godbeast":"thessara"}` read clean while
    // `{"godbeast":"thessara"}` errored. Compact JSON and TS object literals
    // are both in LORE_EXT, so that shape is reachable, and it is the same
    // first-match-only defect R16 fixed in checkGateFrequency.
    for (const pattern of ASSIGNMENT_PATTERNS) {
      for (const m of line.matchAll(new RegExp(pattern.source, `${pattern.flags}g`))) {
        if (m[2] && m[2].toLowerCase() === stale) assigned = true;
      }
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
// Returns the earliest index at which this gate is named in Gate context, or -1.
// Position matters, not just presence: with several Hz values on one line, each
// belongs to the nearest Gate mention preceding it.
function gateMentionIndex(lower, gate) {
  const forms = [
    new RegExp(`\\b${gate}\\s+gate\\b`),
    new RegExp(`\\bgate\\s+of\\s+(the\\s+)?${gate}\\b`),
    // "Gate 1: Foundation", "Gate: Crown" — a labelled list, which is how
    // guardians.md writes the whole ladder. Omitting this form cost real
    // detection: tightening for the "House voice" false positive silently took
    // guardians.md from 10 errors to clean. The literal word "gate" immediately
    // before the name keeps it specific.
    new RegExp(`\\bgate\\s*\\d*\\s*[:\\-–—]\\s*${gate}\\b`),
    // Reversed order: "the Gate Starweave", "Gate Crown rings at ...". Safe to
    // add because the literal word "gate" must sit immediately before the name,
    // which is what keeps the ordinary-English cases ("House voice", "the source
    // of") silent. Both examples above were real undetected frequency errors.
    new RegExp(`\\bgate\\s+${gate}\\b`),
  ];
  let best = -1;
  for (const form of forms) {
    const m = lower.match(form);
    if (m && (best === -1 || m.index < best)) best = m.index;
  }
  if (lower.includes('|')) {
    let pos = 0;
    for (const cell of lower.split('|')) {
      if (cell.trim().replace(/[*_`]/g, '') === gate && (best === -1 || pos < best)) best = pos;
      pos += cell.length + 1;
    }
  }
  return best;
}

// Boolean form of the same question. Deliberately a one-line wrapper rather than
// a second copy of the forms: the two were duplicated verbatim, and two lists of
// regexes that must stay identical are precisely the drift this linter exists to
// catch. One list, one place to edit.
// Markdown emphasis sits between the name and the word "Gate" often enough to
// matter: `**Starweave** Gate opens at 963 Hz` was not recognised as Gate
// context at all, so a wrong frequency went unreported. Replaced with spaces
// rather than removed, because every index the frequency attribution derives is
// an offset into this string — deleting characters would slide them.
const normaliseEmphasis = (line) => line.toLowerCase().replace(/[*_`]/g, ' ');

const namesGate = (lower, gate) => gateMentionIndex(lower, gate) !== -1;

// Same forms, last match instead of first. Used for owner attribution, where
// "nearest preceding the number" is the question; gateMentionIndex answers
// "does this Gate appear at all, and where first", which is the right question
// for namesGate and the wrong one for ownership.
function gateMentionIndexLast(lower, gate) {
  let best = -1;
  let from = 0;
  for (;;) {
    const idx = gateMentionIndex(lower.slice(from), gate);
    if (idx === -1) break;
    best = from + idx;
    from = best + 1;
  }
  return best;
}

// Until Frank's 2026-08-14 ruling this fired only inside checkGateFrequency,
// which returns early on any line without a frequency — so a bare "the Shift
// Gate" went unreported. That narrowness was deliberate while the name was an
// open question: a warning nobody could act on is noise. The ruling makes it
// actionable, so the check now runs on every line.
//
// It stays specific rather than broad: gateMentionIndex requires literal Gate
// context ("Shift Gate", "Gate of Shift", "Gate 8: Shift", a lone table cell),
// so the ordinary verb and noun — "shift the burden", "a shift in perspective",
// "form: \"Shift\"" in a name ledger — are all silent. Swept the whole repo
// before keeping it: every hit is a real Gate reference, zero false positives.
function checkGateName(path, lineNo, line) {
  const lower = normaliseEmphasis(line);
  for (const [alias, canonicalName] of Object.entries(GATE_ALIASES)) {
    if (!namesGate(lower, alias)) continue;
    report(
      'ERROR',
      path,
      lineNo,
      'gate-name',
      `CANON_LOCKED.md names the ${GATE_FREQUENCIES[canonicalName]} Hz Gate "${canonicalName}", not "${alias}" (ruled 2026-08-14: the vault is canonical). Tracked repo-wide as #98.`
    );
  }
}

function checkGateFrequency(path, lineNo, line) {
  if (!HZ.test(line)) return;
  let lower = normaliseEmphasis(line);

  // Resolve alias names before matching frequencies, so the Hz attribution below
  // sees the canonical Gate name. Reporting happens in checkGateName, which runs
  // on every line rather than only lines carrying a frequency — see the note
  // there. Kept silent here so one drifted name is not reported twice.
  for (const [alias, canonicalName] of Object.entries(GATE_ALIASES)) {
    if (namesGate(lower, alias)) {
      lower = lower.replace(new RegExp(`\\b${alias}\\b`, 'g'), canonicalName);
    }
  }

  // Every Hz on the line, not just the first, and matched AFTER the alias
  // rewrite above so the indices line up with the string being sliced. Both
  // were bugs: `| Unity | 963 Hz | Crown | 400 Hz |` checked only 963 and let a
  // real Crown error through, and the old code captured hz.index from the
  // pre-rewrite string then sliced the post-rewrite one, which shifts by four
  // characters per "shift"→"starweave" substitution earlier in the line.
  //
  // Ownership is by proximity: a frequency belongs to the nearest Gate mention
  // preceding it. Both blunt alternatives were tried and both were wrong —
  // presence of Gate-context names alone blames the wrong gate
  // (CONTINUITY_AUDIT.md:329 quotes Voice's 528 Hz while discussing Foundation),
  // and bare-name counting suppresses real errors ("the source remains unclear"
  // silencing a Crown error).
  for (const m of lower.matchAll(/(\d{3,4})\s*hz\b/g)) {
    const value = Number(m[1]);

    // The nearest Gate mention PRECEDING this number, which is what the comment
    // on gateMentionIndex promises. It returns the earliest mention anywhere, so
    // a repeated Gate name lost ownership to a different Gate that happened to
    // sit later: in "The Voice Gate and the Foundation Gate differ; the Voice
    // Gate holds 900 Hz", Voice's earliest mention is index 4, Foundation's is
    // later, so Foundation won — and the hijacker check then saw Voice between
    // Foundation and the number and swallowed the finding. 900 Hz is wrong for
    // both Gates and was reported for neither. Searching only the prefix and
    // taking the LAST match makes "nearest preceding" literally true.
    const prefix = lower.slice(0, m.index);
    let owner = null;
    let ownerIndex = -1;
    for (const gate of Object.keys(GATE_FREQUENCIES)) {
      const idx = gateMentionIndexLast(prefix, gate);
      if (idx !== -1 && idx > ownerIndex) {
        owner = gate;
        ownerIndex = idx;
      }
    }
    if (!owner) continue;
    if (value === GATE_FREQUENCIES[owner]) continue;

    // There used to be a "hijacker" guard here, skipping the line when a
    // different Gate appeared between the owner and the number. It was needed
    // while ownership came from each Gate's EARLIEST mention, because a
    // repeated name could lose the race to a Gate that merely sat later.
    // Switching ownership to gateMentionIndexLast over the prefix subsumed it:
    // ownerIndex is now the maximum last-mention position across all ten Gates
    // within that prefix, so a Gate mentioned between ownerIndex and the number
    // would have a later last-mention and would have won the argmax instead.
    // The span is provably empty of other Gates.
    //
    // Verified rather than reasoned about: deleting the branch left all 58
    // fixtures green and the full-repo sweep byte-identical at 723 findings.
    // Removed instead of kept-with-a-comment because dead code carrying a
    // stale rationale in the most delicate function here is how the next
    // person concludes the guard is load-bearing and builds on it.

    report(
      'ERROR',
      path,
      lineNo,
      'gate-frequency',
      `${owner} Gate is ${GATE_FREQUENCIES[owner]} Hz in CANON_LOCKED.md, not ${value} Hz.`
    );
  }
}

// A god paired with the wrong godbeast.
// Prose stating a pairing outright: "Elara's godbeast is Kaelith". Narrow on
// purpose — the possessive plus the literal word "godbeast" plus a present-tense
// copula is an assignment position, the same standard the superseded-name check
// uses, and it does not reach comparisons, questions, or past-tense history
// ("Elara's godbeast was Thessara" is a true sentence about a rename).
//
// Added because #98's completion test is "full-repo lore-lint clean", and a
// table-only pairing check makes that test quieter than it sounds: a wrong
// pairing written as a sentence would survive the sweep and read as swept.
const PROSE_PAIRING =
  /\b([a-z]+)['’]s\s+godbeast\s+(?:is|remains)\s+\*{0,2}([a-z]+)/i;

function checkProsePairing(path, lineNo, line) {
  // Every pairing on the line. Single-match let a correct pairing shield a
  // wrong one behind it: "Aiyami's godbeast is Sol, and Elara's godbeast is
  // Kaelith" read clean. Same first-match-only defect as checkSupersededNames.
  for (const m of line.matchAll(new RegExp(PROSE_PAIRING.source, `${PROSE_PAIRING.flags}g`))) {
    const god = m[1].toLowerCase();
    const named = m[2].toLowerCase();
    const beast = GODBEASTS[god];
    if (!beast) continue;
    if (named === beast.toLowerCase()) continue;
    // A superseded name in this position is the drift #98 exists for, and it
    // fell between both checks: checkSupersededNames needs a literal ":" or "="
    // after the key, and "godbeast is Thessara" has the word "is" there, so it
    // matched nothing — while this check used to skip any name absent from
    // GODBEASTS on the grounds that "superseded names are the other check's
    // job." They are not, in this shape. `Elara's godbeast is Thessara` read
    // clean; `**Godbeast**: Thessara` errored. That matters because #98's
    // completion test is a full-repo lint run, so the sweep could have reported
    // done with sentence-form superseded names still live — the exact failure
    // this function was added to close, one case over.
    if (SUPERSEDED[named]) {
      // Files whose job is to record the supersession are exempt, same as in
      // checkSupersededNames — otherwise NAMING_REGISTRY.md fails for doing its
      // job. Gate frequency and pairing checks still apply to them.
      if (!allowsSupersededNames(path)) {
        report(
          'ERROR',
          path,
          lineNo,
          'superseded-name',
          `"${named}" is superseded canon. Current: ${SUPERSEDED[named]}. See issue #98.`
        );
      }
      continue;
    }

    // Otherwise only fire when the named beast is itself a canonical godbeast.
    // An unknown word here is a new creature or a typo, neither of which this
    // check can adjudicate.
    const wrong = Object.values(GODBEASTS).find((b) => b.toLowerCase() === named);
    if (!wrong) continue;
    report('ERROR', path, lineNo, 'godbeast-pairing', `${god} is bonded to ${beast}, not ${wrong}.`);
  }
}

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
  // Adjacency, not two independent facts on one line. The looser form matched
  // "Status: LOCKED ✅ — this document is superseded by the vault", which
  // asserts the opposite of a lock claim. The gap excludes sentence breaks so
  // the phrase has to actually be "this document is … LOCKED".
  // The trailing ✅/: requirement was punctuation coupling, not meaning: it let
  // "This document is now LOCKED." through. Dropping it needs a negation guard,
  // though — without one, "This section is not LOCKED" starts firing, which
  // inverts the rule.
  // The contraction matters: "isn't LOCKED" leaves "n't " in the gap, which
  // contains no literal "not", so a word-boundary negation test passes it
  // straight through and warns that the file claims to be locked — the opposite
  // of what it says. Match the apostrophe form explicitly.
  const claim = line.match(/this (document|file|section) is([^.;—]{0,15})LOCKED\b/i);
  // The apostrophe class must carry U+2019 as well as ASCII 0x27: word
  // processors and autocorrect emit the curly form, and prose written
  // elsewhere and pasted in is exactly where "isn't LOCKED" shows up.
  const negated = (gap) => /\b(not|never|no longer)\b/i.test(gap) || /^n['’`]?t\b/i.test(gap.trim());
  if (claim && !negated(claim[2])) {
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

  // One source for the explicit list. It was computed twice — once to select
  // files, once in the usage guard below — and those two must agree or a bare
  // invocation can go green again, which is the failure the guard exists to
  // stop. A guard that can drift from what it guards is not a guard.
  const explicitFiles = argv.filter((a) => !a.startsWith('--') && a !== base);

  let files;
  if (changedMode) {
    let raw = '';
    try {
      raw = git(['diff', '--name-only', '--diff-filter=ACMR', `${base}...HEAD`]);
    } catch {
      // Exit 1, not 0. A green check that inspected zero files is the exact
      // failure this linter exists to prevent, one layer up: "nothing was
      // wrong" and "nothing was looked at" must never render identically.
      // The per-file catch below can afford to warn and continue because the
      // rest of the run still happens; a failure here means no run at all.
      console.error(
        `lore-lint: FATAL could not diff against ${base}, so NOTHING was checked. ` +
          `This is a failure, not a pass — fix the base ref (CI needs fetch-depth: 0) ` +
          `or pass files explicitly for a full audit.`
      );
      process.exit(1);
    }
    files = raw.split('\n').filter(Boolean).filter(isLoreFile);
  } else {
    files = explicitFiles;
  }

  // A bare `node lore-lint.mjs` selected nothing and printed a cheerful
  // "no lore files to check", exit 0 — indistinguishable from a clean audit.
  // The same failure the --changed branch above already guards, one layer down,
  // and the one this whole tool exists to make impossible: a CI step that
  // invoked it without arguments would have gone permanently, silently green.
  // Explicit-but-empty (`--changed` over a diff with no lore in it) is a real
  // pass and stays exit 0; asking for nothing at all is a usage error.
  if (!changedMode && explicitFiles.length === 0) {
    console.error(
      'lore-lint: FATAL no files given and --changed not set, so NOTHING was checked. ' +
        'This is a usage error, not a pass. Pass files explicitly, or use --changed.'
    );
    process.exit(1);
  }

  files = files.filter((f) => !f.startsWith(SELF_PREFIX));
  if (files.length === 0) {
    console.log('lore-lint: no lore files to check.');
    process.exit(0);
  }

  const added = changedMode && !allLines ? addedLinesFor(files, base) : null;

  // The tier banner is a whole-file property, so unlike every other check it
  // cannot be attributed to an added line — which quietly put it outside the
  // ratchet: editing one paragraph of an existing untiered file re-warned about
  // a banner the edit had nothing to do with. That is the "forced to fix
  // everything you touch" behaviour the header promises this tool does not have,
  // and warning about untouched debt is how a linter earns being switched off.
  //
  // So in ratchet mode it applies to files this change CREATED. A new lore file
  // must declare its tier; an existing one without a banner is pre-existing debt
  // (#98), visible in a full audit but not on an unrelated edit. On failure this
  // stays null, which checks every file — over-warning is recoverable, silence
  // is the failure this whole file exists to prevent.
  let createdFiles = null;
  if (added) {
    try {
      createdFiles = new Set(
        git(['diff', '--name-only', '--diff-filter=A', `${base}...HEAD`]).split('\n').filter(Boolean)
      );
    } catch {
      createdFiles = null;
    }
  }

  for (const path of files) {
    let contents;
    try {
      if (!statSync(path).isFile()) continue;
      contents = readFileSync(path, 'utf8');
    } catch {
      continue;
    }

    if (!createdFiles || createdFiles.has(path)) checkTierBanner(path, contents);

    const lines = contents.split('\n');
    // Section state is tracked over EVERY line, before the added-lines filter,
    // or a PR that adds one row to an existing log would not have seen the
    // heading above it and would lose the exemption.
    let inLogSection = false;
    for (let i = 0; i < lines.length; i += 1) {
      const lineNo = i + 1;
      const line = lines[i];
      if (/^#{1,6}\s/.test(line)) inLogSection = LOG_HEADING.test(line);
      if (added && !added.get(path)?.has(lineNo)) continue;
      if (isHistoricalRecord(line, inLogSection)) continue;
      checkSupersededNames(path, lineNo, line);
      checkGateName(path, lineNo, line);
      checkGateFrequency(path, lineNo, line);
      checkGodbeastPairing(path, lineNo, line);
      checkProsePairing(path, lineNo, line);
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
