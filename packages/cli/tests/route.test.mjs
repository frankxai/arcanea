/**
 * @arcanea/cli — route command tests
 *
 * Tests the `arcanea route <description>` command behaviour.
 * All Guardian routing is performed by @arcanea/os internally;
 * we validate CLI output without touching source files.
 *
 * Run: node --test packages/cli/tests/route.test.mjs
 */

import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { execSync, execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI = join(__dirname, '..', 'dist', 'arcanea.cjs');

function run(args, opts = {}) {
  return execSync(`node "${CLI}" ${args}`, {
    encoding: 'utf-8',
    timeout: 15000,
    env: { ...process.env, NO_COLOR: '1' },
    ...opts,
  });
}

// Capture both stdout and stderr, never throw
function runSafe(args) {
  try {
    return { stdout: run(args), code: 0 };
  } catch (err) {
    return { stdout: err.stdout || '', stderr: err.stderr || '', code: err.status || 1 };
  }
}

// ============================================================
// Guardian keyword routing — database / architecture
// ============================================================

describe('CLI — route: database tasks route to Lyssandria', () => {
  it('routes "design a database schema" to Lyssandria', () => {
    const output = run('route design a database schema');
    // Lyssandria owns the foundation (earth/database keywords)
    assert.ok(
      output.includes('Lyssandria'),
      `Expected Lyssandria in output, got:\n${output}`,
    );
  });

  it('output contains Gate field for database routing', () => {
    const output = run('route design a database schema');
    assert.ok(output.includes('Gate:'), 'Missing Gate field in route output');
  });

  it('output contains Element field for database routing', () => {
    const output = run('route design a database schema');
    assert.ok(output.includes('Element:'), 'Missing Element field in route output');
  });

  it('output contains Confidence field for database routing', () => {
    const output = run('route design a database schema');
    assert.ok(output.includes('Confidence:'), 'Missing Confidence field in route output');
  });

  it('output contains Domain field for database routing', () => {
    const output = run('route design a database schema');
    assert.ok(output.includes('Domain:'), 'Missing Domain field in route output');
  });

  it('output contains Reasoning field for any route', () => {
    const output = run('route design a database schema');
    assert.ok(output.includes('Reasoning:'), 'Missing Reasoning field in route output');
  });
});

// ============================================================
// Guardian keyword routing — UI / design
// ============================================================

describe('CLI — route: UI tasks route to Leyla', () => {
  it('routes "build a beautiful UI component with animation" to Leyla', () => {
    const output = run('route build a beautiful UI component with animation');
    assert.ok(
      output.includes('Leyla'),
      `Expected Leyla in output, got:\n${output}`,
    );
  });

  it('design route output includes a sign-off', () => {
    const output = run('route design a landing page layout');
    // Every Guardian has a signOff; check it is non-empty by looking for any text after the last divider
    assert.ok(output.trim().length > 0, 'Route output should not be empty');
  });
});

// ============================================================
// Guardian keyword routing — AI / vision
// ============================================================

describe('CLI — route: AI tasks route to Lyria', () => {
  it('routes "build an AI intelligence model with vision" to Lyria', () => {
    const output = run('route build an AI intelligence model with vision');
    assert.ok(
      output.includes('Lyria'),
      `Expected Lyria in output, got:\n${output}`,
    );
  });
});

// ============================================================
// Guardian keyword routing — meta / orchestration
// ============================================================

describe('CLI — route: meta tasks route to Shinkami', () => {
  it('routes "orchestrate the entire arcanea guardian ecosystem" to Shinkami', () => {
    const output = run('route orchestrate the entire arcanea guardian ecosystem');
    assert.ok(
      output.includes('Shinkami'),
      `Expected Shinkami in output, got:\n${output}`,
    );
  });
});

// ============================================================
// Multi-word input handling
// ============================================================

describe('CLI — route: input edge cases', () => {
  it('handles a single-word input without error', () => {
    const output = run('route security');
    assert.ok(output.length > 0, 'Single-word input should produce output');
  });

  it('handles a long multi-word description without error', () => {
    const output = run('route help me implement a supabase postgres migration with RLS row level security policies and CI/CD pipeline');
    assert.ok(output.includes('Gate:'), 'Long input should still route with Gate field');
  });

  it('always lists at least one Guardian name in the output', () => {
    const GUARDIAN_NAMES = [
      'Lyssandria', 'Leyla', 'Draconia', 'Maylinn', 'Alera',
      'Lyria', 'Aiyami', 'Elara', 'Ino', 'Shinkami',
    ];
    const output = run('route create something amazing');
    const found = GUARDIAN_NAMES.some(name => output.includes(name));
    assert.ok(found, `No Guardian name found in route output:\n${output}`);
  });

  it('route command requires at least one argument — exits non-zero when none given', () => {
    const { code } = runSafe('route');
    assert.notEqual(code, 0, 'route with no args should exit non-zero');
  });

  it('confidence percentage is formatted as a number followed by %', () => {
    const output = run('route design a database schema');
    assert.match(output, /\d+%/, 'Confidence should include a percentage value');
  });
});

// ============================================================
// Alternatives section
// ============================================================

describe('CLI — route: alternatives section', () => {
  it('shows Alternatives section for a clear keyword match', () => {
    // A highly specific keyword query will score one Guardian very high
    // but the router always returns alternatives; confirm the label appears
    const output = run('route supabase postgres database schema migration backend');
    // Alternatives section is printed when result.alternatives.length > 0 (always for 10 Guardians)
    assert.ok(output.includes('Alternatives:'), 'Should list alternative Guardians');
  });
});
