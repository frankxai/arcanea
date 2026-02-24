/**
 * Arcanea Content Types
 *
 * Type definitions for the Library of Arcanea content system.
 */

import type { Element, LuminorId } from './mythology.js';

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

// ============================================
// COLLECTION (Folder level)
// ============================================

export interface Collection {
  slug: string;
  name: string;
  description: string;
  order: number;
  format: ContentFormat;
  readWhen: string;
  textCount: number;
  icon?: string;
  coverImage?: string;
}

// ============================================
// TEXT (Individual document)
// ============================================

export interface TextFrontmatter {
  title: string;
  collection: string;
  order: number;
  status: ContentStatus;
  publishedAt?: string;
  updatedAt?: string;
  format: ContentFormat;
  tags: string[];
  situations: Situation[];
  elements?: Element[];
  luminors?: LuminorId[];
  relatedTexts?: string[];
  prerequisites?: string[];
  nextReading?: string[];
  excerpt?: string;
  readingTime?: number;
  wordCount?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  coverImage?: string;
  icon?: string;
}

export interface Heading {
  level: number;
  text: string;
  slug: string;
}

export interface Text {
  slug: string;
  filename: string;
  frontmatter: TextFrontmatter;
  content: string;
  html?: string;
  headings: Heading[];
}

// ============================================
// CODEX TYPES
// ============================================

export interface CodexAuthor {
  name: string;
  role: string;
}

export interface CodexPreface {
  invocation?: string;
  body?: string[];
  oath?: string;
}

export interface CodexInsight {
  title: string;
  detail: string;
}

export interface CodexArtifact {
  name: string;
  description: string;
  application?: string;
}

export interface CodexSection {
  heading: string;
  body?: string[];
  insights?: CodexInsight[];
  artifacts?: CodexArtifact[];
  principles?: string[];
}

export interface CodexChapter {
  title: string;
  tagline?: string;
  epigraph?: {
    text: string;
    attribution?: string;
  };
  introduction?: string[];
  sections: CodexSection[];
  rituals?: string[];
  measurements?: { name: string; description: string }[];
}

export interface CodexAppendix {
  title: string;
  subtitle?: string;
  entries?: { heading: string; body?: string[]; points?: string[] }[];
  glossary?: { term: string; definition: string }[];
}

export interface ArcaneaCodex {
  title: string;
  subtitle?: string;
  authors: CodexAuthor[];
  preface: CodexPreface;
  chapters: CodexChapter[];
  appendix?: CodexAppendix;
}

export interface ArcaneaTomeMeta {
  id: string;
  title: string;
  subtitle: string;
  focus: string;
  summary: string;
  release: string;
  status: 'available' | 'in-progress' | 'concept';
  heroTone?: string;
}

export interface ArcaneaTome {
  meta: ArcaneaTomeMeta;
  codex: ArcaneaCodex;
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
  luminors?: LuminorId[];
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
