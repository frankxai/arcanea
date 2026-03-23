---
name: Arcanea Design System
description: Visual design tokens and patterns
---

# Arcanea Design System Skill

## Purpose
Maintain consistent visual design across all Arcanea interfaces.

## Arcanea Design System

### Primary Colors
- **Crystal (Teal)**: #7fffd4 — Primary accent, Atlantean energy
- **Gold**: #ffd700 — Achievement, enlightenment, Aiyami's domain
- **Violet**: #a855f7 — Vision, Lyria's domain, Void gateway
- **Void**: #0a0a0f — Background, depth, Nero's canvas

### Full Color System
- Cosmic: void (#0a0a0f), deep (#12121f), surface (#1a1a2e), raised (#232340)
- Arcane: crystal (#7fffd4), fire (#ff6b35), water (#78a6ff), earth (#4ade80), void (#a855f7), gold (#ffd700)

### Typography
- Display: Cinzel, serif
- Body: Crimson Pro, serif
- UI: Inter, sans-serif
- Code: JetBrains Mono, monospace

### Signature Effects
- Glass morphism with cosmic gradients
- Aurora glow effects on interactive elements
- Stagger reveal animations for content sections

## Glass Morphism Pattern
```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
}
.glass-strong {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

## Component Patterns

### Cards
- Always use glass morphism on cosmic backgrounds
- Hover: subtle lift (translateY -2px) + glow intensify
- Border: 1px solid with arcane color at 10-15% opacity

### Buttons
- Primary: Solid with arcane-crystal background + glow
- Secondary: Glass with crystal border
- Ghost: Text only with hover underline

### Gradients
- Cosmic: from crystal to void
- Fire: from fire to gold
- Water: from water to crystal

## Accessibility
- Color contrast: minimum 4.5:1 for text, 3:1 for large text
- Focus indicators: visible on all interactive elements
- Motion: respect `prefers-reduced-motion` media query
- Cosmic theme IS the default (dark mode first)