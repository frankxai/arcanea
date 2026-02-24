/**
 * Arcanea Skill System
 *
 * Exports the skill-rules engine, feedback bridge, and utilities
 * for Guardian-aligned skill activation with RL learning.
 */

export {
  SkillRulesEngine,
  getSkillRulesEngine,
  type SkillRule,
  type MatchResult,
  type ActivationResult,
  type ExecutionLog,
  type GuardianEntry,
} from "./skill-rules-engine.js";

export {
  FeedbackBridge,
  getFeedbackBridge,
  type FeedbackEvent,
  type BridgeStats,
} from "./feedback-bridge.js";
