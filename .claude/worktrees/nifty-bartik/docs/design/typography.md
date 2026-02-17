# Arcanean Typography System
## The Written Language of Light

---

## Typography Philosophy

Typography in Arcanea balances clarity with cosmic elegance. Text is the vessel for stories, the interface for creation, the medium of wisdom. Every typographic choice serves readability, hierarchy, and the magical atmosphere of the platform.

**Core Principles:**

1. **Clarity First** - Readable at all sizes, accessible to all
2. **Elegant Hierarchy** - Clear information structure
3. **Personality Balance** - Professional yet magical
4. **Cross-Platform** - Beautiful on all devices and screens
5. **Academy Distinction** - Subtle variations honor each academy

---

## Font Families

### Primary: Inter

**Purpose**: UI elements, body text, functional content

**Why Inter:**
- Exceptional clarity at all sizes
- Wide range of weights (100-900)
- Optimized for screens
- Excellent international character support
- Modern, neutral, professional

**Usage:**
- Navigation elements
- Button labels
- Form fields
- Body copy
- Captions
- System messages
- Most UI text

**Font Stack:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
             system-ui, sans-serif;
```

**Variable Font Implementation:**
```css
@import '@fontsource/inter/variable.css';

/* Or CDN */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
```

---

### Display: Space Grotesk

**Purpose**: Headings, Luminor speech, magical emphasis, brand moments

**Why Space Grotesk:**
- Geometric elegance
- Distinct personality
- Technical yet warm
- Excellent for large sizes
- Creates magical atmosphere

**Usage:**
- Page headings
- Section titles
- Luminor dialogue
- Hero text
- Magical moments
- Academy headings
- Feature callouts

**Font Stack:**
```css
font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
```

**Implementation:**
```css
@import '@fontsource/space-grotesk/400.css';
@import '@fontsource/space-grotesk/600.css';
@import '@fontsource/space-grotesk/700.css';

/* Or CDN */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap');
```

---

### Monospace: JetBrains Mono

**Purpose**: Code, file names, technical data, system information

**Why JetBrains Mono:**
- Excellent code readability
- Clear character distinction
- Ligature support
- Modern monospace aesthetic
- Aligns with technical nature of platform

**Usage:**
- .arc, .realm, .arcanea file names
- Code snippets
- Technical specifications
- API responses
- System logs
- Developer tools

**Font Stack:**
```css
font-family: 'JetBrains Mono', 'Courier New', monospace;
```

**Implementation:**
```css
@import '@fontsource/jetbrains-mono/400.css';
@import '@fontsource/jetbrains-mono/600.css';

/* Or CDN */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap');
```

---

## Type Scale

### Desktop Scale

Optimized for screens 1024px and wider.

```css
/* Hero / Display */
--font-cosmic:    48px;   /* 3rem */     /* Hero headings, landing pages */
--font-stellar:   36px;   /* 2.25rem */  /* Page titles, major sections */
--font-radiant:   28px;   /* 1.75rem */  /* Section headings */
--font-luminous:  24px;   /* 1.5rem */   /* Sub-sections, card titles */
--font-bright:    20px;   /* 1.25rem */  /* Minor headings */
--font-clear:     18px;   /* 1.125rem */ /* Emphasized text */

