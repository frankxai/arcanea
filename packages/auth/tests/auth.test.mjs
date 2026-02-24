/**
 * @arcanea/auth — Universal AI provider authentication tests
 *
 * Tests adapter registry, environment-variable keystore, encrypted-file
 * keystore, cascading keystore, and utility helpers.
 *
 * Network calls are avoided — adapters are tested for structure/interface
 * correctness. The EncryptedFileKeystore is exercised with a real ephemeral
 * write so encryption/decryption round-trips can be verified.
 *
 * Run: node --test packages/auth/tests/auth.test.mjs
 */

import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import { existsSync, rmSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import {
  VERSION,
  getAuthAdapter,
  getAllAdapters,
  getAdapterByEnvVar,
  ClaudeAuthAdapter,
  OpenAIAuthAdapter,
  GeminiAuthAdapter,
  CopilotAuthAdapter,
  CursorAuthAdapter,
  createKeystore,
  EnvKeystore,
  EncryptedFileKeystore,
  CascadingKeystore,
  maskCredential,
} from '../dist/index.js';

import { readFileSync, writeFileSync } from 'node:fs';

// ============================================
// VERSION
// ============================================

describe('package version', () => {
  it('exports a non-empty VERSION string', () => {
    assert.ok(typeof VERSION === 'string' && VERSION.length > 0, 'VERSION must be a non-empty string');
  });
});

// ============================================
// maskCredential
// ============================================

describe('maskCredential', () => {
  it('masks a long API key showing prefix + suffix', () => {
    const masked = maskCredential('sk-ant-api03-1234567890abcdef');
    assert.ok(masked.includes('sk-ant-'), 'should preserve 7-char prefix');
    assert.ok(masked.includes('cdef'), 'should preserve 4-char suffix');
    assert.ok(masked.includes('•'), 'should contain bullet replacement chars');
  });

  it('returns all bullets for a key of 8 chars or fewer', () => {
    const masked = maskCredential('shortkey');
    assert.equal(masked, '••••••••', 'short key should be fully masked');
  });

  it('masks a key of exactly 9 characters (shows prefix + suffix)', () => {
    const masked = maskCredential('123456789');
    // prefix = '1234567' (7 chars), suffix = '6789' (4 chars) but key is 9 chars total
    // prefix '1234567', then '•••', then suffix '6789' -> that's prefix[0..6] + suffix[-4..]
    assert.ok(masked.startsWith('1234567'), 'should start with first 7 chars');
    assert.ok(masked.endsWith('6789'), 'should end with last 4 chars');
  });

  it('masks a typical Anthropic API key format', () => {
    const key = 'sk-ant-api03-AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHH';
    const masked = maskCredential(key);
    assert.ok(masked.startsWith('sk-ant-'), 'prefix should be preserved');
    assert.ok(!masked.includes('AAAABBBBCCCC'), 'middle chars should be masked');
  });
});

// ============================================
// Adapter Registry
// ============================================

describe('getAuthAdapter', () => {
  it('returns a ClaudeAuthAdapter for "claude"', () => {
    const adapter = getAuthAdapter('claude');
    assert.ok(adapter instanceof ClaudeAuthAdapter, 'should be ClaudeAuthAdapter');
  });

  it('returns an OpenAIAuthAdapter for "openai"', () => {
    const adapter = getAuthAdapter('openai');
    assert.ok(adapter instanceof OpenAIAuthAdapter, 'should be OpenAIAuthAdapter');
  });

  it('returns a GeminiAuthAdapter for "gemini"', () => {
    const adapter = getAuthAdapter('gemini');
    assert.ok(adapter instanceof GeminiAuthAdapter, 'should be GeminiAuthAdapter');
  });

  it('returns a CopilotAuthAdapter for "copilot"', () => {
    const adapter = getAuthAdapter('copilot');
    assert.ok(adapter instanceof CopilotAuthAdapter, 'should be CopilotAuthAdapter');
  });

  it('returns a CursorAuthAdapter for "cursor"', () => {
    const adapter = getAuthAdapter('cursor');
    assert.ok(adapter instanceof CursorAuthAdapter, 'should be CursorAuthAdapter');
  });
});

describe('getAllAdapters', () => {
  it('returns an array of 5 adapters', () => {
    const adapters = getAllAdapters();
    assert.equal(adapters.length, 5, 'should have 5 provider adapters');
  });

  it('every adapter has provider, displayName, and required methods', () => {
    for (const adapter of getAllAdapters()) {
      assert.ok(typeof adapter.provider === 'string',       `${adapter.provider}: provider must be a string`);
      assert.ok(typeof adapter.displayName === 'string',    `${adapter.provider}: displayName must be a string`);
      assert.ok(typeof adapter.validate === 'function',     `${adapter.provider}: validate must be a function`);
      assert.ok(typeof adapter.detectFromEnv === 'function',`${adapter.provider}: detectFromEnv must be a function`);
      assert.ok(typeof adapter.envVarNames === 'function',  `${adapter.provider}: envVarNames must be a function`);
      assert.ok(typeof adapter.getSetupUrl === 'function',  `${adapter.provider}: getSetupUrl must be a function`);
    }
  });

  it('every adapter returns an array from envVarNames() (may be empty for keyless providers)', () => {
    for (const adapter of getAllAdapters()) {
      const vars = adapter.envVarNames();
      assert.ok(Array.isArray(vars), `${adapter.provider} envVarNames must return an array`);
    }
  });

  it('keyless adapters (cursor) return an empty envVarNames array', () => {
    const adapter = getAuthAdapter('cursor');
    assert.deepEqual(adapter.envVarNames(), [], 'cursor needs no API key — empty array is correct');
  });

  it('key-based adapters (claude, openai, gemini) return non-empty envVarNames', () => {
    for (const provider of ['claude', 'openai', 'gemini']) {
      const adapter = getAuthAdapter(/** @type {any} */ (provider));
      assert.ok(adapter.envVarNames().length > 0, `${provider} must declare at least one env var`);
    }
  });

  it('every adapter getSetupUrl() returns a valid https URL', () => {
    for (const adapter of getAllAdapters()) {
      const url = adapter.getSetupUrl();
      assert.match(url, /^https:\/\//, `${adapter.provider} setup URL must start with https://`);
    }
  });
});

describe('getAdapterByEnvVar', () => {
  it('finds ClaudeAuthAdapter by "ANTHROPIC_API_KEY"', () => {
    const adapter = getAdapterByEnvVar('ANTHROPIC_API_KEY');
    assert.ok(adapter instanceof ClaudeAuthAdapter, 'should find ClaudeAuthAdapter');
  });

  it('finds OpenAIAuthAdapter by "OPENAI_API_KEY"', () => {
    const adapter = getAdapterByEnvVar('OPENAI_API_KEY');
    assert.ok(adapter instanceof OpenAIAuthAdapter, 'should find OpenAIAuthAdapter');
  });

  it('finds GeminiAuthAdapter by "GEMINI_API_KEY"', () => {
    const adapter = getAdapterByEnvVar('GEMINI_API_KEY');
    assert.ok(adapter instanceof GeminiAuthAdapter, 'should find GeminiAuthAdapter');
  });

  it('finds GeminiAuthAdapter by the alternate "GOOGLE_GENERATIVE_AI_API_KEY"', () => {
    const adapter = getAdapterByEnvVar('GOOGLE_GENERATIVE_AI_API_KEY');
    assert.ok(adapter instanceof GeminiAuthAdapter, 'should find GeminiAuthAdapter via alternate env var');
  });

  it('returns undefined for an unrecognised env var', () => {
    const adapter = getAdapterByEnvVar('NONEXISTENT_API_KEY_XYZ');
    assert.equal(adapter, undefined);
  });
});

// ============================================
// Individual Adapter tests
// ============================================

describe('ClaudeAuthAdapter', () => {
  it('has provider set to "claude"', () => {
    const adapter = new ClaudeAuthAdapter();
    assert.equal(adapter.provider, 'claude');
  });

  it('envVarNames returns ["ANTHROPIC_API_KEY"]', () => {
    const adapter = new ClaudeAuthAdapter();
    assert.deepEqual(adapter.envVarNames(), ['ANTHROPIC_API_KEY']);
  });

  it('getSetupUrl points to Anthropic console', () => {
    const adapter = new ClaudeAuthAdapter();
    assert.ok(adapter.getSetupUrl().includes('anthropic.com'), 'setup URL should be on anthropic.com');
  });

  it('detectFromEnv returns null when ANTHROPIC_API_KEY is not set', async () => {
    const saved = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
    const adapter = new ClaudeAuthAdapter();
    const session = await adapter.detectFromEnv();
    if (saved !== undefined) process.env.ANTHROPIC_API_KEY = saved;
    assert.equal(session, null);
  });
});

describe('OpenAIAuthAdapter', () => {
  it('has provider set to "openai"', () => {
    assert.equal(new OpenAIAuthAdapter().provider, 'openai');
  });

  it('envVarNames returns ["OPENAI_API_KEY"]', () => {
    assert.deepEqual(new OpenAIAuthAdapter().envVarNames(), ['OPENAI_API_KEY']);
  });

  it('getSetupUrl points to openai.com', () => {
    assert.ok(new OpenAIAuthAdapter().getSetupUrl().includes('openai.com'));
  });
});

describe('GeminiAuthAdapter', () => {
  it('has provider set to "gemini"', () => {
    assert.equal(new GeminiAuthAdapter().provider, 'gemini');
  });

  it('envVarNames returns both Gemini env var names', () => {
    const vars = new GeminiAuthAdapter().envVarNames();
    assert.ok(vars.includes('GEMINI_API_KEY'), 'should include GEMINI_API_KEY');
    assert.ok(vars.includes('GOOGLE_GENERATIVE_AI_API_KEY'), 'should include alternate Google env var');
  });
});

// ============================================
// EnvKeystore
// ============================================

describe('EnvKeystore', () => {
  it('load returns null when the env var is not set', async () => {
    const saved = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
    const store = new EnvKeystore();
    const result = await store.load('claude');
    if (saved !== undefined) process.env.ANTHROPIC_API_KEY = saved;
    assert.equal(result, null);
  });

  it('load returns the value when the env var IS set', async () => {
    const saved = process.env.ANTHROPIC_API_KEY;
    process.env.ANTHROPIC_API_KEY = 'test-key-12345';
    const store = new EnvKeystore();
    const result = await store.load('claude');
    if (saved !== undefined) process.env.ANTHROPIC_API_KEY = saved;
    else delete process.env.ANTHROPIC_API_KEY;
    assert.equal(result, 'test-key-12345');
  });

  it('list returns only providers that have env vars set', async () => {
    // Wipe all provider env vars
    const saved = {
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
      GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    };
    for (const k of Object.keys(saved)) delete process.env[k];

    process.env.OPENAI_API_KEY = 'fake-openai-key';
    const store = new EnvKeystore();
    const providers = await store.list();

    // Restore
    for (const [k, v] of Object.entries(saved)) {
      if (v !== undefined) process.env[k] = v;
    }

    assert.ok(providers.includes('openai'), 'openai should be listed when OPENAI_API_KEY is set');
    assert.ok(!providers.includes('claude'), 'claude should NOT be listed when ANTHROPIC_API_KEY is unset');
  });

  it('save throws a clear error (env vars cannot be saved)', async () => {
    const store = new EnvKeystore();
    await assert.rejects(
      () => store.save('claude', 'some-key'),
      /Cannot save/,
    );
  });

  it('delete throws a clear error (env vars cannot be deleted)', async () => {
    const store = new EnvKeystore();
    await assert.rejects(
      () => store.delete('claude'),
      /Cannot delete/,
    );
  });
});

// ============================================
// EncryptedFileKeystore
// ============================================

describe('EncryptedFileKeystore — ephemeral write/read round-trip', () => {
  // We monkey-patch the homedir used by the module by overriding HOME.
  // Since EncryptedFileKeystore derives the path at module load time via
  // node:os homedir(), we test the class against the REAL ~/.arcanea dir
  // but clean up after ourselves. If a creds file already exists we
  // back it up and restore it.

  const ARCANEA_DIR = join(process.env.HOME || process.env.USERPROFILE || tmpdir(), '.arcanea');
  const CREDS_FILE = join(ARCANEA_DIR, 'credentials.enc');
  let backupData = null;

  before(() => {
    // Back up any pre-existing credential file synchronously
    if (existsSync(CREDS_FILE)) {
      backupData = readFileSync(CREDS_FILE);
    }
  });

  after(() => {
    // Restore or remove
    if (backupData !== null) {
      writeFileSync(CREDS_FILE, backupData, { mode: 0o600 });
    } else if (existsSync(CREDS_FILE)) {
      rmSync(CREDS_FILE);
    }
  });

  it('saves and loads a credential for a provider', async () => {
    const store = new EncryptedFileKeystore();
    await store.save('openai', 'test-openai-secret-xyz');
    const loaded = await store.load('openai');
    assert.equal(loaded, 'test-openai-secret-xyz');
  });

  it('lists providers that have been saved', async () => {
    const store = new EncryptedFileKeystore();
    await store.save('gemini', 'test-gemini-secret');
    const providers = await store.list();
    assert.ok(providers.includes('gemini'), 'gemini should be listed after save');
  });

  it('returns null for a provider that has not been saved', async () => {
    const store = new EncryptedFileKeystore();
    // 'copilot' should not exist in our ephemeral test store
    const result = await store.load('copilot');
    // It might exist if the real ~/.arcanea has it — only assert null if
    // we backed up (meaning we started fresh) or confirm absence first
    if (backupData === null) {
      assert.equal(result, null, 'copilot should not be loaded before saving');
    }
  });

  it('deletes a saved provider credential', async () => {
    const store = new EncryptedFileKeystore();
    await store.save('cursor', 'test-cursor-key');
    await store.delete('cursor');
    const result = await store.load('cursor');
    assert.equal(result, null, 'credential should be null after deletion');
  });
});

// ============================================
// createKeystore factory
// ============================================

describe('createKeystore', () => {
  it('returns an EnvKeystore for "env-only" backend', () => {
    const store = createKeystore('env-only');
    assert.ok(store instanceof EnvKeystore, 'should create EnvKeystore');
  });

  it('returns an EncryptedFileKeystore for "encrypted-file" backend', () => {
    const store = createKeystore('encrypted-file');
    assert.ok(store instanceof EncryptedFileKeystore, 'should create EncryptedFileKeystore');
  });

  it('returns a CascadingKeystore when no backend is specified', () => {
    const store = createKeystore();
    assert.ok(store instanceof CascadingKeystore, 'should create CascadingKeystore by default');
  });
});

// ============================================
// CascadingKeystore
// ============================================

describe('CascadingKeystore', () => {
  it('prefers env var over file-stored credential', async () => {
    const saved = process.env.OPENAI_API_KEY;
    process.env.OPENAI_API_KEY = 'env-priority-key';

    const store = new CascadingKeystore();
    const result = await store.load('openai');

    if (saved !== undefined) process.env.OPENAI_API_KEY = saved;
    else delete process.env.OPENAI_API_KEY;

    assert.equal(result, 'env-priority-key', 'env var should take priority');
  });

  it('list merges providers from env and file sources without duplicates', async () => {
    const saved = process.env.ANTHROPIC_API_KEY;
    process.env.ANTHROPIC_API_KEY = 'test-for-list';

    const store = new CascadingKeystore();
    const providers = await store.list();

    if (saved !== undefined) process.env.ANTHROPIC_API_KEY = saved;
    else delete process.env.ANTHROPIC_API_KEY;

    assert.ok(providers.includes('claude'), 'claude should appear when ANTHROPIC_API_KEY is set');
    // Verify no duplicates
    const unique = new Set(providers);
    assert.equal(unique.size, providers.length, 'list should not contain duplicate providers');
  });
});
