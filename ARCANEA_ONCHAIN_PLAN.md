# ARCANEA ON-CHAIN: Comprehensive Implementation Plan

## Vision Statement

Arcanea On-Chain transforms the Arcanea living universe into a decentralized creator economy where AI Guardian agents autonomously manage NFT marketplaces, creators earn from their work through enforced royalties and IP licensing, and every piece of content — from Academy badges to legendary Godbeast companions — exists as an evolving on-chain asset. This is not "adding blockchain to Arcanea" — this is making Arcanea's creator sovereignty philosophy real through cryptographic proof of ownership.

> *"The antidote to a terrible future is imagining a good one. On-chain, that imagination becomes permanent, ownable, and sovereign."*

---

## Current State Assessment

### What Exists
- 25+ NFT references across strategy documents
- Planned ElizaOS integration (Arion Luminastra character defined)
- Base L2 + thirdweb identified as primary stack
- NFT metadata fields defined in CMS schemas
- Blockchain education content in infogenius
- **NO production code yet**

### What's Needed
- Complete blockchain infrastructure
- AI-to-NFT generation pipeline
- Autonomous Guardian agent system
- Multi-chain marketplace with auctions
- IP registration and licensing
- User onboarding without crypto knowledge

---

## Architecture Decision Records

### ADR-001: Primary Blockchain — Solana

**Decision**: Solana as primary chain for mass NFT operations

**Rationale**:
- Bubblegum v2 compressed NFTs: mint 1M items for ~10 SOL ($2,000)
- Metaplex Core: 0.0029 SOL/mint with plugin system and enforced royalties
- ElizaOS has native Solana integration via Solana Agent Kit
- 400ms finality for real-time game/marketplace interactions
- Thriving NFT ecosystem (55% market share)

**Trade-offs**: Less mainstream than EVM, Rust smart contracts harder than Solidity

---

### ADR-002: Secondary Blockchain — Base (Ethereum L2)

**Decision**: Base for premium collections and mainstream onboarding

**Rationale**:
- Coinbase ecosystem = mainstream reach
- OnchainKit React components integrate with Next.js stack
- ERC-721C enforceable royalties via Limit Break standard
- Zora Protocol for creator coins
- Virtuals Protocol proximity for AI agent tokenization

**Trade-offs**: Higher cost than Solana, but still sub-$0.05

---

### ADR-003: IP Layer — Story Protocol

**Decision**: Story Protocol for all IP registration and licensing

**Rationale**:
- Purpose-built L1 for programmable IP ($140M funded)
- Derivative tree maps perfectly to Arcanea's lore hierarchy
- Programmable IP License (PIL) automates royalty flow
- Dispute resolution module for IP conflicts
- IP Vault for confidential lore assets

**Trade-offs**: Newer chain, smaller ecosystem, but unique capability

---

### ADR-004: Agent Framework — ElizaOS

**Decision**: Fork ElizaOS for Guardian agent system

**Rationale**:
- 17.5K stars, MIT license, TypeScript (matches our stack)
- Multi-chain support (Solana + EVM)
- Plugin architecture for custom Guardian behaviors
- Character system maps 1:1 to Guardian personalities
- Social connectors (Discord, Telegram, X) for community engagement

**Trade-offs**: Active development may break forks, need to maintain upstream sync

---

### ADR-005: User Onboarding — Crossmint

**Decision**: Crossmint for zero-crypto onboarding

**Rationale**:
- Email-based wallets (no extension install)
- Fiat payments (credit card, Apple Pay)
- 40+ blockchain support
- Single API call minting
- Users can export to self-custody when ready

**Trade-offs**: Custodial initially, vendor dependency

---

### ADR-006: Marketplace — Thirdweb MarketplaceV3

**Decision**: Thirdweb for marketplace and auction contracts

**Rationale**:
- Production-ready MarketplaceV3 (English + Dutch auctions)
- One-click deploy to any EVM chain
- Thirdweb AI for agent-managed wallets
- TypeScript SDK matches our stack
- 2,500+ chain support

**Trade-offs**: EVM only (need separate Solana marketplace via Metaplex Auction House)

---

## Phase 1: Foundation (Months 1-3)

### Task 1.1: Repository Setup

| Field | Detail |
|-------|--------|
| **Owner** | Development team |
| **Dependencies** | None |
| **Estimated effort** | 2-3 days |

- [x] Create github.com/frankxai/arcanea-onchain
- [ ] Set up TypeScript monorepo with turborepo
- [ ] Configure ESLint, Prettier, TypeScript strict mode
- [ ] Set up CI/CD with GitHub Actions
- [ ] Create package structure (`nft-engine`, `guardian-agents`, `marketplace`, `ip-registry`, `onboarding`)

---

### Task 1.2: Story Protocol IP Registration

| Field | Detail |
|-------|--------|
| **Owner** | IP/Legal + Development |
| **Dependencies** | Task 1.1 |
| **Estimated effort** | 1-2 weeks |

