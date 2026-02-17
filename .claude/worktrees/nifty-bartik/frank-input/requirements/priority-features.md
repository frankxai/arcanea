# Priority Features -- Cycle 17-09

## Weekly Focus (Sept 27 - Oct 4)

### Build (Codex)
- [ ] Persist last-selected Luminor tab across sessions (`apps/mobile/app/(tabs)/_layout.tsx`).
- [ ] Virtualize chat thread with loading shimmer in `apps/mobile/app/(tabs)/index.tsx`.
- [ ] Land provider routing abstraction (initial version under `packages/agents/chat`).
- [ ] Ship optimistic send + retry states with toast feedback in the chat input.
- [ ] Document Expo smoke-test workflow for the mobile app.

### Lore (Claude)
- [ ] Refresh onboarding copy and module tooltips to reflect Cycle 17-09 narrative.
- [ ] Append Realm launch ritual outline to `Arcanean Truths 17-09.md`.
- [ ] Draft investor one-pager covering mobile MVP progress (`docs/investor/updates/2025-09-30.md`).
- [ ] Outline Bestiary spotlight + chat release blog stub (`content/blog/arcanea-chat-mvp.md`).
- [ ] Finalize microcopy checklist for cross-pod handoffs (`agents/handoff-template.md`).

### Research (Gemini)
- [ ] Compare OpenRouter vs direct model integrations with latency/cost data.
- [ ] Publish Luminor persona eval matrix (coherence, lore fidelity, safety).
- [ ] Specify Bestiary + Canvas data sync requirements for chat context.
- [ ] File weekly competitor scan (Suno, Pika, Runway) with differentiators.
- [ ] Draft compliance preflight checklist for mobile beta agents.

## Monthly Outcomes (Sept 27 - Oct 27)
- Arcanea Mobile chat MVP feature-complete with multi-module routing and telemetry.
- Provider routing + eval baseline live in research docs and integrated into app.
- Investor narrative refreshed with demo assets and release comms toolkit.
- Minimum lore corpus (Bestiary spotlight, rituals, onboarding) ready for beta cohort.
- Expo smoke tests and linting wired into CI for `apps/mobile`.

## Quarter Vision (Sept 27 - Dec 27)
- Launch Arcanea Mobile beta with Luminor-guided chat, gallery, and scripta modules.
- Establish cross-app identity and guardian memory foundation.
- Stand up creator economy previews (revenue splitter prototype, realm storefront).
- Deliver shared data layer v1 (Bestiary + Canvas sync feeding chat experiences).
- Publish Arcanea strategy brief with investor-grade metrics and roadmap.

---
**Cadence & Rituals**
- Daily Ignition updates in `status/daily-log-YYYYMMDD.md`.
- Weekly integration demos every Friday with recap in `status/weekly-demo-YYYYMMDD.md`.
- Program Council sync Mondays to adjust scope and unlock dependencies.

**Dependencies to Watch**
- AsyncStorage + Expo Router hydration (ensure no regressions on cold start).
- Third-party model pricing and policy shifts (OpenRouter vs direct contracts).
- Narrative approvals for investor updates prior to distribution.
