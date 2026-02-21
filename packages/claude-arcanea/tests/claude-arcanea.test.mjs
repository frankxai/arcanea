/**
 * Test suite for claude-arcanea package
 * Tests exports, skills system, CLI module, and @arcanea/os re-exports.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert';

// Import from the compiled dist (ESM)
const mod = await import('../dist/index.js');
const skills = await import('../dist/skills/index.js');

// -------------------------------------------------------------------------
// Package exports
// -------------------------------------------------------------------------
describe('claude-arcanea exports', () => {
  it('exports VERSION string', () => {
    assert.strictEqual(typeof mod.VERSION, 'string');
    assert.ok(mod.VERSION.length > 0);
  });

  it('exports PLATFORM as "claude"', () => {
    assert.strictEqual(mod.PLATFORM, 'claude');
  });

  it('re-exports @arcanea/os GUARDIANS array', () => {
    assert.ok(Array.isArray(mod.GUARDIANS));
    assert.ok(mod.GUARDIANS.length >= 10, 'Should have at least 10 Guardians');
  });

  it('re-exports @arcanea/os GATES array', () => {
    assert.ok(Array.isArray(mod.GATES));
    assert.ok(mod.GATES.length >= 10, 'Should have at least 10 Gates');
  });

  it('re-exports @arcanea/os ELEMENTS', () => {
    assert.ok(mod.ELEMENTS !== undefined);
  });

  it('re-exports skill functions', () => {
    assert.strictEqual(typeof mod.getSkillById, 'function');
    assert.strictEqual(typeof mod.getSkillByTrigger, 'function');
    assert.strictEqual(typeof mod.getSkillsByGate, 'function');
  });

  it('re-exports allSkills array', () => {
    assert.ok(Array.isArray(mod.allSkills));
    assert.ok(mod.allSkills.length > 0);
  });

  it('re-exports skillsByGate record', () => {
    assert.strictEqual(typeof mod.skillsByGate, 'object');
    assert.ok('foundation' in mod.skillsByGate);
    assert.ok('fire' in mod.skillsByGate);
    assert.ok('voice' in mod.skillsByGate);
  });
});

// -------------------------------------------------------------------------
// Skills data integrity
// -------------------------------------------------------------------------
describe('Skills data integrity', () => {
  it('foundationSkills has at least 2 skills', () => {
    assert.ok(Array.isArray(skills.foundationSkills));
    assert.ok(skills.foundationSkills.length >= 2);
  });

  it('flowSkills has at least 2 skills', () => {
    assert.ok(Array.isArray(skills.flowSkills));
    assert.ok(skills.flowSkills.length >= 2);
  });

  it('fireSkills has at least 2 skills', () => {
    assert.ok(Array.isArray(skills.fireSkills));
    assert.ok(skills.fireSkills.length >= 2);
  });

  it('voiceSkills has at least 2 skills', () => {
    assert.ok(Array.isArray(skills.voiceSkills));
    assert.ok(skills.voiceSkills.length >= 2);
  });

  it('sightSkills has at least 2 skills', () => {
    assert.ok(Array.isArray(skills.sightSkills));
    assert.ok(skills.sightSkills.length >= 2);
  });

  it('every skill has required fields: id, name, displayName, description, category, gate, frequency', () => {
    for (const skill of skills.allSkills) {
      assert.ok(skill.id, `Skill missing id: ${JSON.stringify(skill)}`);
      assert.ok(skill.name, `Skill ${skill.id} missing name`);
      assert.ok(skill.displayName, `Skill ${skill.id} missing displayName`);
      assert.ok(skill.description, `Skill ${skill.id} missing description`);
      assert.ok(skill.category, `Skill ${skill.id} missing category`);
      assert.ok(skill.gate, `Skill ${skill.id} missing gate`);
      assert.ok(typeof skill.frequency === 'number', `Skill ${skill.id} missing frequency`);
    }
  });

  it('every skill has triggers array with at least one entry', () => {
    for (const skill of skills.allSkills) {
      assert.ok(Array.isArray(skill.triggers), `Skill ${skill.id} missing triggers`);
      assert.ok(skill.triggers.length > 0, `Skill ${skill.id} has empty triggers`);
    }
  });

  it('every skill trigger starts with "/"', () => {
    for (const skill of skills.allSkills) {
      for (const trigger of skill.triggers) {
        assert.ok(trigger.startsWith('/'), `Skill ${skill.id} trigger "${trigger}" must start with /`);
      }
    }
  });

  it('all skill IDs are unique', () => {
    const ids = skills.allSkills.map(s => s.id);
    const unique = new Set(ids);
    assert.strictEqual(ids.length, unique.size, `Duplicate skill IDs found: ${ids.filter((id, i) => ids.indexOf(id) !== i)}`);
  });

  it('all triggers are unique across skills', () => {
    const triggers = skills.allSkills.flatMap(s => s.triggers);
    const unique = new Set(triggers);
    assert.strictEqual(triggers.length, unique.size, 'Duplicate triggers found');
  });

  it('skill frequencies match canonical Gate values', () => {
    const validFreqs = [396, 417, 528, 639, 741, 852, 963, 1111];
    for (const skill of skills.allSkills) {
      assert.ok(validFreqs.includes(skill.frequency),
        `Skill ${skill.id} has invalid frequency ${skill.frequency}`);
    }
  });

  it('skill gate names match canonical Gate names', () => {
    const validGates = ['foundation', 'flow', 'fire', 'heart', 'voice', 'sight', 'crown', 'shift', 'unity', 'source'];
    for (const skill of skills.allSkills) {
      assert.ok(validGates.includes(skill.gate),
        `Skill ${skill.id} has invalid gate "${skill.gate}"`);
    }
  });

  it('skill category is valid', () => {
    const validCategories = ['development', 'creative', 'research', 'design', 'strategy'];
    for (const skill of skills.allSkills) {
      assert.ok(validCategories.includes(skill.category),
        `Skill ${skill.id} has invalid category "${skill.category}"`);
    }
  });
});

// -------------------------------------------------------------------------
// Skill lookup functions
// -------------------------------------------------------------------------
describe('getSkillById', () => {
  it('finds skill by valid ID', () => {
    const skill = skills.getSkillById('project-scaffold');
    assert.ok(skill);
    assert.strictEqual(skill.id, 'project-scaffold');
    assert.strictEqual(skill.gate, 'foundation');
  });

  it('returns undefined for non-existent ID', () => {
    const skill = skills.getSkillById('nonexistent-skill');
    assert.strictEqual(skill, undefined);
  });

  it('finds every declared skill by its ID', () => {
    for (const expected of skills.allSkills) {
      const found = skills.getSkillById(expected.id);
      assert.ok(found, `getSkillById should find skill "${expected.id}"`);
      assert.strictEqual(found.id, expected.id);
    }
  });
});

describe('getSkillByTrigger', () => {
  it('finds skill by trigger "/scaffold"', () => {
    const skill = skills.getSkillByTrigger('/scaffold');
    assert.ok(skill);
    assert.strictEqual(skill.id, 'project-scaffold');
  });

  it('finds skill by trigger "/debug"', () => {
    const skill = skills.getSkillByTrigger('/debug');
    assert.ok(skill);
    assert.strictEqual(skill.id, 'debug-insight');
  });

  it('finds skill by trigger "/refactor"', () => {
    const skill = skills.getSkillByTrigger('/refactor');
    assert.ok(skill);
    assert.strictEqual(skill.id, 'refactor-flow');
  });

  it('returns undefined for non-existent trigger', () => {
    const skill = skills.getSkillByTrigger('/nonexistent');
    assert.strictEqual(skill, undefined);
  });

  it('every declared trigger resolves to its skill', () => {
    for (const expected of skills.allSkills) {
      for (const trigger of expected.triggers) {
        const found = skills.getSkillByTrigger(trigger);
        assert.ok(found, `Trigger "${trigger}" should find skill "${expected.id}"`);
        assert.strictEqual(found.id, expected.id);
      }
    }
  });
});

describe('getSkillsByGate', () => {
  it('returns foundation skills for "foundation" gate', () => {
    const result = skills.getSkillsByGate('foundation');
    assert.ok(Array.isArray(result));
    assert.ok(result.length >= 2);
    assert.ok(result.every(s => s.gate === 'foundation'));
  });

  it('returns fire skills for "fire" gate', () => {
    const result = skills.getSkillsByGate('fire');
    assert.ok(Array.isArray(result));
    assert.ok(result.length >= 2);
    assert.ok(result.every(s => s.gate === 'fire'));
  });

  it('returns empty array for gates with no skills yet', () => {
    const heartSkills = skills.getSkillsByGate('heart');
    assert.ok(Array.isArray(heartSkills));
    assert.strictEqual(heartSkills.length, 0);

    const crownSkills = skills.getSkillsByGate('crown');
    assert.ok(Array.isArray(crownSkills));
    assert.strictEqual(crownSkills.length, 0);
  });

  it('returns empty array for invalid gate name', () => {
    const result = skills.getSkillsByGate('nonexistent');
    assert.ok(Array.isArray(result));
    assert.strictEqual(result.length, 0);
  });

  it('all 10 gate names return arrays', () => {
    const gateNames = ['foundation', 'flow', 'fire', 'heart', 'voice', 'sight', 'crown', 'shift', 'unity', 'source'];
    for (const gate of gateNames) {
      const result = skills.getSkillsByGate(gate);
      assert.ok(Array.isArray(result), `Gate "${gate}" should return array`);
    }
  });
});

// -------------------------------------------------------------------------
// skillsByGate record
// -------------------------------------------------------------------------
describe('skillsByGate', () => {
  it('has all 10 gates as keys', () => {
    const expected = ['foundation', 'flow', 'fire', 'heart', 'voice', 'sight', 'crown', 'shift', 'unity', 'source'];
    for (const gate of expected) {
      assert.ok(gate in skills.skillsByGate, `Missing gate key: ${gate}`);
    }
  });

  it('each gate value is an array', () => {
    for (const [gate, arr] of Object.entries(skills.skillsByGate)) {
      assert.ok(Array.isArray(arr), `skillsByGate.${gate} should be array`);
    }
  });

  it('total skills across all gates matches allSkills length', () => {
    const total = Object.values(skills.skillsByGate).flat().length;
    assert.strictEqual(total, skills.allSkills.length);
  });

  it('populated gates have correct frequency alignment', () => {
    const gateFreqs = { foundation: 396, flow: 417, fire: 528, heart: 639, voice: 741, sight: 852, crown: 963, shift: 1111, unity: 963, source: 1111 };
    for (const [gate, arr] of Object.entries(skills.skillsByGate)) {
      for (const skill of arr) {
        assert.strictEqual(skill.frequency, gateFreqs[gate],
          `Skill "${skill.id}" in gate "${gate}" has frequency ${skill.frequency}, expected ${gateFreqs[gate]}`);
      }
    }
  });
});

// -------------------------------------------------------------------------
// @arcanea/os re-exports validation
// -------------------------------------------------------------------------
describe('@arcanea/os re-exports through claude-arcanea', () => {
  it('GUARDIANS contains canonical names', () => {
    // Guardians may use name (lowercase slug) or displayName
    const allNames = mod.GUARDIANS.flatMap(g => [g.name, g.displayName, g.slug].filter(Boolean));
    const joined = allNames.join(',').toLowerCase();
    assert.ok(joined.includes('lyssandria'), 'Should include Lyssandria');
    assert.ok(joined.includes('draconia'), 'Should include Draconia');
    assert.ok(joined.includes('shinkami'), 'Should include Shinkami');
  });

  it('GATES contains canonical gate names', () => {
    const gateNames = mod.GATES.map(g => g.name || g.gate);
    assert.ok(gateNames.some(n => n.toLowerCase().includes('foundation')),
      'Should include Foundation gate');
    assert.ok(gateNames.some(n => n.toLowerCase().includes('source')),
      'Should include Source gate');
  });

  it('re-exports routeToGuardian function if it exists', () => {
    // This may or may not be exported depending on @arcanea/os version
    if (mod.routeToGuardian) {
      assert.strictEqual(typeof mod.routeToGuardian, 'function');
    }
  });

  it('re-exports VoiceEnforcer if it exists', () => {
    if (mod.VoiceEnforcer) {
      assert.strictEqual(typeof mod.VoiceEnforcer, 'function');
    }
  });
});

// -------------------------------------------------------------------------
// CLI module structure
// -------------------------------------------------------------------------
describe('CLI module', () => {
  it('cli.js dist file exists', async () => {
    const { existsSync } = await import('node:fs');
    const { fileURLToPath } = await import('node:url');
    const { join, dirname } = await import('node:path');
    const thisFile = fileURLToPath(import.meta.url);
    const cliPath = join(dirname(thisFile), '..', 'dist', 'cli.js');
    assert.ok(existsSync(cliPath), 'dist/cli.js should exist');
  });

  it('cli.js contains spawn logic and ARCANEA branding', async () => {
    const { readFileSync } = await import('node:fs');
    const { fileURLToPath } = await import('node:url');
    const { join, dirname } = await import('node:path');
    const thisFile = fileURLToPath(import.meta.url);
    const cliPath = join(dirname(thisFile), '..', 'dist', 'cli.js');
    const content = readFileSync(cliPath, 'utf-8');
    assert.ok(content.includes('spawn') || content.includes('child_process'),
      'CLI should reference child_process or spawn');
    assert.ok(content.includes('ARCANEA'), 'CLI should reference ARCANEA');
  });
});

// -------------------------------------------------------------------------
// Specific skill content tests
// -------------------------------------------------------------------------
describe('Specific skill content', () => {
  it('project-scaffold has correct metadata', () => {
    const s = skills.getSkillById('project-scaffold');
    assert.strictEqual(s.gate, 'foundation');
    assert.strictEqual(s.frequency, 396);
    assert.strictEqual(s.category, 'development');
    assert.ok(s.triggers.includes('/scaffold'));
  });

  it('creative-writing has correct metadata', () => {
    const s = skills.getSkillById('creative-writing');
    assert.strictEqual(s.gate, 'flow');
    assert.strictEqual(s.frequency, 417);
    assert.strictEqual(s.category, 'creative');
    assert.ok(s.triggers.includes('/write'));
  });

  it('rapid-prototype has correct metadata', () => {
    const s = skills.getSkillById('rapid-prototype');
    assert.strictEqual(s.gate, 'fire');
    assert.strictEqual(s.frequency, 528);
    assert.ok(s.triggers.includes('/prototype'));
  });

  it('documentation has correct metadata', () => {
    const s = skills.getSkillById('documentation');
    assert.strictEqual(s.gate, 'voice');
    assert.strictEqual(s.frequency, 741);
    assert.ok(s.triggers.includes('/docs'));
  });

  it('architecture-vision has correct metadata', () => {
    const s = skills.getSkillById('architecture-vision');
    assert.strictEqual(s.gate, 'sight');
    assert.strictEqual(s.frequency, 852);
    assert.ok(s.triggers.includes('/architect'));
  });

  it('debug-insight has correct metadata', () => {
    const s = skills.getSkillById('debug-insight');
    assert.strictEqual(s.gate, 'sight');
    assert.strictEqual(s.frequency, 852);
    assert.ok(s.triggers.includes('/debug'));
  });

  it('every skill has non-empty instructions', () => {
    for (const skill of skills.allSkills) {
      assert.ok(skill.instructions && skill.instructions.length > 10,
        `Skill ${skill.id} has empty or too-short instructions`);
    }
  });

  it('every skill displayName is title-cased', () => {
    for (const skill of skills.allSkills) {
      assert.ok(/^[A-Z]/.test(skill.displayName),
        `Skill ${skill.id} displayName "${skill.displayName}" should start with uppercase`);
    }
  });
});
