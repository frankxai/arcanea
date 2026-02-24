/**
 * Arcanea Book Library — Content Index
 *
 * Programmatic access to the 20 collections and 65+ texts
 * of the Library of Arcanea. Maps collection slugs to metadata,
 * provides lookup functions, and enables content discovery.
 */

/** A collection within the Library of Arcanea */
export interface BookCollection {
  slug: string;
  title: string;
  description: string;
  gate?: string;
  element?: string;
  textCount: number;
}

// ============================================
// THE 20 COLLECTIONS
// ============================================

export const LIBRARY_COLLECTIONS: BookCollection[] = [
  {
    slug: 'legends-of-arcanea',
    title: 'Legends of Arcanea',
    description: 'The founding myths — Lumina, Nero, Guardians, the First Dawn, Malachar',
    element: 'void',
    textCount: 8,
  },
  {
    slug: 'laws-of-arcanea',
    title: 'Laws of Arcanea',
    description: 'Theoretical foundations and universal principles of creation',
    gate: 'foundation',
    element: 'earth',
    textCount: 3,
  },
  {
    slug: 'wisdom-scrolls',
    title: 'Wisdom Scrolls',
    description: 'Daily practice wisdom — morning rituals, evening reflections, creative discipline',
    gate: 'crown',
    element: 'void',
    textCount: 4,
  },
  {
    slug: 'poesie-of-freedom',
    title: 'Poesie of Freedom',
    description: 'Poetry for liberation — breaking chains, finding voice, embracing change',
    gate: 'voice',
    element: 'wind',
    textCount: 4,
  },
  {
    slug: 'chronicles-of-luminors',
    title: 'Chronicles of Guardians',
    description: 'Guardian struggles and triumphs — the divine journey through creation',
    gate: 'source',
    textCount: 3,
  },
  {
    slug: 'parables-of-creation',
    title: 'Parables of Creation',
    description: 'Teaching stories that illuminate creative truths through narrative',
    gate: 'heart',
    element: 'water',
    textCount: 3,
  },
  {
    slug: 'tales-of-creators',
    title: 'Tales of Creators',
    description: 'Stories of legendary creators and their journeys',
    gate: 'fire',
    element: 'fire',
    textCount: 2,
  },
  {
    slug: 'book-of-rituals',
    title: 'Book of Rituals',
    description: 'Sacred practices for creative work — invocations, ceremonies, daily rites',
    gate: 'foundation',
    element: 'earth',
    textCount: 3,
  },
  {
    slug: 'dialogues-of-masters',
    title: 'Dialogues of Masters',
    description: 'Wisdom conversations between masters and seekers',
    gate: 'crown',
    element: 'void',
    textCount: 2,
  },
  {
    slug: 'prophecies',
    title: 'Prophecies',
    description: 'Future visions and revelations for the age of creation',
    gate: 'sight',
    element: 'void',
    textCount: 2,
  },
  {
    slug: 'bestiary-of-creation',
    title: 'Bestiary of Creation',
    description: 'Creative obstacles personified — the beasts that block the path',
    gate: 'fire',
    element: 'fire',
    textCount: 2,
  },
  {
    slug: 'songs-and-hymns',
    title: 'Songs and Hymns',
    description: 'Lyrics for the soul — hymns to Lumina, songs of the Elements',
    gate: 'voice',
    element: 'wind',
    textCount: 2,
  },
  {
    slug: 'meditations-on-elements',
    title: 'Meditations on Elements',
    description: 'Five Elements practice — deep contemplation on Fire, Water, Earth, Wind, Void',
    element: 'void',
    textCount: 2,
  },
  {
    slug: 'academy-handbook',
    title: 'Academy Handbook',
    description: 'Complete guide to the Ten Gates, Seven Houses, and the path of the Creator',
    gate: 'foundation',
    textCount: 3,
  },
  {
    slug: 'book-of-shadows',
    title: 'Book of Shadows',
    description: 'Dark night wisdom — confronting fear, embracing the void, shadow work',
    element: 'void',
    textCount: 2,
  },
  {
    slug: 'codex-of-collaboration',
    title: 'Codex of Collaboration',
    description: 'Creating together — partnership, community, collective creation',
    gate: 'unity',
    element: 'void',
    textCount: 2,
  },
  {
    slug: 'atlas-of-territories',
    title: 'Atlas of Territories',
    description: 'Creative landscapes — mapping the territories of imagination',
    gate: 'shift',
    textCount: 1,
  },
  {
    slug: 'creator-principles',
    title: 'Creator Principles',
    description: 'Core principles for the modern creator — practical philosophy',
    gate: 'crown',
    textCount: 6,
  },
  {
    slug: 'prompt-sages-grimoire',
    title: "Prompt Sage's Grimoire",
    description: 'The art of prompt engineering — speaking to AI as a craft',
    gate: 'voice',
    element: 'wind',
    textCount: 6,
  },
  {
    slug: 'codex-of-living-tools',
    title: 'Codex of Living Tools',
    description: 'AI tools as creative companions — working with intelligent systems',
    gate: 'unity',
    textCount: 2,
  },
];

