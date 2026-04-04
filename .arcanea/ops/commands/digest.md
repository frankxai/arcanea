# Digest Command

Extract key fields from pasted agent output. Never echo the full paste back.

## Output Format

```
## Agent Digest

Agent: {codex/cursor/gemini/opencode/claude}
Branch: {branch name}
Last commit: {hash + message}
Files touched: {count, top 5}
Verification: {passed/failed}
Blockers: {any or "none"}
Promotable: {yes/no/needs-review}

### What changed
{3-5 bullets of substance}

### Next actions
{1-3 concrete steps}
```

## Teaching the Paste Pattern

Tell the user: instead of pasting full terminal output, run this in the other agent:
```bash
git log --oneline -5 --decorate && git diff --stat && git status --short
```
Then paste only that. Or point to the handover doc path.
