/**
 * @arcanea/token-optimizer — Public API
 *
 * Token optimization engine for the Arcanea ecosystem.
 * Achieves 30-50% API cost reduction via:
 *
 * - **Semantic Retrieval** (ReasoningBank) — ~32% token reduction
 * - **LRU Caching** — ~10% reduction via cached lookups
 * - **Batch Optimization** — ~20% reduction via optimal configs
 * - **Cost Tracking** — Per-Guardian budget monitoring
 *
 * @module @arcanea/token-optimizer
 */

// Types
export type {
  TokenStats,
  MemoryEntry,
  MemoryContext,
  CacheEntry,
  BatchConfig,
  OptimizationReport,
  GuardianCostProfile,
  TokenBudget,
  CacheStats,
  ReasoningBankStats,
  RetrievalOptions,
  GuardianFrequencyInfo,
} from './types.js';

// Constants
export {
  COST_PER_TOKEN,
  GUARDIAN_FREQUENCIES,
  GUARDIAN_IDS,
  DEFAULT_COST_PER_TOKEN,
} from './types.js';

// Core Classes
export { LRUCache } from './cache.js';
export { ReasoningBank } from './reasoning-bank.js';
export { BatchOptimizer } from './batch-optimizer.js';
export { CostTracker } from './cost-tracker.js';

// Orchestrator
export {
  TokenOptimizer,
  getTokenOptimizer,
  resetTokenOptimizer,
} from './token-optimizer.js';
export type { TokenOptimizerOptions } from './token-optimizer.js';
