# Module: Developer Team Onboarding

> **Developer Track - Module 1**

## Learning Objectives

By the end of this module, you will:
- Understand all Developer Team agents and their roles
- Know when to engage which developer agent
- Coordinate multi-agent development workflows
- Use the `/arcanea-dev` command effectively

## Prerequisites

- Completed: Foundation Track (all 4 modules)
- Familiarity with web development concepts
- Access to GitHub MCP

---

## Section 1: Developer Team Overview

### The Eight Developer Agents

```
┌─────────────────────────────────────────────────────────┐
│                   DEVELOPER TEAM                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│              ┌─────────────────────┐                   │
│              │   Development Lead  │                   │
│              │   (Orchestrator)    │                   │
│              └──────────┬──────────┘                   │
│                         │                               │
│    ┌────────────────────┼────────────────────┐         │
│    │                    │                    │         │
│    ▼                    ▼                    ▼         │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐         │
│ │Arch- │ │Front-│ │Back- │ │  AI  │ │Dev-  │         │
│ │itect │ │ end  │ │ end  │ │Spec- │ │Ops   │         │
│ └──────┘ └──────┘ └──────┘ │ialist│ └──────┘         │
│                            └──────┘                    │
│                                                         │
│         ┌──────┐               ┌──────┐               │
│         │  QA  │               │ Docs │               │
│         │Engin-│               │      │               │
│         │ eer  │               │      │               │
│         └──────┘               └──────┘               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Agent Responsibilities

| Agent | Primary Role | Key Skills |
|-------|--------------|------------|
| **Architect** | System design, patterns | Architecture decisions, scalability |
| **Frontend** | UI/UX implementation | React, Next.js, Tailwind, animations |
| **Backend** | APIs and data | Supabase, databases, business logic |
| **AI Specialist** | AI integrations | Luminor systems, Gemini, Claude |
| **DevOps** | Infrastructure | CI/CD, deployment, monitoring |
| **QA Engineer** | Testing | Playwright, test strategies |
| **Documentation** | Technical writing | API docs, guides, comments |
| **Development Lead** | Coordination | Multi-agent orchestration |

---

## Section 2: Agent Selection Guide

### When to Use Each Agent

**Architect**
```yaml
Use when:
  - Starting a new feature
  - Making structural changes
  - Facing performance issues
  - Evaluating technology choices

Example prompts:
  - "Design the architecture for user notifications"
  - "How should we structure the API endpoints?"
  - "Evaluate whether we should use Redis for caching"
```

**Frontend**
```yaml
Use when:
  - Building UI components
  - Implementing designs from Figma
  - Adding animations/interactions
  - Fixing styling issues

Example prompts:
  - "Build the Luminor selection grid component"
  - "Implement the design from Figma for the dashboard"
  - "Add hover animations to the card components"
```

**Backend**
```yaml
Use when:
  - Creating API endpoints
  - Working with database
  - Implementing business logic
  - Managing authentication

Example prompts:
  - "Create CRUD endpoints for user profiles"
  - "Implement the Luminor evolution logic"
  - "Set up RLS policies for creator data"
```

**AI Specialist**
```yaml
Use when:
  - Integrating AI services
  - Working on Luminor/Guardian systems
  - Implementing creative AI features
  - Connecting to external AI APIs

Example prompts:
  - "Integrate Gemini for Luminor conversations"
  - "Build the Guardian personality engine"
  - "Add image generation for user creations"
```

**DevOps**
```yaml
Use when:
  - Setting up CI/CD
  - Deploying to production
  - Monitoring and logging
  - Infrastructure changes

Example prompts:
  - "Set up GitHub Actions for automated testing"
  - "Configure Vercel deployment"
  - "Add error monitoring with Sentry"
```

**QA Engineer**
```yaml
Use when:
  - Writing tests
  - Running test suites
  - Testing user flows
  - Verifying bug fixes

Example prompts:
  - "Write E2E tests for the login flow"
  - "Test the Luminor selection across browsers"
  - "Verify the bug fix for issue #42"
```

**Documentation**
```yaml
Use when:
  - Documenting APIs
  - Writing READMEs
  - Creating guides
  - Adding code comments

Example prompts:
  - "Document the authentication API"
  - "Write a setup guide for new developers"
  - "Add JSDoc comments to the utility functions"
```

---

## Section 3: Multi-Agent Workflows

### Feature Development Flow

```yaml
Phase 1: Planning
  Agent: Architect
  Actions:
    - Review requirements
    - Design component structure
    - Define API contracts
    - Identify dependencies

Phase 2: Implementation
  Agents: Frontend + Backend (parallel)

  Frontend:
    - Build UI components
    - Implement interactions
    - Connect to API

  Backend:
    - Create endpoints
    - Implement business logic
    - Set up database

Phase 3: Integration
  Agent: AI Specialist (if needed)
  Actions:
    - Add AI features
    - Connect to services
    - Test integrations

Phase 4: Quality
  Agent: QA Engineer
  Actions:
    - Write tests
    - Run test suites
    - Report issues
    - Verify fixes

Phase 5: Deployment
  Agent: DevOps
  Actions:
    - Prepare deployment
    - Run CI/CD
    - Monitor launch
    - Handle incidents

