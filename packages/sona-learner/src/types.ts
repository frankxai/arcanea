/**
 * @arcanea/sona-learner — Type Definitions
 *
 * SONA: Self-Optimizing Neural Architecture
 * Trajectory-based reinforcement learning with Guardian integration
 * for the Arcanea Intelligence OS.
 *
 * Pipeline: RETRIEVE -> JUDGE -> DISTILL -> CONSOLIDATE
 */

// ============================================================================
// Core Types
// ============================================================================

/** Verdict for trajectory outcomes */
export type Verdict = 'success' | 'failure' | 'partial';

/** SONA operating mode */
export type SONAMode = 'default' | 'fast' | 'accurate' | 'memory-efficient';

/** Pipeline stage names */
export type PipelineStage = 'RETRIEVE' | 'JUDGE' | 'DISTILL' | 'CONSOLIDATE';

// ============================================================================
// Trajectory Types
// ============================================================================

/** A single step within a trajectory */
export interface TrajectoryStep {
  /** Unique step identifier */
  id: string;
  /** Action performed */
  action: string;
  /** Observation from the environment */
  observation?: string;
  /** Reward signal (-1 to 1) */
  reward?: number;
  /** Timestamp of step execution */
  timestamp: Date;
  /** Arbitrary metadata */
  metadata?: Record<string, unknown>;
  /** Guardian that performed this step */
  guardianId?: string;
}

/** Computed metrics for a completed trajectory */
export interface TrajectoryMetrics {
  /** Total number of steps */
  totalSteps: number;
  /** Duration in milliseconds */
  duration: number;
  /** Average step duration in milliseconds */
  avgStepDuration: number;
  /** Tokens consumed (optional) */
  tokensUsed?: number;
  /** Whether learning was triggered */
  learningTriggered: boolean;
  /** Success rate (0-1) across steps with rewards */
  successRate?: number;
}

/** A complete trajectory (session of agent actions) */
export interface Trajectory {
  /** Unique trajectory identifier */
  id: string;
  /** Session this trajectory belongs to */
  sessionId: string;
  /** Guardian responsible for this trajectory */
  guardianId?: string;
  /** When this trajectory began */
  startedAt: Date;
  /** When this trajectory ended */
  endedAt?: Date;
  /** Ordered list of steps */
  steps: TrajectoryStep[];
  /** Arbitrary context data */
  context: Record<string, unknown>;
  /** Final verdict */
  verdict?: Verdict;
  /** Computed metrics (set on end) */
  metrics?: TrajectoryMetrics;
}

/** Filter options for listing trajectories */
export interface TrajectoryListFilters {
  sessionId?: string;
  guardianId?: string;
  verdict?: Verdict;
  limit?: number;
}

// ============================================================================
// Pattern Types
// ============================================================================

/** A learned pattern extracted from trajectories */
export interface Pattern {
  /** Unique pattern identifier */
  id: string;
  /** Pattern content (description or extracted knowledge) */
  content: string;
  /** Category for classification */
  category: string;
  /** Confidence score (0-1) */
  confidence: number;
  /** Number of times this pattern has been accessed */
  usageCount: number;
  /** When this pattern was first created */
  createdAt: Date;
  /** When this pattern was last accessed */
  lastUsed: Date;
  /** Optional embedding vector */
  embedding?: number[];
  /** Guardian that produced this pattern */
  guardianId?: string;
  /** Gate frequency associated with this pattern */
  gateFrequency?: number;
}

/** Result from a pattern similarity search */
export interface PatternSearchResult {
  /** The matched pattern */
  pattern: Pattern;
  /** Similarity score (0-1) */
  similarity: number;
}

/** Options for pattern search */
export interface PatternSearchOptions {
  /** Filter by category */
  category?: string;
  /** Filter by guardian */
  guardianId?: string;
  /** Minimum similarity threshold (0-1) */
  threshold?: number;
  /** Maximum results to return */
  topK?: number;
}

// ============================================================================
// SONA Profile Types
// ============================================================================

/** Settings for a SONA profile */
export interface SONAProfileSettings {
  /** Learning rate for parameter updates */
  learningRate: number;
  /** Batch size for learning cycles */
  batchSize: number;
  /** Whether micro-LoRA adaptation is enabled */
  microLoraEnabled: boolean;
  /** HNSW ef_search parameter for pattern search */
  hnswEfSearch: number;
  /** Minimum confidence threshold for patterns */
  patternThreshold: number;
}

/** A SONA operating profile */
export interface SONAProfile {
  /** Unique profile identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** Operating mode */
  mode: SONAMode;
  /** Profile settings */
  settings: SONAProfileSettings;
}

// ============================================================================
// Learning Types
// ============================================================================

/** A completed learning cycle */
export interface LearningCycle {
  /** Unique cycle identifier */
  id: string;
  /** Trajectory IDs that were processed */
  trajectoryIds: string[];
  /** Number of new patterns learned */
  patternsLearned: number;
  /** Number of existing patterns reinforced */
  patternsReinforced: number;
  /** When the cycle started */
  startedAt: Date;
  /** When the cycle completed */
  completedAt: Date;
  /** Cycle performance metrics */
  metrics: {
    /** Duration in milliseconds */
    duration: number;
    /** Pipeline stages executed */
    stagesExecuted: PipelineStage[];
    /** Patterns evaluated */
    patternsEvaluated: number;
  };
}

