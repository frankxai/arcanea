// Follow Service - Stub Implementation
export async function followUser(followerId: string, followingId: string) {
  console.warn('followUser not yet implemented - returning mock data');
  return {
    id: 'mock-follow-id',
    followerId,
    followingId,
    createdAt: new Date().toISOString()
  };
}

export async function unfollowUser(followerId: string, followingId: string) {
  console.warn('unfollowUser not yet implemented');
  return { success: true };
}

export async function getFollowers(userId: string) {
  console.warn('getFollowers not yet implemented - returning empty array');
  return [];
}

export async function getFollowing(userId: string) {
  console.warn('getFollowing not yet implemented - returning empty array');
  return [];
}

export async function isFollowing(followerId: string, followingId: string) {
  console.warn('isFollowing not yet implemented - returning false');
  return false;
}
