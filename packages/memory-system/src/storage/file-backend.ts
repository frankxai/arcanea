/**
 * ArcaneMD File-Based Storage Backend
 *
 * One .md file per entry with YAML frontmatter.
 * Layout: {storagePath}/vaults/{vault}/{id}.md + index.json
 *         {storagePath}/horizon/entries.jsonl  (append-only)
 */

import { readFile, writeFile, mkdir, appendFile, unlink, readdir, access } from 'node:fs/promises';
import { join } from 'node:path';
import type {
  StorageBackend, VaultEntry, VaultType, VaultSearchOptions, VaultSearchResult,
  ConfidenceLevel, GuardianName,
} from '../types.js';
import { VAULT_TYPES, CONFIDENCE_RANK } from '../types.js';

// ── Guardian → Hz ────────────────────────────────────────
const GUARDIAN_HZ: Record<GuardianName, number> = {
  Lyssandria: 174, Leyla: 285, Draconia: 396, Maylinn: 417, Alera: 528,
  Lyria: 639, Aiyami: 741, Elara: 852, Ino: 963, Shinkami: 1111,
};

const STOPWORDS = new Set(['the','a','an','is','in','of','to','and','or','for','with','at','by','it','be','as','on','if','no','so']);

// ── YAML Frontmatter ─────────────────────────────────────
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
    const val = line.slice(colon + 1).trim();
    if (val === 'null' || val === '') meta[key] = null;
    else if (val.startsWith('['))
      meta[key] = val.slice(1, -1).split(',').map((s: string) => s.trim()).filter(Boolean);
    else if (val === 'true') meta[key] = true;
    else if (val === 'false') meta[key] = false;
    else if (val !== '' && !isNaN(Number(val))) meta[key] = Number(val);
    else meta[key] = val;
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

// ── Entry ↔ ArcaneMD ─────────────────────────────────────
function entryToMd(entry: VaultEntry): string {
  return serializeFrontmatter({
    id: entry.id, vault: entry.vault,
    guardian: entry.guardian ?? null, gate: entry.gate ?? null,
    frequency: entry.guardian ? (GUARDIAN_HZ[entry.guardian as GuardianName] ?? null) : null,
    tags: entry.tags, confidence: entry.confidence, source: entry.source ?? null,
    created: entry.createdAt, updated: entry.updatedAt, expires: entry.expiresAt ?? null,
  }, entry.content);
}

function mdToEntry(raw: string): VaultEntry | null {
  const { meta, body } = parseFrontmatter(raw);
  const id = meta['id'], vault = meta['vault'], confidence = meta['confidence'];
  if (typeof id !== 'string' || typeof vault !== 'string' || typeof confidence !== 'string') return null;
  const tags = Array.isArray(meta['tags']) ? (meta['tags'] as string[]) : [];
  const entry: VaultEntry = {
    id, vault: vault as VaultType, content: body, tags,
    confidence: confidence as ConfidenceLevel,
    createdAt: typeof meta['created'] === 'number' ? meta['created'] : (typeof meta['created'] === 'string' ? new Date(meta['created']).getTime() : Date.now()),
    updatedAt: typeof meta['updated'] === 'number' ? meta['updated'] : (typeof meta['updated'] === 'string' ? new Date(meta['updated']).getTime() : Date.now()),
  };
  if (meta['guardian'] && typeof meta['guardian'] === 'string')
    entry.guardian = meta['guardian'] as GuardianName;
  if (meta['gate'] && typeof meta['gate'] === 'string')
    entry.gate = meta['gate'] as import('../types.js').GateName;
  if (meta['source'] && typeof meta['source'] === 'string') entry.source = meta['source'];
  if (meta['expires']) entry.expiresAt = typeof meta['expires'] === 'number' ? meta['expires'] : new Date(meta['expires'] as string).getTime();
  return entry;
}

// ── Vault Index Types ────────────────────────────────────
interface IndexEntry { id: string; vault: VaultType; createdAt: number; tags: string[]; summary: string; }
interface VaultIndex { entries: IndexEntry[]; }

// ── FileBackend ──────────────────────────────────────────
export class FileBackend implements StorageBackend {
  private initialized = false;
  private wordIndex = new Map<string, Set<string>>();
  private entryCache = new Map<string, VaultEntry>();
  private readonly CACHE_MAX = 100;

  constructor(private storagePath: string) {}

  // ── Lifecycle ──────────────────────────────────────────
  async initialize(): Promise<void> {
    if (this.initialized) return;
    for (const v of VAULT_TYPES) await mkdir(this.vaultDir(v), { recursive: true });
    await mkdir(join(this.storagePath, 'horizon'), { recursive: true });
    await this.rebuildWordIndex();
    this.initialized = true;
  }

  // ── Store ──────────────────────────────────────────────
  async store(entry: VaultEntry): Promise<void> {
    this.check();
    await writeFile(this.entryPath(entry.vault, entry.id), entryToMd(entry), 'utf-8');
    this.indexAdd(entry.id, this.indexText(entry));
    await this.upsertVaultIndex(entry.vault, entry);
    this.cacheSet(entry);
  }

