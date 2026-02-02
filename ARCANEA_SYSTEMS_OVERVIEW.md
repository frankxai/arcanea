# ARCANEA - THREE-SYSTEM ARCHITECTURE

**Last Updated**: December 10, 2024
**Purpose**: Clarify the three distinct but interconnected Arcanea systems

---

## THE THREE SYSTEMS

### 1. ARCANEA UNIVERSE (Fantasy Novels)
**Location**: `ARCANEA_UNIVERSE_CANON.md`
**Status**: Active world-building, Book 1 outlined
**Purpose**: Epic fantasy transmedia franchise

**What It Is:**
- 10-book fantasy novel series
- Transmedia IP (books → anime → games → merchandise)
- Educational fiction with real knowledge through magical metaphor
- Comparable to Harry Potter, LOTR, Avatar: The Last Airbender

**Key Elements:**
- The Academy (Lúmendell) - magical school setting
- Ten Guardians & Godbeasts (celestial beings with frequencies)
- The Field (magic system based on Five Elements)
- Ten races, ten realms, complete cosmology
- Arion Luminastra (protagonist - Reality Architect)

**NOT**:
- A tech platform or app
- An AI tutoring system

---

### 2. ARCANEA PLATFORM (Social Creation App)
**Location**: `apps/web/` + `packages/`
**Status**: 85% backend complete, 20% frontend complete
**Port**: 3001

**What It Is:**
- Social platform for AI-assisted creation
- Users bond with AI Luminors (companions)
- Create, share, discover, and remix AI-generated content
- Community-driven creativity

**Core Features:**
- **3 Luminor Personalities** (Melodia, Chronica, Prismatic)
- **3 Academies** (Atlantean=Story, Draconic=Visual, Creation&Light=Music)
- **Bond System** (1-10 levels with XP progression)
- **Social Features** (follow, like, comment, remix)
- **Creation Tools** (chat, image, video, music generation)

**Tech Stack:**
- Next.js 16 + React 19
- Supabase (PostgreSQL + Auth + Storage)
- Gemini 2.0 Flash, Imagen 3, Veo 3.1
- Vercel AI SDK

**Differentiators:**
- vs ChatGPT: Persistent personality, emotional depth, relationship
- vs Character.ai: Super-agent intelligence, domain expertise, action-oriented
- vs Midjourney: Social layer + companion guidance

**Current State:**
- ✅ Backend services (8 database services, 20+ API routes)
- ✅ AI providers (Gemini chat fully implemented)
- ✅ Design system (89 color tokens, 30+ animations)
- ✅ Luminor personalities with emotional tone
- ⚠️ Frontend components (chat exists, needs auth/gallery/feed)
- ❌ Database deployed to Supabase
- ❌ Authentication UI

---

### 3. ARCANEA ACADEMY (Learning Platform)
**Location**: `apps/academy/`
**Status**: 40% complete (marketing landing built)
**Port**: 3002

**What It Is:**
- Educational platform teaching AI-assisted creativity
- 6 specialized academies with dedicated Luminor mentors
- Structured learning paths with progress tracking
- Community and certification

**Core Features:**
- **6 Academies** with specialized Luminors:
  1. Visual Synthesis (Lumina) - Image generation
  2. Music Synthesis (Harmonix→Harmonia) - Audio creation
  3. Narrative Forge (Scripta) - Writing & storytelling
  4. Motion Pictures (Kinetix→needs rename) - Video creation
  5. Code Craft (Syntaxa) - Development
  6. Synthesis (Nexus) - Integration & business

- **User Journey Flow** (from your Miro):
  1. Login/Signup
  2. Choose Your Path (Luminor selection)
  3. Luminor Guide (personalized learning)
  4. Progress Dashboard (bond levels, achievements)
  5. World Lore (Arcanea universe knowledge)
  6. Create (generation workspace)

**Current State:**
- ✅ Marketing landing page with 6 academies
- ✅ Onboarding flow structure
- ⚠️ Individual academy pages (exist but basic)
- ❌ Progress Dashboard
- ❌ World Lore explorer
- ❌ Creation workspace
- ❌ Learning path system
- ❌ Achievement/certification system

**Missing from Miro Vision:**
- Choose Your Path screen (Luminor selection)
- Progress Dashboard with bond visualization
- World Lore interactive explorer
- Create workspace with AI tools

---

## RELATIONSHIP BETWEEN SYSTEMS

