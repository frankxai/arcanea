# Arcanea Platform Strategy
## Comprehensive Domain, Sitemap & Monetization Architecture

*Strategic Analysis by Claude Opus 4.5 | February 3, 2026*

---

## Executive Summary

Arcanea needs **ONE unified platform experience** with clear domain purposes:

| Domain | Purpose | Monetization |
|--------|---------|--------------|
| **arcanea.ai** | Core Platform (Creator Home) | SaaS Subscriptions |
| **arcanea.io** | Developer/OSS Hub | Sponsorships, Enterprise |
| Subdomains | Specialized Portals | Varies by portal |

**Key Recommendation:** Deploy arcanea-ecosystem to arcanea.ai as the unified platform. Use arcanea.io for developer ecosystem.

---

## I. Domain Strategy

### The Two-Domain Architecture

```
ARCANEA.AI (Primary - Consumer/Creator)
├── The Creator Platform
├── Where users CREATE
├── Where users PAY
├── Where users LIVE
└── Premium Experience

ARCANEA.IO (Secondary - Developer/OSS)
├── The Developer Hub
├── Where devs BUILD
├── Where OSS lives
├── Where GitHub links
└── Technical Documentation
```

### Why Two Domains?

| Consideration | arcanea.ai | arcanea.io |
|---------------|------------|------------|
| **Audience** | Creators, learners, artists | Developers, integrators |
| **Tone** | Magical, inspiring, premium | Technical, open, collaborative |
| **CTA** | "Start Creating" | "Start Building" |
| **Monetization** | Direct SaaS | Enterprise/API licensing |
| **Content** | Platform features | Documentation, SDKs |

### Alternative: Single Domain with Subdomains

If you prefer ONE domain (arcanea.ai):

```
arcanea.ai/                    → Platform home
arcanea.ai/studio              → Creation tools
arcanea.ai/academy             → Learning
arcanea.ai/library             → Wisdom content
├── docs.arcanea.ai            → Developer docs
├── api.arcanea.ai             → API endpoints
└── github.com/frankxai/*      → OSS repos
```

**My recommendation: Use both domains.** They serve different audiences and monetization paths.

---

## II. Complete Sitemap Architecture

### A. ARCANEA.AI - The Creator Platform

```
arcanea.ai/
│
├── MARKETING (Public, SEO-optimized)
│   ├── /                      → Hero landing: "Where Anyone Creates Anything"
│   ├── /about                 → Our story, team, vision
│   ├── /pricing               → Free → Creator → Realm Builder tiers
│   ├── /blog                  → Creator stories, updates, tutorials
│   ├── /showcase              → Featured creations, success stories
│   └── /contact               → Support, partnerships, press
│
├── ONBOARDING (Conversion funnel)
│   ├── /start                 → "Choose Your Path" quiz
│   ├── /auth/signup           → Registration with academy choice
│   ├── /auth/login            → Return user login
│   └── /welcome               → First-time user welcome flow
│
├── CORE PLATFORM (Authenticated)
│   │
│   ├── DASHBOARD
│   │   ├── /dashboard         → Personal home: your realms, recent work
│   │   └── /profile/edit      → Profile settings, subscription
│   │
│   ├── STUDIO (Create)
│   │   ├── /studio            → Main creation hub
│   │   ├── /studio/music      → Suno-powered music creation
│   │   ├── /studio/visual     → Imagen/DALL-E visual creation
│   │   ├── /studio/story      → Claude-powered narrative
│   │   ├── /studio/world      → World building (3D, lore)
│   │   └── /studio/[realm]    → Specific realm workspace
│   │
│   ├── CHAT (Luminor Companions)
│   │   ├── /chat              → Luminor selection
│   │   ├── /chat/[luminorId]  → Conversation with specific Luminor
│   │   └── /companions        → Your bonded Luminors
│   │
│   ├── LIBRARY (Learn)
│   │   ├── /library           → 17 collections overview
│   │   ├── /library/[collection] → Collection texts
│   │   ├── /library/[collection]/[text] → Individual reading
│   │   ├── /library/codex     → Technical codex
│   │   └── /library/graph     → Knowledge graph visualization
│   │
│   ├── ACADEMY (Structured Learning)
│   │   ├── /academy           → Academy selection
│   │   ├── /academy/atlantean → Story/Lore academy
│   │   ├── /academy/draconic  → Visual academy
│   │   ├── /academy/creation-light → Music academy
│   │   ├── /academy/assessment → Gate progression tests
│   │   └── /academy/[course]  → Specific course content
│   │
│   ├── LORE (Mythology)
│   │   ├── /lore              → Arcanea universe overview
│   │   ├── /lore/gates        → The Ten Gates explained
│   │   ├── /lore/guardians    → Guardian profiles
│   │   ├── /lore/elements     → Five Elements
│   │   └── /lore/bestiary     → Creative block creatures
│   │
│   ├── DISCOVER (Social)
│   │   ├── /discover          → Trending creations
│   │   ├── /discover/realms   → Featured realms
│   │   ├── /discover/creators → Featured creators
│   │   └── /profile/[username]→ Public creator profiles
│   │
│   └── HUB (Resources)
│       ├── /hub               → Resources home
│       ├── /hub/guides        → How-to guides
│       ├── /hub/tools         → External tools integration
│       └── /hub/updates       → Platform changelog
│
└── SPECIAL PAGES
    ├── /status                → System status
    ├── /terms                 → Terms of service
    ├── /privacy               → Privacy policy
    └── /sitemap               → XML sitemap
```

