# Arcanea Repo Split, Domains, and Deployment Strategy

Date: 2025-09-12

## Goals

- Balance open-source momentum with a viable SaaS.
- Simplify contributor experience with clear app boundaries.
- Map apps to subdomains for a coherent product surface.

## Domains → Apps

- arcanea.ai → Marketing site (`apps/web`)
- chat.arcanea.ai → Public conversational interface (New: `apps/chat`)
- studio.arcanea.ai → Image/video creation studio (Future: `apps/studio`)
- gallery.arcanea.ai → Public showcase feed/gallery (Future: `apps/gallery`)
- nexus.arcanea.ai → Hub/community/learning (existing `apps/nexus` once stabilized)
- workstation.arcanea.ai → Self-hosted LibreChat for power users/enterprise (external deployment)
- beastiary.arcanea.ai → Bestiary (split repo from in-repo app)

## Monorepo vs Multi-Repo

Recommended: Organization-level multi-repo for public apps + a private platform monorepo for internal glue.

Public Repos (OSS-friendly):
- arcanea-chat (Next.js + Vercel AI SDK, permissive license)
- arcanea-studio (Next.js, modular providers for image/video)
- arcanea-gallery (Next.js, read-only until auth lands)
- arcanea-ui (shadcn/radix based components)
- arcanea-ai-core (provider-agnostic wrappers built on Vercel AI SDK)
- arcanea-bestiary (spin out existing app)

Private Repos:
- arcanea-platform (monorepo for paid features, billing, platform auth, internal docs)
- arcanea-data (prompts, fine-tunes, proprietary datasets)

## OSS vs Private Boundaries

- Open Source:
  - UI components, generic agent orchestration wrappers, non-proprietary prompts, bestiary app and data that’s safe to share.
- Private:
  - SaaS plans/billing, proprietary prompt chains, premium model routing, internal scripts, operations dashboards.

## Deployment

- Vercel projects per app; use environment-scoped secrets.
- CD: Vercel Git integrations; branch deploy previews.
- For LibreChat: deploy separately (Render/Fly/K8s) behind auth; connect to org SSO.

## Short-Term Actions

1. Create `apps/chat` now; deploy to chat.arcanea.ai.
2. Add minimal `apps/web` landing and route arcanea.ai.
3. Split bestiary into `arcanea-bestiary` repo and deploy beastiary.arcanea.ai.
4. Stabilize `apps/academy` for internal demos; later merge features into Nexus.

