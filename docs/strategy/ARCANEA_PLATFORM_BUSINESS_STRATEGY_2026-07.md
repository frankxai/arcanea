# Arcanea Platform & Business Strategy — July 2026

*Decision document. Grounded in the actual state of the repos (arcanea, arcanea-ai-app, Starlight-Intelligence-System, ACOS) as of 2026-07-13. Cross-repo claims (Stripe routes, `CREDIT_PACKS`, sibling packages) were verified in arcanea-ai-app at drafting time. Supersedes the monetization sections of `ARCANEA_PLATFORM_STRATEGY.md` (Feb 2026); the two-domain architecture from that doc stands.*

*Last verified against repo state: 2026-07-13. Re-check before acting on file-level claims.*

> **Merge-time status note (2026-08-16).** This document was drafted on 2026-07-13 and reads forward from that date. It is landing after the EU AI Act Article 50 date of **2026-08-02**, which has now passed. Everything §2 describes as upcoming compliance work — machine-readable synthetic-content marking (C2PA), AI-interaction disclosure, AI-influencer labeling — is a **live obligation, not a deadline to plan toward**, and is unshipped as of this merge. Read §2 and the O2 line in §7 as an overdue backlog. The rest of the doc's forward-looking framing (§8's 30/60/90) is likewise measured from 2026-07-13, not from merge.

---

## 0. Executive decisions (TL;DR)

| Question | Decision | Why |
|---|---|---|
| Polar.sh? | **Yes — adopt as merchant of record for all first-party digital revenue.** Keep the existing Stripe code as the future marketplace rail. | You are an EU (NL BV) founder selling digital subscriptions worldwide. MoR eliminates VAT OSS filings, US sales-tax nexus tracking, and invoice compliance. Worth the ~4% + 40¢ fee at this stage. |
| Business model | **Hybrid: subscription tiers + usage credits** (Higgsfield-informed), with an OSS funnel (Vercel-informed). Marketplace rev-share is Phase 3, not now. | Matches what's already coded (Stripe tiers + credit packs), matches AI-native cost structure (generation costs are variable), and matches the audience. |
| Open platform vs. solo worlds | **Phased. Not either/or.** Phase 1: Frank builds sovereign worlds in public. Phase 2: invited creators (advanced authors). Phase 3: self-serve. | Opening self-serve before the loop is proven on yourself burns support, legal, and infra budget with no reference customers. |
| Arcanea MCP | **Productize it as the second SKU.** Coding agents (Claude Code, Codex, Grok, Gemini) subscribing to Arcanea via MCP is a differentiated wedge nobody else in world-building owns. | The MCP packages already exist (`packages/arcanea-mcp` here; `arcanea-registry-mcp`, `publishing-house-mcp` in arcanea-ai-app). Distribution = every agent harness. |
| "Arcanea Supercomputer" | **Defer as infrastructure; ship as brand.** Do not build compute. The "Supercomputer" is the orchestration layer (swarms + MCP + world engine) on rented infra (Vercel, Supabase, model APIs). | Capital and ops discipline. The name has power as product marketing for the orchestration tier, not as a datacenter. |
| EU AI Act | **Act now — Article 50 transparency obligations apply from Aug 2, 2026 (3 weeks from drafting; now past — see merge-time status note).** Label AI-generated/synthetic content, disclose AI interaction, mark AI influencers. No high-risk category applies to Arcanea today. | Arcanea is a deployer/integrator of GPAI, not a model provider. Obligations are transparency-class: real but light if done deliberately. |
| Web3 / auctions / assets | **Sequence it last.** Digital collectibles only after the publishing pipeline earns fiat revenue. NFTs largely sit outside MiCA, but marketing them to EU consumers still needs care. | Revenue focus; regulatory ambiguity; brand risk if led with speculation instead of story. |

---

## 1. Polar.sh — verdict and integration plan

### Why yes

