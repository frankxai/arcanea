/**
 * @arcanea/hooks — HookManager
 *
 * Central registry and pipeline executor for all Arcanea hooks.
 * Extends EventEmitter to broadcast lifecycle events (registered,
 * executed, failed, pipeline-complete).
 *
 * Absorbs patterns from arcanea-flow's AgenticHookManager but
 * removes external dependencies (Logger, ReasoningBank) and
 * integrates Guardian affinity into every hook registration.
 *
 * Pipeline execution supports three error strategies:
 * - fail-fast: abort on first error
 * - continue: execute all hooks, collect errors
 * - rollback: abort and emit rollback events
 */

import { EventEmitter } from 'node:events';
import { HookMatcher } from './matcher.js';
import { ContextBuilder } from './context.js';
import {
  type HookEvent,
  type HookCategory,
  type HookHandler,
  type HookEntry,
  type HookContext,
  type HookResult,
  type HookRegistrationOptions,
  type PipelineConfig,
  type PipelineResult,
  type PipelineStage,
  type HookRegistryStats,
  type HookManagerEvents,
  HookPriority,
  eventCategory,
} from './types.js';

// ── ID generation ────────────────────────────────────────────────

let hookCounter = 0;
function generateHookId(): string {
  hookCounter++;
  return `hook_${Date.now().toString(36)}_${hookCounter.toString(36)}`;
}

// ── HookManager ──────────────────────────────────────────────────

export class HookManager extends EventEmitter {
  private hooks: Map<HookEvent, HookEntry[]> = new Map();
  private pipelines: Map<string, PipelineConfig> = new Map();
  private matcher: HookMatcher;
  private totalExecutions = 0;
  private totalFailures = 0;
  private totalDurationMs = 0;

  constructor(matcherConfig?: { cacheEnabled?: boolean; cacheTTLMs?: number }) {
    super();
    this.matcher = new HookMatcher({
      cacheEnabled: matcherConfig?.cacheEnabled ?? true,
      cacheTTLMs: matcherConfig?.cacheTTLMs ?? 60_000,
      matchStrategy: 'all',
    });
  }

  // ── Registration ─────────────────────────────────────────────

  /**
   * Register a hook for a specific event.
   * Returns the generated hook ID.
   */
  register<T = unknown>(
    event: HookEvent,
    handler: HookHandler<T>,
    options: HookRegistrationOptions
  ): string {
    const id = generateHookId();
    const category = eventCategory(event);
    const priority = options.priority ?? HookPriority.Normal;

    const entry: HookEntry<T> = {
      id,
      name: options.name,
      event,
      category,
      handler: handler as HookHandler,
      priority,
      enabled: options.enabled ?? true,
      description: options.description,
      pattern: options.pattern,
      guardian: options.guardian,
      registeredAt: new Date().toISOString(),
      metadata: options.metadata,
    };

    if (!this.hooks.has(event)) {
      this.hooks.set(event, []);
    }

    const list = this.hooks.get(event)!;

    // Check for duplicate name on same event
    if (list.some((h) => h.name === options.name)) {
      throw new Error(`Hook '${options.name}' already registered for event '${event}'`);
    }

    // Insert sorted by priority descending (higher priority first)
    const typedEntry = entry as HookEntry<unknown>;
    const insertIdx = list.findIndex((h) => h.priority < priority);
    if (insertIdx === -1) {
      list.push(typedEntry);
    } else {
      list.splice(insertIdx, 0, typedEntry);
    }

    const eventPayload: HookManagerEvents['hook:registered'] = {
      id,
      event,
      name: options.name,
    };
    this.emit('hook:registered', eventPayload);

    return id;
  }

  /**
   * Unregister a hook by ID.
   */
  unregister(id: string): boolean {
    for (const [event, list] of this.hooks) {
      const idx = list.findIndex((h) => h.id === id);
      if (idx !== -1) {
        list.splice(idx, 1);
        if (list.length === 0) {
          this.hooks.delete(event);
        }
        const eventPayload: HookManagerEvents['hook:unregistered'] = { id, event };
        this.emit('hook:unregistered', eventPayload);
        return true;
      }
    }
    return false;
  }

  /**
   * Enable or disable a hook by ID.
   */
  setEnabled(id: string, enabled: boolean): boolean {
    for (const list of this.hooks.values()) {
      const hook = list.find((h) => h.id === id);
      if (hook) {
        hook.enabled = enabled;
        return true;
      }
    }
    return false;
  }

  /**
   * Get all hooks for an event, optionally filtered to enabled-only.
   */
  getHooks(event: HookEvent, enabledOnly = true): HookEntry[] {
    const list = this.hooks.get(event) ?? [];
    return enabledOnly ? list.filter((h) => h.enabled) : [...list];
  }