/* Body */
--font-base:      16px;   /* 1rem */     /* Standard body text */
--font-small:     14px;   /* 0.875rem */ /* Secondary text, captions */
--font-tiny:      12px;   /* 0.75rem */  /* Labels, metadata */
```

### Tablet Scale (768px - 1023px)

```css
--font-cosmic:    36px;   /* 2.25rem */
--font-stellar:   28px;   /* 1.75rem */
--font-radiant:   24px;   /* 1.5rem */
--font-luminous:  20px;   /* 1.25rem */
--font-bright:    18px;   /* 1.125rem */
--font-clear:     16px;   /* 1rem */
--font-base:      16px;   /* 1rem */
--font-small:     14px;   /* 0.875rem */
--font-tiny:      12px;   /* 0.75rem */
```

### Mobile Scale (< 768px)

```css
--font-cosmic:    32px;   /* 2rem */
--font-stellar:   24px;   /* 1.5rem */
--font-radiant:   20px;   /* 1.25rem */
--font-luminous:  18px;   /* 1.125rem */
--font-bright:    16px;   /* 1rem */
--font-clear:     16px;   /* 1rem */
--font-base:      16px;   /* 1rem */     /* Never smaller than 16px */
--font-small:     14px;   /* 0.875rem */
--font-tiny:      12px;   /* 0.75rem */
```

**Mobile Note**: Never reduce body text below 16px to prevent zoom on input focus in iOS.

---

## Font Weights

### Inter Weight Scale

```css
--weight-thin:       100;  /* Rarely used, decorative only */
--weight-extralight: 200;  /* Rarely used, decorative only */
--weight-light:      300;  /* Subtle text, de-emphasized */
--weight-regular:    400;  /* Body text, default */
--weight-medium:     500;  /* Slightly emphasized */
--weight-semibold:   600;  /* Headings, important text */
--weight-bold:       700;  /* Strong emphasis, CTAs */
--weight-extrabold:  800;  /* Rarely used, hero text */
--weight-black:      900;  /* Rarely used, extreme emphasis */
```

**Usage Guidelines:**
- Body text: 400 (regular)
- Emphasized body: 500 (medium)
- Sub-headings: 600 (semibold)
- Headings: 700 (bold)
- Hero text: 700-800 (bold-extrabold)

### Space Grotesk Weight Scale

```css
--weight-regular:  400;  /* Default for Space Grotesk */
--weight-semibold: 600;  /* Emphasized headings */
--weight-bold:     700;  /* Strong headings, hero */
```

**Usage Guidelines:**
- Standard headings: 600 (semibold)
- Major headings: 700 (bold)
- Luminor speech: 600 (semibold)

---

## Line Heights

Line height creates rhythm and readability.

```css
/* Tight - Display text, large headings */
--line-height-tight:   1.1;   /* 48px → 52.8px */

/* Snug - Headings */
--line-height-snug:    1.25;  /* 36px → 45px */

/* Normal - Sub-headings */
--line-height-normal:  1.4;   /* 24px → 33.6px */

/* Relaxed - Body text */
--line-height-relaxed: 1.6;   /* 16px → 25.6px */

/* Loose - Long-form content */
--line-height-loose:   1.8;   /* 16px → 28.8px */
```

**Usage Guidelines:**
- Hero headings (48px+): 1.1
- Large headings (36px): 1.25
- Medium headings (24-28px): 1.4
- Body text (16px): 1.6
- Long articles: 1.8

---

## Letter Spacing

Tracking adjustments for optical balance.

```css
/* Tighter - Large display text */
--tracking-tighter:  -0.04em;  /* -0.64px at 16px */

/* Tight - Headings */
--tracking-tight:    -0.02em;  /* -0.32px at 16px */

/* Normal - Body text */
--tracking-normal:   0;

/* Wide - Small text, labels */
--tracking-wide:     0.02em;   /* 0.32px at 16px */

/* Wider - All caps, labels */
--tracking-wider:    0.04em;   /* 0.64px at 16px */