- **Merchant of record.** Polar is the legal seller; they handle global VAT/GST/US sales tax, invoices, and consumer-rights compliance. For a Dutch BV selling globally, this removes the single largest compliance drag (quarterly VAT OSS, threshold tracking in ~40 US states).
- **Built for exactly this catalog.** Subscriptions, seat-based, usage-based metering, license keys, digital downloads, GitHub-native benefits (private repo access as a paid benefit — directly useful for `arcanea` premium packages and skills).
- **Usage-based billing is first-class.** Credits/metering for generation (images, video, music, world compilation) maps to Polar's meter + credit primitives without building your own ledger reconciliation.
- **Open source, developer-first.** Aligns with the arcanea.io OSS posture; their Next.js adapter drops into `apps/web` with far less code than the current Stripe routes.

### Honest caveats

- Fee ≈ 4% + 40¢ vs. raw Stripe ≈ 2.9% + 30¢ + Stripe Tax. You are paying ~1.5pt for compliance-as-a-service. Correct trade below ~€1M ARR; revisit above it.
- **Polar is for first-party products only.** It cannot pay out third-party creators. The Phase 3 marketplace (authors selling world assets, splits with Arcanea) requires Stripe Connect or similar. **This is why the existing Stripe code stays** — it becomes the marketplace rail later. Do not delete it.
- Platform dependency: keep product/price definitions in your own config (as `CREDIT_PACKS` already is) so a rail swap is a config change, not a rewrite.

### Integration plan (small, surgical)

*All paths in this plan are in the **arcanea-ai-app** repo (`apps/web/...`, `CREDIT_PACKS`, Stripe routes) — not in this repo.*

1. Add `@polar-sh/nextjs` checkout + customer-portal + webhook routes alongside the Stripe routes in `apps/web/app/api/polar/*`.
2. Point the pricing page CTAs at Polar checkout; leave Stripe routes dormant (they already 503 gracefully without keys).
3. Map tiers 1:1: existing `creator`/`studio` tiers and `CREDIT_PACKS` become Polar products + a usage meter.
4. Entitlements stay in Supabase exactly as now — webhook writes the same rows the Stripe webhook writes. One entitlement table, two possible rails.

---

## 2. Legal — what actually applies (July 2026)

**You are not in a scary category, but three dates/regimes are live:**

1. **EU AI Act, Article 50 (applies 2026-08-02).** Arcanea deploys/integrates GPAI models; it does not train foundation models, so GPAI-provider duties (Aug 2025 wave) sit with OpenAI/Anthropic/Google/xAI, not you. Your duties are transparency-class:
   - Users interacting with an AI (Luminors, Guardians, chat agents) must be able to tell it's an AI. The mythology can carry this elegantly — Luminors *are* declared intelligences; make it explicit in UI copy and ToS.
   - **Synthetic content must be machine-readable-marked.** Adopt C2PA/content-credentials metadata on generated images/video/audio at the pipeline level (one implementation in the gen layer covers every surface).
   - **AI influencers: this is the sharp edge.** Deepfake-adjacent and synthetic-persona content must be disclosed. Every Arcanea AI influencer profile must state it is an AI persona in the bio and in platform-native disclosure tools. This is also simply good brand strategy — "openly synthetic, proudly Arcanean" beats being unmasked later.
2. **GDPR (ongoing).** Supabase EU residency for user data, a real privacy policy, DPAs with processors (Vercel, Supabase, model providers), and a data-deletion path. Standard SaaS hygiene; mostly configuration and documents, not engineering.
3. **DSA (when UGC opens).** The moment Phase 2/3 lets others publish content on Arcanea surfaces, you need notice-and-action (report/takedown), a content policy, and a designated contact. Small-platform obligations are light; bake the report button into the world-viewer component from the start rather than retrofitting.

*Provenance: the Aug 2, 2026 Article 50 date and the "no high-risk category" conclusion are an internal read of the AI Act timeline, not external legal advice. Owner of OKR O2 should get a one-hour counsel review to confirm both. Drafted as "before the deadline"; as of 2026-08-16 that date has passed and the review is overdue, which raises rather than lowers its priority.*

