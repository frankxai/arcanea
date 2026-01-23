/**
 * Arcanea Services - Barrel Export
 *
 * Central export point for all service modules.
 * Services provide core functionality for embedding, search, and AI operations.
 *
 * @module lib/services
 */

// ============================================
// EMBEDDING SERVICE
// ============================================

export {
  // Class
  EmbeddingService,
  // Singleton getter
  getEmbeddingService,
  // Convenience functions
  generateEmbedding,
  batchEmbeddings,
  chunkText,
  // Types
  type EmbeddingResult,
  type BatchEmbeddingResult,
  type TextChunk,
  type ChunkMetadata,
  type EmbeddingServiceConfig,
  // Re-export TaskType enum
  TaskType,
} from './embeddings';

// ============================================
// VECTOR SEARCH SERVICE
// ============================================

export {
  // Class
  VectorSearchService,
  // Singleton getter
  getVectorSearchService,
  // Convenience functions
  searchLore,
  searchCreations,
  findSimilar,
  // Types
  type LoreFragment,
  type LoreCategory,
  type CreationWithEmbedding,
  type SearchResult,
  type SearchOptions,
  type CreationSearchOptions,
} from './vector-search';
