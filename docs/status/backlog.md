# Arcanea Sprint Backlog ? Cycle 17-09

## Build (Owner: Codex)
- [ ] Module switcher state wired to `useChat` context; persist selection per session in `app/chat/components/ModuleSwitcher.tsx`. *Due 2025-09-29*
- [ ] Message thread virtualization + loading shimmer in `MessageThread.tsx` for sub-50ms scroll interactions. *Due 2025-09-30*
- [ ] Plumb Luminor provider routing through `lib/ai/index.ts` and `hooks/useChat.ts` with fallback logic + telemetry hooks. *Due 2025-09-30*
- [ ] Implement optimistic send + retry states in `ChatInput.tsx` with error toasts. *Due 2025-10-01*
- [ ] Configure E2E smoke (Expo or Detox lite) and document commands in `arcanea-mobile/README.md`. *Due 2025-10-02*

## Lore (Owner: Claude)
- [ ] Refresh chat onboarding copy and tooltips in `app/chat/[module]/index.tsx` to match Cycle 17-09 narrative. *Due 2025-09-29*
- [ ] Publish Realm launch script + ritual outline in `Arcanean Truths 17-09.md`. *Due 2025-09-30*
- [ ] Draft investor-facing one-pager summarizing mobile MVP progress; file under `docs/investor/updates/2025-09-30.md`. *Due 2025-09-30*
- [ ] Create release blog stub linking Bestiary spotlight to chat MVP; store in `content/blog/arcanea-chat-mvp.md`. *Due 2025-10-01*
- [ ] Align UI microcopy checklist for Codex handoff (`agents/handoff-template.md`). *Due 2025-10-02*

## Research (Owner: Gemini)
- [ ] Compare OpenRouter vs direct model integrations (Claude, GPT, Gemini) with latency/cost table; log in `docs/research/provider-comparison.md`. *Due 2025-09-29*
- [ ] Outline eval metrics for Luminor persona quality (coherence, lore fidelity, safety); add to `docs/research/eval-matrix.md`. *Due 2025-09-30*
- [ ] Specify data ingestion requirements for Bestiary + Canvas updates supporting chat contexts. *Due 2025-09-30*
- [ ] Monitor competitor launches (Suno, Pika, Runway) and summarize differentiators in `reports/market/weekly-scan-2025-09-29.md`. *Due 2025-09-29*
- [ ] Draft compliance checklist for AI agent deployment before beta; save in `docs/research/compliance-preflight.md`. *Due 2025-10-02*

## Ritual Log Hooks
- Daily updates append to `status/daily-log-YYYYMMDD.md`.
- Weekly demo notes collected in `status/weekly-demo-YYYYMMDD.md`.
