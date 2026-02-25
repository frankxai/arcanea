/**
 * StarlightVaults — The Six-Vault Memory System
 *
 * "The AI that remembers wins."
 *
 * Six semantic memory vaults with Guardian routing,
 * HorizonLedger for benevolent intentions, and
 * Mem0-compatible API for future cloud migration.
 *
 * @example
 * ```typescript
 * const memory = await StarlightVaults.create();
 *
 * // Remember something (auto-classified)
 * await memory.remember("We chose file-based storage for zero-dependency simplicity");
 *
 * // Remember in a specific vault
 * await memory.strategic("Decision: migrate to Next.js 16 for App Router support");
 *
 * // Recall relevant memories
 * const memories = await memory.recall("storage decision");
 *
 * // Channel a Guardian's memories
 * await memory.as('Shinkami').wisdom("Meta-pattern: simplicity compounds");
 *
 * // Append a wish to the Horizon
 * await memory.horizon.append(
 *   "That every developer finds code that feels like music",
 *   "Thinking about beautiful APIs while building this"
 * );
 * ```
 */

import { join } from 'node:path';
import {
  VaultManager,
  type VaultType,
  type VaultEntry,
  type VaultEntryInput,
  type VaultSearchOptions,
  type VaultSearchResult,
  type GuardianName,
  type MemorySystemConfig,
  type MemorySystemStats,
} from './vault-manager.js';
import { HorizonLedger, type HorizonEntry } from './horizon-ledger.js';
import { VaultClassifier } from './vault-classifier.js';
import type { ClassificationResult } from './types.js';

// ── Guardian quick-reference ──────────────────────────────────────────────────

const GUARDIAN_INFO = {
  Lyssandria: { hz: 174,  gate: 'Foundation', element: 'Earth'  },
  Leyla:      { hz: 285,  gate: 'Flow',       element: 'Water'  },
  Draconia:   { hz: 396,  gate: 'Fire',        element: 'Fire'   },
  Maylinn:    { hz: 417,  gate: 'Heart',       element: 'Fire'   },
  Alera:      { hz: 528,  gate: 'Voice',       element: 'Wind'   },
  Lyria:      { hz: 639,  gate: 'Sight',       element: 'Void'   },
  Aiyami:     { hz: 741,  gate: 'Crown',       element: 'Spirit' },
  Elara:      { hz: 852,  gate: 'Shift',       element: 'Void'   },
  Ino:        { hz: 963,  gate: 'Unity',       element: 'Spirit' },
  Shinkami:   { hz: 1111, gate: 'Source',      element: 'Spirit' },
} as const;

type GuardianInfo = {
  hz: number;
  gate: string;
  element: string;
};

// ── HorizonAccessor type ──────────────────────────────────────────────────────

interface HorizonAccessor {
  /** Append a wish to the Horizon (permanent, cannot be deleted) */
  append(wish: string, context: string, tags?: string[]): Promise<HorizonEntry>;
  /** Read recent wishes from the Horizon */
  recent(limit?: number): Promise<HorizonEntry[]>;
  /** Search wishes by keyword */
  search(query: string, limit?: number): Promise<HorizonEntry[]>;
  /** Get total wish count */
  count(): number;
  /** Export the Horizon as a public dataset */
  export(outputPath: string): Promise<{ files: number; entries: number }>;
}

// ── StarlightVaults ───────────────────────────────────────────────────────────

export class StarlightVaults {
  private manager: VaultManager;
  private ledger: HorizonLedger;
  private classifier: VaultClassifier;
  private currentGuardian?: GuardianName;

  private constructor(manager: VaultManager, ledger: HorizonLedger) {
    this.manager = manager;
    this.ledger = ledger;
    this.classifier = new VaultClassifier();
  }

  // ── Static Factory ───────────────────────────────────────────────────────

  /** Create and initialize a StarlightVaults instance */
  static async create(config?: Partial<MemorySystemConfig>): Promise<StarlightVaults> {
    const manager = new VaultManager(config);
    await manager.initialize();

    const storagePath = config?.storagePath ?? join(process.cwd(), '.arcanea', 'memory');
    const ledger = new HorizonLedger(storagePath);
    await ledger.initialize();

    // Seed founding wishes if fresh
    await ledger.seedFoundingWishes();

    return new StarlightVaults(manager, ledger);
  }

