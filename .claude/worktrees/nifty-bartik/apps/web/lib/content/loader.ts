/**
 * Library of Arcanea - Content Loader
 *
 * ★ Insight ─────────────────────────────────────
 * This loader handles two content states:
 * 1. Legacy: Pure markdown (extracts metadata from structure)
 * 2. Enhanced: Markdown with YAML frontmatter
 * This allows gradual migration without breaking existing content.
 * ─────────────────────────────────────────────────
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

// gray-matter is CommonJS, use dynamic import pattern
const grayMatter = require('gray-matter') as typeof import('gray-matter');
import {
  Collection,
  Text,
  TextFrontmatter,
  ContentFormat,
  ContentStatus,
  ContentGraph,
  ContentNode,
  ContentEdge,
  ContentQuery,
  Heading,
  Situation,
  Element,
  Luminor,
} from './types';

// ============================================
// CONFIGURATION
// ============================================

const CONTENT_DIR = join(process.cwd(), '..', '..', 'book');

// Collection metadata (matches README.md structure)
export const COLLECTIONS: Collection[] = [
  {
    slug: 'laws-of-arcanea',
    name: 'The Laws of Arcanea',
    description: 'The theoretical foundation of creation',
    order: 1,
    format: 'theory',
    readWhen: 'you need to understand WHY creation works as it does',
    textCount: 2,
    icon: '⚖️',
  },
  {
    slug: 'poesie-of-freedom',
    name: 'The Poetry of Freedom',
    description: 'Verses for liberation and awakening',
    order: 2,
    format: 'poetry',
    readWhen: 'you need to feel, not think',
    textCount: 4,
    icon: '🕊️',
  },
  {
    slug: 'wisdom-scrolls',
    name: 'The Wisdom Scrolls',
    description: 'Practical guidance for daily creative living',
    order: 3,
    format: 'practical',
    readWhen: 'you need daily practice',
    textCount: 4,
    icon: '📜',
  },
  {
    slug: 'legends-of-arcanea',
    name: 'The Legends of Arcanea',
    description: 'The founding myths and stories of the realm',
    order: 4,
    format: 'story',
    readWhen: 'you need to remember the grandeur',
    textCount: 5,
    icon: '🏔️',
  },
  {
    slug: 'chronicles-of-luminors',
    name: 'The Chronicles of the Luminors',
    description: "Intimate stories of the Seven's struggles",
    order: 5,
    format: 'story',
    readWhen: 'you feel unqualified',
    textCount: 1,
    icon: '✨',
  },
  {
    slug: 'parables-of-creation',
    name: 'The Parables of Creation',
    description: 'Teaching stories that work on the unconscious',
    order: 6,
    format: 'story',
    readWhen: 'you want wisdom through story',
    textCount: 1,
    icon: '🌱',
  },
  {
    slug: 'tales-of-creators',
    name: 'Tales of the Legendary Creators',
    description: 'Stories of those who changed what was possible',
    order: 7,
    format: 'story',
    readWhen: 'you face the impossible',
    textCount: 1,
    icon: '🌟',
  },
  {
    slug: 'book-of-rituals',
    name: 'The Book of Rituals',
    description: 'Sacred practices for the creative life',
    order: 8,
    format: 'practical',
    readWhen: 'you need structure',
    textCount: 1,
    icon: '🕯️',
  },
  {
    slug: 'dialogues-of-masters',
    name: 'The Dialogues of the Masters',
    description: 'Conversations on creation and truth',
    order: 9,
    format: 'dialogue',
    readWhen: 'you need to think through conversation',
    textCount: 1,
    icon: '💬',
  },
  {
    slug: 'prophecies',
    name: 'The Prophecies of Arcanea',
    description: 'Visions of pattern and possibility',
    order: 10,
    format: 'story',
    readWhen: 'you need perspective',
    textCount: 1,
    icon: '🔮',
  },
  {
    slug: 'bestiary-of-creation',
    name: 'The Bestiary of Creation',
    description: 'Creatures of the creative mind',
    order: 11,
    format: 'reference',
    readWhen: 'you face internal obstacles',
    textCount: 1,
    icon: '🐉',
  },
  {
    slug: 'songs-and-hymns',
    name: 'Songs and Hymns of Arcanea',
    description: 'Lyrics for the creative soul',
    order: 12,
    format: 'song',
    readWhen: 'you need to sing what cannot be spoken',
    textCount: 1,
    icon: '🎵',
  },
  {
    slug: 'meditations-on-elements',
    name: 'Meditations on the Elements',
    description: 'Fire, Water, Air, and Earth in the Creative Life',
    order: 13,
    format: 'meditation',
    readWhen: 'you need to invoke elemental forces or restore creative balance',
    textCount: 1,
    icon: '🌀',
  },
  {
    slug: 'academy-handbook',
    name: 'The Academy Handbook',
    description: 'A Complete Guide for Students of Creation',
    order: 14,
    format: 'practical',
    readWhen: 'you need comprehensive practical guidance for the creative path',
    textCount: 1,
    icon: '📖',
  },
  {
    slug: 'book-of-shadows',
    name: 'The Book of Shadows',
    description: 'Texts for the Dark Night of the Creative Soul',
    order: 15,
    format: 'shadow',
    readWhen: 'you are in darkness and need companionship, not false light',
    textCount: 1,
    icon: '🌑',
  },
  {
    slug: 'codex-of-collaboration',
    name: 'The Codex of Collaboration',
    description: 'The Art of Creating Together',
    order: 16,
    format: 'practical',
    readWhen: 'you create with others and want to do it well',
    textCount: 1,
    icon: '🤝',
  },
  {
    slug: 'atlas-of-territories',
    name: 'The Atlas of Creative Territories',
    description: 'A Map of the Landscapes Every Creator Traverses',
    order: 17,
    format: 'reference',
    readWhen: 'you need to know where you are and how to navigate forward',
    textCount: 1,
    icon: '🗺️',
  },
];

// Situation-to-collection mapping for recommendations
const SITUATION_MAP: Record<Situation, string[]> = {
  beginning: ['laws-of-arcanea', 'academy-handbook', 'atlas-of-territories'],
  stuck: ['chronicles-of-luminors', 'bestiary-of-creation', 'book-of-rituals'],
  darkness: ['book-of-shadows', 'chronicles-of-luminors', 'songs-and-hymns'],
  comparison: ['wisdom-scrolls', 'bestiary-of-creation'],
  failure: ['tales-of-creators', 'book-of-rituals', 'songs-and-hymns'],
  celebration: ['songs-and-hymns', 'poesie-of-freedom'],
  confusion: ['dialogues-of-masters', 'meditations-on-elements'],
  lost: ['atlas-of-territories', 'prophecies'],
  collaboration: ['codex-of-collaboration'],
  fear: ['chronicles-of-luminors', 'legends-of-arcanea'],
  scattered: ['meditations-on-elements', 'academy-handbook'],
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Extract order number from filename
 *
 * Converts Roman numeral prefix to number for ordering texts within collections.
 * Examples:
 * - "I_THE_FIRST_DAWN.md" -> 1
 * - "VII_THE_SEVENTH_GATE.md" -> 7
 * - "THE_BESTIARY.md" -> 1 (no prefix)
 *
 * @param filename - Filename to parse
 * @returns Order number (1-10)
 */
