/**
 * @arcanea/guardian-memory — Guardian Memory Manager
 *
 * Persistent semantic memory organized by the Ten Guardians.
 * Each Guardian owns a namespace within the HNSW vector index,
 * mapped to Starlight Intelligence System vault categories.
 *
 * Architecture:
 *   SIS Vaults (philosophy) → Guardian Namespaces → HNSW Index (engine)
 *
 * Key capabilities:
 *   - Per-Guardian vector memory with semantic search
 *   - Cross-Guardian search with element affinity weighting
 *   - File-based persistence (JSON) for portability
 *   - Word-index fallback when embeddings unavailable
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { HNSWIndex } from './hnsw-index.js';
import {
  type GuardianName,
  type GuardianMemoryEntry,
  type GuardianMemoryInput,
  type GuardianMemoryUpdate,
  type GuardianSearchOptions,
  type GuardianSearchResult,
  type VaultCategory,
  type Element,
  type HNSWConfig,
  GUARDIANS,
  ELEMENT_AFFINITY,
  GUARDIAN_VAULT_MAP,
  createGuardianEntry,
} from './types.js';

// ── Word Index (fallback when no embeddings) ─────────────────

class WordIndex {
  private index = new Map<string, Set<string>>();

  add(entryId: string, content: string): void {
    const words = this.tokenize(content);
    for (const word of words) {
      if (!this.index.has(word)) {
        this.index.set(word, new Set());
      }
      this.index.get(word)!.add(entryId);
    }
  }

  remove(entryId: string): void {
    for (const [, ids] of this.index) {
      ids.delete(entryId);
    }
  }

  search(query: string): Map<string, number> {
    const queryWords = this.tokenize(query);
    const scores = new Map<string, number>();
    for (const word of queryWords) {
      const matches = this.index.get(word);
      if (matches) {
        for (const id of matches) {
          scores.set(id, (scores.get(id) ?? 0) + 1);
        }
      }
    }
    return scores;
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2);
  }
}

// ── Guardian Memory Manager ──────────────────────────────────

export interface GuardianMemoryConfig {
  /** Storage directory for persistent data */
  storagePath: string;

  /** HNSW configuration */
  hnsw?: Partial<HNSWConfig>;

  /** Auto-save interval in ms (0 = manual only) */
  autoSaveInterval?: number;

  /** Enable cross-Guardian search by default */
  crossGuardianDefault?: boolean;
}

export class GuardianMemory {
  private entries = new Map<string, GuardianMemoryEntry>();
  private guardianEntries = new Map<GuardianName, Set<string>>();
  private vaultEntries = new Map<VaultCategory, Set<string>>();

  private hnswIndex: HNSWIndex;
  private wordIndex = new WordIndex();

  private config: GuardianMemoryConfig;
  private dirty = false;
  private autoSaveTimer?: ReturnType<typeof setInterval>;

  constructor(config?: Partial<GuardianMemoryConfig>) {
    this.config = {
      storagePath: config?.storagePath ?? join(process.cwd(), '.arcanea', 'memory'),
      hnsw: config?.hnsw,
      autoSaveInterval: config?.autoSaveInterval ?? 0,
      crossGuardianDefault: config?.crossGuardianDefault ?? false,
    };

    this.hnswIndex = new HNSWIndex({
      dimensions: this.config.hnsw?.dimensions ?? 768,
      M: this.config.hnsw?.M ?? 16,
      efConstruction: this.config.hnsw?.efConstruction ?? 200,
      maxElements: this.config.hnsw?.maxElements ?? 100000,
      metric: this.config.hnsw?.metric ?? 'cosine',
      quantization: this.config.hnsw?.quantization,
    });

    // Initialize Guardian and vault tracking sets
    for (const name of Object.keys(GUARDIANS) as GuardianName[]) {
      this.guardianEntries.set(name, new Set());
    }
    for (const vault of ['strategic', 'technical', 'creative', 'operational', 'wisdom', 'horizon'] as VaultCategory[]) {
      this.vaultEntries.set(vault, new Set());
    }

    if (this.config.autoSaveInterval && this.config.autoSaveInterval > 0) {
      this.autoSaveTimer = setInterval(() => this.save(), this.config.autoSaveInterval);
    }
  }

  // ── Core Operations ──────────────────────────────────────

  /**
   * Store a memory entry for a Guardian.
   */
  async store(input: GuardianMemoryInput): Promise<GuardianMemoryEntry> {
    const entry = createGuardianEntry(input);

    // Store in main map
    this.entries.set(entry.id, entry);

    // Track by Guardian
    this.guardianEntries.get(entry.guardian)?.add(entry.id);

    // Track by vault
    this.vaultEntries.get(entry.vault)?.add(entry.id);

    // Index for word search
    this.wordIndex.add(entry.id, `${entry.content} ${entry.tags.join(' ')}`);

    // Add to HNSW if embedding provided
    if (entry.embedding) {
      await this.hnswIndex.addPoint(entry.id, entry.embedding);
    }

    this.dirty = true;
    return entry;
  }

