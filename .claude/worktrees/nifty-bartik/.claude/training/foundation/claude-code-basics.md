# Module: Claude Code Basics

> **Foundation Track - Module 2**

## Learning Objectives

By the end of this module, you will:
- Navigate Claude Code interface effectively
- Use essential commands and shortcuts
- Understand the tool system
- Configure your environment for optimal use

## Prerequisites

- Completed: Ecosystem Overview (Module 1)
- Claude Code installed on your system

---

## Section 1: Claude Code Interface

### The Terminal Experience

Claude Code operates in your terminal, providing a conversational interface for development tasks.

```
┌─────────────────────────────────────────────────────────┐
│  Terminal                                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  $ claude                                               │
│                                                         │
│  ╭──────────────────────────────────────────────────╮  │
│  │ Claude Code                                      │  │
│  │                                                  │  │
│  │ > How can I help you today?                      │  │
│  │                                                  │  │
│  │ [User input area]                                │  │
│  ╰──────────────────────────────────────────────────╯  │
│                                                         │
│  Status: Connected | Model: Claude | Tools: 15         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Starting a Session

```bash
# Start in current directory
claude

# Start with a specific model
claude --model claude-opus-4-5-20251101

# Continue previous conversation
claude --continue

# Start with initial prompt
claude "Explain the codebase structure"
```

### Session Modes

| Mode | Description | How to Enter |
|------|-------------|--------------|
| Normal | Standard conversation | Default |
| Plan | Architecture planning | `/plan` or EnterPlanMode |
| Compact | Reduced output | `--compact` flag |

---

## Section 2: Essential Commands

### Built-in Commands

```bash
# Help and information
/help          # Show available commands
/status        # Show current session status
/tasks         # List running background tasks

# Session management
/clear         # Clear conversation history
/compact       # Toggle compact mode
/exit          # End session

# Configuration
/config        # View/edit configuration
/model         # Switch models
```

### Custom Commands (Arcanea)

```bash
# Team activation
/arcanea-dev       # Developer team
/teacher-team      # Teacher team
/visionary-team    # Visionary team
/arcanea-council   # Full ecosystem

# Specialized workflows
/arcanea-build     # Diagnose build errors
/arcanea-author    # Activate author team
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Cancel current operation |
| `Ctrl+D` | Exit Claude Code |
| `↑/↓` | Navigate history |
| `Tab` | Autocomplete |

---

## Section 3: Tool System

### What are Tools?

Tools are capabilities that Claude Code uses to interact with your system and external services.

### Core Tools

```yaml
File Operations:
  Read:     # Read file contents
  Write:    # Create/overwrite files
  Edit:     # Modify existing files
  Glob:     # Find files by pattern
  Grep:     # Search file contents

System:
  Bash:     # Execute shell commands
  Task:     # Launch sub-agents

External:
  WebFetch: # Fetch web content
  WebSearch: # Search the web

Planning:
  TodoWrite:      # Manage task lists
  EnterPlanMode:  # Start planning mode
  ExitPlanMode:   # Complete planning
```

### Tool Usage Patterns

**Reading Files**:
```
User: "Show me the config file"
Claude: [Uses Read tool to fetch config.json]
```

**Editing Code**:
```
User: "Fix the typo on line 42"
Claude: [Uses Edit tool with old_string/new_string]
```

**Running Commands**:
```
User: "Run the tests"
Claude: [Uses Bash tool: npm test]
```

**Sub-agents**:
```
User: "Explore how authentication works"
Claude: [Uses Task tool with Explore agent]
```

---

## Section 4: Configuration

### Project Configuration

Create `.claude/CLAUDE.md` in your project root:

```markdown
# Project Instructions

## Overview
Brief project description

## Tech Stack
- Framework: Next.js
- Language: TypeScript
- Styling: Tailwind CSS

## Conventions
- Use absolute imports
- Prefer async/await
- Follow ESLint rules

## Important Files
- `src/config.ts` - Configuration
- `src/types/` - Type definitions
```

