# Arcanea Hub Launch Plan

*Strategic Plan for arcanea.ai - January 2026*

---

## Executive Summary

Launch a comprehensive **Arcanea Hub** experience that combines:
- **Knowledge Base** (lore, guides, philosophy)
- **Documentation** (technical, API, integration)
- **Blog** (thought leadership, updates)
- **Interactive Experiences** (Luminors, Seven Wisdoms, Bestiary)

Target: Full hub experience live by end of week.

---

## Current State Assessment

### Existing Pages (Working)
| Page | Route | Status | Purpose |
|------|-------|--------|---------|
| Homepage | `/` | ✅ Live | Library-focused landing |
| Library | `/library` | ✅ Live | 17 wisdom collections |
| Codex | `/library/codex` | ✅ Live | Immersive reader |
| Graph | `/library/graph` | ✅ Live | Content relationships |
| Skills | `/skills` | ✅ Live | Claude Code skills |
| Bestiary | `/bestiary` | ✅ Live | Creative blocks |
| Academy | `/academy` | ✅ Live | Ten Gates system |
| Chat | `/chat` | ✅ Live | Luminor conversations |
| Studio | `/studio` | ✅ Live | Creation tools |
| Blog | `/blog` | 🔶 Partial | One post exists |

### Missing Pages (Needed)
| Page | Route | Priority | Purpose |
|------|-------|----------|---------|
| About | `/about` | High | Platform introduction |
| Luminors | `/luminors` | High | Meet the 16 intelligences |
| Seven Wisdoms | `/wisdoms` | High | Interactive diagnosis |
| Docs | `/docs` | Medium | Technical documentation |
| Guides | `/guides` | Medium | How-to content |
| Changelog | `/changelog` | Low | Version history |
| API | `/api-docs` | Low | API reference |

---

## Naming Architecture (Finalized)

### Tiered System

```
ARCANEAN CREATOR OS          ← Public brand/umbrella
├── Luminor Intelligence System   ← The AI system (how)
│   └── 16 Luminor Agents
│   └── 4 Teams (Dev, Creative, Writing, Research)
│   └── Magic Words
├── Luminor Framework             ← The philosophy (why)
│   └── Transcended Intelligence Prompting
│   └── Seven Wisdoms
│   └── Research foundation
└── arcanea-soul                  ← npm package (implementation)
```

### Usage Guidelines
- **"Arcanea"** = noun/brand ("Welcome to Arcanea")
- **"Arcanean"** = adjective ("the Arcanean Design System")
- **"Luminor"** = AI agent (not "Lumina" which is the goddess)
- **"Creator"** = user (not "user")

---

## Content Strategy: Blogs vs Docs vs Both

### The Verdict: **Both, With Clear Separation**

| Content Type | Format | SEO Value | AEO Value | Update Frequency |
|--------------|--------|-----------|-----------|------------------|
| **Blog Posts** | Narrative articles | High (keywords, backlinks) | Medium (context) | Weekly |
| **Docs** | Technical reference | Medium (specific queries) | High (structured data) | On release |
| **Guides** | Tutorial walkthroughs | Very High (intent match) | Very High (how-to) | Monthly |
| **Lore Pages** | Mythology content | High (unique content) | Medium | Rarely |

### SEO Strategy
1. **Blog for thought leadership** - "Why transcended prompting works", "The future of creative AI"
2. **Guides for intent capture** - "How to use Luminors", "Getting started with Seven Wisdoms"
3. **Docs for reference** - API docs, integration patterns, configuration
4. **Lore for uniqueness** - Arcanea mythology is 100% unique content Google loves

### AEO (AI Engine Optimization) Strategy
1. **Structured data** - JSON-LD schemas for all pages
2. **FAQ sections** - Every guide ends with "Frequently Asked Questions"
3. **Clear definitions** - "What is a Luminor?" with definitive answers
4. **Code blocks** - AI models extract code examples well

---

## Site Architecture

### Proposed Information Architecture

