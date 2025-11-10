# Arcanea Platform - Architecture Decisions Record

## Executive Summary

Arcanea is built as a modern, scalable platform designed for magical creation at global scale. This document outlines our core architectural decisions, their rationale, and trade-offs.

## 1. Technology Stack

### Frontend Framework: Next.js 14 (App Router)

**Decision:** Use Next.js 14 with App Router as the primary frontend framework

**Rationale:**
- **Server Components**: Reduce JavaScript bundle size, improve initial load times
- **Streaming SSR**: Progressive page rendering for better perceived performance
- **Edge Runtime**: Deploy compute closer to users globally
- **File-based Routing**: Intuitive structure matches Arcanea's realm-based navigation
- **Image Optimization**: Critical for visual academy content and creator galleries
- **API Routes**: Unified codebase for frontend and BFF (Backend for Frontend)
- **TypeScript-first**: Type safety across the entire stack

**Trade-offs:**
- Learning curve for App Router patterns (mitigated by excellent documentation)
- Framework lock-in (acceptable given maturity and backing by Vercel)

**Alternatives Considered:**
- **Remix**: Great DX, but smaller ecosystem and less mature image optimization
- **SvelteKit**: Excellent performance, but smaller talent pool and library ecosystem
- **Astro**: Perfect for content sites, insufficient for complex interactive features

### Database: Supabase (PostgreSQL + Realtime + Auth + Storage)

**Decision:** Use Supabase as the primary database and backend infrastructure

**Rationale:**
- **PostgreSQL Foundation**: Battle-tested, supports complex queries and JSONB for flexible schemas
- **Built-in Auth**: Row-level security, JWT tokens, multiple providers out of the box
- **Realtime Subscriptions**: Essential for live Guardian interactions and collaborative features
- **Edge Functions**: Serverless compute for AI orchestration and complex operations
- **Object Storage**: Integrated file storage for .arc files, Realm exports, avatars
- **Database Branching**: Preview deployments with isolated data (Enterprise feature)
- **Vector Support**: pgvector extension for Guardian memory and semantic search
- **Managed Infrastructure**: Focus on product, not database operations

**Trade-offs:**
- Vendor lock-in (mitigated by PostgreSQL compatibility and data portability)
- Potential scaling costs at massive scale (offset by managed operations savings)

**Alternatives Considered:**
- **PlanetScale**: Great for scale, but no built-in auth/storage/realtime
- **Neon**: Excellent serverless Postgres, lacks integrated ecosystem
- **Firebase**: Good realtime, but NoSQL model doesn't fit complex relational data
- **Self-hosted PostgreSQL**: Maximum control, but significant operations overhead

### ORM: Prisma

**Decision:** Use Prisma as the database ORM and schema management tool

**Rationale:**
- **Type Safety**: Generated TypeScript types from schema
- **Migration System**: Version-controlled database evolution
- **Intuitive API**: Reduces boilerplate, improves developer velocity
- **Connection Pooling**: Built-in optimization for serverless environments
- **Multi-database Support**: Future flexibility if needed
- **Schema as Source of Truth**: Clear, declarative data modeling

**Trade-offs:**
- Abstraction overhead for complex queries (can drop to raw SQL when needed)
- Build step required (acceptable with modern tooling)

### Styling: Tailwind CSS + shadcn/ui

**Decision:** Use Tailwind CSS with shadcn/ui component library

**Rationale:**
- **Utility-first**: Rapid prototyping while maintaining design consistency
- **No Runtime**: Zero JavaScript overhead for styling
- **Design Tokens**: Easy theme customization for Arcanean visual identity
- **shadcn/ui**: Copy-paste components, full ownership, no dependency lock-in
- **Accessibility**: Components built with Radix UI primitives
- **Dark Mode**: Built-in support critical for creator tools

**Trade-offs:**
- HTML verbosity (mitigated by component abstraction)

### Monorepo: Turborepo

**Decision:** Use Turborepo for monorepo orchestration

**Rationale:**
- **Smart Caching**: Only rebuild what changed
- **Parallel Execution**: Maximize CPU utilization during builds
- **Remote Caching**: Share build artifacts across team and CI
- **Simple Configuration**: Minimal setup compared to alternatives
- **Vercel Integration**: Seamless deployment of monorepo apps

**Trade-offs:**
- Less mature than alternatives like Nx (acceptable for our scale)

