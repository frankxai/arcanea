import { createClient } from '@supabase/supabase-js';

export type Comment = {
  id: string;
  user_id: string;
  creation_id: string;
  content: string;
  parent_id?: string;
  created_at: string;
};

export class CommentService {
  constructor(private supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)) {}

  async getComments(creationId: string): Promise<Comment[]> {
    const { data, error } = await this.supabase
      .from('comments')
      .select('*')
      .eq('creation_id', creationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as Comment[];
  }

  async addComment(userId: string, creationId: string, content: string, parentId?: string) {
    const { error } = await this.supabase.from('comments').insert({
      user_id: userId,
      creation_id: creationId,
      content,
      parent_id: parentId,
    });
    if (error) throw error;
  }
}
