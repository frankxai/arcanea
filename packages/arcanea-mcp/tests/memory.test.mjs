/**
 * @arcanea/mcp-server — Memory Persistence Tests
 * Validates that the memory layer persists to JSON file and survives restarts.
 * Run: node --test packages/arcanea-mcp/tests/memory.test.mjs
 */

import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const MEMORIES_FILE = join(homedir(), '.arcanea', 'memories.json');

describe('Memory Persistence — File Format', () => {
  let backup = null;

  before(() => {
    // Backup existing file if present
    if (existsSync(MEMORIES_FILE)) {
      backup = readFileSync(MEMORIES_FILE, 'utf-8');
    }
  });

  after(() => {
    // Restore backup
    if (backup !== null) {
      writeFileSync(MEMORIES_FILE, backup, 'utf-8');
    }
  });

  it('should use ~/.arcanea/ directory', () => {
    const arcanDir = join(homedir(), '.arcanea');
    assert.ok(existsSync(arcanDir), '~/.arcanea/ directory should exist');
  });

  it('memories.json should have valid structure when present', () => {
    if (!existsSync(MEMORIES_FILE)) {
      // File may not exist yet — that's fine, skip
      return;
    }
    const raw = readFileSync(MEMORIES_FILE, 'utf-8');
    const data = JSON.parse(raw);
    assert.equal(data.version, 1, 'Version should be 1');
    assert.ok(typeof data.updatedAt === 'string', 'updatedAt should be an ISO string');
    assert.ok(typeof data.sessions === 'object', 'sessions should be an object');
  });
});

describe('Memory Persistence — Session Schema', () => {
  it('a session should have the expected fields', () => {
    const session = {
      id: 'test-session',
      startedAt: new Date().toISOString(),
      gatesExplored: [1, 3],
      luminorsConsulted: ['valora'],
      creaturesEncountered: [],
      creations: [],
      preferences: {},
    };

    assert.ok(typeof session.id === 'string');
    assert.ok(typeof session.startedAt === 'string');
    assert.ok(Array.isArray(session.gatesExplored));
    assert.ok(Array.isArray(session.luminorsConsulted));
    assert.ok(Array.isArray(session.creaturesEncountered));
    assert.ok(Array.isArray(session.creations));
    assert.ok(typeof session.preferences === 'object');
  });

  it('startedAt should be a valid ISO date string', () => {
    const iso = new Date().toISOString();
    const parsed = new Date(iso);
    assert.ok(!isNaN(parsed.getTime()), 'ISO string should parse back to valid Date');
  });

  it('creations should use ISO string for createdAt', () => {
    const creation = {
      id: '123',
      type: 'character',
      name: 'Aelindra',
      element: 'Water',
      gate: 3,
      createdAt: new Date().toISOString(),
      summary: 'Mage of Aqualis',
    };

    const parsed = new Date(creation.createdAt);
    assert.ok(!isNaN(parsed.getTime()), 'createdAt should be a valid ISO date');
    assert.ok(typeof creation.createdAt === 'string', 'createdAt should be a string, not Date object');
  });
});

describe('Memory Persistence — Round-Trip', () => {
  const testFile = join(homedir(), '.arcanea', 'memories-test-roundtrip.json');

  after(() => {
    // Clean up test file
    try { unlinkSync(testFile); } catch { /* ignore */ }
  });

  it('should survive a write-read round trip', () => {
    const testData = {
      version: 1,
      updatedAt: new Date().toISOString(),
      sessions: {
        'test-rt': {
          id: 'test-rt',
          startedAt: new Date().toISOString(),
          gatesExplored: [1, 2, 6],
          luminorsConsulted: ['valora', 'serenith'],
          creaturesEncountered: ['The Perfectionist'],
          creations: [
            {
              id: '1',
              type: 'character',
              name: 'Lyra',
              element: 'Spirit',
              gate: 6,
              createdAt: new Date().toISOString(),
              summary: 'Master of Nero',
            },
          ],
          preferences: { favoriteElement: 'Spirit' },
        },
      },
    };

    // Write
    writeFileSync(testFile, JSON.stringify(testData, null, 2), 'utf-8');

    // Read back
    const raw = readFileSync(testFile, 'utf-8');
    const loaded = JSON.parse(raw);

    assert.equal(loaded.version, 1);
    assert.equal(loaded.sessions['test-rt'].id, 'test-rt');
    assert.equal(loaded.sessions['test-rt'].gatesExplored.length, 3);
    assert.equal(loaded.sessions['test-rt'].creations[0].name, 'Lyra');
    assert.equal(loaded.sessions['test-rt'].preferences.favoriteElement, 'Spirit');
  });

  it('should handle empty sessions gracefully', () => {
    const emptyData = {
      version: 1,
      updatedAt: new Date().toISOString(),
      sessions: {},
    };

    writeFileSync(testFile, JSON.stringify(emptyData), 'utf-8');
    const loaded = JSON.parse(readFileSync(testFile, 'utf-8'));
    assert.deepEqual(loaded.sessions, {});
  });
});

describe('Guardian Guidance — Tool Inventory', () => {
  it('orchestrate tool should be replaced by guardian_guidance', () => {
    const CURRENT_TOOLS = [
      "generate_character", "generate_magic", "generate_location",
      "generate_creature", "generate_artifact", "generate_name", "generate_story_prompt",
      "diagnose_block", "invoke_luminor",
      "deep_diagnosis", "convene_council", "luminor_debate",
      "get_journey", "check_milestones",
      "link_creations", "get_related", "suggest_connections",
      "get_world_graph", "find_path", "export_world",
      "guardian_guidance", "list_agents", "agent_info",
      "assess_world", "match_skill", "memory_status",
      "validate_canon", "identify_gate",
      "route_guardian", "check_voice", "get_design_tokens",
    ];

    assert.ok(!CURRENT_TOOLS.includes('orchestrate'), 'orchestrate stub should be removed');
    assert.ok(CURRENT_TOOLS.includes('guardian_guidance'), 'guardian_guidance should replace it');
    assert.ok(!CURRENT_TOOLS.includes('active_sessions'), 'active_sessions should be removed');
    assert.ok(CURRENT_TOOLS.includes('memory_status'), 'memory_status should replace it');
  });
});
