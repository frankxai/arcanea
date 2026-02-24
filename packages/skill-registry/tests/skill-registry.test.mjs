import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { SkillRegistry } from '../dist/index.js';

describe('SkillRegistry', () => {
  let registry;

  beforeEach(() => {
    registry = new SkillRegistry();
  });

  describe('register()', () => {
    it('should register a skill', () => {
      const skill = registry.register({
        id: 'code-gen',
        name: 'Code Generator',
        version: '1.0.0',
        description: 'Generates code from natural language',
        provider: 'shinkami-agent',
        capabilities: ['code-generation', 'typescript', 'refactoring'],
      });

      assert.equal(skill.id, 'code-gen');
      assert.equal(skill.status, 'active');
      assert.equal(skill.healthScore, 1.0);
      assert.equal(skill.executionCount, 0);
    });

    it('should update an existing skill', () => {
      registry.register({
        id: 'code-gen',
        name: 'Code Gen v1',
        version: '1.0.0',
        description: 'v1',
        provider: 'agent-a',
        capabilities: ['code'],
      });

      const updated = registry.register({
        id: 'code-gen',
        name: 'Code Gen v2',
        version: '2.0.0',
        description: 'v2',
        provider: 'agent-a',
        capabilities: ['code', 'review'],
      });

      assert.equal(updated.name, 'Code Gen v2');
      assert.equal(updated.version, '2.0.0');
      assert.equal(registry.listAll().length, 1);
    });
  });

  describe('deregister()', () => {
    it('should remove a registered skill', () => {
      registry.register({
        id: 'temp',
        name: 'Temp',
        version: '1.0.0',
        description: 'Temporary',
        provider: 'agent',
        capabilities: ['temp'],
      });

      assert.ok(registry.deregister('temp'));
      assert.equal(registry.get('temp'), undefined);
    });

    it('should return false for unknown skill', () => {
      assert.ok(!registry.deregister('nonexistent'));
    });
  });

  describe('discover()', () => {
    beforeEach(() => {
      registry.register({
        id: 'code-gen',
        name: 'Code Generator',
        version: '1.0.0',
        description: 'Generates TypeScript code',
        provider: 'shinkami',
        capabilities: ['code-generation', 'typescript'],
        guardianAffinity: ['shinkami'],
      });

      registry.register({
        id: 'image-gen',
        name: 'Image Generator',
        version: '1.0.0',
        description: 'Generates images',
        provider: 'leyla',
        capabilities: ['image-generation', 'creative'],
        guardianAffinity: ['leyla'],
      });

      registry.register({
        id: 'code-review',
        name: 'Code Reviewer',
        version: '1.0.0',
        description: 'Reviews code quality',
        provider: 'shinkami',
        capabilities: ['code-review', 'typescript'],
        guardianAffinity: ['shinkami'],
      });
    });

    it('should find skills by capability', () => {
      const matches = registry.discover({ capabilities: ['code'] });
      assert.equal(matches.length, 2); // code-gen and code-review
    });

    it('should rank by relevance', () => {
      const matches = registry.discover({ capabilities: ['typescript', 'code-generation'] });
      assert.ok(matches.length > 0);
      // code-gen matches both capabilities, should rank higher
      assert.equal(matches[0].skill.id, 'code-gen');
    });

    it('should filter by Guardian affinity', () => {
      const matches = registry.discover({ guardianId: 'leyla' });
      assert.ok(matches.some(m => m.skill.id === 'image-gen'));
    });

    it('should filter by provider', () => {
      const matches = registry.discover({ provider: 'leyla' });
      assert.equal(matches.length, 1);
      assert.equal(matches[0].skill.id, 'image-gen');
    });

    it('should respect limit', () => {
      const matches = registry.discover({ limit: 1 });
      assert.equal(matches.length, 1);
    });

    it('should filter by minimum health', () => {
      registry.recordHealthCheck({ skillId: 'image-gen', healthy: false, latencyMs: 100, checkedAt: Date.now() });
      registry.recordHealthCheck({ skillId: 'image-gen', healthy: false, latencyMs: 100, checkedAt: Date.now() });
      registry.recordHealthCheck({ skillId: 'image-gen', healthy: false, latencyMs: 100, checkedAt: Date.now() });

      const matches = registry.discover({ minHealth: 0.5 });
      assert.ok(!matches.some(m => m.skill.id === 'image-gen'));
    });
  });

  describe('recordExecution()', () => {
    it('should track execution stats', () => {
      registry.register({
        id: 'test',
        name: 'Test',
        version: '1.0.0',
        description: 'Test',
        provider: 'agent',
        capabilities: ['test'],
      });

      registry.recordExecution('test', 100, true);
      registry.recordExecution('test', 200, true);
      registry.recordExecution('test', 300, false);

      const skill = registry.get('test');
      assert.equal(skill.executionCount, 3);
      assert.equal(skill.avgExecutionMs, 200);
      assert.ok(skill.successRate < 1);
    });
  });

  describe('health checks', () => {
    it('should degrade health on failures', () => {
      registry.register({
        id: 'fragile',
        name: 'Fragile',
        version: '1.0.0',
        description: 'Breaks easily',
        provider: 'agent',
        capabilities: ['fragile'],
      });

      registry.recordHealthCheck({ skillId: 'fragile', healthy: false, latencyMs: 500, checkedAt: Date.now() });
      const skill = registry.get('fragile');
      assert.ok(skill.healthScore < 1);
    });

    it('should recover health on success', () => {
      registry.register({
        id: 'resilient',
        name: 'Resilient',
        version: '1.0.0',
        description: 'Recovers well',
        provider: 'agent',
        capabilities: ['resilient'],
      });

      registry.recordHealthCheck({ skillId: 'resilient', healthy: false, latencyMs: 500, checkedAt: Date.now() });
      registry.recordHealthCheck({ skillId: 'resilient', healthy: true, latencyMs: 50, checkedAt: Date.now() });

      const skill = registry.get('resilient');
      assert.ok(skill.healthScore > 0.7);
    });
  });

  describe('pipelines', () => {
    it('should create and validate a pipeline', () => {
      registry.register({
        id: 'step1',
        name: 'Step 1',
        version: '1.0.0',
        description: 'First step',
        provider: 'agent',
        capabilities: ['prep'],
      });

      registry.register({
        id: 'step2',
        name: 'Step 2',
        version: '1.0.0',
        description: 'Second step',
        provider: 'agent',
        capabilities: ['process'],
      });

      const pipeline = registry.createPipeline('test-pipeline', [
        { skillId: 'step1' },
        { skillId: 'step2' },
      ]);

      assert.ok(pipeline.id);
      assert.equal(pipeline.name, 'test-pipeline');

      const validation = registry.validatePipeline(pipeline.id);
      assert.ok(validation.valid);
      assert.equal(validation.errors.length, 0);
    });

    it('should detect missing skills in pipeline', () => {
      const pipeline = registry.createPipeline('broken', [
        { skillId: 'nonexistent' },
      ]);

      const validation = registry.validatePipeline(pipeline.id);
      assert.ok(!validation.valid);
      assert.ok(validation.errors[0].includes('not found'));
    });
  });

  describe('deprecate()', () => {
    it('should mark a skill as deprecated', () => {
      registry.register({
        id: 'old',
        name: 'Old Skill',
        version: '0.1.0',
        description: 'Deprecated',
        provider: 'agent',
        capabilities: ['legacy'],
      });

      assert.ok(registry.deprecate('old'));
      assert.equal(registry.get('old').status, 'deprecated');
    });
  });

  describe('getStats()', () => {
    it('should return registry statistics', () => {
      registry.register({
        id: 's1',
        name: 'S1',
        version: '1.0.0',
        description: 'S1',
        provider: 'a',
        capabilities: ['x'],
      });

      const stats = registry.getStats();
      assert.equal(stats.totalSkills, 1);
      assert.equal(stats.activeSkills, 1);
    });
  });
});
