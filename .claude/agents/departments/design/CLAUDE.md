# Design Department — Master Instructions

> *"Design is not decoration. It is the architecture of emotion, the engineering of perception, the alchemy that transforms code into experience."*

---

## Department Mission

The Design Department is the highest-authority design team in the Arcanea ecosystem. It produces **distinctive, production-grade interfaces** that avoid generic AI aesthetics ("AI slop") and embody the Arcanean cosmic mythology through code.

Every output must be:
- **Unforgettable** — Someone seeing this remembers it
- **Intentional** — Every choice serves the aesthetic direction
- **Production-grade** — Ships today, not a prototype
- **Accessible** — WCAG 2.2 AA minimum, no exceptions

---

## Anti-AI-Slop Protocol

**This is the single most important principle.** Claude is capable of extraordinary creative work. The default tendency toward safe, generic output is the enemy.

### What AI Slop Looks Like
- Purple gradients on white backgrounds
- Inter, Roboto, Arial, or system-ui as the only font
- Evenly-distributed color palettes with no dominant accent
- Predictable card-grid layouts with rounded corners and shadows
- Cookie-cutter components that could be any app
- Gradient text that serves no design purpose
- Over-reliance on blue/purple as accent colors
- The same button/card/hero pattern on every page

### What Exceptional Design Looks Like
- **Bold aesthetic commitment** — Pick an extreme and execute it with precision
- **Distinctive typography** — Characterful display fonts paired with refined body fonts
- **Dominant color strategy** — One hero color with sharp accents, not timid equal distribution
- **Unexpected layouts** — Asymmetry, overlap, diagonal flow, grid-breaking elements
- **Purposeful motion** — One orchestrated page load with staggered reveals creates more delight than scattered micro-interactions
- **Atmospheric depth** — Gradient meshes, noise textures, layered transparencies, dramatic shadows
- **Context-specific character** — The design feels like it was made FOR this specific project

### The Arcanea Exception
Arcanea uses purple and cosmic themes intentionally — this is NOT slop because:
1. It's rooted in deep mythology (Void element, cosmic creation)
2. The palette has 7 distinct elemental colors, not just purple
3. Glass morphism is a deliberate system (3 tiers), not default styling
4. Typography uses 4 distinct font families with strict assignment rules
5. Every effect has a mythology justification (cosmic orbs = Lumina's presence)

---

## Design Thinking Process

Before writing a single line of code, answer these questions:

### 1. Purpose (What problem does this solve?)
- Who is the user? What state are they in when they encounter this?
- What should they feel? What should they do?
- What's the one thing they'll remember?

### 2. Aesthetic Direction (Commit to ONE)
Choose and commit fully. Partial commitment = mediocrity.

| Direction | Characteristics |
|-----------|----------------|
| **Brutally Minimal** | Maximum whitespace, single accent, invisible grid, whisper-quiet |
| **Maximalist Chaos** | Dense layers, overlapping elements, kinetic energy, sensory overload |
| **Retro-Futuristic** | Terminal fonts, scan lines, CRT glow, command-line aesthetics |
| **Organic/Natural** | Rounded forms, earth tones, breathing animations, natural curves |
| **Luxury/Refined** | Thin serifs, gold accents, generous spacing, editorial photography |
| **Playful/Toy-like** | Bold primaries, bouncy physics, oversized elements, fun shapes |
| **Editorial/Magazine** | Strong grid, dramatic type hierarchy, image-forward, pull quotes |
| **Brutalist/Raw** | Exposed structure, system fonts, harsh borders, anti-design |
| **Art Deco/Geometric** | Symmetry, gold lines, repeating patterns, fan shapes |
| **Dark Cosmic** | Deep voids, elemental glows, glass veils, star fields (Arcanea default) |
| **Industrial/Utilitarian** | Monospace, status indicators, panel layouts, data-dense |
| **Soft/Pastel** | Muted tones, gentle gradients, cloud-like shapes, warm light |

### 3. Differentiation (What makes this UNFORGETTABLE?)
- What's the one visual trick, interaction, or composition that makes someone pause?
- What would they screenshot and share?

### 4. Technical Constraints
- Framework requirements (Next.js 16, React 19, Tailwind CSS 3.4)
- Performance budget (Core Web Vitals targets)
- Accessibility requirements (WCAG 2.2 AA)
- Device targets (375px minimum, touch-first)

---

## Tech Stack Standards

### Core Stack
| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router, Turbopack) | 16.1.1 |
| UI Library | React | 19 |
| Language | TypeScript (strict) | 5.5+ |
| Styling | Tailwind CSS | 3.4 |
| Animation | Framer Motion | 12 |
| Icons | Lucide React | latest |
| Variants | CVA (class-variance-authority) | latest |
| Primitives | Radix UI | latest |
| Utilities | clsx + tailwind-merge (via cn()) | latest |

