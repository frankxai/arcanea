/**
 * @arcanea/token-optimizer — CostTracker
 *
 * Monitors per-Guardian token usage and cost. Emits budget
 * alerts when spending approaches configured thresholds.
 * Maps each Guardian to their canonical Gate and frequency.
 *
 * @module @arcanea/token-optimizer/cost-tracker
 */

import { EventEmitter } from 'node:events';
import type {
  GuardianCostProfile,
  TokenBudget,
  OptimizationReport,
} from './types.js';
import {
  GUARDIAN_FREQUENCIES,
  COST_PER_TOKEN,
  DEFAULT_COST_PER_TOKEN,
  GUARDIAN_IDS,
} from './types.js';

/** Internal mutable usage record */
interface UsageRecord {
  totalTokens: number;
  callCount: number;
  totalCost: number;
}

export class CostTracker extends EventEmitter {
  /** Per-Guardian usage accumulator */
  private usage = new Map<string, UsageRecord>();

  /** Optional token budget */
  private budget: TokenBudget | null = null;

  /** Whether warning/critical events have already fired for current budget cycle */
  private warningEmitted = false;
  private criticalEmitted = false;

  /** Global totals */
  private globalTokens = 0;
  private globalCost = 0;
  private globalCalls = 0;

  /**
   * Record a token usage event.
   *
   * @param guardianId  Lowercase Guardian name (e.g. "lyria")
   * @param tokens      Number of tokens consumed
   * @param model       Model family key (e.g. "claude", "gemini")
   */
  recordUsage(guardianId: string, tokens: number, model = 'claude'): void {
    if (tokens < 0) tokens = 0;

    const costPerToken = COST_PER_TOKEN[model] ?? DEFAULT_COST_PER_TOKEN;
    const cost = tokens * costPerToken;

    // Accumulate per-Guardian
    const existing = this.usage.get(guardianId);
    if (existing) {
      existing.totalTokens += tokens;
      existing.callCount++;
      existing.totalCost += cost;
    } else {
      this.usage.set(guardianId, {
        totalTokens: tokens,
        callCount: 1,
        totalCost: cost,
      });
    }

    // Global accumulation
    this.globalTokens += tokens;
    this.globalCost += cost;
    this.globalCalls++;

    this.emit('usage-recorded', { guardianId, tokens, model, cost });

    // Budget checks
    this.checkBudget();
  }

  /**
   * Get the cost profile for a specific Guardian.
   * Returns null if no usage has been recorded for that Guardian.
   */
  getGuardianProfile(guardianId: string): GuardianCostProfile | null {
    const record = this.usage.get(guardianId);
    if (!record) return null;

    const freq = GUARDIAN_FREQUENCIES[guardianId];

    return {
      guardianId,
      guardianName: guardianId.charAt(0).toUpperCase() + guardianId.slice(1),
      gate: freq?.gate ?? 'Unknown',
      frequency: freq?.frequency ?? 0,
      avgTokensPerCall: record.callCount > 0
        ? Math.round(record.totalTokens / record.callCount)
        : 0,
      totalTokensUsed: record.totalTokens,
      callCount: record.callCount,
      costEstimate: record.totalCost,
    };
  }

  /**
   * Get profiles for all Guardians that have recorded usage.
   */
  getAllProfiles(): GuardianCostProfile[] {
    const profiles: GuardianCostProfile[] = [];
    for (const id of this.usage.keys()) {
      const profile = this.getGuardianProfile(id);
      if (profile) profiles.push(profile);
    }
    return profiles.sort((a, b) => b.totalTokensUsed - a.totalTokensUsed);
  }

  /**
   * Set a token budget with warning and critical thresholds.
   */
  setBudget(budget: TokenBudget): void {
    this.budget = { ...budget };
    this.budget.used = this.globalTokens;
    this.budget.remaining = Math.max(0, budget.totalBudget - this.globalTokens);
    this.warningEmitted = false;
    this.criticalEmitted = false;

    // Immediately check thresholds
    this.checkBudget();
  }

  /**
   * Get the current budget status. Returns null if no budget is set.
   */
  getBudgetStatus(): TokenBudget | null {
    if (!this.budget) return null;

    return {
      ...this.budget,
      used: this.globalTokens,
      remaining: Math.max(0, this.budget.totalBudget - this.globalTokens),
    };
  }

  /**
   * Generate a comprehensive optimization report.
   */
  generateReport(cacheHitRate = 0, memoriesRetrieved = 0, tokensSaved = 0): OptimizationReport {
    const costPerToken = COST_PER_TOKEN['claude'] ?? DEFAULT_COST_PER_TOKEN;

    // Estimate monthly based on current usage (assume 30-day month, scale from current)
    const monthlyEstimate = (tokensSaved * costPerToken * 30).toFixed(4);

    return {
      totalTokensSaved: tokensSaved,
      editsOptimized: 0,
      cacheHitRate: `${(cacheHitRate * 100).toFixed(1)}%`,
      memoriesRetrieved,
      estimatedMonthlySavings: `$${monthlyEstimate}`,
      costPerToken,
      guardianProfiles: this.getAllProfiles(),
    };
  }

  /** Reset all tracking data. */
  reset(): void {
    this.usage.clear();
    this.globalTokens = 0;
    this.globalCost = 0;
    this.globalCalls = 0;
    this.budget = null;
    this.warningEmitted = false;
    this.criticalEmitted = false;
  }

  /** Get global usage totals. */
  getGlobalStats(): { totalTokens: number; totalCost: number; totalCalls: number } {
    return {
      totalTokens: this.globalTokens,
      totalCost: this.globalCost,
      totalCalls: this.globalCalls,
    };
  }

  // -----------------------------------------------------------------------
  // Private
  // -----------------------------------------------------------------------

  private checkBudget(): void {
    if (!this.budget) return;

    const ratio = this.globalTokens / this.budget.totalBudget;

    if (ratio >= this.budget.criticalThreshold && !this.criticalEmitted) {
      this.criticalEmitted = true;
      this.emit('budget-critical', {
        used: this.globalTokens,
        budget: this.budget.totalBudget,
        ratio,
      });
    } else if (ratio >= this.budget.warningThreshold && !this.warningEmitted) {
      this.warningEmitted = true;
      this.emit('budget-warning', {
        used: this.globalTokens,
        budget: this.budget.totalBudget,
        ratio,
      });
    }
  }
}
