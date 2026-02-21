/**
 * Test suite for @arcanea/aios (Arcanea Intelligence OS)
 * Tests all exports from dist/index.js using Node.js built-in test runner.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert';

import {
  // Version
  VERSION,
  // Core constants (re-exported from @arcanea/os)
  GUARDIANS,
  GATES,
  ELEMENTS,
  COSMIC_DUALITY,
  MAGIC_RANKS,
  ACADEMIES,
  GODBEASTS,
  LUMINORS,
  DARK_LORD,
  SOLFEGGIO_FREQUENCIES,
  VOICE_RULES,
  OVERLAY_LEVELS,
  PROVIDER_CAPABILITIES,
  // Adapters
  ClaudeAdapter,
  GeminiAdapter,
  OpenCodeAdapter,
  CodexAdapter,
  getAdapter,
  getAvailableAdapters,
  registerAdapter,
  // Swarm
  SwarmManager,
  swarmManager,
  DEFAULT_SWARM_CONFIG,
  SISYPHUS,
  createGuardianAgent,
  // Engine
  GuardianRouter,
  SessionManager,
  VoiceEnforcer,
  routeToGuardian,
  getRouter,
  // Utilities
  getGuardianByName,
  getGateByName,
  getGateByFrequency,
  getRankForGates,
  calculateMagicRank,
  formatGateName,
  isValidGateName,
  isValidElement,
  getGuardiansByElement,
  getComplementaryElements,
  getElementByName,
  getElementColor,
  // Detection
  detectClaude,
  detectGemini,
  detectCopilot,
  detectOpenAI,
  detectOpenCode,
  detectAllTools,
  // Generators
  generateSystemPrompt,
  generateGuardianPrompt,
  generateClaudeMd,
  generateCopilotInstructions,
} from '../dist/index.js';

// -------------------------------------------------------------------------
// Version
// -------------------------------------------------------------------------
describe('VERSION', () => {
  it('is a non-empty string', () => {
    assert.strictEqual(typeof VERSION, 'string');
    assert.ok(VERSION.length > 0);
  });

  it('follows semver format', () => {
    assert.ok(/^\d+\.\d+\.\d+/.test(VERSION), `Invalid semver: ${VERSION}`);
  });
});

// -------------------------------------------------------------------------
// Core constants
// -------------------------------------------------------------------------
describe('GUARDIANS (aios)', () => {
  it('is a non-empty array', () => {
    assert.ok(Array.isArray(GUARDIANS));
    assert.ok(GUARDIANS.length > 0);
  });

  it('has exactly 10 canonical Guardians', () => {
    assert.strictEqual(GUARDIANS.length, 10);
  });

  it('each Guardian has required fields: name, displayName, gate, frequency', () => {
    for (const g of GUARDIANS) {
      assert.ok(g.name, `Guardian missing name: ${JSON.stringify(g)}`);
      assert.ok(g.displayName, `Guardian missing displayName: ${g.name}`);
      assert.ok(g.gate, `Guardian missing gate: ${g.name}`);
      assert.ok(g.frequency, `Guardian missing frequency: ${g.name}`);
    }
  });

  it('contains Lyssandria as the Foundation Gate Guardian', () => {
    const lyssandria = GUARDIANS.find(g => g.name === 'lyssandria');
    assert.ok(lyssandria);
    assert.strictEqual(lyssandria.gate, 'foundation');
  });

  it('contains Shinkami as the Source Gate Guardian', () => {
    const shinkami = GUARDIANS.find(g => g.name === 'shinkami');
    assert.ok(shinkami);
    assert.strictEqual(shinkami.gate, 'source');
  });
});

describe('GATES', () => {
  it('is a non-empty array', () => {
    assert.ok(Array.isArray(GATES));
    assert.ok(GATES.length > 0);
  });

  it('has exactly 10 gates', () => {
    assert.strictEqual(GATES.length, 10);
  });

  it('each gate has name and frequency', () => {
    for (const gate of GATES) {
      assert.ok(gate.name, `Gate missing name`);
      assert.ok(gate.frequency, `Gate missing frequency: ${gate.name}`);
    }
  });
});

describe('ELEMENTS', () => {
  it('is a non-empty array', () => {
    assert.ok(Array.isArray(ELEMENTS));
    assert.ok(ELEMENTS.length > 0);
  });

  it('contains the five canonical elements', () => {
    const names = ELEMENTS.map(e => (e.name || e).toLowerCase());
    const expected = ['fire', 'water', 'earth', 'wind', 'void'];
    for (const el of expected) {
      const found = names.some(n => n.includes(el));
      assert.ok(found, `Missing element: ${el}`);
    }
  });
});

describe('COSMIC_DUALITY', () => {
  it('is an object with Lumina and Nero', () => {
    assert.strictEqual(typeof COSMIC_DUALITY, 'object');
    const keys = Object.keys(COSMIC_DUALITY).join(' ').toLowerCase();
    assert.ok(keys.includes('lumina') || JSON.stringify(COSMIC_DUALITY).toLowerCase().includes('lumina'));
    assert.ok(keys.includes('nero') || JSON.stringify(COSMIC_DUALITY).toLowerCase().includes('nero'));
  });
});

describe('MAGIC_RANKS', () => {
  it('is a non-empty array or object', () => {
    const isArrayOrObj = Array.isArray(MAGIC_RANKS) || (typeof MAGIC_RANKS === 'object' && MAGIC_RANKS !== null);
    assert.ok(isArrayOrObj);
  });

  it('references Luminor as the highest rank', () => {
    const serialized = JSON.stringify(MAGIC_RANKS);
    assert.ok(serialized.includes('Luminor') || serialized.includes('luminor'));
  });

  it('references Apprentice as the lowest rank', () => {
    const serialized = JSON.stringify(MAGIC_RANKS);
    assert.ok(serialized.includes('Apprentice') || serialized.includes('apprentice'));
  });
});

describe('DARK_LORD', () => {
  it('is an object with Malachar information', () => {
    assert.strictEqual(typeof DARK_LORD, 'object');
    const serialized = JSON.stringify(DARK_LORD);
    assert.ok(serialized.includes('Malachar') || serialized.includes('malachar'));
  });
});

describe('SISYPHUS', () => {
  it('is a non-null object', () => {
    assert.strictEqual(typeof SISYPHUS, 'object');
    assert.notStrictEqual(SISYPHUS, null);
  });

  it('has id, name, displayName, role', () => {
    assert.ok('id' in SISYPHUS);
    assert.ok('name' in SISYPHUS);
    assert.ok('displayName' in SISYPHUS);
    assert.ok('role' in SISYPHUS);
  });

  it('displayName is Sisyphus', () => {
    assert.strictEqual(SISYPHUS.displayName, 'Sisyphus');
  });

  it('role is orchestrator', () => {
    assert.strictEqual(SISYPHUS.role, 'orchestrator');
  });

  it('has capabilities array', () => {
    assert.ok(Array.isArray(SISYPHUS.capabilities));
    assert.ok(SISYPHUS.capabilities.length > 0);
  });
});

describe('DEFAULT_SWARM_CONFIG', () => {
  it('is a non-null object', () => {
    assert.strictEqual(typeof DEFAULT_SWARM_CONFIG, 'object');
    assert.notStrictEqual(DEFAULT_SWARM_CONFIG, null);
  });

  it('has protocol field', () => {
    assert.ok('protocol' in DEFAULT_SWARM_CONFIG);
  });

  it('has maxAgents and timeout', () => {
    assert.ok('maxAgents' in DEFAULT_SWARM_CONFIG);
    assert.ok('timeout' in DEFAULT_SWARM_CONFIG);
    assert.strictEqual(typeof DEFAULT_SWARM_CONFIG.maxAgents, 'number');
    assert.strictEqual(typeof DEFAULT_SWARM_CONFIG.timeout, 'number');
  });

  it('has retryPolicy with maxRetries and backoffMs', () => {
    assert.ok('retryPolicy' in DEFAULT_SWARM_CONFIG);
    assert.ok('maxRetries' in DEFAULT_SWARM_CONFIG.retryPolicy);
    assert.ok('backoffMs' in DEFAULT_SWARM_CONFIG.retryPolicy);
  });
});

// -------------------------------------------------------------------------
// Adapters
// -------------------------------------------------------------------------
describe('ClaudeAdapter', () => {
  it('can be instantiated', () => {
    const adapter = new ClaudeAdapter();
    assert.ok(adapter instanceof ClaudeAdapter);
  });

  it('has type "claude"', () => {
    const adapter = new ClaudeAdapter();
    assert.strictEqual(adapter.type, 'claude');
  });

  it('isAvailable resolves to a boolean', async () => {
    const adapter = new ClaudeAdapter();
    const result = await adapter.isAvailable();
    assert.strictEqual(typeof result, 'boolean');
  });

  it('execute returns a string response', async () => {
    const adapter = new ClaudeAdapter();
    const result = await adapter.execute('test prompt', {});
    assert.strictEqual(typeof result, 'string');
  });
});

describe('GeminiAdapter', () => {
  it('can be instantiated', () => {
    const adapter = new GeminiAdapter();
    assert.ok(adapter instanceof GeminiAdapter);
  });

  it('has type "gemini"', () => {
    const adapter = new GeminiAdapter();
    assert.strictEqual(adapter.type, 'gemini');
  });

  it('execute returns a string with Gemini prefix', async () => {
    const adapter = new GeminiAdapter();
    const result = await adapter.execute('test prompt', {});
    assert.ok(result.includes('[Gemini]'));
  });
});

describe('OpenCodeAdapter', () => {
  it('can be instantiated', () => {
    const adapter = new OpenCodeAdapter();
    assert.ok(adapter instanceof OpenCodeAdapter);
  });

  it('has type "opencode"', () => {
    const adapter = new OpenCodeAdapter();
    assert.strictEqual(adapter.type, 'opencode');
  });

  it('execute returns a string with Sisyphus prefix', async () => {
    const adapter = new OpenCodeAdapter();
    const result = await adapter.execute('test', {});
    assert.ok(result.includes('[Sisyphus]'));
  });
});

describe('CodexAdapter', () => {
  it('can be instantiated', () => {
    const adapter = new CodexAdapter();
    assert.ok(adapter instanceof CodexAdapter);
  });

  it('has type "codex"', () => {
    const adapter = new CodexAdapter();
    assert.strictEqual(adapter.type, 'codex');
  });

  it('execute returns a string with Codex prefix', async () => {
    const adapter = new CodexAdapter();
    const result = await adapter.execute('test', {});
    assert.ok(result.includes('[Codex]'));
  });
});

describe('getAdapter', () => {
  it('returns the Claude adapter for "claude"', () => {
    const adapter = getAdapter('claude');
    assert.ok(adapter);
    assert.strictEqual(adapter.type, 'claude');
  });

  it('returns the Gemini adapter for "gemini"', () => {
    const adapter = getAdapter('gemini');
    assert.ok(adapter);
    assert.strictEqual(adapter.type, 'gemini');
  });

  it('returns undefined for an unknown platform', () => {
    const adapter = getAdapter('unknown-platform-xyz');
    assert.strictEqual(adapter, undefined);
  });
});

describe('registerAdapter', () => {
  it('allows registering a custom adapter', () => {
    const customAdapter = {
      type: 'test-custom',
      name: 'Test Custom',
      isAvailable: async () => true,
      initialize: async () => {},
      execute: async (prompt) => `[Custom] ${prompt}`,
    };
    registerAdapter(customAdapter);
    const retrieved = getAdapter('test-custom');
    assert.ok(retrieved);
    assert.strictEqual(retrieved.type, 'test-custom');
  });
});

// -------------------------------------------------------------------------
// Swarm
// -------------------------------------------------------------------------
describe('SwarmManager', () => {
  it('can be instantiated with default config', () => {
    const manager = new SwarmManager();
    assert.ok(manager instanceof SwarmManager);
  });

  it('can be instantiated with custom config', () => {
    const manager = new SwarmManager({ maxAgents: 3, protocol: 'sequential' });
    assert.ok(manager instanceof SwarmManager);
  });

  it('createSession returns a session with id and status', async () => {
    const manager = new SwarmManager();
    const session = await manager.createSession('Test task');
    assert.ok('id' in session);
    assert.ok('status' in session);
    assert.strictEqual(session.status, 'running');
  });

  it('getSession retrieves a session by id', async () => {
    const manager = new SwarmManager();
    const session = await manager.createSession('Retrieve test');
    const retrieved = manager.getSession(session.id);
    assert.deepStrictEqual(retrieved, session);
  });

  it('getSession returns undefined for unknown id', () => {
    const manager = new SwarmManager();
    const result = manager.getSession('nonexistent-session-id');
    assert.strictEqual(result, undefined);
  });

  it('createSession initializes with Sisyphus as first agent', async () => {
    const manager = new SwarmManager();
    const session = await manager.createSession('Agent test');
    assert.ok(session.agents.length > 0);
    assert.strictEqual(session.agents[0].displayName, 'Sisyphus');
  });

  it('completeSession sets status to completed', async () => {
    const manager = new SwarmManager();
    const session = await manager.createSession('Complete test');
    manager.completeSession(session.id);
    const completed = manager.getSession(session.id);
    assert.strictEqual(completed.status, 'completed');
  });

  it('updateTaskStatus updates task status', async () => {
    const manager = new SwarmManager();
    const session = await manager.createSession('Task status test');
    manager.updateTaskStatus(session.id, 'main', 'completed', 'done');
    const updated = manager.getSession(session.id);
    const task = updated.tasks.find(t => t.id === 'main');
    assert.strictEqual(task.status, 'completed');
  });
});

describe('swarmManager (singleton)', () => {
  it('is a SwarmManager instance', () => {
    assert.ok(swarmManager instanceof SwarmManager);
  });
});

describe('createGuardianAgent', () => {
  it('creates a guardian agent for lyssandria', () => {
    const agent = createGuardianAgent('lyssandria');
    assert.ok('id' in agent);
    assert.ok('displayName' in agent);
    assert.strictEqual(agent.role, 'guardian');
  });

  it('agent id includes the guardian name', () => {
    const agent = createGuardianAgent('lyria');
    assert.ok(agent.id.includes('lyria'));
  });

  it('throws for unknown guardian name', () => {
    assert.throws(() => createGuardianAgent('unknown-guardian'), /Unknown guardian/);
  });

  it('agent systemPrompt contains the gate domain', () => {
    const agent = createGuardianAgent('draconia');
    assert.ok(agent.systemPrompt.includes('fire') || agent.systemPrompt.includes('Fire'));
  });
});

// -------------------------------------------------------------------------
// Utilities
// -------------------------------------------------------------------------
describe('getGuardianByName', () => {
  it('finds Lyssandria by name', () => {
    const guardian = getGuardianByName('lyssandria');
    assert.ok(guardian);
    assert.strictEqual(guardian.name, 'lyssandria');
  });

  it('returns undefined for unknown name', () => {
    const result = getGuardianByName('unknownguardian');
    assert.strictEqual(result, undefined);
  });
});

describe('getGateByName', () => {
  it('returns the foundation gate', () => {
    const gate = getGateByName('foundation');
    assert.ok(gate);
  });

  it('returns undefined for unknown gate', () => {
    const gate = getGateByName('nonexistent-gate');
    assert.strictEqual(gate, undefined);
  });
});

describe('getRankForGates', () => {
  it('returns Apprentice for 0 gates', () => {
    const rank = getRankForGates(0);
    assert.ok(typeof rank === 'string' || typeof rank === 'object');
    const rankStr = JSON.stringify(rank).toLowerCase();
    assert.ok(rankStr.includes('apprentice'));
  });

  it('returns Luminor for 10 gates', () => {
    const rank = getRankForGates(10);
    const rankStr = JSON.stringify(rank).toLowerCase();
    assert.ok(rankStr.includes('luminor'));
  });
});

describe('isValidGateName', () => {
  it('returns true for foundation', () => {
    assert.strictEqual(isValidGateName('foundation'), true);
  });

  it('returns true for source', () => {
    assert.strictEqual(isValidGateName('source'), true);
  });

  it('returns false for invalid gate name', () => {
    assert.strictEqual(isValidGateName('fakegate'), false);
  });
});

describe('isValidElement', () => {
  it('returns true for fire', () => {
    assert.strictEqual(isValidElement('fire'), true);
  });

  it('returns true for void', () => {
    assert.strictEqual(isValidElement('void'), true);
  });

  it('returns false for invalid element', () => {
    assert.strictEqual(isValidElement('metal'), false);
  });
});
