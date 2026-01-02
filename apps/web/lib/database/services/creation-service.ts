// Creation Service - Stub implementation
import { createClient } from '@supabase/supabase-js'
import type { Creation, CreationFilters } from '../types/api-responses'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function getCreation(id: string): Promise<Creation | null> {
  const { data, error } = await supabase
    .from('creations')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null

  return mapCreation(data)
}

export async function getCreations(filters: CreationFilters = {}): Promise<Creation[]> {
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

export async function getUserCreations(userId: string, filters: CreationFilters = {}): Promise<Creation[]> {
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

export async function createCreation(creation: Omit<Creation, 'id' | 'createdAt' | 'updatedAt' | 'likesCount' | 'commentsCount' | 'viewsCount'>): Promise<Creation | null> {
  const { data, error } = await supabase
    .from('creations')
    .insert({
      title: creation.title,
      description: creation.description,
      type: creation.type,
      media_url: creation.mediaUrl,
      thumbnail_url: creation.thumbnailUrl,
      user_id: creation.userId,
      luminor_id: creation.luminorId,
      visibility: creation.visibility,
      status: creation.status,
      tags: creation.tags
    })
    .select()
    .single()

  if (error || !data) return null

  return mapCreation(data)
}

export async function updateCreation(id: string, updates: Partial<Creation>): Promise<Creation | null> {
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

export async function deleteCreation(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('creations')
    .delete()
    .eq('id', id)

  return !error
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
