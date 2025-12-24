# Module: MCP Fundamentals

> **Foundation Track - Module 4**

## Learning Objectives

By the end of this module, you will:
- Understand Model Context Protocol architecture
- Configure MCP servers for your projects
- Use MCP tools effectively through agents
- Troubleshoot common MCP issues

## Prerequisites

- Completed: Skill System (Module 3)
- Basic understanding of APIs
- Access to at least one MCP-enabled service (GitHub, etc.)

---

## Section 1: Understanding MCP

### What is MCP?

Model Context Protocol (MCP) is a standardized way for AI assistants to interact with external tools and services.

```
┌─────────────────────────────────────────────────────────┐
│                    MCP ARCHITECTURE                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌─────────────┐       ┌─────────────────────────┐    │
│   │   Claude    │       │      MCP Servers        │    │
│   │    Code     │◄─────►│  ┌────┐ ┌────┐ ┌────┐  │    │
│   │             │       │  │ GH │ │Lin │ │Not │  │    │
│   └─────────────┘       │  └────┘ └────┘ └────┘  │    │
│         │               └─────────────────────────┘    │
│         │                          │                    │
│         │               ┌──────────┴──────────┐        │
│         │               │                     │        │
│         ▼               ▼                     ▼        │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │
│   │  Your Code  │ │   GitHub    │ │   Linear    │     │
│   │  (Local)    │ │   (Cloud)   │ │   (Cloud)   │     │
│   └─────────────┘ └─────────────┘ └─────────────┘     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Key Concepts

| Concept | Description |
|---------|-------------|
| **MCP Server** | Process that exposes tools to Claude |
| **Tool** | Specific capability (create_issue, get_file) |
| **Resource** | Data source (files, databases) |
| **Transport** | Communication method (stdio, HTTP) |

### Benefits

1. **Unified Interface**: Same patterns for all external services
2. **Security**: Controlled access through tokens
3. **Extensibility**: Add new capabilities without code changes
4. **Standardization**: Consistent tool definitions

---

## Section 2: Arcanea MCP Stack

### Available Servers

```yaml
Development:
  github:
    Purpose: Code management
    Tools: repos, files, PRs, issues

  next-devtools:
    Purpose: Next.js debugging
    Tools: errors, logs, routes

Testing:
  playwright:
    Purpose: Browser automation
    Tools: navigate, click, screenshot

Design:
  figma-remote-mcp:
    Purpose: Design access
    Tools: files, components, styles

Project Management:
  linear-server:
    Purpose: Sprint/issue tracking
    Tools: issues, projects, cycles

  notion:
    Purpose: Documentation
    Tools: pages, databases, search

Media:
  nano-banana:
    Purpose: Image generation
    Tools: generate_image, variations
```

### Server Selection Guide

| Need | Server |
|------|--------|
| Push code | github |
| Track issues | linear-server |
| Store docs | notion |
| Get designs | figma-remote-mcp |
| Test UI | playwright |
| Debug Next.js | next-devtools |
| Generate images | nano-banana |

---

## Section 3: Configuration

### Basic Configuration

Create `.mcp.json` in project root:

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@package/server-name"],
      "env": {
        "API_KEY": "${ENV_VAR_NAME}"
      }
    }
  }
}
```

