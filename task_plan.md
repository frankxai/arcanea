# Task Plan: Arcanea Ecosystem — Ship Everything

## Goal
Publish the Arcanea ecosystem to every package registry and marketplace. 13 npm packages, Chrome Web Store, VS Code Marketplace. Then build the apps.

## Status: 791 TESTS PASSING | ALL DIST BUILT | NPM_TOKEN SET | CHANGESET READY

---

## Phase 1: Commit Uncommitted Fixes (Priority: IMMEDIATE)
**Status:** `pending`
**Goal:** Clean working tree before publish

### Changes Pending
- MCP SDK type fixes (`type: string` → `type: "text"`) in 6 tool files
- CI dependency build order fix in publish-packages.yml
- CI test.yml expansion
- CLI test file minor fixes (6 files)

### Tasks
- [ ] Review diffs (14 files, 32 insertions, 10 deletions)
- [ ] Commit as "fix: MCP SDK type narrowing + CI dependency build order"
- [ ] Verify tests still pass (791/791)

---

## Phase 2: npm Publish (Priority: P0 — CRITICAL PATH)
**Status:** `ready`
**Goal:** `pnpm changeset publish` → 10 packages on npmjs.com

### Prerequisites
- [x] NPM_TOKEN set on GitHub (2026-02-21)
- [x] Changeset exists for 10 packages (extension-core-and-upgrades.md)
- [x] All 15 packages have dist/ built
- [x] 791 tests passing, 0 failures
- [ ] pnpm install from Windows PowerShell (MCP SDK upgrade added zod dep)
- [ ] Working tree clean (Phase 1 commit)

### Packages in Changeset
| Package | Bump | Current | → Next |
|---------|------|---------|--------|
| @arcanea/os | minor | 0.3.0 | 0.4.0 |
| @arcanea/cli | minor | 0.3.0 | 0.4.0 |
| @arcanea/mcp-server | minor | 0.5.0 | 0.6.0 |
| @arcanea/overlay-claude | minor | 1.0.1 | 1.1.0 |
| @arcanea/overlay-chatgpt | minor | 1.0.1 | 1.1.0 |
| @arcanea/overlay-gemini | minor | 1.0.1 | 1.1.0 |
| @arcanea/overlay-copilot | minor | 1.0.1 | 1.1.0 |
| @arcanea/overlay-opencode | minor | 1.0.1 | 1.1.0 |
| @arcanea/auth | patch | 1.0.1 | 1.0.2 |
| @arcanea/extension-core | minor | 0.1.0 | 0.2.0 |

### Tasks
- [ ] Run `pnpm install` from Windows PowerShell
- [ ] Run `pnpm changeset version` to bump versions + generate CHANGELOGs
- [ ] Commit version bumps
- [ ] Run `pnpm changeset publish` (or push to trigger CI)
- [ ] Verify packages visible on npmjs.com
- [ ] Also publish: @starlight/runtime (not in changeset yet — needs own changeset)
- [ ] Also publish: arcanea-intelligence-os (aios) — needs own changeset
- [ ] Also publish: claude-arcanea — needs own changeset

---

## Phase 3: VS Code Marketplace (Priority: P1)
**Status:** `ready`
**Goal:** "Arcanea Realm" live on VS Code Marketplace

### Prerequisites
- [x] Extension scaffolded with 6 commands, 3 views, status bar
- [x] VSIX packaging works (39.3KB esbuild bundle)
- [x] Publisher: frankxai
- [x] Icon: packages/vscode/resources/icon.png
- [ ] VS Code Personal Access Token (PAT)

### Tasks
- [ ] Generate Azure DevOps PAT for VS Code Marketplace
- [ ] Install vsce: `npm install -g @vscode/vsce`
- [ ] Login: `vsce login frankxai`
- [ ] Package: `vsce package` in packages/vscode/
- [ ] Publish: `vsce publish`
- [ ] Verify on marketplace.visualstudio.com

---

## Phase 4: Chrome Web Store (Priority: P1)
**Status:** `blocked`
**Goal:** @arcanea/chrome-extension on Chrome Web Store

### Blockers
- [ ] Privacy policy page (required by Chrome Web Store)
- [ ] Screenshots (1280x800 or 640x400, at least 1)
- [ ] Chrome Developer Dashboard account ($5 one-time)

### Tasks
- [ ] Create privacy policy (can host on arcanea.ai/privacy)
- [ ] Take screenshots showing Guardian overlay active on ChatGPT/Claude
- [ ] Create promotional tiles (440x280 small, 920x680 large)
- [ ] Write store listing description
- [ ] Submit to Chrome Developer Dashboard
- [ ] Submit to Firefox Add-ons (separate process)

---

## Phase 5: Test Coverage Expansion (Priority: P2)
**Status:** `pending`
**Goal:** Add tests for 0-test packages

### Packages Missing Tests
| Package | Tests | Action |
|---------|-------|--------|
| claude-arcanea | 0 | Add test suite |
| arcanea-realm (vscode) | 0 | Add test suite |
| @arcanea/mcp-server | 16 | Expand (new SDK tools untested) |

### Tasks
- [ ] Create claude-arcanea test suite (overlay config generation)
- [ ] Create vscode test suite (command registration, view providers)
- [ ] Expand MCP server tests for new SDK migration

---

## Phase 6: Apps Development (Priority: P2)
**Status:** `pending`
**Goal:** Ship arcanea.ai features

### Current State
- apps/web (v0.1.0) — Full Next.js 16 app, 35+ routes, Vercel-deployed
- apps/premium-web (v2.0.0) — Separate premium tier

### Tasks
- [ ] Audit apps/web feature completeness
- [ ] Connect AI chat to Guardian routing
- [ ] Connect Library to content loader
- [ ] Deploy premium-web

---

## Phase 7: Arcanea Realm CLI (Priority: P2)
**Status:** `scaffolded`
**Goal:** `npx arcanea-realm` launches standalone AI CLI

### Tasks
- [ ] Build the fork: `bun install && bun run build` in arcanea-realm
- [ ] Test Guardian agents load from opencode.json
- [ ] Create TypeScript plugin for @arcanea/os integration
- [ ] npm publish arcanea-realm package

---

## Dependencies

```
Phase 1 (Commit fixes) → Phase 2 (npm publish)
Phase 2 (npm publish) → Phase 7 (realm needs published @arcanea/os)
Phase 3 (VS Code) — independent
Phase 4 (Chrome) — independent
Phase 5 (Tests) — independent
Phase 6 (Apps) — independent
```

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-16 | Core SDK + MCP + VS Code pattern | Proven by Copilot, Claude Code, OpenCode |
| 2026-02-17 | Fork OpenCode, ship both paths | Overlay = wide reach, Standalone = deep UX |
| 2026-02-17 | Rename @arcanea/core → @arcanea/os | OS positions as intelligence layer |
| 2026-02-21 | npm publish FIRST | Everything else depends on packages being live |
| 2026-02-21 | Node built-in test runner | Zero deps, fast, works everywhere |

---

## Errors & Blockers

| Error | Status | Resolution |
|-------|--------|------------|
| npm packages not published | READY | NPM_TOKEN set, changeset exists, just needs `pnpm changeset publish` |
| pnpm-lock.yaml out of sync | ACTIVE | Run `pnpm install` from Windows PowerShell |
| Chrome Web Store | BLOCKED | Missing privacy policy + screenshots |
| WSL2 localhost | KNOWN | Push to Vercel for testing |
| MCP SDK type errors | FIXED | type: string → type: "text" in 6 files (uncommitted) |
