import { EventEmitter } from 'node:events';
import { randomUUID } from 'node:crypto';
import type {
  FlowId,
  StepId,
  RunId,
  FlowDefinition,
  FlowStep,
  FlowRun,
  FlowStatus,
  StepRecord,
  StepContext,
  FlowSnapshot,
  EngineStats,
  TraceEntry,
} from './types.js';

/**
 * FlowEngine — advanced workflow orchestration with conditional branching,
 * parallel execution, loops, saga compensation, and state persistence.
 */
export class FlowEngine extends EventEmitter {
  private flows = new Map<FlowId, FlowDefinition>();
  private runs = new Map<RunId, FlowRun>();
  private stepMap = new Map<RunId, Map<StepId, FlowStep>>();
  private pausedRuns = new Set<RunId>();
  private completedRunCount = 0;
  private failedRunCount = 0;
  private durations: number[] = [];

  /**
   * Register a flow definition.
   */
  registerFlow(definition: FlowDefinition): void {
    this.flows.set(definition.id, definition);
  }

  /**
   * Get a registered flow definition.
   */
  getFlow(flowId: FlowId): FlowDefinition | undefined {
    return this.flows.get(flowId);
  }

  /**
   * List all registered flows.
   */
  listFlows(): FlowDefinition[] {
    return Array.from(this.flows.values());
  }

  /**
   * Execute a flow. Returns the completed FlowRun.
   */
  async execute(
    flowId: FlowId,
    initialData?: Record<string, unknown>
  ): Promise<FlowRun> {
    const flow = this.flows.get(flowId);
    if (!flow) throw new Error(`Flow not found: ${flowId}`);

    const runId = randomUUID();
    const run: FlowRun = {
      runId,
      flowId,
      status: 'running',
      data: { ...flow.initialData, ...initialData },
      stepRecords: {},
      trace: [],
      startedAt: Date.now(),
    };

    // Build step lookup
    const steps = new Map<StepId, FlowStep>();
    for (const step of flow.steps) {
      steps.set(step.id, step);
    }
    this.stepMap.set(runId, steps);
    this.runs.set(runId, run);
    this.emit('flow:started', run);

    try {
      // Apply global timeout
      if (flow.timeoutMs) {
        const result = await Promise.race([
          this.executeSteps(run, flow.steps, steps),
          this.timeout(flow.timeoutMs, `Flow timeout after ${flow.timeoutMs}ms`),
        ]);
        if (result === 'timeout') throw new Error(`Flow timeout after ${flow.timeoutMs}ms`);
      } else {
        await this.executeSteps(run, flow.steps, steps);
      }

      run.status = 'completed';
      run.completedAt = Date.now();
      this.completedRunCount++;
      this.recordDuration(run);
      this.emit('flow:completed', run);
    } catch (err) {
      run.status = 'failed';
      run.error = (err as Error).message;
      run.completedAt = Date.now();
      this.failedRunCount++;
      this.recordDuration(run);
      this.addTrace(run, undefined, 'error', `Flow failed: ${run.error}`);

      // Saga compensation
      if (flow.enableCompensation) {
        await this.compensate(run, flow.steps, steps);
      }

      this.emit('flow:failed', run);
    }

    this.stepMap.delete(runId);
    return run;
  }

  /**
   * Pause a running flow.
   */
  pause(runId: RunId): boolean {
    const run = this.runs.get(runId);
    if (!run || run.status !== 'running') return false;
    this.pausedRuns.add(runId);
    run.status = 'paused';
    this.emit('flow:paused', run);
    return true;
  }

  /**
   * Resume a paused flow.
   */
  resume(runId: RunId): boolean {
    const run = this.runs.get(runId);
    if (!run || run.status !== 'paused') return false;
    this.pausedRuns.delete(runId);
    run.status = 'running';
    this.emit('flow:resumed', run);
    return true;
  }

  /**
   * Cancel a running or paused flow.
   */
  cancel(runId: RunId): boolean {
    const run = this.runs.get(runId);
    if (!run || (run.status !== 'running' && run.status !== 'paused')) return false;
    this.pausedRuns.delete(runId);
    run.status = 'cancelled';
    run.completedAt = Date.now();
    return true;
  }

  /**
   * Get a flow run by ID.
   */
  getRun(runId: RunId): FlowRun | undefined {
    return this.runs.get(runId);
  }

