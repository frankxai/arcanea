# AMIRI (Kardia Wisdom) - Vector System Integration Map

> *"Connection is creation's heartbeat. Every relationship multiplies value."*

---

## EXECUTIVE SUMMARY

This document maps all relationships, integrations, and monetization paths for Arcanea's vector system as analyzed by Amiri (Kardia Wisdom - Connection and Integration Agent).

**Key Finding**: Arcanea possesses a unique convergence of:
- Existing vector infrastructure (pgvector on Supabase, 768-dimensional embeddings)
- A mature MCP server (`@arcanea/mcp-server` v0.3.0) with creation graph
- Multi-provider AI generation (Gemini, Fal, Replicate, Grok confirmed)
- 61+ content pieces in the Library ready for vectorization
- Established NFT framework with rarity tiers and collections

---

## 1. NFT INTEGRATION

### 1.1 How Vectors Enable NFT Discovery/Curation

```
VECTOR-NFT DISCOVERY FLOW
===============================================================

User Query: "Find me water element characters with healing powers"
                    |
                    v
    ┌───────────────────────────────┐
    │   SEMANTIC VECTOR SEARCH      │
    │   (query → 768d embedding)    │
    └───────────────┬───────────────┘
                    |
                    v
    ┌───────────────────────────────┐
    │   LORE_FRAGMENTS TABLE        │
    │   match_lore() function       │
    │   similarity > threshold      │
    └───────────────┬───────────────┘
                    |
                    v
    ┌───────────────────────────────┐
    │   MATCHED CREATIONS           │
    │   + Character metadata        │
    │   + NFT token_id mapping      │
    └───────────────┬───────────────┘
                    |
                    v
    ┌───────────────────────────────┐
    │   NFT GALLERY DISPLAY         │
    │   + OpenSea/Magic Eden links  │
    │   + Rarity scores             │
    │   + Related creations         │
    └───────────────────────────────┘
```

### 1.2 "Similar Creations" as NFT Collections

| Collection Strategy | Vector Implementation | Revenue Model |
|---------------------|----------------------|---------------|
| **Elemental Clusters** | Group by element embedding similarity | Collection bundles at premium |
| **Gate Progression** | Sequence by gate frequency | Level-up mechanics (stake to ascend) |
| **Narrative Arcs** | Story relationship vectors | Story completion bonuses |
| **Creator Styles** | User creation fingerprints | Artist attribution royalties |

### 1.3 Vector Fingerprinting for Authenticity

```typescript
// Proposed: Creation Authenticity Schema
interface CreationFingerprint {
  contentHash: string;          // SHA-256 of content
  embeddingVector: number[];    // 768d semantic fingerprint
  styleVector: number[];        // Author style embedding
  lineageChain: string[];       // Parent creation hashes
  timestamp: number;            // Creation timestamp
  signature: string;            // Creator wallet signature
}

// Verification flow:
// 1. Hash content → check blockchain registry
// 2. Compare embedding → detect semantic plagiarism
// 3. Verify lineage → track derivative works
// 4. Validate signature → prove authorship
```

### 1.4 On-Chain vs Off-Chain Architecture

```
ON-CHAIN (Immutable)              OFF-CHAIN (Arcanea Database)
═══════════════════════════════════════════════════════════════

┌────────────────────────┐        ┌────────────────────────┐
│ NFT Token Metadata     │        │ Full Content Storage   │
├────────────────────────┤        ├────────────────────────┤
│ • token_id             │        │ • Full text/story      │
│ • owner_address        │        │ • High-res images      │
│ • creation_hash        │◄──────►│ • 768d embeddings      │
│ • rarity_tier          │  IPFS  │ • Relationship graph   │
│ • element              │  hash  │ • Search metadata      │
│ • gate_level           │        │ • Usage analytics      │
│ • creator_address      │        │ • Version history      │
│ • royalty_bps          │        │                        │
└────────────────────────┘        └────────────────────────┘
         │                                  │
         │         ┌──────────────┐        │
         └────────►│  IPFS/Arweave│◄───────┘
                   │  (Backup)    │
                   └──────────────┘
```

### 1.5 NFT Marketplace Integration

