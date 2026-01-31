# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm install && npm run dev     # Dev server at localhost:3000
npm run build                  # Production build

# CLI
npm run scan                   # Index library
npm run search "query"         # Semantic search
npm run analyze ./file         # Analyze file

# Testing
npm test                       # Jest (80% coverage threshold)
npm run test:e2e               # Playwright
npm run lint && npm run format # Code quality
```

## Modes

Arcanea uses 7 core modes for different creative tasks. Invoke with `/mode` or let the system auto-detect.

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

## Architecture

```
arcanea/
├── arcanea-magical-agent.js   # Main CLI entry
├── arcanea-agents/
│   ├── registry.js            # 64+ agent definitions
│   └── luminor-conductor.js   # Multi-agent orchestration
├── pages/                     # Next.js web interface
├── core/
│   ├── agents/                # Agent implementations
│   ├── knowledge/             # Canon, reference data
│   └── engine/                # Processing engines
├── spec/                      # .arc language specification
└── lore/                      # Mythology (optional depth)
```

## .arc Files

Arcanea uses `.arc` files for executable AI workflows. See `spec/arc-language.md` for full specification.

```arc
@mode create
@task "Design a character"
@depth deep
@output character-bible
```

## Integration

- **Supabase**: `supabase-config.js` for cloud storage/auth
- **MCP**: `arcanea-mcp-bridge.py` for tool integration
- **Mobile**: `arcanea-mobile/` for React Native

## Philosophy

Arcanea treats creative work as meaningful, not mechanical. Different modes optimize for different creative states. The mythology (in `lore/`) provides depth for those who seek it—it's enrichment, not requirement.

For system design details: `AGENT_ARCHITECTURE_v4.md`, `IMPLEMENTATION_ARCHITECTURE.md`