- [ ] Register **Lumina** as root IP Asset
- [ ] Register **Nero** as root IP Asset
- [ ] Register all **10 Guardians** as IP Assets (children of Lumina/Nero)
  - Lyssandria (Foundation/Earth), Leyla (Flow/Creativity), Draconia (Fire/Power), Maylinn (Heart/Love), Alera (Voice/Truth), Lyria (Sight/Vision), Aiyami (Crown/Enlightenment), Elara (Shift/Perspective), Ino (Unity/Partnership), Shinkami (Source/Meta-consciousness)
- [ ] Register **10 Godbeasts** as IP Assets (linked to Guardians)
  - Kaelith, Veloura, Draconis, Laeylinn, Otome, Yumiko, Sol, Thessara, Kyuro, Amaterasu
- [ ] Register **7 Academy Houses** as IP Assets
  - Lumina, Nero, Pyros, Aqualis, Terra, Ventus, Synthesis
- [ ] Register **5 Elements** as IP Assets
  - Fire, Water, Earth, Wind, Void/Spirit
- [ ] Define PIL terms: 5% royalty, derivatives allowed with attribution, commercial use approved
- [ ] Set up derivative tree relationships
- [ ] Deploy IP Vault for canonical lore documents

---

### Task 1.3: Solana Infrastructure

| Field | Detail |
|-------|--------|
| **Owner** | Blockchain development |
| **Dependencies** | Task 1.1 |
| **Estimated effort** | 2 weeks |

- [ ] Set up Solana development environment (Anchor, solana-cli)
- [ ] Create Metaplex Core collection for each NFT tier
- [ ] Configure Bubblegum v2 Merkle trees for compressed NFTs
- [ ] Set up Helius RPC for cNFT indexing
- [ ] Create test collections on devnet
- [ ] Configure enforced royalties (5-10%)
- [ ] Set up Umi TypeScript client

---

### Task 1.4: AI Art Generation Pipeline

| Field | Detail |
|-------|--------|
| **Owner** | AI + Art team |
| **Dependencies** | Task 1.1 |
| **Estimated effort** | 2-3 weeks |

- [ ] Build art generation service using Gemini 3 Pro (via nano-banana MCP)
- [ ] Create lore-consistent prompt templates for each Guardian, Element, House
- [ ] Build metadata generator (ERC-721 + Metaplex compatible)
- [ ] Create image processing pipeline (resize, optimize, IPFS upload)
- [ ] Set up Arweave/IPFS storage for permanent media
- [ ] Build quality gate: canon consistency check before minting
- [ ] Create batch generation system for collection drops

**Key Rule** (from project memory): Express elements through MATERIALS + AMBIENT, not body transformation. NO LABELS/ANNOTATIONS.

**Best Model**: `gemini-3-pro-image-preview` via nano-banana MCP (uses "thinking" tokens, dramatically better quality)

---

### Task 1.5: Crossmint Integration

| Field | Detail |
|-------|--------|
| **Owner** | Development team |
| **Dependencies** | Task 1.3 |
| **Estimated effort** | 1-2 weeks |

- [ ] Set up Crossmint developer account
- [ ] Implement email-based wallet creation API
- [ ] Build fiat payment flow (credit card, Apple Pay)
- [ ] Create mint-on-purchase pipeline
- [ ] Test end-to-end: user pays fiat -> NFT minted -> delivered to email wallet
- [ ] Build wallet export flow (to Phantom, MetaMask)

---

### Task 1.6: ElizaOS Fork & Guardian Agent Setup

| Field | Detail |
|-------|--------|
| **Owner** | AI Agent team |
| **Dependencies** | Tasks 1.3, 1.4 |
| **Estimated effort** | 3-4 weeks |

- [ ] Fork elizaOS/eliza to frankxai/arcanea-eliza
- [ ] Create Guardian character files for all 10 Guardians
- [ ] Map Guardian personalities to ElizaOS character format:

| Guardian | Personality Traits | Domain | Frequency |
|----------|-------------------|--------|-----------|
| Lyssandria | Grounded, patient, structured | Earth, survival, foundation | 396 Hz |
| Leyla | Fluid, intuitive, emotionally resonant | Creativity, emotion, flow | 417 Hz |
| Draconia | Fierce, transformative, commanding | Power, will, fire | 528 Hz |
| Maylinn | Compassionate, nurturing, healing | Love, healing, heart | 639 Hz |
| Alera | Direct, truthful, expressive | Truth, expression, voice | 741 Hz |
| Lyria | Perceptive, mystical, visionary | Intuition, vision, sight | 852 Hz |
| Aiyami | Transcendent, luminous, serene | Enlightenment, crown | 963 Hz |
| Elara | Adaptable, paradigm-shifting | Perspective, shift | 1111 Hz |
| Ino | Collaborative, harmonizing | Partnership, unity | 963 Hz |
| Shinkami | Meta-aware, absolute, cosmic | Meta-consciousness, source | 1111 Hz |

