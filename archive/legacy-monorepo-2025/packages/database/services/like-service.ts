/**
 * Like Service
 *
 * Handles all like-related database operations including:
 * - Toggling likes (like/unlike)
 * - Getting like counts
 * - Checking if user has liked
 * - Fetching likes with user profiles
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  Like,
  LikeWithProfile,
  LikeResponse,
  LikesListResponse,
  PaginationParams,
} from '../types/social-types';

/**
 * Toggle like on a creation (like if not liked, unlike if already liked)
 *
 * @param supabase - Supabase client instance
 * @param userId - User performing the action
 * @param creationId - Creation to like/unlike
 * @returns Like response with status and updated count
 * @throws {Error} If operation fails
 */
export async function toggleLike(
  supabase: SupabaseClient,
  userId: string,
  creationId: string
): Promise<LikeResponse> {
  try {
    // Check if creation exists
    const { data: creation, error: creationError } = await supabase
      .from('creations')
      .select('id, like_count')
      .eq('id', creationId)
      .single();

    if (creationError || !creation) {
      throw new Error('Creation not found');
    }

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', userId)
      .eq('creation_id', creationId)
      .maybeSingle();

    if (existingLike) {
      // Unlike: Delete the like
      const { error: deleteError } = await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id);

      if (deleteError) {
        throw new Error(`Failed to unlike: ${deleteError.message}`);
      }

      // Decrement like count
      const newCount = Math.max((creation.like_count || 0) - 1, 0);
      await supabase
        .from('creations')
        .update({ like_count: newCount })
        .eq('id', creationId);

      return {
        liked: false,
        likeCount: newCount,
      };
    } else {
      // Like: Create new like
      const { data: newLike, error: insertError } = await supabase
        .from('likes')
        .insert({
          user_id: userId,
          creation_id: creationId,
        })
        .select()
        .single();

      if (insertError) {
        throw new Error(`Failed to like: ${insertError.message}`);
      }

      // Increment like count
      const newCount = (creation.like_count || 0) + 1;
      await supabase
        .from('creations')
        .update({ like_count: newCount })
        .eq('id', creationId);

      return {
        liked: true,
        likeCount: newCount,
        like: transformLike(newLike),
      };
    }
  } catch (error) {
    console.error('Error in toggleLike:', error);
    throw error;
  }
}

/**
 * Check if user has liked a creation
 *
 * @param supabase - Supabase client instance
 * @param userId - User to check
 * @param creationId - Creation to check
 * @returns True if liked, false otherwise
 * @throws {Error} If query fails
 */
export async function isLiked(
  supabase: SupabaseClient,
  userId: string,
  creationId: string
): Promise<boolean> {
  try {
    const { data } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', userId)
      .eq('creation_id', creationId)
      .maybeSingle();

    return !!data;
  } catch (error) {
    console.error('Error in isLiked:', error);
    return false;
  }
}

/**
 * Get like count for a creation
 *
 * @param supabase - Supabase client instance
 * @param creationId - Creation to get count for
 * @returns Number of likes
 * @throws {Error} If query fails
 */
export async function getLikeCount(
  supabase: SupabaseClient,
  creationId: string
): Promise<number> {
  try {
    const { data } = await supabase
      .from('creations')
      .select('like_count')
      .eq('id', creationId)
      .single();

    return data?.like_count || 0;
  } catch (error) {
    console.error('Error in getLikeCount:', error);
    return 0;
  }
}

/**
 * Get likes for a creation with user profiles
 *
 * @param supabase - Supabase client instance
 * @param creationId - Creation to get likes for
 * @param pagination - Pagination parameters
 * @returns List of likes with profiles and pagination info
 * @throws {Error} If query fails
 */
