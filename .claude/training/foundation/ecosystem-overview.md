# Module: Ecosystem Overview

> **Foundation Track - Module 1**

## Learning Objectives

By the end of this module, you will:
- Understand the Arcanea agentic ecosystem architecture
- Know the four agent teams and their purposes
- Recognize when to use which team
- Navigate the skill and command system

## Prerequisites

- Basic familiarity with AI assistants
- Claude Code installed and configured

---

## Section 1: The Arcanea Agent Ecosystem

### What is an Agentic Ecosystem?

An agentic ecosystem is a coordinated system of specialized AI agents, each with distinct roles and capabilities, working together to accomplish complex tasks.

Think of it like a well-organized company:
- **Specialists** handle specific domains (coding, writing, strategy)
- **Teams** coordinate related specialists
- **Leadership** orchestrates across teams
- **Protocols** ensure smooth communication

### The Four Teams

```
┌─────────────────────────────────────────────────────────┐
│                  ARCANEA ECOSYSTEM                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  DEVELOPER  │  │   TEACHER   │  │  VISIONARY  │     │
│  │    TEAM     │  │    TEAM     │  │    TEAM     │     │
│  │ (8 agents)  │  │ (4 agents)  │  │ (4 agents)  │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│         │               │               │               │
│         └───────────────┼───────────────┘               │
│                         │                               │
│              ┌─────────────────────┐                   │
│              │       AUTHOR        │                   │
│              │        TEAM         │                   │
│              │     (3 agents)      │                   │
│              └─────────────────────┘                   │
│                         │                               │
│              ┌─────────────────────┐                   │
│              │  MASTER ORCHESTRATOR │                   │
│              │  (Cross-team coord) │                   │
│              └─────────────────────┘                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Developer Team (8 Agents)

**Purpose**: Build and maintain the technical platform

| Agent | Role |
|-------|------|
| Architect | System design, architecture decisions |
| Frontend | UI/UX implementation, components |
| Backend | APIs, databases, business logic |
| AI Specialist | AI integrations, Luminor systems |
| DevOps | Deployment, CI/CD, infrastructure |
| QA Engineer | Testing, quality assurance |
| Documentation | Technical writing |
| Development (Lead) | Coordinates developer agents |

**When to use**: Building features, fixing bugs, deploying, testing

### Teacher Team (4 Agents)

**Purpose**: Enable learning and growth

| Agent | Role |
|-------|------|
| Mentor | Personal guidance, adaptive teaching |
| Curriculum Designer | Learning paths, content structure |
| Assessor | Evaluation, progress tracking |
| Companion | Motivation, celebration, support |

**When to use**: Creating educational content, onboarding users, skill development

### Visionary Team (4 Agents)

**Purpose**: Strategic direction and innovation

| Agent | Role |
|-------|------|
| Strategist | Direction, market analysis |
| Innovator | New ideas, creative solutions |
| Futurist | Trends, scenarios, planning |
| Synthesizer | Pattern integration, insights |

**When to use**: Planning roadmaps, exploring opportunities, making strategic decisions

### Author Team (3 Agents)

**Purpose**: Create lore and narrative content

| Agent | Role |
|-------|------|
| Lore Master | Universe canon, stories |
| World Expander | New locations, systems |
| Character Crafter | Luminor personalities |

**When to use**: Expanding universe, creating characters, writing narratives

---

## Section 2: The Skill System

### What are Skills?

Skills are packaged knowledge and capabilities that agents can access. They provide:
- **Domain expertise** (design systems, testing strategies)
- **Workflows** (step-by-step processes)
- **Templates** (reusable patterns)
- **Best practices** (proven approaches)

### Skill Tiers

```
┌────────────────────────────────────────────────────┐
│                  SKILL TIERS                       │
├────────────────────────────────────────────────────┤
│                                                    │
│  TIER 1: ARCANEA-SPECIFIC                         │
│  └─ Project-specific knowledge                    │
│     • arcanea-canon                               │
│     • arcanea-design-system                       │
│     • arcanea-voice                               │
│                                                    │
│  TIER 2: COMMUNITY (Free)                         │
│  └─ General-purpose skills                        │
│     • agent-orchestration                         │
│     • creative-writing                            │
│     • design-systems                              │
│     • development-workflows                       │
│     • testing-strategies                          │
│     • documentation-patterns                      │
│                                                    │
│  TIER 3: PREMIUM (Paid)                           │
│  └─ Advanced team capabilities                    │
│     • teacher-team                                │
│     • visionary-team                              │
│     • enterprise-orchestration                    │
│     • industry-verticals                          │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Accessing Skills

