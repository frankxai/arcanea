# Arcanea Sprint Backlog -- Cycle 17-09

## Build (Owner: Codex)
- [ ] Persist last-selected Luminor tab using Expo Router navigation helpers (`apps/mobile/app/(tabs)/_layout.tsx`) and session storage. *Due 2025-09-29*
- [ ] Improve chat thread rendering with virtualization and shimmer placeholder in `apps/mobile/app/(tabs)/index.tsx`. *Due 2025-09-30*
- [ ] Implement provider routing abstraction under `packages/agents/chat` and integrate with `apps/mobile/app/(tabs)/index.tsx`. *Due 2025-09-30*
- [ ] Add optimistic send + retry states with toast feedback in `apps/mobile/app/(tabs)/index.tsx`. *Due 2025-10-01*
- [ ] Document Expo smoke test workflow in `apps/mobile/README.md` after wiring Detox-lite script. *Due 2025-10-02*

## Lore (Owner: Claude)
- [ ] Refresh chat onboarding copy and tooltips in `apps/mobile/app/(tabs)/index.tsx` to match Cycle 17-09 narrative. *Due 2025-09-29*
- [ ] Publish Realm launch ritual outline in `Arcanean Truths 17-09.md` (append-only section). *Due 2025-09-30*
- [ ] Draft investor one-pager summarizing mobile MVP progress; store in `docs/investor/updates/2025-09-30.md`. *Due 2025-09-30*
- [ ] Create release blog stub linking Bestiary spotlight to chat MVP; place in `content/blog/arcanea-chat-mvp.md`. *Due 2025-10-01*
- [ ] Align UI microcopy checklist for Codex handoff in `agents/handoff-template.md`. *Due 2025-10-02*

## Research (Owner: Gemini)
- [ ] Compare OpenRouter vs direct model integrations (Claude, GPT, Gemini) with latency/cost grid; log in `research/models/provider-comparison.md`. *Due 2025-09-29*
- [ ] Outline eval metrics for Luminor persona quality (coherence, lore fidelity, safety); add to `research/evals/luminor-matrix.md`. *Due 2025-09-30*
- [ ] Specify data ingestion requirements for Bestiary + Canvas updates supporting chat contexts in `research/data/bestiary-canvas-sync.md`. *Due 2025-09-30*
- [ ] Monitor competitor launches (Suno, Pika, Runway) and summarize differentiators in `research/market/weekly-scan-2025-09-29.md`. *Due 2025-09-29*
- [ ] Draft compliance checklist for AI agent deployment before beta; save in `research/compliance/preflight.md`. *Due 2025-10-02*

## Ritual Log Hooks
- Daily updates append to `status/daily-log-YYYYMMDD.md`.
- Weekly demo notes collected in `status/weekly-demo-YYYYMMDD.md`.
