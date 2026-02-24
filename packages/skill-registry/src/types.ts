/** Unique skill identifier */
export type SkillId = string;

/** Semver-style version string */
export type Version = string;

/** Skill status */
export type SkillStatus = 'active' | 'inactive' | 'deprecated' | 'error';

/** Guardian affinity for a skill */
export type GuardianId = string;

/** Skill definition — what an agent can do */
export interface SkillDefinition {
  id: SkillId;
  name: string;
  version: Version;
  description: string;
  /** Agent or module that provides this skill */
  provider: string;
  /** Capability tags for matching (e.g., "code-generation", "image-analysis") */
  capabilities: string[];
  /** Input schema — what this skill accepts */
  inputSchema?: Record<string, unknown>;
  /** Output schema — what this skill produces */
  outputSchema?: Record<string, unknown>;
  /** Guardian affinity — which Guardians enhance this skill */
  guardianAffinity?: GuardianId[];
  /** Dependencies on other skills */
  dependencies?: SkillDependency[];
  /** Metadata for routing and discovery */
  metadata?: Record<string, unknown>;
}

/** Skill dependency requirement */
export interface SkillDependency {
  skillId: SkillId;
  /** Semver range (e.g., ">=1.0.0", "^2.0") */
  versionRange?: string;
  optional?: boolean;
}

/** Registered skill with runtime info */
export interface RegisteredSkill extends SkillDefinition {
  status: SkillStatus;
  registeredAt: number;
  lastHealthCheck?: number;
  healthScore: number;
  executionCount: number;
  avgExecutionMs: number;
  successRate: number;
}

/** Query for discovering skills */
export interface SkillQuery {
  /** Search by capability tags */
  capabilities?: string[];
  /** Search by name (partial match) */
  name?: string;
  /** Filter by provider */
  provider?: string;
  /** Filter by Guardian affinity */
  guardianId?: GuardianId;
  /** Minimum health score (0-1) */
  minHealth?: number;
  /** Only active skills */
  activeOnly?: boolean;
  /** Maximum results */
  limit?: number;
}

/** Match result with relevance score */
export interface SkillMatch {
  skill: RegisteredSkill;
  /** Relevance score 0-1 */
  relevance: number;
  /** Which capabilities matched */
  matchedCapabilities: string[];
  /** Whether all dependencies are satisfied */
  dependenciesMet: boolean;
}

/** Skill composition — chain skills into pipelines */
export interface SkillPipeline {
  id: string;
  name: string;
  steps: PipelineStep[];
  createdAt: number;
}

/** A step in a skill pipeline */
export interface PipelineStep {
  skillId: SkillId;
  /** Map output fields from this step to input fields of the next */
  outputMapping?: Record<string, string>;
  /** Condition for executing this step (evaluated at runtime) */
  condition?: string;
  /** Fallback skill if this one fails */
  fallbackSkillId?: SkillId;
}

/** Health check result */
export interface HealthCheckResult {
  skillId: SkillId;
  healthy: boolean;
  latencyMs: number;
  checkedAt: number;
  error?: string;
}

/** Registry statistics */
export interface RegistryStats {
  totalSkills: number;
  activeSkills: number;
  deprecatedSkills: number;
  totalExecutions: number;
  avgHealthScore: number;
  pipelinesCount: number;
}

/** Events emitted by the registry */
export interface RegistryEvents {
  'skill:registered': RegisteredSkill;
  'skill:updated': RegisteredSkill;
  'skill:deregistered': { id: SkillId };
  'skill:deprecated': RegisteredSkill;
  'skill:health-changed': { id: SkillId; score: number };
  'pipeline:created': SkillPipeline;
  'pipeline:removed': { id: string };
}
