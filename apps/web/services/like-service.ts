// Like Service - Stub Implementation
export async function likeCreation(userId: string, creationId: string) {
  console.warn('likeCreation not yet implemented - returning mock data');
  return {
    id: 'mock-like-id',
    userId,
    creationId,
    createdAt: new Date().toISOString()
  };
}

export async function unlikeCreation(userId: string, creationId: string) {
  console.warn('unlikeCreation not yet implemented');
  return { success: true };
}

export async function getUserLikes(userId: string) {
  console.warn('getUserLikes not yet implemented - returning empty array');
  return [];
}

export async function getCreationLikes(creationId: string) {
  console.warn('getCreationLikes not yet implemented - returning empty array');
  return [];
}
