/**
 * Notification Service
 * 
 * Stub implementation - TODO: Implement full functionality
 */

export interface NotificationOptions {
  page?: number;
  pageSize?: number;
}

export async function getNotifications(userId: string, options: NotificationOptions = {}) {
  console.warn('notification-service.getNotifications not yet implemented');
  const { page = 1, pageSize = 20 } = options;

  return {
    notifications: [],
    pagination: {
      page,
      pageSize,
      total: 0,
      hasMore: false,
    },
  };
}

export async function getUserNotifications(userId: string, options: NotificationOptions = {}) {
  return getNotifications(userId, options);
}

export async function markNotificationAsRead(notificationId: string, userId: string) {
  console.warn('notification-service.markNotificationAsRead not yet implemented');
  return { success: true };
}

export async function markAllAsRead(userId: string) {
  console.warn('notification-service.markAllAsRead not yet implemented');
  return { success: true };
}
