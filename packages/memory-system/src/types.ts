/**
 * @arcanea/memory-system — Type Definitions
 * Starlight Vault Architecture with Guardian Routing
 *
 * Six semantic vaults, ten Guardian namespaces, Horizon Ledger,
 * and Mem0-compatible API surface.
 */

// ── Vault Types ─────────────────────────────────────────

/** The six semantic vault categories */
export type VaultType =
  | 'strategic'    // Decisions, architecture, roadmaps
  | 'technical'    // Patterns, solutions, code insights
  | 'creative'     // Voice, style, narrative patterns
  | 'operational'  // Recent context, session state
  | 'wisdom'       // Meta-patterns, cross-domain insights
  | 'horizon';     // Benevolent intentions, future wishes (append-only)

/** All vault types as a runtime array for iteration */
export const VAULT_TYPES: readonly VaultType[] = [
  'strategic', 'technical', 'creative', 'operational', 'wisdom', 'horizon',
] as const;

/** Confidence level for vault entries */
export type ConfidenceLevel = 'low' | 'medium' | 'high' | 'verified';

/** Confidence level numeric mapping for comparison */
export const CONFIDENCE_RANK: Record<ConfidenceLevel, number> = {
  low: 0,
  medium: 1,
  high: 2,
  verified: 3,
};

/** The ten Guardian names for namespace routing */
export type GuardianName =
  | 'Lyssandria' | 'Leyla' | 'Draconia' | 'Maylinn' | 'Alera'
  | 'Lyria' | 'Aiyami' | 'Elara' | 'Ino' | 'Shinkami';

/** The ten Gate names */
export type GateName =
  | 'Foundation' | 'Flow' | 'Fire' | 'Heart' | 'Voice'
  | 'Sight' | 'Crown' | 'Shift' | 'Unity' | 'Source';

// ── Core Entry Types ────────────────────────────────────

/** A single memory entry stored in a vault */
export interface VaultEntry {
  id: string;
  vault: VaultType;
  content: string;
  summary?: string;
  tags: string[];
  confidence: ConfidenceLevel;
  guardian?: GuardianName;
  gate?: GateName;
  source?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

/** Input for creating a new vault entry (id + timestamps auto-generated) */
export interface VaultEntryInput {
  content: string;
  vault?: VaultType;       // If omitted, auto-classified
  summary?: string;
  tags?: string[];
  confidence?: ConfidenceLevel;
  guardian?: GuardianName;
  gate?: GateName;
  source?: string;
  metadata?: Record<string, unknown>;
  ttl?: number;            // Time-to-live in seconds
}

/** A Horizon Vault entry — append-only, never deleted */
export interface HorizonEntry {
  id: string;
  wish: string;            // The benevolent intention
  context: string;         // What prompted this wish
  author: string;          // Human or AI identifier
  coAuthored: boolean;     // Was this human-AI co-written?
  tags: string[];
  createdAt: string;
  // NO updatedAt — append-only
  // NO expiresAt — permanent
}

// ── Search & Query ──────────────────────────────────────

export interface VaultSearchOptions {
  query: string;
  vaults?: VaultType[];     // Filter to specific vaults
  guardian?: GuardianName;  // Filter by Guardian namespace
  tags?: string[];          // Filter by tags (AND logic)
  minConfidence?: ConfidenceLevel;
  limit?: number;
  offset?: number;
  sortBy?: 'relevance' | 'recency' | 'confidence';
}

export interface VaultSearchResult {
  entry: VaultEntry;
  score: number;           // Relevance score 0-1
  matchedTerms: string[];  // Which search terms matched
}

// ── Classification ──────────────────────────────────────

/** Rules for classifying content into vaults */
export interface ClassificationRule {
  vault: VaultType;
  keywords: string[];
  patterns: RegExp[];
  weight: number;          // Priority weight for tie-breaking
}

export interface ClassificationResult {
  vault: VaultType;
  confidence: number;      // 0-1 classification confidence
  reasoning: string;       // Why this vault was chosen
  alternateVault?: VaultType;
}

// ── Storage Backend ─────────────────────────────────────

export interface StorageBackend {
  initialize(): Promise<void>;
  store(entry: VaultEntry): Promise<void>;
  retrieve(id: string): Promise<VaultEntry | null>;
  search(options: VaultSearchOptions): Promise<VaultSearchResult[]>;
  list(vault: VaultType, limit?: number, offset?: number): Promise<VaultEntry[]>;
  remove(id: string): Promise<boolean>;
  count(vault?: VaultType): Promise<number>;
  clear(vault?: VaultType): Promise<void>;
}

// ── Mem0-Compatible API ─────────────────────────────────

/** Mem0-compatible memory message format */
export interface Mem0Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/** Mem0-compatible add request */
export interface Mem0AddRequest {
  messages: Mem0Message[];
  user_id?: string;
  agent_id?: string;
  metadata?: Record<string, unknown>;
}

/** Mem0-compatible search request */
export interface Mem0SearchRequest {
  query: string;
  user_id?: string;
  agent_id?: string;
  limit?: number;
}

/** Mem0-compatible memory response */
export interface Mem0MemoryResponse {
  id: string;
  memory: string;
  user_id?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ── Manager Configuration ───────────────────────────────

export interface MemorySystemConfig {
  storagePath?: string;           // Base path for file storage
  backend?: 'file' | 'mem0';     // Storage backend type
  mem0ApiKey?: string;            // For Mem0 cloud backend
  mem0BaseUrl?: string;           // Custom Mem0 endpoint
  defaultGuardian?: GuardianName;
  defaultConfidence?: ConfidenceLevel;
  horizonAuthor?: string;         // Default author for Horizon entries
  maxEntriesPerVault?: number;    // Capacity limit per vault
  enableAutoClassification?: boolean;
  enableHorizonExport?: boolean;  // Auto-export Horizon to dataset format
}

// ── Statistics ──────────────────────────────────────────

export interface VaultStats {
  vault: VaultType;
  entryCount: number;
  oldestEntry?: string;
  newestEntry?: string;
  topTags: Array<{ tag: string; count: number }>;
  guardianDistribution: Partial<Record<GuardianName, number>>;
}

export interface MemorySystemStats {
  totalEntries: number;
  vaultStats: VaultStats[];
  horizonEntries: number;
  storageBackend: string;
  lastActivity?: string;
}

// ── Utility ─────────────────────────────────────────────

/** Generate a unique memory ID with vault prefix */
export function generateMemoryId(prefix: string = 'vmem'): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `${prefix}_${timestamp}_${random}`;
}
