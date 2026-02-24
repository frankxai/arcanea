# Progress: Arcanea Overlay Ecosystem — Wave 1 Complete

## Session: 2026-02-21 (Continued)

### Wave 1 — Fix the Overlay Gap: COMPLETE

| # | Action | Result |
|---|--------|--------|
| 1 | Created hook-generators.ts (650+ lines) | All 8 hooks + statusline + AgentDB + helpers as generators |
| 2 | Rewrote installer.ts to install full infrastructure | 9-step install: CLAUDE.md, skills, agents, hooks, statusline, settings, AgentDB, helpers, commands |
| 3 | Added 5 new OverlayCapability types to @arcanea/os | statusline, agentdb, context-tracking, voice-enforcement, model-routing |
| 4 | Created 98 new hook tests in hooks.test.mjs | Content quality, settings, AgentDB, helpers, integration, portability |
| 5 | Fixed overlay-opencode naming → overlay-cursor | Package name, class name, provider ID, all CLI references |
| 6 | Added 'cursor' to ProviderType union | Plus PROVIDER_CAPABILITIES entry |
| 7 | Updated CLI commands (init, install, update) | Import CursorOverlayInstaller, add cursor: entry to INSTALLERS |

### Test Count Evolution
- Previous session: 847 tests
- overlay-claude: 32 → **130** (+98 hook tests)
- overlay-cursor: 77 (all updated for rename, all passing)
- Total new tests this session: **98**

### Files Created
- `packages/overlay-claude/src/hook-generators.ts` (650+ lines)
- `packages/overlay-claude/tests/hooks.test.mjs` (560+ lines)

### Files Modified
- `packages/overlay-claude/src/installer.ts` — Full rewrite with hooks/statusline/AgentDB/helpers
- `packages/overlay-claude/src/index.ts` — Export all new generators
- `packages/core/src/types/overlay.ts` — ProviderType + OverlayCapability additions
- `packages/overlay-opencode/package.json` — name → @arcanea/overlay-cursor
- `packages/overlay-opencode/src/index.ts` — CursorOverlayInstaller export
- `packages/overlay-opencode/src/installer.ts` — Class + provider rename
- `packages/overlay-opencode/src/generators.ts` — Comment update
- `packages/overlay-opencode/src/templates.ts` — Comment update
- `packages/overlay-opencode/tests/overlay-opencode.test.mjs` — All assertions updated
- `packages/cli/package.json` — dependency rename
- `packages/cli/tsconfig.json` — path alias rename
- `packages/cli/src/commands/init.ts` — CursorOverlayInstaller + cursor: provider
- `packages/cli/src/commands/install.ts` — CursorOverlayInstaller + cursor: provider
- `packages/cli/src/commands/update.ts` — CursorOverlayInstaller + cursor: provider

### What the overlay-claude Package NOW Installs

| Level | What Gets Created |
|-------|-------------------|
| **minimal** | CLAUDE.md + manifest (2 files) |
| **standard** | + 4 skills + 10 Guardian agents + 8 hooks + statusline + settings.local.json + AgentDB schema/init + 2 helpers (~30 files) |
| **full** | + 2 commands (channel, arcanea-status) |
| **luminor** | + .claude/lore/ directory |

### Before vs After

| Feature | Before | After |
|---------|--------|-------|
| Hook installation | NOT installed | 8 hooks generated + settings.local.json |
| Statusline | NOT installed | statusline.mjs generated |
| AgentDB | NOT installed | schema.sql + init.sh generated |
| Helper scripts | NOT installed | quick-status + health-check |
| Voice enforcement | NOT installed | voice-check.sh with 14 banned phrases |
| Context tracking | NOT installed | context-tracker.sh with quality zones |
| Model routing | NOT installed | model-route.sh with complexity scoring |
| overlay-opencode naming | WRONG (Cursor files, OpenCode name) | FIXED → @arcanea/overlay-cursor |

