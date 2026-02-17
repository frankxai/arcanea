# Design Lab - Claude Instructions

> *"When you build the Design Lab, you are building the visible soul of Arcanea. Every class name, every animation timing, every glass tier is a design decision that carries mythology forward."*

---

## Overview

These instructions govern all work within the Design Lab at `arcanea.ai/design-lab`. The Design Lab is a "build in public" design system hub that documents the evolution of the Arcanean Design System v2.0 across ten stages. All pages are interactive showcases with live demos, code patterns, and narrative documentation.

**Repository:** `arcanea.ai/` (not arcanea-ecosystem)
**Path:** `app/design-lab/`
**Tech Stack:** Next.js 16, React 19, Tailwind CSS 3.4, Framer Motion 12, TypeScript, CVA

---

## Design System Reference

### Cosmic Palette (6 Darkness Levels)
```
cosmic-void:     #0b0e14   -- Deepest background, page base
cosmic-deep:     #121826   -- Primary background, glass base
cosmic-surface:  #1a2332   -- Elevated surfaces, card backgrounds
cosmic-raised:   #242f42   -- Raised elements, active states
cosmic-elevated: #2d3a52   -- Higher elevation, hover states
cosmic-overlay:  #364562   -- Highest elevation, overlays
```

### Elemental Colors
```
arcane-crystal:    #7fffd4   -- Primary accent (Water/Teal)
arcane-fire:       #ff6b35   -- Fire element
arcane-water:      #78a6ff   -- Water secondary (Blue)
arcane-void:       #9966ff   -- Void/Spirit element (Purple)
arcane-gold:       #ffd700   -- Gold accent, achievements
arcane-wind:       #00ff88   -- Wind element (Green)
arcane-earth:      #8b7355   -- Earth element (Brown)
```

Bright variants: `arcane-fire-bright`, `arcane-void-bright`, `arcane-earth-bright` (defined in Tailwind config)

### Text Colors
```
text-primary:    #e6eefc   -- Main body text
text-secondary:  #9bb1d0   -- Supporting text, descriptions
text-muted:      #708094   -- De-emphasized text, labels
text-disabled:   #515b6b   -- Disabled states
```

### Glow Intensities (CSS Custom Properties)
```
--glow-crystal:      rgba(127, 255, 212, 0.5)
--glow-crystal-soft: rgba(127, 255, 212, 0.2)
--glow-fire:         rgba(255, 107, 53, 0.5)
--glow-void:         rgba(153, 102, 255, 0.5)
```

### Glass Morphism Tiers
| Tier | Class | Background | Blur | Border |
|------|-------|------------|------|--------|
| Subtle | `.glass-subtle` | rgba(18,24,38,0.4) | 8px | crystal 0.08 |
| Standard | `.glass` | rgba(18,24,38,0.7) | 16px | crystal 0.15 |
| Strong | `.glass-strong` | rgba(18,24,38,0.85) | 24px | crystal 0.20 |

### Transition Tokens
```
--transition-fast:   150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base:   300ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow:   500ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Typography Scale (Fluid)
| Class | Min | Max | Use Case |
|-------|-----|-----|----------|
| `text-fluid-xs` | 0.7rem | 0.75rem | Fine print, badges |
| `text-fluid-sm` | 0.8rem | 0.875rem | Captions, labels |
| `text-fluid-base` | 0.9rem | 1rem | Body text |
| `text-fluid-lg` | 1rem | 1.125rem | Large body, intros |
| `text-fluid-xl` | 1.1rem | 1.25rem | Subheadings |
| `text-fluid-2xl` | 1.4rem | 1.75rem | Section titles |
| `text-fluid-3xl` | 1.8rem | 2.25rem | Page subtitles |
| `text-fluid-4xl` | 2.2rem | 3rem | Page titles |
| `text-fluid-5xl` | 2.8rem | 4rem | Hero titles |
| `text-fluid-6xl` | 3.5rem | 5rem | Major display |
| `text-fluid-hero` | 4rem | 7rem | Landing hero |

### Font Families
| Class | Font | Use |
|-------|------|-----|
| `font-display` | Cinzel | Headings, titles, hero text |
| `font-body` | Crimson Pro | Body text, descriptions, narratives |
| `font-sans` | Inter | UI labels, badges, buttons, navigation |
| `font-mono` | JetBrains Mono | Code, version numbers, stats |

### Component Variants (CVA)

**Badge variants:** `default`, `secondary`, `destructive`, `outline`, `crystal`, `gold`, `void`, `fire`, `water`, `earth`

**Button variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`, `crystal`, `gold`, `void`, `fire`

