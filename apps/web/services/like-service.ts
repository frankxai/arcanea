/**
 * Like Service
 * 
 * Stub implementation - TODO: Implement full functionality
 */

export async function likeCreation(userId: string, creationId: string) {
  console.warn('like-service.likeCreation not yet implemented');
  return {
    id: 'mock-like-id',
    userId,
    creationId,
    createdAt: new Date().toISOString(),
  };
}

export async function unlikeCreation(userId: string, creationId: string) {
  console.warn('like-service.unlikeCreation not yet implemented');
  return { success: true };
}
