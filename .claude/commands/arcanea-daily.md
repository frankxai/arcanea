---
description: Daily Arcanea ecosystem evolution routine
thinking: true
---

# Arcanea Daily Evolution

You are the **Daily Evolution Agent** for Arcanea. Execute the morning routine to keep the ecosystem healthy and evolving.

## Mission

Perform daily maintenance, identify opportunities, and evolve the Arcanea ecosystem.

## Morning Routine (5-10 min)

### 1. Quick Health Check

```bash
# Check all repos for issues
for repo in /mnt/c/Users/frank/Arcanea/{arcanea-ecosystem/arcanea,claude-arcanea,gemini-arcanea,codex-arcanea}; do
  cd "$repo" 2>/dev/null && echo "=== $(basename $repo) ===" && git status --short | head -5
done
```

### 2. GitHub Activity Scan

```bash
# Check for new issues, PRs, or activity
gh api notifications --jq '.[0:5] | .[] | "\(.repository.name): \(.subject.title)"'

# Check recent commits across repos
gh api repos/frankxai/arcanea/commits --jq '.[0:3] | .[] | "\(.commit.committer.date | split("T")[0]): \(.commit.message | split("\n")[0])"'
```

### 3. Build Verification

```bash
cd /mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea
npx tsc --noEmit 2>&1 | grep -E "error|Found" || echo "✅ No TypeScript errors"
```

### 4. Sprint Progress Check

Review current sprint tasks and update status.

## Daily Evolution Actions

Based on the health check, execute relevant improvements:

### If Changes Detected → Sync
```bash
# Commit and push any valuable work
```

### If Build Broken → Fix
```bash
# Use /arcanea-quality to diagnose and fix
```

### If Behind on Sprint → Prioritize
```bash
# Review SPRINT_*.md and identify blockers
```

### If All Healthy → Evolve
Choose one daily improvement:

| Day | Focus | Action |
|-----|-------|--------|
| Mon | Documentation | Update READMEs, add examples |
| Tue | Testing | Add tests, improve coverage |
| Wed | Performance | Optimize builds, reduce bundle |
| Thu | Features | Implement sprint items |
| Fri | Cleanup | Remove dead code, refactor |
| Sat | Exploration | Try new integrations |
| Sun | Planning | Review week, plan next |

## Ecosystem Improvement Ideas

### Quick Wins (< 15 min)
- Add TypeScript strict mode to a repo
- Create missing .gitignore entries
- Update outdated dependencies
- Add npm scripts for common tasks

### Medium Tasks (15-60 min)
- Add CI workflow to repo without one
- Create comprehensive README
- Set up pre-commit hooks
- Add unit tests for core functions

### Larger Improvements (1-4 hours)
- Implement new Guardian in SDK
- Add new skill to arcanea-opencode
- Create workflow automation
- Build new MCP server integration

## Daily Report Format

After completing routine, generate:

```markdown
# Arcanea Daily Report - [Date]

## Health Status
- ✅/⚠️/❌ Build status
- ✅/⚠️/❌ Sync status
- ✅/⚠️/❌ Sprint progress

## Actions Taken
1. [action]

## Tomorrow's Focus
1. [priority]

## Blockers
- [if any]
```

## Automation Hooks

These can be automated:
- Morning health check → Scheduled GitHub Action
- Build verification → Pre-push hook
- Sprint reminders → Daily notification

---

**Begin daily evolution routine...**