  // ── Retrieve ───────────────────────────────────────────
  async retrieve(id: string): Promise<VaultEntry | null> {
    this.check();
    const cached = this.entryCache.get(id);
    if (cached) return cached;
    for (const v of VAULT_TYPES) {
      try {
        await access(this.entryPath(v, id));
        const entry = mdToEntry(await readFile(this.entryPath(v, id), 'utf-8'));
        if (entry) { this.cacheSet(entry); return entry; }
      } catch { /* not in this vault */ }
    }
    return null;
  }

  // ── Search ─────────────────────────────────────────────
  async search(options: VaultSearchOptions): Promise<VaultSearchResult[]> {
    this.check();
    const { query, vaults, guardian, tags, minConfidence, limit = 20, offset = 0, sortBy = 'relevance' } = options;
    const tokens = this.tokenize(query);
    if (!tokens.length) return [];

    // Score candidates from word index
    const scores = new Map<string, number>();
    for (const tok of tokens) {
      const exact = this.wordIndex.get(tok);
      if (exact) for (const id of exact) scores.set(id, (scores.get(id) ?? 0) + 2);
      if (tok.length >= 3) {
        for (const [w, ids] of this.wordIndex) {
          if (w !== tok && w.startsWith(tok))
            for (const id of ids) scores.set(id, (scores.get(id) ?? 0) + 1);
        }
      }
    }
    if (!scores.size) return [];

    const now = Date.now();
    const maxRaw = tokens.length * 2;
    const results: VaultSearchResult[] = [];

    for (const [id, raw] of scores) {
      const entry = await this.retrieve(id);
      if (!entry) continue;
      if (vaults?.length && !vaults.includes(entry.vault)) continue;
      if (guardian && entry.guardian !== guardian) continue;
      if (tags?.length && !tags.every((t) => entry.tags.includes(t))) continue;
      if (minConfidence && CONFIDENCE_RANK[entry.confidence] < CONFIDENCE_RANK[minConfidence]) continue;
      if (entry.expiresAt && new Date(entry.expiresAt).getTime() < now) continue;

      const wordScore = maxRaw > 0 ? raw / maxRaw : 0;
      const recencyBonus = Math.max(0, 0.1 - (now - new Date(entry.createdAt).getTime()) / (2_592_000_000));
      const confBonus = CONFIDENCE_RANK[entry.confidence] * 0.033;
      const score = Math.min(1, wordScore + recencyBonus + confBonus);
      const matchedTerms = tokens.filter((t) => {
        if (this.wordIndex.get(t)?.has(id)) return true;
        if (t.length >= 3) for (const [w, s] of this.wordIndex) if (w.startsWith(t) && s.has(id)) return true;
        return false;
      });
      results.push({ entry, score, matchedTerms });
    }

    if (sortBy === 'recency') results.sort((a, b) => new Date(b.entry.updatedAt).getTime() - new Date(a.entry.updatedAt).getTime());
    else if (sortBy === 'confidence') results.sort((a, b) => CONFIDENCE_RANK[b.entry.confidence] - CONFIDENCE_RANK[a.entry.confidence]);
    else results.sort((a, b) => b.score - a.score);

    return results.slice(offset, offset + limit);
  }

  // ── List ───────────────────────────────────────────────
  async list(vault: VaultType, limit?: number, offset = 0): Promise<VaultEntry[]> {
    this.check();
    const index = await this.readVaultIndex(vault);
    const now = Date.now();
    const sorted = index.entries.slice().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    const out: VaultEntry[] = [];
    for (const item of sorted) {
      const entry = await this.retrieve(item.id);
      if (!entry) continue;
      if (entry.expiresAt && new Date(entry.expiresAt).getTime() < now) continue;
      out.push(entry);
    }
    return out.slice(offset, limit !== undefined ? offset + limit : undefined);
  }

  // ── Remove ─────────────────────────────────────────────
  async remove(id: string): Promise<boolean> {
    this.check();
    for (const v of VAULT_TYPES) {
      const path = this.entryPath(v, id);
      try {
        await access(path);
        if (v === 'horizon') return false; // append-only
        const entry = mdToEntry(await readFile(path, 'utf-8'));
        if (entry) { this.indexRemove(id, this.indexText(entry)); this.entryCache.delete(id); }
        await unlink(path);
        await this.removeFromVaultIndex(v, id);
        return true;
      } catch { /* not in this vault */ }
    }
    return false;
  }

  // ── Count ──────────────────────────────────────────────
  async count(vault?: VaultType): Promise<number> {
    this.check();
    if (vault) return (await this.readVaultIndex(vault)).entries.length;
    let total = 0;
    for (const v of VAULT_TYPES) total += (await this.readVaultIndex(v)).entries.length;
    return total;
  }

