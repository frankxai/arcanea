/**
 * @arcanea/hooks — Hook Category Re-exports
 *
 * All five hook categories (LLM, Memory, Neural, Performance, Workflow)
 * are re-exported from this barrel file.
 */

export { llmHooks, createPreCallHook, createPostCallHook, createErrorHook as createLLMErrorHook, createRetryHook, createCacheHitHook, createCacheMissHook, createStreamChunkHook } from './llm.js';
export { memoryHooks, createPreStoreHook, createPostStoreHook, createPreRetrieveHook, createPostRetrieveHook, createSyncHook, createEvictHook } from './memory.js';
export { neuralHooks, createPatternDetectedHook, createPatternLearnedHook, createTrainingStartHook, createTrainingCompleteHook, createAdaptationHook, createConsolidationHook } from './neural.js';
export { performanceHooks, createMetricRecordedHook, createThresholdExceededHook, createBottleneckDetectedHook, createOptimizationAppliedHook, createHealthCheckHook } from './performance.js';
export { workflowHooks, createStartHook, createStepHook, createDecisionHook, createCompleteHook, createErrorHook as createWorkflowErrorHook, createRollbackHook } from './workflow.js';
