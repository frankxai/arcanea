#!/usr/bin/env node
// lore-lint.test.mjs — fixtures for the canon linter.
//
//   node --test .claude/ci/lore-lint.test.mjs
//
// The linter's whole value is that it is trusted enough to stay switched on,
// and that rests on one property: near-zero false positives. That property was
// verified by hand when the linter was written, which does not survive the next
// edit. These fixtures lock it in.
//
// Black-box on purpose: fixtures go through the real CLI, so the argument
// handling, file filtering, and reporting path are covered too, not just the
// check functions.

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, readFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const LINT = fileURLToPath(new URL('./lore-lint.mjs', import.meta.url));

// Run the linter over one fixture. Returns { code, out }.
// The filename must look lore-bearing or isLoreFile() filters it out — that is
// itself part of the contract, so one test asserts it directly.
function lint(contents, filename = 'lore-fixture.md') {
  // Neutral prefix on purpose: the linter's LORE_HINT matches anywhere in the
  // path, so a temp dir named "lore-*" would make every fixture look lore-bearing
  // and quietly defeat the non-lore-file test below.
  const dir = mkdtempSync(join(tmpdir(), 'fixture-'));
  const file = join(dir, filename);
  writeFileSync(file, contents, 'utf8');
  try {
    const out = execFileSync('node', [LINT, file], { encoding: 'utf8' });
    return { code: 0, out };
  } catch (err) {
    return { code: err.status, out: `${err.stdout || ''}${err.stderr || ''}` };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// --- must NOT fire (the false-positive guarantee) ---------------------------

test('a multi-pair table row is not flagged', () => {
  // Regression: this reported BOTH pairings wrong before the single-god rule.
  const { code, out } = lint(
    '# Canon\n\n| Gate | God | Beast | Gate | God | Beast |\n|---|---|---|---|---|---|\n' +
      '| Crown | Aiyami | Sol | Unity | Ino | Kyuro |\n'
  );
  assert.equal(code, 0, `expected clean, got:\n${out}`);
  assert.ok(!out.includes('godbeast-pairing'), out);
});

test('the full ten-gate canon table is not flagged', () => {
  const rows = [
    ['Foundation', 174, 'Lyssandria', 'Kaelith'],
    ['Flow', 285, 'Leyla', 'Veloura'],
    ['Fire', 396, 'Draconia', 'Draconis'],
    ['Heart', 417, 'Maylinn', 'Laeylinn'],
    ['Voice', 528, 'Alera', 'Otome'],
    ['Sight', 639, 'Lyria', 'Yumiko'],
    ['Crown', 741, 'Aiyami', 'Sol'],
    ['Starweave', 852, 'Elara', 'Vaelith'],
    ['Unity', 963, 'Ino', 'Kyuro'],
    ['Source', 1111, 'Shinkami', 'Source'],
  ]
    .map(([g, hz, god, beast]) => `| ${g} | ${hz} Hz | ${god} | ${beast} |`)
    .join('\n');
  const { code, out } = lint(`# Canon (LOCKED)\n\n| Gate | Hz | God | Beast |\n|---|---|---|---|\n${rows}\n`);
  assert.equal(code, 0, `expected clean, got:\n${out}`);
});

test('prose mentioning a retired name is not flagged', () => {
  const { code, out } = lint(
    '# Notes (STAGING)\n\nThe name Thessara was retired when the Ten were locked, and Amaterasu\n' +
      'was renamed. Neither is current canon.\n'
  );
  assert.equal(code, 0, `expected clean, got:\n${out}`);
});

test('a dated changelog row recording a superseded decision is not flagged', () => {
  const { code, out } = lint(
    '# Log (LOCKED)\n\n| Date | Change |\n|---|---|\n' +
      '| 2026-01-16 | Corrected frequencies (639 Hz Heart) |\n' +
      '| 2026-03-30 | Amaterasu renamed to Source |\n'
  );
  assert.equal(code, 0, `expected clean, got:\n${out}`);
});

test('a frequency named without a gate is not flagged', () => {
  const { code, out } = lint('# Sound (STAGING)\n\nThe hum measured 714 Hz, which matched nothing.\n');
  assert.equal(code, 0, `expected clean, got:\n${out}`);
});

test('an explicitly named file is checked regardless of its name', () => {
  // Documented contract: `lore-lint <file...>` checks what you name, every line.
  // The isLoreFile() filter applies only to --changed discovery.
  const { code, out } = lint('# Notes (STAGING)\n\n**Godbeast**: Thessara\n', 'notes.md');
  assert.equal(code, 1, out);
  assert.ok(out.includes('superseded-name'), out);
});

test('a Gate name used as an ordinary English word is not flagged', () => {
  // Regression: "House voice" beside a frequency range reported the Voice Gate
  // as misnumbered. Nearly every Gate name is also a common word.
  const cases = [
    'The frequencies (174→1111 Hz) are overtones, one legend per House voice.',
    'Trace the source of the 963 Hz hum.',
    'Let the heart of the piece settle at 432 Hz.',
    'A shift in the 852 Hz reading was recorded.',
  ];
  for (const text of cases) {
    const { code, out } = lint(`# Notes (STAGING)\n\n${text}\n`);
    assert.equal(code, 0, `expected clean for "${text}", got:\n${out}`);
  }
});

test('a labelled Gate list with wrong frequencies is flagged', () => {
  // Regression: tightening namesGate() for the "House voice" false positive
  // silently took guardians.md from 10 findings to clean, because it writes the
  // ladder as "Gate 1: Foundation → ... → 396Hz" — a Gate context none of the
  // original three patterns matched. An FP fix that quietly creates an FN is
  // the worst outcome for a linter, and no fixture caught it.
  const { code, out } = lint(
    '# Guardians (STAGING)\n\nGate 1: Foundation → Lyssandria (Earth) → 396Hz\n' +
      'Gate 3: Fire → Draconia (Fire) → 528Hz\n'
  );
  assert.equal(code, 1, out);
  assert.equal(out.match(/gate-frequency/g)?.length, 2, out);
});

test('a Gate named in Gate context is still flagged', () => {
  for (const text of [
    'The Voice Gate sings at 1111 Hz.',
    'The Gate of Crown rings at 963 Hz.',
    // Reversed order — both of these were real undetected frequency errors
    // until the `gate <name>` form was added.
    'The Gate Starweave holds at 963 Hz.',
    'Gate Crown rings at 852 Hz.',
  ]) {
    const { code, out } = lint(`# Notes (STAGING)\n\n${text}\n`);
    assert.equal(code, 1, `expected an error for "${text}", got:\n${out}`);
    assert.ok(out.includes('gate-frequency'), out);
  }
});

// --- must fire (the drift it exists to catch) -------------------------------

test('a superseded godbeast in an assignment position is flagged', () => {
  const { code, out } = lint('# Elara (STAGING)\n\n**Godbeast**: Thessara\n');
  assert.equal(code, 1);
  assert.ok(out.includes('superseded-name'), out);
});

test('a superseded name as a section heading is flagged', () => {
  const { code, out } = lint('# Codex (STAGING)\n\n## X. Amaterasu — The Source-Light\n\nText.\n');
  assert.equal(code, 1);
  assert.ok(out.includes('superseded-name'), out);
});

test('a single-god row with the wrong beast is flagged', () => {
  const { code, out } = lint('# Gate (STAGING)\n\n| God | Beast |\n|---|---|\n| Aiyami | Kyuro |\n');
  assert.equal(code, 1);
  assert.ok(out.includes('godbeast-pairing'), out);
});

test('a wrong gate frequency is flagged', () => {
  const { code, out } = lint('# Gates (STAGING)\n\nThe Crown Gate resonates at 963 Hz.\n');
  assert.equal(code, 1);
  assert.ok(out.includes('gate-frequency'), out);
});

test('the shifted ladder is flagged on every row', () => {
  // The exact defect found in .claude/CLAUDE.md and guardians.md.
  const { code, out } = lint(
    '# Guardians (STAGING)\n\n- Lyssandria (foundation Gate, 396 Hz)\n' +
      '- Leyla (flow Gate, 417 Hz)\n- Draconia (fire Gate, 528 Hz)\n'
  );
  assert.equal(code, 1);
  assert.equal(out.match(/gate-frequency/g)?.length, 3, out);
});

// --- file selection ----------------------------------------------------------

test('--changed reaches canon-bearing files at every path shape', () => {
  // This replaces an earlier version that re-declared LORE_EXT/LORE_PATH/
  // LORE_HINT/LORE_NAMED as local copies and asserted against those. It could
  // not fail: editing the real regexes left the copies — and the test — green.
  // A guard against "the selector went blind and nobody noticed" that cannot
  // notice the selector going blind is worse than none, because it reads as
  // coverage. This drives the real CLI through --changed instead.
  //
  // Only must-reach is asserted. With the content probe, a file carrying no
  // canon token produces no findings whether it was read or skipped, so
  // "must-skip" is unobservable from the outside — path patterns are now a
  // speed optimisation, not a correctness boundary.
  const paths = [
    'docs/worldbuilding/patterns/ARTIFACTS.md',
    '.claude/CLAUDE.md',
    'packages/chrome-extension/tests/chrome-extension.test.mjs',
    'book/legends-of-arcanea/codex.md',
    '.arcanea/lore/entity.md',
  ];

  const result = inTempRepo(({ dir, run }) => {
    for (const p of paths) {
      mkdirSync(join(dir, dirname(p)), { recursive: true });
      writeFileSync(join(dir, p), '# Fixture (STAGING)\n\nNothing yet.\n', 'utf8');
    }
    run(['add', '-A']);
    run(['commit', '-qm', 'base']);
    const base = run(['rev-parse', 'HEAD']).trim();

    for (const p of paths) {
      writeFileSync(
        join(dir, p),
        '# Fixture (STAGING)\n\nNothing yet.\n\n**Godbeast**: Thessara\n',
        'utf8'
      );
    }
    run(['add', '-A']);
    run(['commit', '-qm', 'drift']);

    try {
      return { code: 0, out: execFileSync('node', [LINT, '--changed', '--base', base], { cwd: dir, encoding: 'utf8' }) };
    } catch (err) {
      return { code: err.status, out: `${err.stdout || ''}${err.stderr || ''}` };
    }
  });

  assert.equal(result.code, 1, result.out);
  for (const p of paths) {
    assert.ok(result.out.includes(p), `selector never reached ${p}:\n${result.out}`);
  }
});

test('a --changed run that cannot diff fails loudly instead of passing', () => {
  // Regression: this exited 0 with zero files checked — a green CI check that
  // inspected nothing, which is the failure mode this whole gate exists to
  // prevent, one layer up.
  const result = inTempRepo(({ dir, run }) => {
    writeFileSync(join(dir, 'lore-notes.md'), '# N (STAGING)\n\ntext\n', 'utf8');
    run(['add', '-A']);
    run(['commit', '-qm', 'base']);
    try {
      return { code: 0, out: execFileSync('node', [LINT, '--changed', '--base', 'origin/nope'], { cwd: dir, encoding: 'utf8' }) };
    } catch (err) {
      return { code: err.status, out: `${err.stdout || ''}${err.stderr || ''}` };
    }
  });

  assert.equal(result.code, 1, `must not report success when nothing was checked:\n${result.out}`);
  assert.ok(/FATAL|NOTHING was checked/i.test(result.out), result.out);
});

test('the selection patterns are still present in the source', () => {
  // Narrow on purpose: catches a rename/removal of the selection patterns.
  // Behaviour is covered by the real-CLI test above, not by copying regexes.
  const lintSrc = readFileSync(fileURLToPath(new URL('./lore-lint.mjs', import.meta.url)), 'utf8');
  for (const name of ['LORE_EXT', 'LORE_PATH', 'LORE_HINT', 'LORE_NAMED', 'CANON_TOKENS']) {
    assert.ok(lintSrc.includes(`const ${name}`), `${name} missing from lore-lint.mjs`);
  }
  assert.ok(lintSrc.includes('function looksLoreBearing'), 'content probe missing');
});

test('a lore-bearing file with no lore in its path is selected by content', () => {
  // packages/chrome-extension/tests/chrome-extension.test.mjs matches no path
  // pattern, yet holds 4 real errors. Round 7 widened the CI trigger for it and
  // the selector still skipped it — caught only when the selection test above
  // was written. The content probe is the backstop for that whole class.
  const { code, out } = lint(
    'export const ELARA = {\n  gate: "Starweave",\n  godbeast: "Thessara",\n};\n',
    'chrome-extension.test.mjs'
  );
  assert.equal(code, 1, `content probe must reach this file:\n${out}`);
  assert.ok(out.includes('superseded-name'), out);
});

// --- alias resolution --------------------------------------------------------

test('an alias appearing twice, once as an ordinary word, resolves safely', () => {
  // checkGateFrequency replaces the alias globally across the line after a
  // single namesGate() hit, so a line using "shift" as both the Gate and the
  // English verb rewrites both. Verifying that is harmless rather than assuming
  // it: the frequency check re-tests for Gate context afterwards, so a bare
  // rewritten verb cannot masquerade as a Gate reference.
  const { code, out } = lint(
    '# Notes (STAGING)\n\nA shift in tone, though the Shift Gate holds at 852 Hz.\n'
  );
  assert.equal(code, 0, `correct frequency must not error:\n${out}`);
  assert.ok(out.includes('gate-name'), `the Gate use must still warn:\n${out}`);
  assert.equal(out.match(/gate-name/g).length, 1, `one warning, not one per occurrence:\n${out}`);
});

test('an alias named as a Gate with the wrong frequency still errors', () => {
  const { code, out } = lint('# Notes (STAGING)\n\nThe Shift Gate holds at 963 Hz.\n');
  assert.equal(code, 1, out);
  assert.ok(out.includes('gate-frequency'), out);
});

test('a second frequency later on the same line is checked too', () => {
  // Two Gate/frequency pairs in one row. The wrong one is the second, so a
  // check that only ever inspected the first match on a line would read this
  // as clean — a silent miss, which is the failure mode that matters most.
  const bad = lint('# T (STAGING)\n\n| Unity | 963 Hz | Crown | 400 Hz |\n');
  assert.equal(bad.code, 1, `the second pair must be checked:\n${bad.out}`);
  assert.ok(bad.out.includes('crown Gate is 741 Hz'), `blame the owning Gate:\n${bad.out}`);
  assert.equal(bad.out.match(/gate-frequency/g).length, 1, `only the wrong pair:\n${bad.out}`);

  const good = lint('# T (STAGING)\n\n| Unity | 963 Hz | Crown | 741 Hz |\n');
  assert.equal(good.code, 0, `two correct pairs must stay clean:\n${good.out}`);
});

test('an alias and a neighbouring Gate on one line attribute separately', () => {
  // "Shift" is rewritten to "starweave" in place, so every index the check
  // derives has to come from the rewritten string. If an offset survived the
  // substitution the attribution window would slide and blame the wrong Gate.
  const good = lint(
    '# T (STAGING)\n\nThe Shift Gate rings at 852 Hz, the Unity Gate at 963 Hz.\n'
  );
  assert.equal(good.code, 0, `both frequencies are canon:\n${good.out}`);

  const bad = lint(
    '# T (STAGING)\n\nThe Shift Gate rings at 963 Hz, the Unity Gate at 963 Hz.\n'
  );
  assert.equal(bad.code, 1, bad.out);
  assert.ok(bad.out.includes('starweave Gate is 852 Hz'), `blame the alias, not Unity:\n${bad.out}`);
  assert.equal(bad.out.match(/gate-frequency/g).length, 1, `Unity's own 963 is right:\n${bad.out}`);
});

// --- workflow / linter coupling ----------------------------------------------

test('the workflow trigger covers every extension LORE_EXT checks', () => {
  // The paths: list in lore-canon.yml is a hand-maintained superset of LORE_EXT.
  // A type the linter checks but the trigger omits is drift nothing ever looks
  // at — silence indistinguishable from cleanliness. Comments asked the next
  // editor to keep these in sync; this makes it mechanical.
  const lintSrc = readFileSync(fileURLToPath(new URL('./lore-lint.mjs', import.meta.url)), 'utf8');
  const workflow = readFileSync(
    fileURLToPath(new URL('../../.github/workflows/lore-canon.yml', import.meta.url)),
    'utf8'
  );

  const extMatch = lintSrc.match(/LORE_EXT\s*=\s*\/\\\.\(([^)]+)\)/);
  assert.ok(extMatch, 'could not parse LORE_EXT from lore-lint.mjs');
  const checked = extMatch[1].split('|');

  const triggered = new Set(
    [...workflow.matchAll(/'\*\*\/\*\.([A-Za-z]+)'/g)].map((m) => m[1])
  );

  const missing = checked.filter((e) => !triggered.has(e));
  assert.deepEqual(
    missing,
    [],
    `lore-canon.yml paths: must trigger on every LORE_EXT type; missing: ${missing.join(', ')}`
  );
});

// --- the --changed ratchet ---------------------------------------------------
//
// addedLinesFor() tracks a cursor by hand through `@@ -x,y +a,b @@` hunks, which
// makes it the most bug-prone code here and — until now — the least covered.
// The property that matters: pre-existing drift is NOT reported, newly added
// drift IS. Get that backwards and the linter either fails every PR on
// inherited debt (and gets switched off) or silently passes new drift.

function inTempRepo(steps) {
  const dir = mkdtempSync(join(tmpdir(), 'fixture-git-'));
  const run = (args) => execFileSync('git', args, { cwd: dir, encoding: 'utf8' });
  run(['init', '-q', '-b', 'base']);
  run(['config', 'user.email', 'test@example.com']);
  run(['config', 'user.name', 'Test']);
  try {
    return steps({ dir, run });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test('--changed reports added drift and ignores pre-existing drift', () => {
  const result = inTempRepo(({ dir, run }) => {
    const file = join(dir, 'lore-notes.md');

    // Pre-existing drift, already on the base commit.
    writeFileSync(file, '# Notes (STAGING)\n\n**Godbeast**: Thessara\n', 'utf8');
    run(['add', '-A']);
    run(['commit', '-qm', 'base']);
    const base = run(['rev-parse', 'HEAD']).trim();

    // A new line adding fresh drift, plus untouched pre-existing drift above it.
    writeFileSync(
      file,
      '# Notes (STAGING)\n\n**Godbeast**: Thessara\n\nThe Crown Gate rings at 963 Hz.\n',
      'utf8'
    );
    run(['add', '-A']);
    run(['commit', '-qm', 'change']);

    try {
      const out = execFileSync('node', [LINT, '--changed', '--base', base], {
        cwd: dir,
        encoding: 'utf8',
      });
      return { code: 0, out };
    } catch (err) {
      return { code: err.status, out: `${err.stdout || ''}${err.stderr || ''}` };
    }
  });

  assert.equal(result.code, 1, result.out);
  assert.ok(result.out.includes('gate-frequency'), `new drift must be caught:\n${result.out}`);
  assert.ok(
    !result.out.includes('superseded-name'),
    `pre-existing drift must NOT be reported — the ratchet is the whole point:\n${result.out}`
  );
});

test('the tier banner is a ratchet: created files warn, edited ones do not', () => {
  // The banner is a whole-file property, so it cannot be attributed to an added
  // line and sat outside the ratchet: editing one paragraph re-warned about a
  // banner the edit never touched. Both halves are asserted, because fixing the
  // false warning by never running the check would look identical here.
  const result = inTempRepo(({ dir, run }) => {
    const lore = join(dir, '.arcanea', 'lore');
    mkdirSync(lore, { recursive: true });
    writeFileSync(join(lore, 'old.md'), '# Old\n\nNo tier declared here.\n', 'utf8');
    run(['add', '-A']);
    run(['commit', '-qm', 'base']);
    const base = run(['rev-parse', 'HEAD']).trim();

    writeFileSync(
      join(lore, 'old.md'),
      '# Old\n\nNo tier declared here.\n\nThe Crown Gate rings at 741 Hz.\n',
      'utf8'
    );
    writeFileSync(join(lore, 'new.md'), '# New\n\nAlso no tier declared.\n', 'utf8');
    run(['add', '-A']);
    run(['commit', '-qm', 'change']);

    try {
      return { code: 0, out: execFileSync('node', [LINT, '--changed', '--base', base], { cwd: dir, encoding: 'utf8' }) };
    } catch (err) {
      return { code: err.status, out: `${err.stdout || ''}${err.stderr || ''}` };
    }
  });

  assert.ok(
    result.out.includes('new.md') && result.out.includes('missing-tier'),
    `a file this change created must still declare its tier:\n${result.out}`
  );
  assert.ok(
    !result.out.includes('old.md'),
    `an edited file's pre-existing missing banner is not this change's problem:\n${result.out}`
  );
});

test('--changed is clean when the added lines carry no drift', () => {
  const result = inTempRepo(({ dir, run }) => {
    const file = join(dir, 'lore-notes.md');
    writeFileSync(file, '# Notes (STAGING)\n\n**Godbeast**: Thessara\n', 'utf8');
    run(['add', '-A']);
    run(['commit', '-qm', 'base']);
    const base = run(['rev-parse', 'HEAD']).trim();

    writeFileSync(
      file,
      '# Notes (STAGING)\n\n**Godbeast**: Thessara\n\nThe Crown Gate rings at 741 Hz.\n',
      'utf8'
    );
    run(['add', '-A']);
    run(['commit', '-qm', 'change']);

    try {
      return { code: 0, out: execFileSync('node', [LINT, '--changed', '--base', base], { cwd: dir, encoding: 'utf8' }) };
    } catch (err) {
      return { code: err.status, out: `${err.stdout || ''}${err.stderr || ''}` };
    }
  });

  assert.equal(result.code, 0, result.out);
});

// --- lock-claim (WARN-only, so it needs tests more than the others, not less)-

test('prose asserting a file is locked warns', () => {
  const { code, out } = lint('# Thing (STAGING)\n\nThis document is LOCKED ✅ and may not be changed.\n');
  assert.ok(out.includes('lock-claim'), out);
  assert.equal(code, 0, 'lock-claim is WARN-only and must never fail the build');
});

test('a status banner recording an approved lock does not warn', () => {
  // Near-miss on purpose: locked content legitimately lives outside the vault
  // once the Creator approved it — .arcanea/lore/MAGIC_SYSTEM.md does exactly
  // this. A banner records a decision; it does not assert one.
  const { code, out } = lint(
    '# Magic (LOCKED)\n\n> **Status: LOCKED ✅** — Approved by Frank (Creator) 2026-06-23.\n'
  );
  assert.equal(code, 0, out);
  assert.ok(!out.includes('lock-claim'), out);
});

test('listing the tier vocabulary does not warn', () => {
  const { code, out } = lint('# Guide (STAGING)\n\nTiers: LOCKED ✅ / STAGING ⏳ / EVOLVING 🔧\n');
  assert.equal(code, 0, out);
  assert.ok(!out.includes('lock-claim'), out);
});

test('the vault itself is exempt from lock-claim', () => {
  // Path-based exemption, so this can only be checked through the real filename.
  const { code, out } = lint(
    '# Canon\n\nThis document is LOCKED ✅.\n',
    'CANON_LOCKED.md'
  );
  assert.equal(code, 0, out);
});

// --- warnings (never fail the build) ----------------------------------------

test('a lore file with no canon tier warns but exits 0', () => {
  const { code, out } = lint('# Something\n\nNo tier declared.\n', 'lore-untiered.md');
  assert.equal(code, 0, out);
});

test('a line comparing two Gates does not attribute one frequency to the other', () => {
  // Real false positive from .arcanea/lore/CONTINUITY_AUDIT.md:329, which
  // discusses a character's "Foundation Gate" while quoting Voice's "528 Hz".
  // Only Foundation appeared in Gate-context form, so counting Gate-context
  // names alone saw one gate and blamed it for the other's frequency.
  const { code, out } = lint(
    '# Audit (STAGING)\n\nHis gate_primary is listed as Voice (528 Hz), though the ' +
      'bible describes him at the Foundation Gate.\n'
  );
  assert.equal(code, 0, `ambiguous two-gate line must not be flagged:\n${out}`);
});

test('a stray Gate word elsewhere in the sentence does not suppress a real error', () => {
  // Regression from the round-12 fix: counting BARE gate names for the
  // ambiguity bail-out meant the ordinary word "source" here suppressed a real
  // Crown error. Attribution is by proximity now — a frequency belongs to the
  // gate quoted next to it, not to one mentioned later in the sentence.
  const { code, out } = lint(
    '# Notes (STAGING)\n\nThe Crown Gate resonates at 963 Hz, though the source remains unclear.\n'
  );
  assert.equal(code, 1, `real Crown error must not be suppressed:\n${out}`);
  assert.ok(out.includes('gate-frequency'), out);
});

test('a banner recording supersession is not read as a lock claim', () => {
  // The earlier form matched `LOCKED ✅` and `this document is` independently on
  // one line, so a banner saying the document is *superseded* warned that it
  // was claiming to be locked — the opposite of what it says.
  const { code, out } = lint(
    '# Mirror (SUPERSEDED)\n\nStatus: LOCKED ✅ — this document is superseded by the vault.\n'
  );
  assert.equal(code, 0, out);
  assert.ok(!out.includes('lock-claim'), out);
});

test('a period-terminated lock claim fires, a negated one does not', () => {
  const fires = lint('# T (STAGING)\n\nThis document is now LOCKED.\n');
  assert.ok(fires.out.includes('lock-claim'), `period-terminated claim missed:\n${fires.out}`);

  const negated = lint('# T (STAGING)\n\nThis section is not LOCKED.\n');
  assert.ok(!negated.out.includes('lock-claim'), `negation must not fire:\n${negated.out}`);
});

test('the linter constants match the vault they claim to mirror', () => {
  // The file says "if these disagree with the vault, the vault wins and this
  // file is the bug" — but nothing enforced it. The CI smoke test runs the
  // linter OVER the vault, which only catches drift the checks already model;
  // a locked rename the linter has never heard of passes silently. This diffs
  // the transcribed constants against CANON_LOCKED.md's table directly, so the
  // next locked rename cannot depend on someone remembering this file.
  const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
  const vault = readFileSync(join(repoRoot, '.arcanea/lore/CANON_LOCKED.md'), 'utf8');
  const src = readFileSync(fileURLToPath(new URL('./lore-lint.mjs', import.meta.url)), 'utf8');

  // Vault: | Gate | 174 Hz | God | Godbeast | Domain |
  const vaultGates = new Map();
  const vaultBeasts = new Map();
  for (const line of vault.split('\n')) {
    const m = line.match(
      /^\|\s*([A-Za-z]+)\s*\|\s*(\d{3,4})\s*Hz\s*\|\s*([A-Za-z]+)\s*\|\s*([A-Za-z]+)\s*\|/
    );
    if (m) {
      vaultGates.set(m[1].toLowerCase(), Number(m[2]));
      vaultBeasts.set(m[3].toLowerCase(), m[4]);
    }
  }
  assert.equal(vaultGates.size, 10, `expected 10 gates in the vault, parsed ${vaultGates.size}`);

  const block = (name) => src.slice(src.indexOf(`const ${name} = {`)).slice(0, src.slice(src.indexOf(`const ${name} = {`)).indexOf('};'));
  const lintGates = new Map(
    [...block('GATE_FREQUENCIES').matchAll(/(\w+):\s*(\d+)/g)].map((m) => [m[1], Number(m[2])])
  );
  const lintBeasts = new Map(
    [...block('GODBEASTS').matchAll(/(\w+):\s*'([^']+)'/g)].map((m) => [m[1], m[2]])
  );

  for (const [gate, hz] of vaultGates) {
    assert.equal(lintGates.get(gate), hz, `GATE_FREQUENCIES.${gate} must be ${hz} per the vault`);
  }
  for (const [god, beast] of vaultBeasts) {
    assert.equal(lintBeasts.get(god), beast, `GODBEASTS.${god} must be ${beast} per the vault`);
  }
  assert.equal(lintGates.size, vaultGates.size, 'linter knows a different number of gates than the vault');
});

test('a contracted negation is not read as a lock claim', () => {
  // "isn't LOCKED" leaves "n't " in the gap, which contains no literal "not",
  // so the word-boundary negation guard passed it through and warned that the
  // file was claiming to be locked — the inverse of what it says.
  const { code, out } = lint("# T (STAGING)\n\nThis document isn't LOCKED, still evolving.\n");
  assert.equal(code, 0, out);
  assert.ok(!out.includes('lock-claim'), `contracted negation must not fire:\n${out}`);
});

test('a wrong pairing stated in prose is flagged', () => {
  // The pairing check was table-only. #98's completion test is "full-repo
  // lore-lint clean", so a pairing written as a sentence would have survived
  // the sweep and read as swept. Elara is bonded to Vaelith.
  const { code, out } = lint(
    "# T (STAGING)\n\nElara's godbeast is Kaelith, bound at the Starweave Gate.\n"
  );
  assert.equal(code, 1, `a prose pairing must be checked:\n${out}`);
  assert.ok(out.includes('elara is bonded to Vaelith'), out);
});

test('prose pairings that are correct, historical, or novel stay silent', () => {
  const cases = [
    "Elara's godbeast is Vaelith.",                        // correct
    "Elara's godbeast was Thessara, before the rename.",   // past tense: true history
    "Elara's godbeast is Skarn, a new creature.",          // not a canonical beast
    'Whose godbeast is Kaelith?',                          // no possessive subject
  ];
  for (const sentence of cases) {
    const { code, out } = lint(`# T (STAGING)\n\n${sentence}\n`);
    assert.equal(code, 0, `must not fire on "${sentence}":\n${out}`);
  }
});

test('an ordinary English Gate-word before the number does not suppress an error', () => {
  // Owner selection requires Gate context precisely because every Gate name is
  // also an ordinary word. The hijacker check used to match bare names, which
  // contradicted that and ate real errors: "heart" used as a simile suppressed
  // a genuine Foundation mistake. Foundation is 174 Hz, so 285 Hz is wrong.
  const { code, out } = lint(
    '# T (STAGING)\n\nThe Foundation Gate resonates like a heart at 285 Hz.\n'
  );
  assert.equal(code, 1, `an ordinary word must not silence a real error:\n${out}`);
  assert.ok(out.includes('foundation Gate is 174 Hz'), out);
});

test('a Gate named both before and between still takes its own frequency', () => {
  // The one case the hijacker check exists for, and the only one the owner rule
  // cannot handle alone: gateMentionIndex returns a Gate's EARLIEST mention, so
  // a Gate named before the owner loses the ownership race even when it is also
  // named immediately before the number. Here 528 Hz is Voice's and correct;
  // without the hijacker check the line is blamed on Foundation and errors.
  const { code, out } = lint(
    '# T (STAGING)\n\nThe Voice Gate and the Foundation Gate differ; the Voice Gate holds 528 Hz.\n'
  );
  assert.equal(code, 0, `Voice owns its own frequency:\n${out}`);
});

test('a curly-apostrophe contraction is not read as a lock claim', () => {
  // Same sentence, U+2019 instead of ASCII 0x27 — what a word processor or
  // autocorrect emits, and prose drafted elsewhere and pasted in is exactly
  // where a hand-typed "isn't LOCKED" comes from.
  const { code, out } = lint(
    '# T (STAGING)\n\nThis document isn’t LOCKED, still evolving.\n'
  );
  assert.equal(code, 0, out);
  assert.ok(!out.includes('lock-claim'), `curly contraction must not fire:\n${out}`);
});

test('every GATE_ALIAS is a non-canonical name mapping to a canonical one', () => {
  // An alias exists to resolve a name the vault does NOT use onto one it does.
  // If /lock-decision ever settles Starweave vs Shift the other way, "shift"
  // becomes canonical and this alias silently starts rewriting a correct name
  // into a wrong one. Today it is a single entry maintained by memory.
  const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
  const vault = readFileSync(join(repoRoot, '.arcanea/lore/CANON_LOCKED.md'), 'utf8');
  const src = readFileSync(fileURLToPath(new URL('./lore-lint.mjs', import.meta.url)), 'utf8');

  const canonical = new Set();
  for (const line of vault.split('\n')) {
    const m = line.match(/^\|\s*([A-Za-z]+)\s*\|\s*\d{3,4}\s*Hz\s*\|/);
    if (m) canonical.add(m[1].toLowerCase());
  }
  assert.equal(canonical.size, 10, `expected 10 canonical gate names, parsed ${canonical.size}`);

  const aliasBlock = src.slice(src.indexOf('const GATE_ALIASES'));
  const aliases = [...aliasBlock.slice(0, aliasBlock.indexOf('}')).matchAll(/(\w+):\s*'([^']+)'/g)];
  assert.ok(aliases.length > 0, 'GATE_ALIASES parsed empty — did the shape change?');

  for (const [, alias, target] of aliases) {
    assert.ok(
      !canonical.has(alias.toLowerCase()),
      `"${alias}" is an alias but the vault now names a Gate that — the alias would rewrite a correct name`
    );
    assert.ok(
      canonical.has(target.toLowerCase()),
      `alias "${alias}" targets "${target}", which is not a canonical Gate name in the vault`
    );
  }
});
