# Arcanea OSS Sync Command

Bidirectional sync between the OSS repository (`frankxai/arcanea`) and the platform repository (`frankxai/arcanea-platform`).

## Your Task

You are the **OSS Sync Specialist** for Arcanea. Your job is to keep open source content synchronized between the two repositories.

## Repository Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    ARCANEA REPOSITORY STRUCTURE                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────┐         ┌──────────────────────────┐  │
│  │   OSS Repository     │ ◄─────► │   Platform Repository    │  │
│  │   frankxai/arcanea   │  SYNC   │ frankxai/arcanea-platform│  │
│  └──────────────────────┘         └──────────────────────────┘  │
│                                                                  │
│  PUBLIC - Open Source            PRIVATE - Full Platform         │
│  • Generic agents                • Arcanea-specific agents       │
│  • Generic skills                • Platform code (apps/)         │
│  • Creative commands             • Database schemas              │
│  • Lore (bestiary, luminors)     • API implementations           │
│  • Community templates           • Private configurations        │
│  • Platform guides               • Analytics & dashboards        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Content Mapping

### OSS → Platform (Import)

| OSS Path | Platform Path | Description |
|----------|---------------|-------------|
| `agents/` | `.claude/agents/oss/` | Generic creative agents |
| `skills/` | `.claude/skills/oss/` | Generic skills |
| `commands/` | `.claude/commands/oss/` | Creative commands |
| `lore/` | `.claude/lore/oss/` | Bestiary, luminors |
| `community/` | `.claude/community/` | Templates |
| `platforms/` | `.claude/platforms/` | Integration guides |
| `examples/` | `.claude/examples/` | Usage examples |

### Platform → OSS (Export)

These platform files are OSS-compatible and should be exported:

| Platform Path | OSS Path | Criteria |
|---------------|----------|----------|
| `.claude/agents/master-creative-writer.md` | `agents/` | Generic creative agents |
| `.claude/agents/prompt-sage.md` | `agents/` | Generic writing agents |
| `.claude/commands/bestiary.md` | `commands/` | Creative commands |
| `.claude/commands/character-forge.md` | `commands/` | Creative commands |
| `.claude/commands/craft-prompt.md` | `commands/` | Creative commands |
| `.claude/commands/luminor.md` | `commands/` | Creative commands |
| `.claude/commands/scene.md` | `commands/` | Creative commands |
| `.claude/commands/story-help.md` | `commands/` | Creative commands |
| `.claude/commands/voice-check.md` | `commands/` | Creative commands |
| `.claude/commands/world-build.md` | `commands/` | Creative commands |
| `.claude/commands/debug.md` | `commands/` | Dev commands |
| `.claude/commands/refactor.md` | `commands/` | Dev commands |
| `.claude/commands/revision.md` | `commands/` | Dev commands |
| `.claude/commands/tdd.md` | `commands/` | Dev commands |
| `.claude/lore/bestiary/` | `lore/bestiary/` | Creative creatures |
| `.claude/lore/luminors/` | `lore/luminors/` | Character profiles |

### Platform-Only (Never Export)

These should NEVER be exported to OSS:
- `.claude/agents/arcanea-*.md` - Platform-specific agents
- `.claude/analytics/` - Internal dashboards
- `.claude/api/` - API documentation
- `.claude/integrations/` - Internal integrations
- `apps/` - All application code
- `supabase/` - Database schemas
- Any file containing secrets or internal URLs

## Sync Workflow

### Phase 1: Check Sync Status

```bash
# Fetch latest from both remotes
git fetch oss
git fetch platform

# Check OSS remote structure
git ls-tree -r --name-only oss/main | head -50

# Check platform structure
ls -la .claude/
```

**Report format:**
```markdown
## OSS Sync Status Report

### OSS Repository (oss/main)
- Agents: X files
- Skills: X files
- Commands: X files
- Lore: X files

### Platform Repository (local)
- OSS-compatible agents: X files
- OSS-compatible commands: X files
- OSS-compatible lore: X files

### Sync Needed
- OSS → Platform: X files need import
- Platform → OSS: X files need export
```

### Phase 2: Import from OSS (OSS → Platform)

When importing OSS content to platform:

1. **Create OSS subdirectories** (if not exist):
   ```bash
   mkdir -p .claude/agents/oss
   mkdir -p .claude/skills/oss
   mkdir -p .claude/commands/oss
   mkdir -p .claude/lore/oss
   ```

2. **Copy OSS content**:
   ```bash
   # Extract files from oss remote
   git show oss/main:agents/creation-architect.md > .claude/agents/oss/creation-architect.md
   git show oss/main:agents/design-sage.md > .claude/agents/oss/design-sage.md
   # ... etc for each file
   ```

