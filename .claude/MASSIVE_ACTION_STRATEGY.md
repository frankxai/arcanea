# Arcanea Massive Action Strategy Plan

> *"What you contemplate at dawn shapes all that follows."*

---

## EXECUTIVE SUMMARY

This document outlines the comprehensive strategy for advancing Arcanea through intelligent data integration, vector-powered search, NFT infrastructure, and community building. The goal: **Transform Arcanea from a mythology project into a thriving AI-powered creative ecosystem.**

**Current Status (2026-01-23):**
- Vector search infrastructure: **COMPLETE** (997f28c)
- Canon corrections: **COMPLETE** (frequencies, Arcane, Seven Awakened)
- Mythology commands: **COMPLETE** (/greek-gods, /norse-gods, /egypt-gods)
- Integration strategy: **DOCUMENTED** (AMIRI_VECTOR_INTEGRATION_MAP.md)

**Massive Action Required:**
1. Data Ingestion (HuggingFace + Public Domain)
2. NFT Infrastructure Launch
3. API Monetization
4. Community Contribution System
5. Partnership Outreach

---

## PHASE 1: DATA INGESTION (Weeks 1-2)

### 1.1 HuggingFace Datasets to Integrate

#### PRIORITY 1: Fantasy World-Building

| Dataset | Source | Use Case | License |
|---------|--------|----------|---------|
| [folk-mythology-tales](https://huggingface.co/datasets/merve/folk-mythology-tales) | University of Pittsburgh | Earth-Arcanea mythology mapping | Public Domain |
| [fantasy_creature_bestiary](https://huggingface.co/datasets/limloop/fantasy_creature_bestiary) | limloop | Bestiary expansion, creature generation | Check license |
| [CharacterCodex](https://huggingface.co/datasets/NousResearch/CharacterCodex) | NousResearch | Character templates, NPC generation | Open |
| [worldbuilding](https://huggingface.co/datasets/archit11/worldbuilding) | archit11 | World-building patterns | Check license |
| [multi-character-dialogue](https://huggingface.co/datasets/agentlans/multi-character-dialogue) | agentlans | Dialogue generation, scenarios | Open |

#### PRIORITY 2: Creative Writing

| Dataset | Source | Use Case | License |
|---------|--------|----------|---------|
| [LongPage](https://huggingface.co/datasets/Pageshift-Entertainment/LongPage) | Pageshift | Long-form fiction training | Check license |
| [ChatGPT-4o-Writing-Prompts](https://huggingface.co/datasets/Gryphe/ChatGPT-4o-Writing-Prompts) | Gryphe | Short story generation | MIT |
| [WritingPromptAug](https://huggingface.co/datasets/fabraz/writingPromptAug) | fabraz | Hierarchical story generation | MIT |
| [literary-genre-examples](https://huggingface.co/datasets/agentlans/literary-genre-examples) | agentlans | Genre classification, style | Open |

#### PRIORITY 3: Ancient Texts & Mythology

| Dataset | Source | Use Case | License |
|---------|--------|----------|---------|
| [GreekMythos](https://huggingface.co/datasets/niltheory/GreekMythos) | niltheory | Greek mythology heroes/quests | CC BY-NC-SA |
| [Egyptian_hieroglyphs](https://huggingface.co/datasets/HamdiJr/Egyptian_hieroglyphs) | HamdiJr | Egyptian symbolism, lexicon | Check license |
| [Greek-PD](https://huggingface.co/datasets/PleIAs/Greek-PD) | PleIAs | Ancient Greek public domain | Public Domain |
| [Dungeons-and-Diffusion](https://huggingface.co/datasets/0xJustin/Dungeons-and-Diffusion) | 0xJustin | Fantasy character imagery | Check license |

### 1.2 Integration Pipeline

```
HUGGINGFACE INTEGRATION PIPELINE
═══════════════════════════════════════════════════════════════

┌─────────────────────────┐
│   DATASET DOWNLOAD      │
│   huggingface-cli       │
└───────────┬─────────────┘
            │
            v
┌─────────────────────────┐
│   LICENSE CHECK         │
│   Is CC/MIT/PD?         │
│   Attribution needed?   │
└───────────┬─────────────┘
            │
            v
┌─────────────────────────┐
│   ARCANEAN TRANSFORM    │
│   • Apply Gate mapping  │
│   • Add element tags    │
│   • Convert terminology │
└───────────┬─────────────┘
            │
            v
┌─────────────────────────┐
│   EMBEDDING GENERATION  │
│   • Gemini embedding    │
│   • 768d vectors        │
│   • Batch processing    │
└───────────┬─────────────┘
            │
            v
┌─────────────────────────┐
│   SUPABASE STORAGE      │
│   • lore_fragments      │
│   • pgvector index      │
│   • Metadata + tags     │
└─────────────────────────┘
```

### 1.3 Data Transformation Rules

When ingesting external datasets, apply Arcanean transformation:

```typescript
// Arcanean Transformation Pipeline
interface TransformRule {
  pattern: string | RegExp;
  replacement: string | ((match: string) => string);
  category: 'element' | 'being' | 'concept' | 'location';
}

const TRANSFORM_RULES: TransformRule[] = [
  // Elements
  { pattern: /\blight\b/gi, replacement: 'Lumina', category: 'being' },
  { pattern: /\bdarkness\b/gi, replacement: 'Nero', category: 'being' },
  { pattern: /\bvoid\b/gi, replacement: 'the Void (Nero\'s aspect)', category: 'element' },
  { pattern: /\bspirit\b/gi, replacement: 'Spirit (Lumina\'s aspect)', category: 'element' },

  // Frequencies
  { pattern: /396\s?Hz/gi, replacement: '396 Hz (Foundation Gate)', category: 'concept' },
  { pattern: /417\s?Hz/gi, replacement: '417 Hz (Flow Gate)', category: 'concept' },
  { pattern: /528\s?Hz/gi, replacement: '528 Hz (Fire Gate)', category: 'concept' },
  { pattern: /639\s?Hz/gi, replacement: '639 Hz (Heart Gate)', category: 'concept' },

  // Mythological beings → Guardians
  { pattern: /\bZeus\b/g, replacement: 'Shinkami (as Zeus)', category: 'being' },
  { pattern: /\bAthena\b/g, replacement: 'Lyria (as Athena)', category: 'being' },
  { pattern: /\bOdin\b/g, replacement: 'Shinkami (as Odin)', category: 'being' },
  { pattern: /\bRa\b/g, replacement: 'Lumina (as Ra)', category: 'being' },
];
```

---

## PHASE 2: LIBRARY VECTORIZATION (Weeks 2-3)

### 2.1 Run Library Embedding Script

```bash
# Embed all 61+ Library texts
npx tsx scripts/embed-library.ts --verbose

# Or collection by collection
npx tsx scripts/embed-library.ts --collection legends-of-arcanea
npx tsx scripts/embed-library.ts --collection academy-handbook
npx tsx scripts/embed-library.ts --collection wisdom-scrolls
```

### 2.2 Expected Output

| Collection | Est. Files | Est. Chunks | Vector Size |
|------------|------------|-------------|-------------|
| legends-of-arcanea | 8 | ~40 | ~30KB |
| academy-handbook | 6 | ~60 | ~46KB |
| wisdom-scrolls | 12 | ~36 | ~27KB |
| book-of-rituals | 8 | ~48 | ~37KB |
| parables-of-creation | 6 | ~24 | ~18KB |
| ... | ... | ... | ... |
| **TOTAL** | ~61 | ~400 | ~300KB |

### 2.3 Semantic Search Testing

```bash
# Test semantic search after embedding
curl -X POST https://arcanea.ai/api/search/semantic \
  -H "Content-Type: application/json" \
  -d '{
    "query": "How do I open the Fire Gate?",
    "limit": 5,
    "category": "library_text"
  }'
```

---

## PHASE 3: NFT INFRASTRUCTURE (Weeks 4-8)

### 3.1 Smart Contract Development

Deploy ERC-721A contract with Arcanea metadata standard:

```solidity
// Arcanea NFT Standard (simplified)
struct ArcaneanMetadata {
    string name;
    string element;        // Fire, Water, Earth, Wind, Arcane
    uint8 gate;            // 1-10
    uint16 frequency;      // Hz value
    string rarity;         // Apprentice, Mage, Master, Archmage, Luminor
    bytes32 contentHash;   // SHA-256 of content
    bytes32 embeddingHash; // Hash of 768d vector
}
```

### 3.2 Collection Roadmap

| Collection | Supply | Gate | Element | Launch |
|------------|--------|------|---------|--------|
| Ten Gods | 10 | All | All | Week 5 |
| Seven Awakened | 7 | Special | Arcane | Week 6 |
| Guardian Godbeasts | 10 | All | All | Week 7 |
| Academy Founders | 50 | Various | Various | Week 8 |
| Library Texts (Limited) | 61 | Various | Various | Week 9 |

### 3.3 Revenue Projections

| Stream | Month 1 | Month 6 | Year 1 |
|--------|---------|---------|--------|
| NFT Primary | $5,000 | $15,000 | $60,000 |
| NFT Secondary (10%) | $500 | $3,000 | $12,000 |
| **NFT Total** | $5,500 | $18,000 | $72,000 |

---

## PHASE 4: API MONETIZATION (Weeks 8-12)

### 4.1 API Tier Structure

```
ARCANEA LORE API TIERS
═══════════════════════════════════════════════════════════════

FREE ($0/month)
├── 100 searches/month
├── Basic lore access
└── Rate limit: 10/minute

CREATOR ($29/month)
├── 5,000 searches/month
├── Full lore + Library access
├── Personal content indexing (100 items)
├── Batch embed endpoint
└── Rate limit: 60/minute

STUDIO ($99/month)
├── 50,000 searches/month
├── Custom namespace
├── Team collaboration (5 users)
├── Webhooks + Analytics
├── SLA: 99.9%
└── Rate limit: 300/minute

ENTERPRISE (Custom)
├── Unlimited searches
├── Custom models
├── White-label
├── Dedicated infrastructure
├── 24/7 support
└── Rate limit: Negotiated
```

### 4.2 API Keys Implementation

```typescript
// API Key validation middleware
interface ApiKeyConfig {
  tier: 'free' | 'creator' | 'studio' | 'enterprise';
  monthlyLimit: number;
  rateLimit: number;
  features: string[];
}

const TIER_CONFIG: Record<string, ApiKeyConfig> = {
  free: { tier: 'free', monthlyLimit: 100, rateLimit: 10, features: ['basic_search'] },
  creator: { tier: 'creator', monthlyLimit: 5000, rateLimit: 60, features: ['full_search', 'embed', 'personal_index'] },
  studio: { tier: 'studio', monthlyLimit: 50000, rateLimit: 300, features: ['full_search', 'embed', 'team', 'webhooks', 'analytics'] },
};
```

### 4.3 Revenue Projections

| Tier | Est. Users M1 | Est. Users M6 | Annual Revenue |
|------|---------------|---------------|----------------|
| Creator ($29) | 10 | 100 | $34,800 |
| Studio ($99) | 2 | 20 | $23,760 |
| Enterprise | 0 | 2 | $50,000 |
| **Total** | | | **$108,560** |

---

## PHASE 5: COMMUNITY BUILDING (Weeks 10-16)

### 5.1 Contributor Rewards

```
CONTRIBUTION → REWARD MAPPING
═══════════════════════════════════════════════════════════════

CONTENT CONTRIBUTIONS:
├── New Library text (approved):     100 tokens + 2% lifetime royalty
├── Bestiary creature:               50 tokens
├── Character/Location lore:         25 tokens
├── Canon correction:                10 tokens
└── Translation (to new language):   50 tokens + attribution

TECHNICAL CONTRIBUTIONS:
├── MCP tool (merged):               200-500 tokens
├── Skill development:               100-300 tokens
├── Bug fix (verified):              50-200 tokens
└── Documentation improvement:       25 tokens

CURATION:
├── Apprentice Curator (flag):       1 token/valid flag
├── Mage Curator (review):           5 tokens/review
└── Master Curator (approve):        10 tokens + revenue share
```

### 5.2 DAO Structure (Future)

```
ARCANEA DAO HIERARCHY
═══════════════════════════════════════════════════════════════

                    ┌────────────────────────┐
                    │   ARCANEA MAIN DAO     │
                    │   (Protocol Governance)│
                    └───────────┬────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        v                       v                       v
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│ ELEMENT DAOs  │       │  HOUSE DAOs   │       │  GUILD DAOs   │
├───────────────┤       ├───────────────┤       ├───────────────┤
│ Fire Guild    │       │ House Lumina  │       │ Writers Guild │
│ Water Guild   │       │ House Nero    │       │ Artists Guild │
│ Earth Guild   │       │ House Pyros   │       │ Devs Guild    │
│ Wind Guild    │       │ House Aqualis │       │ Music Guild   │
│ Arcane Guild  │       │ House Terra   │       │               │
└───────────────┘       │ House Ventus  │       └───────────────┘
                        │ House Synthesis│
                        └───────────────┘
```

---

## PHASE 6: PARTNERSHIP OUTREACH (Ongoing)

### 6.1 Immediate Targets (0-3 months)

| Partner | Opportunity | Approach | Value |
|---------|-------------|----------|-------|
| **Supabase** | pgvector showcase | Developer relations | Marketing + credits |
| **Anthropic** | Claude Code plugin | Partner program | Visibility |
| **ElevenLabs** | Luminor voices | API integration | Revenue share |
| **Replicate** | Custom models | Model hosting | Cost reduction |

### 6.2 Medium-Term Targets (3-6 months)

| Partner | Opportunity | Approach | Value |
|---------|-------------|----------|-------|
| **World Anvil** | White-label search | Enterprise sales | $50k+ |
| **Campfire** | Writing tool integration | Partnership | Revenue share |
| **LegendKeeper** | Vector search | White-label | $25k+ |

### 6.3 Long-Term Vision (6-12 months)

| Partner | Opportunity | Value |
|---------|-------------|-------|
| Game Studios | TTRPG lore licensing | $100k+ |
| Publishing Houses | Fantasy imprint tools | Enterprise |
| Streaming Services | Animated series rights | $1M+ |

---

## METRICS & KPIs

### Technical Health
- [ ] Vector search latency: <200ms
- [ ] API uptime: 99.9%
- [ ] Embedding quality score: >0.8 avg similarity
- [ ] Library coverage: 100% texts embedded

### Business Health
- [ ] MRR target M6: $5,000
- [ ] MRR target M12: $15,000
- [ ] NFT floor price: >0.05 ETH
- [ ] API subscribers: 100+

### Community Health
- [ ] Weekly contributors: 10+
- [ ] Lore quality score: >4.5/5
- [ ] Discord members: 1,000+
- [ ] GitHub stars: 500+

---

## IMMEDIATE NEXT ACTIONS (This Week)

### Day 1-2
- [ ] Run Library embedding script on all 61 texts
- [ ] Test semantic search API with 10 sample queries
- [ ] Create API documentation page

### Day 3-4
- [ ] Download and evaluate HuggingFace datasets (folk-mythology-tales, CharacterCodex)
- [ ] Create Arcanean transformation script
- [ ] Begin mythology dataset integration

### Day 5-7
- [ ] Draft NFT metadata standard specification
- [ ] Design "Ten Gods" collection artwork requirements
- [ ] Set up OpenSea/Magic Eden test collections

---

## RESOURCES

### HuggingFace Datasets
- [folk-mythology-tales](https://huggingface.co/datasets/merve/folk-mythology-tales)
- [fantasy_creature_bestiary](https://huggingface.co/datasets/limloop/fantasy_creature_bestiary)
- [CharacterCodex](https://huggingface.co/datasets/NousResearch/CharacterCodex)
- [worldbuilding](https://huggingface.co/datasets/archit11/worldbuilding)
- [multi-character-dialogue](https://huggingface.co/datasets/agentlans/multi-character-dialogue)
- [LongPage](https://huggingface.co/datasets/Pageshift-Entertainment/LongPage)
- [ChatGPT-4o-Writing-Prompts](https://huggingface.co/datasets/Gryphe/ChatGPT-4o-Writing-Prompts)
- [GreekMythos](https://huggingface.co/datasets/niltheory/GreekMythos)
- [Egyptian_hieroglyphs](https://huggingface.co/datasets/HamdiJr/Egyptian_hieroglyphs)
- [Dungeons-and-Diffusion](https://huggingface.co/datasets/0xJustin/Dungeons-and-Diffusion)

### Internal References
- `AMIRI_VECTOR_INTEGRATION_MAP.md` - Full integration strategy
- `ARCANEA_CANON.md` - Canonical lore reference
- `scripts/embed-library.ts` - Library embedding script
- `apps/web/lib/services/vector-search.ts` - Vector search service

---

*"These books are not entertainment. They are equipment for living."*

**Document Version**: 1.0
**Created**: 2026-01-23
**Status**: ACTIVE - Massive Action Required