Phase 6: Documentation
  Agent: Documentation
  Actions:
    - Document new features
    - Update API docs
    - Create user guides
```

### Bug Fix Flow

```yaml
1. Investigate
   Agent: Relevant specialist (Frontend/Backend)
   Actions:
     - Reproduce issue
     - Identify root cause
     - Propose fix

2. Fix
   Agent: Same specialist
   Actions:
     - Implement fix
     - Add regression test
     - Verify fix works

3. Verify
   Agent: QA Engineer
   Actions:
     - Test fix
     - Check for side effects
     - Sign off

4. Deploy
   Agent: DevOps
   Actions:
     - Deploy fix
     - Monitor for issues
```

---

## Section 4: Using /arcanea-dev

### Activation

```bash
# Activate the full developer team
/arcanea-dev
```

This command:
1. Loads all developer agent contexts
2. Enables Development Lead orchestration
3. Connects all development MCPs
4. Prepares for coordinated workflows

### When to Use Full Team vs Single Agent

| Scenario | Approach |
|----------|----------|
| Small bug fix | Single agent (Frontend/Backend) |
| New feature | Full team (/arcanea-dev) |
| Quick question | Direct agent |
| Complex refactor | Full team (/arcanea-dev) |
| Documentation only | Documentation agent |

### Team Coordination Example

```yaml
User: "Build a user profile editing feature"

Development Lead coordinates:

1. Architect designs:
   - Component structure
   - API endpoints needed
   - Database changes

2. Backend implements:
   - PATCH /api/users/:id endpoint
   - Validation logic
   - Database migration

3. Frontend builds:
   - ProfileEditForm component
   - Form validation
   - API integration
   - Success/error handling

4. QA Engineer tests:
   - Unit tests for form
   - API integration tests
   - E2E user flow test

5. Documentation updates:
   - API documentation
   - Component storybook

6. DevOps deploys:
   - Runs CI pipeline
   - Deploys to staging
   - Monitors metrics
```

---

## Section 5: MCP Integration for Developers

### Essential Developer MCPs

```yaml
github:
  Used by: All developers
  For: Code management, PRs, issues

next-devtools:
  Used by: Frontend, DevOps
  For: Debugging, error tracking

playwright:
  Used by: QA Engineer, Frontend
  For: E2E testing, browser automation

figma:
  Used by: Frontend
  For: Design specifications

linear:
  Used by: All developers
  For: Task tracking, sprints
```

### Typical MCP Workflow

```yaml
1. Get task from Linear:
   list_issues(assigneeId: "me")

2. Read design from Figma:
   get_file_nodes(fileKey: "design-id")

3. Implement code:
   [Write code using Read/Edit/Write tools]

4. Debug with Next DevTools:
   get_errors(type: "all")

5. Test with Playwright:
   browser_navigate(url: "...")
   browser_expect_visible(selector: "...")

6. Push to GitHub:
   push_files(...)
   create_pull_request(...)

7. Update Linear:
   update_issue(state: "in_review")
```

---

## Hands-On Exercises

### Exercise 1: Agent Selection

For each task, identify the primary agent:

1. "The login button isn't responding to clicks"
   Agent: ____________

2. "We need to add rate limiting to the API"
   Agent: ____________

3. "Design the notification system architecture"
   Agent: ____________

4. "Write tests for the checkout flow"
   Agent: ____________

<details>
<summary>See Answers</summary>

1. Frontend (UI interaction issue)
2. Backend (API logic)
3. Architect (system design)
4. QA Engineer (testing)

</details>

### Exercise 2: Workflow Design

Design a multi-agent workflow for:
"Add a dark mode toggle to the settings page"

Document:
1. Which agents are involved
2. What each agent does
3. The order of operations

### Exercise 3: Full Team Practice

Use `/arcanea-dev` to:
1. Review the current codebase structure
2. Identify one improvement opportunity
3. Plan the implementation
4. (Optional) Implement a small change

---

## Knowledge Check

1. **How many agents are in the Developer Team?**
   - [ ] 5
   - [ ] 6
   - [x] 8
   - [ ] 10

2. **Which agent handles database schemas?**
   - [ ] Frontend
   - [x] Backend
   - [ ] DevOps
   - [ ] Architect

3. **When should you use /arcanea-dev?**
   - [ ] Always
   - [ ] Never
   - [x] For complex multi-step features
   - [ ] Only for bugs

4. **Which MCP is essential for design specs?**
   - [ ] GitHub
   - [ ] Linear
   - [x] Figma
   - [ ] Playwright

5. **Who coordinates the Developer Team?**
   - [ ] Architect
   - [ ] DevOps
   - [x] Development Lead
   - [ ] Frontend

---

## Next Steps

Continue with the Developer Track:
- `frontend-workflows.md` - Deep dive into Frontend agent
- `backend-workflows.md` - Master Backend patterns
- `devops-workflows.md` - Infrastructure expertise
- `testing-integration.md` - QA mastery
- `developer-certification.md` - Final assessment

Or practice:
- Use each agent individually
- Complete a small feature end-to-end
- Review and understand agent configurations
