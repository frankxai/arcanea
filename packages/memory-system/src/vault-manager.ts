/**
 * VaultManager — Core Engine of the Arcanea Memory System
 *
 * Primary public API for storing, recalling, and managing memories
 * across six typed semantic vaults with Guardian routing.
 *
 * Guardian: Leyla (Flow Gate, 285 Hz) — Creativity, Emotion, Flow
 *
 * Vault types:
 *   strategic   — Decisions, orchestration (Shinkami)
 *   technical   — Infrastructure, execution (Lyssandria, Draconia)
 *   creative    — Creativity, healing (Leyla, Maylinn)
 *   operational — Standards, integration (Alera, Ino)
 *   wisdom      — Learning, transformation (Aiyami, Elara)
 *   horizon     — Vision, prediction — APPEND-ONLY (Lyria)
 */

import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} from 'node:fs';
import { join } from 'node:path';
import { HorizonLedger } from './horizon-ledger.js';
import type { HorizonEntry } from './horizon-ledger.js';

// ---------------------------------------------------------------------------
// Types (inline until types.ts is provided by scaffold agent)
// ---------------------------------------------------------------------------

export type VaultType =
  | 'strategic'
  | 'technical'
  | 'creative'
  | 'operational'
  | 'wisdom'
  | 'horizon';

export type ConfidenceLevel = 'low' | 'medium' | 'high' | 'verified';

export type GuardianName =
  | 'Lyssandria'
  | 'Leyla'
  | 'Draconia'
  | 'Maylinn'
  | 'Alera'
  | 'Lyria'
  | 'Aiyami'
  | 'Elara'
  | 'Ino'
  | 'Shinkami';

export interface VaultEntry {
  id: string;
  content: string;
  vault: VaultType;
  tags: string[];
  confidence: ConfidenceLevel;
  guardian?: GuardianName;
  metadata: Record<string, unknown>;
  createdAt: number;
  updatedAt: number;
  expiresAt?: number;
  source?: string;
}

export interface VaultEntryInput {
  content: string;
  vault?: VaultType;
  tags?: string[];
  confidence?: ConfidenceLevel;
  guardian?: GuardianName;
  metadata?: Record<string, unknown>;
  /** Time-to-live in seconds. Entry expires after this duration. */
  ttl?: number;
  source?: string;
}

export interface VaultSearchOptions {
  query: string;
  vault?: VaultType;
  guardian?: GuardianName;
  tags?: string[];
  minConfidence?: ConfidenceLevel;
  limit?: number;
  /** When 'relevance', sort by match score. When 'recency', sort by createdAt desc. */
  sortBy?: 'relevance' | 'recency' | 'confidence';
}

export interface VaultSearchResult {
  entry: VaultEntry;
  score: number;
}

export interface MemorySystemConfig {
  storagePath: string;
  backend: 'file';
  defaultConfidence: ConfidenceLevel;
  enableAutoClassification: boolean;
  maxEntriesPerVault: number;
  horizonAuthor: string;
  enableHorizonExport: boolean;
}

export interface VaultStats {
  vault: VaultType;
  count: number;
  topTags: Array<{ tag: string; count: number }>;
  guardianDistribution: Partial<Record<GuardianName, number>>;
  oldestEntry?: number;
  newestEntry?: number;
}

export interface MemorySystemStats {
  totalEntries: number;
  vaults: VaultStats[];
  horizonCount: number;
  storagePath: string;
}

// ---------------------------------------------------------------------------
// Confidence numeric mapping
// ---------------------------------------------------------------------------

const CONFIDENCE_SCORE: Record<ConfidenceLevel, number> = {
  low: 0.25,
  medium: 0.5,
  high: 0.75,
  verified: 1.0,
};

const ALL_VAULTS: VaultType[] = [
  'strategic',
  'technical',
  'creative',
  'operational',
  'wisdom',
  'horizon',
];

// ---------------------------------------------------------------------------
// Built-in Vault Classifier
// ---------------------------------------------------------------------------

