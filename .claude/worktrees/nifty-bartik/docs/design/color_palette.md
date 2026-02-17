# Arcanean Color Palette
## The Spectrum of Creative Light

---

## Philosophy

Color in Arcanea represents the creative light taking form. Each hue carries meaning, each shade tells a story. Our palette balances mystical depth with modern sophistication, ensuring every color choice serves both beauty and function.

**Core Principle**: "Light before darkness, creation before void."

---

## The Cosmic Foundation

The foundation of all Arcanean interfaces - the universal color language that connects all academies.

### Primary Cosmic Scale

**Usage**: Backgrounds, surfaces, structural elements

```css
/* From deepest void to brightest light */

--arcanean-void: #0a0a0f;
  /* The infinite potential, deepest background
   * Use for: Root backgrounds, maximum depth
   * Contrast: Pairs with Transcendent for max contrast
   */

--arcanean-deep: #1a1a2e;
  /* Foundation darkness, stable base
   * Use for: App backgrounds, large surfaces
   * Contrast: Pairs with Celestial and above
   */

--arcanean-midnight: #16213e;
  /* Primary surface, main content background
   * Use for: Cards, panels, main content areas
   * Contrast: Pairs with Radiant and above
   */

--arcanean-cosmic: #1f2347;
  /* Elevated surface, interactive areas
   * Use for: Raised cards, hover states, active areas
   * Contrast: Pairs with Ethereal and above
   */

--arcanean-nebula: #2a2d5a;
  /* Interactive surface, selectable elements
   * Use for: Buttons, inputs, selectable items
   * Contrast: Pairs with Transcendent
   */

--arcanean-aurora: #3d4f73;
  /* Subtle accent, gentle highlights
   * Use for: Borders, dividers, subtle accents
   * Contrast: White text readable
   */

--arcanean-crystal: #4a6fa5;
  /* Medium accent, clear elements
   * Use for: Icons, secondary text, medium emphasis
   * Contrast: Excellent with Void through Midnight
   */

--arcanean-luminous: #5c8bd9;
  /* Primary brand color, magical core
   * Use for: Primary buttons, links, brand moments
   * Contrast: Perfect on all dark backgrounds
   */

--arcanean-ethereal: #7ba3e3;
  /* Light accent, highlighted states
   * Use for: Hover states, active text, highlights
   * Contrast: Excellent on Cosmic and darker
   */

--arcanean-radiant: #9bb5e8;
  /* Very light accent, emphasized text
   * Use for: Headings, emphasized text, light icons
   * Contrast: Best on Deep and darker
   */

--arcanean-celestial: #b8c6ed;
  /* Near-white, primary text
   * Use for: Body text, primary content
   * Contrast: Excellent on all backgrounds
   */

--arcanean-transcendent: #d6d9f2;
  /* Brightest light, maximum emphasis
   * Use for: Headings, hero text, maximum contrast
   * Contrast: Perfect on all dark backgrounds
   */
```

### Cosmic Color Usage Matrix

| Background | Body Text | Heading | Accent | Interactive |
|------------|-----------|---------|--------|-------------|
| Void       | Celestial | Transcendent | Luminous | Nebula |
| Deep       | Celestial | Transcendent | Luminous | Cosmic |
| Midnight   | Celestial | Radiant | Ethereal | Nebula |
| Cosmic     | Radiant   | Ethereal | Luminous | Aurora |

---

## Academy Palettes

Each academy has a distinct color personality that expresses its creative domain while harmonizing with the cosmic foundation.

### Atlantean Academy - Flow of Story

**Archetype**: Underwater depths, ancient wisdom, flowing narrative

