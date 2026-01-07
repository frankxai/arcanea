/**
 * Comment Service
 *
 * Handles all comment-related database operations including:
 * - Creating comments
 * - Updating comments
 * - Deleting comments
 * - Fetching comments with threading support
 * - Comment replies
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  Comment,
  CommentWithProfile,
  CreateCommentRequest,
  UpdateCommentRequest,
  CommentsListResponse,
  PaginationParams,
} from '../types/social-types';

/**
 * Create a new comment
 *
 * @param supabase - Supabase client instance
 * @param userId - User creating the comment
 * @param request - Comment creation request
 * @returns Created comment with profile
 * @throws {Error} If creation fails
 */
export async function createComment(
  supabase: SupabaseClient,
  userId: string,
  request: CreateCommentRequest
): Promise<CommentWithProfile> {
  try {
    // Validate creation exists
    const { data: creation, error: creationError } = await supabase
      .from('creations')
      .select('id, comment_count')
      .eq('id', request.creationId)
      .single();

    if (creationError || !creation) {
      throw new Error('Creation not found');
    }

    // If replying, validate parent comment exists
    if (request.parentCommentId) {
      const { data: parentComment } = await supabase
        .from('comments')
        .select('id')
        .eq('id', request.parentCommentId)
        .single();

      if (!parentComment) {
        throw new Error('Parent comment not found');
      }
    }

    // Create comment
    const { data: comment, error: insertError } = await supabase
      .from('comments')
      .insert({
        user_id: userId,
        creation_id: request.creationId,
        content: request.content,
        parent_comment_id: request.parentCommentId || null,
      })
      .select()
      .single();

    if (insertError) {
      throw new Error(`Failed to create comment: ${insertError.message}`);
    }

    // Increment comment count on creation
    await supabase
      .from('creations')
      .update({
        comment_count: (creation.comment_count || 0) + 1,
      })
      .eq('id', request.creationId);

    // Fetch comment with profile
    return await getCommentById(supabase, comment.id);
  } catch (error) {
    console.error('Error in createComment:', error);
    throw error;
  }
}

/**
 * Update a comment
 *
 * @param supabase - Supabase client instance
 * @param commentId - Comment to update
 * @param userId - User updating (for authorization)
 * @param request - Update request
 * @returns Updated comment with profile
 * @throws {Error} If update fails or unauthorized
 */
