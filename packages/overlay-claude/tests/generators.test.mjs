/**
 * @arcanea/overlay-claude — Generator tests
 * Run: node --test packages/overlay-claude/tests/generators.test.mjs
 */

import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

// Import compiled modules
const { generateSkillFile, generateAgentFile } = await import('../dist/generators.js');
const { GUARDIANS } = await import('../../core/dist/index.js');

describe('generateSkillFile', () => {
  it('should return null for unknown skill', () => {
    const result = generateSkillFile('nonexistent-skill');
    assert.equal(result, null);
  });

  it('should generate arcanea-canon skill', () => {
    const result = generateSkillFile('arcanea-canon');
    assert.ok(result);
    assert.equal(result.filename, 'arcanea-canon.md');
    assert.ok(result.content.includes('---'));
    assert.ok(result.content.includes('Arcanea Canon'));
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

  it('standard level should produce base content', () => {
    const result = generateSkillFile('arcanea-canon', 'standard');
    assert.ok(result);
    // Standard should NOT have the extended content
    assert.ok(!result.content.includes('Luminor Registry'), 'Standard should not include Luminor-tier content');
  });

  it('full level should produce more content than standard', () => {
    const standard = generateSkillFile('arcanea-canon', 'standard');
    const full = generateSkillFile('arcanea-canon', 'full');
    assert.ok(standard && full);
    assert.ok(full.content.length > standard.content.length,
      `Full (${full.content.length}) should be longer than standard (${standard.content.length})`);
  });

  it('luminor level should produce the most content', () => {
    const standard = generateSkillFile('arcanea-canon', 'standard');
    const full = generateSkillFile('arcanea-canon', 'full');
    const luminor = generateSkillFile('arcanea-canon', 'luminor');
    assert.ok(standard && full && luminor);
    assert.ok(luminor.content.length > full.content.length,
      `Luminor (${luminor.content.length}) should be longer than full (${full.content.length})`);
    assert.ok(luminor.content.length > standard.content.length * 2,
      `Luminor should be at least 2x standard length`);
  });

  it('all levels should include frontmatter', () => {
    for (const level of ['minimal', 'standard', 'full', 'luminor']) {
      const result = generateSkillFile('arcanea-canon', level);
      assert.ok(result);
      assert.ok(result.content.startsWith('---'), `${level} missing frontmatter`);
      assert.ok(result.content.includes('name:'), `${level} missing name in frontmatter`);
      assert.ok(result.content.includes('description:'), `${level} missing description in frontmatter`);
    }
  });
});

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
