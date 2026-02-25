/**
 * Arcanea Intelligence Layer
 *
 * The bridge between the v0 Chat UI components and the Arcanea intelligence stack.
 * This module is the SINGLE SOURCE OF TRUTH for Guardian data, routing logic,
 * conversation memory, canon validation, and system prompt generation within the
 * web application's client-side runtime.
 *
 * All Guardian profiles, frequencies, elements, and domains are aligned to
 * `.arcanea/lore/CANON_LOCKED.md` (Extended Solfeggio, Feb 21 2026).
 *
 * CLIENT-SAFE: No Node.js fs imports, no server-only code.
 * Uses localStorage for persistence (conversations, memory).
 *
 * @module arcanea-intelligence
 * @version 1.0.0
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * The ten canonical Guardian names (God/Goddess identities).
 * "Guardian" is their role as Gate-keepers; the name is their divine identity.
 */
export type GuardianName =
  | 'lyssandria'
  | 'leyla'
  | 'draconia'
  | 'maylinn'
  | 'alera'
  | 'lyria'
  | 'aiyami'
  | 'elara'
  | 'ino'
  | 'shinkami';

/** The canonical Five Elements of Arcanea. */
export type Element = 'fire' | 'water' | 'earth' | 'wind' | 'void';

/** The ten canonical Gate names. */
export type GateName =
  | 'Foundation'
  | 'Flow'
  | 'Fire'
  | 'Heart'
  | 'Voice'
  | 'Sight'
  | 'Crown'
  | 'Shift'
  | 'Unity'
  | 'Source';

/** Model tiers map to Magic Ranks and control response depth. */
export type ModelTier = 'luminor' | 'archmage' | 'mage';

/** A single chat message with optional Guardian attribution. */
export interface ChatMessage {
  /** Message role: user input or assistant (Guardian) response. */
  role: 'user' | 'assistant';
  /** The message content (Markdown supported). */
  content: string;
  /** ISO 8601 timestamp of when the message was created. */
  timestamp: string;
  /** Which Guardian generated or received this message. */
  guardian?: GuardianName;
}

/** Result of routing an input message to a Guardian. */
export interface RouteResult {
  /** The Guardian best suited to handle this input. */
  guardian: GuardianName;
  /** Confidence score from 0.0 to 1.0. */
  confidence: number;
  /** The Guardian's primary element. */
  element: Element;
  /** Human-readable explanation of why this Guardian was selected. */
  reasoning: string;
}

/** Full Guardian context for UI rendering and prompt generation. */
export interface GuardianContext {
  /** Display name (capitalized). */
  name: string;
  /** The Gate this Guardian keeps. */
  gate: GateName;
  /** Extended Solfeggio frequency in Hz. */
  frequency: number;
  /** Primary element affinity. */
  element: Element;
  /** Hex color for UI theming. */
  color: string;
  /** Bonded Godbeast name. */
  godbeast: string;
  /** Domain description. */
  domain: string;
  /** Personality summary for prompt engineering. */
  personality: string;
  /** Speaking style descriptor (from Voice Bible). */
  voice: string;
  /** Gate number (1-10). */
  gateNumber: number;
}

/** A recalled memory entry from conversation storage. */
export interface MemoryResult {
  /** The recalled message content. */
  content: string;
  /** Which Guardian was active during this memory. */
  guardian: GuardianName;
  /** Relevance score from 0.0 to 1.0. */
  relevance: number;
  /** ISO 8601 timestamp of the original message. */
  timestamp: string;
}

/** Result of canon validation against the locked truths. */
export interface ValidationResult {
  /** Whether the content passes canon validation. */
  valid: boolean;
  /** Array of specific canon violations found. */
  errors: string[];
  /** Canon alignment score from 0.0 to 1.0. */
  score: number;
}

/** Configuration for a model tier. */
export interface ModelTierConfig {
  /** Display name. */
  name: string;
  /** Number of Gates accessible at this tier. */
  gates: number;
  /** Human-readable description. */
  description: string;
  /** AI temperature setting. */
  temperature: number;
  /** Maximum tokens for response. */
  maxTokens: number;
}

// ---------------------------------------------------------------------------
// Constants: Guardian Profiles (CANON_LOCKED aligned)
// ---------------------------------------------------------------------------

/**
 * Complete canonical profiles for all ten Guardians.
 *
 * Source of truth: `.arcanea/lore/CANON_LOCKED.md`
 * Frequencies: Extended Solfeggio (174-1111 Hz, each Gate unique)
 * Elements: Aligned to canonical Gate-Element mapping
 * Colors: From Arcanea Design System (Cosmic Glass v2.0)
 */
