# ARCANEA DAILY WORKFLOW GUIDE
**How to Build Arcanea Effectively with Claude Code, MCP, and AI Agents**

---

## QUICK START

**Every Session:**
1. Open Claude Code in `/mnt/c/Users/Frank/Arcanea`
2. Run `/build-arcanea` to activate development mode
3. Check today's priorities with `/arcanea-status`
4. Start building!

---

## PROJECT STRUCTURE UNDERSTANDING

### Three Systems
```
┌─────────────────────────────────────────────────────────┐
│ ARCANEA UNIVERSE (Fantasy Novels)                       │
│ • Books, lore, world-building                           │
│ • See: ARCANEA_UNIVERSE_CANON.md                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ARCANEA PLATFORM (Social Creation - apps/web)          │
│ • Port 3001                                             │
│ • 3 Academies, 3 Luminors                              │
│ • Social features (follow, like, remix)                 │
│ • 85% backend, 20% frontend                             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ARCANEA ACADEMY (Learning Platform - apps/academy)     │
│ • Port 3002                                             │
│ • 6 Academies, 6 Luminors                              │
│ • Structured learning + certification                   │
│ • 40% complete                                          │
└─────────────────────────────────────────────────────────┘
```

### Read These First
1. `ARCANEA_SYSTEMS_OVERVIEW.md` - Understand all three systems
2. `LUMINOR_NAMING_SYSTEM.md` - Harmonious names for Luminors
3. `ACADEMY_IMPLEMENTATION_PLAN.md` - 5-sprint roadmap
4. `ARCANEA_KNOWLEDGE_BASE.md` - Tech stack details
5. `ARCANEA_UNIVERSE_CANON.md` - Fantasy lore (for context)

---

## CLAUDE CODE BEST PRACTICES

### 1. Always Use MCP Servers

**Available MCPs** (check with `/mcp-status`):
- `next-devtools` - Next.js debugging, runtime errors
- `github` - Repository management, PRs, issues
- `figma-remote-mcp` - UI/UX designs
- `notion` - Project documentation
- `linear-server` - Sprint planning, tasks
- `playwright` - Browser testing

**Best Practice:**
```
At session start:
1. Run: /mcp-status
2. Initialize: next-devtools with init tool
3. Check: GitHub for open issues/PRs
4. Review: Linear for sprint tasks
```

### 2. Use Specialized Agents Proactively

**When to use Task tool with agents:**

| Scenario | Agent | Why |
|----------|-------|-----|
| Exploring codebase | `Explore` (thoroughness: "medium") | Faster than manual grep/read |
| Planning features | `Plan` | Systematic approach |
| After writing code | `code-reviewer` | Catches issues before commit |
| Before PR | `pr-review-toolkit:review-pr` | Comprehensive review |
| Large refactor | `code-simplifier` | Maintains simplicity |

**Example:**
```
User: "I need to add authentication to the Academy app"
Assistant: I'll use the Plan agent to create a systematic approach...
[Uses Task tool with subagent_type="Plan"]
```

### 3. Use Slash Commands for Common Tasks

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/build-arcanea` | Activate full dev mode | Every session start |
| `/arcanea-status` | Show project status | Check progress |
| `/arcanea-dev` | Activate dev team | Complex features |
| `/commit-push-pr` | Commit and create PR | After feature completion |
| `/review-pr [number]` | Review a PR | Before merging |
| `/polish-content` | Polish articles | Content creation |

### 4. Parallel Tool Execution

**Always run independent operations in parallel:**

```typescript
// ✅ GOOD - Parallel
<function_calls>
  <invoke name="Read">
    <parameter name="file_path">apps/web/app/page.tsx