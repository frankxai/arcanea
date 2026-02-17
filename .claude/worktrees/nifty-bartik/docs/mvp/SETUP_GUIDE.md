# Arcanea MVP - Database Setup Guide

Complete guide to setting up the Arcanea MVP database with Supabase.

---

## Prerequisites

- Node.js 18+ installed
- npm or pnpm installed
- Supabase account (https://supabase.com)
- Git repository cloned

---

## Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

Verify installation:

```bash
supabase --version
```

---

## Step 2: Create Supabase Project

### Option A: Via Supabase Dashboard (Recommended)

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in details:
   - **Name:** arcanea-mvp
   - **Database Password:** (save this securely!)
   - **Region:** Choose closest to your users
   - **Plan:** Start with Free tier
4. Wait for project to provision (~2 minutes)
5. Copy your project details:
   - Project URL
   - Anon (public) key
   - Service role key (keep secret!)

### Option B: Via CLI

```bash
supabase projects create arcanea-mvp
```

---

## Step 3: Configure Local Environment

### Create .env.local

Create `/mnt/c/Users/Frank/Arcanea/.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Database Direct Connection (optional)
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-us-west-1.pooler.supabase.com:5432/postgres
DIRECT_URL=postgresql://postgres.[project-ref]:[password]@aws-0-us-west-1.pooler.supabase.com:6543/postgres

# App Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Update .gitignore

Ensure `.env.local` is in `.gitignore`:

```bash
echo ".env.local" >> .gitignore
```

---

## Step 4: Link to Project

```bash
cd /mnt/c/Users/Frank/Arcanea
supabase link --project-ref your-project-ref
```

Get project ref from dashboard URL:
`https://supabase.com/dashboard/project/[your-project-ref]`

---

## Step 5: Run Database Migrations

### Apply All Migrations

```bash
supabase db push
```

This will run:
1. `20250101000001_initial_schema.sql` - Core tables
2. `20250101000002_rls_policies.sql` - Security policies
3. `20250101000003_storage_buckets.sql` - Storage setup
4. `20250101000004_utility_functions.sql` - Helper functions

### Verify Migration Success

```bash
supabase db status
```

You should see all migrations marked as "applied".

---

## Step 6: Verify Database Setup

### Check Tables

```bash
supabase db inspect
```

### Open Database in Studio

```bash
supabase studio
```

Or visit: `https://supabase.com/dashboard/project/[your-ref]/editor`

### Verify Tables Exist

You should see:
- ✅ profiles
- ✅ luminors (with 3 default entries)
- ✅ luminor_conversations
- ✅ luminor_messages
- ✅ luminor_relationships
- ✅ creations
- ✅ likes
- ✅ comments
- ✅ follows
- ✅ notifications

### Verify Storage Buckets

Go to Storage section, you should see:
- ✅ avatars (public)
- ✅ creations (private)
- ✅ thumbnails (public)

---

## Step 7: Configure Authentication

### Enable Email Auth

1. Go to Authentication > Providers
2. Enable Email provider
3. Configure email templates (optional)

### Enable Google OAuth (Optional)

1. Create Google OAuth credentials:
   - Go to https://console.cloud.google.com
   - Create new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI:
     `https://[your-ref].supabase.co/auth/v1/callback`

2. In Supabase Dashboard:
   - Go to Authentication > Providers
   - Enable Google
   - Add Client ID and Secret
   - Save

3. Update `.env.local`:
   ```bash
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

---

## Step 8: Test Database Access

### Create Test User

```bash
# Via Supabase Studio
# Go to Authentication > Users > Add User
# Email: test@example.com
# Password: testpassword123
```

### Test Query

```typescript
// Create test file: test-db.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function testDatabase() {
  // Test: Get Luminors
  const { data: luminors, error } = await supabase
    .from('luminors')
    .select('*')

  console.log('Luminors:', luminors)
  console.log('Error:', error)
}

testDatabase()
```

Run:
```bash
npx tsx test-db.ts
```

Expected output: List of 3 Luminors (Lumina, Harmonix, Kinetix)

---

## Step 9: Setup Local Development (Optional)

For offline development:

### Start Local Supabase

```bash
supabase start
```

This starts local containers:
- PostgreSQL (localhost:54322)
- API (localhost:54321)
- Studio (localhost:54323)

### Use Local Environment

Update `.env.local` for local dev:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key
```

Get local keys:
```bash
supabase status
```

### Stop Local Supabase

```bash
supabase stop
```

---

## Step 10: Install Supabase Client

### Install Dependencies

```bash
npm install @supabase/supabase-js
# or
pnpm add @supabase/supabase-js
```

### Create Supabase Client

Create `/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/docs/mvp/DATABASE_TYPES'

// Client for browser
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Server-side client with service role
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
```