**Button sizes:** `default` (h-10), `sm` (h-9), `lg` (h-12), `xl` (h-14), `icon` (h-10 w-10)

### CSS Utility Classes
| Class | Effect |
|-------|--------|
| `.glass` | Standard glass morphism |
| `.glass-strong` | Heavy glass morphism |
| `.glass-subtle` | Light glass morphism |
| `.glow-text` | Soft crystal text glow |
| `.glow-text-strong` | Intense crystal text glow |
| `.text-gradient-crystal` | Crystal-to-water gradient |
| `.text-gradient-fire` | Fire-to-gold gradient |
| `.text-gradient-cosmic` | Animated three-color gradient |
| `.text-gradient-gold` | Gold shimmer gradient |
| `.bg-cosmic-mesh` | Four-corner radial gradient background |
| `.bg-cosmic-stars` | Star particle pattern |
| `.section-divider` | Horizontal gradient line |
| `.hover-lift` | translateY(-4px) + shadow on hover |
| `.border-gradient` | Animated gradient border via ::before |
| `.glow-card` | Mouse-tracking glow container |
| `.shimmer` | Loading shimmer animation |
| `.cosmic-orb` | Blurred floating orb decoration |

### Animation Delay Utilities
`animation-delay-200`, `animation-delay-500`, `animation-delay-700`, `animation-delay-1000`, `animation-delay-1500`, `animation-delay-2000`, `animation-delay-3000`

### Framer Motion Variants (from `lib/animations.ts`)
**Cosmic:** `cosmicFadeIn`, `cosmicFadeInUp`, `cosmicSlideInLeft`, `cosmicSlideInRight`, `cosmicScale`, `cosmicGlow`
**Stagger:** `staggerContainer`, `staggerContainerFast`, `staggerContainerSlow`, `staggerItem`
**Hero:** `heroTitle`, `heroSubtitle`, `heroCTA`, `heroStats`
**Card:** `cardHover`, `cardTap`
**Nav:** `navSlideDown`, `mobileMenuExpand`, `mobileMenuItem`
**Page:** `pageTransition`
**Scroll:** `scrollReveal`, `scrollRevealLeft`, `scrollRevealRight`, `scrollRevealScale`
**Particle:** `floatingOrb`
**Springs:** `springTransition`, `gentleSpring`, `bouncySpring`
**Utility:** `fadeInViewport`, `fadeInViewportEager`

---

## Coding Standards

### File Header
Every Design Lab page must begin with:
```tsx
'use client'
```
All Design Lab pages are client components because they use Framer Motion, interactive demos, and browser APIs.

### Imports — Standard Order
```tsx
// 1. React / Next.js
import { useState } from 'react'
import Link from 'next/link'

// 2. Framer Motion
import { motion, AnimatePresence } from 'framer-motion'

// 3. Components
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// 4. Animations
import {
  staggerContainer,
  staggerItem,
  cosmicFadeIn,
  cosmicFadeInUp,
  fadeInViewport,
} from '@/lib/animations'

// 5. Utilities
import { cn } from '@/lib/utils'

// 6. Icons
import { Palette, ArrowRight, ArrowLeft } from 'lucide-react'
```

### Typography Rules
- **Headings:** Always use `font-display` (Cinzel)
- **Body text:** Always use `font-body` (Crimson Pro)
- **UI elements:** Always use `font-sans` (Inter) — badges, buttons, labels, navigation, stats
- **Code/versions:** Always use `font-mono` (JetBrains Mono)
- **Responsive sizes:** Always use `text-fluid-*` instead of static `text-xl`, `text-2xl`, etc.

### Color Rules
- Use Tailwind tokens exclusively: `text-arcane-crystal`, `bg-cosmic-deep`, `border-arcane-void/20`
- Use opacity modifiers: `bg-arcane-crystal/10`, `border-white/10`
- For gradient text, use the utility classes: `.text-gradient-crystal`, `.text-gradient-cosmic`
- Never write raw colors like `text-[#7fffd4]` or `bg-[rgba(18,24,38,0.7)]`