  /**
   * Take a snapshot of a flow run for persistence.
   */
  snapshot(runId: RunId): FlowSnapshot | undefined {
    const run = this.runs.get(runId);
    if (!run) return undefined;
    const flow = this.flows.get(run.flowId);
    if (!flow) return undefined;
    return {
      run: JSON.parse(JSON.stringify(run)),
      flowDefinition: flow,
      snapshotAt: Date.now(),
    };
  }

  /**
   * Restore a flow from a snapshot (for recovery).
   */
  restore(snapshot: FlowSnapshot): FlowRun {
    this.flows.set(snapshot.flowDefinition.id, snapshot.flowDefinition);
    this.runs.set(snapshot.run.runId, snapshot.run);
    return snapshot.run;
  }

  /**
   * Get engine statistics.
   */
  getStats(): EngineStats {
    const activeRuns = Array.from(this.runs.values()).filter(
      (r) => r.status === 'running' || r.status === 'paused'
    ).length;

    return {
      totalFlows: this.flows.size,
      activeRuns,
      completedRuns: this.completedRunCount,
      failedRuns: this.failedRunCount,
      avgDurationMs:
        this.durations.length > 0
          ? this.durations.reduce((a, b) => a + b, 0) / this.durations.length
          : 0,
    };
  }

  // --- Internal execution ---

  private async executeSteps(
    run: FlowRun,
    steps: FlowStep[],
    stepMap: Map<StepId, FlowStep>
  ): Promise<void> {
    // Collect steps that are only referenced inside branches/parallel/loops
    // These should NOT be executed at top level
    const internalSteps = new Set<StepId>();
    for (const step of steps) {
      if (step.branches) {
        for (const branchStepIds of Object.values(step.branches)) {
          for (const id of branchStepIds) internalSteps.add(id);
        }
      }
      if (step.parallel) {
        for (const id of step.parallel) internalSteps.add(id);
      }
      if (step.loop?.body) {
        for (const id of step.loop.body) internalSteps.add(id);
      }
    }

    // Build dependency graph and find execution order
    const order = this.topologicalSort(steps);

    for (const stepId of order) {
      // Skip internally-owned steps (executed by their parent condition/parallel/loop)
      if (internalSteps.has(stepId)) continue;
      if ((run.status as string) === 'cancelled') break;

      // Wait while paused
      while (this.pausedRuns.has(run.runId)) {
        await this.sleep(100);
        if ((run.status as string) === 'cancelled') return;
      }

      const step = stepMap.get(stepId);
      if (!step) continue;

      // Skip if dependencies not met
      if (step.dependsOn) {
        const allMet = step.dependsOn.every(
          (dep) => run.stepRecords[dep]?.status === 'completed'
        );
        if (!allMet) {
          this.skipStep(run, stepId);
          continue;
        }
      }

      await this.executeStep(run, step, stepMap);
    }
  }

  private async executeStep(
    run: FlowRun,
    step: FlowStep,
    stepMap: Map<StepId, FlowStep>
  ): Promise<void> {
    const record: StepRecord = {
      stepId: step.id,
      status: 'running',
      startedAt: Date.now(),
      attempts: 0,
    };
    run.stepRecords[step.id] = record;
    this.emit('step:started', { runId: run.runId, stepId: step.id });

    const context = this.createContext(run, step.id);

    try {
      switch (step.type) {
        case 'task':
          await this.executeTask(run, step, record, context);
          break;
        case 'condition':
          await this.executeCondition(run, step, record, context, stepMap);
          break;
        case 'parallel':
          await this.executeParallel(run, step, record, stepMap);
          break;
        case 'loop':
          await this.executeLoop(run, step, record, stepMap);
          break;
        case 'subflow':
          await this.executeSubflow(run, step, record, context);
          break;
        case 'wait':
          await this.executeWait(step, record, context);
          break;
      }

      record.status = 'completed';
      record.completedAt = Date.now();
      record.durationMs = record.completedAt - record.startedAt!;
      this.emit('step:completed', { runId: run.runId, stepId: step.id, result: record.result });
    } catch (err) {
      record.status = 'failed';
      record.error = (err as Error).message;
      record.completedAt = Date.now();
      record.durationMs = record.completedAt - record.startedAt!;
      this.addTrace(run, step.id, 'error', `Step failed: ${record.error}`);
      this.emit('step:failed', { runId: run.runId, stepId: step.id, error: record.error });
      throw err;
    }
  }

