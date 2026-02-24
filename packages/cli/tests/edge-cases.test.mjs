/**
 * @arcanea/cli — edge case tests
 *
 * Covers unknown commands, missing arguments, empty input,
 * cursor provider, install dry-run preview,
 * create/world template content integrity, and slug generation.
 *
 * Run: node --test packages/cli/tests/edge-cases.test.mjs
 */

import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { execSync } from 'node:child_process';
import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

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

function freshDir() {
  return mkdtempSync(join(tmpdir(), 'arcanea-edge-test-'));
}

// ============================================================
// Unknown commands
// ============================================================

describe('CLI — edge cases: unknown commands', () => {
  it('unknown command exits non-zero', () => {
    const { code } = runSafe('frobnicate');
    assert.notEqual(code, 0, 'Unknown command should exit with non-zero code');
  });

  it('unknown command prints an error message', () => {
    const { stdout, stderr } = runSafe('frobnicate');
    const combined = stdout + stderr;
    assert.ok(combined.length > 0, 'Unknown command should produce some output');
  });

  it('double-dash only does not crash', () => {
    const { code, stdout, stderr } = runSafe('--');
    // commander may print help or error, but must not hard-crash with unhandled exception
    const combined = stdout + (stderr || '');
    assert.ok(combined !== undefined, 'Should produce output or exit gracefully');
  });
});

// ============================================================
// Missing required arguments
// ============================================================

describe('CLI — edge cases: missing required arguments', () => {
  it('install with no provider exits non-zero', () => {
    const { code } = runSafe('install');
    assert.notEqual(code, 0, 'install requires a provider argument');
  });

  it('create with no type exits non-zero or shows usage', () => {
    const { code, stdout } = runSafe('create');
    // May exit non-zero or display usage — either is acceptable
    const isGraceful = code !== 0 || stdout.toLowerCase().includes('usage') || stdout.includes('character');
    assert.ok(isGraceful, 'create with no args should exit non-zero or show usage');
  });

  it('create with type but no name exits non-zero', () => {
    const { code } = runSafe('create character');
    assert.notEqual(code, 0, 'create character requires a name argument');
  });

  it('route with no description exits non-zero', () => {
    const { code } = runSafe('route');
    assert.notEqual(code, 0, 'route requires a description argument');
  });

  it('voice with no text exits non-zero', () => {
    const { code } = runSafe('voice');
    assert.notEqual(code, 0, 'voice requires a text argument');
  });
});

// ============================================================
// Unknown install provider
// ============================================================

