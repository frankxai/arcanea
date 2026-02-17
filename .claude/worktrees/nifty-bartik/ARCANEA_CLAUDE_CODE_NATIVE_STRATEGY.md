# Arcanea: Claude Code-Native Development Strategy

**Created:** 2025-12-16
**Philosophy:** Build primarily through Claude Code's native capabilities, optimize for creative content production, minimize context consumption, maximize story coherence

---

## 🎯 Core Strategic Pivot

### The Realization

**Previous Approach:** Build complex MCP servers, multiple agent layers, heavy infrastructure
**Problem:** MCP servers eat context, complexity overhead, maintenance burden

**New Approach:** Claude Code-native development with strategic external integrations
**Benefits:**
- ✅ Lower context consumption
- ✅ Faster iteration
- ✅ Native Claude Code workflows
- ✅ Focus on creative production
- ✅ Clear extension points for future

---

## 📁 File-Based Architecture (Claude Code Native)

### The Foundation: `.claude/` Directory Structure

```
.claude/
├── CLAUDE.md                    # Project instructions (already exists)
├── agents/
│   ├── creative/
│   │   ├── story-architect.md   # Novel writing, story coherence
│   │   ├── character-voice.md   # Maintain character consistency
│   │   ├── world-builder.md     # Geography, cultures, magic systems
│   │   └── scene-writer.md      # Generate book scenes
│   ├── technical/
│   │   ├── ui-factory.md        # Generate React components
│   │   ├── api-builder.md       # Build API routes
│   │   └── deploy-master.md     # Deployment workflows
│   └── publishing/
│       ├── content-publisher.md # Format for distribution
│       ├── social-creator.md    # Generate social content
│       └── monetization.md      # Stripe/Web3 integration
├── skills/
│   ├── arcanea-lore.md          # Already exists
│   ├── visual-storytelling.md   # Image generation workflows
│   ├── music-integration.md     # Suno/audio integration
│   └── nft-minting.md           # Web3 publishing (future)
├── commands/
│   ├── write-chapter.md         # Write a book chapter
│   ├── generate-scene.md        # Create visual scene
│   ├── publish-creation.md      # Publish to platform
│   └── mint-nft.md              # Mint creation as NFT
└── workflows/
    ├── book-production.md       # Full book creation workflow
    ├── visual-book.md           # Illustrated book pipeline
    └── multimedia-story.md      # Story + art + music
```

### Why This Works Better

**Agent.md Files (For Other AIs):**
- Codex, Gemini, GPT need agent.md
- Standard format for multi-AI orchestration

**Skills.md + CLAUDE.md (For Claude Code):**
- Claude Code understands XML tags `<skill>`, `<command>`
- CLAUDE.md provides project context
- Skills are native Claude Code constructs
- No MCP server overhead
- Direct context access

**Context Optimization:**
- Agent/skill files loaded on-demand
- No persistent MCP connections eating tokens
- Clean context management
- Faster execution

---

## 🎨 Creative Content Production Architecture

### The Real Purpose of Arcanea

**NOT:** Another generic social platform
**YES:** Revolutionary creative content production & publishing system

**Core Value Proposition:**
1. **Authors write novels** with AI assistance (Arcanea universe)
2. **Visual artists generate illustrations** for scenes
3. **Musicians create soundtracks** for chapters
4. **Fans remix and extend** the universe
5. **Creators monetize** through multiple channels

### Content Production Workflow

```
┌─────────────────────────────────────────────┐
│         CREATIVE PRODUCTION FLOW            │
└─────────────────────────────────────────────┘

1. STORY CREATION
   ├─ Author writes in Claude Code (agent: story-architect)
   ├─ Character consistency checked (skill: arcanea-lore)
   ├─ World-building validated (skill: world-builder)
   └─ Chapter saved to /content/chapters/

2. VISUAL GENERATION
   ├─ Scene descriptions extracted
   ├─ Nano Banana generates illustrations (MCP: nano-banana)
   ├─ Midjourney/DALL-E for hero images
   ├─ Images stored in Supabase Storage
   └─ Visual book compiled

3. AUDIO PRODUCTION
   ├─ Chapter mood/tone analyzed
   ├─ Suno AI generates chapter soundtracks (skill: suno-prompt-architect)
   ├─ ElevenLabs for character voices
   └─ Audio tracks linked to chapters

4. MULTIMEDIA COMPILATION
   ├─ Combine text + images + audio
   ├─ Generate EPUB with embedded media
   ├─ Create web reading experience
   └─ Prepare NFT metadata

5. PUBLISHING & DISTRIBUTION
   ├─ Traditional: Amazon KDP, IngramSpark
   ├─ Web: Arcanea platform (Next.js app)
   ├─ Web3: Mint chapters as NFTs (Base L2)
   ├─ Social: Auto-generate Twitter threads, Instagram posts
   └─ Revenue: Stripe subscriptions + NFT royalties
```