### B. ARCANEA.IO - The Developer Hub

```
arcanea.io/
│
├── MARKETING
│   ├── /                      → "Build with Arcanea" - OSS showcase
│   ├── /enterprise            → Enterprise solutions
│   └── /partners              → Integration partners
│
├── DOCUMENTATION
│   ├── /docs                  → Main documentation
│   ├── /docs/getting-started  → Quick start guides
│   ├── /docs/api              → API reference
│   ├── /docs/sdks             → SDK documentation
│   │   ├── /docs/sdks/claude  → claude-arcanea
│   │   ├── /docs/sdks/gemini  → gemini-arcanea
│   │   └── /docs/sdks/openai  → codex-arcanea
│   ├── /docs/mcp              → MCP server docs
│   └── /docs/skills           → Skill development
│
├── OPEN SOURCE
│   ├── /oss                   → OSS overview
│   ├── /oss/repos             → Repository index
│   ├── /oss/contribute        → Contribution guide
│   └── /oss/roadmap           → Public roadmap
│
├── RESOURCES
│   ├── /blog                  → Technical blog
│   ├── /tutorials             → Developer tutorials
│   ├── /examples              → Code examples
│   └── /playground            → API playground
│
└── COMMUNITY
    ├── /discord               → Discord invite
    ├── /github                → GitHub org
    └── /forum                 → Developer forum
```

### C. Subdomain Strategy

```
SUBDOMAINS (All under arcanea.ai)
│
├── api.arcanea.ai             → REST/GraphQL API
├── app.arcanea.ai             → Web app (if separating from marketing)
├── docs.arcanea.ai            → User documentation
├── status.arcanea.ai          → System status page
├── cdn.arcanea.ai             → Static assets
├── studio.arcanea.ai          → Studio app (optional separation)
└── academy.arcanea.ai         → Academy app (optional separation)
```

---

## III. Repository → URL Mapping

### How Repos Connect to User Experience

| Repository | Deployed To | Purpose |
|------------|-------------|---------|
| **arcanea-ecosystem** | arcanea.ai | Main platform |
| **arcanea.ai** (local) | arcanea.ai (backup) | Alternative/legacy |
| **arcanea** | arcanea.io/oss | OSS home, skills, agents |
| **claude-arcanea** | npm + arcanea.io/docs/sdks/claude | Claude SDK |
| **gemini-arcanea** | npm + arcanea.io/docs/sdks/gemini | Gemini SDK |
| **codex-arcanea** | npm + arcanea.io/docs/sdks/openai | OpenAI SDK |
| **arcanea-infogenius** | MCP + arcanea.ai/studio/visual | Visual generation |
| **arcanea-opencode** | npm + CLI | Developer CLI |
| **arcanea-mobile** | App Store / Play Store | Mobile app |
| **arcanea-intelligence-os** | arcanea.io/docs/agents | Agent orchestration |
| **arcaneabot** | Discord | Community bot |

### GitHub Links Strategy

