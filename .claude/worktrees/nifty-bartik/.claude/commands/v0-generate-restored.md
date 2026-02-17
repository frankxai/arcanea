---
description: Generate premium UI components using v0 MCP with v0's own design DNA + Arcanean Design System
thinking: true
---

# v0 Component Generation — Ultimate Design Pipeline

You are generating UI components using the **v0 MCP server**, applying v0's own design standards combined with the Arcanean Design System v2.0. This pipeline produces components that match the quality of a world-class design studio.

## Before You Begin

Read and internalize these references:
- `.claude/agents/departments/design/CLAUDE.md` — Department standards
- `.claude/agents/departments/design/design-director.md` — Anti-slop protocol
- `.claude/agents/departments/design/component-architect.md` — Component patterns

---

## Step 1: Understand the Request (Design Director)

Parse the user's intent through the **v0 3-Input Framework**:

### Input 1: Product Surface
What is being built? Break it down to:
- **Components**: What UI elements are needed?
- **Data**: What information is displayed or collected?
- **Actions**: What can the user do?

### Input 2: Context of Use
Who uses this, when, and in what state?
- **User persona**: Creator, explorer, admin, new user, returning user?
- **Moment**: Discovery, creation, reflection, emergency, celebration?
- **Device**: Mobile-first? Desktop dashboard? Both?
- **Emotional state**: Excited, focused, confused, accomplished?

### Input 3: Constraints & Taste
What boundaries define the solution?
- **Platform**: Next.js 16, React 19, Tailwind CSS 3.4, TypeScript
- **Visual tone**: Dark cosmic (Arcanea default) or other aesthetic direction
- **Layout**: Full page, section, standalone component, card
- **Must include**: Specific features, states, interactions
- **Must avoid**: Generic AI patterns (see Anti-Slop Protocol below)

If the user hasn't provided all 3 inputs, ASK before generating:
- What component type? (card, modal, form, nav, dashboard, etc.)
- Which elemental affinity? (crystal, fire, void, gold, water, earth)
- What complexity level? (simple, compound, page section)

---

## Step 2: Craft the v0 Prompt (Component Architect)

Build a prompt that encodes design intelligence:

```
Build [PRODUCT SURFACE].
Used by [USER PERSONA],
in [CONTEXT MOMENT],
to [DESIRED OUTCOME].

DESIGN SYSTEM:
Theme: Dark cosmic (Arcanea)
Backgrounds: #0b0e14 (void), #121826 (deep), #1a2332 (surface)
Primary: #7fffd4 (arcane-crystal / teal)
Secondary: #78a6ff (water / blue), #9966ff (void / purple)
Accents: #ff6b35 (fire), #ffd700 (gold), #00ff88 (wind), #8b7355 (earth)
Text: #e6eefc (primary), #9bb1d0 (secondary), #708094 (muted)

Glass: bg rgba(18,24,38,0.7), backdrop-filter blur(16px), border rgba(127,255,212,0.15)
Fonts: Cinzel (display/headings), Crimson Pro (body), Inter (UI), JetBrains Mono (code)

TECHNICAL REQUIREMENTS:
- React 19 + TypeScript strict (no any types)
- Tailwind CSS (no inline styles, no raw hex colors)
- Framer Motion for animations (spring physics, stagger reveals)
- CVA for variant management (crystal/fire/void/gold/water/earth variants)
- React.forwardRef + displayName on all components
- cn() from @/lib/utils for class composition
- Lucide React for icons (no SVG elements)
- Accessible: WCAG 2.2 AA, focus-visible rings, keyboard nav, ARIA attributes
- Responsive: mobile-first, works at 375px, touch targets >= 44px
- Support prefers-reduced-motion and prefers-contrast: high

ANTI-SLOP RULES:
- NO Inter/Roboto/Arial for display text
- NO purple-on-white color schemes
- NO cookie-cutter card grids
- NO generic CTAs ("Get Started")
- Layout MUST have visual tension (asymmetry, overlap, or unexpected composition)
- Typography MUST have clear hierarchy with distinct font families
- Color MUST follow dominant accent strategy (one hero, sharp secondary accents)
- Animation MUST be choreographed (staggered page load, not random fades)

COMPONENT: [detailed component description]
```

---

## Step 3: Generate via v0 MCP (Execution)