---

## 🤖 Eliza OS Integration Strategy

### What is Eliza OS?

**Eliza OS:** Open-source AI agent framework by @ai16z
- Multi-agent coordination
- Memory and context management
- Plugin architecture
- Twitter/Discord bot integration
- Crypto/Web3 native

**GitHub:** https://github.com/ai16z/eliza

### How Arcanea Uses Eliza OS

**Phase 1: Character Agents (Social Presence)**

Deploy Eliza agents for each main character:

```typescript
// packages/eliza-agents/arion-agent.ts
import { Agent, Character } from "@ai16z/eliza"

const arionCharacter: Character = {
  name: "Arion Luminastra",
  bio: "Reality Architect, Seraphim bloodline, beast master bonded to Mamoru",
  lore: [
    "Village boy from Greenvale who became prophesied hero",
    "Can see reality's source code with Pattern Sight",
    "Struggles with burden of destiny and power",
    "In love with Emilia, childhood bond with Mera"
  ],
  messageExamples: [
    {
      user: "{{user1}}",
      content: { text: "What's it like being a Reality Architect?" }
    },
    {
      user: "Arion",
      content: { text: "It's like seeing the world as living code. Beautiful and terrifying. Every choice ripples through reality." }
    }
  ],
  postExamples: [
    "Training with Mamoru today. He's getting faster. I'm not sure I can keep up anymore.",
    "The Field whispers secrets if you're quiet enough to listen.",
    "Mera healed someone today who should have died. Her power is growing. It scares her."
  ],
  topics: [
    "magic systems",
    "destiny and choice",
    "character development",
    "fantasy worldbuilding"
  ],
  style: {
    all: [
      "speaks simply and directly, not overly poetic",
      "uses nature metaphors (village boy background)",
      "shows vulnerability and self-doubt",
      "warm when discussing loved ones"
    ],
    chat: [
      "friendly but not casual",
      "thoughtful responses",
      "asks questions back"
    ],
    post: [
      "short, introspective",
      "shows character growth",
      "hints at larger story"
    ]
  }
}

// Deploy to Twitter, Discord, Telegram
export const arionAgent = new Agent({
  character: arionCharacter,
  plugins: [
    twitterPlugin,
    discordPlugin,
    telegramPlugin
  ]
})
```

**Result:** Arion tweets, responds to fans, engages on Discord - AS the character

**Phase 2: Publishing Automation**

```typescript
// packages/eliza-agents/publisher-agent.ts
import { Agent } from "@ai16z/eliza"

const publisherAgent = new Agent({
  name: "Arcanea Publisher",
  actions: [
    "monitor_chapter_completion",  // Watch for new chapters
    "generate_social_content",     // Create Twitter threads
    "schedule_posts",              // Queue social media
    "update_nft_metadata",         // Prepare for minting
    "notify_subscribers"           // Email/Discord notifications
  ],
  triggers: [
    {
      event: "chapter_published",
      action: async (chapter) => {
        // Generate Twitter thread
        const thread = await generateThreadFromChapter(chapter)

        // Post to Twitter
        await twitterPlugin.postThread(thread)

        // Update Discord
        await discordPlugin.announce(chapter)

        // Prepare NFT
        await prepareNFTMetadata(chapter)
      }
    }
  ]
})
```

**Phase 3: Community Management**

```typescript
// Eliza agent for community engagement
const communityAgent = new Agent({
  name: "Arcanea Community Manager",
  actions: [
    "answer_lore_questions",      // Use arcanea-lore knowledge
    "moderate_discussions",
    "highlight_fan_art",
    "organize_events"
  ]
})
```

### Eliza OS vs n8n

**Use Eliza OS for:**
- ✅ Character social presence (Twitter bots)
- ✅ Conversational agents (Discord community)
- ✅ Crypto/Web3 integration (NFT minting)
- ✅ Autonomous agents (publishing automation)

