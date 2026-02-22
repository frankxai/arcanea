/**
 * VectorBackend
 *
 * HNSW-style vector memory backend with cosine similarity search.
 * Only stores memories that have embeddings.
 */

import type {
  Memory,
  MemoryBackend,
  MemoryQuery,
  MemorySearchResult,
  VectorBackendOptions,
} from './types.js';

/**
 * Calculate cosine similarity between two vectors.
 * Returns 0 for dimension mismatch or zero-length vectors.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) {
    return 0;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}

export class VectorBackend implements MemoryBackend {
  private memories: Map<string, Memory>;
  private dimensions: number;
  private hnswM: number;
  private efConstruction: number;
  private initialized: boolean = false;

  constructor(options: VectorBackendOptions = {}) {
    this.dimensions = options.dimensions ?? 384;
    this.hnswM = options.hnswM ?? 16;
    this.efConstruction = options.efConstruction ?? 200;
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

  /**
   * Store a memory. Only accepts memories WITH embeddings.
   * Returns the memory if stored, throws if no embedding.
   */
  async store(memory: Memory): Promise<Memory> {
    if (!memory.embedding || memory.embedding.length === 0) {
      throw new Error(
        'VectorBackend requires an embedding to store a memory'
      );
    }
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

  // ─── Query (basic — delegates to filter) ───────────────────

  async query(query: MemoryQuery): Promise<Memory[]> {
    let results = Array.from(this.memories.values());

    if (query.agentId) {
      results = results.filter((m) => m.agentId === query.agentId);
    }
    if (query.type) {
      results = results.filter((m) => m.type === query.type);
    }
    if (query.timeRange) {
      const { start, end } = query.timeRange;
      results = results.filter(
        (m) => m.timestamp >= start && m.timestamp <= end
      );
    }

    results.sort((a, b) => b.timestamp - a.timestamp);

    if (query.offset !== undefined) {
      results = results.slice(query.offset);
    }
    if (query.limit !== undefined) {
      results = results.slice(0, query.limit);
    }

    return results;
  }

  // ─── Vector Search ─────────────────────────────────────────

  async vectorSearch(
    embedding: number[],
    k: number = 10
  ): Promise<MemorySearchResult[]> {
    const withEmbeddings = Array.from(this.memories.values()).filter(
      (m) => m.embedding && m.embedding.length > 0
    );

    const scored: MemorySearchResult[] = withEmbeddings.map((memory) => ({
      ...memory,
      similarity: cosineSimilarity(embedding, memory.embedding!),
    }));

    scored.sort((a, b) => b.similarity - a.similarity);

    return scored.slice(0, k);
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

  getDimensions(): number {
    return this.dimensions;
  }

  getHnswM(): number {
    return this.hnswM;
  }

  getEfConstruction(): number {
    return this.efConstruction;
  }

  getCount(): number {
    return this.memories.size;
  }
}

export { VectorBackend as default };