Use the v0 MCP tools:
- `v0_generate_ui` — Generate from text description
- `v0_generate_from_image` — Generate from design image/screenshot
- `v0_chat_complete` — Iterate on a previous generation

If v0 API key is not configured, guide the user:
1. Go to v0.dev → Settings → API Keys
2. Generate a new key
3. Reconfigure: `claude mcp add v0-mcp --env V0_API_KEY=your_key -- node /tmp/v0-mcp/dist/main.js`

---

## Step 4: Post-Generation Quality Pass (Visual QA)

After v0 generates the component, apply these MANDATORY transformations:

### 4a. Anti-Slop Audit
- Does the output look generic? If yes, regenerate with stronger constraints
- Does it use Inter/Roboto/system-ui for display text? Replace with Cinzel
- Is the color scheme timid or evenly distributed? Strengthen dominant accent
- Is the layout predictable? Add asymmetry or overlap

### 4b. Token Alignment
Replace ALL raw values with Arcanea tokens:
```
Teal/cyan → arcane-crystal
Blue → arcane-water
Purple → arcane-void
Orange/red → arcane-fire
Yellow → arcane-gold
Green → arcane-wind
Brown → arcane-earth
Dark backgrounds → cosmic-void/deep/surface
Light text → text-primary/secondary/muted
```

### 4c. CVA Variant Injection
If the component lacks elemental variants, add:
```tsx
const variants = cva('base-classes', {
  variants: {
    variant: {
      crystal: 'border-arcane-crystal/20 text-arcane-crystal bg-arcane-crystal/10 hover:bg-arcane-crystal/20',
      fire: 'border-arcane-fire/20 text-arcane-fire bg-arcane-fire/10 hover:bg-arcane-fire/20',
      void: 'border-arcane-void/20 text-arcane-void bg-arcane-void/10 hover:bg-arcane-void/20',
      gold: 'border-arcane-gold/20 text-arcane-gold bg-arcane-gold/10 hover:bg-arcane-gold/20',
      water: 'border-arcane-water/20 text-arcane-water bg-arcane-water/10 hover:bg-arcane-water/20',
      earth: 'border-arcane-earth/20 text-arcane-earth bg-arcane-earth/10 hover:bg-arcane-earth/20',
    },
  },
  defaultVariants: { variant: 'crystal' },
})
```

### 4d. React Pattern Enforcement
- [ ] `React.forwardRef` wrapper
- [ ] `displayName` set
- [ ] Props interface with `VariantProps` extension
- [ ] `cn()` for all class composition
- [ ] Export both component and variants function

### 4e. Animation Integration
Replace inline animation values with library imports:
```tsx
import {
  cosmicFadeIn, cosmicFadeInUp,
  staggerContainer, staggerItem,
  fadeInViewport,
  springTransition, gentleSpring,
} from '@/lib/animations'
```

### 4f. Accessibility Enforcement
- [ ] Focus ring: `focus-visible:ring-2 focus-visible:ring-arcane-crystal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cosmic-void`
- [ ] Touch targets: minimum `h-10 w-10` (44px)
- [ ] `aria-label` on icon-only buttons
- [ ] Semantic HTML (`<nav>`, `<main>`, `<section>`)
- [ ] `prefers-reduced-motion` support
- [ ] `prefers-contrast: high` fallbacks for glass/glow

---

## Step 5: Deliver (Documentation Curator)

Present the final component with:

1. **Component Code** — Complete, copy-ready, paste into `components/ui/`
2. **Usage Examples** — Show all variants, sizes, and states
3. **Accessibility Notes** — Keyboard navigation, screen reader behavior
4. **File Placement** — Where in the codebase it belongs
5. **Integration Notes** — How it connects to existing components

### Output Format
```tsx
// components/ui/component-name.tsx
'use client' // Only if needed (interactive state, browser APIs)

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// ... complete component code

// Usage:
// <ComponentName variant="crystal" size="lg">Content</ComponentName>
```

---

## v0 MCP Tools Available

- `v0_generate_ui` — Generate from text description
- `v0_generate_from_image` — Generate from design image/screenshot
- `v0_chat_complete` — Iterate on a previous generation
- `v0_setup_check` — Verify API configuration

---

*"Every component generated through this pipeline should feel like it was hand-crafted by a design studio with deep knowledge of the Arcanean universe — not assembled from generic parts by an AI."*
