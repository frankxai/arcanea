# Arcanea Agent Standardization Guide

**Version**: 1.0.0
**Last Updated**: January 14, 2026
**Purpose**: Define consistent schema, naming conventions, and best practices for all 38 Arcanea agents

---

## Table of Contents

1. [Required Frontmatter Schema](#required-frontmatter-schema)
2. [Naming Conventions](#naming-conventions)
3. [Model Tiering Strategy](#model-tiering-strategy)
4. [MCP Server Assignment](#mcp-server-assignment)
5. [Prompt Trigger Patterns](#prompt-trigger-patterns)
6. [Status Lifecycle](#status-lifecycle)
7. [Complete Agent Inventory with Standards](#complete-agent-inventory-with-standards)

---

## 1. Required Frontmatter Schema

Every agent file MUST include this exact frontmatter structure:

```yaml
---
name: "arcanea-{domain}-{role}"  # REQUIRED: Consistent naming
description: "{action} {object}"  # REQUIRED: Max 100 characters
model: "sonnet|opus|haiku|glm-4.7-free|minimax-m2.1"  # REQUIRED: Explicit assignment
tier: "strategic|technical|exploration|support"  # REQUIRED: Business tier
team: "developer|author|teacher|visionary"  # REQUIRED: Team membership
mcpServers: ["github", "notion"]  # Optional: Array or null
workingDirectories: ["/path"]  # Optional: Array or null
skills: ["arcanea-skill-name"]  # Optional: Array or empty
prompt_triggers: ["keyword1", "phrase two"]  # Optional: Auto-activation
created: "2026-01-14"  # REQUIRED: ISO date format
version: "1.0.0"  # REQUIRED: Semantic versioning
status: "stable|experimental|deprecated"  # REQUIRED: Lifecycle status
---
```

### Frontmatter Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Unique identifier, kebab-case |
| `description` | string | Yes | Brief purpose statement, max 100 chars |
| `model` | string | Yes | Claude or OpenCode model identifier |
| `tier` | string | Yes | Business criticality level |
| `team` | string | Yes | Which team the agent belongs to |
| `mcpServers` | array | No | Array of MCP server names or null |
| `workingDirectories` | array | No | Array of directory paths or null |
| `skills` | array | No | Arcanea skills this agent can invoke |
| `prompt_triggers` | array | No | Keywords that auto-activate this agent |
| `created` | string | Yes | ISO 8601 date |
| `version` | string | Yes | Semantic version (MAJOR.MINOR.PATCH) |
| `status` | string | Yes | stable, experimental, or deprecated |

---

## 2. Naming Conventions

### Pattern

```
{prefix}-{domain}-{role}
```

### Prefixes

| Prefix | Usage | Example |
|--------|-------|---------|
| `arcanea-` | Platform development agents | arcanea-development-architect |
| `teacher-` | Learning/education agents | teacher-mentor |
| `visionary-` | Strategic/planning agents | visionary-strategist |
| `creative-` | Story/character/creative agents | creative-story-architect |
| `dev-` | Technical/development (alternative) | dev-qa-engineer |

### Domains

| Domain | Usage | Example |
|--------|-------|---------|
| `development` | General development | arcanea-development |
| `backend` | Server-side work | arcanea-backend-specialist |
| `frontend` | UI/UX work | arcanea-frontend-specialist |
| `devops` | Operations/deployment | arcanea-devops-specialist |
| `lore` | World-building/lore | arcanea-lore-master |
| `character` | Character development | arcanea-character-crafter |
| `story` | Narrative structure | arcanea-story-master |
| `world` | World building | arcanea-world-expander |
| `mentor` | Teaching/guidance | teacher-mentor |
| `strategist` | Planning/direction | visionary-strategist |
| `innovator` | New possibilities | visionary-innovator |
| `futurist` | Trend analysis | visionary-futurist |
| `synthesizer` | Integration | visionary-synthesizer |

### Roles

| Role | Description |
|------|-------------|
| `architect` | System/design leadership |
| `specialist` | Domain expertise |
| `orchestrator` | Coordination/management |
| `master` | Senior expertise |
| `mentor` | Teaching/guidance |
| `crafter` | Creative development |
| `designer` | Visual/creative design |
| `guide` | Support/assistance |
| `oracle` | Wisdom/insights |
| `sage` | Deep knowledge |

### Examples (Good vs Bad)

| Good | Bad | Reason |
|------|-----|---------|
| `arcanea-development-architect` | ArcaneaDevArchitect | Wrong case, missing hyphens |
| `teacher-mentor` | TeacherMento | Typo, wrong case |
| `visionary-strategist` | StrategicVisionary | Wrong word order |
| `arcanea-backend-specialist` | backend_specialist | Wrong separators |

---

## 3. Model Tiering Strategy

### Model Capability Matrix

| Model | Context | Speed | Cost | Best Use |
|-------|---------|-------|------|----------|
| **claude-opus** | 200K | Medium | $$$ | Strategic orchestration, complex decisions |
| **claude-sonnet** | 200K | Fast | $$ | Technical implementation, domain expertise |
| **claude-haiku** | 200K | Fast | $ | Lightweight support, emotional responses |
| **glm-4.7-free** | 1M | Fastest | Free | Exploration, research, pattern matching |
| **minimax-m2.1** | 1M | Fastest | Free | Routing, simple queries, classification |

### Tier Assignment Criteria

#### Strategic Tier (Claude Opus)

**Criteria:**
- Multi-team coordination
- Complex decision-making with many variables
- Creative vision and synthesis
- High business impact

**Agents:**
- arcanea-master-orchestrator
- visionary-strategist
- visionary-innovator
- visionary-synthesizer
- teacher-mentor
- timeline-orchestrator
- arcanea-lore-master
- arcanea-development-architect

#### Technical Tier (Claude Sonnet)

**Criteria:**
- Technical implementation
- Specialized domain analysis
- Code generation and review
- Detailed creative work

**Agents:**
- arcanea-backend-specialist
- arcanea-frontend-specialist
- arcanea-devops-specialist
- arcanea-ai-specialist
- arcanea-character-crafter
- arcanea-world-expander
- developer-documentation-specialist
- developer-qa-engineer
- teacher-assessor
- teacher-curriculum-designer
- visionary-futurist

#### Exploration Tier (GLM-4.7-Free)

**Criteria:**
- Fast reconnaissance
- Pattern matching
- Research queries
- Simple information retrieval

**Agents:**
- explore (rename from unnamed)
- librarian (rename from unnamed)
- arcanea-archivist (if undefined)
- arcanea-scout (if undefined)

#### Routing Tier (MiniMax M2.1)

**Criteria:**
- Task classification
- Simple queries
- Initial routing
- Lightweight responses

**Agents:**
- prompt-routing (create if not exists)
- simple-queries (create if not exists)

#### Support Tier (Claude Haiku)

**Criteria:**
- Lightweight emotional support
- Quick responses
- Motivation and encouragement

**Agents:**
- teacher-companion

---

## 4. MCP Server Assignment

### Assignment Strategy

| Team | Required MCP | Optional MCP |
|------|--------------|--------------|
| **Developer** | github | notion, linear-server, figma-remote-mcp, playwright, next-devtools |
| **Author/Creative** | notion | nano-banana, github, lyric-genius |
| **Teacher** | notion | (none required) |
| **Visionary** | (none required) | github, notion |

### MCP Server Reference

| Server | Purpose | Required Teams |
|--------|---------|----------------|
| github | Version control, PRs, issues | Developer, Author |
| notion | Documentation, wikis, databases | All |
| linear-server | Project management | Developer |
| figma-remote-mcp | Design files, components | Developer |
| playwright | E2E testing, browser automation | Developer |
| next-devtools | Runtime debugging | Developer |
| nano-banana | AI image generation | Author/Creative |
| lyric-genius | Music/lyric assistance | Author/Creative |

---

## 5. Prompt Trigger Patterns

### Auto-Activation Keywords

Each agent should have explicit triggers for auto-activation:

| Category | Keywords | Example Agents |
|----------|----------|----------------|
| **Development** | build, deploy, code, api, database, frontend, backend | arcanea-backend-specialist, arcanea-devops |
| **Creative** | character, world, story, narrative, dialogue, scene | arcanea-character-crafter, arcanea-story-master |
| **Teaching** | learn, teach, curriculum, assessment, progress | teacher-mentor, teacher-assessor |
| **Vision** | strategy, future, trends, innovation, possibility | visionary-strategist, visionary-innovator |
| **Orchestration** | coordinate, orchestrate, multi-team, strategy | arcanea-master-orchestrator |

### Trigger Format

```yaml
prompt_triggers:
  - "primary keyword"      # Most common activation
  - "secondary keyword"    # Alternative phrasing
  - "phrase three words"   # Complete phrase match
```

### Examples

```yaml
# Good examples
prompt_triggers:
  - "frontend"
  - "React"
  - "UI component"
  - "user interface"

# Bad examples (too vague)
prompt_triggers:
  - "help"
  - "create"
  - "work"
```

---

## 6. Status Lifecycle

| Status | Meaning | Transition To |
|--------|---------|---------------|
| `experimental` | New agent, limited testing | `stable` (after 30 days), `deprecated` (if failed) |
| `stable` | Production-ready, fully tested | `deprecated` (replacement available) |
| `deprecated` | No longer recommended for use | `stable` (if revived), remove after 90 days |

### Versioning Strategy

```yaml
version: "MAJOR.MINOR.PATCH"

# MAJOR: Breaking changes to agent behavior
# MINOR: New features, expanded capabilities
# PATCH: Bug fixes, documentation updates
```

---

## 7. Complete Agent Inventory with Standards

### Developer Team (8 agents)

| Agent | Name | Model | Tier | MCP Servers | Status |
|-------|------|-------|------|-------------|--------|
| arcanea-development-architect | Arcanea Development Architect | opus | strategic | github, notion, linear, figma, playwright, next-devtools | stable |
| arcanea-backend-specialist | Arcanea Backend Specialist | sonnet | technical | github, notion, linear | stable |
| arcanea-frontend-specialist | Arcanea Frontend Specialist | sonnet | technical | github, figma, playwright | stable |
| arcanea-devops-specialist | Arcanea DevOps Specialist | sonnet | technical | github, next-devtools | stable |
| arcanea-ai-specialist | Arcanea AI Specialist | sonnet | technical | github, notion | stable |
| arcanea-development | Arcanea Development | sonnet | technical | github, figma, notion, linear | undefined |
| developer-documentation-specialist | Developer Documentation Specialist | sonnet | technical | (none) | stable |
| developer-qa-engineer | Developer QA Engineer | sonnet | technical | (none) | stable |

### Author/Creative Team (5 agents)

| Agent | Name | Model | Tier | MCP Servers | Status |
|-------|------|-------|------|-------------|--------|
| arcanea-lore-master | Arcanea Lore Master | opus | strategic | notion, github, nano-banana, lyric-genius | stable |
| arcanea-character-crafter | Arcanea Character Crafter | sonnet | technical | notion, github, nano-banana | stable |
| arcanea-story-master | Arcanea Story Master | (undefined) | technical | (none) | undefined |
| arcanea-world-expander | Arcanea World Expander | sonnet | technical | notion, github, nano-banana | stable |
| creation-architect | Creation Architect | (undefined) | strategic | (none) | undefined |

### Teacher Team (4 agents)

| Agent | Name | Model | Tier | MCP Servers | Status |
|-------|------|-------|------|-------------|--------|
| teacher-mentor | Teacher Mentor | opus | strategic | (none) | stable |
| teacher-curriculum-designer | Teacher Curriculum Designer | sonnet | technical | (none) | stable |
| teacher-assessor | Teacher Assessor | sonnet | technical | (none) | stable |
| teacher-companion | Teacher Companion | haiku | support | (none) | stable |

### Visionary Team (4 agents)

| Agent | Name | Model | Tier | MCP Servers | Status |
|-------|------|-------|------|-------------|--------|
| visionary-strategist | Visionary Strategist | opus | strategic | (none) | stable |
| visionary-innovator | Visionary Innovator | opus | strategic | (none) | stable |
| visionary-futurist | Visionary Futurist | sonnet | technical | (none) | stable |
| visionary-synthesizer | Visionary Synthesizer | opus | strategic | (none) | stable |

### Orchestration Team (3 agents)

| Agent | Name | Model | Tier | MCP Servers | Status |
|-------|------|-------|------|-------------|--------|
| arcanea-master-orchestrator | Arcanea Master Orchestrator | opus | strategic | (none) | stable |
| timeline-orchestrator | Timeline Orchestrator | opus | strategic | (none) | stable |
| arcanea-story-master | Arcanea Story Master | (undefined) | technical | (none) | undefined |

### Design/AI Support (3 agents)

| Agent | Name | Model | Tier | MCP Servers | Status |
|-------|------|-------|------|-------------|--------|
| design-sage | Design Sage | (undefined) | technical | (none) | undefined |
| luminor-oracle | Luminor Oracle | (undefined) | strategic | (none) | undefined |
| prompt-sage | Prompt Sage | (undefined) | technical | (none) | undefined |

---

## 8. Migration Checklist

### For Each Undefined Agent:

- [ ] Add frontmatter with name, description, model, tier, team
- [ ] Assign appropriate MCP servers
- [ ] Define prompt_triggers for auto-activation
- [ ] Set version to "1.0.0"
- [ ] Set status to "stable" or "experimental"
- [ ] Verify naming follows convention
- [ ] Test agent responds to prompt_triggers

### For All Agents:

- [ ] Verify frontmatter is complete
- [ ] Verify naming convention compliance
- [ ] Verify model assignment matches tier strategy
- [ ] Verify MCP server assignment
- [ ] Verify prompt_triggers are specific, not vague

---

## 9. Quick Reference

### Model Assignment Quick Reference

| If agent... | Then use... |
|-------------|-------------|
| Coordinates multiple teams | opus (strategic) |
| Does technical implementation | sonnet (technical) |
| Does fast reconnaissance | glm-4.7-free (exploration) |
| Routes simple queries | minimax-m2.1 (routing) |
| Provides emotional support | haiku (support) |

### Naming Quick Reference

```
Pattern: {prefix}-{domain}-{role}

Good: arcanea-development-architect, teacher-mentor, visionary-strategist
Bad: ArcaneaDevArchitect, teacherMentor, strategic-visionary
```

### Status Quick Reference

```
experimental → stable (after 30 days, no issues)
stable → deprecated (replacement available)
deprecated → remove (90 days after deprecation)
```

---

*Document Version: 1.0.0*
*Last Updated: January 14, 2026*
*Next Review: February 14, 2026*
