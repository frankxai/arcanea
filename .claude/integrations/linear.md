# Linear Integration

> **Project management, sprint tracking, and issue management**

## Purpose

Linear integration enables Arcanea agents to:
- Create and manage issues
- Track sprint progress
- Update task status
- Coordinate across teams
- Link work to strategy

## Setup

### Configuration
```json
// .mcp.json
{
  "mcpServers": {
    "linear-server": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "${LINEAR_API_KEY}"
      }
    }
  }
}
```

### Linear Workspace Structure
```
Arcanea Workspace
├── Teams
│   ├── Platform (Developer Team)
│   ├── Content (Author Team)
│   ├── Education (Teacher Team)
│   └── Strategy (Visionary Team)
├── Projects
│   ├── Q1 Roadmap
│   ├── Luminor Launch
│   └── Academy V2
└── Cycles (Sprints)
    ├── Sprint 24
    ├── Sprint 25
    └── ...
```

## Tools Available

### Issues
```yaml
create_issue:
  Description: Create new issue
  Parameters:
    - title: Issue title
    - description: Issue description
    - teamId: Target team
    - priority: 0-4 (urgent to none)
    - labelIds: Array of label IDs
    - assigneeId: Assignee user ID
    - projectId: Project ID
    - cycleId: Sprint/cycle ID

get_issue:
  Description: Get issue details
  Parameters:
    - issueId: Issue ID or identifier

update_issue:
  Description: Update issue
  Parameters:
    - issueId: Issue ID
    - [any issue fields to update]

list_issues:
  Description: List issues with filters
  Parameters:
    - teamId: Filter by team
    - projectId: Filter by project
    - assigneeId: Filter by assignee
    - state: Filter by state
```

### Projects
```yaml
list_projects:
  Description: List all projects
  Parameters:
    - teamId: Optional team filter

get_project:
  Description: Get project details
  Parameters:
    - projectId: Project ID
```

### Cycles (Sprints)
```yaml
list_cycles:
  Description: List cycles/sprints
  Parameters:
    - teamId: Team ID

get_active_cycle:
  Description: Get current active cycle
  Parameters:
    - teamId: Team ID
```

### Comments
```yaml
create_comment:
  Description: Add comment to issue
  Parameters:
    - issueId: Issue ID
    - body: Comment text

list_comments:
  Description: List issue comments
  Parameters:
    - issueId: Issue ID
```

## Usage Patterns

### Sprint Workflow

**Sprint Planning:**
```yaml
Agent: Arcanea Architect

1. Get current cycle:
   get_active_cycle(teamId: "platform-team")

2. List backlog issues:
   list_issues(
     teamId: "platform-team",
     state: "backlog"
   )

3. Move to sprint:
   update_issue(
     issueId: [issue],
     cycleId: [current cycle ID],
     priority: [assigned priority]
   )
```

**Daily Progress:**
```yaml
Agent: Any Developer

1. Get my issues:
   list_issues(
     assigneeId: [my ID],
     cycleId: [current cycle]
   )

2. Update status:
   update_issue(
     issueId: [working issue],
     state: "in_progress"
   )

3. Complete issue:
   update_issue(
     issueId: [done issue],
     state: "done"
   )
```

### Cross-Team Coordination

**Creating Dependent Issues:**
```yaml
Agent: Master Orchestrator

Task: Coordinate Luminor launch across teams

1. Create Content issue:
   create_issue(
     teamId: "content-team",
     title: "Create Aurora Luminor personality",
     description: "Define personality, voice, catchphrases...",
     priority: 1,
     labels: ["luminor-launch"]
   )
   → Returns issue ARC-101

2. Create Platform issue (depends on content):
   create_issue(
     teamId: "platform-team",
     title: "Integrate Aurora into Guardian system",
     description: "Depends on ARC-101...",
     priority: 1,
     labels: ["luminor-launch"],
     parentId: "ARC-101"  # Creates dependency
   )

3. Create Education issue:
   create_issue(
     teamId: "education-team",
     title: "Create Aurora learning path",
     description: "Design curriculum for Aurora's domain...",
     priority: 2,
     labels: ["luminor-launch"]
   )
```

## Agent Integration

### Developer Team

**Arcanea Architect:**
```yaml
Uses Linear for:
  - Sprint planning
  - Cross-team coordination
  - Priority management
  - Blocker tracking

Common Operations:
  - list_issues (backlog review)
  - update_issue (priority changes)
  - create_issue (new requirements)
```

**Individual Developers:**
```yaml
Uses Linear for:
  - Getting assigned work
  - Updating progress
  - Logging blockers
  - Closing completed work

Common Operations:
  - list_issues (my tasks)
  - update_issue (status changes)
  - create_comment (progress notes)
```