**Also:**
- **Marketplace IP terms** must settle AI-content ownership: creator owns their world; Arcanea gets a license to host/display; generated-asset ownership passes to the creator subject to model-provider terms.
- **MiCA** mostly exempts true NFTs, but fractionalized or large fungible-like series can fall in scope — one more reason to sequence web3 last.
- **Payments doctrine** (per `payment-intelligence-system`): **no autonomous money movement, ever** — agents draft and verify; Frank approves capital.

---

## 3. Business-model simulation (four models, scored)

| Model | Archetype | Gross margin | Fits repo state | Risk | Verdict |
|---|---|---|---|---|---|
| A. Pure SaaS seats | Notion | High | Medium | AI gen costs blow up flat pricing | Component, not whole |
| B. Subscription + credits | **Higgsfield** | High, protected | **High — already coded** | Credit UX complexity | **Core model now** |
| C. OSS + usage platform | **Vercel** | Medium | High (60+ pkgs, skills, MCP) | Long payback | **Funnel + moat, monetize via B** |
| D. Publishing rev-share | Modern label/house | Take-rate scales | Medium (`publishing-house` pkgs exist) | Needs creators first | **Phase 2–3 expansion** |

**Simulation A (pure seats):** $29/seat, no metering. A power user generating 500 videos/month costs more than their seat. Dies on unit economics unless generation is capped so hard the product feels broken.

**Simulation B (Higgsfield-informed):** Tiers grant monthly credit allowances + feature gates; packs top up; heavy users self-select upward. Generation margin is protected by construction. Higgsfield's lesson worth absorbing: *speed of model integration is the product* — their moat is shipping every new model into one subscription within days. Arcanea's analog: every new model drops into the world-building pipeline (via the gen-layer registry pattern already in FrankX `lib/gen`) within a week, wrapped in Arcanean craft.

**Simulation C (Vercel-informed):** OSS `world-sdk`, skills, and templates are free and everywhere (npm, GitHub, agent-skill registries); the hosted platform (worlds runtime, memory, MCP endpoint, publishing pipeline) is paid. Vercel's lesson: *the framework is marketing; the infrastructure is revenue.* Arcanea's analog: **the lore + SDK + skills are the framework; the Supercomputer (orchestration cloud) is the infrastructure.** v0's lesson: templates as top-of-funnel — "deploy your world" one-clicks.

**Simulation D (publishing house):** Arcanea Publishing + Arcanea Records take 10–20% on distributed works, and sell the pipeline (covers, character faces, trailers, launch swarms) as productized services or bundles. This is the *advanced-author empire* play: it monetizes other people's ambition and compounds the catalog. It requires Phase 2 creators and Stripe Connect payouts — sequence after B+C are live.

**Chosen stack: B is the engine, C is the funnel, D is the expansion.** A (seats) appears only inside B as team pricing for studios.

### Proposed pricing skeleton (rank-aligned, tune numbers in beta)

| Tier | Price | For | Grants |
|---|---|---|---|
| Apprentice | €0 | Everyone | 1 world, basic Luminors, community, small monthly credits |
| Mage | €19/mo | Solo world-builders | Full Luminor council, ~1k credits, publishing basics, MCP (personal) |
| Master | €49/mo | Advanced authors/creators | ~3k credits, character-consistency pipeline, Records/Publishing intake, MCP (pro), API beta |
| Luminor | €149/mo | Empire builders / studios | ~10k credits, seats, priority swarms, white-label worlds, publishing rev-share access |
| Credit packs | one-time | Overflow | Already defined in `CREDIT_PACKS` (arcanea-ai-app) |

The rank ladder (Apprentice → Mage → Master → Luminor) does double duty: pricing tier *and* progression mechanic. Nobody else's pricing page is also a magic system.

