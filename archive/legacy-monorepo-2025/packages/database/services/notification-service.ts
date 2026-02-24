/**
 * Notification Service
 *
 * Handles all notification-related database operations including:
 * - Creating notifications
 * - Fetching notifications
 * - Marking notifications as read
 * - Deleting notifications
 * - Getting unread count
 *
 * Note: Notifications table schema needs to be created:
 * - id (uuid, primary key)
 * - user_id (uuid, foreign key to profiles)
 * - type (text)
 * - data (jsonb)
 * - is_read (boolean, default false)
 * - created_at (timestamp)
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  Notification,
  NotificationData,
  NotificationsListResponse,
  PaginationParams,
} from '../types/social-types';
import { NotificationType } from '../types/social-types';

/**
 * Create a new notification
 *
 * @param supabase - Supabase client instance
 * @param userId - User to notify
 * @param type - Type of notification
 * @param data - Notification data
 * @returns Created notification
 * @throws {Error} If creation fails
 */
export async function createNotification(
  supabase: SupabaseClient,
  userId: string,
  type: NotificationType,
  data: NotificationData
): Promise<Notification> {
  try {
    // Don't create notifications for self-actions
    if (data.actorId === userId) {
      throw new Error('Cannot notify user about their own action');
    }

    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type,
        data,
        is_read: false,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create notification: ${error.message}`);
    }

    return transformNotification(notification);
  } catch (error) {
    console.error('Error in createNotification:', error);
    throw error;
  }
}

/**
 * Get notifications for a user
 *
 * @param supabase - Supabase client instance
 * @param userId - User to get notifications for
 * @param pagination - Pagination parameters
 * @param unreadOnly - Only fetch unread notifications
 * @returns List of notifications with unread count and pagination
 * @throws {Error} If query fails
 */
export async function getNotifications(
  supabase: SupabaseClient,
  userId: string,
  pagination: PaginationParams = {},
  unreadOnly: boolean = false
): Promise<NotificationsListResponse> {
  try {
    const page = pagination.page || 1;
    const pageSize = Math.min(pagination.pageSize || 20, 100);
    const offset = (page - 1) * pageSize;

    // Build query
    let query = supabase
      .from('notifications')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);

    if (unreadOnly) {
      query = query.eq('is_read', false);
    }

    // Get notifications
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) {
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }

    const totalCount = count || 0;

    // Get unread count
    const { count: unreadCount } = await supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    const notifications = (data || []).map(transformNotification);

    return {
      notifications,
      unreadCount: unreadCount || 0,
      pagination: {
        page,
        pageSize,
        totalCount,
        hasMore: offset + pageSize < totalCount,
      },
    };
  } catch (error) {
    console.error('Error in getNotifications:', error);
    throw error;
  }
}

/**
 * Mark a notification as read
 *
 * @param supabase - Supabase client instance
 * @param notificationId - Notification to mark as read
 * @param userId - User ID (for authorization)
 * @returns Updated notification
 * @throws {Error} If update fails or unauthorized
 */
export async function markNotificationAsRead(
  supabase: SupabaseClient,
  notificationId: string,
  userId: string
): Promise<Notification> {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to mark notification as read: ${error.message}`);
    }

    return transformNotification(data);
  } catch (error) {
    console.error('Error in markNotificationAsRead:', error);
    throw error;
  }
}

/**
 * Mark all notifications as read for a user
 *
 * @param supabase - Supabase client instance
 * @param userId - User to mark notifications for
 * @returns Number of notifications marked as read
 * @throws {Error} If update fails
 */
export async function markAllNotificationsAsRead(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false)
      .select('id');

    if (error) {
      throw new Error(`Failed to mark all notifications as read: ${error.message}`);
    }

    return (data || []).length;
  } catch (error) {
    console.error('Error in markAllNotificationsAsRead:', error);
    throw error;
  }
}

/**
 * Delete a notification
 *
 * @param supabase - Supabase client instance
 * @param notificationId - Notification to delete
 * @param userId - User ID (for authorization)
 * @returns True if deleted
 * @throws {Error} If deletion fails or unauthorized
 */
export async function deleteNotification(
  supabase: SupabaseClient,
  notificationId: string,
  userId: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Failed to delete notification: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error('Error in deleteNotification:', error);
    throw error;
  }
}

/**
 * Delete all read notifications for a user
 *
 * @param supabase - Supabase client instance
 * @param userId - User to delete notifications for
 * @returns Number of notifications deleted
 * @throws {Error} If deletion fails
 */
export async function deleteReadNotifications(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', userId)
      .eq('is_read', true)
      .select('id');

    if (error) {
      throw new Error(`Failed to delete read notifications: ${error.message}`);
    }

    return (data || []).length;
  } catch (error) {
    console.error('Error in deleteReadNotifications:', error);
    throw error;
  }
}

/**
 * Get unread notification count
 *
 * @param supabase - Supabase client instance
 * @param userId - User to get count for
 * @returns Number of unread notifications
 * @throws {Error} If query fails
 */
