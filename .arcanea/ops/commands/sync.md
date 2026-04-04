# Sync Command

Sync shared .arcanea/ intelligence between the OSS repo (frankxai/arcanea) and the product repo (frankxai/arcanea-ai-app).

## Rule

The OSS repo is the CANONICAL SOURCE for:
- `.arcanea/ops/` — agent bootstrap, ao protocol, shared commands
- `.arcanea/lore/` — canon, guardians, mythology
- `.arcanea/config/` — design tokens, model routing, voice
- `.arcanea/skills/` — creative and universe skills
- `.arcanea/agents/` — Guardian and department profiles
- `.arcanea/scripts/ao-init.*` — bootstrap scripts
- `.arcanea/prompts/` — luminor engineering kernel

The product repo (arcanea-ai-app) is the CANONICAL SOURCE for:
- `planning-with-files/*` — execution control plane
- `docs/ops/*` — handovers, branch matrix, action logs
- `apps/web/` — the webapp
- `AGENTS.md` — product-specific agent contract
- `supabase/` — migrations and DB types
- `.arcanea/sis/` — SIS bridge (product-specific)

Agent-specific overlays go to their dedicated repos:
- `.claude/commands/`, `.claude/skills/` → `frankxai/claude-arcanea`
- `.opencode/agents/`, `.opencode/commands/` → `frankxai/oh-my-arcanea`

## Sync Steps

1. Identify which files changed in `.arcanea/ops/`, `.arcanea/scripts/`, `.arcanea/lore/`, `.arcanea/config/`:
```bash
git diff --name-only HEAD~1 -- .arcanea/ops .arcanea/scripts .arcanea/lore .arcanea/config .arcanea/skills .arcanea/agents .arcanea/prompts
```

2. For each changed file, push to the OSS repo:
```bash
cat "{file}" | base64 -w0 > /tmp/b64.txt
gh api "repos/frankxai/arcanea/contents/{file}" \
  -X PUT -f message="sync: {file}" \
  -f content="$(cat /tmp/b64.txt)" -f branch="main" \
  --jq '.content.path'
```

3. If agent-specific files changed, push to the right overlay repo:
- `.claude/` changes → `frankxai/claude-arcanea`
- `.opencode/` changes → `frankxai/oh-my-arcanea`

4. If shared-ops changed, also update:
- `frankxai/arcanea-orchestrator` (shared-ops/)
- `frankxai/arcanea-flow` (shared-ops/)
- `frankxai/oh-my-arcanea` (shared-ops/)

## When to Sync

- After any change to `.arcanea/ops/`
- After any change to `.arcanea/lore/`
- After building new skills or commands
- At the end of a session that modified shared intelligence
- NEVER sync product-specific files (planning-with-files, docs/ops handovers) to OSS