### Component Usage
- **Badge standard variant:** `variant="crystal"` with `className="font-sans text-xs tracking-wider px-3 py-1"`
- **Section badges:** Include an icon: `<Palette className="w-3.5 h-3.5 mr-2" />`
- **Interactive cards:** Use `glow-card rounded-2xl p-6` with `hover-lift`
- **Container backgrounds:** Use `glass` or `glass-strong`
- **Card class composition:** Use `cn()` for conditional classes

### Animation Patterns
- **Page entry:** Wrap in `<motion.section variants={staggerContainer} initial="hidden" animate="visible">`
- **Scroll reveal:** Use `{...fadeInViewport}` spread on `<motion.section>`
- **Child items:** Use `variants={staggerItem}` on each child
- **Section headings:** Use `variants={cosmicFadeIn}` for the heading block
- **Main title:** Use `variants={cosmicFadeInUp}` for the primary title

### Section Spacing
- Between major sections: `space-y-20` on the parent container
- Between section badge and title: `mb-4` on badge, `mb-3` on title, `mb-8` or `mb-10` before content
- Between grid items: `gap-4` for tight grids, `gap-6` for spacious grids
- Section dividers: `<div className="section-divider" />`

---

## Common Patterns

### Hero Section Pattern
```tsx
<motion.section
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
  className="text-center pt-8"
>
  <motion.div variants={cosmicFadeIn}>
    <Badge variant="crystal" className="mb-6 font-sans text-xs tracking-wider px-4 py-1">
      <IconName className="w-3.5 h-3.5 mr-2" />
      SECTION LABEL
    </Badge>
  </motion.div>

  <motion.h1
    variants={cosmicFadeInUp}
    className="text-fluid-5xl font-display text-white mb-6 leading-tight"
  >
    Main Title
    <span className="block text-gradient-cosmic">Gradient Subtitle</span>
  </motion.h1>

  <motion.p
    variants={cosmicFadeIn}
    className="text-fluid-lg font-body text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
  >
    Description text that explains what this evolution stage covers.
  </motion.p>
</motion.section>
```

### Demo Section Pattern
```tsx
<motion.section
  variants={staggerContainer}
  {...fadeInViewport}
>
  <motion.div variants={cosmicFadeIn} className="text-center mb-10">
    <Badge variant="void" className="mb-4 font-sans text-xs tracking-wider px-3 py-1">
      DEMO LABEL
    </Badge>
    <h2 className="text-fluid-3xl font-display text-white mb-3">Section Title</h2>
    <p className="text-fluid-base font-body text-text-secondary max-w-2xl mx-auto">
      Brief description of what the demo shows.
    </p>
  </motion.div>

  <motion.div
    variants={staggerContainer}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    {items.map((item) => (
      <motion.div
        key={item.id}
        variants={staggerItem}
        className="glow-card rounded-2xl p-6 hover-lift"
      >
        {/* Demo content */}
      </motion.div>
    ))}
  </motion.div>
</motion.section>
```

### Color Swatch Pattern
```tsx
<div className="glow-card rounded-2xl p-6">
  <div className="flex items-center gap-3 mb-3">
    <div className="w-10 h-10 rounded-lg bg-arcane-crystal" />
    <div>
      <div className="font-sans text-sm text-white">arcane-crystal</div>
      <div className="font-mono text-xs text-text-muted">#7fffd4</div>
    </div>
  </div>
  <div className="flex gap-2">
    <div className="w-6 h-6 rounded bg-arcane-crystal/10" />
    <div className="w-6 h-6 rounded bg-arcane-crystal/20" />
    <div className="w-6 h-6 rounded bg-arcane-crystal/40" />
    <div className="w-6 h-6 rounded bg-arcane-crystal/60" />
    <div className="w-6 h-6 rounded bg-arcane-crystal/80" />
    <div className="w-6 h-6 rounded bg-arcane-crystal" />
  </div>
</div>
```

