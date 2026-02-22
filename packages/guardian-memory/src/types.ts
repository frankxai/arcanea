/**
 * @arcanea/guardian-memory — Type Definitions
 *
 * Bridges Starlight Intelligence System vault philosophy
 * with claude-flow HNSW vector engine, organized by Guardian namespaces.
 *
 * Architecture:
 *   SIS Vaults (philosophy) + HNSW (engine) = Guardian Memory (product)
 */

// ── Guardian Names (canonical from @arcanea/os) ──────────────

export type GuardianName =
  | 'shinkami'
  | 'lyssandria'
  | 'draconia'
  | 'lyria'
  | 'alera'
  | 'maylinn'
  | 'aiyami'
  | 'elara'
  | 'ino'
  | 'leyla';

export type Element = 'fire' | 'water' | 'earth' | 'wind' | 'void' | 'spirit';

// ── Starlight Vault Categories ───────────────────────────────

export type VaultCategory =
  | 'strategic'    // Shinkami — decisions, orchestration
  | 'technical'    // Lyssandria + Draconia — infrastructure, execution
  | 'creative'     // Leyla + Maylinn — creativity, healing
  | 'operational'  // Alera + Ino — standards, integration
  | 'wisdom'       // Aiyami + Elara — learning, transformation
  | 'horizon';     // Lyria — vision, prediction

// ── Memory Types ─────────────────────────────────────────────

export type MemoryType =
  | 'episodic'     // Time-based experiences
  | 'semantic'     // Facts, concepts, knowledge
  | 'procedural'   // How-to knowledge and skills
  | 'pattern'      // Recognized patterns (from ReasoningBank)
  | 'decision'     // Decisions and their outcomes
  | 'insight';     // Cross-domain insights

export type AccessLevel =
  | 'guardian'     // Only this Guardian
  | 'council'     // All Guardians in session
  | 'vault'       // Within the vault category
  | 'universal';  // Accessible everywhere

// ── Distance Metrics ─────────────────────────────────────────

export type DistanceMetric = 'cosine' | 'euclidean' | 'dot' | 'manhattan';

// ── Guardian Memory Entry ────────────────────────────────────

/**
 * A memory entry owned by a Guardian, stored with vector embedding
 * for semantic search. Extends both SIS MemoryEntry concepts and
 * claude-flow's vector-enabled entries.
 */
export interface GuardianMemoryEntry {
  /** Unique identifier */
  id: string;

  /** Human-readable key */
  key: string;

  /** Content of the memory */
  content: string;

  /** Vector embedding for semantic search */
  embedding?: Float32Array;

  /** Memory type classification */
  type: MemoryType;

  /** Owning Guardian */
  guardian: GuardianName;

  /** Vault category (maps to SIS vault) */
  vault: VaultCategory;

  /** Element affinity */
  element?: Element;

  /** Tags for filtering */
  tags: string[];

  /** Confidence score 0-1 */
  confidence: number;

  /** Additional metadata */
  metadata: Record<string, unknown>;

  /** Access level */
  accessLevel: AccessLevel;

  /** Creation timestamp */
  createdAt: number;

  /** Last update timestamp */
  updatedAt: number;

  /** Expiration timestamp */
  expiresAt?: number;

  /** Version for optimistic locking */
  version: number;

  /** References to other entries */
  references: string[];

  /** Access count */
  accessCount: number;

  /** Source (e.g., which session, which task) */
  source?: string;
}

// ── Input/Update Types ───────────────────────────────────────

export interface GuardianMemoryInput {
  key: string;
  content: string;
  guardian: GuardianName;
  type?: MemoryType;
  vault?: VaultCategory;
  element?: Element;
  tags?: string[];
  confidence?: number;
  metadata?: Record<string, unknown>;
  accessLevel?: AccessLevel;
  expiresAt?: number;
  references?: string[];
  source?: string;
}

export interface GuardianMemoryUpdate {
  content?: string;
  tags?: string[];
  confidence?: number;
  metadata?: Record<string, unknown>;
  accessLevel?: AccessLevel;
  expiresAt?: number;
  references?: string[];
}

// ── Search Types ─────────────────────────────────────────────

export interface GuardianSearchOptions {
  /** Number of results */
  k: number;

  /** Restrict to specific Guardian(s) */
  guardians?: GuardianName[];

  /** Restrict to vault category */
  vault?: VaultCategory;

  /** Memory type filter */
  type?: MemoryType;

  /** Minimum confidence */
  minConfidence?: number;

  /** Tag filter (must have all) */
  tags?: string[];

  /** Element affinity (boost matching elements) */
  elementAffinity?: Element;

  /** Search expansion factor (higher = more accurate) */
  ef?: number;

  /** Minimum similarity threshold 0-1 */
  threshold?: number;

  /** Include cross-Guardian results with affinity weighting */
  crossGuardian?: boolean;
}

export interface GuardianSearchResult {
  /** The memory entry */
  entry: GuardianMemoryEntry;

  /** Similarity score 0-1 */
  score: number;

  /** Raw distance from query vector */
  distance: number;

  /** Element affinity bonus applied */
  affinityBonus?: number;
}