### MCP Configuration

Configure MCP servers in `.mcp.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### Skills Configuration

Skills are placed in `.claude/skills/`:

```
.claude/
├── skills/
│   ├── my-skill/
│   │   └── SKILL.md
│   └── another-skill/
│       └── SKILL.md
```

---

## Section 5: Best Practices

### Effective Prompting

**Be Specific**:
```
❌ "Fix the bug"
✅ "Fix the null pointer exception in UserService.getProfile() on line 87"
```

**Provide Context**:
```
❌ "Add a button"
✅ "Add a 'Save Draft' button to the editor toolbar that saves to localStorage"
```

**State Expected Outcome**:
```
❌ "Make it faster"
✅ "Reduce the dashboard load time from 3s to under 1s by implementing lazy loading"
```

### Iterative Workflows

```
1. Start broad: "Help me understand the auth system"
2. Get specific: "Now modify the token refresh logic"
3. Verify: "Run the auth tests to confirm"
4. Complete: "Create a PR with these changes"
```

### Error Recovery

When Claude encounters errors:

1. **Read the error message** - Often contains the solution
2. **Ask for diagnosis** - "What's causing this error?"
3. **Request fix** - "Fix this error and verify"
4. **Prevent recurrence** - "Add a test for this case"

---

## Hands-On Exercises

### Exercise 1: Basic Navigation

Complete these tasks in Claude Code:

1. Start Claude Code in a project directory
2. Use `/help` to see available commands
3. Use `/status` to check your session
4. Ask Claude to list files in the current directory

### Exercise 2: File Operations

1. Ask Claude to read your `package.json`
2. Have Claude create a simple `test.txt` file
3. Edit the file to add a new line
4. Delete the test file using Bash

### Exercise 3: Tool Understanding

For each task, identify which tool Claude would use:

1. "Show me the contents of README.md"
   - Tool: ____________

2. "Change 'Hello' to 'Hi' in greeting.js"
   - Tool: ____________

3. "Find all TypeScript files in src/"
   - Tool: ____________

4. "Run npm install"
   - Tool: ____________

<details>
<summary>See Answers</summary>

1. Read
2. Edit
3. Glob
4. Bash

</details>

---

## Knowledge Check

1. **Which command shows running background tasks?**
   - [ ] /status
   - [x] /tasks
   - [ ] /jobs
   - [ ] /running

2. **What file contains project-specific instructions?**
   - [ ] .clauderc
   - [x] .claude/CLAUDE.md
   - [ ] claude.config.js
   - [ ] .claude.json

3. **Which tool searches file contents?**
   - [ ] Glob
   - [ ] Find
   - [x] Grep
   - [ ] Search

4. **What's the best practice for prompting?**
   - [ ] Keep requests vague for flexibility
   - [x] Be specific and provide context
   - [ ] Always use code blocks
   - [ ] Start with "please"

5. **How do you launch a sub-agent?**
   - [ ] /agent command
   - [ ] Agent keyword
   - [x] Task tool
   - [ ] Spawn function

---

## Common Issues & Solutions

### "Command not found"
```bash
# Ensure Claude Code is installed
npm install -g @anthropic/claude-code

# Or use npx
npx claude
```

### "Tool permission denied"
```
Check that:
1. You're in the correct directory
2. Files aren't read-only
3. You have system permissions
```

### "MCP server not connecting"
```
1. Verify .mcp.json syntax
2. Check environment variables
3. Ensure server package exists
4. Review server logs
```

---

## Next Steps

Congratulations on completing Module 2!

**Next Module**: `skill-system.md` - Deep dive into skills

**Practice**:
- Try all the exercises
- Explore your own codebase with Claude
- Experiment with different prompting styles

**Related Resources**:
- Claude Code documentation
- `/help` command reference
- `.claude/CLAUDE.md` examples