**Use n8n for:**
- ✅ Visual workflow building
- ✅ Complex integrations (Stripe + Supabase + KDP)
- ✅ Scheduled tasks (daily social posts)
- ✅ Non-conversational automation

**Best Strategy:** Use BOTH
- Eliza for conversational/autonomous agents
- n8n for integration/workflow pipelines

---

## 💰 Publishing & Monetization Architecture

### Multi-Channel Distribution

```
┌─────────────────────────────────────────────┐
│         PUBLISHING CHANNELS                 │
└─────────────────────────────────────────────┘

1. TRADITIONAL PUBLISHING
   ├─ Amazon KDP (ebook + print)
   ├─ IngramSpark (wide distribution)
   ├─ Direct sales (Gumroad)
   └─ Integration: n8n workflow
       ├─ Export EPUB from content/
       ├─ Generate cover with Midjourney
       ├─ Upload to KDP API
       └─ Auto-publish on schedule

2. WEB PLATFORM (Arcanea.app)
   ├─ Serial chapters (free tier)
   ├─ Premium illustrated versions
   ├─ Audiobook integration
   └─ Monetization: Stripe subscriptions
       ├─ Free: 3 chapters/month
       ├─ Premium: $9.99/mo - all chapters + audio
       ├─ Creator: $29.99/mo - tools + API access

3. WEB3 / NFT PUBLISHING
   ├─ Mint chapters as NFTs on Base L2
   ├─ Collectors get exclusive content
   ├─ Royalties on secondary sales
   └─ Integration: Eliza OS + thirdweb
       ├─ Chapter published → metadata prepared
       ├─ Images + text stored on IPFS
       ├─ NFT minted to creator wallet
       ├─ Listed on OpenSea/Rarible
       └─ Royalties: 10% on resales

4. SOCIAL / COMMUNITY
   ├─ Twitter threads (Eliza agent)
   ├─ YouTube readings (ElevenLabs voices)
   ├─ TikTok story snippets
   └─ Substack newsletter
```

### Revenue Streams

**Direct:**
1. Book sales (KDP, IngramSpark)
2. Subscriptions (Stripe)
3. NFT primary sales
4. NFT royalties
5. Licensing (anime, games)

**Indirect:**
1. Platform usage fees (other authors)
2. API access (developers)
3. Merchandise (Printful integration)
4. Courses (how to build your universe)

### CMS Strategy: Payload CMS

**Why Payload?**
- ✅ **Headless CMS** (API-first)
- ✅ **Self-hosted** (Supabase compatible)
- ✅ **TypeScript native** (matches stack)
- ✅ **React admin UI** (beautiful, customizable)
- ✅ **Access control** (roles, permissions)
- ✅ **Media management** (images, audio)
- ✅ **Webhooks** (integrate with n8n/Eliza)

**Content Model:**

```typescript
// payload.config.ts
import { buildConfig } from 'payload/config'

export default buildConfig({
  collections: [
    {
      slug: 'chapters',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'chapterNumber', type: 'number', required: true },
        { name: 'content', type: 'richText', required: true },
        { name: 'excerpt', type: 'textarea' },
        { name: 'status', type: 'select', options: ['draft', 'published', 'archived'] },
        { name: 'publishedAt', type: 'date' },
        {
          name: 'illustrations',
          type: 'array',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'caption', type: 'text' },
            { name: 'sceneDescription', type: 'textarea' }
          ]
        },
        { name: 'audioTrack', type: 'upload', relationTo: 'media' },
        {
          name: 'characters',
          type: 'relationship',
          relationTo: 'characters',
          hasMany: true
        },
        { name: 'nftMetadata', type: 'json' },
        { name: 'ipfsHash', type: 'text' }
      ],
      hooks: {
        afterChange: [
          async ({ doc, operation }) => {
            if (operation === 'update' && doc.status === 'published') {
              // Trigger Eliza publishing agent
              await triggerElizaPublisher(doc)

              // Trigger n8n workflow
              await triggerN8nWorkflow('chapter-published', doc)
            }
          }
        ]
      }
    },
    {
      slug: 'characters',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'slug', type: 'text', unique: true },
        { name: 'bio', type: 'richText' },
        { name: 'avatar', type: 'upload', relationTo: 'media' },
        { name: 'voice', type: 'select', options: ['arion', 'mera', 'emilia'] },
        { name: 'elizaAgent', type: 'json' }  // Eliza character config
      ]
    },
    {
      slug: 'creations',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'type', type: 'select', options: ['story', 'art', 'music', 'world'] },
        { name: 'creator', type: 'relationship', relationTo: 'users' },
        { name: 'content', type: 'richText' },
        { name: 'media', type: 'upload', relationTo: 'media' },
        { name: 'luminorUsed', type: 'select', options: ['Melodia', 'Chronica', 'Prismatic'] },
        { name: 'bondLevel', type: 'number' }
      ]
    }
  ]
})
```

