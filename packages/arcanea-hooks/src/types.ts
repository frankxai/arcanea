/**
 * @arcanea/hooks — Type Definitions
 *
 * Operational hook types for the Arcanea Intelligence OS.
 * Absorbs patterns from arcanea-flow's agentic-flow-hooks and adapts
 * them to Arcanea's Guardian mythology. Each hook category maps to
 * one or more Guardians responsible for that domain.
 *
 * Guardian Mappings:
 * - LLM hooks     → Lyria (Sight, intuition) + Aiyami (Crown, enlightenment)
 * - Memory hooks  → Elara (Shift, perspective) + Lyssandria (Foundation)
 * - Neural hooks  → Shinkami (Source, meta-consciousness)
 * - Performance   → Draconia (Fire, power) + Ino (Unity, partnership)
 * - Workflow      → Alera (Voice, expression) + Maylinn (Heart, healing)
 */

// ── Guardian Types (inlined to avoid workspace deps) ─────────────

export type GuardianName =
  | 'shinkami'
  | 'lyssandria'
  | 'draconia'
  | 'lyria'
  | 'alera'
  | 'maylinn'
  | 'aiyami'
  | 'elara'
  | 'ino'
  | 'leyla';

export type Element = 'fire' | 'water' | 'earth' | 'wind' | 'void' | 'spirit';

export interface GuardianAffinity {
  guardian: GuardianName;
  gate: string;
  frequency: number;
  element: Element;
}

// ── Hook Categories ──────────────────────────────────────────────

export type HookCategory = 'llm' | 'memory' | 'neural' | 'performance' | 'workflow';

/**
 * All hook event types across categories.
 */
export type HookEvent =
  // LLM lifecycle
  | 'llm:pre-call'
  | 'llm:post-call'
  | 'llm:error'
  | 'llm:retry'
  | 'llm:cache-hit'
  | 'llm:cache-miss'
  | 'llm:stream-chunk'
  // Memory lifecycle
  | 'memory:pre-store'
  | 'memory:post-store'
  | 'memory:pre-retrieve'
  | 'memory:post-retrieve'
  | 'memory:sync'
  | 'memory:evict'
  // Neural lifecycle
  | 'neural:pattern-detected'
  | 'neural:pattern-learned'
  | 'neural:training-start'
  | 'neural:training-complete'
  | 'neural:adaptation'
  | 'neural:consolidation'
  // Performance lifecycle
  | 'perf:metric-recorded'
  | 'perf:threshold-exceeded'
  | 'perf:bottleneck-detected'
  | 'perf:optimization-applied'
  | 'perf:health-check'
  // Workflow lifecycle
  | 'workflow:start'
  | 'workflow:step'
  | 'workflow:decision'
  | 'workflow:complete'
  | 'workflow:error'
  | 'workflow:rollback';

/**
 * Maps categories to their Guardian affinities.
 */
export const CATEGORY_GUARDIANS: Record<HookCategory, GuardianAffinity[]> = {
  llm: [
    { guardian: 'lyria', gate: 'Sight', frequency: 639, element: 'water' },
    { guardian: 'aiyami', gate: 'Crown', frequency: 741, element: 'spirit' },
  ],
  memory: [
    { guardian: 'elara', gate: 'Shift', frequency: 852, element: 'void' },
    { guardian: 'lyssandria', gate: 'Foundation', frequency: 174, element: 'earth' },
  ],
  neural: [
    { guardian: 'shinkami', gate: 'Source', frequency: 1111, element: 'void' },
  ],
  performance: [
    { guardian: 'draconia', gate: 'Fire', frequency: 396, element: 'fire' },
    { guardian: 'ino', gate: 'Unity', frequency: 963, element: 'earth' },
  ],
  workflow: [
    { guardian: 'alera', gate: 'Voice', frequency: 528, element: 'wind' },
    { guardian: 'maylinn', gate: 'Heart', frequency: 417, element: 'wind' },
  ],
};

/**
 * Maps events to their category.
 */
export function eventCategory(event: HookEvent): HookCategory {
  if (event.startsWith('llm:')) return 'llm';
  if (event.startsWith('memory:')) return 'memory';
  if (event.startsWith('neural:')) return 'neural';
  if (event.startsWith('perf:')) return 'performance';
  if (event.startsWith('workflow:')) return 'workflow';
  return 'workflow'; // fallback
}

