# Arcanea Tomorrow Plan

> Created: Jan 8, 2026
> Status: Ready for execution

## Decision Made
- **Keep `arcanea` as main monorepo** - all development happens here
- **Repurpose `arcanea-opencode`** as mirror with OpenCode-specific README
- **GitHub Actions** to auto-sync platform-specific repos for SEO

---

## Phase 1: Fix OpenCode Integration (30 min)

### Issue
OpenCode users who clone arcanea don't see "Arcanea" as an available agent because:
1. OpenCode reads `OPENCODE.md`, not `CLAUDE.md`
2. No agent registration in OpenCode format

### Tasks
- [ ] Copy `CLAUDE.md` to `OPENCODE.md` in install.ts for OpenCode platform
- [ ] Research OpenCode's agent registration format (check oh-my-opencode for reference)
- [ ] Update `installOpenCodeSettings()` in `src/install.ts` to properly register Arcanea

### Files to modify
```
src/install.ts  # Update installOpenCodeSettings function
```

---

## Phase 2: Publish & Test (15 min)

### Tasks
- [ ] Build package: `bun run build`
- [ ] Verify dist/ output is correct
- [ ] Test locally: `bunx ./dist/cli/index.js install --opencode`
- [ ] Publish to npm: `npm publish`
- [ ] Test from npm: `bunx arcanea install --opencode` in fresh folder
- [ ] Verify agents/skills/commands are copied correctly

---

## Phase 3: Multi-Repo SEO Sync (45 min)

### Strategy
Keep main `arcanea` repo as source of truth, sync to platform-specific repos for SEO.

### Repos to maintain
| Repo | Purpose | SEO Keywords |
|------|---------|--------------|
| `frankxai/arcanea` | Main repo, source of truth | arcanea, ai agents, creative ai |
| `frankxai/arcanea-opencode` | OpenCode mirror | opencode, oh-my-opencode |
| `frankxai/arcanea-claude-code` | (future) Claude Code mirror | claude code, anthropic |

### Tasks
- [ ] Update `arcanea-opencode` repo README to be OpenCode-focused
- [ ] Add "For OpenCode users" prominently at top
- [ ] Reference main `arcanea` repo for full documentation
- [ ] Create `.github/workflows/sync-mirrors.yml` in main arcanea repo

### GitHub Action Template
```yaml
name: Sync to Mirror Repos
on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  sync-opencode:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Sync to arcanea-opencode
        run: |
          # Clone mirror, replace contents, push
          git clone https://github.com/frankxai/arcanea-opencode mirror
          # Copy relevant files
          cp -r agents skills commands CLAUDE.md mirror/
          # Add OpenCode-specific README
          cp .github/readme-opencode.md mirror/README.md
          cd mirror
          git add -A
          git commit -m "Sync from arcanea main"
          git push
```

---

## Phase 4: Git Cleanup (10 min)

### Current Issue
Push to `oss` remote failed due to rebase conflicts.

### Tasks
- [ ] Check git log: `git log --oneline -10`
- [ ] Force push to oss (if safe): `git push oss main --force`
- [ ] Or: Reset and re-sync using `scripts/sync-oss.sh`

---

## Testing Checklist

After all phases complete, verify:

### Fresh Install Test
```bash
mkdir /tmp/test-arcanea && cd /tmp/test-arcanea
bunx arcanea install --opencode
ls -la .opencode/
cat .opencode/CLAUDE.md  # or OPENCODE.md
```

### Expected Result
```
.opencode/
├── agents/          # All agents copied
├── skills/          # All skills copied  
├── commands/        # All commands copied
├── CLAUDE.md        # or OPENCODE.md - system prompt
└── [agent registration file]
```

### OpenCode Activation Test
1. Open OpenCode in test directory
2. Check if "Arcanea" appears as available agent
3. Test: `/luminor Valora courage`
4. Test: `ultraworld: Create a mystical forest`

---

## Notes

### Oh-My-OpenCode Reference
Check `/mnt/c/Users/Frank/oh-my-opencode/` for:
- How agents are registered
- Config file format
- System prompt location

### Key Files
| File | Purpose |
|------|---------|
| `/mnt/c/Users/Frank/Arcanea/arcanea-skills-opensource/` | Main package |
| `/mnt/c/Users/Frank/arcanea-opencode/` | Old separate repo (repurpose) |
| `/mnt/c/Users/Frank/oh-my-opencode/` | Reference for OpenCode integration |
| `github.com/frankxai/arcanea` | Public main repo |
| `github.com/frankxai/arcanea-opencode` | Public mirror repo |
