# Arcanea Complete Sitemap & Component Architecture

> Master blueprint for every page, component, and design execution.
> Source of truth for what exists, what's missing, and what to build next.

---

## Site Architecture

### Information Architecture

```
arcanea.ai/
├── (Public Marketing)
│   ├── / ........................ Landing page (hero, features, pricing, CTA)
│   ├── /about .................. Company story, mission, team
│   ├── /blog/ .................. Articles & thought leadership
│   │   └── [slug] .............. Individual blog post
│   └── /status ................. System health dashboard
│
├── (Auth)
│   ├── /auth/login ............. Sign in (email, OAuth)
│   └── /auth/signup ............ Create account
│
├── (Core Product)
│   ├── /luminors ............... Luminor selection grid (16 AI companions)
│   ├── /chat ................... Chat hub / recent conversations
│   │   └── /chat/[luminorId] .. 1:1 conversation with Luminor
│   ├── /companions ............. Companion management & bonds
│   │
│   ├── /studio ................. Creator Studio hub
│   │   ├── /studio/image ...... Image generation
│   │   ├── /studio/music ...... Music creation (PLANNED)
│   │   ├── /studio/video ...... Video generation (PLANNED)
│   │   └── /studio/story ...... Story writing (PLANNED)
│   │
│   ├── /library ................ Library of Arcanea (17 collections)
│   │   ├── /library/[collection] .. Collection page
│   │   ├── /library/[collection]/[text] .. Individual text
│   │   ├── /library/codex ..... The Arcanea Codex (interactive)
│   │   └── /library/graph ..... Knowledge graph visualization
│   │
│   ├── /academy ................ Academy of Creation
│   │   ├── /academy/assessment  Gate assessment quizzes
│   │   ├── /academy/gates ..... Ten Gates progression (PLANNED)
│   │   ├── /academy/houses .... Seven Houses (PLANNED)
│   │   └── /academy/ranks ..... Rank progression (PLANNED)
│   │
│   ├── /discover ............... Browse community creations
│   └── /skills ................. Arcanea Skills marketplace
│
├── (Lore & World)
│   ├── /lore ................... Lore hub
│   ├── /lore/guardians ........ Ten Guardians showcase
│   ├── /lore/gates ............ Ten Gates system
│   ├── /lore/library .......... Lore library connection
│   └── /bestiary .............. Creative obstacle bestiary
│
├── (Social & Profile)
│   ├── /profile/[username] .... Public creator profile
│   └── /profile/edit .......... Profile settings
│
├── (Hub / Resources)
│   ├── /hub ................... Resource hub
│   ├── /hub/guides ............ Tutorials & guides
│   ├── /hub/tools ............. Creator tools directory
│   └── /hub/updates ........... Changelog & announcements
│
├── (Legal)
│   ├── /privacy ............... Privacy policy
│   └── /terms ................. Terms of service
│
└── (Developer)
    ├── /components ............. Component showcase (Storybook-like)
    └── /chat-demo .............. Chat demo (marketing)
```

### Page Count Summary

| Category | Existing | Planned | Total |
|----------|----------|---------|-------|
| Marketing | 4 | 2 | 6 |
| Auth | 2 | 0 | 2 |
| Core Product | 12 | 4 | 16 |
| Lore | 5 | 0 | 5 |
| Social | 2 | 1 | 3 |
| Hub | 4 | 0 | 4 |
| Legal | 0 | 2 | 2 |
| Developer | 2 | 0 | 2 |
| **Total** | **31** | **9** | **40** |

---

## Component Architecture

### Design System Foundation (Priority 1)

These are the atoms — every other component builds on these.

#### Buttons
| Component | Variants | States | Status |
|-----------|----------|--------|--------|
| `Button` | primary, secondary, ghost, crystal, destructive, outline | default, hover, active, focus, disabled, loading | EXISTS (needs update) |
| `IconButton` | sm, md, lg | same as Button | MISSING |
| `ButtonGroup` | horizontal, vertical | — | MISSING |

