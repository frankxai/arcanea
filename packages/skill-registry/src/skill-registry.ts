import { EventEmitter } from 'node:events';
import { randomUUID } from 'node:crypto';
import type {
  SkillId,
  SkillDefinition,
  RegisteredSkill,
  SkillQuery,
  SkillMatch,
  SkillPipeline,
  PipelineStep,
  HealthCheckResult,
  RegistryStats,
  SkillStatus,
} from './types.js';

/**
 * Compare a version string against a semver range.
 * Supports: ">=X.Y.Z", "^X.Y", "*", exact match.
 */
function versionSatisfies(version: string, range: string): boolean {
  if (range === '*' || !range) return true;

  const parse = (v: string): number[] =>
    v.replace(/^[>=^~]+/, '').split('.').map(Number);

  const ver = parse(version);
  const req = parse(range);

  if (range.startsWith('>=')) {
    for (let i = 0; i < 3; i++) {
      if ((ver[i] ?? 0) > (req[i] ?? 0)) return true;
      if ((ver[i] ?? 0) < (req[i] ?? 0)) return false;
    }
    return true;
  }

  if (range.startsWith('^')) {
    // Compatible with — same major
    return (ver[0] ?? 0) === (req[0] ?? 0) && (ver[1] ?? 0) >= (req[1] ?? 0);
  }

  // Exact match
  return version === range;
}

/**
 * SkillRegistry — dynamic skill discovery, registration, and composition.
 *
 * Supports:
 * - Runtime skill registration and deregistration
 * - Capability-based semantic matching
 * - Version compatibility checking
 * - Health monitoring
 * - Skill composition into pipelines
 * - Guardian-affinity aware routing
 */
export class SkillRegistry extends EventEmitter {
  private skills = new Map<SkillId, RegisteredSkill>();
  private capabilityIndex = new Map<string, Set<SkillId>>();
  private providerIndex = new Map<string, Set<SkillId>>();
  private guardianIndex = new Map<string, Set<SkillId>>();
  private pipelines = new Map<string, SkillPipeline>();

  /**
   * Register a new skill.
   */
  register(definition: SkillDefinition): RegisteredSkill {
    const existing = this.skills.get(definition.id);
    if (existing) {
      // Update existing registration
      const updated: RegisteredSkill = {
        ...existing,
        ...definition,
        status: 'active',
        registeredAt: existing.registeredAt,
      };
      this.skills.set(definition.id, updated);
      this.indexSkill(updated);
      this.emit('skill:updated', updated);
      return updated;
    }

    const registered: RegisteredSkill = {
      ...definition,
      status: 'active',
      registeredAt: Date.now(),
      healthScore: 1.0,
      executionCount: 0,
      avgExecutionMs: 0,
      successRate: 1.0,
    };

    this.skills.set(definition.id, registered);
    this.indexSkill(registered);
    this.emit('skill:registered', registered);
    return registered;
  }

  /**
   * Deregister a skill.
   */
  deregister(skillId: SkillId): boolean {
    const skill = this.skills.get(skillId);
    if (!skill) return false;

    this.removeFromIndexes(skillId, skill);
    this.skills.delete(skillId);
    this.emit('skill:deregistered', { id: skillId });
    return true;
  }

  /**
   * Mark a skill as deprecated (still discoverable but flagged).
   */
  deprecate(skillId: SkillId): boolean {
    const skill = this.skills.get(skillId);
    if (!skill) return false;

    skill.status = 'deprecated';
    this.emit('skill:deprecated', skill);
    return true;
  }

  /**
   * Get a specific skill by ID.
   */
  get(skillId: SkillId): RegisteredSkill | undefined {
    return this.skills.get(skillId);
  }

  /**
   * Discover skills matching a query. Returns results ranked by relevance.
   */
  discover(query: SkillQuery): SkillMatch[] {
    const matches: SkillMatch[] = [];

    for (const skill of this.skills.values()) {
      // Filter: active only
      if (query.activeOnly && skill.status !== 'active') continue;

      // Filter: minimum health
      if (query.minHealth !== undefined && skill.healthScore < query.minHealth) continue;

      // Filter: provider
      if (query.provider && skill.provider !== query.provider) continue;

      // Score capability match
      let relevance = 0;
      const matchedCapabilities: string[] = [];

      if (query.capabilities && query.capabilities.length > 0) {
        for (const cap of query.capabilities) {
          const capLower = cap.toLowerCase();
          for (const skillCap of skill.capabilities) {
            if (skillCap.toLowerCase().includes(capLower) || capLower.includes(skillCap.toLowerCase())) {
              matchedCapabilities.push(skillCap);
            }
          }
        }
        if (matchedCapabilities.length === 0) continue;
        relevance = matchedCapabilities.length / query.capabilities.length;
      } else {
        relevance = 0.5; // No capability filter = neutral relevance
      }

      // Boost for name match
      if (query.name) {
        const nameLower = skill.name.toLowerCase();
        const queryLower = query.name.toLowerCase();
        if (nameLower.includes(queryLower)) relevance += 0.3;
      }

      // Boost for Guardian affinity
      if (query.guardianId && skill.guardianAffinity?.includes(query.guardianId)) {
        relevance += 0.2;
      }

      // Factor in health and success rate
      relevance *= (skill.healthScore * 0.5 + skill.successRate * 0.5);

      // Check dependencies
      const dependenciesMet = this.checkDependencies(skill);

      matches.push({ skill, relevance: Math.min(relevance, 1), matchedCapabilities, dependenciesMet });
    }

    // Sort by relevance descending
    matches.sort((a, b) => b.relevance - a.relevance);

    return query.limit ? matches.slice(0, query.limit) : matches;
  }