// ── Priority ─────────────────────────────────────────────────────

export enum HookPriority {
  /** Security, validation — runs first */
  Critical = 1000,
  /** Pre-processing, preparation */
  High = 100,
  /** Standard hooks */
  Normal = 50,
  /** Logging, metrics */
  Low = 10,
  /** Async fire-and-forget — runs last */
  Background = 1,
}

// ── Context & Result ─────────────────────────────────────────────

/**
 * Hook execution context, passed to every handler.
 */
export interface HookContext<T = unknown> {
  /** Unique execution ID */
  executionId: string;

  /** The triggering event */
  event: HookEvent;

  /** ISO timestamp */
  timestamp: string;

  /** Session identifier */
  sessionId?: string;

  /** Which Guardian is currently active */
  guardian?: GuardianName;

  /** Current element affinity */
  element?: Element;

  /** Custom typed payload */
  data?: T;

  /** Arbitrary key-value metadata */
  metadata: Record<string, unknown>;

  /** Parent execution ID (for pipelines) */
  parentId?: string;

  /** Elapsed ms since pipeline start */
  elapsed?: number;
}

/**
 * Result returned from a hook handler.
 */
export interface HookResult {
  /** Whether the hook executed successfully */
  success: boolean;

  /** If true, abort subsequent hooks and/or the operation */
  abort?: boolean;

  /** Error message if failed */
  error?: string;

  /** Data to merge into context for subsequent hooks */
  data?: Record<string, unknown>;

  /** User-visible message */
  message?: string;

  /** Non-fatal warnings */
  warnings?: string[];

  /** Duration in ms */
  duration?: number;
}

// ── Hook Handler & Registration ──────────────────────────────────

/**
 * A hook handler function. Receives context, returns result.
 * May be async.
 */
export type HookHandler<T = unknown> = (
  context: HookContext<T>
) => Promise<HookResult> | HookResult;

/**
 * A registered hook entry in the manager.
 */
export interface HookEntry<T = unknown> {
  /** Unique identifier */
  id: string;

  /** Human-readable name */
  name: string;

  /** Event this hook responds to */
  event: HookEvent;

  /** Hook category (derived from event) */
  category: HookCategory;

  /** Handler function */
  handler: HookHandler<T>;

  /** Execution priority (higher = earlier) */
  priority: HookPriority;

  /** Whether the hook is enabled */
  enabled: boolean;

  /** Optional description */
  description?: string;

  /** Pattern to match against (glob, regex, or exact) */
  pattern?: string;

  /** Guardian affinity override */
  guardian?: GuardianName;

  /** Registration timestamp */
  registeredAt: string;

  /** Metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Options for registering a hook.
 */
export interface HookRegistrationOptions {
  /** Human-readable name (required) */
  name: string;

  /** Optional description */
  description?: string;

  /** Priority (default: Normal) */
  priority?: HookPriority;

  /** Initially enabled (default: true) */
  enabled?: boolean;

  /** Pattern for matcher-based filtering */
  pattern?: string;

  /** Guardian affinity override */
  guardian?: GuardianName;

  /** Arbitrary metadata */
  metadata?: Record<string, unknown>;
}

// ── Pipeline Types ───────────────────────────────────────────────

/**
 * Strategy for handling errors during pipeline execution.
 */
export type PipelineErrorStrategy = 'fail-fast' | 'continue' | 'rollback';

/**
 * A pipeline stage groups hooks to execute together.
 */
export interface PipelineStage {
  /** Stage name */
  name: string;

  /** Hook IDs to execute in this stage */
  hookIds: string[];

  /** Run hooks in parallel within this stage */
  parallel?: boolean;

  /** Optional condition — if false, skip stage */
  condition?: (context: HookContext) => boolean;
}

/**
 * A pipeline definition — ordered sequence of stages.
 */
export interface PipelineConfig {
  /** Pipeline ID */
  id: string;

  /** Human-readable name */
  name: string;

  /** Ordered stages */
  stages: PipelineStage[];

  /** Error handling strategy */
  errorStrategy: PipelineErrorStrategy;

  /** Timeout for entire pipeline in ms */
  timeoutMs?: number;
}

/**
 * Aggregated result of a pipeline execution.
 */
export interface PipelineResult {
  /** Pipeline ID */
  pipelineId: string;