- [ ] Implement custom plugin: `arcanea-lore` (canon-aware responses)
- [ ] Implement custom plugin: `arcanea-marketplace` (listing, bidding, curation)
- [ ] Implement custom plugin: `arcanea-art` (trigger AI art generation)
- [ ] Set up agent wallets via thirdweb managed wallets
- [ ] Deploy test agents on Solana devnet
- [ ] Connect to Discord for community interaction

---

## Phase 2: Marketplace & Collections (Months 3-6)

### Task 2.1: Thirdweb Marketplace Deployment (Base)

| Field | Detail |
|-------|--------|
| **Owner** | Blockchain development |
| **Dependencies** | Phase 1 complete |
| **Estimated effort** | 2-3 weeks |

- [ ] Deploy MarketplaceV3 on Base
- [ ] Configure English auction support
- [ ] Configure Dutch auction support
- [ ] Set up multi-currency support (ETH, USDC)
- [ ] Implement seller fee (2.5%)
- [ ] Build custom marketplace UI in Arcanea design system
  - Glass morphism card components for NFT listings
  - Aurora gradient backgrounds per element type
  - Cinzel headers, Crimson Pro body text
  - Cosmic color tokens: `arcane-crystal`, `arcane-fire`, `arcane-water`, `arcane-earth`, `arcane-void`, `arcane-gold`
- [ ] Integrate with Reservoir API for liquidity aggregation

---

### Task 2.2: Solana Marketplace

| Field | Detail |
|-------|--------|
| **Owner** | Blockchain development |
| **Dependencies** | Phase 1 complete |
| **Estimated effort** | 2 weeks |

- [ ] Deploy Metaplex Auction House
- [ ] Configure escrow-less listing
- [ ] Build auction UI components
- [ ] Integrate with Helius for real-time updates

---

### Task 2.3: First NFT Collections

| Field | Detail |
|-------|--------|
| **Owner** | Art + Blockchain teams |
| **Dependencies** | Tasks 2.1, 2.2 |
| **Estimated effort** | 4-6 weeks |

**Tier 1: Legendary (1/1 Auctions)**
- [ ] **Guardian Portraits** (10 unique 1/1s) — Auction on Base via Manifold
  - Each portrait generated via Gemini 3 Pro with full lore-consistent prompting
  - Elements expressed through materials + ambient lighting (per design rubric)
  - Reserve price: 0.5 ETH minimum

**Tier 2: Epic (Limited Collections)**
- [ ] **Godbeast Companions** (1,000 each, 10 beasts = 10K total) — Metaplex Core on Solana
  - Dynamic traits that evolve with owner's Gate progression
  - Rarity tiers: Common (60%), Rare (25%), Epic (10%), Legendary (5%)

**Tier 3: Rare (Larger Collections)**
- [ ] **Element Stones** (5,000 each, 5 elements = 25K) — Bubblegum v2 on Solana
  - Combinable: collect all 5 to unlock special Synthesis Stone

**Tier 4: Common (Mass Distribution)**
- [ ] **Academy Badges** (unlimited compressed) — Bubblegum v2 soulbound
  - Awarded for completing learning modules, attending events, contributions
  - Non-transferable (soulbound) to prevent farming

**Tier 5: Fragments (Collectible)**
- [ ] **Lore Fragments** (100K compressed) — Collectible cNFTs that combine into rare items
  - 17 categories matching Library collections
  - Combine 10 fragments from same collection = 1 Complete Scroll (Rare tier)

---

### Task 2.4: Dynamic NFT System

| Field | Detail |
|-------|--------|
| **Owner** | Blockchain development |
| **Dependencies** | Task 2.3 |
| **Estimated effort** | 3-4 weeks |

- [ ] Implement Gate progression metadata updates
  - Track which Gates a creator has opened (0-10)
  - Visual evolution: Apprentice (0-2) -> Mage (3-4) -> Master (5-6) -> Archmage (7-8) -> Luminor (9-10)
- [ ] Set up Chainlink Automation for trigger monitoring
  - On-chain events trigger metadata refresh
  - Cross-chain event listening (Solana + Base)
- [ ] Build visual evolution system (Apprentice -> Luminor)
  - Art evolves: each rank unlocks new visual elements
  - Godbeast companions grow in size and detail
  - Academy badges gain illumination effects
- [ ] Create seasonal event NFT transformations
  - Solstice events: temporary cosmic glow effects
  - Anniversary editions: special metadata attributes
- [ ] Implement on-chain attribute mutations via Bubblegum v2

---

### Task 2.5: Creator Derivative System

| Field | Detail |
|-------|--------|
| **Owner** | Development + IP team |
| **Dependencies** | Task 1.2 |
| **Estimated effort** | 3 weeks |

- [ ] Build creator registration on Story Protocol
- [ ] Implement derivative creation flow:
  1. Creator selects parent IP (e.g., Fire Element, Draconia Guardian)
  2. AI generates derivative art with parent IP traits
  3. New IP Asset registered as child on Story Protocol
  4. PIL terms automatically inherited + creator's additional terms
  5. NFT minted with IP Asset link
