/**
 * Like Service - Database Operations
 *
 * Handles all like-related database operations with proper error handling
 * and type safety. Supports likes on creations, comments, and posts.
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';
import { ServiceError, handleSupabaseError, assertSuccess } from '../errors';

export type TargetType = 'creation' | 'comment' | 'post';

export interface Like {
  id: string;
  userId: string;
  targetId: string;
  targetType: TargetType;
  createdAt: string;
}

export interface ToggleLikeResult {
  liked: boolean;
  count: number;
}

/**
 * Toggle like status for a target (like if not liked, unlike if liked)
 *
 * @param client - Supabase client instance
 * @param userId - ID of user performing the action
 * @param targetId - ID of the target (creation, comment, or post)
 * @param targetType - Type of target being liked
 * @returns Current like status and total count
 * @throws {ServiceError} If database operation fails
 */
export async function toggleLike(
  client: SupabaseClient<Database>,
  userId: string,
  targetId: string,
  targetType: TargetType
): Promise<ToggleLikeResult> {
  // Check current like status
  const { data: existingLikeData, error: checkError } = await client
    .from('likes')
    .select('id')
    .eq('user_id', userId)
    .eq('target_id', targetId)
    .eq('target_type', targetType)
    .maybeSingle();

  if (checkError) {
    handleSupabaseError(checkError, 'toggleLike - check existing');
  }

  // Type assertion for Supabase query result
  const existingLike = existingLikeData as { id: string } | null;

  if (existingLike) {
    // Unlike: Delete the like
    const { error: deleteError } = await client
      .from('likes')
      .delete()
      .eq('id', existingLike.id);

    if (deleteError) {
      handleSupabaseError(deleteError, 'toggleLike - delete');
    }

    // Decrement count using database function (type assertion for untyped RPC)
    const { error: rpcError } = await (client as unknown as { rpc: (fn: string, args: { target_id: string }) => Promise<{ error: Error | null }> }).rpc('decrement_like_count', {
      target_id: targetId,
    });

    if (rpcError) {
      console.error('Failed to decrement like count:', rpcError);
      // Don't throw - this is a denormalization optimization, not critical
    }

    // Get updated count
    const count = await getLikesCount(client, targetId);

    return { liked: false, count };
  } else {
    // Like: Insert new like (type assertion for untyped table)
    const { error: insertError } = await (client.from('likes') as unknown as {
      insert: (data: { user_id: string; target_id: string; target_type: string }) => Promise<{ error: Error | null }>;
    }).insert({
      user_id: userId,
      target_id: targetId,
      target_type: targetType,
    });

    if (insertError) {
      handleSupabaseError(insertError, 'toggleLike - insert');
    }

    // Increment count using database function (type assertion for untyped RPC)
    const { error: rpcError } = await (client as unknown as { rpc: (fn: string, args: { target_id: string }) => Promise<{ error: Error | null }> }).rpc('increment_like_count', {
      target_id: targetId,
    });

    if (rpcError) {
      console.error('Failed to increment like count:', rpcError);
      // Don't throw - this is a denormalization optimization, not critical
    }

    // Get updated count
    const count = await getLikesCount(client, targetId);

    return { liked: true, count };
  }
}

/**
 * Get like status for a specific user and target
 *
 * @param client - Supabase client instance
 * @param userId - ID of user to check
 * @param targetId - ID of the target
 * @returns true if user has liked the target, false otherwise
 * @throws {ServiceError} If database operation fails
 */
export async function getLikeStatus(
  client: SupabaseClient<Database>,
  userId: string,
  targetId: string
): Promise<boolean> {
  const { data, error } = await client
    .from('likes')
    .select('id')
    .eq('user_id', userId)
    .eq('target_id', targetId)
    .maybeSingle();

  if (error) {
    handleSupabaseError(error, 'getLikeStatus');
  }

  return !!data;
}

