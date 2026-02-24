# Arcanea MVP Database Schema Documentation

**Version:** 1.0.0
**Database:** PostgreSQL (Supabase)
**Last Updated:** 2025-01-01

---

## Overview

The Arcanea MVP database is designed to support three core features:
1. **Chat with Luminors** - AI companions that guide creators
2. **Creation Management** - Store and share user-generated content
3. **Social Features** - Profiles, likes, comments, follows

The schema is optimized for rapid development while maintaining scalability and security through Row Level Security (RLS) policies.

---

## Entity-Relationship Diagram (Text-Based)

```
┌─────────────────┐
│   auth.users    │ (Supabase Auth)
│  (managed by    │
│   Supabase)     │
└────────┬────────┘
         │
         │ 1:1
         ▼
┌─────────────────┐       ┌──────────────────┐
│    profiles     │◄──────┤    luminors      │
│                 │ N:M   │                  │
│  - user info    │       │ - AI companions  │
│  - settings     │       │ - personality    │
│  - stats        │       │ - capabilities   │
└────┬────────────┘       └────────┬─────────┘
     │                              │
     │ 1:N                          │
     ▼                              │
┌─────────────────┐                 │
│   creations     │                 │
│                 │                 │
│  - images       │                 │
│  - videos       │                 │
│  - music        │                 │
│  - metadata     │                 │
└────┬────────────┘                 │
     │                              │
     │ 1:N                   1:N    │
     ├──────────┬──────────────┐    │
     ▼          ▼              ▼    ▼
┌────────┐ ┌─────────┐  ┌──────────────────────┐
│ likes  │ │comments │  │ luminor_conversations│
└────────┘ └─────────┘  │                      │
                        │  - chat sessions     │
                        └──────────┬───────────┘
                                   │ 1:N
                                   ▼
┌─────────────────┐       ┌──────────────────┐
│     follows     │       │ luminor_messages │
│                 │       │                  │
│  - social       │       │  - chat history  │
│    graph        │       └──────────────────┘
└─────────────────┘
     │                   ┌──────────────────────┐
     │                   │luminor_relationships │
     └───────────────────┤                      │
                         │  - bond level        │
                         │  - memories          │
                         │  - personality match │
                         └──────────────────────┘
```

---

## Core Tables

### 1. profiles

**Purpose:** Extended user profile data (extends Supabase Auth)

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | References auth.users(id) |
| username | TEXT | Unique username (lowercase) |
| display_name | TEXT | Display name for UI |
| avatar_url | TEXT | Profile picture URL |
| bio | TEXT | User biography |
| arcanean_id | TEXT | Unique ID (ARC-001234 format) |
| tier | TEXT | Subscription tier (explorer/creator/realm_builder) |
| subscription_status | TEXT | active/trialing/past_due/canceled/paused |
| stripe_customer_id | TEXT | Stripe customer reference |
| stripe_subscription_id | TEXT | Stripe subscription reference |
| preferences | JSONB | User preferences and settings |
| onboarding_completed | BOOLEAN | Onboarding status |
| onboarding_step | INTEGER | Current onboarding step |
| creation_count | INTEGER | Total published creations |
| follower_count | INTEGER | Number of followers |
| following_count | INTEGER | Number of following |
| is_active | BOOLEAN | Account active status |
| is_verified | BOOLEAN | Verified creator badge |
| created_at | TIMESTAMPTZ | Account creation time |
| updated_at | TIMESTAMPTZ | Last profile update |
| last_active_at | TIMESTAMPTZ | Last activity timestamp |

**Indexes:**
- `idx_profiles_username` on username
- `idx_profiles_arcanean_id` on arcanean_id
- `idx_profiles_tier` on tier
- `idx_profiles_created_at` on created_at (DESC)

**RLS Policies:**
- Users can view their own profile
- Public profiles viewable by everyone (for discovery)
- Users can update their own profile

---

### 2. luminors

