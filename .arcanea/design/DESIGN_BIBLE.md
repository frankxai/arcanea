# Arcanea Design Bible v2.0

> The single source of truth for every pixel in the Arcanea universe.
> All other design files DERIVE from this document. If there's a conflict, THIS wins.

---

## Philosophy

Arcanea's visual identity fuses three design lineages:

1. **Apple Liquid Glass** (2025-2026) - Frosted translucency, depth layers, light refraction, environment-aware surfaces
2. **Cosmic Mythology** - Deep void backgrounds, crystalline accents, aurora gradients, celestial motion
3. **Premium SaaS** (Linear, Vercel, Raycast) - Information density, keyboard-first, micro-interactions, respect for whitespace

The result: **Cosmic Glass** - dark, layered, luminous interfaces where every surface breathes and every interaction sparkles.

---

## 1. Color System

### 1.1 Cosmic Palette (Backgrounds & Surfaces)

Six depth levels. Never skip more than 2 levels between adjacent elements.

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `cosmic-void` | `#0b0e14` | 11, 14, 20 | Page background, deepest layer |
| `cosmic-deep` | `#121826` | 18, 24, 38 | Card backgrounds, secondary surfaces |
| `cosmic-surface` | `#1a2332` | 26, 35, 50 | Elevated cards, modals, popovers |
| `cosmic-raised` | `#242f42` | 36, 47, 66 | Hover states, active surfaces |
| `cosmic-elevated` | `#2d3a52` | 45, 58, 82 | Selected states, high emphasis |
| `cosmic-overlay` | `#364562` | 54, 69, 98 | Overlays, tooltips, dropdowns |

### 1.2 Brand Colors

| Token | Hex | Role |
|-------|-----|------|
| `brand-primary` | `#8b5cf6` | Primary actions, buttons, links (Violet) |
| `brand-accent` | `#7fffd4` | Crystal accent, highlights, brand mark |
| `brand-gold` | `#ffd700` | Achievement, premium, wisdom |
| `brand-secondary` | `#78a6ff` | Secondary actions, information, water |

### 1.3 Primary Scale (Violet)

```
50:  #f5f3ff    100: #ede9fe    200: #ddd6fe    300: #c4b5fd
400: #a78bfa    500: #8b5cf6    600: #7c3aed    700: #6d28d9
800: #5b21b6    900: #4c1d95
```

### 1.4 Elemental Accents

| Element | Standard | Bright | Deep | Glow (0.3 alpha) |
|---------|----------|--------|------|-------------------|
| Crystal | `#7fffd4` | `#99ffe0` | `#5ce6b8` | `rgba(127, 255, 212, 0.3)` |
| Fire | `#ff6b35` | `#ff8c5a` | `#d94e1f` | `rgba(255, 107, 53, 0.3)` |
| Water | `#78a6ff` | `#9dbfff` | `#5a8ce6` | `rgba(120, 166, 255, 0.3)` |
| Void | `#9966ff` | `#b38cff` | `#7a4dcc` | `rgba(153, 102, 255, 0.3)` |
| Gold | `#ffd700` | `#ffe44d` | `#ccac00` | `rgba(255, 215, 0, 0.3)` |
| Wind | `#00ff88` | `#33ffaa` | `#00cc6d` | `rgba(0, 255, 136, 0.3)` |
| Earth | `#8b7355` | `#a89070` | `#6e5940` | `rgba(139, 115, 85, 0.3)` |

### 1.5 Text Colors

| Token | Value | WCAG on void | Usage |
|-------|-------|--------------|-------|
| `text-primary` | `#e6eefc` | 14.2:1 (AAA) | Headlines, primary content |
| `text-secondary` | `#9bb1d0` | 7.5:1 (AAA) | Body text, descriptions |
| `text-muted` | `#708094` | 4.8:1 (AA) | Captions, metadata |
| `text-disabled` | `#515b6b` | 3.1:1 | Disabled states only |

### 1.6 Semantic Colors

| Token | Standard | Light | Dark |
|-------|----------|-------|------|
| `success` | `#20cc73` | `#5ae096` | `#18a65c` |
| `warning` | `#ffa500` | `#ffbf4d` | `#cc8400` |
| `error` | `#f52952` | `#f75c7a` | `#cc1f42` |
| `info` | `#26b8e6` | `#5ccde6` | `#1f99bf` |

