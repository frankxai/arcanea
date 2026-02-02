/**
 * Creation Service
 *
 * Handles all creation-related database operations including:
 * - Creating new creations
 * - Fetching creations with filters
 * - Updating creation metadata
 * - Soft deleting creations
 * - Managing creation visibility and status
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  Creation,
  CreationWithCreator,
  CreationResponse,
  CreationsListResponse,
  CreateCreationRequest,
  UpdateCreationRequest,
  CreationFilters,
  PaginationMeta,
} from '../types/api-responses';

/**
 * Get single creation by ID
 *
 * @param supabase - Supabase client instance
 * @param creationId - Creation ID to fetch
 * @param includePrivate - Whether to include private creations (default: false)
 * @returns Creation with creator info or null if not found
 * @throws {Error} If database query fails
 */
export async function getCreation(
  supabase: SupabaseClient,
  creationId: string,
  includePrivate = false
): Promise<CreationWithCreator | null> {
  try {
    let query = supabase
      .from('creations')
      .select(`
        *,
        creator:profiles!user_id (
          id,
          username,
          display_name,
          avatar_url,
          is_verified
        )
      `)
      .eq('id', creationId);

    if (!includePrivate) {
      query = query.eq('is_public', true);
    }

    const { data, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch creation: ${error.message}`);
    }

    return transformCreationWithCreator(data);
  } catch (error) {
    console.error('Error in getCreation:', error);
    throw error;
  }
}

/**
 * List creations with filters and pagination
 *
 * @param supabase - Supabase client instance
 * @param filters - Filter options
 * @returns Paginated list of creations with creators
 * @throws {Error} If database query fails
 */
export async function listCreations(
  supabase: SupabaseClient,
  filters: CreationFilters = {}
): Promise<CreationsListResponse> {
  try {
    const {
      type,
      luminorId,
      status = 'published',
      isPublic = true,
      tags,
      dateFrom,
      dateTo,
      sortBy = 'created_at',
      sortOrder = 'desc',
      page = 1,
      pageSize = 20,
    } = filters;

    // Start building query
    let query = supabase
      .from('creations')
      .select(`
        *,
        creator:profiles!user_id (
          id,
          username,
          display_name,
          avatar_url,
          is_verified
        )
      `, { count: 'exact' });

    // Apply filters
    if (type) {
      query = query.eq('type', type);
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (isPublic !== undefined) {
      query = query.eq('is_public', isPublic);
    }

    if (tags && tags.length > 0) {
      query = query.contains('tags', tags);
    }

    if (dateFrom) {
      query = query.gte('created_at', dateFrom);
    }

    if (dateTo) {
      query = query.lte('created_at', dateTo);
    }

    // Apply sorting
    const ascending = sortOrder === 'asc';
    query = query.order(sortBy, { ascending });

    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Failed to list creations: ${error.message}`);
    }

    const totalItems = count || 0;
    const totalPages = Math.ceil(totalItems / pageSize);

    const pagination: PaginationMeta = {
      page,
      pageSize,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    return {
      creations: (data || []).map(transformCreationWithCreator),
      pagination,
    };
  } catch (error) {
    console.error('Error in listCreations:', error);
    throw error;
  }
}

/**
 * Get creations by user ID
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID to fetch creations for
 * @param includePrivate - Whether to include private creations
 * @param page - Page number
 * @param pageSize - Items per page
 * @returns Paginated user creations
 * @throws {Error} If database query fails
 */
