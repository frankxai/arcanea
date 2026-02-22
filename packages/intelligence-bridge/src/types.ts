// ─────────────────────────────────────────────────────────────
// @arcanea/intelligence-bridge — Types & Constants
// The nervous system connecting all Arcanea intelligence packages
// ─────────────────────────────────────────────────────────────

/**
 * Event types flowing through the intelligence bridge.
 */
export type EventType =
  | 'task-start'
  | 'task-complete'
  | 'task-fail'
  | 'hook-trigger'
  | 'pattern-match'
  | 'learning-cycle'
  | 'budget-alert'
  | 'guardian-route'
  | 'memory-store'
  | 'memory-search';

/**
 * Core event flowing through the EventBus.
 */
export interface IntelligenceEvent {
  id: string;
  type: EventType;
  guardianId?: string;
  timestamp: number;
  payload: Record<string, unknown>;
  sessionId?: string;
}

/**
 * Result of the RoutingEngine deciding which Guardian handles a task.
 */
export interface RoutingDecision {
  guardianId: string;
  guardianName: string;
  gate: string;
  frequency: number;
  confidence: number;
  reasoning: string;
  patterns: string[];
  latencyMs: number;
}

/**
 * A single reinforcement-learning feedback record.
 */
export interface FeedbackRecord {
  eventId: string;
  trajectoryId?: string;
  guardianId: string;
  action: string;
  outcome: 'success' | 'failure' | 'partial';
  reward: number;
  tokensCost: number;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

/**
 * Pipeline configuration toggles.
 */
export interface PipelineConfig {
  enableTrajectoryRecording: boolean;
  enablePatternLearning: boolean;
  enableCostTracking: boolean;
  enableMemoryPersistence: boolean;
  learningProfile: string;
  budgetWarningThreshold: number;
  budgetCriticalThreshold: number;
}

/**
 * Aggregate statistics for the intelligence pipeline.
 */
export interface PipelineStats {
  eventsProcessed: number;
  trajectoriesRecorded: number;
  patternsLearned: number;
  tokensTracked: number;
  routingDecisions: number;
  avgRoutingLatency: number;
  avgRoutingConfidence: number;
  feedbackRecords: number;
  uptime: number;
}

/**
 * Profile for a single Guardian's routing performance.
 */
export interface GuardianRoutingProfile {
  guardianId: string;
  guardianName: string;
  gate: string;
  frequency: number;
  element: string;
  domains: string[];
  successRate: number;
  avgLatency: number;
  totalTasks: number;
  patterns: number;
}

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────

/**
 * Default pipeline configuration — all features on, sensible thresholds.
 */
export const DEFAULT_PIPELINE_CONFIG: PipelineConfig = {
  enableTrajectoryRecording: true,
  enablePatternLearning: true,
  enableCostTracking: true,
  enableMemoryPersistence: true,
  learningProfile: 'balanced',
  budgetWarningThreshold: 0.7,
  budgetCriticalThreshold: 0.9,
};

/**
 * Canonical Guardian routing profiles — one per Gate.
 * Extended Solfeggio frequencies: 174, 285, 396, 417, 528, 639, 741, 852, 963, 1111 Hz
 */
export const GUARDIAN_ROUTING_PROFILES: GuardianRoutingProfile[] = [
  {
    guardianId: 'lyssandria',
    guardianName: 'Lyssandria',
    gate: 'Foundation',
    frequency: 174,
    element: 'Earth',
    domains: ['database', 'schema', 'migration', 'infrastructure', 'stability', 'deploy'],
    successRate: 0,
    avgLatency: 0,
    totalTasks: 0,
    patterns: 0,
  },
  {
    guardianId: 'leyla',
    guardianName: 'Leyla',
    gate: 'Flow',
    frequency: 285,
    element: 'Water',
    domains: ['creative', 'design', 'art', 'flow', 'emotion', 'style', 'UX'],
    successRate: 0,
    avgLatency: 0,
    totalTasks: 0,
    patterns: 0,
  },
  {
    guardianId: 'draconia',
    guardianName: 'Draconia',
    gate: 'Fire',
    frequency: 396,
    element: 'Fire',
    domains: ['performance', 'optimization', 'refactor', 'transform', 'power', 'fire'],
    successRate: 0,
    avgLatency: 0,
    totalTasks: 0,
    patterns: 0,
  },
  {
    guardianId: 'maylinn',
    guardianName: 'Maylinn',
    gate: 'Heart',
    frequency: 417,
    element: 'Water',
    domains: ['documentation', 'communication', 'teamwork', 'healing', 'connect'],
    successRate: 0,
    avgLatency: 0,
    totalTasks: 0,
    patterns: 0,
  },
  {
    guardianId: 'alera',
    guardianName: 'Alera',
    gate: 'Voice',
    frequency: 528,
    element: 'Wind',
    domains: ['API', 'interface', 'naming', 'voice', 'expression', 'public'],
    successRate: 0,
    avgLatency: 0,
    totalTasks: 0,
    patterns: 0,
  },
  {
    guardianId: 'lyria',
    guardianName: 'Lyria',
    gate: 'Sight',
    frequency: 639,
    element: 'Water',
    domains: ['debug', 'investigate', 'analyze', 'insight', 'vision', 'strategy'],
    successRate: 0,
    avgLatency: 0,
    totalTasks: 0,
    patterns: 0,
  },
  {
    guardianId: 'aiyami',
    guardianName: 'Aiyami',
    gate: 'Crown',
    frequency: 741,
    element: 'Spirit',
    domains: ['architecture', 'enlighten', 'wisdom', 'crown', 'system-design'],
    successRate: 0,
    avgLatency: 0,
    totalTasks: 0,
    patterns: 0,
  },
  {
    guardianId: 'elara',
    guardianName: 'Elara',
    gate: 'Shift',
    frequency: 852,
    element: 'Wind',
    domains: ['migration', 'shift', 'transform', 'perspective', 'change'],
    successRate: 0,
    avgLatency: 0,
    totalTasks: 0,
    patterns: 0,
  },
  {
    guardianId: 'ino',
    guardianName: 'Ino',
    gate: 'Unity',
    frequency: 963,
    element: 'Spirit',
    domains: ['integration', 'merge', 'unity', 'partnership', 'collaborate'],
    successRate: 0,
    avgLatency: 0,
    totalTasks: 0,
    patterns: 0,
  },
  {
    guardianId: 'shinkami',
    guardianName: 'Shinkami',
    gate: 'Source',
    frequency: 1111,
    element: 'Void',
    domains: ['meta', 'orchestrate', 'source', 'consciousness', 'oversee', 'all'],
    successRate: 0,
    avgLatency: 0,
    totalTasks: 0,
    patterns: 0,
  },
];
