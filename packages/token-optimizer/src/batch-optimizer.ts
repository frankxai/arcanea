/**
 * @arcanea/token-optimizer — BatchOptimizer
 *
 * Maps agent counts to optimal batch sizes, topologies, and cache
 * allocations. Tracks success rates for adaptive tuning — failed
 * batches waste tokens on retries, so maximizing first-pass success
 * is a direct cost optimization.
 *
 * @module @arcanea/token-optimizer/batch-optimizer
 */

import type { BatchConfig } from './types.js';

/** Internal record of a batch outcome */
interface OutcomeRecord {
  config: BatchConfig;
  success: boolean;
  timestamp: number;
}

export class BatchOptimizer {
  private outcomes: OutcomeRecord[] = [];

  /**
   * Get the optimal configuration for a given agent count.
   *
   * The heuristics are based on observed anti-drift patterns:
   * - Small teams (1-2): mesh topology, small batches
   * - Medium teams (3-4): hierarchical, moderate batches
   * - Large teams (5-8): hierarchical, larger batches with more cache
   * - Swarms (8+): adaptive topology to prevent coordination overhead
   */
  getOptimalConfig(agentCount: number): BatchConfig {
    if (agentCount <= 0) {
      return {
        batchSize: 1,
        cacheSizeMB: 10,
        topology: 'mesh',
        expectedSuccessRate: 0.5,
      };
    }

    if (agentCount <= 2) {
      return {
        batchSize: 2,
        cacheSizeMB: 25,
        topology: 'mesh',
        expectedSuccessRate: 0.98,
      };
    }

    if (agentCount <= 4) {
      return {
        batchSize: 4,
        cacheSizeMB: 50,
        topology: 'hierarchical',
        expectedSuccessRate: 0.95,
      };
    }

    if (agentCount <= 8) {
      return {
        batchSize: 6,
        cacheSizeMB: 100,
        topology: 'hierarchical',
        expectedSuccessRate: 0.92,
      };
    }

    // 8+ agents: adaptive to handle coordination overhead
    return {
      batchSize: 8,
      cacheSizeMB: 200,
      topology: 'adaptive',
      expectedSuccessRate: 0.88,
    };
  }

  /**
   * Estimate token cost for a given batch configuration.
   * Each batch item costs ~500 tokens of coordination overhead,
   * plus topology-dependent multiplier.
   */
  estimateTokens(config: BatchConfig): number {
    const basePerItem = 500;
    const topologyMultiplier: Record<string, number> = {
      mesh: 1.5,       // All-to-all communication is expensive
      hierarchical: 1.0, // Single coordinator minimizes overhead
      adaptive: 1.2,   // Middle ground
    };

    const multiplier = topologyMultiplier[config.topology] ?? 1.0;
    return Math.ceil(config.batchSize * basePerItem * multiplier);
  }

  /**
   * Record the outcome of a batch run for adaptive tuning.
   */
  recordOutcome(config: BatchConfig, success: boolean): void {
    this.outcomes.push({
      config,
      success,
      timestamp: Date.now(),
    });

    // Keep only the last 1000 outcomes
    if (this.outcomes.length > 1000) {
      this.outcomes = this.outcomes.slice(-1000);
    }
  }

  /**
   * Get the observed success rate for a specific topology.
   * Returns -1 if no data is available.
   */
  getSuccessRate(topology: string): number {
    const relevant = this.outcomes.filter((o) => o.config.topology === topology);
    if (relevant.length === 0) return -1;
    return relevant.filter((o) => o.success).length / relevant.length;
  }

  /**
   * Get the adaptive-tuned config. Uses recorded outcomes to
   * adjust expected success rates based on real data.
   */
  getAdaptiveConfig(agentCount: number): BatchConfig {
    const base = this.getOptimalConfig(agentCount);
    const observedRate = this.getSuccessRate(base.topology);

    if (observedRate >= 0) {
      // Blend observed rate with heuristic (70/30 toward observed)
      base.expectedSuccessRate =
        observedRate * 0.7 + base.expectedSuccessRate * 0.3;
    }

    return base;
  }

  /** Total recorded outcomes. */
  get totalOutcomes(): number {
    return this.outcomes.length;
  }

  /** Clear all recorded outcomes. */
  clear(): void {
    this.outcomes = [];
  }
}
