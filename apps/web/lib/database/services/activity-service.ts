// Activity Service - Stub implementation
import type { Activity } from '../types/api-responses'
import type { SupabaseClient } from '@supabase/supabase-js'

export interface ActivityFeedResult {
  activities: Activity[]
  pagination: {
    page: number
    pageSize: number
    totalCount: number
    hasMore: boolean
  }
}

export interface ActivityFeedOptions {
  page?: number
  pageSize?: number
}

export async function getActivityFeed(
  _supabase: SupabaseClient,
  _userId: string,
  options: ActivityFeedOptions = {}
): Promise<ActivityFeedResult> {
  const { page = 1, pageSize = 20 } = options

  // Stub implementation - returns empty feed
  return {
    activities: [],
    pagination: {
      page,
      pageSize,
      totalCount: 0,
      hasMore: false,
    },
  }
}

export async function getUserActivity(_userId: string, _limit = 20): Promise<Activity[]> {
  return []
}

export async function createActivity(_activity: Omit<Activity, 'id' | 'createdAt'>): Promise<Activity | null> {
  return null
}
