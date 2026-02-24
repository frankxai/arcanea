/**
 * Follow Service
 *
 * Handles all follow-related database operations including:
 * - Following/unfollowing users
 * - Getting followers list
 * - Getting following list
 * - Checking follow status
 * - Managing notification preferences
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  Follow,
  FollowWithProfile,
  FollowResponse,
  FollowersListResponse,
  FollowingListResponse,
  FollowCheckResponse,
  PaginationParams,
} from '../types/social-types';

/**
 * Follow a user
 *
 * @param supabase - Supabase client instance
 * @param followerId - User performing the follow
 * @param followingId - User being followed
 * @param notifyCreations - Whether to notify on new creations
 * @returns Follow response with status
 * @throws {Error} If operation fails
 */
export async function followUser(
  supabase: SupabaseClient,
  followerId: string,
  followingId: string,
  notifyCreations: boolean = true
): Promise<FollowResponse> {
  try {
    // Prevent self-follow
    if (followerId === followingId) {
      throw new Error('Cannot follow yourself');
    }

    // Check if target user exists
    const { data: targetUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', followingId)
      .single();

    if (!targetUser) {
      throw new Error('User not found');
    }

    // Check if already following
    const { data: existingFollow } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .maybeSingle();

    if (existingFollow) {
      throw new Error('Already following this user');
    }

    // Create follow relationship
    const { data: follow, error: insertError } = await supabase
      .from('follows')
      .insert({
        follower_id: followerId,
        following_id: followingId,
        notify_creations: notifyCreations,
      })
      .select()
      .single();

    if (insertError) {
      throw new Error(`Failed to follow user: ${insertError.message}`);
    }

    // Update follower count for target user
    await supabase.rpc('increment_follower_count', { user_id: followingId });

    // Update following count for follower
    await supabase.rpc('increment_following_count', { user_id: followerId });

    return {
      following: true,
      follow: transformFollow(follow),
    };
  } catch (error) {
    console.error('Error in followUser:', error);
    throw error;
  }
}

/**
 * Unfollow a user
 *
 * @param supabase - Supabase client instance
 * @param followerId - User performing the unfollow
 * @param followingId - User being unfollowed
 * @returns Follow response with status
 * @throws {Error} If operation fails
 */
export async function unfollowUser(
  supabase: SupabaseClient,
  followerId: string,
  followingId: string
): Promise<FollowResponse> {
  try {
    // Find existing follow
    const { data: existingFollow } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .maybeSingle();

    if (!existingFollow) {
      throw new Error('Not following this user');
    }

    // Delete follow relationship
    const { error: deleteError } = await supabase
      .from('follows')
      .delete()
      .eq('id', existingFollow.id);

    if (deleteError) {
      throw new Error(`Failed to unfollow user: ${deleteError.message}`);
    }

    // Update follower count for target user
    await supabase.rpc('decrement_follower_count', { user_id: followingId });

    // Update following count for follower
    await supabase.rpc('decrement_following_count', { user_id: followerId });

    return {
      following: false,
    };
  } catch (error) {
    console.error('Error in unfollowUser:', error);
    throw error;
  }
}

/**
 * Check if user is following another user
 *
 * @param supabase - Supabase client instance
 * @param followerId - User to check
 * @param followingId - User being followed
 * @returns Follow status and notification preference
 * @throws {Error} If query fails
 */
export async function isFollowing(
  supabase: SupabaseClient,
  followerId: string,
  followingId: string
): Promise<FollowCheckResponse> {
  try {
    const { data } = await supabase
      .from('follows')
      .select('notify_creations')
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .maybeSingle();

    return {
      isFollowing: !!data,
      notifyCreations: data?.notify_creations || false,
    };
  } catch (error) {
    console.error('Error in isFollowing:', error);
    return {
      isFollowing: false,
      notifyCreations: false,
    };
  }
}

/**
 * Get followers for a user
 *
 * @param supabase - Supabase client instance
 * @param userId - User to get followers for
 * @param pagination - Pagination parameters
 * @returns List of followers with profiles and pagination
 * @throws {Error} If query fails
 */
export async function getFollowers(
  supabase: SupabaseClient,
  userId: string,
  pagination: PaginationParams = {}
): Promise<FollowersListResponse> {
  try {
    const page = pagination.page || 1;
    const pageSize = Math.min(pagination.pageSize || 20, 100);
    const offset = (page - 1) * pageSize;

    // Get total count
    const { count } = await supabase
      .from('follows')
      .select('id', { count: 'exact', head: true })
      .eq('following_id', userId);

    const totalCount = count || 0;

    // Get followers with profiles
    const { data, error } = await supabase
      .from('follows')
      .select(`
        id,
        follower_id,
        following_id,
        notify_creations,
        created_at,
        profiles:follower_id (
          id,
          username,
          display_name,
          avatar_url,
          bio,
          is_verified,
          follower_count
        )
      `)
      .eq('following_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) {
      throw new Error(`Failed to fetch followers: ${error.message}`);
    }

    const followers: FollowWithProfile[] = (data || []).map((follow: any) => ({
      id: follow.id,
      followerId: follow.follower_id,
      followingId: follow.following_id,
      notifyCreations: follow.notify_creations,
      createdAt: follow.created_at,
      profile: {
        id: follow.profiles?.id || follow.follower_id,
        username: follow.profiles?.username || 'unknown',
        displayName: follow.profiles?.display_name,
        avatarUrl: follow.profiles?.avatar_url,
        bio: follow.profiles?.bio,
        isVerified: follow.profiles?.is_verified || false,
        followerCount: follow.profiles?.follower_count || 0,
      },
    }));

    return {
      followers,
      pagination: {
        page,
        pageSize,
        totalCount,
        hasMore: offset + pageSize < totalCount,
      },
    };
  } catch (error) {
    console.error('Error in getFollowers:', error);
    throw error;
  }
}

/**
 * Get users that a user is following
 *
 * @param supabase - Supabase client instance
 * @param userId - User to get following for
 * @param pagination - Pagination parameters
 * @returns List of following with profiles and pagination
 * @throws {Error} If query fails
 */
export async function getFollowing(
  supabase: SupabaseClient,
  userId: string,
  pagination: PaginationParams = {}
): Promise<FollowingListResponse> {
  try {
    const page = pagination.page || 1;
    const pageSize = Math.min(pagination.pageSize || 20, 100);
    const offset = (page - 1) * pageSize;

    // Get total count
    const { count } = await supabase
      .from('follows')
      .select('id', { count: 'exact', head: true })
      .eq('follower_id', userId);

    const totalCount = count || 0;

    // Get following with profiles
    const { data, error } = await supabase
      .from('follows')
      .select(`
        id,
        follower_id,
        following_id,
        notify_creations,
        created_at,
        profiles:following_id (
          id,
          username,
          display_name,
          avatar_url,
          bio,
          is_verified,
          follower_count
        )
      `)
      .eq('follower_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) {
      throw new Error(`Failed to fetch following: ${error.message}`);
    }

    const following: FollowWithProfile[] = (data || []).map((follow: any) => ({
      id: follow.id,
      followerId: follow.follower_id,
      followingId: follow.following_id,
      notifyCreations: follow.notify_creations,
      createdAt: follow.created_at,
      profile: {
        id: follow.profiles?.id || follow.following_id,
        username: follow.profiles?.username || 'unknown',
        displayName: follow.profiles?.display_name,
        avatarUrl: follow.profiles?.avatar_url,
        bio: follow.profiles?.bio,
        isVerified: follow.profiles?.is_verified || false,
        followerCount: follow.profiles?.follower_count || 0,
      },
    }));

    return {
      following,
      pagination: {
        page,
        pageSize,
        totalCount,
        hasMore: offset + pageSize < totalCount,
      },
    };
  } catch (error) {
    console.error('Error in getFollowing:', error);
    throw error;
  }
}

/**
 * Update notification preferences for a follow
 *
 * @param supabase - Supabase client instance
 * @param followerId - Follower user ID
 * @param followingId - Following user ID
 * @param notifyCreations - New notification preference
 * @returns Updated follow
 * @throws {Error} If update fails
 */
export async function updateFollowNotifications(
  supabase: SupabaseClient,
  followerId: string,
  followingId: string,
  notifyCreations: boolean
): Promise<Follow> {
  try {
    const { data, error } = await supabase
      .from('follows')
      .update({ notify_creations: notifyCreations })
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update notifications: ${error.message}`);
    }

    return transformFollow(data);
  } catch (error) {
    console.error('Error in updateFollowNotifications:', error);
    throw error;
  }
}

/**
 * Get mutual follows (users who follow each other)
 *
 * @param supabase - Supabase client instance
 * @param userId - User to check mutuals for
 * @param pagination - Pagination parameters
 * @returns List of mutual followers
 * @throws {Error} If query fails
 */
export async function getMutualFollows(
  supabase: SupabaseClient,
  userId: string,
  pagination: PaginationParams = {}
): Promise<FollowingListResponse> {
  try {
    const page = pagination.page || 1;
    const pageSize = Math.min(pagination.pageSize || 20, 100);
    const offset = (page - 1) * pageSize;

    // Get users that this user follows
    const { data: following } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', userId);

    const followingIds = (following || []).map((f: any) => f.following_id);

    if (followingIds.length === 0) {
      return {
        following: [],
        pagination: {
          page,
          pageSize,
          totalCount: 0,
          hasMore: false,
        },
      };
    }

    // Get users who follow back
    const { data, count } = await supabase
      .from('follows')
      .select(`
        id,
        follower_id,
        following_id,
        notify_creations,
        created_at,
        profiles:following_id (
          id,
          username,
          display_name,
          avatar_url,
          bio,
          is_verified,
          follower_count
        )
      `, { count: 'exact' })
      .eq('follower_id', userId)
      .in('following_id', followingIds)
      .range(offset, offset + pageSize - 1);

    const totalCount = count || 0;

    const mutuals: FollowWithProfile[] = (data || []).map((follow: any) => ({
      id: follow.id,
      followerId: follow.follower_id,
      followingId: follow.following_id,
      notifyCreations: follow.notify_creations,
      createdAt: follow.created_at,
      profile: {
        id: follow.profiles?.id || follow.following_id,
        username: follow.profiles?.username || 'unknown',
        displayName: follow.profiles?.display_name,
        avatarUrl: follow.profiles?.avatar_url,
        bio: follow.profiles?.bio,
        isVerified: follow.profiles?.is_verified || false,
        followerCount: follow.profiles?.follower_count || 0,
      },
    }));

    return {
      following: mutuals,
      pagination: {
        page,
        pageSize,
        totalCount,
        hasMore: offset + pageSize < totalCount,
      },
    };
  } catch (error) {
    console.error('Error in getMutualFollows:', error);
    throw error;
  }
}

/**
 * Batch check if user is following multiple users
 *
 * @param supabase - Supabase client instance
 * @param followerId - User to check
 * @param userIds - Array of user IDs to check
 * @returns Map of user ID to following status
 * @throws {Error} If query fails
 */
export async function batchCheckFollowing(
  supabase: SupabaseClient,
  followerId: string,
  userIds: string[]
): Promise<Record<string, boolean>> {
  try {
    if (userIds.length === 0) {
      return {};
    }

    const { data } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', followerId)
      .in('following_id', userIds);

    const followingSet = new Set((data || []).map((f: any) => f.following_id));

    return userIds.reduce((acc, id) => {
      acc[id] = followingSet.has(id);
      return acc;
    }, {} as Record<string, boolean>);
  } catch (error) {
    console.error('Error in batchCheckFollowing:', error);
    return {};
  }
}

// =====================================================================
// HELPER FUNCTIONS
// =====================================================================

/**
 * Transform database follow to API follow format
 *
 * @param data - Raw follow data from database
 * @returns Transformed follow
 */
function transformFollow(data: any): Follow {
  return {
    id: data.id,
    followerId: data.follower_id,
    followingId: data.following_id,
    notifyCreations: data.notify_creations,
    createdAt: data.created_at,
  };
}