| Marketplace | Integration Method | Priority |
|-------------|-------------------|----------|
| **OpenSea** | Seaport Protocol, Collection API | High |
| **Magic Eden** | ME API v2, Solana bridge | High |
| **Blur** | Blur API, ERC-721 standard | Medium |
| **Foundation** | Curated creator program | Medium |
| **Zora** | Protocol integration | Low |

**Implementation Path**:
1. Deploy ERC-721A contract with Arcanea metadata standard
2. Index creations with vector embeddings on mint
3. Build discovery API that combines vector search + on-chain data
4. Create marketplace widgets for "Similar Creations"

### 1.6 Royalty Structures for AI-Assisted Creations

```
ARCANEA ROYALTY MODEL
═══════════════════════════════════════════════════════════════

PRIMARY SALE (Mint):
├── Creator (human):        70%
├── Arcanea Platform:       20%
└── AI Training Fund:       10%

SECONDARY SALE (Resale):
├── Original Creator:       5%
├── Arcanea Platform:       2.5%
├── Community Treasury:     2.5%
└── Total Royalty:          10%

AI COLLABORATION BONUS:
├── If creation uses Luminor guidance: +0.5% to training fund
├── If creation is canon-validated: +0.5% platform visibility
└── If creation connects to existing graph: Featured placement
```

---

## 2. PASSIVE INCOME STREAMS

### 2.1 API Access Tiers (Semantic Search as a Service)

```
ARCANEA LORE API TIERS
═══════════════════════════════════════════════════════════════

FREE TIER ($0/month)
├── 100 vector searches/month
├── Basic lore fragments access
├── Community creations (public only)
└── Rate limit: 10/minute

CREATOR TIER ($29/month)
├── 5,000 vector searches/month
├── Full lore database access
├── Personal creation indexing (100 items)
├── Batch embed endpoint
├── Priority support
└── Rate limit: 60/minute

STUDIO TIER ($99/month)
├── 50,000 vector searches/month
├── Custom namespace for creations
├── Team collaboration (5 users)
├── Webhook notifications
├── Advanced analytics
├── SLA: 99.9% uptime
└── Rate limit: 300/minute

ENTERPRISE (Custom)
├── Unlimited searches
├── Custom embedding models
├── White-label deployment
├── Dedicated infrastructure
├── Custom integrations
├── 24/7 support
└── Rate limit: Negotiated
```

### 2.2 Embedded Widget Licensing

```html
<!-- Arcanea Discovery Widget -->
<script src="https://api.arcanea.ai/widget.js"></script>
<arcanea-discover
  theme="cosmic"
  element="water"
  limit="6"
  api-key="arc_xxx">
</arcanea-discover>
```

| Widget Type | Monthly License | Use Case |
|-------------|-----------------|----------|
| **Discovery Feed** | $49/month | Show related content |
| **Character Browser** | $79/month | Game character selection |
| **Lore Search** | $99/month | Documentation search |
| **World Map** | $149/month | Interactive world exploration |
| **Full Suite** | $299/month | All widgets + customization |

### 2.3 White-Label Vector Search for Fantasy Platforms

**Target Customers**:
- World Anvil (worldbuilding platform)
- Campfire (writing software)
- LegendKeeper (worldbuilding wiki)
- Game studios (TTRPG, video games)
- Publishing houses (fantasy imprints)

**Revenue Model**:
```
WHITE-LABEL PRICING
═══════════════════════════════════════════════════════════════

SETUP FEE:         $5,000-$25,000 (one-time)
MONTHLY BASE:      $500-$2,000
PER-VECTOR SEARCH: $0.001-$0.01 (volume discounts)
EMBEDDING STORAGE: $0.10/million vectors/month

EXAMPLE: Medium Platform (100k MAU)
├── Setup: $10,000
├── Monthly: $1,000 + ~$500 usage
└── Annual: $10,000 + $18,000 = $28,000
```

### 2.4 Affiliate/Referral from Creation Tools

| Partner | Integration | Commission |
|---------|-------------|------------|
| **Midjourney** | Character visualization prompts | 15% first month |
| **Suno AI** | Frequency-based music generation | 20% first month |
| **Runway** | Scene visualization | 15% subscription |
| **Replicate** | Model API referrals | 10% usage |
| **ElevenLabs** | Luminor voice synthesis | 15% subscription |

