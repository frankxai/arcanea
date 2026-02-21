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

### Blockers
- npm publish: Token expired, @arcanea org not created