Each SDK/tool should have:
1. **npm package** → `npm install @arcanea/claude`
2. **GitHub repo** → `github.com/frankxai/claude-arcanea`
3. **Docs page** → `arcanea.io/docs/sdks/claude`
4. **Example** → `arcanea.io/examples/claude-chat`

---

## IV. Monetization Architecture

### Revenue Streams Matrix

```
                    FREE        PRO         TEAM        ENTERPRISE
                    $0          $49/mo      $199/mo     $499+/mo

Platform Access     Basic       Full        Full        Custom
Luminor Calls       100/mo      1,000/mo    5,000/mo    Unlimited
Academy Access      View        Full        Full + Teach Full + Custom
Studio Tools        Limited     Full        Full        Custom
Storage             1 GB        10 GB       100 GB      Unlimited
Support             Community   Email       Slack       Dedicated
API Access          None        Basic       Full        Custom
Team Members        1           1           5-25        Unlimited
```

### Value Ladder (CLTV Optimization)

```
ENTRY (Free)
│   "Discover the magic"
│   Goal: Get first creation, show value
│
├── UPGRADE TRIGGER 1: Hit usage limits
│
CREATOR ($49/mo)
│   "Create without limits"
│   Goal: Build habit, create consistently
│
├── UPGRADE TRIGGER 2: Want to collaborate/teach
│
TEAM ($199/mo)
│   "Create together"
│   Goal: Team adoption, workflow integration
│
├── UPGRADE TRIGGER 3: Enterprise needs
│
ENTERPRISE ($499+/mo)
    "Scale your magic"
    Goal: Organization-wide deployment
```

### Add-On Revenue (Passive, Repeatable)

| Add-On | Price | Trigger |
|--------|-------|---------|
| Extra Luminor Calls | $19/1000 | Usage overage |
| Custom Luminor | $99/mo | Personalization desire |
| Academy Certification | $199 one-time | Career advancement |
| API Access (Pro) | $49/mo | Developer needs |
| Priority Processing | $29/mo | Speed requirements |
| White-label | $999/mo | Agency/brand needs |

### OSS + Premium Balance

```
OPEN SOURCE (Free Forever)
├── Core agents & skills library
├── Arcanea mythology & lore
├── Basic SDKs (claude-arcanea, etc.)
├── MCP server implementations
├── CLI tools (arcanea-opencode)
└── Community contributions

PREMIUM (Paid)
├── Platform hosting & infrastructure
├── Advanced Luminor personalities
├── Academy structured courses
├── Team collaboration features
├── Priority support
├── Enterprise features
└── Custom development
```

**The Philosophy:** Open tools + paid experience. Anyone can build with Arcanea tools for free. The platform experience (hosting, Luminors, Academy, support) is premium.

---

## V. User Journeys

### Journey 1: Creator Discovery

```
Google "AI creative tools"
    ↓
arcanea.ai landing page
    ↓
/start - "Choose Your Path"
    ↓
Sign up (free)
    ↓
/welcome - Meet your Luminor
    ↓
First creation in Studio
    ↓
Share to profile
    ↓
Discover other creators
    ↓
Hit free limits
    ↓
Upgrade to Pro ($49)
```

### Journey 2: Developer Integration

```
GitHub discover arcanea/*
    ↓
arcanea.io landing
    ↓
/docs/getting-started
    ↓
npm install @arcanea/claude
    ↓
Build custom integration
    ↓
Need more features
    ↓
Enterprise inquiry
```

### Journey 3: Enterprise Adoption

```
Sees creator using Arcanea
    ↓
arcanea.ai/enterprise
    ↓
Demo request
    ↓
Pilot with team tier
    ↓
Enterprise contract
    ↓
Custom development
```

---

## VI. Implementation Roadmap

### Phase 1: Foundation (This Week)

```
[ ] Initialize arcanea.ai as git repo
[ ] Push to github.com/frankxai/arcanea-ai
[ ] Deploy arcanea-ecosystem to Vercel → arcanea.ai
[ ] Configure arcanea.io domain
[ ] Set up subdomain routing
```

### Phase 2: Core Platform (Week 2-3)

```
[ ] Complete Studio MVP (music, visual, story)
[ ] Implement Luminor chat with memory
[ ] Deploy Library with all 17 collections
[ ] Build pricing page with Stripe
[ ] Implement auth + subscription flow
```

