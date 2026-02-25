# Arcanea Multi-Tier Media Storage Architecture

## Tier Routing

| Tier | Backend | What Goes Here | Max Size | Cost/GB Stored | Egress |
|------|---------|----------------|----------|----------------|--------|
| **T1: Heavy Media** | Cloudflare R2 | Videos (mp4/webm), large images (>2MB), audio files | 100MB | $0.015 | $0 |
| **T2: Fast Assets** | Vercel Blob | Thumbnails, icons, logos, social cards, OG images | 2MB | $0.15 | $0.06/GB |
| **T3: User Content** | Supabase Storage | User uploads, avatars, AI-generated images, creations | 100MB | $0.021 | $0.09/GB |

## Routing Rules

```
if file.is_video || file.is_audio || file.size_bytes > 2_000_000:
    → R2 (T1)
elif file.categories.usage_tier in ['hero', 'social'] && file.is_image && file.size_bytes <= 2_000_000:
    → Vercel Blob (T2)
elif file.categories.content_type in ['thumbnail', 'icon', 'logo', 'banner']:
    → Vercel Blob (T2)
elif file.is_user_generated:
    → Supabase Storage (T3)
else:
    → R2 (T1)  # default for large/unknown
```

## Path Structure

### R2 (T1)
```
arcanea-media/
├── video/
│   ├── promo/{guardian|element|general}/{filename}.mp4
│   ├── social/{platform}/{filename}.mp4
│   └── raw/{folder}/{filename}.mp4
├── audio/
│   └── {gate_frequency|general}/{filename}.{ext}
└── images/
    └── hires/{guardian|element|general}/{filename}.{ext}
```

### Vercel Blob (T2)
```
Flat namespace (Blob doesn't support folders):
{usage_tier}-{content_type}-{guardian|element}-{hash8}.{ext}

Examples:
hero-banner-draconia-a1b2c3d4.webp
social-thumbnail-fire-e5f6g7h8.webp
logo-icon-arcanea-i9j0k1l2.png
```

### Supabase Storage (T3)
```
Already configured buckets:
├── avatars/{user_id}/avatar.{ext}
├── creations/{user_id}/{type}/{creation_id}.{ext}
├── thumbnails/{user_id}/{creation_id}-thumb.{ext}
└── generated-images/{user_id}/{timestamp}.{ext}
```

## R2 Setup

```bash
# Via Wrangler CLI
npx wrangler r2 bucket create arcanea-media
npx wrangler r2 bucket create arcanea-media-staging

# Custom domain (in Cloudflare dashboard):
# media.arcanea.ai → arcanea-media bucket
```

### R2 Worker (for transformations)
```
media.arcanea.ai/video/promo/draconia/trailer.mp4
media.arcanea.ai/video/promo/draconia/trailer.mp4?w=720&q=80  # transcoded variant
```

## Vercel Blob Setup

```bash
npm install @vercel/blob
# Add BLOB_READ_WRITE_TOKEN to Vercel env vars
```

## Cost Projection (4.5GB current, 20GB at 6 months)

### Current State (4.5GB)

| Tier | Storage | Bandwidth (est 100GB/mo) | Monthly |
|------|---------|--------------------------|---------|
| R2 (~3GB video+large) | $0.05 | $0 | **$0.05** |
| Blob (~500MB thumbnails) | $0.08 | $3.00 | **$3.08** |
| Supabase (~1GB user) | Free tier | Free tier | **$0** |
| **Total** | | | **$3.13/mo** |

### 6-Month Projection (20GB, 500GB bandwidth/mo)

| Tier | Storage | Bandwidth | Monthly |
|------|---------|-----------|---------|
| R2 (~14GB) | $0.21 | $0 | **$0.21** |
| Blob (~2GB) | $0.30 | $15.00 | **$15.30** |
| Supabase (~4GB) | $0.08 | $22.50 | **$22.58** |
| **Total** | | | **$38.09/mo** |

### Comparison: Single-Tier Alternatives

| Backend Only | 20GB + 500GB bw/mo |
|-------------|---------------------|
| All R2 | **$0.30/mo** (but no edge transforms, manual CDN) |
| All Blob | **$33.00/mo** |
| All Supabase | **$24.38/mo** |
| Multi-tier (ours) | **$38.09/mo** (but optimal performance per asset type) |

> Note: Multi-tier is slightly more than all-R2 at this scale, but the Blob edge serving and Supabase auth-gated access justify the premium. At 100GB+ the multi-tier savings compound.

## Implementation Priority

1. **Week 1**: R2 bucket + custom domain + upload script for existing 4.5GB
2. **Week 2**: Vercel Blob integration for thumbnail/social pipeline
3. **Week 3**: Wire Supabase upload API (missing from codebase)
4. **Week 4**: CDN headers, cache rules, image optimization pipeline
