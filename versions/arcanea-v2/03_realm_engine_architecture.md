# 03 · Arcanea Studio Platform Architecture

## 3.1 Platform Strategy
- **Arcanea Studio Platform** is the unified service layer managing Realms, Essences, Nexus intelligence, and Remix lineage.
- Expose services via clear domains: `/studio` (prompt desks), `/realms`, `/essences`, `/nexus`, `/echo`.
- Client experiences become **Portals**: Studio (web/mobile), Profile Portal, Sanctuary Console, Gallery Showcase, Forge Lab.

## 3.2 Technical Stack Alignment
| Layer | Decision |
|-------|----------|
| Edge Orchestration | Vercel Edge + Upstash Redis for auth, rate limiting, logging. |
| Studio Platform Core | Node/TypeScript services using Prisma → Supabase Postgres + Pinecone (vector) + S3 storage. |
| Nexus Intelligence | Modular adapters for leading models (OpenRouter LLMs, Nano Banana, Veo 3, Seedance, KlingAI, Suno). Luminor agents orchestrate tasks. |
| Data Contracts | Codex schemas updated: Realm, Essence, RemixLineage, SparkShadow entries. |
| UI Layer | Arcanea Stagecraft Palette (Tailwind/NativeWind) with optional Living Light motion presets. |

## 3.3 Module Map
```
/studio-platform
  /domains
    /spark      // prompt capture, inspiration metadata
    /essence    // generative output, remix lineage, model metadata
    /nexus      // creator-specific agent settings & memories
    /realm      // profile data, story, highlights
    /echo       // moderation, audit, vow compliance
```

## 3.4 Integration Checklist
- Migrate mobile app + chat experience to Studio Platform endpoints (`/studio/generate`, `/essence/remix`).
- Update SuperAgent provider to return Essence objects (id, realmId, nexusId, spark, shadow, remixFrom). 
- Feed Platform metrics into Atlas (daily Essence count, remix rate, active Creators/Guardians).

## 3.5 Security & Governance
- Role tiers: Guardian (approve canon + releases), Creator (own Realm), Collaborator (remix permissions).
- All operations log into Echo (who generated, model used, costs, moderation status).
- Sanctuary Portal handles approvals, report queue, ARC/NEA policy once live.

## 3.6 Milestones
1. **Spark Phase** – Deploy Studio Platform MVP powering Studio Portal + Arcanea Profiles (Q4 2025).
2. **Field Phase** – Enable Remix Feed, Soul Guardians releases, and Creator collaborations (Q1 2026).
3. **Realm Phase** – Open API keys, ARC credit system, marketplace integrations (mid 2026).