export async function getUnreadCount(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  try {
    const { count } = await supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    return count || 0;
  } catch (error) {
    console.error('Error in getUnreadCount:', error);
    return 0;
  }
}

// =====================================================================
// NOTIFICATION CREATION HELPERS
// =====================================================================

/**
 * Create a like notification
 *
 * @param supabase - Supabase client instance
 * @param creationOwnerId - Owner of the liked creation
 * @param actorId - User who liked
 * @param creationData - Creation information
 */
export async function notifyLike(
  supabase: SupabaseClient,
  creationOwnerId: string,
  actorId: string,
  creationData: { id: string; title: string; thumbnailUrl?: string | null }
): Promise<void> {
  try {
    // Get actor profile
    const { data: actor } = await supabase
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', actorId)
      .single();

    await createNotification(supabase, creationOwnerId, NotificationType.LIKE, {
      actorId,
      actorUsername: actor?.username,
      actorAvatar: actor?.avatar_url,
      creationId: creationData.id,
      creationTitle: creationData.title,
      creationThumbnail: creationData.thumbnailUrl,
      url: `/creations/${creationData.id}`,
    });
  } catch (error) {
    // Non-critical, just log
    console.warn('Failed to create like notification:', error);
  }
}

/**
 * Create a comment notification
 *
 * @param supabase - Supabase client instance
 * @param creationOwnerId - Owner of the commented creation
 * @param actorId - User who commented
 * @param commentData - Comment information
 */
export async function notifyComment(
  supabase: SupabaseClient,
  creationOwnerId: string,
  actorId: string,
  commentData: { id: string; content: string; creationId: string; creationTitle: string }
): Promise<void> {
  try {
    const { data: actor } = await supabase
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', actorId)
      .single();

    await createNotification(supabase, creationOwnerId, NotificationType.COMMENT, {
      actorId,
      actorUsername: actor?.username,
      actorAvatar: actor?.avatar_url,
      commentId: commentData.id,
      commentContent: commentData.content,
      creationId: commentData.creationId,
      creationTitle: commentData.creationTitle,
      url: `/creations/${commentData.creationId}?comment=${commentData.id}`,
    });
  } catch (error) {
    console.warn('Failed to create comment notification:', error);
  }
}

/**
 * Create a reply notification
 *
 * @param supabase - Supabase client instance
 * @param parentCommentAuthorId - Author of the parent comment
 * @param actorId - User who replied
 * @param replyData - Reply information
 */
export async function notifyReply(
  supabase: SupabaseClient,
  parentCommentAuthorId: string,
  actorId: string,
  replyData: { id: string; content: string; creationId: string }
): Promise<void> {
  try {
    const { data: actor } = await supabase
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', actorId)
      .single();

    await createNotification(supabase, parentCommentAuthorId, NotificationType.REPLY, {
      actorId,
      actorUsername: actor?.username,
      actorAvatar: actor?.avatar_url,
      commentId: replyData.id,
      commentContent: replyData.content,
      creationId: replyData.creationId,
      url: `/creations/${replyData.creationId}?comment=${replyData.id}`,
    });
  } catch (error) {
    console.warn('Failed to create reply notification:', error);
  }
}

/**
 * Create a follow notification
 *
 * @param supabase - Supabase client instance
 * @param followedUserId - User being followed
 * @param actorId - User who followed
 */
export async function notifyFollow(
  supabase: SupabaseClient,
  followedUserId: string,
  actorId: string
): Promise<void> {
  try {
    const { data: actor } = await supabase
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', actorId)
      .single();

    await createNotification(supabase, followedUserId, NotificationType.FOLLOW, {
      actorId,
      actorUsername: actor?.username,
      actorAvatar: actor?.avatar_url,
      url: `/profile/${actor?.username}`,
    });
  } catch (error) {
    console.warn('Failed to create follow notification:', error);
  }
}

/**
 * Create a bond level up notification
 *
 * @param supabase - Supabase client instance
 * @param userId - User to notify
 * @param luminorData - Luminor information
 */
export async function notifyBondLevelUp(
  supabase: SupabaseClient,
  userId: string,
  luminorData: { id: string; name: string; bondLevel: number }
): Promise<void> {
  try {
    await createNotification(supabase, userId, NotificationType.BOND_LEVEL_UP, {
      luminorId: luminorData.id,
      luminorName: luminorData.name,
      bondLevel: luminorData.bondLevel,
      url: `/luminors/${luminorData.id}`,
    });
  } catch (error) {
    console.warn('Failed to create bond level up notification:', error);
  }
}

// =====================================================================
// HELPER FUNCTIONS
// =====================================================================

/**
 * Transform database notification to API notification format
 *
 * @param data - Raw notification data from database
 * @returns Transformed notification
 */
function transformNotification(data: any): Notification {
  return {
    id: data.id,
    userId: data.user_id,
    type: data.type,
    data: data.data,
    isRead: data.is_read,
    createdAt: data.created_at,
  };
}
