/**
 * Likes Real-time Subscription Helpers
 *
 * Provides utilities for subscribing to real-time like events
 * using Supabase Realtime.
 */

import type { SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';
import type { LikeEvent } from '../types/social-types';

export type LikeEventCallback = (event: LikeEvent) => void;

/**
 * Subscribe to like events for a specific creation
 *
 * @param supabase - Supabase client instance
 * @param creationId - Creation to subscribe to
 * @param onLike - Callback when creation is liked
 * @param onUnlike - Callback when creation is unliked
 * @returns Realtime channel (call .unsubscribe() to cleanup)
 *
 * @example
 * ```typescript
 * const channel = subscribeLikes(supabase, 'creation-id',
 *   (event) => {
 *     console.log('New like:', event.userId);
 *     setLikeCount(event.likeCount);
 *   },
 *   (event) => {
 *     console.log('Unliked:', event.userId);
 *     setLikeCount(event.likeCount);
 *   }
 * );
 *
 * // Cleanup
 * channel.unsubscribe();
 * ```
 */
export function subscribeLikes(
  supabase: SupabaseClient,
  creationId: string,
  onLike?: LikeEventCallback,
  onUnlike?: LikeEventCallback
): RealtimeChannel {
  const channel = supabase
    .channel(`likes:creation:${creationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'likes',
        filter: `creation_id=eq.${creationId}`,
      },
      async (payload) => {
        if (onLike) {
          // Get updated like count
          const { data: creation } = await supabase
            .from('creations')
            .select('like_count')
            .eq('id', creationId)
            .single();

          const event: LikeEvent = {
            type: 'INSERT',
            creationId,
            userId: payload.new.user_id,
            likeCount: creation?.like_count || 0,
            like: {
              id: payload.new.id,
              userId: payload.new.user_id,
              creationId: payload.new.creation_id,
              createdAt: payload.new.created_at,
            },
          };

          onLike(event);
        }
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'likes',
        filter: `creation_id=eq.${creationId}`,
      },
      async (payload) => {
        if (onUnlike) {
          // Get updated like count
          const { data: creation } = await supabase
            .from('creations')
            .select('like_count')
            .eq('id', creationId)
            .single();

          const event: LikeEvent = {
            type: 'DELETE',
            creationId,
            userId: payload.old.user_id,
            likeCount: creation?.like_count || 0,
          };

          onUnlike(event);
        }
      }
    )
    .subscribe();

  return channel;
}

/**
 * Subscribe to all like events for a user's creations
 *
 * @param supabase - Supabase client instance
 * @param userId - User whose creations to monitor
 * @param onEvent - Callback for all like/unlike events
 * @returns Realtime channel
 *
 * @example
 * ```typescript
 * const channel = subscribeUserLikes(supabase, 'user-id', (event) => {
 *   if (event.type === 'INSERT') {
 *     showNotification(`Someone liked your creation!`);
 *   }
 * });
 * ```
 */
export function subscribeUserLikes(
  supabase: SupabaseClient,
  userId: string,
  onEvent: LikeEventCallback
): RealtimeChannel {
  const channel = supabase
    .channel(`likes:user:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'likes',
      },
      async (payload) => {
        // Verify this like is for one of the user's creations
        const creationId =
          payload.new?.creation_id || payload.old?.creation_id;

        const { data: creation } = await supabase
          .from('creations')
          .select('user_id, like_count')
          .eq('id', creationId)
          .eq('user_id', userId)
          .single();

        if (creation) {
          const event: LikeEvent = {
            type: payload.eventType as 'INSERT' | 'DELETE',
            creationId,
            userId: payload.new?.user_id || payload.old?.user_id,
            likeCount: creation.like_count,
            like:
              payload.eventType === 'INSERT'
                ? {
                    id: payload.new.id,
                    userId: payload.new.user_id,
                    creationId: payload.new.creation_id,
                    createdAt: payload.new.created_at,
                  }
                : undefined,
          };

          onEvent(event);
        }
      }
    )
    .subscribe();

  return channel;
}

/**
 * Batch subscribe to multiple creations
 *
 * @param supabase - Supabase client instance
 * @param creationIds - Array of creation IDs
 * @param onEvent - Callback for events
 * @returns Array of realtime channels
 */
export function subscribeBatchLikes(
  supabase: SupabaseClient,
  creationIds: string[],
  onEvent: LikeEventCallback
): RealtimeChannel[] {
  return creationIds.map((creationId) =>
    subscribeLikes(supabase, creationId, onEvent, onEvent)
  );
}

/**
 * Unsubscribe from multiple channels
 *
 * @param channels - Array of channels to unsubscribe
 */
export function unsubscribeAll(channels: RealtimeChannel[]): void {
  channels.forEach((channel) => channel.unsubscribe());
}
