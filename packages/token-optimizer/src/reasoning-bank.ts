/**
 * @arcanea/token-optimizer — ReasoningBank
 *
 * Standalone semantic retrieval engine that stores reasoning entries
 * and retrieves the most relevant ones via word-overlap similarity
 * (Jaccard-like). Returns compact context instead of full content,
 * targeting ~32% token reduction.
 *
 * No external dependencies — uses local word-overlap as fallback
 * for environments without embedding models.
 *
 * @module @arcanea/token-optimizer/reasoning-bank
 */

import type {
  MemoryEntry,
  MemoryContext,
  ReasoningBankStats,
  RetrievalOptions,
} from './types.js';

/** Tokenize text into a normalized word set */
function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 1)
  );
}

/** Jaccard similarity between two word sets */
function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 0;

  let intersection = 0;
  // Iterate the smaller set for efficiency
  const [smaller, larger] = a.size <= b.size ? [a, b] : [b, a];
  for (const word of smaller) {
    if (larger.has(word)) intersection++;
  }

  const union = a.size + b.size - intersection;
  return union > 0 ? intersection / union : 0;
}

let idCounter = 0;

export class ReasoningBank {
  private entries: MemoryEntry[] = [];
  private totalRetrievals = 0;
  private totalTokensSaved = 0;

  /**
   * Store a reasoning entry in the bank.
   * Returns the generated entry ID.
   */
  store(text: string, tags?: string[]): string {
    const id = `mem_${Date.now()}_${idCounter++}`;
    const entry: MemoryEntry = {
      id,
      text,
      wordSet: tokenize(text),
      storedAt: Date.now(),
      tags,
    };
    this.entries.push(entry);
    return id;
  }

  /**
   * Retrieve entries most relevant to `query`.
   *
   * Uses Jaccard word-overlap similarity as a lightweight
   * zero-dependency scoring mechanism.
   */
  retrieve(
    query: string,
    options?: RetrievalOptions
  ): Array<{ content: string; score: number }> {
    const limit = options?.limit ?? 5;
    const threshold = options?.threshold ?? 0.1;
    const filterTags = options?.tags;

    if (this.entries.length === 0) {
      this.totalRetrievals++;
      return [];
    }

    const queryWords = tokenize(query);

    let candidates = this.entries;

    // Filter by tags if specified
    if (filterTags && filterTags.length > 0) {
      candidates = candidates.filter((e) =>
        e.tags ? filterTags.some((t) => e.tags!.includes(t)) : false
      );
    }

    const scored = candidates
      .map((entry) => ({
        content: entry.text,
        score: jaccardSimilarity(queryWords, entry.wordSet ?? tokenize(entry.text)),
      }))
      .filter((r) => r.score >= threshold)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    this.totalRetrievals++;
    return scored;
  }

  /**
   * Format retrieved memories into a compact prompt string.
   * Truncates individual memories to keep the context tight.
   */
  formatForPrompt(
    memories: Array<{ content: string; score: number }>,
    maxCharsPerMemory = 200
  ): string {
    if (memories.length === 0) return '';

    return memories
      .map((m, i) => {
        const truncated =
          m.content.length > maxCharsPerMemory
            ? m.content.slice(0, maxCharsPerMemory) + '...'
            : m.content;
        return `[${i + 1}] (${(m.score * 100).toFixed(0)}%) ${truncated}`;
      })
      .join('\n');
  }

  /**
   * High-level: retrieve + format + compute savings.
   * Returns a complete MemoryContext.
   */
  getCompactContext(
    query: string,
    options?: RetrievalOptions & { baselineTokens?: number; maxCharsPerMemory?: number }
  ): MemoryContext {
    const memories = this.retrieve(query, options);
    const compactPrompt = this.formatForPrompt(memories, options?.maxCharsPerMemory);

    // Estimate tokens (~4 chars per token)
    const baselineTokens = options?.baselineTokens ?? 1000;
    const compactTokens = Math.ceil(compactPrompt.length / 4);
    const tokensSaved = Math.max(0, baselineTokens - compactTokens);

    this.totalTokensSaved += tokensSaved;

    return {
      query,
      memories,
      compactPrompt,
      tokensSaved,
    };
  }

  /** Return bank statistics. */
  getStats(): ReasoningBankStats {
    return {
      totalEntries: this.entries.length,
      totalRetrievals: this.totalRetrievals,
      totalTokensSaved: this.totalTokensSaved,
    };
  }

  /** Number of stored entries. */
  get size(): number {
    return this.entries.length;
  }

  /** Clear all entries and reset statistics. */
  clear(): void {
    this.entries = [];
    this.totalRetrievals = 0;
    this.totalTokensSaved = 0;
  }
}