const VAULT_KEYWORDS: Record<Exclude<VaultType, 'horizon'>, string[]> = {
  strategic: [
    'decision', 'strategy', 'plan', 'goal', 'priority', 'roadmap',
    'orchestrate', 'coordinate', 'vision', 'objective', 'direction',
    'architecture', 'tradeoff', 'risk', 'milestone',
  ],
  technical: [
    'code', 'api', 'bug', 'fix', 'deploy', 'build', 'test', 'database',
    'server', 'endpoint', 'function', 'module', 'package', 'config',
    'typescript', 'performance', 'refactor', 'migration', 'debug',
  ],
  creative: [
    'design', 'story', 'art', 'music', 'lore', 'narrative', 'theme',
    'color', 'style', 'brand', 'voice', 'tone', 'aesthetic', 'inspire',
    'flow', 'emotion', 'create', 'compose', 'craft',
  ],
  operational: [
    'process', 'workflow', 'standard', 'convention', 'pipeline', 'ci',
    'deploy', 'monitor', 'log', 'metric', 'sla', 'incident', 'runbook',
    'schedule', 'integration', 'release', 'documentation',
  ],
  wisdom: [
    'learn', 'insight', 'pattern', 'lesson', 'retrospective', 'reflect',
    'understand', 'philosophy', 'principle', 'growth', 'evolution',
    'knowledge', 'teaching', 'mentor', 'transform',
  ],
};

const GUARDIAN_VAULT_MAP: Record<GuardianName, VaultType> = {
  Shinkami: 'strategic',
  Lyssandria: 'technical',
  Draconia: 'technical',
  Leyla: 'creative',
  Maylinn: 'creative',
  Alera: 'operational',
  Ino: 'operational',
  Lyria: 'horizon',
  Aiyami: 'wisdom',
  Elara: 'wisdom',
};

function classifyContent(content: string, guardian?: GuardianName): VaultType {
  // If a Guardian is provided, use their default vault
  if (guardian && guardian in GUARDIAN_VAULT_MAP) {
    return GUARDIAN_VAULT_MAP[guardian];
  }

  const lower = content.toLowerCase();
  const tokens = lower.split(/\s+/);
  const scores: Record<string, number> = {};

  for (const [vault, keywords] of Object.entries(VAULT_KEYWORDS)) {
    let score = 0;
    for (const keyword of keywords) {
      for (const token of tokens) {
        if (token.includes(keyword)) {
          score++;
        }
      }
    }
    scores[vault] = score;
  }

  let bestVault: VaultType = 'operational'; // Safe default
  let bestScore = 0;

  for (const [vault, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestVault = vault as VaultType;
    }
  }

  return bestVault;
}

// ---------------------------------------------------------------------------
// Built-in File Backend
// ---------------------------------------------------------------------------

interface StorageData {
  entries: Record<string, VaultEntry>;
}

class FileBackend {
  private readonly storagePath: string;
  private data: Map<VaultType, Map<string, VaultEntry>> = new Map();

  constructor(storagePath: string) {
    this.storagePath = storagePath;
  }

  async initialize(): Promise<void> {
    const vaultsDir = join(this.storagePath, 'vaults');
    if (!existsSync(vaultsDir)) {
      mkdirSync(vaultsDir, { recursive: true });
    }

    for (const vault of ALL_VAULTS) {
      const filePath = join(vaultsDir, `${vault}.json`);
      const map = new Map<string, VaultEntry>();

      if (existsSync(filePath)) {
        try {
          const raw = readFileSync(filePath, 'utf-8');
          const parsed: StorageData = JSON.parse(raw);
          for (const [id, entry] of Object.entries(parsed.entries)) {
            map.set(id, entry);
          }
        } catch {
          // Corrupted file — start fresh for this vault
        }
      }

      this.data.set(vault, map);
    }
  }

  async store(entry: VaultEntry): Promise<void> {
    const vaultMap = this.getVaultMap(entry.vault);
    vaultMap.set(entry.id, entry);
    await this.persist(entry.vault);
  }

  async get(id: string): Promise<VaultEntry | undefined> {
    for (const vaultMap of this.data.values()) {
      const entry = vaultMap.get(id);
      if (entry) return entry;
    }
    return undefined;
  }

  async remove(id: string): Promise<boolean> {
    for (const [vault, vaultMap] of this.data.entries()) {
      if (vaultMap.has(id)) {
        vaultMap.delete(id);
        await this.persist(vault);
        return true;
      }
    }
    return false;
  }

  async search(
    query: string,
    vault?: VaultType,
    limit = 20,
  ): Promise<Array<{ entry: VaultEntry; score: number }>> {
    const queryWords = query
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 1);

