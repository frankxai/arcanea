# Design Lab Skills

> *"Skills are procedural memory — what the team knows how to do, encoded as repeatable patterns."*

**Guardian:** Leyla (Flow Gate, 417 Hz) + Alera (Voice Gate, 741 Hz)
**Quality Standard:** Premium — every output must meet the Design Lab quality gates

---

## skill: design-lab-page

> Creates a new Design Lab evolution page with consistent structure, interactive demos, and Arcanean narrative.

### Invocation
```
/design-lab-page create v11 "Page Title" "Brief description"
/design-lab-page create v12 "Animation Choreography" "Advanced animation sequencing and orchestration patterns"
```

### What It Does
1. Creates `arcanea.ai/app/design-lab/vN/page.tsx` with the standard structure
2. Updates the `evolutionStages` array in `app/design-lab/page.tsx`
3. Updates the `labVersions` array in `app/design-lab/layout.tsx`
4. Generates hero section, demo sections, code patterns, and navigation footer

### Page Structure Generated
```
┌─────────────────────────────────────────┐
│  Badge + Hero Title + Description       │  ← Hero Section
├─────────────────────────────────────────┤
│  System Stats (if applicable)           │  ← Stats Grid
├─────────────────────────────────────────┤
│  Interactive Demo 1                     │  ← Demo Section
│  ┌─────┐ ┌─────┐ ┌─────┐              │
│  │Card │ │Card │ │Card │              │
│  └─────┘ └─────┘ └─────┘              │
├─────────────────────────────────────────┤
│  ── section-divider ──                  │
├─────────────────────────────────────────┤
│  Interactive Demo 2                     │  ← Demo Section
│  [Live preview area with controls]      │
├─────────────────────────────────────────┤
│  Code Patterns                          │  ← Pattern Docs
│  ┌────────────────────────────────┐     │
│  │  glass rounded-3xl p-8        │     │
│  │  Copy-ready code snippets     │     │
│  └────────────────────────────────┘     │
├─────────────────────────────────────────┤
│  ← Previous Stage    Next Stage →       │  ← Navigation Footer
└─────────────────────────────────────────┘
```

### Template
```tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  staggerContainer,
  staggerItem,
  cosmicFadeIn,
  cosmicFadeInUp,
  fadeInViewport,
} from '@/lib/animations'
import { cn } from '@/lib/utils'
import { IconName, ArrowRight, ArrowLeft } from 'lucide-react'

export default function DesignLabVN() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-center pt-8"
      >
        <motion.div variants={cosmicFadeIn}>
          <Badge variant="crystal" className="mb-6 font-sans text-xs tracking-wider px-4 py-1">
            <IconName className="w-3.5 h-3.5 mr-2" />
            VN — STAGE NAME
          </Badge>
        </motion.div>

        <motion.h1
          variants={cosmicFadeInUp}
          className="text-fluid-5xl font-display text-white mb-6 leading-tight"
        >
          Stage Title
          <span className="block text-gradient-cosmic">Subtitle</span>
        </motion.h1>

        <motion.p
          variants={cosmicFadeIn}
          className="text-fluid-lg font-body text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Description of what this evolution stage covers and why it matters.
        </motion.p>
      </motion.section>

      {/* Demo sections go here */}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-8 border-t border-white/10">
        <Link href="/design-lab/vPREV" className="group flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <div>
            <div className="text-xs font-sans text-text-muted">Previous</div>
            <div className="text-sm font-display">Previous Stage</div>
          </div>
        </Link>
        <Link href="/design-lab/vNEXT" className="group flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-right">
          <div>
            <div className="text-xs font-sans text-text-muted">Next</div>
            <div className="text-sm font-display">Next Stage</div>
          </div>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
```

### Quality Checklist
- [ ] `'use client'` directive present
- [ ] Imports animations from `@/lib/animations`
- [ ] Hero section uses `staggerContainer` + `cosmicFadeInUp`
- [ ] Demo sections use `fadeInViewport` for scroll reveals
- [ ] Badge variant="crystal" for section labels
- [ ] Interactive demos use `useState` for state management
- [ ] Prev/next navigation footer present
- [ ] No raw hex colors
- [ ] Responsive on mobile (375px+)
- [ ] `evolutionStages` in hub page updated
- [ ] `labVersions` in layout updated

---

## skill: design-token-audit

> Audits the current design token system for completeness, consistency, and usage coverage.

### Invocation
```
/design-token-audit                  # Full audit
/design-token-audit colors           # Audit only color tokens
/design-token-audit typography       # Audit only typography tokens
/design-token-audit animations       # Audit only animation tokens
```