### 1.7 Accent Distribution Rule

- 80% Cosmic neutrals (void through overlay)
- 10% Text hierarchy
- 5% Crystal accent (brand signature)
- 5% Supporting elements (other elementals, sparingly)

---

## 2. Typography

### 2.1 Typefaces

| Typeface | Role | Variable | Weights |
|----------|------|----------|---------|
| **Cinzel** | Display, ceremonial headings | `--font-display` | 400-900 |
| **Crimson Pro** | Narrative body, long-form | `--font-body` | 200-900 + italic |
| **Inter** | UI elements, interface text | `--font-sans` | 100-900 |
| **JetBrains Mono** | Code, data, technical | `--font-mono` | 100-800 |

**Rules:**
- Cinzel for h1/h2 headings with gravitas
- Crimson Pro for paragraphs > 50 words
- Inter for buttons, labels, navigation, badges, forms
- JetBrains Mono for code blocks and technical data
- Never combine > 2 typefaces in one component

### 2.2 Fluid Type Scale

All sizes use `clamp()` for responsive scaling:

| Token | Min | Preferred | Max | Line Height |
|-------|-----|-----------|-----|-------------|
| `text-xs` | 0.7rem | 0.65rem + 0.25vw | 0.8rem | 1.4 |
| `text-sm` | 0.8rem | 0.75rem + 0.25vw | 0.9rem | 1.5 |
| `text-base` | 0.9rem | 0.85rem + 0.25vw | 1rem | 1.6 |
| `text-lg` | 1.1rem | 1rem + 0.5vw | 1.25rem | 1.5 |
| `text-xl` | 1.25rem | 1.1rem + 0.75vw | 1.5rem | 1.4 |
| `text-2xl` | 1.5rem | 1.25rem + 1.25vw | 2rem | 1.3 |
| `text-3xl` | 1.875rem | 1.5rem + 1.875vw | 2.5rem | 1.2 |
| `text-4xl` | 2.25rem | 1.75rem + 2.5vw | 3rem | 1.1 |
| `text-5xl` | 3rem | 2rem + 5vw | 4.5rem | 1.0 |
| `text-hero` | 3rem | 1.5rem + 7.5vw | 7rem | 0.9 |

### 2.3 Letter Spacing

- Display (Cinzel h1/h2): `-0.02em`
- Subheadings: `-0.01em`
- Body text: `0` (normal)
- Labels/badges: `0.05em`
- All caps: `0.1em`

---

## 3. Glass Effects System

### 3.1 Classic Glass (Glassmorphism)

Three tiers for visual hierarchy:

| Tier | Background | Blur | Border | Usage |
|------|-----------|------|--------|-------|
| `glass-subtle` | `rgba(18, 24, 38, 0.4)` | 8px | `rgba(127, 255, 212, 0.06)` | Hover overlays, secondary |
| `glass` | `rgba(18, 24, 38, 0.65)` | 16px | `rgba(127, 255, 212, 0.12)` | Standard cards, panels |
| `glass-strong` | `rgba(18, 24, 38, 0.85)` | 24px | `rgba(127, 255, 212, 0.18)` | Navigation, modals, dialogs |

### 3.2 Liquid Glass (Apple-inspired, 2026)

The premium glass effect. Surfaces respond to their environment with color sampling and light refraction.

```css
.liquid-glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(40px) saturate(1.8) brightness(1.1);
  -webkit-backdrop-filter: blur(40px) saturate(1.8) brightness(1.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1),
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

.liquid-glass-elevated {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.03) 40%,
    rgba(139, 92, 246, 0.05) 100%
  );
  backdrop-filter: blur(60px) saturate(2.0) brightness(1.15);
  -webkit-backdrop-filter: blur(60px) saturate(2.0) brightness(1.15);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow:
    inset 0 2px 0 rgba(255, 255, 255, 0.15),
    inset 0 -1px 0 rgba(0, 0, 0, 0.15),
    0 16px 48px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.08);
}
```

