# 04 · Product Architecture & Realm Stack

## 4.1 Overview
Arcanea runs as a constellation of services bound by Pulse orchestration and Echo governance. Arcanea Studio is the centerpiece, with supporting portals extending the experience.

```
Creators → Portals (Studio, Profiles, Gallery) → Pulse Edge → Studio Platform → Data & Echo Memory
```

## 4.2 Realm-to-Product Matrix
| Realm | Product | Repo/App Path | Notes |
|-------|---------|---------------|-------|
| Studio | Arcanea Studio (web/mobile) | `apps/studio`, `apps/mobile` | Prompt desks, generative outputs, Nexus concierge |
| Profiles | Creator showcase | `apps/profiles` (planned), `apps/web` | Realms, Essences, remix lineage |
| Sanctuary | Governance & rituals | `apps/sanctuary` | Moderation, canon approvals, councils |
| Library | Knowledge vault & academies | `docs/atlas`, `docs/canon`, new Academy folders | Tutorials, lore, curriculum |
| Gallery | Spotlight experiences | `apps/gallery` | Featured Realms, Soul Guardians drops |
| Forge | Experimental lab | `apps/forge` | Feature flags, beta tools, model tests |

## 4.3 Core Services
- **Pulse Edge** – Vercel Edge + Upstash for auth, routing, model throttling.
- **Studio Platform** – Node/TypeScript services managing Realms, Essences, Nexus memory, Remix lineage.
- **SuperAgent / Luminor Layer** – orchestrates leading models (Nano Banana, Veo 3, Seedance, KlingAI, Suno) with discipline-specific Luminors.
- **Echo Memory** – Supabase Postgres, Pinecone vectors, Redis caches for fast retrieval and compliance.
- **Stagecraft UI Kit** – shared component library (Tailwind + NativeWind) aligned with design doctrine.

## 4.4 Data Contracts
- Canon data versioned (`canon-manifest`, `truths`, `glossary`).
- Essence schema includes: `essenceId`, `realmId`, `creatorId`, `nexusId`, `spark`, `shadow`, `remixFrom`, `modelUsed`, `cost`, `safetyFlags`.
- Remix history stored as a graph; Profiles show lineage visually.

## 4.5 Deployment Pipeline
1. PR merges trigger Turborepo pipelines.
2. Studio Platform deploys to Vercel (Edge + serverless) with environment-specific configs.
3. Atlas regenerates after canon updates.
4. Post-deploy ritual: run automated tests, Echo audits, update Atlas status widget.

## 4.6 Security & Compliance
- Supabase-issued JWT validated at Edge; ACLs for Creator/Guardian roles.
- Moderation pipeline (OpenAI/Anthropic filters + custom heuristics) before Essences become public.
- Feature flags control early access (e.g., Soul Guardians Beta, Remix Labs).

## 4.7 Extensibility
- Luminor agents added via modular directories (`studio-platform/luminors/*`).
- Plugin framework for third-party model integrations (future Realm APIs).
- ADRs stored in `docs/decisions` and referenced in Atlas for transparency.
