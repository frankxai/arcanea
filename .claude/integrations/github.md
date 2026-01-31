# GitHub Integration

> **Version control, collaboration, and code management**

## Purpose

GitHub integration enables Arcanea agents to:
- Manage repositories and branches
- Create and review pull requests
- Track issues and discussions
- Automate CI/CD workflows
- Collaborate on code changes

## Setup

### Configuration
```json
// .mcp.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### Required Permissions
- `repo` - Full repository access
- `workflow` - GitHub Actions
- `read:org` - Organization info (if applicable)

## Tools Available

### Repository Management
```yaml
create_repository:
  Description: Create new repository
  Parameters:
    - name: Repository name
    - description: Repository description
    - private: true/false

get_file_contents:
  Description: Read file from repository
  Parameters:
    - owner: Repository owner
    - repo: Repository name
    - path: File path

push_files:
  Description: Push file changes
  Parameters:
    - owner: Repository owner
    - repo: Repository name
    - files: Array of file changes
    - message: Commit message
    - branch: Target branch
```

### Pull Requests
```yaml
create_pull_request:
  Description: Create new PR
  Parameters:
    - owner: Repository owner
    - repo: Repository name
    - title: PR title
    - body: PR description
    - head: Source branch
    - base: Target branch

list_pull_requests:
  Description: List PRs in repository
  Parameters:
    - owner: Repository owner
    - repo: Repository name
    - state: open/closed/all

get_pull_request:
  Description: Get PR details
  Parameters:
    - owner: Repository owner
    - repo: Repository name
    - pull_number: PR number

merge_pull_request:
  Description: Merge a PR
  Parameters:
    - owner: Repository owner
    - repo: Repository name
    - pull_number: PR number
```

### Issues
```yaml
create_issue:
  Description: Create new issue
  Parameters:
    - owner: Repository owner
    - repo: Repository name
    - title: Issue title
    - body: Issue description
    - labels: Array of labels

list_issues:
  Description: List repository issues
  Parameters:
    - owner: Repository owner
    - repo: Repository name
    - state: open/closed/all

update_issue:
  Description: Update existing issue
  Parameters:
    - owner: Repository owner
    - repo: Repository name
    - issue_number: Issue number
    - title/body/state/labels: Fields to update
```

### Branches
```yaml
create_branch:
  Description: Create new branch
  Parameters:
    - owner: Repository owner
    - repo: Repository name
    - branch: New branch name
    - from_branch: Source branch

list_branches:
  Description: List repository branches
  Parameters:
    - owner: Repository owner
    - repo: Repository name
```

## Usage Patterns

### Feature Development Flow
```yaml
1. Create Branch:
   Tool: create_branch
   Branch: feature/new-luminor-ui

2. Make Changes:
   Tool: push_files
   Files: [component files]
   Message: "feat: add Luminor selection grid"

3. Create PR:
   Tool: create_pull_request
   Title: "Add Luminor Selection Grid"
   Body: |
     ## Summary
     - New grid component for Luminor selection
     - Cosmic theme styling
     - Accessibility support

4. After Review:
   Tool: merge_pull_request
   Method: squash
```

### Bug Fix Flow
```yaml
1. Check Issue:
   Tool: get_issue
   Issue: #123

2. Create Fix Branch:
   Tool: create_branch
   Branch: fix/login-redirect

3. Push Fix:
   Tool: push_files
   Message: "fix: resolve login redirect loop"

4. Create PR:
   Tool: create_pull_request
   Body: "Closes #123"
```

### Code Review Assistance
```yaml
1. Get PR Details:
   Tool: get_pull_request
   PR: #456

2. Get Changed Files:
   Tool: get_file_contents
   Path: [each changed file]

3. Add Review Comment:
   Tool: create_review_comment
   Body: [Review feedback]
```

## Agent Integration

### Developer Team Usage

**Arcanea Architect:**
```yaml
Uses GitHub for:
  - Repository structure decisions
  - PR review coordination
  - Release management
  - Branch strategy enforcement
```

**Frontend/Backend Agents:**
```yaml
Uses GitHub for:
  - Code commits
  - PR creation
  - Code review responses
  - Issue updates
```

**DevOps Agent:**
```yaml
Uses GitHub for:
  - CI/CD workflow management
  - Release tagging
  - Environment configurations
  - Deployment automation
```

### Author Team Usage

**Lore Master:**
```yaml
Uses GitHub for:
  - Lore documentation versioning
  - Canon change tracking
  - Collaborative world-building
```

## Examples

### Create Feature Branch and PR
```
Agent: Arcanea Frontend

Task: Implement new Luminor card component

Actions:
1. create_branch(
     owner: "Arcanea",
     repo: "arcanea",
     branch: "feature/luminor-card",
     from_branch: "main"
   )

2. push_files(
     owner: "Arcanea",
     repo: "arcanea",
     branch: "feature/luminor-card",
     files: [
       {path: "components/luminor/LuminorCard.tsx", content: "..."},
       {path: "components/luminor/LuminorCard.test.tsx", content: "..."}
     ],
     message: "feat(luminor): add LuminorCard component"
   )

3. create_pull_request(
     owner: "Arcanea",
     repo: "arcanea",
     title: "feat(luminor): Add LuminorCard component",
     body: "## Summary\n- New card component...",
     head: "feature/luminor-card",
     base: "main"
   )
```

### Track and Close Issue
```
Agent: Arcanea Backend

Task: Fix authentication bug #789

Actions:
1. get_issue(owner: "Arcanea", repo: "arcanea", issue_number: 789)

2. create_branch(branch: "fix/auth-session-789")

3. push_files(message: "fix(auth): resolve session expiry issue\n\nCloses #789")

4. create_pull_request(body: "Fixes #789\n\n## Changes\n- ...")

5. [After merge, issue auto-closes]
```

## Best Practices

### Commit Messages
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Scope: component or area affected

Examples:
- feat(luminor): add Melodia personality integration
- fix(auth): resolve token refresh race condition
- docs(api): update endpoint documentation
```

### Branch Naming
```
feature/description  - New features
fix/description      - Bug fixes
docs/description     - Documentation
refactor/description - Code refactoring
```

### PR Templates
```markdown
## Summary
[Brief description]

## Changes
- [Change 1]
- [Change 2]

## Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

## Checklist
- [ ] Code follows style guide
- [ ] Self-review completed
- [ ] Documentation updated
```

## Troubleshooting

### Common Issues

**Authentication Failed:**
- Verify GITHUB_TOKEN is set
- Check token permissions
- Ensure token hasn't expired

**Push Rejected:**
- Check branch protection rules
- Verify you have write access
- Ensure branch exists

**PR Creation Failed:**
- Verify source and target branches exist
- Check for merge conflicts
- Ensure you have PR creation permission