function extractOrderFromFilename(filename: string): number {
  const romanMatch = filename.match(/^(I{1,3}|IV|V|VI{0,3}|IX|X)_/);
  if (romanMatch) {
    const romanNumerals: Record<string, number> = {
      'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
      'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10,
    };
    return romanNumerals[romanMatch[1]] || 1;
  }
  // For files without prefix, default to 1
  return 1;
}

/**
 * Convert filename to readable title
 *
 * Transforms uppercase underscore filename to title case.
 * Examples:
 * - "I_THE_FIRST_DAWN.md" -> "The First Dawn"
 * - "THE_BESTIARY.md" -> "The Bestiary"
 * - "SEVEN_PRACTICES.md" -> "Seven Practices"
 *
 * @param filename - Filename to convert
 * @returns Human-readable title
 */
function extractTitleFromFilename(filename: string): string {
  return filename
    .replace(/\.md$/, '') // Remove .md extension
    .replace(/^(I{1,3}|IV|V|VI{0,3}|IX|X)_/, '') // Remove Roman numeral prefix
    .replace(/^THE_/, 'The ') // Preserve "The" as first word
    .replace(/_/g, ' ') // Replace underscores with spaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Extract headings from markdown content
 */
function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    headings.push({ level, text, slug });
  }

  return headings;
}

/**
 * Estimate reading time (average 200 words per minute)
 */
function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

/**
 * Infer situations from content keywords
 */
