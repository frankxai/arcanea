// Activity Service - Stub implementation
import type { Activity } from '../types/api-responses'

export async function getActivityFeed(userId: string, limit = 20): Promise<Activity[]> {
  return []
}

export async function getUserActivity(userId: string, limit = 20): Promise<Activity[]> {
  return []
}

export async function createActivity(activity: Omit<Activity, 'id' | 'createdAt'>): Promise<Activity | null> {
  return null
}