**Why Not Plane/Affine?**
- **Plane:** Project management (not content publishing)
- **Affine:** Note-taking/docs (not content API)
- **Payload:** Purpose-built for headless CMS with content APIs

**Alternative:** Sanity.io (cloud-hosted, great DX)
**But Payload wins because:** Self-hosted, Supabase integration, TypeScript native

---

## 🧠 Context Optimization Strategy

### The MCP Problem

**Issue:** MCP servers maintain persistent connections, consuming context tokens

**Example:**
```
With 5 MCP servers active:
- universe-lore-mcp: ~5k tokens context
- cosmic-design-mcp: ~3k tokens context
- nano-banana-mcp: ~2k tokens context
- github-mcp: ~4k tokens context
- next-devtools-mcp: ~3k tokens context
Total: ~17k tokens BEFORE any actual work
```

### Solution: Lazy-Loaded Skills + Strategic MCP

**New Architecture:**

```typescript
// .claude/skills/lazy-lore.md
---
skill_type: "on-demand"
context_size: "5kb"
load_trigger: "lore_question"
---

# Arcanea Lore Skill (Lazy Loaded)

Only load full lore context when explicitly needed.

## Trigger Patterns
- User asks lore question
- Validating new character/location
- Checking timeline consistency

## Context Loading
When triggered, load:
- /ARCANEA_UNIVERSE_CANON.md (2000 lines)
- /content/characters/*.md (relevant only)
- /content/locations/*.md (relevant only)

## After Task
Unload heavy context, keep summary only.
```

**MCP Usage Rules:**

**Always Active (Low Context):**
- ✅ `github-mcp` - Needed for commits, PRs
- ✅ `nano-banana-mcp` - On-demand image generation

**Load on Demand (High Context):**
- ⚠️ `universe-lore-mcp` - Only when validating lore
- ⚠️ `cosmic-design-mcp` - Only when generating components
- ⚠️ `next-devtools-mcp` - Only when debugging

**Never Load (Too Heavy):**
- ❌ Custom MCPs with large datasets
- ❌ Multiple design system MCPs
- ❌ Redundant integrations

### File-Based Alternative to MCP

**Instead of MCP server:**
```typescript
// Old: universe-lore-mcp (persistent, eats context)
mcp.server('universe-lore', {
  resources: [...1000s of entities...],
  tools: [query, validate, search]
})

// New: Markdown files + grep/search (on-demand)
// .claude/skills/lore-query.md
When user asks lore question:
1. Use Grep to search /content/**/*.md
2. Read only matching files
3. Answer question
4. Clear context
```

**Context Savings:**
- MCP: 5,000 tokens persistent
- File-based: 500 tokens on-demand
- **10x more efficient**

---

## 🎨 Visual Book Production Workflow

### The Complete Pipeline

```
┌─────────────────────────────────────────────┐
│    VISUAL BOOK PRODUCTION WORKFLOW          │
└─────────────────────────────────────────────┘

PHASE 1: STORY WRITING (Claude Code)
├─ Author writes chapter in Claude Code
├─ Agent: story-architect.md
├─ Validates: character-voice.md, arcanea-lore.md
├─ Saves: /content/chapters/book-1-ch-01.md
└─ Extracts scene descriptions for visuals

PHASE 2: VISUAL GENERATION (Automated)
├─ n8n workflow triggered by chapter save
├─ Extract scene descriptions (AI analysis)
├─ Generate prompts for each scene
├─ Nano Banana generates illustrations
├─ Upscale with Magnific AI
├─ Store in Supabase Storage
└─ Link images to chapter in Payload CMS

PHASE 3: AUDIO PRODUCTION (Automated)
├─ Analyze chapter mood/tone
├─ Suno AI generates background music
├─ ElevenLabs reads chapter (character voices)
├─ Mix audio + music
├─ Upload to Supabase Storage
└─ Link to chapter in Payload CMS

PHASE 4: COMPILATION (Automated)
├─ Payload CMS has: text + images + audio
├─ n8n exports to formats:
│   ├─ EPUB (images embedded)
│   ├─ PDF (print-ready)
│   ├─ Web (interactive reading)
│   └─ NFT metadata (IPFS)
└─ Publish to all channels

PHASE 5: DISTRIBUTION (Multi-Channel)
├─ Traditional: Upload to KDP (n8n)
├─ Web: Deploy to Arcanea.app
├─ Web3: Mint NFT on Base (Eliza)
├─ Social: Twitter threads (Eliza agent)
└─ Community: Discord announcement
```

