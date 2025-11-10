/**
 * Bond Service
 *
 * Handles all Luminor relationship and bond management operations including:
 * - Creating and fetching bonds
 * - Updating bond XP and levels
 * - Managing memories
 * - Tracking interactions
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  LuminorBond,
  LuminorWithBond,
  BondResponse,
  BondsListResponse,
  Memory,
  MemoriesResponse,
  UpdateBondProgressRequest,
  AddMemoryRequest,
} from '../types/api-responses';

// Bond level thresholds
const BOND_LEVEL_THRESHOLDS = [
  0,     // Level 1: 0 XP
  100,   // Level 2: 100 XP
  250,   // Level 3: 250 XP
  500,   // Level 4: 500 XP
  1000,  // Level 5: 1000 XP
  2000,  // Level 6: 2000 XP
  4000,  // Level 7: 4000 XP
  7000,  // Level 8: 7000 XP
  12000, // Level 9: 12000 XP
  20000, // Level 10: 20000 XP
];

// XP rewards by interaction type
const XP_REWARDS = {
  message: 5,
  creation: 20,
  achievement: 50,
  daily_streak: 10,
} as const;

/**
 * Get bond between user and Luminor
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID
 * @param luminorId - Luminor ID
 * @returns Bond data or null if not found
 * @throws {Error} If database query fails
 */
export async function getBond(
  supabase: SupabaseClient,
  userId: string,
  luminorId: string
): Promise<LuminorBond | null> {
  try {
    const { data, error } = await supabase
      .from('luminor_relationships')
      .select('*')
      .eq('user_id', userId)
      .eq('luminor_id', luminorId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch bond: ${error.message}`);
    }

    return transformBond(data);
  } catch (error) {
    console.error('Error in getBond:', error);
    throw error;
  }
}

/**
 * Get bond with Luminor details
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID
 * @param luminorId - Luminor ID
 * @returns Bond with Luminor info
 * @throws {Error} If not found or query fails
 */
export async function getBondWithLuminor(
  supabase: SupabaseClient,
  userId: string,
  luminorId: string
): Promise<BondResponse> {
  try {
    const { data, error } = await supabase
      .from('luminor_relationships')
      .select(`
        *,
        luminor:luminors!luminor_id (
          id,
          name,
          slug,
          title,
          specialty,
          color,
          avatar_url
        )
      `)
      .eq('user_id', userId)
      .eq('luminor_id', luminorId)
      .single();

    if (error) {
      throw new Error(`Failed to fetch bond with Luminor: ${error.message}`);
    }

    return {
      bond: transformBond(data),
      luminor: {
        id: data.luminor.id,
        name: data.luminor.name,
        slug: data.luminor.slug,
        title: data.luminor.title,
        specialty: data.luminor.specialty,
        color: data.luminor.color,
        avatarUrl: data.luminor.avatar_url,
      },
    };
  } catch (error) {
    console.error('Error in getBondWithLuminor:', error);
    throw error;
  }
}

/**
 * Get all bonds for a user
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID
 * @returns List of bonds with Luminor info
 * @throws {Error} If database query fails
 */
export async function getUserBonds(
  supabase: SupabaseClient,
  userId: string
): Promise<BondsListResponse> {
  try {
    // Get all active Luminors with their bonds for this user
    const { data, error } = await supabase
      .from('luminors')
      .select(`
        id,
        name,
        slug,
        title,
        specialty,
        color,
        avatar_url,
        icon,
        greeting_message,
        bond:luminor_relationships!luminor_id (
          id,
          user_id,
          luminor_id,
          bond_level,
          bond_xp,
          total_interactions,
          personality_match,
          user_preferences,
          key_memories,
          created_at,
          updated_at,
          last_interaction_at
        )
      `)
      .eq('is_active', true)
      .eq('is_public', true);

    if (error) {
      throw new Error(`Failed to fetch user bonds: ${error.message}`);
    }

    const bonds: LuminorWithBond[] = (data || []).map((luminor: any) => {
      const bondData = luminor.bond?.find((b: any) => b.user_id === userId);

      return {
        id: luminor.id,
        name: luminor.name,
        slug: luminor.slug,
        title: luminor.title,
        specialty: luminor.specialty,
        color: luminor.color,
        avatarUrl: luminor.avatar_url,
        icon: luminor.icon,
        greetingMessage: luminor.greeting_message,
        bond: bondData ? transformBond(bondData) : null,
      };
    });

    return { bonds };
  } catch (error) {
    console.error('Error in getUserBonds:', error);
    throw error;
  }
}

/**
 * Create or initialize bond
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID
 * @param luminorId - Luminor ID
 * @returns Created bond
 * @throws {Error} If creation fails
 */
export async function createBond(
  supabase: SupabaseClient,
  userId: string,
  luminorId: string
): Promise<LuminorBond> {
  try {
    const { data, error } = await supabase
      .from('luminor_relationships')
      .insert({
        user_id: userId,
        luminor_id: luminorId,
        bond_level: 1,
        bond_xp: 0,
        total_interactions: 0,
        key_memories: [],
      })
      .select()
      .single();

    if (error) {
      // Check if it's a duplicate - return existing
      if (error.code === '23505') {
        const existing = await getBond(supabase, userId, luminorId);
        if (existing) return existing;
      }
      throw new Error(`Failed to create bond: ${error.message}`);
    }

    return transformBond(data);
  } catch (error) {
    console.error('Error in createBond:', error);
    throw error;
  }
}

/**
 * Update bond progress (XP and level)
 *
 * @param supabase - Supabase client instance
 * @param request - Bond progress update request
 * @returns Updated bond
 * @throws {Error} If update fails
 */
export async function updateBondProgress(
  supabase: SupabaseClient,
  request: UpdateBondProgressRequest
): Promise<LuminorBond> {
  try {
    const { userId, luminorId, xpGained, interactionType } = request;

    // Get or create bond
    let bond = await getBond(supabase, userId, luminorId);
    if (!bond) {
      bond = await createBond(supabase, userId, luminorId);
    }

    // Calculate new XP and level
    const newXp = bond.bondXp + xpGained;
    const newLevel = calculateBondLevel(newXp);
    const leveledUp = newLevel > bond.bondLevel;

    // Update bond
    const { data, error } = await supabase
      .from('luminor_relationships')
      .update({
        bond_xp: newXp,
        bond_level: newLevel,
        total_interactions: bond.totalInteractions + 1,
        last_interaction_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('luminor_id', luminorId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update bond progress: ${error.message}`);
    }

    // If leveled up, add a memory
    if (leveledUp) {
      await addMemory(supabase, {
        userId,
        luminorId,
        content: `Reached bond level ${newLevel}!`,
        type: 'milestone',
        importance: 8,
      });
    }

    return transformBond(data);
  } catch (error) {
    console.error('Error in updateBondProgress:', error);
    throw error;
  }
}