### 3.3 Iridescent Glass

Prismatic, rainbow-shift effect for premium/featured elements:

```css
.iridescent-glass {
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1) 0%,
    rgba(127, 255, 212, 0.08) 25%,
    rgba(120, 166, 255, 0.1) 50%,
    rgba(255, 215, 0, 0.06) 75%,
    rgba(139, 92, 246, 0.1) 100%
  );
  backdrop-filter: blur(24px) saturate(1.5);
  -webkit-backdrop-filter: blur(24px) saturate(1.5);
  border: 1px solid;
  border-image: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.3),
    rgba(127, 255, 212, 0.3),
    rgba(255, 215, 0, 0.2),
    rgba(139, 92, 246, 0.3)
  ) 1;
  position: relative;
  overflow: hidden;
}

.iridescent-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 45%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 55%,
    transparent 100%
  );
  animation: iridescent-shift 8s ease-in-out infinite;
}

@keyframes iridescent-shift {
  0%, 100% { transform: translateX(-100%) rotate(45deg); }
  50% { transform: translateX(100%) rotate(45deg); }
}
```

### 3.4 Bubble Shine

Spherical light refraction for badges, orbs, and featured elements:

```css
.bubble-shine {
  position: relative;
  background: radial-gradient(
    ellipse at 30% 20%,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.05) 40%,
    transparent 70%
  );
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  box-shadow:
    inset 0 0 30px rgba(255, 255, 255, 0.05),
    0 0 20px rgba(127, 255, 212, 0.1),
    0 8px 32px rgba(0, 0, 0, 0.3);
}

.bubble-shine::after {
  content: '';
  position: absolute;
  top: 8%;
  left: 15%;
  width: 35%;
  height: 20%;
  background: radial-gradient(
    ellipse,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  border-radius: 50%;
  transform: rotate(-15deg);
}
```

### 3.5 Glass Rules

- Always include a subtle border for edge definition
- Glass elements require a meaningful background behind them (mesh, gradient, or content)
- Never stack more than 2 glass layers
- Glass cards use `rounded-2xl` (1rem) or `rounded-3xl` (1.5rem)
- All glass respects `prefers-reduced-motion` (disable blur animations, keep static blur)

---

## 4. Gradient System

### 4.1 Background Gradients

| Token | Definition | Usage |
|-------|-----------|-------|
| `cosmic-mesh` | Triple radial: crystal/void/water at 0.03 alpha | Primary page texture |
| `cosmic-gradient` | 135deg `#0b0e14` to `#1a2332` | Section backgrounds |
| `aurora-gradient` | 135deg violet(0.08), crystal(0.06), gold(0.04) | Atmospheric sections |
| `nebula-gradient` | Radial ellipse from `#1a2332` to `#0b0e14` | Hero backgrounds |

### 4.2 Text Gradients

| Class | From | To | Usage |
|-------|------|-----|-------|
| `text-gradient-crystal` | `#7fffd4` | `#99ffe0` | Primary headings |
| `text-gradient-fire` | `#ff6b35` | `#ffd700` | Energy headings |
| `text-gradient-cosmic` | `#7fffd4` | `#78a6ff` via `#9966ff` | Multi-element |
| `text-gradient-gold` | `#ffd700` | `#ffe44d` | Premium/achievement |
| `text-gradient-brand` | `#8b5cf6` | `#7fffd4` | Brand headings |

### 4.3 Mesh Gradient (Premium Background)

```css
.bg-mesh-gradient {
  background:
    radial-gradient(ellipse at 0% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 100% 0%, rgba(127, 255, 212, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 100%, rgba(120, 166, 255, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 40%);
  background-color: #0b0e14;
}
```

---

## 5. Shadows & Elevation

### 5.1 Glow System

| Token | Value | Usage |
|-------|-------|-------|
| `glow-sm` | `0 0 10px rgba(127, 255, 212, 0.15)` | Subtle emphasis |
| `glow-md` | `0 0 20px rgba(127, 255, 212, 0.25)` | Standard glow |
| `glow-lg` | `0 0 40px rgba(127, 255, 212, 0.35)` | Strong emphasis |
| `glow-xl` | `0 0 60px rgba(127, 255, 212, 0.45)` | Hero/dramatic |
| `glow-brand` | `0 0 20px rgba(139, 92, 246, 0.3)` | Primary button glow |

