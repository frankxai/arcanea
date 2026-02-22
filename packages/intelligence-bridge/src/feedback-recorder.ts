// ─────────────────────────────────────────────────────────────
// @arcanea/intelligence-bridge — FeedbackRecorder
// RL feedback collection with rolling statistics
// ─────────────────────────────────────────────────────────────

import { EventEmitter } from 'node:events';
import type { FeedbackRecord } from './types.js';

const MAX_RECORDS = 50_000;

/**
 * Records reinforcement-learning feedback and computes
 * rolling success rates and reward averages per Guardian.
 */
export class FeedbackRecorder extends EventEmitter {
  private records: FeedbackRecord[] = [];

  constructor() {
    super();
    this.setMaxListeners(100);
  }

  /**
   * Record a feedback entry.
   */
  record(feedback: FeedbackRecord): void {
    this.records.push(feedback);

    // Enforce bounded history
    if (this.records.length > MAX_RECORDS) {
      this.records = this.records.slice(this.records.length - MAX_RECORDS);
    }

    this.emit('feedback-recorded', feedback);

    // Compute and emit success rate change
    const guardianRecords = this.records.filter(
      (r) => r.guardianId === feedback.guardianId,
    );
    const successes = guardianRecords.filter((r) => r.outcome === 'success').length;
    const successRate = guardianRecords.length > 0 ? successes / guardianRecords.length : 0;

    this.emit('success-rate-changed', {
      guardianId: feedback.guardianId,
      successRate,
      totalRecords: guardianRecords.length,
    });
  }

  /**
   * Get feedback records for a specific Guardian.
   */
  getByGuardian(guardianId: string, limit?: number): FeedbackRecord[] {
    const filtered = this.records.filter((r) => r.guardianId === guardianId);
    if (limit !== undefined && limit > 0) {
      return filtered.slice(-limit);
    }
    return filtered;
  }

  /**
   * Get feedback records by outcome type.
   */
  getByOutcome(
    outcome: 'success' | 'failure' | 'partial',
    limit?: number,
  ): FeedbackRecord[] {
    const filtered = this.records.filter((r) => r.outcome === outcome);
    if (limit !== undefined && limit > 0) {
      return filtered.slice(-limit);
    }
    return filtered;
  }

  /**
   * Get rolling success rate, optionally for a specific Guardian.
   */
  getSuccessRate(guardianId?: string): number {
    const subset = guardianId
      ? this.records.filter((r) => r.guardianId === guardianId)
      : this.records;

    if (subset.length === 0) return 0;
    const successes = subset.filter((r) => r.outcome === 'success').length;
    return successes / subset.length;
  }

  /**
   * Get average reward, optionally for a specific Guardian.
   */
  getAvgReward(guardianId?: string): number {
    const subset = guardianId
      ? this.records.filter((r) => r.guardianId === guardianId)
      : this.records;

    if (subset.length === 0) return 0;
    const totalReward = subset.reduce((sum, r) => sum + r.reward, 0);
    return totalReward / subset.length;
  }

  /**
   * Get the most recent feedback records.
   */
  getRecentFeedback(limit?: number): FeedbackRecord[] {
    const n = limit ?? 10;
    return this.records.slice(-n);
  }

  /**
   * Get aggregate statistics.
   */
  getStats(): {
    totalRecords: number;
    successRate: number;
    avgReward: number;
    guardians: number;
    byOutcome: Record<string, number>;
  } {
    const guardianSet = new Set(this.records.map((r) => r.guardianId));
    const byOutcome: Record<string, number> = { success: 0, failure: 0, partial: 0 };
    for (const r of this.records) {
      byOutcome[r.outcome] = (byOutcome[r.outcome] ?? 0) + 1;
    }

    return {
      totalRecords: this.records.length,
      successRate: this.getSuccessRate(),
      avgReward: this.getAvgReward(),
      guardians: guardianSet.size,
      byOutcome,
    };
  }

  /**
   * Clear all records.
   */
  clear(): void {
    this.records = [];
  }

  /**
   * Get the total number of records.
   */
  get size(): number {
    return this.records.length;
  }
}