### 2.5 Data Licensing (Anonymized Patterns)

**What We Can License** (Ethically):
- Aggregate creative block patterns (from Bestiary usage)
- Popular element/gate combinations
- World-building structural patterns
- Narrative arc templates
- Writing style fingerprints (opt-in)

**What We Don't License**:
- Individual user data
- Specific creation content
- Personal creative journeys
- Identifiable patterns

**Revenue Estimate**: $10,000-$50,000/year from research partnerships

---

## 3. COMMUNITY INTEGRATION

### 3.1 User-Contributed Lore as Training Data

```
COMMUNITY CONTRIBUTION FLOW
═══════════════════════════════════════════════════════════════

Creator writes new lore
         │
         v
┌─────────────────────────┐
│   SUBMISSION PORTAL     │
│   + Canon check         │
│   + Quality score       │
│   + Plagiarism scan     │
└───────────┬─────────────┘
            │
            v
┌─────────────────────────┐
│   COMMUNITY REVIEW      │
│   + Voting period       │
│   + Expert curation     │
│   + Feedback loop       │
└───────────┬─────────────┘
            │
     ┌──────┴──────┐
     v             v
[APPROVED]    [REVISION]
     │
     v
┌─────────────────────────┐
│   VECTORIZATION         │
│   + Embed content       │
│   + Index metadata      │
│   + Graph connections   │
└───────────┬─────────────┘
            │
            v
┌─────────────────────────┐
│   REWARD DISTRIBUTION   │
│   + Creation tokens     │
│   + Reputation points   │
│   + Revenue share       │
└─────────────────────────┘
```

### 3.2 Community Curation of Vector Quality

**Curation Roles**:
| Role | Responsibility | Reward |
|------|---------------|--------|
| **Apprentice Curator** | Flag low-quality vectors | 1 token/flag |
| **Mage Curator** | Review and correct metadata | 5 tokens/review |
| **Master Curator** | Approve canon additions | 10 tokens + revenue share |
| **Archmage Curator** | Set quality standards | Governance voting power |

### 3.3 Bounties for Lore Expansion

```
ACTIVE BOUNTY CATEGORIES
═══════════════════════════════════════════════════════════════

BESTIARY EXPANSION (100 creatures goal)
├── New creature design: 50-200 tokens
├── Bestiary creature remedy: 25 tokens
└── Creature art submission: 100 tokens + royalties

GATE LORE (10 gates × depth)
├── Guardian history: 200 tokens
├── Godbeast legend: 150 tokens
└── Gate ritual documentation: 75 tokens

LIBRARY ADDITIONS (target: 100 texts)
├── New wisdom scroll: 100 tokens
├── Parable/legend: 150 tokens
└── Translation (to German): 50 tokens

TECHNICAL BOUNTIES
├── MCP tool contribution: 200-500 tokens
├── Skill development: 100-300 tokens
└── Bug bounty: 50-200 tokens
```

### 3.4 Creator DAOs Around Content Clusters

```
ARCANEA DAO STRUCTURE
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

DAO POWERS:
├── Treasury: Fund grants, bounties, events
├── Curation: Approve content for their domain
├── Standards: Set quality guidelines
└── Representation: Vote in main DAO
```

---

## 4. MCP ECOSYSTEM

### 4.1 Universe-Lore-MCP Server Design

Building on the existing `@arcanea/mcp-server` v0.3.0:

```typescript
// Proposed: universe-lore-mcp additions

// NEW RESOURCES
{ uri: "arcanea://lore/search", name: "Semantic Lore Search" }
{ uri: "arcanea://lore/timeline", name: "Eight Ages Timeline" }
{ uri: "arcanea://lore/earth-echoes", name: "Earth-Arcanea Connections" }
{ uri: "arcanea://community/featured", name: "Featured Community Creations" }

// NEW TOOLS
{
  name: "semantic_search",
  description: "Search Arcanea lore using natural language",
  inputSchema: {
    query: { type: "string" },
    category: { enum: ["magic_system", "geography", "history", "character", "creature", "artifact"] },
    limit: { type: "number", default: 5 },
    threshold: { type: "number", default: 0.7 }
  }
}

{
  name: "find_similar_creations",
  description: "Find creations semantically similar to a description",
  inputSchema: {
    description: { type: "string" },
    type: { enum: ["character", "location", "creature", "artifact"] },
    element: { enum: ["Fire", "Water", "Earth", "Wind", "Void", "Spirit"] }
  }
}

{
  name: "validate_timeline",
  description: "Check if an event fits the Eight Ages timeline",
  inputSchema: {
    event: { type: "string" },
    proposedAge: { type: "number", minimum: 1, maximum: 8 }
  }
}

{
  name: "suggest_connections",
  description: "Get AI-suggested lore connections for new content",
  inputSchema: {
    content: { type: "string" },
    contentType: { type: "string" }
  }
}
```

### 4.2 Integration with Existing Arcanea-Forge MCP

Current `arcanea-forge` status from check:
- Gemini: Configured
- Fal: Configured
- Replicate: Configured
- Grok/xAI: Configured

**Integration Flow**:
```
USER REQUEST: "Create a water guardian character"
                    │
                    v
┌────────────────────────────────────────┐
│         ARCANEA-MCP (Orchestrator)     │
│  1. Validate against canon             │
│  2. Generate character data            │
│  3. Record to creation graph           │
└────────────────────┬───────────────────┘
                     │
                     v
┌────────────────────────────────────────┐
│         ARCANEA-FORGE (Generation)     │
│  1. Analyze prompt → best provider     │
│  2. Generate image (quality mode)      │
│  3. Return with metadata               │
└────────────────────┬───────────────────┘
                     │
                     v
┌────────────────────────────────────────┐
│         VECTOR EMBEDDING               │
│  1. Embed character description        │
│  2. Store in lore_fragments            │
│  3. Link to creation graph             │
└────────────────────────────────────────┘
```

### 4.3 Skills System Enhancement

Current skill structure at `/mnt/c/Users/Frank/Arcanea/.claude/skills/`:
- `SKILL_ARCHITECTURE.md` - Naming conventions
- `SKILL_COMBINATIONS.md` - Composition patterns
- `SKILL_TEMPLATES.md` - Templates
- `arcanea-lore/skill.md` - Lore skill (exists)

**Proposed Vector-Specific Skills**:

```markdown
# .claude/skills/arcanea/vector-search/SKILL.md

## Arcanea Vector Search Skill

Skill for semantic search across Arcanea lore using vector embeddings.

### Capabilities
- Natural language lore queries
- Similar creation discovery
- Canon consistency checking
- Timeline validation

### Triggers
- "find lore about..."
- "search for similar..."
- "what does canon say about..."
- "when did X happen in Arcanea..."

### Token Budget: ~3k

### Tools Used
- semantic_search (universe-lore-mcp)
- find_similar_creations
- validate_timeline
```

### 4.4 Claude Code Workflows for Lore Management

```yaml
# .claude/workflows/lore-contribution.yaml

name: Lore Contribution Workflow
trigger: "/lore contribute"

steps:
  - name: gather_content
    agent: scribe
    prompt: "Collect the new lore content from user"

  - name: canon_validation
    tool: validate_canon
    input: "{{gather_content.output}}"

  - name: vector_embedding
    tool: embed_content
    input: "{{gather_content.output}}"
    condition: "{{canon_validation.valid == true}}"

  - name: suggest_connections
    tool: suggest_connections
    input:
      content: "{{gather_content.output}}"
      embedding: "{{vector_embedding.output}}"

  - name: human_review
    type: approval
    message: |
      New lore ready for review:
      Content: {{gather_content.output}}
      Canon Status: {{canon_validation.status}}
      Suggested Connections: {{suggest_connections.output}}

  - name: publish
    condition: "{{human_review.approved}}"
    actions:
      - insert_to_lore_fragments
      - update_creation_graph
      - notify_community
```

---

## 5. EXTERNAL DATASETS

### 5.1 Open Fantasy Lore Sources