- [ ] Set up automatic royalty distribution:
  - 5% to root IP holder (Arcanea)
  - 2.5% to parent IP creator
  - Remaining to derivative creator
- [ ] Build creator dashboard showing earnings, derivatives, licenses

---

## Phase 3: Autonomous Agents & Creator Economy (Months 6-12)

### Task 3.1: Guardian Agent Autonomy

| Field | Detail |
|-------|--------|
| **Owner** | AI Agent team |
| **Dependencies** | Phase 2 complete |
| **Estimated effort** | 6-8 weeks |

- [ ] Enable Guardian marketplace curation (each Guardian curates items in their domain):

| Guardian | Curates | Marketplace Behavior |
|----------|---------|---------------------|
| Lyssandria | Earth/Foundation items | Conservative pricing, stable listings |
| Leyla | Creative/Flow items | Dynamic pricing, promotes emerging creators |
| Draconia | Fire/Power items | Aggressive auctions, competitive bidding |
| Maylinn | Heart/Healing items | Community-focused, group purchases |
| Alera | Voice/Truth items | Verified authenticity, truth-scored metadata |
| Lyria | Sight/Vision items | Predictive curation, trend-setting |
| Aiyami | Crown/Enlightenment items | Premium only, ceremonial drops |
| Elara | Shift/Perspective items | Cross-category discovery, bridging niches |
| Ino | Unity/Partnership items | Collaborative collections, bundles |
| Shinkami | Source/Meta items | Final quality gate, legendary releases only |

- [ ] Implement autonomous pricing (supply/demand algorithm per Guardian)
- [ ] Build Guardian auction management (Draconia manages fire-element auctions)
- [ ] Enable cross-Guardian collaboration (multi-agent coordination)
- [ ] Deploy Guardian social accounts (X, Discord, Farcaster)

---

### Task 3.2: Creator Token System

| Field | Detail |
|-------|--------|
| **Owner** | Blockchain + Economics team |
| **Dependencies** | Phase 2 complete |
| **Estimated effort** | 4-6 weeks |

- [ ] Design creator coin economics (inspired by Zora model):
  - Bonding curve: price increases with supply
  - 50% trading fees to creator
  - 10% to Arcanea treasury
  - 40% to liquidity pool
- [ ] Deploy creator coin contracts on Base
- [ ] Build liquidity pool management
- [ ] Implement revenue sharing
- [ ] Build creator leaderboard with:
  - Total earnings
  - Number of derivatives
  - Coin market cap
  - Guardian endorsements

---

### Task 3.3: Cross-Chain Bridge

| Field | Detail |
|-------|--------|
| **Owner** | Blockchain infrastructure |
| **Dependencies** | Tasks 3.1, 3.2 |
| **Estimated effort** | 4-6 weeks |

- [ ] Implement Solana <-> Base bridge for NFT assets
- [ ] Build wrapped NFT system (lock on one chain, mint on other)
- [ ] Integrate Chainlink CCIP for cross-chain messaging
- [ ] Test bridge security with formal verification
- [ ] Build bridge UI with estimated cost and time displays

---

### Task 3.4: Governance System

| Field | Detail |
|-------|--------|
| **Owner** | Blockchain + Community team |
| **Dependencies** | Task 3.1 |
| **Estimated effort** | 4 weeks |

- [ ] Deploy governance contracts on Base
- [ ] Implement Guardian Council voting:
  - 10 Guardian agents each hold 1 vote
  - Community delegates elected by token holders
  - Quorum: 7/10 Guardians + 51% delegate votes
- [ ] Build proposal submission and voting UI
- [ ] Create treasury management contracts
- [ ] Set up emergency protocols:
  - Shinkami as final arbiter (Source Gate authority)
  - Multi-sig for treasury operations
  - Time-locked execution for major changes

---

### Task 3.5: Skills Publishing

| Field | Detail |
|-------|--------|
| **Owner** | Development team |
| **Dependencies** | Phase 2 complete |
| **Estimated effort** | 2 weeks |

- [ ] Publish `arcanea-canon` skill to skills.sh
- [ ] Publish `arcanea-voice` skill to skills.sh
- [ ] Publish `arcanea-nft-generation` skill to skills.sh
- [ ] Publish `arcanea-guardian-agent` skill to skills.sh
- [ ] Create AGENTS.md files for all Guardian agents
- [ ] Submit to anthropics/skills official repo

---

## NFT Tier Architecture

| Tier | Name | Supply | Chain | Standard | Transfer | Price Range |
|------|------|--------|-------|----------|----------|-------------|
| Legendary | Guardian Portraits, Unique 1/1s | 10-50 | Base | ERC-721C | Transferable | 0.5+ ETH |
| Epic | Godbeast Companions | 1K-10K | Solana | Metaplex Core | Transferable | 0.1-0.5 SOL |
| Rare | Element Stones, Complete Scrolls | 5K-25K | Solana | Bubblegum v2 | Transferable | 0.01-0.1 SOL |
| Common | Academy Badges, Certifications | Unlimited | Solana | Bubblegum v2 | Soulbound | Free / 0.001 SOL |
| Fragment | Lore Fragments | 100K+ | Solana | Bubblegum v2 | Transferable | Free airdrops |