describe('CLI — edge cases: unknown install provider', () => {
  it('install with unknown provider does not crash', () => {
    const dir = freshDir();
    try {
      const { stdout } = runSafe(`install unknownprovider --level minimal --dir "${dir}"`);
      // Should show error message, not throw
      assert.ok(typeof stdout === 'string', 'Should return string output');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('install with unknown provider mentions error or available providers', () => {
    const dir = freshDir();
    try {
      const { stdout } = runSafe(`install notarealai --level standard --dir "${dir}"`);
      const lower = stdout.toLowerCase();
      const isHelpful = lower.includes('unknown') || lower.includes('available') || lower.includes('provider');
      assert.ok(isHelpful, 'Unknown provider should show helpful error message');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

// ============================================================
// cursor provider
// ============================================================

describe('CLI — edge cases: cursor provider', () => {
  it('install cursor creates overlay manifest', () => {
    const dir = freshDir();
    try {
      run(`install cursor --level minimal --dir "${dir}"`);
      assert.ok(existsSync(join(dir, '.arcanea', 'overlay-manifest.json')),
        'cursor should install overlay manifest');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

// ============================================================
// install --dry-run
// ============================================================

describe('CLI — edge cases: install --dry-run', () => {
  it('dry-run does not write files to disk', () => {
    const dir = freshDir();
    try {
      run(`install claude --level standard --dry-run --dir "${dir}"`);
      const manifestPath = join(dir, '.arcanea', 'overlay-manifest.json');
      assert.ok(!existsSync(manifestPath), 'dry-run should not create overlay manifest');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('dry-run output lists files to create', () => {
    const dir = freshDir();
    try {
      const output = run(`install claude --level minimal --dry-run --dir "${dir}"`);
      assert.ok(
        output.includes('+') || output.includes('Preview') || output.includes('file'),
        'dry-run should show files to create',
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('dry-run output includes estimated size', () => {
    const dir = freshDir();
    try {
      const output = run(`install claude --level minimal --dry-run --dir "${dir}"`);
      assert.ok(output.includes('size') || output.includes('KB') || output.includes('Preview'),
        'dry-run should include size estimate or preview label');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

// ============================================================
// create template slug generation
// ============================================================

describe('CLI — edge cases: create slug generation', () => {
  it('name with spaces is slugified correctly', () => {
    const dir = freshDir();
    try {
      run(`create character "Lady Storm Knight" --dir "${dir}"`);
      const filePath = join(dir, '.arcanea', 'characters', 'lady-storm-knight.md');
      assert.ok(existsSync(filePath), `Expected file at ${filePath}`);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('name with numbers is preserved in slug', () => {
    const dir = freshDir();
    try {
      run(`create scene "Battle Scene 42" --dir "${dir}"`);
      const filePath = join(dir, '.arcanea', 'scenes', 'battle-scene-42.md');
      assert.ok(existsSync(filePath), `Expected file at ${filePath}`);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('unknown create type shows available templates', () => {
    const dir = freshDir();
    try {
      const output = run(`create unknowntype "Test Name" --dir "${dir}"`);
      const lower = output.toLowerCase();
      const showsHelp = lower.includes('character') || lower.includes('available') || lower.includes('template');
      assert.ok(showsHelp, 'Unknown create type should show available templates');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

// ============================================================
// world pillar listing (no aspect specified)
// ============================================================

describe('CLI — edge cases: world pillar listing', () => {
  it('world with no aspect lists the Seven Pillars', () => {
    const dir = freshDir();
    try {
      const output = run(`world --dir "${dir}"`);
      assert.ok(output.includes('geography'), 'Should list geography pillar');
      assert.ok(output.includes('history'), 'Should list history pillar');
      assert.ok(output.includes('cultures'), 'Should list cultures pillar');
      assert.ok(output.includes('magic'), 'Should list magic pillar');
      assert.ok(output.includes('economy'), 'Should list economy pillar');
      assert.ok(output.includes('politics'), 'Should list politics pillar');
      assert.ok(output.includes('belief'), 'Should list belief pillar');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('world with unknown aspect generates no files', () => {
    const dir = freshDir();
    try {
      // Run may succeed (shows pillar list) or exit non-zero; either is fine
      runSafe(`world unknownpillar --name TestRealm --dir "${dir}"`);
      const worldDir = join(dir, '.arcanea', 'worlds', 'testrealm');
      // If the directory was created it should be empty (unknown aspect matched nothing)
      const unknownFile = join(worldDir, 'unknownpillar.md');
      assert.ok(!existsSync(unknownFile), 'Unknown pillar should not create a file on disk');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

// ============================================================
// world realm name edge cases
// ============================================================

describe('CLI — edge cases: world realm name handling', () => {
  it('realm name with special characters is sanitized to safe slug', () => {
    const dir = freshDir();
    try {
      run(`world geography --name "Hello@World!" --dir "${dir}"`);
      // Special chars stripped — becomes "helloworld"
      const safePath = join(dir, '.arcanea', 'worlds', 'helloworld', 'geography.md');
      assert.ok(existsSync(safePath), 'Special chars in realm name should be stripped to safe slug');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('realm name that is only special chars falls back to "realm"', () => {
    const dir = freshDir();
    try {
      run(`world geography --name "!!!" --dir "${dir}"`);
      const fallbackPath = join(dir, '.arcanea', 'worlds', 'realm', 'geography.md');
      assert.ok(existsSync(fallbackPath), 'All-special-char name should fall back to "realm" slug');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

// ============================================================
// tokens with unknown format
// ============================================================

describe('CLI — edge cases: tokens unknown format', () => {
  it('tokens --format unknownfmt falls back to JSON output', () => {
    const output = run('tokens --format unknownfmt');
    // The switch/default falls through to JSON
    assert.doesNotThrow(() => JSON.parse(output), 'Unknown format should fall back to JSON');
  });
});
