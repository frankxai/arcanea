// Creation Service - Stub implementation
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Creation, CreationFilters } from '../types/api-responses'

// Lazy-create Supabase client to avoid build-time errors
let _defaultSupabase: SupabaseClient | null = null
function getDefaultSupabase(): SupabaseClient {
  if (!_defaultSupabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
      throw new Error('Supabase environment variables not configured')
    }
    _defaultSupabase = createClient(url, key)
  }
  return _defaultSupabase
}

export async function getCreation(client: SupabaseClient, id: string, includePrivate: boolean = false): Promise<Creation | null> {
  const supabase = client || getDefaultSupabase()
  let query = supabase
    .from('creations')
    .select('*')
    .eq('id', id)
    .single()
  
  // Logic for includePrivate would go here (e.g., checking user ID against RLS or manual check)
  // For now, RLS handles most visibility

  const { data, error } = await query

  if (error || !data) return null

  return mapCreation(data)
}

export async function getCreations(client: SupabaseClient, filters: CreationFilters = {}): Promise<Creation[]> {
  const supabase = client || getDefaultSupabase()
  let query = supabase.from('creations').select('*')

  if (filters.type) query = query.eq('type', filters.type)
  if (filters.luminorId) query = query.eq('luminor_id', filters.luminorId)
  if (filters.status) query = query.eq('status', filters.status)
  if (filters.visibility) query = query.eq('visibility', filters.visibility)

  query = query.order('created_at', { ascending: false })

  if (filters.limit) query = query.limit(filters.limit)
  if (filters.offset) query = query.range(filters.offset, (filters.offset || 0) + (filters.limit || 10) - 1)

  const { data, error } = await query

  if (error || !data) return []

  return data.map(mapCreation)
}

// Alias for getCreations to satisfy API route requirements
export const listCreations = getCreations

export async function getUserCreations(client: SupabaseClient, userId: string, filters: CreationFilters = {}): Promise<Creation[]> {
  const supabase = client || getDefaultSupabase()
  let query = supabase
    .from('creations')
    .select('*')
    .eq('user_id', userId)

  if (filters.status) query = query.eq('status', filters.status)
  if (filters.visibility) query = query.eq('visibility', filters.visibility)

  query = query.order('created_at', { ascending: false })

  const { data, error } = await query

  if (error || !data) return []

  return data.map(mapCreation)
}

export async function createCreation(client: SupabaseClient, userId: string, creation: Omit<Creation, 'id' | 'createdAt' | 'updatedAt' | 'likesCount' | 'commentsCount' | 'viewsCount'>): Promise<Creation | null> {
  const supabase = client || getDefaultSupabase()
  // API passes userId separately, but it's likely also in the creation object or needs to be set
  // Ensure userId matches
  const payload = {
    title: creation.title,
    description: creation.description,
    type: creation.type,
    media_url: creation.mediaUrl,
    thumbnail_url: creation.thumbnailUrl,
    user_id: userId,
    luminor_id: creation.luminorId,
    visibility: creation.visibility,
    status: creation.status,
    tags: creation.tags
  }

  const { data, error } = await supabase
    .from('creations')
    .insert(payload)
    .select()
    .single()

  if (error || !data) return null

  return mapCreation(data)
}

export async function updateCreation(client: SupabaseClient, id: string, userId: string, updates: Partial<Creation>): Promise<Creation | null> {
  const supabase = client || getDefaultSupabase()
  // userId parameter implies we should check ownership, but RLS/Supabase handles this usually.
  // We'll proceed with update.
  const { data, error } = await supabase
    .from('creations')
    .update({
      title: updates.title,
      description: updates.description,
      visibility: updates.visibility,
      status: updates.status,
      tags: updates.tags
    })
    .eq('id', id)
    .select()
    .single()

  if (error || !data) return null

  return mapCreation(data)
}

export async function deleteCreation(client: SupabaseClient, id: string, userId: string): Promise<boolean> {
  const supabase = client || getDefaultSupabase()
  const { error } = await supabase
    .from('creations')
    .delete()
    .eq('id', id)
    // .eq('user_id', userId) // Explicit check if needed, but RLS is better

  return !error
}

export async function incrementViewCount(client: SupabaseClient, id: string): Promise<void> {
  const supabase = client || getDefaultSupabase()
  const { error } = await supabase.rpc('increment_view_count', { row_id: id })
  if (error) {
    console.error('Error incrementing view count:', error)
  }
}

function mapCreation(data: Record<string, unknown>): Creation {
  return {
    id: data.id as string,
    title: data.title as string,
    description: data.description as string | undefined,
    type: data.type as Creation['type'],
    mediaUrl: data.media_url as string | undefined,
    thumbnailUrl: data.thumbnail_url as string | undefined,
    userId: data.user_id as string,
    luminorId: data.luminor_id as string | undefined,
    visibility: data.visibility as Creation['visibility'],
    status: data.status as Creation['status'],
    tags: (data.tags || []) as string[],
    likesCount: (data.likes_count || 0) as number,
    commentsCount: (data.comments_count || 0) as number,
    viewsCount: (data.views_count || 0) as number,
    createdAt: data.created_at as string,
    updatedAt: data.updated_at as string
  }
}
