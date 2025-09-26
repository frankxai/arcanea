# Asset Management Setup Guide

Complete setup for Arcanea's asset management system using Supabase Storage.

## 🎯 Quick Start

### 1. Supabase Storage Setup

1. **Open your Supabase project dashboard**
2. **Go to Storage section**
3. **Run the SQL setup:**
   ```bash
   # Copy the contents of supabase-storage-setup.sql
   # Paste into Supabase SQL Editor
   # Execute the script
   ```

### 2. Environment Variables

Add to your `.env.local` files:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

### 3. Install Asset Manager Package

The `@arcanea/asset-manager` package is ready to use:
```typescript
import { AssetManager, AssetUtils } from '@arcanea/asset-manager';

const assetManager = new AssetManager(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

## 📁 Directory Structure

```
arcanea/
├── apps/web/public/brand/          # Static brand assets (git-tracked)
├── public/shared-assets/            # Cross-app static assets
├── packages/asset-manager/          # Asset management utilities
├── supabase-storage-setup.sql      # Database setup script
└── docs/profile-app-architecture.md # Future profile app plan
```

## 🎨 Asset Categories

### Static Assets (Git-tracked)
- **Location:** `apps/web/public/brand/`
- **Usage:** Logos, icons, UI elements
- **Deployment:** Bundled with apps

### Dynamic Assets (Supabase Storage)
- **AI Characters:** User-generated character art
- **AI Worlds:** Generated environments and scenes
- **AI Artifacts:** Creative experiments and outputs
- **User Creations:** Personal portfolio content
- **Brand Assets:** Dynamic brand materials

## 🚀 Usage Examples

### Upload AI Character
```typescript
const file = new File([...], 'character.png');
const path = AssetUtils.generateAssetPath('characters', userId, file.name);

await assetManager.uploadAsset(
  AssetUtils.buckets.AI_CHARACTERS,
  path,
  file,
  {
    ...AssetUtils.getFileMetadata(file),
    user_id: userId,
    tags: ['character', 'fantasy', 'ai-generated'],
    description: 'Mystical forest guardian character',
    is_public: true
  }
);
```

### Search Assets
```typescript
const characters = await assetManager.searchAssets(
  ['character', 'fantasy'],
  userId,
  true // public only
);
```

### Create Collection
```typescript
const collection = await assetManager.createCollection({
  name: 'Fantasy Characters',
  description: 'My collection of fantasy character designs',
  user_id: userId,
  is_public: true
});
```

## 🔄 Next Steps

1. **Run Supabase setup** - Execute the SQL script
2. **Add environment variables** - Configure your apps
3. **Start uploading assets** - Use in Studio app
4. **Build profile app** - When you have content to showcase

## 📊 Buckets Created

| Bucket | Purpose | Public | Use Case |
|--------|---------|--------|----------|
| `ai-characters` | AI-generated characters | ✅ | Gallery, profile showcase |
| `ai-worlds` | Generated environments | ✅ | Realms, world building |
| `ai-artifacts` | Creative experiments | ✅ | Portfolio, experiments |
| `user-creations` | Personal projects | ✅ | User galleries |
| `brand-assets` | Dynamic brand materials | ✅ | Marketing, content |
| `profile-assets` | Private profile content | ❌ | Personal use only |

## 🛡️ Security

- **Row Level Security (RLS)** enabled on all tables
- **Public buckets** for showcase content
- **Private profile bucket** for personal assets
- **User-based access control** for uploads and management
- **Metadata tracking** for all assets