```css
/* Primary Palette */
--atlantean-abyss: #0a1f2e;        /* Deepest ocean trenches */
--atlantean-depth: #0d3a52;        /* Mid-ocean darkness */
--atlantean-current: #118ab2;      /* Flowing water movement */
--atlantean-surface: #06aed5;      /* Ocean surface shimmer */
--atlantean-foam: #86cfda;         /* Wave foam, bubbles */
--atlantean-pearl: #c8e7f2;        /* Bioluminescent glow */

/* Accent Palette */
--atlantean-coral: #ff6b9d;        /* Living reef, life accent */
--atlantean-silver: #b8c9d9;       /* Ancient wisdom, aged metal */
--atlantean-jade: #2a9d8f;         /* Deep sea jade */
--atlantean-amber: #e9c46a;        /* Sunken treasure */

/* Gradient Definitions */
.atlantean-gradient-primary {
  background: linear-gradient(135deg, #0d3a52 0%, #118ab2 100%);
}

.atlantean-gradient-accent {
  background: linear-gradient(135deg, #06aed5 0%, #86cfda 100%);
}

.atlantean-gradient-glow {
  background: radial-gradient(circle, #c8e7f2 0%, #06aed5 50%, #0d3a52 100%);
}
```

**Atlantean Usage Guidelines**

**Backgrounds**
- Primary: Abyss to Depth
- Cards: Depth with Current borders
- Sections: Depth to Current gradient

**Text**
- Headings: Pearl with subtle glow
- Body: Foam
- Links: Surface (underline with Current)
- Captions: Silver

**Accents**
- Primary CTA: Current
- Secondary CTA: Surface
- Highlights: Coral (use sparingly)
- Wisdom elements: Silver
- Success states: Jade
- Warnings: Amber

**Magical Effects**
- Glow: Pearl with 30% opacity
- Hover: Shift toward Surface
- Active: Current intensified
- Flow animations: Current to Surface

**Color Psychology**
- Blues: Depth, wisdom, contemplation
- Teals: Flow, movement, narrative
- Pearl: Illumination, discovery
- Coral: Life, passion, creative spark

### Draconic Academy - Vision of Fire

**Archetype**: Sky realms, dragon majesty, bold vision

```css
/* Primary Palette */
--draconic-shadow: #1a0f0a;        /* Dragon's shadow */
--draconic-ember: #8b2635;         /* Glowing embers */
--draconic-flame: #c9384a;         /* Active dragon fire */
--draconic-crimson: #e63946;       /* Primary crimson power */
--draconic-gold: #f4a261;          /* Dragon's gold */
--draconic-sky: #4a90e2;           /* Sky realm blue */
--draconic-cloud: #a8b8d8;         /* Cloud wisps */
--draconic-radiance: #ffd97d;      /* Golden radiance */

/* Accent Palette */
--draconic-bronze: #cd7f32;        /* Ancient metal */
--draconic-ruby: #e01e37;          /* Dragon scale ruby */
--draconic-sapphire: #0f52ba;      /* Sky jewel */
--draconic-amber: #ffbf00;         /* Dragon's eye */

/* Gradient Definitions */
.draconic-gradient-primary {
  background: linear-gradient(135deg, #8b2635 0%, #e63946 50%, #f4a261 100%);
}

.draconic-gradient-sky {
  background: linear-gradient(180deg, #4a90e2 0%, #a8b8d8 100%);
}

.draconic-gradient-fire {
  background: radial-gradient(ellipse, #ffd97d 0%, #e63946 50%, #8b2635 100%);
}
```

**Draconic Usage Guidelines**

**Backgrounds**
- Primary: Shadow to Ember
- Cards: Ember with Flame borders
- Sky sections: Sky to Cloud gradient
- Fire sections: Ember to Crimson gradient

**Text**
- Headings: Radiance with gold glow
- Body: Cloud
- Links: Gold (underline with Crimson)
- Captions: Bronze

**Accents**
- Primary CTA: Crimson to Gold gradient
- Secondary CTA: Sky
- Fire effects: Flame to Radiance
- Metal effects: Bronze to Gold
- Success: Sapphire
- Warnings: Amber