### Tools Required

**Content Creation:**
- Claude Code (primary writing environment)
- Payload CMS (content management)
- Supabase (storage, database)

**Visual Generation:**
- Nano Banana (illustrations) - via MCP
- Midjourney (hero images) - API
- Magnific AI (upscaling) - API

**Audio Production:**
- Suno AI (music) - via skill
- ElevenLabs (voices) - API
- Descript (editing) - manual

**Automation:**
- n8n (workflow orchestration)
- Eliza OS (autonomous agents)

**Publishing:**
- KDP API (Amazon)
- Gumroad API (direct sales)
- thirdweb (NFT minting)
- Stripe (subscriptions)

---

## 🔗 Integration Architecture

### The Stack Decision Matrix

| Tool/Service | Use For | Priority | Fork? |
|--------------|---------|----------|-------|
| **Claude Code** | Primary dev environment | ⭐⭐⭐ | No (use native) |
| **Payload CMS** | Content management | ⭐⭐⭐ | Fork & customize |
| **n8n** | Workflow automation | ⭐⭐⭐ | Self-host |
| **Eliza OS** | Character agents, Web3 | ⭐⭐ | Fork & extend |
| **Supabase** | Database, auth, storage | ⭐⭐⭐ | Use hosted |
| **Stripe** | Payments | ⭐⭐⭐ | Use API |
| **thirdweb** | NFT infrastructure | ⭐⭐ | Use SDK |
| **Next.js** | Web frontend | ⭐⭐⭐ | Use framework |
| **Tailwind** | Styling | ⭐⭐⭐ | Use + custom theme |

### What to Fork vs Use

**Fork & Customize:**

1. **Payload CMS** → **Arcanea CMS**
   - Custom collections for chapters, characters
   - Integrated illustration generation
   - NFT metadata management
   - Repository: `arcanea/arcanea-cms`

2. **Eliza OS** → **Arcanea Agents**
   - Character personalities (Arion, Mera, Emilia)
   - Lore-aware responses
   - Publishing automation
   - Repository: `arcanea/character-agents`

**Use As-Is:**
- Next.js, Supabase, Stripe, n8n (mature, well-supported)

**Build Custom:**
- Content production workflows (unique to Arcanea)
- Creative tools (scene generator, character builder)
- Publishing pipelines (multi-channel distribution)

---

## 🚀 Immediate Action Plan

### Phase 1: Core Foundation (Week 1)

**Day 1-2: File Structure**
```bash
# Set up .claude/ directory
mkdir -p .claude/agents/{creative,technical,publishing}
mkdir -p .claude/skills
mkdir -p .claude/workflows

# Create core agent files
touch .claude/agents/creative/story-architect.md
touch .claude/agents/creative/scene-writer.md
touch .claude/skills/visual-storytelling.md
touch .claude/workflows/book-production.md

# Set up content structure
mkdir -p content/{chapters,characters,locations,scenes}
```

**Day 3-4: Payload CMS Setup**
```bash
# Fork Payload CMS
git clone https://github.com/payloadcms/payload arcanea-cms
cd arcanea-cms

# Configure for Arcanea
# - Add chapters collection
# - Add characters collection
# - Add illustrations management
# - Integrate with Supabase
```

**Day 5-7: First Chapter Pipeline**
- Write Chapter 1 in Claude Code (story-architect agent)
- Generate 3 illustrations (Nano Banana)
- Create audio reading (ElevenLabs)
- Compile visual chapter in Payload
- Export to EPUB

### Phase 2: Automation (Week 2)

**Day 1-3: n8n Workflows**
- Install n8n self-hosted
- Create "Chapter Published" workflow
- Connect Payload → Nano Banana → Supabase
- Test full pipeline