  /**
   * Get all hooks across all events.
   */
  getAllHooks(enabledOnly = false): HookEntry[] {
    const all: HookEntry[] = [];
    for (const list of this.hooks.values()) {
      for (const h of list) {
        if (!enabledOnly || h.enabled) {
          all.push(h);
        }
      }
    }
    return all;
  }

  /**
   * Get hooks by category.
   */
  getHooksByCategory(category: HookCategory, enabledOnly = true): HookEntry[] {
    return this.getAllHooks(enabledOnly).filter((h) => h.category === category);
  }

  /**
   * Find a hook by ID.
   */
  findHook(id: string): HookEntry | undefined {
    for (const list of this.hooks.values()) {
      const hook = list.find((h) => h.id === id);
      if (hook) return hook;
    }
    return undefined;
  }

  // ── Execution ────────────────────────────────────────────────

  /**
   * Execute all hooks for a given event, in priority order.
   * If a hook has a pattern, it is matched against the value param.
   */
  async execute<T = unknown>(
    context: HookContext<T>,
    matchValue?: string
  ): Promise<HookResult[]> {
    const hooks = this.getHooks(context.event, true);
    const results: HookResult[] = [];

    for (const hook of hooks) {
      // Pattern filtering
      if (hook.pattern && matchValue !== undefined) {
        const matchResult = this.matcher.matchPatterns(matchValue, [
          { type: hook.pattern.includes('*') ? 'glob' : 'exact', pattern: hook.pattern },
        ]);
        if (!matchResult.matched) continue;
      }

      const start = Date.now();
      try {
        const result = await hook.handler(context as HookContext);
        const duration = Date.now() - start;
        result.duration = duration;
        results.push(result);
        this.totalExecutions++;
        this.totalDurationMs += duration;

        this.emit('hook:executed', {
          id: hook.id,
          event: hook.event,
          result,
          duration,
        } satisfies HookManagerEvents['hook:executed']);

        // Merge result data into context metadata for subsequent hooks
        if (result.data) {
          Object.assign(context.metadata, result.data);
        }

        // Abort chain if requested
        if (result.abort) break;
      } catch (err) {
        const duration = Date.now() - start;
        const errorMsg = err instanceof Error ? err.message : String(err);
        this.totalFailures++;
        this.totalExecutions++;
        this.totalDurationMs += duration;

        const failResult: HookResult = {
          success: false,
          error: errorMsg,
          duration,
        };
        results.push(failResult);

        this.emit('hook:failed', {
          id: hook.id,
          event: hook.event,
          error: errorMsg,
          duration,
        } satisfies HookManagerEvents['hook:failed']);
      }
    }

    return results;
  }

  // ── Pipeline ─────────────────────────────────────────────────

  /**
   * Register a pipeline configuration.
   */
  registerPipeline(config: PipelineConfig): void {
    this.pipelines.set(config.id, config);
  }

  /**
   * Get a registered pipeline.
   */
  getPipeline(id: string): PipelineConfig | undefined {
    return this.pipelines.get(id);
  }

  /**
   * Execute a registered pipeline.
   */
  async executePipeline<T = unknown>(
    pipelineId: string,
    context: HookContext<T>,
    matchValue?: string
  ): Promise<PipelineResult> {
    const pipeline = this.pipelines.get(pipelineId);
    if (!pipeline) {
      throw new Error(`Pipeline '${pipelineId}' not found`);
    }

    const pipelineStart = Date.now();
    const allResults: PipelineResult['results'] = [];
    const allWarnings: string[] = [];
    const allMessages: string[] = [];
    let totalExecuted = 0;
    let totalFailed = 0;
    let aborted = false;
    let rolledBack = false;

    this.emit('pipeline:start', {
      pipelineId,
      stages: pipeline.stages.length,
    } satisfies HookManagerEvents['pipeline:start']);

    try {
      for (const stage of pipeline.stages) {
        if (aborted) break;

        // Check stage condition
        if (stage.condition && !stage.condition(context as HookContext)) {
          continue;
        }

        const stageResults = await this.executeStage(
          stage,
          context,
          matchValue,
          pipeline.errorStrategy
        );

        for (const sr of stageResults) {
          allResults.push({ ...sr, stage: stage.name });
          totalExecuted++;
          if (!sr.success) totalFailed++;
        }

        // Check for abort in fail-fast / rollback
        if (
          (pipeline.errorStrategy === 'fail-fast' || pipeline.errorStrategy === 'rollback') &&
          stageResults.some((r) => !r.success)
        ) {
          aborted = true;
          if (pipeline.errorStrategy === 'rollback') {
            rolledBack = true;
          }
        }
      }
    } catch (err) {
      aborted = true;
      if (pipeline.errorStrategy === 'rollback') {
        rolledBack = true;
      }
    }

    const result: PipelineResult = {
      pipelineId,
      success: totalFailed === 0,
      aborted,
      hooksExecuted: totalExecuted,
      hooksFailed: totalFailed,
      durationMs: Date.now() - pipelineStart,
      results: allResults,
      warnings: allWarnings,
      messages: allMessages,
      rolledBack,
    };

    this.emit('pipeline:complete', result);

    return result;
  }

