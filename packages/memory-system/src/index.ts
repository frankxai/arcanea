/**
 * @arcanea/memory-system
 *
 * Starlight Vault Memory System — 6 typed semantic vaults
 * with Guardian routing, Horizon Ledger, and Mem0-compatible API.
 *
 * Usage:
 *   import { StarlightVaults } from '@arcanea/memory-system';
 *
 *   // Option A: StarlightVaults (primary, high-level API)
 *   const memory = await StarlightVaults.create();
 *   await memory.remember("We chose file-based storage for zero-dependency simplicity");
 *   await memory.as('Shinkami').wisdom("Meta-pattern: simplicity compounds");
 *   const results = await memory.recall("storage decision");
 *
 *   // Option B: Full VaultManager (lower-level)
 *   const manager = new VaultManager({ storagePath: '.arcanea/memory' });
 *   await manager.initialize();
 *   const entry = await manager.remember({ content: 'API uses JWT tokens', tags: ['auth'] });
 *   const results = await manager.recall({ query: 'authentication' });
 *
 *   // Option C: Mem0-compatible adapter
 *   const mem0 = new Mem0Adapter({ storagePath: '.arcanea/memory' });
 *   await mem0.initialize();
 *   await mem0.add({ messages: [{ role: 'user', content: 'Remember this pattern' }] });
 *   const memories = await mem0.search({ query: 'pattern' });
 *
 *   // Option D: Direct classifier
 *   const classifier = new VaultClassifier();
 *   const result = classifier.classify('We should migrate the database schema');
 *   // -> { vault: 'technical', confidence: 0.82, reasoning: '...' }
 */

// Primary export — flagship API
export { StarlightVaults } from './starlight-vaults.js';

// MEMORY.md bridge — auto-sync vaults → Claude Code native format
export { MemoryBridge, syncMemory, appendMemoryNote } from './memory-bridge.js';
export type { BridgeConfig, SyncResult } from './memory-bridge.js';

// Core classes
export { VaultManager } from './vault-manager.js';
export { VaultClassifier } from './vault-classifier.js';
export { HorizonLedger } from './horizon-ledger.js';
export { Mem0Adapter } from './mem0-adapter.js';

// Storage backends
export { FileBackend } from './storage/file-backend.js';
export { Mem0Backend } from './storage/mem0-backend.js';
export type { Mem0BackendConfig } from './storage/mem0-backend.js';

// All types
export type {
  // Vault types
  VaultType,
  ConfidenceLevel,
  GuardianName,
  GateName,

  // Entry types
  VaultEntry,
  VaultEntryInput,
  HorizonEntry,

  // Search types
  VaultSearchOptions,
  VaultSearchResult,

  // Classification types
  ClassificationRule,
  ClassificationResult,

  // Storage types
  StorageBackend,

  // Mem0 compatibility types
  Mem0Message,
  Mem0AddRequest,
  Mem0SearchRequest,
  Mem0MemoryResponse,

  // Configuration
  MemorySystemConfig,

  // Statistics
  VaultStats,
  MemorySystemStats,
} from './types.js';

// ArcaneMD format — parser, serializer, validator
export { parseArcaneMD, serializeArcaneMD, generateId } from './arcaneMD.js';
export type { ArcaneMDParseResult } from './arcaneMD.js';

// Runtime constants and utilities
export {
  VAULT_TYPES,
  CONFIDENCE_RANK,
  generateMemoryId,
} from './types.js';
