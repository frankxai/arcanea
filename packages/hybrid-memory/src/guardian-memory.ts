/**
 * GuardianMemoryManager
 *
 * Guardian-namespaced memory management on top of HybridBackend.
 * Each of the 10 Guardians has isolated memory with configurable retention.
 *
 * Retention policies:
 *   - permanent: never expires
 *   - session: cleared when close() is called
 *   - ttl: expires after ttlMs milliseconds
 */

import { EventEmitter } from 'node:events';
import type {
  Memory,
  MemoryQuery,
  MemorySearchResult,
  MemoryStats,
  HybridSearchOptions,
  GuardianMemoryConfig,
} from './types.js';
import { GUARDIAN_MEMORY_CONFIGS } from './types.js';
import { HybridBackend } from './hybrid-backend.js';

interface StoredMemoryMeta {
  guardianId: string;
  storedAt: number;
  ttlMs?: number;
}

export class GuardianMemoryManager extends EventEmitter {
  private backend: HybridBackend;
  private memoryMeta: Map<string, StoredMemoryMeta> = new Map();
  private configs: Record<string, GuardianMemoryConfig>;

  constructor(
    backend: HybridBackend,
    configs?: Record<string, GuardianMemoryConfig>
  ) {
    super();
    this.backend = backend;
    this.configs = configs ?? GUARDIAN_MEMORY_CONFIGS;
  }

  // ─── Lifecycle ─────────────────────────────────────────────

  async initialize(): Promise<void> {
    await this.backend.initialize();
  }

  async close(): Promise<void> {
    // Clear session-policy memories before closing
    const sessionGuardians = Object.values(this.configs).filter(
      (c) => c.retentionPolicy === 'session'
    );

    for (const config of sessionGuardians) {
      await this.clearGuardian(config.guardianId);
    }

    await this.backend.close();
    this.memoryMeta.clear();
  }

  // ─── Guardian-Namespaced Operations ────────────────────────

  /**
   * Build a namespaced agentId for the given guardian.
   */
  private getNamespacedId(guardianId: string): string {
    const config = this.configs[guardianId];
    if (!config) {
      return `guardian:${guardianId}`;
    }
    return config.namespace;
  }

  /**
   * Store a memory for a specific Guardian.
   * The agentId is overwritten with the Guardian's namespace.
   */
  async storeForGuardian(
    guardianId: string,
    memory: Memory
  ): Promise<Memory> {
    const namespacedMemory: Memory = {
      ...memory,
      agentId: this.getNamespacedId(guardianId),
    };

    const stored = await this.backend.store(namespacedMemory);

    const config = this.configs[guardianId];
    this.memoryMeta.set(stored.id, {
      guardianId,
      storedAt: Date.now(),
      ttlMs: config?.ttlMs,
    });

    this.emit('memory-stored', {
      guardianId,
      memoryId: stored.id,
      type: stored.type,
    });

    return stored;
  }

  /**
   * Query memories within a Guardian's namespace.
   */
  async queryGuardian(
    guardianId: string,
    query: MemoryQuery
  ): Promise<Memory[]> {
    return this.backend.query({
      ...query,
      agentId: this.getNamespacedId(guardianId),
    });
  }

  /**
   * Vector search within a Guardian's namespace.
   */
  async searchGuardian(
    guardianId: string,
    embedding: number[],
    k: number = 10
  ): Promise<MemorySearchResult[]> {
    const results = await this.backend.vectorSearch(embedding, k * 2);
    const ns = this.getNamespacedId(guardianId);
    return results.filter((r) => r.agentId === ns).slice(0, k);
  }

  /**
   * Hybrid search within a Guardian's namespace.
   */
  async hybridSearchGuardian(
    guardianId: string,
    options: HybridSearchOptions
  ): Promise<MemorySearchResult[]> {
    return this.backend.hybridSearch({
      ...options,
      query: {
        ...options.query,
        agentId: this.getNamespacedId(guardianId),
      },
    });
  }

  /**
   * Get stats for a specific Guardian's memory.
   */
  async getGuardianStats(guardianId: string): Promise<MemoryStats> {
    const ns = this.getNamespacedId(guardianId);
    const memories = await this.backend.query({ agentId: ns });

    const byAgent = new Map<string, number>();
    const byType = new Map<string, number>();
    let vectorized = 0;

    byAgent.set(ns, memories.length);

    for (const mem of memories) {
      byType.set(mem.type, (byType.get(mem.type) ?? 0) + 1);
      if (mem.embedding && mem.embedding.length > 0) {
        vectorized++;
      }
    }

    return {
      totalMemories: memories.length,
      byAgent,
      byType,
      vectorized,
      avgSimilarity: 0,
    };
  }

  /**
   * Get combined stats for all Guardians.
   */
  async getAllGuardianStats(): Promise<Map<string, MemoryStats>> {
    const allStats = new Map<string, MemoryStats>();

    for (const guardianId of Object.keys(this.configs)) {
      allStats.set(guardianId, await this.getGuardianStats(guardianId));
    }

    return allStats;
  }

  /**
   * Clear all memories for a specific Guardian.
   */
  async clearGuardian(guardianId: string): Promise<void> {
    const ns = this.getNamespacedId(guardianId);
    await this.backend.clearAgent(ns);

    // Clean up meta entries for this guardian
    for (const [memId, meta] of this.memoryMeta.entries()) {
      if (meta.guardianId === guardianId) {
        this.memoryMeta.delete(memId);
      }
    }

    this.emit('guardian-cleared', { guardianId });
  }

  /**
   * Prune all TTL-expired memories across all Guardians.
   * Returns the number of pruned memories.
   */
  async pruneExpired(): Promise<number> {
    const now = Date.now();
    let pruned = 0;

    for (const [memId, meta] of this.memoryMeta.entries()) {
      const config = this.configs[meta.guardianId];
      if (config?.retentionPolicy !== 'ttl') continue;

      const ttl = meta.ttlMs ?? config.ttlMs ?? 0;
      if (now - meta.storedAt >= ttl) {
        await this.backend.delete(memId);
        this.memoryMeta.delete(memId);
        this.emit('memory-expired', {
          guardianId: meta.guardianId,
          memoryId: memId,
        });
        pruned++;
      }
    }

    return pruned;
  }

  // ─── Accessors ─────────────────────────────────────────────

  getBackend(): HybridBackend {
    return this.backend;
  }

  getConfig(guardianId: string): GuardianMemoryConfig | undefined {
    return this.configs[guardianId];
  }

  getAllConfigs(): Record<string, GuardianMemoryConfig> {
    return { ...this.configs };
  }
}

export { GuardianMemoryManager as default };