### 5.2 Elevation Scale

| Level | Shadow | Usage |
|-------|--------|-------|
| `elevation-0` | none | Flat surfaces |
| `elevation-1` | `0 2px 8px rgba(0,0,0,0.2), 0 0 1px rgba(255,255,255,0.05)` | Cards |
| `elevation-2` | `0 4px 16px rgba(0,0,0,0.3), 0 0 1px rgba(255,255,255,0.06)` | Popovers |
| `elevation-3` | `0 8px 32px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.08)` | Modals |
| `elevation-4` | `0 16px 64px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.1)` | Dialogs |

---

## 6. Spacing & Layout

### 6.1 Base Unit

4px grid. All spacing is multiples of 4px.

### 6.2 Section Spacing

| Context | Value | Tailwind |
|---------|-------|----------|
| Section padding | 96px / 128px | `py-24 lg:py-32` |
| Container max | 1280px | `max-w-7xl` |
| Card padding | 24px / 32px | `p-6 lg:p-8` |
| Gap tight | 8px | `gap-2` |
| Gap standard | 16px | `gap-4` |
| Gap large | 32px | `gap-8` |
| Gap section | 64px | `gap-16` |

### 6.3 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 6px (0.375rem) | Badges, small elements |
| `radius-md` | 8px (0.5rem) | Buttons, inputs |
| `radius-lg` | 12px (0.75rem) | Cards, panels |
| `radius-xl` | 16px (1rem) | Large cards, sections |
| `radius-2xl` | 24px (1.5rem) | Feature cards, hero elements |
| `radius-full` | 9999px | Pills, avatars |

### 6.4 Grid Patterns

| Pattern | Columns | Usage |
|---------|---------|-------|
| Feature grid | `1 / md:2 / lg:4` | Feature cards |
| Content grid | `1 / lg:3` | Content sections |
| Split layout | `1 / lg:2` | Text + visual |
| Sidebar | `1 / lg:[280px_1fr]` | App layouts |

---

## 7. Motion & Animation

### 7.1 Principles

1. **Purposeful** - Every animation serves function or emotion
2. **Cosmic** - Float, flow, emanate - never harsh or mechanical
3. **Respectful** - Honor `prefers-reduced-motion` always
4. **Layered** - Stagger for depth; background elements animate slower

### 7.2 Timing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard transitions |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy, playful |
| `ease-cosmic` | `cubic-bezier(0.22, 1, 0.36, 1)` | Smooth, flowing |
| `ease-snappy` | `cubic-bezier(0.2, 0, 0, 1)` | Quick, responsive |

### 7.3 Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `duration-instant` | 100ms | Hover color changes |
| `duration-fast` | 150ms | Button feedback |
| `duration-normal` | 250ms | Standard transitions |
| `duration-smooth` | 400ms | Panel reveals |
| `duration-flowing` | 600ms | Page transitions |
| `duration-cosmic` | 1000ms | Hero animations |

### 7.4 Entrance Animations (Framer Motion)

```typescript
// Cosmic fade in - standard entrance
const cosmicFadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

// Stagger container
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
};

// Stagger item
const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

// Scale in - for modals, popovers
const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
};
```

### 7.5 Ambient Animations (CSS)

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| `float` | 6s | ease-in-out | Floating orbs, decorative |
| `pulse-glow` | 3s | ease-in-out | Active indicators |
| `shimmer` | 2s | linear | Loading states |
| `aurora-flow` | 8s | ease-in-out | Atmospheric backgrounds |
| `cosmic-drift` | 20s | ease-in-out | Background particles |
| `breathe` | 4s | ease-in-out | Subtle element pulse |

### 7.6 Interaction Patterns

| Trigger | Effect | Duration |
|---------|--------|----------|
| Hover (card) | translateY(-4px) + enhanced shadow | 250ms |
| Hover (button) | scale(1.02) + glow | 150ms |
| Active (button) | scale(0.98) | 100ms |
| Focus | Crystal ring 2px offset | instant |
| Page transition | Fade + slide 20px | 400ms |