### What It Does
1. Reads `arcanea.ai/tailwind.config.ts` and extracts all defined tokens
2. Reads `arcanea.ai/app/globals.css` and extracts all CSS custom properties
3. Searches all `.tsx` files for token usage patterns
4. Generates a comprehensive report

### Audit Report Structure
```yaml
TOKEN AUDIT REPORT
==================

COLORS:
  defined: 45
  used: 42
  unused: [list of unused tokens]
  missing: [tokens referenced in code but not defined]

TYPOGRAPHY:
  fluid_sizes: 11
  font_families: 4
  coverage: [which sizes are actually used in pages]

ANIMATIONS:
  css_keyframes: 40+
  framer_variants: 30+
  unused_variants: [defined but never imported]

GLASS_TIERS:
  defined: 3 (subtle, standard, strong)
  mobile_overrides: [check reduced blur values]
  high_contrast: [check fallback exists]

COMPONENT_VARIANTS:
  badge_variants: [list]
  button_variants: [list]
  button_sizes: [list]
  missing_elemental: [components without full elemental set]

RECOMMENDATIONS:
  - Remove unused tokens: [list]
  - Add missing tokens: [list]
  - Standardize naming: [inconsistencies found]
```

### Checks Performed
| Check | What It Validates |
|-------|-------------------|
| Token Definition | All CSS custom properties are in `globals.css :root` |
| Tailwind Extension | All custom tokens are in `tailwind.config.ts extend` |
| Usage Coverage | Every defined token is used in at least one component |
| Naming Convention | Tokens follow `cosmic-*`, `arcane-*`, `text-*` patterns |
| Elemental Completeness | All 7 elements have color tokens (crystal, fire, water, void, gold, wind, earth) |
| Bright Variants | Elements that need bright variants have them |
| Opacity Scale | Elemental colors have consistent opacity usage (10, 20, 30, 40, 60, 80) |
| Mobile Overrides | Glass blur values are reduced for mobile in `@media (max-width: 768px)` |
| Accessibility | High-contrast overrides exist in `@media (prefers-contrast: high)` |
| Reduced Motion | Animation fallback exists in `@media (prefers-reduced-motion: reduce)` |

---

## skill: component-variant-builder

> Creates a new UI component with CVA variants following the established Badge/Button pattern.

### Invocation
```
/component-variant-builder Input       # Create an Input component
/component-variant-builder Card        # Create a Card component
/component-variant-builder Toggle      # Create a Toggle component
```

### What It Does
1. Creates `arcanea.ai/components/ui/{name}.tsx`
2. Defines CVA variants with full elemental set
3. Adds TypeScript types with `VariantProps`
4. Implements `React.forwardRef` with `displayName`
5. Exports both the component and the variants function

