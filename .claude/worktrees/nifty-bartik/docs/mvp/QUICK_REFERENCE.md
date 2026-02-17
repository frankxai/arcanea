# Arcanea MVP Database - Quick Reference Guide

Quick reference for common database operations in the Arcanea MVP.

---

## Table of Contents

1. [Authentication & Profiles](#authentication--profiles)
2. [Luminor Chat](#luminor-chat)
3. [Creations](#creations)
4. [Social Features](#social-features)
5. [Storage](#storage)
6. [Common Patterns](#common-patterns)

---

## Authentication & Profiles

### Sign Up New User

```typescript
// Sign up with email
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
  options: {
    data: {
      username: 'creator123',
      full_name: 'Jane Creator'
    }
  }
})

// Profile is auto-created via trigger
```

### Get Current User Profile

```typescript
const { data: profile, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()
```

### Update Profile

```typescript
const { data, error } = await supabase
  .from('profiles')
  .update({
    display_name: 'New Name',
    bio: 'I create amazing art',
    avatar_url: 'https://...'
  })
  .eq('id', userId)
```

### Get User Stats

```typescript
const { data: stats, error } = await supabase
  .rpc('get_user_stats', {
    p_user_id: userId
  })

// Returns: creation_count, total_likes, followers, etc.
```

---

## Luminor Chat

### Get All Luminors

```typescript
const { data: luminors, error } = await supabase
  .from('luminors')
  .select('*')
  .eq('is_active', true)
  .eq('is_public', true)
```

### Start Conversation

```typescript
const sessionId = crypto.randomUUID()

const { data: conversationId, error } = await supabase
  .rpc('get_or_create_conversation', {
    p_user_id: userId,
    p_luminor_id: luminorId,
    p_session_id: sessionId
  })
```

### Send Message

```typescript
const { data: messageId, error } = await supabase
  .rpc('add_message_to_conversation', {
    p_conversation_id: conversationId,
    p_user_id: userId,
    p_role: 'user',
    p_content: 'Hello, Lumina!',
    p_model: null,
    p_tokens: null
  })
```

### Get Conversation History

```typescript
const { data: messages, error } = await supabase
  .from('luminor_messages')
  .select('*')
  .eq('conversation_id', conversationId)
  .order('created_at', { ascending: true })
```

### Get User's Conversations

```typescript
const { data: conversations, error } = await supabase
  .from('luminor_conversations')
  .select(`
    *,
    luminor:luminors (
      id,
      name,
      color,
      avatar_url
    )
  `)
  .eq('user_id', userId)
  .eq('is_active', true)
  .order('last_message_at', { ascending: false })
```

### Get Bond Level

```typescript
const { data: relationship, error } = await supabase
  .from('luminor_relationships')
  .select('*')
  .eq('user_id', userId)
  .eq('luminor_id', luminorId)
  .single()

// Calculate progress
const xpRequired = Math.floor(100 * Math.pow(relationship.bond_level, 1.5))
const progress = (relationship.bond_xp / xpRequired) * 100
```

### Real-time Chat Updates

```typescript
const channel = supabase
  .channel('conversation')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'luminor_messages',
      filter: `conversation_id=eq.${conversationId}`
    },
    (payload) => {
      console.log('New message:', payload.new)
    }
  )
  .subscribe()
```

---

## Creations

### Create New Creation (Draft)

```typescript
const { data: creation, error } = await supabase
  .from('creations')
  .insert({
    user_id: userId,
    title: 'My Artwork',
    description: 'A beautiful landscape',
    type: 'image',
    file_url: 'https://storage/path/to/image.png',
    thumbnail_url: 'https://storage/path/to/thumb.jpg',
    ai_tool: 'midjourney',
    prompt: 'A serene mountain landscape at sunset',
    tags: ['landscape', 'sunset', 'mountains'],
    status: 'draft',
    is_public: false
  })
  .select()
  .single()
```

### Publish Creation

```typescript
const { data: success, error } = await supabase
  .rpc('publish_creation', {
    p_creation_id: creationId,
    p_user_id: userId
  })
```

### Get User's Creations

```typescript
const { data: creations, error } = await supabase
  .from('creations')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
```

### Get Public Creations (Discover Feed)

```typescript
const { data: creations, error } = await supabase
  .from('creations')
  .select(`
    *,
    profile:profiles (
      id,
      username,
      display_name,
      avatar_url
    )
  `)
  .eq('is_public', true)
  .eq('status', 'published')
  .order('created_at', { ascending: false })
  .range(0, 19) // Pagination: 20 items
```

### Search Creations

```typescript
const { data: results, error } = await supabase
  .rpc('search_creations', {
    p_query: 'dragon',
    p_type: 'image', // optional
    p_limit: 20,
    p_offset: 0
  })
```

### Get Single Creation with Details

```typescript
const { data: creation, error } = await supabase
  .from('creations')
  .select(`
    *,
    profile:profiles (
      id,
      username,
      display_name,
      avatar_url
    ),
    comments (
      id,
      content,
      created_at,
      profile:profiles (
        username,
        avatar_url
      )
    )
  `)
  .eq('id', creationId)
  .single()
```

### Increment View Count

```typescript
await supabase.rpc('increment_creation_views', {
  p_creation_id: creationId
})
```

---

## Social Features

### Like/Unlike Creation

```typescript
const { data: isLiked, error } = await supabase
  .rpc('toggle_like', {
    p_user_id: userId,
    p_creation_id: creationId
  })

// Returns: true if liked, false if unliked
```

### Check if User Liked Creation

```typescript
const { data: like, error } = await supabase
  .from('likes')
  .select('id')
  .eq('user_id', userId)
  .eq('creation_id', creationId)
  .single()

const hasLiked = !!like
```

### Add Comment

```typescript
const { data: comment, error } = await supabase
  .from('comments')
  .insert({
    user_id: userId,
    creation_id: creationId,
    content: 'Amazing work!',
    parent_comment_id: null // or parentId for reply
  })
  .select()
  .single()
```

### Get Comments for Creation

```typescript
const { data: comments, error } = await supabase
  .from('comments')
  .select(`
    *,
    profile:profiles (
      username,
      display_name,
      avatar_url
    )
  `)
  .eq('creation_id', creationId)
  .is('parent_comment_id', null) // Top-level only
  .order('created_at', { ascending: true })
```

### Follow User

```typescript
const { data: success, error } = await supabase
  .rpc('follow_user', {
    p_follower_id: currentUserId,
    p_following_id: targetUserId
  })
```

### Unfollow User

```typescript
const { data: success, error } = await supabase
  .rpc('unfollow_user', {
    p_follower_id: currentUserId,
    p_following_id: targetUserId
  })
```

### Get User's Followers

```typescript
const { data: followers, error } = await supabase
  .from('follows')
  .select(`
    follower:profiles!follower_id (
      id,
      username,
      display_name,
      avatar_url
    )
  `)
  .eq('following_id', userId)
```

### Get User's Following

```typescript
const { data: following, error } = await supabase
  .from('follows')
  .select(`
    following:profiles!following_id (
      id,
      username,
      display_name,
      avatar_url
    )
  `)
  .eq('follower_id', userId)
```

### Get Personalized Feed

```typescript
const { data: feed, error } = await supabase
  .rpc('get_user_feed', {
    p_user_id: userId,
    p_limit: 20,
    p_offset: 0
  })
```

---

## Storage

### Upload Avatar

```typescript
const file = event.target.files[0]
const fileExt = file.name.split('.').pop()
const fileName = `${userId}/avatar.${fileExt}`

const { data, error } = await supabase.storage
  .from('avatars')
  .upload(fileName, file, {
    upsert: true,
    contentType: file.type
  })

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(fileName)

// Update profile
await supabase
  .from('profiles')
  .update({ avatar_url: publicUrl })
  .eq('id', userId)
```

### Upload Creation File

```typescript
const file = event.target.files[0]
const fileExt = file.name.split('.').pop()
const fileName = `${userId}/images/${creationId}.${fileExt}`

const { data, error } = await supabase.storage
  .from('creations')
  .upload(fileName, file, {
    contentType: file.type
  })

// Get URL (signed for private, public for published)
const { data: { signedUrl } } = await supabase.storage
  .from('creations')
  .createSignedUrl(fileName, 3600) // 1 hour
```

### Upload Thumbnail

```typescript
const thumbnailBlob = await generateThumbnail(file)
const thumbFileName = `${userId}/${creationId}-thumb.jpg`

const { data, error } = await supabase.storage
  .from('thumbnails')
  .upload(thumbFileName, thumbnailBlob, {
    contentType: 'image/jpeg'
  })

const { data: { publicUrl } } = supabase.storage
  .from('thumbnails')
  .getPublicUrl(thumbFileName)
```

### Delete File

```typescript
const { error } = await supabase.storage
  .from('creations')
  .remove([fileName])
```

---

## Common Patterns

### Pagination

```typescript
const PAGE_SIZE = 20
const page = 0

const { data, error } = await supabase
  .from('creations')
  .select('*')
  .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)
```

### Infinite Scroll

```typescript
const [creations, setCreations] = useState([])
const [offset, setOffset] = useState(0)
const LIMIT = 20

const loadMore = async () => {
  const { data, error } = await supabase
    .from('creations')
    .select('*')
    .eq('is_public', true)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .range(offset, offset + LIMIT - 1)

  if (data) {
    setCreations([...creations, ...data])
    setOffset(offset + LIMIT)
  }
}
```

### Optimistic Updates

```typescript
// Optimistic like
const handleLike = async (creationId: string) => {
  // Update UI immediately
  setCreations(creations.map(c =>
    c.id === creationId
      ? { ...c, like_count: c.like_count + 1, user_has_liked: true }
      : c
  ))

  // Call API
  const { data, error } = await supabase
    .rpc('toggle_like', {
      p_user_id: userId,
      p_creation_id: creationId
    })

  // Revert on error
  if (error) {
    setCreations(creations.map(c =>
      c.id === creationId
        ? { ...c, like_count: c.like_count - 1, user_has_liked: false }
        : c
    ))
  }
}
```

### Real-time Subscriptions

```typescript
// Subscribe to new creations
const channel = supabase
  .channel('public-creations')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'creations',
      filter: 'is_public=eq.true'
    },
    (payload) => {
      setCreations([payload.new, ...creations])
    }
  )
  .subscribe()

// Cleanup
return () => {
  supabase.removeChannel(channel)
}
```

### Batch Operations

```typescript
// Batch insert multiple creations
const { data, error } = await supabase
  .from('creations')
  .insert([
    { user_id: userId, title: 'Creation 1', ... },
    { user_id: userId, title: 'Creation 2', ... },
    { user_id: userId, title: 'Creation 3', ... }
  ])
  .select()
```

### Error Handling

```typescript
const { data, error } = await supabase
  .from('creations')
  .select('*')
  .eq('id', creationId)
  .single()

if (error) {
  if (error.code === 'PGRST116') {
    // No rows returned
    console.error('Creation not found')
  } else if (error.code === '42501') {
    // Permission denied
    console.error('Access denied')
  } else {
    console.error('Database error:', error.message)
  }
}
```

### Transactions (via RPC)

```typescript
// Create custom function for atomic operations
CREATE OR REPLACE FUNCTION create_creation_with_notification(
  p_user_id UUID,
  p_title TEXT,
  p_file_url TEXT
) RETURNS UUID AS $$
DECLARE
  v_creation_id UUID;
BEGIN
  -- Insert creation
  INSERT INTO creations (user_id, title, file_url)
  VALUES (p_user_id, p_title, p_file_url)
  RETURNING id INTO v_creation_id;

  -- Create notification for followers
  INSERT INTO notifications (user_id, type, title, message)
  SELECT
    f.follower_id,
    'system_announcement',
    'New Creation',
    'Someone you follow posted a new creation'
  FROM follows f
  WHERE f.following_id = p_user_id;

  RETURN v_creation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

// Call from client
const { data, error } = await supabase
  .rpc('create_creation_with_notification', {
    p_user_id: userId,
    p_title: 'My Creation',
    p_file_url: 'https://...'
  })
```

---

## Performance Tips

### Use Select Sparingly

```typescript
// ❌ Bad - Fetches all columns
const { data } = await supabase
  .from('creations')
  .select('*')

// ✅ Good - Only fetch what you need
const { data } = await supabase
  .from('creations')
  .select('id, title, thumbnail_url, like_count')
```

### Use Indexes

All common query patterns are already indexed. If you add new query patterns, consider adding indexes:

```sql
CREATE INDEX idx_custom ON table_name(column_name);
```

### Use COUNT Efficiently

```typescript
// ❌ Bad - Fetches all rows then counts
const { data } = await supabase.from('creations').select('*')
const count = data.length

// ✅ Good - Count in database
const { count } = await supabase
  .from('creations')
  .select('*', { count: 'exact', head: true })
```

### Cache Static Data

```typescript
// Cache Luminors (they don't change often)
const luminors = useMemo(async () => {
  const { data } = await supabase
    .from('luminors')
    .select('*')
  return data
}, []) // Empty deps - only load once
```

---

## Debugging

### View Query Logs (Local)

```bash
supabase logs db
```

### Explain Query

```sql
EXPLAIN ANALYZE
SELECT * FROM creations WHERE user_id = 'abc123';
```

### Check RLS Policies

```sql
-- See all policies
SELECT * FROM pg_policies WHERE tablename = 'creations';

-- Test with specific user
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claim.sub TO 'user-uuid';
SELECT * FROM creations;
```

---

## Common Errors

| Error Code | Meaning | Solution |
|------------|---------|----------|
| `PGRST116` | No rows returned | Check if record exists |
| `42501` | Permission denied | Check RLS policies |
| `23505` | Unique violation | Record already exists |
| `23503` | Foreign key violation | Referenced record doesn't exist |
| `22P02` | Invalid UUID | Check UUID format |

---

**Quick Links:**
- [Full Schema Documentation](/docs/mvp/DATABASE_SCHEMA.md)
- [TypeScript Types](/docs/mvp/DATABASE_TYPES.ts)
- [Supabase README](/supabase/README.md)
