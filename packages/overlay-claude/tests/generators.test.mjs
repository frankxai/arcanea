/**
 * @arcanea/overlay-claude — Generator tests
 * Run: node --test packages/overlay-claude/tests/generators.test.mjs
 *
 * Architecture: Skills are generated from @arcanea/os shared content.
 * Level determines WHICH skills install, not content depth per skill.
 *   standard: 4 core skills
 *   full: 4 core + 5 development skills
 *   luminor: 4 core + 5 development + 4 creative skills
 */

import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

// Import compiled modules
const { generateSkillFile, getSkillIdsForLevel, generateAgentFile } = await import('../dist/generators.js');
const { GUARDIANS, SKILL_DEFINITIONS, SKILL_TRIGGERS, matchSkillTriggers, getSkillsForLevel } = await import('../../core/dist/index.js');

// ── Skill Generation ─────────────────────────────────────────

describe('generateSkillFile', () => {
  it('should return null for unknown skill', () => {
    const result = generateSkillFile('nonexistent-skill');
    assert.equal(result, null);
  });

  it('should generate arcanea-canon skill with canonical content', () => {
    const result = generateSkillFile('arcanea-canon');
    assert.ok(result);
    assert.equal(result.filename, 'arcanea-canon.md');
    assert.ok(result.content.includes('---'));
    assert.ok(result.content.includes('Arcanea Canon'));
    // Should include canonical data from @arcanea/os
    assert.ok(result.content.includes('Lumina'), 'Should include Lumina from COSMIC_DUALITY');
    assert.ok(result.content.includes('Nero'), 'Should include Nero from COSMIC_DUALITY');
    assert.ok(result.content.includes('Malachar'), 'Should include DARK_LORD');
    assert.ok(result.content.includes('396'), 'Should include canonical frequencies');
  });

  it('should generate all 4 core skills', () => {
    const skills = ['arcanea-canon', 'arcanea-voice', 'arcanea-design-system', 'arcanea-lore'];
    for (const skillId of skills) {
      const result = generateSkillFile(skillId);
      assert.ok(result, `Failed to generate skill: ${skillId}`);
      assert.equal(result.filename, `${skillId}.md`);
      assert.ok(result.content.length > 100, `${skillId} content too short: ${result.content.length} chars`);
    }
  });

  it('should generate all 5 development skills', () => {
    const devSkills = ['architecture-patterns', 'react-patterns', 'supabase-patterns', 'testing-patterns', 'prompt-engineering'];
    for (const skillId of devSkills) {
      const result = generateSkillFile(skillId);
      assert.ok(result, `Failed to generate dev skill: ${skillId}`);
      assert.equal(result.filename, `${skillId}.md`);
      assert.ok(result.content.length > 200, `${skillId} content too short`);
    }
  });

  it('should generate all 4 creative skills', () => {
    const creativeSkills = ['character-forge', 'world-build', 'scene-craft', 'voice-alchemy'];
    for (const skillId of creativeSkills) {
      const result = generateSkillFile(skillId);
      assert.ok(result, `Failed to generate creative skill: ${skillId}`);
      assert.equal(result.filename, `${skillId}.md`);
      assert.ok(result.content.length > 200, `${skillId} content too short`);
    }
  });

  it('all skills should include frontmatter', () => {
    for (const def of SKILL_DEFINITIONS) {
      const result = generateSkillFile(def.id);
      assert.ok(result, `Failed to generate: ${def.id}`);
      assert.ok(result.content.startsWith('---'), `${def.id} missing frontmatter`);
      assert.ok(result.content.includes('name:'), `${def.id} missing name`);
      assert.ok(result.content.includes('description:'), `${def.id} missing description`);
    }
  });

  it('canon skill should include generated Guardian table', () => {
    const result = generateSkillFile('arcanea-canon');
    assert.ok(result);
    // Should have a markdown table with all 10 Guardians
    assert.ok(result.content.includes('Lyssandria'), 'Missing Lyssandria');
    assert.ok(result.content.includes('Shinkami'), 'Missing Shinkami');
    assert.ok(result.content.includes('1111 Hz'), 'Missing Source frequency');
  });

  it('voice skill should include shared VOICE_PILLARS', () => {
    const result = generateSkillFile('arcanea-voice');
    assert.ok(result);
    assert.ok(result.content.includes('Arcane'), 'Missing Arcane pillar');
    assert.ok(result.content.includes('Creator Sovereignty'), 'Missing Creator Sovereignty');
    assert.ok(result.content.includes('antidote'), 'Missing Antidote Principle');
  });

  it('voice skill should include terminology table', () => {
    const result = generateSkillFile('arcanea-voice');
    assert.ok(result);
    assert.ok(result.content.includes('Creator'), 'Missing Creator terminology');
    assert.ok(result.content.includes('User'), 'Missing User → Creator mapping');
  });

  it('design system skill should include shared color tokens', () => {
    const result = generateSkillFile('arcanea-design-system');
    assert.ok(result);
    assert.ok(result.content.includes('Cinzel') || result.content.includes('cinzel'), 'Missing display font');
    assert.ok(result.content.includes('glass'), 'Missing glass morphism');
  });

  it('lore skill should include condensed lore from @arcanea/os', () => {
    const result = generateSkillFile('arcanea-lore');
    assert.ok(result);
    assert.ok(result.content.includes('Lumina'), 'Missing Lumina');
    assert.ok(result.content.includes('Nero'), 'Missing Nero');
    assert.ok(result.content.includes('Arc'), 'Missing The Arc');
    assert.ok(result.content.includes('Shadowfen'), 'Missing Shadowfen');
  });

  it('prompt-engineering skill should include Guardian routing patterns', () => {
    const result = generateSkillFile('prompt-engineering');
    assert.ok(result);
    assert.ok(result.content.includes('Guardian Routing'), 'Missing routing section');
    assert.ok(result.content.includes('Shinkami'), 'Missing Shinkami routing');
  });

  it('world-build skill should include Academy houses from @arcanea/os', () => {
    const result = generateSkillFile('world-build');
    assert.ok(result);
    assert.ok(result.content.includes('Academy'), 'Missing Academy reference');
    assert.ok(result.content.includes('Element'), 'Missing Element reference');
  });
});

