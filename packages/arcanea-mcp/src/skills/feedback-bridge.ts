/**
 * Skill-Rules ↔ ReasoningBank Feedback Bridge
 *
 * Converts SkillRulesEngine execution logs into ReasoningBank trajectories,
 * enabling the RL learning pipeline to improve Guardian routing over time.
 *
 * Flow:
 * 1. SkillRulesEngine activates skills → logs execution
 * 2. User/system provides feedback (positive/negative/neutral)
 * 3. FeedbackBridge converts execution → Trajectory
 * 4. ReasoningBank judges → distills → consolidates
 * 5. Learned patterns feed back into future routing decisions
 *
 * @module feedback-bridge
 */

import type { ExecutionLog, ActivationResult, SkillRule } from "./skill-rules-engine.js";

// ReasoningBank types (from guardian-evolution)
// We define compatible interfaces here to avoid hard coupling
interface Trajectory {
  trajectoryId: string;
  context: string;
  domain: "code" | "creative" | "reasoning" | "chat" | "math" | "general";
  steps: TrajectoryStep[];
  qualityScore: number;
  isComplete: boolean;
  startTime: number;
  endTime?: number;
}

interface TrajectoryStep {
  stepId: string;
  timestamp: number;
  action: string;
  stateBefore: Float32Array;
  stateAfter: Float32Array;
  reward: number;
  metadata?: Record<string, unknown>;
}

// --- Bridge Types ---

export interface FeedbackEvent {
  executionId: string;
  feedback: "positive" | "negative" | "neutral";
  guardian: string;
  gate: string;
  skills: string[];
  timestamp: Date;
}

export interface BridgeStats {
  totalBridged: number;
  positiveRate: number;
  negativeRate: number;
  guardianAccuracy: Record<string, { total: number; positive: number; rate: number }>;
}

// --- Guardian-to-Domain Mapping ---

const GUARDIAN_DOMAIN_MAP: Record<string, Trajectory["domain"]> = {
  Lyssandria: "code",     // Foundation — architecture, database
  Leyla: "creative",      // Flow — creative writing, characters
  Draconia: "code",       // Fire — implementation, deployment
  Maylinn: "code",        // Heart — accessibility, UX, testing
  Alera: "code",          // Voice — security, verification, review
  Lyria: "reasoning",     // Sight — strategy, research, prompts
  Aiyami: "creative",     // Crown — visuals, world-building
  Elara: "code",          // Shift — refactoring, architecture shifts
  Ino: "code",            // Unity — collaboration, GitHub, MCP
  Shinkami: "reasoning",  // Source — orchestration, meta-consciousness
};

// --- Feedback Bridge ---

export class FeedbackBridge {
  private events: FeedbackEvent[] = [];
  private trajectories: Trajectory[] = [];
  private vectorDim: number;

  // Optional ReasoningBank reference (lazy-loaded)
  private reasoningBank: any = null;

  constructor(options?: { vectorDimension?: number }) {
    this.vectorDim = options?.vectorDimension ?? 64;
  }

  /**
   * Connect to a ReasoningBank instance for automatic trajectory processing
   */
  connectReasoningBank(bank: any): void {
    this.reasoningBank = bank;
  }