#### Inputs & Forms
| Component | Variants | States | Status |
|-----------|----------|--------|--------|
| `Input` | default, search, password | default, focus, error, disabled | MISSING |
| `Textarea` | default, auto-resize | default, focus, error, disabled | MISSING |
| `Select` | default, multi | default, open, error, disabled | MISSING |
| `Checkbox` | default | checked, unchecked, indeterminate, disabled | MISSING |
| `Radio` | default | checked, unchecked, disabled | MISSING |
| `Switch` | default | on, off, disabled | MISSING |
| `Slider` | default, range | — | MISSING |
| `FormField` | with label, helper, error | — | MISSING |

#### Display
| Component | Variants | Status |
|-----------|----------|--------|
| `Badge` | default, crystal, fire, water, void, gold, outline | MISSING |
| `Avatar` | sm, md, lg, xl (with fallback initials) | EXISTS (LuminorAvatar) |
| `Tag` | default, removable | MISSING |
| `Tooltip` | top, right, bottom, left | EXISTS |
| `Divider` | horizontal, vertical, gradient | MISSING |
| `Skeleton` | text, circle, rect, card | MISSING |
| `Spinner` | sm, md, lg | MISSING |

#### Layout
| Component | Variants | Status |
|-----------|----------|--------|
| `Card` | default, glass, liquid-glass, iridescent, bordered | EXISTS (cosmic-card, needs update) |
| `Container` | sm, md, lg, xl, full | MISSING |
| `Stack` | horizontal, vertical | MISSING |
| `Grid` | responsive columns | MISSING |

### Composite Components (Priority 2)

#### Navigation
| Component | Status |
|-----------|--------|
| `Navbar` | EXISTS (needs design update) |
| `Sidebar` | MISSING |
| `Breadcrumb` | MISSING |
| `Tabs` | MISSING |
| `Pagination` | MISSING |
| `MobileNav` | MISSING (Navbar has mobile but separate component better) |

#### Feedback
| Component | Status |
|-----------|--------|
| `Modal` / `Dialog` | MISSING |
| `Toast` / `Notification` | MISSING |
| `Alert` | MISSING |
| `ProgressBar` | MISSING |
| `EmptyState` | MISSING |
| `ErrorState` | MISSING |

#### Data Display
| Component | Status |
|-----------|--------|
| `Table` | MISSING |
| `StatCard` | MISSING |
| `DataCard` | MISSING |
| `Timeline` | MISSING |
| `Accordion` | MISSING |

#### Overlays
| Component | Status |
|-----------|--------|
| `Dropdown` | MISSING |
| `Popover` | MISSING |
| `Sheet` (slide-in panel) | MISSING |
| `Command` (cmd+k palette) | MISSING |

### Domain Components (Priority 3)

These are Arcanea-specific composed components.

#### Luminor System
| Component | Status |
|-----------|--------|
| `LuminorCard` | PLANNED (part of luminor-selection-grid) |
| `LuminorAvatar` | EXISTS |
| `LuminorBondMeter` | EXISTS (bond-indicator) |
| `LuminorOrb` | EXISTS (luminor-orb) |
| `ElementBadge` | MISSING |
| `GateBadge` | MISSING |
| `RankBadge` | MISSING |

#### Chat
| Component | Status |
|-----------|--------|
| `ChatContainer` | EXISTS |
| `ChatHeader` | EXISTS |
| `ChatInput` | EXISTS |
| `ChatMessage` | EXISTS |
| `ChatBubble` | EXISTS (streaming-message) |
| `ContextSidebar` | EXISTS |
| `QuickActions` | EXISTS |

#### Library
| Component | Status |
|-----------|--------|
| `CollectionCard` | PLANNED |
| `TextCard` | PLANNED |
| `ReadingView` | PLANNED |
| `KnowledgeGraph` | PLANNED |

#### Creator Profile
| Component | Status |
|-----------|--------|
| `ProfileHeader` | EXISTS |
| `CreationCard` | EXISTS |
| `CreationGallery` | EXISTS |
| `StatsDashboard` | EXISTS |
| `ActivityFeed` | MISSING |