/**
 * Get total number of likes for a target
 *
 * @param client - Supabase client instance
 * @param targetId - ID of the target
 * @returns Total number of likes
 * @throws {ServiceError} If database operation fails
 */
export async function getLikesCount(
  client: SupabaseClient<Database>,
  targetId: string
): Promise<number> {
  const { count, error } = await client
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('target_id', targetId);

  if (error) {
    handleSupabaseError(error, 'getLikesCount');
  }

  return count || 0;
}

/**
 * Get all likes by a specific user
 *
 * @param client - Supabase client instance
 * @param userId - ID of the user
 * @param targetType - Optional filter by target type
 * @param limit - Maximum number of likes to return
 * @returns Array of likes with target details
 * @throws {ServiceError} If database operation fails
 */
export async function getUserLikes(
  client: SupabaseClient<Database>,
  userId: string,
  targetType?: TargetType,
  limit: number = 50
): Promise<Like[]> {
  let query = client
    .from('likes')
    .select('id, user_id, target_id, target_type, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (targetType) {
    query = query.eq('target_type', targetType);
  }

  const { data, error } = await query;

  if (error) {
    handleSupabaseError(error, 'getUserLikes');
  }

  if (!data) {
    return [];
  }

  return data.map(like => ({
    id: like.id,
    userId: like.user_id,
    targetId: like.target_id,
    targetType: like.target_type as TargetType,
    createdAt: like.created_at,
  }));
}

/**
 * Get all users who liked a specific target
 *
 * @param client - Supabase client instance
 * @param targetId - ID of the target
 * @param limit - Maximum number of users to return
 * @returns Array of user IDs who liked the target
 * @throws {ServiceError} If database operation fails
 */
export async function getLikers(
  client: SupabaseClient<Database>,
  targetId: string,
  limit: number = 50
): Promise<string[]> {
  const { data, error } = await client
    .from('likes')
    .select('user_id')
    .eq('target_id', targetId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    handleSupabaseError(error, 'getLikers');
  }

  if (!data) {
    return [];
  }

  return data.map(like => like.user_id);
}

/**
 * Get like counts for multiple targets at once (batch operation)
 *
 * @param client - Supabase client instance
 * @param targetIds - Array of target IDs
 * @returns Map of target ID to like count
 * @throws {ServiceError} If database operation fails
 */
export async function getBatchLikeCounts(
  client: SupabaseClient<Database>,
  targetIds: string[]
): Promise<Map<string, number>> {
  if (targetIds.length === 0) {
    return new Map();
  }

  const { data, error } = await client
    .from('likes')
    .select('target_id')
    .in('target_id', targetIds);

  if (error) {
    handleSupabaseError(error, 'getBatchLikeCounts');
  }

  // Count likes per target
  const counts = new Map<string, number>();
  targetIds.forEach(id => counts.set(id, 0));

  if (data) {
    data.forEach(like => {
      const current = counts.get(like.target_id) || 0;
      counts.set(like.target_id, current + 1);
    });
  }

  return counts;
}

/**
 * Check if user has liked multiple targets (batch operation)
 *
 * @param client - Supabase client instance
 * @param userId - ID of user to check
 * @param targetIds - Array of target IDs
 * @returns Map of target ID to liked status
 * @throws {ServiceError} If database operation fails
 */
export async function getBatchLikeStatus(
  client: SupabaseClient<Database>,
  userId: string,
  targetIds: string[]
): Promise<Map<string, boolean>> {
  if (targetIds.length === 0) {
    return new Map();
  }

  const { data, error } = await client
    .from('likes')
    .select('target_id')
    .eq('user_id', userId)
    .in('target_id', targetIds);

  if (error) {
    handleSupabaseError(error, 'getBatchLikeStatus');
  }

  // Create map with all targets as not liked
  const statuses = new Map<string, boolean>();
  targetIds.forEach(id => statuses.set(id, false));

  // Mark liked targets
  if (data) {
    data.forEach(like => {
      statuses.set(like.target_id, true);
    });
  }

  return statuses;
}
