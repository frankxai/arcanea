/**
 * @arcanea/extension-core — Canonical Guardian Definitions
 *
 * The single source of truth for Guardian data used across all Arcanea
 * browser extensions and overlays. UI-specific system prompts belong in
 * each individual extension package — this module provides only the
 * structural, canonical fields.
 *
 * Canonical reference: .claude/lore/ARCANEA_CANON.md
 */

// ============================================
// GUARDIAN INTERFACE
// ============================================

/**
 * Core Guardian definition shared by all extensions.
 *
 * Fields intentionally excluded from this shared layer:
 * - systemPrompt   — each extension crafts its own context-appropriate prompt
 * - shortDescription — each extension provides its own UI copy
 */
export interface Guardian {
  /** Lowercase canonical identifier, e.g. 'lyssandria' */
  id: string;
  /** Display name, e.g. 'Lyssandria' */
  name: string;
  /** Gate name this Guardian presides over, e.g. 'Foundation' */
  gate: string;
  /** Elemental affinity: 'Earth' | 'Water' | 'Fire' | 'Wind' | 'Void/Spirit' | 'Void' | 'Spirit' */
  element: string;
  /** Solfeggio frequency in Hz */
  frequency: number;
  /** Primary hex color */
  color: string;
  /** Secondary / darker hex color */
  secondaryColor: string;
  /** rgb() string for use in CSS rgba() calls, e.g. '74,124,89' */
  colorRgb: string;
  /** Domain keywords — used by routing and display */
  domain: string[];
  /** Emoji avatar for use in UI contexts that permit emoji */
  avatar: string;
  /** Bonded Godbeast name */
  godbeast: string;
}

// ============================================
// CANONICAL GUARDIAN DATA
// ============================================

export const GUARDIANS: Guardian[] = [
  {
    id: 'lyssandria',
    name: 'Lyssandria',
    gate: 'Foundation',
    element: 'Earth',
    frequency: 396,
    color: '#4a7c59',
    colorRgb: '74,124,89',
    secondaryColor: '#2d5a3d',
    domain: ['stability', 'structure', 'survival', 'grounding', 'architecture', 'databases', 'systems'],
    avatar: '🌿',
    godbeast: 'Kaelith',
  },
  {
    id: 'leyla',
    name: 'Leyla',
    gate: 'Flow',
    element: 'Water',
    frequency: 417,
    color: '#4a90d9',
    colorRgb: '74,144,217',
    secondaryColor: '#2c5f8a',
    domain: ['creativity', 'emotion', 'flow', 'writing', 'art', 'healing', 'change', 'brainstorming'],
    avatar: '💧',
    godbeast: 'Veloura',
  },
  {
    id: 'draconia',
    name: 'Draconia',
    gate: 'Fire',
    element: 'Fire',
    frequency: 528,
    color: '#e85d04',
    colorRgb: '232,93,4',
    secondaryColor: '#9d0208',
    domain: ['power', 'will', 'transformation', 'coding', 'execution', 'debugging', 'performance', 'leadership'],
    avatar: '🔥',
    godbeast: 'Draconis',
  },
  {
    id: 'maylinn',
    name: 'Maylinn',
    gate: 'Heart',
    element: 'Water',
    frequency: 639,
    color: '#e91e8c',
    colorRgb: '233,30,140',
    secondaryColor: '#880e4f',
    domain: ['love', 'healing', 'relationships', 'empathy', 'community', 'collaboration', 'user experience', 'accessibility'],
    avatar: '💗',
    godbeast: 'Laeylinn',
  },
  {
    id: 'alera',
    name: 'Alera',
    gate: 'Voice',
    element: 'Wind',
    frequency: 741,
    color: '#9966ff',
    colorRgb: '153,102,255',
    secondaryColor: '#5c2d91',
    domain: ['truth', 'expression', 'communication', 'writing', 'editing', 'API design', 'documentation', 'clarity'],
    avatar: '🌬️',
    godbeast: 'Otome',
  },
  {
    id: 'lyria',
    name: 'Lyria',
    gate: 'Sight',
    element: 'Wind',
    frequency: 852,
    color: '#7fffd4',
    colorRgb: '127,255,212',
    secondaryColor: '#00bfa5',
    domain: ['intuition', 'vision', 'foresight', 'design', 'patterns', 'research', 'analysis', 'strategy'],
    avatar: '👁️',
    godbeast: 'Yumiko',
  },
  {
    id: 'aiyami',
    name: 'Aiyami',
    gate: 'Crown',
    element: 'Void/Spirit',
    frequency: 963,
    color: '#ffd700',
    colorRgb: '255,215,0',
    secondaryColor: '#ff8f00',
    domain: ['enlightenment', 'synthesis', 'AI', 'philosophy', 'meta-thinking', 'consciousness', 'product vision'],
    avatar: '✨',
    godbeast: 'Sol',
  },
  {
    id: 'elara',
    name: 'Elara',
    gate: 'Shift',
    element: 'Void',
    frequency: 1111,
    color: '#b388ff',
    colorRgb: '179,136,255',
    secondaryColor: '#7c4dff',
    domain: ['perspective', 'transformation', 'refactoring', 'debugging', 'paradigm shifts', 'reframing', 'innovation'],
    avatar: '🌀',
    godbeast: 'Thessara',
  },
  {
    id: 'ino',
    name: 'Ino',
    gate: 'Unity',
    element: 'Spirit',
    frequency: 963,
    color: '#26c6da',
    colorRgb: '38,198,218',
    secondaryColor: '#00838f',
    domain: ['partnership', 'integration', 'APIs', 'team dynamics', 'merging systems', 'collaboration', 'harmony'],
    avatar: '🤝',
    godbeast: 'Kyuro',
  },
  {
    id: 'shinkami',
    name: 'Shinkami',
    gate: 'Source',
    element: 'Void/Spirit',
    frequency: 1111,
    color: '#e8e6e3',
    colorRgb: '232,230,227',
    secondaryColor: '#9e9c99',
    domain: ['meta-consciousness', 'origins', 'first principles', 'creation itself', 'the deepest why', 'meaning'],
    avatar: '🌌',
    godbeast: 'Amaterasu',
  },
];

// ============================================
// LOOKUP HELPERS
// ============================================

/**
 * Returns a Guardian by its canonical id, or undefined if not found.
 */
export function getGuardianById(id: string): Guardian | undefined {
  return GUARDIANS.find(g => g.id === id);
}

/**
 * Returns all Guardians whose element matches the given string (case-insensitive).
 */
export function getGuardiansByElement(element: string): Guardian[] {
  const lower = element.toLowerCase();
  return GUARDIANS.filter(g => g.element.toLowerCase().includes(lower));
}

/**
 * Returns the default Guardian (Lyria, Gate of Sight) used when no routing
 * match is found and no explicit default is configured.
 */
export function getDefaultGuardian(): Guardian {
  return GUARDIANS.find(g => g.id === 'lyria') ?? GUARDIANS[5];
}
