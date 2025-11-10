# Arcanea MVP Database - Verification Checklist

Use this checklist to verify the database setup is complete and working correctly.

---

## 📋 Pre-Deployment Checklist

### ✅ Files Created

- [x] `/supabase/migrations/20250101000001_initial_schema.sql` (19KB)
- [x] `/supabase/migrations/20250101000002_rls_policies.sql` (12KB)
- [x] `/supabase/migrations/20250101000003_storage_buckets.sql` (7KB)
- [x] `/supabase/migrations/20250101000004_utility_functions.sql` (15KB)
- [x] `/supabase/config.toml` (2KB)
- [x] `/supabase/README.md` (7KB)
- [x] `/docs/mvp/DATABASE_SCHEMA.md` (24KB)
- [x] `/docs/mvp/DATABASE_TYPES.ts` (15KB)
- [x] `/docs/mvp/QUICK_REFERENCE.md` (16KB)
- [x] `/docs/mvp/SETUP_GUIDE.md` (11KB)
- [x] `/DATABASE_DESIGN_SUMMARY.md` (This checklist's parent)

**Total: 11 files, ~130KB of documentation and migrations**

---

## 🗄️ Database Structure Verification

### Tables Created

Run after migrations:

```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

Expected tables:
- [ ] comments
- [ ] creations
- [ ] follows
- [ ] likes
- [ ] luminor_conversations
- [ ] luminor_messages
- [ ] luminor_relationships
- [ ] luminors
- [ ] notifications
- [ ] profiles

**Total: 10 tables**

### Default Data

```sql
SELECT name, slug, specialty FROM luminors;
```

Expected Luminors:
- [ ] Lumina (lumina) - Visual Creation
- [ ] Harmonix (harmonix) - Music & Audio
- [ ] Kinetix (kinetix) - Video & Animation

### Indexes Verification

```sql
SELECT tablename, indexname
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

Expected: ~30 indexes across all tables

### Triggers Verification

```sql
SELECT trigger_name, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;
```

Expected triggers:
- [ ] on_auth_user_created (auth.users)
- [ ] update_profiles_updated_at
- [ ] update_luminors_updated_at
- [ ] update_conversations_updated_at
- [ ] update_relationships_updated_at
- [ ] update_creations_updated_at
- [ ] update_comments_updated_at
- [ ] after_creation_insert
- [ ] after_like_change
- [ ] after_comment_change
- [ ] after_follow_change

### Functions Verification

```sql
SELECT routine_name
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_type = 'FUNCTION'
ORDER BY routine_name;
```

Expected functions:
- [ ] add_key_memory
- [ ] add_message_to_conversation
- [ ] archive_creation
- [ ] check_bond_level_up
- [ ] follow_user
- [ ] generate_arcanean_id
- [ ] generate_unique_filename
- [ ] get_file_extension
- [ ] get_or_create_conversation
- [ ] get_user_feed
- [ ] get_user_stats
- [ ] handle_new_user
- [ ] increment_creation_views
- [ ] is_creation_owner
- [ ] is_creation_public
- [ ] mark_all_notifications_read
- [ ] mark_notification_read
- [ ] publish_creation
- [ ] search_creations
- [ ] set_arcanean_id
- [ ] toggle_like
- [ ] unfollow_user
- [ ] update_creation_comment_count
- [ ] update_creation_like_count
- [ ] update_follower_counts
- [ ] update_last_active
- [ ] update_updated_at_column
- [ ] validate_file_size

**Total: ~28 functions**

---

## 🔐 Security Verification

### RLS Enabled

```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

All tables should have: `rowsecurity = true`

### RLS Policies

```sql
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

Expected: ~40 policies across all tables

### Test User Isolation

1. Create two test users via Supabase Studio
2. Sign in as User A
3. Try to access User B's data:

```typescript
// Should return empty or error
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userBId)
```

Expected: Error or empty result (not User B's data)

### Test Public Access

```typescript
// Should work for anonymous users
const { data } = await supabase
  .from('creations')
  .select('*')
  .eq('is_public', true)
  .eq('status', 'published')
  .limit(10)
```

Expected: Returns public creations

---

## 💾 Storage Verification

### Buckets Created

```sql
SELECT id, name, public
FROM storage.buckets
ORDER BY name;
```

Expected buckets:
- [ ] avatars (public = true)
- [ ] creations (public = false)
- [ ] thumbnails (public = true)

### Storage Policies

```sql
SELECT bucket_id, name, definition
FROM storage.policies
ORDER BY bucket_id, name;
```

Expected: ~15 storage policies (5 per bucket: SELECT, INSERT, UPDATE, DELETE, +custom)

### Test File Upload

```typescript
// Test avatar upload
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${userId}/test.png`, fileBlob)
```

Expected: Success

### Test File Download

```typescript
// Test public URL
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl(`${userId}/test.png`)
```

Expected: Valid URL returned

---

## 🧪 Functional Tests

### 1. User Signup Flow

```typescript
// Sign up
const { data: auth, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'password123'
})

