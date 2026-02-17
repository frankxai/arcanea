# Arcanea MVP UI Theme Guide

## Overview

The Arcanean UI theme is a cosmic-magical design system built on top of shadcn/ui, customized for the three-academy system with beautiful animations, glow effects, and academy-specific theming.

## Design Philosophy

1. **Cosmic Foundation** - Deep space backgrounds with subtle magical effects
2. **Academy Identity** - Each academy has distinct color palettes and visual language
3. **Subtle Magic** - Animations enhance without overwhelming
4. **Accessible First** - WCAG 2.1 AA compliance throughout
5. **Performance** - CSS-first animations, optimized for all devices

---

## Color System

### Global Arcanean Palette

#### Cosmic Backgrounds
```css
--cosmic-void: #0b0e14       /* Deepest space */
--cosmic-deep: #121826       /* Main background */
--cosmic-surface: #1a2332    /* Elevated surfaces */
--cosmic-raised: #242f42     /* Highest elevation */
```

#### Text Hierarchy
```css
--text-primary: #e6eefc      /* Primary text */
--text-secondary: #9bb1d0    /* Secondary text */
--text-muted: #708094        /* Muted text */
--text-disabled: #515b6b     /* Disabled state */
```

#### Universal Gold Accent
```css
--gold-bright: #ffcc33       /* Primary accent */
--gold-medium: #ffd966       /* Medium gold */
--gold-deep: #e6b800         /* Deep gold */
```

### Academy-Specific Colors

#### Atlantean Academy (Story/Water) 🌊
**Theme**: Deep ocean wisdom, flowing narratives

```css
/* Primary Blues */
--atlantean-deep: #0f3566
--atlantean-primary: #1e5a99
--atlantean-medium: #3d7fcc
--atlantean-light: #6ba5e5

/* Teal Accents (Bioluminescent) */
--atlantean-teal: #26cccc
--atlantean-aqua: #5ce6d9
--atlantean-glow: #00e6e6    /* Magical glow effect */
```

**Visual Identity**:
- Flowing, curved shapes
- Water-themed animations (wave, ripple, flow)
- Bioluminescent glow effects
- Deep blue to teal gradients

#### Draconic Academy (Visual/Sky) 🐉
**Theme**: Soaring creativity, bold vision, dragon fire

```css
/* Crimson (Dragon Fire) */
--draconic-crimson: #d92952
--draconic-crimson-bright: #f23d6b

/* Gold (Dragon Scales) */
--draconic-gold: #ffc61a
--draconic-gold-bright: #ffdb4d

/* Sky Blue (Soaring Heights) */
--draconic-sky: #2d8fe6
--draconic-sky-bright: #5caef5
```

**Visual Identity**:
- Angular, geometric shapes
- Fire and flight animations
- Bold color contrasts
- Crimson to gold gradients

#### Creation & Light Academy (Music/Light) ✨
**Theme**: Pure creative energy, harmonic light

```css
/* Pure White/Light */
--creation-pure: #ffffff
--creation-gold: #ffcc33

/* Prismatic Rainbow (Refracted Light) */
--creation-prism-red: #f23d52
--creation-prism-orange: #ff8c1a
--creation-prism-yellow: #ffe500
--creation-prism-green: #20cc73
--creation-prism-cyan: #26d9d9
--creation-prism-blue: #2d85f5
--creation-prism-purple: #8c3df5
```

**Visual Identity**:
- Radial, star-like patterns
- Prismatic rainbow effects
- Sound wave visualizations
- Light to gold gradients

---

## Components

### Buttons

#### Variants

```tsx
import { Button } from '@/components/ui/button';

// Standard variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Cosmic variants
<Button variant="cosmic">Cosmic</Button>
<Button variant="atlantean">Atlantean</Button>
<Button variant="draconic">Draconic</Button>
<Button variant="creation">Creation</Button>
<Button variant="glow">Magical Glow</Button>
```

#### Sizes
```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon">Icon</Button>
```

### Cosmic Card

Enhanced card component with optional glow and shimmer effects.