**Monorepo Structure:**
```
apps/
  web/              # Marketing site (arcanea.ai)
  academy/          # Academy platform (academy.arcanea.ai)
  studio/           # Creation studio (studio.arcanea.ai)
  realms/           # Realm explorer (realms.arcanea.ai)
  nexus/            # Social network (nexus.arcanea.ai)
  sanctuary/        # Admin panel (internal)

packages/
  ui/               # Shared UI components
  database/         # Prisma schema and migrations
  ai-core/          # AI orchestration and Luminor engine
  guardian-ai/      # Personal Guardian system
  realm-engine/     # Realm management
  auth/             # Authentication utilities
  config/           # Shared configs (ESLint, TypeScript, Tailwind)
```

## 2. AI Infrastructure

### AI Orchestration: Multi-Provider Strategy

**Decision:** Use a multi-provider strategy with intelligent routing

**Architecture:**
```typescript
AI Providers:
  - Primary: Anthropic Claude (Sonnet 3.5) for Guardian/Luminor interactions
  - Secondary: OpenAI GPT-4o for specialized tasks
  - Image: Replicate (FLUX, SDXL) for visual generation
  - Music: Suno API for audio creation
  - Video: Runway Gen-3 for motion content
```

**Rationale:**
- **Best-of-breed**: Each provider excels at different tasks
- **Redundancy**: Fallback if primary provider has issues
- **Cost Optimization**: Route to most cost-effective option per task
- **Feature Access**: Use newest capabilities as they launch

**Implementation:**
```typescript
// packages/ai-core/orchestrator.ts
class AIOrchestrator {
  async route(request: AIRequest): Promise<AIResponse> {
    const provider = this.selectProvider(request.type, request.priority)
    return this.execute(provider, request)
  }

  private selectProvider(type: AITaskType, priority: Priority) {
    // Intelligent routing based on task type, cost, latency requirements
  }
}
```

### Guardian Memory: Hybrid Vector + Graph

**Decision:** Use hybrid vector database (Supabase pgvector) + knowledge graph

**Rationale:**
- **Semantic Search**: Vector embeddings for context retrieval
- **Relationship Mapping**: Graph structure for connected knowledge
- **Native Integration**: pgvector runs in same database as application data
- **Cost Efficiency**: No separate vector database infrastructure

**Implementation:**
```sql
-- Enhanced Guardian Memory
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE guardian_memories (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  content TEXT,
  embedding vector(1536),  -- OpenAI ada-002 dimensions
  memory_type VARCHAR(50),
  connections JSONB,        -- Graph relationships
  importance_score FLOAT,
  created_at TIMESTAMPTZ,
  accessed_at TIMESTAMPTZ
);

CREATE INDEX ON guardian_memories
USING ivfflat (embedding vector_cosine_ops);
```

## 3. Authentication & Security

### Authentication: Supabase Auth + Custom Extensions

**Decision:** Use Supabase Auth with custom Guardian-based authentication extensions

**Rationale:**
- **Multiple Providers**: Email, Google, Discord, Apple out of the box
- **Row Level Security**: Database-level access control
- **JWT Tokens**: Stateless authentication, works with Edge
- **Magic Links**: Passwordless auth for better UX
- **Custom Claims**: Extend tokens with Guardian/Arcanean identity

**Security Measures:**
```typescript
// Row-Level Security Example
CREATE POLICY "Users can view own Realms"
ON realms FOR SELECT
USING (auth.uid() = creator_id OR is_public = true);

CREATE POLICY "Creators can edit own Essences"
ON essences FOR UPDATE
USING (auth.uid() = creator_id);
```

### API Security

**Layers:**
1. **Edge Rate Limiting**: Cloudflare/Vercel Edge
2. **Authentication**: Supabase JWT validation
3. **Authorization**: RBAC with custom policies
4. **Input Validation**: Zod schemas for all inputs
5. **CSRF Protection**: Built into Next.js
6. **Content Security Policy**: Strict CSP headers

## 4. File Storage Architecture

### Decision: Supabase Storage + CDN

**Rationale:**
- **Integrated**: Same platform as database/auth
- **Access Control**: RLS policies on storage buckets
- **CDN**: Automatic global distribution
- **Transformations**: On-the-fly image resizing

**Bucket Structure:**
```
Buckets:
  avatars/            # User profile images (public)
    {user_id}/{image_id}.webp

  essences/           # Created content (private)
    {user_id}/{essence_id}/
      original.{ext}
      thumbnail.webp
      metadata.json

  realms/             # Realm exports (private)
    {realm_id}/
      manifest.realm
      assets/

  public/             # Shared assets (public CDN)
    luminors/
    academies/
```

