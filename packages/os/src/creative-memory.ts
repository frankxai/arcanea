/**
 * @arcanea/os — Creative Memory Integration Layer
 *
 * Wires @arcanea/guardian-memory into the creative skills ecosystem.
 * Each creative output type (character, world, scene, story, lore, design)
 * is routed to the canonical Guardian namespace that governs its domain:
 *
 *   Character  -> Leyla     (Flow / creativity / emotion)
 *   World      -> Lyssandria (Foundation / earth / structure)
 *   Scene      -> Lyria     (Sight / vision / insight)
 *   Story      -> Maylinn   (Heart / connection / narrative)
 *   Lore       -> Shinkami  (Source / meta-consciousness)
 *   Design     -> Leyla     (Flow / aesthetic / beauty)
 *
 * Architecture:
 *   Creative Skills -> CreativeMemoryManager -> GuardianMemory -> HNSW Index
 *
 * @example
 * ```typescript
 * import { createCreativeMemory } from '@arcanea/os/creative-memory';
 *
 * const memory = createCreativeMemory('.arcanea/creative-memory');
 *
 * await memory.storeCharacter({
 *   name: 'Kaelen Ashborn',
 *   element: 'fire',
 *   gate: 'fire',
 *   backstory: 'A former blacksmith who discovered the Third Gate...',
 *   traits: ['determined', 'impulsive', 'loyal'],
 *   relationships: [{ name: 'Mira', relation: 'mentor' }],
 * });
 *
 * const results = await memory.recall('character', 'blacksmith fire guardian');
 * const stats = memory.getCreativeStats();
 * ```
 *
 * @module
 */

// ── External Type Definitions ───────────────────────────────────
//
// Inlined from @arcanea/guardian-memory to avoid workspace resolution
// issues before pnpm install. When the monorepo is properly linked,
// these can be replaced with direct imports:
//
//   import { GuardianMemory, type GuardianName, ... } from '@arcanea/guardian-memory';
//
// This follows the same pattern used by @arcanea/council's external-types.ts.

/**
 * Canonical Guardian names — the Ten Gods/Goddesses who guard the Gates.
 * Each Guardian owns a memory namespace within the HNSW vector index.
 */
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

/** The Five Elements plus Spirit (Lumina's aspect of Void). */
export type Element = 'fire' | 'water' | 'earth' | 'wind' | 'void' | 'spirit';

/** Starlight Intelligence System vault categories. */
export type VaultCategory =
  | 'strategic'
  | 'technical'
  | 'creative'
  | 'operational'
  | 'wisdom'
  | 'horizon';

/** Memory type classification. */
export type MemoryType =
  | 'episodic'
  | 'semantic'
  | 'procedural'
  | 'pattern'
  | 'decision'
  | 'insight';

/** Access level for cross-Guardian visibility. */
export type AccessLevel = 'guardian' | 'council' | 'vault' | 'universal';

/**
 * Minimal interface for a Guardian memory entry.
 * Mirrors the shape from @arcanea/guardian-memory without coupling.
 */
export interface GuardianMemoryEntry {
  id: string;
  key: string;
  content: string;
  type: MemoryType;
  guardian: GuardianName;
  vault: VaultCategory;
  element?: Element;
  tags: string[];
  confidence: number;
  metadata: Record<string, unknown>;
  accessLevel: AccessLevel;
  createdAt: number;
  updatedAt: number;
  expiresAt?: number;
  version: number;
  references: string[];
  accessCount: number;
  source?: string;
}

/** Input shape for storing a new Guardian memory. */
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

/** Search options for Guardian memory queries. */
export interface GuardianSearchOptions {
  k: number;
  guardians?: GuardianName[];
  vault?: VaultCategory;
  type?: MemoryType;
  minConfidence?: number;
  tags?: string[];
  elementAffinity?: Element;
  threshold?: number;
  crossGuardian?: boolean;
}

/** Guardian profile with canonical Gate/frequency/element mapping. */
export interface GuardianProfile {
  name: GuardianName;
  gate: string;
  frequency: number;
  element: Element;
  vault: VaultCategory;
  godbeast: string;
}