/**
 * Add memory to bond
 *
 * @param supabase - Supabase client instance
 * @param request - Memory request
 * @returns Updated bond
 * @throws {Error} If adding memory fails
 */
export async function addMemory(
  supabase: SupabaseClient,
  request: AddMemoryRequest
): Promise<LuminorBond> {
  try {
    const { userId, luminorId, content, type, importance = 5 } = request;

    // Get current bond
    const bond = await getBond(supabase, userId, luminorId);
    if (!bond) {
      throw new Error('Bond not found');
    }

    // Create new memory
    const newMemory: Memory = {
      id: crypto.randomUUID(),
      content,
      type,
      importance,
      createdAt: new Date().toISOString(),
    };

    // Add to memories array (keep last 50 memories)
    const updatedMemories = [...bond.keyMemories, newMemory]
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 50);

    // Update bond
    const { data, error } = await supabase
      .from('luminor_relationships')
      .update({
        key_memories: updatedMemories,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('luminor_id', luminorId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to add memory: ${error.message}`);
    }

    return transformBond(data);
  } catch (error) {
    console.error('Error in addMemory:', error);
    throw error;
  }
}

/**
 * Get memories for user-Luminor relationship
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID
 * @param luminorId - Luminor ID (optional, gets all if not provided)
 * @returns List of memories
 * @throws {Error} If database query fails
 */
export async function getMemories(
  supabase: SupabaseClient,
  userId: string,
  luminorId?: string
): Promise<MemoriesResponse> {
  try {
    let query = supabase
      .from('luminor_relationships')
      .select('key_memories')
      .eq('user_id', userId);

    if (luminorId) {
      query = query.eq('luminor_id', luminorId);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch memories: ${error.message}`);
    }

    // Flatten and sort memories
    const allMemories: Memory[] = [];
    (data || []).forEach((bond: any) => {
      if (bond.key_memories) {
        allMemories.push(...bond.key_memories);
      }
    });

    // Sort by importance and date
    allMemories.sort((a, b) => {
      if (b.importance !== a.importance) {
        return b.importance - a.importance;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return {
      memories: allMemories,
      totalCount: allMemories.length,
    };
  } catch (error) {
    console.error('Error in getMemories:', error);
    throw error;
  }
}

/**
 * Get XP reward for interaction type
 *
 * @param interactionType - Type of interaction
 * @returns XP amount
 */
export function getXpReward(interactionType: keyof typeof XP_REWARDS): number {
  return XP_REWARDS[interactionType] || XP_REWARDS.message;
}

// =====================================================================
// HELPER FUNCTIONS
// =====================================================================

/**
 * Calculate bond level from XP
 *
 * @param xp - Current XP amount
 * @returns Bond level (1-10)
 */
function calculateBondLevel(xp: number): number {
  for (let level = BOND_LEVEL_THRESHOLDS.length - 1; level >= 0; level--) {
    if (xp >= BOND_LEVEL_THRESHOLDS[level]) {
      return level + 1;
    }
  }
  return 1;
}

/**
 * Transform database bond to API format
 *
 * @param data - Raw bond data from database
 * @returns Transformed bond
 */
function transformBond(data: any): LuminorBond {
  return {
    id: data.id,
    userId: data.user_id,
    luminorId: data.luminor_id,
    bondLevel: data.bond_level,
    bondXp: data.bond_xp,
    totalInteractions: data.total_interactions,
    personalityMatch: data.personality_match || {},
    userPreferences: data.user_preferences || {},
    keyMemories: data.key_memories || [],
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    lastInteractionAt: data.last_interaction_at,
  };
}
