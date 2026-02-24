import { createClient } from '@supabase/supabase-js';

export type Bond = {
  id: string;
  user_id: string;
  luminor_id: string;
  level: number;
  xp: number;
  last_interaction: string;
};

export class BondService {
  constructor(private supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)) {}

  async getBond(userId: string, luminorId: string): Promise<Bond | null> {
    const { data, error } = await this.supabase
      .from('bonds')
      .select('*')
      .eq('user_id', userId)
      .eq('luminor_id', luminorId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data as Bond;
  }

  async addXP(userId: string, luminorId: string, amount: number) {
    // Logic to fetch current bond, calculate new level, and update
    // Simplified for MVP
    const { error } = await this.supabase.rpc('add_bond_xp', {
      p_user_id: userId,
      p_luminor_id: luminorId,
      p_amount: amount
    });
    if (error) throw error;
  }
}
