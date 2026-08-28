# Claude Code Configuration - Claude Flow V3

## Behavioral Rules (Always Enforced)

- Do what has been asked; nothing more, nothing less
- NEVER create files unless they're absolutely necessary for achieving your goal
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (*.md) or README files unless explicitly requested
- NEVER save working files, text/mds, or tests to the root folder
- Never continuously check status after spawning a swarm — wait for results
- ALWAYS read a file before editing it
- NEVER commit secrets, credentials, or .env files

## File Organization

- NEVER save to root folder — use the directories below
- Use `/src` for source code files
- Use `/tests` for test files
- Use `/docs` for documentation and markdown files
- Use `/config` for configuration files
- Use `/scripts` for utility scripts
- Use `/examples` for example code

## Project Architecture

- Follow Domain-Driven Design with bounded contexts
- Keep files under 500 lines
- Use typed interfaces for all public APIs
- Prefer TDD London School (mock-first) for new code
- Use event sourcing for state changes
- Ensure input validation at system boundaries

### Project Config

- **Topology**: hierarchical-mesh
- **Max Agents**: 15
- **Memory**: hybrid
- **HNSW**: Enabled
- **Neural**: Enabled

## Build & Test

```bash
# Build
npm run build

# Test
npm test

# Lint
npm run lint
```

- ALWAYS run tests after making code changes
- ALWAYS verify build succeeds before committing

## Security Rules

- NEVER hardcode API keys, secrets, or credentials in source files
- NEVER commit .env files or any file containing secrets
- Always validate user input at system boundaries
- Always sanitize file paths to prevent directory traversal
- Run `npx @claude-flow/cli@latest security scan` after security-related changes

## Concurrency: 1 MESSAGE = ALL RELATED OPERATIONS

- All operations MUST be concurrent/parallel in a single message
- Use Claude Code's Task tool for spawning agents, not just MCP
- ALWAYS batch ALL todos in ONE TodoWrite call (5-10+ minimum)
- ALWAYS spawn ALL agents in ONE message with full instructions via Task tool
- ALWAYS batch ALL file reads/writes/edits in ONE message
- ALWAYS batch ALL Bash commands in ONE message

## Swarm Orchestration

- MUST initialize the swarm using CLI tools when starting complex tasks
- MUST spawn concurrent agents using Claude Code's Task tool
- Never use CLI tools alone for execution — Task tool agents do the actual work
- MUST call CLI tools AND Task tool in ONE message for complex work

### 3-Tier Model Routing (ADR-026)

| Tier | Handler | Latency | Cost | Use Cases |
|------|---------|---------|------|-----------|
| **1** | Agent Booster (WASM) | <1ms | $0 | Simple transforms (var→const, add types) — Skip LLM |
| **2** | Haiku | ~500ms | $0.0002 | Simple tasks, low complexity (<30%) |
| **3** | Sonnet/Opus | 2-5s | $0.003-0.015 | Complex reasoning, architecture, security (>30%) |

- Always check for `[AGENT_BOOSTER_AVAILABLE]` or `[TASK_MODEL_RECOMMENDATION]` before spawning agents
- Use Edit tool directly when `[AGENT_BOOSTER_AVAILABLE]`

## Swarm Configuration & Anti-Drift

- ALWAYS use hierarchical topology for coding swarms
- Keep maxAgents at 6-8 for tight coordination
- Use specialized strategy for clear role boundaries
- Use `raft` consensus for hive-mind (leader maintains authoritative state)
- Run frequent checkpoints via `post-task` hooks
- Keep shared memory namespace for all agents

```bash
npx @claude-flow/cli@latest swarm init --topology hierarchical --max-agents 8 --strategy specialized
```

## Swarm Execution Rules

- ALWAYS use `run_in_background: true` for all agent Task calls
- ALWAYS put ALL agent Task calls in ONE message for parallel execution
- After spawning, STOP — do NOT add more tool calls or check status
- Never poll TaskOutput or check swarm status — trust agents to return
- When agent results arrive, review ALL results before proceeding

## V3 CLI Commands

### Core Commands

| Command | Subcommands | Description |
|---------|-------------|-------------|
| `init` | 4 | Project initialization |
| `agent` | 8 | Agent lifecycle management |
| `swarm` | 6 | Multi-agent swarm coordination |
| `memory` | 11 | AgentDB memory with HNSW search |
| `task` | 6 | Task creation and lifecycle |
| `session` | 7 | Session state management |
| `hooks` | 17 | Self-learning hooks + 12 workers |
| `hive-mind` | 6 | Byzantine fault-tolerant consensus |

### Quick CLI Examples

```bash
npx @claude-flow/cli@latest init --wizard
npx @claude-flow/cli@latest agent spawn -t coder --name my-coder
npx @claude-flow/cli@latest swarm init --v3-mode
npx @claude-flow/cli@latest memory search --query "authentication patterns"
npx @claude-flow/cli@latest doctor --fix
```

## Available Agents (60+ Types)

### Core Development
`coder`, `reviewer`, `tester`, `planner`, `researcher`

### Specialized
`security-architect`, `security-auditor`, `memory-specialist`, `performance-engineer`

### Swarm Coordination
`hierarchical-coordinator`, `mesh-coordinator`, `adaptive-coordinator`

### GitHub & Repository
`pr-manager`, `code-review-swarm`, `issue-tracker`, `release-manager`

