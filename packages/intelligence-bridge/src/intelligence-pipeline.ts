// ─────────────────────────────────────────────────────────────
// @arcanea/intelligence-bridge — IntelligencePipeline
// Main orchestrator: composes EventBus, RoutingEngine, and
// FeedbackRecorder into a unified RL feedback loop
// ─────────────────────────────────────────────────────────────

import { EventEmitter } from 'node:events';
import { EventBus, generateEventId } from './event-bus.js';
import { RoutingEngine } from './routing-engine.js';
import { FeedbackRecorder } from './feedback-recorder.js';
import type {
  IntelligenceEvent,
  RoutingDecision,
  FeedbackRecord,
  PipelineConfig,
  PipelineStats,
  GuardianRoutingProfile,
} from './types.js';
import { DEFAULT_PIPELINE_CONFIG } from './types.js';

interface ActiveTask {
  taskId: string;
  task: string;
  guardianId?: string;
  routingDecision?: RoutingDecision;
  startTime: number;
  trajectoryId?: string;
}

/**
 * The intelligence pipeline — singleton orchestrator that wires
 * EventBus, RoutingEngine, and FeedbackRecorder together.
 */
export class IntelligencePipeline extends EventEmitter {
  private static instance: IntelligencePipeline | null = null;

  readonly eventBus: EventBus;
  readonly routingEngine: RoutingEngine;
  readonly feedbackRecorder: FeedbackRecorder;

  private config: PipelineConfig;
  private activeTasks: Map<string, ActiveTask> = new Map();
  private trajectoryCount = 0;
  private patternCount = 0;
  private tokensTracked = 0;
  private startTime: number;

  private constructor(config?: Partial<PipelineConfig>) {
    super();
    this.setMaxListeners(100);
    this.config = { ...DEFAULT_PIPELINE_CONFIG, ...config };
    this.eventBus = new EventBus();
    this.routingEngine = new RoutingEngine();
    this.feedbackRecorder = new FeedbackRecorder();
    this.startTime = Date.now();
  }

  /**
   * Get or create the singleton instance.
   */
  static getInstance(config?: Partial<PipelineConfig>): IntelligencePipeline {
    if (!IntelligencePipeline.instance) {
      IntelligencePipeline.instance = new IntelligencePipeline(config);
    }
    return IntelligencePipeline.instance;
  }

  /**
   * Reset the singleton (useful for testing).
   */
  static resetInstance(): void {
    IntelligencePipeline.instance = null;
  }

  /**
   * Called when a task starts. Optionally routes to a Guardian.
   * Returns a taskId for later reference.
   */
  onTaskStart(task: string, guardianId?: string): string {
    const taskId = generateEventId();
    const trajectoryId = this.config.enableTrajectoryRecording
      ? `traj_${Date.now()}_${++this.trajectoryCount}`
      : undefined;

    const activeTask: ActiveTask = {
      taskId,
      task,
      guardianId,
      startTime: Date.now(),
      trajectoryId,
    };

    // If no guardianId provided, route automatically
    if (!guardianId) {
      const decision = this.routingEngine.route(task);
      activeTask.guardianId = decision.guardianId;
      activeTask.routingDecision = decision;
    }

    this.activeTasks.set(taskId, activeTask);

    // Emit task-start event
    const event: IntelligenceEvent = {
      id: taskId,
      type: 'task-start',
      guardianId: activeTask.guardianId,
      timestamp: Date.now(),
      payload: { task, trajectoryId },
      sessionId: undefined,
    };

    this.eventBus.emitEvent(event);
    this.emit('task-start', event);

    if (this.config.enableTrajectoryRecording && trajectoryId) {
      this.trajectoryCount; // already incremented
    }

    return taskId;
  }

  /**
   * Called when a task completes successfully.
   */
  onTaskComplete(taskId: string, result: unknown, tokensCost?: number): void {
    const activeTask = this.activeTasks.get(taskId);
    const guardianId = activeTask?.guardianId ?? 'unknown';
    const trajectoryId = activeTask?.trajectoryId;
    const cost = tokensCost ?? 0;

    if (this.config.enableCostTracking) {
      this.tokensTracked += cost;
    }

    // Emit task-complete event
    const event: IntelligenceEvent = {
      id: generateEventId(),
      type: 'task-complete',
      guardianId,
      timestamp: Date.now(),
      payload: { taskId, result, tokensCost: cost, trajectoryId },
    };

    this.eventBus.emitEvent(event);
    this.emit('task-complete', event);

    // Record positive feedback
    const feedback: FeedbackRecord = {
      eventId: event.id,
      trajectoryId,
      guardianId,
      action: activeTask?.task ?? 'unknown',
      outcome: 'success',
      reward: 1.0,
      tokensCost: cost,
      timestamp: Date.now(),
    };

    this.feedbackRecorder.record(feedback);

    // Record outcome in routing engine
    if (activeTask?.routingDecision) {
      this.routingEngine.recordOutcome(activeTask.routingDecision, 'success', 1.0);
    }

    if (this.config.enablePatternLearning) {
      this.patternCount += 1;
    }

    this.activeTasks.delete(taskId);
  }

