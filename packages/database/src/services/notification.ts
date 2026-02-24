import { createClient } from '@supabase/supabase-js';

export type Notification = {
  id: string;
  user_id: string;
  type: 'follow' | 'like' | 'comment' | 'mention';
  actor_id: string;
  resource_id?: string;
  read: boolean;
  created_at: string;
};

export class NotificationService {
  constructor(private supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)) {}

  async getNotifications(userId: string, limit = 20): Promise<Notification[]> {
    const { data, error } = await this.supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as Notification[];
  }

  async markRead(notificationId: string) {
    const { error } = await this.supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);
    if (error) throw error;
  }
}
