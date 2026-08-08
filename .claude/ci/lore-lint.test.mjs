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
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
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

test('a Gate named in Gate context is still flagged', () => {
  for (const text of ['The Voice Gate sings at 1111 Hz.', 'The Gate of Crown rings at 963 Hz.']) {
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