```tsx
import {
  CosmicCard,
  CosmicCardHeader,
  CosmicCardTitle,
  CosmicCardDescription,
  CosmicCardContent,
  CosmicCardFooter,
} from '@/components/ui/cosmic-card';

<CosmicCard glow shimmer academy="atlantean">
  <CosmicCardHeader>
    <CosmicCardTitle>Card Title</CosmicCardTitle>
    <CosmicCardDescription>Description text</CosmicCardDescription>
  </CosmicCardHeader>
  <CosmicCardContent>
    Card content goes here
  </CosmicCardContent>
  <CosmicCardFooter>
    Footer actions
  </CosmicCardFooter>
</CosmicCard>
```

**Props**:
- `glow` - Adds magical glow effect
- `shimmer` - Adds shimmer animation
- `glass` - Glass morphism effect
- `academy` - Academy-specific theming

### Cosmic Gradient

Animated background gradient component.

```tsx
import { CosmicGradient } from '@/components/ui/cosmic-gradient';

<div className="relative">
  <CosmicGradient variant="atlantean" animated opacity={0.15} />
  <div className="relative z-10">Content here</div>
</div>
```

**Props**:
- `variant` - 'cosmic' | 'atlantean' | 'draconic' | 'creation'
- `animated` - Enable animation (default: true)
- `opacity` - Gradient opacity (default: 0.15)

### Glow Effect

Magical glow overlay for emphasis.

```tsx
import { GlowEffect } from '@/components/ui/glow-effect';

<GlowEffect variant="atlantean" intensity="high" animated>
  <div>Content with glow</div>
</GlowEffect>
```

**Props**:
- `variant` - Academy or cosmic theme
- `intensity` - 'low' | 'medium' | 'high'
- `animated` - Pulse animation (default: true)

### Academy Badge

Display academy affiliation.

```tsx
import { AcademyBadge } from '@/components/ui/academy-badge';

<AcademyBadge academy="atlantean" size="md" glow />
```

**Props**:
- `academy` - Academy type (required)
- `size` - 'sm' | 'md' | 'lg'
- `glow` - Show glow effect
- `animated` - Hover animations

### Bond Indicator

Visual display of Guardian bond level (1-50).

```tsx
import { BondIndicator } from '@/components/ui/bond-indicator';

// Compact variant
<BondIndicator level={25} variant="compact" showLabel />

// Detailed variant
<BondIndicator level={42} variant="detailed" showLabel />
```

**Bond Tiers**:
- Novice (1-5): Gray tones
- Intermediate (6-10): Atlantean blues
- Advanced (11-20): Sky blues
- Expert (21-35): Dragon gold
- Master (36-49): Crimson + gold
- Legendary (50): Prismatic rainbow

---

## Layout Components

### Main Layout

Page wrapper with cosmic background effects.

```tsx
import { MainLayout, PageContainer } from '@/components/layout/main-layout';

<MainLayout academy="atlantean" showGradient showGrid>
  <PageContainer maxWidth="xl">
    <h1>Page Content</h1>
  </PageContainer>
</MainLayout>
```

**MainLayout Props**:
- `academy` - Sets theme context
- `showGradient` - Animated background gradient
- `showGrid` - Cosmic grid pattern

**PageContainer Props**:
- `maxWidth` - 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

### Navigation

Responsive navigation with academy theming.

```tsx
import { Navigation } from '@/components/layout/navigation';

<Navigation academy="atlantean" />
```

---

## Animations

### Using Framer Motion Variants

```tsx
import { motion } from 'framer-motion';
import {
  cosmicFadeIn,
  atlanteanFlow,
  draconicFlame,
  creationRadialPulse,
} from '@/lib/animations';

// Cosmic fade in
<motion.div variants={cosmicFadeIn} initial="hidden" animate="visible">
  Content
</motion.div>

// Atlantean flowing effect
<motion.div variants={atlanteanFlow} initial="initial" animate="animate">
  Water-themed content
</motion.div>
```

### Available Animation Variants

#### Cosmic
- `cosmicFadeIn` - Fade in with scale
- `cosmicSlideUp` - Slide up fade in
- `cosmicGlow` - Glow on hover
- `shimmerEffect` - Shimmer transition

#### Atlantean (Water)
- `atlanteanFlow` - Gentle flowing motion
- `atlanteanRipple` - Ripple expand effect
- `atlanteanWave` - Wave animation

