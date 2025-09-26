# Arcanea Codebase Status Report

Date: 2025-09-12

## Executive Summary

Arcanea is a pnpm + Turborepo monorepo with multiple Next.js apps, a Prisma database package, and a small shared UI/AI core. It contains extensive product/design/strategy docs and HTML mockups. Several apps and packages are incomplete or reference non-existent packages, preventing clean builds. The fastest path to value today is to (1) ship a functional chat app using Vercel AI SDK, (2) stabilize the Academy app metadata, and (3) publish a clear strategy + repo split plan.

## Monorepo Overview

- Tooling: pnpm workspaces, Turbo, TypeScript, Tailwind, PostCSS.
- Workspaces: `apps/*`, `packages/*`.
- Root configs: `turbo.json`, `pnpm-workspace.yaml`, `vercel.json`.

## Apps

- apps/academy (Next.js 14, App Router)
  - Status: Code present (pages/components), but `package.json` is missing, so it’s not runnable yet. Has a Chat UI page (`app/chat/page.tsx`) with no backend.

- apps/nexus (Next.js 14)
  - Status: Has `package.json`. Depends on internal packages that don’t exist (`@arcanea/guardian-ai`, `@arcanea/realm-engine`, `@arcanea/ui-cosmos`, `@arcanea/manifestation-tools`). Will not build until those are created or removed.

- apps/web (intended marketing site)
  - Status: Present as a directory but empty (no `package.json`).

- apps/mobile, apps/desktop
  - Status: Empty placeholders.

- Arcanea Beastary (standalone Next.js app in root directory)
  - Status: Complete Next.js app with Tailwind and Prisma wiring. Could be split into its own repo.

- Additional HTML prototype folders
  - `internal-docs/`, `mobile-mockups/`, `premium-mockups/`, `mockups/`, `Arcanea App/`, etc. Useful for design direction; not wired into build pipeline.

## Packages

- packages/ui
  - Status: Minimal shared components. The Academy app currently uses its own `components/ui` set; shared usage is inconsistent.

- packages/ai-core
  - Status: Very early. Only `luminors/base.ts` and `luminors/lumina.ts`. `index.ts` exports many non-existent modules (`providers/openai`, `providers/anthropic`, several luminors, tools). Will fail on import unless guarded.

- packages/database
  - Status: Prisma schema is comprehensive. No migrations or clear seeding flow tied to running apps. Requires `DATABASE_URL`.

## Infrastructure

- `vercel.json` at root is generic and not per-app. Actual deployments should be configured per app on Vercel.

## Chat Readiness (chat.arcanea.ai)

- UI: Academy contains a rich chat UI (app/chat/page.tsx), but no API routes.
- SDK: Vercel AI SDK not yet integrated anywhere.
- Conclusion: Not production-ready. We can ship a minimal `apps/chat` Next.js app today using Vercel AI SDK for text chat, plus an image generation endpoint using OpenAI Images if `OPENAI_API_KEY` is set.

## Immediate Issues to Resolve

1. apps/academy is missing `package.json` and base configs (postcss/tailwind) for a clean local run.
2. apps/nexus references internal packages that don’t exist; either create them or prune.
3. packages/ai-core exports non-existent modules; narrow exports or add placeholders.
4. Clarify which app maps to which subdomain (chat, studio, gallery, web) and configure Vercel projects accordingly.

## Readiness Scorecard (0–5)

- Monorepo Tooling: 4 — Configs present and coherent.
- Academy (education UX): 2 — Rich UI, missing package.json.
- Nexus (hub/community): 2 — Dependencies not available yet.
- Web (marketing): 1 — Placeholder only.
- Bestiary: 4 — Can be split/deployed standalone.
- Shared UI: 3 — Exists but not consistently used.
- AI Core: 2 — Needs scaffolding and Vercel AI SDK integration.
- Database: 3 — Strong schema; needs app integration/migrations.
- Chat (public): 2 — UI exists; no backend. Can reach 4 today with a minimal app.

## Recommended Next Steps (Today)

1. Ship `apps/chat` with Vercel AI SDK text chat; add image generation API.
2. Add `apps/academy/package.json` and minimal deps to run locally.
3. Publish strategy + repo split plan and domain mapping.
4. Decide OSS vs private boundaries and prepare repos.

## Notes

- Many high-quality docs exist (architecture, strategy, UX). Converting these into actionable trackers and per-app READMEs will accelerate onboarding and contributions.

