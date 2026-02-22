/**
 * @arcanea/token-optimizer — Type Definitions
 *
 * All interfaces, types, and canonical constants for the
 * Arcanea token optimization engine.
 *
 * @module @arcanea/token-optimizer/types
 */

// ---------------------------------------------------------------------------
// Core Data Types
// ---------------------------------------------------------------------------

/** Statistics for a single optimization pass */
export interface TokenStats {
  /** Number of tokens saved */
  saved: number;
  /** Baseline token count before optimization */
  baseline: number;
  /** Reduction ratio (0..1) */
  reduction: number;
  /** Method used for the optimization */
  method: 'cache' | 'semantic-retrieval' | 'batch' | 'compaction' | 'none';
}

/** A memory entry retrieved by the ReasoningBank */
export interface MemoryEntry {
  /** Unique identifier */
  id: string;
  /** The stored text content */
  text: string;
  /** Optional pre-computed word set for similarity */
  wordSet?: Set<string>;
  /** Timestamp when stored */
  storedAt: number;
  /** Optional metadata tags */
  tags?: string[];
}

/** Context assembled from semantic retrieval */
export interface MemoryContext {
  /** Original query */
  query: string;
  /** Retrieved memories with relevance scores */
  memories: Array<{ content: string; score: number }>;
  /** Compact prompt assembled from memories */
  compactPrompt: string;
  /** Estimated tokens saved vs full context */
  tokensSaved: number;
}

/** A time-bounded cache entry */
export interface CacheEntry<T> {
  /** Cached data */
  data: T;
  /** Insertion timestamp (ms) */
  timestamp: number;
  /** Time-to-live in milliseconds */
  ttl: number;
  /** Number of cache hits */
  hits: number;
}

/** Configuration for batch optimization */
export interface BatchConfig {
  /** Number of items per batch */
  batchSize: number;
  /** Cache allocation in MB */
  cacheSizeMB: number;
  /** Swarm topology recommendation */
  topology: 'hierarchical' | 'mesh' | 'adaptive';
  /** Expected success rate (0..1) */
  expectedSuccessRate: number;
}

/** Comprehensive optimization report */
export interface OptimizationReport {
  /** Total tokens saved since initialization */
  totalTokensSaved: number;
  /** Number of edits optimized */
  editsOptimized: number;
  /** Cache hit rate as a percentage string */
  cacheHitRate: string;
  /** Total memories retrieved */
  memoriesRetrieved: number;
  /** Estimated monthly cost savings */
  estimatedMonthlySavings: string;
  /** Cost per token for the primary model */
  costPerToken: number;
  /** Per-Guardian breakdown */
  guardianProfiles: GuardianCostProfile[];
}

/** Cost profile for a single Guardian */
export interface GuardianCostProfile {
  /** Guardian identifier (lowercase name) */
  guardianId: string;
  /** Display name */
  guardianName: string;
  /** Associated Gate */
  gate: string;
  /** Solfeggio frequency */
  frequency: number;
  /** Average tokens per API call */
  avgTokensPerCall: number;
  /** Total tokens consumed */
  totalTokensUsed: number;
  /** Number of API calls */
  callCount: number;
  /** Estimated cost in USD */
  costEstimate: number;
}

/** Token budget with warning thresholds */
export interface TokenBudget {
  /** Total budget in tokens */
  totalBudget: number;
  /** Tokens used so far */
  used: number;
  /** Tokens remaining */
  remaining: number;
  /** Warning threshold ratio (0..1), default 0.8 */
  warningThreshold: number;
  /** Critical threshold ratio (0..1), default 0.95 */
  criticalThreshold: number;
}

/** Cache statistics */
export interface CacheStats {
  /** Number of entries currently in cache */
  size: number;
  /** Maximum allowed entries */
  maxSize: number;
  /** Total cache hits */
  hits: number;
  /** Total cache misses */
  misses: number;
  /** Hit rate as a ratio (0..1) */
  hitRate: number;
}

/** ReasoningBank statistics */
export interface ReasoningBankStats {
  /** Total entries stored */
  totalEntries: number;
  /** Total retrievals performed */
  totalRetrievals: number;
  /** Total tokens saved across all retrievals */
  totalTokensSaved: number;
}

/** Options for ReasoningBank.retrieve() */
export interface RetrievalOptions {
  /** Maximum number of results */
  limit?: number;
  /** Minimum similarity threshold (0..1) */
  threshold?: number;
  /** Filter by tags */
  tags?: string[];
}

// ---------------------------------------------------------------------------
// Constants — Arcanea Canon
// ---------------------------------------------------------------------------

/** Cost per token by model family (USD) */
export const COST_PER_TOKEN: Record<string, number> = {
  gemini: 0.000001,      // $1 per 1M tokens (Gemini 2.5 Flash)
  claude: 0.000015,      // $15 per 1M tokens (Claude Opus)
  'claude-sonnet': 0.000003, // $3 per 1M tokens (Claude Sonnet)
  'claude-haiku': 0.00000025, // $0.25 per 1M tokens (Claude Haiku)
  gpt4: 0.00003,         // $30 per 1M tokens (GPT-4)
  'gpt4-mini': 0.0000006, // $0.60 per 1M tokens (GPT-4 mini)
};

/** Guardian frequency metadata — canonical Arcanea mapping */
export interface GuardianFrequencyInfo {
  gate: string;
  frequency: number;
  element: 'Fire' | 'Water' | 'Earth' | 'Wind' | 'Void' | 'Spirit';
}

/**
 * The Ten Guardians and their canonical Solfeggio frequencies.
 *
 * Source: `.arcanea/lore/CANON_LOCKED.md`
 */
export const GUARDIAN_FREQUENCIES: Record<string, GuardianFrequencyInfo> = {
  lyssandria: { gate: 'Foundation', frequency: 174, element: 'Earth' },
  leyla:      { gate: 'Flow',       frequency: 285, element: 'Water' },
  draconia:   { gate: 'Fire',       frequency: 396, element: 'Fire' },
  maylinn:    { gate: 'Heart',      frequency: 417, element: 'Wind' },
  alera:      { gate: 'Voice',      frequency: 528, element: 'Wind' },
  lyria:      { gate: 'Sight',      frequency: 639, element: 'Water' },
  aiyami:     { gate: 'Crown',      frequency: 741, element: 'Spirit' },
  elara:      { gate: 'Shift',      frequency: 852, element: 'Void' },
  ino:        { gate: 'Unity',      frequency: 963, element: 'Spirit' },
  shinkami:   { gate: 'Source',      frequency: 1111, element: 'Void' },
};

/** All valid Guardian identifiers */
export const GUARDIAN_IDS = Object.keys(GUARDIAN_FREQUENCIES) as readonly string[];

/** Default cost-per-token for unknown models */
export const DEFAULT_COST_PER_TOKEN = 0.00001;
