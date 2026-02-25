/**
 * ArcaneMD File-Based Storage Backend
 *
 * Stores each vault entry as an individual .md file with YAML frontmatter.
 * Maintains a per-vault index.json and an in-memory word index for fast search.
 *
 * Directory layout:
 *   {storagePath}/
 *     vaults/
 *       {vault-type}/
 *         {id}.md          (one file per entry)
 *         index.json       (vault-level entry index)
 *     horizon/
 *       entries.jsonl      (append-only JSON Lines)
 *
 * ArcaneMD frontmatter fields:
 *   id, vault, guardian, gate, frequency, tags, confidence,
 *   source, created, updated, expires
 */

import {
  readFile,
  writeFile,
  mkdir,
  appendFile,
  unlink,
  readdir,
  access,
} from 'node:fs/promises';
import { join } from 'node:path';
import type {
  StorageBackend,
  VaultEntry,
  VaultType,
  VaultSearchOptions,
  VaultSearchResult,
  ConfidenceLevel,
  GuardianName,
} from '../types.js';
import { VAULT_TYPES, CONFIDENCE_RANK } from '../types.js';

// ── Guardian → Frequency Map ─────────────────────────────

const GUARDIAN_FREQUENCY: Record<GuardianName, number> = {
  Lyssandria: 174,
  Leyla: 285,
  Draconia: 396,
  Maylinn: 417,
  Alera: 528,
  Lyria: 639,
  Aiyami: 741,
  Elara: 852,
  Ino: 963,
  Shinkami: 1111,
};

// ── Stop Words ───────────────────────────────────────────

const STOPWORDS = new Set([
  'the', 'a', 'an', 'is', 'in', 'of', 'to', 'and', 'or', 'for',
  'with', 'at', 'by', 'it', 'be', 'as', 'on', 'if', 'no', 'so',
]);

// ── YAML Frontmatter Helpers ─────────────────────────────

