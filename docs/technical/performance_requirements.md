# Arcanea Platform - Performance Requirements

## Executive Summary

Arcanea must deliver a magical, instantaneous user experience that feels as smooth as the world's best consumer applications. This document defines our performance targets, optimization strategies, and monitoring approach.

## Core Performance Targets

### Web Vitals (Google Core Web Vitals)

| Metric | Target | Excellent | Good | Needs Improvement |
|--------|--------|-----------|------|-------------------|
| **LCP** (Largest Contentful Paint) | < 2.0s | < 2.5s | 2.5-4.0s | > 4.0s |
| **FID** (First Input Delay) | < 50ms | < 100ms | 100-300ms | > 300ms |
| **CLS** (Cumulative Layout Shift) | < 0.05 | < 0.1 | 0.1-0.25 | > 0.25 |
| **INP** (Interaction to Next Paint) | < 100ms | < 200ms | 200-500ms | > 500ms |
| **TTFB** (Time to First Byte) | < 200ms | < 600ms | 600-1000ms | > 1000ms |

**Overall Lighthouse Score Target: 95+**

### Page-Specific Performance Targets

| Page Type | LCP | FID | Load Time | Bundle Size |
|-----------|-----|-----|-----------|-------------|
| Marketing Homepage | < 1.5s | < 50ms | < 2.0s | < 200KB |
| Academy Dashboard | < 2.0s | < 75ms | < 2.5s | < 300KB |
| Studio Interface | < 2.5s | < 100ms | < 3.0s | < 500KB |
| Realm Explorer | < 2.0s | < 75ms | < 2.5s | < 350KB |
| Creator Profile | < 1.8s | < 50ms | < 2.2s | < 250KB |
| Essence Viewer | < 1.5s | < 50ms | < 2.0s | < 200KB |

### API Performance

| Endpoint Type | Target Latency (p50) | Target Latency (p95) | Target Latency (p99) |
|---------------|---------------------|---------------------|---------------------|
| Read Operations | < 50ms | < 150ms | < 300ms |
| Write Operations | < 100ms | < 300ms | < 500ms |
| AI Operations | < 2s | < 5s | < 10s |
| Image Upload | < 500ms | < 1s | < 2s |
| Batch Operations | < 1s | < 3s | < 5s |

### Real-time Features

| Feature | Target Latency | Acceptable Latency | Max Latency |
|---------|---------------|-------------------|-------------|
| Guardian Chat (streaming) | < 100ms | < 200ms | < 500ms |
| Presence Updates | < 50ms | < 100ms | < 200ms |
| Notifications | < 100ms | < 300ms | < 500ms |
| Live Collaboration | < 50ms | < 100ms | < 200ms |

### Database Performance

| Operation Type | Target Query Time | Target Connection Time |
|---------------|------------------|---------------------|
| Simple SELECT | < 5ms | < 10ms |
| Complex JOIN | < 50ms | < 10ms |
| INSERT/UPDATE | < 10ms | < 10ms |
| Full-text Search | < 100ms | < 10ms |
| Vector Search | < 200ms | < 10ms |

## Optimization Strategies

### 1. Frontend Optimization

#### Code Splitting & Lazy Loading

**Route-based Code Splitting:**
```typescript
// app/studio/page.tsx
import dynamic from 'next/dynamic'

const StudioCanvas = dynamic(() => import('@/components/StudioCanvas'), {
  loading: () => <CanvasLoader />,
  ssr: false
})

export default function StudioPage() {
  return <StudioCanvas />
}
```

**Component-level Lazy Loading:**
```typescript
// Lazy load heavy components
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />
})

// Lazy load below-the-fold content
const BelowFold = dynamic(() => import('./BelowFold'), {
  loading: () => null
})
```

**Target Bundle Sizes:**
- Initial bundle: < 200KB (gzipped)
- Route-specific chunks: < 100KB each
- Vendor chunks: < 150KB
- Total JavaScript: < 500KB (lazy-loaded)

#### Image Optimization