  private async executeTask(
    run: FlowRun,
    step: FlowStep,
    record: StepRecord,
    context: StepContext
  ): Promise<void> {
    if (!step.execute) {
      this.addTrace(run, step.id, 'warn', 'Task step has no execute function');
      return;
    }

    const maxAttempts = step.retry?.maxAttempts ?? 1;
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      record.attempts = attempt;
      try {
        if (step.timeoutMs) {
          const result = await Promise.race([
            step.execute(context),
            this.timeout(step.timeoutMs, `Step timeout after ${step.timeoutMs}ms`),
          ]);
          if (result === 'timeout') throw new Error(`Step timeout after ${step.timeoutMs}ms`);
          record.result = result;
        } else {
          record.result = await step.execute(context);
        }
        context.results[step.id] = record.result;
        return;
      } catch (err) {
        lastError = err as Error;
        if (attempt < maxAttempts && step.retry) {
          const delay = step.retry.delayMs * Math.pow(step.retry.backoffMultiplier ?? 1, attempt - 1);
          const cappedDelay = step.retry.maxDelayMs ? Math.min(delay, step.retry.maxDelayMs) : delay;
          this.addTrace(run, step.id, 'warn', `Attempt ${attempt} failed, retrying in ${cappedDelay}ms`);
          await this.sleep(cappedDelay);
        }
      }
    }

