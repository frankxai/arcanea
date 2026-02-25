---
name: design-gods
description: "Channel the Design Gods — supreme visual intelligence for arcanea.ai. World-class UI/UX, component architecture, brand precision, and aesthetic excellence across every surface."
triggers:
  - "design-gods"
  - "design gods"
  - "channel design"
  - "visual excellence"
  - "ui architecture"
---

# Design Gods — Supreme Visual Intelligence

> *"Design is not decoration. It is the shape of thinking made visible."*

You are channeling the collective intelligence of the world's greatest designers — Jonathan Ive, Dieter Rams, Paul Rand, Massimo Vignelli, Jony Ive, Susan Kare — filtered through the aesthetic of Apple, Vercel, Linear, Stripe, Figma, and Arcanea itself.

When this skill is active, every design decision must be deliberate, defensible, and excellent.

---

## The Arcanea Design System — v3.0 CANONICAL

### Color Palette (Tailwind tokens — use these ONLY)

```
BACKGROUNDS (depth ladder — always use in sequence):
bg-cosmic-void      #0b0e14   — page base, outermost layer
bg-cosmic-deep      #12151c   — section backgrounds
bg-cosmic-surface   #1a1e2a   — card backgrounds
bg-cosmic-raised    #242838   — elevated cards
bg-cosmic-elevated  #2e3348   — tooltips, popovers
bg-cosmic-overlay   #383e54   — modals, overlays

ARCANE ACCENTS (use sparingly — one per component max):
arcane-crystal      #7fffd4   — primary brand accent (Arcanea teal)
arcane-gold         #ffd700   — premium, achievement, Source gate
arcane-void         #9966ff   — mystery, Crown/Shift gates
arcane-fire         #ff6b35   — energy, Fire gate
arcane-water        #78a6ff   — flow, Flow/Sight gates
arcane-wind         #00ff88   — change, Heart gate

TEXT:
text-primary        #f0f2f5   — headings, primary content
text-secondary      #9ba3b5   — body, descriptions
text-muted          #636b7e   — metadata, labels
text-disabled       #454b5c   — placeholders, disabled
```

### Typography Rules — NON-NEGOTIABLE

```
FONT: Inter EVERYWHERE — no exceptions, no Cinzel, no Crimson Pro
DISPLAY: font-display (Inter, heavy weight 700-900)
BODY: font-sans (Inter, 400-500)
CODE: font-mono (Geist Mono)

SCALE (fluid — use clamp):
text-fluid-xs   clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem)
text-fluid-sm   clamp(0.8rem, 0.75rem + 0.25vw, 0.9rem)
text-fluid-base clamp(0.9rem, 0.85rem + 0.25vw, 1rem)
text-fluid-lg   clamp(1rem, 0.95rem + 0.3vw, 1.125rem)
text-fluid-xl   clamp(1.1rem, 1rem + 0.5vw, 1.3rem)
text-fluid-2xl  clamp(1.25rem, 1.1rem + 0.75vw, 1.6rem)
text-fluid-3xl  clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem)
text-fluid-4xl  clamp(2rem, 1.5rem + 2.5vw, 3.5rem)
text-fluid-5xl  clamp(2.5rem, 1.75rem + 3.75vw, 5rem)

LETTER SPACING:
Eyebrows/Labels: tracking-widest (0.15em) UPPERCASE
Display headings: tracking-tight (-0.02em)
Body: tracking-normal
```

### Glass System (5-tier hierarchy)

```css
/* Tier 1 — Subtle (nav, sidebars) */
.liquid-glass-subtle {
  background: rgba(18, 21, 28, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.05);
}

/* Tier 2 — Standard (cards) */
.liquid-glass {
  background: rgba(18, 21, 28, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06);
}

/* Tier 3 — Elevated (featured cards, panels) */
.liquid-glass-elevated {
  background: rgba(24, 28, 42, 0.75);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.10);
  box-shadow: 0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
}

/* Tier 4 — Premium (hero cards, CTAs) */
.liquid-glass-premium {
  background: rgba(24, 28, 42, 0.85);
  backdrop-filter: blur(32px);
  border: 1px solid rgba(127,255,212,0.15);
  box-shadow: 0 16px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(127,255,212,0.05) inset;
}

/* Tier 5 — Iridescent (special moments) */
.liquid-glass-iridescent {
  background: linear-gradient(135deg, rgba(127,255,212,0.05), rgba(153,102,255,0.05));
  backdrop-filter: blur(40px);
  border: 1px solid rgba(127,255,212,0.20);
  box-shadow: 0 20px 80px rgba(0,0,0,0.7), 0 0 60px rgba(127,255,212,0.05);
}
```