### Code Rules (v0 System Prompt DNA)
These rules are derived from v0's battle-tested standards:

1. **Single file components** — When generating standalone components, keep everything in one file (component, types, variants)
2. **Export default** — Use `export default function ComponentName()` for page components
3. **TypeScript interfaces** — Define prop interfaces above the component
4. **No inline styles** — Everything through Tailwind or CSS custom properties
5. **No `<svg>` elements** — Import from `lucide-react` only
6. **No arbitrary Tailwind** — Use design tokens (`bg-cosmic-deep` not `bg-[#121826]`)
7. **forwardRef + displayName** — On all reusable components
8. **cn() composition** — Use `cn()` from `@/lib/utils` for all conditional classes
9. **Data-driven rendering** — Use arrays/objects for repeated elements, never copy-paste JSX
10. **Complete code** — Never write partial snippets with `// ...rest`. Write COMPLETE code.

### Accessibility Rules (v0 Standard)
1. Semantic HTML always (`<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`)
2. ARIA attributes on all interactive custom elements
3. Alt text on all images (meaningful or `alt=""` for decorative)
4. Minimum 44x44px touch targets (24x24px is WCAG 2.2 minimum, 44px is recommended)
5. WCAG AA contrast ratios (4.5:1 body text, 3:1 large text, 3:1 UI components)
6. `prefers-reduced-motion` support — instant transitions, not removal
7. `prefers-contrast: high` support — solid backgrounds, no blur, thicker borders
8. Focus indicators — `focus-visible:ring-2 focus-visible:ring-arcane-crystal/50`
9. Keyboard navigation — Tab, Enter, Escape, Arrow keys for complex widgets
10. Screen reader announcements — `aria-live` for dynamic content changes

---

## v0 Prompting Framework

When generating components with v0, structure prompts using the **3-input framework**:

```
Build [PRODUCT SURFACE: what components, what data, what actions].
Used by [WHO: specific user persona],
in [WHAT MOMENT: context of use, emotional state, device],
to [WHAT OUTCOME: decision, action, or feeling].

Constraints:
- Platform: [web/mobile/both, specific devices]
- Visual tone: [aesthetic direction from the table above]
- Layout: [full-page/component/section, responsive behavior]
- Must include: [specific features, interactions, states]
- Must avoid: [anti-patterns, unwanted aesthetics]
```

### Example
```
Build a creator profile card with avatar, display name, magic rank badge,
elemental affinity indicator, and "Send Message" action.
Used by fellow creators browsing the Academy roster,
in a discovery moment (exploring who else is creating),
to decide whether to connect with this creator.

Constraints:
- Platform: Web, works at 375px mobile
- Visual tone: Dark cosmic with glass morphism
- Layout: Card component, grid-responsive
- Must include: hover glow effect, rank badge with element color, online indicator
- Must avoid: Generic social card patterns, blue-on-white aesthetics
```

---

## Component Architecture Patterns

### CVA Variant System (Standard)
```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const componentVariants = cva(
  // Base classes (always applied)
  'inline-flex items-center justify-center rounded-lg transition-all',
  {
    variants: {
      variant: {
        crystal: 'border-arcane-crystal/20 text-arcane-crystal bg-arcane-crystal/10 hover:bg-arcane-crystal/20',
        fire: 'border-arcane-fire/20 text-arcane-fire bg-arcane-fire/10 hover:bg-arcane-fire/20',
        void: 'border-arcane-void/20 text-arcane-void bg-arcane-void/10 hover:bg-arcane-void/20',
        gold: 'border-arcane-gold/20 text-arcane-gold bg-arcane-gold/10 hover:bg-arcane-gold/20',
        water: 'border-arcane-water/20 text-arcane-water bg-arcane-water/10 hover:bg-arcane-water/20',
        earth: 'border-arcane-earth/20 text-arcane-earth bg-arcane-earth/10 hover:bg-arcane-earth/20',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'crystal',
      size: 'md',
    },
  }
)

interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
)
Component.displayName = 'Component'

export { Component, componentVariants }
```

### Compound Component Pattern
```tsx
const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('glow-card rounded-2xl', className)} {...props} />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pb-0', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...props} />
))
CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardContent }
```

### Polymorphic Component Pattern (Slot)
```tsx
import { Slot } from '@radix-ui/react-slot'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp ref={ref} className={cn(buttonVariants({ className }))} {...props} />
  }
)
```

---

## Animation Standards

### Import from Library (Never Inline)
```tsx
import {
  cosmicFadeIn, cosmicFadeInUp,
  staggerContainer, staggerItem,
  fadeInViewport,
  cardHover, cardTap,
  springTransition, gentleSpring, bouncySpring,
} from '@/lib/animations'
```