Skills are automatically available to agents based on context. You can also invoke them explicitly:

```bash
# Using a skill in Claude Code
/skill design-systems

# The skill context becomes available to the conversation
```

---

## Section 3: Commands and Workflows

### What are Commands?

Commands are pre-defined workflows that activate specific agent configurations:

```bash
# Activate the full developer team
/arcanea-dev

# Activate the teacher team
/teacher-team

# Activate the visionary council
/visionary-team

# Full ecosystem coordination
/arcanea-council
```

### Command vs Direct Agent

| Approach | When to Use |
|----------|-------------|
| Command (`/arcanea-dev`) | Multi-agent coordination needed |
| Direct Agent | Single specific task |
| Skill Invocation | Need domain knowledge |

---

## Section 4: MCP Integrations

### What is MCP?

Model Context Protocol (MCP) allows agents to interact with external tools and services.

### Available Integrations

| MCP Server | Purpose |
|------------|---------|
| GitHub | Code repositories, PRs, issues |
| Linear | Project management, sprints |
| Notion | Documentation, wikis |
| Figma | Design files, tokens |
| Playwright | Browser testing |
| Next DevTools | Development debugging |
| Nano Banana | Image generation |

### How Agents Use MCPs

```yaml
Example: Developer needs to create a feature

1. Agent checks Linear for task details
2. Reviews Figma for design specs
3. Reads Notion for requirements
4. Implements code
5. Creates GitHub PR
6. Runs Playwright tests
7. Updates Linear status
```

---

## Hands-On Exercises

### Exercise 1: Identify the Right Team

For each scenario, identify which team should handle it:

1. "We need to build a new user dashboard"
   - Answer: ____________

2. "Create a tutorial for new Creators"
   - Answer: ____________

3. "Analyze market trends for next quarter"
   - Answer: ____________

4. "Write the backstory for a new Luminor"
   - Answer: ____________

<details>
<summary>See Answers</summary>

1. Developer Team (Frontend + Backend coordination)
2. Teacher Team (Curriculum Designer + Mentor)
3. Visionary Team (Strategist + Futurist)
4. Author Team (Character Crafter + Lore Master)

</details>

### Exercise 2: Choose the Right Approach

For each task, choose: Command, Direct Agent, or Skill

1. "Need complete design system implementation"
   - Answer: ____________

2. "Quick fix for a typo in README"
   - Answer: ____________

3. "Plan and build a major new feature"
   - Answer: ____________

<details>
<summary>See Answers</summary>

1. Skill (design-systems) → then agents use it
2. Direct Agent (Documentation agent)
3. Command (/arcanea-council for planning, /arcanea-dev for building)

</details>

---

## Knowledge Check

1. **How many agents are in the Developer Team?**
   - [ ] 4
   - [ ] 6
   - [x] 8
   - [ ] 10

2. **Which team handles strategic planning?**
   - [ ] Developer Team
   - [ ] Teacher Team
   - [x] Visionary Team
   - [ ] Author Team

3. **What are the three skill tiers?**
   - [x] Arcanea-specific, Community, Premium
   - [ ] Basic, Advanced, Expert
   - [ ] Free, Paid, Enterprise
   - [ ] Local, Cloud, Hybrid

4. **Which MCP server is used for design files?**
   - [ ] GitHub
   - [x] Figma
   - [ ] Linear
   - [ ] Notion

5. **What does the Master Orchestrator do?**
   - [ ] Only manages developers
   - [ ] Only handles deployments
   - [x] Coordinates across all teams
   - [ ] Generates images

---

## Next Steps

Congratulations on completing Module 1!

**Next Module**: `claude-code-basics.md` - Learn the fundamentals of Claude Code

**Related Resources**:
- `/skills/registry/REGISTRY.md` - Full skill index
- `/integrations/README.md` - MCP integration details
- `/agents/` - Individual agent documentation