    if (queryWords.length === 0) return [];

    const results: Array<{ entry: VaultEntry; score: number }> = [];
    const vaults = vault ? [vault] : ALL_VAULTS;

    for (const v of vaults) {
      const vaultMap = this.data.get(v);
      if (!vaultMap) continue;

      for (const entry of vaultMap.values()) {
        // Skip expired entries
        if (entry.expiresAt && entry.expiresAt < Date.now()) continue;

        const searchText =
          `${entry.content} ${entry.tags.join(' ')}`.toLowerCase();
        let score = 0;

        for (const word of queryWords) {
          if (searchText.includes(word)) {
            score++;
            // Bonus for exact word boundary match
            const regex = new RegExp(`\\b${escapeRegex(word)}\\b`);
            if (regex.test(searchText)) {
              score += 0.5;
            }
          }
        }

        if (score > 0) {
          // Normalize score by query word count
          const normalizedScore = score / (queryWords.length * 1.5);
          results.push({ entry, score: Math.min(normalizedScore, 1) });
        }
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, limit);
  }

  async list(
    vault?: VaultType,
    limit = 100,
  ): Promise<VaultEntry[]> {
    const entries: VaultEntry[] = [];
    const vaults = vault ? [vault] : ALL_VAULTS;

    for (const v of vaults) {
      const vaultMap = this.data.get(v);
      if (!vaultMap) continue;
      for (const entry of vaultMap.values()) {
        // Skip expired entries
        if (entry.expiresAt && entry.expiresAt < Date.now()) continue;
        entries.push(entry);
      }
    }

    entries.sort((a, b) => b.createdAt - a.createdAt);
    return entries.slice(0, limit);
  }

  async count(vault?: VaultType): Promise<number> {
    if (vault) {
      const vaultMap = this.data.get(vault);
      if (!vaultMap) return 0;
      let live = 0;
      for (const entry of vaultMap.values()) {
        if (!entry.expiresAt || entry.expiresAt >= Date.now()) live++;
      }
      return live;
    }

    let total = 0;
    for (const vaultMap of this.data.values()) {
      for (const entry of vaultMap.values()) {
        if (!entry.expiresAt || entry.expiresAt >= Date.now()) total++;
      }
    }
    return total;
  }

  async clear(vault?: VaultType): Promise<void> {
    if (vault) {
      const vaultMap = this.data.get(vault);
      if (vaultMap) {
        vaultMap.clear();
        await this.persist(vault);
      }
    } else {
      for (const v of ALL_VAULTS) {
        if (v === 'horizon') continue; // Never clear horizon
        const vaultMap = this.data.get(v);
        if (vaultMap) {
          vaultMap.clear();
          await this.persist(v);
        }
      }
    }
  }

  async getStats(vault: VaultType): Promise<VaultStats> {
    const vaultMap = this.data.get(vault) ?? new Map<string, VaultEntry>();
    const tagCounts = new Map<string, number>();
    const guardianCounts: Partial<Record<GuardianName, number>> = {};
    let oldest = Infinity;
    let newest = 0;
    let liveCount = 0;

    for (const entry of vaultMap.values()) {
      if (entry.expiresAt && entry.expiresAt < Date.now()) continue;
      liveCount++;

      for (const tag of entry.tags) {
        tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
      }
      if (entry.guardian) {
        guardianCounts[entry.guardian] =
          (guardianCounts[entry.guardian] ?? 0) + 1;
      }
      if (entry.createdAt < oldest) oldest = entry.createdAt;
      if (entry.createdAt > newest) newest = entry.createdAt;
    }

    // Top 10 tags
    const topTags = [...tagCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));

