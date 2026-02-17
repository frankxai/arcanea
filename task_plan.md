# Task Plan: Arcanea — Every Surface

## Goal
Ship Arcanea on EVERY surface: overlay (enhances existing AI tools), standalone CLI (forked from OpenCode), VS Code extension, browser extensions, web, desktop, mobile. Two paths to the same intelligence layer.

## Status: PHASES 1-2.5 COMPLETE | PHASE 3 ADVANCED | PHASE 5 SCAFFOLDED | PHASE 10 COMPLETE

### New: Phase 10 — Universe Content & Visualization
- [x] Godbeast Codex: All 10 Godbeasts fully documented with lore
- [x] Gamification System: Ranks, Gates, Milestones, Element Resonance, Anti-Grind
- [x] InfoGenius ecosystem visualizations (2 images generated)
- [x] v0 Designs: Arcanea Chat, Imagine, Studio created
- [x] Package READMEs: core, cli, mcp-server all rewritten for v0.2.0/v0.4.0

---

## Phase 1: Core SDK + CLI — COMPLETE
- [x] @arcanea/os v0.2.0 — Intelligence Engine (Guardian Router, Voice, Design Tokens, Session)
- [x] @arcanea/cli v0.2.0 — 10 commands, 17/17 tests pass
- [x] Publish pipeline (Changesets + GitHub Actions)

## Phase 2: MCP Server — COMPLETE
- [x] @arcanea/mcp-server v0.4.0 — 30 tools, 7 resources, 6 prompts
- [x] 3 engine tools (route_guardian, check_voice, get_design_tokens)
- [x] 2 new resources (design-tokens, voice-rules)

## Phase 2.5: README + Narrative — COMPLETE
- [x] Install section with all surfaces
- [x] MCP config, CLI examples, SDK examples

---

## Phase 3: Fork OpenCode → Arcanea Realm CLI (Priority: CRITICAL)
**Status:** `in_progress`
**Goal:** `npx arcanea-realm` launches a full AI creation tool with Arcanea personality

### Why OpenCode
- TypeScript (our stack) — rewritten from Go in 2025
- Vercel AI SDK (already in our stack)
- MIT license — full freedom
- Plugin system — cleanest integration path
- Client-server — reskin TUI without touching AI logic
- Multi-surface — TUI + web + desktop + VS Code from ONE codebase
- 105K stars — battle-tested

### Tasks
- [x] Fork `anomalyco/opencode` → `frankxai/arcanea-realm`
- [x] Study the architecture (packages, plugin system, agents, themes)
- [ ] Create Arcanea plugin (Guardian routing, voice, design tokens, lore queries)
- [x] Create 10 Guardian agent files in `.opencode/agent/` (markdown format)
- [x] Create Arcanea cosmic theme (`.opencode/themes/arcanea.json`)
- [x] Create 4 custom commands: /guardian, /council, /lore, /voice-check
- [x] Add `@arcanea/mcp-server` as default MCP connection
- [x] Rename binary from `opencode` to `arcanea-realm` (or `realm`)
- [ ] Build the project (`bun install && bun run build`)
- [ ] Test: `npx arcanea-realm` launches with Arcanea personality
- [ ] Push first branded build

---

## Phase 4: Rename @arcanea/os → @arcanea/os (Priority: HIGH)
**Status:** `pending`
**Goal:** Reposition the intelligence layer as an "OS" — not just a library

### Tasks
- [ ] Rename package in package.json
- [ ] Update all imports across CLI, MCP server
- [ ] Update README, CLAUDE.md
- [ ] New changeset

---

## Phase 5: VS Code Extension (Priority: HIGH)
**Status:** `scaffolded`
**Goal:** "Arcanea Realm" in VS Code Marketplace

### Tasks
- [x] Scaffold `packages/vscode/` using VS Code Extension API
- [x] Webview sidebar (Guardian Panel with cosmic styling)
- [x] Gate Progress tree view (10 Gates with frequencies)
- [x] Lore Explorer tree view (browsable canon)
- [x] Status bar: active Guardian + Element
- [x] 6 commands (route, council, voice-check, lore, tokens, gate)
- [x] 4 custom VS Code colors
- [ ] Connect to @arcanea/os for intelligence
- [ ] Connect to MCP server for tools
- [ ] Build and test locally
- [ ] Publish to VS Code Marketplace

---

## Phase 6: Browser Extensions — Publish (Priority: MEDIUM)
**Status:** `pending`
**Goal:** 5 overlay extensions on Chrome Web Store

### Tasks
- [ ] Polish overlay-claude for Chrome Web Store
- [ ] Polish remaining 4 overlays
- [ ] Privacy policy, screenshots, descriptions
- [ ] Submit to Chrome Web Store + Firefox

---

## Phase 7: Desktop App (Priority: MEDIUM)
**Status:** `pending`
**Goal:** Native desktop via OpenCode's Tauri package

### Tasks
- [ ] OpenCode fork already has `packages/desktop/` (Tauri)
- [ ] Rebrand Tauri app with Arcanea identity
- [ ] Package for macOS, Windows, Linux
- [ ] Distribute via GitHub Releases

---

## Phase 8: Mobile App (Priority: LOW)
**Status:** `pending`
**Goal:** iOS + Android

### Tasks
- [ ] Move arcanea-mobile into apps/mobile
- [ ] Integrate @arcanea/os
- [ ] Submit to App Store + Google Play

---

## Phase 9: npm Publish ALL (Priority: HIGH — BLOCKED)
**Status:** `blocked`
**Blocker:** Need @arcanea org on npmjs.com + fresh token

### Tasks
- [ ] Create @arcanea org on npmjs.com
- [ ] Generate Automation token
- [ ] Add NPM_TOKEN to GitHub secrets
- [ ] Publish @arcanea/os, @arcanea/cli, @arcanea/mcp-server

---

## Dependencies

```
Phase 1 (Core SDK) ← DONE, blocks everything
Phase 2 (MCP) ← DONE
Phase 3 (Fork OpenCode) ← can start NOW, uses MCP server
Phase 4 (Rename core→os) ← quick, do alongside Phase 3
Phase 5 (VS Code) ← needs Phase 1
Phase 6 (Browser) ← independent
Phase 7 (Desktop) ← comes free with OpenCode fork
Phase 8 (Mobile) ← needs Phase 1
Phase 9 (npm) ← blocked on npmjs.com setup
```

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-16 | Core SDK + MCP + Language Server pattern | Proven by Copilot, Claude Code, OpenCode |
| 2026-02-16 | MCP before VS Code extension | MCP gives 7+ surfaces instantly vs 1 |
| 2026-02-17 | Fork OpenCode (TypeScript version) | MIT, same AI SDK, plugin system, multi-surface |
| 2026-02-17 | Ship BOTH overlay + standalone | Overlay = wide reach, Standalone = deep UX |
| 2026-02-17 | Rename @arcanea/os → @arcanea/os | "OS" positions it as intelligence layer, not just a lib |
| 2026-02-17 | Don't fork Gemini CLI | Gemini-only AI layer, Google telemetry, harder to generalize |

---

## Errors & Blockers

| Error | Status | Resolution |
|-------|--------|------------|
| npm packages not published | BLOCKED | Need @arcanea org on npmjs.com |
| WSL2 can't run npm install | KNOWN | Use Windows PowerShell |
| npm token expired | BLOCKED | Generate new token |