export async function getLikes(
  supabase: SupabaseClient,
  creationId: string,
  pagination: PaginationParams = {}
): Promise<LikesListResponse> {
  try {
    const page = pagination.page || 1;
    const pageSize = Math.min(pagination.pageSize || 20, 100);
    const offset = (page - 1) * pageSize;

    // Get total count
    const { count } = await supabase
      .from('likes')
      .select('id', { count: 'exact', head: true })
      .eq('creation_id', creationId);

    const totalCount = count || 0;

    // Get likes with profiles
    const { data, error } = await supabase
      .from('likes')
      .select(`
        id,
        user_id,
        creation_id,
        created_at,
        profiles:user_id (
          username,
          display_name,
          avatar_url
        )
      `)
      .eq('creation_id', creationId)
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) {
      throw new Error(`Failed to fetch likes: ${error.message}`);
    }

    const likes: LikeWithProfile[] = (data || []).map((like: any) => ({
      id: like.id,
      userId: like.user_id,
      creationId: like.creation_id,
      createdAt: like.created_at,
      profile: {
        username: like.profiles?.username || 'unknown',
        displayName: like.profiles?.display_name,
        avatarUrl: like.profiles?.avatar_url,
      },
    }));

    return {
      likes,
      pagination: {
        page,
        pageSize,
        totalCount,
        hasMore: offset + pageSize < totalCount,
      },
    };
  } catch (error) {
    console.error('Error in getLikes:', error);
    throw error;
  }
}

/**
 * Get all creations liked by a user
 *
 * @param supabase - Supabase client instance
 * @param userId - User to get likes for
 * @param pagination - Pagination parameters
 * @returns List of liked creations with pagination
 * @throws {Error} If query fails
 */
export async function getUserLikedCreations(
  supabase: SupabaseClient,
  userId: string,
  pagination: PaginationParams = {}
): Promise<any> {
  try {
    const page = pagination.page || 1;
    const pageSize = Math.min(pagination.pageSize || 20, 100);
    const offset = (page - 1) * pageSize;

    // Get total count
    const { count } = await supabase
      .from('likes')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId);

    const totalCount = count || 0;

    // Get liked creations
    const { data, error } = await supabase
      .from('likes')
      .select(`
        id,
        created_at,
        creations:creation_id (
          id,
          title,
          description,
          type,
          thumbnail_url,
          like_count,
          comment_count,
          created_at,
          profiles:user_id (
            username,
            display_name,
            avatar_url
          )
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) {
      throw new Error(`Failed to fetch liked creations: ${error.message}`);
    }

    return {
      creations: (data || []).map((item: any) => item.creations).filter(Boolean),
      pagination: {
        page,
        pageSize,
        totalCount,
        hasMore: offset + pageSize < totalCount,
      },
    };
  } catch (error) {
    console.error('Error in getUserLikedCreations:', error);
    throw error;
  }
}

/**
 * Batch check if user has liked multiple creations
 *
 * @param supabase - Supabase client instance
 * @param userId - User to check
 * @param creationIds - Array of creation IDs to check
 * @returns Map of creation ID to liked status
 * @throws {Error} If query fails
 */
export async function batchCheckLiked(
  supabase: SupabaseClient,
  userId: string,
  creationIds: string[]
): Promise<Record<string, boolean>> {
  try {
    if (creationIds.length === 0) {
      return {};
    }

    const { data } = await supabase
      .from('likes')
      .select('creation_id')
      .eq('user_id', userId)
      .in('creation_id', creationIds);

    const likedSet = new Set((data || []).map((like: any) => like.creation_id));

    return creationIds.reduce((acc, id) => {
      acc[id] = likedSet.has(id);
      return acc;
    }, {} as Record<string, boolean>);
  } catch (error) {
    console.error('Error in batchCheckLiked:', error);
    return {};
  }
}

// =====================================================================
// HELPER FUNCTIONS
// =====================================================================

/**
 * Transform database like to API like format
 *
 * @param data - Raw like data from database
 * @returns Transformed like
 */
function transformLike(data: any): Like {
  return {
    id: data.id,
    userId: data.user_id,
    creationId: data.creation_id,
    createdAt: data.created_at,
  };
}
