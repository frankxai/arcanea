/**
 * @arcanea/hooks — LLM Hooks
 *
 * Lifecycle hooks for LLM operations: pre-call, post-call, error,
 * retry, cache-hit, cache-miss, and stream-chunk.
 *
 * Guardian affinity: Lyria (Sight, intuition — model selection)
 *                    Aiyami (Crown, enlightenment — response quality)
 *
 * These are factory functions that create HookHandler functions
 * ready for registration with HookManager.
 */

import type {
  HookHandler,
  HookResult,
  HookContext,
  LLMCallPayload,
} from '../types.js';

// ── Pre-call hook ────────────────────────────────────────────────

/**
 * Creates a pre-LLM-call hook that validates and optionally transforms
 * the request before it reaches the provider.
 */
export function createPreCallHook(
  validator?: (payload: LLMCallPayload) => { valid: boolean; reason?: string }
): HookHandler<LLMCallPayload> {
  return (context: HookContext<LLMCallPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing LLM payload', abort: true };
    }

    if (!payload.provider || !payload.model) {
      return { success: false, error: 'LLM payload requires provider and model', abort: true };
    }

    if (validator) {
      const validation = validator(payload);
      if (!validation.valid) {
        return { success: false, error: validation.reason ?? 'Validation failed', abort: true };
      }
    }

    return {
      success: true,
      data: { llmPreCallTimestamp: Date.now() },
      message: `LLM pre-call: ${payload.provider}/${payload.model}`,
    };
  };
}

// ── Post-call hook ───────────────────────────────────────────────

/**
 * Creates a post-LLM-call hook that processes the response,
 * records metrics, and optionally transforms output.
 */
export function createPostCallHook(
  onResponse?: (payload: LLMCallPayload) => void
): HookHandler<LLMCallPayload> {
  return (context: HookContext<LLMCallPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing LLM payload' };
    }

    const preCallTs = context.metadata['llmPreCallTimestamp'] as number | undefined;
    const latency = preCallTs ? Date.now() - preCallTs : undefined;

    if (onResponse) {
      onResponse(payload);
    }

    return {
      success: true,
      data: {
        llmLatencyMs: latency,
        llmTokens: payload.response?.usage?.totalTokens,
        llmCost: payload.response?.cost?.totalCost,
      },
      message: `LLM post-call: ${payload.provider}/${payload.model} (${latency ?? '?'}ms)`,
    };
  };
}

// ── Error hook ───────────────────────────────────────────────────

/**
 * Creates an error hook that handles LLM failures with optional
 * categorization and alerting.
 */
export function createErrorHook(
  onError?: (error: { name: string; message: string }, provider: string) => void
): HookHandler<LLMCallPayload> {
  return (context: HookContext<LLMCallPayload>): HookResult => {
    const payload = context.data;
    if (!payload?.error) {
      return { success: true, message: 'No error present' };
    }

    if (onError) {
      onError(payload.error, payload.provider);
    }

    const retryable = payload.error.retryable ?? false;
    return {
      success: true,
      data: {
        llmErrorType: payload.error.name,
        llmErrorRetryable: retryable,
      },
      warnings: [`LLM error (${payload.provider}): ${payload.error.message}`],
      message: `LLM error recorded: ${payload.error.name}${retryable ? ' (retryable)' : ''}`,
    };
  };
}

// ── Retry hook ───────────────────────────────────────────────────

/**
 * Creates a retry hook that tracks retry attempts and applies
 * exponential backoff metadata.
 */
export function createRetryHook(maxRetries = 3): HookHandler<LLMCallPayload> {
  return (context: HookContext<LLMCallPayload>): HookResult => {
    const retryCount = (context.metadata['llmRetryCount'] as number) ?? 0;
    const nextRetry = retryCount + 1;

    if (nextRetry > maxRetries) {
      return {
        success: false,
        abort: true,
        error: `Max retries (${maxRetries}) exceeded`,
        data: { llmRetryCount: nextRetry, llmRetryExhausted: true },
      };
    }

    const backoffMs = Math.pow(2, retryCount) * 1000;

    return {
      success: true,
      data: {
        llmRetryCount: nextRetry,
        llmRetryBackoffMs: backoffMs,
        llmRetryExhausted: false,
      },
      message: `LLM retry ${nextRetry}/${maxRetries} (backoff: ${backoffMs}ms)`,
    };
  };
}

// ── Cache hit hook ───────────────────────────────────────────────

/**
 * Creates a cache-hit hook that records cache hits and skips
 * the actual LLM call.
 */
export function createCacheHitHook(): HookHandler<LLMCallPayload> {
  return (context: HookContext<LLMCallPayload>): HookResult => {
    return {
      success: true,
      data: { llmCacheHit: true, llmCacheTimestamp: Date.now() },
      message: `LLM cache hit for ${context.data?.provider}/${context.data?.model}`,
    };
  };
}

// ── Cache miss hook ──────────────────────────────────────────────

/**
 * Creates a cache-miss hook for tracking misses.
 */
export function createCacheMissHook(): HookHandler<LLMCallPayload> {
  return (context: HookContext<LLMCallPayload>): HookResult => {
    return {
      success: true,
      data: { llmCacheHit: false },
      message: `LLM cache miss for ${context.data?.provider}/${context.data?.model}`,
    };
  };
}

// ── Stream chunk hook ────────────────────────────────────────────

/**
 * Creates a stream-chunk hook for tracking streaming responses.
 */
export function createStreamChunkHook(
  onChunk?: (chunkIndex: number, provider: string) => void
): HookHandler<LLMCallPayload> {
  return (context: HookContext<LLMCallPayload>): HookResult => {
    const chunkIndex = ((context.metadata['llmStreamChunkIndex'] as number) ?? -1) + 1;

    if (onChunk && context.data) {
      onChunk(chunkIndex, context.data.provider);
    }

    return {
      success: true,
      data: { llmStreamChunkIndex: chunkIndex },
    };
  };
}

// ── Export all factories ─────────────────────────────────────────

export const llmHooks = {
  createPreCallHook,
  createPostCallHook,
  createErrorHook,
  createRetryHook,
  createCacheHitHook,
  createCacheMissHook,
  createStreamChunkHook,
} as const;
