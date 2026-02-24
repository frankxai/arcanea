/**
 * @arcanea/sona-learner — Trajectory Recorder
 *
 * Manages the lifecycle of trajectories: begin, step, context, end.
 * Computes metrics on completion and supports filtered listing.
 */

import type {
  Trajectory,
  TrajectoryStep,
  TrajectoryMetrics,
  TrajectoryListFilters,
  Verdict,
} from './types.js';

/**
 * Generate a unique ID with a prefix.
 * Format: prefix_timestamp36_random6
 */
export function generateId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * TrajectoryRecorder — Records agent decision trajectories
 * for subsequent learning by the SONA pipeline.
 */
export class TrajectoryRecorder {
  private trajectories: Map<string, Trajectory> = new Map();

  /**
   * Begin a new trajectory.
   * @returns The trajectory ID.
   */
  begin(sessionId?: string, guardianId?: string, context?: Record<string, unknown>): string {
    const id = generateId('traj');
    const resolvedSessionId = sessionId || generateId('session');

    const trajectory: Trajectory = {
      id,
      sessionId: resolvedSessionId,
      guardianId,
      startedAt: new Date(),
      steps: [],
      context: context || {},
    };

    this.trajectories.set(id, trajectory);
    return id;
  }

  /**
   * Record a step within an active trajectory.
   * @returns The step ID.
   */
  step(
    trajectoryId: string,
    action: string,
    observation?: string,
    reward?: number,
    metadata?: Record<string, unknown>,
    guardianId?: string,
  ): string {
    const trajectory = this.trajectories.get(trajectoryId);
    if (!trajectory) {
      throw new Error(`Trajectory ${trajectoryId} not found`);
    }
    if (trajectory.endedAt) {
      throw new Error(`Trajectory ${trajectoryId} has already ended`);
    }

    const stepId = generateId('step');
    const step: TrajectoryStep = {
      id: stepId,
      action,
      observation,
      reward,
      timestamp: new Date(),
      metadata,
      guardianId,
    };

    trajectory.steps.push(step);
    return stepId;
  }

  /**
   * Add or merge context into an active trajectory.
   */
  addContext(trajectoryId: string, context: Record<string, unknown>): void {
    const trajectory = this.trajectories.get(trajectoryId);
    if (!trajectory) {
      throw new Error(`Trajectory ${trajectoryId} not found`);
    }

    trajectory.context = { ...trajectory.context, ...context };
  }

  /**
   * End a trajectory, compute metrics, and return them.
   */
  end(trajectoryId: string, verdict: Verdict, triggerLearning: boolean = true): TrajectoryMetrics {
    const trajectory = this.trajectories.get(trajectoryId);
    if (!trajectory) {
      throw new Error(`Trajectory ${trajectoryId} not found`);
    }
    if (trajectory.endedAt) {
      throw new Error(`Trajectory ${trajectoryId} has already ended`);
    }

    trajectory.endedAt = new Date();
    trajectory.verdict = verdict;

    const duration = trajectory.endedAt.getTime() - trajectory.startedAt.getTime();
    const stepsWithRewards = trajectory.steps.filter(s => s.reward !== undefined);
    const positiveRewards = stepsWithRewards.filter(s => (s.reward ?? 0) > 0).length;

    const metrics: TrajectoryMetrics = {
      totalSteps: trajectory.steps.length,
      duration,
      avgStepDuration: trajectory.steps.length > 0 ? duration / trajectory.steps.length : 0,
      learningTriggered: triggerLearning,
      successRate: stepsWithRewards.length > 0
        ? positiveRewards / stepsWithRewards.length
        : undefined,
    };

    trajectory.metrics = metrics;
    return metrics;
  }

  /**
   * Get a trajectory by ID.
   */
  get(trajectoryId: string): Trajectory | undefined {
    return this.trajectories.get(trajectoryId);
  }

  /**
   * List trajectories with optional filters.
   */
  list(filters?: TrajectoryListFilters): Trajectory[] {
    let results = Array.from(this.trajectories.values());

    if (filters?.sessionId) {
      results = results.filter(t => t.sessionId === filters.sessionId);
    }
    if (filters?.guardianId) {
      results = results.filter(t => t.guardianId === filters.guardianId);
    }
    if (filters?.verdict) {
      results = results.filter(t => t.verdict === filters.verdict);
    }

    const limit = filters?.limit ?? 100;
    return results.slice(0, limit);
  }

  /**
   * Get aggregate statistics across all trajectories.
   */
  getStats(): {
    total: number;
    active: number;
    completed: number;
    successful: number;
    failed: number;
    partial: number;
    avgDuration: number;
  } {
    const all = Array.from(this.trajectories.values());
    const completed = all.filter(t => t.endedAt !== undefined);
    const successful = completed.filter(t => t.verdict === 'success');
    const failed = completed.filter(t => t.verdict === 'failure');
    const partial = completed.filter(t => t.verdict === 'partial');

    const totalDuration = completed.reduce((sum, t) => {
      return sum + (t.metrics?.duration ?? 0);
    }, 0);

    return {
      total: all.length,
      active: all.length - completed.length,
      completed: completed.length,
      successful: successful.length,
      failed: failed.length,
      partial: partial.length,
      avgDuration: completed.length > 0 ? totalDuration / completed.length : 0,
    };
  }

  /**
   * Clear all trajectories.
   */
  clear(): void {
    this.trajectories.clear();
  }
}