### SPARC Methodology
`sparc-coord`, `sparc-coder`, `specification`, `pseudocode`, `architecture`

## Memory Commands Reference

```bash
# Store (REQUIRED: --key, --value; OPTIONAL: --namespace, --ttl, --tags)
npx @claude-flow/cli@latest memory store --key "pattern-auth" --value "JWT with refresh" --namespace patterns

# Search (REQUIRED: --query; OPTIONAL: --namespace, --limit, --threshold)
npx @claude-flow/cli@latest memory search --query "authentication patterns"

# List (OPTIONAL: --namespace, --limit)
npx @claude-flow/cli@latest memory list --namespace patterns --limit 10

# Retrieve (REQUIRED: --key; OPTIONAL: --namespace)
npx @claude-flow/cli@latest memory retrieve --key "pattern-auth" --namespace patterns
```

## Quick Setup

```bash
claude mcp add claude-flow -- npx -y @claude-flow/cli@latest
npx @claude-flow/cli@latest daemon start
npx @claude-flow/cli@latest doctor --fix
```

## Claude Code vs CLI Tools

- Claude Code's Task tool handles ALL execution: agents, file ops, code generation, git
- CLI tools handle coordination via Bash: swarm init, memory, hooks, routing
- NEVER use CLI tools as a substitute for Task tool agents

## Support

- Documentation: https://github.com/ruvnet/claude-flow
- Issues: https://github.com/ruvnet/claude-flow/issues

---

## Lore canon gate — load-bearing

**Lore, canon, and worldbuilding work goes through the `lore-release-gate` skill first**, before writing lore. It sequences the seven phases (ground in the vault → choose a pattern → draft in register → cross-check → evaluate → stage → promote), routes to the libraries under `docs/worldbuilding/`, and defines what "done" requires: a lint run, an etymology note per coined name, an IP check, and a `canon-evaluation` score that survived its adversarial pass — never a self-assigned verdict.

`.arcanea/lore/CANON_LOCKED.md` is the vault and is **read-only to agents**; promotion from STAGING happens only through `/lock-decision`, by Frank. Note that `arcanea-lore/` and `sync/aios/lore/` are stale mirrors whose frequency tables and godbeast names diverge from the vault — the vault wins.

**The 852 Hz Gate is `Starweave`** (ruled 2026-08-14). The vault always said so; much of the repo — including `.claude/CLAUDE.md` — says "Shift", and that is drift, not an alternative. The linter treats the name as an error on newly added lines; the ~186 pre-existing occurrences across ~30 files are issue #98's sweep, and fail nothing until then.

`.claude/ci/lore-lint.mjs` is the model-free half: superseded names, Gate names, Gate frequencies, godbeast pairings (table and prose), canon-tier banners, and lock claims. Between sessions, `.github/workflows/lore-canon.yml` runs it on every PR touching lore, as a ratchet on newly added lines only. It exists because two locked godbeast renames silently failed to propagate across ~15 files over five months (issue #98) — drift accumulates when nothing checks. Judgment calls belong in the skills; the linter stays near-zero-false-positive so it never gets switched off.

## Web design gate — load-bearing

**Website / web-design work goes through the `web-release-gate` skill first**, before writing UI code. It is the entry point of the `web-excellence` pack in `.claude/skills/` (installed from [`frankxai/claude-skills-library`](https://github.com/frankxai/claude-skills-library) `packs/web-excellence`; re-run its `install.sh` to upgrade). The gate sequences `web-design-guidelines` (live Vercel Web Interface Guidelines audit), `ui-ux-pro-max`, `emil-design-eng` / `apple-design` / `review-animations` for motion, `core-web-vitals`, and `visual-proof`, and defines what "done" requires: audit findings plus before/after screenshots at 375 / 768 / 1440, never a self-assigned score.

Three committed hooks in `.claude/hooks/` make this the default rather than a suggestion — a `SessionStart` note, a `PreToolUse` reminder on the first UI-file edit, and a `Stop` check that blocks once if UI changed with no audit. Those three hooks and `.claude/ci/web-guidelines-lint.mjs` are vendored copies whose tests live with the pack upstream — change them in [`claude-skills-library`](https://github.com/frankxai/claude-skills-library) `packs/web-excellence/` and re-run `install.sh`, rather than hand-editing them here where nothing tests them. Between sessions, `.github/workflows/web-excellence.yml` runs the mechanical subset on every PR that touches a UI file, as a ratchet on newly added lines only. Any `design.md` / `taste.md` (or `DESIGN.md` / `TASTE.md`) in this repo outranks every skill in the pack.

<!-- STARLIGHT-EDITORIAL:START -->
## Editorial contract

Brand: **Arcanea** (`arcanea`)

- Read `CREATOR.md` before changing public or customer-facing copy.
- Apply the registered brand voice and the shared editorial gate.
- Reject generated prestige language, rhetorical contrast formulas, invented claims, and abstract labels that hide simple facts.
- Keep public labels in sentence case.
- Run the changed-copy editorial audit before release.

Pinned source: https://github.com/frankxai/starlight-design-intelligence/blob/50ae34c7ac06e6c083f277ca96c3bde8f0a39b43/brand-packs/arcanea/COPY.md
<!-- STARLIGHT-EDITORIAL:END -->
