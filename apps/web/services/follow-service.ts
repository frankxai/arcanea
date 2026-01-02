/**
 * Follow Service - Web App Wrapper
 *
 * Wraps database service with Supabase client injection
 */

import { supabaseServer } from '@/lib/supabase';
import {
  followUser as dbFollowUser,
  unfollowUser as dbUnfollowUser,
} from '@/lib/database/services/follow-service';

export async function followUser(followerId: string, followingId: string) {
  const result = await dbFollowUser(supabaseServer, followerId, followingId);
  return {
    id: result.follow?.id || 'new-follow',
    followerId,
    followingId,
    createdAt: result.follow?.createdAt || new Date().toISOString(),
  };
}

export async function unfollowUser(followerId: string, followingId: string) {
  await dbUnfollowUser(supabaseServer, followerId, followingId);
  return { success: true };
}
