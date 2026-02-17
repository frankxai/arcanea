/**
 * Comment Service
 *
 * Stub implementation - TODO: Implement full functionality
 */

export interface CommentOptions {
  page?: number;
  pageSize?: number;
}

export interface CreateCommentData {
  userId: string;
  creationId: string;
  content: string;
  parentId?: string;
}

export async function getCreationComments(
  creationId: string,
  options: CommentOptions = {}
) {
  console.warn('comment-service.getCreationComments not yet implemented - returning empty comments');

  const { page = 1, pageSize = 20 } = options;

  return {
    comments: [],
    pagination: {
      page,
      pageSize,
      total: 0,
      hasMore: false,
    },
  };
}

export async function createComment(data: CreateCommentData) {
  console.warn('comment-service.createComment not yet implemented - returning mock comment');

  return {
    id: 'mock-comment-id',
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