---

## 8. Icon System

### 8.1 Library

**Primary:** Lucide React - clean, consistent, 1000+ icons
**Custom:** Arcanea elemental symbols (Fire, Water, Earth, Wind, Void/Spirit)

### 8.2 Sizes

| Context | Size | Tailwind |
|---------|------|----------|
| Inline text | 16px | `w-4 h-4` |
| Navigation | 20px | `w-5 h-5` |
| Card headers | 24px | `w-6 h-6` |
| Feature icons | 32px | `w-8 h-8` |
| Hero icons | 48px | `w-12 h-12` |

### 8.3 Rules

- NEVER use emoji as icons
- Icons inherit text color by default
- Active/selected navigation icons use `text-crystal` or `text-brand-primary`
- Icon + text: always 8px gap (`gap-2`)
- Stroke width: 1.5px (Lucide default) for UI, 2px for emphasis

---

## 9. Component Patterns

### 9.1 Buttons

| Variant | Background | Text | Border | Shadow |
|---------|-----------|------|--------|--------|
| **Primary** | `brand-primary` | white | none | `glow-brand` on hover |
| **Secondary** | transparent | `text-secondary` | `cosmic-elevated` | none |
| **Ghost** | transparent | `text-secondary` | none | none |
| **Crystal** | gradient crystal-to-water | `cosmic-void` | none | `glow-sm` |
| **Destructive** | `error` | white | none | error glow on hover |

All buttons: `rounded-lg` (8px), `px-4 py-2`, Inter font, `font-medium`, 150ms transition.

### 9.2 Cards

```
Standard:   glass + rounded-2xl + p-6 + hover-lift + glow-card
Featured:   liquid-glass + rounded-3xl + p-8 + iridescent border on hover
Minimal:    cosmic-deep bg + rounded-xl + p-4 + subtle border
```

### 9.3 Inputs

```
Default:    cosmic-deep bg + cosmic-elevated border + rounded-lg + p-3
Focus:      crystal border glow + ring-2 ring-crystal/20
Error:      error border + error/10 bg tint
Disabled:   cosmic-surface bg + 50% opacity
```

### 9.4 Navigation

```
Top bar:    glass-strong + fixed + h-16 + border-b cosmic-elevated/50
Sidebar:    glass + w-64 + border-r cosmic-elevated/50
Mobile:     glass-strong + full-width slide-down
Active:     text-primary + crystal accent indicator (layoutId animated)
```

### 9.5 Badges

```
Default:    cosmic-raised bg + text-secondary + rounded-full + px-3 py-1 + text-xs
Crystal:    crystal/15 bg + crystal text + crystal/30 border
Fire:       fire/15 bg + fire text + fire/30 border
Premium:    gold/15 bg + gold text + gold/30 border
```

---

## 10. Page Structure

Every Arcanea page follows this hierarchy:

1. **Navigation** - Fixed top, glass-strong, logo left, links center, CTA right
2. **Hero** - Near-full viewport, cosmic mesh + aurora, Cinzel display heading
3. **Sections** - Alternating emphasis, divider between, `py-24 lg:py-32`
4. **CTA** - Strong call-to-action with crystal gradient button
5. **Footer** - Minimal, cosmic-deep, links grid, brand mark

### Section Divider

```css
.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(127, 255, 212, 0.2), transparent);
}
```

---

## 11. Accessibility

### 11.1 Contrast Requirements (WCAG 2.1 AA minimum)

All text/background combinations pre-verified in Section 1.5.

### 11.2 Focus States

- All interactive elements: visible focus ring
- Ring: `2px solid` crystal with `2px offset`
- Keyboard navigation follows visual order
- Skip-to-content link on all pages

### 11.3 Motion

- ALL animations wrapped in `@media (prefers-reduced-motion: no-preference)`
- Reduced motion: instant transitions, no parallax, no floating
- Critical state changes never rely solely on animation

### 11.4 Color Independence

- Never convey meaning through color alone
- Icons, text, or patterns accompany color signals
- Success/error states include icon + text + color

---

## 12. Responsive Breakpoints

