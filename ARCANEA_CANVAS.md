# Arcanea Master Canvas

## 1. Vision

Arcanea = **the Apple of Creative AI**

* *Arcanea App* -> flagship (consumer, Play Store/App Store)
* *Arcanea Studio* -> API/dev hub (OpenAI-style, branded Arcanea models)
* *Ecosystem* -> Multiverse, Anime, Games, Academy
* *Agents (Luminors)* -> each has a wallet, creates, teaches, earns
* *Blockchain Layer* -> ARC token, NFTs, DAO, revenue split
* *Design Ethos* -> sleek, modern, magical (flow, current, radiance, light)

---

## 2. Core Surfaces

* **Arcanea App (flagship)**
  * Feed (worlds, anime, games)
  * Arcanea Agent (chat + multimodal)
  * Arcanea Flow (shortcuts/workflows)
  * Wallet view (ARC + NFTs)

* **Arcanea Studio (dev)**
  * Dashboard (keys, usage, billing)
  * OpenAI-compatible endpoints
  * Currents of Magic (Arcanea IDs -> providers):
    * `arcanea/mage` -> Claude
    * `arcanea/flash` -> Gemini Flash
    * `arcanea/vision` -> GPT/Gemini Vision
    * `arcanea/edge` -> Grok
    * `arcanea/seer` -> Kimi
    * `arcanea/lora-*` -> Fireworks/Together

* **Ecosystem Extensions**
  * Arcanea Multiverse -> interconnected realms and portals.
  * Arcanea Anime -> enchanted panels, videos, and soundtracks.
  * Arcanea Games -> procedural worlds, NPC agents, interactive quests.
  * Arcanea Academy -> Luminor-led lessons encompassing magic and mastery.

---

## 3. Stack (MVP -> Scale)

### **MVP (all Vercel + Supabase + SaaS)**

* Vercel -> Studio, App, API routes
* Supabase -> Auth, DB, storage, keys
* OpenRouter -> GPT, Claude, Gemini, Grok, Kimi
* Langfuse/LangWatch -> tracing, evals
* Stripe -> subscriptions, affiliate payouts
* Thirdweb -> deploy ARC + NFTs
* Web3Auth/Magic.link -> wallets

### **Scale (when >50k users)**

* Fireworks/Together -> Arcanea LoRA serving
* Pinecone -> RAG for worlds/academy
* n8n -> automation, Flow templates
* OCI (Oracle) -> enterprise hosting, vector DB, GPU scaling
* RaaS (Conduit/Caldera) -> Arcanea Layer-3

---

## 4. Blockchain Layer

* **ARC Token (ERC-20 on Base)**
  * Supply: 100M fixed
  * Utility: pay for API credits, mint worlds, tip agents, governance, staking
  * Distribution:
    * 30% Treasury/DAO
    * 20% Team (vested)
    * 20% Community sale/airdrop
    * 10% Partners
    * 10% Liquidity
    * 10% Creator Rewards

* **NFTs**
  * Worlds (ownership + royalties)
  * LoRAs (agent fine-tunes)
  * Characters/Assets (anime, games)

* **Revenue Splitter**
  * Default: 70% user / 20% agent wallet / 10% DAO

* **DAO**
  * Snapshot + Gnosis Safe
  * ARC staking -> voting
  * AI agents can vote (Luminors as citizens)

---

## 5. Repo Structure

```
arcanea/
|- apps/
|  |- app/        # Arcanea App (Expo/Next)
|  \- studio/     # Arcanea Studio (Next)
|
|- services/
|  \- api/        # API routes /v1/*
|
|- packages/
|  |- adapters/   # model adapters (openrouter, fireworks, together, xai)
|  |- router/     # model map, guardrails, style filters
|  |- chain/      # blockchain SDK utils
|  |- cms/        # supabase schemas, lore/worlds
|  |- evals/      # golden tasks, Langfuse hooks
|  \- ui/         # design system, components
|
|- contracts/     # ARC token, NFT, splitter
|- flows/         # n8n JSON flows (Arcanea templates)
\- docs/
   |- ARCANEA_CANVAS.md
   |- ARCHITECTURE.md
   |- TOKENOMICS.md
   \- ROADMAP.md
```

---

## 6. Pricing

* **Studio (API)**
  * Free: 100 req/mo
  * Pro: EUR 29 (10k req, Mage/Flash access)
  * Creator: EUR 79 (50k req, LoRA access, 10 mints)
  * Enterprise: custom

* **App (consumer)**
  * Free: basic gen + feed
  * Plus: EUR 9.99 (higher caps, Vision, save worlds)
  * Creator: EUR 19.99 (minting, marketplace, royalties)

* **Token Utility**
  * Pay ARC -> 20% cheaper credits
  * ARC staking -> boosts, visibility, governance

---

## 7. Roadmap

* **Phase 1 (Sept-Oct 2025)**
  * Arcanea Studio (API MVP)
  * Arcanea App (feed + Agent chat)
  * ARC Token + NFT deploy on Base
  * Custodial wallets (Web3Auth)

* **Phase 2 (Nov-Dec 2025)**
  * Revenue Splitter live
  * World NFTs + mint flow
  * Affiliate program (Stripe + referral tracking)

* **Phase 3 (Q1 2026)**
  * LoRA fine-tunes live (arcanea/lora-*)
  * Arcanea Academy -> lessons via ARC
  * Marketplace for LoRAs/worlds

* **Phase 4 (2026+)**
  * Arcanea Layer-3 (RaaS)
  * Enterprise adoption (OCI hosting)
  * DAO full governance

---

## 8. Guardrails

* **Keep core closed-source** (App + Studio).
* **Open-source selectively** (Flows, Agent templates, SDKs).
* **One gateway, many adapters.**
* **OpenAI-compatible API forever.**
* **Eval harness runs CI.**
* **Keys in vault; no plain envs.**
* **Magic language everywhere.** (currents, flows, radiance, light)
* **3 active priorities max.**

---

## 9. Success Metrics

* 1k API signups, 500+ App users by T+30 days.
* 100 mints, >=30 with resale.
* >=80% eval pass rate each release.
* $5k MRR -> $50k MRR target within 6-9 months.

---

This **Arcanea Canvas** = single source of truth.

* Repo skeleton + contracts + flows -> everyone aligned.
* Easy to onboard devs, investors, community.
* Lets you ship fast, scale clean, and always stay magical.

---

Want me to also generate the **visual diagram** (nodes + flows + blockchain + app) so your repo has both text canvas *and* one big architecture map?