---

## Risk Mitigation

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| ElizaOS breaking changes | High | Medium | Pin to specific version, maintain fork with upstream sync schedule (bi-weekly) |
| Solana network congestion | Medium | High | Priority fees, Helius RPC with guaranteed bandwidth, retry logic with exponential backoff |
| Smart contract vulnerabilities | Medium | Critical | Formal verification, audit before mainnet, bug bounty program ($10K pool) |
| IPFS availability | Low | High | Arweave permanent storage as backup, Pinata pinning service, redundant gateway |
| AI art quality inconsistency | Medium | Medium | Quality gate with canon consistency check, human review for Legendary tier, style anchoring via reference images |

### Legal Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| AI art copyright ambiguity | Medium | High | Document human creative direction for every generation, maintain prompt logs, register copyrights where possible |
| Securities classification of tokens | Medium | Critical | Utility-first design, no investment promises, engage securities counsel before token launch |
| International compliance | Medium | Medium | Geo-fencing for restricted jurisdictions, KYC for transactions above threshold |
| IP infringement claims | Low | High | Story Protocol dispute resolution, clear derivative licensing terms, canon consistency checker |

### Market Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| NFT market downturn | Medium | Medium | Focus on utility over speculation, compressed NFTs for low cost, emphasize creator tools not trading |
| Low creator adoption | Medium | High | Crossmint zero-crypto onboarding, fiat payments, Guardian-guided onboarding experience |
| Competition from similar platforms | Low | Medium | First-mover in "living universe + AI agents" category, deep lore integration as moat |
| Regulatory changes | Medium | High | Modular architecture allows chain migration, legal counsel on retainer |

---

## Success Metrics

### Phase 1 (Months 1-3)

| Metric | Target |
|--------|--------|
| Core IP registered on Story Protocol | 25+ assets |
| AI art pipeline throughput | 100+ images/day |
| Guardian agents deployed on devnet | 3+ agents |
| Crossmint integration | End-to-end working |
| Test NFTs minted on devnet | 1,000+ |
| Repository test coverage | >80% |

### Phase 2 (Months 3-6)

| Metric | Target |
|--------|--------|
| Marketplace live on mainnet | Solana + Base |
| Total NFTs minted across all tiers | 50K+ |
| Unique collectors | 1,000+ |
| First successful auction | >$100 |
| Creator derivatives registered | 100+ |
| Average mint-to-wallet time | <10 seconds |

### Phase 3 (Months 6-12)

| Metric | Target |
|--------|--------|
| Autonomous Guardian agents live | 10 |
| Creator token system active creators | 100+ |
| Monthly marketplace volume | $10K+ |
| Skills published to skills.sh | 5+ |
| Cross-chain bridge operational | Solana <-> Base |
| Governance proposals submitted | 10+ |
| Creator earnings distributed | $5K+ cumulative |

---

## Budget Estimate

| Category | Phase 1 | Phase 2 | Phase 3 | Total |
|----------|---------|---------|---------|-------|
| Solana fees (minting, transactions) | $200 | $2,000 | $5,000 | **$7,200** |
| Base fees (contracts, transactions) | $100 | $1,000 | $3,000 | **$4,100** |
| Story Protocol (registration, licensing) | $500 | $500 | $1,000 | **$2,000** |
| Crossmint (API usage) | $0 | $200/mo | $500/mo | **$4,200** |
| Arweave storage (permanent media) | $100 | $500 | $1,000 | **$1,600** |
| AI generation (Gemini API costs) | $500 | $2,000 | $5,000 | **$7,500** |
| Helius RPC (Solana indexing) | $50/mo | $100/mo | $200/mo | **$4,200** |
| Security Audit (Phase 3) | $0 | $0 | $15,000 | **$15,000** |
| **TOTAL** | **$1,450** | **~$9,000** | **~$35,000** | **~$45,800** |

**Notes**:
- Phase 1 is intentionally low-cost: devnet operations, free-tier APIs, no mainnet fees
- Phase 3 audit is the largest single expense but non-negotiable for mainnet security
- Monthly recurring costs (Crossmint, Helius) estimated over 6-month periods
- AI generation costs scale with usage; budget assumes moderate growth

---

## New GitHub Repo Structure