### Key Design Decisions
1. All hooks use `$ARCANEA_HOME` (defaults to `~/.arcanea`) — **no hardcoded paths**
2. Session state lives in `$ARCANEA_HOME/sessions/current/` — clean per-session
3. All hooks portable to ANY project directory — not just Arcanea monorepo
4. `CursorOverlayInstaller` exported + backwards-compat alias `OpenCodeOverlayInstaller`
5. CLI maps both `cursor:` and `opencode:` to `CursorOverlayInstaller`

---

## Session: 2026-02-21 (Wave 2)

### Wave 2 — Unify Content Layer: COMPLETE

| # | Action | Result |
|---|--------|--------|
| 1 | Audited all 5 overlay packages (parallel) | Identified 6 shared content blocks duplicated 5× |
| 2 | Created packages/core/src/content/voice.ts | VOICE_PILLARS, ANTIDOTE_PRINCIPLE, SACRED_TERMINOLOGY, BANNED_PHRASES, GUARDIAN_VERBS |
| 3 | Created packages/core/src/content/routing.ts | GUARDIAN_ROUTING_PATTERNS, MODEL_KEYWORD_TIERS, TOOL_COST_ESTIMATES, CONTEXT_ZONES |
| 4 | Created packages/core/src/content/markdown.ts | 9 generator functions from live constants |
| 5 | Updated overlay-chatgpt templates.ts | Imports from @arcanea/os, removed ~90 hardcoded lines |
| 6 | Updated overlay-gemini templates.ts | Imports from @arcanea/os, removed ~90 hardcoded lines |
| 7 | Updated overlay-copilot templates.ts | Imports from @arcanea/os, removed ~100 hardcoded lines |
| 8 | Updated overlay-cursor templates.ts | Imports from @arcanea/os, removed ~80 hardcoded lines |
| 9 | Updated overlay-claude hook-generators.ts | Imports routing, banned phrases, model keywords, tool costs, verbs, Guardian seeds |
| 10 | Created 62 shared content tests | Voice, routing, markdown generators, cross-reference validation |
| 11 | Fixed cosmic-raised color inconsistency | All overlays now use canonical #232340 from @arcanea/os |

### Test Count Evolution
- Previous total: 207 (overlay-claude 130 + overlay-cursor 77)
- @arcanea/os: 44 → **106** (+62 content tests)
- overlay-chatgpt: **70** (all updated for shared content)
- overlay-gemini: **70** (all updated for shared content)
- overlay-copilot: **69** (all updated for shared content)
- Total: **522 tests** across 6 packages, all passing

### Files Created
- `packages/core/src/content/voice.ts` — Shared voice constants
- `packages/core/src/content/routing.ts` — Shared routing data
- `packages/core/src/content/markdown.ts` — 9 markdown generator functions
- `packages/core/src/content/index.ts` — Content layer exports
- `packages/core/tests/content.test.mjs` — 62 tests

### Files Modified
- `packages/core/src/index.ts` — Added content layer exports
- `packages/overlay-chatgpt/src/templates.ts` — Imports from @arcanea/os
- `packages/overlay-chatgpt/src/generators.ts` — Updated SACRED_TERMINOLOGY usage
- `packages/overlay-chatgpt/src/index.ts` — Added SACRED_TERMINOLOGY_MD export
- `packages/overlay-chatgpt/tests/overlay-chatgpt.test.mjs` — Updated for canonical values
- `packages/overlay-gemini/src/templates.ts` — Imports from @arcanea/os
- `packages/overlay-gemini/tests/overlay-gemini.test.mjs` — Updated for canonical values
- `packages/overlay-copilot/src/templates.ts` — Imports from @arcanea/os
- `packages/overlay-copilot/tests/overlay-copilot.test.mjs` — Updated for canonical values
- `packages/overlay-opencode/src/templates.ts` — Imports from @arcanea/os
- `packages/overlay-opencode/tests/overlay-opencode.test.mjs` — Updated for canonical values
- `packages/overlay-claude/src/hook-generators.ts` — Imports shared constants for bash generation
- `packages/overlay-claude/tests/hooks.test.mjs` — Updated for canonical Guardian roles

