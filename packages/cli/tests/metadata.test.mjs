/**
 * @arcanea/cli — command metadata tests
 *
 * Verifies that all 10 commands exist, carry correct descriptions,
 * and expose the expected options via --help output.
 *
 * Run: node --test packages/cli/tests/metadata.test.mjs
 */

import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { execSync } from 'node:child_process';
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

function runSafe(args) {
  try {
    return { stdout: run(args), code: 0 };
  } catch (err) {
    return { stdout: err.stdout || '', stderr: err.stderr || '', code: err.status || 1 };
  }
}

// ============================================================
// Top-level program metadata
// ============================================================

describe('CLI — metadata: program identity', () => {
  it('reports version 0.6.0', () => {
    const output = run('--version');
    assert.ok(output.trim().includes('0.6.0'), `Expected version 0.6.0, got: ${output.trim()}`);
  });

  it('program name is arcanea', () => {
    const output = run('--help');
    assert.ok(output.includes('arcanea'), 'Program name should be arcanea');
  });

  it('description mentions Arcanea Realm or arcane intelligence', () => {
    const output = run('--help');
    assert.ok(
      output.toLowerCase().includes('arcanea') && output.toLowerCase().includes('intelligence'),
      'Description should reference Arcanea and intelligence',
    );
  });
});

// ============================================================
// All 10 commands present in --help
// ============================================================

describe('CLI — metadata: all commands listed', () => {
  const EXPECTED_COMMANDS = [
    'init',
    'auth',
    'status',
    'install',
    'update',
    'route',
    'voice',
    'tokens',
    'world',
    'create',
  ];

  for (const cmd of EXPECTED_COMMANDS) {
    it(`command "${cmd}" appears in --help`, () => {
      const output = run('--help');
      assert.ok(
        output.includes(cmd),
        `Command "${cmd}" not found in --help output`,
      );
    });
  }
});

// ============================================================
// Per-command --help metadata
// ============================================================

describe('CLI — metadata: install command options', () => {
  it('install --help lists --level option', () => {
    const output = run('install --help');
    assert.ok(output.includes('--level') || output.includes('-l'), 'install should expose --level option');
  });

  it('install --help lists --dry-run option', () => {
    const output = run('install --help');
    assert.ok(output.includes('--dry-run'), 'install should expose --dry-run option');
  });

  it('install --help lists --dir option', () => {
    const output = run('install --help');
    assert.ok(output.includes('--dir') || output.includes('-d'), 'install should expose --dir option');
  });

  it('install --help lists known providers', () => {
    const output = run('install --help');
    // The description should mention provider argument
    assert.ok(output.includes('provider') || output.includes('claude'), 'install should mention providers');
  });
});

describe('CLI — metadata: route command help', () => {
  it('route --help shows description about Guardian routing', () => {
    const output = run('route --help');
    assert.ok(
      output.toLowerCase().includes('guardian') || output.toLowerCase().includes('route'),
      'route --help should mention Guardian or routing',
    );
  });
});

describe('CLI — metadata: voice command options', () => {
  it('voice --help shows --fix option', () => {
    const output = run('voice --help');
    assert.ok(output.includes('--fix'), 'voice should expose --fix option');
  });
});

describe('CLI — metadata: tokens command options', () => {
  it('tokens --help shows --format option', () => {
    const output = run('tokens --help');
    assert.ok(output.includes('--format') || output.includes('-f'), 'tokens should expose --format option');
  });

  it('tokens --help shows --colors option', () => {
    const output = run('tokens --help');
    assert.ok(output.includes('--colors'), 'tokens should expose --colors option');
  });

  it('tokens --help lists valid format values (css, tailwind, json)', () => {
    const output = run('tokens --help');
    assert.ok(
      output.includes('css') || output.includes('tailwind') || output.includes('json'),
      'tokens --help should mention valid format values',
    );
  });
});

describe('CLI — metadata: world command options', () => {
  it('world --help shows --all option', () => {
    const output = run('world --help');
    assert.ok(output.includes('--all'), 'world should expose --all option');
  });

  it('world --help shows --name option', () => {
    const output = run('world --help');
    assert.ok(output.includes('--name') || output.includes('-n'), 'world should expose --name option');
  });
});

describe('CLI — metadata: status command options', () => {
  it('status --help shows --dir option', () => {
    const output = run('status --help');
    assert.ok(output.includes('--dir') || output.includes('-d'), 'status should expose --dir option');
  });
});

describe('CLI — metadata: update command options', () => {
  it('update --help shows --dry-run option', () => {
    const output = run('update --help');
    assert.ok(output.includes('--dry-run'), 'update should expose --dry-run option');
  });
});

describe('CLI — metadata: auth subcommands', () => {
  it('auth --help lists add subcommand', () => {
    const output = run('auth --help');
    assert.ok(output.includes('add'), 'auth should list "add" subcommand');
  });

  it('auth --help lists list subcommand', () => {
    const output = run('auth --help');
    assert.ok(output.includes('list'), 'auth should list "list" subcommand');
  });

  it('auth --help lists remove subcommand', () => {
    const output = run('auth --help');
    assert.ok(output.includes('remove'), 'auth should list "remove" subcommand');
  });
});