### Generated Component Structure
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const {name}Variants = cva(
  // Base styles: layout, transitions, focus ring
  "inline-flex items-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arcane-crystal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cosmic-void",
  {
    variants: {
      variant: {
        default: "/* default styles */",
        crystal: "border-arcane-crystal/20 text-arcane-crystal bg-arcane-crystal/10",
        fire: "border-arcane-fire/20 text-arcane-fire bg-arcane-fire/10",
        water: "border-arcane-water/20 text-arcane-water bg-arcane-water/10",
        void: "border-arcane-void/30 text-arcane-void-bright bg-arcane-void/10",
        gold: "border-arcane-gold/20 text-arcane-gold bg-arcane-gold/10",
        earth: "border-arcane-earth/20 text-arcane-earth bg-arcane-earth/10",
      },
      size: {
        default: "/* default size */",
        sm: "/* small size */",
        lg: "/* large size */",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface {Name}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof {name}Variants> {}

const {Name} = React.forwardRef<HTMLDivElement, {Name}Props>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn({name}Variants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
{Name}.displayName = "{Name}"

export { {Name}, {name}Variants }
```

### Elemental Variant Pattern
The standard elemental variant pattern uses three layers:
```
border: border-arcane-{element}/20     (subtle border)
text:   text-arcane-{element}          (full color text)
bg:     bg-arcane-{element}/10         (very subtle background)
```

For Void, use slightly higher opacity: `border-arcane-void/30` and `text-arcane-void-bright`

### Quality Checklist
- [ ] Uses CVA with `variants` and `defaultVariants`
- [ ] All 6 elemental variants present (crystal, fire, water, void, gold, earth)
- [ ] Focus ring uses `arcane-crystal/50` with `cosmic-void` offset
- [ ] TypeScript interface extends `VariantProps<typeof variants>`
- [ ] `React.forwardRef` wraps the component
- [ ] `displayName` is set
- [ ] Both component and variants function are exported
- [ ] `cn()` is used for class composition
- [ ] No `any` types

---

## skill: animation-library-extend

> Adds new animations to the Arcanean animation system with proper typing, reduced motion support, and documentation.

### Invocation
```
/animation-library-extend framer "pulseGlow" "Pulsating glow effect for active elements"
/animation-library-extend css "portal-open" "Gate-opening animation for navigation"
/animation-library-extend both "elementalShift" "Transition between elemental themes"
```

### What It Does

**For Framer Motion variants (`framer`):**
1. Adds typed `Variants` export to `arcanea.ai/lib/animations.ts`
2. Groups with related animations using section comments
3. Follows the `hidden/visible` or `rest/hover/tap` convention

**For CSS keyframes (`css`):**
1. Adds `@keyframes` definition in `tailwind.config.ts` under `theme.extend.keyframes`
2. Adds corresponding `animation` entry in `theme.extend.animation`
3. Ensures the animation utility is available as a Tailwind class

**For both:**
1. Creates both a Framer Motion variant and a CSS keyframe version
2. Documents the animation in the Design Lab

### Framer Motion Variant Template
```typescript
// === CATEGORY NAME ===
export const variantName: Variants = {
  hidden: { /* initial state */ },
  visible: {
    /* target state */
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Arcanean ease
    },
  },
}
```

### CSS Keyframe Template
```javascript
// In tailwind.config.ts → theme.extend.keyframes
'animation-name': {
  '0%': { /* start state */ },
  '50%': { /* mid state (optional) */ },
  '100%': { /* end state */ },
},

// In theme.extend.animation
'animation-name': 'animation-name 2s ease-in-out infinite',
```

### Standard Easing
The Arcanean ease curve: `[0.25, 0.46, 0.45, 0.94]` — a smooth deceleration that feels natural and cosmic.

### Reduced Motion Requirements
- All CSS animations are automatically handled by the global `@media (prefers-reduced-motion: reduce)` rule in `globals.css`
- For Framer Motion, check `useReducedMotion()` if the animation runs continuously
- Never remove animations entirely — reduce them to 0.01ms duration

### Quality Checklist
- [ ] Framer variant typed as `Variants` from framer-motion
- [ ] Uses the Arcanean ease curve `[0.25, 0.46, 0.45, 0.94]` (or spring physics with explicit stiffness/damping)
- [ ] Only animates GPU-friendly properties (transform, opacity, filter)
- [ ] CSS keyframe added to tailwind.config.ts keyframes AND animation
- [ ] Reduced motion handled (global CSS rule covers CSS animations; Framer checked separately if continuous)
- [ ] Grouped with related animations using section comments
- [ ] Named with camelCase for Framer variants, kebab-case for CSS keyframes

---

## skill: glass-morphism-builder

> Creates glass morphism components and effects with proper mobile optimization, high-contrast fallbacks, and optional interactive glow.

### Invocation
```
/glass-morphism-builder panel "Feature panel with strong glass"
/glass-morphism-builder modal "Modal overlay with standard glass"
/glass-morphism-builder tooltip "Tooltip with subtle glass"
/glass-morphism-builder interactive "Card with mouse-tracking glow"
```

### What It Does
1. Generates the component with appropriate glass tier
2. Includes mobile-optimized blur values
3. Adds high-contrast mode fallback
4. Optionally adds mouse-tracking glow effect

### Glass Tier Selection Guide
| Use Case | Tier | Class | When |
|----------|------|-------|------|
| Background overlay | Subtle | `.glass-subtle` | Behind content, ambient |
| Card container | Standard | `.glass` | Primary cards, sections |
| Fixed header | Strong | `.glass-strong` | Sticky elements, modals |
| Featured section | Standard + border-gradient | `.glass .border-gradient` | Highlighted content |

### Mouse-Tracking Glow Implementation
```tsx
// Component with interactive glow
function GlowPanel({ children }: { children: React.ReactNode }) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
  }

  return (
    <div
      className="glow-card rounded-2xl p-6"
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  )
}
```

### Mobile Optimization Rules
```css
/* Standard glass: 16px → 8px on mobile */
/* Strong glass: 24px → 12px on mobile */
/* Mouse glow: disabled on touch devices via @media (hover: none) */
```

### High-Contrast Mode Rules
```css
/* Glass background: opacity increased to 0.95 */
/* Borders: thickness increased to 2px, opacity to 0.8 */
/* Glow text: text-shadow removed entirely */
```

### Quality Checklist
- [ ] Correct glass tier selected for the use case
- [ ] Mobile blur reduction verified (max-width: 768px media query)
- [ ] High-contrast fallback verified (prefers-contrast: high)
- [ ] Touch devices: mouse glow disabled (@media hover: none)
- [ ] Uses CSS custom properties for blur/bg/border values
- [ ] `pointer-events: none` on glow pseudo-elements
- [ ] Rounded corners consistent with design system (`rounded-2xl` for cards, `rounded-3xl` for panels)

---

## skill: design-system-sync

> Syncs design system changes across the Arcanea repository ecosystem.

### Invocation
```
/design-system-sync check           # Check for drift between repos
/design-system-sync propagate       # Push changes from arcanea.ai to ecosystem
/design-system-sync changelog       # Generate changelog entry for recent changes
```

### What It Does
1. Compares design tokens between `arcanea.ai/` and `arcanea-ecosystem/`
2. Identifies drift (tokens present in one but not the other)
3. Generates a sync plan with specific file changes
4. Optionally propagates changes and creates a changelog entry

### Repository Map
| Source of Truth | File | Syncs To |
|-----------------|------|----------|
| `arcanea.ai/app/globals.css` | CSS custom properties | `arcanea-ecosystem/arcanea/apps/web/app/globals.css` |
| `arcanea.ai/tailwind.config.ts` | Tailwind tokens | `arcanea-ecosystem/arcanea/apps/web/tailwind.config.ts` |
| `arcanea.ai/lib/animations.ts` | Framer variants | `arcanea-ecosystem/arcanea/apps/web/lib/animations.ts` |
| `arcanea.ai/components/ui/` | UI components | `arcanea-ecosystem/arcanea/packages/ui/` |

### Sync Report Structure
```yaml
DESIGN SYSTEM SYNC REPORT
==========================

SOURCE: arcanea.ai (v2.0)
TARGET: arcanea-ecosystem

DRIFT DETECTED:
  colors:
    - arcane-wind: present in source, missing in target
    - arcane-earth-bright: present in source, missing in target

  animations:
    - cosmicGlow: new in source
    - bouncySpring: new in source

  components:
    - Badge: source has 'earth' variant, target does not

SYNC PLAN:
  files_to_update:
    - arcanea-ecosystem/.../globals.css (add 2 CSS properties)
    - arcanea-ecosystem/.../tailwind.config.ts (add 2 color tokens)
    - arcanea-ecosystem/.../animations.ts (add 2 variants)
    - arcanea-ecosystem/.../badge.tsx (add earth variant)

CHANGELOG:
  version: 2.0.x
  date: YYYY-MM-DD
  changes:
    - Added arcane-wind and arcane-earth-bright color tokens
    - Added cosmicGlow and bouncySpring animation variants
    - Added earth variant to Badge component
```

### Sync Rules
- `arcanea.ai` is the source of truth for design tokens
- Never sync backwards (ecosystem to arcanea.ai) without explicit approval
- Components sync from `arcanea.ai/components/ui/` to `arcanea-ecosystem/arcanea/packages/ui/`
- Animation exports must maintain identical names and types across repos
- CSS custom properties must have identical values across repos

### Quality Checklist
- [ ] Both repos compile TypeScript without errors after sync
- [ ] No token name conflicts or collisions
- [ ] All synced animations have identical variant signatures
- [ ] CSS custom property values match exactly
- [ ] Component variant sets are identical
- [ ] Changelog entry created with date and version

---

## Skill Composition

Skills can be composed for complex tasks:

### New Evolution Stage (Full Pipeline)
```
1. /design-token-audit              → Identify what's new
2. /component-variant-builder       → Build new components if needed
3. /animation-library-extend        → Add new animations if needed
4. /glass-morphism-builder          → Create glass effects if needed
5. /design-lab-page create vN       → Build the showcase page
6. /design-system-sync propagate    → Sync to ecosystem
```

### Component Refresh
```
1. /design-token-audit colors       → Check token coverage
2. /component-variant-builder       → Rebuild with updated variants
3. /design-system-sync propagate    → Push to ecosystem
```

### Animation Expansion
```
1. /animation-library-extend both   → Add CSS + Framer variants
2. /design-lab-page                 → Update relevant showcase page
3. /design-system-sync propagate    → Sync animations to ecosystem
```

---

*"Every skill is a ritual. Every ritual produces consistent quality."*