## 5. Real-time Architecture

### Decision: Supabase Realtime for Live Features

**Use Cases:**
- **Guardian Chat**: Live AI responses streaming
- **Collaborative Creation**: Multi-user real-time editing
- **Presence**: See who's active in Academies/Realms
- **Notifications**: Instant remix alerts, comments, likes

**Implementation:**
```typescript
// Real-time Guardian chat
const channel = supabase.channel(`guardian:${userId}`)
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'guardian_interactions',
    filter: `user_id=eq.${userId}`
  }, (payload) => {
    displayGuardianResponse(payload.new)
  })
  .subscribe()
```

## 6. Performance Strategy

### Decision: Multi-tiered Caching + Edge Computing

**Caching Layers:**

1. **Browser Cache**: Static assets, service worker
2. **CDN Cache**: Vercel Edge Network (300+ locations)
3. **Edge Cache**: Next.js ISR (Incremental Static Regeneration)
4. **Application Cache**: Redis (Upstash) for API responses
5. **Database Cache**: Supabase connection pooling + query caching

**Performance Targets:**
- **TTFB**: < 100ms (Edge)
- **LCP**: < 2.5s (all pages)
- **FID**: < 100ms (interactions)
- **CLS**: < 0.1 (layout stability)
- **Lighthouse**: > 95 (all metrics)

### Edge Computing Strategy

**Decision:** Deploy globally on Vercel Edge Network

**Edge Functions:**
```typescript
// middleware.ts - Edge runtime
export const config = {
  matcher: [
    '/api/:path*',
    '/studio/:path*',
  ],
  runtime: 'edge'
}

export function middleware(req: NextRequest) {
  // A/B testing
  // Geolocation-based routing
  // Authentication checks
  // Rate limiting
}
```

## 7. Deployment Architecture

### Decision: Vercel (Frontend) + Supabase (Backend)

**Infrastructure Map:**
```
Production:
  Frontend:
    - Vercel Edge Network (300+ locations)
    - Automatic HTTPS, DDoS protection
    - Preview deployments per PR

  Backend:
    - Supabase (US West, EU West, Asia Pacific)
    - Auto-scaling PostgreSQL
    - Edge Functions (Deno runtime)

  CDN:
    - Cloudflare (assets, images)
    - Vercel Edge (app delivery)

  Monitoring:
    - Vercel Analytics
    - Sentry (error tracking)
    - LogDrain → Axiom (logs)
    - Supabase Dashboard (database metrics)
```

### CI/CD Pipeline

**Decision:** GitHub Actions + Vercel

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - Checkout
      - Setup Node
      - Install dependencies (pnpm)
      - Lint (Turborepo)
      - Type check (Turborepo)
      - Test (Turborepo)
      - Build (Turborepo)

  deploy-preview:
    if: github.event_name == 'pull_request'
    needs: build-and-test
    # Automatic preview deployment

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: build-and-test
    # Production deployment
    # Database migrations
    # Smoke tests
```

## 8. Data Migration Strategy

### Decision: Prisma Migrate + Custom Scripts

**Migration Workflow:**
```bash
# Development
pnpm db:migrate:dev    # Create and apply migration

# Preview (automatic per PR)
pnpm db:migrate:preview

# Production
pnpm db:migrate:deploy # Run in CI/CD
```

**Rollback Strategy:**
- All migrations are reversible
- Database backups before major changes
- Blue-green deployment for zero-downtime
- Feature flags for gradual rollouts

## 9. Monitoring & Observability

### Decision: Multi-tool Observability Stack

**Tools:**
1. **Application Monitoring**: Vercel Analytics + Web Vitals
2. **Error Tracking**: Sentry (React + API)
3. **Logging**: Axiom (structured logs)
4. **Database**: Supabase Dashboard
5. **AI Monitoring**: Custom dashboard (usage, costs, latency)
6. **User Analytics**: PostHog (privacy-friendly)

**Key Metrics:**
```typescript
const CRITICAL_METRICS = {
  // Performance
  pageLoadTime: '< 3s',
  apiLatency: '< 500ms',
  aiResponseTime: '< 5s',

  // Reliability
  uptime: '99.9%',
  errorRate: '< 0.1%',

  // Business
  dau: 'daily active users',
  creationsPerDay: 'essence creation rate',
  guardianInteractions: 'AI usage',

  // Costs
  aiCostPerUser: '< $0.50/day',
  infraCostPerUser: '< $2/month'
}
```

## 10. Cost Optimization

### Decision: Usage-based + Reserved Capacity Hybrid

**Cost Structure:**
```
Infrastructure (~$500/month at 1K users):
  - Vercel Pro: $20/month
  - Supabase Pro: $25/month
  - Upstash Redis: $10/month
  - Cloudflare Pro: $20/month
  - Domain & SSL: $15/month
  - Monitoring: $30/month

