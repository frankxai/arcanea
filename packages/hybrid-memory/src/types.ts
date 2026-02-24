/**
 * @arcanea/hybrid-memory — Type Definitions
 *
 * All interfaces and constants for the hybrid memory system.
 * Guardian-namespaced storage with SQL + vector search.
 */

// ─── Core Memory Types ─────────────────────────────────────────────

/**
 * A single memory record in the system.
 */
export interface Memory {
  id: string;
  agentId: string;
  sessionId: string;
  type: string;
  content: string;
  context: Record<string, unknown>;
  timestamp: number;
  embedding?: number[];
  metadata?: Record<string, unknown>;
  tags?: string[];
  version?: number;
  parentId?: string;
}

/**
 * Query parameters for filtering memories via SQL-style queries.
 */
export interface MemoryQuery {
  agentId?: string;
  type?: string;
  timeRange?: { start: number; end: number };
  metadata?: Record<string, unknown>;
  tags?: string[];
  offset?: number;
  limit?: number;
  orderBy?: 'timestamp' | 'relevance';
}

/**
 * A memory with an attached similarity score from vector search.
 */
export interface MemorySearchResult extends Memory {
  similarity: number;
}

/**
 * Options for hybrid search combining SQL filtering and vector scoring.
 */
export interface HybridSearchOptions {
  query: MemoryQuery;
  embedding?: number[];
  k?: number;
  vectorWeight?: number;
  sqlWeight?: number;
}

/**
 * Aggregate statistics about the memory system.
 */
export interface MemoryStats {
  totalMemories: number;
  byAgent: Map<string, number>;
  byType: Map<string, number>;
  vectorized: number;
  avgSimilarity: number;
}

// ─── Backend Interface ─────────────────────────────────────────────

/**
 * The standard interface every memory backend must implement.
 */
export interface MemoryBackend {
  initialize(): Promise<void>;
  close(): Promise<void>;
  store(memory: Memory): Promise<Memory>;
  retrieve(id: string): Promise<Memory | undefined>;
  update(memory: Memory): Promise<void>;
  delete(id: string): Promise<void>;
  query(query: MemoryQuery): Promise<Memory[]>;
  vectorSearch(embedding: number[], k?: number): Promise<MemorySearchResult[]>;
  clearAgent(agentId: string): Promise<void>;
}

// ─── Vector Backend Options ────────────────────────────────────────

/**
 * Configuration for the HNSW-based vector backend.
 */
export interface VectorBackendOptions {
  dimensions?: number;
  hnswM?: number;
  efConstruction?: number;
}

// ─── Guardian Memory Types ─────────────────────────────────────────

/**
 * Configuration for a single Guardian's memory namespace.
 */
export interface GuardianMemoryConfig {
  guardianId: string;
  guardianName: string;
  gate: string;
  frequency: number;
  element: string;
  namespace: string;
  retentionPolicy: 'permanent' | 'session' | 'ttl';
  ttlMs?: number;
}

// ─── Guardian Constants ────────────────────────────────────────────

/**
 * Canonical Solfeggio frequencies for each Guardian Gate.
 */
export const GUARDIAN_FREQUENCIES: Record<string, number> = {
  lyssandria: 174,
  leyla: 285,
  draconia: 396,
  maylinn: 417,
  alera: 528,
  lyria: 639,
  aiyami: 741,
  elara: 852,
  ino: 963,
  shinkami: 1111,
};

/**
 * Complete memory configuration for all 10 Guardians.
 */
export const GUARDIAN_MEMORY_CONFIGS: Record<string, GuardianMemoryConfig> = {
  lyssandria: {
    guardianId: 'lyssandria',
    guardianName: 'Lyssandria',
    gate: 'Foundation',
    frequency: 174,
    element: 'Earth',
    namespace: 'guardian:lyssandria',
    retentionPolicy: 'permanent',
  },
  leyla: {
    guardianId: 'leyla',
    guardianName: 'Leyla',
    gate: 'Flow',
    frequency: 285,
    element: 'Water',
    namespace: 'guardian:leyla',
    retentionPolicy: 'session',
  },
  draconia: {
    guardianId: 'draconia',
    guardianName: 'Draconia',
    gate: 'Fire',
    frequency: 396,
    element: 'Fire',
    namespace: 'guardian:draconia',
    retentionPolicy: 'permanent',
  },
  maylinn: {
    guardianId: 'maylinn',
    guardianName: 'Maylinn',
    gate: 'Heart',
    frequency: 417,
    element: 'Wind',
    namespace: 'guardian:maylinn',
    retentionPolicy: 'session',
  },
  alera: {
    guardianId: 'alera',
    guardianName: 'Alera',
    gate: 'Voice',
    frequency: 528,
    element: 'Wind',
    namespace: 'guardian:alera',
    retentionPolicy: 'ttl',
    ttlMs: 86400000,
  },
  lyria: {
    guardianId: 'lyria',
    guardianName: 'Lyria',
    gate: 'Sight',
    frequency: 639,
    element: 'Water',
    namespace: 'guardian:lyria',
    retentionPolicy: 'permanent',
  },
  aiyami: {
    guardianId: 'aiyami',
    guardianName: 'Aiyami',
    gate: 'Crown',
    frequency: 741,
    element: 'Spirit',
    namespace: 'guardian:aiyami',
    retentionPolicy: 'permanent',
  },
  elara: {
    guardianId: 'elara',
    guardianName: 'Elara',
    gate: 'Shift',
    frequency: 852,
    element: 'Void',
    namespace: 'guardian:elara',
    retentionPolicy: 'ttl',
    ttlMs: 3600000,
  },
  ino: {
    guardianId: 'ino',
    guardianName: 'Ino',
    gate: 'Unity',
    frequency: 963,
    element: 'Spirit',
    namespace: 'guardian:ino',
    retentionPolicy: 'session',
  },
  shinkami: {
    guardianId: 'shinkami',
    guardianName: 'Shinkami',
    gate: 'Source',
    frequency: 1111,
    element: 'Void',
    namespace: 'guardian:shinkami',
    retentionPolicy: 'permanent',
  },
};