**Purpose:** AI companions that guide creators through the platform

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Luminor identifier |
| name | TEXT | Luminor name (e.g., "Lumina") |
| slug | TEXT | URL-friendly slug |
| title | TEXT | Descriptive title (e.g., "The Vision Crafter") |
| specialty | TEXT | Area of expertise |
| color | TEXT | Brand color (hex) |
| avatar_url | TEXT | Profile picture URL |
| icon | TEXT | Icon identifier |
| personality | JSONB | Personality traits and style |
| system_prompt | TEXT | Base AI system prompt |
| greeting_message | TEXT | Initial greeting for users |
| expertise | TEXT[] | Array of expertise areas |
| ai_tools | TEXT[] | AI tools this Luminor uses |
| is_active | BOOLEAN | Active status |
| is_public | BOOLEAN | Public visibility |
| interaction_count | INTEGER | Total interactions |
| user_count | INTEGER | Unique users count |
| average_rating | DECIMAL | Average user rating |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Indexes:**
- `idx_luminors_slug` on slug
- `idx_luminors_active` on (is_active, is_public)

**Default Luminors:**
1. **Lumina** - The Vision Crafter (Visual Creation) - Blue #4444FF
2. **Harmonix** - The Sound Weaver (Music & Audio) - Pink #FF44AA
3. **Kinetix** - The Motion Master (Video & Animation) - Green #44FFAA

**RLS Policies:**
- Anyone can view active/public Luminors
- No direct user modifications (admin only)

---

### 3. luminor_conversations

**Purpose:** Chat sessions between users and Luminors

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Conversation identifier |
| user_id | UUID (FK) | References profiles(id) |
| luminor_id | UUID (FK) | References luminors(id) |
| title | TEXT | Conversation title |
| session_id | TEXT | Session identifier |
| context | JSONB | Current context (project, module, etc.) |
| is_active | BOOLEAN | Active conversation flag |
| is_archived | BOOLEAN | Archived status |
| message_count | INTEGER | Total messages |
| created_at | TIMESTAMPTZ | Session start time |
| updated_at | TIMESTAMPTZ | Last update time |
| last_message_at | TIMESTAMPTZ | Last message timestamp |

**Indexes:**
- `idx_conversations_user_id` on user_id
- `idx_conversations_luminor_id` on luminor_id
- `idx_conversations_session` on session_id
- `idx_conversations_active` on (user_id, is_active)

**RLS Policies:**
- Users can view their own conversations
- Users can create/update/delete their own conversations

---

### 4. luminor_messages

**Purpose:** Individual messages within conversations

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Message identifier |
| conversation_id | UUID (FK) | References luminor_conversations(id) |
| user_id | UUID (FK) | References profiles(id) |
| role | TEXT | user/assistant/system |
| content | TEXT | Message content |
| model | TEXT | AI model used (if assistant) |
| tokens | INTEGER | Token usage |
| cost | DECIMAL | Cost in USD |
| user_rating | INTEGER | User rating (1-5) |
| was_helpful | BOOLEAN | Helpful flag |
| created_at | TIMESTAMPTZ | Message timestamp |

**Indexes:**
- `idx_messages_conversation_id` on conversation_id
- `idx_messages_created_at` on created_at (DESC)

**RLS Policies:**
- Users can view messages in their conversations
- Users can create messages in their conversations
- Users can update their own messages (ratings only)

---

### 5. luminor_relationships

**Purpose:** Track bond level and memories between users and Luminors

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Relationship identifier |
| user_id | UUID (FK) | References profiles(id) |
| luminor_id | UUID (FK) | References luminors(id) |
| bond_level | INTEGER | Current bond level (1-10) |
| bond_xp | INTEGER | Experience points |
| total_interactions | INTEGER | Total interaction count |
| personality_match | JSONB | Personality compatibility data |
| user_preferences | JSONB | Learned user preferences |
| key_memories | JSONB | Important memories array |
| created_at | TIMESTAMPTZ | Relationship start |
| updated_at | TIMESTAMPTZ | Last update |
| last_interaction_at | TIMESTAMPTZ | Last interaction |

**Unique Constraint:** (user_id, luminor_id)

**Indexes:**
- `idx_relationships_user_luminor` on (user_id, luminor_id)
- `idx_relationships_bond_level` on bond_level (DESC)

**Bond Level System:**
- Level 1-10 progression
- XP required = 100 × level^1.5
- Each message = 10 XP
- Level up triggers notification

**RLS Policies:**
- Users can view their own relationships
- Users can create/update their own relationships

---

### 6. creations

