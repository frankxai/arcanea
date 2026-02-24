# Task Plan: Arcanea Production Publishing — All 29 Packages to npm

**Status**: IN PROGRESS
**Date**: 2026-02-24
**Goal**: Get all 29 @arcanea npm packages published, all GitHub repos synced, and the entire ecosystem production-ready
**Previous Plan**: Overlay Ecosystem Deep Audit (Waves 1-3 COMPLETE, 580 tests passing)

---

## Current State

### Git Sync Status (ALL DONE)
| Repo | Status |
|------|--------|
| `frankxai/arcanea` (monorepo) | Synced |
| `frankxai/claude-arcanea` | Synced (60 guardian assets pushed) |
| `frankxai/arcanea-opencode` | Synced on `dev` branch |
| `frankxai/arcanea-ai-app` | Clean & synced |

### Package Readiness Audit (29 packages)
- **19/29 fully configured** for publishing
- **7 missing `files` field**: hooks, chrome-extension, council, guardian-evolution, guardian-memory, rituals, arcanea-code
- **8 missing `publishConfig`**: hooks, chrome-extension, prompt-books, council, guardian-evolution, guardian-memory, rituals, swarm-coordinator, arcanea-code
- **1 missing build script**: prompt-books
- **2 missing dist/**: library-pipeline (os/), prompt-books
- **npm auth**: NOT logged in on this machine

### Monorepo Infrastructure
- Turborepo for builds (`turbo run build`)
- Changesets for versioning (`@changesets/cli`)
- Release script: `turbo run build --filter=!@arcanea/mobile && changeset publish`
- pnpm workspaces

---

## Phase 1: Fix Package Configs [in_progress]

Fix all 10 packages missing required npm publishing fields.

### Packages needing `publishConfig`:
```
@arcanea/hooks, @arcanea/chrome-extension, @arcanea/prompt-books,
@arcanea/council, @arcanea/guardian-evolution, @arcanea/guardian-memory,
@arcanea/rituals, @arcanea/swarm-coordinator, arcanea-code
```

### Packages needing `files` field:
```
@arcanea/hooks, @arcanea/chrome-extension, @arcanea/council,
@arcanea/guardian-evolution, @arcanea/guardian-memory, @arcanea/rituals,
arcanea-code
```

### Packages needing build script:
```
@arcanea/prompt-books
```

Standard publishConfig to add:
```json
"publishConfig": { "access": "public" }
```

Standard files to add:
```json
"files": ["dist", "README.md"]
```

---

## Phase 2: Build Verification [pending]

Run `turbo run build` across all packages and fix any build failures.

---

## Phase 3: npm Auth Setup [pending]

User runs `npm login --scope=@arcanea` interactively, or provides token.

---

## Phase 4: Publish All Packages [pending]

Use changesets to publish all packages to npm @arcanea org.

---

## Phase 5: Verify & Index [pending]

- Verify all packages are live on npmjs.com
- Update MASTER_INDEX.md with links to all published packages
- Verify arcanea-ai-app deployment

---

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| (none yet) | | |

---

## Previous Session Notes (Overlay Audit)
- Waves 1-3 COMPLETE: 580 tests passing
- overlay-opencode renamed to overlay-cursor
- Shared content layer unified across 5 overlays
- 13 skills system with auto-activation
- Wave 4 (Runtime Intelligence) still pending