#### Draconic (Fire/Sky)
- `draconicFlame` - Flickering fire effect
- `draconicSoar` - Soaring flight animation
- `draconicEmber` - Rising ember particles

#### Creation (Light)
- `creationPrism` - Rotating prism colors
- `creationRadialPulse` - Radial pulse from center
- `creationFrequency` - Sound wave bars

### Stagger Animations

```tsx
import { staggerContainer, staggerItem } from '@/lib/animations';

<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={staggerItem}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## Theme Utilities

### Applying Academy Themes

```tsx
import { applyAcademyTheme, getCurrentAcademyTheme } from '@/lib/theme-utils';

// Apply theme to entire page
applyAcademyTheme('atlantean');

// Get current theme
const currentAcademy = getCurrentAcademyTheme();

// Apply to specific element
const element = document.getElementById('card');
applyAcademyTheme('draconic', element);
```

### Academy-Specific Classes

```tsx
import { getAcademyClasses } from '@/lib/theme-utils';

const classes = getAcademyClasses('atlantean');
// Returns: { text, bg, border, glow }

<div className={classes.bg}>
  <p className={classes.text}>Atlantean styled content</p>
</div>
```

### Responsive Utilities

```tsx
import { isMobile, isTablet, isDesktop, getCurrentBreakpoint } from '@/lib/theme-utils';

const breakpoint = getCurrentBreakpoint();
// Returns: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

if (isMobile()) {
  // Mobile-specific logic
}
```

### Accessibility

```tsx
import { prefersReducedMotion, getAnimationClass } from '@/lib/theme-utils';

// Respect user preferences
const animClass = getAnimationClass('animate-float');
// Returns empty string if user prefers reduced motion

<div className={animClass}>
  Animated content
</div>
```

---

## CSS Utility Classes

### Glow Effects

```css
.glow-soft         /* Soft cosmic glow */
.glow-medium       /* Medium glow */
.glow-strong       /* Strong golden glow */
.glow-atlantean    /* Atlantean teal glow */
.glow-draconic     /* Draconic gold glow */
.glow-creation     /* Creation light glow */
```

### Text Glow

```css
.text-glow-soft        /* Soft text glow */
.text-glow-atlantean   /* Atlantean text glow */
.text-glow-draconic    /* Draconic text glow */
.text-glow-creation    /* Creation text glow */
```

### Glass Morphism

```css
.glass         /* Standard glass effect */
.glass-light   /* Lighter glass */
.glass-heavy   /* Heavier glass with more blur */
```

### Shimmer Effect

```css
.shimmer       /* Animated shimmer effect */
```

### Scrollbar Styling

```css
.scrollbar-thin    /* Thin custom scrollbar */
.scrollbar-hide    /* Hide scrollbar, keep functionality */
```

---

## Tailwind Animations

### Cosmic

```tsx
<div className="animate-pulse-glow">Pulsing glow</div>
<div className="animate-shimmer bg-gradient-to-r ...">Shimmer</div>
<div className="animate-float">Floating element</div>
<div className="animate-float-slow">Slow float</div>
```

### Atlantean

```tsx
<div className="animate-wave">Wave motion</div>
<div className="animate-ripple">Ripple effect</div>
<div className="animate-flow">Flowing element</div>
```

### Draconic

```tsx
<div className="animate-flame">Flame flicker</div>
<div className="animate-soar">Soaring motion</div>
<div className="animate-ember">Rising ember</div>
```

### Creation

```tsx
<div className="animate-prism-rotate bg-prism-gradient">Prism rotation</div>
<div className="animate-radial-pulse">Radial pulse</div>
<div className="animate-frequency">Frequency bars</div>
```

---

## Best Practices

### 1. Color Usage

- **Primary actions**: Gold accent colors
- **Academy context**: Use academy-specific colors sparingly
- **Text**: Maintain hierarchy with text-primary/secondary/muted
- **Backgrounds**: Layer cosmic-void → deep → surface → raised

### 2. Animation Guidelines

- Use CSS animations for simple effects (better performance)
- Use Framer Motion for complex, interactive animations
- Always respect `prefers-reduced-motion`
- Keep animation duration under 500ms for UI interactions
- Background animations can be slower (2-5s)

### 3. Accessibility

- Maintain 4.5:1 contrast ratio minimum (WCAG AA)
- Provide focus indicators on all interactive elements
- Use semantic HTML
- Test with keyboard navigation
- Support screen readers with proper ARIA labels

### 4. Performance

- Lazy load images and heavy animations
- Use `will-change` sparingly (only when necessary)
- Prefer `transform` and `opacity` for animations
- Minimize repaints with CSS containment
- Use `IntersectionObserver` for scroll animations

### 5. Responsive Design

```tsx
// Mobile-first approach
<div className="px-4 sm:px-6 lg:px-8">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">
    Responsive heading
  </h1>