### Full Arcanea Configuration

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "linear-server": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "${LINEAR_API_KEY}"
      }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-notion"],
      "env": {
        "NOTION_API_KEY": "${NOTION_TOKEN}"
      }
    },
    "figma-remote-mcp": {
      "command": "npx",
      "args": ["-y", "figma-remote-mcp"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "${FIGMA_TOKEN}"
      }
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

### Environment Variables

Store sensitive tokens in `.env`:

```bash
# .env (DO NOT commit to git)
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
LINEAR_API_KEY=lin_api_xxxx
NOTION_TOKEN=secret_xxxx
FIGMA_TOKEN=figd_xxxx
```

---

## Section 4: Using MCP Tools

### Tool Invocation Flow

```yaml
1. User Request:
   "Create a GitHub issue for the login bug"

2. Agent Analysis:
   - Task: Create issue
   - Server needed: github
   - Tool: create_issue

3. Tool Execution:
   create_issue(
     owner: "arcanea",
     repo: "platform",
     title: "Login bug",
     body: "Description..."
   )

4. Response Processing:
   - Parse result
   - Report to user
   - Handle errors
```

### Common Tool Patterns

**GitHub Workflow**:
```yaml
# Feature development
1. get_file_contents → Read existing code
2. push_files → Make changes
3. create_pull_request → Submit for review
4. add_issue_comment → Update tracking issue
```

**Linear Workflow**:
```yaml
# Sprint management
1. list_issues → Get current tasks
2. update_issue → Change status
3. create_comment → Add progress notes
4. get_active_cycle → Check sprint info
```

**Notion Workflow**:
```yaml
# Documentation
1. search → Find relevant pages
2. get_page → Read content
3. create_page → Add new docs
4. append_blocks → Update existing
```

### Multi-Server Operations

Agents often use multiple MCPs together:

```yaml
Example: Implement feature from spec

1. Linear: Get issue details
   get_issue(issueId: "ARC-101")

2. Notion: Read specification
   get_page(page_id: "spec-page-id")

3. Figma: Get design
   get_file_nodes(fileKey: "design-key")

4. GitHub: Create branch and code
   push_files(...)

5. Playwright: Run tests
   browser_navigate(...)
   browser_expect_visible(...)

6. Linear: Update status
   update_issue(issueId: "ARC-101", state: "done")
```

---

## Section 5: Troubleshooting

### Common Issues

**Server Won't Start**
```yaml
Symptoms:
  - "MCP server not found"
  - Connection timeout

Solutions:
  1. Check .mcp.json syntax (valid JSON)
  2. Verify package name is correct
  3. Ensure npx can access package
  4. Check network connectivity
```

**Authentication Errors**
```yaml
Symptoms:
  - "401 Unauthorized"
  - "Invalid token"

Solutions:
  1. Verify token in .env
  2. Check token permissions
  3. Ensure token hasn't expired
  4. Confirm correct env var name
```

**Tool Not Found**
```yaml
Symptoms:
  - "Unknown tool"
  - Tool not available

Solutions:
  1. Verify server is running (/status)
  2. Check tool name spelling
  3. Review server documentation
  4. Restart Claude Code session
```

### Debugging Commands

```bash
# Check MCP status
/status

# View running servers
/tasks

# Test connection
# (Ask Claude to use a simple tool)
"List my GitHub repositories"
```

### Server Logs

Enable detailed logging:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}",
        "DEBUG": "true"
      }
    }
  }
}
```

---

## Hands-On Exercises

### Exercise 1: Configure GitHub MCP

1. Get a GitHub personal access token
2. Add to your `.env` file
3. Configure in `.mcp.json`
4. Test: Ask Claude to list your repositories

### Exercise 2: Multi-Server Workflow

Configure at least two MCP servers and test:

1. "Create a GitHub issue about X"
2. "Document this issue in Notion"
3. Verify both operations succeeded

### Exercise 3: Troubleshoot

Intentionally break a configuration:
1. Misspell a token name
2. Observe the error message
3. Fix the issue
4. Document what you learned

---

## Knowledge Check

1. **What is an MCP Server?**
   - [ ] A web server
   - [x] A process that exposes tools to Claude
   - [ ] A database
   - [ ] A file system

2. **Where is MCP configuration stored?**
   - [ ] package.json
   - [ ] .env
   - [x] .mcp.json
   - [ ] mcp.config.js

3. **Why use environment variables for tokens?**
   - [ ] Better performance
   - [x] Security - avoid committing secrets
   - [ ] Required by MCP
   - [ ] Easier to type

4. **How do agents know which MCP to use?**
   - [ ] Random selection
   - [ ] User must specify
   - [x] Analyze task and match to appropriate server
   - [ ] Always use all servers

5. **What's the first step in troubleshooting?**
   - [ ] Restart computer
   - [x] Check /status and server logs
   - [ ] Delete configuration
   - [ ] Contact support

---

## Quick Reference

### Configuration Template
```json
{
  "mcpServers": {
    "[name]": {
      "command": "npx",
      "args": ["-y", "@package/name"],
      "env": {
        "[KEY]": "${ENV_VAR}"
      }
    }
  }
}
```

### Server Documentation Links
- GitHub: `/integrations/github.md`
- Linear: `/integrations/linear.md`
- Notion: `/integrations/notion.md`
- Figma: `/integrations/figma.md`
- Playwright: `/integrations/playwright.md`
- Next DevTools: `/integrations/next-devtools.md`
- Nano Banana: `/integrations/nano-banana.md`

---

## Next Steps

Congratulations on completing the Foundation Track!

**You can now proceed to specialized tracks**:
- Developer Track → `developer/developer-onboarding.md`
- Teacher Track → `teacher/teacher-onboarding.md`
- Visionary Track → `visionary/visionary-onboarding.md`

**Or continue exploring**:
- Try each MCP server
- Build a multi-server workflow
- Create custom skills using MCP capabilities