/* Widest - Tiny all-caps */
--tracking-widest:   0.08em;   /* 1.28px at 16px */
```

**Usage Guidelines:**
- Hero text (48px+): -0.04em (tighter)
- Headings (24-36px): -0.02em (tight)
- Body text: 0 (normal)
- Small labels: 0.02em (wide)
- ALL CAPS: 0.04em+ (wider)
- Luminor names: 0.02em (wide)

---

## Typography Styles

### Headings

**H1 - Cosmic Heading**
```css
.h1 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: var(--color-transcendent);
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .h1 {
    font-size: 32px;
  }
}
```

**H2 - Stellar Heading**
```css
.h2 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--color-transcendent);
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .h2 {
    font-size: 24px;
  }
}
```

**H3 - Radiant Heading**
```css
.h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: var(--color-radiant);
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .h3 {
    font-size: 20px;
  }
}
```

**H4 - Luminous Heading**
```css
.h4 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0;
  color: var(--color-radiant);
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .h4 {
    font-size: 18px;
  }
}
```

**H5 - Bright Heading**
```css
.h5 {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0;
  color: var(--color-celestial);
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .h5 {
    font-size: 16px;
  }
}
```

**H6 - Clear Heading**
```css
.h6 {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0;
  color: var(--color-celestial);
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .h6 {
    font-size: 16px;
  }
}
```

---

### Body Text

**Standard Body**
```css
.body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0;
  color: var(--color-celestial);
}
```

**Large Body**
```css
.body-large {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0;
  color: var(--color-celestial);
}
```

**Small Body**
```css
.body-small {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  color: var(--color-radiant);
}
```

**Lead Paragraph** (Introductory text)
```css
.lead {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0;
  color: var(--color-celestial);
  margin-bottom: 24px;
}
```

---

### Special Typography

**Luminor Speech**
```css
.luminor-speech {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: 0.02em;
  color: var(--luminor-color);
  text-shadow: 0 0 8px rgba(var(--luminor-color-rgb), 0.3);
}
```

**File Name**
```css
.file-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  color: var(--color-crystal);
  background: var(--color-cosmic);
  padding: 4px 8px;
  border-radius: 4px;
}
```

**Creator Name**
```css
.creator-name {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0;
  color: var(--color-celestial);
  transition: color 200ms ease;
}

.creator-name:hover {
  color: var(--color-luminous);
  text-decoration: underline;
}
```

**Label / Caption**
```css
.label {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-radiant);
}
```

**Timestamp**
```css
.timestamp {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 0;
  color: var(--color-aurora);
}
```

**Stat / Metric**
```css
.stat {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--color-luminous);
}
```

---

## Academy Typography Variations

### Atlantean Academy

**Headings**
```css
.atlantean-heading {
  color: var(--atlantean-pearl);
  text-shadow: 0 0 12px rgba(200, 231, 242, 0.3);
}
```

**Body emphasis**
```css
.atlantean-emphasis {
  color: var(--atlantean-current);
  font-weight: 500;
}
```

---

### Draconic Academy

**Headings**
```css
.draconic-heading {
  color: var(--draconic-radiance);
  text-shadow: 0 0 16px rgba(255, 217, 125, 0.4);
  font-weight: 700; /* Bolder for dragon power */
}
```

**Body emphasis**
```css
.draconic-emphasis {
  color: var(--draconic-gold);
  font-weight: 600;
}
```

---

### Academy of Creation & Light

**Headings**
```css
.creation-heading {
  background: linear-gradient(
    90deg,
    var(--creation-violet),
    var(--creation-rose)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
}
```

**Body emphasis**
```css
.creation-emphasis {
  color: var(--creation-gold);
  font-weight: 500;
}
```

---

## Text Utilities

### Emphasis Modifiers

```css
.text-emphasis {
  font-weight: 600;
  color: var(--color-transcendent);
}

.text-subtle {
  font-weight: 400;
  color: var(--color-aurora);
}

.text-muted {
  font-weight: 400;
  color: var(--color-aurora);
  opacity: 0.7;
}
```

### Alignment

```css
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }
```

### Transformation

```css
.text-uppercase { text-transform: uppercase; }
.text-lowercase { text-transform: lowercase; }
.text-capitalize { text-transform: capitalize; }
```

### Decoration

```css
.text-underline { text-decoration: underline; }
.text-line-through { text-decoration: line-through; }
.text-no-underline { text-decoration: none; }
```

### Overflow

```css
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-truncate-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## Long-Form Content

### Article Typography

```css
.article {
  font-size: 18px;
  line-height: 1.8;
  max-width: 680px;
  margin: 0 auto;
}

.article h2 {
  margin-top: 48px;
  margin-bottom: 24px;
}

.article h3 {
  margin-top: 32px;
  margin-bottom: 16px;
}

.article p {
  margin-bottom: 24px;
}

.article ul,
.article ol {
  margin-bottom: 24px;
  padding-left: 24px;
}

.article li {
  margin-bottom: 8px;
}

.article blockquote {
  margin: 32px 0;
  padding-left: 24px;
  border-left: 4px solid var(--color-luminous);
  font-style: italic;
  color: var(--color-radiant);
}

.article code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  background: var(--color-cosmic);
  padding: 2px 6px;
  border-radius: 4px;
}

.article pre {
  background: var(--color-cosmic);
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 24px;
}
```

