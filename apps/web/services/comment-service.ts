// Comment Service - Stub Implementation
export async function createComment(data: {
  userId: string;
  creationId: string;
  content: string;
  parentId?: string;
}) {
  console.warn('createComment not yet implemented - returning mock data');
  return {
    id: 'mock-comment-id',
    ...data,
    createdAt: new Date().toISOString()
  };
}

export async function getComments(creationId: string) {
  console.warn('getComments not yet implemented - returning empty array');
  return [];
}

export async function deleteComment(commentId: string, userId: string) {
  console.warn('deleteComment not yet implemented');
  return { success: true };
}

export async function updateComment(commentId: string, userId: string, content: string) {
  console.warn('updateComment not yet implemented');
  return { success: true };
}