```
arcanea.ai/
├── /                           # Hero: "Arcanean Creator OS"
├── /about                      # "What is Arcanea"
├── /luminors                   # Meet the 16 intelligences
│   └── /luminors/[id]          # Individual Luminor pages
├── /wisdoms                    # Seven Wisdoms interactive
│   └── /wisdoms/[wisdom]       # Deep dive pages
├── /library                    # The Library (17 collections)
│   ├── /library/codex          # Immersive reader
│   ├── /library/graph          # Knowledge graph
│   └── /library/[collection]   # Collection pages
├── /academy                    # Ten Gates progression
│   └── /academy/[gate]         # Gate-specific content
├── /skills                     # Claude Code skills
├── /bestiary                   # Creative blocks
├── /blog                       # Thought leadership
│   └── /blog/[slug]            # Blog posts
├── /guides                     # How-to content
│   └── /guides/[slug]          # Individual guides
├── /docs                       # Technical docs
│   ├── /docs/api               # API reference
│   ├── /docs/integration       # Integration guides
│   └── /docs/arcanea-soul      # Package docs
├── /chat                       # Luminor conversations
├── /studio                     # Creation studio
└── /changelog                  # Version history
```

---

## Page Specifications

### 1. Homepage Redesign (`/`)

**Current:** Library-focused
**Proposed:** Full "Arcanean Creator OS" experience

