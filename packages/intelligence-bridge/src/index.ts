// ─────────────────────────────────────────────────────────────
// @arcanea/intelligence-bridge — Public API
// The nervous system connecting all Arcanea intelligence packages
// ─────────────────────────────────────────────────────────────

// Types
export type {
  EventType,
  IntelligenceEvent,
  RoutingDecision,
  FeedbackRecord,
  PipelineConfig,
  PipelineStats,
  GuardianRoutingProfile,
} from './types.js';

// Constants
export {
  DEFAULT_PIPELINE_CONFIG,
  GUARDIAN_ROUTING_PROFILES,
} from './types.js';

// EventBus
export { EventBus, generateEventId } from './event-bus.js';

// RoutingEngine
export { RoutingEngine } from './routing-engine.js';

// FeedbackRecorder
export { FeedbackRecorder } from './feedback-recorder.js';

// IntelligencePipeline (main orchestrator)
export { IntelligencePipeline } from './intelligence-pipeline.js';