function inferSituations(content: string, collection: string): Situation[] {
  const situations: Situation[] = [];
  const lowerContent = content.toLowerCase();

  // Check for situation keywords
  if (lowerContent.includes('begin') || lowerContent.includes('start')) {
    situations.push('beginning');
  }
  if (lowerContent.includes('stuck') || lowerContent.includes('block')) {
    situations.push('stuck');
  }
  if (lowerContent.includes('dark') || lowerContent.includes('shadow')) {
    situations.push('darkness');
  }
  if (lowerContent.includes('compar') || lowerContent.includes('envy')) {
    situations.push('comparison');
  }
  if (lowerContent.includes('fail') || lowerContent.includes('reject')) {
    situations.push('failure');
  }
  if (lowerContent.includes('celebrat') || lowerContent.includes('triumph')) {
    situations.push('celebration');
  }
  if (lowerContent.includes('confus') || lowerContent.includes('uncertain')) {
    situations.push('confusion');
  }
  if (lowerContent.includes('lost') || lowerContent.includes('wander')) {
    situations.push('lost');
  }
  if (lowerContent.includes('together') || lowerContent.includes('collaborat')) {
    situations.push('collaboration');
  }
  if (lowerContent.includes('fear') || lowerContent.includes('afraid')) {
    situations.push('fear');
  }
  if (lowerContent.includes('scatter') || lowerContent.includes('distract')) {
    situations.push('scattered');
  }

  return situations;
}

/**
 * Infer elements from content
 */
function inferElements(content: string): Element[] {
  const elements: Element[] = [];
  const lowerContent = content.toLowerCase();

  if (lowerContent.includes('fire') || lowerContent.includes('flame') || lowerContent.includes('burn')) {
    elements.push('fire');
  }
  if (lowerContent.includes('water') || lowerContent.includes('flow') || lowerContent.includes('ocean')) {
    elements.push('water');
  }
  if (lowerContent.includes('earth') || lowerContent.includes('ground') || lowerContent.includes('stone')) {
    elements.push('earth');
  }
  if (lowerContent.includes('air') || lowerContent.includes('wind') || lowerContent.includes('breath')) {
    elements.push('air');
  }
  if (lowerContent.includes('void') || lowerContent.includes('emptiness')) {
    elements.push('void');
  }

  return elements.length > 0 ? elements : ['all'];
}

/**
 * Infer Luminors mentioned in content
 */
function inferLuminors(content: string): Luminor[] {
  const luminors: Luminor[] = [];
  const lowerContent = content.toLowerCase();

  const luminorKeywords: Record<Luminor, string[]> = {
    valora: ['valora', 'courage', 'bravery', 'bold'],
    sophron: ['sophron', 'wisdom', 'knowledge', 'understanding'],
    kardia: ['kardia', 'heart', 'love', 'compassion'],
    poiesis: ['poiesis', 'creation', 'craft', 'making'],
    enduran: ['enduran', 'endurance', 'persistence', 'patience'],
    orakis: ['orakis', 'vision', 'sight', 'prophecy'],
    eudaira: ['eudaira', 'joy', 'happiness', 'delight'],
  };

  for (const [luminor, keywords] of Object.entries(luminorKeywords)) {
    if (keywords.some(keyword => lowerContent.includes(keyword))) {
      luminors.push(luminor as Luminor);
    }
  }

  return luminors;
}

// ============================================
// MAIN LOADER FUNCTIONS
// ============================================

/**
 * Get all collections
 */
export async function getCollections(): Promise<Collection[]> {
  return COLLECTIONS;
}

/**
 * Get a single collection by slug
 */
export async function getCollection(slug: string): Promise<Collection | null> {
  return COLLECTIONS.find(c => c.slug === slug) || null;
}

/**
 * Get all texts in a collection
 */
export async function getTextsInCollection(collectionSlug: string): Promise<Text[]> {
  const collectionPath = join(CONTENT_DIR, collectionSlug);

  try {
    const files = await readdir(collectionPath);
    const mdFiles = files.filter(f => f.endsWith('.md') && f !== 'README.md');

    const texts = await Promise.all(
      mdFiles.map(async (filename) => {
        const filePath = join(collectionPath, filename);
        return loadText(filePath, collectionSlug, filename);
      })
    );

    return texts.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
  } catch (error) {
    console.error(`Error loading collection ${collectionSlug}:`, error);
    return [];
  }
}

/**
 * Load a single text from file
 */