```
┌─────────────────────────────────────────────────────────────┐
│ [Nav: Library | Luminors | Academy | Docs | Chat | Studio]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ARCANEAN CREATOR OS                                        │
│  "The creative intelligence operating system"               │
│                                                             │
│  [Enter the Hub] [Meet the Luminors] [Try Chat]             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  THE THREE PILLARS                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ WISDOM   │  │ TOOLS    │  │ COMMUNITY│                  │
│  │ Library  │  │ Studio   │  │ Chat     │                  │
│  │ 17 texts │  │ AI Gen   │  │ Luminors │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  LUMINOR INTELLIGENCE SYSTEM                                │
│  "16 transcended intelligences for creative mastery"        │
│                                                             │
│  [Architect] [Coder] [Story] [World] [Editor] [Sage] ...   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SEVEN WISDOMS                                              │
│  "What's blocking you today?"                               │
│                                                             │
│  [Sophron] [Kardia] [Valora] [Eudaira] [Orakis] ...        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  LATEST FROM THE BLOG                                       │
│  • Why Transcended Prompting Works                          │
│  • The Seven Wisdoms Framework                              │
│  • Getting Started with Luminors                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2. Luminors Page (`/luminors`)

**Purpose:** Showcase all 16 Luminors with their perspectives

**Sections:**
1. Hero: "Meet the Luminors - Transcended intelligences for creative mastery"
2. Team Grid: Dev Team, Creative Team, Writing Team, Research Team
3. Individual Cards: Photo/avatar, name, domain, quote, link to chat
4. "How Luminors Work" explainer section
5. CTA: "Start a conversation"

### 3. Seven Wisdoms Page (`/wisdoms`)

**Purpose:** Interactive diagnosis + deep dive into each wisdom

**Interactive Flow:**
1. "What's blocking you?" → situation selection
2. Diagnosis result: "You need [Wisdom]"
3. Deep dive: philosophy, practices, shadow
4. Related Library texts
5. "Speak with a Luminor who embodies this wisdom"

### 4. Docs Hub (`/docs`)

**Structure:**
```
/docs
├── Getting Started
│   ├── What is Arcanea?
│   ├── Quick Start (5 min)
│   └── Core Concepts
├── Luminor Framework
│   ├── Philosophy
│   ├── Seven Wisdoms
│   └── Transcended Prompting
├── arcanea-soul Package
│   ├── Installation
│   ├── API Reference
│   └── Integration Guides
├── Platform
│   ├── Chat API
│   ├── Studio API
│   └── Library API
└── Changelog
```

### 5. Guides Hub (`/guides`)

**Initial Guides:**
1. "Getting Started with Arcanea" (beginner)
2. "Using the Seven Wisdoms for Creative Blocks" (beginner)
3. "Integrating Luminors in Your Workflow" (intermediate)
4. "Building with arcanea-soul" (developer)
5. "The Ten Gates: Your Creative Journey" (advanced)

---

## Implementation Phases

### Phase 1: Foundation (Days 1-2)
- [ ] Finalize naming architecture (✅ DONE)
- [ ] Update homepage with new positioning
- [ ] Create `/about` page
- [ ] Create `/luminors` page with all 16 Luminors
- [ ] Create `/wisdoms` page with interactive diagnosis

### Phase 2: Content (Days 3-4)
- [ ] Create `/docs` hub structure
- [ ] Write "Getting Started" guide
- [ ] Write 3 initial blog posts:
  - "Introducing Arcanean Creator OS"
  - "The Luminor Framework: Why Transcended Prompting Works"
  - "Seven Wisdoms for Creative Mastery"
- [ ] Add structured data (JSON-LD) to all pages

### Phase 3: Polish (Days 5-6)
- [ ] Create `/guides` hub
- [ ] Write integration guides
- [ ] Add changelog page
- [ ] SEO optimization pass
- [ ] Performance optimization
- [ ] Mobile responsiveness check

### Phase 4: Launch (Day 7)
- [ ] Deploy to arcanea.ai
- [ ] Test all routes
- [ ] Submit sitemap to Google
- [ ] Announce on social channels

---

## SEO Checklist

### Technical SEO
- [ ] Update sitemap.ts with all new routes
- [ ] Add robots.txt rules
- [ ] Implement canonical URLs
- [ ] Add Open Graph images for all pages
- [ ] Add Twitter Card meta
- [ ] Implement JSON-LD structured data

### Content SEO
- [ ] Target keywords per page
- [ ] Meta descriptions (unique, <160 chars)
- [ ] H1 hierarchy (one H1 per page)
- [ ] Internal linking strategy
- [ ] Alt text for images

### AEO (AI Engine Optimization)
- [ ] FAQ sections on key pages
- [ ] Clear definitions in content
- [ ] Code examples with explanations
- [ ] "What is X?" format for concepts

---

## Target Keywords

| Page | Primary Keyword | Secondary Keywords |
|------|-----------------|-------------------|
| Homepage | arcanea ai | creative ai platform, ai creativity tools |
| Luminors | ai creative assistants | ai writing assistant, ai coding assistant |
| Wisdoms | creative block solutions | overcome creative block, creativity framework |
| Library | creative wisdom library | creativity guides, creator resources |
| Docs | arcanea documentation | arcanea api, arcanea sdk |
| Blog | ai creativity blog | creative ai insights, ai for creators |

---

## Success Metrics

### Week 1
- [ ] All core pages live
- [ ] <3s page load time
- [ ] Mobile score >90 (Lighthouse)
- [ ] 0 console errors

### Month 1
- [ ] Indexed by Google
- [ ] 100+ organic visitors
- [ ] 3+ blog posts published
- [ ] Docs complete for arcanea-soul

### Month 3
- [ ] 1000+ monthly organic visitors
- [ ] Top 10 for "creative ai tools"
- [ ] Featured in AI newsletters
- [ ] 50+ GitHub stars on arcanea-soul

---

## Quick Start Commands

```bash
# Start development
cd /mnt/c/Users/Frank/Arcanea
pnpm dev

# Deploy to Vercel
vercel --prod

# Generate sitemap
pnpm build

# Test all routes
npx playwright test
```

---

## Questions to Resolve

1. **Domain strategy**: arcanea.ai for everything, or subdomains?
   - Recommendation: Single domain (better for SEO)
   - chat.arcanea.ai → /chat
   - studio.arcanea.ai → /studio
   - docs.arcanea.ai → /docs

2. **Blog platform**: Custom Next.js or headless CMS?
   - Recommendation: Custom Next.js (simpler, faster, more control)
   - MDX for rich content

3. **Docs platform**: Custom or Mintlify/GitBook?
   - Recommendation: Start custom, migrate to Mintlify if docs grow large
   - Custom gives more brand control

---

*"Enter seeking, leave with a plan."*

---

**Next Step:** Begin Phase 1 - update homepage and create /luminors page
