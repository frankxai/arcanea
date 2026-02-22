/**
 * SQLBackend
 *
 * SQL-style memory backend with in-memory Map storage (no native SQLite dependency).
 * Provides full query filtering: agentId, type, timeRange, metadata, tags, pagination.
 */

import type {
  Memory,
  MemoryBackend,
  MemoryQuery,
  MemorySearchResult,
} from './types.js';

export class SQLBackend implements MemoryBackend {
  private memories: Map<string, Memory>;
  private dbPath: string;
  private initialized: boolean = false;

  constructor(dbPath: string = ':memory:') {
    this.dbPath = dbPath;
    this.memories = new Map();
  }

  // ─── Lifecycle ─────────────────────────────────────────────

  async initialize(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
  }

  async close(): Promise<void> {
    this.memories.clear();
    this.initialized = false;
  }

  // ─── CRUD ──────────────────────────────────────────────────

  async store(memory: Memory): Promise<Memory> {
    this.memories.set(memory.id, { ...memory });
    return memory;
  }

  async retrieve(id: string): Promise<Memory | undefined> {
    const mem = this.memories.get(id);
    return mem ? { ...mem } : undefined;
  }

  async update(memory: Memory): Promise<void> {
    if (this.memories.has(memory.id)) {
      this.memories.set(memory.id, { ...memory });
    }
  }

  async delete(id: string): Promise<void> {
    this.memories.delete(id);
  }

  // ─── Query ─────────────────────────────────────────────────

  async query(query: MemoryQuery): Promise<Memory[]> {
    let results = Array.from(this.memories.values());

    // Filter by agentId
    if (query.agentId) {
      results = results.filter((m) => m.agentId === query.agentId);
    }

    // Filter by type
    if (query.type) {
      results = results.filter((m) => m.type === query.type);
    }

    // Filter by time range
    if (query.timeRange) {
      const { start, end } = query.timeRange;
      results = results.filter(
        (m) => m.timestamp >= start && m.timestamp <= end
      );
    }

    // Filter by metadata (all key-value pairs must match)
    if (query.metadata) {
      const entries = Object.entries(query.metadata);
      results = results.filter((m) => {
        if (!m.metadata) return false;
        return entries.every(([key, value]) => m.metadata![key] === value);
      });
    }

    // Filter by tags (memory must include at least one of the query tags)
    if (query.tags && query.tags.length > 0) {
      results = results.filter((m) => {
        if (!m.tags || m.tags.length === 0) return false;
        return query.tags!.some((tag) => m.tags!.includes(tag));
      });
    }

    // Sort by timestamp (newest first by default)
    if (query.orderBy === 'relevance') {
      // Relevance ordering not applicable in SQL-only — keep insertion order
    } else {
      results.sort((a, b) => b.timestamp - a.timestamp);
    }

    // Apply pagination
    if (query.offset !== undefined) {
      results = results.slice(query.offset);
    }
    if (query.limit !== undefined) {
      results = results.slice(0, query.limit);
    }

    return results;
  }

  // ─── Vector Search (not supported in SQL) ──────────────────

  async vectorSearch(
    _embedding: number[],
    _k?: number
  ): Promise<MemorySearchResult[]> {
    return [];
  }

  // ─── Agent Operations ──────────────────────────────────────

  async clearAgent(agentId: string): Promise<void> {
    for (const [id, memory] of this.memories.entries()) {
      if (memory.agentId === agentId) {
        this.memories.delete(id);
      }
    }
  }

  // ─── Accessors ─────────────────────────────────────────────

  getCount(): number {
    return this.memories.size;
  }

  getDbPath(): string {
    return this.dbPath;
  }

  getMemoriesByAgent(agentId: string): Memory[] {
    return Array.from(this.memories.values()).filter(
      (m) => m.agentId === agentId
    );
  }
}

export { SQLBackend as default };
