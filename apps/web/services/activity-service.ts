// Activity Service - Stub Implementation
export async function getActivityFeed(userId: string, limit: number = 20) {
  console.warn('getActivityFeed not yet implemented - returning mock data');
  return {
    activities: [],
    hasMore: false
  };
}

export async function getFollowingActivity(userId: string, limit: number = 20) {
  console.warn('getFollowingActivity not yet implemented - returning mock data');
  return {
    activities: [],
    hasMore: false
  };
}

export async function markActivitySeen(userId: string, activityId: string) {
  console.warn('markActivitySeen not yet implemented');
  return { success: true };
}