/** Canonical Guardian profiles — Extended Solfeggio frequencies locked. */
const GUARDIANS: Record<GuardianName, GuardianProfile> = {
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

/** Element affinity matrix — knowledge transfer coefficients between elements. */
const ELEMENT_AFFINITY: Record<Element, Record<Element, number>> = {
  fire:   { fire: 1.0, water: 0.3, earth: 0.6, wind: 0.8, void: 0.5, spirit: 0.5 },
  water:  { fire: 0.3, water: 1.0, earth: 0.6, wind: 0.5, void: 0.7, spirit: 0.7 },
  earth:  { fire: 0.6, water: 0.6, earth: 1.0, wind: 0.4, void: 0.5, spirit: 0.5 },
  wind:   { fire: 0.8, water: 0.5, earth: 0.4, wind: 1.0, void: 0.6, spirit: 0.6 },
  void:   { fire: 0.5, water: 0.7, earth: 0.5, wind: 0.6, void: 1.0, spirit: 0.9 },
  spirit: { fire: 0.5, water: 0.7, earth: 0.5, wind: 0.6, void: 0.9, spirit: 1.0 },
};

/** Guardian vault mapping (shorthand). */
const GUARDIAN_VAULT_MAP: Record<GuardianName, VaultCategory> = {
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


// ── Creative Record Interfaces ──────────────────────────────────

/**
 * A character forged through the character-forge skill.
 * Stored in Leyla's namespace (Flow Gate, 285 Hz) — the domain of
 * creativity, emotion, and artistic expression.
 */
export interface CharacterRecord {
  /** Character's canonical name. */
  name: string;

  /** Primary elemental affinity. */
  element: Element;

  /** Which Gate the character is associated with. */
  gate: string;

  /** Origin story and background narrative. */
  backstory: string;

  /** Core personality traits. */
  traits: string[];

  /** Named relationships to other characters. */
  relationships: Array<{ name: string; relation: string }>;
}

/**
 * A world built through the world-build skill.
 * Stored in Lyssandria's namespace (Foundation Gate, 174 Hz) — the domain
 * of earth, stability, and structural integrity.
 */
export interface WorldRecord {
  /** World or region name. */
  name: string;

  /** Dominant element of this world/region. */
  element: Element;

  /** Geographic features and terrain description. */
  geography: string;

  /** Cultures, peoples, and societies inhabiting this world. */
  cultures: string[];

  /** Description of the magic system governing this world. */
  magicSystem: string;
}

/**
 * A scene composed through the scene-craft skill.
 * Stored in Lyria's namespace (Sight Gate, 639 Hz) — the domain
 * of vision, intuition, and seeing what others cannot.
 */
export interface SceneRecord {
  /** Scene title or identifier. */
  title: string;

  /** Characters present in the scene. */
  characters: string[];

  /** Physical and atmospheric setting description. */
  setting: string;

  /** Central conflict or tension driving the scene. */
  conflict: string;

  /** How the scene resolves (or leaves unresolved). */
  resolution: string;
}

/**
 * A story arc structured through narrative skills.
 * Stored in Maylinn's namespace (Heart Gate, 417 Hz) — the domain
 * of connection, healing, and the threads that bind hearts together.
 */
export interface StoryRecord {
  /** Story title. */
  title: string;

  /** The Arc structure: Potential -> Manifestation -> Experience -> Dissolution -> Evolved Potential. */
  arc: string;

  /** Chapter outlines or summaries. */
  chapters: string[];

  /** Thematic pillars of the story. */
  themes: string[];

  /** Dominant elemental resonance. */
  element: Element;
}

/**
 * A lore entry for the Arcanea canon.
 * Stored in Shinkami's namespace (Source Gate, 1111 Hz) — the domain
 * of meta-consciousness and the origin of all knowledge.
 */
export interface LoreRecord {
  /** Lore entry title. */
  title: string;

  /** Classification: mythology, history, prophecy, cosmology, bestiary, etc. */
  category: string;

  /** Reference to the canonical source (e.g., 'CANON_LOCKED.md#section'). */
  canonRef: string;

  /** Full lore content. */
  content: string;
}

/**
 * A design artifact from the design system.
 * Stored in Leyla's namespace (Flow Gate, 285 Hz) — aesthetic beauty
 * and creative expression live under the same Guardian as characters.
 */
export interface DesignRecord {
  /** Design element name (e.g., 'glass-card-variant-aurora'). */
  name: string;

  /** Type classification: component, token, pattern, animation, layout. */
  type: 'component' | 'token' | 'pattern' | 'animation' | 'layout';

  /** Design token values (CSS variables, Tailwind classes, etc.). */
  tokens: Record<string, string>;

  /** Glass morphism tier: subtle(8px), standard(16px), strong(24px), liquid(40px), iridescent. */
  glassLevel: 'subtle' | 'standard' | 'strong' | 'liquid' | 'iridescent';

  /** Elemental color palette this design draws from. */
  element: Element;
}


// ── Creative Type Enum ──────────────────────────────────────────

/** All creative content types managed by this layer. */
export type CreativeType = 'character' | 'world' | 'scene' | 'story' | 'lore' | 'design';


// ── Guardian Mapping ────────────────────────────────────────────

/**
 * Maps each creative content type to the Guardian who governs its domain.
 *
 * This mapping is derived from canonical Gate assignments:
 * - Characters are creative expressions -> Leyla (Flow, creativity)
 * - Worlds need structural foundations -> Lyssandria (Foundation, earth)
 * - Scenes require vision and insight -> Lyria (Sight, vision)
 * - Stories connect hearts through narrative -> Maylinn (Heart, connection)
 * - Lore is meta-knowledge of the universe -> Shinkami (Source, meta)
 * - Designs are aesthetic creations -> Leyla (Flow, beauty)
 */
export const CREATIVE_GUARDIAN_MAP: Readonly<Record<CreativeType, GuardianName>> = {
  character: 'leyla',
  world: 'lyssandria',
  scene: 'lyria',
  story: 'maylinn',
  lore: 'shinkami',
  design: 'leyla',
} as const;

/**
 * Reverse lookup: which creative types does each Guardian manage?
 * Computed at module load for O(1) access during recall operations.
 */
const GUARDIAN_CREATIVE_TYPES: ReadonlyMap<GuardianName, CreativeType[]> = (() => {
  const map = new Map<GuardianName, CreativeType[]>();
  for (const [type, guardian] of Object.entries(CREATIVE_GUARDIAN_MAP) as Array<[CreativeType, GuardianName]>) {
    const existing = map.get(guardian) ?? [];
    existing.push(type);
    map.set(guardian, existing);
  }
  return map;
})();

/**
 * Default tags generated per creative type — used for searchability.
 */
const CREATIVE_TYPE_TAGS: Readonly<Record<CreativeType, string[]>> = {
  character: ['creative', 'character', 'character-forge'],
  world:     ['creative', 'world', 'world-build'],
  scene:     ['creative', 'scene', 'scene-craft'],
  story:     ['creative', 'story', 'narrative'],
  lore:      ['creative', 'lore', 'canon', 'mythology'],
  design:    ['creative', 'design', 'design-system', 'visual'],
};


// ── Creative Statistics ─────────────────────────────────────────

/** Statistics about creative content stored in Guardian memory. */
export interface CreativeStats {
  /** Total number of creative entries across all types. */
  totalEntries: number;

  /** Count of entries per creative type. */
  byType: Record<CreativeType, number>;

  /** Count of entries per Guardian (only Guardians with creative content). */
  byGuardian: Partial<Record<GuardianName, number>>;

  /** Count of entries per element. */
  byElement: Partial<Record<Element, number>>;

  /** Timestamp of the most recent entry. */
  lastUpdated: number | null;
}


// ── Embedded GuardianMemory Stub ────────────────────────────────
//
// This module ships with an embedded lightweight memory store so it
// can function standalone without requiring the full @arcanea/guardian-memory
// package at runtime. When guardian-memory is available, the factory
// function injects the real implementation.

/** Generates a unique memory ID with the `cmem_` prefix for creative entries. */
function generateCreativeId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `cmem_${timestamp}_${random}`;
}

/**
 * Embedded memory store — a lightweight in-memory implementation
 * that mirrors the GuardianMemory API surface needed by CreativeMemoryManager.
 *
 * When the full @arcanea/guardian-memory package is available, the factory
 * function passes the real GuardianMemory instance instead.
 */
class EmbeddedMemoryStore {
  private entries = new Map<string, GuardianMemoryEntry>();
  private guardianIndex = new Map<GuardianName, Set<string>>();
  private tagIndex = new Map<string, Set<string>>();

  constructor() {
    // Initialize Guardian index sets
    for (const name of Object.keys(GUARDIANS) as GuardianName[]) {
      this.guardianIndex.set(name, new Set());
    }
  }

  /**
   * Store a memory entry.
   */
  async store(input: GuardianMemoryInput): Promise<GuardianMemoryEntry> {
    const now = Date.now();
    const profile = GUARDIANS[input.guardian];

    const entry: GuardianMemoryEntry = {
      id: generateCreativeId(),
      key: input.key,
      content: input.content,
      type: input.type ?? 'semantic',
      guardian: input.guardian,
      vault: input.vault ?? profile.vault,
      element: input.element ?? profile.element,
      tags: input.tags ?? [],
      confidence: input.confidence ?? 0.5,
      metadata: input.metadata ?? {},
      accessLevel: input.accessLevel ?? 'vault',
      createdAt: now,
      updatedAt: now,
      expiresAt: input.expiresAt,
      version: 1,
      references: input.references ?? [],
      accessCount: 0,
      source: input.source,
    };

    this.entries.set(entry.id, entry);
    this.guardianIndex.get(entry.guardian)?.add(entry.id);

    // Index tags
    for (const tag of entry.tags) {
      if (!this.tagIndex.has(tag)) {
        this.tagIndex.set(tag, new Set());
      }
      this.tagIndex.get(tag)!.add(entry.id);
    }

    return entry;
  }

  /**
   * Text-based search across entries using word matching.
   */
  searchByText(
    query: string,
    options?: Partial<GuardianSearchOptions>
  ): GuardianMemoryEntry[] {
    const queryWords = query
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const scores = new Map<string, number>();

    for (const [id, entry] of this.entries) {
      // Guardian filter
      if (options?.guardians && !options.guardians.includes(entry.guardian)) continue;
      // Vault filter
      if (options?.vault && entry.vault !== options.vault) continue;
      // Type filter
      if (options?.type && entry.type !== options.type) continue;
      // Confidence filter
      if (options?.minConfidence !== undefined && entry.confidence < options.minConfidence) continue;
      // Tag filter
      if (options?.tags && !options.tags.every((t) => entry.tags.includes(t))) continue;

      const content = `${entry.content} ${entry.tags.join(' ')} ${entry.key}`.toLowerCase();
      let score = 0;

      for (const word of queryWords) {
        if (content.includes(word)) {
          score += 1;
        }
      }

      // Element affinity bonus
      if (options?.elementAffinity && entry.element) {
        const affinityScore = ELEMENT_AFFINITY[options.elementAffinity]?.[entry.element] ?? 0.5;
        score += affinityScore * 0.5;
      }

      if (score > 0) {
        scores.set(id, score);
      }
    }

    const limit = options?.k ?? 10;

    return Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id]) => this.entries.get(id)!)
      .filter(Boolean);
  }

  /**
   * Recall all entries for a specific Guardian.
   */
  recallByGuardian(guardian: GuardianName, limit = 50): GuardianMemoryEntry[] {
    const ids = this.guardianIndex.get(guardian);
    if (!ids) return [];

    return Array.from(ids)
      .map((id) => this.entries.get(id)!)
      .filter(Boolean)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, limit);
  }

  /**
   * Get total entry count.
   */
  get size(): number {
    return this.entries.size;
  }

  /**
   * Get count for a specific Guardian.
   */
  guardianCount(guardian: GuardianName): number {
    return this.guardianIndex.get(guardian)?.size ?? 0;
  }

  /**
   * Iterate all entries.
   */
  values(): IterableIterator<GuardianMemoryEntry> {
    return this.entries.values();
  }
}