**Purpose:** User-generated content (images, videos, music, etc.)

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Creation identifier |
| user_id | UUID (FK) | References profiles(id) |
| title | TEXT | Creation title |
| description | TEXT | Description |
| type | TEXT | image/music/video/text/multimodal |
| file_url | TEXT | Main file URL |
| thumbnail_url | TEXT | Thumbnail URL |
| file_size | INTEGER | File size in bytes |
| file_format | TEXT | File format (png, mp4, etc.) |
| ai_tool | TEXT | Tool used (midjourney, suno, etc.) |
| prompt | TEXT | Generation prompt |
| model | TEXT | AI model used |
| generation_params | JSONB | Generation parameters |
| seed | INTEGER | Generation seed |
| metadata | JSONB | Technical metadata |
| status | TEXT | draft/processing/published/archived |
| is_public | BOOLEAN | Public visibility |
| is_featured | BOOLEAN | Featured flag |
| is_nsfw | BOOLEAN | NSFW flag |
| license | TEXT | Content license |
| allow_remix | BOOLEAN | Remix allowed |
| allow_commercial | BOOLEAN | Commercial use allowed |
| tags | TEXT[] | Search tags |
| categories | TEXT[] | Categories |
| view_count | INTEGER | View counter |
| like_count | INTEGER | Like counter |
| comment_count | INTEGER | Comment counter |
| remix_count | INTEGER | Remix counter |
| created_at | TIMESTAMPTZ | Creation time |
| updated_at | TIMESTAMPTZ | Last update |
| published_at | TIMESTAMPTZ | Publish time |

**Indexes:**
- `idx_creations_user_id` on user_id
- `idx_creations_type` on type
- `idx_creations_status_public` on (status, is_public)
- `idx_creations_created_at` on created_at (DESC)
- `idx_creations_tags` on tags (GIN index)
- `idx_creations_featured` on (is_featured, is_public)

**RLS Policies:**
- Users can view their own creations (all statuses)
- Anyone can view published public creations
- Users can create/update/delete their own creations

---

### 7. likes

**Purpose:** User likes on creations

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Like identifier |
| user_id | UUID (FK) | References profiles(id) |
| creation_id | UUID (FK) | References creations(id) |
| created_at | TIMESTAMPTZ | Like timestamp |

**Unique Constraint:** (user_id, creation_id)

**Indexes:**
- `idx_likes_user_id` on user_id
- `idx_likes_creation_id` on creation_id
- `idx_likes_created_at` on created_at (DESC)

**Triggers:**
- Auto-increment/decrement like_count on creations

**RLS Policies:**
- Users can view likes on public creations
- Users can view their own likes
- Users can create their own likes
- Users can delete their own likes

---

### 8. comments

**Purpose:** User comments on creations

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Comment identifier |
| user_id | UUID (FK) | References profiles(id) |
| creation_id | UUID (FK) | References creations(id) |
| content | TEXT | Comment content |
| parent_comment_id | UUID (FK) | References comments(id) for threading |
| is_edited | BOOLEAN | Edited flag |
| is_flagged | BOOLEAN | Moderation flag |
| like_count | INTEGER | Comment likes |
| created_at | TIMESTAMPTZ | Comment time |
| updated_at | TIMESTAMPTZ | Last edit time |

**Indexes:**
- `idx_comments_user_id` on user_id
- `idx_comments_creation_id` on creation_id
- `idx_comments_parent_id` on parent_comment_id
- `idx_comments_created_at` on created_at (DESC)

**Triggers:**
- Auto-increment/decrement comment_count on creations

**RLS Policies:**
- Anyone can view comments on public creations
- Users can create comments on public creations
- Users can update/delete their own comments

---

### 9. follows

**Purpose:** User follow relationships

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Follow identifier |
| follower_id | UUID (FK) | References profiles(id) |
| following_id | UUID (FK) | References profiles(id) |
| notify_creations | BOOLEAN | Notification preference |
| created_at | TIMESTAMPTZ | Follow timestamp |

**Unique Constraint:** (follower_id, following_id)
**Check Constraint:** follower_id != following_id

**Indexes:**
- `idx_follows_follower_id` on follower_id
- `idx_follows_following_id` on following_id

**Triggers:**
- Auto-update follower_count/following_count on profiles

**RLS Policies:**
- Users can view their own follows
- Anyone can view follow relationships
- Users can create their own follows
- Users can delete their own follows

---

### 10. notifications

**Purpose:** User notifications

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Notification identifier |
| user_id | UUID (FK) | References profiles(id) |
| type | TEXT | Notification type |
| title | TEXT | Notification title |
| message | TEXT | Notification message |
| action_url | TEXT | Action URL (optional) |
| metadata | JSONB | Additional data |
| is_read | BOOLEAN | Read status |
| is_archived | BOOLEAN | Archived status |
| created_at | TIMESTAMPTZ | Creation time |
| read_at | TIMESTAMPTZ | Read timestamp |