*Naming note: this is a deliberately compressed version of the canonical five-rank ladder in `.arcanea/lore/CANON_LOCKED.md` (Archmage, ranks 7–8, is skipped to keep four tiers — intentional, not canon drift). Per locked canon, "Luminor" is a RANK, not an entity type — so "Luminor tier" aligns with canon cleanly. The residual risk is only that some legacy docs still use "Luminors" for the AI companion entities (non-canonical drift to clean up separately); if that legacy usage causes confusion in support/marketing copy, the fallback is renaming the top tier "Archmage" — decide in beta, before public pricing ships.*

---

## 4. Openness — the three-phase gate

**Phase 1 — Sovereign (now → ~Oct 2026).** Frank builds his own worlds, in public, with the agent swarms running the machine. The product is proven on its most demanding user. Ship: worlds runtime, gen pipeline with C2PA labeling, Polar billing, Arcanea MCP v1, 2–3 flagship worlds, Arcanea Records releases, first AI influencer (disclosed). *Gate to Phase 2: the full loop — imagine → build → publish → distribute → revenue — has run end-to-end for Frank at least twice.*

**Phase 2 — The Court of Creators (invite-only).** 10–30 hand-picked advanced authors/creators. White-glove onboarding by agents (the SIS estate-commissioning pattern already defines this motion). They pay Master/Luminor tier; their success stories are the marketing. Publishing house takes its first rev-share deals. *Gate to Phase 3: ≥5 creators earning real money through Arcanea, support load per creator known, DSA machinery live.*

**Phase 3 — The Open Academy (self-serve).** Public signup, marketplace (Stripe Connect payouts), template gallery, community (arcanea.community as the gathering hall), games/micro-apps as world exports. Coding agents are first-class citizens: a Codex/Claude/Grok agent with an Arcanea MCP subscription is a *user persona*, with docs, rate limits, and pricing designed for it.

This answers "just me or accessible for all": **both, in order.** Sovereignty first proves the magic; the Court proves the economics; the Academy scales it.

---

## 5. Product surfaces and what powers them (repo → product map)

| Surface | Powered by (existing assets) | Phase |
|---|---|---|
| arcanea.ai platform (worlds, studio, library) | `arcanea-ai-app/apps/web`, `world-engine`, `design-system`, `book/` (20 collections) | 1 |
| Arcanea MCP (agents build worlds/characters/lore via tools) | `packages/arcanea-mcp` (here), `arcanea-registry-mcp` (arcanea-ai-app), canon in `.arcanea/lore` | 1 |
| Arcanea Publishing / Records pipeline | `publishing-house` + `publishing-house-mcp` (arcanea-ai-app), ACOS `/author-team`, `/create-music`, Suno mastery skills, music-release-manager agents | 1–2 |
| AI influencer network (disclosed synthetic personas) | Higgsfield character consistency, VIS strategy, `postiz-distributor`, ACOS social agents | 1–2 |
| Skills & SDK distribution (OSS funnel) | `arcanea-skills-opensource`, `starlight-agent-skills`, `claude-skills-library`, `world-sdk` | 1 |
| Orchestration cloud ("Arcanea Supercomputer" tier) | `starlight-swarm`, `swarm-coordinator`, `agent-bus`, SIS ORCHESTRATION_ENGINE | 2 |
| Marketplace + arcanea.community | Stripe Connect (existing Stripe code), DSA tooling, Court alumni | 3 |
| Games / micro-apps / world exports | `arcanea-game-development` skills, Higgsfield game deploy, v0/Vercel templates | 3 |

**What to absorb from the ecosystem (July 2026 state):** from **Codex** — repo-native agent UX and tight task loops (make `arcanea-cli` + MCP feel that native); from **Claude/Agent SDK** — skills-as-distribution and MCP-first architecture (already your bet; double down); from **Grok/xAI** — personality as product; Luminors should have *voice*, not just function; from **Gemini** — multimodal grounding for lore-accurate imagery (already policy in FrankX gen rules); from **Hermes/OpenClaw-class agents** — autonomous distribution swarms with human-gated sends (matches your L7 protection doctrine). The pattern across all of them: **the winners ship orchestration + taste, not models.** Arcanea's taste layer (canon, design system, voice) is the defensible asset.

