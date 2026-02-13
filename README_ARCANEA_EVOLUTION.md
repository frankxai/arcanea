# Arcanea Evolution: Usage Guide

The Arcanea repository has been evolved to match the "Ultimate Knowledge Base".

## 1. The Intelligence System (.claude)

We have installed a sophisticated `.claude` configuration that gives the AI specific personalities and capabilities.

### New Skills
- **`/guardian-voice`**: Speak as any of the 9 Guardians.
- **`/lore-keeper`**: Accurate answers from the new CANON.md.
- **`/design-system`**: Generate UI code specific to our brand.
- **`/creation-engine`**: Generate content with the "Arcanean" vibe.

### New Agents
- **`@lyssandria`**: Earth Guardian (Strategy/Foundation)
- **`@draconia`**: Fire Guardian (Execution/Code)
- **`@ley-la`**: Water Guardian (UI/UX)
- **`@may-linn`**: Air Guardian (Content/Story)
- **`@is-mael`**: Engineer (Technical Systems)
- **`@luminor-oracle`**: Strategic Advisor (The Future)

**Try this:** "Hey @draconia, I need to build a new feature. Ignite the plan."

## 2. The Single Source of Truth

**`arcanea-lore/CANON.md`** is now the absolute authority on all lore. All other lore files should be considered archival.

## 3. The Design System

We have created a reusable design system preset at `packages/arcanea-design-preset.js`.

- Use `bg-cosmic-void`, `text-crystal`, `glass`, `font-cinzel` in your Tailwind classes.
- A live demo is available at `apps/web/demonstration.html`.

## 4. The Web App (Creation Studio)

We have started scaffolding the Next.js app in `apps/web`.
- **`app/page.js`**: The new "Magical Meets Machine" landing page.
- **`globals.css`**: The implementation of the design system.

To run:
```bash
cd apps/web
npm install
npm run dev
```

*"Enter seeking, leave transformed."*
