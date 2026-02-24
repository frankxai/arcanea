import { createClient } from '@supabase/supabase-js';

export class FollowService {
  constructor(private supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)) {}

  async follow(followerId: string, followingId: string) {
    const { error } = await this.supabase.from('follows').insert({
      follower_id: followerId,
      following_id: followingId,
    });
    if (error) throw error;
  }

  async unfollow(followerId: string, followingId: string) {
    const { error } = await this.supabase
      .from('follows')
      .delete()
      .eq('follower_id', followerId)
      .eq('following_id', followingId);
    if (error) throw error;
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const { count, error } = await this.supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('follower_id', followerId)
      .eq('following_id', followingId);

    if (error) throw error;
    return (count || 0) > 0;
  }
}
