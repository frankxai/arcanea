/**
 * Profile Service
 *
 * Handles all profile-related database operations including:
 * - Fetching profile data
 * - Updating profile information
 * - Calculating profile statistics
 * - Managing profile relationships
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  Profile,
  ProfileStats,
  ProfileResponse,
  UpdateProfileRequest,
} from '../types/api-responses';

/**
 * Get profile by user ID
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID to fetch profile for
 * @returns Profile data or null if not found
 * @throws {Error} If database query fails
 */
export async function getProfile(
  supabase: SupabaseClient,
  userId: string
): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return null;
      }
      throw new Error(`Failed to fetch profile: ${error.message}`);
    }

    return transformProfile(data);
  } catch (error) {
    console.error('Error in getProfile:', error);
    throw error;
  }
}

/**
 * Get profile by username
 *
 * @param supabase - Supabase client instance
 * @param username - Username to search for
 * @returns Profile data or null if not found
 * @throws {Error} If database query fails
 */
export async function getProfileByUsername(
  supabase: SupabaseClient,
  username: string
): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch profile by username: ${error.message}`);
    }

    return transformProfile(data);
  } catch (error) {
    console.error('Error in getProfileByUsername:', error);
    throw error;
  }
}

/**
 * Get profile statistics
 *
 * Calculates aggregated statistics including:
 * - Total creations
 * - Total likes received
 * - Total comments received
 * - Follower/following counts
 * - Active Luminor bonds
 * - Total bond XP
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID to calculate stats for
 * @returns Profile statistics
 * @throws {Error} If database query fails
 */
export async function getProfileStats(
  supabase: SupabaseClient,
  userId: string
): Promise<ProfileStats> {
  try {
    // Get profile data (includes follower/following counts)
    const { data: profile } = await supabase
      .from('profiles')
      .select('creation_count, follower_count, following_count')
      .eq('id', userId)
      .single();

    // Get total likes on user's creations
    const { data: likesData } = await supabase
      .from('creations')
      .select('like_count')
      .eq('user_id', userId);

    const totalLikes = likesData?.reduce((sum, creation) => sum + (creation.like_count || 0), 0) || 0;

    // Get total comments on user's creations
    const { data: commentsData } = await supabase
      .from('creations')
      .select('comment_count')
      .eq('user_id', userId);

    const totalComments = commentsData?.reduce((sum, creation) => sum + (creation.comment_count || 0), 0) || 0;

    // Get active Luminor relationships
    const { count: activeLuminors } = await supabase
      .from('luminor_relationships')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('total_interactions', 1);

    // Get total bond XP across all Luminors
    const { data: bondsData } = await supabase
      .from('luminor_relationships')
      .select('bond_xp')
      .eq('user_id', userId);

    const totalBondXp = bondsData?.reduce((sum, bond) => sum + (bond.bond_xp || 0), 0) || 0;

    return {
      totalCreations: profile?.creation_count || 0,
      totalLikes,
      totalComments,
      followers: profile?.follower_count || 0,
      following: profile?.following_count || 0,
      activeLuminors: activeLuminors || 0,
      totalBondXp,
    };
  } catch (error) {
    console.error('Error in getProfileStats:', error);
    throw new Error('Failed to calculate profile statistics');
  }
}

/**
 * Get complete profile with statistics
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID to fetch
 * @returns Complete profile response with stats
 * @throws {Error} If profile not found or query fails
 */
export async function getProfileWithStats(
  supabase: SupabaseClient,
  userId: string
): Promise<ProfileResponse> {
  const profile = await getProfile(supabase, userId);

  if (!profile) {
    throw new Error('Profile not found');
  }

  const stats = await getProfileStats(supabase, userId);

  return {
    profile,
    stats,
  };
}

/**
 * Update profile information
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID to update
 * @param updates - Fields to update
 * @returns Updated profile data
 * @throws {Error} If update fails or profile not found
 */
export async function updateProfile(
  supabase: SupabaseClient,
  userId: string,
  updates: UpdateProfileRequest
): Promise<Profile> {
  try {
    // Check if username is being updated and if it's available
    if (updates.username) {
      const existing = await getProfileByUsername(supabase, updates.username);
      if (existing && existing.userId !== userId) {
        throw new Error('Username already taken');
      }
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...(updates.username && { username: updates.username }),
        ...(updates.displayName !== undefined && { display_name: updates.displayName }),
        ...(updates.bio !== undefined && { bio: updates.bio }),
        ...(updates.avatarUrl !== undefined && { avatar_url: updates.avatarUrl }),
        ...(updates.location !== undefined && { location: updates.location }),
        ...(updates.website !== undefined && { website: updates.website }),
        ...(updates.preferences && { preferences: updates.preferences }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }

    return transformProfile(data);
  } catch (error) {
    console.error('Error in updateProfile:', error);
    throw error;
  }
}

/**
 * Create new profile
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID from auth
 * @param username - Initial username
 * @returns Created profile
 * @throws {Error} If creation fails
 */
export async function createProfile(
  supabase: SupabaseClient,
  userId: string,
  username: string
): Promise<Profile> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        username,
        arcanean_id: '', // Will be auto-generated by trigger
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create profile: ${error.message}`);
    }

    return transformProfile(data);
  } catch (error) {
    console.error('Error in createProfile:', error);
    throw error;
  }
}

/**
 * Update last active timestamp
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID to update
 */
export async function updateLastActive(
  supabase: SupabaseClient,
  userId: string
): Promise<void> {
  try {
    await supabase
      .from('profiles')
      .update({ last_active_at: new Date().toISOString() })
      .eq('id', userId);
  } catch (error) {
    // Non-critical operation, just log
    console.warn('Failed to update last active:', error);
  }
}

/**
 * Check if username is available
 *
 * @param supabase - Supabase client instance
 * @param username - Username to check
 * @param excludeUserId - Optional user ID to exclude from check (for updates)
 * @returns True if available, false if taken
 */
export async function isUsernameAvailable(
  supabase: SupabaseClient,
  username: string,
  excludeUserId?: string
): Promise<boolean> {
  try {
    let query = supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .eq('username', username);

    if (excludeUserId) {
      query = query.neq('id', excludeUserId);
    }

    const { count } = await query;

    return count === 0;
  } catch (error) {
    console.error('Error checking username availability:', error);
    throw error;
  }
}

// =====================================================================
// HELPER FUNCTIONS
// =====================================================================

/**
 * Transform database profile to API profile format
 *
 * Converts snake_case database fields to camelCase API fields
 *
 * @param data - Raw profile data from database
 * @returns Transformed profile
 */
function transformProfile(data: any): Profile {
  return {
    id: data.id,
    userId: data.id, // In Supabase, profile.id === auth.users.id
    username: data.username,
    displayName: data.display_name,
    avatarUrl: data.avatar_url,
    bio: data.bio,
    arcaneanId: data.arcanean_id,
    tier: data.tier,
    subscriptionStatus: data.subscription_status,
    location: data.location,
    website: data.website,
    preferences: data.preferences || {},
    onboardingCompleted: data.onboarding_completed,
    onboardingStep: data.onboarding_step,
    isActive: data.is_active,
    isVerified: data.is_verified,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    lastActiveAt: data.last_active_at,
  };
}
