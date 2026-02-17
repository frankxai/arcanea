# Supabase Integration - Quick Reference

**Last Updated**: 2026-02-02

---

## Client Usage

### Server Components / API Routes
```typescript
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.from('creations').select('*');
  // ...
}
```

### Client Components
```typescript
'use client';
import { createClient } from '@/lib/supabase/client';

export function MyComponent() {
  const supabase = createClient();
  // ...
}
```

### Admin Operations
```typescript
import { createAdminClient } from '@/lib/supabase/server';

export async function adminFunction() {
  const supabase = createAdminClient(); // Bypasses RLS
  // ...
}
```

---

## Error Handling

```typescript
import { handleSupabaseError, ServiceError } from '@/lib/database/errors';

export async function myService(client: SupabaseClient) {
  const { data, error } = await client.from('users').select('*');

  if (error) {
    handleSupabaseError(error, 'myService context');
  }

  return data;
}
```

---

## Service Pattern

```typescript
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';
import { handleSupabaseError } from '../errors';

export async function getItem(
  client: SupabaseClient<Database>,
  id: string
) {
  const { data, error } = await client
    .from('items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    handleSupabaseError(error, 'getItem');
  }

  return data;
}
```

---

## Common Queries

### Select with Joins
```typescript
const { data } = await supabase
  .from('creations')
  .select(`
    *,
    user:profiles!user_id (username, avatar_url),
    likes:likes(count)
  `)
  .eq('visibility', 'public');
```

### Insert with Return
```typescript
const { data, error } = await supabase
  .from('creations')
  .insert({ title: 'New Creation', user_id: userId })
  .select()
  .single();
```

### Update with Conditions
```typescript
const { error } = await supabase
  .from('profiles')
  .update({ display_name: 'New Name' })
  .eq('id', userId);
```

### Delete with RLS
```typescript
const { error } = await supabase
  .from('creations')
  .delete()
  .eq('id', creationId);
  // RLS ensures user can only delete their own
```

### Call Database Function
```typescript
const { error } = await supabase.rpc('increment_like_count', {
  target_id: creationId
});
```

---

## RLS Testing

```sql
-- Test as authenticated user
SET ROLE authenticated;
SET request.jwt.claims.sub = 'user-uuid-here';

SELECT * FROM creations;
INSERT INTO creations (...) VALUES (...);

-- Reset
RESET ROLE;
```

---

## Type Generation

```bash
# From remote
npx supabase gen types typescript --project-id <id> > lib/database/types/supabase.ts

# From local
npx supabase gen types typescript --local > lib/database/types/supabase.ts
```

---

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... # Server-side only
```

---

## Files Structure

```
apps/web/lib/
├── supabase/
│   ├── server.ts      # Server client
│   ├── client.ts      # Browser client
│   └── middleware.ts  # Session refresh
├── database/
│   ├── errors.ts      # Error handling
│   ├── types/
│   │   └── supabase.ts  # Generated types
│   └── services/
│       ├── like-service.ts
│       ├── comment-service.ts
│       └── ...
└── auth/
    ├── context.tsx    # Auth provider
    └── middleware.ts  # Auth helpers
```

---

## Troubleshooting

### "Module not found: @supabase/ssr"
```bash
npm install @supabase/ssr
```

### "cookies() can only be used in Server Components"
You're trying to use server client in a client component. Use `@/lib/supabase/client` instead.

### "Session not found"
Ensure middleware is configured in root `middleware.ts`.

### "Permission denied"
Check RLS policies for the table you're accessing.

---

## Performance Tips

1. **Use select() with specific columns** instead of `select('*')`
2. **Batch operations** when possible (getBatchLikeCounts)
3. **Use database functions** for complex operations
4. **Add indexes** for commonly filtered columns
5. **Cache read-heavy queries** with unstable_cache

---

## Security Checklist

- [ ] RLS enabled on all tables
- [ ] Environment variables not committed
- [ ] Service role key only used server-side
- [ ] User input validated with Zod
- [ ] Error messages don't expose sensitive data
- [ ] Rate limiting on API routes

---

**Full Documentation**:
- Technical Review: `SUPABASE_INTEGRATION_REVIEW.md`
- Fix Instructions: `SUPABASE_FIX_INSTRUCTIONS.md`
- Summary: `SUPABASE_REVIEW_SUMMARY.md`
