/**
 * Comments Real-time Subscription Helpers
 *
 * Provides utilities for subscribing to real-time comment events
 * using Supabase Realtime.
 */

import type { SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';
import type { CommentEvent } from '../types/social-types';

export type CommentEventCallback = (event: CommentEvent) => void;

/**
 * Subscribe to comment events for a specific creation
 *
 * @param supabase - Supabase client instance
 * @param creationId - Creation to subscribe to
 * @param onComment - Callback when new comment added
 * @param onUpdate - Callback when comment edited
 * @param onDelete - Callback when comment deleted
 * @returns Realtime channel
 *
 * @example
 * ```typescript
 * const channel = subscribeComments(
 *   supabase,
 *   'creation-id',
 *   (event) => {
 *     console.log('New comment:', event.comment);
 *     addComment(event.comment);
 *   },
 *   (event) => {
 *     console.log('Comment updated:', event.commentId);
 *     updateComment(event.comment);
 *   },
 *   (event) => {
 *     console.log('Comment deleted:', event.commentId);
 *     removeComment(event.commentId);
 *   }
 * );
 * ```
 */
export function subscribeComments(
  supabase: SupabaseClient,
  creationId: string,
  onComment?: CommentEventCallback,
  onUpdate?: CommentEventCallback,
  onDelete?: CommentEventCallback
): RealtimeChannel {
  const channel = supabase
    .channel(`comments:creation:${creationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'comments',
        filter: `creation_id=eq.${creationId}`,
      },
      async (payload) => {
        if (onComment) {
          // Fetch comment with profile
          const { data: comment } = await supabase
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
            .eq('id', payload.new.id)
            .single();

          if (comment) {
            const event: CommentEvent = {
              type: 'INSERT',
              creationId,
              commentId: comment.id,
              comment: {
                id: comment.id,
                userId: comment.user_id,
                creationId: comment.creation_id,
                content: comment.content,
                parentCommentId: comment.parent_comment_id,
                isEdited: comment.is_edited,
                isFlagged: comment.is_flagged,
                likeCount: comment.like_count,
                createdAt: comment.created_at,
                updatedAt: comment.updated_at,
                profile: {
                  username: comment.profiles?.username || 'unknown',
                  displayName: comment.profiles?.display_name,
                  avatarUrl: comment.profiles?.avatar_url,
                  isVerified: comment.profiles?.is_verified || false,
                },
              },
            };

            onComment(event);
          }
        }
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'comments',
        filter: `creation_id=eq.${creationId}`,
      },
      async (payload) => {
        if (onUpdate) {
          // Fetch updated comment with profile
          const { data: comment } = await supabase
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
            .eq('id', payload.new.id)
            .single();

          if (comment) {
            const event: CommentEvent = {
              type: 'UPDATE',
              creationId,
              commentId: comment.id,
              comment: {
                id: comment.id,
                userId: comment.user_id,
                creationId: comment.creation_id,
                content: comment.content,
                parentCommentId: comment.parent_comment_id,
                isEdited: comment.is_edited,
                isFlagged: comment.is_flagged,
                likeCount: comment.like_count,
                createdAt: comment.created_at,
                updatedAt: comment.updated_at,
                profile: {
                  username: comment.profiles?.username || 'unknown',
                  displayName: comment.profiles?.display_name,
                  avatarUrl: comment.profiles?.avatar_url,
                  isVerified: comment.profiles?.is_verified || false,
                },
              },
            };

            onUpdate(event);
          }
        }
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'comments',
        filter: `creation_id=eq.${creationId}`,
      },
      (payload) => {
        if (onDelete) {
          const event: CommentEvent = {
            type: 'DELETE',
            creationId,
            commentId: payload.old.id,
          };

          onDelete(event);
        }
      }
    )
    .subscribe();

  return channel;
}

/**
 * Subscribe to replies for a specific comment
 *
 * @param supabase - Supabase client instance
 * @param parentCommentId - Parent comment to subscribe to
 * @param onReply - Callback when reply is added
 * @returns Realtime channel
 *
 * @example
 * ```typescript
 * const channel = subscribeReplies(supabase, 'comment-id', (event) => {
 *   console.log('New reply:', event.comment);
 *   addReply(event.comment);
 * });
 * ```
 */
export function subscribeReplies(
  supabase: SupabaseClient,
  parentCommentId: string,
  onReply: CommentEventCallback
): RealtimeChannel {
  const channel = supabase
    .channel(`replies:comment:${parentCommentId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'comments',
        filter: `parent_comment_id=eq.${parentCommentId}`,
      },
      async (payload) => {
        // Fetch reply with profile
        const { data: comment } = await supabase
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
          .eq('id', payload.new.id)
          .single();

        if (comment) {
          const event: CommentEvent = {
            type: 'INSERT',
            creationId: comment.creation_id,
            commentId: comment.id,
            comment: {
              id: comment.id,
              userId: comment.user_id,
              creationId: comment.creation_id,
              content: comment.content,
              parentCommentId: comment.parent_comment_id,
              isEdited: comment.is_edited,
              isFlagged: comment.is_flagged,
              likeCount: comment.like_count,
              createdAt: comment.created_at,
              updatedAt: comment.updated_at,
              profile: {
                username: comment.profiles?.username || 'unknown',
                displayName: comment.profiles?.display_name,
                avatarUrl: comment.profiles?.avatar_url,
                isVerified: comment.profiles?.is_verified || false,
              },
            },
          };

          onReply(event);
        }
      }
    )
    .subscribe();

  return channel;
}

/**
 * Subscribe to all comments on user's creations
 *
 * @param supabase - Supabase client instance
 * @param userId - User whose creations to monitor
 * @param onEvent - Callback for comment events
 * @returns Realtime channel
 */
export function subscribeUserComments(
  supabase: SupabaseClient,
  userId: string,
  onEvent: CommentEventCallback
): RealtimeChannel {
  const channel = supabase
    .channel(`comments:user:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'comments',
      },
      async (payload) => {
        // Verify this comment is on one of the user's creations
        const creationId =
          payload.new?.creation_id || payload.old?.creation_id;

        const { data: creation } = await supabase
          .from('creations')
          .select('user_id')
          .eq('id', creationId)
          .eq('user_id', userId)
          .single();

        if (creation) {
          const event: CommentEvent = {
            type: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE',
            creationId,
            commentId: payload.new?.id || payload.old?.id,
          };

          if (payload.eventType !== 'DELETE') {
            // Fetch comment with profile for INSERT/UPDATE
            const { data: comment } = await supabase
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
              .eq('id', payload.new.id)
              .single();

            if (comment) {
              event.comment = {
                id: comment.id,
                userId: comment.user_id,
                creationId: comment.creation_id,
                content: comment.content,
                parentCommentId: comment.parent_comment_id,
                isEdited: comment.is_edited,
                isFlagged: comment.is_flagged,
                likeCount: comment.like_count,
                createdAt: comment.created_at,
                updatedAt: comment.updated_at,
                profile: {
                  username: comment.profiles?.username || 'unknown',
                  displayName: comment.profiles?.display_name,
                  avatarUrl: comment.profiles?.avatar_url,
                  isVerified: comment.profiles?.is_verified || false,
                },
              };
            }
          }

          onEvent(event);
        }
      }
    )
    .subscribe();

  return channel;
}
