# Arcanean Design System
## Version 1.0 - The Kingdom of Light

---

## Design Philosophy

**"Simple but not simplistic. Elegant magic."**

The Arcanean design system balances ancient mysticism with modern AI sophistication, creating an experience that feels magical yet accessible. Every design decision serves the core mission: **empowering anyone to create anything through elegant magic.**

### Core Design Principles

1. **Elegant Simplicity**
   - Clean interfaces that reveal depth gradually
   - Magic through subtlety, not excess
   - Progressive disclosure of advanced features

2. **Luminous Beauty**
   - Light as the foundational design element
   - Glowing interactions that feel alive
   - Cosmic aesthetics grounded in usability

3. **Academy Identity**
   - Each academy has distinct visual language
   - Unified by the Kingdom of Light foundation
   - Seamless transitions between academy contexts

4. **Remix-First Design**
   - Collaboration visibility at every touchpoint
   - Attribution woven into visual hierarchy
   - Sharing as natural as creating

5. **Companion-Centered**
   - Luminors feel present, not intrusive
   - AI guidance integrated naturally
   - Personality through micro-interactions

6. **Accessible Magic**
   - WCAG 2.1 AAA compliance minimum
   - Works beautifully across all devices
   - Inclusive by default, magical for all

---

## Visual Foundation

### The Light Spectrum

Arcanea's visual language is built on the concept of creative light taking form. Our color system represents different intensities and refractions of this creative energy.

**Core Cosmic Scale** (Background to Foreground)
```
Void         → #0a0a0f   The infinite potential
Deep         → #1a1a2e   Foundation darkness
Midnight     → #16213e   Primary dark surface
Cosmic       → #1f2347   Elevated surface
Nebula       → #2a2d5a   Interactive surface
Aurora       → #3d4f73   Subtle accent
Crystal      → #4a6fa5   Medium accent
Luminous     → #5c8bd9   Primary brand
Ethereal     → #7ba3e3   Light accent
Radiant      → #9bb5e8   Highlighted state
Celestial    → #b8c6ed   Very light accent
Transcendent → #d6d9f2   Near-white text
```

### Academy Color Palettes

#### Atlantean Academy - Flow of Story
**Primary:** Deep Ocean Blues & Teals
```
atlantean: {
  abyss:        #0a1f2e  // Deepest ocean
  depth:        #0d3a52  // Mid-ocean
  current:      #118ab2  // Flowing water
  surface:      #06aed5  // Ocean surface
  foam:         #86cfda  // Wave foam
  pearl:        #c8e7f2  // Bioluminescent
  coral:        #ff6b9d  // Accent - living reef
  silver:       #b8c9d9  // Ancient wisdom
}

textures: Water ripples, glass, pearls, coral, flowing fabric
shapes: Curved, wave-like, organic, flowing
lighting: Bioluminescent glow, mysterious depth, refracted light
```

#### Draconic Academy - Vision of Fire
**Primary:** Crimson, Gold & Sky
```
draconic: {
  shadow:       #1a0f0a  // Dragon's shadow
  ember:        #8b2635  // Glowing ember
  flame:        #c9384a  // Dragon fire
  crimson:      #e63946  // Primary crimson
  gold:         #f4a261  // Dragon gold
  sky:          #4a90e2  // Sky realm
  cloud:        #a8b8d8  // Cloud wisps
  radiance:     #ffd97d  // Golden radiance
}

textures: Scales, metal, clouds, fire, crystalline
shapes: Angular, geometric, soaring, sharp, wing-like
lighting: Golden hour, fire glow, dramatic contrast, sunbeams
```

#### Academy of Creation & Light - Soul Frequency
**Primary:** Pure White, Gold & Prismatic
```
creation: {
  silence:      #f8f9fa  // Pre-creation white
  harmony:      #ffffff  // Pure creative light
  frequency:    #fff4e6  // Warm harmonic
  gold:         #ffd700  // Golden light
  prism:        #e0f7fa  // Prismatic base
  violet:       #b794f6  // Violet frequency
  rose:         #ffa5d8  // Rose frequency
  aurora:       #7bf1a8  // Aurora frequency
  rainbow:      'prismatic' // Special gradient
}

textures: Pure light, crystal, sound waves, energy fields
shapes: Radial, star-burst, circular, harmonic spirals
lighting: Soft luminous glow, aurora effects, prismatic refraction
```