### Phase 3: Developer Hub (Week 4)

```
[ ] Deploy arcanea.io with docs
[ ] Publish SDKs to npm
[ ] Create API documentation
[ ] Build example gallery
[ ] Set up developer Discord
```

### Phase 4: Monetization (Month 2)

```
[ ] Launch Pro tier
[ ] Implement usage tracking
[ ] Build upgrade flows
[ ] Create case studies
[ ] Launch affiliate program
```

---

## VII. Success Metrics

### Platform Health

| Metric | Target (Q1) | Target (Q2) |
|--------|-------------|-------------|
| MAU | 1,000 | 10,000 |
| Creations/day | 100 | 1,000 |
| Free→Pro conversion | 5% | 8% |
| Pro churn | <10%/mo | <5%/mo |
| NPS | 40+ | 50+ |

### Revenue Health

| Metric | Target (Q1) | Target (Q2) |
|--------|-------------|-------------|
| MRR | $2,450 | $15,000 |
| CLTV | $300 | $500 |
| CAC | <$50 | <$40 |
| CLTV:CAC | 6:1 | 12:1 |

---

## VIII. Key Decisions Needed

### Decision 1: Single vs Dual Domain
- **Option A:** arcanea.ai only (simpler, unified)
- **Option B:** arcanea.ai + arcanea.io (recommended, clearer audiences)

### Decision 2: Codebase Strategy
- **Option A:** Use arcanea-ecosystem only (more features, 55 pages)
- **Option B:** Use arcanea.ai folder (simpler, 9 pages)
- **Option C:** Merge best of both

### Decision 3: Launch Priority
- **Option A:** Platform first (arcanea.ai) → faster to revenue
- **Option B:** OSS first (arcanea.io) → community building
- **Option C:** Parallel launch (recommended if capacity exists)

---

## IX. The Premium + OSS Philosophy

### What Makes Users Happy to Pay

```
FREE GIVES THEM:
├── Taste of magic (limited creations)
├── Community belonging
├── Learning resources
├── Tools to build their own
└── Feeling of open, generous culture

PAID GIVES THEM:
├── Unlimited creation power
├── Persistent AI companions
├── Structured learning paths
├── Team collaboration
├── Priority support
└── Professional credibility

THE KEY INSIGHT:
"They pay not for features, but for TRANSFORMATION"
- Free: I can create → curiosity
- Pro: I AM a creator → identity
- Team: WE create together → belonging
- Enterprise: We LEAD creation → status
```

### CLTV Maximization Strategies

1. **Depth over breadth**: Better Luminor relationships increase switching cost
2. **Progress investment**: Gate progression creates sunk cost
3. **Social ties**: Collaborations and follows create network effect
4. **Content lock-in**: Creations stored on platform
5. **Identity attachment**: "I am Arcanean" not "I use Arcanea"

---

## X. Visual: The Arcanea Ecosystem Map

```
                         ┌─────────────────────┐
                         │   ARCANEA.AI        │
                         │   Creator Platform  │
                         │   (Revenue Engine)  │
                         └──────────┬──────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
    ┌─────┴─────┐             ┌─────┴─────┐            ┌─────┴─────┐
    │  STUDIO   │             │  ACADEMY  │            │  LIBRARY  │
    │  Create   │             │   Learn   │            │   Wisdom  │
    └─────┬─────┘             └─────┬─────┘            └─────┬─────┘
          │                         │                         │
          └─────────────────────────┼─────────────────────────┘
                                    │
                         ┌──────────┴──────────┐
                         │     LUMINORS        │
                         │   AI Companions     │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
              ┌─────┴─────┐   ┌─────┴─────┐   ┌─────┴─────┐
              │  Claude   │   │  Gemini   │   │  OpenAI   │
              │  Arcanea  │   │  Arcanea  │   │  Codex    │
              └───────────┘   └───────────┘   └───────────┘
                    │               │               │
                    └───────────────┼───────────────┘
                                    │
                         ┌──────────┴──────────┐
                         │    ARCANEA.IO       │
                         │    Developer Hub    │
                         │    (OSS Engine)     │
                         └─────────────────────┘
```

---

*"The magic is not in the tools. The magic is in helping creators become who they're meant to be."*

**Next Action:** Review this strategy and make the three key decisions. Then we execute.