    return {
      vault,
      count: liveCount,
      topTags,
      guardianDistribution: guardianCounts,
      oldestEntry: oldest === Infinity ? undefined : oldest,
      newestEntry: newest === 0 ? undefined : newest,
    };
  }

  findVaultForEntry(id: string): VaultType | undefined {
    for (const [vault, vaultMap] of this.data.entries()) {
      if (vaultMap.has(id)) return vault;
    }
    return undefined;
  }

  private getVaultMap(vault: VaultType): Map<string, VaultEntry> {
    let vaultMap = this.data.get(vault);
    if (!vaultMap) {
      vaultMap = new Map();
      this.data.set(vault, vaultMap);
    }
    return vaultMap;
  }

  private async persist(vault: VaultType): Promise<void> {
    const vaultsDir = join(this.storagePath, 'vaults');
    if (!existsSync(vaultsDir)) {
      mkdirSync(vaultsDir, { recursive: true });
    }

    const vaultMap = this.data.get(vault);
    if (!vaultMap) return;

    const entries: Record<string, VaultEntry> = {};
    for (const [id, entry] of vaultMap.entries()) {
      entries[id] = entry;
    }

    const filePath = join(vaultsDir, `${vault}.json`);
    writeFileSync(
      filePath,
      JSON.stringify({ entries } satisfies StorageData, null, 2),
      'utf-8',
    );
  }
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function generateId(): string {
  const random = Math.random().toString(36).slice(2, 8);
  return `vault_${Date.now()}_${random}`;
}

// ---------------------------------------------------------------------------
// VaultManager
// ---------------------------------------------------------------------------

export class VaultManager {
  private backend: FileBackend;
  private horizon: HorizonLedger;
  private config: Required<MemorySystemConfig>;
  private initialized = false;

  constructor(config?: Partial<MemorySystemConfig>) {
    this.config = {
      storagePath: config?.storagePath ?? join(process.cwd(), '.arcanea', 'memory'),
      backend: config?.backend ?? 'file',
      defaultConfidence: config?.defaultConfidence ?? 'medium',
      enableAutoClassification: config?.enableAutoClassification ?? true,
      maxEntriesPerVault: config?.maxEntriesPerVault ?? 10_000,
      horizonAuthor: config?.horizonAuthor ?? 'arcanea',
      enableHorizonExport: config?.enableHorizonExport ?? false,
    };

    this.backend = new FileBackend(this.config.storagePath);
    this.horizon = new HorizonLedger(this.config.storagePath);
  }

  // -------------------------------------------------------------------------
  // Lifecycle
  // -------------------------------------------------------------------------

  async initialize(): Promise<void> {
    if (this.initialized) return;

    await this.backend.initialize();
    await this.horizon.initialize();
    this.initialized = true;
  }

  // -------------------------------------------------------------------------
  // Core API
  // -------------------------------------------------------------------------

  /**
   * Remember something -- store a new memory entry.
   * Auto-classifies into the appropriate vault if vault is not specified.
   */
  async remember(input: VaultEntryInput): Promise<VaultEntry> {
    this.ensureInitialized();

    if (!input.content || !input.content.trim()) {
      throw new Error('Cannot remember empty content.');
    }

    // 1. Determine vault
    let vault: VaultType;
    if (input.vault) {
      vault = input.vault;
    } else if (this.config.enableAutoClassification) {
      vault = classifyContent(input.content, input.guardian);
    } else {
      vault = 'operational'; // Safe fallback
    }

    // 2. Build entry
    const now = Date.now();
    const entry: VaultEntry = {
      id: generateId(),
      content: input.content.trim(),
      vault,
      tags: input.tags ?? [],
      confidence: input.confidence ?? this.config.defaultConfidence,
      guardian: input.guardian,
      metadata: input.metadata ?? {},
      createdAt: now,
      updatedAt: now,
      expiresAt: input.ttl ? now + input.ttl * 1000 : undefined,
      source: input.source,
    };

    // 3. Enforce vault entry limit
    const currentCount = await this.backend.count(vault);
    if (currentCount >= this.config.maxEntriesPerVault) {
      throw new Error(
        `Vault "${vault}" has reached its maximum capacity of ${this.config.maxEntriesPerVault} entries. ` +
          'Remove old entries or increase maxEntriesPerVault.',
      );
    }

    // 4. Store via backend
    await this.backend.store(entry);

    // 5. If horizon vault, also write to Horizon Ledger
    if (vault === 'horizon') {
      await this.horizon.append(
        entry.content,
        entry.source ?? 'memory-system',
        input.guardian ?? this.config.horizonAuthor,
        !!input.guardian, // co-authored if Guardian is specified
        entry.tags,
      );
    }

    return entry;
  }