export async function updateComment(
  supabase: SupabaseClient,
  commentId: string,
  userId: string,
  request: UpdateCommentRequest
): Promise<CommentWithProfile> {
  try {
    // Verify ownership
    const { data: existing } = await supabase
      .from('comments')
      .select('user_id')
      .eq('id', commentId)
      .single();

    if (!existing) {
      throw new Error('Comment not found');
    }

    if (existing.user_id !== userId) {
      throw new Error('Unauthorized to update this comment');
    }

    // Update comment
    const { error: updateError } = await supabase
      .from('comments')
      .update({
        content: request.content,
        is_edited: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', commentId);

    if (updateError) {
      throw new Error(`Failed to update comment: ${updateError.message}`);
    }

    return await getCommentById(supabase, commentId);
  } catch (error) {
    console.error('Error in updateComment:', error);
    throw error;
  }
}

/**
 * Delete a comment
 *
 * @param supabase - Supabase client instance
 * @param commentId - Comment to delete
 * @param userId - User deleting (for authorization)
 * @returns True if deleted
 * @throws {Error} If deletion fails or unauthorized
 */
export async function deleteComment(
  supabase: SupabaseClient,
  commentId: string,
  userId: string
): Promise<boolean> {
  try {
    // Get comment to verify ownership and get creation_id
    const { data: comment } = await supabase
      .from('comments')
      .select('user_id, creation_id')
      .eq('id', commentId)
      .single();

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.user_id !== userId) {
      throw new Error('Unauthorized to delete this comment');
    }

    // Count replies before deleting
    const { count: replyCount } = await supabase
      .from('comments')
      .select('id', { count: 'exact', head: true })
      .eq('parent_comment_id', commentId);

    // Delete comment (replies will be orphaned but marked with parent_comment_id)
    const { error: deleteError } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (deleteError) {
      throw new Error(`Failed to delete comment: ${deleteError.message}`);
    }

    // Decrement comment count (1 + replies)
    const { data: creation } = await supabase
      .from('creations')
      .select('comment_count')
      .eq('id', comment.creation_id)
      .single();

    const newCount = Math.max((creation?.comment_count || 0) - 1 - (replyCount || 0), 0);
    await supabase
      .from('creations')
      .update({ comment_count: newCount })
      .eq('id', comment.creation_id);

    return true;
  } catch (error) {
    console.error('Error in deleteComment:', error);
    throw error;
  }
}

/**
 * Get comments for a creation with threading
 *
 * @param supabase - Supabase client instance
 * @param creationId - Creation to get comments for
 * @param pagination - Pagination parameters
 * @returns List of comments with replies and pagination
 * @throws {Error} If query fails
 */
export async function getComments(
  supabase: SupabaseClient,
  creationId: string,
  pagination: PaginationParams = {}
): Promise<CommentsListResponse> {
  try {
    const page = pagination.page || 1;
    const pageSize = Math.min(pagination.pageSize || 20, 100);
    const offset = (page - 1) * pageSize;

    // Get total count of top-level comments only
    const { count } = await supabase
      .from('comments')
      .select('id', { count: 'exact', head: true })
      .eq('creation_id', creationId)
      .is('parent_comment_id', null);

    const totalCount = count || 0;

    // Get top-level comments with profiles
    const { data: topComments, error: commentsError } = await supabase
      .from('comments')
      .select(`
        id,
        user_id,
        creation_id,
        content,
        parent_comment_id,
        is_edited,
        is_flagged,
        like_count,
        created_at,
        updated_at,
        profiles:user_id (
          username,
          display_name,
          avatar_url,
          is_verified
        )
      `)
      .eq('creation_id', creationId)
      .is('parent_comment_id', null)
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (commentsError) {
      throw new Error(`Failed to fetch comments: ${commentsError.message}`);
    }

    // Get all replies for these comments
    const topCommentIds = (topComments || []).map((c: any) => c.id);
    let replies: any[] = [];

    if (topCommentIds.length > 0) {
      const { data: repliesData } = await supabase
        .from('comments')
        .select(`
          id,
          user_id,
          creation_id,
          content,
          parent_comment_id,
          is_edited,
          is_flagged,
          like_count,
          created_at,
          updated_at,
          profiles:user_id (
            username,
            display_name,
            avatar_url,
            is_verified
          )
        `)
        .in('parent_comment_id', topCommentIds)
        .order('created_at', { ascending: true });

      replies = repliesData || [];
    }

    // Build threaded structure
    const comments: CommentWithProfile[] = (topComments || []).map((comment: any) => {
      const commentReplies = replies
        .filter((r: any) => r.parent_comment_id === comment.id)
        .map(transformCommentWithProfile);

      return {
        ...transformCommentWithProfile(comment),
        replies: commentReplies,
        replyCount: commentReplies.length,
      };
    });

    return {
      comments,
      pagination: {
        page,
        pageSize,
        totalCount,
        hasMore: offset + pageSize < totalCount,
      },
    };
  } catch (error) {
    console.error('Error in getComments:', error);
    throw error;
  }
}

/**
 * Get a single comment by ID with profile
 *
 * @param supabase - Supabase client instance
 * @param commentId - Comment to fetch
 * @returns Comment with profile
 * @throws {Error} If not found or query fails
 */
export async function getCommentById(
  supabase: SupabaseClient,
  commentId: string
): Promise<CommentWithProfile> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        id,
        user_id,
        creation_id,
        content,
        parent_comment_id,
        is_edited,
        is_flagged,
        like_count,
        created_at,
        updated_at,
        profiles:user_id (
          username,
          display_name,
          avatar_url,
          is_verified
        )
      `)
      .eq('id', commentId)
      .single();

    if (error || !data) {
      throw new Error('Comment not found');
    }

    return transformCommentWithProfile(data);
  } catch (error) {
    console.error('Error in getCommentById:', error);
    throw error;
  }
}

/**
 * Get replies for a specific comment
 *
 * @param supabase - Supabase client instance
 * @param parentCommentId - Parent comment to get replies for
 * @param pagination - Pagination parameters
 * @returns List of replies with pagination
 * @throws {Error} If query fails
 */
export async function getReplies(
  supabase: SupabaseClient,
  parentCommentId: string,
  pagination: PaginationParams = {}
): Promise<CommentsListResponse> {
  try {
    const page = pagination.page || 1;
    const pageSize = Math.min(pagination.pageSize || 20, 100);
    const offset = (page - 1) * pageSize;

    // Get total count
    const { count } = await supabase
      .from('comments')
      .select('id', { count: 'exact', head: true })
      .eq('parent_comment_id', parentCommentId);

    const totalCount = count || 0;

    // Get replies
    const { data, error } = await supabase
      .from('comments')
      .select(`
        id,
        user_id,
        creation_id,
        content,
        parent_comment_id,
        is_edited,
        is_flagged,
        like_count,
        created_at,
        updated_at,
        profiles:user_id (
          username,
          display_name,
          avatar_url,
          is_verified
        )
      `)
      .eq('parent_comment_id', parentCommentId)
      .order('created_at', { ascending: true })
      .range(offset, offset + pageSize - 1);

    if (error) {
      throw new Error(`Failed to fetch replies: ${error.message}`);
    }

    const comments = (data || []).map(transformCommentWithProfile);

    return {
      comments,
      pagination: {
        page,
        pageSize,
        totalCount,
        hasMore: offset + pageSize < totalCount,
      },
    };
  } catch (error) {
    console.error('Error in getReplies:', error);
    throw error;
  }
}

/**
 * Get comments by user
 *
 * @param supabase - Supabase client instance
 * @param userId - User to get comments for
 * @param pagination - Pagination parameters
 * @returns List of user's comments with pagination
 * @throws {Error} If query fails
 */
export async function getUserComments(
  supabase: SupabaseClient,
  userId: string,
  pagination: PaginationParams = {}
): Promise<CommentsListResponse> {
  try {
    const page = pagination.page || 1;
    const pageSize = Math.min(pagination.pageSize || 20, 100);
    const offset = (page - 1) * pageSize;

    // Get total count
    const { count } = await supabase
      .from('comments')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId);

    const totalCount = count || 0;

    // Get comments
    const { data, error } = await supabase
      .from('comments')
      .select(`
        id,
        user_id,
        creation_id,
        content,
        parent_comment_id,
        is_edited,
        is_flagged,
        like_count,
        created_at,
        updated_at,
        profiles:user_id (
          username,
          display_name,
          avatar_url,
          is_verified
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) {
      throw new Error(`Failed to fetch user comments: ${error.message}`);
    }

    const comments = (data || []).map(transformCommentWithProfile);

    return {
      comments,
      pagination: {
        page,
        pageSize,
        totalCount,
        hasMore: offset + pageSize < totalCount,
      },
    };
  } catch (error) {
    console.error('Error in getUserComments:', error);
    throw error;
  }
}

// =====================================================================
// HELPER FUNCTIONS
// =====================================================================

/**
 * Transform database comment to API comment format with profile
 *
 * @param data - Raw comment data from database
 * @returns Transformed comment with profile
 */
function transformCommentWithProfile(data: any): CommentWithProfile {
  return {
    id: data.id,
    userId: data.user_id,
    creationId: data.creation_id,
    content: data.content,
    parentCommentId: data.parent_comment_id,
    isEdited: data.is_edited,
    isFlagged: data.is_flagged,
    likeCount: data.like_count,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    profile: {
      username: data.profiles?.username || 'unknown',
      displayName: data.profiles?.display_name,
      avatarUrl: data.profiles?.avatar_url,
      isVerified: data.profiles?.is_verified || false,
    },
  };
}
