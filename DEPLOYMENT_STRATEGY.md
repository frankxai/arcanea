# Arcanea Multi-App Deployment Strategy

> A comprehensive guide for deploying the Arcanea platform across multiple Vercel projects.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ARCANEA PLATFORM                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────┐  │
│  │ arcanea.ai  │  │chat.arcanea │  │studio.arcanea│  │ academy.  │  │
│  │   (main)    │  │    .ai      │  │     .ai     │  │ arcanea.ai│  │
│  │  apps/web   │  │  apps/chat  │  │ apps/studio │  │apps/academy│  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └─────┬─────┘  │
│         │                │                │                │        │
│         └────────────────┴────────────────┴────────────────┘        │
│                              │                                      │
│                    ┌─────────┴─────────┐                           │
│                    │  SHARED RESOURCES │                           │
│                    │  - /book/ content │                           │
│                    │  - Supabase DB    │                           │
│                    │  - Design tokens  │                           │
│                    └───────────────────┘                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Current Monorepo Structure

```
/mnt/c/Users/Frank/Arcanea/
├── apps/
│   ├── web/           → arcanea.ai (DEPLOYED)
│   ├── academy/       → academy.arcanea.ai
│   ├── chat/          → chat.arcanea.ai
│   ├── studio/        → studio.arcanea.ai
│   ├── gallery/       → gallery.arcanea.ai
│   ├── library/       → library.arcanea.ai (optional)
│   ├── realms/        → realms.arcanea.ai
│   ├── sanctuary/     → sanctuary.arcanea.ai
│   └── mobile/        → (React Native - separate)
├── book/              → Shared content (17 collections)
├── oss/               → Open source package (separate repo)
├── packages/          → Shared packages
└── vercel.json        → Main deployment config
```

---

## Deployment Options

### Option 1: Single Project with Subdomains (Current)

The current `vercel.json` deploys only `apps/web`. Subdomains can be added as:

**Pros:**
- Simpler management
- Shared environment variables
- Single billing

**Cons:**
- All apps share one deployment
- Can't deploy apps independently
- Limited isolation

**Implementation:**
```json
// vercel.json (add rewrites for subdomains)
{
  "rewrites": [
    { "source": "/chat/:path*", "destination": "https://chat.arcanea.ai/:path*" }
  ]
}
```

### Option 2: Multiple Vercel Projects (Recommended)

Each app becomes its own Vercel project with independent deployments.

**Pros:**
- Independent deployments
- Better isolation
- Separate preview URLs per app
- Scale independently

**Cons:**
- More projects to manage
- Environment variables must be synced
- Slightly more complex CI/CD

---

## Recommended Setup: Multi-Project

### Step 1: Create Vercel Projects

Create separate Vercel projects for each app:

| App | Project Name | Domain | Build Command |
|-----|--------------|--------|---------------|
| web | arcanea-web | arcanea.ai | `pnpm turbo run build --filter=@arcanea/web` |
| academy | arcanea-academy | academy.arcanea.ai | `pnpm turbo run build --filter=@arcanea/academy` |
| chat | arcanea-chat | chat.arcanea.ai | `pnpm turbo run build --filter=@arcanea/chat` |
| studio | arcanea-studio | studio.arcanea.ai | `pnpm turbo run build --filter=@arcanea/studio` |
| gallery | arcanea-gallery | gallery.arcanea.ai | `pnpm turbo run build --filter=@arcanea/gallery` |

### Step 2: App-Specific vercel.json Files

Create a `vercel.json` in each app directory:

**apps/academy/vercel.json:**
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "version": 2,
  "name": "arcanea-academy",
  "framework": "nextjs",
  "buildCommand": "cd ../.. && pnpm turbo run build --filter=@arcanea/academy",
  "installCommand": "cd ../.. && corepack enable && pnpm install --frozen-lockfile",
  "outputDirectory": ".next",
  "regions": ["iad1"]
}
```

### Step 3: GitHub Actions for Multi-Deploy

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Arcanea Apps

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      web: ${{ steps.changes.outputs.web }}
      academy: ${{ steps.changes.outputs.academy }}
      chat: ${{ steps.changes.outputs.chat }}
      studio: ${{ steps.changes.outputs.studio }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v2
        id: changes
        with:
          filters: |
            web:
              - 'apps/web/**'
              - 'book/**'
              - 'packages/**'
            academy:
              - 'apps/academy/**'
              - 'packages/**'
            chat:
              - 'apps/chat/**'
              - 'packages/**'
            studio:
              - 'apps/studio/**'
              - 'packages/**'

  deploy-web:
    needs: detect-changes
    if: ${{ needs.detect-changes.outputs.web == 'true' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_WEB_PROJECT_ID }}
          working-directory: ./

  deploy-academy:
    needs: detect-changes
    if: ${{ needs.detect-changes.outputs.academy == 'true' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_ACADEMY_PROJECT_ID }}
          working-directory: ./apps/academy
```