**Next.js Image Component:**
```typescript
import Image from 'next/image'

<Image
  src="/essence-thumbnail.webp"
  alt="Essence thumbnail"
  width={400}
  height={400}
  placeholder="blur"
  blurDataURL={blurData}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 400px"
/>
```

**Responsive Images:**
```typescript
const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1920
}

// Generate srcset
const srcset = `
  /image-640.webp 640w,
  /image-1024.webp 1024w,
  /image-1920.webp 1920w
`
```

**Image Format Strategy:**
- Primary: WebP (90% smaller than PNG)
- Fallback: JPEG for compatibility
- SVG for icons and illustrations
- AVIF for future optimization (when support > 90%)

**Lazy Loading Strategy:**
- Above-the-fold: Eager loading
- Below-the-fold: Native lazy loading
- Intersection Observer for custom triggers

#### Font Optimization

**Next.js Font Optimization:**
```typescript
import { Inter, Crimson_Pro } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const crimson = Crimson_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-crimson',
  preload: true,
})
```

**Font Loading Strategy:**
- Self-host Google Fonts (via next/font)
- Font subsetting (Latin only)
- Font-display: swap
- Preload critical fonts
- Variable fonts for weight variations

#### CSS Optimization

**Tailwind CSS Purging:**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './packages/ui/**/*.{js,ts,jsx,tsx}'
  ],
  // Remove unused utilities
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    options: {
      safelist: ['dark'] // Preserve dark mode classes
    }
  }
}
```

**Critical CSS Inlining:**
```typescript
// Extract and inline critical CSS
import { getCriticalCSS } from '@/lib/critical-css'