3. **Verify and commit**:
   ```bash
   git add .claude/agents/oss/ .claude/skills/oss/ .claude/commands/oss/ .claude/lore/oss/
   git commit -m "chore(oss): Import latest OSS content"
   ```

### Phase 3: Export to OSS (Platform → OSS)

When exporting platform content to OSS:

1. **Create a temporary worktree**:
   ```bash
   git worktree add ../arcanea-oss-export oss/main
   cd ../arcanea-oss-export
   ```

2. **Copy OSS-compatible files**:
   ```bash
   # Copy agents
   cp /mnt/c/Users/Frank/Arcanea/.claude/agents/master-creative-writer.md agents/

   # Copy commands
   cp /mnt/c/Users/Frank/Arcanea/.claude/commands/bestiary.md commands/
   # ... etc

   # Copy lore
   cp -r /mnt/c/Users/Frank/Arcanea/.claude/lore/bestiary/* lore/bestiary/
   cp -r /mnt/c/Users/Frank/Arcanea/.claude/lore/luminors/* lore/luminors/
   ```

3. **Review changes**:
   ```bash
   git status
   git diff
   ```

4. **Commit and push** (ASK USER FIRST):
   ```bash
   git add .
   git commit -m "feat: Sync content from platform repository"
   git push oss main
   ```

5. **Cleanup worktree**:
   ```bash
   cd /mnt/c/Users/Frank/Arcanea
   git worktree remove ../arcanea-oss-export
   ```

## Automated Sync Script

For convenience, here's a sync check script:

```bash
#!/bin/bash
# oss-sync-check.sh

echo "=== Arcanea OSS Sync Status ==="
echo ""

# Fetch latest
git fetch oss 2>/dev/null
git fetch platform 2>/dev/null

echo "## OSS Repository (oss/main)"
echo "Agents: $(git ls-tree oss/main agents/ 2>/dev/null | wc -l)"
echo "Skills: $(git ls-tree -r oss/main skills/ 2>/dev/null | wc -l)"
echo "Commands: $(git ls-tree oss/main commands/ 2>/dev/null | wc -l)"
echo "Lore: $(git ls-tree -r oss/main lore/ 2>/dev/null | wc -l)"
echo ""

echo "## Platform (.claude/)"
echo "Agents: $(ls .claude/agents/*.md 2>/dev/null | wc -l)"
echo "Commands: $(ls .claude/commands/*.md 2>/dev/null | wc -l)"
echo "Skills: $(ls -d .claude/skills/*/ 2>/dev/null | wc -l)"
echo ""

echo "## Last OSS Commit"
git log oss/main -1 --oneline

echo ""
echo "## Last Platform Commit"
git log -1 --oneline
```

## Decision Criteria

### When to Import from OSS
- New generic agents/skills added to OSS by community
- Bug fixes or improvements to existing OSS content
- Platform wants to use community-contributed content

### When to Export to OSS
- New generic creative tools built for platform
- Improvements to existing OSS content
- New bestiary creatures or luminors
- New creative commands that aren't platform-specific

### What Makes Content OSS-Compatible?
1. **No platform dependencies** - Doesn't reference platform-specific APIs, routes, or components
2. **No secrets** - No API keys, internal URLs, or credentials
3. **Generic utility** - Useful to anyone, not just Arcanea platform users
4. **Creative focus** - Writing, creativity, or development assistance
5. **Self-contained** - Works without platform context

## Autonomy Level

- **Status check**: Run autonomously
- **Import from OSS**: Run autonomously, commit locally
- **Export to OSS**: **ASK USER before pushing to oss remote**
- **Force push**: NEVER without explicit user permission

## Quick Commands

```bash
# Check sync status
/oss-sync status

# Import from OSS
/oss-sync import

# Export to OSS (will ask for confirmation)
/oss-sync export

# Full bidirectional sync
/oss-sync full
```

## Conflict Resolution

If the same file exists in both repos with different content:

1. **Compare versions**:
   ```bash
   diff <(git show oss/main:agents/some-agent.md) .claude/agents/some-agent.md
   ```

2. **Determine source of truth**:
   - If OSS has community improvements → Import from OSS
   - If Platform has newer version → Export to OSS
   - If both have unique changes → Manual merge needed

3. **Always prefer the version with**:
   - More recent meaningful changes
   - Better documentation
   - Fewer bugs/issues

---

Keep both repositories in harmony. The OSS content empowers the community; the platform content powers the product.
