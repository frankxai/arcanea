---
description: Generate premium UI components using v0 MCP with v0's own design DNA + Arcanean Design System
thinking: true
---

# v0 Component Generation — Ultimate Design Pipeline

You are generating UI components using the **v0 MCP server**, applying v0's design standards combined with the Arcanean Design System v2.0.

## Before You Begin

Read these references:
- `.claude/agents/departments/design/CLAUDE.md` — Department standards
- `.claude/agents/departments/design/design-director.md` — Anti-slop protocol
- `.claude/agents/departments/design/component-architect.md` — Component patterns

---

## Step 1: Understand the Request (v0 3-Input Framework)

### Input 1: Product Surface
- **Components**: What UI elements are needed?
- **Data**: What information is displayed or collected?
- **Actions**: What can the user do?

### Input 2: Context of Use
- **User persona**: Creator, explorer, admin, new user?
- **Moment**: Discovery, creation, reflection, celebration?
- **Device**: Mobile-first? Desktop dashboard? Both?

### Input 3: Constraints & Taste
- **Platform**: Next.js 16, React 19, Tailwind CSS 3.4, TypeScript
- **Visual tone**: Dark cosmic (default) or other aesthetic
- **Must avoid**: Generic AI patterns (Anti-Slop Protocol)

If unclear, ask: component type, elemental affinity, complexity level.

---

## Step 2: Craft the v0 Prompt

```
Build [PRODUCT SURFACE].
Used by [USER PERSONA], in [CONTEXT], to [OUTCOME].

DESIGN SYSTEM:
Theme: Dark cosmic (Arcanea)
Backgrounds: #0b0e14 (void), #121826 (deep), #1a2332 (surface)
Primary: #7fffd4 (arcane-crystal/teal)
Secondary: #78a6ff (water), #9966ff (void)
Accents: #ff6b35 (fire), #ffd700 (gold), #00ff88 (wind)
Text: #e6eefc (primary), #9bb1d0 (secondary), #708094 (muted)
Glass: bg rgba(18,24,38,0.7), blur(16px), border rgba(127,255,212,0.15)
Fonts: Cinzel (headings), Crimson Pro (body), Inter (UI), JetBrains Mono (code)

REQUIREMENTS:
- React 19 + TypeScript strict, Tailwind CSS, Framer Motion
- CVA variants (crystal/fire/void/gold/water/earth)
- forwardRef + displayName, cn() utility
- WCAG 2.2 AA, 44px touch targets, focus-visible rings
- prefers-reduced-motion + prefers-contrast: high

ANTI-SLOP: NO Inter for display, NO purple-on-white, NO cookie-cutter grids

COMPONENT: [description]
```

---

## Step 3: Generate via v0 MCP

- `v0_generate_ui` — From text description
- `v0_generate_from_image` — From design image/screenshot
- `v0_chat_complete` — Iterate on generation
- `v0_setup_check` — Verify API configuration

V0_API_KEY setup: v0.dev > Settings > API Keys > `claude mcp add v0-mcp --env V0_API_KEY=key -- node /tmp/v0-mcp/dist/main.js`

---

## Step 4: Post-Generation Quality Pass

### Token Alignment
Replace raw colors with Arcanea tokens (teal->arcane-crystal, blue->arcane-water, purple->arcane-void, etc.)

### CVA Variant Injection
Add elemental variants if missing (crystal, fire, void, gold, water, earth)

### React Patterns
- [ ] forwardRef + displayName
- [ ] Props interface with VariantProps
- [ ] cn() for class composition
- [ ] Export component + variants

### Animation
Import from `@/lib/animations` instead of inline values

### Accessibility
- [ ] Focus: `focus-visible:ring-2 focus-visible:ring-arcane-crystal/50`
- [ ] Touch targets >= 44px, aria-label on icon buttons
- [ ] Semantic HTML, prefers-reduced-motion

---

## Step 5: Deliver

1. **Component Code** — Complete, paste into `components/ui/`
2. **Usage Examples** — All variants, sizes, states
3. **Accessibility Notes** — Keyboard nav, screen reader
4. **File Placement** — Where in codebase

---

*"Every component should feel hand-crafted by a design studio — not assembled by an AI."*