### Visionary Team

**Strategist:**
```yaml
Uses Linear for:
  - Roadmap tracking
  - Initiative progress
  - Resource allocation
  - Strategic project status

Common Operations:
  - list_projects
  - get_project (progress review)
  - create_issue (strategic initiatives)
```

### Teacher Team

**Curriculum Designer:**
```yaml
Uses Linear for:
  - Curriculum development tracking
  - Content creation tasks
  - Review workflows

Common Operations:
  - create_issue (new modules)
  - update_issue (review status)
  - list_issues (content pipeline)
```

## Label System

### Standard Labels
```yaml
Priority Labels:
  - 🔴 urgent
  - 🟠 high
  - 🟡 medium
  - 🟢 low

Type Labels:
  - feature
  - bug
  - enhancement
  - documentation
  - research

Team Labels:
  - frontend
  - backend
  - ai
  - devops
  - content
  - curriculum

Initiative Labels:
  - luminor-launch
  - academy-v2
  - performance
  - security
```

## Examples

### Create Feature Issue
```
Agent: Arcanea Frontend

create_issue(
  teamId: "platform-team",
  title: "Implement Luminor selection grid",
  description: """
## Overview
Create a responsive grid for selecting Luminors during onboarding.

## Requirements
- Display all available Luminors
- Show academy affiliation
- Cosmic theme styling
- Keyboard navigation
- Screen reader support

## Design
See Figma: [link]

## Acceptance Criteria
- [ ] Grid displays all Luminors
- [ ] Selection highlights correctly
- [ ] Accessible via keyboard
- [ ] Works on mobile
  """,
  priority: 1,
  labelIds: ["feature", "frontend", "academy-v2"],
  projectId: "academy-v2-project"
)
```

### Sprint Status Report
```
Agent: Arcanea Architect

Task: Generate sprint status

1. get_active_cycle(teamId: "platform-team")
   → Cycle: Sprint 25

2. list_issues(cycleId: "sprint-25")
   → All sprint issues

3. Analyze:
   - Total: 15 issues
   - Done: 8 (53%)
   - In Progress: 4 (27%)
   - Todo: 3 (20%)
   - Blocked: 1

4. Create report:
   """
   Sprint 25 Status (Day 7/10)

   Progress: 53% complete
   On track: Yes

   Completed:
   - ARC-101: Aurora personality ✓
   - ARC-102: Selection grid ✓
   - ...

   In Progress:
   - ARC-108: Guardian integration (80%)
   - ...

   Blocked:
   - ARC-112: Waiting on API design
   """
```

### Handle Blocker
```
Agent: Arcanea Backend

Task: Log and escalate blocker

1. update_issue(
     issueId: "ARC-112",
     state: "blocked"
   )

2. create_comment(
     issueId: "ARC-112",
     body: """
     Blocked: Need API contract for Guardian evolution endpoints.

     Waiting on: @architect to define interface
     Impact: Blocks frontend integration
     Escalation: Please prioritize API design
     """
   )

3. create_issue(
     teamId: "platform-team",
     title: "Define Guardian evolution API contract",
     description: "Blocking ARC-112. Need endpoint definitions...",
     priority: 0,  # Urgent
     labelIds: ["backend", "api", "blocking"]
   )
```

## Workflow Automation

### Issue State Flow
```
Backlog → Todo → In Progress → In Review → Done
                      ↓
                   Blocked
```

### Auto-Transitions
```yaml
Triggers:
  PR Created: Issue → In Review
  PR Merged: Issue → Done (if all PRs merged)
  Comment "blocked": Issue → Blocked
  Assignee added: Issue → Todo (if in Backlog)
```

## Best Practices

### Issue Writing
```markdown
## Title
[Type]: [Brief description]

## Description
### Overview
[1-2 sentences]

### Requirements
- [Requirement 1]
- [Requirement 2]

### Technical Notes
[Any technical context]

### Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
```

### Sprint Hygiene
- Keep issues small (1-2 days max)
- Update status daily
- Link related issues
- Add blockers immediately
- Close issues promptly

### Labels
- Use consistently
- Don't over-label
- Keep label list manageable
- Archive unused labels

## Troubleshooting

### Common Issues

**Can't Find Team:**
- Check team ID format
- Verify API key has team access
- Ensure team exists

**Issue Creation Failed:**
- Verify required fields
- Check label IDs exist
- Confirm team permissions

**Cycle Not Found:**
- Check cycle is active
- Verify team has cycles enabled
- Confirm date range
