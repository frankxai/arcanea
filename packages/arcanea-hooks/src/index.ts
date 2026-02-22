/**
 * @arcanea/hooks — Main Entry Point
 *
 * Operational hooks system for the Arcanea Intelligence OS.
 * Self-optimizing lifecycle hooks with Guardian integration.
 *
 * Architecture:
 * - types.ts     — All type definitions, Guardian mappings, enums
 * - matcher.ts   — HookMatcher with caching pattern matching
 * - manager.ts   — HookManager: registry, execution, pipelines
 * - context.ts   — ContextBuilder: fluent API for hook contexts
 * - hooks/       — Hook factories by category (LLM, Memory, Neural, Performance, Workflow)
 *
 * @packageDocumentation
 */

// ── Types ────────────────────────────────────────────────────────

export type {
  GuardianName,
  Element,
  GuardianAffinity,
  HookCategory,
  HookEvent,
  HookContext,
  HookResult,
  HookHandler,
  HookEntry,
  HookRegistrationOptions,
  PipelineErrorStrategy,
  PipelineStage,
  PipelineConfig,
  PipelineResult,
  MatcherType,
  MatcherPattern,
  CompositePattern,
  MatchResult,
  MatcherConfig,
  HookManagerEvents,
  HookRegistryStats,
  // Payload types
  LLMCallPayload,
  MemoryPayload,
  NeuralPayload,
  PerformancePayload,
  WorkflowPayload,
} from './types.js';

export { HookPriority, CATEGORY_GUARDIANS, eventCategory } from './types.js';

// ── Core ─────────────────────────────────────────────────────────

export { HookMatcher } from './matcher.js';
export { HookManager } from './manager.js';
export { ContextBuilder } from './context.js';

// ── Hook Factories (by category) ─────────────────────────────────

export {
  // LLM
  llmHooks,
  createPreCallHook,
  createPostCallHook,
  createLLMErrorHook,
  createRetryHook,
  createCacheHitHook,
  createCacheMissHook,
  createStreamChunkHook,
  // Memory
  memoryHooks,
  createPreStoreHook,
  createPostStoreHook,
  createPreRetrieveHook,
  createPostRetrieveHook,
  createSyncHook,
  createEvictHook,
  // Neural
  neuralHooks,
  createPatternDetectedHook,
  createPatternLearnedHook,
  createTrainingStartHook,
  createTrainingCompleteHook,
  createAdaptationHook,
  createConsolidationHook,
  // Performance
  performanceHooks,
  createMetricRecordedHook,
  createThresholdExceededHook,
  createBottleneckDetectedHook,
  createOptimizationAppliedHook,
  createHealthCheckHook,
  // Workflow
  workflowHooks,
  createStartHook,
  createStepHook,
  createDecisionHook,
  createCompleteHook,
  createWorkflowErrorHook,
  createRollbackHook,
} from './hooks/index.js';
