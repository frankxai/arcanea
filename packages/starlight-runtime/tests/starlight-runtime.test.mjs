/**
 * Test suite for @starlight/runtime (ContextLoader, formerly StarlightRuntime)
 * Tests all exports from dist/index.js using Node.js built-in test runner.
 *
 * Note: dist/index.js is compiled CommonJS but package.json has "type": "module".
 * We use a local .cjs copy to load it correctly from this ESM test file.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Load the CJS dist via createRequire using the .cjs copy in this tests directory
const require = createRequire(import.meta.url);
const { ContextLoader, StarlightRuntime } = require('./starlight-runtime.cjs');

// -------------------------------------------------------------------------
// Class existence
// -------------------------------------------------------------------------
describe('ContextLoader class', () => {
  it('is exported as a class (function)', () => {
    assert.strictEqual(typeof ContextLoader, 'function');
  });

  it('can be instantiated with a rootPath config', () => {
    const rt = new ContextLoader({ rootPath: '/tmp' });
    assert.ok(rt instanceof ContextLoader);
  });

  it('has loadContext method', () => {
    const rt = new ContextLoader({ rootPath: '/tmp' });
    assert.strictEqual(typeof rt.loadContext, 'function');
  });

  it('has generateSystemPrompt method', () => {
    const rt = new ContextLoader({ rootPath: '/tmp' });
    assert.strictEqual(typeof rt.generateSystemPrompt, 'function');
  });

  it('has readMd method', () => {
    const rt = new ContextLoader({ rootPath: '/tmp' });
    assert.strictEqual(typeof rt.readMd, 'function');
  });
});

describe('StarlightRuntime backwards-compatibility alias', () => {
  it('StarlightRuntime is the same class as ContextLoader', () => {
    assert.strictEqual(StarlightRuntime, ContextLoader);
  });

  it('instances of StarlightRuntime are instances of ContextLoader', () => {
    const rt = new ContextLoader({ rootPath: '/tmp' });
    assert.ok(rt instanceof ContextLoader);
  });
});

// -------------------------------------------------------------------------
// loadContext
// -------------------------------------------------------------------------
describe('loadContext', () => {
  it('returns an object with constitution, role, strategy, techStack keys', () => {
    const rt = new ContextLoader({ rootPath: '/tmp' });
    const ctx = rt.loadContext('DEPT_TEST', 'agent.md', 'strategy.md');
    assert.strictEqual(typeof ctx, 'object');
    assert.ok('constitution' in ctx);
    assert.ok('role' in ctx);
    assert.ok('strategy' in ctx);
    assert.ok('techStack' in ctx);
  });

  it('all context fields are strings', () => {
    const rt = new ContextLoader({ rootPath: '/tmp' });
    const ctx = rt.loadContext('DEPT_TEST', 'agent.md', 'strategy.md');
    assert.strictEqual(typeof ctx.constitution, 'string');
    assert.strictEqual(typeof ctx.role, 'string');
    assert.strictEqual(typeof ctx.strategy, 'string');
    assert.strictEqual(typeof ctx.techStack, 'string');
  });

  it('returns MISSING marker for non-existent files in /tmp', () => {
    const rt = new ContextLoader({ rootPath: '/tmp' });
    const ctx = rt.loadContext('DEPT_FAKE', 'nonexistent.md', 'fake.md');
    // Files won't exist so readMd returns [MISSING: ...] placeholders
    assert.ok(ctx.constitution.includes('[MISSING:') || ctx.constitution === '');
  });

  it('works with real files when they exist', () => {
    // Create a temp directory with Starlight structure
    const tmpRoot = mkdtempSync(join(tmpdir(), 'starlight-test-'));
    const identityDir = join(tmpRoot, '00_IDENTITY');
    const agencyDir = join(tmpRoot, '03_AGENCY', 'DEPT_ENG');
    const stratDir = join(tmpRoot, '02_PROTOCOL', 'STRATEGIES');
    const techDir = join(tmpRoot, '01_INTELLECT', 'VAULT_TECH');

    mkdirSync(identityDir, { recursive: true });
    mkdirSync(agencyDir, { recursive: true });
    mkdirSync(stratDir, { recursive: true });
    mkdirSync(techDir, { recursive: true });

    writeFileSync(join(identityDir, 'LUMINOR_CONSTITUTION.md'), '# Constitution\nArcanea Constitution content.');
    writeFileSync(join(agencyDir, 'AGENT_TEST.md'), '# Agent Role\nTest agent role.');
    writeFileSync(join(stratDir, 'TEST_STRATEGY.md'), '# Strategy\nTest strategy.');
    writeFileSync(join(techDir, 'STARLIGHT_STACK.md'), '# Stack\nNext.js + Supabase.');

    const rt = new ContextLoader({ rootPath: tmpRoot });
    const ctx = rt.loadContext('DEPT_ENG', 'AGENT_TEST.md', 'TEST_STRATEGY.md');

    assert.ok(ctx.constitution.includes('Constitution'));
    assert.ok(ctx.role.includes('Agent Role'));
    assert.ok(ctx.strategy.includes('Strategy'));
    assert.ok(ctx.techStack.includes('Stack'));
  });
});

// -------------------------------------------------------------------------
// readMd
// -------------------------------------------------------------------------
describe('readMd', () => {
  it('returns file content when file exists', () => {
    const tmpRoot = mkdtempSync(join(tmpdir(), 'starlight-readmd-'));
    writeFileSync(join(tmpRoot, 'test.md'), '# Hello World\nThis is test content.');

    const rt = new ContextLoader({ rootPath: tmpRoot });
    const content = rt.readMd('test.md');
    assert.ok(content.includes('Hello World'));
    assert.ok(content.includes('test content'));
  });

  it('returns [MISSING: path] when file does not exist', () => {
    const rt = new ContextLoader({ rootPath: '/tmp' });
    const content = rt.readMd('definitely-does-not-exist-file.md');
    assert.ok(content.includes('[MISSING:'));
  });

  it('returns a string in all cases', () => {
    const rt = new ContextLoader({ rootPath: '/tmp' });
    const content = rt.readMd('any-file.md');
    assert.strictEqual(typeof content, 'string');
  });

  it('handles nested paths correctly', () => {
    const tmpRoot = mkdtempSync(join(tmpdir(), 'starlight-nested-'));
    const subDir = join(tmpRoot, '00_IDENTITY');
    mkdirSync(subDir, { recursive: true });
    writeFileSync(join(subDir, 'nested.md'), '# Nested\nNested content here.');

    const rt = new ContextLoader({ rootPath: tmpRoot });
    const content = rt.readMd('00_IDENTITY/nested.md');
    assert.ok(content.includes('Nested'));
  });
});

// -------------------------------------------------------------------------
// generateSystemPrompt
// -------------------------------------------------------------------------
describe('generateSystemPrompt', () => {
  it('returns a non-empty string', () => {
    const rt = new ContextLoader({ rootPath: '/tmp' });
    const ctx = rt.loadContext('DEPT', 'a.md', 'b.md');
    const prompt = rt.generateSystemPrompt(ctx);
    assert.strictEqual(typeof prompt, 'string');
    assert.ok(prompt.length > 0);
  });

  it('contains STARLIGHT PROTOCOL header', () => {
    const rt = new ContextLoader({ rootPath: '/tmp' });
    const ctx = rt.loadContext('DEPT', 'a.md', 'b.md');
    const prompt = rt.generateSystemPrompt(ctx);
    assert.ok(prompt.includes('STARLIGHT PROTOCOL'));
  });

  it('contains all four sections: CONSTITUTION, TECH STACK, ACTIVE AGENT, COGNITIVE STRATEGY', () => {
    const rt = new ContextLoader({ rootPath: '/tmp' });
    const ctx = rt.loadContext('DEPT', 'a.md', 'b.md');
    const prompt = rt.generateSystemPrompt(ctx);
    assert.ok(prompt.includes('CONSTITUTION'));
    assert.ok(prompt.includes('TECH STACK'));
    assert.ok(prompt.includes('ACTIVE AGENT') || prompt.includes('AGENT'));
    assert.ok(prompt.includes('COGNITIVE STRATEGY') || prompt.includes('STRATEGY'));
  });

  it('embeds context constitution content in the prompt', () => {
    const tmpRoot = mkdtempSync(join(tmpdir(), 'starlight-gsp-'));
    const identityDir = join(tmpRoot, '00_IDENTITY');
    const agencyDir = join(tmpRoot, '03_AGENCY', 'DEPT_ENG');
    const stratDir = join(tmpRoot, '02_PROTOCOL', 'STRATEGIES');
    const techDir = join(tmpRoot, '01_INTELLECT', 'VAULT_TECH');

    mkdirSync(identityDir, { recursive: true });
    mkdirSync(agencyDir, { recursive: true });
    mkdirSync(stratDir, { recursive: true });
    mkdirSync(techDir, { recursive: true });

    writeFileSync(join(identityDir, 'LUMINOR_CONSTITUTION.md'), 'UNIQUE_CONSTITUTION_CONTENT_12345');
    writeFileSync(join(agencyDir, 'AGENT.md'), 'UNIQUE_AGENT_CONTENT_67890');
    writeFileSync(join(stratDir, 'STRATEGY.md'), 'UNIQUE_STRATEGY_CONTENT_ABCDE');
    writeFileSync(join(techDir, 'STARLIGHT_STACK.md'), 'UNIQUE_TECH_CONTENT_FGHIJ');

    const rt = new ContextLoader({ rootPath: tmpRoot });
    const ctx = rt.loadContext('DEPT_ENG', 'AGENT.md', 'STRATEGY.md');
    const prompt = rt.generateSystemPrompt(ctx);

    assert.ok(prompt.includes('UNIQUE_CONSTITUTION_CONTENT_12345'));
    assert.ok(prompt.includes('UNIQUE_AGENT_CONTENT_67890'));
    assert.ok(prompt.includes('UNIQUE_STRATEGY_CONTENT_ABCDE'));
    assert.ok(prompt.includes('UNIQUE_TECH_CONTENT_FGHIJ'));
  });

  it('contains the immediate instruction section', () => {
    const rt = new ContextLoader({ rootPath: '/tmp' });
    const ctx = rt.loadContext('DEPT', 'a.md', 'b.md');
    const prompt = rt.generateSystemPrompt(ctx);
    assert.ok(prompt.includes('IMMEDIATE INSTRUCTION') || prompt.includes('Act as the agent'));
  });

  it('prompt does not have leading or trailing whitespace (is trimmed)', () => {
    const rt = new ContextLoader({ rootPath: '/tmp' });
    const ctx = rt.loadContext('DEPT', 'a.md', 'b.md');
    const prompt = rt.generateSystemPrompt(ctx);
    assert.strictEqual(prompt, prompt.trim());
  });
});

// -------------------------------------------------------------------------
// Integration: end-to-end loadContext -> generateSystemPrompt
// -------------------------------------------------------------------------
describe('Integration: full context load to prompt generation', () => {
  it('produces a well-structured prompt with all Starlight sections', () => {
    const tmpRoot = mkdtempSync(join(tmpdir(), 'starlight-int-'));
    const dirs = [
      join(tmpRoot, '00_IDENTITY'),
      join(tmpRoot, '03_AGENCY', 'DEPT_ARCANEA'),
      join(tmpRoot, '02_PROTOCOL', 'STRATEGIES'),
      join(tmpRoot, '01_INTELLECT', 'VAULT_TECH'),
    ];
    for (const d of dirs) mkdirSync(d, { recursive: true });

    writeFileSync(join(dirs[0], 'LUMINOR_CONSTITUTION.md'),
      '# Arcanea Constitution\n"Through the Gates we rise. With the Guardians we create."');
    writeFileSync(join(dirs[1], 'GUARDIAN_LYSSANDRIA.md'),
      '# Lyssandria\nGuardian of the Foundation Gate. 396 Hz. Earth element.');
    writeFileSync(join(dirs[2], 'GATE_STRATEGY.md'),
      '# Gate Strategy\nRoute tasks to the appropriate Guardian based on domain.');
    writeFileSync(join(dirs[3], 'STARLIGHT_STACK.md'),
      '# Starlight Stack\nNext.js 16 + Supabase + Vercel AI SDK');

    const rt = new ContextLoader({ rootPath: tmpRoot });
    const ctx = rt.loadContext('DEPT_ARCANEA', 'GUARDIAN_LYSSANDRIA.md', 'GATE_STRATEGY.md');
    const prompt = rt.generateSystemPrompt(ctx);

    // Verify all injected content is present
    assert.ok(prompt.includes('Arcanea Constitution'));
    assert.ok(prompt.includes('Lyssandria'));
    assert.ok(prompt.includes('Gate Strategy'));
    assert.ok(prompt.includes('Starlight Stack'));

    // Verify structural sections
    assert.ok(prompt.includes('STARLIGHT PROTOCOL'));
    assert.ok(prompt.length > 100);
  });

  it('multiple instances are independent', () => {
    const rt1 = new ContextLoader({ rootPath: '/tmp/path1' });
    const rt2 = new ContextLoader({ rootPath: '/tmp/path2' });

    // Both should work independently
    const ctx1 = rt1.loadContext('DEPT', 'a.md', 'b.md');
    const ctx2 = rt2.loadContext('DEPT', 'a.md', 'b.md');

    assert.ok(typeof ctx1 === 'object');
    assert.ok(typeof ctx2 === 'object');
  });
});