</div>
```

### 6. Dark Mode (Default)

Our theme is dark-first. Light mode is available but secondary.

```tsx
// Force dark mode (default)
<html className="dark">

// Optional light mode
<html className="light">
```

---

## Example: Complete Page

```tsx
import { MainLayout, PageContainer } from '@/components/layout/main-layout';
import { Navigation } from '@/components/layout/navigation';
import { CosmicCard, CosmicCardHeader, CosmicCardTitle, CosmicCardContent } from '@/components/ui/cosmic-card';
import { Button } from '@/components/ui/button';
import { AcademyBadge } from '@/components/ui/academy-badge';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function ExamplePage() {
  return (
    <MainLayout academy="atlantean" showGradient showGrid>
      <Navigation academy="atlantean" />

      <PageContainer maxWidth="xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Page Header */}
          <motion.div variants={staggerItem} className="space-y-4">
            <AcademyBadge academy="atlantean" size="lg" />
            <h1 className="text-5xl font-bold aurora-text">
              Welcome to Atlantean Academy
            </h1>
            <p className="text-xl text-text-secondary">
              Master the art of storytelling and lore creation
            </p>
          </motion.div>

          {/* Content Grid */}
          <motion.div
            variants={staggerItem}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <CosmicCard glow academy="atlantean">
              <CosmicCardHeader>
                <CosmicCardTitle>Storytelling</CosmicCardTitle>
              </CosmicCardHeader>
              <CosmicCardContent>
                <p className="text-text-secondary">
                  Weave narratives that flow like water
                </p>
              </CosmicCardContent>
            </CosmicCard>

            <CosmicCard glow academy="atlantean">
              <CosmicCardHeader>
                <CosmicCardTitle>World Building</CosmicCardTitle>
              </CosmicCardHeader>
              <CosmicCardContent>
                <p className="text-text-secondary">
                  Create depths of lore and meaning
                </p>
              </CosmicCardContent>
            </CosmicCard>

            <CosmicCard glow academy="atlantean">
              <CosmicCardHeader>
                <CosmicCardTitle>Mythology</CosmicCardTitle>
              </CosmicCardHeader>
              <CosmicCardContent>
                <p className="text-text-secondary">
                  Design living mythologies
                </p>
              </CosmicCardContent>
            </CosmicCard>
          </motion.div>

          {/* CTA */}
          <motion.div variants={staggerItem} className="flex gap-4">
            <Button variant="atlantean" size="lg">
              Begin Your Journey
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </PageContainer>
    </MainLayout>
  );
}
```

---

## Color Reference Quick Guide

| Context | Atlantean | Draconic | Creation |
|---------|-----------|----------|----------|
| **Primary** | Teal #26cccc | Gold #ffc61a | Gold #ffcc33 |
| **Accent** | Blue #1e5a99 | Crimson #d92952 | Prism Blue #2d85f5 |
| **Glow** | #00e6e6 | #ffdb4d | #ffe680 |
| **Gradient** | Blue → Teal | Crimson → Gold | Gold → Prism |

---

## Support & Resources

- **Component Library**: `/apps/web/components/ui/`
- **Utilities**: `/apps/web/lib/theme-utils.ts`
- **Animations**: `/apps/web/lib/animations.ts`
- **Colors**: `/apps/web/styles/themes/arcanean-colors.css`
- **Tailwind Config**: `/apps/web/tailwind.config.ts`

---

**Created for Arcanea MVP** - Where anyone learns to create anything through magic.