// ── CreativeMemoryManager ───────────────────────────────────────

/**
 * CreativeMemoryManager — the integration layer between Arcanea's
 * creative skills and the Guardian memory system.
 *
 * This class wraps GuardianMemory (or an embedded store) with
 * creative-skill-specific methods that handle:
 *
 * 1. **Guardian Routing** — each creative type is stored in the
 *    canonical Guardian's namespace based on domain alignment.
 *
 * 2. **Metadata Enrichment** — proper tags, vault categories,
 *    element affinities, and confidence scores are automatically
 *    computed from the creative record's content.
 *
 * 3. **Cross-Guardian Recall** — queries can search across multiple
 *    Guardian namespaces with element affinity weighting.
 *
 * 4. **Statistics** — real-time counts by type, Guardian, and element
 *    for creative dashboard and progress tracking.
 *
 * @example
 * ```typescript
 * const memory = new CreativeMemoryManager();
 *
 * // Store a character in Leyla's namespace
 * const entry = await memory.storeCharacter({
 *   name: 'Kaelen Ashborn',
 *   element: 'fire',
 *   gate: 'fire',
 *   backstory: 'Born in the Ember Wastes...',
 *   traits: ['bold', 'loyal', 'reckless'],
 *   relationships: [{ name: 'Lyra', relation: 'rival' }],
 * });
 *
 * // Recall characters matching a query
 * const results = await memory.recall('character', 'fire warrior loyal');
 * ```
 */
