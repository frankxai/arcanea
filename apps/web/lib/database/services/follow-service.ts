// Follow Service - Stub implementation

export interface Follow {
  id: string
  followerId: string
  followingId: string
  createdAt: string
}

export async function toggleFollow(followerId: string, followingId: string): Promise<{ following: boolean }> {
  return { following: false }
}

export async function getFollowStatus(followerId: string, followingId: string): Promise<boolean> {
  return false
}

export async function getFollowers(userId: string): Promise<string[]> {
  return []
}

export async function getFollowing(userId: string): Promise<string[]> {
  return []
}

export async function getFollowersCount(userId: string): Promise<number> {
  return 0
}

export async function getFollowingCount(userId: string): Promise<number> {
  return 0
}
