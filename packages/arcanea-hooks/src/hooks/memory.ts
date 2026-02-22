/**
 * @arcanea/hooks — Memory Hooks
 *
 * Lifecycle hooks for memory operations: pre-store, post-store,
 * pre-retrieve, post-retrieve, sync, and evict.
 *
 * Guardian affinity: Elara (Shift, perspective — memory transformation)
 *                    Lyssandria (Foundation — stable storage)
 */

import type {
  HookHandler,
  HookResult,
  HookContext,
  MemoryPayload,
} from '../types.js';

// ── Pre-store hook ───────────────────────────────────────────────

/**
 * Creates a pre-store hook that validates data before persistence.
 */
export function createPreStoreHook(
  validator?: (payload: MemoryPayload) => { valid: boolean; reason?: string }
): HookHandler<MemoryPayload> {
  return (context: HookContext<MemoryPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing memory payload', abort: true };
    }

    if (!payload.namespace || !payload.key) {
      return { success: false, error: 'Memory payload requires namespace and key', abort: true };
    }

    if (validator) {
      const result = validator(payload);
      if (!result.valid) {
        return { success: false, error: result.reason ?? 'Validation failed', abort: true };
      }
    }

    return {
      success: true,
      data: { memoryPreStoreTimestamp: Date.now() },
      message: `Memory pre-store: ${payload.namespace}/${payload.key}`,
    };
  };
}

// ── Post-store hook ──────────────────────────────────────────────

/**
 * Creates a post-store hook that confirms persistence and records metrics.
 */
export function createPostStoreHook(
  onStored?: (namespace: string, key: string) => void
): HookHandler<MemoryPayload> {
  return (context: HookContext<MemoryPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing memory payload' };
    }

    const preTs = context.metadata['memoryPreStoreTimestamp'] as number | undefined;
    const latency = preTs ? Date.now() - preTs : undefined;

    if (onStored) {
      onStored(payload.namespace, payload.key);
    }

    return {
      success: true,
      data: {
        memoryStoreLatencyMs: latency,
        memoryStoredAt: Date.now(),
      },
      message: `Memory stored: ${payload.namespace}/${payload.key} (${latency ?? '?'}ms)`,
    };
  };
}

// ── Pre-retrieve hook ────────────────────────────────────────────

/**
 * Creates a pre-retrieve hook for access control or cache checks.
 */
export function createPreRetrieveHook(
  accessCheck?: (namespace: string, key: string) => boolean
): HookHandler<MemoryPayload> {
  return (context: HookContext<MemoryPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing memory payload', abort: true };
    }

    if (accessCheck && !accessCheck(payload.namespace, payload.key)) {
      return {
        success: false,
        error: `Access denied: ${payload.namespace}/${payload.key}`,
        abort: true,
      };
    }

    return {
      success: true,
      data: { memoryPreRetrieveTimestamp: Date.now() },
      message: `Memory pre-retrieve: ${payload.namespace}/${payload.key}`,
    };
  };
}

// ── Post-retrieve hook ───────────────────────────────────────────

/**
 * Creates a post-retrieve hook that records retrieval metrics.
 */
export function createPostRetrieveHook(
  onRetrieved?: (namespace: string, key: string, found: boolean) => void
): HookHandler<MemoryPayload> {
  return (context: HookContext<MemoryPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing memory payload' };
    }

    const found = payload.retrieved !== undefined;
    const preTs = context.metadata['memoryPreRetrieveTimestamp'] as number | undefined;
    const latency = preTs ? Date.now() - preTs : undefined;

    if (onRetrieved) {
      onRetrieved(payload.namespace, payload.key, found);
    }

    return {
      success: true,
      data: {
        memoryRetrieveLatencyMs: latency,
        memoryRetrieveFound: found,
      },
      message: `Memory retrieved: ${payload.namespace}/${payload.key} (${found ? 'hit' : 'miss'})`,
    };
  };
}

// ── Sync hook ────────────────────────────────────────────────────

/**
 * Creates a sync hook for cross-store synchronization tracking.
 */
export function createSyncHook(
  onSync?: (source: string, target: string) => void
): HookHandler<MemoryPayload> {
  return (context: HookContext<MemoryPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing memory payload' };
    }

    const source = payload.source ?? 'unknown';
    const target = payload.target ?? 'unknown';

    if (onSync) {
      onSync(source, target);
    }

    return {
      success: true,
      data: { memorySyncTimestamp: Date.now(), memorySyncSource: source, memorySyncTarget: target },
      message: `Memory sync: ${source} -> ${target}`,
    };
  };
}

// ── Evict hook ───────────────────────────────────────────────────

/**
 * Creates an eviction hook that records cache/memory evictions.
 */
export function createEvictHook(
  onEvict?: (namespace: string, key: string, reason?: string) => void
): HookHandler<MemoryPayload> {
  return (context: HookContext<MemoryPayload>): HookResult => {
    const payload = context.data;
    if (!payload) {
      return { success: false, error: 'Missing memory payload' };
    }

    const reason = (context.metadata['evictReason'] as string) ?? 'ttl-expired';

    if (onEvict) {
      onEvict(payload.namespace, payload.key, reason);
    }

    return {
      success: true,
      data: { memoryEvictedAt: Date.now(), memoryEvictReason: reason },
      message: `Memory evicted: ${payload.namespace}/${payload.key} (${reason})`,
    };
  };
}

// ── Export all factories ─────────────────────────────────────────

export const memoryHooks = {
  createPreStoreHook,
  createPostStoreHook,
  createPreRetrieveHook,
  createPostRetrieveHook,
  createSyncHook,
  createEvictHook,
} as const;
