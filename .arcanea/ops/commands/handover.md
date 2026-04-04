# Handover Command

Write a durable session handover document at the end of any work session.

## Steps

1. Gather git state:
```bash
git log --oneline -10 --decorate
git status --short --branch
git diff --stat origin/main...HEAD
```

2. Create `docs/ops/SHORT_STATUS_AND_HANDOVER_{today's date}.md`:

```markdown
# Short Status And Handover - {date}

## What Landed
{recent main commits}

## What Changed This Session
{files/commits from this session}

## Current Blockers
{external dependencies or manual steps}

## Recommended Next Stack
{ordered next actions}

## Verification Evidence
{which gates passed}
```

3. Write ONE Starlight horizon entry (optional, only if something non-obvious was learned):
```bash
node scripts/sis-write.mjs --vault horizon --title "{one-line insight}" --content "{why it matters}"
```
Skip this if nothing surprising happened. The handover doc IS the durable record — Starlight is only for cross-session insights that aren't obvious from git history.

4. Stage and commit (do NOT push unless asked):
```bash
git add docs/ops/SHORT_STATUS_AND_HANDOVER_{date}.md
git commit -m "docs(ops): session handover {date}"
```
