# Arcanea MVP - Supabase Database

This directory contains all database migrations and configuration for the Arcanea MVP.

## Directory Structure

```
supabase/
├── migrations/          # Database migration files (timestamped)
├── config.toml         # Supabase local development config
└── README.md          # This file
```

## Quick Start

### 1. Install Supabase CLI

```bash
npm install -g supabase
```

### 2. Initialize Supabase (if not done)

```bash
supabase init
```

### 3. Link to Your Project

```bash
supabase link --project-ref your-project-id
```

### 4. Run Migrations

```bash
# Apply all migrations to local dev
supabase db reset

# Or push to remote
supabase db push
```

## Migrations

### Migration Files

1. **20250101000001_initial_schema.sql**
   - Core table schemas
   - Profiles, Luminors, Conversations, Creations
   - Indexes and constraints
   - Triggers for auto-updates

2. **20250101000002_rls_policies.sql**
   - Row Level Security policies
   - User data isolation
   - Public content access
   - Helper functions for RLS

3. **20250101000003_storage_buckets.sql**
   - Storage bucket configuration
   - Bucket policies
   - File organization structure

4. **20250101000004_utility_functions.sql**
   - Helper functions for common operations
   - Business logic functions
   - Analytics functions

### Creating New Migrations

```bash
# Create a new migration file
supabase migration new your_migration_name

# This creates: supabase/migrations/[timestamp]_your_migration_name.sql
```

### Best Practices

- **Always test locally first** using `supabase db reset`
- **Write idempotent migrations** (use IF NOT EXISTS, etc.)
- **Include rollback comments** for complex migrations
- **Document breaking changes** in migration comments
- **Version control all migrations** in git

## Local Development

### Start Local Supabase

```bash
supabase start
```

This starts:
- PostgreSQL database on `localhost:54322`
- API server on `localhost:54321`
- Studio UI on `localhost:54323`
- Inbucket (email testing) on `localhost:54324`

### Stop Local Supabase

```bash
supabase stop
```

### Reset Database (Apply All Migrations)

```bash
supabase db reset
```

### View Database

```bash
# Open Studio UI
supabase studio

# Or use psql
psql postgresql://postgres:postgres@localhost:54322/postgres
```

## Environment Variables

Required environment variables for production:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database (if using direct connection)
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[password]@db.[project].supabase.co:6543/postgres

# Auth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Optional: For custom domain
NEXT_PUBLIC_SITE_URL=https://arcanea.io
```

## Database Schema

See detailed documentation: [/docs/mvp/DATABASE_SCHEMA.md](/docs/mvp/DATABASE_SCHEMA.md)

### Core Tables
- `profiles` - User profiles (extends auth.users)
- `luminors` - AI companions
- `luminor_conversations` - Chat sessions
- `luminor_messages` - Chat messages
- `luminor_relationships` - Bond levels & memories
- `creations` - User-generated content
- `likes` - Creation likes
- `comments` - Creation comments
- `follows` - User follows
- `notifications` - User notifications

### Storage Buckets
- `avatars` - User avatars (5MB max)
- `creations` - User creations (100MB max)
- `thumbnails` - Creation thumbnails (2MB max)

## Common Operations

### View Schema

```sql
-- List all tables
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- View table structure
\d+ profiles
```

### Test RLS Policies

```sql
-- Set user context
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claim.sub TO 'user-uuid-here';

-- Test query
SELECT * FROM profiles WHERE id = 'user-uuid-here';
```

### Check Migration Status

```bash
supabase migration list
```

### Create Database Backup

```bash
# Local backup
supabase db dump -f backup.sql

# Remote backup
supabase db dump --db-url your-db-url -f backup.sql
```

## Troubleshooting

### Migration Fails

```bash
# Check migration status
supabase migration list

# View database logs
supabase logs db

# Reset and try again
supabase db reset
```

### RLS Policy Issues

```sql
-- Disable RLS temporarily for debugging (local only!)
ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;

-- Check existing policies
SELECT * FROM pg_policies WHERE tablename = 'table_name';

-- Test policy with specific user
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claim.sub TO 'user-id';
SELECT * FROM table_name;
```

### Storage Issues

```bash
# Check bucket policies
SELECT * FROM storage.buckets;

# List storage policies
SELECT * FROM pg_policies WHERE tablename = 'objects';
```

## Production Deployment

### 1. Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Create new project
3. Copy project URL and keys

### 2. Push Migrations

```bash
# Link to production project
supabase link --project-ref your-prod-project-id

# Push migrations
supabase db push
```

### 3. Configure Auth

1. Go to Authentication > Providers in Supabase Dashboard
2. Enable Google OAuth
3. Add redirect URLs
4. Configure email templates

### 4. Setup Storage

Storage buckets are created via migration, but verify in Dashboard:
1. Go to Storage
2. Verify buckets exist: avatars, creations, thumbnails
3. Check bucket policies are active

### 5. Configure Environment Variables

Add to your deployment platform (Vercel, etc.):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only!)

## Monitoring

### Database Health

```sql
-- Check active connections
SELECT count(*) FROM pg_stat_activity;

-- Check table sizes
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check slow queries
SELECT * FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

### Storage Usage

```sql
-- Check storage bucket usage
SELECT
    bucket_id,
    COUNT(*) as object_count,
    SUM(metadata->>'size')::bigint as total_size
FROM storage.objects
GROUP BY bucket_id;
```

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## Support

For issues or questions:
1. Check [docs/mvp/DATABASE_SCHEMA.md](/docs/mvp/DATABASE_SCHEMA.md)
2. Review Supabase logs: `supabase logs`
3. Check Supabase Dashboard for errors
4. Review RLS policies if access denied

---

**Last Updated:** 2025-01-01
**Schema Version:** 1.0.0
