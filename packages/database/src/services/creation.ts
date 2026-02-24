import { createClient } from '@supabase/supabase-js';

export type Creation = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  type: 'image' | 'video' | 'text' | 'music';
  url: string;
  thumbnail_url?: string;
  created_at: string;
};

export class CreationService {
  constructor(private supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)) {}

  async getCreation(id: string): Promise<Creation | null> {
    const { data, error } = await this.supabase
      .from('creations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Creation;
  }

  async create(creation: Omit<Creation, 'id' | 'created_at'>): Promise<Creation> {
    const { data, error } = await this.supabase
      .from('creations')
      .insert(creation)
      .select()
      .single();

    if (error) throw error;
    return data as Creation;
  }
}
