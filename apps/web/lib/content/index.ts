/**
 * Library of Arcanea - Content System
 *
 * ★ Insight ─────────────────────────────────────
 * This barrel export provides a clean API for the content system.
 * All content operations flow through here:
 * - Type definitions for type-safe content handling
 * - Loader functions for fetching and querying content
 * - Graph operations for relationship visualization
 * ─────────────────────────────────────────────────
 */

// Types
export * from './types';

// Loader functions
export {
  // Collections
  getCollections,
  getCollection,
  COLLECTIONS,

  // Texts
  getText,
  getAllTexts,
  getTextsInCollection,
  queryTexts,

  // Situational recommendations
  getTextsForSituation,

  // Relationships
  buildContentGraph,
  getRelatedTexts,
  generateReadingPath,
} from './loader';