  /**
   * Record a skill execution result.
   */
  recordExecution(skillId: SkillId, durationMs: number, success: boolean): void {
    const skill = this.skills.get(skillId);
    if (!skill) return;

    skill.executionCount++;
    skill.avgExecutionMs =
      (skill.avgExecutionMs * (skill.executionCount - 1) + durationMs) / skill.executionCount;
    skill.successRate =
      (skill.successRate * (skill.executionCount - 1) + (success ? 1 : 0)) / skill.executionCount;
  }

  /**
   * Record a health check result.
   */
  recordHealthCheck(result: HealthCheckResult): void {
    const skill = this.skills.get(result.skillId);
    if (!skill) return;

    skill.lastHealthCheck = result.checkedAt;
    const prevScore = skill.healthScore;

    if (result.healthy) {
      // Gradual recovery
      skill.healthScore = Math.min(1, skill.healthScore + 0.1);
      if (skill.status === 'error') skill.status = 'active';
    } else {
      // Gradual degradation
      skill.healthScore = Math.max(0, skill.healthScore - 0.2);
      if (skill.healthScore < 0.3) skill.status = 'error';
    }

    if (Math.abs(prevScore - skill.healthScore) > 0.01) {
      this.emit('skill:health-changed', { id: result.skillId, score: skill.healthScore });
    }
  }

  /**
   * Create a skill pipeline (chain multiple skills).
   */
  createPipeline(name: string, steps: PipelineStep[]): SkillPipeline {
    const pipeline: SkillPipeline = {
      id: randomUUID(),
      name,
      steps,
      createdAt: Date.now(),
    };
    this.pipelines.set(pipeline.id, pipeline);
    this.emit('pipeline:created', pipeline);
    return pipeline;
  }

  /**
   * Remove a pipeline.
   */
  removePipeline(pipelineId: string): boolean {
    if (!this.pipelines.has(pipelineId)) return false;
    this.pipelines.delete(pipelineId);
    this.emit('pipeline:removed', { id: pipelineId });
    return true;
  }

  /**
   * Get a pipeline by ID.
   */
  getPipeline(pipelineId: string): SkillPipeline | undefined {
    return this.pipelines.get(pipelineId);
  }

  /**
   * List all pipelines.
   */
  listPipelines(): SkillPipeline[] {
    return Array.from(this.pipelines.values());
  }

  /**
   * Validate that all skills in a pipeline are available and healthy.
   */
  validatePipeline(pipelineId: string): { valid: boolean; errors: string[] } {
    const pipeline = this.pipelines.get(pipelineId);
    if (!pipeline) return { valid: false, errors: ['Pipeline not found'] };

    const errors: string[] = [];
    for (const step of pipeline.steps) {
      const skill = this.skills.get(step.skillId);
      if (!skill) {
        errors.push(`Skill ${step.skillId} not found`);
        continue;
      }
      if (skill.status === 'error') {
        errors.push(`Skill ${step.skillId} is in error state (health: ${skill.healthScore})`);
      }
      if (step.fallbackSkillId && !this.skills.get(step.fallbackSkillId)) {
        errors.push(`Fallback skill ${step.fallbackSkillId} not found`);
      }
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Get registry statistics.
   */
  getStats(): RegistryStats {
    let activeSkills = 0;
    let deprecatedSkills = 0;
    let totalExecutions = 0;
    let healthSum = 0;

    for (const skill of this.skills.values()) {
      if (skill.status === 'active') activeSkills++;
      if (skill.status === 'deprecated') deprecatedSkills++;
      totalExecutions += skill.executionCount;
      healthSum += skill.healthScore;
    }

    return {
      totalSkills: this.skills.size,
      activeSkills,
      deprecatedSkills,
      totalExecutions,
      avgHealthScore: this.skills.size > 0 ? healthSum / this.skills.size : 0,
      pipelinesCount: this.pipelines.size,
    };
  }

  /**
   * List all registered skills.
   */
  listAll(): RegisteredSkill[] {
    return Array.from(this.skills.values());
  }

  // --- Internal ---

  private indexSkill(skill: RegisteredSkill): void {
    // Capability index
    for (const cap of skill.capabilities) {
      if (!this.capabilityIndex.has(cap)) {
        this.capabilityIndex.set(cap, new Set());
      }
      this.capabilityIndex.get(cap)!.add(skill.id);
    }

    // Provider index
    if (!this.providerIndex.has(skill.provider)) {
      this.providerIndex.set(skill.provider, new Set());
    }
    this.providerIndex.get(skill.provider)!.add(skill.id);

    // Guardian index
    if (skill.guardianAffinity) {
      for (const gid of skill.guardianAffinity) {
        if (!this.guardianIndex.has(gid)) {
          this.guardianIndex.set(gid, new Set());
        }
        this.guardianIndex.get(gid)!.add(skill.id);
      }
    }
  }

  private removeFromIndexes(skillId: SkillId, skill: RegisteredSkill): void {
    for (const cap of skill.capabilities) {
      this.capabilityIndex.get(cap)?.delete(skillId);
    }
    this.providerIndex.get(skill.provider)?.delete(skillId);
    if (skill.guardianAffinity) {
      for (const gid of skill.guardianAffinity) {
        this.guardianIndex.get(gid)?.delete(skillId);
      }
    }
  }

  private checkDependencies(skill: RegisteredSkill): boolean {
    if (!skill.dependencies || skill.dependencies.length === 0) return true;

    for (const dep of skill.dependencies) {
      const depSkill = this.skills.get(dep.skillId);
      if (!depSkill) {
        if (!dep.optional) return false;
        continue;
      }
      if (dep.versionRange && !versionSatisfies(depSkill.version, dep.versionRange)) {
        if (!dep.optional) return false;
      }
    }
    return true;
  }
}
