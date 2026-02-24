/**
 * @arcanea/sona-learner — Public API
 *
 * SONA: Self-Optimizing Neural Architecture
 * Trajectory-based reinforcement learning with Guardian integration
 * for the Arcanea Intelligence OS.
 *
 * Pipeline: RETRIEVE -> JUDGE -> DISTILL -> CONSOLIDATE
 */

// Core orchestrator
export { SONA } from './sona.js';

// Components
export { TrajectoryRecorder, generateId } from './trajectory-recorder.js';
export { PatternStore, computeLocalSimilarity } from './pattern-store.js';
export { LearningEngine } from './learning-engine.js';

// Types
export type {
  Verdict,
  SONAMode,
  PipelineStage,
  Trajectory,
  TrajectoryStep,
  TrajectoryMetrics,
  TrajectoryListFilters,
  Pattern,
  PatternSearchResult,
  PatternSearchOptions,
  SONAProfile,
  SONAProfileSettings,
  SONAStats,
  LearningCycle,
  GuardianProfile,
  GuardianInsight,
  SONAEventMap,
} from './types.js';

// Constants
export {
  SONA_PIPELINE,
  GUARDIAN_PROFILES,
  DEFAULT_PROFILES,
  GUARDIAN_IDS,
  GATE_NAMES,
  SOLFEGGIO_FREQUENCIES,
} from './types.js';