export class CreativeMemoryManager {
  /** The underlying memory store (embedded or injected GuardianMemory). */
  private readonly store: EmbeddedMemoryStore;

  /**
   * Create a new CreativeMemoryManager.
   *
   * @param store - An EmbeddedMemoryStore or compatible GuardianMemory instance.
   *                If not provided, an embedded in-memory store is created.
   */
  constructor(store?: EmbeddedMemoryStore) {
    this.store = store ?? new EmbeddedMemoryStore();
  }

  // ── Character Storage (Leyla / Flow / 285 Hz) ───────────────

  /**
   * Store a character record in Leyla's namespace.
   *
   * Characters are creative expressions — emotional, nuanced beings
   * born from the Flow Gate. Leyla, the Creative Flow Artist, governs
   * this domain with the water element's depth and fluidity.
   *
   * @param character - The character record to store.
   * @returns The created Guardian memory entry.
   */
  async storeCharacter(character: CharacterRecord): Promise<GuardianMemoryEntry> {
    const guardian: GuardianName = CREATIVE_GUARDIAN_MAP.character;
    const profile = GUARDIANS[guardian];

    const content = this.serializeCharacter(character);
    const confidence = this.computeCharacterConfidence(character);

    return this.store.store({
      key: `character:${this.slugify(character.name)}`,
      content,
      guardian,
      type: 'semantic',
      vault: profile.vault,
      element: character.element,
      tags: [
        ...CREATIVE_TYPE_TAGS.character,
        `element:${character.element}`,
        `gate:${character.gate}`,
        ...character.traits.slice(0, 5).map((t) => `trait:${t.toLowerCase()}`),
      ],
      confidence,
      metadata: {
        creativeType: 'character' as CreativeType,
        characterName: character.name,
        element: character.element,
        gate: character.gate,
        traitCount: character.traits.length,
        relationshipCount: character.relationships.length,
      },
      accessLevel: 'vault',
      source: 'creative-memory/character-forge',
    });
  }