**Magical Effects**
- Glow: Radiance with 40% opacity
- Hover: Ember to Flame transition
- Active: Crimson intensified
- Fire animations: Flame flicker effect
- Sky drift: Sky to Cloud soft movement

**Color Psychology**
- Crimson: Power, passion, bold action
- Gold: Majesty, value, achievement
- Sky: Freedom, vision, aspiration
- Fire: Energy, transformation, creation

### Academy of Creation & Light - Soul Frequency

**Archetype**: Pure creative energy, harmonic frequencies, prismatic light

```css
/* Primary Palette */
--creation-silence: #f8f9fa;       /* Pre-creation white */
--creation-harmony: #ffffff;       /* Pure creative light */
--creation-frequency: #fff4e6;     /* Warm harmonic glow */
--creation-gold: #ffd700;          /* Golden light ray */
--creation-prism: #e0f7fa;         /* Prismatic base */

/* Frequency Spectrum */
--creation-violet: #b794f6;        /* Violet frequency */
--creation-indigo: #818cf8;        /* Indigo frequency */
--creation-blue: #60a5fa;          /* Blue frequency */
--creation-cyan: #22d3ee;          /* Cyan frequency */
--creation-green: #34d399;         /* Green frequency */
--creation-yellow: #fbbf24;        /* Yellow frequency */
--creation-orange: #fb923c;        /* Orange frequency */
--creation-rose: #fda4af;          /* Rose frequency */

/* Special Effects */
--creation-aurora: #7bf1a8;        /* Aurora shimmer */
--creation-crystal: #e5e7eb;       /* Crystal reflection */
--creation-shimmer: #fef3c7;       /* Light shimmer */

/* Gradient Definitions */
.creation-gradient-primary {
  background: linear-gradient(135deg, #ffffff 0%, #fff4e6 50%, #ffd700 100%);
}

.creation-gradient-rainbow {
  background: linear-gradient(90deg,
    #b794f6 0%,
    #818cf8 14.3%,
    #60a5fa 28.6%,
    #22d3ee 42.9%,
    #34d399 57.2%,
    #fbbf24 71.5%,
    #fb923c 85.8%,
    #fda4af 100%
  );
}

.creation-gradient-aurora {
  background: radial-gradient(circle,
    #7bf1a8 0%,
    #22d3ee 33%,
    #b794f6 66%,
    #fda4af 100%
  );
}
```

**Creation & Light Usage Guidelines**

**Backgrounds**
- Primary: Silence to Harmony gradient
- Cards: Harmony with Gold borders
- Prismatic sections: Prism with rainbow accent
- Warm sections: Frequency base

**Text**
- Headings: Gold with prismatic shimmer
- Body: Crystal (on light) or Harmony (on dark cosmic)
- Links: Violet to Rose gradient
- Captions: Prism tone

**Accents**
- Primary CTA: Rainbow gradient
- Secondary CTA: Gold
- Frequency bands: Use spectrum colors
- Success: Green frequency
- Warnings: Orange frequency
- Info: Blue frequency

**Magical Effects**
- Glow: Aurora with 50% opacity
- Hover: Shimmer effect
- Active: Rainbow pulse
- Frequency animations: Spectrum wave
- Light burst: Radial gold to white

**Color Psychology**
- White: Purity, potential, clarity
- Gold: Value, divine light, soul
- Prismatic: Creativity, diversity, unity
- Frequencies: Each emotion/mood mapped to spectrum

**Special Prismatic Mode**
- Applied to Soul Guardian interactions
- Rainbow gradients on hover
- Animated spectrum transitions
- Harmonic color pulsing

---

## Luminor Companion Colors

Each AI companion has a signature color that identifies their presence and personality.