---

## Component Patterns

### Section Structure (universal)

```tsx
<section className="relative py-24 md:py-32">
  {/* Optional divider */}
  <div className="absolute top-0 inset-x-0 section-glow-divider" />

  <div className="container mx-auto px-4 max-w-6xl">
    {/* Eyebrow */}
    <p className="text-xs tracking-widest uppercase text-text-muted mb-4 font-medium">
      Section Label
    </p>

    {/* Headline */}
    <h2 className="font-display text-fluid-3xl md:text-fluid-4xl font-bold text-text-primary mb-4">
      Title with <span className="text-gradient-crystal">Accent Word</span>
    </h2>

    {/* Sub-copy (max 2 lines) */}
    <p className="text-text-secondary text-fluid-base max-w-xl">
      Supporting sentence that explains the value proposition concisely.
    </p>
  </div>
</section>
```

### Card Pattern (standard)

```tsx
<div
  className="group relative rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1"
  style={{
    background: "rgba(18, 21, 28, 0.6)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)"
  }}
>
  {/* Top highlight line */}
  <div className="absolute inset-x-0 top-0 h-px opacity-60"
    style={{ background: "linear-gradient(90deg, transparent, rgba(127,255,212,0.4), transparent)" }} />

  {/* Hover glow */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
    style={{ background: "radial-gradient(600px at 50% -30%, rgba(127,255,212,0.06), transparent 70%)" }} />

  {/* Content */}
  <div className="relative z-10">
    {/* Accent marker */}
    <div className="w-6 h-0.5 rounded-full mb-4" style={{ background: "#7fffd4" }} />
    <h3 className="font-display text-lg font-semibold text-text-primary mb-2">Title</h3>
    <p className="text-text-secondary text-sm leading-relaxed">Description</p>
  </div>
</div>
```

### Image Card (with background photo)

```tsx
<div className="group relative rounded-2xl overflow-hidden aspect-video">
  <Image src="/gallery/premium/..." alt="" fill className="object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-500" />
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14cc] to-transparent" />
  {/* Content always at bottom */}
  <div className="absolute inset-x-0 bottom-0 p-6 z-10">
    <h3 className="text-xl font-bold text-text-primary mb-1">Title</h3>
    <p className="text-text-secondary text-sm">Description</p>
  </div>
</div>
```

### Button System

```tsx
{/* Primary — crystal CTA */}
<button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
  bg-arcane-crystal text-cosmic-void
  hover:bg-arcane-crystal-bright hover:shadow-[0_0_24px_rgba(127,255,212,0.4)]
  transition-all duration-200 min-h-[48px]">
  Build Your Universe
</button>

{/* Secondary — ghost */}
<button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
  border border-white/[0.10] text-text-primary
  hover:border-arcane-crystal/30 hover:text-arcane-crystal hover:bg-arcane-crystal/[0.04]
  transition-all duration-200 min-h-[48px]">
  Explore the Lore
</button>

{/* Minimal — text link */}
<button className="text-arcane-crystal text-sm font-medium hover:underline decoration-arcane-crystal/50 underline-offset-4 transition-all">
  Read more →
</button>
```

### Text Gradient System

```tsx
{/* Crystal (primary) */}
<span className="text-gradient-crystal">text</span>
/* → background: linear-gradient(135deg, #7fffd4, #5ce6b8) */

{/* Cosmic (multicolor) */}
<span className="text-gradient-cosmic">text</span>
/* → background: linear-gradient(135deg, #7fffd4, #9966ff) */

{/* Aurora (animated) */}
<span className="text-gradient-aurora">text</span>
/* → crystal → void → gold loop, 5s animation */

{/* Fire */}
<span className="text-gradient-fire">text</span>
/* → #ff6b35 → #ffd700 */

{/* Void */}
<span className="text-gradient-void">text</span>
/* → #9966ff → #7fffd4 */
```

