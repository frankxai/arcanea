# Active Agent Coordination Ledger

*Protocol: AGENTS.md §4 — Read before taking any branch scope.*

---

## Current Session

Branch: `claude/arcanea-kraken-monster-system-t24p73`
Started: 2026-06-22

| Agent | Harness | Scope | Status |
|---|---|---|---|
| Claude | Claude Code | Conductor: canon/lore/gen/data/CI | active |
| Codex | OpenAI Codex | Executor: tools/skills/tests (assigned partitions) | active |

---

## Scope Partitions

**Claude (conductor) owns:**
- `.arcanea/lore/**` — all canon files
- `.arcanea/gen/**` — prompt packs, harness routing, lanes
- `.arcanea/intake/**` — capture types, producers, spectrum
- `packages/arcanea-mcp/src/data/**` — creature data (bestiary, leviathans, atlas)
- `.claude/**` — skills, agents, commands
- `.agent/**` — this ledger
- CI: `.github/workflows/**`

**Codex (executor) may take:**
- `packages/arcanea-mcp/src/tools/**` — tool implementations
- `packages/arcanea-mcp/src/skills/**` — skill implementations
- `packages/arcanea-mcp/tests/**` — test files
- Any path Claude explicitly delegates in a commit message or PR description

---

## Integration Protocol

1. Each agent commits only to its own scope
2. No force-pushes, no amends to another agent's commits
3. Claude reviews Codex commits before any canon-adjacent files are touched
4. Disputed paths → open an issue tagged `agent-conflict` and wait for Frank

---

## File Lock Registry

| File / Glob | Locked by | Since |
|---|---|---|
| `.arcanea/lore/**` | Claude | 2026-06-22 |
| `.arcanea/gen/**` | Claude | 2026-06-22 |
| `packages/arcanea-mcp/src/data/**` | Claude | 2026-06-22 |
