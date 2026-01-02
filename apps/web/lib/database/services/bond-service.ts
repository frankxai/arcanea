// Bond Service - Stub implementation
import { createClient } from '@supabase/supabase-js'
import type { LuminorBond, Memory } from '../types/api-responses'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function getUserBonds(userId: string): Promise<LuminorBond[]> {
  const { data, error } = await supabase
    .from('luminor_bonds')
    .select('*')
    .eq('user_id', userId)

  if (error || !data) return []

  return data.map(mapBond)
}

export async function getBondWithLuminor(userId: string, luminorId: string): Promise<LuminorBond | null> {
  const { data, error } = await supabase
    .from('luminor_bonds')
    .select('*')
    .eq('user_id', userId)
    .eq('luminor_id', luminorId)
    .single()

  if (error || !data) return null

  return mapBond(data)
}

export async function createBond(userId: string, luminorId: string): Promise<LuminorBond | null> {
  const { data, error } = await supabase
    .from('luminor_bonds')
    .insert({
      user_id: userId,
      luminor_id: luminorId,
      level: 1,
      xp: 0,
      relationship_type: 'acquaintance'
    })
    .select()
    .single()

  if (error || !data) return null

  return mapBond(data)
}

export async function updateBondProgress(
  userId: string,
  luminorId: string,
  xpGained: number
): Promise<LuminorBond | null> {
  // Get current bond
  const bond = await getBondWithLuminor(userId, luminorId)
  if (!bond) return null

  const newXp = bond.xp + xpGained
  const newLevel = calculateLevel(newXp)
  const newRelationship = calculateRelationship(newLevel)

  const { data, error } = await supabase
    .from('luminor_bonds')
    .update({
      xp: newXp,
      level: newLevel,
      relationship_type: newRelationship
    })
    .eq('user_id', userId)
    .eq('luminor_id', luminorId)
    .select()
    .single()

  if (error || !data) return null

  return mapBond(data)
}

export async function getMemories(userId: string, luminorId: string): Promise<Memory[]> {
  // Memories would come from a separate table
  // For now, return empty array
  return []
}

export function getXpReward(interactionType: string): number {
  const rewards: Record<string, number> = {
    chat: 10,
    creation: 50,
    milestone: 100,
    daily_visit: 5
  }
  return rewards[interactionType] || 5
}

function calculateLevel(xp: number): number {
  // XP thresholds: 0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500
  const thresholds = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500]
  let level = 1
  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) level = i + 1
    else break
  }
  return Math.min(level, 10)
}

function calculateRelationship(level: number): string {
  if (level <= 2) return 'acquaintance'
  if (level <= 4) return 'friend'
  if (level <= 6) return 'companion'
  if (level <= 8) return 'trusted_ally'
  return 'soul_bonded'
}

function mapBond(data: Record<string, unknown>): LuminorBond {
  return {
    id: data.id as string,
    userId: data.user_id as string,
    luminorId: data.luminor_id as string,
    level: data.level as number,
    xp: data.xp as number,
    relationshipType: data.relationship_type as string,
    memories: [],
    createdAt: data.created_at as string,
    updatedAt: data.updated_at as string
  }
}