### What Changed (Before vs After)

| Content | Before | After |
|---------|--------|-------|
| VOICE_PILLARS | Hardcoded in 5 packages | Single source in @arcanea/os |
| ANTIDOTE_PRINCIPLE | Hardcoded in 5 packages | Single source in @arcanea/os |
| Guardian reference tables | Hardcoded markdown in 5 packages | Generated from GUARDIANS constant |
| Lore sections | Hardcoded markdown in 5 packages | Generated from COSMIC_DUALITY, ELEMENTS, etc. |
| Design tokens | Hardcoded hex values (with mismatches) | Generated from COLORS constant |
| Sacred terminology | Hardcoded markdown in 4 packages | Structured array + markdown generator |
| Routing keywords | Hardcoded in hook-generators.ts | GUARDIAN_ROUTING_PATTERNS in @arcanea/os |
| Banned phrases | Hardcoded in hook-generators.ts | BANNED_PHRASES array in @arcanea/os |
| Model keywords | Hardcoded in hook-generators.ts | MODEL_KEYWORD_TIERS in @arcanea/os |
| Tool costs | Hardcoded in hook-generators.ts | TOOL_COST_ESTIMATES in @arcanea/os |
| Guardian verbs | Hardcoded in hook-generators.ts | GUARDIAN_VERBS in @arcanea/os |
| Guardian seed data | Hardcoded SQL in hook-generators.ts | Generated from GUARDIANS constant |

---

## Session: 2026-02-21 (Wave 3)

### Wave 3 — Absorb Best Patterns: COMPLETE

| # | Action | Result |
|---|--------|--------|
| 1 | Audited oh-my-opencode | Array-based plugin config, NPM dist-tag resolution, doctor checks, config hierarchy (user→project→plugin) |
| 2 | Audited claude-flow | 60+ agent types, 6 orchestration patterns (only hierarchical active), 17 hooks, 12 workers — all dormant |
| 3 | Created packages/core/src/content/skills.ts | 13 SKILL_DEFINITIONS, 13 SKILL_TRIGGERS, matchSkillTriggers(), getSkillsForLevel(), generateSkillContent() |
| 4 | Updated packages/core/src/content/index.ts | Exports new skill types and functions |
| 5 | Rewrote overlay-claude/src/generators.ts | Uses shared generateSkillContent() from @arcanea/os |
| 6 | Updated overlay-claude/src/installer.ts | Dynamic getSkillIdsForLevel(level) replaces hardcoded CORE_SKILLS |
| 7 | Removed dead code | Deleted content-depth.ts, removed SKILL_TEMPLATES from templates.ts |
| 8 | Added 30 new tests in @arcanea/os | SKILL_DEFINITIONS, SKILL_TRIGGERS, matchSkillTriggers, getSkillsForLevel, generateSkillContent |
| 9 | Rewrote overlay-claude generators.test.mjs | 34 tests: all 13 skills, triggers, level selection, agent generation |
| 10 | Expanded installer.test.mjs | +5 tests: full=9 skills, luminor=13 skills, creative/dev skill verification |

### Test Count Evolution
- Previous total: 522
- @arcanea/os: 106 → **136** (+30 skill tests)
- overlay-claude: 130 → **158** (+23 generator + +5 installer tests)
- Total: **580 tests** across 6 packages, all passing

### Files Created
- `packages/core/src/content/skills.ts` — Shared skill system (~500 lines)

### Files Modified
- `packages/core/src/content/index.ts` — Skill exports
- `packages/overlay-claude/src/generators.ts` — Rewritten for shared generators
- `packages/overlay-claude/src/installer.ts` — Dynamic skill selection
- `packages/overlay-claude/src/index.ts` — Export getSkillIdsForLevel
- `packages/overlay-claude/src/templates.ts` — Removed dead SKILL_TEMPLATES
- `packages/overlay-claude/tests/generators.test.mjs` — Full rewrite (34 tests)
- `packages/overlay-claude/tests/installer.test.mjs` — Expanded level verification (+5 tests)
- `packages/core/tests/content.test.mjs` — +30 skill system tests

