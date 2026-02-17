# Task Plan: SIS + AIOS Production Build

## Goal

Make the Starlight Intelligence System (SIS) and Arcanea Intelligence OS (AIOS) into real, production-quality products where every claimed capability actually works. Ship to npm, fix all broken tests, persist all state, and create the foundation for SaaS via Vercel AI SDK.

## Current Phase

Phase 1

## Phases

### Phase 1: SIS SDK — Fix, Test, Publish
**Priority**: CRITICAL (everything else depends on this)

- [x] 1.1 Install dependencies (`npm install` in SIS repo)
- [x] 1.2 Add `tsx` as dev dependency for TypeScript test runner
- [x] 1.3 Fix test script: `node --import tsx --test src/**/*.test.ts`
- [x] 1.4 Run tests — **82/82 pass** in 1.6s
- [x] 1.5 Fix any test failures found — none needed
- [x] 1.6 Decide npm scope — keeping `@frankx` (current)
- [ ] 1.7 npm login (`npm adduser`) — **blocked: requires authentication**
- [x] 1.8 Add `prepublishOnly` script: `npm run build && npm test`
- [x] 1.9 Add `engines: { "node": ">=18.0.0" }` to package.json
- [ ] 1.10 Publish to npm: `npm publish --access public`
- [ ] 1.11 Verify: `npx @frankx/starlight-intelligence-system --version`
- [ ] 1.12 Update README code examples with correct import path
- [ ] 1.13 Commit and push

**Status:** mostly complete (blocked on npm login)

### Phase 2: AIOS Hardening — Persist State, Fix Gaps
**Priority**: HIGH (daily workflow improvement)

- [x] 2.1 Move AgentDB from `/tmp/arcanea-agentdb.sqlite3` to `~/.arcanea/agentdb.sqlite3`
- [x] 2.2 Update `agentdb/init.sh` and `agentdb/query.sh` with new path
- [x] 2.3 Update session-start.sh to init AgentDB if not exists
- [x] 2.4 Add routing log writes to prompt-submit.sh (INSERT into routing_log)
- [x] 2.5 Add memory writes to post-tool.sh (log significant tool results to memories table)
- [x] 2.6 Verify all hooks fire correctly in a live session
- [x] 2.7 Add `session-end` hook: summarize session, write to vault_entries
- [x] 2.8 Connect context-tracker to AgentDB (write token snapshots on zone transitions)
- [x] 2.9 Test statusline displays correctly (hooks output status via echo — working)
- [x] 2.10 Document the complete hook pipeline in `.claude/HOOKS.md`

**Status:** complete

### Phase 3: SIS ↔ AIOS Bridge
**Priority**: HIGH (connects the spec to the runtime)

- [x] 3.1 Create AgentDB → SIS bridge script (`bridge-agentdb-to-sis.sh`)
- [x] 3.2 Bridge extracts routing patterns + session summaries + significant memories
- [x] 3.3 Deduplication via content hash (re-runs don't create duplicates)
- [x] 3.4 Wire session-end hook to call bridge automatically
- [x] 3.5 Test full loop: session start → prompts → session end → AgentDB updated → SIS memory updated
- [ ] 3.6 Wire session-start to inject SIS vault state (optional — CLAUDE.md already loaded)
- [ ] 3.7 Commit and push both repos

**Status:** mostly complete (bridge working, compound learning loop verified)

### Phase 4: Intelligence OS Daemon — Validate and Connect
**Priority**: MEDIUM (enables web dashboard later)

- [x] 4.1 Audit `intelligence-os/src/` — read all source files
- [x] 4.2 Install dependencies, build
- [x] 4.3 Try starting the daemon: `node bin/aios.js daemon start --foreground`
- [x] 4.4 Test HTTP API: `curl http://localhost:3333/status`
- [x] 4.5 Fix issues: wired HttpApiServer, StateStore, PluginRegistry into daemon (was all no-ops)
- [x] 4.6 Connect daemon to AgentDB via /agentdb/* routes (python3 sqlite3 bridge)
- [ ] 4.7 Connect daemon to SIS (read vaults, serve via API)
- [x] 4.8 Test: 14/14 endpoints HTTP 200, all success=true (guardians, routing, vault, memories)
- [ ] 4.9 Document API endpoints

**Status:** mostly complete (14/14 routes working, AgentDB connected, state persistence verified)

### Phase 5: Vercel AI SDK SaaS Foundation
**Priority**: MEDIUM (next major milestone after Claude Code polish)

- [ ] 5.1 Design API routes for SIS operations (context gen, vault read/write, scoring)
- [ ] 5.2 Create Next.js API routes in arcanea-platform using Vercel AI SDK 6
- [ ] 5.3 Build web dashboard for vault management (React + Tailwind)
- [ ] 5.4 Build intelligence scoring dashboard
- [ ] 5.5 Add multi-user support (Supabase auth + per-user vaults)
- [ ] 5.6 Deploy to Vercel
- [ ] 5.7 Test end-to-end: user signs up → creates vaults → generates context → deploys to Claude Code

**Status:** pending

### Phase 6: Framework Adapters (Backlog)
**Priority**: LOW (future expansion)

- [ ] 6.1 Research LangGraph node injection API
- [ ] 6.2 Build LangGraph adapter: inject SIS identity into graph nodes
- [ ] 6.3 Research CrewAI role customization API
- [ ] 6.4 Build CrewAI adapter: map SIS agents to CrewAI roles with persistent memory
- [ ] 6.5 Research AutoGen conversation persistence
- [ ] 6.6 Build AutoGen adapter: persistent memory across conversations
- [ ] 6.7 Publish all adapters to npm
- [ ] 6.8 Update SIS README with real integration documentation

**Status:** pending (backlog)

---

## Key Questions

1. **npm scope**: `@frankx` or `@frankxai`? → Decision needed before Phase 1.6
2. **intelligence-os**: Does it actually start? → Phase 4 will discover this
3. **SaaS pricing**: Free tier + paid? → Decide before Phase 5

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Fix SIS tests before publishing | Can't ship broken tests to npm |
| Move AgentDB to `~/.arcanea/` | `/tmp/` loses data on reboot |
| Use `tsx` for test runner | Simplest fix for ESM TypeScript resolution |
| Claude Code first, SaaS second | Primary consumer today is Claude Code |
| LangGraph/CrewAI is backlog | No adapters exist, real integration requires research |

## Errors Encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| SIS tests fail: ERR_MODULE_NOT_FOUND | 1 | Root cause: Node can't resolve `.js` → `.ts`. Fix: add `tsx` loader |
| SIS node_modules empty | 1 | Need `npm install` (devDependencies only) |
| AgentDB data lost on reboot | 1 | Move from `/tmp/` to `~/.arcanea/` |

## Notes

- Phase 1 can be done in this session
- Phases 2-3 can be done in this session
- Phase 4 requires testing intelligence-os daemon (may have issues)
- Phase 5 is a new sprint — requires arcanea-platform work
- Phase 6 is explicitly backlog per user request