export default function RootLayout({ children }) {
  const criticalCSS = getCriticalCSS()

  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

#### JavaScript Optimization

**Tree Shaking:**
```typescript
// Import only what you need
import { debounce } from 'lodash-es/debounce'  // ✅ Good
import _ from 'lodash'  // ❌ Bad (imports everything)

// Use modern syntax for tree-shaking
export { Button } from './Button'  // ✅ Good
export default Button  // ❌ Bad (harder to tree-shake)
```

**Dependency Optimization:**
```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      'framer-motion',
      'lucide-react'
    ]
  }
}
```

### 2. Caching Strategy

#### Multi-Layer Caching

**Layer 1: Browser Cache**
```typescript
// Cache static assets
export const headers = () => ({
  'Cache-Control': 'public, max-age=31536000, immutable'
})
```

**Layer 2: CDN Cache (Vercel Edge)**
```typescript
// app/api/essences/[id]/route.ts
export const revalidate = 3600 // ISR: Revalidate every hour

export async function GET(request: Request, { params }) {
  const essence = await getEssence(params.id)

  return NextResponse.json(essence, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
}
```

**Layer 3: Application Cache (React Cache)**
```typescript
import { cache } from 'react'

export const getUser = cache(async (userId: string) => {
  return await db.user.findUnique({ where: { id: userId } })
})
```

**Layer 4: Database Cache (PostgreSQL)**
```sql
-- Materialized views for expensive queries
CREATE MATERIALIZED VIEW top_creators AS
SELECT
  u.id,
  u.username,
  COUNT(e.id) as essence_count,
  SUM(e.likes) as total_likes
FROM users u
LEFT JOIN essences e ON e.creator_id = u.id
GROUP BY u.id, u.username
ORDER BY total_likes DESC
LIMIT 100;

-- Refresh every hour
REFRESH MATERIALIZED VIEW CONCURRENTLY top_creators;
```

**Layer 5: Redis Cache (Upstash)**
```typescript
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export async function getCachedEssence(id: string) {
  // Try cache first
  const cached = await redis.get(`essence:${id}`)
  if (cached) return cached

  // Fetch from database
  const essence = await db.essence.findUnique({ where: { id } })

  // Cache for 1 hour
  await redis.setex(`essence:${id}`, 3600, essence)

  return essence
}
```

#### Cache Invalidation

**Invalidation Strategies:**
```typescript
// Time-based invalidation (TTL)
await redis.setex('key', 3600, value) // Expire after 1 hour

// Event-based invalidation
export async function updateEssence(id: string, data: any) {
  await db.essence.update({ where: { id }, data })

  // Invalidate cache
  await redis.del(`essence:${id}`)

  // Revalidate ISR
  revalidatePath(`/essences/${id}`)
}

// Tag-based invalidation
export const revalidate = 3600
export const tags = ['essences', `essence-${id}`]

// Invalidate all essences
revalidateTag('essences')
```

### 3. Database Optimization

#### Query Optimization

**Indexing Strategy:**
```sql
-- Composite indexes for common queries
CREATE INDEX idx_essences_creator_created
ON essences(creator_id, created_at DESC);

CREATE INDEX idx_essences_realm_public
ON essences(realm_id, is_public)
WHERE is_public = true;

-- Partial indexes
CREATE INDEX idx_essences_featured
ON essences(created_at DESC)
WHERE featured = true;

-- GIN indexes for full-text search
CREATE INDEX idx_essences_search
ON essences USING GIN(to_tsvector('english', title || ' ' || description));

-- Vector indexes for similarity search
CREATE INDEX idx_guardian_memories_embedding
ON guardian_memories
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

**Query Patterns:**
```typescript
// Eager loading to avoid N+1
const essences = await db.essence.findMany({
  include: {
    creator: {
      select: { id: true, username: true, avatar: true }
    },
    realm: {
      select: { id: true, name: true, slug: true }
    }
  }
})

// Pagination with cursor
const essences = await db.essence.findMany({
  take: 20,
  skip: cursor ? 1 : 0,
  cursor: cursor ? { id: cursor } : undefined,
  orderBy: { createdAt: 'desc' }
})

// Batch queries
const essenceIds = ['id1', 'id2', 'id3']
const essences = await db.essence.findMany({
  where: { id: { in: essenceIds } }
})
```

#### Connection Pooling

**Prisma Configuration:**
```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**Supabase Pooler:**
```
Connection pooling mode: Transaction
Pool size: 20
Max client connections: 100
```

### 4. AI Operations Optimization

#### Response Streaming

**Streaming AI Responses:**
```typescript
export async function POST(req: Request) {
  const { message } = await req.json()

  const stream = new ReadableStream({
    async start(controller) {
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        messages: [{ role: 'user', content: message }],
        stream: true,
      })

      for await (const chunk of response) {
        if (chunk.type === 'content_block_delta') {
          controller.enqueue(
            new TextEncoder().encode(chunk.delta.text)
          )
        }
      }

      controller.close()
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  })
}
```

#### AI Result Caching

**Cache Similar Prompts:**
```typescript
import { createHash } from 'crypto'

function hashPrompt(prompt: string): string {
  return createHash('sha256').update(prompt).digest('hex')
}

export async function generateWithCache(prompt: string) {
  const hash = hashPrompt(prompt)
  const cached = await redis.get(`ai:${hash}`)

  if (cached) {
    return { result: cached, cached: true, cost: 0 }
  }

  const result = await generateWithAI(prompt)

  // Cache for 24 hours
  await redis.setex(`ai:${hash}`, 86400, result)

  return { result, cached: false, cost: calculateCost(result) }
}
```

#### Batch Processing

**Queue System for AI Operations:**
```typescript
import { Queue } from 'bullmq'

const imageQueue = new Queue('image-generation', {
  connection: {
    host: process.env.REDIS_HOST,
    port: 6379,
  }
})

// Add job to queue
await imageQueue.add('generate', {
  userId,
  prompt,
  parameters,
}, {
  priority: user.tier === 'REALM_BUILDER' ? 1 : 10,
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 2000,
  }
})
```

### 5. Asset Delivery Optimization

#### CDN Configuration

**Cloudflare CDN Settings:**
```
Cache Everything: Enabled
Edge Cache TTL: 1 month (static assets)
Browser Cache TTL: 1 week
Auto Minify: JS, CSS, HTML
Brotli Compression: Enabled
Early Hints: Enabled
```

**Image Optimization:**
```
Format: Auto (WebP, AVIF fallback)
Quality: 85
Resize: On-demand
Lazy Loading: Native browser
Blur Placeholder: LQIP (Low Quality Image Placeholder)
```

#### Preloading & Prefetching

**Resource Hints:**
```typescript
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://cdn.arcanea.ai" />
        <link rel="preconnect" href="https://api.arcanea.ai" />

        {/* DNS Prefetch for third-party */}
        <link rel="dns-prefetch" href="https://analytics.arcanea.ai" />

        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Next.js Link Prefetching:**
```typescript
import Link from 'next/link'

// Automatic prefetching on hover
<Link href="/studio" prefetch={true}>
  Studio
</Link>

// Prefetch programmatically
import { useRouter } from 'next/navigation'

const router = useRouter()
router.prefetch('/realms/crystal-gardens')
```

### 6. Mobile Performance

#### Mobile-Specific Optimizations

**Responsive Images:**
```typescript
<Image
  src="/essence.webp"
  alt="Essence"
  width={800}
  height={800}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
/>
```

**Adaptive Loading:**
```typescript
import { useNetworkState } from 'react-use'

export function AdaptiveImage({ src, alt }) {
  const { effectiveType } = useNetworkState()
  const quality = effectiveType === '4g' ? 90 : 70

  return (
    <Image src={src} alt={alt} quality={quality} />
  )
}
```

**Touch Optimization:**
```css
/* Larger touch targets for mobile */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  padding: 12px;
}

