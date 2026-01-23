/**
 * Arcanea Vector Search Service
 *
 * Semantic search service using pgvector for similarity matching.
 * Integrates with Supabase for vector storage and retrieval.
 *
 * Uses cosine similarity for matching (1 - cosine_distance).
 *
 * @module lib/services/vector-search
 */

import { getSupabaseAdmin, supabaseServer } from '@/lib/supabase';
import { getEmbeddingService, TaskType } from './embeddings';

// ============================================
// TYPES
// ============================================

/**
 * Lore fragment from the database
 */
export interface LoreFragment {
  id: string;
  category: LoreCategory;
  title: string;
  content: string;
  embedding?: number[];
  source_file?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  similarity?: number;
  [key: string]: unknown; // Index signature for generic compatibility
}

export type LoreCategory =
  | 'magic_system'
  | 'geography'
  | 'history'
  | 'character'
  | 'creature'
  | 'artifact'
  | 'library_text'   // Library of Arcanea content
  | 'user_creation'; // User-generated content

/**
 * User creation with embedding
 */
export interface CreationWithEmbedding {
  id: string;
  title: string;
  description: string | null;
  type: string;
  user_id: string;
  content?: string;
  embedding?: number[];
  tags: string[];
  similarity?: number;
}

/**
 * Search result with similarity score
 */
export interface SearchResult<T> {
  item: T;
  similarity: number;
}

/**
 * Search options
 */
export interface SearchOptions {
  limit?: number;
  threshold?: number;
  category?: LoreCategory;
  tags?: string[];
  sourceFile?: string;
}

/**
 * Creation search options
 */
export interface CreationSearchOptions extends SearchOptions {
  userId?: string;
  type?: string;
}

// ============================================
// CONSTANTS
// ============================================

const DEFAULT_LIMIT = 10;
const DEFAULT_THRESHOLD = 0.5; // Minimum similarity score
const EMBEDDING_DIMENSION = 768;

// ============================================
// VECTOR SEARCH SERVICE CLASS
// ============================================

export class VectorSearchService {
  private embeddingService = getEmbeddingService();

  /**
   * Search lore fragments by semantic similarity.
   *
   * @param query - Natural language search query
   * @param options - Search options (limit, threshold, filters)
   * @returns Array of lore fragments with similarity scores
   */
  async searchLore(
    query: string,
    options: SearchOptions = {}
  ): Promise<SearchResult<LoreFragment>[]> {
    const {
      limit = DEFAULT_LIMIT,
      threshold = DEFAULT_THRESHOLD,
      category,
      tags,
      sourceFile,
    } = options;

    if (!query || query.trim().length === 0) {
      throw new Error('Search query cannot be empty');
    }

    // Generate query embedding (using RETRIEVAL_QUERY for better matching)
    const queryEmbedding = await this.embeddingService.generateEmbedding(
      query,
      TaskType.RETRIEVAL_QUERY
    );

    // Use the Supabase RPC function for vector similarity search
    const supabase = getSupabaseAdmin();

    // First try the match_lore function
    try {
      const { data: matchedData, error: rpcError } = await supabase.rpc('match_lore', {
        query_embedding: `[${queryEmbedding.embedding.join(',')}]`,
        match_threshold: threshold,
        match_count: limit,
      });

      if (!rpcError && matchedData) {
        // Apply additional filters if needed
        let results = matchedData as Array<{
          id: string;
          content: string;
          similarity: number;
        }>;

        // Fetch full lore fragment data for matched IDs
        const { data: fullData, error: fetchError } = await supabase
          .from('lore_fragments')
          .select('*')
          .in('id', results.map(r => r.id));

        if (fetchError) {
          console.error('Error fetching full lore data:', fetchError);
          throw fetchError;
        }

        // Merge similarity scores with full data
        const resultsMap = new Map(results.map(r => [r.id, r.similarity]));
        const fullResults = (fullData || [])
          .map(item => ({
            item: item as LoreFragment,
            similarity: resultsMap.get(item.id) || 0,
          }))
          .filter(r => {
            // Apply additional filters
            if (category && r.item.category !== category) return false;
            if (tags && tags.length > 0) {
              const itemTags = r.item.tags || [];
              if (!tags.some(t => itemTags.includes(t))) return false;
            }
            if (sourceFile && r.item.source_file !== sourceFile) return false;
            return true;
          })
          .sort((a, b) => b.similarity - a.similarity)
          .slice(0, limit);

        return fullResults;
      }
    } catch (rpcError) {
      console.warn('RPC match_lore failed, falling back to manual search:', rpcError);
    }

    // Fallback: Manual vector search if RPC fails
    return this.manualVectorSearch(
      'lore_fragments',
      queryEmbedding.embedding,
      { limit, threshold, category, tags, sourceFile }
    ) as Promise<SearchResult<LoreFragment>[]>;
  }