  // ── World Storage (Lyssandria / Foundation / 174 Hz) ────────

  /**
   * Store a world record in Lyssandria's namespace.
   *
   * Worlds are structural creations — geography, cultures, systems.
   * Lyssandria, the Foundation Architect, builds the bedrock upon
   * which all stories stand. Her earth element gives worlds weight.
   *
   * @param world - The world record to store.
   * @returns The created Guardian memory entry.
   */
  async storeWorld(world: WorldRecord): Promise<GuardianMemoryEntry> {
    const guardian: GuardianName = CREATIVE_GUARDIAN_MAP.world;
    const profile = GUARDIANS[guardian];

    const content = this.serializeWorld(world);
    const confidence = this.computeWorldConfidence(world);

    return this.store.store({
      key: `world:${this.slugify(world.name)}`,
      content,
      guardian,
      type: 'semantic',
      vault: profile.vault,
      element: world.element,
      tags: [
        ...CREATIVE_TYPE_TAGS.world,
        `element:${world.element}`,
        ...world.cultures.slice(0, 5).map((c) => `culture:${this.slugify(c)}`),
      ],
      confidence,
      metadata: {
        creativeType: 'world' as CreativeType,
        worldName: world.name,
        element: world.element,
        cultureCount: world.cultures.length,
        hasMagicSystem: Boolean(world.magicSystem),
      },
      accessLevel: 'vault',
      source: 'creative-memory/world-build',
    });
  }

  // ── Scene Storage (Lyria / Sight / 639 Hz) ─────────────────

  /**
   * Store a scene record in Lyria's namespace.
   *
   * Scenes are visions — crystallized moments of dramatic truth.
   * Lyria, the Vision Keeper, sees the threads of narrative that
   * connect past to future. Her void element grants scenes depth
   * beyond the visible.
   *
   * @param scene - The scene record to store.
   * @returns The created Guardian memory entry.
   */
  async storeScene(scene: SceneRecord): Promise<GuardianMemoryEntry> {
    const guardian: GuardianName = CREATIVE_GUARDIAN_MAP.scene;
    const profile = GUARDIANS[guardian];

    const content = this.serializeScene(scene);
    const confidence = this.computeSceneConfidence(scene);

    return this.store.store({
      key: `scene:${this.slugify(scene.title)}`,
      content,
      guardian,
      type: 'episodic',
      vault: profile.vault,
      element: profile.element,
      tags: [
        ...CREATIVE_TYPE_TAGS.scene,
        ...scene.characters.slice(0, 5).map((c) => `character:${this.slugify(c)}`),
        scene.conflict ? 'has-conflict' : 'no-conflict',
        scene.resolution ? 'resolved' : 'unresolved',
      ],
      confidence,
      metadata: {
        creativeType: 'scene' as CreativeType,
        sceneTitle: scene.title,
        characterCount: scene.characters.length,
        hasResolution: Boolean(scene.resolution),
        hasConflict: Boolean(scene.conflict),
      },
      accessLevel: 'vault',
      source: 'creative-memory/scene-craft',
    });
  }

  // ── Story Storage (Maylinn / Heart / 417 Hz) ───────────────

  /**
   * Store a story record in Maylinn's namespace.
   *
   * Stories are the heartbeat of Arcanea — narratives that connect
   * creator to creation, reader to truth. Maylinn, the Heart Connector,
   * weaves the emotional threads that give stories their power to
   * heal and transform.
   *
   * @param story - The story record to store.
   * @returns The created Guardian memory entry.
   */
  async storeStory(story: StoryRecord): Promise<GuardianMemoryEntry> {
    const guardian: GuardianName = CREATIVE_GUARDIAN_MAP.story;
    const profile = GUARDIANS[guardian];

    const content = this.serializeStory(story);
    const confidence = this.computeStoryConfidence(story);

    return this.store.store({
      key: `story:${this.slugify(story.title)}`,
      content,
      guardian,
      type: 'semantic',
      vault: profile.vault,
      element: story.element,
      tags: [
        ...CREATIVE_TYPE_TAGS.story,
        `element:${story.element}`,
        ...story.themes.slice(0, 5).map((t) => `theme:${this.slugify(t)}`),
      ],
      confidence,
      metadata: {
        creativeType: 'story' as CreativeType,
        storyTitle: story.title,
        element: story.element,
        chapterCount: story.chapters.length,
        themeCount: story.themes.length,
        arcDescription: story.arc,
      },
      accessLevel: 'vault',
      source: 'creative-memory/narrative',
    });
  }

  // ── Lore Storage (Shinkami / Source / 1111 Hz) ──────────────

