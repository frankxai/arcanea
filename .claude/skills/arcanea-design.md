---
name: arcanea-design
description: >
  Arcanea Design System - comprehensive design command for building world-class UI.
  Invoked via /arcanea-design. Encompasses marketing design, UX, component design,
  branding, and visual quality enforcement. The ONE design command to rule them all.
version: 2.0.0
triggers:
  - /arcanea-design
  - /design-god
  - /arcanea-branding
aliases:
  - design-god
  - arcanea-branding
---

# Arcanea Design System Command

> "Every pixel is a portal. Every interaction, a spell."

## Activation Protocol

When this skill is invoked, follow this exact sequence:

### Step 1: Load the Design Bible

Read `.arcanea/design/DESIGN_BIBLE.md` - the single source of truth for all design decisions. This document supersedes ALL other design files if there's a conflict.

### Step 2: Assess the Task

Determine which design mode is needed:

| Mode | Trigger | Focus |
|------|---------|-------|
| **Component Design** | "build a card", "create a button" | Individual component |
| **Page Design** | "redesign homepage", "create landing" | Full page layout |
| **System Design** | "update tokens", "add new color" | Design system itself |
| **Brand Design** | "logo", "social graphics", "brand" | Brand identity |
| **Review** | "review design", "check quality" | Quality audit |
| **Marketing** | "landing page", "conversion", "CTA" | Marketing optimization |

### Step 3: Execute with Quality Gates

Before ANY visual artifact is created or modified:

1. Load design tokens from `.arcanea/config/design-tokens.yaml`
2. Reference the Design Bible for patterns
3. After completion, run the Quality Checklist (below)

---

## Design System Quick Reference

### Color Hierarchy

```
COSMIC VOID:    #0b0e14  (page background)
COSMIC DEEP:    #121826  (card backgrounds)
COSMIC SURFACE: #1a2332  (elevated cards, modals)
COSMIC RAISED:  #242f42  (hover states)
BRAND PRIMARY:  #8b5cf6  (primary actions - VIOLET)
BRAND ACCENT:   #7fffd4  (crystal highlights)
BRAND GOLD:     #ffd700  (achievement, premium)
TEXT PRIMARY:   #e6eefc  (headlines)
TEXT SECONDARY: #9bb1d0  (body text)
TEXT MUTED:     #708094  (captions)
```

### Typography

- **Cinzel**: Display headings (h1, h2, hero text)
- **Crimson Pro**: Narrative body (long-form > 50 words)
- **Inter**: UI elements (buttons, labels, nav, forms)
- **JetBrains Mono**: Code blocks, technical data

### Glass Effects (Use These Classes)

| Class | Effect | When |
|-------|--------|------|
| `glass` | Standard glassmorphism (blur 16px) | Cards, panels |
| `glass-strong` | Heavy glass (blur 24px) | Nav, modals |
| `glass-subtle` | Light glass (blur 8px) | Hover overlays |
| `liquid-glass` | Apple Liquid Glass (blur 40px, saturate) | Premium surfaces |
| `liquid-glass-elevated` | Premium liquid glass (blur 60px) | Hero cards |
| `iridescent-glass` | Rainbow-shift prismatic | Featured elements |
| `bubble-shine` | Spherical light refraction | Badges, orbs |

### Component Patterns

**Buttons:**
- Primary: `bg-brand-primary text-white rounded-lg px-4 py-2 shadow-glow-brand hover:scale-[1.02]`
- Secondary: `bg-transparent text-text-secondary border-cosmic-elevated rounded-lg px-4 py-2`
- Crystal: `bg-gradient-crystal text-cosmic-void rounded-lg px-4 py-2 shadow-glow-sm`

**Cards:**
- Standard: `glass rounded-2xl p-6 hover-lift glow-card`
- Featured: `liquid-glass rounded-3xl p-8 border-gradient`
- Minimal: `bg-cosmic-deep rounded-xl p-4 border border-cosmic-elevated`

**Inputs:**
- Default: `bg-cosmic-deep border-cosmic-elevated rounded-lg p-3 focus:border-crystal focus:ring-2 focus:ring-crystal/20`

### Gradient Text

```html
<h1 class="text-gradient-crystal">Crystal Heading</h1>
<h1 class="text-gradient-brand">Brand Heading</h1>
<h1 class="text-gradient-fire">Fire Heading</h1>
<h1 class="text-gradient-gold">Gold Heading</h1>
```

