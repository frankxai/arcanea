/**
 * Activity Service - Web App Wrapper
 *
 * Wraps database service with Supabase client injection
 */

import { supabaseServer } from '@/lib/supabase';
import { getActivityFeed as dbGetActivityFeed } from '@/lib/database/services/activity-service';

export interface ActivityFeedOptions {
  page?: number;
  pageSize?: number;
}

export interface PersonalizedFeedResult {
  activities: Array<{
    id: string;
    type: string;
    userId: string;
    targetId?: string;
    targetType?: string;
    metadata?: Record<string, unknown>;
    createdAt: string;
  }>;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
}

export async function getPersonalizedFeed(
  userId: string,
  options: ActivityFeedOptions = {}
): Promise<PersonalizedFeedResult> {
  const { page = 1, pageSize = 20 } = options;

  const result = await dbGetActivityFeed(supabaseServer, userId, {
    page,
    pageSize,
  });

  return {
    activities: result.activities,
    pagination: {
      page: result.pagination.page,
      pageSize: result.pagination.pageSize,
      total: result.pagination.totalCount,
      hasMore: result.pagination.hasMore,
    },
  };
}