function parseFrontmatter(raw: string): { meta: Record<string, unknown>; body: string } {
  if (!raw.startsWith('---\n')) return { meta: {}, body: raw };
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return { meta: {}, body: raw };

  const yaml = raw.slice(4, end);
  const body = raw.slice(end + 5).trim();
  const meta: Record<string, unknown> = {};

  for (const line of yaml.split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const rawValue = line.slice(colon + 1).trim();

    if (rawValue === 'null' || rawValue === '') {
      meta[key] = null;
    } else if (rawValue.startsWith('[')) {
      // Array: [item1, item2, item3]
      const inner = rawValue.slice(1, -1);
      meta[key] = inner
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (rawValue === 'true') {
      meta[key] = true;
    } else if (rawValue === 'false') {
      meta[key] = false;
    } else if (!isNaN(Number(rawValue)) && rawValue !== '') {
      meta[key] = Number(rawValue);
    } else {
      meta[key] = rawValue;
    }
  }

  return { meta, body };
}

function serializeFrontmatter(meta: Record<string, unknown>, body: string): string {
  const lines = Object.entries(meta).map(([k, v]) => {
    if (v === null || v === undefined) return `${k}: null`;
    if (Array.isArray(v)) return `${k}: [${v.join(', ')}]`;
    return `${k}: ${String(v)}`;
  });
  return `---\n${lines.join('\n')}\n---\n\n${body}`;
}

// ── Entry ↔ ArcaneMD Serialization ───────────────────────

function entryToMarkdown(entry: VaultEntry): string {
  const frequency =
    entry.guardian && entry.guardian in GUARDIAN_FREQUENCY
      ? GUARDIAN_FREQUENCY[entry.guardian as GuardianName]
      : null;

  const meta: Record<string, unknown> = {
    id: entry.id,
    vault: entry.vault,
    guardian: entry.guardian ?? null,
    gate: entry.gate ?? null,
    frequency,
    tags: entry.tags,
    confidence: entry.confidence,
    source: entry.source ?? null,
    created: entry.createdAt,
    updated: entry.updatedAt,
    expires: entry.expiresAt ?? null,
  };

  return serializeFrontmatter(meta, entry.content);
}

function markdownToEntry(raw: string): VaultEntry | null {
  const { meta, body } = parseFrontmatter(raw);

  const id = meta['id'];
  const vault = meta['vault'];
  const confidence = meta['confidence'];

  if (typeof id !== 'string' || typeof vault !== 'string' || typeof confidence !== 'string') {
    return null;
  }

  const tags = Array.isArray(meta['tags'])
    ? (meta['tags'] as string[])
    : typeof meta['tags'] === 'string' && meta['tags']
    ? [meta['tags']]
    : [];

  const entry: VaultEntry = {
    id,
    vault: vault as VaultType,
    content: body,
    tags,
    confidence: confidence as ConfidenceLevel,
    createdAt: typeof meta['created'] === 'string' ? meta['created'] : new Date().toISOString(),
    updatedAt: typeof meta['updated'] === 'string' ? meta['updated'] : new Date().toISOString(),
  };

  if (meta['guardian'] && typeof meta['guardian'] === 'string') {
    entry.guardian = meta['guardian'] as GuardianName;
  }
  if (meta['gate'] && typeof meta['gate'] === 'string') {
    entry.gate = meta['gate'] as import('../types.js').GateName;
  }
  if (meta['source'] && typeof meta['source'] === 'string') {
    entry.source = meta['source'];
  }
  if (meta['expires'] && typeof meta['expires'] === 'string') {
    entry.expiresAt = meta['expires'];
  }

  return entry;
}

// ── Vault Index ──────────────────────────────────────────

interface VaultIndexEntry {
  id: string;
  vault: VaultType;
  createdAt: string;
  tags: string[];
  summary: string;
}

interface VaultIndex {
  entries: VaultIndexEntry[];
}

// ── FileBackend ──────────────────────────────────────────

export class FileBackend implements StorageBackend {
  private storagePath: string;
  private initialized = false;

  // In-memory word index: word → Set<entryId>
  private wordIndex = new Map<string, Set<string>>();
  // Hot cache: last 100 accessed entries
  private entryCache = new Map<string, VaultEntry>();
  private readonly CACHE_SIZE = 100;

  constructor(storagePath: string) {
    this.storagePath = storagePath;
  }

  // ── Lifecycle ───────────────────────────────────────────

  async initialize(): Promise<void> {
    if (this.initialized) return;

    // Create directory structure for all vault types
    for (const vaultType of VAULT_TYPES) {
      await mkdir(this.vaultDir(vaultType), { recursive: true });
    }
    await mkdir(join(this.storagePath, 'horizon'), { recursive: true });

    // Build in-memory word index from existing .md files
    await this.buildWordIndex();

    this.initialized = true;
  }

  // ── StorageBackend Implementation ─────────────────────

  async store(entry: VaultEntry): Promise<void> {
    this.ensureInitialized();

    const filePath = this.entryPath(entry.vault, entry.id);
    const content = entryToMarkdown(entry);
    await writeFile(filePath, content, 'utf-8');

    // Update word index
    const text = this.buildIndexText(entry);
    this.indexEntry(entry.id, text);

    // Update vault index.json
    await this.updateVaultIndex(entry.vault, entry);

    // Update hot cache
    this.cacheEntry(entry);
  }

  async retrieve(id: string): Promise<VaultEntry | null> {
    this.ensureInitialized();

    // Check hot cache first
    const cached = this.entryCache.get(id);
    if (cached) return cached;

    // Search each vault directory for the file
    for (const vaultType of VAULT_TYPES) {
      const filePath = this.entryPath(vaultType, id);
      try {
        await access(filePath);
        const raw = await readFile(filePath, 'utf-8');
        const entry = markdownToEntry(raw);
        if (entry) {
          this.cacheEntry(entry);
          return entry;
        }
      } catch {
        // File does not exist in this vault — continue
      }
    }

    return null;
  }

  async search(options: VaultSearchOptions): Promise<VaultSearchResult[]> {
    this.ensureInitialized();

    const {
      query,
      vaults,
      guardian,
      tags,
      minConfidence,
      limit = 20,
      offset = 0,
      sortBy = 'relevance',
    } = options;

    // Tokenize query and find candidate IDs
    const queryTokens = this.tokenize(query);
    if (queryTokens.length === 0) return [];

    // Gather candidate IDs with match counts
    const matchCounts = new Map<string, number>();
    for (const token of queryTokens) {
      // Exact match (weight 2)
      const exactIds = this.wordIndex.get(token);
      if (exactIds) {
        for (const id of exactIds) {
          matchCounts.set(id, (matchCounts.get(id) ?? 0) + 2);
        }
      }
      // Prefix match for tokens >= 3 chars (weight 1)
      if (token.length >= 3) {
        for (const [word, ids] of this.wordIndex) {
          if (word !== token && word.startsWith(token)) {
            for (const id of ids) {
              matchCounts.set(id, (matchCounts.get(id) ?? 0) + 1);
            }
          }
        }
      }
    }

    if (matchCounts.size === 0) return [];

    // Load candidates and apply filters
    const results: VaultSearchResult[] = [];
    const now = Date.now();
    const maxScore = queryTokens.length * 2;

    for (const [id, rawScore] of matchCounts) {
      const entry = await this.retrieve(id);
      if (!entry) continue;

      // Vault filter
      if (vaults && vaults.length > 0 && !vaults.includes(entry.vault)) continue;

      // Guardian filter
      if (guardian && entry.guardian !== guardian) continue;

      // Tags filter (AND logic)
      if (tags && tags.length > 0) {
        if (!tags.every((t) => entry.tags.includes(t))) continue;
      }

      // Confidence filter
      if (minConfidence) {
        if (CONFIDENCE_RANK[entry.confidence] < CONFIDENCE_RANK[minConfidence]) continue;
      }

      // Expiration filter
      if (entry.expiresAt && new Date(entry.expiresAt).getTime() < now) continue;

      // Score: word matches + recency bonus (0–0.1) + confidence bonus (0–0.1)
      const wordScore = maxScore > 0 ? rawScore / maxScore : 0;
      const ageMs = now - new Date(entry.createdAt).getTime();
      const recencyBonus = Math.max(0, 0.1 - ageMs / (1000 * 60 * 60 * 24 * 30 * 0.1));
      const confidenceBonus = CONFIDENCE_RANK[entry.confidence] * 0.033;
      const score = Math.min(1, wordScore + recencyBonus + confidenceBonus);

      // Matched terms for highlighting
      const matchedTerms = queryTokens.filter((t) => {
        const ids = this.wordIndex.get(t);
        if (ids?.has(id)) return true;
        if (t.length >= 3) {
          for (const [w, wIds] of this.wordIndex) {
            if (w.startsWith(t) && wIds.has(id)) return true;
          }
        }
        return false;
      });

      results.push({ entry, score, matchedTerms });
    }

    // Sort
    if (sortBy === 'relevance') {
      results.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'recency') {
      results.sort(
        (a, b) =>
          new Date(b.entry.updatedAt).getTime() - new Date(a.entry.updatedAt).getTime(),
      );
    } else if (sortBy === 'confidence') {
      results.sort(
        (a, b) =>
          CONFIDENCE_RANK[b.entry.confidence] - CONFIDENCE_RANK[a.entry.confidence],
      );
    }

    return results.slice(offset, offset + limit);
  }

  async list(vault: VaultType, limit?: number, offset: number = 0): Promise<VaultEntry[]> {
    this.ensureInitialized();

    const index = await this.readVaultIndex(vault);
    const now = Date.now();

    // Resolve entries from index, sorted by createdAt desc
    const sorted = index.entries.slice().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const results: VaultEntry[] = [];
    for (const item of sorted) {
      const entry = await this.retrieve(item.id);
      if (!entry) continue;
      if (entry.expiresAt && new Date(entry.expiresAt).getTime() < now) continue;
      results.push(entry);
    }

    const sliceEnd = limit !== undefined ? offset + limit : undefined;
    return results.slice(offset, sliceEnd);
  }

  async remove(id: string): Promise<boolean> {
    this.ensureInitialized();

    // Horizon is append-only — no deletion
    for (const vaultType of VAULT_TYPES) {
      const filePath = this.entryPath(vaultType, id);
      try {
        await access(filePath);
        // Found the file — read it to remove from word index
        const raw = await readFile(filePath, 'utf-8');
        const entry = markdownToEntry(raw);
        if (entry) {
          if (vaultType === 'horizon') return false;
          const text = this.buildIndexText(entry);
          this.deindexEntry(id, text);
          this.entryCache.delete(id);
        }
        await unlink(filePath);
        await this.removeFromVaultIndex(vaultType, id);
        return true;
      } catch {
        // Not in this vault — continue
      }
    }

    return false;
  }

  async count(vault?: VaultType): Promise<number> {
    this.ensureInitialized();

    if (vault) {
      const index = await this.readVaultIndex(vault);
      return index.entries.length;
    }

    let total = 0;
    for (const vaultType of VAULT_TYPES) {
      const index = await this.readVaultIndex(vaultType);
      total += index.entries.length;
    }
    return total;
  }

  async clear(vault?: VaultType): Promise<void> {
    this.ensureInitialized();

    const targetVaults = vault ? [vault] : VAULT_TYPES.filter((v) => v !== 'horizon');

    for (const vaultType of targetVaults) {
      if (vaultType === 'horizon') continue; // Never clear horizon

      // Remove all .md files and clear word index entries
      const dir = this.vaultDir(vaultType);
      let files: string[] = [];
      try {
        files = await readdir(dir);
      } catch {
        // Directory may not exist yet
      }

      for (const file of files) {
        if (!file.endsWith('.md')) continue;
        const filePath = join(dir, file);
        try {
          const raw = await readFile(filePath, 'utf-8');
          const entry = markdownToEntry(raw);
          if (entry) {
            this.deindexEntry(entry.id, this.buildIndexText(entry));
            this.entryCache.delete(entry.id);
          }
          await unlink(filePath);
        } catch {
          // Ignore errors for individual files
        }
      }

      // Reset vault index
      await this.writeVaultIndex(vaultType, { entries: [] });
    }
  }

  // ── Horizon-Specific ──────────────────────────────────

  /**
   * Append a line to the horizon JSONL file.
   * Used by HorizonLedger for its append-only log.
   */
  async appendHorizonLine(jsonLine: string): Promise<void> {
    const horizonPath = join(this.storagePath, 'horizon', 'entries.jsonl');
    await appendFile(horizonPath, jsonLine + '\n', 'utf-8');
  }

  /**
   * Read all horizon JSONL lines.
   */
  async readHorizonLines(): Promise<string[]> {
    const horizonPath = join(this.storagePath, 'horizon', 'entries.jsonl');
    try {
      const content = await readFile(horizonPath, 'utf-8');
      return content.split('\n').filter((line) => line.trim().length > 0);
    } catch {
      return [];
    }
  }

  // ── Internal: Paths ───────────────────────────────────

  private vaultDir(vault: VaultType): string {
    return join(this.storagePath, 'vaults', vault);
  }

  private entryPath(vault: VaultType, id: string): string {
    return join(this.vaultDir(vault), `${id}.md`);
  }

  // ── Internal: Vault Index ─────────────────────────────

  private vaultIndexPath(vault: VaultType): string {
    return join(this.vaultDir(vault), 'index.json');
  }

  private async readVaultIndex(vault: VaultType): Promise<VaultIndex> {
    try {
      const raw = await readFile(this.vaultIndexPath(vault), 'utf-8');
      return JSON.parse(raw) as VaultIndex;
    } catch {
      return { entries: [] };
    }
  }

  private async writeVaultIndex(vault: VaultType, index: VaultIndex): Promise<void> {
    await writeFile(this.vaultIndexPath(vault), JSON.stringify(index, null, 2), 'utf-8');
  }

  private async updateVaultIndex(vault: VaultType, entry: VaultEntry): Promise<void> {
    const index = await this.readVaultIndex(vault);
    const existing = index.entries.findIndex((e) => e.id === entry.id);
    const item: VaultIndexEntry = {
      id: entry.id,
      vault: entry.vault,
      createdAt: entry.createdAt,
      tags: entry.tags,
      summary: entry.summary ?? entry.content.slice(0, 120).replace(/\n/g, ' '),
    };

    if (existing >= 0) {
      index.entries[existing] = item;
    } else {
      index.entries.push(item);
    }

    await this.writeVaultIndex(vault, index);
  }

  private async removeFromVaultIndex(vault: VaultType, id: string): Promise<void> {
    const index = await this.readVaultIndex(vault);
    index.entries = index.entries.filter((e) => e.id !== id);
    await this.writeVaultIndex(vault, index);
  }

  // ── Internal: Word Index ──────────────────────────────

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 2 && !STOPWORDS.has(w));
  }

  private buildIndexText(entry: VaultEntry): string {
    const parts = [entry.content];
    if (entry.summary) parts.push(entry.summary);
    if (entry.tags.length > 0) parts.push(entry.tags.join(' '));
    if (entry.source) parts.push(entry.source);
    if (entry.guardian) parts.push(entry.guardian);
    return parts.join(' ');
  }

  private indexEntry(id: string, text: string): void {
    for (const word of this.tokenize(text)) {
      let ids = this.wordIndex.get(word);
      if (!ids) {
        ids = new Set();
        this.wordIndex.set(word, ids);
      }
      ids.add(id);
    }
  }

  private deindexEntry(id: string, text: string): void {
    for (const word of this.tokenize(text)) {
      const ids = this.wordIndex.get(word);
      if (ids) {
        ids.delete(id);
        if (ids.size === 0) this.wordIndex.delete(word);
      }
    }
  }

  private async buildWordIndex(): Promise<void> {
    this.wordIndex.clear();
    for (const vaultType of VAULT_TYPES) {
      const dir = this.vaultDir(vaultType);
      let files: string[] = [];
      try {
        files = await readdir(dir);
      } catch {
        continue;
      }
      for (const file of files) {
        if (!file.endsWith('.md')) continue;
        try {
          const raw = await readFile(join(dir, file), 'utf-8');
          const entry = markdownToEntry(raw);
          if (entry) {
            this.indexEntry(entry.id, this.buildIndexText(entry));
          }
        } catch {
          // Skip unreadable files
        }
      }
    }
  }

  // ── Internal: Hot Cache ───────────────────────────────

  private cacheEntry(entry: VaultEntry): void {
    if (this.entryCache.size >= this.CACHE_SIZE) {
      // Evict oldest (first inserted) key
      const firstKey = this.entryCache.keys().next().value;
      if (firstKey !== undefined) this.entryCache.delete(firstKey);
    }
    this.entryCache.set(entry.id, entry);
  }

  // ── Internal: Guard ───────────────────────────────────

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error(
        'FileBackend not initialized. Call initialize() before using storage operations.',
      );
    }
  }
}
