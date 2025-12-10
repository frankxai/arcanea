/**
 * Comment Service - Web App Wrapper
 *
 * Wraps database service with Supabase client injection
 */

import { supabaseServer } from '@/lib/supabase';
import {
  createComment as dbCreateComment,
  getComments as dbGetComments,
} from '@arcanea/database/services/comment-service';

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
  const { page = 1, pageSize = 20 } = options;

  const result = await dbGetComments(supabaseServer, creationId, {
    page,
    pageSize,
  });

  return {
    comments: result.comments,
    pagination: {
      page: result.pagination.page,
      pageSize: result.pagination.pageSize,
      total: result.pagination.totalCount,
      hasMore: result.pagination.hasMore,
    },
  };
}

export async function createComment(data: CreateCommentData) {
  const comment = await dbCreateComment(supabaseServer, data.userId, {
    creationId: data.creationId,
    content: data.content,
    parentId: data.parentId || null,
  });

  return {
    id: comment.id,
    userId: comment.userId,
    creationId: comment.creationId,
    content: comment.content,
    parentId: comment.parentId || null,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
}