  /**
   * Store a lore entry in Shinkami's namespace.
   *
   * Lore is the meta-knowledge of Arcanea — the canon that defines
   * what is true. Shinkami, the Meta-Architect at the Source Gate,
   * holds all lore as the origin of origins. Entries stored here
   * carry the highest canonical weight.
   *
   * @param entry - The lore record to store.
   * @returns The created Guardian memory entry.
   */
  async storeLoreEntry(entry: LoreRecord): Promise<GuardianMemoryEntry> {
    const guardian: GuardianName = CREATIVE_GUARDIAN_MAP.lore;
    const profile = GUARDIANS[guardian];

    const content = this.serializeLore(entry);
    const confidence = this.computeLoreConfidence(entry);

    return this.store.store({
      key: `lore:${this.slugify(entry.title)}`,
      content,
      guardian,
      type: 'semantic',
      vault: profile.vault,
      element: profile.element,
      tags: [
        ...CREATIVE_TYPE_TAGS.lore,
        `lore-category:${this.slugify(entry.category)}`,
        entry.canonRef ? 'canon-referenced' : 'canon-pending',
      ],
      confidence,
      metadata: {
        creativeType: 'lore' as CreativeType,
        loreTitle: entry.title,
        loreCategory: entry.category,
        canonRef: entry.canonRef,
        contentLength: entry.content.length,
      },
      accessLevel: 'universal',
      source: 'creative-memory/lore-keeper',
    });
  }

  // ── Design Storage (Leyla / Flow / 285 Hz) ─────────────────

  /**
   * Store a design record in Leyla's namespace.
   *
   * Designs are aesthetic manifestations — the visual language of
   * Arcanea rendered in glass, light, and cosmic depth. Like characters,
   * design lives under Leyla's creative governance, but carries
   * distinct metadata for the design system pipeline.
   *
   * @param design - The design record to store.
   * @returns The created Guardian memory entry.
   */
  async storeDesign(design: DesignRecord): Promise<GuardianMemoryEntry> {
    const guardian: GuardianName = CREATIVE_GUARDIAN_MAP.design;
    const profile = GUARDIANS[guardian];

    const content = this.serializeDesign(design);
    const confidence = this.computeDesignConfidence(design);

    return this.store.store({
      key: `design:${this.slugify(design.name)}`,
      content,
      guardian,
      type: 'procedural',
      vault: profile.vault,
      element: design.element,
      tags: [
        ...CREATIVE_TYPE_TAGS.design,
        `design-type:${design.type}`,
        `glass:${design.glassLevel}`,
        `element:${design.element}`,
      ],
      confidence,
      metadata: {
        creativeType: 'design' as CreativeType,
        designName: design.name,
        designType: design.type,
        glassLevel: design.glassLevel,
        element: design.element,
        tokenCount: Object.keys(design.tokens).length,
        tokens: design.tokens,
      },
      accessLevel: 'vault',
      source: 'creative-memory/design-system',
    });
  }

  // ── Recall Methods ────────────────────────────────────────────

  /**
   * Recall creative entries by type and query string.
   *
   * Searches within the Guardian namespace(s) that govern the specified
   * creative type. Uses word-index matching with element affinity weighting.
   *
   * @param type - The creative content type to search within.
   * @param query - Natural language search query.
   * @param limit - Maximum number of results (default: 10).
   * @returns Matching Guardian memory entries, sorted by relevance.
   */
  async recall(
    type: CreativeType,
    query: string,
    limit: number = 10
  ): Promise<GuardianMemoryEntry[]> {
    const guardian = CREATIVE_GUARDIAN_MAP[type];
    const profile = GUARDIANS[guardian];

    return this.store.searchByText(query, {
      k: limit,
      guardians: [guardian],
      tags: [`creative`, type],
      elementAffinity: profile.element,
    });
  }

  /**
   * Recall creative entries by elemental affinity.
   *
   * Searches across ALL Guardian namespaces that hold creative content,
   * but boosts results whose element matches or is affine to the
   * specified element. This enables cross-domain creative discovery:
   * "Find all fire-aligned creative content across characters, worlds,
   * and designs."
   *
   * @param element - The element to search by affinity.
   * @param query - Natural language search query.
   * @param limit - Maximum number of results (default: 10).
   * @returns Matching entries from any creative Guardian, ranked by affinity.
   */
  async recallByElement(
    element: Element,
    query: string,
    limit: number = 10
  ): Promise<GuardianMemoryEntry[]> {
    // Gather all Guardians that manage creative types
    const creativeGuardians = Array.from(
      new Set(Object.values(CREATIVE_GUARDIAN_MAP))
    );

    return this.store.searchByText(query, {
      k: limit,
      guardians: creativeGuardians,
      tags: ['creative'],
      elementAffinity: element,
    });
  }

  // ── Statistics ────────────────────────────────────────────────

