# Findings: Arcanea Ecosystem Audit

> Last updated: 2026-02-21

## Package Inventory (15 packages + 2 apps)

| Package | Version | Dist | Tests | Publish-Ready | Notes |
|---------|---------|------|-------|---------------|-------|
| arcanea-intelligence-os (aios) | v0.1.1 | YES | 68 | npm-ready | Needs own changeset |
| @arcanea/mcp-server | v0.5.0 | YES | 16 | npm-ready | In changeset, SDK 1.9.0 |
| @arcanea/auth | v1.0.1 | YES | 44 | npm-ready | In changeset (patch) |
| @arcanea/chrome-extension | v0.1.0 | YES | 35 | browser-only | Chrome Web Store blocked |
| claude-arcanea | v0.1.1 | YES | 0 | npm-ready | Needs tests + changeset |
| @arcanea/cli | v0.3.0 | YES | 137 | npm-ready | In changeset |
| @arcanea/os | v0.3.0 | YES | 44 | npm-ready | In changeset |
| @arcanea/extension-core | v0.1.0 | YES | 112 | npm-ready | In changeset |
| @arcanea/overlay-chatgpt | v1.0.1 | YES | 68 | npm-ready | In changeset |
| @arcanea/overlay-claude | v1.0.1 | YES | 32 | npm-ready | In changeset |
| @arcanea/overlay-copilot | v1.0.1 | YES | 67 | npm-ready | In changeset |
| @arcanea/overlay-gemini | v1.0.1 | YES | 70 | npm-ready | In changeset |
| @arcanea/overlay-opencode | v1.0.1 | YES | 77 | npm-ready | In changeset |
| @starlight/runtime | v0.1.0 | YES | 21 | npm-ready | Needs own changeset |
| arcanea-realm (vscode) | v0.1.1 | YES | 0 | marketplace | Via vsce publish |

**Total: 791 tests, 188 suites, 0 failures**

## Publish Readiness

### npm Publishing
- **NPM_TOKEN**: SET on GitHub (2026-02-21 02:40 UTC)
- **Changeset**: `extension-core-and-upgrades.md` covers 10 packages
- **Missing changesets**: aios, starlight-runtime, claude-arcanea (3 packages)
- **Blocker**: `pnpm install` must run from Windows PowerShell first
- **Pipeline**: `.github/workflows/publish-packages.yml` handles CI/CD

### Chrome Web Store
- **Missing**: Privacy policy, screenshots, $5 developer account
- **Has**: manifest.json, icons (16/32/48/128px), dist build, 35 tests

### VS Code Marketplace
- **Publisher**: `frankxai`
- **Icon**: `packages/vscode/resources/icon.png`
- **VSIX**: 39.3KB esbuild bundle
- **Missing**: Azure DevOps PAT, `vsce publish` command

## Uncommitted Work (14 files)

| File | Change | Purpose |
|------|--------|---------|
| 6x MCP tool files | `type: string` → `type: "text"` | SDK 1.9.0 strict typing |
| publish-packages.yml | +5 lines | Build @arcanea/os + extension-core before chrome-ext |
| test.yml | +9 lines | Expanded test coverage in CI |
| 6x CLI test files | +1 line each | Minor fixes from previous session |

## Infrastructure Verified

- **TypeScript**: All 12+ packages pass `tsc --noEmit` with zero errors
- **Turbo**: build, test, type-check, lint, clean, dev all configured
- **Root scripts**: `test:all` (full), `test:quick` (core packages)
- **CI/CD**: GitHub Actions with type-check → test → build → publish pipeline
- **MCP Server**: Migrated to `@modelcontextprotocol/sdk` 1.9.0 (McpServer + server.tool() + zod)

## Architecture

```
┌──────────────────────────────────────────────────┐
│                  @arcanea/os                      │
│   Intelligence: Guardians · Voice · Design · Lore │
└────┬──────┬──────┬──────┬──────┬────────────────┘
     │      │      │      │      │
  CLI    MCP    VS Code  Chrome  5 Overlay
  10cmd  30tool  6cmd    Ext     Packages
  137t   16t     0t      35t     314t
```

## Test Architecture
- **Runner**: Node.js built-in (`node:test` + `node:assert`)
- **Files**: `tests/*.test.mjs` (ESM)
- **CJS bridge**: starlight-runtime uses `.cjs` copy for ESM/CJS compat
- **No external deps**: Zero test framework dependencies