/* Prevent 300ms tap delay */
html {
  touch-action: manipulation;
}
```

### 7. Monitoring & Measurement

#### Real User Monitoring (RUM)

**Web Vitals Tracking:**
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

**Custom Performance Tracking:**
```typescript
export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Log to analytics
  if (metric.label === 'web-vital') {
    console.log({
      name: metric.name,
      value: metric.value,
      id: metric.id,
    })

    // Send to analytics service
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify(metric),
    })
  }
}
```

#### Synthetic Monitoring

**Lighthouse CI:**
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://arcanea.ai
            https://academy.arcanea.ai
            https://studio.arcanea.ai
          uploadArtifacts: true
```

**Performance Budget:**
```json
{
  "lighthouse": {
    "performance": 90,
    "accessibility": 100,
    "best-practices": 100,
    "seo": 100
  },
  "budgets": [
    {
      "path": "/*",
      "resourceSizes": [
        { "resourceType": "script", "budget": 300 },
        { "resourceType": "total", "budget": 500 }
      ]
    }
  ]
}
```

## Performance Testing

### Load Testing

**k6 Load Test:**
```javascript
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Ramp to 200 users
    { duration: '5m', target: 200 },  // Stay at 200 users
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests < 500ms
    http_req_failed: ['rate<0.01'],    // Error rate < 1%
  },
}

export default function () {
  const res = http.get('https://arcanea.ai/api/essences')

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  })

  sleep(1)
}
```

### Performance Regression Testing

**Automated Performance Tests:**
```typescript
// __tests__/performance/page-load.test.ts
import { test, expect } from '@playwright/test'

test('homepage loads within 2 seconds', async ({ page }) => {
  const startTime = Date.now()

  await page.goto('https://arcanea.ai')

  const loadTime = Date.now() - startTime

  expect(loadTime).toBeLessThan(2000)

  // Check Web Vitals
  const lcp = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        resolve(lastEntry.startTime)
      }).observe({ entryTypes: ['largest-contentful-paint'] })
    })
  })

  expect(lcp).toBeLessThan(2500)
})
```

## Performance Checklist

### Before Every Release

- [ ] Lighthouse score > 95 on all pages
- [ ] All images optimized (WebP format)
- [ ] Bundle size within budget
- [ ] No render-blocking resources
- [ ] Critical CSS inlined
- [ ] Fonts optimized
- [ ] Database queries indexed
- [ ] Cache strategy implemented
- [ ] Load test passed
- [ ] Web Vitals within targets

### Monthly Review

- [ ] Review RUM metrics
- [ ] Analyze slow queries
- [ ] Check CDN hit rate
- [ ] Review bundle sizes
- [ ] Audit dependencies
- [ ] Test on slow networks
- [ ] Review AI operation costs
- [ ] Optimize heaviest pages

---

**Performance is not optional. It's core to the magical Arcanea experience.**
