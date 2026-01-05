/**
 * Like Service - Web App Wrapper
 *
 * Wraps database service for likes on creations
 */

import {
  toggleLike,
  getLikeStatus,
  type Like,
} from '@/lib/database/services/like-service';

export type { Like };

export async function likeCreation(userId: string, creationId: string) {
  // Check current status
  const isLiked = await getLikeStatus(userId, creationId);

  if (isLiked) {
    // Already liked
    return {
      id: `${userId}-${creationId}`,
      userId,
      creationId,
      createdAt: new Date().toISOString(),
    };
  }

  // Toggle to like
  const result = await toggleLike(userId, creationId, 'creation');

  if (result.liked) {
    return {
      id: `${userId}-${creationId}`,
      userId,
      creationId,
      createdAt: new Date().toISOString(),
    };
  }

  throw new Error('Failed to like creation');
}

export async function unlikeCreation(userId: string, creationId: string) {
  // Check current status
  const isLiked = await getLikeStatus(userId, creationId);

  if (!isLiked) {
    // Already not liked
    return { success: true };
  }

  // Toggle to unlike
  const result = await toggleLike(userId, creationId, 'creation');

  if (!result.liked) {
    return { success: true };
  }

  throw new Error('Failed to unlike creation');
}