  /**
   * Recall memories -- search across vaults.
   */
  async recall(options: VaultSearchOptions): Promise<VaultSearchResult[]> {
    this.ensureInitialized();

    const limit = options.limit ?? 20;
    const results = await this.backend.search(
      options.query,
      options.vault,
      limit * 3, // Over-fetch to allow for filtering
    );

    // Apply additional filters
    let filtered = results;

    // Guardian filter
    if (options.guardian) {
      filtered = filtered.filter(
        (r) => r.entry.guardian === options.guardian,
      );
    }

    // Tag filter (entry must have ALL specified tags)
    if (options.tags && options.tags.length > 0) {
      filtered = filtered.filter((r) =>
        options.tags!.every((tag) => r.entry.tags.includes(tag)),
      );
    }

    // Min confidence filter
    if (options.minConfidence) {
      const minScore = CONFIDENCE_SCORE[options.minConfidence];
      filtered = filtered.filter(
        (r) => CONFIDENCE_SCORE[r.entry.confidence] >= minScore,
      );
    }

    // Sort
    const sortBy = options.sortBy ?? 'relevance';
    if (sortBy === 'recency') {
      filtered.sort((a, b) => b.entry.createdAt - a.entry.createdAt);
    } else if (sortBy === 'confidence') {
      filtered.sort(
        (a, b) =>
          CONFIDENCE_SCORE[b.entry.confidence] -
          CONFIDENCE_SCORE[a.entry.confidence],
      );
    }
    // 'relevance' is the default sort from backend.search

    return filtered.slice(0, limit);
  }

  /**
   * Get recent entries from a specific vault or all vaults.
   */
  async getRecent(vault?: VaultType, limit = 20): Promise<VaultEntry[]> {
    this.ensureInitialized();
    return this.backend.list(vault, limit);
  }

  /**
   * Forget a memory -- remove by ID.
   * THROWS if entry is in Horizon vault (append-only).
   */
  async forget(id: string): Promise<boolean> {
    this.ensureInitialized();

    const owningVault = this.backend.findVaultForEntry(id);
    if (owningVault === 'horizon') {
      throw new Error(
        'Cannot forget Horizon vault entries. The Horizon is append-only -- ' +
          'wishes for the future are permanent.',
      );
    }

    return this.backend.remove(id);
  }

  /**
   * Get memory system statistics.
   */
  async getStats(): Promise<MemorySystemStats> {
    this.ensureInitialized();

    const vaultStats: VaultStats[] = [];
    let totalEntries = 0;

    for (const vault of ALL_VAULTS) {
      const stats = await this.backend.getStats(vault);
      vaultStats.push(stats);
      totalEntries += stats.count;
    }

    return {
      totalEntries,
      vaults: vaultStats,
      horizonCount: this.horizon.getCount(),
      storagePath: this.config.storagePath,
    };
  }

  /**
   * Export all Horizon vault entries in dataset format.
   */
  async exportHorizon(): Promise<HorizonEntry[]> {
    this.ensureInitialized();
    return this.horizon.getAll();
  }

  /**
   * Get entries by Guardian namespace.
   */
  async getByGuardian(
    guardian: GuardianName,
    limit = 50,
  ): Promise<VaultEntry[]> {
    this.ensureInitialized();

    const all = await this.backend.list(undefined, Infinity);
    return all
      .filter((entry) => entry.guardian === guardian)
      .slice(0, limit);
  }

  /**
   * Classify content without storing it.
   * Useful for previewing which vault content would be routed to.
   */
  classify(content: string, guardian?: GuardianName): VaultType {
    return classifyContent(content, guardian);
  }

  /**
   * Clear a specific vault or all vaults.
   * Cannot clear Horizon vault.
   */
  async clear(vault?: VaultType): Promise<void> {
    this.ensureInitialized();

    if (vault === 'horizon') {
      throw new Error(
        'Cannot clear Horizon vault -- it is append-only. ' +
          'The wishes of creators are permanent.',
      );
    }

    await this.backend.clear(vault);
  }

  /**
   * Get entry count for a specific vault or all vaults.
   */
  async count(vault?: VaultType): Promise<number> {
    this.ensureInitialized();
    return this.backend.count(vault);
  }

  /**
   * Get the underlying HorizonLedger for direct access.
   */
  getHorizon(): HorizonLedger {
    return this.horizon;
  }

  /**
   * Get the resolved configuration.
   */
  getConfig(): Readonly<Required<MemorySystemConfig>> {
    return this.config;
  }

  // -------------------------------------------------------------------------
  // Internal
  // -------------------------------------------------------------------------

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error(
        'VaultManager not initialized. Call initialize() first.',
      );
    }
  }
}
