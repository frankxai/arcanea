# Status Command

Quick repo status dashboard. Run in parallel:

```bash
git status --short --branch
git log --oneline -8 --decorate
git worktree list
```

Report format (keep under 20 lines):

```
Branch: {branch}
Trunk: {origin/main hash}
Divergence: {ahead/behind/clean}
Worktrees: {count}
Dirty: {modified} modified, {untracked} untracked
Last 5 commits: {one line each}
```