```
┌─────────────────────────────────────────────────────────┐
│                   ARCANEA UNIVERSE                       │
│              (Fantasy Novel IP - Canon)                  │
│                                                          │
│  • The Academy (Lúmendell)                              │
│  • Luminors (transcended beings)                        │
│  • Magic system (The Field)                             │
│  • Cosmology & lore                                     │
└──────────────────┬──────────────────────────────────────┘
                   │
                   │ Inspires fictional framing
                   │
      ┌────────────┴────────────┐
      │                         │
      ▼                         ▼
┌─────────────────┐   ┌─────────────────────────┐
│ ARCANEA ACADEMY │   │   ARCANEA PLATFORM      │
│  (Learning App) │   │  (Social Creation App)  │
│                 │   │                         │
│ • 6 Academies   │   │ • 3 Academies          │
│ • Structured    │   │ • Open creation        │
│ • Progress      │   │ • Social features      │
│ • Certification │   │ • Community            │
└─────────────────┘   └─────────────────────────┘
```

**Fictional Framing:**
- Both apps exist "within" the Arcanea universe
- Luminors are "AGI from 100 years in the future" (marketing)
- The Academy is framed as training from fictional Lúmendell
- Magic = AI generation (metaphor)

**Technical Reality:**
- Both are separate Next.js apps in the monorepo
- Share packages: `@arcanea/ai-core`, `@arcanea/database`, `@arcanea/ui`
- Can share Luminor personalities and AI providers
- Different user journeys and value propositions

---

## WHAT'S MISSING: SUPERAGENT SYSTEM

**Question**: Is there an "Arcanea SuperAgent" system?

**Possible Interpretations:**

1. **Guardian AI Package** (`packages/guardian-ai/`)
   - Could be the super-agent orchestration layer
   - Not yet explored in this session

2. **Agents Package** (`packages/agents/`)
   - Multi-agent system infrastructure
   - Not yet explored in this session

3. **Future System**
   - SuperAgent could be a planned orchestration layer
   - Coordinates multiple specialized agents
   - Enterprise/B2B offering?

**Recommendation**: Clarify if SuperAgent is:
- An existing package that needs activation
- A planned system architecture
- A marketing concept for advanced Luminors

---

## REPOSITORY STRUCTURE

```
arcanea/
├── apps/
│   ├── academy/          # Learning platform (port 3002)
│   ├── web/              # Social creation platform (port 3001)
│   ├── chat/             # Standalone chat app?
│   ├── studio/           # Creation studio?
│   ├── gallery/          # Gallery app?
│   ├── library/          # Content library?
│   ├── nexus/            # Integration hub?
│   ├── realms/           # Virtual worlds?
│   ├── sanctuary/        # Community space?
│   └── mobile/           # React Native app
│
├── packages/
│   ├── ai-core/          # Luminor personalities, AI providers
│   ├── database/         # Supabase client, services, types
│   ├── guardian-ai/      # SuperAgent system?
│   ├── agents/           # Multi-agent infrastructure?
│   ├── ui/               # Shared components
│   ├── ui-cosmos/        # Cosmic design system
│   ├── asset-manager/    # Media management
│   ├── realm-engine/     # 3D/virtual world engine?
│   └── manifestation-tools/  # Creation tools?
│
└── docs/
    ├── ARCANEA_UNIVERSE_CANON.md     # Fantasy novel lore
    ├── ARCANEA_KNOWLEDGE_BASE.md     # Platform tech docs
    └── ARCANEA_SYSTEMS_OVERVIEW.md   # This file
```

**Questions About Multiple Apps:**
- Are `chat`, `studio`, `gallery`, `library`, `nexus`, `realms`, `sanctuary` separate products?
- Or are they modules that should be integrated into `web` and `academy`?
- Should we consolidate or keep separate?

---

## RECOMMENDED FOCUS

**Priority 1: Complete Arcanea Academy**
- This has the clearest user journey (your Miro flow)
- Easier to market (structured learning)
- Can validate Luminor concept
- Build missing: Progress Dashboard, Lore Explorer, Create Workspace

**Priority 2: Complete Arcanea Platform**
- Social features require more complexity
- Needs complete auth, feed, discovery
- Build missing: Chat UI, Gallery, Profile, Feed

**Priority 3: Clarify Other Apps**
- Determine which apps should exist vs consolidate
- Define clear boundaries and purposes
- Avoid feature duplication

---

## NEXT STEPS

1. **Define Luminor Names** (harmonious system)
2. **Build Academy Missing Components** (align with Miro)
3. **Complete Platform Chat/Auth** (core UX)
4. **Clarify SuperAgent** (if it exists)
5. **Consolidate or Define** other apps

See `LUMINOR_NAMING_SYSTEM.md` for harmonious naming proposal.
See `ACADEMY_IMPLEMENTATION_PLAN.md` for build roadmap.