#### Social
| Component | Status |
|-----------|--------|
| `CommentSection` | EXISTS |
| `FollowButton` | EXISTS |
| `LikeButton` | EXISTS |
| `ShareButton` | MISSING |

### Component Count Summary

| Category | Existing | Missing | Total Needed |
|----------|----------|---------|--------------|
| Atoms (buttons, inputs, display) | 6 | 20 | 26 |
| Composite (nav, feedback, data) | 1 | 17 | 18 |
| Domain (luminor, chat, library) | 14 | 8 | 22 |
| **Total** | **21** | **45** | **66** |

---

## Landing Page Architecture

### Current Sections (page.tsx)

```
┌─────────────────────────────────────────┐
│ Navbar                                  │
├─────────────────────────────────────────┤
│ HeroV3 (parallax, animated counters)    │
├─────────────────────────────────────────┤
│ LogosSection (publications)             │
├─────────────────────────────────────────┤
│ SocialProof (trust badges)              │
├─────────────────────────────────────────┤
│ FeaturesV2 (feature grid)              │
├─────────────────────────────────────────┤
│ LuminorShowcase (AI companions)         │
├─────────────────────────────────────────┤
│ WisdomsSection (Seven Wisdoms)          │
├─────────────────────────────────────────┤
│ HowItWorks (process steps)             │
├─────────────────────────────────────────┤
│ TestimonialsV2 (reviews)               │
├─────────────────────────────────────────┤
│ PricingSection (plans)                  │
├─────────────────────────────────────────┤
│ FAQSection (accordion)                  │
├─────────────────────────────────────────┤
│ Resources Grid (Library/Academy/Studio) │
├─────────────────────────────────────────┤
│ CTASection (final conversion)           │
├─────────────────────────────────────────┤
│ Quote Section (closing)                 │
├─────────────────────────────────────────┤
│ Footer (links, social, legal)           │
└─────────────────────────────────────────┘
```

### Design Execution Per Section

| Section | Glass Effect | Typography | Animation | Issues to Fix |
|---------|-------------|------------|-----------|---------------|
| Navbar | `glass-strong` | `font-sans` | scroll-shrink | Needs glass backdrop |
| Hero | none (custom aurora) | `font-display` fluid-hero | parallax + spring | Good, minor token fixes |
| Logos | none | `font-sans` sm | fade-in | Needs glass subtle bg |
| Social Proof | `glass-subtle` | `font-sans` | counter | Needs review |
| Features | `glass` per card | `font-display` h3 | stagger reveal | Replace emoji → Lucide |
| Luminor | `liquid-glass` | `font-display` h2 | hover-lift | Needs liquid-glass cards |
| Wisdoms | `iridescent-glass` | `font-display` h2 | scroll-linked | Needs iridescent effect |
| How It Works | `glass` | `font-sans` | step animation | Needs review |
| Testimonials | `glass` per card | `font-body` quote | carousel | Needs glass cards |
| Pricing | `liquid-glass-elevated` featured | `font-sans` | hover-lift | Needs liquid glass |
| FAQ | `glass-subtle` | `font-sans` | accordion | Standard |
| Resources | `glass` per card | `font-display` h3 | hover-lift | Replace emoji → Lucide |
| CTA | `liquid-glass-elevated` | `font-display` hero | breathe glow | Needs premium glass |
| Footer | none | `font-sans` sm | none | Fine |

---

## Page-Level Design Specifications

### Every Page Template

```tsx
// Standard page structure
<div className="relative min-h-screen">
  <Navbar />
  <main className="pt-20"> {/* Account for fixed navbar */}
    {/* Page Hero - varies per page */}
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero content */}
      </div>
    </section>

    {/* Content sections */}
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section content */}
      </div>
    </section>
  </main>
  <Footer />
</div>
```

### Page-Specific Designs

