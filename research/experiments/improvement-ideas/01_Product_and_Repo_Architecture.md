# Product and Repository Architecture — Target 2025

<doc type="architecture" version="1.0">

## Product Lineup (domains and owners)
- apps/web-academy (Next.js 14, App Router): learning platform, content, community.
- apps/web-bestiary (Next.js 14): Bestiary explorer and creators’ compendium.
- apps/mobile (Expo + Expo Router): companion app; synced features only.
- apps/showcase (Vite/Static): marketing and interactive demos; no backend.
- services/api-gateway (tRPC/Next API routes or Fastify): single edge for clients.
- services/content (Next.js route handlers): MDX content pipeline + search.
- services/agents (Node service): agent orchestration, tools, safety gates.
- packages/ui: design system (Tailwind + shadcn/ui + Radix + Lucide).
- packages/design-tokens: color/typography/radius/blur/gradients (Style Dictionary).
- packages/ai-core: agent SDK, prompt utilities, evaluators.
- packages/database: Prisma schema + migrations and seed.
- packages/config: ESLint, Prettier, TS configs.
- packages/brand: shared brand assets (logos, gradients, textures).

## Monorepo Layout (Turborepo + pnpm)
```
apps/
  web-academy/
  web-bestiary/
  mobile/
  showcase/
services/
  api-gateway/
  content/
  agents/
packages/
  ui/
  design-tokens/
  ai-core/
  database/
  config/
  brand/
docs/
  adr/
  kb/
```

## External Repos (split for audience)
- github.com/arcanea-org/arcanea-community (public): brand site, docs, showcase.
- github.com/arcanea-org/arcanea-bestiary (public): Bestiary data + site.
- github.com/arcanea-org/arcanea-library (public): curated knowledge excerpts.
- github.com/arcanea-labs/arcanea-platform (private): full monorepo (this repo).

## Technology Stack
- Web: Next.js 14 (App Router, RSC), TypeScript, Tailwind 3.4, shadcn/ui, Radix Primitives, Lucide Icons.
- Mobile: Expo SDK 51+, React Native, Expo Router.
- API: tRPC over Next Route Handlers or Fastify server where needed.
- Data: PostgreSQL + Prisma; SQLite for local dev; Neon or Supabase for hosted dev.
- Auth: NextAuth.js (web), Expo Auth Session (mobile) with shared provider config.
- Infra: Vercel (web/services), Expo EAS (mobile), GitHub Actions CI.

## Boundaries and Data Flow
- Clients call `api-gateway` tRPC procedures; the gateway delegates to domain services.
- Prisma used only inside services; clients receive DTOs, not Prisma models.
- Content (MDX) compiled server-side; search index built nightly.
- Agents service operates on a restricted toolset with signed tasks and read-only by default.

## Migrations and Seeds
- Use `prisma migrate` with environment-specific `.env` files.
- Provide `seed.ts` for demo content and Bestiary starter data.

## Observability
- Request logging via pino, metrics via OpenTelemetry, error tracking via Sentry.

</doc>