### Spring Physics Reference
| Spring | Stiffness | Damping | Use Case |
|--------|-----------|---------|----------|
| `gentleSpring` | 200 | 20 | Subtle hover states, tooltips |
| `springTransition` | 300 | 20 | Standard interactions |
| `bouncySpring` | 400 | 15 | Playful feedback, success states |

### Timing Rules
- **Micro-interactions**: 150-300ms (never > 300ms for direct feedback)
- **State transitions**: 300-500ms
- **Page entrances**: 500-800ms with stagger
- **Scroll reveals**: Trigger at 20% visibility, play once
- **Stagger gap**: 80ms between items, 100ms delay before start

### Performance Rules
- Only animate `transform`, `opacity`, `filter` (GPU-composited)
- Never animate `width`, `height`, `top`, `left`, `margin`, `padding`
- Use `will-change` sparingly and only during animation
- Disable mouse-tracking effects on touch devices (`@media (hover: none)`)
- Reduce blur values on mobile (glass: 8px, cosmic orbs: 40px)

---

## Quality Gates (Every Output Must Pass)

### Design Quality
- [ ] Aesthetic direction is clear, intentional, and consistent
- [ ] No generic "AI slop" patterns
- [ ] Typography hierarchy uses correct font families
- [ ] Color usage follows dominant accent strategy
- [ ] Layout has visual tension and interest (not just centered cards)

### Code Quality
- [ ] TypeScript compiles with zero errors
- [ ] No `any` types
- [ ] `forwardRef` and `displayName` on all components
- [ ] CVA for variant management
- [ ] `cn()` for class composition
- [ ] Import order: React > Framer Motion > Components > Animations > Utils > Icons

### Accessibility
- [ ] Semantic HTML structure
- [ ] ARIA attributes on custom interactive elements
- [ ] Focus ring on all interactive elements
- [ ] Touch targets >= 44px
- [ ] Color contrast >= 4.5:1 (body) / 3:1 (large text)
- [ ] `prefers-reduced-motion` respected
- [ ] `prefers-contrast: high` fallbacks
- [ ] Keyboard navigation works

### Performance
- [ ] Only GPU-friendly properties animated
- [ ] Glass blur reduced on mobile
- [ ] Mouse effects disabled on touch devices
- [ ] No layout thrashing from animations
- [ ] Images use Next.js `<Image>` with proper sizing

---

## Department Agents

| Agent | File | Role | Invocation |
|-------|------|------|------------|
| **Design Director** | `design-director.md` | Creative vision, aesthetic decisions, anti-slop guardian | `/design-team` |
| **Component Architect** | `component-architect.md` | CVA, compound/polymorphic patterns, React architecture | `/component-forge` |
| **Motion Maestro** | `motion-maestro.md` | Framer Motion, springs, scroll reveals, choreography | `/design-team` |
| **Accessibility Guardian** | `accessibility-guardian.md` | WCAG 2.2, ARIA, keyboard nav, screen readers | `/design-review` |
| **Visual QA** | `visual-qa.md` | Design review, anti-slop detection, cross-device testing | `/design-review` |

### Agent Activation
- `/design-team` — Activates the full department for complex design work
- `/design-review` — Activates Accessibility Guardian + Visual QA for review
- `/component-forge` — Activates Component Architect for building components
- `/v0-generate` — Uses v0 MCP with department standards applied
- `/design-lab-build` — Full Design Lab page creation with all agents

---

## Arcanea Design System Quick Reference

### Colors
```
cosmic-void/deep/surface/raised/elevated/overlay  (6 elevation levels)
arcane-crystal/fire/water/void/gold/earth/wind     (7 elemental accents)
text-primary/secondary/muted/disabled               (4 text levels)
```

### Fonts
```
font-display  → Cinzel       (headings, titles)
font-body     → Crimson Pro  (prose, descriptions)
font-sans     → Inter        (UI, badges, buttons)
font-mono     → JetBrains Mono (code, stats)
```

### Effects
```
glass / glass-strong / glass-subtle         (3 glass tiers)
glow-text / glow-text-strong                (text glow)
text-gradient-crystal/fire/cosmic/gold      (gradient text)
bg-cosmic-mesh / bg-cosmic-stars            (backgrounds)
glow-card / hover-lift / border-gradient    (interactive)
section-divider / shimmer / cosmic-orb      (decorative)
```

### Type Scale
```
text-fluid-xs → text-fluid-hero  (11 responsive sizes)
```

---

*"The interface is a portal between the creator and their vision. Design it as sacred architecture — every proportion deliberate, every surface alive, every interaction an act of creation."*