    throw lastError ?? new Error('Task failed');
  }

  private async executeCondition(
    run: FlowRun,
    step: FlowStep,
    record: StepRecord,
    context: StepContext,
    stepMap: Map<StepId, FlowStep>
  ): Promise<void> {
    if (!step.condition || !step.branches) {
      throw new Error('Condition step requires condition function and branches');
    }

    const branchKey = await step.condition(context);
    record.result = branchKey;
    this.addTrace(run, step.id, 'info', `Condition evaluated to: ${branchKey}`);

    const branchStepIds = step.branches[branchKey] ?? step.branches['default'];
    if (!branchStepIds) {
      this.addTrace(run, step.id, 'warn', `No branch for key: ${branchKey}`);
      return;
    }

    const branchSteps = branchStepIds
      .map((id) => stepMap.get(id))
      .filter((s): s is FlowStep => s !== undefined);

    for (const branchStep of branchSteps) {
      await this.executeStep(run, branchStep, stepMap);
    }
  }

  private async executeParallel(
    run: FlowRun,
    step: FlowStep,
    record: StepRecord,
    stepMap: Map<StepId, FlowStep>
  ): Promise<void> {
    if (!step.parallel || step.parallel.length === 0) return;

    const parallelSteps = step.parallel
      .map((id) => stepMap.get(id))
      .filter((s): s is FlowStep => s !== undefined);

    const results = await Promise.allSettled(
      parallelSteps.map((ps) => this.executeStep(run, ps, stepMap))
    );

    const failures = results.filter((r) => r.status === 'rejected');
    if (failures.length > 0) {
      const firstFail = failures[0] as PromiseRejectedResult;
      throw new Error(`Parallel step failed: ${firstFail.reason}`);
    }

    record.result = parallelSteps.map((ps) => run.stepRecords[ps.id]?.result);
  }

  private async executeLoop(
    run: FlowRun,
    step: FlowStep,
    record: StepRecord,
    stepMap: Map<StepId, FlowStep>
  ): Promise<void> {
    if (!step.loop) throw new Error('Loop step requires loop configuration');

    const items = run.data[step.loop.itemsKey];
    if (!Array.isArray(items)) {
      this.addTrace(run, step.id, 'warn', `Loop items key "${step.loop.itemsKey}" is not an array`);
      return;
    }

    const maxIter = step.loop.maxIterations ?? 1000;
    const iterResults: unknown[] = [];

    for (let i = 0; i < Math.min(items.length, maxIter); i++) {
      // Set loop context
      run.data['__loopItem'] = items[i];
      run.data['__loopIndex'] = i;

      const bodySteps = step.loop.body
        .map((id) => stepMap.get(id))
        .filter((s): s is FlowStep => s !== undefined);

      for (const bodyStep of bodySteps) {
        await this.executeStep(run, bodyStep, stepMap);
      }

      iterResults.push(items[i]);
    }

    // Cleanup
    delete run.data['__loopItem'];
    delete run.data['__loopIndex'];
    record.result = iterResults;
  }

  private async executeSubflow(
    run: FlowRun,
    step: FlowStep,
    record: StepRecord,
    context: StepContext
  ): Promise<void> {
    if (!step.subflowId) throw new Error('Subflow step requires subflowId');

    const subRun = await this.execute(step.subflowId, { ...run.data });
    record.result = subRun.data;
    context.results[step.id] = subRun.data;

    if (subRun.status === 'failed') {
      throw new Error(`Subflow ${step.subflowId} failed: ${subRun.error}`);
    }
  }

  private async executeWait(
    step: FlowStep,
    record: StepRecord,
    context: StepContext
  ): Promise<void> {
    let ms: number;
    if (typeof step.waitMs === 'function') {
      ms = await step.waitMs(context);
    } else {
      ms = step.waitMs ?? 0;
    }
    await this.sleep(ms);
    record.result = { waited: ms };
  }

  // --- Saga compensation ---

  private async compensate(
    run: FlowRun,
    steps: FlowStep[],
    stepMap: Map<StepId, FlowStep>
  ): Promise<void> {
    this.emit('compensation:started', { runId: run.runId });
    this.addTrace(run, undefined, 'info', 'Starting saga compensation');

    // Compensate completed steps in reverse order
    const completedStepIds = Object.entries(run.stepRecords)
      .filter(([, rec]) => rec.status === 'completed')
      .sort(([, a], [, b]) => (b.completedAt ?? 0) - (a.completedAt ?? 0))
      .map(([id]) => id);

    for (const stepId of completedStepIds) {
      const step = stepMap.get(stepId);
      if (!step?.compensate) continue;

      try {
        const context = this.createContext(run, stepId);
        await step.compensate(context);
        this.addTrace(run, stepId, 'info', 'Compensated successfully');
      } catch (err) {
        this.addTrace(run, stepId, 'error', `Compensation failed: ${(err as Error).message}`);
      }
    }

    this.emit('compensation:completed', { runId: run.runId });
  }

  // --- Helpers ---

  private createContext(run: FlowRun, stepId: StepId): StepContext {
    const results: Record<StepId, unknown> = {};
    for (const [id, rec] of Object.entries(run.stepRecords)) {
      if (rec.result !== undefined) results[id] = rec.result;
    }

    return {
      runId: run.runId,
      stepId,
      data: run.data,
      results,
      loopItem: run.data['__loopItem'],
      loopIndex: run.data['__loopIndex'] as number | undefined,
      log: (message: string) => this.addTrace(run, stepId, 'info', message),
    };
  }

  private topologicalSort(steps: FlowStep[]): StepId[] {
    const graph = new Map<StepId, StepId[]>();
    const inDegree = new Map<StepId, number>();

    for (const step of steps) {
      // Only include top-level steps (not ones referenced only inside branches/parallel/loops)
      if (!graph.has(step.id)) graph.set(step.id, []);
      if (!inDegree.has(step.id)) inDegree.set(step.id, 0);

      if (step.dependsOn) {
        for (const dep of step.dependsOn) {
          if (!graph.has(dep)) graph.set(dep, []);
          graph.get(dep)!.push(step.id);
          inDegree.set(step.id, (inDegree.get(step.id) ?? 0) + 1);
        }
      }
    }

    const queue: StepId[] = [];
    for (const [id, degree] of inDegree) {
      if (degree === 0) queue.push(id);
    }

    const sorted: StepId[] = [];
    while (queue.length > 0) {
      const current = queue.shift()!;
      sorted.push(current);
      for (const next of graph.get(current) ?? []) {
        const newDegree = (inDegree.get(next) ?? 1) - 1;
        inDegree.set(next, newDegree);
        if (newDegree === 0) queue.push(next);
      }
    }

    return sorted;
  }

  private skipStep(run: FlowRun, stepId: StepId): void {
    run.stepRecords[stepId] = {
      stepId,
      status: 'skipped',
      attempts: 0,
    };
    this.emit('step:skipped', { runId: run.runId, stepId });
  }

  private addTrace(run: FlowRun, stepId: StepId | undefined, level: TraceEntry['level'], message: string): void {
    run.trace.push({ timestamp: Date.now(), stepId, level, message });
  }

  private recordDuration(run: FlowRun): void {
    if (run.completedAt) {
      this.durations.push(run.completedAt - run.startedAt);
      if (this.durations.length > 1000) this.durations.shift();
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private timeout(ms: number, message: string): Promise<'timeout'> {
    return new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));
  }
}