  // ── Clear ──────────────────────────────────────────────
  async clear(vault?: VaultType): Promise<void> {
    this.check();
    const targets = vault ? [vault] : VAULT_TYPES.filter((v) => v !== 'horizon');
    for (const v of targets) {
      if (v === 'horizon') continue;
      let files: string[] = [];
      try { files = await readdir(this.vaultDir(v)); } catch { continue; }
      for (const file of files) {
        if (!file.endsWith('.md')) continue;
        try {
          const entry = mdToEntry(await readFile(join(this.vaultDir(v), file), 'utf-8'));
          if (entry) { this.indexRemove(entry.id, this.indexText(entry)); this.entryCache.delete(entry.id); }
          await unlink(join(this.vaultDir(v), file));
        } catch { /* skip */ }
      }
      await this.writeVaultIndex(v, { entries: [] });
    }
  }

  // ── Horizon extras (public API) ────────────────────────
  async appendHorizonLine(jsonLine: string): Promise<void> {
    await appendFile(join(this.storagePath, 'horizon', 'entries.jsonl'), jsonLine + '\n', 'utf-8');
  }

  async readHorizonLines(): Promise<string[]> {
    try {
      const raw = await readFile(join(this.storagePath, 'horizon', 'entries.jsonl'), 'utf-8');
      return raw.split('\n').filter((l: string) => l.trim().length > 0);
    } catch { return []; }
  }

  // ── Internal: paths ───────────────────────────────────
  private vaultDir(v: VaultType) { return join(this.storagePath, 'vaults', v); }
  private entryPath(v: VaultType, id: string) { return join(this.vaultDir(v), `${id}.md`); }

  // ── Internal: vault index ─────────────────────────────
  private indexJsonPath(v: VaultType) { return join(this.vaultDir(v), 'index.json'); }

  private async readVaultIndex(v: VaultType): Promise<VaultIndex> {
    try { return JSON.parse(await readFile(this.indexJsonPath(v), 'utf-8')) as VaultIndex; }
    catch { return { entries: [] }; }
  }

  private async writeVaultIndex(v: VaultType, idx: VaultIndex) {
    await writeFile(this.indexJsonPath(v), JSON.stringify(idx, null, 2), 'utf-8');
  }

  private async upsertVaultIndex(v: VaultType, entry: VaultEntry) {
    const idx = await this.readVaultIndex(v);
    const pos = idx.entries.findIndex((e) => e.id === entry.id);
    const item: IndexEntry = {
      id: entry.id, vault: v, createdAt: entry.createdAt, tags: entry.tags,
      summary: entry.summary ?? entry.content.slice(0, 120).replace(/\n/g, ' '),
    };
    if (pos >= 0) idx.entries[pos] = item; else idx.entries.push(item);
    await this.writeVaultIndex(v, idx);
  }

  private async removeFromVaultIndex(v: VaultType, id: string) {
    const idx = await this.readVaultIndex(v);
    idx.entries = idx.entries.filter((e) => e.id !== id);
    await this.writeVaultIndex(v, idx);
  }

  // ── Internal: word index ──────────────────────────────
  private tokenize(text: string): string[] {
    return text.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/)
      .filter((w: string) => w.length >= 2 && !STOPWORDS.has(w));
  }

  private indexText(entry: VaultEntry): string {
    return [entry.content, entry.summary, entry.tags.join(' '), entry.source, entry.guardian]
      .filter(Boolean).join(' ');
  }

  private indexAdd(id: string, text: string) {
    for (const w of this.tokenize(text)) {
      let s = this.wordIndex.get(w);
      if (!s) { s = new Set(); this.wordIndex.set(w, s); }
      s.add(id);
    }
  }

  private indexRemove(id: string, text: string) {
    for (const w of this.tokenize(text)) {
      const s = this.wordIndex.get(w);
      if (s) { s.delete(id); if (!s.size) this.wordIndex.delete(w); }
    }
  }

  private async rebuildWordIndex() {
    this.wordIndex.clear();
    for (const v of VAULT_TYPES) {
      let files: string[] = [];
      try { files = await readdir(this.vaultDir(v)); } catch { continue; }
      for (const file of files) {
        if (!file.endsWith('.md')) continue;
        try {
          const entry = mdToEntry(await readFile(join(this.vaultDir(v), file), 'utf-8'));
          if (entry) this.indexAdd(entry.id, this.indexText(entry));
        } catch { /* skip */ }
      }
    }
  }

  // ── Internal: hot cache ───────────────────────────────
  private cacheSet(entry: VaultEntry) {
    if (this.entryCache.size >= this.CACHE_MAX) {
      const first = this.entryCache.keys().next().value as string | undefined;
      if (first !== undefined) this.entryCache.delete(first);
    }
    this.entryCache.set(entry.id, entry);
  }

  private check() {
    if (!this.initialized)
      throw new Error('FileBackend not initialized. Call initialize() before using storage operations.');
  }
}
