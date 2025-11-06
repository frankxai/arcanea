// Notification Service - Stub Implementation
export async function createNotification(data: {
  userId: string;
  type: string;
  content: any;
}) {
  console.warn('createNotification not yet implemented - returning mock data');
  return {
    id: 'mock-notification-id',
    ...data,
    read: false,
    createdAt: new Date().toISOString()
  };
}

export async function getNotifications(userId: string) {
  console.warn('getNotifications not yet implemented - returning empty array');
  return [];
}

export async function markAsRead(notificationId: string) {
  console.warn('markAsRead not yet implemented');
  return { success: true };
}

export async function markAllAsRead(userId: string) {
  console.warn('markAllAsRead not yet implemented');
  return { success: true };
}

export async function getUnreadCount(userId: string) {
  console.warn('getUnreadCount not yet implemented - returning 0');
  return 0;
}
