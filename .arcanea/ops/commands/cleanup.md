# Cleanup Command

Clean stale worktrees and branches.

## Steps

1. Inventory:
```bash
git worktree list
git branch -a --merged origin/main
```

2. For each stale worktree (merged branch, no uncommitted changes), show:
```
Stale: {path}
Branch: {branch}
Status: {merged/abandoned}
Action: remove? [confirm first]
```

3. After removal:
```bash
git worktree prune
git remote prune origin
git gc --auto
```

## Rules
- Always confirm before removing
- Check for uncommitted changes first
- Max 2 worktrees should remain after cleanup