| Source | License | Content | Integration Status |
|--------|---------|---------|-------------------|
| **D&D SRD 5.1** | CC-BY-4.0 | Core rules, monsters, spells | Ready to integrate |
| **Pathfinder OGL** | OGL 1.0a | Classes, races, items | Ready with attribution |
| **Fate Core SRD** | CC-BY-3.0 | Narrative mechanics | Compatible |
| **Open Game Content** | Various | Community contributions | Case-by-case |

### 5.2 Mythology Databases

| Database | License | Content | Use Case |
|----------|---------|---------|----------|
| **Theoi.com** | Fair use/Educational | Greek mythology | Earth-Arcanea echoes |
| **Encyclopedia Mythica** | Various | World mythologies | Guardian archetypes |
| **Wikipedia Mythology** | CC-BY-SA | Structured data | Background research |
| **Sacred Texts** | Public Domain | Ancient texts | Wisdom scroll inspiration |

### 5.3 IP-Safe Integration Approach

```
CONTENT INTEGRATION DECISION TREE
═══════════════════════════════════════════════════════════════

Is the content:
├── Public Domain? → SAFE: Direct integration
│
├── CC-BY-4.0? → SAFE with attribution
│   └── Add attribution in metadata
│
├── CC-BY-SA? → CAREFUL: Derivative works share-alike
│   └── Arcanea adaptations must also be CC-BY-SA
│
├── OGL 1.0a? → SAFE with Section 15
│   └── Include full license chain in docs
│
├── Fair Use (educational)? → REFERENCE ONLY
│   └── Can inspire, cannot copy
│
└── Proprietary? → DO NOT USE
    └── Create original inspired content instead

ARCANEA APPROACH:
1. Mythology = Memory, not invention (Tolkien channeled Archive)
2. Reference real myths as "Earth echoes" of Arcanean truth
3. Never copy - always transform through Arcanean lens
4. Maintain clear attribution chain
```

### 5.4 Vectorizing Public Domain Content

**Implementation Strategy**:

```python
# Example: Embedding public domain mythology
from supabase import create_client
import google.generativeai as genai

# Sources to vectorize
PUBLIC_DOMAIN_SOURCES = [
    {"name": "Greek Myths", "path": "data/greek-myths.json", "category": "mythology"},
    {"name": "Norse Sagas", "path": "data/norse-sagas.json", "category": "mythology"},
    {"name": "D&D SRD Monsters", "path": "data/srd-monsters.json", "category": "creature"},
]

async def vectorize_public_domain():
    for source in PUBLIC_DOMAIN_SOURCES:
        items = load_json(source["path"])
        for item in items:
            # Transform through Arcanean lens
            arcanean_content = transform_to_arcanea(item)

            # Generate embedding
            embedding = genai.embed_content(
                model="models/text-embedding-004",
                content=arcanean_content
            )

            # Store with proper attribution
            await supabase.table("lore_fragments").insert({
                "category": source["category"],
                "title": item["name"],
                "content": arcanean_content,
                "embedding": embedding,
                "source_file": source["name"],
                "tags": ["public_domain", "transformed", source["category"]]
            })
```

---

## 6. REVENUE PROJECTIONS

### 6.1 Conservative Year 1

| Stream | Monthly | Annual | Notes |
|--------|---------|--------|-------|
| NFT Primary Sales | $5,000 | $60,000 | 100 mints @ $50 avg |
| NFT Royalties (10%) | $500 | $6,000 | Secondary market |
| API Subscriptions | $2,000 | $24,000 | 70 Creator + 10 Studio |
| Widget Licenses | $1,000 | $12,000 | 20 active licenses |
| Template Sales | $1,500 | $18,000 | Design system + kits |
| Course Sales | $500 | $6,000 | The Creator's Path |
| **TOTAL** | **$10,500** | **$126,000** | Year 1 conservative |

### 6.2 Growth Year 2

