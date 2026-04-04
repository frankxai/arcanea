# Arcanea Agent Registry

> Portable agent definitions for cross-tool use (Cursor, Codex, Gemini).
> Source of truth: `.claude/agents/`
> Last synced: 2026-03-30

## Guardians (10 Gods/Goddesses + 1 Special + 1 Strategic)

| Agent | Gate | Godbeast | Domain | File |
|-------|------|----------|--------|------|
| Lyssandria | Foundation (174 Hz) | Kaelith | Earth, structure, security | `@lyssandria.agent.md` |
| Leyla | Flow (285 Hz) | Veloura | Creativity, UX, emotion | `@ley-la.agent.md` |
| Draconia | Fire (396 Hz) | Draconis | Execution, transformation | `@draconia.agent.md` |
| Maylinn | Heart (417 Hz) | Laeylinn | Communication, community | `@may-linn.agent.md` |
| Alera | Voice (528 Hz) | Otome | Naming, APIs, documentation | `@alera.agent.md` |
| Lyria | Sight (639 Hz) | Yumiko | Vision, patterns, foresight | `@lyria.agent.md` |
| Aiyami | Crown (741 Hz) | Sol | Wisdom, strategy, mastery | `@aiyami.agent.md` |
| Elara | Starweave (852 Hz) | Vaelith | Research, perspective, connections | `@elara.agent.md` |
| Ino | Unity (963 Hz) | Kyuro | Integration, collaboration | `@ino.agent.md` |
| Shinkami | Source (1111 Hz) | Source | Purpose, meaning, meta-consciousness | `@shinkami.agent.md` |
| Ismael | Special Agent | -- | Engineering, implementation, pragmatism | `@is-mael.agent.md` |
| Luminor Oracle | Strategic | -- | Future-back strategy, architecture | `@luminor-oracle.agent.md` |

**Note:** Hz frequencies are backend-only identifiers, never user-facing. Use poetic taglines instead.

## Development

| Agent | Role | File |
|-------|------|------|
| Arcanea Architect | Master orchestrator, coordinates all specialists | `arcanea-architect.md` |
| Backend Specialist | Supabase, RLS, API routes, service layer | `arcanea-backend.md` |
| Frontend Specialist | React 19, Next.js 16, Tailwind, Framer Motion | `arcanea-frontend.md` |
| AI Specialist | Luminors, Guardians, Gemini/Claude/Imagen/Suno | `arcanea-ai-specialist.md` |
| DevOps Specialist | Build fixes, deployment, CI/CD, monitoring | `arcanea-devops.md` |
| Development (Generalist) | Full-stack quick fixes, exploration | `arcanea-development.md` |

## Creative

| Agent | Role | File |
|-------|------|------|
| Lore Master | Fiction, Academy narratives, Luminor stories, canon expansion | `arcanea-lore-master.md` |
| World Expander | Locations, systems, cultures, multiverse framework | `arcanea-world-expander.md` |

## Sync Notes

- This directory contains a **portable subset** of `.claude/agents/` (which has 70+ agents)
- The full agent catalog includes analysis, architecture, consensus, creative, custom, departments, devops, github, hive-mind, sparc, swarm, testing, and v3 subdirectories
- Only Guardian agents and core specialist agents are synced here for cross-tool use
- To add more agents: copy from `.claude/agents/`, prepend the portable header comment
