# Arcanean Components

Beautiful, magical UI components for the Arcanea MVP built on shadcn/ui with cosmic theming.

## Quick Start

```tsx
import { Button, CosmicCard, AcademyBadge } from '@/components/ui';
import { MainLayout, PageContainer } from '@/components/layout';
```

## Components Overview

### UI Components

- **Button** - Enhanced button with cosmic and academy variants
- **CosmicCard** - Card with glow, shimmer, and glass effects
- **CosmicGradient** - Animated background gradients
- **GlowEffect** - Magical glow overlay
- **AcademyBadge** - Academy affiliation badges
- **BondIndicator** - Guardian bond level visualization

### Layout Components

- **MainLayout** - Page wrapper with cosmic backgrounds
- **PageContainer** - Responsive content container
- **Navigation** - Header navigation with academy theming

## Academy Theming

Three academy themes available:

- **Atlantean** (🌊) - Story & Lore - Blues and teals
- **Draconic** (🐉) - Visual Art - Crimson and gold
- **Creation** (✨) - Music - White and prismatic

```tsx
<CosmicCard academy="atlantean">
  Atlantean themed card
</CosmicCard>

<Button variant="draconic">
  Draconic themed button
</Button>
```

## Documentation

Full documentation available in:
- `/docs/mvp/UI_THEME_GUIDE.md` - Complete theme guide
- `/lib/animations.ts` - Animation library
- `/lib/theme-utils.ts` - Theme utilities
- `/styles/themes/arcanean-colors.css` - Color system

## File Structure

```
components/
├── ui/                     # UI components
│   ├── button.tsx
│   ├── cosmic-card.tsx
│   ├── cosmic-gradient.tsx
│   ├── glow-effect.tsx
│   ├── academy-badge.tsx
│   ├── bond-indicator.tsx
│   └── index.ts
├── layout/                 # Layout components
│   ├── main-layout.tsx
│   ├── navigation.tsx
│   └── index.ts
└── README.md
```

## Examples

### Cosmic Card with Glow

```tsx
<CosmicCard glow shimmer academy="atlantean">
  <CosmicCardHeader>
    <CosmicCardTitle>Title</CosmicCardTitle>
  </CosmicCardHeader>
  <CosmicCardContent>
    Content
  </CosmicCardContent>
</CosmicCard>
```

### Academy Badge

```tsx
<AcademyBadge academy="draconic" size="lg" glow />
```

### Guardian Bond Level

```tsx
<BondIndicator level={25} variant="detailed" showLabel />
```

### Page Layout

```tsx
<MainLayout academy="creation" showGradient showGrid>
  <Navigation academy="creation" />
  <PageContainer maxWidth="xl">
    {/* Your content */}
  </PageContainer>
</MainLayout>
```

## Accessibility

All components follow WCAG 2.1 AA standards:
- Proper focus indicators
- Keyboard navigation
- Screen reader support
- Respects `prefers-reduced-motion`

## Performance

- CSS-first animations
- Optimized with `tailwind-merge`
- Lazy loading support
- Minimal JavaScript
