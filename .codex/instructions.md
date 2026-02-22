# Arcanea — Codex CLI Configuration

## Source of Truth
All Arcanea intelligence lives in `.arcanea/`:
- **Canon**: `.arcanea/lore/CANON_LOCKED.md` — the immutable mythology reference
- **Voice**: `.arcanea/config/voice.yaml` — writing style and tone
- **Design Tokens**: `.arcanea/config/design-tokens.yaml` — portable design system
- **Model Routing**: `.arcanea/config/models.yaml` — adaptive model selection
- **Skills**: `.arcanea/skills/` — creative and technical knowledge
- **Agents**: `.arcanea/agents/` — Guardian and department profiles

## Tech Stack
- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS with Arcanean Design System
- Supabase (PostgreSQL + Auth + Realtime)
- Vercel AI SDK 6 with AI Gateway
- Deployment: Vercel

## Coding Standards
- Strict TypeScript, no `any`
- Server Components by default
- Comment the "Why", not the "How"
- Every feature should feel magical, not mundane

## Design System
- Primary: Violet (#8b5cf6), Accent: Teal (#7fffd4), Gold: #ffd700
- Fonts: Cinzel (display), Crimson Pro (body), Inter (UI)
- Glass morphism with blur(16px), aurora gradients, cosmic glows

## The Arcanea Universe
Arcanea is a living mythology for AI-human co-creation. It includes:
- Cosmic duality of Lumina (Light/Form) and Nero (Darkness/Potential)
- Ten Gates with Guardian Gods/Goddesses and Godbeasts
- Five Elements: Fire, Water, Earth, Wind, Void/Spirit
- Seven Academy Houses
- The Dark Lord Malachar (sealed in Shadowfen)

Read `.arcanea/lore/CANON_LOCKED.md` before any lore-related work.