**Notification Types:**
- `creation_liked` - Someone liked your creation
- `creation_commented` - Someone commented on your creation
- `new_follower` - New follower
- `comment_reply` - Reply to your comment
- `mention` - Mentioned in a comment
- `system_announcement` - System message

**Indexes:**
- `idx_notifications_user_id` on user_id
- `idx_notifications_unread` on (user_id, is_read) WHERE is_read = FALSE
- `idx_notifications_created_at` on created_at (DESC)

**RLS Policies:**
- Users can only view their own notifications
- Users can update their own notifications (mark as read)
- Users can delete their own notifications

---

## Storage Buckets

### avatars
- **Public:** Yes
- **Max Size:** 5MB
- **Allowed MIME Types:** image/jpeg, image/png, image/webp, image/gif
- **Structure:** `{user_id}/avatar.{ext}`

### creations
- **Public:** Controlled by RLS
- **Max Size:** 100MB
- **Allowed MIME Types:** Images, videos, audio, PDF
- **Structure:** `{user_id}/{type}/{creation_id}.{ext}`

### thumbnails
- **Public:** Yes
- **Max Size:** 2MB
- **Allowed MIME Types:** image/jpeg, image/png, image/webp
- **Structure:** `{user_id}/{creation_id}-thumb.{ext}`

---

## Common Query Patterns

### 1. Get User Profile with Stats

```sql
SELECT
    p.*,
    (SELECT COUNT(*) FROM creations WHERE user_id = p.id AND status = 'published') as creation_count,
    (SELECT COUNT(*) FROM follows WHERE following_id = p.id) as follower_count,
    (SELECT COUNT(*) FROM follows WHERE follower_id = p.id) as following_count
FROM profiles p
WHERE p.id = $1;
```

### 2. Get Conversation with Recent Messages

```sql
SELECT
    c.*,
    l.name as luminor_name,
    l.color as luminor_color,
    (
        SELECT json_agg(m.* ORDER BY m.created_at DESC)
        FROM luminor_messages m
        WHERE m.conversation_id = c.id
        LIMIT 50
    ) as recent_messages
FROM luminor_conversations c
JOIN luminors l ON l.id = c.luminor_id
WHERE c.id = $1;
```

### 3. Get User Feed (Following)

```sql
SELECT
    c.*,
    p.username,
    p.display_name,
    p.avatar_url,
    EXISTS(
        SELECT 1 FROM likes
        WHERE likes.creation_id = c.id
        AND likes.user_id = $1
    ) as user_has_liked
FROM creations c
JOIN profiles p ON p.id = c.user_id
JOIN follows f ON f.following_id = c.user_id
WHERE f.follower_id = $1
    AND c.is_public = TRUE
    AND c.status = 'published'
ORDER BY c.created_at DESC
LIMIT 20 OFFSET $2;
```

### 4. Search Creations

```sql
SELECT
    c.*,
    p.username,
    p.avatar_url
FROM creations c
JOIN profiles p ON p.id = c.user_id
WHERE c.is_public = TRUE
    AND c.status = 'published'
    AND (
        c.title ILIKE '%' || $1 || '%' OR
        c.description ILIKE '%' || $1 || '%' OR
        $1 = ANY(c.tags)
    )
ORDER BY c.created_at DESC
LIMIT 20;
```

### 5. Get Luminor Relationship with Bond Level

```sql
SELECT
    lr.*,
    l.name as luminor_name,
    l.color as luminor_color,
    FLOOR(100 * POWER(lr.bond_level, 1.5)) as xp_for_next_level,
    (lr.bond_xp::FLOAT / FLOOR(100 * POWER(lr.bond_level, 1.5))::FLOAT * 100) as level_progress_percent
FROM luminor_relationships lr
JOIN luminors l ON l.id = lr.luminor_id
WHERE lr.user_id = $1 AND lr.luminor_id = $2;
```

---

## Utility Functions

### User Management
- `handle_new_user()` - Auto-create profile on signup
- `update_last_active()` - Update last activity timestamp

### Conversations
- `get_or_create_conversation(user_id, luminor_id, session_id)` - Get or create conversation
- `add_message_to_conversation(conversation_id, user_id, role, content, model, tokens)` - Add message and update stats

