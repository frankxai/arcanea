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

## Phase 4: Priority Implementation ⏳ PENDING

### Wave 1: Fix What's Broken (Quick Wins)
- [ ] Rename overlay-opencode → overlay-cursor (or create separate overlay-cursor)
- [ ] Create actual overlay-opencode for OpenCode CLI
- [ ] Add hook installation to overlay-claude package
- [ ] Add hook tests

### Wave 2: Unify Content Layer
- [ ] Extract shared overlay content to @arcanea/os generators
- [ ] All overlays consume from single source of truth
- [ ] Add statusline installation to overlay-claude

### Wave 3: Absorb Best Patterns
- [ ] Audit oh-my-opencode for plugin patterns worth adopting
- [ ] Audit claude-flow for orchestration patterns
- [ ] Implement skill file generation for all 35 auto-activation rules

### Wave 4: Runtime Intelligence
- [ ] Agent-to-agent communication protocol
- [ ] Runtime flow orchestration engine
- [ ] Live skill discovery and activation

---

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| (none) | | |
