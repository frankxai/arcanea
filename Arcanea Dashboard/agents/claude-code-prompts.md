# Claude Code Delegation Prompts

Use these prompts to engage Claude Code as parallel executor. Provide current repo context and assign to relevant squad owner.

---
## Prompt 1: Ship Chat MVP API (Arcanea App Sprint 1)
```
You are Claude Code collaborating on the Arcanea App chat MVP.
Goal: Implement `/app/api/chat/+api.ts` using Vercel AI SDK, streaming responses from OpenRouter (GPT-4o default). Persist conversations to Supabase.
Steps:
1. Review `Arcanea App/app/api/chat/+api.ts` and `packages/ai-core` for existing scaffolding.
2. Implement handler with user auth guard, provider routing (Ignis, Lumis, Mythos), and Supabase persistence.
3. Add unit tests (Vitest) storing mock responses, ensure lint/test pipeline passes.
4. Document environment variables in `Arcanea App/.env.example`.
Deliverables: API route, tests, updated env docs, summary in `status/daily-log-YYYYMMDD.md`.
```
Owner: Ignis Wave | Deadline: Oct 1

## Prompt 2: Model Registry + Adapter Layer (Arcanea Studio Sprint 1)
```
You are Claude Code assisting the Syntaxa Forge squad.
Goal: Create Arcanea model registry and adapter for OpenAI-compatible `/v1/chat/completions` endpoint.
Steps:
1. Inspect `packages/router` and `services/api` directories.
2. Define `packages/router/src/models.ts` mapping the Currents of Magic (mage, flash, vision, edge, seer, lora family) to provider configs (OpenRouter endpoints, temperature defaults, availability flags).
3. Implement handler in `services/api/routes/chat.ts` that validates requests, selects provider, proxies streaming responses, and records Langfuse traces.
4. Add Jest/Vitest tests covering provider selection + error handling.
5. Update developer docs under `docs/api/`.
```
Owner: Syntaxa Forge | Deadline: Oct 2

## Prompt 3: ARC Token Smart Contract Scaffold (On-Chain Sprint 1)
```
You are Claude Code collaborating with Phoenix Accord.
Goal: Scaffold ARC ERC-20 smart contract and deployment scripts on Base testnet.
Steps:
1. Create `contracts/arc_token/ArcToken.sol` using OpenZeppelin presets (capped supply, role-based minting).
2. Implement vesting schedule contract for team allocation.
3. Add Hardhat project config, scripts for deployment + allocation distribution.
4. Write unit tests (Hardhat + Chai) covering mint limits, vesting cliffs, role restrictions.
5. Document deployment steps in `Arcanea Dashboard/projects/on-chain-economy/README.md` (create if absent).
```
Owner: Phoenix Accord | Deadline: Oct 3

## Prompt 4: CI Pipeline Hardening (Platform Ops Sprint 1)
```
You are Claude Code supporting Nexus Core.
Goal: Configure GitHub Actions CI for pnpm monorepo.
Steps:
1. Audit existing `.github/workflows` (create new `ci.yml` if absent).
2. Install pnpm, cache dependencies, run lint/test/build for active apps (`Arcanea App`, `apps/academy` once package.json added, `services/api`).
3. Add matrix for Node 20 + 22, fail fast on lint/test failures.
4. Upload build artifacts for preview (if needed) and integrate with Vercel CLI for preview deployments.
5. Update documentation in `Arcanea Dashboard/projects/platform-ops/sprint-plan.md` (status note) and `status/decision-log.md` if pipeline choices differ.
```
Owner: Nexus Core | Deadline: Oct 1

## Prompt 5: Bestiary Content Automation (Knowledge Sprint 1)
```
You are Claude Code assisting Scripta Loom.
Goal: Generate structured JSON templates for Arcanea Bestiary entries.
Steps:
1. Review `Arcanean Bestiary` repo for schema hints.
2. Create `knowledge/bestiary/schema.json` capturing required fields (name, origin, elemental alignment, narrative, rituals, image prompt, licensing).
3. Write script `scripts/generate_bestiary_template.ts` that outputs validated JSON skeletons per creature.
4. Produce 10 sample entries (Ignis Guardians) and submit for review.
5. Document workflow in `Arcanea Dashboard/projects/knowledge-worlds/sprint-plan.md` (notes section).
```
Owner: Scripta Loom | Deadline: Sept 30

---
### Coordination Notes
- Always attach summary + diffs to `status/daily-log-YYYYMMDD.md`.
- Ensure Claude Code is informed of environment context (monorepo root `c:\Users\Frank\Arcanea`).
- When tasks complete, update project sprint plans with status annotations.

Additional prompts can be appended as new priorities emerge. Maintain version history in git for traceability.