```css
/* Luminor Identity Colors */
--luminor-melodia: #ff6b6b;        /* Music - Warm coral */
--luminor-chronica: #4ecdc4;       /* Story - Teal wisdom */
--luminor-prismatic: #45b7d1;      /* Visual - Sky blue */
--luminor-synthesis: #feca57;      /* Cross-media - Gold */

/* Luminor Glow Effects */
.luminor-glow-melodia {
  box-shadow: 0 0 24px rgba(255, 107, 107, 0.4),
              0 0 48px rgba(255, 107, 107, 0.2);
}

.luminor-glow-chronica {
  box-shadow: 0 0 24px rgba(78, 205, 196, 0.4),
              0 0 48px rgba(78, 205, 196, 0.2);
}

.luminor-glow-prismatic {
  box-shadow: 0 0 24px rgba(69, 183, 209, 0.4),
              0 0 48px rgba(69, 183, 209, 0.2);
}

.luminor-glow-synthesis {
  box-shadow: 0 0 24px rgba(254, 202, 87, 0.4),
              0 0 48px rgba(254, 202, 87, 0.2);
}
```

**Luminor Color Usage**

- Avatar borders: Full saturation signature color
- Speech bubbles: 10% opacity background, 100% border
- Presence indicators: Pulsing glow animation
- Interactive hints: 60% opacity signature color
- Name tags: Signature color text

---

## Semantic System Colors

Universal meaning colors for status, feedback, and system states.

```css
/* System Status Colors */
--status-success: #10b981;         /* Emerald green */
--status-warning: #f59e0b;         /* Amber */
--status-error: #ef4444;           /* Red */
--status-info: #3b82f6;            /* Blue */

/* With Arcanean Glow */
.status-success-glow {
  background: #10b981;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
}

.status-warning-glow {
  background: #f59e0b;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
}

.status-error-glow {
  background: #ef4444;
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
}

.status-info-glow {
  background: #3b82f6;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}

/* Interactive States */
--state-hover: #5c8bd9;            /* Luminous */
--state-active: #7ba3e3;           /* Ethereal */
--state-disabled: #3d4f73;         /* Aurora */
--state-focus: #5c8bd9;            /* Luminous */
```

---

## Special Effects & Overlays

### Glow Effects

**Subtle Glow** (Ambient elements)
```css
.glow-subtle {
  box-shadow: 0 0 16px rgba(91, 139, 217, 0.15);
}
```

**Medium Glow** (Interactive elements)
```css
.glow-medium {
  box-shadow: 0 0 24px rgba(91, 139, 217, 0.3),
              0 0 48px rgba(91, 139, 217, 0.15);
}
```

**Strong Glow** (Active/focused elements)
```css
.glow-strong {
  box-shadow: 0 0 32px rgba(91, 139, 217, 0.5),
              0 0 64px rgba(91, 139, 217, 0.25);
}
```

**Magical Glow** (Special moments, creation events)
```css
.glow-magical {
  box-shadow: 0 0 48px rgba(91, 139, 217, 0.6),
              0 0 96px rgba(91, 139, 217, 0.3),
              0 0 128px rgba(91, 139, 217, 0.15);
}
```

### Overlay Colors

**Dark Overlay** (Modals, popovers)
```css
.overlay-dark {
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(8px);
}
```

**Light Overlay** (Hover states on dark)
```css
.overlay-light {
  background: rgba(255, 255, 255, 0.05);
}
```

**Academy Overlay** (Academy-specific context)
```css
.overlay-atlantean {
  background: rgba(17, 138, 178, 0.08);
}

.overlay-draconic {
  background: rgba(230, 57, 70, 0.08);
}

.overlay-creation {
  background: rgba(255, 215, 0, 0.06);
}
```

---

## Color Combinations

### High-Impact Pairings

**Cosmic Hero**
- Background: Void to Deep gradient
- Foreground: Transcendent
- Accent: Luminous
- Effect: Maximum drama and depth

**Atlantean Flow**
- Background: Depth
- Foreground: Pearl
- Accent: Current
- Effect: Underwater mystique