AI Costs (Variable):
  - Anthropic: ~$0.10 per guardian conversation
  - Image Gen: ~$0.05 per image
  - Music Gen: ~$0.20 per song
  - Vector DB: ~$0.01 per 1K queries

  Target: < $0.50 per active user per day

Revenue (at scale):
  - Free: $0 (80% of users)
  - Creator ($20/mo): 15% of users
  - Realm Builder ($100/mo): 5% of users

  Break-even: ~500 paying users
```

**Optimization Strategies:**
- Cache aggressive for AI responses
- Rate limiting by tier
- Background processing for non-urgent tasks
- Reserved capacity for predictable workloads

## 11. Scalability Plan

### Horizontal Scaling Architecture

**Current (MVP - 10K users):**
- Single Supabase instance
- Vercel Edge (auto-scales)
- Shared AI provider accounts

**Growth (100K users):**
- Multi-region Supabase (US, EU, APAC)
- Dedicated AI endpoints
- Upstash Redis cluster
- Read replicas for analytics

**Scale (1M+ users):**
- Database sharding by region
- Dedicated vector database (Pinecone/Weaviate)
- AI provider enterprise agreements
- Custom AI model fine-tuning
- Microservices for heavy operations

## 12. Disaster Recovery

### Decision: Automated Backups + Point-in-time Recovery

**Backup Strategy:**
```
Database:
  - Continuous WAL archiving (Supabase)
  - Daily full backups (retained 30 days)
  - Point-in-time recovery (7 days)

Storage:
  - Versioned objects (S3-compatible)
  - Cross-region replication

Code:
  - Git (source of truth)
  - Vercel deployment history

Recovery Time Objectives:
  - RTO: < 1 hour
  - RPO: < 15 minutes
```

## 13. Testing Strategy

### Decision: Testing Pyramid + E2E for Critical Paths

```
Testing Levels:
  Unit Tests (70%):
    - Vitest for utilities and hooks
    - React Testing Library for components

  Integration Tests (20%):
    - API route testing
    - Database operations
    - AI orchestration

  E2E Tests (10%):
    - Playwright for critical user journeys
    - Creator onboarding flow
    - Guardian interaction
    - Essence creation
    - Remix workflow
```

## 14. Developer Experience

### Decision: Modern DX with Fast Feedback Loops

**Tools:**
- **Package Manager**: pnpm (faster, efficient)
- **Type Checking**: TypeScript strict mode
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Local Development**: Docker Compose (optional)
- **Documentation**: Markdown in repo
- **API Testing**: Thunder Client / Postman collections

**Development Workflow:**
```bash
# Start all apps
pnpm dev

# Start specific app
pnpm dev:academy

# Type check
pnpm type-check

# Run tests
pnpm test

# Database management
pnpm db:studio
pnpm db:seed
```

## 15. Future Considerations

### Planned Evolution

**Phase 1 (Now - 6 months):**
- Monolith architecture with monorepo
- Supabase backend
- Multi-provider AI

**Phase 2 (6-12 months):**
- Extract AI orchestration to dedicated service
- Implement queue system (Inngest/BullMQ)
- Advanced caching (Redis)

**Phase 3 (12-24 months):**
- Microservices for heavy operations
- Custom AI model hosting
- Multi-tenant architecture for enterprise

**Phase 4 (24+ months):**
- Global edge database (Turso/PlanetScale)
- Real-time collaboration infrastructure
- On-premise deployment option

## Conclusion

This architecture is designed to:
1. **Start Simple**: Ship fast, validate product-market fit
2. **Scale Gracefully**: Clear path from MVP to millions of users
3. **Stay Flexible**: Can swap components as needs evolve
4. **Optimize Costs**: Efficient resource usage, pay for what you use
5. **Developer Joy**: Modern stack, great DX, fast iteration

**The architecture supports the vision: Making magical creation accessible to everyone, at global scale.**
