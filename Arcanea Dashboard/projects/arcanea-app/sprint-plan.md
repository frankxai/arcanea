# Arcanea App // Sprint Backlog

**Squad**: Ignis Wave | **Product Lead**: Frank | **Engineering Lead**: TBD (assign) | **Design**: Lumis Collective

## Mission
Deliver the flagship consumer experience spanning feed discovery, guardian chat, flow automations, and ARC wallet integration.

## Sprint Rhythm
- Sprint length: 2 weeks | Ceremonies: Planning (Mon), Demo (Fri wk2), Retro (Fri wk2).
- Capacity assumptions: 3 engineers, 1 designer, 1 PM/producer, Claude Code assist.

## Sprint 1 (Sept 23 - Oct 6)
**Goal**: Ship end-to-end chat slice + hero feed populated with curated realms.
- Build minimal Next.js/Expo chat app (`apps/chat` or `Arcanea App/app`) with Vercel AI SDK + Supabase session storage.
- Integrate Arcanea guardians (Ignis, Lumis, Mythos) as selectable personas with prompt templates.
- Stand up feed module pulling curated JSON (seed from Bestiary team) with skeleton loading states.
- Add telemetry (Vercel Analytics + PostHog) capturing chat usage + feed clicks.
- Release candidate via TestFlight/internal Android + capture feedback ritual.
**Deliverables**: Working chat app demo, feed prototype, analytics dashboard link.
**Dependencies**: Claude Code implementation for API routes, Scripta Loom for curated content.
**Metrics**: p95 response <2.5s, 5 pilot users engaged.

## Sprint 2 (Oct 7 - Oct 20)
**Goal**: Launch Arcanea Flow shortcuts and wallet overview.
- Design and implement Flow builder UI (chips + modal) leveraging n8n templates.
- Integrate Supabase tables for saved flows + execution logs.
- Embed custodial wallet view (balance, latest mints) using Thirdweb SDK.
- Add Plus/Creator paywall states + Stripe checkout stub (no charge yet).
- QA checklist + accessibility pass (WCAG 2.1 AA key screens).
**Deliverables**: Flow creation UX, wallet dashboard, monetization gating.
**Dependencies**: Platform Ops for secure key storage, On-Chain team for wallet API.
**Metrics**: >=3 flows created per tester, wallet data loads <1.2s.

## Sprint 3 (Oct 21 - Nov 3)
**Goal**: Prepare public beta with growth hooks.
- Implement shareable realm cards (deep links) with preview metadata.
- Add referral tracking instrumentation (Stripe + custom codes).
- Set up in-app rituals (daily ignition, realm expansion reminder notifications).
- Localize core flows (EN baseline, instrumentation for additional languages).
- Conduct beta readiness review + stakeholder sign-off.
**Deliverables**: Beta build, referral instrumentation, ritual automation.
**Dependencies**: Marketing for launch assets, Platform Ops for notif infra.
**Metrics**: Beta waitlist conversions >15%, push opt-in >60% among testers.

## Backlog Highlights (Post Sprint 3)
- Offline caching + background sync.
- Vision/video generation integration.
- Social layer (Dimensional Bridges) with community rooms.

## Risks & Mitigations
1. **API latency** – coordinate with Studio to prioritize caching + streaming.
2. **Content gaps** – enforce handshake with Knowledge team before sprint planning.
3. **Wallet compliance** – involve legal advisor for KYC implications.

## Coordination Checklist
- Daily sync with Studio for shared components.
- Weekly review with On-Chain economy on wallet & ARC integration.
- Track progress in `status/arcanea-app-standing.md` (create on first update).

