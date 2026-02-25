/**
 * Mem0-Compatible API Adapter
 *
 * Translates between Mem0's API format and Starlight Vaults.
 * Allows any Mem0-compatible client to use Arcanea's memory system.
 *
 * Mem0 API mapping:
 *   add()    -> classifies and stores in appropriate vault
 *   search() -> searches across vaults
 *   getAll() -> lists entries for a user/guardian
 *   get()    -> retrieves a single entry
 *   delete() -> removes an entry (except Horizon, which is permanent)
 */

import type {
  Mem0AddRequest,
  Mem0SearchRequest,
  Mem0MemoryResponse,
  VaultEntry,
  VaultEntryInput,
  VaultSearchResult,
  GuardianName,
  StorageBackend,
  MemorySystemConfig,
} from './types.js';
import { generateMemoryId, VAULT_TYPES } from './types.js';
import { VaultClassifier } from './vault-classifier.js';
import { FileBackend } from './storage/file-backend.js';

// ── Mem0 Adapter ────────────────────────────────────────

export class Mem0Adapter {
  private backend: StorageBackend;
  private classifier: VaultClassifier;
  private config: MemorySystemConfig;
  private initialized = false;

  constructor(config: MemorySystemConfig = {}) {
    this.config = config;
    this.classifier = new VaultClassifier();

    // Create the appropriate backend
    if (config.backend === 'mem0' && config.mem0ApiKey) {
      // Mem0 cloud backend would go here — for now, fall back to file
      this.backend = new FileBackend(config.storagePath ?? '.arcanea/memory');
    } else {
      this.backend = new FileBackend(config.storagePath ?? '.arcanea/memory');
    }
  }

  /**
   * Initialize the adapter and its storage backend.
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;
    await this.backend.initialize();
    this.initialized = true;
  }

  // ── Mem0-Compatible Methods ───────────────────────────

  /**
   * Add memories from a conversation.
   * Extracts meaningful content from messages, classifies it,
   * and stores in the appropriate vault.
   *
   * Mem0 API: POST /v1/memories/
   */
  async add(request: Mem0AddRequest): Promise<Mem0MemoryResponse[]> {
    await this.ensureInitialized();

    const responses: Mem0MemoryResponse[] = [];
    const guardian = this.resolveGuardian(request.agent_id);

    for (const message of request.messages) {
      // Skip system messages — they're context, not memory
      if (message.role === 'system') continue;

      // Skip very short messages (likely greetings or confirmations)
      if (message.content.trim().length < 20) continue;

      // Classify the content
      const classification = this.classifier.classify(message.content, guardian);

      // Create the vault entry
      const now = Date.now();
      const entry: VaultEntry = {
        id: generateMemoryId('m0'),
        vault: classification.vault,
        content: message.content,
        summary: this.extractSummary(message.content),
        tags: this.extractTags(message.content),
        confidence: classification.confidence >= 0.7 ? 'high' : classification.confidence >= 0.4 ? 'medium' : 'low',
        guardian,
        source: `mem0:${request.user_id ?? 'anonymous'}`,
        metadata: {
          ...request.metadata,
          mem0_role: message.role,
          mem0_user_id: request.user_id,
          mem0_agent_id: request.agent_id,
          classification_reasoning: classification.reasoning,
        },
        createdAt: now,
        updatedAt: now,
      };

      await this.backend.store(entry);

      responses.push(this.toMem0Response(entry, request.user_id));
    }

    return responses;
  }

  /**
   * Search memories.
   *
   * Mem0 API: POST /v1/memories/search/
   */
  async search(request: Mem0SearchRequest): Promise<Mem0MemoryResponse[]> {
    await this.ensureInitialized();

    const guardian = this.resolveGuardian(request.agent_id);

    const results = await this.backend.search({
      query: request.query,
      guardian,
      limit: request.limit ?? 10,
    });

    return results.map((r) => this.toMem0Response(r.entry, request.user_id));
  }

  /**
   * Get all memories for a user or agent.
   *
   * Mem0 API: GET /v1/memories/
   */
  async getAll(userId?: string, agentId?: string, limit: number = 100): Promise<Mem0MemoryResponse[]> {
    await this.ensureInitialized();

    const allEntries: VaultEntry[] = [];

    for (const vaultType of VAULT_TYPES) {
      const entries = await this.backend.list(vaultType, limit);
      allEntries.push(...entries);
    }

    // Filter by user/agent if specified
    let filtered = allEntries;

    if (userId) {
      filtered = filtered.filter((e) =>
        e.source?.includes(`mem0:${userId}`) ||
        (e.metadata as Record<string, unknown>)?.mem0_user_id === userId,
      );
    }

    if (agentId) {
      const guardian = this.resolveGuardian(agentId);
      if (guardian) {
        filtered = filtered.filter((e) => e.guardian === guardian);
      }
    }

    // Sort by most recent first
    filtered.sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

    return filtered.slice(0, limit).map((e) => this.toMem0Response(e, userId));
  }

  /**
   * Get a single memory by ID.
   *
   * Mem0 API: GET /v1/memories/{memory_id}/
   */
  async get(memoryId: string): Promise<Mem0MemoryResponse | null> {
    await this.ensureInitialized();

    const entry = await this.backend.retrieve(memoryId);
    if (!entry) return null;
    return this.toMem0Response(entry);
  }