// ── HNSW Config ──────────────────────────────────────────────

export interface HNSWConfig {
  /** Vector dimensions (default: 768 for common models) */
  dimensions: number;

  /** Max connections per layer (default: 16) */
  M: number;

  /** Construction expansion factor (default: 200) */
  efConstruction: number;

  /** Maximum elements per index */
  maxElements: number;

  /** Distance metric */
  metric: DistanceMetric;

  /** Quantization for memory efficiency */
  quantization?: QuantizationConfig;
}

export interface QuantizationConfig {
  type: 'binary' | 'scalar' | 'product';
  bits?: 4 | 8 | 16;
  subquantizers?: number;
  codebookSize?: number;
}

export interface HNSWStats {
  vectorCount: number;
  memoryUsage: number;
  avgSearchTime: number;
  buildTime: number;
  compressionRatio?: number;
}

// ── Guardian Metadata ────────────────────────────────────────

export interface GuardianProfile {
  name: GuardianName;
  gate: string;
  frequency: number;
  element: Element;
  vault: VaultCategory;
  godbeast: string;
}

/** Canonical Guardian profiles */
export const GUARDIANS: Record<GuardianName, GuardianProfile> = {
  lyssandria: { name: 'lyssandria', gate: 'Foundation', frequency: 174, element: 'earth', vault: 'technical', godbeast: 'Kaelith' },
  leyla:      { name: 'leyla',      gate: 'Flow',       frequency: 285, element: 'water', vault: 'creative',  godbeast: 'Veloura' },
  draconia:   { name: 'draconia',   gate: 'Fire',       frequency: 396, element: 'fire',  vault: 'technical', godbeast: 'Draconis' },
  maylinn:    { name: 'maylinn',    gate: 'Heart',      frequency: 417, element: 'water', vault: 'creative',  godbeast: 'Laeylinn' },
  alera:      { name: 'alera',      gate: 'Voice',      frequency: 528, element: 'wind',  vault: 'operational', godbeast: 'Otome' },
  lyria:      { name: 'lyria',      gate: 'Sight',      frequency: 639, element: 'void',  vault: 'horizon',  godbeast: 'Yumiko' },
  aiyami:     { name: 'aiyami',     gate: 'Crown',      frequency: 741, element: 'void',  vault: 'wisdom',   godbeast: 'Sol' },
  elara:      { name: 'elara',      gate: 'Shift',      frequency: 852, element: 'wind',  vault: 'wisdom',   godbeast: 'Thessara' },
  ino:        { name: 'ino',        gate: 'Unity',      frequency: 963, element: 'earth', vault: 'operational', godbeast: 'Kyuro' },
  shinkami:   { name: 'shinkami',    gate: 'Source',      frequency: 1111, element: 'void', vault: 'strategic', godbeast: 'Amaterasu' },
};

/** Element affinity matrix — how well elements transfer knowledge */
export const ELEMENT_AFFINITY: Record<Element, Record<Element, number>> = {
  fire:   { fire: 1.0, water: 0.3, earth: 0.6, wind: 0.8, void: 0.5, spirit: 0.5 },
  water:  { fire: 0.3, water: 1.0, earth: 0.6, wind: 0.5, void: 0.7, spirit: 0.7 },
  earth:  { fire: 0.6, water: 0.6, earth: 1.0, wind: 0.4, void: 0.5, spirit: 0.5 },
  wind:   { fire: 0.8, water: 0.5, earth: 0.4, wind: 1.0, void: 0.6, spirit: 0.6 },
  void:   { fire: 0.5, water: 0.7, earth: 0.5, wind: 0.6, void: 1.0, spirit: 0.9 },
  spirit: { fire: 0.5, water: 0.7, earth: 0.5, wind: 0.6, void: 0.9, spirit: 1.0 },
};

/** Map Guardian to their SIS vault */
export const GUARDIAN_VAULT_MAP: Record<GuardianName, VaultCategory> = {
  shinkami:    'strategic',
  lyssandria:  'technical',
  draconia:    'technical',
  lyria:       'horizon',
  alera:       'operational',
  maylinn:     'creative',
  aiyami:      'wisdom',
  elara:       'wisdom',
  ino:         'operational',
  leyla:       'creative',
};

// ── Utility Functions ────────────────────────────────────────

export function generateMemoryId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `gmem_${timestamp}_${random}`;
}

export function createGuardianEntry(input: GuardianMemoryInput): GuardianMemoryEntry {
  const now = Date.now();
  const profile = GUARDIANS[input.guardian];
  return {
    id: generateMemoryId(),
    key: input.key,
    content: input.content,
    type: input.type ?? 'semantic',
    guardian: input.guardian,
    vault: input.vault ?? profile.vault,
    element: input.element ?? profile.element,
    tags: input.tags ?? [],
    confidence: input.confidence ?? 0.5,
    metadata: input.metadata ?? {},
    accessLevel: input.accessLevel ?? 'guardian',
    createdAt: now,
    updatedAt: now,
    expiresAt: input.expiresAt,
    version: 1,
    references: input.references ?? [],
    accessCount: 0,
    source: input.source,
  };
}
