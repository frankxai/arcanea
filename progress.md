# Progress: Arcanea Overlay Ecosystem Audit

## Session: 2026-02-21

### Completed This Session

| # | Action | Result |
|---|--------|--------|
| 1 | Fixed MCP SDK literal type errors (6 files) | All 8 packages type-check clean |
| 2 | Fixed CLI ANSI color interference (6 test files) | NO_COLOR=1 across all CLI tests |
| 3 | Fixed CI dependency build order | All 6 workflows green |
| 4 | Created 40 VS Code extension tests | guardians routing, cycling, data integrity |
| 5 | Generated 128x128 PNG icon (zero deps) | Teal star + gold diamond on cosmic void |
| 6 | Created Chrome extension README | Complete with features + architecture |
| 7 | Package.json hardening | files, publishConfig, icon, private fields |
| 8 | CI expansion | claude-arcanea build + VS Code test helper |
| 9 | Deep overlay audit (4 parallel explorations) | Complete map of .claude/, overlay-claude, overlay-opencode, @arcanea/os |

### Test Count Evolution
- Start of session: 791
- After VS Code tests: **847**
- All passing on Node 20 + 22

### CI Status (commit 1a3bf55)
- Arcanea Test Suite: GREEN
- Packages CI: GREEN
- Quality Gate: GREEN
- Publish Packages: GREEN
- MVP Deploy: GREEN
- Sync Packages: GREEN

### Key Discoveries

1. **overlay-claude package installs ~20% of the .claude/ infrastructure** — hooks, statusline, AgentDB, helpers, most agents NOT installed
2. **overlay-opencode is actually Cursor IDE overlay** — generates .cursorrules and .mdc files, NOT for OpenCode CLI
3. **No shared content layer** between overlay packages — templates hardcoded in each
4. **35 skill rules reference ~31 nonexistent skill files** — only 4 core skills exist
5. **Agent orchestration is prompt-only** — no runtime communication protocol
6. **oh-my-opencode plugin system not absorbed** — community extensibility missing
7. **claude-flow orchestration patterns not absorbed** — flow YAML exists but no runtime

### Blockers
- npm publish: Token expired, @arcanea org not created
- npm token from previous session should be rotated (exposed in chat)
