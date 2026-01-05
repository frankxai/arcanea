/**
 * Notification Service - Web App Wrapper
 *
 * Wraps database service for user notifications
 */

import {
  getNotifications as dbGetNotifications,
  markAsRead,
  markAllAsRead as dbMarkAllAsRead,
} from '@/lib/database/services/notification-service';

export interface NotificationOptions {
  page?: number;
  pageSize?: number;
}

export async function getNotifications(userId: string, options: NotificationOptions = {}) {
  const { page = 1, pageSize = 20 } = options;

  // Stub returns array, we add pagination wrapper
  const notifications = await dbGetNotifications(userId);

  // Manual pagination over stub results
  const start = (page - 1) * pageSize;
  const paginatedNotifications = notifications.slice(start, start + pageSize);

  return {
    notifications: paginatedNotifications,
    pagination: {
      page,
      pageSize,
      total: notifications.length,
      hasMore: start + pageSize < notifications.length,
    },
  };
}

export async function getUserNotifications(userId: string, options: NotificationOptions = {}) {
  return getNotifications(userId, options);
}

export async function markNotificationAsRead(notificationId: string, _userId: string) {
  await markAsRead(notificationId);
  return { success: true };
}

export async function markAllAsRead(userId: string) {
  await dbMarkAllAsRead(userId);
  return { success: true };
}