  /**
   * Called when a task fails.
   */
  onTaskFail(taskId: string, error: unknown, tokensCost?: number): void {
    const activeTask = this.activeTasks.get(taskId);
    const guardianId = activeTask?.guardianId ?? 'unknown';
    const trajectoryId = activeTask?.trajectoryId;
    const cost = tokensCost ?? 0;

    if (this.config.enableCostTracking) {
      this.tokensTracked += cost;
    }

    // Emit task-fail event
    const event: IntelligenceEvent = {
      id: generateEventId(),
      type: 'task-fail',
      guardianId,
      timestamp: Date.now(),
      payload: {
        taskId,
        error: error instanceof Error ? error.message : String(error),
        tokensCost: cost,
        trajectoryId,
      },
    };

    this.eventBus.emitEvent(event);
    this.emit('task-fail', event);

    // Record negative feedback
    const feedback: FeedbackRecord = {
      eventId: event.id,
      trajectoryId,
      guardianId,
      action: activeTask?.task ?? 'unknown',
      outcome: 'failure',
      reward: -1.0,
      tokensCost: cost,
      timestamp: Date.now(),
    };

    this.feedbackRecorder.record(feedback);

    // Record outcome in routing engine
    if (activeTask?.routingDecision) {
      this.routingEngine.recordOutcome(activeTask.routingDecision, 'failure', -1.0);
    }

    this.activeTasks.delete(taskId);
  }

  /**
   * Route a task to the best Guardian (without starting a task lifecycle).
   */
  routeTask(task: string, context?: Record<string, unknown>): RoutingDecision {
    const decision = this.routingEngine.route(task, context);

    // Emit guardian-route event
    const event: IntelligenceEvent = {
      id: generateEventId(),
      type: 'guardian-route',
      guardianId: decision.guardianId,
      timestamp: Date.now(),
      payload: { task, decision },
    };

    this.eventBus.emitEvent(event);
    this.emit('guardian-route', event);

    return decision;
  }

  /**
   * Record arbitrary feedback.
   */
  recordFeedback(feedback: FeedbackRecord): void {
    this.feedbackRecorder.record(feedback);
  }

  /**
   * Get pipeline statistics.
   */
  getStats(): PipelineStats {
    const routingStats = this.routingEngine.getStats();
    const feedbackStats = this.feedbackRecorder.getStats();

    return {
      eventsProcessed: this.eventBus.size,
      trajectoriesRecorded: this.trajectoryCount,
      patternsLearned: this.patternCount,
      tokensTracked: this.tokensTracked,
      routingDecisions: routingStats.totalRoutes,
      avgRoutingLatency: routingStats.avgLatency,
      avgRoutingConfidence: routingStats.avgConfidence,
      feedbackRecords: feedbackStats.totalRecords,
      uptime: Date.now() - this.startTime,
    };
  }

  /**
   * Get combined insight for a specific Guardian.
   */
  getGuardianInsight(guardianId: string): {
    profile: GuardianRoutingProfile | undefined;
    feedbackCount: number;
    successRate: number;
    avgReward: number;
    recentFeedback: FeedbackRecord[];
  } {
    const profile = this.routingEngine.getGuardianProfile(guardianId);
    const feedback = this.feedbackRecorder.getByGuardian(guardianId);

    return {
      profile,
      feedbackCount: feedback.length,
      successRate: this.feedbackRecorder.getSuccessRate(guardianId),
      avgReward: this.feedbackRecorder.getAvgReward(guardianId),
      recentFeedback: this.feedbackRecorder.getByGuardian(guardianId, 5),
    };
  }

  /**
   * Generate a formatted markdown report.
   */
  generateReport(): string {
    const stats = this.getStats();
    const profiles = this.routingEngine.getAllProfiles();
    const feedbackStats = this.feedbackRecorder.getStats();

    const lines: string[] = [
      '# Arcanea Intelligence Bridge Report',
      '',
      `**Generated**: ${new Date().toISOString()}`,
      `**Uptime**: ${Math.round(stats.uptime / 1000)}s`,
      '',
      '## Pipeline Statistics',
      '',
      `| Metric | Value |`,
      `|--------|-------|`,
      `| Events Processed | ${stats.eventsProcessed} |`,
      `| Trajectories Recorded | ${stats.trajectoriesRecorded} |`,
      `| Patterns Learned | ${stats.patternsLearned} |`,
      `| Tokens Tracked | ${stats.tokensTracked} |`,
      `| Routing Decisions | ${stats.routingDecisions} |`,
      `| Avg Routing Latency | ${stats.avgRoutingLatency.toFixed(2)}ms |`,
      `| Avg Routing Confidence | ${(stats.avgRoutingConfidence * 100).toFixed(1)}% |`,
      `| Feedback Records | ${stats.feedbackRecords} |`,
      '',
      '## Feedback Summary',
      '',
      `| Outcome | Count |`,
      `|---------|-------|`,
      `| Success | ${feedbackStats.byOutcome.success ?? 0} |`,
      `| Failure | ${feedbackStats.byOutcome.failure ?? 0} |`,
      `| Partial | ${feedbackStats.byOutcome.partial ?? 0} |`,
      '',
      '## Guardian Profiles',
      '',
      '| Guardian | Gate | Frequency | Tasks | Success Rate |',
      '|----------|------|-----------|-------|-------------|',
    ];

    for (const p of profiles) {
      lines.push(
        `| ${p.guardianName} | ${p.gate} | ${p.frequency} Hz | ${p.totalTasks} | ${(p.successRate * 100).toFixed(0)}% |`,
      );
    }

    lines.push('');
    lines.push('---');
    lines.push('*Generated by @arcanea/intelligence-bridge*');

    return lines.join('\n');
  }

  /**
   * Get the current pipeline config.
   */
  getConfig(): PipelineConfig {
    return { ...this.config };
  }
}