  /** Overall success */
  success: boolean;

  /** Whether execution was aborted */
  aborted: boolean;

  /** Total hooks executed */
  hooksExecuted: number;

  /** Total hooks that failed */
  hooksFailed: number;

  /** Total duration in ms */
  durationMs: number;

  /** Per-hook results */
  results: Array<{
    hookId: string;
    hookName: string;
    success: boolean;
    duration: number;
    error?: string;
    stage: string;
  }>;

  /** Aggregated warnings */
  warnings: string[];

  /** Aggregated messages */
  messages: string[];

  /** Whether rollback was triggered */
  rolledBack: boolean;
}

// ── Matcher Types ────────────────────────────────────────────────

export type MatcherType = 'glob' | 'regex' | 'exact' | 'composite';

export interface MatcherPattern {
  type: MatcherType;
  pattern: string;
  inverted?: boolean;
}

export interface CompositePattern {
  type: 'composite';
  operator: 'AND' | 'OR';
  patterns: MatcherPattern[];
}

export interface MatchResult {
  matched: boolean;
  matchedRules: string[];
  executionTimeMs: number;
  cacheHit: boolean;
}

export interface MatcherConfig {
  cacheEnabled?: boolean;
  cacheTTLMs?: number;
  matchStrategy?: 'all' | 'any';
}

// ── Manager Events ───────────────────────────────────────────────

/**
 * Events emitted by HookManager.
 */
export interface HookManagerEvents {
  'hook:registered': { id: string; event: HookEvent; name: string };
  'hook:unregistered': { id: string; event: HookEvent };
  'hook:executed': { id: string; event: HookEvent; result: HookResult; duration: number };
  'hook:failed': { id: string; event: HookEvent; error: string; duration: number };
  'pipeline:start': { pipelineId: string; stages: number };
  'pipeline:complete': PipelineResult;
  'pipeline:error': { pipelineId: string; error: string };
}

// ── Registry Statistics ──────────────────────────────────────────

export interface HookRegistryStats {
  totalHooks: number;
  enabledHooks: number;
  disabledHooks: number;
  hooksByCategory: Record<HookCategory, number>;
  hooksByEvent: Record<string, number>;
  totalExecutions: number;
  totalFailures: number;
  avgExecutionTimeMs: number;
  pipelinesRegistered: number;
}

// ── LLM Hook Payloads ────────────────────────────────────────────

export interface LLMCallPayload {
  provider: string;
  model: string;
  operation: 'complete' | 'stream' | 'embed';
  messages?: Array<{ role: string; content: string }>;
  temperature?: number;
  maxTokens?: number;
  response?: {
    content: string;
    usage?: { promptTokens: number; completionTokens: number; totalTokens: number };
    cost?: { promptCost: number; completionCost: number; totalCost: number };
    latency?: number;
  };
  error?: { name: string; message: string; retryable?: boolean };
  metrics?: {
    requestStart: number;
    responseEnd?: number;
    latency?: number;
    cacheHit?: boolean;
    tokenEstimate?: number;
    costEstimate?: number;
  };
}

// ── Memory Hook Payloads ─────────────────────────────────────────

export interface MemoryPayload {
  namespace: string;
  key: string;
  value?: unknown;
  ttlSeconds?: number;
  operation: 'store' | 'retrieve' | 'sync' | 'evict';
  retrieved?: unknown;
  source?: string;
  target?: string;
}

// ── Neural Hook Payloads ─────────────────────────────────────────

export interface NeuralPayload {
  patternId?: string;
  domain: string;
  pattern?: string;
  confidence?: number;
  quality?: number;
  trainingData?: unknown;
  adaptationType?: 'reinforcement' | 'correction' | 'exploration';
}

// ── Performance Hook Payloads ────────────────────────────────────

export interface PerformancePayload {
  metricName: string;
  value: number;
  unit?: string;
  threshold?: number;
  component?: string;
  optimization?: string;
  healthStatus?: 'healthy' | 'degraded' | 'critical';
}

// ── Workflow Hook Payloads ───────────────────────────────────────

export interface WorkflowPayload {
  workflowId: string;
  workflowName?: string;
  stepName?: string;
  stepIndex?: number;
  totalSteps?: number;
  decision?: { options: string[]; selected?: string; reason?: string };
  error?: { name: string; message: string };
  result?: unknown;
}
