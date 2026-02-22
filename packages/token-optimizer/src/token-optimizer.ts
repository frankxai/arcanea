/**
 * @arcanea/token-optimizer — TokenOptimizer (Main Orchestrator)
 *
 * Composes LRUCache, ReasoningBank, BatchOptimizer, and CostTracker
 * into a single high-level API for 30-50% API cost reduction.
 *
 * Usage:
 * ```ts
 * import { getTokenOptimizer } from '@arcanea/token-optimizer';
 * const optimizer = getTokenOptimizer();
 * await optimizer.initialize();
 *
 * // Compact context (32% fewer tokens)
 * const ctx = optimizer.getCompactContext("auth patterns");
 *
 * // Cache-aware lookup
 * const result = await optimizer.cachedLookup("key", async () => expensiveCall());
 *
 * // Record usage per Guardian
 * optimizer.recordUsage("lyria", 1500, "claude");
 * ```
 *
 * @module @arcanea/token-optimizer/token-optimizer
 */

import { EventEmitter } from 'node:events';
import { LRUCache } from './cache.js';
import { ReasoningBank } from './reasoning-bank.js';
import { BatchOptimizer } from './batch-optimizer.js';
import { CostTracker } from './cost-tracker.js';
import type {
  MemoryContext,
  BatchConfig,
  TokenBudget,
  OptimizationReport,
  RetrievalOptions,
} from './types.js';

export interface TokenOptimizerOptions {
  /** Maximum cache entries (default 1000) */
  cacheMaxSize?: number;
  /** Default cache TTL in ms (default 5 min) */
  cacheTTL?: number;
}

export class TokenOptimizer extends EventEmitter {
  readonly cache: LRUCache<unknown>;
  readonly reasoningBank: ReasoningBank;
  readonly batchOptimizer: BatchOptimizer;
  readonly costTracker: CostTracker;

  private initialized = false;

  constructor(options?: TokenOptimizerOptions) {
    super();
    this.cache = new LRUCache<unknown>(
      options?.cacheMaxSize ?? 1000,
      options?.cacheTTL ?? 300_000
    );
    this.reasoningBank = new ReasoningBank();
    this.batchOptimizer = new BatchOptimizer();
    this.costTracker = new CostTracker();

    // Forward cost tracker events
    this.costTracker.on('budget-warning', (data) =>
      this.emit('budget-warning', data)
    );
    this.costTracker.on('budget-critical', (data) =>
      this.emit('budget-critical', data)
    );
    this.costTracker.on('usage-recorded', (data) =>
      this.emit('usage-recorded', data)
    );
  }

  /**
   * Initialize the optimizer. Idempotent.
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
    this.emit('initialized', { timestamp: Date.now() });
  }

  /** Whether `initialize()` has been called. */
  get isInitialized(): boolean {
    return this.initialized;
  }

  // -----------------------------------------------------------------------
  // Semantic Retrieval
  // -----------------------------------------------------------------------

  /**
   * Store a reasoning entry for later retrieval.
   */
  storeReasoning(text: string, tags?: string[]): string {
    return this.reasoningBank.store(text, tags);
  }

  /**
   * Retrieve compact context for a query via semantic retrieval.
   * Saves ~32% tokens vs full context inclusion.
   */
  getCompactContext(
    query: string,
    options?: RetrievalOptions & { baselineTokens?: number }
  ): MemoryContext {
    return this.reasoningBank.getCompactContext(query, options);
  }

  // -----------------------------------------------------------------------
  // Caching
  // -----------------------------------------------------------------------

  /**
   * Cache-aware lookup. Returns cached data on hit; calls `generator`
   * on miss and caches the result.
   */
  async cachedLookup<T>(key: string, generator: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key) as T | undefined;
    if (cached !== undefined) {
      return cached;
    }

    const result = await generator();
    this.cache.set(key, result);
    return result;
  }

  // -----------------------------------------------------------------------
  // Batch Optimization
  // -----------------------------------------------------------------------

  /**
   * Get optimal batch configuration for a given agent count.
   */
  getOptimalConfig(agentCount: number): BatchConfig {
    return this.batchOptimizer.getOptimalConfig(agentCount);
  }

  // -----------------------------------------------------------------------
  // Cost Tracking
  // -----------------------------------------------------------------------

  /**
   * Record token usage for a Guardian.
   */
  recordUsage(guardianId: string, tokens: number, model?: string): void {
    this.costTracker.recordUsage(guardianId, tokens, model);
  }

  /**
   * Set a token budget with thresholds.
   */
  setBudget(budget: TokenBudget): void {
    this.costTracker.setBudget(budget);
  }

  /**
   * Get current budget status.
   */
  getBudgetStatus(): TokenBudget | null {
    return this.costTracker.getBudgetStatus();
  }

  // -----------------------------------------------------------------------
  // Reporting
  // -----------------------------------------------------------------------

  /**
   * Get aggregated statistics across all subsystems.
   */
  getStats(): {
    cache: ReturnType<LRUCache<unknown>['getStats']>;
    reasoningBank: ReturnType<ReasoningBank['getStats']>;
    costTracker: ReturnType<CostTracker['getGlobalStats']>;
    batchOutcomes: number;
    initialized: boolean;
  } {
    return {
      cache: this.cache.getStats(),
      reasoningBank: this.reasoningBank.getStats(),
      costTracker: this.costTracker.getGlobalStats(),
      batchOutcomes: this.batchOptimizer.totalOutcomes,
      initialized: this.initialized,
    };
  }

  /**
   * Generate a comprehensive optimization report.
   */
  generateReport(): OptimizationReport {
    const cacheStats = this.cache.getStats();
    const bankStats = this.reasoningBank.getStats();

    return this.costTracker.generateReport(
      cacheStats.hitRate,
      bankStats.totalRetrievals,
      bankStats.totalTokensSaved
    );
  }
}

// ---------------------------------------------------------------------------
// Singleton
// ---------------------------------------------------------------------------

let instance: TokenOptimizer | null = null;

/**
 * Get or create the singleton TokenOptimizer instance.
 */
export function getTokenOptimizer(options?: TokenOptimizerOptions): TokenOptimizer {
  if (!instance) {
    instance = new TokenOptimizer(options);
  }
  return instance;
}

/**
 * Reset the singleton (useful for testing).
 */
export function resetTokenOptimizer(): void {
  instance = null;
}
