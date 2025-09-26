# Arcanea Ecosystem — Candid Assessment (Sept 2025)

<doc type="assessment" version="1.0" scope="C:\\Users\\Frank\\Arcanea">

## Executive Summary
- Strengths: rich vision, many drafts, working Next.js and Expo stubs, early UI package, extensive marketing/story docs, Turborepo + Tailwind seeds.
- Weaknesses: naming inconsistency, duplicate apps (Expo/mobile), scattered docs, unclear source of truth, no ADRs, mixed tech stacks, incomplete design system, weak guardrails for AI agents, and unversioned content proliferation.
- Opportunities: unify into a clean monorepo with clear sub‑repos, adopt a real design system (Tailwind + shadcn/ui + Lucide), define an authoritative knowledge base with trust levels, establish agent roles and gates, and implement a tight migration plan.
- Risks: scope creep, asset sprawl, and accidental overwrite by agents.

## Current Structure (observed highlights)
- Monorepo signals: `pnpm-workspace.yaml`, `turbo.json`, `packages/` (`ui`, `database`, `ai-core`), `apps/academy`.
- Parallel app roots: `Arcanea App` (Expo), `arcanea-mobile` (Expo), `apps/academy` (Next.js), `Arcanea Beastary` (Next.js+HTML). These should be normalized under `apps/`.
- Docs sprawl: strategy and philosophy across many `.md` files without a canonical index or status.
- Design system fragments: `packages/ui` exists, but not coherently integrated; multiple Tailwind configs; no central tokens or icon standard.
- Data: `packages/database` with Prisma schema; lacks migration workflow reference and env separation.
- Agent content: several agent docs exist but no single operating model or guardrails.

## Quality Gaps
1. Naming and taxonomy
   - Mixed casing, spaces in folder names, typos (Beastary/Bestiary), brand lexicon inconsistent.
2. Source of truth
   - No trust levels; drafts and canonical compete; no ADRs or RFCs.
3. Platform architecture
   - Mixed frameworks duplicated; unclear domains and boundaries.
4. Design system
   - Missing tokenized scales, icon set standard, components library policy, stories.
5. Agentic workflow
   - No role charter, checklists, or gating; hallucination and file sprawl.
6. Delivery engineering
   - Missing CI checks, release versioning, environment configs, and migration scripts.

## What to Preserve
- The creative canon (Luminors, Realms concepts) as IP with a curated glossary.
- `packages/ui` as the seed for the unified design system.
- `packages/ai-core` abstractions; evolve into agent SDK.
- `packages/database` Prisma schema; move to proper migrations and seed/playground.

## What to Deprecate / Consolidate
- Duplicate mobile apps: fold into one `apps/mobile` (Expo/Router) and archive the other.
- Separate “Arcanea App” and “arcanea-mobile” naming; use `apps/` normalized names.
- HTML mockups that duplicate React pages; keep a single `apps/showcase` for static demos.

## Decision Records Needed (initial)
- ADR-001: Monorepo topology and package policies
- ADR-002: Design system stack (Tailwind + shadcn/ui + Radix + Lucide)
- ADR-003: App lineup and ownership
- ADR-004: Knowledge Base governance and trust levels
- ADR-005: Agent Operating Model and safety gates
- ADR-006: Naming conventions and domain lexicon

</doc>

