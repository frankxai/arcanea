/**
 * @arcanea/guardian-memory
 *
 * Persistent semantic memory for the Ten Guardians.
 * Combines Starlight Intelligence System vault architecture
 * with claude-flow HNSW vector search engine.
 *
 * Usage:
 *   import { GuardianMemory } from '@arcanea/guardian-memory';
 *
 *   const memory = new GuardianMemory({ storagePath: '.arcanea/memory' });
 *   memory.load();
 *
 *   // Store a memory for Lyssandria
 *   await memory.store({
 *     key: 'db-schema-v2',
 *     content: 'Users table uses UUID primary keys with RLS policies',
 *     guardian: 'lyssandria',
 *     type: 'procedural',
 *     tags: ['database', 'supabase', 'schema'],
 *     confidence: 0.9,
 *   });
 *
 *   // Search Lyssandria's memories
 *   const results = memory.searchByText('database schema', {
 *     guardians: ['lyssandria'],
 *     k: 5,
 *   });
 *
 *   // Cross-Guardian vector search
 *   const vectorResults = await memory.search(embedding, {
 *     k: 10,
 *     crossGuardian: true,
 *     elementAffinity: 'earth',
 *   });
 *
 *   memory.shutdown();
 */

export { GuardianMemory, type GuardianMemoryConfig } from './guardian-memory.js';
export { HNSWIndex } from './hnsw-index.js';
export {
  // Types
  type GuardianName,
  type Element,
  type VaultCategory,
  type MemoryType,
  type AccessLevel,
  type DistanceMetric,
  type GuardianMemoryEntry,
  type GuardianMemoryInput,
  type GuardianMemoryUpdate,
  type GuardianSearchOptions,
  type GuardianSearchResult,
  type GuardianProfile,
  type HNSWConfig,
  type HNSWStats,
  type QuantizationConfig,

  // Constants
  GUARDIANS,
  ELEMENT_AFFINITY,
  GUARDIAN_VAULT_MAP,

  // Utilities
  generateMemoryId,
  createGuardianEntry,
} from './types.js';
