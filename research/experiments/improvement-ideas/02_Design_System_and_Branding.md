# Design System and Branding — Arcanea Aether UI

<doc type="design-system" version="1.0">

## Principles
- Magical clarity: whimsical language with professional usability.
- Consistency over novelty: token-first implementation, single source of tokens.
- Accessibility: WCAG AA minimum, contrast-aware gradients.

## Stack
- Tailwind CSS 3.4+ with CSS variables for theming.
- shadcn/ui components on top of Radix Primitives.
- Lucide Icons (not “Lucid”) as default icon set.
- Motion: Framer Motion and Tailwind transitions.

## Tokens (packages/design-tokens)
- Colors: `--aether-primary`, `--aether-secondary`, `--aether-surface`, `--aether-elev-*`.
- Radii: `--radius-xs..xl`.
- Blur/Glass: `--frost-*` (blur, saturation, brightness) for glassmorphism.
- Shadows: layered soft glows for “arcane” depth.
- Gradients: named gradients with semantic intents (e.g., `--grad-spellfire`).

Example CSS variables (exported to Tailwind config):
```css
:root {
  --aether-primary: 222 84% 56%;
  --aether-secondary: 276 70% 62%;
  --aether-surface: 222 14% 12%;
  --aether-text: 0 0% 98%;
  --radius-md: 12px;
  --frost-blur: 12px;
  --frost-brightness: 1.2;
}
```

Tailwind preset snippet:
```ts
import type { Config } from 'tailwindcss'
export default {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: 'hsl(var(--aether-primary))' },
        surface: { DEFAULT: 'hsl(var(--aether-surface))' },
      },
      borderRadius: { md: 'var(--radius-md)' },
      backdropBlur: { frost: 'var(--frost-blur)' },
    }
  }
} satisfies Config
```

## Components Policy
- All components live in `packages/ui` with stories and tests.
- Apps can only import from `packages/ui`; no local forks except experimental behind a feature flag.
- Use `lucide-react` icons and expose an `Icon` wrapper for size/color props.

## Glassmorphism Patterns
- Base: translucent surfaces with gradient border and soft inner shadow.
- Example class: `bg-white/5 backdrop-blur-frost ring-1 ring-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,.06)]`.

## Gradients and Textures
- Store in `packages/brand/assets/gradients` and `packages/brand/assets/textures`.
- Source: cssgradient.io, uiGradients, or Typedream packs (license review first). If needed, Frank to provide premium packs; we will convert to CSS variables and image assets.

## Accessibility
- Use Radix primitives; test with Storybook a11y and cypress-axe.

## Brand Voice
- Core lexicon: Magic, Spells, Academy, Realms, Creators, Luminors, Empowerment, Imagination.
- Tone: inspiring, capable, never vague. Use “teach, then charm.”

</doc>

