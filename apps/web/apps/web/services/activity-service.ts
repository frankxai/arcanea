/**
 * Activity Service
 *
 * Stub implementation - TODO: Implement full functionality
 */

export interface ActivityFeedOptions {
  page?: number;
  pageSize?: number;
}

export async function getPersonalizedFeed(
  userId: string,
  options: ActivityFeedOptions = {}
) {
  console.warn('activity-service.getPersonalizedFeed not yet implemented - returning empty feed');

  const { page = 1, pageSize = 20 } = options;

  return {
    activities: [],
    pagination: {
      page,
      pageSize,
      total: 0,
      hasMore: false,
    },
  };
}
