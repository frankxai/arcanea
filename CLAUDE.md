# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the Arcanea ecosystem.

## Repository Architecture

**This is a multi-repo ecosystem.** The main `Arcanea/` directory contains multiple independent git repositories.

### Repository Map

```
C:\Users\frank\Arcanea\                    # Main monorepo (arcanea)
│
├── TIER 1: CORE PLATFORM
│   ├── arcanea-ecosystem/                 # Turbo monorepo (Next.js 16.1.1)
│   │   └── arcanea/apps/web/              # Main web app (@arcanea/web)
│   └── arcanea.ai/                        # Premium web experience
│
├── TIER 2: AI SDKs
│   ├── claude-arcanea/                    # Anthropic Claude integration
│   ├── gemini-arcanea/                    # Google Gemini integration
│   └── codex-arcanea/                     # OpenAI integration
│
├── TIER 3: TOOLS
│   ├── arcanea-infogenius/                # AI visual generation
│   ├── arcanea-library-superintelligence/ # Asset management
│   ├── arcanea-opencode/                  # CLI tool
│   └── arcanea-luminor/                   # AI agent personas
│
├── TIER 4: APPS
│   ├── arcanea-mobile/                    # React Native app
│   ├── arcaneabot/                        # Discord bot
│   └── arcanea-game-development/          # Game R&D
│
└── DOCUMENTATION (in main repo)
    ├── Arcanea Big Vision/                # Strategy
    ├── Arcanea World Building.../         # Lore system
    └── .arcanea/                          # Config & scripts
```

### Git Rules

| Content | Commit To |
|---------|-----------|
| Documentation, planning, CLAUDE.md | Main `arcanea` repo |
| Next.js app code | `arcanea-ecosystem` or `arcanea.ai` |
| AI SDK code | `claude-arcanea`, `gemini-arcanea`, `codex-arcanea` |
| Mobile code | `arcanea-mobile` |
| CLI tools | `arcanea-opencode` |

### Sync All Repos

```powershell
# From Windows PowerShell:
cd C:\Users\frank\Arcanea\.arcanea
.\sync-all-repos.ps1
```

See `.arcanea/REPO_REGISTRY.md` for complete repository documentation.

---

## Commands

```bash
# Development (arcanea-ecosystem)
cd arcanea-ecosystem/arcanea && pnpm install && pnpm dev

# Development (arcanea.ai) - USE WINDOWS POWERSHELL for npm install
cd arcanea.ai && npm run dev

# Build
pnpm build                    # Turbo build
npm run build                 # Standard build

# Type Check
pnpm run type-check          # TypeScript validation
npm run type-check

# Testing
npm test                      # Jest
npm run test:e2e              # Playwright
npm run lint                  # ESLint
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.1.1 (App Router, Turbopack) |
| React | React 19.0.0 |
| Language | TypeScript 5.9 (strict) |
| Styling | Tailwind CSS 3.4 |
| Database | Supabase (PostgreSQL) |
| AI | Claude, Gemini, OpenAI |
| Monorepo | Turborepo + pnpm |

---

## Modes

Arcanea uses 7 core modes for different creative tasks:

| Mode | Purpose | Spawns |
|------|---------|--------|
| `/create` | Generate, ideate, bold new work | concept, spark, ignition agents |
| `/analyze` | Evaluate, research, understand deeply | depth, coherence, research agents |
| `/refine` | Edit, polish, perfect existing work | precision, clarity, polish agents |
| `/structure` | Architect, organize, plan systems | foundation, blueprint, scaffold agents |
| `/express` | Communicate, document, find voice | voice, dialogue, narrative agents |
| `/vision` | Future-sight, possibilities, strategy | oracle, possibility, horizon agents |
| `/orchestrate` | Multi-mode for complex tasks | spawns teams across all modes |

For direct agent invocation: `@agent-name task`

---

## Key Files

| File | Purpose |
|------|---------|
| `.arcanea/REPO_REGISTRY.md` | All repos and relationships |
| `.arcanea/sync-all-repos.ps1` | Sync script for Windows |
| `.claude/CLAUDE.md` | Extended instructions |
| `.claude/lore/ARCANEA_CANON.md` | Universe canon |
| `SPRINT_FEB_02_09_2026.md` | Current sprint plan |

---

## WSL2 Notes

- **npm install**: Must run from Windows PowerShell (filesystem locking)
- **git push**: Use Windows or run `sync-all-repos.ps1`
- **pnpm**: Works in WSL2 for arcanea-ecosystem

---

## Philosophy

Arcanea treats creative work as meaningful, not mechanical. Different modes optimize for different creative states. The mythology (in `lore/`) provides depth for those who seek it—it's enrichment, not requirement.

For system design: `AGENT_ARCHITECTURE_v4.md`, `IMPLEMENTATION_ARCHITECTURE.md`
