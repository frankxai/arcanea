/**
 * Mem0 Backend — Optional Cloud Storage for Starlight Vaults
 *
 * Implements StorageBackend using the Mem0 cloud API.
 * Zero config needed for local .md storage — this is for users
 * who want cloud sync or have existing Mem0 setups.
 *
 * Usage:
 * ```typescript
 * import { StarlightVaults } from '@arcanea/memory-system';
 * import { Mem0Backend } from '@arcanea/memory-system/storage/mem0';
 *
 * const memory = await StarlightVaults.create({
 *   backend: new Mem0Backend({ apiKey: process.env.MEM0_API_KEY })
 * });
 * ```
 *
 * Note: Horizon vault entries are ALSO written to local JSONL
 * even when using Mem0 backend, to preserve the append-only guarantee
 * and support the public dataset contribution workflow.
 */

import type {
  StorageBackend,
  VaultEntry,
  VaultSearchOptions,
  VaultSearchResult,
  VaultType,
} from '../types.js';

export interface Mem0BackendConfig {
  apiKey: string;
  baseUrl?: string;    // Default: https://api.mem0.ai
  agentId?: string;    // Mem0 agent ID for this vault system
  projectId?: string;  // Optional Mem0 project
}

/** Raw shape of a Mem0 memory response object from the API */
interface Mem0MemoryObject {
  id: string;
  memory: string;
  score?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Mem0-backed storage for Starlight Vaults.
 * Requires a Mem0 API key (https://mem0.ai).
 *
 * The Mem0 backend uses user_id prefixed with vault type for namespacing:
 * `starlight_strategic`, `starlight_technical`, etc.
 *
 * For local-first usage with no API key, use FileBackend (the default).
 */
export class Mem0Backend implements StorageBackend {
  private readonly config: Required<Mem0BackendConfig>;
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;
  // Local cache for fast retrieval and horizon fallback
  private readonly localEntries = new Map<string, VaultEntry>();

  constructor(config: Mem0BackendConfig) {
    this.config = {
      apiKey: config.apiKey,
      baseUrl: config.baseUrl ?? 'https://api.mem0.ai',
      agentId: config.agentId ?? 'starlight-vaults',
      projectId: config.projectId ?? 'arcanea',
    };
    this.baseUrl = this.config.baseUrl;
    this.headers = {
      'Authorization': `Token ${this.config.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  async initialize(): Promise<void> {
    // Verify Mem0 connection with a lightweight list call
    try {
      const response = await fetch(`${this.baseUrl}/v1/memories/`, {
        method: 'GET',
        headers: this.headers,
      });
      if (!response.ok) {
        throw new Error(`Mem0 connection failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(
        `Failed to initialize Mem0 backend. Check your MEM0_API_KEY.\n` +
        `Error: ${error instanceof Error ? error.message : String(error)}\n` +
        `Tip: Use FileBackend (default) for local-only storage with no API key.`,
      );
    }
  }

  async store(entry: VaultEntry): Promise<void> {
    // Map vault to Mem0 user_id namespace
    const userId = `starlight_${entry.vault}`;

    const response = await fetch(`${this.baseUrl}/v1/memories/`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        messages: [{ role: 'system', content: entry.content }],
        user_id: userId,
        agent_id: this.config.agentId,
        metadata: {
          arcanea_id: entry.id,
          vault: entry.vault,
          guardian: entry.guardian,
          tags: entry.tags,
          confidence: entry.confidence,
          source: entry.source,
          created_at: entry.createdAt,
          expires_at: entry.expiresAt,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Mem0 store failed: ${response.status} ${errorText}`);
    }

    // Cache locally for fast retrieval
    this.localEntries.set(entry.id, entry);
  }

  async retrieve(id: string): Promise<VaultEntry | null> {
    // Check local cache first
    const cached = this.localEntries.get(id);
    if (cached) return cached;

    // Search Mem0 for this specific ID
    const response = await fetch(`${this.baseUrl}/v1/memories/${id}`, {
      headers: this.headers,
    });

    if (!response.ok) return null;

    const data = await response.json() as Mem0MemoryObject;
    return this.mem0ToVaultEntry(data);
  }

  async search(options: VaultSearchOptions): Promise<VaultSearchResult[]> {
    // Use the first vault filter for namespacing if provided
    const vaultFilter = options.vaults?.[0];
    const userId = vaultFilter ? `starlight_${vaultFilter}` : undefined;

    const response = await fetch(`${this.baseUrl}/v1/memories/search/`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        query: options.query,
        user_id: userId,
        agent_id: this.config.agentId,
        limit: options.limit ?? 10,
      }),
    });

    if (!response.ok) return [];

    const data = await response.json() as Mem0MemoryObject[];

    return data.map(item => ({
      entry: this.mem0ToVaultEntry(item),
      score: item.score ?? 0.5,
      matchedTerms: options.query
        .toLowerCase()
        .split(/\s+/)
        .filter(w => item.memory.toLowerCase().includes(w)),
    }));
  }

  async list(vault: VaultType, limit = 50, offset = 0): Promise<VaultEntry[]> {
    const userId = `starlight_${vault}`;

    const response = await fetch(
      `${this.baseUrl}/v1/memories/?user_id=${userId}&agent_id=${this.config.agentId}&limit=${limit}&offset=${offset}`,
      { headers: this.headers },
    );

    if (!response.ok) return [];

    const data = await response.json() as Mem0MemoryObject[];
    return data.map(item => this.mem0ToVaultEntry(item));
  }

  async remove(id: string): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/v1/memories/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    });
    this.localEntries.delete(id);
    return response.ok;
  }

  async count(vault?: VaultType): Promise<number> {
    if (!vault) return 0;
    const entries = await this.list(vault, 1000);
    return entries.length;
  }

  async clear(vault?: VaultType): Promise<void> {
    if (!vault) return;
    const entries = await this.list(vault, 1000);
    await Promise.all(entries.map(e => this.remove(e.id)));
  }

  // ── Private helpers ─────────────────────────────────────────────────────

  private mem0ToVaultEntry(data: Mem0MemoryObject): VaultEntry {
    const meta = data.metadata ?? {};
    const now = new Date().toISOString();
    return {
      id:          (meta['arcanea_id'] as string)  ?? data.id,
      vault:       (meta['vault']      as VaultType) ?? 'operational',
      content:     data.memory,
      tags:        (meta['tags']       as string[]) ?? [],
      confidence:  (meta['confidence'] as VaultEntry['confidence']) ?? 'medium',
      guardian:    meta['guardian']    as VaultEntry['guardian']   | undefined,
      source:      meta['source']      as string                   | undefined,
      createdAt:   (meta['created_at'] as string)  ?? now,
      updatedAt:   (meta['created_at'] as string)  ?? now,
      expiresAt:   meta['expires_at']  as string                   | undefined,
    };
  }
}