// ── Level-Based Skill Selection ─────────────────────────────

describe('getSkillIdsForLevel', () => {
  it('minimal should return no skills', () => {
    const skills = getSkillIdsForLevel('minimal');
    assert.deepEqual(skills, []);
  });

  it('standard should return 4 core skills', () => {
    const skills = getSkillIdsForLevel('standard');
    assert.equal(skills.length, 4);
    assert.ok(skills.includes('arcanea-canon'));
    assert.ok(skills.includes('arcanea-voice'));
    assert.ok(skills.includes('arcanea-design-system'));
    assert.ok(skills.includes('arcanea-lore'));
  });

  it('full should return 9 skills (4 core + 5 dev)', () => {
    const skills = getSkillIdsForLevel('full');
    assert.equal(skills.length, 9);
    // Core
    assert.ok(skills.includes('arcanea-canon'));
    // Dev
    assert.ok(skills.includes('architecture-patterns'));
    assert.ok(skills.includes('react-patterns'));
    assert.ok(skills.includes('supabase-patterns'));
    assert.ok(skills.includes('testing-patterns'));
    assert.ok(skills.includes('prompt-engineering'));
  });

  it('luminor should return 13 skills (4 core + 5 dev + 4 creative)', () => {
    const skills = getSkillIdsForLevel('luminor');
    assert.equal(skills.length, 13);
    // Creative
    assert.ok(skills.includes('character-forge'));
    assert.ok(skills.includes('world-build'));
    assert.ok(skills.includes('scene-craft'));
    assert.ok(skills.includes('voice-alchemy'));
  });

  it('each level should be a superset of the previous', () => {
    const standard = getSkillIdsForLevel('standard');
    const full = getSkillIdsForLevel('full');
    const luminor = getSkillIdsForLevel('luminor');

    for (const skill of standard) {
      assert.ok(full.includes(skill), `full missing standard skill: ${skill}`);
      assert.ok(luminor.includes(skill), `luminor missing standard skill: ${skill}`);
    }
    for (const skill of full) {
      assert.ok(luminor.includes(skill), `luminor missing full skill: ${skill}`);
    }
  });
});

// ── Skill Triggers ──────────────────────────────────────────