  /**
   * Get comprehensive statistics about creative content in memory.
   *
   * Returns counts broken down by creative type, Guardian, and element.
   * Useful for creative dashboards, progress tracking through the Gates,
   * and understanding the balance of creative output.
   *
   * @returns Creative content statistics.
   */
  getCreativeStats(): CreativeStats {
    const byType: Record<CreativeType, number> = {
      character: 0,
      world: 0,
      scene: 0,
      story: 0,
      lore: 0,
      design: 0,
    };
    const byGuardian: Partial<Record<GuardianName, number>> = {};
    const byElement: Partial<Record<Element, number>> = {};
    let lastUpdated: number | null = null;
    let totalEntries = 0;

    for (const entry of this.store.values()) {
      // Only count creative entries
      const creativeType = entry.metadata?.creativeType as CreativeType | undefined;
      if (!creativeType || !(creativeType in byType)) continue;

      totalEntries++;
      byType[creativeType]++;

      // Guardian counts
      byGuardian[entry.guardian] = (byGuardian[entry.guardian] ?? 0) + 1;

      // Element counts
      if (entry.element) {
        byElement[entry.element] = (byElement[entry.element] ?? 0) + 1;
      }

      // Track most recent update
      if (lastUpdated === null || entry.updatedAt > lastUpdated) {
        lastUpdated = entry.updatedAt;
      }
    }

    return {
      totalEntries,
      byType,
      byGuardian,
      byElement,
      lastUpdated,
    };
  }

  // ── Serialization ─────────────────────────────────────────────

  /**
   * Serialize a character record into searchable content.
   * Combines all fields into a single text block optimized for
   * word-index and future embedding-based search.
   */
  private serializeCharacter(character: CharacterRecord): string {
    const relationships = character.relationships
      .map((r) => `${r.name} (${r.relation})`)
      .join(', ');

    return [
      `Character: ${character.name}`,
      `Element: ${character.element}`,
      `Gate: ${character.gate}`,
      `Traits: ${character.traits.join(', ')}`,
      `Relationships: ${relationships}`,
      `Backstory: ${character.backstory}`,
    ].join('\n');
  }

  /**
   * Serialize a world record into searchable content.
   */
  private serializeWorld(world: WorldRecord): string {
    return [
      `World: ${world.name}`,
      `Element: ${world.element}`,
      `Geography: ${world.geography}`,
      `Cultures: ${world.cultures.join(', ')}`,
      `Magic System: ${world.magicSystem}`,
    ].join('\n');
  }

  /**
   * Serialize a scene record into searchable content.
   */
  private serializeScene(scene: SceneRecord): string {
    return [
      `Scene: ${scene.title}`,
      `Characters: ${scene.characters.join(', ')}`,
      `Setting: ${scene.setting}`,
      `Conflict: ${scene.conflict}`,
      `Resolution: ${scene.resolution}`,
    ].join('\n');
  }

  /**
   * Serialize a story record into searchable content.
   */
  private serializeStory(story: StoryRecord): string {
    const chapterList = story.chapters
      .map((ch, i) => `  ${i + 1}. ${ch}`)
      .join('\n');

    return [
      `Story: ${story.title}`,
      `Element: ${story.element}`,
      `Arc: ${story.arc}`,
      `Themes: ${story.themes.join(', ')}`,
      `Chapters:\n${chapterList}`,
    ].join('\n');
  }

  /**
   * Serialize a lore record into searchable content.
   */
  private serializeLore(entry: LoreRecord): string {
    return [
      `Lore: ${entry.title}`,
      `Category: ${entry.category}`,
      `Canon Reference: ${entry.canonRef}`,
      `Content: ${entry.content}`,
    ].join('\n');
  }

  /**
   * Serialize a design record into searchable content.
   */
  private serializeDesign(design: DesignRecord): string {
    const tokenList = Object.entries(design.tokens)
      .map(([key, value]) => `  ${key}: ${value}`)
      .join('\n');

    return [
      `Design: ${design.name}`,
      `Type: ${design.type}`,
      `Glass Level: ${design.glassLevel}`,
      `Element: ${design.element}`,
      `Tokens:\n${tokenList}`,
    ].join('\n');
  }

  // ── Confidence Computation ────────────────────────────────────
  //
  // Each creative type has a confidence heuristic based on how
  // "complete" the record is. More detailed records get higher
  // confidence, which influences search ranking.

  /**
   * Compute confidence score for a character record.
   *
   * Factors:
   * - Has backstory (0.2)
   * - Has 3+ traits (0.2)
   * - Has relationships (0.2)
   * - Has element + gate (0.2)
   * - Backstory length > 100 chars (0.2)
   */
  private computeCharacterConfidence(character: CharacterRecord): number {
    let confidence = 0;
    if (character.backstory && character.backstory.length > 0) confidence += 0.2;
    if (character.traits.length >= 3) confidence += 0.2;
    if (character.relationships.length > 0) confidence += 0.2;
    if (character.element && character.gate) confidence += 0.2;
    if (character.backstory && character.backstory.length > 100) confidence += 0.2;
    return Math.min(1, confidence);
  }

