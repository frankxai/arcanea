/**
 * Like Service - Web App Wrapper
 *
 * Wraps database service with Supabase client injection
 */

import { supabaseServer } from '@/lib/supabase';
import { toggleLike } from '@arcanea/database/services/like-service';

export async function likeCreation(userId: string, creationId: string) {
  const result = await toggleLike(supabaseServer, userId, creationId);
  if (result.liked) {
    return {
      id: result.like?.id || 'new-like',
      userId,
      creationId,
      createdAt: result.like?.createdAt || new Date().toISOString(),
    };
  }
  throw new Error('Failed to like creation');
}

export async function unlikeCreation(userId: string, creationId: string) {
  const result = await toggleLike(supabaseServer, userId, creationId);
  if (!result.liked) {
    return { success: true };
  }
  throw new Error('Failed to unlike creation');
}
