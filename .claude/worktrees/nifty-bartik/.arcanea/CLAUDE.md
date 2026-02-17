# Arcanea Workspace Hub

You are operating within the Arcanea multi-repository development environment.

## Workspace Structure

```
arcanea/
├── .arcanea/              # Workspace configuration
├── arcanea-agents/        # Agent registry and orchestration
├── core/                  # Modes, skills, knowledge
├── pages/                 # Next.js web interface
├── lore/                  # Mythology (optional depth)
├── spec/                  # .arc language specification
├── intelligence-os/       # CLI and agent system
├── arcanea-mobile/        # Mobile app
└── labs/                  # Experiments
```

## Modes

| Mode | Invoke | Purpose |
|------|--------|---------|
| Create | `/create` | Generate, ideate, bold work |
| Analyze | `/analyze` | Evaluate, research, understand |
| Refine | `/refine` | Edit, polish, perfect |
| Structure | `/structure` | Architect, organize, plan |
| Express | `/express` | Communicate, document, voice |
| Vision | `/vision` | Future-sight, possibilities |
| Orchestrate | `/orchestrate` | Multi-mode coordination |

## Routing

| Task Type | Mode | Repository |
|-----------|------|------------|
| Web development | Create/Refine | `pages/`, `apps/` |
| Agent work | Orchestrate | `arcanea-agents/` |
| CLI tools | Structure | `intelligence-os/` |
| Experiments | Vision | `labs/` |
| Documentation | Express | `docs/` |

## Commands

```bash
npm run dev          # Start development
npm run scan         # Index library
npm test             # Run tests
```

## Key Files

| Purpose | Location |
|---------|----------|
| Agent registry | `arcanea-agents/registry.js` |
| Orchestration | `arcanea-agents/luminor-conductor.js` |
| Mode definitions | `core/modes/modes.yaml` |
| .arc spec | `spec/arc-language.md` |
| Skill system | `SKILL.md` |

## Philosophy

Arcanea is both a **creative framework** and a **mythological world**. The framework (modes, agents, skills) handles work. The world (in `lore/`) provides deeper meaning for those who seek it.

Use what serves the task.