### Interactive Demo Pattern
```tsx
const [activeVariant, setActiveVariant] = useState<string>('crystal')

<div className="glass rounded-3xl p-8">
  {/* Controls */}
  <div className="flex flex-wrap gap-2 mb-6">
    {['crystal', 'fire', 'water', 'void', 'gold', 'earth'].map((v) => (
      <button
        key={v}
        onClick={() => setActiveVariant(v)}
        className={cn(
          'font-sans text-xs px-3 py-1.5 rounded-full transition-all',
          activeVariant === v
            ? 'bg-arcane-crystal/20 text-arcane-crystal border border-arcane-crystal/30'
            : 'bg-white/5 text-text-secondary hover:bg-white/10'
        )}
      >
        {v}
      </button>
    ))}
  </div>

  {/* Preview area */}
  <div className="min-h-[120px] flex items-center justify-center">
    <Badge variant={activeVariant as BadgeProps['variant']}>
      {activeVariant} variant
    </Badge>
  </div>
</div>
```

### Navigation Footer Pattern
```tsx
<div className="flex items-center justify-between pt-8 border-t border-white/10">
  <Link href="/design-lab/vN-1" className="group flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
    <div>
      <div className="text-xs font-sans text-text-muted">Previous</div>
      <div className="text-sm font-display">Previous Stage Name</div>
    </div>
  </Link>

  <Link href="/design-lab/vN+1" className="group flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-right">
    <div>
      <div className="text-xs font-sans text-text-muted">Next</div>
      <div className="text-sm font-display">Next Stage Name</div>
    </div>
    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
  </Link>
</div>
```

---

## Do's and Don'ts

### DO
- Use the elemental color system for all accent colors (`arcane-crystal`, `arcane-fire`, etc.)
- Animate with scroll-reveal patterns using `fadeInViewport` and `staggerContainer`
- Use stagger containers for lists, grids, and sequential content
- Apply `glow-card` and `hover-lift` to interactive cards
- Use `font-display` for headings and `font-body` for prose
- Use `font-sans` for UI elements (badges, buttons, labels, nav)
- Use `text-fluid-*` for all type sizing
- Include prev/next navigation at the bottom of every evolution page
- Use `Badge variant="crystal"` as the standard section label
- Wrap pages in `<div className="space-y-20">` for consistent section spacing
- Use `glass rounded-3xl p-8` for featured content containers
- Test on mobile viewport widths (375px minimum)
- Verify that `prefers-reduced-motion` disables animations gracefully

### DON'T
- Use raw hex colors — always use Tailwind token classes
- Use arbitrary Tailwind values like `text-[#7fffd4]` or `bg-[rgba(18,24,38,0.7)]`
- Use static type sizes (`text-xl`) — use fluid sizes (`text-fluid-xl`)
- Create one-off animations — add them to `lib/animations.ts` and `tailwind.config.ts`
- Skip `prefers-reduced-motion` considerations
- Use `animate` without `initial` on motion components (causes flash on mount)
- Animate layout-triggering properties (width, height, top, left, margin, padding)
- Use `viewport: { once: false }` on scroll reveals (causes re-animation on scroll)
- Forget the `'use client'` directive on interactive pages
- Use `<img>` tags — use Next.js `<Image>` or SVG icons from Lucide
- Create components without `forwardRef` and `displayName`
- Use inline styles — everything goes through Tailwind or CSS custom properties
- Leave hard-coded strings in components — use data arrays for repeated elements

---

## File Locations

| Purpose | Path |
|---------|------|
| Design Lab hub | `arcanea.ai/app/design-lab/page.tsx` |
| Design Lab layout | `arcanea.ai/app/design-lab/layout.tsx` |
| Evolution pages | `arcanea.ai/app/design-lab/vN/page.tsx` |
| Animation library | `arcanea.ai/lib/animations.ts` |
| CSS foundation | `arcanea.ai/app/globals.css` |
| Tailwind config | `arcanea.ai/tailwind.config.ts` |
| Utils (cn) | `arcanea.ai/lib/utils.ts` |
| Badge component | `arcanea.ai/components/ui/badge.tsx` |
| Button component | `arcanea.ai/components/ui/button.tsx` |
| App layout | `arcanea.ai/app/layout.tsx` |

---

## Build & Validation

```bash
# Type check
cd arcanea.ai && npm run type-check

# Dev server
cd arcanea.ai && npm run dev

# Build
cd arcanea.ai && npm run build

# Install dependencies (MUST use Windows PowerShell, not WSL2)
# Open PowerShell: cd C:\Users\frank\Arcanea\arcanea.ai && npm install
```

---

*"The Design Lab is where mythology becomes interface. Build accordingly."*