---

## Content Sharing Strategy

### Option A: Git Submodule for `/book/`

If you want `/book/` as a separate repo that syncs to all apps:

```bash
# Create separate repo for content
git init arcanea-content
cp -r book/* arcanea-content/
cd arcanea-content && git add . && git commit -m "Initial content"

# Add as submodule to main repo
git submodule add https://github.com/frankxai/arcanea-content book

# Apps reference content via relative path
# ../../../book/ from apps/web/lib/content/
```

### Option B: npm Package (Recommended for Content)

Create a shared content package:

```
packages/
└── arcanea-content/
    ├── package.json
    ├── index.ts
    └── collections/
        └── (17 collections)
```

**packages/arcanea-content/package.json:**
```json
{
  "name": "@arcanea/content",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "collections"],
  "scripts": {
    "build": "tsc"
  }
}
```

### Option C: Keep Current Structure (Simplest)

The current structure works well:
- Content lives in `/book/` at monorepo root
- Apps access via relative path: `../../book/`
- Deployed as part of each app's build

---

## OSS Package Deployment

The `/oss/` directory should be a **separate public repo**:

### Sync Script (Already Exists)

`scripts/sync-oss.sh` syncs to `github.com/frankxai/arcanea`:

```bash
#!/bin/bash
# Sync OSS content to public repository

OSS_REPO="git@github.com:frankxai/arcanea.git"
OSS_DIR="oss"

# Clone temp, copy, push
git clone $OSS_REPO /tmp/arcanea-oss
cp -r $OSS_DIR/* /tmp/arcanea-oss/
cd /tmp/arcanea-oss
git add . && git commit -m "Sync from main repo" && git push
```

### GitHub Actions for OSS Sync

```yaml
name: Sync OSS

on:
  push:
    branches: [main]
    paths:
      - 'oss/**'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Sync to OSS repo
        run: |
          git clone https://x-access-token:${{ secrets.OSS_GITHUB_TOKEN }}@github.com/frankxai/arcanea.git /tmp/oss
          rsync -av --delete oss/ /tmp/oss/
          cd /tmp/oss
          git config user.email "bot@arcanea.ai"
          git config user.name "Arcanea Bot"
          git add . && git commit -m "Sync from main repo" || true
          git push
```

---

## Environment Variables

### Shared Variables (All Apps)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# AI APIs
GOOGLE_GENERATIVE_AI_API_KEY=xxx
ANTHROPIC_API_KEY=xxx
```

### App-Specific Variables

**Web:**
```env
NEXT_PUBLIC_APP_URL=https://arcanea.ai
```

**Academy:**
```env
NEXT_PUBLIC_APP_URL=https://academy.arcanea.ai
```

### Vercel Project Environment Sync

Use Vercel CLI to sync environment variables:

```bash
# Export from main project
vercel env pull .env.production

# Import to new project
vercel link --project=arcanea-academy
vercel env add < .env.production
```

---

## Quick Start Commands

### Deploy Main Web App (Current)
```bash
vercel --prod
```

### Create New App Deployment
```bash
# Link to new project
cd apps/academy
vercel link --project=arcanea-academy

# Deploy
vercel --prod
```

### Deploy All Apps
```bash
# Add to package.json scripts
"deploy:all": "turbo run deploy --parallel"
```

---

## Domain Configuration

### Vercel Dashboard Setup

1. Go to Project Settings → Domains
2. Add custom domain
3. Configure DNS:

| Domain | Record Type | Value |
|--------|-------------|-------|
| arcanea.ai | A | 76.76.21.21 |
| academy.arcanea.ai | CNAME | cname.vercel-dns.com |
| chat.arcanea.ai | CNAME | cname.vercel-dns.com |
| studio.arcanea.ai | CNAME | cname.vercel-dns.com |

---

## Summary

| Strategy | Effort | Flexibility | Recommended For |
|----------|--------|-------------|-----------------|
| Single Project | Low | Low | Small teams, MVPs |
| Multi-Project | Medium | High | Production, scaling |
| Separate Repos | High | Highest | Enterprise, teams |

**Recommendation for Tonight:** Keep current single-project setup, but prepare the multi-project structure for when you want to deploy Academy, Chat, Studio independently.

---

*"The Arc turns: one codebase, many manifestations."*