describe('SKILL_TRIGGERS', () => {
  it('should define triggers for all 13 skills', () => {
    const triggerSkillIds = SKILL_TRIGGERS.map(t => t.skillId);
    for (const def of SKILL_DEFINITIONS) {
      assert.ok(triggerSkillIds.includes(def.id),
        `Missing trigger for skill: ${def.id}`);
    }
  });

  it('every trigger should have at least 2 keywords', () => {
    for (const trigger of SKILL_TRIGGERS) {
      assert.ok(trigger.keywords.length >= 2,
        `${trigger.skillId} has only ${trigger.keywords.length} keywords`);
    }
  });

  it('every trigger should have a description', () => {
    for (const trigger of SKILL_TRIGGERS) {
      assert.ok(trigger.description.length > 10,
        `${trigger.skillId} trigger description too short`);
    }
  });
});

describe('matchSkillTriggers', () => {
  it('should match canon skill for lore-related prompt', () => {
    const matches = matchSkillTriggers('Tell me about the Guardians and their Godbeasts');
    assert.ok(matches.includes('arcanea-canon'));
  });

  it('should match voice skill for voice-related prompt', () => {
    const matches = matchSkillTriggers('What tone should we use for this copy?');
    assert.ok(matches.includes('arcanea-voice'));
  });

  it('should match design skill for UI work', () => {
    const matches = matchSkillTriggers('Create a new component with proper color tokens');
    assert.ok(matches.includes('arcanea-design-system'));
  });

  it('should match react-patterns for React work', () => {
    const matches = matchSkillTriggers('Build a server component with hooks');
    assert.ok(matches.includes('react-patterns'));
  });

  it('should match testing skill for test prompts', () => {
    const matches = matchSkillTriggers('Write unit tests for the auth service');
    assert.ok(matches.includes('testing-patterns'));
  });

  it('should match multiple skills for complex prompts', () => {
    const matches = matchSkillTriggers('Design a React component for the Guardian UI with tests');
    assert.ok(matches.length >= 2, `Expected multiple matches, got: ${matches.join(', ')}`);
  });

  it('should return empty array for unrelated prompt', () => {
    const matches = matchSkillTriggers('What is the weather today?');
    assert.equal(matches.length, 0);
  });

  it('should be case-insensitive', () => {
    const matches = matchSkillTriggers('CANON CHECK THE GUARDIAN NAMES');
    assert.ok(matches.includes('arcanea-canon'));
  });

  it('should not return duplicates', () => {
    const matches = matchSkillTriggers('guardian lore canon mythology');
    const unique = [...new Set(matches)];
    assert.equal(matches.length, unique.length, 'Duplicate skill IDs found');
  });
});

// ── Agent Generation ────────────────────────────────────────

describe('generateAgentFile', () => {
  it('should generate agent for each Guardian', () => {
    for (const guardian of GUARDIANS) {
      const result = generateAgentFile(guardian);
      assert.ok(result, `Failed to generate agent for ${guardian.name}`);
      assert.equal(result.filename, `${guardian.name}.md`);
      assert.ok(result.content.length > 200, `${guardian.name} agent too short`);
    }
  });

  it('agent content should include Guardian personality', () => {
    const lyssandria = GUARDIANS.find(g => g.name === 'lyssandria');
    const result = generateAgentFile(lyssandria);
    assert.ok(result.content.includes('Lyssandria'), 'Should include display name');
    assert.ok(result.content.includes(lyssandria.gate), 'Should include gate');
    assert.ok(result.content.includes(lyssandria.signOff), 'Should include sign-off');
  });

  it('agent content should include coding style', () => {
    const draconia = GUARDIANS.find(g => g.name === 'draconia');
    const result = generateAgentFile(draconia);
    for (const style of draconia.codingStyle) {
      assert.ok(result.content.includes(style),
        `Missing coding style: ${style}`);
    }
  });

  it('agent content should include metaphor domain', () => {
    const leyla = GUARDIANS.find(g => g.name === 'leyla');
    const result = generateAgentFile(leyla);
    for (const metaphor of leyla.metaphorDomain) {
      assert.ok(result.content.includes(metaphor),
        `Missing metaphor: ${metaphor}`);
    }
  });
});