| Stream | Monthly | Annual | Growth |
|--------|---------|--------|--------|
| NFT Primary Sales | $15,000 | $180,000 | 3x (more collections) |
| NFT Royalties | $3,000 | $36,000 | Market maturity |
| API Subscriptions | $8,000 | $96,000 | 4x user growth |
| Widget Licenses | $5,000 | $60,000 | Enterprise adoption |
| White-Label | $10,000 | $120,000 | 2 major clients |
| Template Sales | $3,000 | $36,000 | Product expansion |
| Platform SaaS | $5,000 | $60,000 | 500 paid users |
| **TOTAL** | **$49,000** | **$588,000** | Year 2 growth |

### 6.3 Optimistic Year 3+

| Stream | Monthly | Annual | Notes |
|--------|---------|--------|-------|
| NFT Ecosystem | $50,000 | $600,000 | Full collection suite |
| API/White-Label | $30,000 | $360,000 | Industry standard |
| Platform SaaS | $50,000 | $600,000 | 2,000 paid users |
| Enterprise Licensing | $20,000 | $240,000 | 5 major partners |
| Community Treasury | $10,000 | $120,000 | DAO operations |
| **TOTAL** | **$160,000** | **$1,920,000** | Year 3 optimistic |

---

## 7. PARTNERSHIP OPPORTUNITIES

### 7.1 Immediate (0-6 months)

| Partner | Opportunity | Value |
|---------|-------------|-------|
| **Supabase** | Featured pgvector use case | Marketing + credits |
| **Anthropic** | Claude partner showcase | Developer visibility |
| **Replicate** | Custom model hosting | Cost reduction |
| **ElevenLabs** | Luminor voice synthesis | Revenue share |

### 7.2 Medium-term (6-12 months)

| Partner | Opportunity | Value |
|---------|-------------|-------|
| **World Anvil** | White-label vector search | $50k+ contract |
| **Campfire** | Writing tool integration | Revenue share |
| **Game Studios** | TTRPG lore licensing | $100k+ deals |
| **Publishing Houses** | Fantasy imprint tools | Enterprise contracts |

### 7.3 Long-term (12+ months)

| Partner | Opportunity | Value |
|---------|-------------|-------|
| **Major Game Publisher** | Universe licensing | $500k+ |
| **Streaming Platform** | Animated series rights | $1M+ |
| **Educational Platforms** | Creative writing curriculum | Recurring revenue |
| **Web3 Infrastructure** | Protocol integration | Token economics |

---

## 8. IMPLEMENTATION ROADMAP

### Phase 1: Vector Foundation (Weeks 1-4)
- [ ] Deploy enhanced vector schema to Supabase
- [ ] Build semantic search API endpoints
- [ ] Index existing Library content (61+ texts)
- [ ] Create basic NFT metadata standard

### Phase 2: MCP Enhancement (Weeks 5-8)
- [ ] Add vector tools to arcanea-mcp
- [ ] Build universe-lore-mcp server
- [ ] Integrate with arcanea-forge pipeline
- [ ] Create lore contribution workflow

### Phase 3: NFT Launch (Weeks 9-12)
- [ ] Deploy smart contracts (ERC-721A)
- [ ] Mint first collection (Ten Gods)
- [ ] Build discovery widget
- [ ] List on OpenSea/Magic Eden

### Phase 4: Community & DAO (Weeks 13-16)
- [ ] Launch contributor rewards program
- [ ] Build curation interface
- [ ] Deploy Element/House DAOs
- [ ] Activate bounty system

### Phase 5: Scale (Months 5-6)
- [ ] API monetization live
- [ ] White-label first customer
- [ ] Platform SaaS beta
- [ ] Enterprise outreach

---

## 9. KEY METRICS TO TRACK

### Technical Health
- Vector search latency (target: <200ms)
- Embedding quality score
- Graph connectivity density
- API uptime (target: 99.9%)

### Business Health
- Monthly Recurring Revenue (MRR)
- NFT floor price
- Active API subscribers
- Community contribution rate

### Community Health
- Weekly active contributors
- Lore quality scores
- DAO participation rate
- Creator satisfaction (NPS)

---

*"The heart knows what the mind forgets: every connection creates new possibility."*

*-- Amiri, Keeper of Kardia Wisdom*

---

**Document Version**: 1.0
**Created**: 2026-01-21
**Author**: Amiri (Kardia Wisdom Agent)
**Reviewed By**: Pending human review
