# Findings: SIS + AIOS Production Readiness Audit

## Date: 2026-02-14

---

## 1. SIS TypeScript SDK

**Location**: `starlight-intelligence-system/`
**Code**: 5,076 lines across 10 TypeScript files
**Package**: `@frankx/starlight-intelligence-system` v4.0.0

### Modules

| Module | Lines | Status |
|--------|-------|--------|
| `index.ts` | 253 | Built — main orchestrator class |
| `context.ts` | 427 | Built — platform-specific context generation |
| `memory.ts` | 229 | Built — file-based persistent memory with word index |
| `agents.ts` | 203 | Built — keyword/file-pattern task routing |
| `orchestrator.ts` | 954 | Built — 6 execution patterns |
| `sync.ts` | 354 | Built — ACOS trajectory classification |
| `score.ts` | 332 | Built — intelligence scoring (0-100) |
| `cli.ts` | 536 | Built — init, generate, vault, sync, score, stats |
| `types.ts` | 251 | Built — full type definitions |
| `orchestrator.test.ts` | 1,537 | FAILING — 82 tests, import resolution broken |

### Test Failure

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../src/orchestrator.js'
```

Test imports `./orchestrator.js` (bundler moduleResolution). Node native test runner can't resolve `.js` → `.ts`.

**Fix**: Add `tsx` as dev dependency, change test script to `node --import tsx --test src/**/*.test.ts`

**Also**: `node_modules` empty — need `npm install` first.

### Not Published

- NOT on npm. Can't `npm install` it.
- Package name inconsistency: `@frankx/` in package.json vs `@frankxai/` in old README examples

---

## 2. AIOS Hooks Infrastructure

**Location**: `.claude/hooks/` (7 files, all executable)

| Hook | What It Does | Status |
|------|-------------|--------|
| `session-start.sh` | Init Guardian (Shinkami), token tracking | Working |
| `prompt-submit.sh` | Keyword-based Guardian routing (10 Guardians) | Working |
| `pre-tool.sh` | Tool invocation logging | Working |
| `post-tool.sh` | Tool completion logging | Working |
| `model-route.sh` | Model tier recommendation (opus/sonnet/haiku) | Working |
| `context-tracker.sh` | Token budget monitoring (quality zones) | Working |
| `voice-check.sh` | Banned phrase detection per Voice Bible v2.0 | Working |

All wired into `.claude/settings.local.json`.

---

## 3. AgentDB

- **SQLite** via python3 at `/tmp/arcanea-agentdb.sqlite3`
- **Tables**: agents (10 Guardians), tasks, memories, vault_entries, routing_log
- **ISSUE**: `/tmp/` = wiped on reboot. Must move to persistent location.

---

## 4. Intelligence OS (Nested Repo)

**Location**: `intelligence-os/`

- `AIOSDaemon` class: HTTP API, MCP server, SQLite state, plugins
- `bin/aios.js`: 108KB compiled CLI
- RESTful routes: /status, /tools, /plugins, /journey, /drafts, /ws
- **Untested** — unknown if daemon actually starts

---

## 5. What Works End-to-End

1. CLAUDE.md loaded with full Arcanea context
2. Session-start hook initializes Guardian state
3. Every prompt → Guardian routing (keyword-based)
4. Every tool use logged (pre/post hooks)
5. Model routing by complexity
6. Voice checking catches banned phrases
7. Context tracker monitors token budget
8. AgentDB stores state (but ephemeral)
9. StatusLine shows real-time session state
10. 65+ skills auto-activate
11. 40+ agents available for Task tool
12. SIS SDK compiles to working JS

## 6. What Does NOT Work

1. SIS tests broken (import resolution)
2. SIS not on npm
3. No automated vault consolidation
4. No cross-project transmissions
5. No LangGraph/CrewAI/Swarm adapters
6. No web dashboard (markdown specs only)
7. AgentDB data lost on reboot
8. intelligence-os daemon untested