async function loadText(filePath: string, collectionSlug: string, filename: string): Promise<Text> {
  const fileContent = await readFile(filePath, 'utf-8');
  const { data: frontmatter, content } = grayMatter(fileContent);

  const collection = COLLECTIONS.find(c => c.slug === collectionSlug);
  const headings = extractHeadings(content);
  const wordCount = content.split(/\s+/).length;

  // Build frontmatter from file data + inferred data
  const textFrontmatter: TextFrontmatter = {
    // From frontmatter if exists, otherwise infer
    title: frontmatter.title || extractTitleFromFilename(filename),
    collection: collectionSlug,
    order: frontmatter.order || extractOrderFromFilename(filename),
    status: (frontmatter.status as ContentStatus) || 'published',
    format: (frontmatter.format as ContentFormat) || collection?.format || 'story',
    tags: frontmatter.tags || [],
    situations: frontmatter.situations || inferSituations(content, collectionSlug),

    // Optional fields
    publishedAt: frontmatter.publishedAt,
    updatedAt: frontmatter.updatedAt,
    elements: frontmatter.elements || inferElements(content),
    luminors: frontmatter.luminors || inferLuminors(content),
    relatedTexts: frontmatter.relatedTexts || [],
    prerequisites: frontmatter.prerequisites || [],
    nextReading: frontmatter.nextReading || [],
    excerpt: frontmatter.excerpt || content.slice(0, 200).replace(/[#*>\-\n]/g, ' ').trim() + '...',
    readingTime: frontmatter.readingTime || estimateReadingTime(content),
    wordCount,
    difficulty: frontmatter.difficulty,
    coverImage: frontmatter.coverImage,
    icon: frontmatter.icon,
  };

  return {
    slug: `${collectionSlug}/${filename.replace('.md', '')}`.toLowerCase().replace(/_/g, '-'),
    filename,
    frontmatter: textFrontmatter,
    content,
    headings,
  };
}

/**
 * Get a single text by slug
 */
export async function getText(slug: string): Promise<Text | null> {
  const [collectionSlug, ...textParts] = slug.split('/');
  const textSlug = textParts.join('/');

  const collectionPath = join(CONTENT_DIR, collectionSlug);

  try {
    const files = await readdir(collectionPath);

    // Find matching file (slug could be lowercase with dashes)
    const filename = files.find(f => {
      const normalizedFilename = f.replace('.md', '').toLowerCase().replace(/_/g, '-');
      return normalizedFilename === textSlug;
    });

    if (!filename) return null;

    return loadText(join(collectionPath, filename), collectionSlug, filename);
  } catch (error) {
    console.error(`Error loading text ${slug}:`, error);
    return null;
  }
}

/**
 * Get all texts
 */
export async function getAllTexts(): Promise<Text[]> {
  const allTexts: Text[] = [];

  for (const collection of COLLECTIONS) {
    const texts = await getTextsInCollection(collection.slug);
    allTexts.push(...texts);
  }

  return allTexts;
}

/**
 * Query texts with filters
 */
export async function queryTexts(query: ContentQuery): Promise<Text[]> {
  let texts = await getAllTexts();

  // Apply filters
  if (query.collection) {
    texts = texts.filter(t => t.frontmatter.collection === query.collection);
  }
  if (query.format) {
    texts = texts.filter(t => t.frontmatter.format === query.format);
  }
  if (query.status) {
    texts = texts.filter(t => t.frontmatter.status === query.status);
  }
  if (query.tags?.length) {
    texts = texts.filter(t =>
      query.tags!.some(tag => t.frontmatter.tags.includes(tag))
    );
  }
  if (query.situations?.length) {
    texts = texts.filter(t =>
      query.situations!.some(sit => t.frontmatter.situations.includes(sit))
    );
  }
  if (query.elements?.length) {
    texts = texts.filter(t =>
      query.elements!.some(el => t.frontmatter.elements?.includes(el))
    );
  }
  if (query.luminors?.length) {
    texts = texts.filter(t =>
      query.luminors!.some(lum => t.frontmatter.luminors?.includes(lum))
    );
  }
  if (query.search) {
    const searchLower = query.search.toLowerCase();
    texts = texts.filter(t =>
      t.frontmatter.title.toLowerCase().includes(searchLower) ||
      t.content.toLowerCase().includes(searchLower)
    );
  }

  // Apply pagination
  if (query.offset) {
    texts = texts.slice(query.offset);
  }
  if (query.limit) {
    texts = texts.slice(0, query.limit);
  }

  return texts;
}

/**
 * Get texts for a situation (smart recommendation)
 */
export async function getTextsForSituation(situation: Situation): Promise<Text[]> {
  const recommendedCollections = SITUATION_MAP[situation] || [];
  const allTexts = await getAllTexts();

  // Score texts by relevance
  return allTexts
    .filter(t =>
      recommendedCollections.includes(t.frontmatter.collection) ||
      t.frontmatter.situations.includes(situation)
    )
    .sort((a, b) => {
      // Prioritize explicit situation matches
      const aHasSituation = a.frontmatter.situations.includes(situation) ? 1 : 0;
      const bHasSituation = b.frontmatter.situations.includes(situation) ? 1 : 0;
      return bHasSituation - aHasSituation;
    });
}

// ============================================
// RELATIONSHIP GRAPH
// ============================================

/**
 * Build a relationship graph of all content
 */
export async function buildContentGraph(): Promise<ContentGraph> {
  const texts = await getAllTexts();
  const nodes: ContentNode[] = [];
  const edges: ContentEdge[] = [];

  // Create nodes
  for (const text of texts) {
    nodes.push({
      id: text.slug,
      title: text.frontmatter.title,
      collection: text.frontmatter.collection,
      format: text.frontmatter.format,
      tags: text.frontmatter.tags,
      situations: text.frontmatter.situations,
    });
  }

  // Create edges based on relationships
  for (const text of texts) {
    // Explicit related texts
    for (const relatedSlug of text.frontmatter.relatedTexts || []) {
      edges.push({
        source: text.slug,
        target: relatedSlug,
        type: 'related',
        weight: 1,
      });
    }

    // Prerequisites
    for (const prereqSlug of text.frontmatter.prerequisites || []) {
      edges.push({
        source: prereqSlug,
        target: text.slug,
        type: 'prerequisite',
        weight: 0.8,
      });
    }

    // Next reading
    for (const nextSlug of text.frontmatter.nextReading || []) {
      edges.push({
        source: text.slug,
        target: nextSlug,
        type: 'next',
        weight: 0.9,
      });
    }
  }

  // Create implicit edges based on shared attributes
  for (let i = 0; i < texts.length; i++) {
    for (let j = i + 1; j < texts.length; j++) {
      const textA = texts[i];
      const textB = texts[j];

      // Shared tags
      const sharedTags = textA.frontmatter.tags.filter(t =>
        textB.frontmatter.tags.includes(t)
      );
      if (sharedTags.length > 0) {
        edges.push({
          source: textA.slug,
          target: textB.slug,
          type: 'shared-tag',
          weight: 0.3 * sharedTags.length,
        });
      }

      // Shared situations
      const sharedSituations = textA.frontmatter.situations.filter(s =>
        textB.frontmatter.situations.includes(s)
      );
      if (sharedSituations.length > 0) {
        edges.push({
          source: textA.slug,
          target: textB.slug,
          type: 'shared-situation',
          weight: 0.5 * sharedSituations.length,
        });
      }
    }
  }

  return { nodes, edges };
}

/**
 * Get related texts for a given text
 */
export async function getRelatedTexts(slug: string, limit = 5): Promise<Text[]> {
  const graph = await buildContentGraph();
  const texts = await getAllTexts();

  // Find all edges involving this text
  const relevantEdges = graph.edges
    .filter(e => e.source === slug || e.target === slug)
    .map(e => ({
      targetSlug: e.source === slug ? e.target : e.source,
      weight: e.weight || 0.5,
    }));

  // Aggregate weights by target
  const weightMap = new Map<string, number>();
  for (const edge of relevantEdges) {
    const current = weightMap.get(edge.targetSlug) || 0;
    weightMap.set(edge.targetSlug, current + edge.weight);
  }

  // Sort by weight and return top results
  const sortedSlugs = Array.from(weightMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([slug]) => slug);

  return texts.filter(t => sortedSlugs.includes(t.slug));
}

// ============================================
// READING PATH GENERATOR
// ============================================

/**
 * Generate a reading path based on user's situation
 */
export async function generateReadingPath(
  situation: Situation,
  maxTexts = 7
): Promise<Text[]> {
  const situationTexts = await getTextsForSituation(situation);

  if (situationTexts.length === 0) return [];

  // Start with most relevant text
  const path: Text[] = [situationTexts[0]];
  const usedSlugs = new Set([situationTexts[0].slug]);

  // Build path through related texts
  while (path.length < maxTexts) {
    const lastText = path[path.length - 1];
    const relatedTexts = await getRelatedTexts(lastText.slug, 3);

    const nextText = relatedTexts.find(t => !usedSlugs.has(t.slug));
    if (!nextText) {
      // Fall back to situation texts
      const fallback = situationTexts.find(t => !usedSlugs.has(t.slug));
      if (!fallback) break;
      path.push(fallback);
      usedSlugs.add(fallback.slug);
    } else {
      path.push(nextText);
      usedSlugs.add(nextText.slug);
    }
  }

  return path;
}