  /**
   * Search user creations by semantic similarity.
   *
   * @param query - Natural language search query
   * @param options - Search options (limit, threshold, userId, type)
   * @returns Array of creations with similarity scores
   */
  async searchCreations(
    query: string,
    options: CreationSearchOptions = {}
  ): Promise<SearchResult<CreationWithEmbedding>[]> {
    const {
      limit = DEFAULT_LIMIT,
      threshold = DEFAULT_THRESHOLD,
      userId,
      type,
      tags,
    } = options;

    if (!query || query.trim().length === 0) {
      throw new Error('Search query cannot be empty');
    }

    // Generate query embedding
    const queryEmbedding = await this.embeddingService.generateEmbedding(
      query,
      TaskType.RETRIEVAL_QUERY
    );

    const supabase = getSupabaseAdmin();

    // Build base query
    let queryBuilder = supabase
      .from('creations')
      .select('*');

    // Apply filters
    if (userId) {
      queryBuilder = queryBuilder.eq('user_id', userId);
    }
    if (type) {
      queryBuilder = queryBuilder.eq('type', type);
    }
    if (tags && tags.length > 0) {
      queryBuilder = queryBuilder.overlaps('tags', tags);
    }

    const { data, error } = await queryBuilder;

    if (error) {
      console.error('Error searching creations:', error);
      throw error;
    }

    // Manual similarity calculation (creations may not have embeddings yet)
    const results: SearchResult<CreationWithEmbedding>[] = [];

    for (const creation of data || []) {
      // If creation has embedding, calculate similarity
      if (creation.embedding) {
        const similarity = this.cosineSimilarity(
          queryEmbedding.embedding,
          creation.embedding
        );

        if (similarity >= threshold) {
          results.push({
            item: creation as CreationWithEmbedding,
            similarity,
          });
        }
      } else {
        // Fallback: text-based relevance scoring
        const textContent = `${creation.title} ${creation.description || ''} ${(creation.tags || []).join(' ')}`;
        const queryLower = query.toLowerCase();
        const textLower = textContent.toLowerCase();

        // Simple keyword matching score
        const queryWords = queryLower.split(/\s+/);
        const matchCount = queryWords.filter(w => textLower.includes(w)).length;
        const roughScore = matchCount / queryWords.length;

        if (roughScore >= threshold * 0.5) {
          // Lower threshold for text matching
          results.push({
            item: creation as CreationWithEmbedding,
            similarity: roughScore * 0.7, // Discount text-based matching
          });
        }
      }
    }

    return results
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);
  }

  /**
   * Find similar items to a given embedding vector.
   * Generic function that works with any table having an embedding column.
   *
   * @param embedding - Reference embedding vector
   * @param table - Table name to search
   * @param options - Search options
   * @returns Array of similar items with similarity scores
   */
  async findSimilar<T extends Record<string, unknown>>(
    embedding: number[],
    table: string,
    options: SearchOptions = {}
  ): Promise<SearchResult<T>[]> {
    const { limit = DEFAULT_LIMIT, threshold = DEFAULT_THRESHOLD } = options;

    if (!embedding || embedding.length !== EMBEDDING_DIMENSION) {
      throw new Error(`Embedding must be ${EMBEDDING_DIMENSION} dimensions`);
    }

    return this.manualVectorSearch<T>(table, embedding, { limit, threshold });
  }

  /**
   * Find similar lore fragments by ID.
   *
   * @param fragmentId - ID of the reference fragment
   * @param limit - Maximum number of results
   * @returns Array of similar fragments
   */
  async findSimilarLore(
    fragmentId: string,
    limit: number = 5
  ): Promise<SearchResult<LoreFragment>[]> {
    const supabase = getSupabaseAdmin();

    // Get the reference fragment's embedding
    const { data: fragment, error } = await supabase
      .from('lore_fragments')
      .select('embedding')
      .eq('id', fragmentId)
      .single();

    if (error || !fragment?.embedding) {
      throw new Error(`Fragment not found or has no embedding: ${fragmentId}`);
    }

    // Find similar, excluding the reference
    const results = await this.findSimilar(
      fragment.embedding,
      'lore_fragments',
      { limit: limit + 1 }
    ) as SearchResult<LoreFragment>[];

    // Remove the reference fragment from results
    return results.filter(r => r.item.id !== fragmentId).slice(0, limit);
  }

  /**
   * Upsert a lore fragment with its embedding.
   *
   * @param fragment - Fragment data to upsert
   * @param generateEmbedding - Whether to generate embedding for content
   * @returns The upserted fragment
   */
  async upsertLoreFragment(
    fragment: Partial<LoreFragment> & { content: string; category: LoreCategory; title: string },
    generateEmbedding: boolean = true
  ): Promise<LoreFragment> {
    const supabase = getSupabaseAdmin();

    let embedding: number[] | undefined;

    if (generateEmbedding) {
      const result = await this.embeddingService.generateEmbedding(
        fragment.content,
        TaskType.RETRIEVAL_DOCUMENT
      );
      embedding = result.embedding;
    }

    const { data, error } = await supabase
      .from('lore_fragments')
      .upsert({
        ...fragment,
        embedding: embedding ? `[${embedding.join(',')}]` : undefined,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting lore fragment:', error);
      throw error;
    }

    return data as LoreFragment;
  }

  /**
   * Batch upsert lore fragments.
   *
   * @param fragments - Array of fragments to upsert
   * @param generateEmbeddings - Whether to generate embeddings
   * @returns Number of successfully upserted fragments
   */
  async batchUpsertLoreFragments(
    fragments: Array<Partial<LoreFragment> & { content: string; category: LoreCategory; title: string }>,
    generateEmbeddings: boolean = true
  ): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    // Process in smaller batches to avoid rate limits
    const batchSize = 10;

    for (let i = 0; i < fragments.length; i += batchSize) {
      const batch = fragments.slice(i, i + batchSize);

      const results = await Promise.allSettled(
        batch.map(fragment =>
          this.upsertLoreFragment(fragment, generateEmbeddings)
        )
      );

      for (const result of results) {
        if (result.status === 'fulfilled') {
          success++;
        } else {
          failed++;
          console.error('Failed to upsert fragment:', result.reason);
        }
      }

      // Rate limiting between batches
      if (i + batchSize < fragments.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Progress logging
      console.log(`Processed ${Math.min(i + batchSize, fragments.length)}/${fragments.length} fragments`);
    }

    return { success, failed };
  }

  /**
   * Delete lore fragments by source file.
   *
   * @param sourceFile - Source file to delete fragments for
   * @returns Number of deleted fragments
   */
  async deleteLoreBySource(sourceFile: string): Promise<number> {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from('lore_fragments')
      .delete()
      .eq('source_file', sourceFile)
      .select('id');

    if (error) {
      console.error('Error deleting lore fragments:', error);
      throw error;
    }

    return data?.length || 0;
  }

  // ============================================
  // PRIVATE METHODS
  // ============================================

  /**
   * Manual vector search fallback when RPC is not available.
   */
  private async manualVectorSearch<T extends Record<string, unknown>>(
    table: string,
    queryEmbedding: number[],
    options: SearchOptions
  ): Promise<SearchResult<T>[]> {
    const { limit = DEFAULT_LIMIT, threshold = DEFAULT_THRESHOLD, category, tags, sourceFile } = options;

    const supabase = getSupabaseAdmin();

    // Fetch all items with embeddings
    let query = supabase.from(table).select('*');

    if (category) {
      query = query.eq('category', category);
    }
    if (sourceFile) {
      query = query.eq('source_file', sourceFile);
    }
    if (tags && tags.length > 0) {
      query = query.overlaps('tags', tags);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching from ${table}:`, error);
      throw error;
    }

    // Calculate similarity for each item
    const results: SearchResult<T>[] = [];

    for (const item of data || []) {
      if (item.embedding) {
        // Parse embedding if it's a string
        const itemEmbedding = typeof item.embedding === 'string'
          ? JSON.parse(item.embedding)
          : item.embedding;

        const similarity = this.cosineSimilarity(queryEmbedding, itemEmbedding);

        if (similarity >= threshold) {
          results.push({
            item: item as T,
            similarity,
          });
        }
      }
    }

    return results
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);
  }

  /**
   * Calculate cosine similarity between two vectors.
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error('Vectors must have the same length');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    const denominator = Math.sqrt(normA) * Math.sqrt(normB);

    if (denominator === 0) {
      return 0;
    }

    return dotProduct / denominator;
  }
}

// ============================================
// SINGLETON INSTANCE
// ============================================

let vectorSearchInstance: VectorSearchService | null = null;

/**
 * Get the singleton vector search service instance.
 */
export function getVectorSearchService(): VectorSearchService {
  if (!vectorSearchInstance) {
    vectorSearchInstance = new VectorSearchService();
  }
  return vectorSearchInstance;
}

// ============================================
// CONVENIENCE FUNCTIONS
// ============================================

/**
 * Search lore fragments (convenience function).
 */
export async function searchLore(
  query: string,
  limit: number = DEFAULT_LIMIT,
  threshold: number = DEFAULT_THRESHOLD
): Promise<LoreFragment[]> {
  const service = getVectorSearchService();
  const results = await service.searchLore(query, { limit, threshold });
  return results.map(r => ({ ...r.item, similarity: r.similarity }));
}

/**
 * Search user creations (convenience function).
 */
export async function searchCreations(
  query: string,
  userId?: string
): Promise<CreationWithEmbedding[]> {
  const service = getVectorSearchService();
  const results = await service.searchCreations(query, { userId });
  return results.map(r => ({ ...r.item, similarity: r.similarity }));
}

/**
 * Find similar items by embedding (convenience function).
 */
export async function findSimilar<T extends Record<string, unknown>>(
  embedding: number[],
  table: string,
  limit: number = 10
): Promise<T[]> {
  const service = getVectorSearchService();
  const results = await service.findSimilar<T>(embedding, table, { limit });
  return results.map(r => r.item);
}