### Files Deleted
- `packages/overlay-claude/src/content-depth.ts` — Dead code, replaced by @arcanea/os generators

### What Changed (Before vs After)

| Feature | Before | After |
|---------|--------|-------|
| Skill content | Hardcoded SKILL_TEMPLATES + SKILL_EXTENSIONS | Generated from @arcanea/os constants |
| Skill count | 4 at all levels (content depth varied) | 4/9/13 by level (standard/full/luminor) |
| Skill triggers | Not implemented | 13 triggers with keyword matching |
| Auto-activation | None | matchSkillTriggers() returns matching skill IDs |
| Level selection | Hardcoded CORE_SKILLS array | getSkillsForLevel() from @arcanea/os |
| Content depth | Tiered extensions (standard/full/luminor) | Same rich content; level controls WHICH skills |

### Blockers
- npm publish: Token expired, @arcanea org not created

---

## Session: 2026-02-22 (Wave 5 — AI Slop Elimination)

### Architecture Clarification

| Layer | What It Does | Calls AI? |
|-------|-------------|-----------|
| @arcanea/os | Data constants + pure functions | NEVER |
| Overlay packages | File generators (agent.md, skill.md, hooks) | NEVER |
| agent.md / skill.md | Static instructions the coding agent READS | ARE the AI |
| MCP server | Tool provider — data lookups + diagnostics | NO (data only) |
| Extensions | User-facing products | Chrome: YES (SSE) |

### What Was Fixed

| # | Fix | Before | After |
|---|-----|--------|-------|
| 1 | Guardian data consolidated | Duplicated in @arcanea/os AND extension-core | extension-core imports from @arcanea/os, only UI fields (colors, avatars) local |
| 2 | MCP memory persistence | In-memory Map (dies on restart) | JSON file at ~/.arcanea/memories.json (committed in c315fd9) |
| 3 | MCP orchestrate removed | Fake AI-calling-AI stub | Replaced with guardian_guidance (pure data lookup) (committed in c315fd9) |
| 4 | AIOS adapter stubs | execute() returned template strings | execute() throws AdapterNotImplementedError with architecture explanation |
| 5 | StarlightRuntime renamed | Misleading "Runtime" name | ContextLoader (honest name) + deprecated alias |
| 6 | Skills claim fixed | "77+ Skills" (inflated) | "70+ Skills" (69 real, 6 stubs marked "Planned") across 29 docs |

### Test Count: 1,284 (0 failures)

| Package | Tests |
|---------|-------|
| @arcanea/os | 136 |
| @arcanea/cli | 137 |
| @arcanea/auth | 44 |
| @arcanea/mcp-server | 193 |
| @arcanea/overlay-claude | 158 |
| @arcanea/overlay-chatgpt | 70 |
| @arcanea/overlay-gemini | 70 |
| @arcanea/overlay-copilot | 69 |
| @arcanea/overlay-cursor | 77 |
| @arcanea/extension-core | 112 |
| chrome-extension | 35 |
| vscode extension | 40 |
| claude-arcanea | 52 |
| starlight-runtime | 23 |
| arcanea-intelligence-os | 68 |

### Slop Score: ~60% → ~80% Real

| Layer | Before | After |
|-------|--------|-------|
| User-facing (CLI, extensions) | 85-95% real | 85-95% real (unchanged, already solid) |
| Intelligence layer (aios) | ~25% real | ~50% real (stubs honestly labeled) |
| MCP server | ~70% real | ~90% real (persistence + honest tools) |
| Documentation | Inflated claims | Accurate counts |
| Data architecture | Duplicated | Single source of truth |

### Commits
- `c315fd9` feat(mcp): persistent memory layer + remove opencode references
- `ea4b07d` fix: eliminate AI slop — consolidate data, honest labels, real persistence
