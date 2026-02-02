/**
 * Activity Service
 *
 * Handles activity feed generation and user activity timeline.
 * Implements a weighted algorithm to create personalized feeds:
 *
 * Feed Algorithm:
 * 1. Following users' creations (weight: 100)
 * 2. Trending creations (likes > 50 in 24h) (weight: 80)
 * 3. New from active Luminors (weight: 60)
 * 4. Recommended based on user interests (weight: 40)
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  ActivityItem,
  ActivityFeedResponse,
  UserActivityResponse,
  PaginationParams,
} from '../types/social-types';
import { ActivityType } from '../types/social-types';

/**
 * Get personalized activity feed for a user
 *
 * @param supabase - Supabase client instance
 * @param userId - User to generate feed for
 * @param pagination - Pagination parameters
 * @returns Weighted activity feed with pagination
 * @throws {Error} If query fails
 */
export async function getActivityFeed(
  supabase: SupabaseClient,
  userId: string,
  pagination: PaginationParams = {}
): Promise<ActivityFeedResponse> {
  try {
    const page = pagination.page || 1;
    const pageSize = Math.min(pagination.pageSize || 20, 100);

    // Get followed users
    const { data: following } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', userId);

    const followingIds = (following || []).map((f: any) => f.following_id);

    // Build activities from multiple sources
    const activities: ActivityItem[] = [];

    // 1. Following users' creations (weight: 100)
    if (followingIds.length > 0) {
      const followingActivities = await getFollowingCreations(
        supabase,
        followingIds,
        20
      );
      activities.push(...followingActivities);
    }

    // 2. Trending creations (weight: 80)
    const trendingActivities = await getTrendingCreations(supabase, 10);
    activities.push(...trendingActivities);

    // 3. New creations (weight: 60)
    const newActivities = await getNewCreations(supabase, userId, 10);
    activities.push(...newActivities);

    // Sort by weight and created_at
    activities.sort((a, b) => {
      if (a.weight !== b.weight) {
        return b.weight - a.weight;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Remove duplicates (keep highest weight)
    const seenCreations = new Set<string>();
    const uniqueActivities = activities.filter((activity) => {
      if (activity.creation?.id) {
        if (seenCreations.has(activity.creation.id)) {
          return false;
        }
        seenCreations.add(activity.creation.id);
      }
      return true;
    });

    // Paginate
    const offset = (page - 1) * pageSize;
    const paginatedActivities = uniqueActivities.slice(offset, offset + pageSize);

    return {
      activities: paginatedActivities,
      pagination: {
        page,
        pageSize,
        totalCount: uniqueActivities.length,
        hasMore: offset + pageSize < uniqueActivities.length,
      },
    };
  } catch (error) {
    console.error('Error in getActivityFeed:', error);
    throw error;
  }
}

/**
 * Get user activity timeline (their actions)
 *
 * @param supabase - Supabase client instance
 * @param userId - User to get activity for
 * @param pagination - Pagination parameters
 * @returns User's activity timeline with pagination
 * @throws {Error} If query fails
 */
export async function getUserActivity(
  supabase: SupabaseClient,
  userId: string,
  pagination: PaginationParams = {}
): Promise<UserActivityResponse> {
  try {
    const page = pagination.page || 1;
    const pageSize = Math.min(pagination.pageSize || 20, 100);
    const offset = (page - 1) * pageSize;

    const activities: ActivityItem[] = [];

    // Get user's creations
    const { data: creations } = await supabase
      .from('creations')
      .select(`
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
          avatar_url,
          is_verified
        )
      `)
      .eq('user_id', userId)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(pageSize);

    (creations || []).forEach((creation: any) => {
      activities.push({
        id: `creation-${creation.id}`,
        type: ActivityType.CREATION,
        userId,
        createdAt: creation.created_at,
        weight: 100,
        profile: {
          username: creation.profiles?.username || 'unknown',
          displayName: creation.profiles?.display_name,
          avatarUrl: creation.profiles?.avatar_url,
          isVerified: creation.profiles?.is_verified || false,
        },
        creation: {
          id: creation.id,
          title: creation.title,
          description: creation.description,
          type: creation.type,
          thumbnailUrl: creation.thumbnail_url,
          likeCount: creation.like_count,
          commentCount: creation.comment_count,
        },
      });
    });

    // Sort by date
    activities.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Paginate
    const paginatedActivities = activities.slice(offset, offset + pageSize);

    return {
      activities: paginatedActivities,
      pagination: {
        page,
        pageSize,
        totalCount: activities.length,
        hasMore: offset + pageSize < activities.length,
      },
    };
  } catch (error) {
    console.error('Error in getUserActivity:', error);
    throw error;
  }
}

// =====================================================================
// FEED GENERATION HELPERS
// =====================================================================

/**
 * Get creations from followed users
 *
 * @param supabase - Supabase client instance
 * @param followingIds - Array of followed user IDs
 * @param limit - Number of creations to fetch
 * @returns Array of activity items
 */
async function getFollowingCreations(
  supabase: SupabaseClient,
  followingIds: string[],
  limit: number
): Promise<ActivityItem[]> {
  try {
    const { data: creations } = await supabase
      .from('creations')
      .select(`
        id,
        user_id,
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
          avatar_url,
          is_verified
        )
      `)
      .in('user_id', followingIds)
      .eq('status', 'published')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    return (creations || []).map((creation: any) => ({
      id: `creation-${creation.id}`,
      type: ActivityType.CREATION,
      userId: creation.user_id,
      createdAt: creation.created_at,
      weight: 100, // Highest weight for followed users
      profile: {
        username: creation.profiles?.username || 'unknown',
        displayName: creation.profiles?.display_name,
        avatarUrl: creation.profiles?.avatar_url,
        isVerified: creation.profiles?.is_verified || false,
      },
      creation: {
        id: creation.id,
        title: creation.title,
        description: creation.description,
        type: creation.type,
        thumbnailUrl: creation.thumbnail_url,
        likeCount: creation.like_count,
        commentCount: creation.comment_count,
      },
    }));
  } catch (error) {
    console.error('Error in getFollowingCreations:', error);
    return [];
  }
}

/**
 * Get trending creations (high engagement in last 24h)
 *
 * @param supabase - Supabase client instance
 * @param limit - Number of creations to fetch
 * @returns Array of activity items
 */
async function getTrendingCreations(
  supabase: SupabaseClient,
  limit: number
): Promise<ActivityItem[]> {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { data: creations } = await supabase
      .from('creations')
      .select(`
        id,
        user_id,
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
          avatar_url,
          is_verified
        )
      `)
      .eq('status', 'published')
      .eq('is_public', true)
      .gte('created_at', yesterday.toISOString())
      .gte('like_count', 50) // Trending threshold
      .order('like_count', { ascending: false })
      .limit(limit);

    return (creations || []).map((creation: any) => ({
      id: `creation-${creation.id}`,
      type: ActivityType.CREATION,
      userId: creation.user_id,
      createdAt: creation.created_at,
      weight: 80, // High weight for trending
      profile: {
        username: creation.profiles?.username || 'unknown',
        displayName: creation.profiles?.display_name,
        avatarUrl: creation.profiles?.avatar_url,
        isVerified: creation.profiles?.is_verified || false,
      },
      creation: {
        id: creation.id,
        title: creation.title,
        description: creation.description,
        type: creation.type,
        thumbnailUrl: creation.thumbnail_url,
        likeCount: creation.like_count,
        commentCount: creation.comment_count,
      },
    }));
  } catch (error) {
    console.error('Error in getTrendingCreations:', error);
    return [];
  }
}

/**
 * Get new creations (discovery feed)
 *
 * @param supabase - Supabase client instance
 * @param excludeUserId - User ID to exclude from results
 * @param limit - Number of creations to fetch
 * @returns Array of activity items
 */
async function getNewCreations(
  supabase: SupabaseClient,
  excludeUserId: string,
  limit: number
): Promise<ActivityItem[]> {
  try {
    const { data: creations } = await supabase
      .from('creations')
      .select(`
        id,
        user_id,
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
          avatar_url,
          is_verified
        )
      `)
      .eq('status', 'published')
      .eq('is_public', true)
      .neq('user_id', excludeUserId)
      .order('created_at', { ascending: false })
      .limit(limit);

    return (creations || []).map((creation: any) => ({
      id: `creation-${creation.id}`,
      type: ActivityType.CREATION,
      userId: creation.user_id,
      createdAt: creation.created_at,
      weight: 60, // Medium weight for new content
      profile: {
        username: creation.profiles?.username || 'unknown',
        displayName: creation.profiles?.display_name,
        avatarUrl: creation.profiles?.avatar_url,
        isVerified: creation.profiles?.is_verified || false,
      },
      creation: {
        id: creation.id,
        title: creation.title,
        description: creation.description,
        type: creation.type,
        thumbnailUrl: creation.thumbnail_url,
        likeCount: creation.like_count,
        commentCount: creation.comment_count,
      },
    }));
  } catch (error) {
    console.error('Error in getNewCreations:', error);
    return [];
  }
}

/**
 * Get global activity stream (for explore/discover)
 *
 * @param supabase - Supabase client instance
 * @param pagination - Pagination parameters
 * @returns Global activity feed
 * @throws {Error} If query fails
 */
export async function getGlobalActivity(
  supabase: SupabaseClient,
  pagination: PaginationParams = {}
): Promise<ActivityFeedResponse> {
  try {
    const page = pagination.page || 1;
    const pageSize = Math.min(pagination.pageSize || 20, 100);
    const offset = (page - 1) * pageSize;

    // Get recent public creations
    const { data: creations, count } = await supabase
      .from('creations')
      .select(`
        id,
        user_id,
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
          avatar_url,
          is_verified
        )
      `, { count: 'exact' })
      .eq('status', 'published')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    const activities: ActivityItem[] = (creations || []).map((creation: any) => ({
      id: `creation-${creation.id}`,
      type: ActivityType.CREATION,
      userId: creation.user_id,
      createdAt: creation.created_at,
      weight: 50,
      profile: {
        username: creation.profiles?.username || 'unknown',
        displayName: creation.profiles?.display_name,
        avatarUrl: creation.profiles?.avatar_url,
        isVerified: creation.profiles?.is_verified || false,
      },
      creation: {
        id: creation.id,
        title: creation.title,
        description: creation.description,
        type: creation.type,
        thumbnailUrl: creation.thumbnail_url,
        likeCount: creation.like_count,
        commentCount: creation.comment_count,
      },
    }));

    return {
      activities,
      pagination: {
        page,
        pageSize,
        totalCount: count || 0,
        hasMore: offset + pageSize < (count || 0),
      },
    };
  } catch (error) {
    console.error('Error in getGlobalActivity:', error);
    throw error;
  }
}
