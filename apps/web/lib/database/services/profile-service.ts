// Profile Service - Stub implementation with Supabase client injection
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Profile, ProfileStats } from '../types/api-responses'

export async function getProfile(
  supabase: SupabaseClient,
  userId: string
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error || !data) return null

  return {
    id: data.id,
    username: data.username,
    displayName: data.display_name,
    avatarUrl: data.avatar_url,
    bio: data.bio,
    academyId: data.academy_id,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  }
}

export async function getProfileByUsername(
  supabase: SupabaseClient,
  username: string
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !data) return null

  return {
    id: data.id,
    username: data.username,
    displayName: data.display_name,
    avatarUrl: data.avatar_url,
    bio: data.bio,
    academyId: data.academy_id,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  }
}

export async function getProfileStats(
  _supabase: SupabaseClient,
  _userId: string
): Promise<ProfileStats> {
  // This would normally aggregate from multiple tables
  return {
    creationsCount: 0,
    followersCount: 0,
    followingCount: 0,
    likesReceived: 0,
    totalViews: 0
  }
}

export async function updateProfile(
  supabase: SupabaseClient,
  userId: string,
  updates: Partial<Profile>
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      display_name: updates.displayName,
      avatar_url: updates.avatarUrl,
      bio: updates.bio,
      academy_id: updates.academyId
    })
    .eq('id', userId)
    .select()
    .single()

  if (error || !data) return null

  return {
    id: data.id,
    username: data.username,
    displayName: data.display_name,
    avatarUrl: data.avatar_url,
    bio: data.bio,
    academyId: data.academy_id,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  }
}

export async function getProfileWithStats(
  supabase: SupabaseClient,
  userId: string
): Promise<(Profile & { stats: ProfileStats }) | null> {
  const profile = await getProfile(supabase, userId)
  if (!profile) return null

  const stats = await getProfileStats(supabase, userId)
  return { ...profile, stats }
}

export async function isUsernameAvailable(
  supabase: SupabaseClient,
  username: string,
  _excludeUserId?: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .single()

  // If error is "not found" or data is null, username is available
  return !data || !!error
}