  // ── Statistics ───────────────────────────────────────────────

  getStats(): HookRegistryStats {
    const all = this.getAllHooks(false);
    const enabled = all.filter((h) => h.enabled);
    const byCategory: Record<HookCategory, number> = {
      llm: 0, memory: 0, neural: 0, performance: 0, workflow: 0,
    };
    const byEvent: Record<string, number> = {};

    for (const h of all) {
      byCategory[h.category] = (byCategory[h.category] || 0) + 1;
      byEvent[h.event] = (byEvent[h.event] || 0) + 1;
    }

    return {
      totalHooks: all.length,
      enabledHooks: enabled.length,
      disabledHooks: all.length - enabled.length,
      hooksByCategory: byCategory,
      hooksByEvent: byEvent,
      totalExecutions: this.totalExecutions,
      totalFailures: this.totalFailures,
      avgExecutionTimeMs:
        this.totalExecutions > 0 ? this.totalDurationMs / this.totalExecutions : 0,
      pipelinesRegistered: this.pipelines.size,
    };
  }

  /**
   * Get the underlying matcher's cache stats.
   */
  getMatcherCacheStats() {
    return this.matcher.getCacheStats();
  }

  /**
   * Clear all hooks, pipelines, and matcher cache.
   */
  reset(): void {
    this.hooks.clear();
    this.pipelines.clear();
    this.matcher.clearCache();
    this.totalExecutions = 0;
    this.totalFailures = 0;
    this.totalDurationMs = 0;
    this.removeAllListeners();
  }

  // ── Private ──────────────────────────────────────────────────

  private async executeStage<T>(
    stage: PipelineStage,
    context: HookContext<T>,
    matchValue: string | undefined,
    errorStrategy: string
  ): Promise<Array<{ hookId: string; hookName: string; success: boolean; duration: number; error?: string }>> {
    const hooks: HookEntry[] = [];
    for (const hookId of stage.hookIds) {
      const hook = this.findHook(hookId);
      if (hook && hook.enabled) {
        hooks.push(hook);
      }
    }

    if (stage.parallel) {
      const promises = hooks.map((hook) => this.executeSingleHook(hook, context, matchValue));
      return Promise.all(promises);
    }

    // Sequential execution
    const results: Array<{ hookId: string; hookName: string; success: boolean; duration: number; error?: string }> = [];
    for (const hook of hooks) {
      const result = await this.executeSingleHook(hook, context, matchValue);
      results.push(result);

      if (!result.success && errorStrategy === 'fail-fast') {
        break;
      }
    }
    return results;
  }

  private async executeSingleHook<T>(
    hook: HookEntry,
    context: HookContext<T>,
    matchValue?: string
  ): Promise<{ hookId: string; hookName: string; success: boolean; duration: number; error?: string }> {
    // Pattern filtering
    if (hook.pattern && matchValue !== undefined) {
      const matchResult = this.matcher.matchPatterns(matchValue, [
        { type: hook.pattern.includes('*') ? 'glob' : 'exact', pattern: hook.pattern },
      ]);
      if (!matchResult.matched) {
        return { hookId: hook.id, hookName: hook.name, success: true, duration: 0 };
      }
    }

    const start = Date.now();
    try {
      const result = await hook.handler(context as HookContext);
      const duration = Date.now() - start;
      this.totalExecutions++;
      this.totalDurationMs += duration;

      this.emit('hook:executed', {
        id: hook.id,
        event: hook.event,
        result,
        duration,
      });

      // Merge data into context
      if (result.data) {
        Object.assign(context.metadata, result.data);
      }

      return {
        hookId: hook.id,
        hookName: hook.name,
        success: result.success,
        duration,
        error: result.error,
      };
    } catch (err) {
      const duration = Date.now() - start;
      const errorMsg = err instanceof Error ? err.message : String(err);
      this.totalFailures++;
      this.totalExecutions++;
      this.totalDurationMs += duration;

      this.emit('hook:failed', {
        id: hook.id,
        event: hook.event,
        error: errorMsg,
        duration,
      });

      return {
        hookId: hook.id,
        hookName: hook.name,
        success: false,
        duration,
        error: errorMsg,
      };
    }
  }
}