  /**
   * Delete a memory by ID.
   * Horizon entries cannot be deleted (returns false).
   *
   * Mem0 API: DELETE /v1/memories/{memory_id}/
   */
  async delete(memoryId: string): Promise<boolean> {
    await this.ensureInitialized();
    return this.backend.remove(memoryId);
  }

  /**
   * Get memory count.
   */
  async count(userId?: string): Promise<number> {
    await this.ensureInitialized();

    if (!userId) {
      return this.backend.count();
    }

    // Count only for a specific user
    const all = await this.getAll(userId);
    return all.length;
  }

  // ── Direct Vault Access ───────────────────────────────

  /**
   * Store directly into a specific vault (bypasses Mem0 format).
   * Useful for internal callers that know which vault they want.
   */
  async storeEntry(input: VaultEntryInput): Promise<VaultEntry> {
    await this.ensureInitialized();

    const vault = input.vault ?? this.classifier.classify(input.content, input.guardian).vault;
    const now = Date.now();

    const entry: VaultEntry = {
      id: generateMemoryId('vmem'),
      vault,
      content: input.content,
      summary: input.summary,
      tags: input.tags ?? [],
      confidence: input.confidence ?? this.config.defaultConfidence ?? 'medium',
      guardian: input.guardian ?? this.config.defaultGuardian,
      gate: input.gate,
      source: input.source,
      metadata: input.metadata,
      createdAt: now,
      updatedAt: now,
      expiresAt: input.ttl ? now + input.ttl * 1000 : undefined,
    };

    await this.backend.store(entry);
    return entry;
  }

  /**
   * Get the underlying storage backend for advanced operations.
   */
  getBackend(): StorageBackend {
    return this.backend;
  }

  /**
   * Get the classifier for external use.
   */
  getClassifier(): VaultClassifier {
    return this.classifier;
  }

  // ── Internal ──────────────────────────────────────────

  /**
   * Map an agent_id string to a Guardian name.
   * Supports both exact Guardian names and known agent type mappings.
   */
  private resolveGuardian(agentId?: string): GuardianName | undefined {
    if (!agentId) return this.config.defaultGuardian;

    // Direct Guardian name match
    const guardianNames: GuardianName[] = [
      'Lyssandria', 'Leyla', 'Draconia', 'Maylinn', 'Alera',
      'Lyria', 'Aiyami', 'Elara', 'Ino', 'Shinkami',
    ];
    for (const name of guardianNames) {
      if (agentId.toLowerCase() === name.toLowerCase()) {
        return name;
      }
    }

    // Agent type mapping
    const agentTypeMap: Record<string, GuardianName> = {
      'coder': 'Lyssandria',
      'planner': 'Shinkami',
      'researcher': 'Lyria',
      'reviewer': 'Alera',
      'tester': 'Draconia',
      'creative': 'Leyla',
      'architect': 'Elara',
      'security': 'Draconia',
      'performance': 'Lyssandria',
      'coordinator': 'Ino',
    };
    const mapped = agentTypeMap[agentId.toLowerCase()];
    if (mapped) return mapped;

    return this.config.defaultGuardian;
  }

  /**
   * Extract a short summary from content (first sentence, max 150 chars).
   */
  private extractSummary(content: string): string {
    const firstSentence = content.split(/[.!?\n]/)[0]?.trim() ?? content;
    if (firstSentence.length <= 150) return firstSentence;
    return firstSentence.substring(0, 147) + '...';
  }

  /**
   * Extract tags from content using basic keyword extraction.
   * Finds capitalized words, technical terms, and known patterns.
   */
  private extractTags(content: string): string[] {
    const tags = new Set<string>();

    // Extract PascalCase / camelCase identifiers
    const identifiers = content.match(/\b[A-Z][a-zA-Z0-9]+\b/g);
    if (identifiers) {
      for (const id of identifiers.slice(0, 5)) {
        tags.add(id.toLowerCase());
      }
    }

    // Extract backtick-wrapped code terms
    const codeTerms = content.match(/`([^`]+)`/g);
    if (codeTerms) {
      for (const term of codeTerms.slice(0, 5)) {
        const cleaned = term.replace(/`/g, '').trim();
        if (cleaned.length >= 2 && cleaned.length <= 40) {
          tags.add(cleaned.toLowerCase());
        }
      }
    }

    // Extract hashtags
    const hashtags = content.match(/#(\w+)/g);
    if (hashtags) {
      for (const tag of hashtags.slice(0, 5)) {
        tags.add(tag.replace('#', '').toLowerCase());
      }
    }

    return Array.from(tags).slice(0, 10);
  }

  /**
   * Convert a VaultEntry to Mem0Response format.
   */
  private toMem0Response(entry: VaultEntry, userId?: string): Mem0MemoryResponse {
    return {
      id: entry.id,
      memory: entry.content,
      user_id: userId ?? (entry.metadata as Record<string, unknown>)?.mem0_user_id as string | undefined,
      metadata: {
        vault: entry.vault,
        guardian: entry.guardian,
        gate: entry.gate,
        tags: entry.tags,
        confidence: entry.confidence,
        summary: entry.summary,
        source: entry.source,
        ...entry.metadata,
      },
      created_at: new Date(entry.createdAt).toISOString(),
      updated_at: new Date(entry.updatedAt).toISOString(),
    };
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }
  }
}