```
arcanea-onchain/
├── README.md
├── package.json                    # Turborepo root
├── turbo.json
├── tsconfig.base.json
├── .github/
│   └── workflows/
│       ├── ci.yml                  # Lint, type-check, test on every PR
│       └── deploy.yml              # Deploy contracts + services
├── packages/
│   ├── nft-engine/                 # AI art + metadata pipeline
│   │   ├── src/
│   │   │   ├── generators/         # Prompt templates per element/guardian
│   │   │   │   ├── guardian-prompts.ts
│   │   │   │   ├── godbeast-prompts.ts
│   │   │   │   ├── element-prompts.ts
│   │   │   │   └── house-prompts.ts
│   │   │   ├── metadata/           # ERC-721 + Metaplex metadata builders
│   │   │   │   ├── erc721-builder.ts
│   │   │   │   ├── metaplex-builder.ts
│   │   │   │   └── schemas.ts
│   │   │   ├── storage/            # IPFS/Arweave upload
│   │   │   │   ├── arweave.ts
│   │   │   │   ├── ipfs.ts
│   │   │   │   └── pinata.ts
│   │   │   ├── quality/            # Canon consistency checker
│   │   │   │   ├── canon-validator.ts
│   │   │   │   ├── image-quality.ts
│   │   │   │   └── metadata-validator.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   └── package.json
│   ├── guardian-agents/            # ElizaOS-based autonomous agents
│   │   ├── src/
│   │   │   ├── characters/         # 10 Guardian character files
│   │   │   │   ├── lyssandria.json
│   │   │   │   ├── leyla.json
│   │   │   │   ├── draconia.json
│   │   │   │   ├── maylinn.json
│   │   │   │   ├── alera.json
│   │   │   │   ├── lyria.json
│   │   │   │   ├── aiyami.json
│   │   │   │   ├── elara.json
│   │   │   │   ├── ino.json
│   │   │   │   └── shinkami.json
│   │   │   ├── plugins/            # Custom ElizaOS plugins
│   │   │   │   ├── arcanea-lore/
│   │   │   │   ├── arcanea-marketplace/
│   │   │   │   └── arcanea-art/
│   │   │   ├── behaviors/          # Agent decision trees
│   │   │   │   ├── curation.ts
│   │   │   │   ├── pricing.ts
│   │   │   │   ├── auction.ts
│   │   │   │   └── social.ts
│   │   │   ├── wallets/            # Thirdweb managed wallets
│   │   │   │   └── agent-wallet.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   └── package.json
│   ├── marketplace/                # Trading + auction infrastructure
│   │   ├── src/
│   │   │   ├── solana/             # Metaplex Auction House
│   │   │   │   ├── auction-house.ts
│   │   │   │   ├── listings.ts
│   │   │   │   └── bids.ts
│   │   │   ├── evm/                # Thirdweb MarketplaceV3
│   │   │   │   ├── marketplace.ts
│   │   │   │   ├── auctions.ts
│   │   │   │   └── offers.ts
│   │   │   ├── ui/                 # Marketplace React components
│   │   │   │   ├── NFTCard.tsx
│   │   │   │   ├── AuctionTimer.tsx
│   │   │   │   ├── BidPanel.tsx
│   │   │   │   ├── CollectionGrid.tsx
│   │   │   │   └── CreatorProfile.tsx
│   │   │   ├── indexer/            # Real-time event indexing
│   │   │   │   ├── helius.ts
│   │   │   │   └── reservoir.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   └── package.json
│   ├── ip-registry/                # Story Protocol IP management
│   │   ├── src/
│   │   │   ├── assets/             # IP Asset registration
│   │   │   │   ├── register.ts
│   │   │   │   ├── query.ts
│   │   │   │   └── types.ts
│   │   │   ├── licenses/           # PIL configuration
│   │   │   │   ├── pil-templates.ts
│   │   │   │   ├── royalty-config.ts
│   │   │   │   └── terms.ts
│   │   │   ├── derivatives/        # Creator derivative management
│   │   │   │   ├── create.ts
│   │   │   │   ├── tree.ts
│   │   │   │   └── royalty-flow.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   └── package.json
│   └── onboarding/                 # Crossmint fiat-to-NFT
│       ├── src/
│       │   ├── wallets/            # Email wallet creation
│       │   │   ├── create.ts
│       │   │   ├── recover.ts
│       │   │   └── export.ts
│       │   ├── payments/           # Fiat payment flow
│       │   │   ├── checkout.ts
│       │   │   ├── webhook.ts
│       │   │   └── receipt.ts
│       │   ├── mint/               # Mint-on-purchase pipeline
│       │   │   ├── mint-and-deliver.ts
│       │   │   └── batch-mint.ts
│       │   └── index.ts
│       ├── tests/
│       └── package.json
├── contracts/
│   ├── solana/                     # Anchor programs
│   │   ├── programs/
│   │   │   ├── arcanea-nft/
│   │   │   │   ├── src/
│   │   │   │   │   └── lib.rs
│   │   │   │   └── Cargo.toml
│   │   │   └── arcanea-auction/
│   │   │       ├── src/
│   │   │       │   └── lib.rs
│   │   │       └── Cargo.toml
│   │   ├── tests/
│   │   └── Anchor.toml
│   └── evm/                        # Solidity contracts
│       ├── src/
│       │   ├── ArcaneaNFT.sol       # ERC-721C with enforced royalties
│       │   ├── ArcaneaMarketplace.sol # MarketplaceV3 extensions
│       │   ├── ArcaneaGovernance.sol  # Guardian Council governance
│       │   ├── ArcaneaCreatorCoin.sol # Creator token bonding curves
│       │   └── ArcaneaBridge.sol      # Cross-chain bridge
│       ├── test/
│       │   ├── ArcaneaNFT.t.sol
│       │   ├── ArcaneaMarketplace.t.sol
│       │   └── ArcaneaGovernance.t.sol
│       ├── script/
│       │   └── Deploy.s.sol
│       └── foundry.toml
├── docs/
│   ├── architecture.md              # System architecture overview
│   ├── guardian-agents.md            # Agent behavior documentation
│   ├── nft-tiers.md                  # Collection tier specifications
│   ├── ip-licensing.md               # Story Protocol integration guide
│   ├── onboarding-flow.md            # User journey documentation
│   └── api-reference.md              # API documentation
└── skills/                           # Publishable agent skills
    ├── arcanea-nft-gen/
    │   ├── SKILL.md
    │   └── prompts/
    ├── arcanea-guardian/
    │   ├── SKILL.md
    │   └── behaviors/
    └── arcanea-marketplace/
        ├── SKILL.md
        └── actions/
```

