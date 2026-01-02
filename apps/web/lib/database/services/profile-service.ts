// Profile Service - Stub implementation
import { createClient } from '@supabase/supabase-js'
import type { Profile, ProfileStats } from '../types/api-responses'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function getProfile(userId: string): Promise<Profile | null> {
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

export async function getProfileByUsername(username: string): Promise<Profile | null> {
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

export async function getProfileStats(userId: string): Promise<ProfileStats> {
  // This would normally aggregate from multiple tables
  return {
    creationsCount: 0,
    followersCount: 0,
    followingCount: 0,
    likesReceived: 0,
    totalViews: 0
  }
}

export async function updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
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