// Check profile auto-created
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', auth.user.id)
  .single()

// Verify arcanean_id generated
console.assert(profile.arcanean_id.startsWith('ARC-'))
```

### 2. Conversation Flow

```typescript
// Get Lumina
const { data: lumina } = await supabase
  .from('luminors')
  .select('id')
  .eq('slug', 'lumina')
  .single()

// Create conversation
const { data: convId } = await supabase.rpc('get_or_create_conversation', {
  p_user_id: userId,
  p_luminor_id: lumina.id,
  p_session_id: crypto.randomUUID()
})

console.assert(convId !== null)

// Send message
const { data: msgId } = await supabase.rpc('add_message_to_conversation', {
  p_conversation_id: convId,
  p_user_id: userId,
  p_role: 'user',
  p_content: 'Hello!'
})

console.assert(msgId !== null)

// Check bond level updated
const { data: relationship } = await supabase
  .from('luminor_relationships')
  .select('bond_xp, total_interactions')
  .eq('user_id', userId)
  .eq('luminor_id', lumina.id)
  .single()

console.assert(relationship.bond_xp === 10)
console.assert(relationship.total_interactions === 1)
```

### 3. Creation Flow

```typescript
// Create draft
const { data: creation } = await supabase
  .from('creations')
  .insert({
    user_id: userId,
    title: 'Test Creation',
    type: 'image',
    file_url: 'https://example.com/image.png',
    status: 'draft'
  })
  .select()
  .single()

console.assert(creation.status === 'draft')

// Publish
const { data: success } = await supabase.rpc('publish_creation', {
  p_creation_id: creation.id,
  p_user_id: userId
})

console.assert(success === true)

// Verify published
const { data: published } = await supabase
  .from('creations')
  .select('status, is_public, published_at')
  .eq('id', creation.id)
  .single()

console.assert(published.status === 'published')
console.assert(published.is_public === true)
console.assert(published.published_at !== null)
```

### 4. Social Flow

```typescript
// Like creation
const { data: isLiked } = await supabase.rpc('toggle_like', {
  p_user_id: userId,
  p_creation_id: creationId
})

console.assert(isLiked === true)

// Check like count incremented
const { data: creation } = await supabase
  .from('creations')
  .select('like_count')
  .eq('id', creationId)
  .single()

console.assert(creation.like_count === 1)

// Unlike
const { data: isLiked2 } = await supabase.rpc('toggle_like', {
  p_user_id: userId,
  p_creation_id: creationId
})

console.assert(isLiked2 === false)

// Add comment
const { data: comment } = await supabase
  .from('comments')
  .insert({
    user_id: userId,
    creation_id: creationId,
    content: 'Great work!'
  })
  .select()
  .single()

console.assert(comment !== null)

// Check comment count incremented
const { data: creation2 } = await supabase
  .from('creations')
  .select('comment_count')
  .eq('id', creationId)
  .single()

console.assert(creation2.comment_count === 1)
```

### 5. Follow Flow

```typescript
// Follow user
const { data: followed } = await supabase.rpc('follow_user', {
  p_follower_id: userId,
  p_following_id: targetUserId
})

console.assert(followed === true)

// Check follower count
const { data: target } = await supabase
  .from('profiles')
  .select('follower_count')
  .eq('id', targetUserId)
  .single()

console.assert(target.follower_count === 1)

// Unfollow
const { data: unfollowed } = await supabase.rpc('unfollow_user', {
  p_follower_id: userId,
  p_following_id: targetUserId
})

console.assert(unfollowed === true)
```

---

## 📊 Performance Tests

### Query Performance

Run these and verify response time < 100ms:

```sql
-- Profile lookup
EXPLAIN ANALYZE
SELECT * FROM profiles WHERE id = 'test-uuid';