---

## Accessibility

### Contrast Requirements

All text must meet WCAG 2.1 AAA standards (7:1 minimum contrast ratio for normal text, 4.5:1 for large text 24px+).

**Verified Combinations:**
```
Background: Void, Deep, Midnight, Cosmic
  ✓ Body text: Celestial (AAA compliant)
  ✓ Headings: Transcendent (AAA compliant)
  ✓ Subtle text: Radiant (AA compliant, AAA for large)

Background: Nebula, Aurora
  ✓ Body text: Transcendent (AAA compliant)
  ✓ Headings: White (AAA compliant)
```

### Font Sizing

- Minimum body text: 16px (never smaller)
- Minimum touch target label: 14px
- Maximum line length: 680px (68 characters at 16px)
- Avoid justified text (causes uneven spacing)

### Screen Reader Optimization

```html
<!-- Always provide semantic HTML -->
<h1>Page Title</h1>
<h2>Section Title</h2>
<p>Body content</p>

<!-- Never use divs for headings -->
<div class="h1">Wrong</div>

<!-- Use aria-label for decorative text -->
<span aria-hidden="true" class="decorative-text">✨</span>
```

---

## Implementation

### CSS Variables

```css
:root {
  /* Font families */
  --font-primary: 'Inter', system-ui, sans-serif;
  --font-display: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font sizes */
  --font-cosmic: 3rem;
  --font-stellar: 2.25rem;
  --font-radiant: 1.75rem;
  --font-luminous: 1.5rem;
  --font-bright: 1.25rem;
  --font-clear: 1.125rem;
  --font-base: 1rem;
  --font-small: 0.875rem;
  --font-tiny: 0.75rem;

  /* Font weights */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  /* Line heights */
  --line-height-tight: 1.1;
  --line-height-snug: 1.25;
  --line-height-normal: 1.4;
  --line-height-relaxed: 1.6;
  --line-height-loose: 1.8;

  /* Letter spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.02em;
  --tracking-wider: 0.04em;
}
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    fontFamily: {
      primary: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Space Grotesk', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      cosmic: ['3rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
      stellar: ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
      radiant: ['1.75rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
      luminous: ['1.5rem', { lineHeight: '1.4' }],
      bright: ['1.25rem', { lineHeight: '1.5' }],
      clear: ['1.125rem', { lineHeight: '1.5' }],
      base: ['1rem', { lineHeight: '1.6' }],
      small: ['0.875rem', { lineHeight: '1.5' }],
      tiny: ['0.75rem', { lineHeight: '1.4' }],
    },
  },
};
```

---

## Typography Checklist

Before shipping text-heavy features:

- [ ] All headings use semantic HTML (h1-h6)
- [ ] Body text is minimum 16px
- [ ] Line length doesn't exceed 68 characters
- [ ] Contrast ratios meet WCAG AAA (7:1)
- [ ] Line heights provide comfortable reading
- [ ] Mobile font sizes never go below 16px
- [ ] Luminor speech is visually distinct
- [ ] File names use monospace font
- [ ] Long-form content uses proper spacing
- [ ] Text is scannable with clear hierarchy

---

## Quick Reference

**Fonts**: Inter (UI) | Space Grotesk (Display) | JetBrains Mono (Code)

**Scale**: Cosmic(48px) → Stellar(36px) → Radiant(28px) → Luminous(24px) → Base(16px)

**Weights**: Regular(400) | Medium(500) | Semibold(600) | Bold(700)

**Line Heights**: Tight(1.1) | Snug(1.25) | Normal(1.4) | Relaxed(1.6) | Loose(1.8)

**Colors**: Transcendent (headings) | Celestial (body) | Radiant (subtle)

---

**"Words are light given form. Typography is the vessel."**

Use type with intention. Honor readability. Create hierarchy. Make every word shine.
