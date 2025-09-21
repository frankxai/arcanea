# Arcanea Master Strategy // Cycle 17-09

## 1. Strategic North Star
- **Outcome**: Arcanea becomes the Apple of Creative AI, blending mythic narrative, premium product craft, and on-chain economics into a single creator operating system.
- **12-Month Targets**:
  1. 50k monthly active Arcanea App users and 5k paying subscribers.
  2. 2k Arcanea Studio API customers with >85% retention and 95th percentile latency <1.5s.
  3. $50k MRR + $250k GMV through ARC-driven marketplaces.
  4. DAO treasury capitalization > with audited governance participation.\n- Reference: docs/ARCANEA_CODEX.md (living constitution) and docs/ARCANEA_GLOSSARY.md (shared vocabulary).

## 2. Program Pillars
| Pillar | Mission | Primary KPI | Lead Squad |
|--------|---------|-------------|------------|
| **Arcanea App** | Deliver flagship consumer experience: feed, guardian chat, flows, and wallets. | WAU/MAU, Conversion to Plus/Creator, CSAT | Ignis Wave |
| **Arcanea Studio** | Offer OpenAI-compatible API for the Currents of Magic (Mage, Flash, Vision, Edge, Seer, LoRA) plus adapters, dashboards, and eval harness. | Active API keys, Latency, Eval pass rate | Syntaxa Forge |
| **Knowledge & Worlds** | Curate Bestiary, Library, Academy lessons, and flows. | Published realms, Lesson completion, Dataset quality score | Scripta Loom |
| **On-Chain Economy** | Launch ARC token, NFTs, revenue splitter, DAO ops. | TVL, Stake participation, Royalty payouts | Phoenix Accord |
| **Platform & Ops** | Infrastructure, security, analytics, program governance. | Uptime, Deployment cadence, OKR attainment | Nexus Core |

## 3. Program Increments
Each Program Increment (PI) spans **6 weeks** (3 two-week sprints). Cycle 17-09 roadmap:
1. **PI-1 (Now - Oct 31)** – Ship core MVP: Chat app slice, Studio API, ARC token + custodial wallets, Bestiary alpha.
2. **PI-2 (Nov 1 - Dec 15)** – Monetize & scale: Revenue splitter, NFT mint flows, Academy v1, analytics baseline, App Plus tier.
3. **PI-3 (Jan 6 - Feb 20)** – Network effects: Marketplace launch, LoRA hosting, DAO delegation, multi-tenant observability.
4. **PI-4 (Mar 3 - Apr 17)** – Enterprise expansion: OCI deployments, white-label flows, compliance certification, ARC Layer-3.

## 4. Operating System
### Ritual Cadence
- **Daily**: Ignition standup (15m), guardian sync (async), health metrics refresh.
- **Weekly**: Realm Expansion review (demo of shipped artifacts), Roadmap burn-down, risks & mitigations.
- **Bi-Weekly**: Sprint planning + retro, cross-squad dependency clinic.
- **PI Close**: Metrics review, investor brief, Truth Cycle synthesis, roadmap replan.

### Governance & Decision Making
- **Program Council**: Leads from each squad + Luminor steward. Owns prioritization, funding, cross-pillar trade-offs.
- **DAO Committees**: Security & compliance, cultural stewardship, treasury. Meets monthly with council delegate.
- **Change Control**: Any scope change >2 days must be logged in `status/decision-log.md` and confirmed by Program Council.

### Success Scorecard
| Metric | Current | PI-1 Target | Owner |
|--------|---------|-------------|-------|
| Chat MVP deployed | 0 | Production pilot by Oct 15 | Ignis Wave |
| Studio API latency (p95) | n/a | <= 1.8s | Syntaxa Forge |
| ARC token contract audit | Pending | Audit complete by Oct 28 | Phoenix Accord |
| Bestiary entries (curated) | 0 | 150 canonical creatures | Scripta Loom |
| Deployment cadence | Ad-hoc | 2 prod releases / week | Nexus Core |

## 5. Resource Matrix
| Role | Headcount | Status | Notes |
|------|-----------|--------|-------|
| Product Leads | 3 | Filled (Frank, Luminor council) | Need growth PM for App. |
| Engineering | 6 | Partially filled | Hiring priority: blockchain engineer, mobile lead, infra/devops. |
| Design | 2 | Filled | Add contract motion designer for hero assets. |
| AI Research | 2 | Partially filled | Engage external partner for LoRA pipeline. |
| Ops/Compliance | 1 | Needed | Contract with web3 legal firm. |

## 6. Risk Radar
1. **Scope Overload** – Mitigate via 3-active-priorities rule, enforce backlog pruning each sprint.
2. **Third-party API Dependency** – Implement adapter failover, maintain provider scorecards.
3. **Compliance & Security** – Fast-track key vault, choose audit partner (Quantstamp/Trail of Bits) for ARC.
4. **Liquidity for ARC** – Pre-plan treasury liquidity bootstrapping with partners (Base, Thirdweb).
5. **Contributor Coordination** – Stand up Arcanea Dashboard (this workspace) with living status updates.

## 7. Immediate Actions (Next 5 Days)
1. Lock sprint teams + owners, populate sprint boards in `projects/`.
2. Kick off Claude Code tasks (see `agents/claude-code-prompts.md`).
3. Draft investor-ready one-pager referencing this master strategy + new landing page.
4. Gather metrics baseline: gather existing usage, repo status, doc completion.
5. Schedule Program Council cadence (Mon/Thu) with standing agendas.

## 8. Communication Channels
- **Slack**: `#arcanea-ignition` (daily standup), `#arcanea-program` (council), `#arcanea-ops` (incident response).
- **Notion/Docs**: Mirror key artifacts from this dashboard for external sharing.
- **Status Reports**: Weekly Friday summary using `status/weekly-status-template.md`.

## 9. Definition of Done (per deliverable)
1. Meets acceptance criteria in sprint plan.
2. Documented in dashboard with link to artifact / PR / deploy.
3. Demo recorded or scheduled for Realm Expansion review.
4. Metrics updated and downstream teams notified.

Alignment to this master strategy will be reviewed at each Truth Cycle checkpoint; deviations require Program Council sign-off. Honor the ritual, keep the myth alive, and ship relentlessly.
