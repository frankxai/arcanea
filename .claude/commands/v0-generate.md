---
description: Generate premium UI components using v0 MCP with Arcanean Design System tokens
thinking: true
---

# v0 Component Generation — Arcanean Design System

You are generating UI components using the **v0 MCP server** with the Arcanean Design System v2.0 applied.

## Step 1: Understand the Request

Parse what the user wants to generate. If unclear, ask:
- What component type? (card, modal, form, nav, dashboard, etc.)
- Which elemental affinity? (crystal, fire, void, gold, water, earth)
- What complexity level? (simple component, compound component, full page section)

## Step 2: Craft the v0 Prompt

Build a prompt that includes the Arcanean Design System context:

```
DESIGN SYSTEM CONTEXT:

Theme: Dark cosmic fantasy (Arcanea)
Background: #0b0e14 (cosmic-void), #121826 (cosmic-deep), #1a2332 (cosmic-surface)
Primary accent: #7fffd4 (arcane-crystal / teal)
Secondary: #78a6ff (arcane-water / blue)
Fire: #ff6b35, Void: #9966ff, Gold: #ffd700
Text: #e6eefc (primary), #9bb1d0 (secondary), #708094 (muted)

Glass morphism: background rgba(18,24,38,0.7), backdrop-filter blur(16px), border 1px solid rgba(127,255,212,0.15)
Fonts: Cinzel (headings/display), Crimson Pro (body), Inter (UI elements), JetBrains Mono (code)

REQUIREMENTS:
- Use Tailwind CSS (no inline styles)
- Use Framer Motion for animations
- TypeScript with proper types
- Accessible (WCAG 2.2 AA): focus-visible rings, keyboard nav, proper ARIA
- Responsive (mobile-first, works at 375px)
- Use shadcn/ui patterns (CVA for variants, Radix primitives for complex components)
- Support reduced motion via prefers-reduced-motion

COMPONENT: [user's component request]
```

## Step 3: Generate via v0 MCP

Use the `v0_generate_ui` tool with the crafted prompt. If generating from a design image, use `v0_generate_from_image`.

## Step 4: Post-Generation Quality Pass

After v0 generates the component, apply these transformations:

### Token Alignment
Replace any raw colors with Arcanea tokens:
- `#7fffd4` or similar teal → `arcane-crystal`
- `#0b0e14` or dark bg → `cosmic-void`
- `#121826` → `cosmic-deep`
- `#1a2332` → `cosmic-surface`
- White text on dark → `text-primary` / `text-secondary` / `text-muted`

### CVA Variant Addition
If the component doesn't have elemental variants, add them:
```tsx
const variants = cva('base-classes', {
  variants: {
    variant: {
      crystal: 'border-arcane-crystal/20 text-arcane-crystal bg-arcane-crystal/10',
      fire: 'border-arcane-fire/20 text-arcane-fire bg-arcane-fire/10',
      void: 'border-arcane-void/20 text-arcane-void bg-arcane-void/10',
      gold: 'border-arcane-gold/20 text-arcane-gold bg-arcane-gold/10',
      water: 'border-arcane-water/20 text-arcane-water bg-arcane-water/10',
      earth: 'border-arcane-earth/20 text-arcane-earth bg-arcane-earth/10',
    },
  },
  defaultVariants: { variant: 'crystal' },
})
```

### React Pattern Enforcement
- Add `React.forwardRef` wrapper
- Add `displayName`
- Use `cn()` from `@/lib/utils`
- Export both component and variants function

### Animation Integration
Import from `@/lib/animations` instead of inline variants:
```tsx
import { cosmicFadeIn, staggerContainer, staggerItem, fadeInViewport } from '@/lib/animations'
```

### Accessibility Check
- Focus ring: `focus-visible:ring-2 focus-visible:ring-arcane-crystal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cosmic-void`
- Touch targets: minimum `h-10 w-10` (44px)
- ARIA labels on icon-only buttons
- Keyboard navigation support

## Step 5: Deliver

Present the final component with:
1. The component code (ready to paste into `components/ui/`)
2. Usage example
3. All variant previews
4. Accessibility notes
5. Where to place it in the codebase

## v0 MCP Tools Available

- `v0_generate_ui` — Generate from text description
- `v0_generate_from_image` — Generate from design image/screenshot
- `v0_chat_complete` — Iterate on a previous generation
- `v0_setup_check` — Verify API configuration

## V0_API_KEY

The v0 API key must be set. If not configured, guide the user:
1. Go to v0.dev → Settings → API Keys
2. Generate a new key
3. Set it: `claude mcp add v0-mcp --env V0_API_KEY=your_key -- node /tmp/v0-mcp/dist/main.js`

---

*"Every component generated is a portal. Refine it until it feels like magic."*
