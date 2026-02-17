/**
 * @arcanea/cli — Command tests
 * Tests the CLI bundle directly via child_process
 * Run: node --test packages/cli/tests/commands.test.mjs
 */

import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import { execSync } from 'node:child_process';
import { mkdtempSync, rmSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI = join(__dirname, '..', 'dist', 'arcanea.cjs');

function run(args, opts = {}) {
  return execSync(`node ${CLI} ${args}`, {
    encoding: 'utf-8',
    timeout: 15000,
    ...opts,
  });
}

function freshDir() {
  return mkdtempSync(join(tmpdir(), 'arcanea-cli-test-'));
}

describe('CLI — help', () => {
  it('should show version', () => {
    const output = run('--version');
    assert.ok(output.includes('0.2.0'));
  });

  it('should list all 7 commands', () => {
    const output = run('--help');
    const commands = ['init', 'auth', 'status', 'install', 'update', 'world', 'create', 'route', 'voice', 'tokens'];
    for (const cmd of commands) {
      assert.ok(output.includes(cmd), `Missing command: ${cmd}`);
    }
  });
});

describe('CLI — install', () => {
  it('install claude --level minimal creates 2 files', () => {
    const dir = freshDir();
    try {
      run(`install claude --level minimal --dir ${dir}`);
      assert.ok(existsSync(join(dir, '.claude', 'CLAUDE.md')));
      assert.ok(existsSync(join(dir, '.arcanea', 'overlay-manifest.json')));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('install claude --level standard creates skills and agents', () => {
    const dir = freshDir();
    try {
      run(`install claude --level standard --dir ${dir}`);
      const skills = readdirSync(join(dir, '.claude', 'skills')).filter(f => f.endsWith('.md'));
      const agents = readdirSync(join(dir, '.claude', 'agents', 'guardians')).filter(f => f.endsWith('.md'));
      assert.equal(skills.length, 4);
      assert.equal(agents.length, 10);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('install claude --level luminor has deepest content', () => {
    const dir = freshDir();
    try {
      run(`install claude --level luminor --dir ${dir}`);
      const canon = readFileSync(join(dir, '.claude', 'skills', 'arcanea-canon.md'), 'utf-8');
      const lines = canon.split('\n').length;
      assert.ok(lines > 60, `Luminor canon should have >60 lines, got ${lines}`);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('install cursor generates .cursorrules', () => {
    const dir = freshDir();
    try {
      run(`install cursor --level standard --dir ${dir}`);
      assert.ok(existsSync(join(dir, '.cursorrules')), 'Missing .cursorrules');
      assert.ok(existsSync(join(dir, '.arcanea', 'overlay-manifest.json')));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe('CLI — status', () => {
  it('should show status for installed overlay', () => {
    const dir = freshDir();
    try {
      run(`install claude --level standard --dir ${dir}`);
      const output = run(`status --dir ${dir}`);
      assert.ok(output.includes('Claude'));
      assert.ok(output.includes('standard'));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('should show Cursor IDE in providers', () => {
    const dir = freshDir();
    try {
      const output = run(`status --dir ${dir}`);
      assert.ok(output.includes('Cursor IDE'), 'Should show "Cursor IDE" not "OpenCode"');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe('CLI — world', () => {
  it('world --all generates 7 pillar files', () => {
    const dir = freshDir();
    try {
      run(`world --all --name TestRealm --dir ${dir}`);
      const worldDir = join(dir, '.arcanea', 'worlds', 'testrealm');
      assert.ok(existsSync(worldDir));
      const files = readdirSync(worldDir).filter(f => f.endsWith('.md'));
      assert.equal(files.length, 7, `Expected 7 pillars, got: ${files}`);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('world geography generates single pillar', () => {
    const dir = freshDir();
    try {
      run(`world geography --name TestRealm --dir ${dir}`);
      const worldDir = join(dir, '.arcanea', 'worlds', 'testrealm');
      const files = readdirSync(worldDir).filter(f => f.endsWith('.md'));
      assert.equal(files.length, 1);
      assert.ok(files.includes('geography.md'));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('pillar content includes realm name', () => {
    const dir = freshDir();
    try {
      run(`world geography --name "Dragon Peaks" --dir ${dir}`);
      const content = readFileSync(join(dir, '.arcanea', 'worlds', 'dragon-peaks', 'geography.md'), 'utf-8');
      assert.ok(content.includes('Dragon Peaks'));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe('CLI — create', () => {
  it('create character generates template', () => {
    const dir = freshDir();
    try {
      run(`create character "Elena Stormweaver" --dir ${dir}`);
      const filePath = join(dir, '.arcanea', 'characters', 'elena-stormweaver.md');
      assert.ok(existsSync(filePath));
      const content = readFileSync(filePath, 'utf-8');
      assert.ok(content.includes('Elena Stormweaver'));
      assert.ok(content.includes('Character Diamond'));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('create scene generates template', () => {
    const dir = freshDir();
    try {
      run(`create scene "The Final Battle" --dir ${dir}`);
      const filePath = join(dir, '.arcanea', 'scenes', 'the-final-battle.md');
      assert.ok(existsSync(filePath));
      const content = readFileSync(filePath, 'utf-8');
      assert.ok(content.includes('The Final Battle'));
      assert.ok(content.includes('Five Senses'));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('create magic-system generates template', () => {
    const dir = freshDir();
    try {
      run(`create magic-system "Crystalmancy" --dir ${dir}`);
      const filePath = join(dir, '.arcanea', 'magic', 'crystalmancy.md');
      assert.ok(existsSync(filePath));
      const content = readFileSync(filePath, 'utf-8');
      assert.ok(content.includes('Crystalmancy'));
      assert.ok(content.includes('Five Elements'));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe('CLI — update', () => {
  it('update --dry-run shows files to update', () => {
    const dir = freshDir();
    try {
      run(`install claude --level standard --dir ${dir}`);
      const output = run(`update --dry-run --dir ${dir}`);
      assert.ok(output.includes('claude'));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe('CLI — security', () => {
  it('should sanitize path traversal in world name', () => {
    const dir = freshDir();
    try {
      run(`world geography --name "../../../etc" --dir ${dir}`);
      // Traversal dots stripped — becomes "etc" slug
      const safePath = join(dir, '.arcanea', 'worlds', 'etc', 'geography.md');
      assert.ok(existsSync(safePath), 'Sanitized name should create file in safe path');
      // Must NOT create files outside target dir
      assert.ok(!existsSync('/etc/geography.md'), 'Must not escape target directory');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('should reject path traversal in create name', () => {
    const dir = freshDir();
    try {
      run(`create character "../../etc/passwd" --dir ${dir}`);
      assert.ok(!existsSync('/etc/passwd.md'));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