  /**
   * Compute confidence score for a world record.
   *
   * Factors:
   * - Has geography (0.2)
   * - Has 2+ cultures (0.2)
   * - Has magic system (0.2)
   * - Has element (0.2)
   * - Geography length > 100 chars (0.2)
   */
  private computeWorldConfidence(world: WorldRecord): number {
    let confidence = 0;
    if (world.geography && world.geography.length > 0) confidence += 0.2;
    if (world.cultures.length >= 2) confidence += 0.2;
    if (world.magicSystem && world.magicSystem.length > 0) confidence += 0.2;
    if (world.element) confidence += 0.2;
    if (world.geography && world.geography.length > 100) confidence += 0.2;
    return Math.min(1, confidence);
  }

  /**
   * Compute confidence score for a scene record.
   *
   * Factors:
   * - Has 2+ characters (0.2)
   * - Has setting (0.2)
   * - Has conflict (0.2)
   * - Has resolution (0.2)
   * - Setting length > 50 chars (0.2)
   */
  private computeSceneConfidence(scene: SceneRecord): number {
    let confidence = 0;
    if (scene.characters.length >= 2) confidence += 0.2;
    if (scene.setting && scene.setting.length > 0) confidence += 0.2;
    if (scene.conflict && scene.conflict.length > 0) confidence += 0.2;
    if (scene.resolution && scene.resolution.length > 0) confidence += 0.2;
    if (scene.setting && scene.setting.length > 50) confidence += 0.2;
    return Math.min(1, confidence);
  }

  /**
   * Compute confidence score for a story record.
   *
   * Factors:
   * - Has arc description (0.2)
   * - Has 3+ chapters (0.2)
   * - Has 2+ themes (0.2)
   * - Has element (0.2)
   * - Arc description > 50 chars (0.2)
   */
  private computeStoryConfidence(story: StoryRecord): number {
    let confidence = 0;
    if (story.arc && story.arc.length > 0) confidence += 0.2;
    if (story.chapters.length >= 3) confidence += 0.2;
    if (story.themes.length >= 2) confidence += 0.2;
    if (story.element) confidence += 0.2;
    if (story.arc && story.arc.length > 50) confidence += 0.2;
    return Math.min(1, confidence);
  }

  /**
   * Compute confidence score for a lore record.
   *
   * Factors:
   * - Has canon reference (0.3 — lore without canon ref is suspect)
   * - Has category (0.2)
   * - Content length > 100 chars (0.2)
   * - Content length > 500 chars (0.2)
   * - Has title (0.1)
   */
  private computeLoreConfidence(entry: LoreRecord): number {
    let confidence = 0;
    if (entry.canonRef && entry.canonRef.length > 0) confidence += 0.3;
    if (entry.category && entry.category.length > 0) confidence += 0.2;
    if (entry.content && entry.content.length > 100) confidence += 0.2;
    if (entry.content && entry.content.length > 500) confidence += 0.2;
    if (entry.title && entry.title.length > 0) confidence += 0.1;
    return Math.min(1, confidence);
  }

  /**
   * Compute confidence score for a design record.
   *
   * Factors:
   * - Has 3+ tokens (0.2)
   * - Has glass level (0.2)
   * - Has element (0.2)
   * - Has type (0.2)
   * - Has 5+ tokens (0.2)
   */
  private computeDesignConfidence(design: DesignRecord): number {
    let confidence = 0;
    if (Object.keys(design.tokens).length >= 3) confidence += 0.2;
    if (design.glassLevel) confidence += 0.2;
    if (design.element) confidence += 0.2;
    if (design.type) confidence += 0.2;
    if (Object.keys(design.tokens).length >= 5) confidence += 0.2;
    return Math.min(1, confidence);
  }

  // ── Utilities ─────────────────────────────────────────────────

  /**
   * Convert a display name to a URL-safe slug.
   * Used for memory keys: "Kaelen Ashborn" -> "kaelen-ashborn".
   */
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}


// ── Factory Function ────────────────────────────────────────────

/**
 * Create a new CreativeMemoryManager with an embedded memory store.
 *
 * This is the recommended way to instantiate the creative memory layer.
 * The `storagePath` parameter is reserved for future persistence support
 * when wiring to the full @arcanea/guardian-memory with file-backed storage.
 *
 * @param _storagePath - Reserved for future file-based persistence.
 *                       Currently unused by the embedded store.
 * @returns A fully configured CreativeMemoryManager.
 *
 * @example
 * ```typescript
 * import { createCreativeMemory } from '@arcanea/os/creative-memory';
 *
 * const memory = createCreativeMemory('.arcanea/creative-memory');
 *
 * await memory.storeCharacter({
 *   name: 'Mira Stoneweave',
 *   element: 'earth',
 *   gate: 'foundation',
 *   backstory: 'Daughter of the Mountain Keep...',
 *   traits: ['patient', 'stubborn', 'wise'],
 *   relationships: [],
 * });
 *
 * const stats = memory.getCreativeStats();
 * console.log(`Total creative entries: ${stats.totalEntries}`);
 * ```
 */
export function createCreativeMemory(_storagePath?: string): CreativeMemoryManager {
  const store = new EmbeddedMemoryStore();
  return new CreativeMemoryManager(store);
}