  /**
   * Convert a completed execution log into a Trajectory and optionally
   * feed it into the ReasoningBank pipeline.
   */
  async bridgeExecution(executionLog: ExecutionLog): Promise<Trajectory> {
    const activation = executionLog.activation;
    const feedback = executionLog.feedback ?? "neutral";
    const guardian = activation.guardian;

    // Map feedback to quality score
    const qualityScore = feedback === "positive" ? 0.9
      : feedback === "negative" ? 0.2
      : 0.5;

    // Map feedback to reward
    const reward = feedback === "positive" ? 1.0
      : feedback === "negative" ? 0.0
      : 0.5;

    // Build trajectory step from the activation
    const step: TrajectoryStep = {
      stepId: `step-${executionLog.id}`,
      timestamp: activation.timestamp.getTime(),
      action: `route:${activation.activated.map(r => r.skill).join("+")}`,
      stateBefore: this.textToEmbedding(activation.reasoning),
      stateAfter: this.textToEmbedding(
        `${guardian}/${activation.gate}/${feedback}`
      ),
      reward,
      metadata: {
        guardian,
        gate: activation.gate,
        frequency: activation.frequency,
        skills: activation.activated.map((r: SkillRule) => r.skill),
        cascaded: activation.cascaded,
        feedback,
      },
    };

    // Build trajectory
    const trajectory: Trajectory = {
      trajectoryId: `traj-${executionLog.id}`,
      context: `Guardian routing: ${activation.reasoning}`,
      domain: GUARDIAN_DOMAIN_MAP[guardian] ?? "general",
      steps: [step],
      qualityScore,
      isComplete: true,
      startTime: executionLog.startedAt.getTime(),
      endTime: executionLog.completedAt?.getTime() ?? Date.now(),
    };

    this.trajectories.push(trajectory);

    // Record feedback event
    this.events.push({
      executionId: executionLog.id,
      feedback,
      guardian,
      gate: activation.gate,
      skills: activation.activated.map((r: SkillRule) => r.skill),
      timestamp: new Date(),
    });

    // If ReasoningBank is connected, feed through the pipeline
    if (this.reasoningBank) {
      try {
        this.reasoningBank.storeTrajectory(trajectory);
        await this.reasoningBank.judge(trajectory);
        await this.reasoningBank.distill(trajectory);
      } catch {
        // Non-fatal — bridge still records locally
      }
    }

    return trajectory;
  }

  /**
   * Batch-process all unprocessed execution logs from a SkillRulesEngine
   */
  async bridgeAll(logs: ExecutionLog[]): Promise<Trajectory[]> {
    const results: Trajectory[] = [];
    for (const log of logs) {
      if (log.feedback) {
        results.push(await this.bridgeExecution(log));
      }
    }
    return results;
  }

  /**
   * Get per-Guardian routing accuracy stats
   */
  getStats(): BridgeStats {
    const guardianStats: Record<string, { total: number; positive: number }> = {};

    for (const event of this.events) {
      const stats = guardianStats[event.guardian] ??= { total: 0, positive: 0 };
      stats.total++;
      if (event.feedback === "positive") stats.positive++;
    }

    const guardianAccuracy: BridgeStats["guardianAccuracy"] = {};
    for (const [guardian, stats] of Object.entries(guardianStats)) {
      guardianAccuracy[guardian] = {
        ...stats,
        rate: stats.total > 0 ? stats.positive / stats.total : 0,
      };
    }

    const total = this.events.length;
    const positive = this.events.filter(e => e.feedback === "positive").length;
    const negative = this.events.filter(e => e.feedback === "negative").length;

    return {
      totalBridged: total,
      positiveRate: total > 0 ? positive / total : 0,
      negativeRate: total > 0 ? negative / total : 0,
      guardianAccuracy,
    };
  }

  /**
   * Get all recorded trajectories
   */
  getTrajectories(): Trajectory[] {
    return [...this.trajectories];
  }

  /**
   * Get all feedback events
   */
  getEvents(): FeedbackEvent[] {
    return [...this.events];
  }

  // --- Private Helpers ---

  /**
   * Simple text-to-embedding using character-level hashing.
   * In production, this would use a real embedding model.
   */
  private textToEmbedding(text: string): Float32Array {
    const embedding = new Float32Array(this.vectorDim);
    const lower = text.toLowerCase();

    for (let i = 0; i < lower.length; i++) {
      const code = lower.charCodeAt(i);
      const idx = (code * 31 + i * 7) % this.vectorDim;
      embedding[idx] += 1.0;
    }

    // L2 normalize
    let norm = 0;
    for (let i = 0; i < this.vectorDim; i++) {
      norm += embedding[i] * embedding[i];
    }
    norm = Math.sqrt(norm);
    if (norm > 0) {
      for (let i = 0; i < this.vectorDim; i++) {
        embedding[i] /= norm;
      }
    }

    return embedding;
  }
}

// --- Singleton ---

let _bridgeInstance: FeedbackBridge | null = null;

export function getFeedbackBridge(): FeedbackBridge {
  if (!_bridgeInstance) {
    _bridgeInstance = new FeedbackBridge();
  }
  return _bridgeInstance;
}
