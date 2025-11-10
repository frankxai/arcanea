/**
 * Follow Service
 * 
 * Stub implementation - TODO: Implement full functionality
 */

export async function followUser(followerId: string, followingId: string) {
  console.warn('follow-service.followUser not yet implemented');
  return {
    id: 'mock-follow-id',
    followerId,
    followingId,
    createdAt: new Date().toISOString(),
  };
}

export async function unfollowUser(followerId: string, followingId: string) {
  console.warn('follow-service.unfollowUser not yet implemented');
  return { success: true };
}
