/**
 * @arcanea/overlay-claude — Hook generator tests
 * Tests all 8 hook generators, statusline, AgentDB schema, helpers,
 * settings generation, and verifies the installer creates everything.
 *
 * Run: node --test packages/overlay-claude/tests/hooks.test.mjs
 */

import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import { mkdtempSync, rmSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const {
  generateSessionStartHook,
  generatePromptSubmitHook,
  generateModelRouteHook,
  generatePreToolHook,
  generateVoiceCheckHook,
  generatePostToolHook,
  generateContextTrackerHook,
  generateSessionEndHook,
  generateStatusline,
  generateHookSettings,
  generateAgentDBSchema,
  generateAgentDBInit,
  generateQuickStatusScript,
  generateHealthCheckScript,
  getAllHookFiles,
  getAllHelperFiles,
} = await import('../dist/hook-generators.js');

const { ClaudeOverlayInstaller } = await import('../dist/installer.js');

function freshDir() {
  return mkdtempSync(join(tmpdir(), 'arcanea-hooks-test-'));
}

// ─── Hook Content Tests ─────────────────────────────────────────────────────

describe('Hook generators — content quality', () => {
  describe('session-start.sh', () => {
    const content = generateSessionStartHook();

    it('should start with shebang', () => {
      assert.ok(content.startsWith('#!/usr/bin/env bash'));
    });

    it('should use set +e (never crash)', () => {
      assert.ok(content.includes('set +e'));
    });

    it('should initialize AgentDB', () => {
      assert.ok(content.includes('AgentDB'));
      assert.ok(content.includes('init.sh'));
    });

    it('should set Shinkami as default Guardian', () => {
      assert.ok(content.includes('"Shinkami"'));
    });

    it('should create session directories', () => {
      assert.ok(content.includes('mkdir -p'));
    });

    it('should initialize token tracking', () => {
      assert.ok(content.includes('tokens.json'));
    });

    it('should use ARCANEA_HOME for portable paths', () => {
      assert.ok(content.includes('ARCANEA_HOME'));
      assert.ok(!content.includes('/mnt/c/Users'));
    });
  });

  describe('prompt-submit.sh', () => {
    const content = generatePromptSubmitHook();

    it('should route to all 10 Guardians', () => {
      const guardians = ['Shinkami', 'Elara', 'Alera', 'Ino', 'Lyssandria', 'Lyria', 'Draconia', 'Maylinn', 'Aiyami', 'Leyla'];
      for (const g of guardians) {
        assert.ok(content.includes(`GUARDIAN="${g}"`), `Missing Guardian: ${g}`);
      }
    });

    it('should write state files to session dir', () => {
      assert.ok(content.includes('$SESSION_DIR/guardian'));
      assert.ok(content.includes('$SESSION_DIR/gate'));
    });

    it('should log to AgentDB routing_log', () => {
      assert.ok(content.includes('routing_log'));
    });

    it('should use case-insensitive matching', () => {
      assert.ok(content.includes("tr '[:upper:]' '[:lower:]'"));
    });
  });

  describe('model-route.sh', () => {
    const content = generateModelRouteHook();

    it('should output MODEL_RECOMMENDATION format', () => {
      assert.ok(content.includes('[MODEL_RECOMMENDATION]'));
    });

    it('should support three tiers: opus, sonnet, haiku', () => {
      assert.ok(content.includes('MODEL="opus"'));
      assert.ok(content.includes('MODEL="sonnet"'));
      assert.ok(content.includes('MODEL="haiku"'));
    });

    it('should clamp complexity to 1-10', () => {
      assert.ok(content.includes('COMPLEXITY" -lt 1'));
      assert.ok(content.includes('COMPLEXITY" -gt 10'));
    });

    it('should have opus keywords worth +3', () => {
      assert.ok(content.includes('COMPLEXITY + 3'));
    });

    it('should default to sonnet on empty input', () => {
      assert.ok(content.includes('no task provided'));
      assert.ok(content.includes('sonnet'));
    });
  });

  describe('pre-tool.sh', () => {
    const content = generatePreToolHook();

    it('should increment tool counter', () => {
      assert.ok(content.includes('COUNT=$((COUNT + 1))'));
    });

    it('should log to tools.log', () => {
      assert.ok(content.includes('tools.log'));
    });

    it('should truncate input preview', () => {
      assert.ok(content.includes(':0:120'));
    });
  });

  describe('voice-check.sh', () => {
    const content = generateVoiceCheckHook();

    it('should always exit 0 (never block)', () => {
      assert.ok(content.includes('exit 0'));
    });

    it('should include banned phrases with replacements', () => {
      assert.ok(content.includes('game-changing|transformative'));
      assert.ok(content.includes('ecosystem|living universe'));
      assert.ok(content.includes('leverage|channel'));
    });

    it('should have context-sensitive phrases', () => {
      assert.ok(content.includes('CONTEXT_SENSITIVE'));
      assert.ok(content.includes('ecosystem'));
      assert.ok(content.includes('platform'));
    });

    it('should output to stderr (not stdout)', () => {
      assert.ok(content.includes('>&2'));
    });

    it('should log violations to file', () => {
      assert.ok(content.includes('voice-violations.log'));
    });
  });

  describe('post-tool.sh', () => {
    const content = generatePostToolHook();

    it('should log tool completion', () => {
      assert.ok(content.includes('DONE'));
      assert.ok(content.includes('tools.log'));
    });

    it('should filter significant operations (Write/Edit/Bash)', () => {
      assert.ok(content.includes('Write|Edit|Bash'));
    });

    it('should write to AgentDB memories', () => {
      assert.ok(content.includes('memories'));
    });
  });

  describe('context-tracker.sh', () => {
    const content = generateContextTrackerHook();

    it('should define four quality zones', () => {
      assert.ok(content.includes('PEAK'));
      assert.ok(content.includes('GOOD'));
      assert.ok(content.includes('DEGRADING'));
      assert.ok(content.includes('REFRESH'));
    });

    it('should define tool cost estimates', () => {
      assert.ok(content.includes('[Read]=500'));
      assert.ok(content.includes('[Task]=5000'));
    });

    it('should use python3 for JSON (portable)', () => {
      assert.ok(content.includes('python3'));
    });

    it('should track zone transitions in AgentDB', () => {
      assert.ok(content.includes('prev-zone'));
    });

    it('should default max tokens to 200000', () => {
      assert.ok(content.includes('200000'));
    });
  });

  describe('session-end.sh', () => {
    const content = generateSessionEndHook();

    it('should read session metrics', () => {
      assert.ok(content.includes('tool-count'));
      assert.ok(content.includes('routing.log'));
    });

    it('should write to AgentDB vault_entries', () => {
      assert.ok(content.includes('vault_entries'));
    });

    it('should archive session', () => {
      assert.ok(content.includes('archive'));
      assert.ok(content.includes('cp -r'));
    });

    it('should reset agents to idle', () => {
      assert.ok(content.includes("status='idle'"));
    });
  });
});

// ─── Statusline Tests ───────────────────────────────────────────────────────

describe('Statusline generator', () => {
  const content = generateStatusline();

  it('should be a valid Node.js ESM script', () => {
    assert.ok(content.includes('#!/usr/bin/env node'));
    assert.ok(content.includes("import {"));
  });

  it('should read Guardian state', () => {
    assert.ok(content.includes('guardian'));
    assert.ok(content.includes('gate'));
  });

  it('should have Guardian verbs for all 10', () => {
    const verbs = ['observes', 'forges', 'sees', 'weaves', 'grounds', 'heals', 'speaks', 'illuminates', 'shifts', 'unites'];
    for (const v of verbs) {
      assert.ok(content.includes(v), `Missing verb: ${v}`);
    }
  });

  it('should detect git branch', () => {
    assert.ok(content.includes('git rev-parse'));
  });

  it('should compose multi-part statusline', () => {
    assert.ok(content.includes('Arcanea'));
    assert.ok(content.includes('.join'));
  });

  it('should use ARCANEA_HOME for portable paths', () => {
    assert.ok(content.includes('ARCANEA_HOME'));
    assert.ok(!content.includes('/mnt/c/Users'));
  });
});

// ─── Settings Tests ─────────────────────────────────────────────────────────

describe('Hook settings generator', () => {
  const settings = generateHookSettings('/test/project');

  it('should have all 5 hook events', () => {
    assert.ok(settings.hooks.SessionStart);
    assert.ok(settings.hooks.UserPromptSubmit);
    assert.ok(settings.hooks.PreToolUse);
    assert.ok(settings.hooks.PostToolUse);
    assert.ok(settings.hooks.Stop);
  });

  it('should register session-start on SessionStart', () => {
    const cmd = settings.hooks.SessionStart[0].hooks[0].command;
    assert.ok(cmd.includes('session-start.sh'));
  });

  it('should register prompt-submit and model-route on UserPromptSubmit', () => {
    const hooks = settings.hooks.UserPromptSubmit[0].hooks;
    assert.equal(hooks.length, 2);
    assert.ok(hooks[0].command.includes('prompt-submit.sh'));
    assert.ok(hooks[1].command.includes('model-route.sh'));
  });

  it('should have PreToolUse with matchers', () => {
    const preTool = settings.hooks.PreToolUse;
    assert.equal(preTool.length, 2);
    assert.ok(preTool[0].matcher.includes('Task'));
    assert.ok(preTool[1].matcher.includes('Write'));
  });

  it('should register voice-check only on Write|Edit', () => {
    const voiceHook = settings.hooks.PreToolUse[1];
    assert.equal(voiceHook.matcher, 'Write|Edit');
    assert.ok(voiceHook.hooks[0].command.includes('voice-check.sh'));
  });

  it('should register post-tool and context-tracker on PostToolUse', () => {
    const hooks = settings.hooks.PostToolUse[0].hooks;
    assert.equal(hooks.length, 2);
    assert.ok(hooks[0].command.includes('post-tool.sh'));
    assert.ok(hooks[1].command.includes('context-tracker.sh'));
  });

  it('should use the project dir in hook paths', () => {
    const cmd = settings.hooks.SessionStart[0].hooks[0].command;
    assert.ok(cmd.includes('/test/project'));
  });

  it('should set timeouts on tool hooks', () => {
    const preTool = settings.hooks.PreToolUse[0].hooks[0];
    assert.equal(preTool.timeout, 3000);
    const sessionEnd = settings.hooks.Stop[0].hooks[0];
    assert.equal(sessionEnd.timeout, 5000);
  });
});

// ─── AgentDB Tests ──────────────────────────────────────────────────────────

describe('AgentDB generators', () => {
  describe('schema', () => {
    const schema = generateAgentDBSchema();

    it('should create 7 tables', () => {
      const tables = schema.match(/CREATE TABLE/g);
      assert.equal(tables.length, 7);
    });

    it('should create agents table', () => {
      assert.ok(schema.includes('CREATE TABLE IF NOT EXISTS agents'));
    });

    it('should create memories table', () => {
      assert.ok(schema.includes('CREATE TABLE IF NOT EXISTS memories'));
    });

    it('should create routing_log table', () => {
      assert.ok(schema.includes('CREATE TABLE IF NOT EXISTS routing_log'));
    });

    it('should create vault_entries table', () => {
      assert.ok(schema.includes('CREATE TABLE IF NOT EXISTS vault_entries'));
    });

    it('should seed all 10 Guardians', () => {
      const guardians = ['lyssandria', 'leyla', 'draconia', 'maylinn', 'alera', 'lyria', 'aiyami', 'elara', 'ino', 'shinkami'];
      for (const g of guardians) {
        assert.ok(schema.includes(`'${g}'`), `Missing Guardian seed: ${g}`);
      }
    });

    it('should set Shinkami as active by default', () => {
      assert.ok(schema.includes("'shinkami'") && schema.includes("'Shinkami'") && schema.includes("'active'"));
    });
  });

  describe('init script', () => {
    const init = generateAgentDBInit();

    it('should use python3 (not sqlite3 CLI)', () => {
      assert.ok(init.includes('python3'));
      assert.ok(!init.includes('sqlite3 "$DB_PATH"'));
    });

    it('should reference schema.sql', () => {
      assert.ok(init.includes('schema.sql'));
    });
  });
});

// ─── Helper Scripts Tests ───────────────────────────────────────────────────

describe('Helper scripts', () => {
  describe('quick-status', () => {
    const content = generateQuickStatusScript();

    it('should display Guardian, Gate, tool count, context zone', () => {
      assert.ok(content.includes('Guardian'));
      assert.ok(content.includes('Gate'));
      assert.ok(content.includes('Tools'));
      assert.ok(content.includes('Context'));
    });
  });

  describe('health-check', () => {
    const content = generateHealthCheckScript();

    it('should check critical subsystems', () => {
      assert.ok(content.includes('Session directory'));
      assert.ok(content.includes('Guardian state'));
      assert.ok(content.includes('AgentDB'));
      assert.ok(content.includes('Python3'));
    });

    it('should report pass/fail counts', () => {
      assert.ok(content.includes('PASS'));
      assert.ok(content.includes('FAIL'));
    });
  });
});

// ─── Aggregate Functions ────────────────────────────────────────────────────

describe('getAllHookFiles', () => {
  const hooks = getAllHookFiles();

  it('should return 8 hook files', () => {
    assert.equal(hooks.length, 8);
  });

  it('should all be executable', () => {
    for (const hook of hooks) {
      assert.equal(hook.executable, true, `${hook.filename} should be executable`);
    }
  });

  it('should all be .sh files', () => {
    for (const hook of hooks) {
      assert.ok(hook.filename.endsWith('.sh'), `${hook.filename} should end with .sh`);
    }
  });

  it('should include all expected hooks', () => {
    const names = hooks.map(h => h.filename);
    assert.ok(names.includes('session-start.sh'));
    assert.ok(names.includes('prompt-submit.sh'));
    assert.ok(names.includes('model-route.sh'));
    assert.ok(names.includes('pre-tool.sh'));
    assert.ok(names.includes('voice-check.sh'));
    assert.ok(names.includes('post-tool.sh'));
    assert.ok(names.includes('context-tracker.sh'));
    assert.ok(names.includes('session-end.sh'));
  });
});

describe('getAllHelperFiles', () => {
  const helpers = getAllHelperFiles();

  it('should return 2 helper files', () => {
    assert.equal(helpers.length, 2);
  });

  it('should all be executable', () => {
    for (const h of helpers) {
      assert.equal(h.executable, true);
    }
  });
});

// ─── Integration: Installer creates hooks ───────────────────────────────────

describe('Installer — hook integration', () => {
  let dir, result;
  const installer = new ClaudeOverlayInstaller();

  before(async () => {
    dir = freshDir();
    result = await installer.install(dir, 'standard');
  });

  after(() => rmSync(dir, { recursive: true, force: true }));

  it('should create hooks directory', () => {
    assert.ok(existsSync(join(dir, '.claude', 'hooks')));
  });

  it('should create all 8 hook scripts', () => {
    const hooksDir = join(dir, '.claude', 'hooks');
    const files = readdirSync(hooksDir).filter(f => f.endsWith('.sh'));
    assert.equal(files.length, 8, `Expected 8 hooks, got: ${files}`);
  });

  it('should create statusline.mjs', () => {
    assert.ok(existsSync(join(dir, '.claude', 'statusline.mjs')));
  });

  it('should create settings.local.json with hook registration', () => {
    const settingsPath = join(dir, '.claude', 'settings.local.json');
    assert.ok(existsSync(settingsPath));
    const settings = JSON.parse(readFileSync(settingsPath, 'utf-8'));
    assert.ok(settings.hooks);
    assert.ok(settings.hooks.SessionStart);
    assert.ok(settings.hooks.UserPromptSubmit);
    assert.ok(settings.hooks.PreToolUse);
    assert.ok(settings.hooks.PostToolUse);
    assert.ok(settings.hooks.Stop);
  });

  it('should create AgentDB schema and init', () => {
    assert.ok(existsSync(join(dir, '.claude', 'agentdb', 'schema.sql')));
    assert.ok(existsSync(join(dir, '.claude', 'agentdb', 'init.sh')));
  });

  it('should create helper scripts', () => {
    assert.ok(existsSync(join(dir, '.claude', 'helpers', 'arcanea-quick-status.sh')));
    assert.ok(existsSync(join(dir, '.claude', 'helpers', 'arcanea-health.sh')));
  });

  it('hook content should be valid bash', () => {
    const hookDir = join(dir, '.claude', 'hooks');
    const files = readdirSync(hookDir).filter(f => f.endsWith('.sh'));
    for (const f of files) {
      const content = readFileSync(join(hookDir, f), 'utf-8');
      assert.ok(content.startsWith('#!/usr/bin/env bash'), `${f} missing shebang`);
    }
  });

  it('settings.local.json paths should reference the project dir', () => {
    const settings = JSON.parse(readFileSync(join(dir, '.claude', 'settings.local.json'), 'utf-8'));
    const cmd = settings.hooks.SessionStart[0].hooks[0].command;
    assert.ok(cmd.includes(dir), `Hook command should reference project dir: ${cmd}`);
  });

  it('manifest should track all created files', () => {
    const manifest = JSON.parse(readFileSync(join(dir, '.arcanea', 'overlay-manifest.json'), 'utf-8'));
    const managed = manifest.overlays.claude.filesManaged;
    // Should track hooks, skills, agents, statusline, settings, agentdb, helpers
    assert.ok(managed.length >= 28, `Expected at least 28 managed files, got ${managed.length}: ${managed.join(', ')}`);
  });

  it('getManifest should report new capabilities', () => {
    const manifest = installer.getManifest();
    assert.ok(manifest.capabilities.includes('hooks'));
    assert.ok(manifest.capabilities.includes('statusline'));
    assert.ok(manifest.capabilities.includes('agentdb'));
    assert.ok(manifest.capabilities.includes('context-tracking'));
    assert.ok(manifest.capabilities.includes('voice-enforcement'));
    assert.ok(manifest.capabilities.includes('model-routing'));
  });
});

describe('Installer — minimal should NOT install hooks', () => {
  let dir, result;
  const installer = new ClaudeOverlayInstaller();

  before(async () => {
    dir = freshDir();
    result = await installer.install(dir, 'minimal');
  });

  after(() => rmSync(dir, { recursive: true, force: true }));

  it('should NOT create hooks directory', () => {
    assert.ok(!existsSync(join(dir, '.claude', 'hooks')));
  });

  it('should NOT create statusline', () => {
    assert.ok(!existsSync(join(dir, '.claude', 'statusline.mjs')));
  });

  it('should NOT create settings.local.json', () => {
    assert.ok(!existsSync(join(dir, '.claude', 'settings.local.json')));
  });

  it('should NOT create agentdb', () => {
    assert.ok(!existsSync(join(dir, '.claude', 'agentdb')));
  });
});

describe('Installer — idempotency with hooks', () => {
  let dir;
  const installer = new ClaudeOverlayInstaller();

  before(async () => {
    dir = freshDir();
    await installer.install(dir, 'standard');
  });

  after(() => rmSync(dir, { recursive: true, force: true }));

  it('second install should not duplicate hooks', async () => {
    const second = await installer.install(dir, 'standard');
    assert.ok(second.filesCreated.length <= 1, `Should not re-create files: ${second.filesCreated}`);
  });

  it('second install should warn about existing settings', async () => {
    const second = await installer.install(dir, 'standard');
    const hasWarning = second.warnings.some(w => w.includes('hooks'));
    assert.ok(hasWarning, 'Should warn about existing hook settings');
  });
});

describe('Installer — preview should list hooks', () => {
  it('standard preview should include hook files', async () => {
    const dir = freshDir();
    const installer = new ClaudeOverlayInstaller();
    try {
      const preview = await installer.preview(dir, 'standard');
      const paths = preview.filesToCreate.map(f => f.path);
      assert.ok(paths.some(p => p.includes('session-start')));
      assert.ok(paths.some(p => p.includes('statusline')));
      assert.ok(paths.some(p => p.includes('settings.local')));
      assert.ok(paths.some(p => p.includes('schema.sql')));
      assert.ok(paths.some(p => p.includes('arcanea-health')));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('minimal preview should NOT list hooks', async () => {
    const dir = freshDir();
    const installer = new ClaudeOverlayInstaller();
    try {
      const preview = await installer.preview(dir, 'minimal');
      const paths = preview.filesToCreate.map(f => f.path);
      assert.ok(!paths.some(p => p.includes('session-start')));
      assert.ok(!paths.some(p => p.includes('statusline')));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

// ─── Portability: No hardcoded paths ────────────────────────────────────────

describe('Portability — no hardcoded paths', () => {
  const generators = [
    { name: 'session-start', fn: generateSessionStartHook },
    { name: 'prompt-submit', fn: generatePromptSubmitHook },
    { name: 'model-route', fn: generateModelRouteHook },
    { name: 'pre-tool', fn: generatePreToolHook },
    { name: 'voice-check', fn: generateVoiceCheckHook },
    { name: 'post-tool', fn: generatePostToolHook },
    { name: 'context-tracker', fn: generateContextTrackerHook },
    { name: 'session-end', fn: generateSessionEndHook },
    { name: 'statusline', fn: generateStatusline },
    { name: 'quick-status', fn: generateQuickStatusScript },
    { name: 'health-check', fn: generateHealthCheckScript },
    { name: 'agentdb-init', fn: generateAgentDBInit },
  ];

  for (const { name, fn } of generators) {
    it(`${name} should not contain hardcoded paths`, () => {
      const content = fn();
      assert.ok(!content.includes('/mnt/c/Users'), `${name} contains hardcoded WSL path`);
      assert.ok(!content.includes('/tmp/arcanea-'), `${name} should use ARCANEA_HOME, not /tmp/arcanea-`);
    });
  }
});