export async function getUserCreations(
  supabase: SupabaseClient,
  userId: string,
  includePrivate = false,
  page = 1,
  pageSize = 20
): Promise<CreationsListResponse> {
  try {
    let query = supabase
      .from('creations')
      .select(`
        *,
        creator:profiles!user_id (
          id,
          username,
          display_name,
          avatar_url,
          is_verified
        )
      `, { count: 'exact' })
      .eq('user_id', userId);

    if (!includePrivate) {
      query = query.eq('is_public', true).eq('status', 'published');
    }

    query = query.order('created_at', { ascending: false });

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Failed to fetch user creations: ${error.message}`);
    }

    const totalItems = count || 0;
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      creations: (data || []).map(transformCreationWithCreator),
      pagination: {
        page,
        pageSize,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error('Error in getUserCreations:', error);
    throw error;
  }
}

/**
 * Create new creation
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID creating the content
 * @param creation - Creation data
 * @returns Created creation with creator info
 * @throws {Error} If creation fails
 */
export async function createCreation(
  supabase: SupabaseClient,
  userId: string,
  creation: CreateCreationRequest
): Promise<CreationWithCreator> {
  try {
    const { data, error } = await supabase
      .from('creations')
      .insert({
        user_id: userId,
        title: creation.title,
        description: creation.description || null,
        type: creation.type,
        file_url: creation.fileUrl,
        thumbnail_url: creation.thumbnailUrl || null,
        file_size: creation.fileSize || null,
        file_format: creation.fileFormat || null,
        ai_tool: creation.aiTool || null,
        prompt: creation.prompt || null,
        model: creation.model || null,
        generation_params: creation.generationParams || {},
        seed: creation.seed || null,
        metadata: creation.metadata || {},
        status: creation.status || 'draft',
        is_public: creation.isPublic ?? false,
        tags: creation.tags || [],
        categories: creation.categories || [],
        license: creation.license || 'cc_by_nc',
        allow_remix: creation.allowRemix ?? true,
        allow_commercial: creation.allowCommercial ?? false,
        published_at: creation.status === 'published' ? new Date().toISOString() : null,
      })
      .select(`
        *,
        creator:profiles!user_id (
          id,
          username,
          display_name,
          avatar_url,
          is_verified
        )
      `)
      .single();

    if (error) {
      throw new Error(`Failed to create creation: ${error.message}`);
    }

    return transformCreationWithCreator(data);
  } catch (error) {
    console.error('Error in createCreation:', error);
    throw error;
  }
}

/**
 * Update creation
 *
 * @param supabase - Supabase client instance
 * @param creationId - Creation ID to update
 * @param userId - User ID (for authorization check)
 * @param updates - Fields to update
 * @returns Updated creation
 * @throws {Error} If update fails or user doesn't own creation
 */
export async function updateCreation(
  supabase: SupabaseClient,
  creationId: string,
  userId: string,
  updates: UpdateCreationRequest
): Promise<CreationWithCreator> {
  try {
    // First verify ownership
    const { data: existing } = await supabase
      .from('creations')
      .select('user_id')
      .eq('id', creationId)
      .single();

    if (!existing || existing.user_id !== userId) {
      throw new Error('Creation not found or you do not have permission to update it');
    }

    // Check if we're publishing for the first time
    const shouldSetPublishedAt = updates.status === 'published' && !existing;

    const { data, error } = await supabase
      .from('creations')
      .update({
        ...(updates.title && { title: updates.title }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.thumbnailUrl !== undefined && { thumbnail_url: updates.thumbnailUrl }),
        ...(updates.status && { status: updates.status }),
        ...(updates.isPublic !== undefined && { is_public: updates.isPublic }),
        ...(updates.tags && { tags: updates.tags }),
        ...(updates.categories && { categories: updates.categories }),
        ...(updates.license && { license: updates.license }),
        ...(updates.allowRemix !== undefined && { allow_remix: updates.allowRemix }),
        ...(updates.allowCommercial !== undefined && { allow_commercial: updates.allowCommercial }),
        ...(shouldSetPublishedAt && { published_at: new Date().toISOString() }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', creationId)
      .select(`
        *,
        creator:profiles!user_id (
          id,
          username,
          display_name,
          avatar_url,
          is_verified
        )
      `)
      .single();

    if (error) {
      throw new Error(`Failed to update creation: ${error.message}`);
    }

    return transformCreationWithCreator(data);
  } catch (error) {
    console.error('Error in updateCreation:', error);
    throw error;
  }
}

/**
 * Soft delete creation (archive)
 *
 * @param supabase - Supabase client instance
 * @param creationId - Creation ID to delete
 * @param userId - User ID (for authorization check)
 * @throws {Error} If deletion fails or user doesn't own creation
 */
export async function deleteCreation(
  supabase: SupabaseClient,
  creationId: string,
  userId: string
): Promise<void> {
  try {
    // Verify ownership
    const { data: existing } = await supabase
      .from('creations')
      .select('user_id')
      .eq('id', creationId)
      .single();

    if (!existing || existing.user_id !== userId) {
      throw new Error('Creation not found or you do not have permission to delete it');
    }

    // Soft delete by setting status to archived
    const { error } = await supabase
      .from('creations')
      .update({
        status: 'archived',
        is_public: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', creationId);

    if (error) {
      throw new Error(`Failed to delete creation: ${error.message}`);
    }
  } catch (error) {
    console.error('Error in deleteCreation:', error);
    throw error;
  }
}

/**
 * Increment view count
 *
 * @param supabase - Supabase client instance
 * @param creationId - Creation ID to increment views for
 */
export async function incrementViewCount(
  supabase: SupabaseClient,
  creationId: string
): Promise<void> {
  try {
    await supabase.rpc('increment_creation_views', { creation_id: creationId });
  } catch (error) {
    // Non-critical operation, just log
    console.warn('Failed to increment view count:', error);
  }
}

// =====================================================================
// HELPER FUNCTIONS
// =====================================================================

/**
 * Transform database creation to API format
 *
 * @param data - Raw creation data from database
 * @returns Transformed creation
 */
function transformCreation(data: any): Creation {
  return {
    id: data.id,
    userId: data.user_id,
    title: data.title,
    description: data.description,
    type: data.type,
    fileUrl: data.file_url,
    thumbnailUrl: data.thumbnail_url,
    fileSize: data.file_size,
    fileFormat: data.file_format,
    aiTool: data.ai_tool,
    prompt: data.prompt,
    model: data.model,
    generationParams: data.generation_params || {},
    seed: data.seed,
    metadata: data.metadata || {},
    status: data.status,
    isPublic: data.is_public,
    isFeatured: data.is_featured,
    isNsfw: data.is_nsfw,
    license: data.license,
    allowRemix: data.allow_remix,
    allowCommercial: data.allow_commercial,
    tags: data.tags || [],
    categories: data.categories || [],
    viewCount: data.view_count || 0,
    likeCount: data.like_count || 0,
    commentCount: data.comment_count || 0,
    remixCount: data.remix_count || 0,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    publishedAt: data.published_at,
  };
}

/**
 * Transform creation with creator info
 *
 * @param data - Raw creation data with creator from database
 * @returns Transformed creation with creator
 */
function transformCreationWithCreator(data: any): CreationWithCreator {
  const creation = transformCreation(data);

  return {
    ...creation,
    creator: {
      id: data.creator.id,
      username: data.creator.username,
      displayName: data.creator.display_name,
      avatarUrl: data.creator.avatar_url,
      isVerified: data.creator.is_verified,
    },
  };
}