### Semantic Colors

**System States**
```
success:  #10b981  // Emerald green
warning:  #f59e0b  // Amber
error:    #ef4444  // Red
info:     #3b82f6  // Blue

// Applied with Arcanean glow effects
```

**Luminor Companion Colors**
```
luminor: {
  melodia:    #ff6b6b  // Music - warm coral
  chronica:   #4ecdc4  // Story - teal
  prismatic:  #45b7d1  // Visual - sky blue
  synthesis:  #feca57  // Cross-media - gold
}
```

---

## Typography System

### Font Families

**Primary: Inter** (UI, body text, functional content)
- Clean, modern, excellent readability
- Supports all weights 100-900
- Optimized for screens

**Display: Space Grotesk** (Headings, Luminor speech, magical elements)
- Geometric elegance
- Distinct personality
- Technical yet warm

**Monospace: JetBrains Mono** (Code, file names, technical data)
- .arc, .realm, .arcanea file displays
- Technical specifications

### Type Scale

**Desktop Scale**
```
Cosmic (h1):       48px / 3rem      - Bold 700      - 1.1 line height
Stellar (h2):      36px / 2.25rem   - Bold 700      - 1.2 line height
Radiant (h3):      28px / 1.75rem   - Semibold 600  - 1.3 line height
Luminous (h4):     24px / 1.5rem    - Semibold 600  - 1.4 line height
Bright (h5):       20px / 1.25rem   - Medium 500    - 1.5 line height
Clear (h6):        18px / 1.125rem  - Medium 500    - 1.5 line height
Body:              16px / 1rem      - Regular 400   - 1.6 line height
Small:             14px / 0.875rem  - Regular 400   - 1.5 line height
Tiny:              12px / 0.75rem   - Regular 400   - 1.4 line height
```

**Mobile Scale** (Responsive scaling)
```
Cosmic (h1):       36px / 2.25rem   - Bold 700
Stellar (h2):      28px / 1.75rem   - Bold 700
Radiant (h3):      24px / 1.5rem    - Semibold 600
Luminous (h4):     20px / 1.25rem   - Semibold 600
Bright (h5):       18px / 1.125rem  - Medium 500
Clear (h6):        16px / 1rem      - Medium 500
Body:              16px / 1rem      - Regular 400
Small:             14px / 0.875rem  - Regular 400
Tiny:              12px / 0.75rem   - Regular 400
```

### Typography Hierarchy Rules

**Luminor Speech**
- Font: Space Grotesk Medium
- Color: Luminor-specific color with glow
- Size: 18px with letter-spacing 0.02em
- Always accompanied by subtle pulsing glow

