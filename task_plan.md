# Task Plan: Arcanea Overlay Ecosystem — Deep Audit & Evolution

**Status**: IN PROGRESS
**Guardian**: Shinkami (Source Gate, 1111 Hz)
**Date**: 2026-02-21
**Goal**: Comprehensive audit of the Arcanea overlay system — what's genius, what's scaffolding, what's missing, and the path forward

---

## Phase 1: Deep Audit ✅ COMPLETE

Four parallel deep-dives completed:
1. .claude/ infrastructure (hooks, statusline, agents, skills, state)
2. overlay-claude package (installer, generators, templates, content-depth)
3. overlay-opencode package (installer, generators, templates, MDC rules)
4. @arcanea/os core (types, constants, engine, generators, detection)

---

## Phase 2: Genius Analysis ✅ COMPLETE

See findings.md for full breakdown.

---

## Phase 3: Gap Analysis & Roadmap ✅ COMPLETE

### Critical Gaps Identified

| # | Gap | Severity | Effort |
|---|-----|----------|--------|
| 1 | overlay-claude installs 20% of what .claude/ actually has | HIGH | Medium |
| 2 | overlay-opencode is MISNAMED (it's Cursor, not OpenCode) | HIGH | Low |
| 3 | No shared content layer between overlays | HIGH | Medium |
| 4 | Hooks not installable via overlay package | HIGH | Medium |
| 5 | oh-my-opencode / claude-flow patterns not absorbed | MEDIUM | High |
| 6 | No hook tests | MEDIUM | Low |
| 7 | Skills rules reference nonexistent skill files | MEDIUM | Medium |
| 8 | Agent orchestration is prompt-only (no runtime) | LOW | High |
| 9 | Flow config YAML is static (no runtime engine) | LOW | High |

---

## Phase 4: Priority Implementation

### Wave 1: Fix What's Broken ✅ COMPLETE (207 tests passing)
- [x] Rename overlay-opencode → overlay-cursor (package, class, provider, CLI)
- [x] Add hook installation to overlay-claude (8 hooks + statusline + settings.local.json)
- [x] Add AgentDB + helper scripts to overlay-claude installer
- [x] Add 98 hook tests covering all generators, settings, portability, integration
- [x] Update ProviderType + OverlayCapability types in @arcanea/os
- [x] Update CLI commands (init, install, update) with CursorOverlayInstaller

### Wave 2: Unify Content Layer ✅ COMPLETE (522 tests passing)
- [x] Audit content duplication across all 5 overlay packages (5 parallel deep-dives)
- [x] Extract shared generators to @arcanea/os (voice, routing, markdown generators)
- [x] Make all 5 overlays consume from single source of truth
- [x] overlay-cursor generates MDC rules from shared content
- [x] Add 62 tests for shared content layer in @arcanea/os

### Wave 3: Absorb Best Patterns ✅ COMPLETE (580 tests passing)
- [x] Audit oh-my-opencode for plugin patterns worth adopting
- [x] Audit claude-flow for orchestration patterns
- [x] Create shared skill system in @arcanea/os (13 skills, triggers, level selection)
- [x] Refactor overlay-claude generators to use shared content
- [x] Expand installer: standard=4, full=9, luminor=13 skills
- [x] Add matchSkillTriggers() auto-activation system
- [x] Remove dead code (content-depth.ts, SKILL_TEMPLATES)
- [x] Add 35+ new tests across core and overlay-claude

### Wave 4: Runtime Intelligence
- [ ] Agent-to-agent communication protocol
- [ ] Runtime flow orchestration engine
- [ ] Live skill discovery and activation

---

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| OverlayCapability type error | 1 | Added 5 new values to union type |
| ProviderType missing 'cursor' | 1 | Added 'cursor' to union + PROVIDER_CAPABILITIES |
| Test assertion 'defaulting' | 1 | Updated to 'no task provided' (matching actual content) |
| vitest not found at monorepo root | 1 | Tests use node:test, run via `node --test` |
