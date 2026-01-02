/**
 * Library of Arcanea - Content Type System
 *
 * ★ Insight ─────────────────────────────────────
 * This type system enables:
 * 1. Frontmatter validation (tags, relationships, status)
 * 2. Type-safe content queries
 * 3. Relationship graphs between texts
 * ─────────────────────────────────────────────────
 */

// ============================================
// CORE TYPES
// ============================================

export type ContentStatus = 'draft' | 'review' | 'published' | 'archived';

export type ContentFormat =
  | 'theory'      // Laws of Arcanea
  | 'story'       // Legends, Chronicles, Tales
  | 'poetry'      // Poetry of Freedom
  | 'practical'   // Wisdom Scrolls, Rituals, Handbook
  | 'dialogue'    // Dialogues of Masters
  | 'meditation'  // Meditations on Elements
  | 'reference'   // Bestiary, Atlas
  | 'song'        // Songs and Hymns
  | 'shadow';     // Book of Shadows

export type Element = 'fire' | 'water' | 'earth' | 'air' | 'void' | 'all';

export type Situation =
  | 'beginning'
  | 'stuck'
  | 'darkness'
  | 'comparison'
  | 'failure'
  | 'celebration'
  | 'confusion'
  | 'lost'
  | 'collaboration'
  | 'fear'
  | 'scattered';

export type Luminor =
  | 'valora'    // Courage
  | 'sophron'   // Wisdom
  | 'kardia'    // Heart
  | 'poiesis'   // Creation
  | 'enduran'   // Endurance
  | 'orakis'    // Vision
  | 'eudaira';  // Joy

// ============================================
// COLLECTION (Folder level)
// ============================================

export interface Collection {
  slug: string;                   // e.g., "legends-of-arcanea"
  name: string;                   // e.g., "The Legends of Arcanea"
  description: string;            // Brief description
  order: number;                  // Display order (1-17)
  format: ContentFormat;          // Primary format
  readWhen: string;               // "Read when: you need..."
  textCount: number;              // Number of texts in collection
  icon?: string;                  // Emoji or icon name
  coverImage?: string;            // Cover image path
}

// ============================================
// TEXT (Individual document)
// ============================================

export interface TextFrontmatter {
  // Required
  title: string;
  collection: string;             // Parent collection slug
  order: number;                  // Order within collection

  // Publishing
  status: ContentStatus;
  publishedAt?: string;           // ISO date
  updatedAt?: string;

  // Categorization
  format: ContentFormat;
  tags: string[];                 // Free-form tags
  situations: Situation[];        // When to read this
  elements?: Element[];           // Elemental associations
  luminors?: Luminor[];           // Associated Luminors

  // Relationships
  relatedTexts?: string[];        // Slugs of related texts
  prerequisites?: string[];       // Should read these first
  nextReading?: string[];         // Suggested next reading

  // Metadata
  excerpt?: string;               // Short description
  readingTime?: number;           // Estimated minutes
  wordCount?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';

  // Display
  coverImage?: string;
  icon?: string;
}

export interface Text {
  slug: string;                   // Full slug: "legends-of-arcanea/the-first-dawn"
  filename: string;               // e.g., "I_THE_FIRST_DAWN.md"
  frontmatter: TextFrontmatter;
  content: string;                // Raw markdown content
  html?: string;                  // Rendered HTML
  headings: Heading[];            // Table of contents
}

export interface Heading {
  level: number;                  // 1-6
  text: string;
  slug: string;                   // URL-friendly anchor
}

// ============================================
// RELATIONSHIP GRAPH
// ============================================

export interface ContentNode {
  id: string;                     // Text slug
  title: string;
  collection: string;
  format: ContentFormat;
  tags: string[];
  situations: Situation[];
}

export interface ContentEdge {
  source: string;                 // From text slug
  target: string;                 // To text slug
  type: 'related' | 'prerequisite' | 'next' | 'shared-tag' | 'shared-situation';
  weight?: number;                // Relationship strength
}

export interface ContentGraph {
  nodes: ContentNode[];
  edges: ContentEdge[];
}

// ============================================
// QUERY TYPES
// ============================================

export interface ContentQuery {
  collection?: string;
  format?: ContentFormat;
  status?: ContentStatus;
  tags?: string[];
  situations?: Situation[];
  elements?: Element[];
  luminors?: Luminor[];
  search?: string;
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  text: Text;
  score: number;
  highlights?: {
    title?: string;
    content?: string;
    excerpt?: string;
  };
}

// ============================================
// READING STATE (for user progress tracking)
// ============================================

export interface ReadingProgress {
  textSlug: string;
  userId: string;
  startedAt: string;
  completedAt?: string;
  scrollPosition?: number;        // Percentage scrolled
  bookmarks?: string[];           // Heading slugs bookmarked
  notes?: Note[];
}

export interface Note {
  id: string;
  textSlug: string;
  content: string;
  headingSlug?: string;           // Attached to heading
  createdAt: string;
}