  /** Create instance from an existing VaultManager */
  static fromManager(
    manager: VaultManager,
    config?: Partial<MemorySystemConfig>,
  ): StarlightVaults {
    const storagePath = config?.storagePath ?? join(process.cwd(), '.arcanea', 'memory');
    const ledger = new HorizonLedger(storagePath);
    return new StarlightVaults(manager, ledger);
  }

  // ── Core API ─────────────────────────────────────────────────────────────

  /** Remember something — auto-classified into the right vault */
  async remember(content: string, tags?: string[]): Promise<VaultEntry> {
    return this.manager.remember({
      content,
      tags: tags ?? [],
      guardian: this.currentGuardian,
    });
  }

  /** Recall relevant memories with a search query */
  async recall(
    query: string,
    options?: Partial<Omit<VaultSearchOptions, 'query'>>,
  ): Promise<VaultSearchResult[]> {
    return this.manager.recall({
      query,
      guardian: this.currentGuardian,
      ...options,
    });
  }

  /** Get recent memories, optionally from a specific vault */
  async recent(vault?: VaultType, limit = 10): Promise<VaultEntry[]> {
    return this.manager.getRecent(vault, limit);
  }

  /** Forget a memory by ID */
  async forget(id: string): Promise<boolean> {
    return this.manager.forget(id);
  }

  /** Get system statistics */
  async stats(): Promise<MemorySystemStats> {
    return this.manager.getStats();
  }

  // ── Vault Shortcuts ──────────────────────────────────────────────────────

  /** Remember as a strategic decision or roadmap item */
  async strategic(content: string, tags?: string[]): Promise<VaultEntry> {
    return this.manager.remember({
      content,
      vault: 'strategic',
      tags: tags ?? [],
      guardian: this.currentGuardian,
    });
  }

  /** Remember as a technical pattern or solution */
  async technical(content: string, tags?: string[]): Promise<VaultEntry> {
    return this.manager.remember({
      content,
      vault: 'technical',
      tags: tags ?? [],
      guardian: this.currentGuardian,
    });
  }

  /** Remember as a creative, voice, or brand insight */
  async creative(content: string, tags?: string[]): Promise<VaultEntry> {
    return this.manager.remember({
      content,
      vault: 'creative',
      tags: tags ?? [],
      guardian: this.currentGuardian,
    });
  }

  /** Remember as operational or session context */
  async operational(content: string, tags?: string[]): Promise<VaultEntry> {
    return this.manager.remember({
      content,
      vault: 'operational',
      tags: tags ?? [],
      guardian: this.currentGuardian,
    });
  }

  /** Remember as a wisdom or meta-pattern insight */
  async wisdom(content: string, tags?: string[]): Promise<VaultEntry> {
    return this.manager.remember({
      content,
      vault: 'wisdom',
      tags: tags ?? [],
      guardian: this.currentGuardian,
    });
  }

  // ── Horizon Vault ────────────────────────────────────────────────────────

  /** Horizon Vault interface — append-only benevolent intentions */
  get horizon(): HorizonAccessor {
    const ledger = this.ledger;
    const currentGuardian = this.currentGuardian;

    return {
      async append(wish: string, context: string, tags?: string[]): Promise<HorizonEntry> {
        return ledger.append(
          wish,
          context,
          currentGuardian ?? 'arcanea',
          true,
          tags ?? [],
        );
      },

      async recent(limit = 10): Promise<HorizonEntry[]> {
        return ledger.getRecent(limit);
      },

      async search(query: string, limit = 20): Promise<HorizonEntry[]> {
        return ledger.search(query, limit);
      },

      count(): number {
        return ledger.getCount();
      },

      async export(outputPath: string): Promise<{ files: number; entries: number }> {
        return ledger.exportDataset(outputPath);
      },
    };
  }

  // ── Guardian Routing ─────────────────────────────────────────────────────