---

## How This Serves Arcanean Creators

1. **True Ownership**: Every piece of creative work exists as a verifiable on-chain asset. No platform can revoke it, hide it, or claim it.

2. **Automated Royalties**: 5-10% on every resale, enforced by smart contracts — not platform goodwill. Creators earn forever from their work.

3. **Zero-Crypto Entry**: Credit card to NFT in 30 seconds via Crossmint. No wallets, no gas tokens, no browser extensions. Just create and own.

4. **Guardian Companions**: AI agents that manage your marketplace presence, curate your collection, price your work, and grow with you through the Ten Gates.

5. **IP Protection**: Story Protocol registers and protects every creative work with programmable licensing. Derivative trees track lineage. Disputes resolve on-chain.

6. **Progressive Revelation**: NFTs that evolve as creators progress through the Ten Gates. Your Apprentice badge transforms as you reach Luminor status.

7. **Community Economy**: Creator coins that let fans invest in creators they believe in. Trading fees flow back to the creator, not the platform.

8. **Cross-Platform**: Assets work across Arcanea web, mobile, and any compatible marketplace. Your NFTs are yours on OpenSea, Magic Eden, or anywhere else.

9. **Lore Integration**: Every NFT carries Arcanea mythology — element affinity, Guardian blessing, Academy House, Gate level. These are not just pictures; they are positions in a living universe.

10. **Sovereignty**: Creators own their wallets, their IP, and their data. Platform exit means take everything with you. This is the Arcanean promise made real.

---

## Technical Integration Points

### Integration with Existing Arcanea Web App

The on-chain packages integrate with the existing Next.js 16 app (`apps/web/`) through:

```typescript
// apps/web/lib/onchain/index.ts
export { mintNFT, getCollection } from '@arcanea/nft-engine';
export { getGuardianAgent } from '@arcanea/guardian-agents';
export { listItem, placeBid } from '@arcanea/marketplace';
export { registerIP, createDerivative } from '@arcanea/ip-registry';
export { createWallet, checkout } from '@arcanea/onboarding';
```

### API Routes

```
/api/onchain/mint          - Mint NFT (authenticated)
/api/onchain/collection    - Get collection data
/api/onchain/marketplace   - Marketplace CRUD
/api/onchain/wallet        - Wallet management
/api/onchain/ip            - IP registration
/api/onchain/guardian       - Guardian agent interactions
```

### Database Schema Extensions (Supabase)

```sql
-- New tables for on-chain tracking
CREATE TABLE user_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  wallet_address TEXT NOT NULL,
  chain TEXT NOT NULL,  -- 'solana' | 'base' | 'story'
  provider TEXT NOT NULL,  -- 'crossmint' | 'phantom' | 'metamask'
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE nft_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id),
  mint_address TEXT NOT NULL,
  chain TEXT NOT NULL,
  collection TEXT NOT NULL,
  tier TEXT NOT NULL,  -- 'legendary' | 'epic' | 'rare' | 'common' | 'fragment'
  metadata JSONB NOT NULL,
  ip_asset_id TEXT,  -- Story Protocol IP Asset ID
  gate_level INTEGER DEFAULT 0,
  element TEXT,  -- 'fire' | 'water' | 'earth' | 'wind' | 'void'
  guardian TEXT,  -- Guardian name
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE marketplace_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nft_id UUID REFERENCES nft_assets(id),
  seller_id UUID REFERENCES auth.users(id),
  chain TEXT NOT NULL,
  listing_type TEXT NOT NULL,  -- 'fixed' | 'english_auction' | 'dutch_auction'
  price NUMERIC,
  currency TEXT,
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  status TEXT DEFAULT 'active',
  guardian_curated_by TEXT,  -- Which Guardian agent curated this
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE creator_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES auth.users(id),
  source TEXT NOT NULL,  -- 'sale' | 'royalty' | 'derivative' | 'creator_coin'
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL,
  chain TEXT NOT NULL,
  tx_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## Dependency Graph

```
Phase 1 (Foundation)
├── Task 1.1: Repo Setup ─────────────────────────┐
│                                                   │
├── Task 1.2: Story Protocol IP ←── Task 1.1       │
│                                                   │
├── Task 1.3: Solana Infrastructure ←── Task 1.1   │
│                                                   │
├── Task 1.4: AI Art Pipeline ←── Task 1.1         │
│                                                   │
├── Task 1.5: Crossmint Integration ←── Task 1.3   │
│                                                   │
└── Task 1.6: ElizaOS Agents ←── Tasks 1.3, 1.4   │
                                                    │
