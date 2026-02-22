/**
 * @arcanea/hooks — Context Builder
 *
 * Fluent API for constructing HookContext objects. Provides a chainable
 * builder so callers don't need to remember every field.
 *
 * Usage:
 *   const ctx = ContextBuilder.create('llm:pre-call')
 *     .session('sess-123')
 *     .guardian('lyria')
 *     .withData({ provider: 'anthropic', model: 'claude-opus-4-6' })
 *     .meta('source', 'api-gateway')
 *     .build();
 */

import type {
  HookContext,
  HookEvent,
  GuardianName,
  Element,
} from './types.js';

let executionCounter = 0;

function generateExecutionId(): string {
  executionCounter++;
  return `exec_${Date.now()}_${executionCounter.toString(36)}`;
}

export class ContextBuilder<T = unknown> {
  private ctx: Partial<HookContext<T>>;

  private constructor(event: HookEvent) {
    this.ctx = {
      executionId: generateExecutionId(),
      event,
      timestamp: new Date().toISOString(),
      metadata: {},
    };
  }

  /**
   * Create a new ContextBuilder for the given event.
   */
  static create<T = unknown>(event: HookEvent): ContextBuilder<T> {
    return new ContextBuilder<T>(event);
  }

  /**
   * Set the execution ID explicitly (otherwise auto-generated).
   */
  id(executionId: string): this {
    this.ctx.executionId = executionId;
    return this;
  }

  /**
   * Set the session ID.
   */
  session(sessionId: string): this {
    this.ctx.sessionId = sessionId;
    return this;
  }

  /**
   * Set the active Guardian.
   */
  guardian(name: GuardianName): this {
    this.ctx.guardian = name;
    return this;
  }

  /**
   * Set the element affinity.
   */
  element(el: Element): this {
    this.ctx.element = el;
    return this;
  }

  /**
   * Set the typed data payload.
   */
  withData(data: T): this {
    this.ctx.data = data;
    return this;
  }

  /**
   * Add a single metadata key-value pair.
   */
  meta(key: string, value: unknown): this {
    if (!this.ctx.metadata) this.ctx.metadata = {};
    this.ctx.metadata[key] = value;
    return this;
  }

  /**
   * Merge multiple metadata entries.
   */
  mergeMetadata(entries: Record<string, unknown>): this {
    if (!this.ctx.metadata) this.ctx.metadata = {};
    Object.assign(this.ctx.metadata, entries);
    return this;
  }

  /**
   * Set the parent execution ID (for pipeline sub-contexts).
   */
  parent(parentId: string): this {
    this.ctx.parentId = parentId;
    return this;
  }

  /**
   * Set the elapsed time in ms.
   */
  elapsedMs(ms: number): this {
    this.ctx.elapsed = ms;
    return this;
  }

  /**
   * Override the timestamp.
   */
  at(isoTimestamp: string): this {
    this.ctx.timestamp = isoTimestamp;
    return this;
  }

  /**
   * Build the final HookContext. All required fields are filled.
   */
  build(): HookContext<T> {
    return {
      executionId: this.ctx.executionId!,
      event: this.ctx.event!,
      timestamp: this.ctx.timestamp!,
      sessionId: this.ctx.sessionId,
      guardian: this.ctx.guardian,
      element: this.ctx.element,
      data: this.ctx.data,
      metadata: this.ctx.metadata ?? {},
      parentId: this.ctx.parentId,
      elapsed: this.ctx.elapsed,
    };
  }
}
