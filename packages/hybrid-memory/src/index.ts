/**
 * @arcanea/hybrid-memory
 *
 * Hybrid memory backend for Arcanea — SQL queries + vector search + Guardian-namespaced storage.
 *
 * @example
 * ```ts
 * import { HybridBackend, SQLBackend, VectorBackend, GuardianMemoryManager } from '@arcanea/hybrid-memory';
 *
 * const sql = new SQLBackend();
 * const vector = new VectorBackend({ dimensions: 384 });
 * const hybrid = new HybridBackend(sql, vector);
 * const guardians = new GuardianMemoryManager(hybrid);
 *
 * await guardians.initialize();
 * await guardians.storeForGuardian('lyria', { ... });
 * ```
 */

// Types
export type {
  Memory,
  MemoryBackend,
  MemoryQuery,
  MemorySearchResult,
  HybridSearchOptions,
  MemoryStats,
  GuardianMemoryConfig,
  VectorBackendOptions,
} from './types.js';

// Constants
export {
  GUARDIAN_FREQUENCIES,
  GUARDIAN_MEMORY_CONFIGS,
} from './types.js';

// Backends
export { SQLBackend } from './sql-backend.js';
export { VectorBackend, cosineSimilarity } from './vector-backend.js';
export { HybridBackend } from './hybrid-backend.js';

// Guardian Layer
export { GuardianMemoryManager } from './guardian-memory.js';