---

## Icon System — Strict Rules

**NEVER use lucide-react** — it is banned from all production pages.

**Allowed:**
1. `@phosphor-icons/react` — weight="thin" for decorative, weight="regular" for functional
2. Inline SVG — for custom marks and logos
3. CSS shapes — `rounded-full`, pulse dots for simple indicators
4. Typography symbols — `◈`, `→`, `·`, `I–X` Roman numerals, `⌘`, `⏎`
5. HTML entities — `&rarr;`, `&ndash;`, `&mdash;`

**Pattern:**
```tsx
import { ArrowRight, MagnifyingGlass } from '@phosphor-icons/react'
// Always explicit weight
<ArrowRight weight="thin" size={16} className="text-arcane-crystal" />
```

---

## Layout Principles

### Spacing Scale (always use Tailwind multiples of 4)
- Component internal: `p-4`, `p-6`, `p-8`
- Section padding: `py-16 md:py-24 lg:py-32`
- Stack gaps: `space-y-4` / `gap-4` for tight, `gap-6` / `gap-8` for cards
- Max widths: `max-w-4xl` content, `max-w-6xl` wide grid, `max-w-7xl` full-width

### Grid System
```tsx
{/* 2-col: text + image */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

{/* 3-col bento */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

{/* 4-col stats */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

{/* Masonry-style: use CSS columns */}
<div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
```

### Responsive Breakpoints
- Mobile-first always
- `sm:` 640px — 2-col unlocks
- `md:` 768px — 3-col grids, larger type
- `lg:` 1024px — full layouts, sidebars
- `xl:` 1280px — max container, large hero text

---

## Animation System

### Entrance (scroll-reveal)
```tsx
// Standard entrance
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
>

// Slide from left
initial={{ opacity: 0, x: -30 }}
// Slide from right
initial={{ opacity: 0, x: 30 }}
// Scale up
initial={{ opacity: 0, scale: 0.95 }}
```

### Hover States
```tsx
// Lift (cards)
className="transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"

// Glow (buttons)
className="hover:shadow-[0_0_24px_rgba(127,255,212,0.4)]"

// Scale (icons, thumbnails)
whileHover={{ scale: 1.05 }}
```

### Ambient (always-on)
```tsx
// Floating orb
className="animate-float-slow"

// Pulsing dot
className="animate-pulse w-1.5 h-1.5 rounded-full bg-arcane-crystal"

// Constellation
className="animate-constellation-pulse"
```

---

## Design Anti-Patterns — Never Do These

1. **Lucide icons** — BANNED
2. **Cinzel font** — BANNED
3. **Flat solid color backgrounds** — always use glass system
4. **Raw hex colors in className** — use Tailwind tokens
5. **Emoji as UI elements** — use Phosphor icons or CSS
6. **Long paragraphs (>3 lines) in cards** — truncate or remove
7. **Centered text in long paragraphs** — left-align body text
8. **Missing hover states** — every interactive element needs feedback
9. **Skipping backdrop-filter** on glass — `backdrop-filter: blur()` is mandatory
10. **Non-fluid typography** — use `text-fluid-*` classes for all text

---

## Design Quality Checklist

Before committing any UI work:

- [ ] All icons are Phosphor (thin/regular) or inline SVG — zero lucide-react
- [ ] All text uses Inter via `font-display` or `font-sans`
- [ ] All backgrounds use the glass system or cosmic depth ladder
- [ ] All interactive elements have hover/focus states
- [ ] All text gradients use the defined classes
- [ ] Mobile layout tested (stack correctly at 375px)
- [ ] Images use `next/image` with proper `sizes` prop
- [ ] No raw hex values in className (use Tailwind tokens)
- [ ] Scroll-reveal via `useInView` on entry sections
- [ ] At least one premium image per major section

---

## The Design Gods Speak

> "Simplicity is not the absence of clutter. It is the presence of clarity."

> "Every pixel is a decision. Every decision reveals your values."

> "If the user has to think about what to do next, you have already failed."

> "Dark mode is not a feature. For Arcanea, it is the only mode. Design for the void."

> "Glass is not decoration. It is the metaphor of intelligence — you can see through it, but it shapes what you see."

> "The best design creates emotion before thought."
