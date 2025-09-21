# Arcanea Studio // Sprint Backlog

**Squad**: Syntaxa Forge | **Product Lead**: Nexus | **Engineering Lead**: TBD | **AI Lead**: Claude (contract)

## Mission
Provide developers and partners with an OpenAI-compatible platform delivering the Currents of Magic (Mage, Flash, Vision, Edge, Seer, LoRA family) alongside adapters, guardrails, analytics, and billing.

## Sprint Rhythm
- Sprint length: 2 weeks | Ceremonies mirrored with Arcanea App for shared cadence.
- Capacity: 3 engineers, 1 AI infra specialist, 1 PM, Claude Code support.

## Sprint 1 (Sept 23 - Oct 6)
**Goal**: Launch API MVP + dashboard skeleton.
- Scaffold Next.js Studio app (`apps/studio`) with auth (Supabase) and layout (tailwind, design tokens).
- Implement `/v1/chat/completions` endpoint proxying OpenRouter (GPT-4, Claude 3) via adapters.
- Create model registry JSON mapping Arcanea IDs to providers (`packages/router`).
- Add API key issuance + quota enforcement using Supabase + edge functions.
- Instrument Langfuse tracing + basic latency dashboard.
**Deliverables**: Working API endpoint, key management UI, Langfuse integration.
**Dependencies**: Platform Ops for secrets handling, App team for shared component library.
**Metrics**: p95 latency < 2.0s, 100% parity with OpenAI spec for baseline requests.

## Sprint 2 (Oct 7 - Oct 20)
**Goal**: Harden platform with billing, evals, and policy guardrails.
- Integrate Stripe billing (Free, Pro, Creator tiers) + usage metering.
- Build eval harness pipeline (Langfuse tasks) with golden prompts per model.
- Add content filters + safety policies (moderation endpoints, rate limits).
- Ship SDK quickstarts (JS/TS) + Postman collection.
- Document failover strategy for provider outages.
**Deliverables**: Billing flows, eval reports, developer docs.
**Dependencies**: Finance for pricing plan validation, Knowledge team for sample data.
**Metrics**: Billing events logged, eval pass rate >=80%, provider health dashboard live.

## Sprint 3 (Oct 21 - Nov 3)
**Goal**: Prep for partner onboarding + internal integrations.
- Enable LoRA hosting integration hooks (Fireworks/Together) behind feature flag.
- Add organization/team management and audit logs.
- Launch analytics screens (request volume, latency, error rates) with export.
- Publish migration guides for Arcanea App + Academy use.
- Run security review + update compliance checklist.
**Deliverables**: Partner-ready console, LoRA hook spec, audit pack.
**Dependencies**: On-Chain team for ARC-based discounting, Platform Ops for observability data.
**Metrics**: Partner sandbox accounts (3) activated, audit issues resolved.

## Backlog Highlights (Post Sprint 3)
- Dedicated inference clusters (OCI).
- Customizable AI personas marketplace.
- ML monitoring with drift detection.

## Risks & Mitigations
1. **Provider rate limits** – pre-negotiate quotas with OpenRouter, maintain fallback providers.
2. **Billing complexity** – keep usage metric simple initially (token count) with nightly reconciliation.
3. **Security posture** – run static analysis and secrets scanning each PR.

## Coordination Checklist
- Daily adapter status update with Platform Ops.
- Weekly alignment with On-Chain for ARC discounts + staking boosts.
- Publish release notes into `status/studio-weekly.md` every Friday.

