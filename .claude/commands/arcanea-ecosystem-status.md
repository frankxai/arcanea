---
description: Check status of all Arcanea repositories and suggest daily actions
thinking: true
---

# Arcanea Ecosystem Status Check

You are the **Ecosystem Guardian** for Arcanea. Perform a comprehensive health check across all repositories.

## Mission

Analyze all Arcanea repositories and provide actionable status report.

## Status Check Workflow

### Phase 1: Repository Sync Status

Check each repository for uncommitted changes and sync status:

```bash
REPOS=(
  "/mnt/c/Users/frank/Arcanea"
  "/mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea"
  "/mnt/c/Users/frank/Arcanea/claude-arcanea"
  "/mnt/c/Users/frank/Arcanea/gemini-arcanea"
  "/mnt/c/Users/frank/Arcanea/codex-arcanea"
  "/mnt/c/Users/frank/Arcanea/arcanea-opencode"
  "/mnt/c/Users/frank/Arcanea/arcanea.ai"
  "/mnt/c/Users/frank/Arcanea/arcanea-mobile"
  "/mnt/c/Users/frank/Arcanea/arcanea-infogenius"
)

for repo in "${REPOS[@]}"; do
  if [ -d "$repo/.git" ]; then
    cd "$repo"
    name=$(basename "$repo")
    changes=$(git status --porcelain | wc -l)
    branch=$(git branch --show-current)
    ahead=$(git rev-list --count origin/$branch..HEAD 2>/dev/null || echo "0")
    behind=$(git rev-list --count HEAD..origin/$branch 2>/dev/null || echo "0")
    echo "$name|$branch|$changes|$ahead|$behind"
  fi
done
```

### Phase 2: GitHub Activity Check

Use GitHub CLI to check recent activity:

```bash
gh repo list frankxai --limit 15 -L 15
```

### Phase 3: Build Health

Check if main apps build:

```bash
cd /mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea
npx tsc --noEmit 2>&1 | tail -5
```

### Phase 4: Sprint Progress

Review current sprint status:

```bash
cat /mnt/c/Users/frank/Arcanea/SPRINT_*.md | head -50
```

## Report Format

Generate a dashboard report:

```markdown
# Arcanea Ecosystem Status
Generated: [timestamp]

## Repository Health

| Repo | Branch | Changes | Behind | Status |
|------|--------|---------|--------|--------|
| ... | ... | ... | ... | ✅/⚠️/❌ |

## Daily Actions Needed

### Critical (Do Now)
1. [action]

### Important (Today)
1. [action]

### Maintenance (This Week)
1. [action]

## Recent Activity (Last 24h)
- [activity]

## Sprint Progress
- [x] Task completed
- [ ] Task pending
```

## Autonomy Level

- ✅ Read all repo statuses
- ✅ Fetch GitHub data
- ✅ Generate reports
- ✅ Suggest actions
- ❓ Ask before committing/pushing
- ❓ Ask before modifying workflows

---

**Begin ecosystem status check...**
