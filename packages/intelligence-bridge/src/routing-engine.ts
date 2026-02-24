// ─────────────────────────────────────────────────────────────
// @arcanea/intelligence-bridge — RoutingEngine
// Guardian task routing with keyword matching, success-rate
// weighting, and confidence scoring
// ─────────────────────────────────────────────────────────────

import type {
  RoutingDecision,
  GuardianRoutingProfile,
} from './types.js';
import { GUARDIAN_ROUTING_PROFILES } from './types.js';

interface OutcomeRecord {
  guardianId: string;
  outcome: 'success' | 'failure' | 'partial';
  reward: number;
  timestamp: number;
}

interface RoutingStats {
  totalRoutes: number;
  totalLatencyMs: number;
  totalConfidence: number;
}

/**
 * Routes tasks to the optimal Guardian based on keyword matching,
 * historical success rates, and confidence scoring.
 */
export class RoutingEngine {
  private profiles: Map<string, GuardianRoutingProfile>;
  private outcomes: OutcomeRecord[] = [];
  private stats: RoutingStats = {
    totalRoutes: 0,
    totalLatencyMs: 0,
    totalConfidence: 0,
  };

  constructor() {
    this.profiles = new Map();
    for (const profile of GUARDIAN_ROUTING_PROFILES) {
      // Deep-clone so we don't mutate the constant
      this.profiles.set(profile.guardianId, { ...profile, domains: [...profile.domains] });
    }
  }

  /**
   * Route a task string to the best Guardian.
   */
  route(task: string, _context?: Record<string, unknown>): RoutingDecision {
    const startTime = performance.now();
    const taskLower = task.toLowerCase();

    // Score each Guardian
    const scores: Array<{ id: string; score: number; matches: string[] }> = [];

    for (const [id, profile] of this.profiles) {
      let score = 0;
      const matches: string[] = [];

      // 1. Keyword matching
      for (const domain of profile.domains) {
        if (taskLower.includes(domain.toLowerCase())) {
          score += 10;
          matches.push(domain);
        }
      }

      // 2. Success rate weighting (only if we have history)
      const guardianOutcomes = this.outcomes.filter((o) => o.guardianId === id);
      if (guardianOutcomes.length > 0) {
        const successes = guardianOutcomes.filter((o) => o.outcome === 'success').length;
        const successRate = successes / guardianOutcomes.length;
        score += successRate * 5; // up to +5 for 100% success rate

        // Penalize low success rates
        if (successRate < 0.3 && guardianOutcomes.length >= 3) {
          score -= 3;
        }
      }

      // 3. Recent reward average bonus
      const recentOutcomes = guardianOutcomes.slice(-10);
      if (recentOutcomes.length > 0) {
        const avgReward =
          recentOutcomes.reduce((sum, o) => sum + o.reward, 0) / recentOutcomes.length;
        score += avgReward * 2;
      }

      scores.push({ id, score, matches });
    }

    // Sort by score descending
    scores.sort((a, b) => b.score - a.score);

    // If no matches at all, default to Shinkami (Source Gate — overseer)
    let bestId = 'shinkami';
    let bestMatches: string[] = [];

    if (scores.length > 0 && scores[0].score > 0) {
      bestId = scores[0].id;
      bestMatches = scores[0].matches;
    }

    const profile = this.profiles.get(bestId)!;
    const latencyMs = performance.now() - startTime;

    // Confidence: base on match quality + history
    const bestScore = scores.find((s) => s.id === bestId)?.score ?? 0;
    const maxPossibleScore = (profile.domains.length * 10) + 5 + 2; // keywords + success + reward
    let confidence = Math.min(1, Math.max(0.1, bestScore / maxPossibleScore));

    // Boost confidence if we have lots of positive history
    const guardianOutcomes = this.outcomes.filter((o) => o.guardianId === bestId);
    if (guardianOutcomes.length >= 5) {
      const successes = guardianOutcomes.filter((o) => o.outcome === 'success').length;
      const successRate = successes / guardianOutcomes.length;
      confidence = Math.min(1, confidence + successRate * 0.2);
    }

    // Build reasoning
    const reasoning = bestMatches.length > 0
      ? `Matched domains: ${bestMatches.join(', ')}. Guardian ${profile.guardianName} at ${profile.gate} Gate (${profile.frequency} Hz).`
      : `No specific domain match. Routing to ${profile.guardianName} (${profile.gate} Gate) as meta-overseer.`;

    // Update stats
    this.stats.totalRoutes += 1;
    this.stats.totalLatencyMs += latencyMs;
    this.stats.totalConfidence += confidence;

    // Update profile
    profile.totalTasks += 1;
    profile.avgLatency =
      (profile.avgLatency * (profile.totalTasks - 1) + latencyMs) / profile.totalTasks;

    return {
      guardianId: bestId,
      guardianName: profile.guardianName,
      gate: profile.gate,
      frequency: profile.frequency,
      confidence,
      reasoning,
      patterns: bestMatches,
      latencyMs,
    };
  }

  /**
   * Record the outcome of a routing decision (RL feedback).
   */
  recordOutcome(
    decision: RoutingDecision,
    outcome: 'success' | 'failure' | 'partial',
    reward: number,
  ): void {
    this.outcomes.push({
      guardianId: decision.guardianId,
      outcome,
      reward,
      timestamp: Date.now(),
    });

    // Update the profile's success rate
    const profile = this.profiles.get(decision.guardianId);
    if (profile) {
      const guardianOutcomes = this.outcomes.filter(
        (o) => o.guardianId === decision.guardianId,
      );
      const successes = guardianOutcomes.filter((o) => o.outcome === 'success').length;
      profile.successRate = successes / guardianOutcomes.length;
      profile.patterns = guardianOutcomes.length;
    }
  }

  /**
   * Get a single Guardian's routing profile.
   */
  getGuardianProfile(guardianId: string): GuardianRoutingProfile | undefined {
    const profile = this.profiles.get(guardianId);
    return profile ? { ...profile, domains: [...profile.domains] } : undefined;
  }

  /**
   * Get all Guardian routing profiles.
   */
  getAllProfiles(): GuardianRoutingProfile[] {
    return Array.from(this.profiles.values()).map((p) => ({
      ...p,
      domains: [...p.domains],
    }));
  }

  /**
   * Get aggregated routing stats.
   */
  getStats(): {
    totalRoutes: number;
    avgLatency: number;
    avgConfidence: number;
    outcomesRecorded: number;
  } {
    return {
      totalRoutes: this.stats.totalRoutes,
      avgLatency:
        this.stats.totalRoutes > 0
          ? this.stats.totalLatencyMs / this.stats.totalRoutes
          : 0,
      avgConfidence:
        this.stats.totalRoutes > 0
          ? this.stats.totalConfidence / this.stats.totalRoutes
          : 0,
      outcomesRecorded: this.outcomes.length,
    };
  }
}