### Background Patterns

```html
<!-- Primary page background -->
<div class="bg-cosmic-void bg-cosmic-mesh min-h-screen">

<!-- Hero with mesh gradient -->
<section class="bg-mesh-gradient py-24 lg:py-32">

<!-- Aurora atmospheric -->
<section class="bg-aurora py-24">
```

---

## Marketing Design Intelligence

### Landing Page Formula

1. **Hero**: Full viewport, mesh gradient bg, Cinzel display heading with gradient text, crystal CTA button, floating decorative orbs
2. **Social Proof**: Logo bar, glass cards with stats, stagger animation on scroll
3. **Features**: 4-column grid on lg, glass cards, elemental icons, hover-lift
4. **How It Works**: 3-step numbered flow, liquid-glass cards, connecting lines
5. **Testimonials**: Carousel or grid, glass cards, avatar + quote
6. **CTA**: Full-width, aurora background, large crystal button, urgency text
7. **Footer**: cosmic-deep bg, 4-column links grid, brand mark

### Conversion Optimization

- Primary CTA: Crystal gradient button (most visible)
- Secondary CTA: Ghost button (less priority)
- Always above the fold: heading + CTA
- Social proof near CTA buttons
- Contrast ratio: CTA must pop against section bg
- Whitespace: generous spacing between sections (py-24 lg:py-32)

### Typography for Marketing

- Hero: `font-display text-fluid-hero text-gradient-brand`
- Subheadline: `font-sans text-fluid-xl text-text-secondary`
- Feature titles: `font-sans text-fluid-2xl font-semibold text-text-primary`
- Body: `font-sans text-fluid-base text-text-secondary`

---

## Quality Gate Checklist

Run this BEFORE declaring any visual work done:

### Mandatory Checks

- [ ] Uses Arcanean color tokens (NO raw hex values)
- [ ] Correct typography (Cinzel display, Inter UI, Crimson Pro body, JetBrains code)
- [ ] Proper spacing (4px grid, section padding py-24 lg:py-32)
- [ ] Glass effects with proper backdrop-filter blur
- [ ] Cosmic shadows (elevation scale, NOT flat box-shadow)
- [ ] Smooth animations with spring-based easing
- [ ] Responsive across all breakpoints (640/768/1024/1280/1536)
- [ ] Accessible contrast ratios (WCAG 2.1 AA minimum)
- [ ] Visible focus states (crystal ring, 2px offset)
- [ ] NO emoji icons (Lucide React only)
- [ ] prefers-reduced-motion respected
- [ ] Mobile touch targets >= 44px
- [ ] Would this work in a $1B company pitch deck?
- [ ] Does it feel MAGICAL, not mundane?

### Premium Visual Checks

- [ ] Glass blur is visible and functional
- [ ] Gradient text renders correctly (no cut-off)
- [ ] Hover states are smooth and purposeful
- [ ] Scroll animations trigger at right time
- [ ] No layout shift during animations
- [ ] Images/icons are crisp at all sizes
- [ ] Section dividers present between major sections

---

## File Locations

| Asset | Path |
|-------|------|
| **Design Bible** | `.arcanea/design/DESIGN_BIBLE.md` |
| **Design Tokens** | `.arcanea/config/design-tokens.yaml` |
| **Tailwind Config** | `tailwind.config.js` |
| **Global CSS** | `styles/globals.css` |
| **Brand Guidelines** | `ARCANEA_BRAND_GUIDELINES.md` |
| **This Skill** | `.claude/skills/arcanea-design.md` |

## Related Commands

| Command | Purpose |
|---------|---------|
| `/design-team` | Activate 5-agent design department |
| `/design-review` | Run quality audit on existing work |
| `/component-forge` | Build individual component |
| `/v0-generate` | Generate with v0 MCP |
| `/frontend-design` | Full frontend build workflow |

---

## Anti-Patterns (NEVER)

- Raw white (#ffffff) for text - use text-primary (#e6eefc)
- Emoji as icons
- Space Grotesk font (not in our system)
- Crystal (#7fffd4) as large background fills
- More than 2 glass layers stacked
- Glow effects on body text
- Flat box-shadows without depth
- Hardcoded hex values instead of CSS variables
- Comic Sans, Impact, or decorative fonts
- Bright colors on bright backgrounds
- Skipping the cosmic depth ladder