// ============================================
// CONTENT DISCOVERY
// ============================================

/** Get all collections */
export function getLibraryCollections(): BookCollection[] {
  return LIBRARY_COLLECTIONS;
}

/** Get a collection by slug */
export function getLibraryCollection(slug: string): BookCollection | undefined {
  return LIBRARY_COLLECTIONS.find(c => c.slug === slug);
}

/** Get collections by element */
export function getCollectionsByElement(element: string): BookCollection[] {
  return LIBRARY_COLLECTIONS.filter(c => c.element === element);
}

/** Get collections by gate */
export function getCollectionsByGate(gate: string): BookCollection[] {
  return LIBRARY_COLLECTIONS.filter(c => c.gate === gate);
}

/** Total text count across all collections */
export function getLibraryTextCount(): number {
  return LIBRARY_COLLECTIONS.reduce((sum, c) => sum + c.textCount, 0);
}

/**
 * Get collections relevant to a creative situation.
 * Maps common situations to the best collections for guidance.
 */
export function getCollectionsForSituation(situation: string): BookCollection[] {
  const lower = situation.toLowerCase();
  const situationMap: Record<string, string[]> = {
    stuck: ['wisdom-scrolls', 'bestiary-of-creation', 'book-of-shadows'],
    beginning: ['academy-handbook', 'laws-of-arcanea', 'book-of-rituals'],
    overwhelmed: ['wisdom-scrolls', 'meditations-on-elements', 'poesie-of-freedom'],
    inspiration: ['legends-of-arcanea', 'tales-of-creators', 'prophecies'],
    collaboration: ['codex-of-collaboration', 'dialogues-of-masters', 'codex-of-living-tools'],
    ai: ['prompt-sages-grimoire', 'codex-of-living-tools', 'creator-principles'],
    practice: ['book-of-rituals', 'wisdom-scrolls', 'meditations-on-elements'],
    darkness: ['book-of-shadows', 'chronicles-of-luminors', 'meditations-on-elements'],
    voice: ['poesie-of-freedom', 'songs-and-hymns', 'parables-of-creation'],
    philosophy: ['laws-of-arcanea', 'creator-principles', 'dialogues-of-masters'],
  };

  for (const [key, slugs] of Object.entries(situationMap)) {
    if (lower.includes(key)) {
      return slugs.map(s => getLibraryCollection(s)).filter(Boolean) as BookCollection[];
    }
  }

  // Default: foundational collections
  return [
    getLibraryCollection('legends-of-arcanea'),
    getLibraryCollection('academy-handbook'),
    getLibraryCollection('wisdom-scrolls'),
  ].filter(Boolean) as BookCollection[];
}
