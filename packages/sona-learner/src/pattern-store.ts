/**
 * @arcanea/sona-learner — Pattern Store
 *
 * Storage and similarity search for learned patterns.
 * Uses Jaccard word-overlap for local similarity computation
 * (same approach as arcanea-flow's computeLocalSimilarity).
 */

import type {
  Pattern,
  PatternSearchResult,
  PatternSearchOptions,
} from './types.js';
import { generateId } from './trajectory-recorder.js';

/**
 * Compute Jaccard word-overlap similarity between a query and content.
 * Returns a value in [0, 1].
 */
export function computeLocalSimilarity(query: string, content: string): number {
  const queryWords = new Set(query.toLowerCase().split(/\s+/).filter(w => w.length > 0));
  const contentWords = new Set(content.toLowerCase().split(/\s+/).filter(w => w.length > 0));

  if (queryWords.size === 0 && contentWords.size === 0) return 1.0;
  if (queryWords.size === 0 || contentWords.size === 0) return 0.0;

  const intersection = [...queryWords].filter(w => contentWords.has(w)).length;
  const union = new Set([...queryWords, ...contentWords]).size;

  return union > 0 ? intersection / union : 0;
}

/**
 * PatternStore — In-memory pattern storage with similarity search.
 */
export class PatternStore {
  private patterns: Map<string, Pattern> = new Map();
  private searchesPerformed: number = 0;
  private totalSearchLatency: number = 0;

  /**
   * Store a new pattern. If no id is provided, one is generated.
   * @returns The stored pattern (with generated id if needed).
   */
  store(input: Omit<Pattern, 'id' | 'usageCount' | 'createdAt' | 'lastUsed'> & { id?: string }): Pattern {
    const now = new Date();
    const pattern: Pattern = {
      id: input.id || generateId('pat'),
      content: input.content,
      category: input.category,
      confidence: input.confidence,
      usageCount: 0,
      createdAt: now,
      lastUsed: now,
      embedding: input.embedding,
      guardianId: input.guardianId,
      gateFrequency: input.gateFrequency,
    };

    this.patterns.set(pattern.id, pattern);
    return pattern;
  }

  /**
   * Find patterns similar to a query string.
   */
  find(query: string, options?: PatternSearchOptions): PatternSearchResult[] {
    const startTime = performance.now();

    const threshold = options?.threshold ?? 0.1;
    const topK = options?.topK ?? 5;

    let candidates = Array.from(this.patterns.values());

    // Filter by category
    if (options?.category) {
      candidates = candidates.filter(p => p.category === options.category);
    }

    // Filter by guardian
    if (options?.guardianId) {
      candidates = candidates.filter(p => p.guardianId === options.guardianId);
    }

    // Compute similarity and filter by threshold
    const results: PatternSearchResult[] = candidates
      .map(pattern => ({
        pattern,
        similarity: computeLocalSimilarity(query, pattern.content),
      }))
      .filter(r => r.similarity >= threshold)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);

    // Update usage tracking for accessed patterns
    for (const result of results) {
      const p = this.patterns.get(result.pattern.id);
      if (p) {
        p.usageCount++;
        p.lastUsed = new Date();
      }
    }

    const latency = performance.now() - startTime;
    this.searchesPerformed++;
    this.totalSearchLatency += latency;

    return results;
  }

  /**
   * Get a pattern by ID.
   */
  get(id: string): Pattern | undefined {
    return this.patterns.get(id);
  }

  /**
   * Update a pattern's fields.
   */
  update(id: string, updates: Partial<Omit<Pattern, 'id' | 'createdAt'>>): Pattern {
    const pattern = this.patterns.get(id);
    if (!pattern) {
      throw new Error(`Pattern ${id} not found`);
    }

    if (updates.content !== undefined) pattern.content = updates.content;
    if (updates.category !== undefined) pattern.category = updates.category;
    if (updates.confidence !== undefined) pattern.confidence = updates.confidence;
    if (updates.usageCount !== undefined) pattern.usageCount = updates.usageCount;
    if (updates.lastUsed !== undefined) pattern.lastUsed = updates.lastUsed;
    if (updates.embedding !== undefined) pattern.embedding = updates.embedding;
    if (updates.guardianId !== undefined) pattern.guardianId = updates.guardianId;
    if (updates.gateFrequency !== undefined) pattern.gateFrequency = updates.gateFrequency;

    return pattern;
  }

  /**
   * Delete a pattern by ID.
   * @returns true if the pattern was deleted, false if it didn't exist.
   */
  delete(id: string): boolean {
    return this.patterns.delete(id);
  }

  /**
   * Get all patterns in a category.
   */
  getByCategory(category: string): Pattern[] {
    return Array.from(this.patterns.values()).filter(p => p.category === category);
  }

  /**
   * Get all patterns associated with a guardian.
   */
  getByGuardian(guardianId: string): Pattern[] {
    return Array.from(this.patterns.values()).filter(p => p.guardianId === guardianId);
  }

  /**
   * Get store statistics.
   */
  getStats(): {
    stored: number;
    searchesPerformed: number;
    avgSearchLatency: number;
    categories: string[];
    guardians: string[];
  } {
    const categories = [...new Set(Array.from(this.patterns.values()).map(p => p.category))];
    const guardians = [...new Set(
      Array.from(this.patterns.values())
        .map(p => p.guardianId)
        .filter((g): g is string => g !== undefined)
    )];

    return {
      stored: this.patterns.size,
      searchesPerformed: this.searchesPerformed,
      avgSearchLatency: this.searchesPerformed > 0
        ? this.totalSearchLatency / this.searchesPerformed
        : 0,
      categories,
      guardians,
    };
  }

  /**
   * Clear all patterns and reset stats.
   */
  clear(): void {
    this.patterns.clear();
    this.searchesPerformed = 0;
    this.totalSearchLatency = 0;
  }
}
