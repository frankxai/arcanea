# Arcanea Skills + MCP Integration Guide

> *"The Model Context Protocol extends Claude's reach. Combined with Arcanea skills, you create a system of unprecedented capability."*

---

## Overview

This guide shows how to combine Arcanea skills with MCP servers for enhanced workflows. Each MCP server provides unique capabilities that complement the skill system.

---

## Available MCP Servers

### Development Servers

| Server | Purpose | Pairs With |
|--------|---------|------------|
| `github` | Repository management | `code-review`, `tdd` |
| `linear` | Project tracking | `architecture-patterns` |
| `playwright` | Browser testing | `tdd`, `systematic-debug` |
| `next-devtools` | Next.js debugging | `performance-tuning`, `systematic-debug` |

### Creative Servers

| Server | Purpose | Pairs With |
|--------|---------|------------|
| `notion` | Documentation | `world-build`, `character-forge` |
| `figma-remote-mcp` | Design files | `design-system` |
| `nano-banana` | Image generation | `design-system`, `prompt-craft` |
| `lyric-genius` | Lyrics search | `voice-alchemy` |

---

## Integration Patterns

### Pattern 1: GitHub + Code Review Skill

Combine GitHub MCP with the `code-review` skill for comprehensive PR reviews.

```markdown
## Workflow

1. **Get PR context**
   Use GitHub MCP to fetch:
   - PR description
   - Changed files
   - Diff content
   - Comments

2. **Apply code-review skill**
   The skill provides:
   - Code smell detection
   - Pattern violations
   - Security concerns
   - Performance issues

3. **Create review comments**
   Use GitHub MCP to:
   - Post inline comments
   - Request changes
   - Approve when ready
```

**Example Session:**
```
> Use the github MCP to get PR #42 details
> Apply the code-review skill to analyze the changes
> Post review comments via github MCP
```

---

### Pattern 2: Notion + World Building Skill

Store and organize world-building content in Notion.

```markdown
## Workflow

1. **Create Notion structure**
   - World Overview page
   - Locations database
   - Characters database
   - Magic Systems page
   - History timeline

2. **Apply world-build skill**
   Use Seven Pillars framework:
   - Geography
   - Society
   - Magic/Technology
   - History
   - Conflict
   - Culture
   - Economy

3. **Populate Notion pages**
   Each pillar becomes a linked database or page
```

**Template Structure:**
```
📚 My Fantasy World
├── 🌍 Geography
│   ├── Continents
│   ├── Cities
│   └── Landmarks
├── 👥 Societies
│   ├── Kingdoms
│   ├── Cultures
│   └── Factions
├── ⚡ Magic System
│   ├── Rules
│   ├── Limitations
│   └── Costs
└── 📜 History
    ├── Ages
    ├── Events
    └── Legends
```

---

### Pattern 3: Figma + Design System Skill

Translate Arcanea Design System into Figma components.

```markdown
## Workflow

1. **Reference design-system skill**
   Get specifications for:
   - Color tokens
   - Typography scale
   - Spacing system
   - Component patterns

2. **Access Figma via MCP**
   - Create color styles
   - Define text styles
   - Build component library
   - Set up auto-layout

3. **Validate consistency**
   Compare Figma implementation to skill specs
```

**Color Token Mapping:**
```
Skill Definition          →    Figma Style
─────────────────────────────────────────────
--atlantean-teal-500      →    Atlantean/500
--cosmic-blue-500         →    Cosmic/500
--gold-bright             →    Gold/Bright
--glass-white-10          →    Glass/White-10
```

---

### Pattern 4: Linear + Architecture Patterns Skill

Track architectural decisions and technical debt.

```markdown
## Workflow

1. **Create Linear project structure**
   - Architecture Decisions
   - Technical Debt
   - Refactoring Queue
   - Performance Issues

2. **Apply architecture-patterns skill**
   When making decisions:
   - Document trade-offs
   - Link to ADRs
   - Track follow-ups

3. **Manage via Linear**
   - Create issues for debt
   - Track refactoring progress
   - Plan architecture reviews
```

**Issue Template:**
```markdown
## Architecture Decision

**Context**: [What problem are we solving?]
**Decision**: [What pattern did we choose?]
**Pattern**: [From architecture-patterns skill]
**Trade-offs**: [What did we accept?]
**Follow-up**: [What debt did we create?]
```