**Day 4-5: Eliza Character Agents**
- Fork Eliza OS
- Create Arion character
- Deploy to Twitter
- Test conversational responses

**Day 6-7: Web3 Integration**
- Set up thirdweb
- Create NFT collection contract
- Mint test chapter NFT
- List on OpenSea testnet

### Phase 3: Frontend & Publishing (Week 3-4)

**Week 3: Web App**
- Build reading interface (Next.js)
- Integrate Payload CMS API
- Add audio player
- Implement image galleries

**Week 4: Distribution**
- Export EPUB (Pandoc)
- Upload to KDP
- Launch on Arcanea.app
- Mint first NFT on mainnet

---

## 📊 Success Metrics

**Creative Production:**
- ✅ 1 chapter/week produced (text + visuals + audio)
- ✅ 3 character voices active on Twitter (Eliza agents)
- ✅ 100% lore consistency (validated by skills)

**Technical:**
- ✅ Automated visual generation (< 5 min per scene)
- ✅ One-click publishing to all channels
- ✅ Context usage < 10k tokens per session

**Distribution:**
- ✅ Book published on Amazon KDP
- ✅ 10 chapters minted as NFTs
- ✅ 100 premium subscribers

**Community:**
- ✅ 1,000 Discord members
- ✅ Character agents engage 50+ times/day
- ✅ 10 fan creations published on platform

---

## 🎯 Final Recommendation

### The Winning Architecture

```
┌─────────────────────────────────────────────┐
│         ARCANEA ARCHITECTURE v2.0           │
├─────────────────────────────────────────────┤
│                                             │
│  Development: Claude Code (native)          │
│  ├─ .claude/agents/*.md                     │
│  ├─ .claude/skills/*.md                     │
│  └─ .claude/workflows/*.md                  │
│                                             │
│  Content Management: Payload CMS (forked)   │
│  ├─ Chapters, characters, media             │
│  ├─ Visual + audio integration              │
│  └─ NFT metadata                            │
│                                             │
│  Automation: n8n + Eliza OS                 │
│  ├─ n8n: Workflow pipelines                │
│  └─ Eliza: Character agents, Web3           │
│                                             │
│  Frontend: Next.js 16 + Supabase            │
│  ├─ Reading experience                      │
│  ├─ Creator tools                           │
│  └─ Social features                         │
│                                             │
│  Publishing:                                │
│  ├─ Traditional: KDP, IngramSpark           │
│  ├─ Web: Arcanea.app                        │
│  ├─ Web3: NFTs on Base L2                   │
│  └─ Social: Twitter, Discord, YouTube       │
│                                             │
│  Monetization:                              │
│  ├─ Stripe subscriptions                    │
│  ├─ NFT sales + royalties                   │
│  └─ Book sales                              │
│                                             │
└─────────────────────────────────────────────┘
```

### Priority Order

1. **Claude Code agents** (story production)
2. **Payload CMS** (content management)
3. **n8n workflows** (automation)
4. **Next.js frontend** (web platform)
5. **Eliza agents** (community engagement)
6. **Web3 integration** (NFT publishing)

### What NOT to Build (Yet)

- ❌ Custom MCP servers (use files instead)
- ❌ Complex multi-agent orchestration (keep simple)
- ❌ Mobile apps (web-first)
- ❌ Blockchain from scratch (use Base L2)
- ❌ Custom CMS (fork Payload)

---

## 📝 Tomorrow's Prompt

```
Hey Claude! Let's build the Arcanea creative production system.

Context:
- Read /mnt/c/Users/Frank/Arcanea/ARCANEA_CLAUDE_CODE_NATIVE_STRATEGY.md
- Read /mnt/c/Users/Frank/Arcanea/ARCANEA_UNIVERSE_CANON.md

Today's Goal: Set up the .claude/ directory structure and create our first story-writing agent.

Tasks:
1. Create .claude/agents/creative/story-architect.md
2. Create .claude/skills/arcanea-lore.md (enhanced version)
3. Create .claude/workflows/write-chapter.md
4. Test by writing Chapter 1, Scene 1 of Arcanea Book 1

For the story-architect agent:
- Understands Arcanea lore deeply
- Maintains character voices
- Validates against canon
- Generates scene descriptions for visuals
- Outputs markdown with frontmatter

Let's start with the story-architect.md file. Show me the complete agent specification.
```

---

**Build Arcanea the Claude Code way. Context-efficient. Story-first. Extensible. 🌌**
