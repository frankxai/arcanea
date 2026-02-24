import { createClient } from '@supabase/supabase-js';

export type Activity = {
  id: string;
  user_id: string;
  type: 'creation' | 'comment' | 'like' | 'follow' | 'achievement';
  data: Record<string, any>;
  created_at: string;
};

export class ActivityService {
  constructor(private supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)) {}

  async getFeed(userId: string, limit = 20, offset = 0): Promise<Activity[]> {
    const { data, error } = await this.supabase
      .from('activities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data as Activity[];
  }

  async logActivity(userId: string, type: Activity['type'], metadata: Record<string, any>) {
    const { error } = await this.supabase.from('activities').insert({
      user_id: userId,
      type,
      data: metadata,
    });
    if (error) throw error;
  }
}