### Relationships
- `check_bond_level_up(user_id, luminor_id)` - Check and process level ups
- `add_key_memory(user_id, luminor_id, memory_type, content, importance)` - Add important memory

### Creations
- `publish_creation(creation_id, user_id)` - Publish a creation
- `archive_creation(creation_id, user_id)` - Archive a creation
- `increment_creation_views(creation_id)` - Increment view counter

### Social
- `toggle_like(user_id, creation_id)` - Like/unlike creation
- `follow_user(follower_id, following_id)` - Follow a user
- `unfollow_user(follower_id, following_id)` - Unfollow a user

### Notifications
- `mark_notification_read(notification_id, user_id)` - Mark as read
- `mark_all_notifications_read(user_id)` - Mark all as read

### Search & Discovery
- `search_creations(query, type, limit, offset)` - Search public creations
- `get_user_feed(user_id, limit, offset)` - Get personalized feed
- `get_user_stats(user_id)` - Get comprehensive user statistics

---

## Security Considerations

### Row Level Security (RLS)
- **Enabled on all tables** - Every table has RLS enabled
- **User data isolation** - Users can only access their own data
- **Public content** - Published creations visible to all
- **Service role bypass** - Admin operations use service role

### Data Access Patterns
1. **Authenticated users** - Access via `auth.uid()`
2. **Anonymous users** - Can view public content only
3. **Admin operations** - Use service role key
4. **API calls** - Respect RLS automatically

### Best Practices
- Never expose service role key in client
- Use RLS policies instead of application-level checks
- Validate input data at application layer
- Use prepared statements for queries
- Implement rate limiting on API endpoints

---

## Performance Optimization

### Indexes
- All foreign keys indexed
- Common query fields indexed
- Full-text search on tags (GIN index)
- Partial indexes for common filters

### Query Optimization
- Use `EXPLAIN ANALYZE` for slow queries
- Limit result sets with LIMIT/OFFSET
- Use EXISTS instead of COUNT when checking existence
- Avoid N+1 queries with JOIN or subqueries

### Caching Strategy
- Cache Luminor data (changes infrequently)
- Cache user profiles (invalidate on update)
- Cache public creations feed (5-minute TTL)
- Use Supabase Realtime for live updates

---

## Migration Strategy

### Initial Setup
1. Run migration `20250101000001_initial_schema.sql`
2. Run migration `20250101000002_rls_policies.sql`
3. Run migration `20250101000003_storage_buckets.sql`
4. Run migration `20250101000004_utility_functions.sql`

### Future Migrations
- Use timestamped migration files
- Test in staging environment first
- Always include rollback scripts
- Document breaking changes

---

## Monitoring & Maintenance

### Database Health
- Monitor query performance
- Track connection pool usage
- Watch storage growth
- Review slow query logs

### Regular Tasks
- Vacuum analyze (weekly)
- Update statistics (daily)
- Archive old conversations (monthly)
- Clean up expired notifications (weekly)

---

## API Integration

### Supabase Client Example

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Get user profile
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()

// Create new conversation
const { data: conversation } = await supabase
  .rpc('get_or_create_conversation', {
    p_user_id: userId,
    p_luminor_id: luminorId,
    p_session_id: sessionId
  })

// Search creations
const { data: creations } = await supabase
  .rpc('search_creations', {
    p_query: 'dragon',
    p_type: 'image',
    p_limit: 20,
    p_offset: 0
  })
```

---

## Troubleshooting

### Common Issues

**Issue:** User can't see their profile
**Solution:** Check if profile exists, verify RLS policy, ensure auth token is valid

**Issue:** Likes not incrementing
**Solution:** Check trigger function, verify RLS policy on likes table

**Issue:** Slow queries
**Solution:** Add indexes, optimize query, use pagination

**Issue:** Storage upload fails
**Solution:** Check bucket policy, verify file size/type, ensure user folder exists

---

## Future Enhancements

### Planned Features
- Full-text search with PostgreSQL FTS
- Vector embeddings for memory system (pgvector)
- Real-time collaboration on creations
- Advanced analytics dashboard
- Content recommendation engine

### Scalability Considerations
- Partition large tables (messages, notifications)
- Implement read replicas for queries
- Use CDN for static assets
- Consider caching layer (Redis)

---

## Support & Resources

- **Supabase Docs:** https://supabase.com/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Project Repository:** [Link to repo]
- **Database Migrations:** `/supabase/migrations/`

---

**End of Documentation**
