---
name: Supabase Patterns
description: Database patterns and RLS policies
---

# Supabase Patterns Skill

## Purpose
Database patterns, RLS policies, and Supabase best practices.

## RLS Policy Template
```sql
-- Read: Users can read their own data
CREATE POLICY "Users read own data"
  ON table_name FOR SELECT
  USING (auth.uid() = user_id);

-- Write: Users can insert their own data
CREATE POLICY "Users insert own data"
  ON table_name FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admin: Service role bypasses RLS
-- (handled automatically by Supabase)
```

## Auth Pattern
```typescript
import { createClient } from '@/lib/supabase/server';

export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
```

## Realtime Pattern
```typescript
const channel = supabase
  .channel('room:123')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'messages' },
    (payload) => handleChange(payload)
  )
  .subscribe();
```

## Conventions
- Every table has RLS enabled (no exceptions)
- Use generated types from `supabase gen types typescript`
- Prefer `supabase.rpc()` for complex queries
- Use Edge Functions for server-side logic
- Migrations in `supabase/migrations/` with timestamps