-- Conversation history
EXPLAIN ANALYZE
SELECT * FROM luminor_messages
WHERE conversation_id = 'test-uuid'
ORDER BY created_at DESC
LIMIT 50;

-- Public creations
EXPLAIN ANALYZE
SELECT * FROM creations
WHERE is_public = true AND status = 'published'
ORDER BY created_at DESC
LIMIT 20;

-- Search
EXPLAIN ANALYZE
SELECT * FROM creations
WHERE 'dragon' = ANY(tags)
AND is_public = true
LIMIT 20;
```

Expected: All queries < 100ms with indexes

### Load Test

Create test data:

```sql
-- Insert 1000 test creations
DO $$
BEGIN
  FOR i IN 1..1000 LOOP
    INSERT INTO creations (
      user_id, title, type, file_url, status, is_public
    ) VALUES (
      'test-user-id',
      'Creation ' || i,
      'image',
      'https://example.com/' || i || '.png',
      'published',
      true
    );
  END LOOP;
END $$;
```

Then test query performance with larger dataset.

---

## 🔄 Real-time Tests

### Subscribe to Changes

```typescript
// Subscribe to new creations
const channel = supabase
  .channel('test-creations')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'creations',
      filter: 'is_public=eq.true'
    },
    (payload) => {
      console.log('New creation:', payload.new)
    }
  )
  .subscribe()

// Create a creation in another tab/client
// Verify the subscription fires
```

---

## 📝 Documentation Verification

### All Files Exist

- [ ] Database schema documentation
- [ ] TypeScript types
- [ ] Quick reference guide
- [ ] Setup guide
- [ ] Supabase README
- [ ] Config file

### Documentation Accuracy

- [ ] All tables documented
- [ ] All functions documented
- [ ] All RLS policies explained
- [ ] Examples are runnable
- [ ] No broken links

---

## 🚀 Production Readiness

### Environment Variables Set

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (server only!)
- [ ] `DATABASE_URL` (if using direct connection)

### Auth Configuration

- [ ] Email provider enabled
- [ ] OAuth providers configured (optional)
- [ ] Redirect URLs added
- [ ] Email templates configured

### Monitoring Setup

- [ ] Supabase logs reviewed
- [ ] Slow query monitoring enabled
- [ ] Storage usage monitoring
- [ ] Error tracking (Sentry, etc.)

### Backup Strategy

- [ ] Automatic backups enabled
- [ ] Backup schedule configured
- [ ] Restore procedure tested

### Security Audit

- [ ] RLS policies reviewed
- [ ] Storage policies reviewed
- [ ] Service role key secured
- [ ] CORS configured correctly
- [ ] Rate limiting implemented

---

## ✅ Final Verification

Run this SQL to verify everything:

```sql
-- Table count
SELECT COUNT(*) as table_count FROM information_schema.tables
WHERE table_schema = 'public';
-- Expected: 10

-- Index count
SELECT COUNT(*) as index_count FROM pg_indexes
WHERE schemaname = 'public';
-- Expected: ~30

-- Function count
SELECT COUNT(*) as function_count FROM information_schema.routines
WHERE routine_schema = 'public' AND routine_type = 'FUNCTION';
-- Expected: ~28

-- RLS enabled count
SELECT COUNT(*) as rls_enabled FROM pg_tables
WHERE schemaname = 'public' AND rowsecurity = true;
-- Expected: 10

-- Policy count
SELECT COUNT(*) as policy_count FROM pg_policies
WHERE schemaname = 'public';
-- Expected: ~40

-- Luminor count
SELECT COUNT(*) as luminor_count FROM luminors;
-- Expected: 3

-- Storage bucket count
SELECT COUNT(*) as bucket_count FROM storage.buckets;
-- Expected: 3
```

---

## 🎉 Success Criteria

Database is ready when:

- ✅ All migrations applied successfully
- ✅ All tables exist with correct schema
- ✅ Default Luminors created
- ✅ All indexes created
- ✅ All triggers working
- ✅ All functions created
- ✅ RLS enabled on all tables
- ✅ All RLS policies active
- ✅ Storage buckets created
- ✅ Storage policies working
- ✅ User signup creates profile
- ✅ Conversation flow works
- ✅ Creation flow works
- ✅ Social features work
- ✅ Real-time updates work
- ✅ Performance acceptable
- ✅ Documentation complete

---

**If all checks pass, your database is ready for production! 🚀**