---

## 6. The agent organization (who runs what)

Structure the swarms as a cabinet with human-gated irreversible actions (posting, sending, spending stay with Frank per protection-layer doctrine):

| Portfolio | Lead swarm (existing) | Charter |
|---|---|---|
| Engineering | gstack sprint chain (`/autoplan → /review → /qa → /ship`) + Arcanea DevOps/Frontend/Backend specialists | Platform, MCP, billing integration |
| Product | `@product-architect` team + Starlight Navigator | PRDs, pricing experiments, roadmap gates |
| Content & Lore | Arcanea Lore Master, World Expander, book-author-team | Worlds, Library, canon integrity (CANON_LOCKED) |
| Publishing & Records | music-producer + release-manager + publishing-house-mcp | Author pipeline, releases, rev-share ops |
| Marketing & Influencers | ACOS content engine (aco-router, hook engineer, social distributor) + VIS | Disclosed AI personas, distribution, launches |
| Support & Community | Concierge/Envoy pattern from SIS + community-fabric-orchestrator | Court onboarding, docs, arcanea.community |
| Governance & Safety | integrity-guard, meta-safety-guard, Sentinel, `/starlight-board` | Brand/claims gates, AI-Act compliance checklist, payments fail-closed |

Weekly cadence: engineering ships daily via guardians; a Monday board (`/starlight-board`-style) reviews metrics vs. OKRs and re-aims the swarms; Frank steers vision and approves irreversible actions. This *is* the Supercomputer, operationally.

---

## 7. Objectives — what success looks like

**North star: creator-hours inside living worlds** (time spent building/experiencing Arcanea worlds — by humans *and* by agents acting for them). Revenue follows residency.

**Q3 2026 OKRs (Jul–Sep):**
- O1 Monetization live: Polar checkout in production; first 25 paying subscribers; ≥€1k MRR.
- O2 Compliance: C2PA labeling in gen pipeline + Art. 50 disclosures shipped before Aug 2; AI-influencer disclosure standard published.
- O3 Proof of loop: 2 flagship worlds shipped end-to-end (lore → assets → published → distributed → first revenue event).
- O4 MCP wedge: Arcanea MCP v1 public; ≥50 external agent installs; 3 documented "coding agent built a world" showcases.

**Q4 2026 OKRs (Oct–Dec):**
- O5 The Court: 10 invited creators onboarded; ≥5 earning; ≥€10k cumulative creator GMV.
- O6 Publishing: first 3 third-party works through Arcanea Publishing/Records with rev-share executed (human-approved payouts).
- O7 Funnel: OSS skills/SDK ≥1k installs/month; arcanea.io docs complete; template gallery live.

---

## 8. 30 / 60 / 90

**Days 0–30 (Jul 13 – Aug 12):** Polar products + webhook + pricing page (keep Stripe dormant); C2PA + disclosure shipping before **Aug 2**; **counsel review booked and completed on the Art. 50 read (tracked item, not just prose — owner: O2)**; MCP v1 hardening + docs; flagship world #1; first Records release under the new loop.
**Days 31–60 (Aug 13 – Sep 11):** Credit metering through Polar; MCP subscriptions (license keys); AI influencer #1 live with disclosure; flagship world #2; Court shortlist + estate-style onboarding playbook.
**Days 61–90 (Sep 12 – Oct 11):** First 5 Court invites; publishing rev-share terms + first deal; template gallery seed; re-verify the cross-repo claims in this doc (arcanea-ai-app paths) before the Q4 board review treats the OKRs as committed; Q4 board review against OKRs; decide Phase 3 timing on the gates, not the calendar.

**What NOT to do now:** build compute infra; open self-serve before the Court proves economics; lead with web3/auctions; run undisclosed AI personas; migrate off the existing Stripe code (it's the future marketplace rail); add a fifth pricing axis (keep tiers + credits only).

---

*Built on SIP. The pricing ladder is the magic system. The swarms are the Supercomputer. The lore is the moat.*
