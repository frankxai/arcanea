// Notification Service - Stub implementation
import type { Notification } from '../types/api-responses'

export async function getNotifications(userId: string): Promise<Notification[]> {
  return []
}

export async function markAsRead(notificationId: string): Promise<boolean> {
  return true
}

export async function markAllAsRead(userId: string): Promise<boolean> {
  return true
}

export async function createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification | null> {
  return null
}

export async function deleteNotification(notificationId: string): Promise<boolean> {
  return true
}