| Page | Hero Style | Key Components | Glass Level |
|------|-----------|----------------|-------------|
| **Landing** | Full-bleed aurora + parallax | HeroV3, Features, Pricing | All tiers |
| **Luminors** | Mesh gradient | LuminorCard grid (4-col) | liquid-glass cards |
| **Chat** | None (full-height) | ChatContainer, sidebar | glass-strong |
| **Studio** | Subtle aurora | Tool selection grid | glass cards |
| **Library** | Book-themed mesh | CollectionCard grid | glass cards |
| **Library/[text]** | None (reading mode) | ReadingView, sidebar | glass-subtle |
| **Academy** | Gold-tinted aurora | Gate progression, assessment | iridescent-glass |
| **Lore** | Cosmic full aurora | Guardian showcase, gates | liquid-glass-elevated |
| **Profile** | User banner + avatar | Stats, gallery, bonds | glass cards |
| **About** | Brand gradient | Team, mission, values | liquid-glass |
| **Auth** | Centered glass panel | Form, OAuth buttons | liquid-glass-elevated |

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|-----------|-------|----------------|
| `xs` | < 640px | Single column, stacked nav, full-width cards |
| `sm` | 640px | 2-col grid where applicable |
| `md` | 768px | Sidebar appears, 2-3 col grids |
| `lg` | 1024px | Full desktop nav, 3-4 col grids |
| `xl` | 1280px | Max content width, comfortable spacing |
| `2xl` | 1536px | Ultra-wide comfortable, no stretch |

---

## Build Priority & Phases

### Phase 1: Foundation (NOW)
- [x] Design Bible created
- [x] Color tokens aligned
- [x] Typography system
- [x] Glass effects (7 tiers)
- [x] Tailwind config complete
- [x] CSS animations & keyframes
- [ ] Core UI atoms: Input, Badge, Modal, Toast, Tabs
- [ ] Navbar redesign with glass-strong
- [ ] Footer component

### Phase 2: Landing Page Excellence
- [ ] Hero polish (fluid typography)
- [ ] Features section (Lucide icons, glass cards)
- [ ] Luminor showcase (liquid-glass cards)
- [ ] Pricing (liquid-glass-elevated featured plan)
- [ ] Testimonials (glass quote cards)
- [ ] CTA section (premium liquid-glass)
- [ ] Resources grid (Lucide icons, hover-lift)

### Phase 3: Core Product Pages
- [ ] Luminors page (selection grid)
- [ ] Chat interface (glass panels)
- [ ] Library browser (collection cards)
- [ ] Reading view (typography showcase)
- [ ] Academy (gate progression)

### Phase 4: Social & Profile
- [ ] Creator profile (header, gallery, stats)
- [ ] Discovery feed
- [ ] Activity feed
- [ ] Notifications

### Phase 5: Polish & Edge Cases
- [ ] Error pages (404, 500)
- [ ] Loading states (skeletons)
- [ ] Empty states
- [ ] Toast notifications
- [ ] Keyboard shortcuts
- [ ] Accessibility audit

---

## Icon Mapping (Lucide React)

Replace ALL emoji icons with Lucide equivalents:

| Current Emoji | Lucide Icon | Context |
|--------------|-------------|---------|
| 📚 | `BookOpen` | Library |
| 🎓 | `GraduationCap` | Academy |
| 🎨 | `Palette` | Studio |
| ⚡ | `Zap` | Power/Energy |
| ✨ | `Sparkles` | Magic/Creation |
| 🔥 | `Flame` | Fire element |
| 💧 | `Droplets` | Water element |
| 🌍 | `Mountain` | Earth element |
| 💨 | `Wind` | Wind element |
| 👁️ | `Eye` | Void/Spirit |
| ⭐ | `Star` | Achievement |
| 🏆 | `Trophy` | Ranking |
| 💬 | `MessageCircle` | Chat |
| 🖼️ | `Image` | Gallery |
| 🎵 | `Music` | Music |
| 📝 | `FileText` | Writing |
| ⚙️ | `Settings` | Settings |
| 👤 | `User` | Profile |

---

*This document is the execution blueprint. Every component, every page, every design decision is mapped here.*
*Source of truth for design: `.arcanea/design/DESIGN_BIBLE.md`*
*Last updated: 2026-02-22*