---

### Pattern 5: Playwright + TDD Skill

Combine E2E testing with test-driven development.

```markdown
## Workflow

1. **Define user flow**
   What should the user be able to do?

2. **Apply TDD skill (red)**
   Write failing Playwright test first:
   ```typescript
   test('user can complete checkout', async ({ page }) => {
     await page.goto('/cart');
     await page.click('[data-testid="checkout"]');
     await expect(page).toHaveURL('/checkout/success');
   });
   ```

3. **Run via Playwright MCP**
   - Execute test (fails)
   - Capture screenshot
   - Record trace

4. **Apply TDD skill (green)**
   Implement minimum code to pass

5. **Run again via MCP**
   - Execute test (passes)
   - Update visual baselines
```

---

### Pattern 6: Nano Banana + Prompt Craft Skill

Generate images with optimized prompts.

```markdown
## Workflow

1. **Define image goal**
   What image do you need?

2. **Apply prompt-craft skill**
   Build prompt using Five Pillars:
   - Identity: Art style/artist reference
   - Context: Scene description
   - Constraint: Aspect ratio, style limits
   - Exemplar: Reference images
   - Iteration: Variation seeds

3. **Generate via Nano Banana**
   - Submit crafted prompt
   - Generate variations
   - Select best result

4. **Iterate**
   Refine prompt based on results
```

**Prompt Template for Images:**
```
[Style Identity], [Subject], [Context/Setting],
[Lighting], [Mood], [Technical specs]

Example:
"Digital concept art in the style of cosmic fantasy,
a crystalline tower rising from mist-shrouded waters,
bioluminescent accents glowing softly, ethereal dawn
lighting, sense of ancient mystery, 16:9 aspect ratio"
```

---

## Advanced Integrations

### Multi-Server Workflows

Combine multiple MCP servers with skills:

```markdown
## Creative Writing Pipeline

1. **Notion** (Research)
   - Store character notes
   - Track story threads

2. **character-forge skill** (Development)
   - Build Character Diamonds
   - Create voice profiles

3. **story-weave skill** (Structure)
   - Map three acts
   - Plan scenes

4. **GitHub** (Version Control)
   - Track manuscript changes
   - Manage drafts

5. **Nano Banana** (Visualization)
   - Generate character art
   - Create scene mood boards
```

---

### Development Pipeline

```markdown
## Feature Development Flow

1. **Linear** (Planning)
   - Create feature issue
   - Break into tasks

2. **architecture-patterns skill** (Design)
   - Choose patterns
   - Document decisions

3. **tdd skill** (Implementation)
   - Write tests first
   - Implement features

4. **Playwright** (Testing)
   - Run E2E tests
   - Capture visual diffs

5. **code-review skill** (Review)
   - Check code quality
   - Identify issues

6. **GitHub** (Deployment)
   - Create PR
   - Merge and deploy
```

---

## Configuration

### Recommended MCP Setup

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "..." }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": { "NOTION_API_KEY": "..." }
    },
    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": { "LINEAR_API_KEY": "..." }
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-remote-mcp"],
      "env": { "FIGMA_ACCESS_TOKEN": "..." }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright"]
    },
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-next-devtools"]
    }
  }
}
```

---

## Best Practices

### 1. Skill First, Then MCP

```
WRONG: "Use GitHub to review this PR"
RIGHT: "Apply code-review skill, use GitHub for context"

Skills provide the methodology.
MCP provides the capabilities.
```

### 2. Context Management

```
When using MCP servers, manage context carefully:
- Fetch only what you need
- Summarize large responses
- Link back to sources
```

### 3. Iteration Loops

```
MCP enables rapid iteration:
1. Skill analysis
2. MCP action
3. Skill evaluation
4. MCP refinement
```

---

## Quick Reference

### Skill + MCP Pairings

| Task | Skill | MCP Server |
|------|-------|------------|
| PR Review | `code-review` | GitHub |
| Debug Issue | `systematic-debug` | Next.js DevTools |
| Build World | `world-build` | Notion |
| Design UI | `design-system` | Figma |
| Test Feature | `tdd` | Playwright |
| Track Progress | `architecture-patterns` | Linear |
| Generate Images | `prompt-craft` | Nano Banana |

---

*"MCP extends your reach. Skills guide your approach. Together, they make you unstoppable."*