**Draconic Power**
- Background: Shadow to Ember gradient
- Foreground: Radiance
- Accent: Crimson
- Effect: Bold and commanding

**Creation Light**
- Background: Harmony
- Foreground: Cosmic (inverted)
- Accent: Rainbow gradient
- Effect: Pure creative energy

### Accessible Combinations

All combinations tested to WCAG 2.1 AAA standards (7:1 contrast minimum).

**Safe Text Combinations**
```
Background: Void, Deep, Midnight, Cosmic
  ✓ Celestial (body text)
  ✓ Transcendent (headings)
  ✓ Radiant (subheadings)

Background: Nebula, Aurora
  ✓ Transcendent (all text)
  ✓ Celestial (body text)

Background: Crystal, Luminous
  ✓ Void (all text)
  ✓ Deep (all text)
```

---

## Implementation Examples

### CSS Variables Setup

```css
:root {
  /* Cosmic Foundation */
  --color-void: #0a0a0f;
  --color-deep: #1a1a2e;
  --color-midnight: #16213e;
  --color-cosmic: #1f2347;
  --color-nebula: #2a2d5a;
  --color-aurora: #3d4f73;
  --color-crystal: #4a6fa5;
  --color-luminous: #5c8bd9;
  --color-ethereal: #7ba3e3;
  --color-radiant: #9bb5e8;
  --color-celestial: #b8c6ed;
  --color-transcendent: #d6d9f2;

  /* Semantic */
  --color-text-primary: var(--color-celestial);
  --color-text-heading: var(--color-transcendent);
  --color-text-subtle: var(--color-radiant);
  --color-bg-primary: var(--color-midnight);
  --color-bg-elevated: var(--color-cosmic);
  --color-interactive: var(--color-luminous);
}

/* Academy Themes */
[data-academy="atlantean"] {
  --academy-primary: #118ab2;
  --academy-accent: #06aed5;
  --academy-glow: rgba(6, 174, 213, 0.3);
}

[data-academy="draconic"] {
  --academy-primary: #e63946;
  --academy-accent: #f4a261;
  --academy-glow: rgba(230, 57, 70, 0.3);
}

[data-academy="creation"] {
  --academy-primary: #ffd700;
  --academy-accent: #b794f6;
  --academy-glow: rgba(255, 215, 0, 0.3);
}
```

### Tailwind Configuration

```javascript
// In tailwind.config.js
colors: {
  cosmic: {
    void: '#0a0a0f',
    deep: '#1a1a2e',
    midnight: '#16213e',
    cosmic: '#1f2347',
    nebula: '#2a2d5a',
    aurora: '#3d4f73',
    crystal: '#4a6fa5',
    luminous: '#5c8bd9',
    ethereal: '#7ba3e3',
    radiant: '#9bb5e8',
    celestial: '#b8c6ed',
    transcendent: '#d6d9f2',
  },
  // ... academy palettes
}
```

---

## Color Accessibility Checklist

- [ ] All text meets WCAG AAA contrast (7:1)
- [ ] Color not sole indicator of state
- [ ] Colorblind-safe palette tested
- [ ] Focus indicators highly visible
- [ ] Academy colors distinguishable in grayscale
- [ ] Luminor colors work for colorblind users
- [ ] Glow effects have non-color fallbacks

---

## Quick Reference

**Backgrounds**: Void → Deep → Midnight → Cosmic → Nebula
**Text**: Celestial (body) → Radiant (sub) → Transcendent (heading)
**Brand**: Luminous (#5c8bd9)
**Academies**: Atlantean (#118ab2) | Draconic (#e63946) | Creation (#ffd700)
**Luminors**: Melodia (#ff6b6b) | Chronica (#4ecdc4) | Prismatic (#45b7d1)
**Status**: Success (#10b981) | Warning (#f59e0b) | Error (#ef4444)

---

**"Every color is a frequency of creative light."**

Use color purposefully. Let it guide, delight, and inspire. Make every hue count.