// ============================================================================
// Stats Types
// ============================================================================

/** Comprehensive SONA statistics */
export interface SONAStats {
  /** Whether SONA is enabled */
  enabled: boolean;
  /** Active profile ID */
  activeProfile: string;
  /** Trajectory statistics */
  trajectories: {
    total: number;
    successful: number;
    failed: number;
    avgDuration: number;
  };
  /** Pattern statistics */
  patterns: {
    stored: number;
    searchesPerformed: number;
    avgSearchLatency: number;
  };
  /** Learning statistics */
  learning: {
    cyclesCompleted: number;
    lastCycle: string | null;
    avgCycleDuration: number;
  };
  /** Performance metrics */
  performance: {
    microLoraLatency: number;
    hnswSpeedup: number;
  };
}

// ============================================================================
// Guardian Integration Types
// ============================================================================

/** Guardian profile for SONA integration */
export interface GuardianProfile {
  /** Gate name */
  gate: string;
  /** Solfeggio frequency in Hz */
  frequency: number;
  /** Elemental affinity */
  element: string;
  /** Domain specialization */
  specialization: string;
}

/** Guardian insight report */
export interface GuardianInsight {
  /** Guardian identifier */
  guardianId: string;
  /** Guardian profile */
  profile: GuardianProfile;
  /** Learned patterns for this guardian */
  patterns: Pattern[];
  /** Trajectory statistics for this guardian */
  trajectoryStats: {
    total: number;
    successful: number;
    failed: number;
    partial: number;
  };
}

// ============================================================================
// Event Types
// ============================================================================

/** Events emitted by the learning engine */
export type SONAEventMap = {
  'cycle-complete': LearningCycle;
  'pattern-learned': Pattern;
  'pattern-reinforced': { patternId: string; newConfidence: number };
  'profile-changed': { previous: string; current: string };
  'trajectory-begun': { trajectoryId: string; guardianId?: string };
  'trajectory-ended': { trajectoryId: string; verdict: Verdict; metrics: TrajectoryMetrics };
  'enabled-changed': { enabled: boolean };
};

// ============================================================================
// Constants
// ============================================================================

/** The 4-step SONA pipeline */
export const SONA_PIPELINE: readonly PipelineStage[] = [
  'RETRIEVE',
  'JUDGE',
  'DISTILL',
  'CONSOLIDATE',
] as const;

/** Guardian-specific SONA profiles, keyed by guardian ID */
export const GUARDIAN_PROFILES: Readonly<Record<string, GuardianProfile>> = {
  lyssandria: { gate: 'Foundation', frequency: 174, element: 'Earth', specialization: 'stability' },
  leyla:      { gate: 'Flow',       frequency: 285, element: 'Water', specialization: 'creativity' },
  draconia:   { gate: 'Fire',       frequency: 396, element: 'Fire',  specialization: 'transformation' },
  maylinn:    { gate: 'Heart',      frequency: 417, element: 'Wind',  specialization: 'connection' },
  alera:      { gate: 'Voice',      frequency: 528, element: 'Wind',  specialization: 'expression' },
  lyria:      { gate: 'Sight',      frequency: 639, element: 'Water', specialization: 'intuition' },
  aiyami:     { gate: 'Crown',      frequency: 741, element: 'Spirit', specialization: 'enlightenment' },
  elara:      { gate: 'Shift',      frequency: 852, element: 'Void',  specialization: 'transformation' },
  ino:        { gate: 'Unity',      frequency: 963, element: 'Spirit', specialization: 'partnership' },
  shinkami:   { gate: 'Source',      frequency: 1111, element: 'Void', specialization: 'meta-consciousness' },
} as const;

/** Default SONA profiles */
export const DEFAULT_PROFILES: readonly SONAProfile[] = [
  {
    id: 'default',
    name: 'Default',
    mode: 'default',
    settings: {
      learningRate: 0.001,
      batchSize: 32,
      microLoraEnabled: true,
      hnswEfSearch: 100,
      patternThreshold: 0.7,
    },
  },
  {
    id: 'fast',
    name: 'Fast',
    mode: 'fast',
    settings: {
      learningRate: 0.01,
      batchSize: 16,
      microLoraEnabled: true,
      hnswEfSearch: 50,
      patternThreshold: 0.6,
    },
  },
  {
    id: 'accurate',
    name: 'Accurate',
    mode: 'accurate',
    settings: {
      learningRate: 0.0001,
      batchSize: 64,
      microLoraEnabled: true,
      hnswEfSearch: 200,
      patternThreshold: 0.85,
    },
  },
  {
    id: 'memory-efficient',
    name: 'Memory Efficient',
    mode: 'memory-efficient',
    settings: {
      learningRate: 0.001,
      batchSize: 8,
      microLoraEnabled: false,
      hnswEfSearch: 50,
      patternThreshold: 0.7,
    },
  },
] as const;

/** All 10 Guardian IDs */
export const GUARDIAN_IDS = Object.keys(GUARDIAN_PROFILES) as readonly string[];

/** All 10 Gate names */
export const GATE_NAMES = Object.values(GUARDIAN_PROFILES).map(p => p.gate) as readonly string[];

/** All solfeggio frequencies */
export const SOLFEGGIO_FREQUENCIES = Object.values(GUARDIAN_PROFILES).map(p => p.frequency) as readonly number[];
