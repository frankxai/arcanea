import { createClient } from '@supabase/supabase-js';

export class LikeService {
  constructor(private supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)) {}

  async toggleLike(userId: string, creationId: string): Promise<boolean> {
    // Check if liked
    const { data: existing } = await this.supabase
      .from('likes')
      .select('id')
      .eq('user_id', userId)
      .eq('creation_id', creationId)
      .single();

    if (existing) {
      await this.supabase
        .from('likes')
        .delete()
        .eq('user_id', userId)
        .eq('creation_id', creationId);
      return false; // unliked
    } else {
      await this.supabase.from('likes').insert({
        user_id: userId,
        creation_id: creationId,
      });
      return true; // liked
    }
  }

  async getLikeCount(creationId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('creation_id', creationId);

    if (error) throw error;
    return count || 0;
  }
}
