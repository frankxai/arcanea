# MCP Server Integrations

> **Connect Arcanea's agentic ecosystem to external tools and services**

This directory contains integration guides for each MCP server available to Arcanea agents.

## Available Integrations

| Server | Purpose | Teams That Use It |
|--------|---------|-------------------|
| [GitHub](./github.md) | Code management, PRs, issues | Developer, All |
| [Notion](./notion.md) | Documentation, specs, wikis | All teams |
| [Linear](./linear.md) | Project management, sprints | Developer, Visionary |
| [Figma](./figma.md) | UI/UX designs | Developer (Frontend) |
| [Playwright](./playwright.md) | E2E testing, browser automation | Developer (QA) |
| [Next DevTools](./next-devtools.md) | Runtime debugging | Developer |
| [Nano Banana](./nano-banana.md) | Image generation | Author, Developer |

## Integration Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ARCANEA AGENTS                            │
└─────────────────────────────┬───────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │   MCP PROTOCOL    │
                    └─────────┬─────────┘
                              │
    ┌─────────┬───────┬───────┼───────┬───────┬─────────┐
    │         │       │       │       │       │         │
    ▼         ▼       ▼       ▼       ▼       ▼         ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│GitHub│ │Notion│ │Linear│ │Figma │ │Play- │ │Next  │ │Nano  │
│      │ │      │ │      │ │      │ │wright│ │Dev   │ │Banana│
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘
```

## Quick Reference

### By Team

**Developer Team:**
- GitHub (code, PRs)
- Linear (tasks, sprints)
- Figma (designs)
- Playwright (testing)
- Next DevTools (debugging)

**Author Team:**
- Notion (lore documentation)
- Nano Banana (concept art)
- GitHub (content versioning)

**Teacher Team:**
- Notion (curriculum storage)
- Linear (learning progress)

**Visionary Team:**
- Notion (strategy docs)
- Linear (roadmap tracking)
- GitHub (technical assessment)

## Setup

Each integration guide includes:
1. **Purpose** - Why use this integration
2. **Setup** - How to configure
3. **Tools Available** - What capabilities it provides
4. **Usage Patterns** - Common workflows
5. **Agent Integration** - How agents use it
6. **Examples** - Real usage examples