  /**
   * Channel a specific Guardian — all operations on the returned instance
   * carry that Guardian's identity.
   *
   * @example
   * ```typescript
   * // Shinkami's wisdom (Source Gate, 1111 Hz)
   * await memory.as('Shinkami').wisdom("Meta-pattern: simplicity compounds forever");
   *
   * // Draconia's strategic fire (Fire Gate, 396 Hz)
   * await memory.as('Draconia').strategic("Decision: ship small, iterate fast");
   * ```
   */
  as(guardian: GuardianName): StarlightVaults {
    const instance = new StarlightVaults(this.manager, this.ledger);
    instance.currentGuardian = guardian;
    return instance;
  }

  /** Get memories belonging to a specific Guardian */
  async byGuardian(guardian: GuardianName, limit = 50): Promise<VaultEntry[]> {
    return this.manager.getByGuardian(guardian, limit);
  }

  /** Get Guardian metadata (gate, Hz, element) */
  guardianInfo(guardian: GuardianName): GuardianInfo {
    return GUARDIAN_INFO[guardian];
  }

  /** Get all active Guardians with their memory stats */
  async allGuardians(): Promise<
    Array<{ guardian: GuardianName; entryCount: number; hz: number; gate: string }>
  > {
    const guardians = Object.keys(GUARDIAN_INFO) as GuardianName[];

    const results = await Promise.all(
      guardians.map(async (guardian) => {
        const entries = await this.manager.getByGuardian(guardian);
        return {
          guardian,
          entryCount: entries.length,
          hz: GUARDIAN_INFO[guardian].hz,
          gate: GUARDIAN_INFO[guardian].gate,
        };
      }),
    );

    return results.filter((r) => r.entryCount > 0);
  }

  // ── Classification ───────────────────────────────────────────────────────

  /** Classify content into a vault without storing it */
  classify(content: string): ClassificationResult {
    return this.classifier.classify(content, this.currentGuardian);
  }

  // ── Mem0-Compatible API ──────────────────────────────────────────────────

  /**
   * Mem0-compatible add — takes a messages array and stores as a memory.
   * Drop-in compatible with the Mem0 Python/JS SDK.
   */
  async add(
    messages: Array<{ role: string; content: string }>,
    userId?: string,
  ): Promise<{ id: string }> {
    const content = messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => `[${m.role}] ${m.content}`)
      .join('\n');

    const guardian = userId
      ? this.resolveGuardianFromUserId(userId)
      : this.currentGuardian;

    const entry = await this.manager.remember({ content, guardian });
    return { id: entry.id };
  }

  /**
   * Mem0-compatible search — returns memories in Mem0 format.
   */
  async search(
    query: string,
    userId?: string,
  ): Promise<Array<{ id: string; memory: string; metadata: unknown }>> {
    const guardian = userId
      ? this.resolveGuardianFromUserId(userId)
      : this.currentGuardian;

    const results = await this.manager.recall({ query, guardian, limit: 10 });

    return results.map((r) => ({
      id: r.entry.id,
      memory: r.entry.content,
      metadata: {
        vault: r.entry.vault,
        guardian: r.entry.guardian,
        score: r.score,
      },
    }));
  }

  // ── Private Helpers ──────────────────────────────────────────────────────

  private resolveGuardianFromUserId(userId: string): GuardianName | undefined {
    const guardians = Object.keys(GUARDIAN_INFO) as GuardianName[];
    return guardians.find((g) =>
      userId.toLowerCase().includes(g.toLowerCase()),
    );
  }
}

// ── Re-exports for convenience ────────────────────────────────────────────────

export { VaultManager } from './vault-manager.js';
export { HorizonLedger } from './horizon-ledger.js';
export { VaultClassifier } from './vault-classifier.js';
export type {
  VaultType,
  VaultEntry,
  VaultEntryInput,
  VaultSearchOptions,
  VaultSearchResult,
  GuardianName,
  MemorySystemConfig,
  MemorySystemStats,
} from './vault-manager.js';
export type { HorizonEntry } from './horizon-ledger.js';
export type { ClassificationResult } from './types.js';