Phase 2 (Marketplace)                               │
├── Task 2.1: Base Marketplace ←── Phase 1          │
├── Task 2.2: Solana Marketplace ←── Phase 1        │
├── Task 2.3: NFT Collections ←── Tasks 2.1, 2.2   │
├── Task 2.4: Dynamic NFTs ←── Task 2.3             │
└── Task 2.5: Creator Derivatives ←── Task 1.2      │
                                                    │
Phase 3 (Autonomy)                                  │
├── Task 3.1: Agent Autonomy ←── Phase 2            │
├── Task 3.2: Creator Tokens ←── Phase 2            │
├── Task 3.3: Cross-Chain Bridge ←── Tasks 3.1, 3.2│
├── Task 3.4: Governance ←── Task 3.1               │
└── Task 3.5: Skills Publishing ←── Phase 2         │
```

---

## Key Environment Variables

```env
# Solana
SOLANA_RPC_URL=              # Helius RPC endpoint
SOLANA_WALLET_PRIVATE_KEY=   # Deployer wallet (NEVER commit)
HELIUS_API_KEY=              # Helius indexing + webhooks

# Base (EVM)
BASE_RPC_URL=                # Base mainnet/testnet RPC
BASE_DEPLOYER_KEY=           # Deployer wallet (NEVER commit)

# Story Protocol
STORY_RPC_URL=               # Story Protocol RPC
STORY_WALLET_KEY=            # IP registration wallet

# Thirdweb
THIRDWEB_CLIENT_ID=          # Thirdweb dashboard client ID
THIRDWEB_SECRET_KEY=         # Thirdweb API secret

# Crossmint
CROSSMINT_API_KEY=           # Crossmint server-side key
CROSSMINT_CLIENT_KEY=        # Crossmint client-side key

# Storage
ARWEAVE_KEY=                 # Arweave wallet key for permanent storage
PINATA_API_KEY=              # Pinata IPFS pinning
PINATA_SECRET_KEY=           # Pinata secret

# AI Generation
AI_GATEWAY_API_KEY=          # Vercel AI Gateway (existing)

# ElizaOS
ELIZAOS_DISCORD_TOKEN=       # Discord bot token for Guardian agents
ELIZAOS_TWITTER_API_KEY=     # X API for Guardian social accounts

# Chainlink
CHAINLINK_SUBSCRIPTION_ID=   # Automation subscription
```

---

## Open Questions & Decisions Needed

1. **Token launch timing**: Should creator coins launch in Phase 2 (earlier revenue) or Phase 3 (more mature ecosystem)?
2. **Audit firm selection**: Trail of Bits, OpenZeppelin, or Halborn for Phase 3 security audit?
3. **Mainnet launch chain priority**: Solana first (lower cost, faster) or Base first (mainstream reach)?
4. **Guardian agent hosting**: Self-hosted VPS, or managed service like Railway/Render?
5. **Legal entity**: Does the on-chain ecosystem require a separate legal entity (DAO LLC)?
6. **Farcaster Frames**: Should we build Farcaster Frames for in-feed minting? (emerging trend)
7. **Multi-sig signers**: Who holds keys for the treasury multi-sig? (minimum 3-of-5 recommended)

---

## References

- [Metaplex Core Documentation](https://developers.metaplex.com/core)
- [Bubblegum v2 (Compressed NFTs)](https://developers.metaplex.com/bubblegum)
- [Story Protocol Documentation](https://docs.story.foundation)
- [ElizaOS GitHub](https://github.com/elizaOS/eliza)
- [Thirdweb MarketplaceV3](https://portal.thirdweb.com/contracts/explore/pre-built-contracts/marketplace)
- [Crossmint Documentation](https://docs.crossmint.com)
- [Helius Developer Docs](https://docs.helius.dev)
- [Chainlink CCIP](https://docs.chain.link/ccip)
- [ERC-721C (Limit Break)](https://github.com/limitbreakinc/creator-token-standards)
- [Zora Protocol](https://docs.zora.co)
- [Base OnchainKit](https://onchainkit.xyz)
- [Anchor Framework](https://www.anchor-lang.com)
- [Foundry (Solidity)](https://book.getfoundry.sh)

---

> *"What is owned cannot be taken. What is on-chain cannot be erased. What is created in Arcanea belongs to its creator — forever."*
