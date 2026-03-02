# LobeChat Labs Deployment Guide

## Target: `labs.arcanea.ai`

LobeChat runs **unmodified** as our power-user reference while we build the Arcanea Chat frontend.

## Option A: Deploy via LobeChat Template (Recommended)

1. Visit: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flobehub%2Flobe-chat&project-name=arcanea-lobechat-labs
2. Select Vercel team: `FrankX's projects`
3. Configure environment variables (see below)
4. Deploy
5. Add custom domain: `labs.arcanea.ai`

## Option B: Reuse Existing `lobe-chat-v3` Project

1. Go to: https://vercel.com/frankx-projects/lobe-chat-v3/settings
2. Under "Git", reconnect to `lobehub/lobe-chat` (upstream)
3. Set all environment variables below
4. Redeploy from latest commit
5. Add custom domain: `labs.arcanea.ai`

## Required Environment Variables

### Generated Secrets (stored in ~/.secrets/.env.master)

```
KEY_VAULTS_SECRET=de155617...97569
AUTH_SECRET=21c4ecd4...664f
JWKS_KEY={"crv":"Ed25519","d":"vW85R...","x":"Kg-L0...","kty":"OKP"}
```

### Database

```
DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database>?sslmode=require
```

**Option 1 — Separate Neon DB** (recommended for isolation):
- Create at https://neon.tech → Free tier → `arcanea-lobechat-labs`
- Use the connection string as `DATABASE_URL`

**Option 2 — Supabase** (same project as Arcanea Platform):
- Go to Supabase project → Settings → Database → Connection string
- Use direct connection (port 5432) with `?sslmode=require`

### Application

```
APP_URL=https://labs.arcanea.ai
NEXT_PUBLIC_BASE_PATH=
```

### S3 Storage (for file uploads, avatars)

**Option 1 — Supabase Storage:**
```
S3_ACCESS_KEY_ID=<supabase-storage-access-key>
S3_SECRET_ACCESS_KEY=<supabase-storage-secret-key>
S3_BUCKET=lobechat-files
S3_ENDPOINT=https://<project-ref>.supabase.co/storage/v1/s3
S3_REGION=us-east-1
```

**Option 2 — Cloudflare R2:**
```
S3_ACCESS_KEY_ID=<r2-access-key>
S3_SECRET_ACCESS_KEY=<r2-secret-key>
S3_BUCKET=lobechat-files
S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
```

### Optional AI Provider Keys (users can also BYOK)

```
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=AIza...
```

## Post-Deploy Verification

1. Visit `labs.arcanea.ai` — should see LobeChat UI
2. Sign up with email/password
3. Create a test agent with system prompt
4. Create an agent group with 2+ agents — verify supervisor routing
5. Install an MCP tool from the hub — verify tool execution
6. Upload a PDF to knowledge base — verify RAG search
7. Test voice input (if enabled)
8. Screenshot everything for reference during Arcanea Chat development

## Custom Domain Setup

1. Vercel project → Settings → Domains → Add `labs.arcanea.ai`
2. DNS: Add CNAME record `labs.arcanea.ai` → `cname.vercel-dns.com`
3. Wait for SSL provisioning (~2 min)
