/**
 * HybridBackend
 *
 * Combines SQLBackend (structured queries) with VectorBackend (semantic search).
 * SQL always stores. Vector only stores when embeddings are present.
 * hybridSearch merges both result sets with configurable weights.
 */

import type {
  Memory,
  MemoryBackend,
  MemoryQuery,
  MemorySearchResult,
  MemoryStats,
  HybridSearchOptions,
} from './types.js';
import { SQLBackend } from './sql-backend.js';
import { VectorBackend } from './vector-backend.js';

export class HybridBackend implements MemoryBackend {
  private sqlBackend: SQLBackend;
  private vectorBackend: VectorBackend;
  private initialized: boolean = false;

  constructor(sqlBackend: SQLBackend, vectorBackend: VectorBackend) {
    this.sqlBackend = sqlBackend;
    this.vectorBackend = vectorBackend;
  }

  // ─── Lifecycle ─────────────────────────────────────────────

  async initialize(): Promise<void> {
    if (this.initialized) return;
    await Promise.all([
      this.sqlBackend.initialize(),
      this.vectorBackend.initialize(),
    ]);
    this.initialized = true;
  }

  async close(): Promise<void> {
    await Promise.all([this.sqlBackend.close(), this.vectorBackend.close()]);
    this.initialized = false;
  }

  // ─── CRUD ──────────────────────────────────────────────────

  /**
   * Store in SQL always. Store in Vector only if embedding exists.
   */
  async store(memory: Memory): Promise<Memory> {
    await this.sqlBackend.store(memory);

    if (memory.embedding && memory.embedding.length > 0) {
      await this.vectorBackend.store(memory);
    }

    return memory;
  }

  /**
   * Retrieve from SQL (primary source of truth).
   */
  async retrieve(id: string): Promise<Memory | undefined> {
    return this.sqlBackend.retrieve(id);
  }

  async update(memory: Memory): Promise<void> {
    await this.sqlBackend.update(memory);

    if (memory.embedding && memory.embedding.length > 0) {
      await this.vectorBackend.update(memory);
    }
  }

  async delete(id: string): Promise<void> {
    await Promise.all([
      this.sqlBackend.delete(id),
      this.vectorBackend.delete(id),
    ]);
  }

  // ─── Query ─────────────────────────────────────────────────

  /**
   * Structured query delegates to SQL backend.
   */
  async query(query: MemoryQuery): Promise<Memory[]> {
    return this.sqlBackend.query(query);
  }

  /**
   * Vector search delegates to Vector backend.
   */
  async vectorSearch(
    embedding: number[],
    k: number = 10
  ): Promise<MemorySearchResult[]> {
    return this.vectorBackend.vectorSearch(embedding, k);
  }

  // ─── Hybrid Search ────────────────────────────────────────

  /**
   * Hybrid search combining SQL filtering + vector similarity scoring.
   *
   * When embedding is provided:
   *   1. Get top-K*2 from vector search
   *   2. Apply SQL-style filters (agent, type, time, metadata, tags)
   *   3. Return top-K
   *
   * When no embedding: fall back to SQL query with similarity=1.0
   */
  async hybridSearch(
    options: HybridSearchOptions
  ): Promise<MemorySearchResult[]> {
    const { query, embedding, k = 10 } = options;

    if (!embedding) {
      // No embedding — SQL-only search
      const results = await this.sqlBackend.query(query);
      return results.map((m) => ({ ...m, similarity: 1.0 }));
    }

    // Get vector search results (fetch extra to allow for filtering)
    const vectorResults = await this.vectorBackend.vectorSearch(
      embedding,
      k * 2
    );

    // Apply SQL-style filters to vector results
    let filtered: MemorySearchResult[] = vectorResults;

    if (query.agentId) {
      filtered = filtered.filter((m) => m.agentId === query.agentId);
    }
    if (query.type) {
      filtered = filtered.filter((m) => m.type === query.type);
    }
    if (query.timeRange) {
      const { start, end } = query.timeRange;
      filtered = filtered.filter(
        (m) => m.timestamp >= start && m.timestamp <= end
      );
    }
    if (query.metadata) {
      const entries = Object.entries(query.metadata);
      filtered = filtered.filter((m) => {
        if (!m.metadata) return false;
        return entries.every(([key, value]) => m.metadata![key] === value);
      });
    }
    if (query.tags && query.tags.length > 0) {
      filtered = filtered.filter((m) => {
        if (!m.tags || m.tags.length === 0) return false;
        return query.tags!.some((tag) => m.tags!.includes(tag));
      });
    }

    return filtered.slice(0, k);
  }

  // ─── Stats ─────────────────────────────────────────────────

  /**
   * Aggregate stats from both backends.
   */
  async getStats(): Promise<MemoryStats> {
    const allMemories = await this.sqlBackend.query({});
    const byAgent = new Map<string, number>();
    const byType = new Map<string, number>();
    let vectorized = 0;

    for (const mem of allMemories) {
      byAgent.set(mem.agentId, (byAgent.get(mem.agentId) ?? 0) + 1);
      byType.set(mem.type, (byType.get(mem.type) ?? 0) + 1);
      if (mem.embedding && mem.embedding.length > 0) {
        vectorized++;
      }
    }

    return {
      totalMemories: allMemories.length,
      byAgent,
      byType,
      vectorized,
      avgSimilarity: 0,
    };
  }

  // ─── Agent Operations ──────────────────────────────────────

  async clearAgent(agentId: string): Promise<void> {
    await Promise.all([
      this.sqlBackend.clearAgent(agentId),
      this.vectorBackend.clearAgent(agentId),
    ]);
  }

  // ─── Accessors ─────────────────────────────────────────────

  getSQLBackend(): SQLBackend {
    return this.sqlBackend;
  }

  getVectorBackend(): VectorBackend {
    return this.vectorBackend;
  }
}

export { HybridBackend as default };