| Token | Width | Target |
|-------|-------|--------|
| `sm` | 640px | Large phones, landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large displays |

### Mobile-First Rules

- Touch targets minimum 44px
- No hover-only interactions on mobile
- Glass blur reduced to 12px on mobile (performance)
- Section padding halved on mobile

---

## 13. shadcn/ui Integration

Arcanea uses shadcn/ui as the component foundation with cosmic theme overrides.

### HSL Variables (for shadcn compatibility)

```css
:root {
  --background: 220 30% 5%;          /* cosmic-void */
  --foreground: 218 60% 94%;         /* text-primary */
  --card: 220 30% 8%;                /* cosmic-deep */
  --card-foreground: 218 60% 94%;    /* text-primary */
  --popover: 220 28% 11%;            /* cosmic-surface */
  --popover-foreground: 218 60% 94%; /* text-primary */
  --primary: 262 83% 66%;            /* brand-primary #8b5cf6 */
  --primary-foreground: 0 0% 100%;   /* white */
  --secondary: 220 28% 15%;          /* cosmic-raised */
  --secondary-foreground: 218 35% 70%; /* text-secondary */
  --muted: 220 25% 18%;              /* cosmic-elevated */
  --muted-foreground: 215 20% 50%;   /* text-muted */
  --accent: 160 100% 75%;            /* brand-accent #7fffd4 */
  --accent-foreground: 220 30% 5%;   /* cosmic-void */
  --destructive: 345 90% 55%;        /* error */
  --destructive-foreground: 0 0% 100%;
  --border: 220 25% 18%;             /* cosmic-elevated */
  --input: 220 25% 18%;              /* cosmic-elevated */
  --ring: 262 83% 66%;               /* brand-primary */
  --radius: 0.5rem;
}
```

---

## 14. Anti-Patterns (Never Do)

- Never use raw `#ffffff` for text - use `text-primary` (#e6eefc)
- Never use emoji as icons
- Never hardcode hex values - use CSS variables or Tailwind tokens
- Never skip the cosmic depth ladder (void -> deep -> surface -> raised)
- Never use `Space Grotesk` - it's not in our type system
- Never apply Crystal (#7fffd4) as large background fills
- Never stack > 2 glass layers
- Never use glow effects on body text
- Never create new tokens outside this system
- Never use flat box-shadows - always include the subtle white inset for depth
- Never use `Comic Sans`, `Impact`, or decorative fonts
- Never use bright colors on bright backgrounds

---

## 15. Quick Reference

### CSS Classes Summary

| Class | Effect |
|-------|--------|
| `glass` | Standard glassmorphism |
| `glass-strong` | Heavy glassmorphism |
| `glass-subtle` | Light glassmorphism |
| `liquid-glass` | Apple-style liquid glass |
| `liquid-glass-elevated` | Premium liquid glass |
| `iridescent-glass` | Rainbow-shift prismatic glass |
| `bubble-shine` | Spherical light refraction |
| `glow-card` | Hover-responsive glow |
| `hover-lift` | Hover translateY + shadow |
| `text-gradient-crystal` | Crystal gradient text |
| `text-gradient-fire` | Fire gradient text |
| `text-gradient-cosmic` | Multi-element gradient |
| `text-gradient-gold` | Gold gradient text |
| `text-gradient-brand` | Violet-to-crystal gradient |
| `bg-cosmic-mesh` | Cosmic background texture |
| `bg-mesh-gradient` | Premium mesh gradient |
| `section-divider` | Horizontal gradient line |

### File Locations (Canonical)

| Asset | Location |
|-------|----------|
| **This Bible** | `.arcanea/design/DESIGN_BIBLE.md` |
| Design tokens | `.arcanea/config/design-tokens.yaml` |
| Tailwind config | `tailwind.config.js` |
| Global CSS | `styles/globals.css` |
| Design preset | `packages/arcanea-design-preset.js` |
| Brand guidelines | `ARCANEA_BRAND_GUIDELINES.md` |
| Animation library | `lib/animations.ts` |
| UI components | `components/ui/` |

---

*Arcanea Design Bible v2.0 - February 2026*
*Cosmic Glass: Where Apple Liquid Glass meets mythological depth.*
