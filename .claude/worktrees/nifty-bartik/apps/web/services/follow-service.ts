/**
 * Follow Service - Web App Wrapper
 *
 * Wraps database service for user follows
 */

import {
  toggleFollow,
  getFollowStatus,
  type Follow,
} from '@/lib/database/services/follow-service';

export type { Follow };

export async function followUser(followerId: string, followingId: string) {
  // First check if already following
  const isFollowing = await getFollowStatus(followerId, followingId);

  if (isFollowing) {
    // Already following, return current state
    return {
      id: `${followerId}-${followingId}`,
      followerId,
      followingId,
      createdAt: new Date().toISOString(),
    };
  }

  // Toggle to follow
  const result = await toggleFollow(followerId, followingId);

  return {
    id: `${followerId}-${followingId}`,
    followerId,
    followingId,
    createdAt: new Date().toISOString(),
    following: result.following,
  };
}

export async function unfollowUser(followerId: string, followingId: string) {
  // First check if following
  const isFollowing = await getFollowStatus(followerId, followingId);

  if (!isFollowing) {
    // Not following, already done
    return { success: true };
  }

  // Toggle to unfollow
  await toggleFollow(followerId, followingId);
  return { success: true };
}