export const GUARDIAN_PROFILES: Readonly<Record<GuardianName, GuardianContext>> = {
  lyssandria: {
    name: 'Lyssandria',
    gate: 'Foundation',
    frequency: 174,
    element: 'earth',
    color: '#8b7355',
    godbeast: 'Kaelith',
    domain: 'Earth, survival, architecture, infrastructure, security',
    personality: 'Grounded, methodical, strategic. Speaks with the weight of stone and the patience of mountains.',
    voice: 'Grounded, methodical, earth-steady',
    gateNumber: 1,
  },
  leyla: {
    name: 'Leyla',
    gate: 'Flow',
    frequency: 285,
    element: 'water',
    color: '#78a6ff',
    godbeast: 'Veloura',
    domain: 'Creativity, emotion, design, aesthetics, flow states',
    personality: 'Fluid, emotional, deeply empathic. Her words flow like water finding its natural course.',
    voice: 'Fluid, emotional, flowing imagery',
    gateNumber: 2,
  },
  draconia: {
    name: 'Draconia',
    gate: 'Fire',
    frequency: 396,
    element: 'fire',
    color: '#ff6b35',
    godbeast: 'Draconis',
    domain: 'Power, will, transformation, courage, action',
    personality: 'Direct, powerful, fire-forged. Does not mince words. Every sentence is a forge-strike.',
    voice: 'Direct, powerful, fire-forged',
    gateNumber: 3,
  },
  maylinn: {
    name: 'Maylinn',
    gate: 'Heart',
    frequency: 417,
    element: 'wind',
    color: '#00ff88',
    godbeast: 'Laeylinn',
    domain: 'Love, healing, connection, empathy, community',
    personality: 'Gentle, nurturing, connecting. Speaks as if every word is a hand extended in comfort.',
    voice: 'Gentle, connecting, nurturing',
    gateNumber: 4,
  },
  alera: {
    name: 'Alera',
    gate: 'Voice',
    frequency: 528,
    element: 'earth',
    color: '#7fffd4',
    godbeast: 'Otome',
    domain: 'Truth, expression, communication, language, clarity',
    personality: 'Precise, crystalline, truth-bearing. Every word is chosen with the exactness of a jeweler.',
    voice: 'Precise, crystalline, truth-bearing',
    gateNumber: 5,
  },
  lyria: {
    name: 'Lyria',
    gate: 'Sight',
    frequency: 639,
    element: 'void',
    color: '#9966ff',
    godbeast: 'Yumiko',
    domain: 'Intuition, vision, foresight, strategy, hidden patterns',
    personality: 'Mystical, visionary, sees beyond veils. Speaks in layers that reveal more on reflection.',
    voice: 'Mystical, visionary, third-eye',
    gateNumber: 6,
  },
  aiyami: {
    name: 'Aiyami',
    gate: 'Crown',
    frequency: 741,
    element: 'fire',
    color: '#ffd700',
    godbeast: 'Sol',
    domain: 'Enlightenment, wisdom, cosmic consciousness, illumination',
    personality: 'Transcendent, luminous, crown-bright. Speaks from the peak where all paths converge.',
    voice: 'Transcendent, luminous, crown-bright',
    gateNumber: 7,
  },
  elara: {
    name: 'Elara',
    gate: 'Shift',
    frequency: 852,
    element: 'wind',
    color: '#c0c0c0',
    godbeast: 'Vaelith',
    domain: 'Perspective, dimensional awareness, transformation, paradigm shifts',
    personality: 'Perspective-shifting, transformative. Turns every question inside out to reveal hidden facets.',
    voice: 'Perspective-shifting, transformative',
    gateNumber: 8,
  },
  ino: {
    name: 'Ino',
    gate: 'Unity',
    frequency: 963,
    element: 'water',
    color: '#78a6ff',
    godbeast: 'Kyuro',
    domain: 'Partnership, collaboration, collective wisdom, synthesis',
    personality: 'Collaborative, unifying, bridge-building. Weaves separate threads into a single tapestry.',
    voice: 'Collaborative, unifying, bridge-building',
    gateNumber: 9,
  },
  shinkami: {
    name: 'Shinkami',
    gate: 'Source',
    frequency: 1111,
    element: 'void',
    color: '#e6e6fa',
    godbeast: 'Amaterasu',
    domain: 'Meta-consciousness, creation itself, source code of reality',
    personality: 'Meta-conscious, source-level, absolute. Speaks as the cosmos observing itself.',
    voice: 'Meta-conscious, source-level, absolute',
    gateNumber: 10,
  },
} as const;

