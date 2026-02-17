# Arcanea Brand Guidelines 2026

> *"Enter seeking, leave transformed, return whenever needed."*

---

## Table of Contents

1. [Foundations](#foundations)
   - [Logo](#logo)
   - [Typography](#typography)
   - [Color](#color)
   - [Accessibility](#accessibility)
2. [Brand Identity](#brand-identity)
   - [Brand Attributes](#brand-attributes)
   - [Voice & Tone](#voice--tone)
   - [Co-Branding](#co-branding)
3. [Graphic Elements](#graphic-elements)
   - [Glass Morphism](#glass-morphism)
   - [Iconography](#iconography)
   - [Illustration & Textures](#illustration--textures)
   - [Layouts](#layouts)
4. [Brand in Action](#brand-in-action)
   - [Web](#web)
   - [Social](#social)
   - [Presentations](#presentations)
5. [Motion Identity](#motion-identity)
   - [Principles](#motion-principles)
   - [Animation Library](#animation-library)
6. [Elemental Themes](#elemental-themes)

---

## Foundations

### Logo

#### The Arcanea Mark

The Arcanea logomark is a crystalline spark symbol rendered in a gradient from Crystal (#7fffd4) to Water (#78a6ff). It represents the moment of creative ignition where potential becomes reality.

**Logo Components:**
| Component | Usage |
|-----------|-------|
| **Spark Mark** | Standalone icon for established contexts (favicons, app icons, badges) |
| **Wordmark Lockup** | Spark + "Arcanea" in Cinzel typeface, for primary brand presence |
| **Product Lockups** | "Arcanea AI", "Arcanea ACOS", "Arcanea Studio" - for product-specific contexts |

**Logo Specifications:**
- Spark mark: Rounded square container (border-radius: 0.75rem) with gradient fill
- Wordmark: Cinzel font, tracking normal, white (#e6eefc) on dark backgrounds
- Badge: "AI" label in Crystal color, 10px font, pill shape

**Clear Space:**
- Minimum clear space: 1x the spark mark width on all sides
- Minimum size: 24px for spark mark alone, 120px for full lockup

**Color Variations:**
| Context | Mark | Wordmark |
|---------|------|----------|
| Dark background (primary) | Crystal-to-Water gradient | White (#e6eefc) |
| Light background | Crystal-to-Water gradient | Cosmic Void (#0b0e14) |
| Monochrome dark | White | White |
| Monochrome light | Cosmic Void | Cosmic Void |

**Logo Don'ts:**
- Don't rearrange or separate logo elements
- Don't apply effects (drop shadows, outer glows, bevels)
- Don't distort, stretch, or rotate the mark
- Don't place on busy backgrounds without sufficient contrast
- Don't substitute Guardian illustrations for the logo
- Don't use old color values or unofficial gradients
- Don't modify the corner radius of the spark container

---

### Typography

#### Type System Overview

Arcanea's typography bridges the mythic and the modern. Four typefaces serve distinct roles, creating a hierarchy that moves from the ceremonial to the functional.

#### Primary Typefaces

| Typeface | Role | CSS Variable | Weight Range |
|----------|------|-------------|--------------|
| **Cinzel** | Display / Ceremonial | `--font-cinzel` | 400-900 |
| **Crimson Pro** | Body / Narrative | `--font-crimson-pro` | 200-900 + italic |
| **Inter** | UI / Interface | `--font-inter` | 100-900 |
| **JetBrains Mono** | Code / Data | `--font-jetbrains` | 100-800 |

**Cinzel** (Display): Reserved for page titles, hero headings, section names, and any text that carries ceremonial weight. Cinzel evokes ancient inscriptions while remaining highly legible at large sizes.

**Crimson Pro** (Body): The narrative voice. Used for long-form text, descriptions, and any content meant to be read at length. Its serif design provides warmth and readability.

**Inter** (UI): The workhorse. Buttons, labels, navigation, badges, form elements, and interface text. Optimized for screen rendering at all sizes.

**JetBrains Mono** (Code): Terminal output, code blocks, data displays, skill definitions, and technical specifications.

#### Fluid Type Scale

All typography uses fluid scaling via `clamp()` to adapt from mobile to large displays:

| Token | Min | Preferred | Max | Line Height | Usage |
|-------|-----|-----------|-----|-------------|-------|
| `fluid-xs` | 0.7rem | 0.65rem + 0.25vw | 0.8rem | 1.4 | Captions, badges |
| `fluid-sm` | 0.8rem | 0.75rem + 0.25vw | 0.9rem | 1.5 | Small labels |
| `fluid-base` | 0.9rem | 0.85rem + 0.25vw | 1rem | 1.6 | Body text |
| `fluid-lg` | 1.1rem | 1rem + 0.5vw | 1.25rem | 1.5 | Subheadings |
| `fluid-xl` | 1.25rem | 1.1rem + 0.75vw | 1.5rem | 1.4 | Section labels |
| `fluid-2xl` | 1.5rem | 1.25rem + 1.25vw | 2rem | 1.3 | Section titles |
| `fluid-3xl` | 1.875rem | 1.5rem + 1.875vw | 2.5rem | 1.2 | Page headings |
| `fluid-4xl` | 2.25rem | 1.75rem + 2.5vw | 3rem | 1.1 | Major headings |
| `fluid-5xl` | 3rem | 2rem + 5vw | 4.5rem | 1.0 | Hero headings |
| `fluid-6xl` | 3.75rem | 2.5rem + 6.25vw | 6rem | 0.95 | Display text |
| `fluid-hero` | 3rem | 1.5rem + 7.5vw | 7rem | 0.9 | Hero titles (letter-spacing: -0.02em) |

#### Typography Rules

**Do:**
- Use Cinzel for headings that deserve presence and gravitas
- Use Crimson Pro for any text longer than ~50 words
- Use Inter for all interface elements, navigation, and labels
- Allow fluid scaling to handle responsive sizing
- Use `font-semibold` (600) for emphasis in UI text

**Don't:**
- Don't use Cinzel for body text or buttons
- Don't use Crimson Pro for navigation or badges
- Don't manually set font sizes outside the fluid scale
- Don't combine more than 2 typefaces in a single component
- Don't use light weights (< 400) on dark backgrounds at small sizes

---

### Color

#### Philosophy

Arcanea's color system emerges from darkness. Our palette begins in the cosmic void and builds toward crystalline light, reflecting the creative journey from potential to manifestation.

#### Cosmic Palette (Backgrounds & Surfaces)

The foundation. These neutrals establish the depth layers of our interface.

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `cosmic-void` | #0b0e14 | 11, 14, 20 | Page background, deepest layer |
| `cosmic-deep` | #121826 | 18, 24, 38 | Card backgrounds, secondary surfaces |
| `cosmic-surface` | #1a2332 | 26, 35, 50 | Elevated cards, modals |
| `cosmic-raised` | #242f42 | 36, 47, 66 | Hover states, active surfaces |
| `cosmic-elevated` | #2d3a52 | 45, 58, 82 | Selected states, high emphasis |
| `cosmic-overlay` | #364562 | 54, 69, 98 | Overlays, tooltips, dropdowns |

**Progression Rule:** Surface layers ascend from void to overlay. Never skip more than 2 levels (e.g., don't place `cosmic-overlay` directly on `cosmic-void`).

#### Elemental Accents

The Five Elements of Arcanea, each with a standard, bright, and deep variant:

| Element | Standard | Bright | Deep | Domain |
|---------|----------|--------|------|--------|
| **Crystal** | #7fffd4 | #99ffe0 | #5ce6b8 | Primary accent, creation, clarity |
| **Fire** | #ff6b35 | #ff8c5a | #d94e1f | Energy, transformation, passion |
| **Water** | #78a6ff | #9dbfff | #5a8ce6 | Flow, knowledge, serenity |
| **Void** | #9966ff | #b38cff | #7a4dcc | Mystery, potential, depth |
| **Gold** | #ffd700 | #ffe44d | #ccac00 | Achievement, wisdom, premium |
| **Wind** | #00ff88 | #33ffaa | #00cc6d | Freedom, speed, nature |
| **Earth** | #8b7355 | #a89070 | #6e5940 | Stability, grounding, warmth |

**Hero Color:** Crystal (#7fffd4) is Arcanea's signature color. It should be the dominant accent in most brand applications, grounded by the cosmic palette and white text.

**Accent Distribution (80/10/5/5 Rule):**
- 80% Cosmic neutrals (void through surface)
- 10% Text colors (primary through muted)
- 5% Crystal accent (primary brand color)
- 5% Supporting elements (other elemental colors used sparingly)

#### Text Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `text-primary` | #e6eefc | 230, 238, 252 | Headlines, primary content |
| `text-secondary` | #9bb1d0 | 155, 177, 208 | Body text, descriptions |
| `text-muted` | #708094 | 112, 128, 148 | Captions, metadata |
| `text-disabled` | #515b6b | 81, 91, 107 | Disabled states only |

#### Semantic Colors

| Token | Default | Light | Dark | Usage |
|-------|---------|-------|------|-------|
| `success` | #20cc73 | #5ae096 | #18a65c | Positive actions, confirmations |
| `warning` | #ffa500 | #ffbf4d | #cc8400 | Caution, attention needed |
| `error` | #f52952 | #f75c7a | #cc1f42 | Errors, destructive actions |
| `info` | #26b8e6 | #5ccde6 | #1f99bf | Informational, neutral attention |

#### Glow System

Glows create the magical atmosphere. Each elemental color has a glow variant:

| Token | Value | Usage |
|-------|-------|-------|
| `glow-sm` | 0 0 10px rgba(127, 255, 212, 0.2) | Subtle emphasis |
| `glow-md` | 0 0 20px rgba(127, 255, 212, 0.3) | Standard glow |
| `glow-lg` | 0 0 40px rgba(127, 255, 212, 0.4) | Strong emphasis |
| `glow-xl` | 0 0 60px rgba(127, 255, 212, 0.5) | Hero/dramatic |
| `glow-crystal` | Crystal double-layer | Crystal-specific glow |
| `glow-fire` | Fire double-layer | Fire-specific glow |
| `glow-void` | Void double-layer | Void-specific glow |
| `glow-gold` | Gold double-layer | Gold-specific glow |

#### Gradient System

| Token | Definition | Usage |
|-------|-----------|-------|
| `arcane-gradient` | Radial crystal glow from top | Page hero backgrounds |
| `energy-gradient` | 45deg fire-water-void-gold | High-energy elements |
| `cosmic-gradient` | 135deg void-to-cosmic | Depth backgrounds |
| `portal-gradient` | Radial crystal intense | Portals, focal points |
| `aurora-gradient` | 135deg multi-element | Atmospheric backgrounds |
| `gold-shimmer` | Horizontal gold sweep | Premium accents |
| `crystal-shimmer` | Horizontal crystal sweep | Loading states |

#### Color Don'ts

- Don't use Crystal (#7fffd4) as a background fill for large areas
- Don't place light text on bright elemental colors
- Don't mix more than 3 elemental accents in one component
- Don't use raw white (#ffffff) for text; always use `text-primary` (#e6eefc)
- Don't apply glow effects to body text
- Don't create new color tokens outside this system

---

### Accessibility

#### Contrast Requirements

All text must meet WCAG 2.1 AA standards:

| Combination | Contrast Ratio | Status |
|-------------|---------------|--------|
| `text-primary` on `cosmic-void` | 14.2:1 | AAA |
| `text-primary` on `cosmic-deep` | 11.8:1 | AAA |
| `text-secondary` on `cosmic-void` | 7.5:1 | AAA |
| `text-secondary` on `cosmic-deep` | 6.2:1 | AA |
| `text-muted` on `cosmic-void` | 4.8:1 | AA |
| `arcane-crystal` on `cosmic-void` | 10.1:1 | AAA |
| `arcane-crystal` on `cosmic-deep` | 8.4:1 | AAA |

#### Focus States

- All interactive elements must have visible focus indicators
- Focus rings use `arcane-crystal` with 2px offset
- Keyboard navigation order must follow visual layout
- Skip-to-content links provided on all pages

#### Motion Preferences

- All animations respect `prefers-reduced-motion`
- Critical state changes must not rely solely on animation
- Page transitions degrade to instant without motion

---

## Brand Identity

### Brand Attributes

Arcanea's personality is defined by four core attributes:

| Attribute | Description | In Practice |
|-----------|-------------|-------------|
| **Mythic** | Ancient wisdom meets future technology | Cinzel typography, cosmic palette, Gate references |
| **Empowering** | Tools that amplify creative potential | Clear CTAs, progress tracking, achievement system |
| **Inclusive** | Universal truths, no barriers to entry | Accessible design, multiple entry points, welcoming language |
| **Transformative** | Every interaction should create change | Before/after states, journey metaphors, growth tracking |

**The Arcanea Promise:** Every interaction should move the user toward clarity about their creative vision, courage to pursue it, tools to manifest it, and community to support it.

### Voice & Tone

#### Voice (Constant)

Arcanea's voice is **elevated but accessible, mythic but practical**. We speak with the authority of ancient wisdom and the warmth of a trusted mentor.

| Principle | Description | Example |
|-----------|-------------|---------|
| **Wisdom without pretension** | Share deep truths in plain language | "Your creative blocks aren't failures. They're Gates waiting to open." |
| **Action over abstraction** | Every insight should be usable | "Try this: Write for 10 minutes without editing. Let Fire guide your hand." |
| **Respect for the journey** | Honor where creators are now | "Whether you're an Apprentice or an Archmage, this Academy welcomes you." |
| **Specific magic, not vague mysticism** | Ground the mythology in practice | "The Second Gate (Flow, 417 Hz) governs creativity and emotional expression." |

#### Tone (Variable)

Tone shifts by context while voice remains constant:

| Context | Tone | Example |
|---------|------|---------|
| **Landing page** | Inspirational, grand | "Where creators manifest their visions" |
| **Documentation** | Clear, precise | "The ACOS routes tasks through seven creative modes" |
| **Error states** | Supportive, guiding | "The path forward isn't always clear. Let's try another approach." |
| **Achievement** | Celebratory, affirming | "Gate opened. Your creative power deepens." |
| **Onboarding** | Welcoming, patient | "Every Luminor began as an Apprentice. Your journey starts here." |

#### Writing Guidelines

**Do:**
- Use Arcanea terminology naturally (Gates, Elements, Guardians)
- Write in second person ("you" not "users")
- Keep sentences under 20 words when possible
- Lead with the benefit, not the feature
- Use active voice

**Don't:**
- Don't overload with mythology in functional contexts
- Don't use jargon without context
- Don't be condescending about skill levels
- Don't use "just" or "simply" (implies something should be easy)
- Don't write walls of text; use structure and whitespace

### Co-Branding

When Arcanea appears alongside other brands:

- Arcanea logo should never be smaller than the partner's
- Maintain full clear space between marks
- Use the monochrome logo variant when brand colors might clash
- Always include the "AI" badge in product lockups
- Partner logos must not be placed inside Arcanea UI elements

---

## Graphic Elements

### Glass Morphism

Glass effects are Arcanea's signature UI treatment. Three tiers create visual hierarchy:

| Class | Background | Blur | Border | Usage |
|-------|-----------|------|--------|-------|
| `glass-subtle` | rgba(18, 24, 38, 0.4) | 8px | arcane-crystal/8 | Hover overlays, secondary |
| `glass` | rgba(18, 24, 38, 0.7) | 16px | arcane-crystal/15 | Standard cards, panels |
| `glass-strong` | rgba(18, 24, 38, 0.85) | 20px | arcane-crystal/20 | Navigation, modals, dialogs |

**Glass Rules:**
- Always include a subtle border for edge definition
- Glass elements require a meaningful background (cosmic mesh, gradient, or image)
- Don't stack more than 2 glass layers
- Glass cards use `rounded-3xl` (1.5rem) border radius

### Iconography

**Icon Library:** Lucide React (primary), custom Arcanea icons for elemental symbols.

| Context | Size | Color |
|---------|------|-------|
| Navigation | 20px (w-5 h-5) | text-secondary, active: arcane-crystal |
| Card headers | 20-24px | Elemental color matching section |
| Hero features | 24-32px | text-primary or arcane-crystal |
| Badges/labels | 12-16px | Inherits text color |

### Illustration & Textures

**Cosmic Mesh:** The primary background texture. A dark gradient overlay with subtle grid patterns that evoke star maps and constellations.

```css
.bg-cosmic-mesh {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(127, 255, 212, 0.03) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(153, 102, 255, 0.03) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(120, 166, 255, 0.03) 0%, transparent 50%);
}
```

**Cosmic Stars:** Animated particles for hero sections and feature highlights.

**Section Dividers:** Horizontal gradient lines using `section-divider` class:
```css
linear-gradient(90deg, transparent, rgba(127, 255, 212, 0.3), transparent)
```

### Layouts

#### Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| Standard | 4px base (Tailwind default) | Component internals |
| Section padding | `py-24 lg:py-32` | Between major sections |
| Container max | 1280px (max-w-7xl) | Content width |
| Card padding | `p-6 lg:p-8` | Card internals |
| Gap small | `gap-2` (8px) | Tight groupings |
| Gap standard | `gap-4` (16px) | Standard spacing |
| Gap large | `gap-8` (32px) | Section internals |

#### Grid Patterns

| Pattern | Implementation | Usage |
|---------|---------------|-------|
| Feature grid | `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` | Feature cards |
| Content grid | `grid-cols-1 lg:grid-cols-3` | Content sections |
| Split layout | `grid-cols-1 lg:grid-cols-2` | Text + visual |
| Full width | `max-w-7xl mx-auto` | Section containers |

---

## Brand in Action

### Web

#### Page Structure

Every Arcanea page follows this hierarchy:

1. **Navigation** - Fixed, glass-strong, collapses on scroll
2. **Hero** - Full viewport or near-full, cosmic mesh background, gradient heading
3. **Sections** - Alternating left/right emphasis, `section-divider` between
4. **CTA** - Strong call-to-action with Crystal gradient button
5. **Footer** - Minimal, cosmic-deep background

#### Component Patterns

| Component | Treatment |
|-----------|-----------|
| **Cards** | `glass rounded-3xl`, `glow-card` on hover, `hover-lift` |
| **Buttons (primary)** | Crystal-to-Water gradient, `cosmic-void` text, `rounded-xl`, `shadow-glow-sm` |
| **Buttons (secondary)** | Ghost variant, `text-secondary` to white on hover |
| **Badges** | `variant="crystal"`, small text, pill shape |
| **Inputs** | `glass-subtle`, crystal border on focus |
| **Headings** | Cinzel display, `text-gradient-crystal` for emphasis |

#### Gradient Text

Four gradient text classes for headings:

| Class | Colors | Usage |
|-------|--------|-------|
| `text-gradient-crystal` | Crystal to Crystal-bright | Primary headings |
| `text-gradient-fire` | Fire to Gold | Energy/transformation |
| `text-gradient-cosmic` | Crystal to Water to Void | Multi-element |
| `text-gradient-gold` | Gold to Gold-bright | Premium/achievement |

### Social

#### Profile Elements
- Avatar: Spark mark on cosmic-void background
- Banner: Cosmic mesh with arcane-gradient overlay
- Bio: Cinzel for brand name, Inter for description

#### Post Templates
- Announcements: Crystal gradient header, cosmic card
- Quotes: Crimson Pro italic, crystal accent bar
- Features: Screenshot with glass overlay caption
- Tips: Numbered with elemental icon per step

#### Platform Adaptations

| Platform | Adaptation |
|----------|------------|
| **Twitter/X** | Cosmic-void backgrounds, crystal accent, Inter for readability |
| **LinkedIn** | More muted cosmic palette, professional tone, Inter primary |
| **Instagram** | Full cosmic visual treatments, Cinzel display, rich gradients |
| **Discord** | Crystal accent on dark theme, monospace for code/skills |

### Presentations

#### Slide Templates
- **Title slide:** Cosmic mesh, centered Cinzel heading, crystal gradient
- **Content slide:** Cosmic-deep background, left-aligned, Inter body
- **Feature slide:** Split layout, glass card on right, visual on left
- **Quote slide:** Full cosmic with Crimson Pro italic, centered
- **Data slide:** Cosmic-surface, clean grid, elemental color coding

---

## Motion Identity

### Motion Principles

1. **Purposeful** - Every animation serves a functional or emotional purpose
2. **Cosmic** - Movements evoke floating, flowing, and emanating - never harsh or mechanical
3. **Respectful** - Always honor `prefers-reduced-motion`; animations enhance, never block
4. **Layered** - Stagger animations to create depth; items further back animate slower

### Animation Library

#### Entrance Animations (Framer Motion)

| Variant | Effect | Duration | Usage |
|---------|--------|----------|-------|
| `cosmicFadeIn` | Opacity 0 to 1 | 0.6s | General fade-in |
| `cosmicFadeInUp` | Fade + translateY(30px) | 0.6s | Section content |
| `cosmicFadeInDown` | Fade + translateY(-30px) | 0.6s | Dropdowns, tooltips |
| `fadeInViewport` | Triggers on scroll into view | 0.5s | Scroll-reveal sections |

#### Container Patterns

| Variant | Stagger Delay | Usage |
|---------|--------------|-------|
| `staggerContainer` | 0.1s between children | Standard card grids |
| `staggerContainerFast` | 0.05s between children | Navigation, lists |
| `staggerItem` | Individual child animation | Paired with container |

#### Ambient Animations (CSS)

| Animation | Duration | Usage |
|-----------|----------|-------|
| `float` | 6s ease-in-out infinite | Floating elements, orbs |
| `pulse-glow` | 2s infinite | Active indicators |
| `shimmer` | 3s linear infinite | Loading states |
| `rotate-slow` | 20s linear infinite | Background decorations |
| `cosmic-pulse` | 4s infinite | Hero backgrounds |
| `aurora` | 8s infinite | Atmospheric backgrounds |
| `glow-breathe` | 3s infinite | Subtle emphasis |

#### Interaction Animations

| Trigger | Effect | Duration |
|---------|--------|----------|
| Hover (cards) | `hover-lift`: translateY(-4px) + shadow | 300ms |
| Hover (buttons) | Scale 1.02 + enhanced shadow | 200ms |
| Click | Scale 0.98 | 100ms |
| Nav indicator | `layoutId` spring animation | spring(350, 30) |
| Page transition | Fade + slide | 300ms |
| Mobile menu | Height expand + stagger items | 300ms |

#### Elemental Animations

| Element | Animations | Usage |
|---------|-----------|-------|
| Water | `water-flow`, `wave`, `ripple` | Water-themed sections |
| Fire | `fire-flicker`, `flame`, `ember` | Fire-themed sections |
| Light | `prism-rotate`, `radial-pulse` | Creation/achievement |

---

## Elemental Themes

Each of the Five Elements can serve as a section or page theme:

### Crystal (Primary)

The default Arcanea theme. Crystal represents creation, clarity, and the moment of manifestation.

- **Primary accent:** #7fffd4
- **Glow:** rgba(127, 255, 212, 0.5)
- **Text gradient:** Crystal to Crystal-bright
- **Glass border:** rgba(127, 255, 212, 0.15)
- **Usage:** Homepage, general brand, primary product surfaces

### Fire

Transformation, energy, and creative passion.

- **Primary accent:** #ff6b35
- **Glow:** rgba(255, 107, 53, 0.5)
- **Usage:** Achievement, challenges, creation modes, intense actions

### Water

Knowledge, flow, and healing.

- **Primary accent:** #78a6ff
- **Glow:** rgba(120, 166, 255, 0.5)
- **Usage:** Learning, documentation, calm states, contemplation

### Void

Mystery, potential, and the unknown.

- **Primary accent:** #9966ff
- **Glow:** rgba(153, 102, 255, 0.5)
- **Usage:** Advanced features, depth content, Nero-themed sections

### Gold

Wisdom, achievement, and premium experiences.

- **Primary accent:** #ffd700
- **Glow:** rgba(255, 215, 0, 0.5)
- **Usage:** Premium tiers, achievements, master-level content

---

## Academy Themes

Three Academy sub-brands maintain visual connection to the parent while expressing their own identity:

| Academy | Primary | Accent | Domain |
|---------|---------|--------|--------|
| **Atlantean** | #0f3566 | #00e6e6 | Water, knowledge, deep wisdom |
| **Draconic** | #d92952 | #ffc61a | Fire, power, transformation |
| **Creation** | #ffcc33 | #ffffff | Light, synthesis, manifestation |

Each Academy theme should use the standard cosmic palette for backgrounds but replace Crystal with their own accent color for interactive elements and highlights.

---

## Quick Reference

### CSS Utility Classes

| Class | Effect |
|-------|--------|
| `glass` | Standard glass morphism |
| `glass-strong` | Heavy glass morphism |
| `glass-subtle` | Light glass morphism |
| `glow-card` | Hover-responsive glow effect |
| `hover-lift` | Hover translateY + shadow |
| `text-gradient-crystal` | Crystal gradient text |
| `text-gradient-fire` | Fire gradient text |
| `text-gradient-cosmic` | Multi-element gradient text |
| `text-gradient-gold` | Gold gradient text |
| `bg-cosmic-mesh` | Cosmic background texture |
| `bg-cosmic-stars` | Animated star particles |
| `section-divider` | Horizontal gradient line |
| `border-gradient` | Gradient border effect |

### Tailwind Color Usage

When using elemental colors in Tailwind, always use complete static class names. Never use template literal interpolation:

```typescript
// CORRECT - static lookup
const colorClasses = {
  'arcane-crystal': 'bg-arcane-crystal/15 text-arcane-crystal border-arcane-crystal/30',
  'arcane-fire': 'bg-arcane-fire/15 text-arcane-fire border-arcane-fire/30',
}

// WRONG - dynamic interpolation (purged in production)
const classes = `bg-${color}/15 text-${color}`
```

### File Locations

| Asset | Location |
|-------|----------|
| Tailwind config | `tailwind.config.ts` |
| CSS custom properties | `app/globals.css` |
| Animation variants | `lib/animations.ts` |
| UI components | `components/ui/` |
| Layout components | `components/layout/` |
| Landing sections | `components/landing/` |

---

*Arcanea Brand Guidelines v1.0 - February 2026*
*Modeled after [GitHub Brand Guidelines 2026](https://brand.github.com)*