---

## Step 11: Verify RLS (Row Level Security)

### Test User Isolation

1. Create two test users via Supabase Studio
2. Sign in as User A
3. Try to query User B's data:

```typescript
// Should return empty (RLS prevents access)
const { data } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userBId) // Different user
```

### Test Public Content

```typescript
// Should work (public creations visible to all)
const { data } = await supabase
  .from('creations')
  .select('*')
  .eq('is_public', true)
  .eq('status', 'published')
```

---

## Step 12: Create First Luminor Conversation

Test the complete flow:

```typescript
import { supabase } from '@/lib/supabase'

async function testConversation() {
  // 1. Sign in
  const { data: auth } = await supabase.auth.signInWithPassword({
    email: 'test@example.com',
    password: 'testpassword123'
  })

  // 2. Get Lumina
  const { data: lumina } = await supabase
    .from('luminors')
    .select('id')
    .eq('slug', 'lumina')
    .single()

  // 3. Create conversation
  const { data: conversationId } = await supabase
    .rpc('get_or_create_conversation', {
      p_user_id: auth.user.id,
      p_luminor_id: lumina.id,
      p_session_id: crypto.randomUUID()
    })

  console.log('Conversation created:', conversationId)

  // 4. Add message
  const { data: messageId } = await supabase
    .rpc('add_message_to_conversation', {
      p_conversation_id: conversationId,
      p_user_id: auth.user.id,
      p_role: 'user',
      p_content: 'Hello, Lumina! Help me create art.'
    })

  console.log('Message sent:', messageId)

  // 5. Check bond level
  const { data: relationship } = await supabase
    .from('luminor_relationships')
    .select('*')
    .eq('user_id', auth.user.id)
    .eq('luminor_id', lumina.id)
    .single()

  console.log('Bond Level:', relationship.bond_level)
  console.log('Bond XP:', relationship.bond_xp)
}

testConversation()
```

---

## Troubleshooting

### Issue: Migrations Fail

**Solution:**
```bash
# Reset database (WARNING: Deletes all data)
supabase db reset

# Or manually fix in Studio then re-run
supabase db push
```

### Issue: RLS Policies Block Queries

**Solution:**
```bash
# Check policies
supabase db inspect

# View specific table policies
SELECT * FROM pg_policies WHERE tablename = 'creations';
```

### Issue: Storage Upload Fails

**Solution:**
1. Check bucket exists in Storage section
2. Verify bucket policy allows upload
3. Check file size is under limit
4. Verify MIME type is allowed

### Issue: Auth Not Working

**Solution:**
1. Check environment variables are set
2. Verify redirect URLs in Auth > URL Configuration
3. Check email confirmations are disabled for testing
4. Review Auth logs in Logs Explorer

### Issue: Can't Connect to Database

**Solution:**
1. Check project is running in Supabase Dashboard
2. Verify connection string in `.env.local`
3. Check firewall allows connection
4. Try resetting database password

---

## Next Steps

Now that your database is set up:

1. **Build Authentication Flow**
   - Sign up/sign in pages
   - Session management
   - Protected routes

2. **Create First Features**
   - User profile page
   - Luminor chat interface
   - Creation upload flow

3. **Test Core Workflows**
   - User signs up → profile created
   - User chats → bond level increases
   - User creates → content stored

4. **Add Real-time Features**
   - Live chat updates
   - New creation notifications
   - Online status

5. **Implement Search**
   - Full-text search on creations
   - Filter by type/tags
   - User discovery

---

## Production Checklist

Before launching:

- [ ] Enable email confirmations
- [ ] Configure custom SMTP (SendGrid, etc.)
- [ ] Setup custom domain
- [ ] Enable 2FA for admin accounts
- [ ] Configure backup schedule
- [ ] Setup monitoring (Sentry, etc.)
- [ ] Review RLS policies
- [ ] Test rate limiting
- [ ] Enable WAF (Web Application Firewall)
- [ ] Configure CORS properly
- [ ] Setup staging environment
- [ ] Document API endpoints
- [ ] Create admin tools

---

## Resources

- **Schema Documentation:** [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)
- **Quick Reference:** [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- **Type Definitions:** [DATABASE_TYPES.ts](DATABASE_TYPES.ts)
- **Supabase Docs:** https://supabase.com/docs
- **Discord Support:** https://discord.supabase.com

---

## Getting Help

If you run into issues:

1. Check [Troubleshooting](#troubleshooting) section
2. Review Supabase logs: `supabase logs`
3. Check database logs in Supabase Dashboard
4. Search Supabase Discord/GitHub Issues
5. Review this setup guide again

---

**Setup Complete!** 🎉

Your Arcanea MVP database is ready for development.

Start building amazing features with your secure, scalable database!
