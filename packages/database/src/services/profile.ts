import { createClient } from '@supabase/supabase-js';

export type Profile = {
  id: string;
  username: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  website?: string;
};

export class ProfileService {
  constructor(private supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)) {}

  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data as Profile;
  }

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { error } = await this.supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
    if (error) throw error;
  }
}
