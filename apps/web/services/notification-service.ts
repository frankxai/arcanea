/**
 * Notification Service - Web App Wrapper
 *
 * Wraps database service with Supabase client injection
 */

import { supabaseServer } from '@/lib/supabase';
import {
  getNotifications as dbGetNotifications,
  markNotificationAsRead as dbMarkNotificationAsRead,
  markAllNotificationsAsRead as dbMarkAllNotificationsAsRead,
} from '@/lib/database/services/notification-service';

export interface NotificationOptions {
  page?: number;
  pageSize?: number;
}

export async function getNotifications(userId: string, options: NotificationOptions = {}) {
  const { page = 1, pageSize = 20 } = options;

  const result = await dbGetNotifications(supabaseServer, userId, {
    page,
    pageSize,
  });

  return {
    notifications: result.notifications,
    pagination: {
      page: result.pagination.page,
      pageSize: result.pagination.pageSize,
      total: result.pagination.totalCount,
      hasMore: result.pagination.hasMore,
    },
  };
}

export async function getUserNotifications(userId: string, options: NotificationOptions = {}) {
  return getNotifications(userId, options);
}

export async function markNotificationAsRead(notificationId: string, userId: string) {
  await dbMarkNotificationAsRead(supabaseServer, notificationId);
  return { success: true };
}

export async function markAllAsRead(userId: string) {
  await dbMarkAllNotificationsAsRead(supabaseServer, userId);
  return { success: true };
}