  /**
   * Store with an embedding vector for semantic search.
   */
  async storeWithEmbedding(
    input: GuardianMemoryInput,
    embedding: Float32Array
  ): Promise<GuardianMemoryEntry> {
    const entry = createGuardianEntry(input);
    entry.embedding = embedding;

    this.entries.set(entry.id, entry);
    this.guardianEntries.get(entry.guardian)?.add(entry.id);
    this.vaultEntries.get(entry.vault)?.add(entry.id);
    this.wordIndex.add(entry.id, `${entry.content} ${entry.tags.join(' ')}`);
    await this.hnswIndex.addPoint(entry.id, embedding);

    this.dirty = true;
    return entry;
  }

  /**
   * Recall a memory by ID.
   */
  recall(id: string): GuardianMemoryEntry | undefined {
    const entry = this.entries.get(id);
    if (entry) {
      entry.accessCount++;
      entry.updatedAt = Date.now();
    }
    return entry;
  }

  /**
   * Recall all memories for a Guardian.
   */
  recallByGuardian(guardian: GuardianName, limit = 50): GuardianMemoryEntry[] {
    const ids = this.guardianEntries.get(guardian);
    if (!ids) return [];

    return Array.from(ids)
      .map((id) => this.entries.get(id)!)
      .filter(Boolean)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, limit);
  }

  /**
   * Recall all memories in a vault category.
   */
  recallByVault(vault: VaultCategory, limit = 50): GuardianMemoryEntry[] {
    const ids = this.vaultEntries.get(vault);
    if (!ids) return [];

    return Array.from(ids)
      .map((id) => this.entries.get(id)!)
      .filter(Boolean)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, limit);
  }

  /**
   * Semantic vector search across Guardian memories.
   */
  async search(
    query: Float32Array,
    options: GuardianSearchOptions
  ): Promise<GuardianSearchResult[]> {
    const { k, guardians, vault, type, minConfidence, tags, elementAffinity, ef, threshold, crossGuardian } = options;

    // Build filter function
    const filter = (id: string): boolean => {
      const entry = this.entries.get(id);
      if (!entry) return false;

      // Guardian filter
      if (guardians && !guardians.includes(entry.guardian)) return false;

      // Vault filter
      if (vault && entry.vault !== vault) return false;

      // Type filter
      if (type && entry.type !== type) return false;

      // Confidence filter
      if (minConfidence !== undefined && entry.confidence < minConfidence) return false;

      // Tag filter
      if (tags && !tags.every((t) => entry.tags.includes(t))) return false;

      return true;
    };

    // Search HNSW with filters
    const rawResults = await this.hnswIndex.searchWithFilters(query, k, filter, ef);

    // Map to GuardianSearchResult with affinity scoring
    const results: GuardianSearchResult[] = [];
    for (const { id, distance } of rawResults) {
      const entry = this.entries.get(id);
      if (!entry) continue;

      let score = 1 - distance; // Convert distance to similarity
      let affinityBonus: number | undefined;

      // Apply element affinity bonus
      if (elementAffinity && entry.element) {
        const bonus = (ELEMENT_AFFINITY[elementAffinity]?.[entry.element] ?? 0.5) - 0.5;
        if (bonus > 0) {
          affinityBonus = bonus;
          score = Math.min(1, score + bonus * 0.1); // 10% max affinity bonus
        }
      }

      // Apply threshold
      if (threshold !== undefined && score < threshold) continue;

      // Update access tracking
      entry.accessCount++;

      results.push({ entry, score, distance, affinityBonus });
    }
    results.sort((a, b) => b.score - a.score);

    return results;
  }

  /**
   * Text-based search (word index fallback when no embeddings).
   */
  searchByText(
    query: string,
    options?: Partial<GuardianSearchOptions>
  ): GuardianMemoryEntry[] {
    const scores = this.wordIndex.search(query);
    const limit = options?.k ?? 10;

    let results = Array.from(scores.entries())
      .map(([id, score]) => ({ entry: this.entries.get(id)!, score }))
      .filter((r) => r.entry != null);

    // Apply Guardian filter
    if (options?.guardians) {
      results = results.filter((r) => options.guardians!.includes(r.entry.guardian));
    }

    // Apply vault filter
    if (options?.vault) {
      results = results.filter((r) => r.entry.vault === options.vault);
    }

    // Apply confidence filter
    if (options?.minConfidence !== undefined) {
      results = results.filter((r) => r.entry.confidence >= options.minConfidence!);
    }

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((r) => r.entry);
  }

  /**
   * Update a memory entry.
   */
  update(id: string, update: GuardianMemoryUpdate): GuardianMemoryEntry | undefined {
    const entry = this.entries.get(id);
    if (!entry) return undefined;

    if (update.content !== undefined) {
      entry.content = update.content;
      this.wordIndex.remove(id);
      this.wordIndex.add(id, `${entry.content} ${entry.tags.join(' ')}`);
    }
    if (update.tags !== undefined) entry.tags = update.tags;
    if (update.confidence !== undefined) entry.confidence = update.confidence;
    if (update.metadata !== undefined) entry.metadata = { ...entry.metadata, ...update.metadata };
    if (update.accessLevel !== undefined) entry.accessLevel = update.accessLevel;
    if (update.expiresAt !== undefined) entry.expiresAt = update.expiresAt;
    if (update.references !== undefined) entry.references = update.references;

    entry.updatedAt = Date.now();
    entry.version++;
    this.dirty = true;

    return entry;
  }

  /**
   * Remove a memory entry.
   */
  async remove(id: string): Promise<boolean> {
    const entry = this.entries.get(id);
    if (!entry) return false;

    this.entries.delete(id);
    this.guardianEntries.get(entry.guardian)?.delete(id);
    this.vaultEntries.get(entry.vault)?.delete(id);
    this.wordIndex.remove(id);

    if (this.hnswIndex.has(id)) {
      await this.hnswIndex.removePoint(id);
    }

    this.dirty = true;
    return true;
  }

  // ── Persistence ──────────────────────────────────────────

  /**
   * Load memories from disk.
   */
  load(): void {
    const filePath = join(this.config.storagePath, 'guardian-memory.json');
    if (!existsSync(filePath)) return;

    try {
      const raw = readFileSync(filePath, 'utf-8');
      const data = JSON.parse(raw) as GuardianMemoryEntry[];

      for (const entry of data) {
        this.entries.set(entry.id, entry);
        this.guardianEntries.get(entry.guardian)?.add(entry.id);
        this.vaultEntries.get(entry.vault)?.add(entry.id);
        this.wordIndex.add(entry.id, `${entry.content} ${entry.tags.join(' ')}`);
      }
    } catch {
      // Corrupted file — start fresh
      this.entries.clear();
    }
  }

  /**
   * Save memories to disk.
   */
  save(): void {
    if (!this.dirty) return;

    if (!existsSync(this.config.storagePath)) {
      mkdirSync(this.config.storagePath, { recursive: true });
    }

    // Serialize entries without embeddings (too large for JSON)
    const data = Array.from(this.entries.values()).map((entry) => {
      const { embedding, ...rest } = entry;
      return rest;
    });

    const filePath = join(this.config.storagePath, 'guardian-memory.json');
    writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    this.dirty = false;
  }

  // ── Statistics ────────────────────────────────────────────

  /**
   * Get statistics about Guardian memories.
   */
  getStats(): {
    totalEntries: number;
    byGuardian: Record<string, number>;
    byVault: Record<string, number>;
    byType: Record<string, number>;
    vectorized: number;
    hnswStats: ReturnType<HNSWIndex['getStats']>;
  } {
    const byGuardian: Record<string, number> = {};
    const byVault: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let vectorized = 0;

    for (const entry of this.entries.values()) {
      byGuardian[entry.guardian] = (byGuardian[entry.guardian] ?? 0) + 1;
      byVault[entry.vault] = (byVault[entry.vault] ?? 0) + 1;
      byType[entry.type] = (byType[entry.type] ?? 0) + 1;
      if (entry.embedding) vectorized++;
    }

    return {
      totalEntries: this.entries.size,
      byGuardian,
      byVault,
      byType,
      vectorized,
      hnswStats: this.hnswIndex.getStats(),
    };
  }

  /**
   * Get a Guardian's memory count.
   */
  guardianCount(guardian: GuardianName): number {
    return this.guardianEntries.get(guardian)?.size ?? 0;
  }

  /**
   * Get total memory count.
   */
  get size(): number {
    return this.entries.size;
  }

  // ── Lifecycle ─────────────────────────────────────────────

  /**
   * Shutdown — save and cleanup.
   */
  shutdown(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
    }
    this.save();
  }

  /**
   * Clear all memories for a Guardian.
   */
  async clearGuardian(guardian: GuardianName): Promise<number> {
    const ids = this.guardianEntries.get(guardian);
    if (!ids) return 0;

    const count = ids.size;
    for (const id of ids) {
      await this.remove(id);
    }
    return count;
  }

  /**
   * Clear all memories.
   */
  async clearAll(): Promise<void> {
    this.entries.clear();
    for (const set of this.guardianEntries.values()) set.clear();
    for (const set of this.vaultEntries.values()) set.clear();
    this.hnswIndex.clear();
    this.dirty = true;
  }
}
