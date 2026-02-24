/** Unique identifiers */
export type FlowId = string;
export type StepId = string;
export type RunId = string;

/** Step execution status */
export type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped' | 'cancelled';

/** Flow run status */
export type FlowStatus = 'pending' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled';

/** Step types */
export type StepType = 'task' | 'condition' | 'parallel' | 'loop' | 'subflow' | 'wait';

/** Retry strategy */
export interface RetryStrategy {
  maxAttempts: number;
  delayMs: number;
  backoffMultiplier?: number;
  maxDelayMs?: number;
}

/** A step in a flow */
export interface FlowStep {
  id: StepId;
  name: string;
  type: StepType;
  /** The function to execute for 'task' steps */
  execute?: (context: StepContext) => Promise<unknown>;
  /** Compensation function for rollback (saga pattern) */
  compensate?: (context: StepContext) => Promise<void>;
  /** Condition function for 'condition' steps — returns the branch key to take */
  condition?: (context: StepContext) => Promise<string>;
  /** Branches for 'condition' steps: key → array of step IDs */
  branches?: Record<string, StepId[]>;
  /** Step IDs to execute in parallel for 'parallel' steps */
  parallel?: StepId[];
  /** Loop configuration for 'loop' steps */
  loop?: {
    /** Items to iterate over (resolved from context) */
    itemsKey: string;
    /** Step IDs to execute per iteration */
    body: StepId[];
    /** Maximum iterations (safety limit) */
    maxIterations?: number;
  };
  /** Subflow ID for 'subflow' steps */
  subflowId?: FlowId;
  /** Wait duration in ms for 'wait' steps, or a function returning ms */
  waitMs?: number | ((context: StepContext) => Promise<number>);
  /** Dependencies — step IDs that must complete before this step */
  dependsOn?: StepId[];
  /** Timeout in milliseconds */
  timeoutMs?: number;
  /** Retry strategy */
  retry?: RetryStrategy;
  /** Metadata */
  metadata?: Record<string, unknown>;
}

/** Context passed to step functions */
export interface StepContext {
  /** The current flow run */
  runId: RunId;
  /** The current step */
  stepId: StepId;
  /** Shared data store for the flow run */
  data: Record<string, unknown>;
  /** Results from previous steps: stepId → result */
  results: Record<StepId, unknown>;
  /** Current loop item (when inside a loop) */
  loopItem?: unknown;
  /** Current loop index */
  loopIndex?: number;
  /** Log a message to the flow trace */
  log: (message: string) => void;
}

/** Flow definition */
export interface FlowDefinition {
  id: FlowId;
  name: string;
  description?: string;
  /** The ordered steps (entry point is the first step without dependsOn) */
  steps: FlowStep[];
  /** Initial data for the flow context */
  initialData?: Record<string, unknown>;
  /** Global timeout for the entire flow */
  timeoutMs?: number;
  /** Enable compensation (saga) on failure */
  enableCompensation?: boolean;
  /** Metadata */
  metadata?: Record<string, unknown>;
}

/** Step execution record */
export interface StepRecord {
  stepId: StepId;
  status: StepStatus;
  startedAt?: number;
  completedAt?: number;
  result?: unknown;
  error?: string;
  attempts: number;
  durationMs?: number;
}

/** Flow run — the state of a single flow execution */
export interface FlowRun {
  runId: RunId;
  flowId: FlowId;
  status: FlowStatus;
  data: Record<string, unknown>;
  stepRecords: Record<StepId, StepRecord>;
  trace: TraceEntry[];
  startedAt: number;
  completedAt?: number;
  error?: string;
}

/** Trace entry for debugging */
export interface TraceEntry {
  timestamp: number;
  stepId?: StepId;
  level: 'info' | 'warn' | 'error';
  message: string;
}

/** State snapshot for persistence */
export interface FlowSnapshot {
  run: FlowRun;
  flowDefinition: FlowDefinition;
  snapshotAt: number;
}

/** Flow engine statistics */
export interface EngineStats {
  totalFlows: number;
  activeRuns: number;
  completedRuns: number;
  failedRuns: number;
  avgDurationMs: number;
}

/** Events emitted by the engine */
export interface EngineEvents {
  'flow:started': FlowRun;
  'flow:completed': FlowRun;
  'flow:failed': FlowRun;
  'flow:paused': FlowRun;
  'flow:resumed': FlowRun;
  'step:started': { runId: RunId; stepId: StepId };
  'step:completed': { runId: RunId; stepId: StepId; result: unknown };
  'step:failed': { runId: RunId; stepId: StepId; error: string };
  'step:skipped': { runId: RunId; stepId: StepId };
  'compensation:started': { runId: RunId };
  'compensation:completed': { runId: RunId };
}
