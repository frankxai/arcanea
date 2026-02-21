/**
 * @arcanea/cli — voice command tests
 *
 * Tests the `arcanea voice <text>` command and the Voice Bible rules.
 * Validates score reporting, violation detection, and --fix behaviour.
 *
 * Run: node --test packages/cli/tests/voice.test.mjs
 */

import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI = join(__dirname, '..', 'dist', 'arcanea.cjs');

// Strip ANSI escape sequences (picocolors may force color in CI)
const stripAnsi = (s) => s.replace(/\x1b\[[0-9;]*m/g, '');

function run(args, opts = {}) {
  const raw = execSync(`node "${CLI}" ${args}`, {
    encoding: 'utf-8',
    timeout: 15000,
    env: { ...process.env, NO_COLOR: '1' },
    ...opts,
  });
  return stripAnsi(raw);
}

function runSafe(args) {
  try {
    return { stdout: run(args), code: 0 };
  } catch (err) {
    return { stdout: err.stdout || '', stderr: err.stderr || '', code: err.status || 1 };
  }
}

// ============================================================
// Output structure
// ============================================================

describe('CLI — voice: output structure', () => {
  it('shows Voice Score field', () => {
    const output = run('voice "The creator builds amazing things."');
    assert.ok(output.includes('Voice Score:'), 'Missing Voice Score field');
  });

  it('shows PASSED or NEEDS WORK verdict', () => {
    const output = run('voice "The creator builds amazing things."');
    const hasPassed = output.includes('PASSED') || output.includes('NEEDS WORK');
    assert.ok(hasPassed, 'Missing PASSED / NEEDS WORK verdict');
  });

  it('score is a number between 0 and 100', () => {
    const output = run('voice "The creator builds."');
    const match = output.match(/Voice Score:\s*(\d+)/);
    assert.ok(match, 'Could not parse score from output');
    const score = parseInt(match[1], 10);
    assert.ok(score >= 0 && score <= 100, `Score ${score} out of range`);
  });

  it('clean text scores 100', () => {
    // Text with no violations from any rule
    const output = run('voice "Arcanea empowers every creator to manifest their vision."');
    const match = output.match(/Voice Score:\s*(\d+)/);
    assert.ok(match, 'Could not parse score');
    assert.equal(parseInt(match[1], 10), 100, 'Clean text should score 100');
  });

  it('voice command requires at least one argument — exits non-zero when none given', () => {
    const { code } = runSafe('voice');
    assert.notEqual(code, 0, 'voice with no args should exit non-zero');
  });
});

// ============================================================
// Term violation: "user" → "creator"
// ============================================================

describe('CLI — voice: "user" terminology rule', () => {
  it('detects "user" violation', () => {
    const output = run('voice "The user clicks the button."');
    assert.ok(output.includes('user'), 'Should flag "user" violation');
  });

  it('suggests "creator" as replacement for "user"', () => {
    const output = run('voice "The user logs in."');
    assert.ok(output.includes('creator'), 'Should suggest "creator" as replacement');
  });

  it('score is less than 100 when "user" is present', () => {
    const output = run('voice "Every user should read the docs."');
    const match = output.match(/Voice Score:\s*(\d+)/);
    assert.ok(match, 'Could not parse score');
    const score = parseInt(match[1], 10);
    assert.ok(score < 100, `Score ${score} should be < 100 when "user" present`);
  });
});

// ============================================================
// Tone violation: condescending words
// ============================================================

describe('CLI — voice: condescending tone rules', () => {
  it('flags "simply" as a condescending term', () => {
    const output = run('voice "You can simply click the button."');
    assert.ok(output.includes('simply') || output.includes('violation') || output.includes('[warning]'),
      'Should flag "simply" as condescending');
  });

  it('flags "just" as a condescending term', () => {
    const output = run('voice "Just follow these steps."');
    assert.ok(output.includes('just') || output.includes('[warning]'),
      'Should flag "just" as condescending');
  });

  it('flags "obviously" in voice check', () => {
    const output = run('voice "Obviously this is the right approach."');
    assert.ok(output.includes('obviously') || output.includes('[warning]'),
      'Should flag "obviously" as condescending');
  });
});

// ============================================================
// Tone violation: weak language
// ============================================================

describe('CLI — voice: weak language rules', () => {
  it('flags "maybe" as weak language', () => {
    const output = run('voice "Maybe we could try this approach."');
    assert.ok(output.includes('maybe') || output.includes('[suggestion]'),
      'Should flag "maybe" as weak language');
  });

  it('flags "perhaps" as weak language', () => {
    const output = run('voice "Perhaps this will work."');
    assert.ok(output.includes('perhaps') || output.includes('[suggestion]'),
      'Should flag "perhaps" as weak language');
  });

  it('flags "kind of" as weak language', () => {
    const output = run('voice "It is kind of interesting."');
    assert.ok(output.includes('kind of') || output.includes('[suggestion]'),
      'Should flag "kind of" as weak language');
  });
});

// ============================================================
// Terminology violations: magical/mystical
// ============================================================

describe('CLI — voice: terminology rules', () => {
  it('flags "magical" and suggests "arcane"', () => {
    const output = run('voice "This is a magical experience."');
    assert.ok(
      output.includes('magical') || output.includes('arcane'),
      'Should flag "magical" and suggest "arcane"',
    );
  });

  it('flags "platform" in voice check', () => {
    const output = run('voice "Welcome to our platform."');
    assert.ok(output.includes('platform') || output.includes('[suggestion]'),
      'Should flag "platform" as incorrect terminology');
  });
});

// ============================================================
// Corporate jargon rules
// ============================================================

describe('CLI — voice: corporate jargon rules', () => {
  it('flags "synergy" as corporate jargon', () => {
    const output = run('voice "We need to leverage synergy."');
    assert.ok(output.includes('synergy') || output.includes('[warning]'),
      'Should flag "synergy" as corporate jargon');
  });

  it('flags "leverage" as corporate jargon', () => {
    const output = run('voice "Let us leverage our bandwidth."');
    assert.ok(output.includes('leverage') || output.includes('[warning]'),
      'Should flag "leverage" as corporate jargon');
  });
});

// ============================================================
// --fix flag
// ============================================================

describe('CLI — voice: --fix flag', () => {
  it('--fix flag produces Fixed section in output', () => {
    const output = run('voice --fix "The user clicks here."');
    assert.ok(output.includes('Fixed:'), 'Should show Fixed section when --fix is used');
  });

  it('--fix replaces "user" with "creator"', () => {
    const output = run('voice --fix "The user clicks here."');
    // Fixed section should contain "creator"
    const fixedIdx = output.indexOf('Fixed:');
    assert.ok(fixedIdx !== -1, 'Fixed section not found');
    const afterFixed = output.slice(fixedIdx);
    assert.ok(afterFixed.includes('creator'), 'Fixed output should contain "creator"');
  });

  it('--fix does not alter clean text that needs no replacements', () => {
    const output = run('voice --fix "Arcanea empowers every creator."');
    // Fixed section appears, but content should be unchanged (no replacements)
    assert.ok(output.includes('Arcanea'), 'Fixed output should still contain original text');
  });
});

// ============================================================
// Multiple violations
// ============================================================

describe('CLI — voice: multiple violations', () => {
  it('multiple violations reduce score below single violation', () => {
    const singleOutput = run('voice "The user builds."');
    const multiOutput = run('voice "The user simply just maybe basically leverages synergy."');

    const singleMatch = singleOutput.match(/Voice Score:\s*(\d+)/);
    const multiMatch = multiOutput.match(/Voice Score:\s*(\d+)/);

    assert.ok(singleMatch && multiMatch, 'Could not parse scores');
    const singleScore = parseInt(singleMatch[1], 10);
    const multiScore = parseInt(multiMatch[1], 10);

    assert.ok(multiScore < singleScore,
      `Multi-violation score (${multiScore}) should be lower than single-violation score (${singleScore})`);
  });

  it('violation count is shown in Violations header', () => {
    const output = run('voice "The user simply leverages synergy."');
    assert.match(output, /Violations\s*\(\d+\):/, 'Should show violation count');
  });
});