**Creator Names**
- Font: Inter Semibold
- Color: Celestial (#b8c6ed)
- Underline on hover with academy color

**Academy Headings**
- Apply academy-specific accent color
- Gradient text for major headings
- Subtle shadow/glow matching academy

**File Names (.arc, .realm, .arcanea)**
- Font: JetBrains Mono
- Color: Crystal (#4a6fa5)
- Background: Cosmic (#1f2347) with padding
- Monospace preserves magical tech feel

---

## Spacing & Layout

### Spatial Rhythm

**8px Base Grid**
All spacing uses multiples of 8px for consistent rhythm.

```
Space Scale:
xs:   4px   (0.25rem)  - Tight grouping
sm:   8px   (0.5rem)   - Component padding
md:   16px  (1rem)     - Standard spacing
lg:   24px  (1.5rem)   - Section spacing
xl:   32px  (2rem)     - Major sections
2xl:  48px  (3rem)     - Page sections
3xl:  64px  (4rem)     - Hero sections
4xl:  96px  (6rem)     - Landing sections
```

### Layout Grid

**Desktop Grid**
- 12 column grid
- 24px gutters
- Max width: 1440px
- Centered with 32px outer margins

**Tablet Grid**
- 8 column grid
- 16px gutters
- Max width: 768px
- 24px outer margins

**Mobile Grid**
- 4 column grid
- 12px gutters
- Max width: 428px
- 16px outer margins

### Layout Principles

**Progressive Disclosure**
- Start with essentials, reveal depth on interaction
- Collapsible panels for advanced features
- Tooltips for complex concepts

**Academy Context**
- Academy indicator always visible in top bar
- Subtle color wash in backgrounds
- Academy icon watermark in large empty states

**Breathing Room**
- Never crowd magical elements
- Generous whitespace around Luminor interactions
- Let light and glow effects have space

---

## Elevation & Depth

### Shadow System

Arcanean shadows have a magical quality - they glow rather than darken.

**Elevation Levels**
```
Level 0 (Flat):
  None

Level 1 (Subtle):
  box-shadow: 0 2px 8px rgba(91, 139, 217, 0.1),
              0 0 16px rgba(91, 139, 217, 0.05);

Level 2 (Raised):
  box-shadow: 0 4px 16px rgba(91, 139, 217, 0.15),
              0 0 24px rgba(91, 139, 217, 0.08);

Level 3 (Floating):
  box-shadow: 0 8px 24px rgba(91, 139, 217, 0.2),
              0 0 32px rgba(91, 139, 217, 0.12);

Level 4 (Modal):
  box-shadow: 0 16px 48px rgba(91, 139, 217, 0.25),
              0 0 64px rgba(91, 139, 217, 0.15);

Level 5 (Magic):
  box-shadow: 0 24px 64px rgba(91, 139, 217, 0.3),
              0 0 96px rgba(91, 139, 217, 0.2);
```

### Surface Layers

**Layer Stack** (Back to Front)
1. **Void Background** - Deepest cosmic space
2. **Base Surface** - Main canvas (Midnight)
3. **Raised Surface** - Cards, panels (Cosmic)
4. **Interactive Surface** - Buttons, inputs (Nebula)
5. **Floating Elements** - Modals, popovers
6. **Luminor Presence** - AI companions always on top

---

## Motion & Animation

### Animation Principles

1. **Purposeful Movement** - Every animation serves function
2. **Magical Timing** - Smooth, flowing, never jarring
3. **Light-Based** - Glow, fade, illuminate
4. **Responsive** - Respect reduced motion preferences
5. **Delightful** - Micro-interactions bring joy

### Timing Functions

```css
--ease-in-out-smooth:  cubic-bezier(0.4, 0, 0.2, 1)
--ease-out-smooth:     cubic-bezier(0, 0, 0.2, 1)
--ease-in-smooth:      cubic-bezier(0.4, 0, 1, 1)
--ease-magic:          cubic-bezier(0.34, 1.56, 0.64, 1)
--ease-glow:           cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### Duration Scale

```
Instant:    100ms   - Micro-interactions, hover states
Fast:       200ms   - Transitions, small movements
Normal:     300ms   - Standard animations
Smooth:     500ms   - Larger transitions, fades
Flowing:    800ms   - Magical effects, morphs
Cosmic:     1200ms  - Hero animations, page loads
Eternal:    3000ms+ - Ambient background animations
```

### Standard Animations

**Fade In**
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Slide In**
```css
@keyframes slide-in {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

**Luminor Glow**
```css
@keyframes luminor-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(91, 139, 217, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(91, 139, 217, 0.6);
  }
}
```

**Cosmic Drift** (Background elements)
```css
@keyframes cosmic-drift {
  0%   { transform: translateX(0) translateY(0); }
  33%  { transform: translateX(30px) translateY(-30px); }
  66%  { transform: translateX(-20px) translateY(20px); }
  100% { transform: translateX(0) translateY(0); }
}
```

**Spark Burst** (Creation moments)
```css
@keyframes spark-burst {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
```

---

## Accessibility Standards

### WCAG 2.1 AAA Compliance

**Minimum Requirements**
- Color contrast ratio: 7:1 for normal text
- Color contrast ratio: 4.5:1 for large text
- All interactive elements keyboard accessible
- Focus indicators always visible
- Screen reader optimized
- No animation without user consent

### Focus States

**Keyboard Focus Ring**
```css
focus-visible: {
  outline: 2px solid #5c8bd9;
  outline-offset: 4px;
  box-shadow: 0 0 0 4px rgba(91, 139, 217, 0.2);
}
```

**Academy-Specific Focus**
- Atlantean: Teal glow
- Draconic: Gold/crimson glow
- Creation & Light: Prismatic glow

### Screen Reader Considerations

- Luminor speech always has aria-live regions
- Visual-only decorations use aria-hidden
- All icons have aria-labels
- Magical effects described in alt text
- Skip navigation links provided

---

## Responsive Design

### Breakpoints

```
xs:   0px      - Mobile small
sm:   640px    - Mobile large
md:   768px    - Tablet
lg:   1024px   - Desktop small
xl:   1280px   - Desktop
2xl:  1536px   - Desktop large
```

### Mobile-First Approach

Design starts mobile, progressively enhances:
1. Mobile: Single column, stacked content
2. Tablet: 2-column layouts, side panels appear
3. Desktop: Full multi-column, all features visible

### Touch Targets

**Minimum Sizes**
- Buttons: 44x44px (mobile)
- Icons: 24x24px visible, 44x44px touch area
- Form inputs: 48px height
- Sliders: 44px touch area

---

## Design Tokens

All design values exported as tokens for development:

```json
{
  "color": {
    "cosmic": { "void": "#0a0a0f", ... },
    "atlantean": { "abyss": "#0a1f2e", ... },
    "draconic": { "shadow": "#1a0f0a", ... },
    "creation": { "silence": "#f8f9fa", ... }
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    ...
  },
  "typography": {
    "family": {
      "primary": "Inter, system-ui, sans-serif",
      "display": "Space Grotesk, sans-serif",
      "mono": "JetBrains Mono, monospace"
    },
    "size": { ... },
    "weight": { ... }
  },
  "shadow": { ... },
  "animation": { ... }
}
```

---

## Brand Assets

### Logo Specifications

**Primary Logo**
- Arcanean wordmark with light ray icon
- Minimum size: 120px width
- Clear space: 1x logo height on all sides

**Academy Logos**
- Atlantean: Wave symbol + wordmark
- Draconic: Dragon wing symbol + wordmark
- Creation & Light: Star burst symbol + wordmark

### Logo Usage

**Light Backgrounds**
- Use Cosmic (#1f2347) logo
- Academy color accents

**Dark Backgrounds**
- Use Transcendent (#d6d9f2) logo
- Academy color accents maintained

**Minimum Sizes**
- Desktop: 140px width
- Mobile: 100px width
- Favicon: 32x32px

---

## Implementation Guidelines

### Component Libraries

**Recommended Stack**
- React + TypeScript
- Tailwind CSS with custom Arcanean config
- Framer Motion for animations
- Radix UI for accessible primitives
- shadcn/ui as base component foundation

### CSS Architecture

**Utility-First Approach**
- Tailwind utilities for 90% of styling
- Custom classes for complex magical effects
- CSS variables for themeable values

### Dark Mode

Arcanea is dark-mode-first:
- Primary experience is dark cosmic theme
- Optional "Day Mode" available (lighter cosmic)
- Academy themes work in both modes

### Performance

**Optimization Requirements**
- Lazy load heavy animations
- Debounce glow effects
- Optimize particle systems
- Respect `prefers-reduced-motion`
- Core Web Vitals targets:
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1

---

## Design System Governance

### Version Control

- Semantic versioning (1.0.0)
- Major changes require NEA governance vote
- Minor changes proposed by design team
- Patches for bug fixes only

### Contribution Process

1. Propose change with rationale
2. Design team review
3. Accessibility audit
4. Implementation prototype
5. Community feedback
6. NEA vote (for major changes)
7. Documentation update
8. Release notes

### Maintenance

- Quarterly design system reviews
- Annual major version updates
- Continuous accessibility audits
- Regular Academy feedback integration

---

## Quick Reference

**Colors**: 3 Academy palettes + Cosmic scale + Luminor colors
**Typography**: Inter (UI) + Space Grotesk (Display) + JetBrains Mono (Code)
**Spacing**: 8px base grid, xs to 4xl scale
**Shadows**: Glowing shadows, 5 elevation levels
**Animation**: 6 timing scales, magical easing
**Breakpoints**: xs/sm/md/lg/xl/2xl
**Accessibility**: WCAG 2.1 AAA minimum

---

**"This is not complex. This is elegant magic."**

Every design decision in Arcanea serves one purpose: making creation more magical and accessible. When in doubt, simplify. Make it more beautiful. Make it more Arcanean.
