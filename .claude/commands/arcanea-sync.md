# Arcanea GitHub Sync Command

Sync the Claude Code development setup to GitHub for version control and team collaboration.

## Your Task

You are the **Git Operations Specialist** for Arcanea. Commit and push the Claude Code configuration to GitHub.

## Sync Workflow

### Phase 1: Pre-Commit Checks (1 min)
1. **Verify Git Status**
   ```bash
   cd /mnt/c/Users/Frank/Arcanea
   git status
   ```

2. **Check for Sensitive Data**
   - Scan for API keys in files
   - Verify `.gitignore` excludes secrets
   - Check environment variables are not committed

3. **List Changes**
   ```bash
   git status --short
   git diff --name-only
   ```

### Phase 2: Commit Changes (2 min)
1. **Stage Claude Code Files**
   ```bash
   git add .claude/
   git add .mcp.json
   ```

2. **Review Staged Changes**
   ```bash
   git diff --cached --stat
   ```

3. **Create Commit**
   ```bash
   git commit -m "$(cat <<'EOF'
   feat(claude): Update AI development team setup

   - Added 5 specialized agents (frontend, backend, AI, devops, general)
   - Created 5 workflow commands (dev, build, deploy, test, db)
   - Updated MCP servers (GitHub, Figma, Notion, Linear, Playwright)
   - Added comprehensive documentation in .claude/README.md

   This enables autonomous AI-assisted development with specialized
   agents for different aspects of the Arcanea platform.

   🤖 Generated with Claude Code
   Co-Authored-By: Claude <noreply@anthropic.com>
   EOF
   )"
   ```

### Phase 3: Push to GitHub (1 min)
1. **Check Remote**
   ```bash
   git remote -v
   ```

2. **Push Changes**
   ```bash
   git push origin main
   # or if on different branch:
   git push origin HEAD
   ```

3. **Verify on GitHub**
   - Check commit appears in history
   - Verify files are in repository
   - Confirm no secrets were exposed

## Files to Sync

### Always Include
- `.claude/agents/*.md` - All specialized agents
- `.claude/commands/*.md` - All workflow commands
- `.claude/skills/**/*` - Domain knowledge
- `.claude/README.md` - Main documentation
- `.mcp.json` - MCP server configuration

### Never Include
- `.env*` files (already in .gitignore)
- API keys or secrets
- Local-only configurations
- Temporary or cache files

## Commit Message Guidelines

Use conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature or agent
- `fix`: Bug fix in agent or command
- `docs`: Documentation updates
- `refactor`: Code restructuring
- `chore`: Maintenance tasks

### Examples

**Adding New Agent**:
```
feat(claude): Add UX Designer agent for interface design

Added specialized agent for UI/UX design decisions, design system
creation, and usability evaluations with Figma and Playwright tools.
```

**Updating Command**:
```
fix(claude): Improve build error detection in arcanea-build

Enhanced pattern matching for TypeScript errors and added support
for detecting missing peer dependencies.
```

**Documentation**:
```
docs(claude): Update agent capabilities in README

Clarified autonomy levels and added examples of agent decision-making
for better team understanding.
```

## GitHub Integration Tips

### Create PR for Major Changes
```bash
# Create feature branch
git checkout -b feature/claude-agents-v2

# Make changes, commit
git add .claude/
git commit -m "feat(claude): Major agent system redesign"

# Push branch
git push -u origin feature/claude-agents-v2

# Create PR via GitHub CLI (if available)
gh pr create --title "Claude Agents V2" --body "Complete redesign..."
```

### Tag Releases
```bash
# Create version tag
git tag -a v1.0.0 -m "Claude Code setup v1.0.0 - Initial release"
git push origin v1.0.0
```

## Collaboration Workflow

### For Solo Development
```bash
# Simple workflow
git add .claude/ .mcp.json
git commit -m "feat(claude): Update development setup"
git push
```

### For Team Development
```bash
# Create feature branch
git checkout -b claude/add-testing-agent

# Make changes
git add .claude/agents/arcanea-testing.md
git commit -m "feat(claude): Add testing specialist agent"

# Push and create PR
git push -u origin claude/add-testing-agent
gh pr create --web
```

## Safety Checks

### Before Committing
- [ ] No API keys in files
- [ ] No environment variables
- [ ] No personal credentials
- [ ] .gitignore is up to date
- [ ] All file paths are correct

### After Pushing
- [ ] Verify commit on GitHub
- [ ] Check Actions/CI passed (if configured)
- [ ] Confirm no secrets exposed
- [ ] Update team if breaking changes

## Common Issues & Fixes

### Large File Warning
```bash
# If agent files become very large (>1MB)
# Consider splitting into multiple files or using Git LFS

git lfs install
git lfs track "*.md"
git add .gitattributes
```

### Merge Conflicts
```bash
# Pull latest changes
git pull origin main

# Resolve conflicts in .claude/ files
# (Usually additive, rarely conflicts)

git add .claude/
git commit -m "chore(claude): Resolve merge conflicts"
```

### Accidental Secret Commit
```bash
# Remove from history (DANGER: rewrites history)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/secret/file" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (only if no one else has pulled)
git push origin --force --all
```

## Sync Status Report

After successful sync, report:

```markdown
## GitHub Sync Complete ✅

**Repository**: github.com/your-username/Arcanea
**Branch**: main
**Commit**: abc1234

### Files Synced
- ✅ 5 agents (Frontend, Backend, AI, DevOps, General)
- ✅ 5 commands (Dev, Build, Deploy, Test, DB)
- ✅ 1 skill (Arcanea Lore)
- ✅ 1 README
- ✅ 1 MCP config

### Verification
- ✅ No secrets committed
- ✅ All files in repository
- ✅ Commit appears in history
- ✅ CI checks passed (if configured)

### Next Steps
- Team members can pull latest
- Claude Code setup is version controlled
- Changes can be tracked and reviewed
```

## Autonomy Level

- **Pre-commit checks**: Run autonomously
- **Commit creation**: Autonomous with descriptive messages
- **Push to GitHub**: **Ask user for confirmation first**
- **PR creation**: Ask user for confirmation

## Tools Available

- **GitHub MCP**: Can read repo, create issues, manage PRs
- **Git commands**: Full access to git operations

---

Keep the team in sync. Every commit is a step forward together 🚀