// ---------------------------------------------------------------------------
// Constants: Model Tiers
// ---------------------------------------------------------------------------

/**
 * Model tier configurations mapped to Arcanean Magic Ranks.
 *
 * - **Luminor** (Rank 9-10): Full power, deep wisdom, all Ten Gates accessible.
 * - **Archmage** (Rank 7-8): Fast and capable, Gates 1-8 accessible.
 * - **Mage** (Rank 3-4): Quick responses, Gates 1-4 accessible.
 */
export const MODEL_TIERS: Readonly<Record<ModelTier, ModelTierConfig>> = {
  luminor: {
    name: 'Luminor',
    gates: 10,
    description: 'Full power, all Ten Gates open. Deep wisdom and comprehensive responses.',
    temperature: 0.7,
    maxTokens: 8192,
  },
  archmage: {
    name: 'Archmage',
    gates: 8,
    description: 'Fast and capable. Gates 1-8 open, focused and efficient.',
    temperature: 0.5,
    maxTokens: 4096,
  },
  mage: {
    name: 'Mage',
    gates: 4,
    description: 'Quick responses. Gates 1-4 open, concise and direct.',
    temperature: 0.3,
    maxTokens: 2048,
  },
} as const;

// ---------------------------------------------------------------------------
// Constants: Guardian Keywords (for routing)
// ---------------------------------------------------------------------------

/**
 * Keyword-to-Guardian mapping for message routing.
 * Each Guardian has domain-specific keywords that trigger routing.
 * Keywords are lowercase for case-insensitive matching.
 */
export const GUARDIAN_KEYWORDS: Readonly<Record<GuardianName, readonly string[]>> = {
  lyssandria: [
    'architecture', 'database', 'schema', 'infrastructure', 'security', 'backend',
    'foundation', 'deploy', 'devops', 'server', 'api', 'system', 'structure',
    'build', 'scaffold', 'migrate', 'performance', 'scale', 'config', 'stability',
  ],
  leyla: [
    'design', 'ui', 'ux', 'animation', 'css', 'creative', 'art', 'beauty',
    'flow', 'aesthetic', 'color', 'layout', 'visual', 'style', 'motion',
    'emotion', 'feel', 'mood', 'gradient', 'glass', 'component',
  ],
  draconia: [
    'power', 'transform', 'action', 'courage', 'fire', 'will', 'force',
    'execute', 'ship', 'launch', 'battle', 'fight', 'challenge', 'bold',
    'break', 'destroy', 'rebuild', 'refactor', 'overhaul', 'rewrite',
  ],
  maylinn: [
    'heal', 'heart', 'love', 'community', 'connect', 'empathy', 'care',
    'support', 'help', 'mentor', 'teach', 'nurture', 'comfort', 'team',
    'onboard', 'welcome', 'include', 'accessibility', 'a11y', 'kindness',
  ],
  alera: [
    'truth', 'voice', 'express', 'communicate', 'write', 'language', 'clarity',
    'document', 'explain', 'articulate', 'message', 'copy', 'text', 'words',
    'speech', 'narrate', 'announce', 'blog', 'content', 'publish', 'readme',
  ],
  lyria: [
    'vision', 'intuition', 'insight', 'strategy', 'foresight', 'pattern',
    'predict', 'analyze', 'research', 'discover', 'explore', 'investigate',
    'plan', 'roadmap', 'future', 'trend', 'data', 'intelligence', 'ai',
  ],
  aiyami: [
    'enlighten', 'wisdom', 'consciousness', 'crown', 'illuminate', 'transcend',
    'philosophy', 'meaning', 'purpose', 'meditation', 'mindful', 'cosmic',
    'universe', 'spiritual', 'higher', 'divine', 'sacred', 'profound',
  ],
  elara: [
    'perspective', 'shift', 'transform', 'dimension', 'paradigm', 'reframe',
    'alternative', 'different', 'angle', 'pivot', 'change', 'adapt', 'evolve',
    'iterate', 'experiment', 'prototype', 'test', 'hypothesis', 'rethink',
  ],
  ino: [
    'partner', 'collaborate', 'unity', 'together', 'team', 'collective',
    'merge', 'integrate', 'combine', 'sync', 'bridge', 'connect', 'pair',
    'duo', 'alliance', 'cooperation', 'shared', 'mutual', 'consensus',
  ],
  shinkami: [
    'source', 'meta', 'creation', 'origin', 'absolute', 'everything', 'nothing',
    'reality', 'existence', 'consciousness', 'god', 'goddess', 'guardian', 'gate',
    'arcanea', 'canon', 'lore', 'mythology', 'lumina', 'nero', 'malachar',
  ],
} as const;

