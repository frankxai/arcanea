# Repo Restructure and Migration Plan

<doc type="migration" version="1.0">

## Objectives
- Normalize names and paths.
- Consolidate apps under `apps/` and services under `services/`.
- Centralize tokens, UI, and shared configs.

## Current → Target Mapping
- `Arcanea Beastary` → `apps/web-bestiary` (fix spelling to Bestiary)
- `Arcanea App` (Expo) and `arcanea-mobile` → consolidate into `apps/mobile`
- HTML mockups (`premium-mockups`, `mobile-mockups`, `mockups`, `content/demos`) → `apps/showcase`
- `packages/ui` → keep and upgrade to shadcn/ui foundation
- `packages/database` → keep; add migrations folder and seed
- `packages/ai-core` → keep; define agent SDK contracts

## Naming Rules
- kebab-case for folder and package names; no spaces.
- Scoped packages: `@arcanea/ui`, `@arcanea/design-tokens`, etc.

## Steps
1. Freeze current repo (tag `pre-restructure`).
2. Create new directories: `apps/web-academy`, `apps/web-bestiary`, `apps/mobile`, `apps/showcase`, `services/*`.
3. Move code/files per mapping; update imports and package.json names.
4. Install shadcn/ui and seed base components into `packages/ui`.
5. Extract Tailwind config into shared preset under `packages/config`.
6. Set up Storybook in `packages/ui`.
7. Wire tRPC in `services/api-gateway` and adopt contracts in apps.
8. Establish CI: typecheck, lint, test, build for each pipeline.
9. Remove/Archive legacy folders after verification.

## Non-Goals (first pass)
- Content rewriting; only structure and tooling.
- Full infra automation; initial CI only.

## Rollback Plan
- Keep `pre-restructure` tag and a `legacy/` folder with untouched copies during migration.

</doc>