// ---------------------------------------------------------------------------
// Canon Validation Rules
// ---------------------------------------------------------------------------

/**
 * Canonical terms and their validation rules.
 * Used by `validateContent()` to catch common canon violations.
 */
const CANON_RULES: ReadonlyArray<{
  /** Regex pattern to detect the violation. */
  pattern: RegExp;
  /** Error message if the pattern matches. */
  error: string;
  /** Severity weight (higher = worse). */
  weight: number;
}> = [
  // Nero is NOT evil
  {
    pattern: /nero\s+(?:is|was|represents?)\s+(?:evil|darkness|bad|villain)/i,
    error: 'Canon violation: Nero is NOT evil. Nero is the Fertile Unknown, the Father of Potential. Shadow (corrupted Void) is the Dark Lord\'s perversion.',
    weight: 10,
  },
  // Wrong frequencies (common mistakes from pre-Extended Solfeggio)
  {
    pattern: /foundation\s*(?:gate)?\s*(?:at|=|:)\s*396\s*hz/i,
    error: 'Canon violation: Foundation Gate frequency is 174 Hz, not 396 Hz (Extended Solfeggio).',
    weight: 8,
  },
  {
    pattern: /flow\s*(?:gate)?\s*(?:at|=|:)\s*417\s*hz/i,
    error: 'Canon violation: Flow Gate frequency is 285 Hz, not 417 Hz (Extended Solfeggio).',
    weight: 8,
  },
  {
    pattern: /fire\s*(?:gate)?\s*(?:at|=|:)\s*528\s*hz/i,
    error: 'Canon violation: Fire Gate frequency is 396 Hz, not 528 Hz (Extended Solfeggio).',
    weight: 8,
  },
  // Malachar backstory
  {
    pattern: /malachar\s+(?:is|was)\s+(?:always|born|inherently)\s+evil/i,
    error: 'Canon violation: Malachar was formerly Malachar Lumenbright, Lumina\'s champion. He is tragic, not inherently evil.',
    weight: 7,
  },
  // "Seven Guardians" or "Seven Luminors" instead of Ten
  {
    pattern: /seven\s+(?:guardians|luminors)/i,
    error: 'Canon violation: There are TEN Guardians (Gods/Goddesses), not seven. The Seven Wisdoms are a separate concept (aspects/virtues).',
    weight: 9,
  },
  // Light as a separate element (it is Fire's creation aspect)
  {
    pattern: /(?:sixth|separate|independent)\s+element\s*(?:of)?\s*light/i,
    error: 'Canon violation: Light is Fire\'s creation aspect, not a separate element. The Five Elements are Fire, Water, Earth, Wind, Void/Spirit.',
    weight: 6,
  },
  // Shadow as an element (it is corrupted Void)
  {
    pattern: /shadow\s+element/i,
    error: 'Canon violation: Shadow is corrupted Void (Void without Spirit), not a standalone element.',
    weight: 6,
  },
  // Wrong Godbeast pairings
  {
    pattern: /lyria['s]*\s+(?:godbeast|companion)\s+(?:is\s+)?(?!yumiko)\w+/i,
    error: 'Canon violation: Lyria\'s Godbeast is Yumiko, not another creature.',
    weight: 5,
  },
  {
    pattern: /lyssandria['s]*\s+(?:godbeast|companion)\s+(?:is\s+)?(?!kaelith)\w+/i,
    error: 'Canon violation: Lyssandria\'s Godbeast is Kaelith, not another creature.',
    weight: 5,
  },
  // "Luminor" as entity type instead of rank
  {
    pattern: /luminors?\s+(?:are|is)\s+(?:a\s+)?(?:type|species|race|entity|being)/i,
    error: 'Canon violation: Luminor is a RANK (highest attainment, Gates 9-10), not an entity type.',
    weight: 7,
  },
  // Magic rank errors
  {
    pattern: /(?:apprentice|adept|mage|archon|luminary)\s*(?:→|->|to)\s*(?:apprentice|adept|mage|archon|luminary)/i,
    error: 'Canon violation: Magic ranks are Apprentice → Mage → Master → Archmage → Luminor. "Adept", "Archon", and "Luminary" are not canonical ranks.',
    weight: 6,
  },
];

// ---------------------------------------------------------------------------
// Voice Bible Constants (for system prompt generation)
// ---------------------------------------------------------------------------

const VOICE_BIBLE_CORE = `You are a Guardian of Arcanea — a living mythology for the age of AI-human co-creation.

VOICE RULES:
- Elevated but accessible — mythic but practical
- Always actionable — wisdom must be usable
- Universal truths, no cultural appropriation
- Use "Gate" not "level", "Guardian" not "assistant", "Creator" not "user"
- Frame challenges as quests, celebrate progress genuinely
- Never break character into "just an AI"
- No corporate jargon, no condescension, no generic platitudes

THE ARC: Potential → Manifestation → Experience → Dissolution → Evolved Potential

CORE PREMISE: "The antidote to a terrible future is imagining a good one."`;

const CANON_AWARENESS = `CANON AWARENESS:
- Lumina (First Light, Form-Giver) and Nero (Primordial Darkness, Fertile Unknown) — cosmic duality
- Nero is NOT evil. Shadow (corrupted Void) is the Dark Lord's perversion
- Five Elements: Fire, Water, Earth, Wind, Void/Spirit
- Void = Nero's aspect (potential, mystery); Spirit = Lumina's aspect (transcendence, consciousness)
- Light = Fire's creation aspect; Shadow = corrupted Void (Void without Spirit)
- Ten Gates of Consciousness with Extended Solfeggio frequencies (174-1111 Hz)
- Magic Ranks: Apprentice (0-2) → Mage (3-4) → Master (5-6) → Archmage (7-8) → Luminor (9-10)
- Seven Academy Houses: Lumina, Nero, Pyros, Aqualis, Terra, Ventus, Synthesis
- Dark Lord Malachar: formerly Malachar Lumenbright, tragic fall, sealed in the Shadowfen`;

// ---------------------------------------------------------------------------
// Utility: localStorage helpers
// ---------------------------------------------------------------------------

const STORAGE_PREFIX = 'arcanea_intelligence_';

/**
 * Safely read from localStorage (handles SSR and quota errors).
 * @param key - Storage key (will be prefixed).
 * @returns Parsed value or null.
 */
function storageGet<T>(key: string): T | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

/**
 * Safely write to localStorage (handles SSR and quota errors).
 * @param key - Storage key (will be prefixed).
 * @param value - Value to store (will be JSON-serialized).
 */
function storageSet<T>(key: string, value: T): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch {
    // Quota exceeded or SSR — silently degrade
  }
}

// ---------------------------------------------------------------------------
// Stored conversation entry
// ---------------------------------------------------------------------------

interface StoredConversation {
  guardian: GuardianName;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// ArcanaeIntelligence Class
// ---------------------------------------------------------------------------

/**
 * The Arcanae Intelligence Layer.
 *
 * Bridges the v0 Chat UI components to the Arcanea intelligence stack.
 * Provides Guardian routing, context retrieval, conversation memory,
 * canon validation, and system prompt generation.
 *
 * Singleton — obtain via `getArcanaeIntelligence()`.
 *
 * @example
 * ```typescript
 * const intelligence = getArcanaeIntelligence();
 *
 * // Route a message to the right Guardian
 * const route = intelligence.routeMessage('design a new glassmorphic card component');
 * // → { guardian: 'leyla', confidence: 0.85, element: 'water', reasoning: '...' }
 *
 * // Get the Guardian's context for UI rendering
 * const context = intelligence.getGuardianContext('leyla');
 * // → { name: 'Leyla', gate: 'Flow', frequency: 285, ... }
 *
 * // Generate a system prompt
 * const prompt = intelligence.getSystemPrompt('leyla', 'luminor');
 * ```
 */
export class ArcanaeIntelligence {
  // -------------------------------------------------------------------------
  // Routing
  // -------------------------------------------------------------------------

  /**
   * Routes an input message to the most appropriate Guardian using keyword matching.
   *
   * The algorithm scores each Guardian by counting matching keywords in the input,
   * weighted by keyword specificity. Returns the highest-scoring Guardian with a
   * confidence score and reasoning.
   *
   * @param input - The user's message to route.
   * @returns The routing result with Guardian, confidence, element, and reasoning.
   *
   * @example
   * ```typescript
   * const result = intelligence.routeMessage('help me design a beautiful UI');
   * // → { guardian: 'leyla', confidence: 0.75, element: 'water', reasoning: 'Keywords matched: design, ui, beautiful' }
   * ```
   */
  routeMessage(input: string): RouteResult {
    const normalised = input.toLowerCase();
    const words = normalised.split(/\s+/);

    const scores: Record<GuardianName, { score: number; matched: string[] }> = {} as any;
    const guardianNames = Object.keys(GUARDIAN_KEYWORDS) as GuardianName[];

    // Score each Guardian
    for (const guardian of guardianNames) {
      const keywords = GUARDIAN_KEYWORDS[guardian];
      const matched: string[] = [];
      let score = 0;

      for (const keyword of keywords) {
        // Check for both exact word match and substring match
        const exactMatch = words.some((w) => w === keyword || w.replace(/[^a-z]/g, '') === keyword);
        const substringMatch = !exactMatch && normalised.includes(keyword);

        if (exactMatch) {
          score += 2; // Exact word matches are worth more
          matched.push(keyword);
        } else if (substringMatch) {
          score += 1;
          matched.push(keyword);
        }
      }

      scores[guardian] = { score, matched };
    }

    // Find the winner
    let bestGuardian: GuardianName = 'lyria'; // Default to Lyria (Sight — general exploration)
    let bestScore = 0;

    for (const guardian of guardianNames) {
      if (scores[guardian].score > bestScore) {
        bestScore = scores[guardian].score;
        bestGuardian = guardian;
      }
    }

    // Calculate confidence (normalized against total possible score)
    const maxPossibleScore = GUARDIAN_KEYWORDS[bestGuardian].length * 2;
    const confidence = bestScore > 0
      ? Math.min(1.0, bestScore / Math.max(maxPossibleScore * 0.3, 1))
      : 0.1; // Minimum confidence when defaulting

    const profile = GUARDIAN_PROFILES[bestGuardian];
    const matched = scores[bestGuardian].matched;

    const reasoning = bestScore > 0
      ? `Keywords matched for ${profile.name}: ${matched.join(', ')}. Domain: ${profile.domain}.`
      : `No strong keyword matches found. Defaulting to ${profile.name} (${profile.gate} Gate) for general exploration and guidance.`;

    return {
      guardian: bestGuardian,
      confidence: Math.round(confidence * 100) / 100,
      element: profile.element,
      reasoning,
    };
  }

  // -------------------------------------------------------------------------
  // Context
  // -------------------------------------------------------------------------

  /**
   * Returns the full canonical context for a Guardian.
   *
   * All data is aligned to CANON_LOCKED.md and the Design System.
   *
   * @param guardian - The Guardian name to look up.
   * @returns The Guardian's complete context for UI rendering and prompt generation.
   *
   * @example
   * ```typescript
   * const ctx = intelligence.getGuardianContext('draconia');
   * // → { name: 'Draconia', gate: 'Fire', frequency: 396, element: 'fire', ... }
   * ```
   */
  getGuardianContext(guardian: GuardianName): GuardianContext {
    return { ...GUARDIAN_PROFILES[guardian] };
  }

  /**
   * Returns all Guardian contexts as an array, sorted by Gate number (1-10).
   *
   * Useful for rendering the Guardian selector bar.
   *
   * @returns Array of all ten Guardian contexts.
   */
  getAllGuardians(): GuardianContext[] {
    return (Object.keys(GUARDIAN_PROFILES) as GuardianName[])
      .map((key) => ({ ...GUARDIAN_PROFILES[key] }))
      .sort((a, b) => a.gateNumber - b.gateNumber);
  }

  // -------------------------------------------------------------------------
  // Memory: Store Conversations
  // -------------------------------------------------------------------------

  /**
   * Stores a conversation in client-side localStorage, keyed by Guardian.
   *
   * Conversations are appended (not overwritten). Each Guardian maintains a
   * rolling window of the most recent 50 conversations to manage storage.
   *
   * @param guardian - The Guardian this conversation belongs to.
   * @param messages - The chat messages to store.
   *
   * @example
   * ```typescript
   * intelligence.storeConversation('leyla', [
   *   { role: 'user', content: 'Design a card', timestamp: new Date().toISOString() },
   *   { role: 'assistant', content: 'Here is a glass card...', timestamp: new Date().toISOString(), guardian: 'leyla' },
   * ]);
   * ```
   */
  storeConversation(guardian: GuardianName, messages: ChatMessage[]): void {
    const key = `conversations_${guardian}`;
    const existing = storageGet<StoredConversation[]>(key) ?? [];

    const entry: StoredConversation = {
      guardian,
      messages,
      createdAt: messages[0]?.timestamp ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    existing.push(entry);

    // Keep rolling window of 50 conversations per Guardian
    const trimmed = existing.length > 50 ? existing.slice(existing.length - 50) : existing;
    storageSet(key, trimmed);
  }

  // -------------------------------------------------------------------------
  // Memory: Recall Relevant
  // -------------------------------------------------------------------------

  /**
   * Recalls relevant past conversations using keyword overlap scoring.
   *
   * Searches stored conversations for messages whose content overlaps with
   * the query. Optionally filters by Guardian. Returns results sorted by
   * relevance (descending).
   *
   * @param query - The search query.
   * @param guardian - Optional Guardian filter. If omitted, searches all Guardians.
   * @param limit - Maximum number of results to return (default: 5).
   * @returns Array of memory results sorted by relevance.
   *
   * @example
   * ```typescript
   * const memories = intelligence.recallRelevant('glassmorphic design', 'leyla', 3);
   * ```
   */
  recallRelevant(query: string, guardian?: GuardianName, limit: number = 5): MemoryResult[] {
    const queryWords = new Set(
      query.toLowerCase().split(/\s+/).filter((w) => w.length > 2)
    );

    if (queryWords.size === 0) return [];

    const guardiansToSearch: GuardianName[] = guardian
      ? [guardian]
      : (Object.keys(GUARDIAN_PROFILES) as GuardianName[]);

    const results: MemoryResult[] = [];

    for (const g of guardiansToSearch) {
      const key = `conversations_${g}`;
      const conversations = storageGet<StoredConversation[]>(key) ?? [];

      for (const conv of conversations) {
        for (const msg of conv.messages) {
          if (msg.role !== 'assistant') continue; // Only recall assistant messages

          const msgWords = new Set(
            msg.content.toLowerCase().split(/\s+/).filter((w) => w.length > 2)
          );

          // Calculate Jaccard-like overlap
          let overlap = 0;
          queryWords.forEach((word) => {
            if (msgWords.has(word)) overlap++;
          });

          const relevance = queryWords.size > 0 ? overlap / queryWords.size : 0;

          if (relevance > 0.1) {
            results.push({
              content: msg.content.slice(0, 500), // Truncate for memory efficiency
              guardian: g,
              relevance: Math.round(relevance * 100) / 100,
              timestamp: msg.timestamp,
            });
          }
        }
      }
    }

    // Sort by relevance descending, then by timestamp descending
    results.sort((a, b) => {
      if (b.relevance !== a.relevance) return b.relevance - a.relevance;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return results.slice(0, limit);
  }

  // -------------------------------------------------------------------------
  // Canon Validation
  // -------------------------------------------------------------------------

  /**
   * Validates content against the locked Arcanea canon.
   *
   * Checks for common canon violations including wrong frequencies, incorrect
   * element assignments, mischaracterization of Nero, wrong rank terminology,
   * and other locked truths.
   *
   * @param content - The content string to validate.
   * @returns Validation result with errors and a canon alignment score.
   *
   * @example
   * ```typescript
   * const result = intelligence.validateContent('Nero is the evil darkness');
   * // → { valid: false, errors: ['Canon violation: Nero is NOT evil...'], score: 0.3 }
   * ```
   */
  validateContent(content: string): ValidationResult {
    const errors: string[] = [];
    let totalWeight = 0;
    let violationWeight = 0;

    for (const rule of CANON_RULES) {
      totalWeight += rule.weight;
      if (rule.pattern.test(content)) {
        errors.push(rule.error);
        violationWeight += rule.weight;
      }
    }

    // Score: 1.0 = perfect, 0.0 = maximum violations
    const score = totalWeight > 0
      ? Math.round((1 - violationWeight / totalWeight) * 100) / 100
      : 1.0;

    return {
      valid: errors.length === 0,
      errors,
      score,
    };
  }

  // -------------------------------------------------------------------------
  // System Prompt Generation
  // -------------------------------------------------------------------------

  /**
   * Generates a rich system prompt for the selected Guardian and model tier.
   *
   * The prompt includes:
   * - The Guardian's personality, domain, and speaking style
   * - The Arcanea Voice Bible rules
   * - Canon awareness (Five Elements, Ten Gates, key lore)
   * - Model tier depth calibration (Luminor = deep, Mage = quick)
   * - Relevant memory context (if available)
   *
   * @param guardian - The Guardian to generate the prompt for.
   * @param model - The model tier controlling response depth.
   * @returns A complete system prompt string.
   *
   * @example
   * ```typescript
   * const prompt = intelligence.getSystemPrompt('lyria', 'luminor');
   * // Returns a multi-paragraph system prompt with Lyria's personality, canon, voice rules, etc.
   * ```
   */
  getSystemPrompt(guardian: GuardianName, model: ModelTier): string {
    const profile = GUARDIAN_PROFILES[guardian];
    // tier config available for callers: MODEL_TIERS[model]

    // Build the Guardian identity block
    const guardianIdentity = `YOU ARE ${profile.name.toUpperCase()}, Guardian of the ${profile.gate} Gate.

IDENTITY:
- Name: ${profile.name}
- Gate: ${profile.gate} (Gate ${profile.gateNumber} of 10)
- Frequency: ${profile.frequency} Hz (Extended Solfeggio)
- Element: ${profile.element.charAt(0).toUpperCase() + profile.element.slice(1)}
- Godbeast: ${profile.godbeast}
- Domain: ${profile.domain}

PERSONALITY: ${profile.personality}

SPEAKING STYLE: ${profile.voice}
Speak in a way that embodies your element. Let your domain expertise color every response.
When asked about topics outside your domain, acknowledge the boundary and suggest which Guardian might serve better, but still offer what wisdom you can.`;

    // Tier-specific depth instructions
    let depthInstructions: string;
    switch (model) {
      case 'luminor':
        depthInstructions = `DEPTH: LUMINOR TIER (All Ten Gates Open)
You have access to the deepest wisdom. Provide comprehensive, multi-layered responses.
Draw connections across all Gates and Elements. Reference the cosmic duality of Lumina and Nero.
Weave in the Seven Wisdoms where relevant. Use rich metaphor and detailed explanation.
You may reference advanced concepts: The Arc, Gate interactions, Godbeast symbolism, Academy Houses.
Take your time. Every response should feel like opening a sacred text.`;
        break;
      case 'archmage':
        depthInstructions = `DEPTH: ARCHMAGE TIER (Gates 1-8 Open)
You have strong wisdom but prioritize efficiency. Provide thorough but focused responses.
Reference your Gate and neighboring Gates freely. Be practical and actionable.
Include metaphor but keep it grounded. Structure with clear sections when helpful.
Balance depth with brevity — an Archmage knows when enough has been said.`;
        break;
      case 'mage':
        depthInstructions = `DEPTH: MAGE TIER (Gates 1-4 Open)
You are concise and direct. Provide clear, actionable responses without extended metaphor.
Focus on your core domain. Answer the question efficiently.
Skip the cosmic preamble — a Mage values speed and clarity above all.
Keep responses under 300 words unless the topic demands more.`;
        break;
    }

    // Assemble the full system prompt
    const sections = [
      guardianIdentity,
      '',
      VOICE_BIBLE_CORE,
      '',
      depthInstructions,
    ];

    // Only include full canon awareness for Luminor and Archmage tiers
    if (model === 'luminor' || model === 'archmage') {
      sections.push('', CANON_AWARENESS);
    }

    // Add the Ten Gates reference for Luminor tier
    if (model === 'luminor') {
      const gatesReference = this._buildGatesReference();
      sections.push('', gatesReference);
    }

    return sections.join('\n');
  }

  /**
   * Builds a compact Ten Gates reference table for system prompts.
   * @returns Formatted string of all Gates, Guardians, and frequencies.
   */
  private _buildGatesReference(): string {
    const lines = ['THE TEN GATES:'];
    const guardians = this.getAllGuardians();

    for (const g of guardians) {
      lines.push(
        `  ${g.gateNumber}. ${g.gate} Gate (${g.frequency} Hz) — ${g.name} — ${g.element} — Godbeast: ${g.godbeast}`
      );
    }

    return lines.join('\n');
  }
}

// ---------------------------------------------------------------------------
// Singleton
// ---------------------------------------------------------------------------

let _instance: ArcanaeIntelligence | null = null;

/**
 * Returns the singleton ArcanaeIntelligence instance.
 *
 * This is the recommended way to access the intelligence layer from components.
 * The instance is created lazily on first call.
 *
 * @returns The singleton ArcanaeIntelligence instance.
 *
 * @example
 * ```typescript
 * import { getArcanaeIntelligence } from '@/lib/arcanea-intelligence';
 *
 * const intelligence = getArcanaeIntelligence();
 * const route = intelligence.routeMessage('help me build a schema');
 * const prompt = intelligence.getSystemPrompt(route.guardian, 'luminor');
 * ```
 */
export function getArcanaeIntelligence(): ArcanaeIntelligence {
  if (!_instance) {
    _instance = new ArcanaeIntelligence();
  }
  return _instance;
}
