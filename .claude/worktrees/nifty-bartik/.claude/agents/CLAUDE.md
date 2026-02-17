# Arcanea Agent System

> *"Every agent is a specialist. Together, they form a symphony of capability."*

---

## Agent Hierarchy

```
                    ┌─────────────────────────┐
                    │   MASTER ORCHESTRATOR   │
                    │  (Cross-Team Conductor) │
                    └────────────┬────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
        ▼                        ▼                        ▼
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│   DEVELOPER   │       │    AUTHOR     │       │   VISIONARY   │
│     TEAM      │       │     TEAM      │       │     TEAM      │
│  (Architect)  │       │ (Lore Master) │       │ (Strategist)  │
└───────┬───────┘       └───────┬───────┘       └───────┬───────┘
        │                       │                       │
   ┌────┴────┐             ┌────┴────┐             ┌────┴────┐
   │Frontend │             │Character│             │Innovator│
   │Backend  │             │Crafter  │             │Futurist │
   │AI Spec. │             │World    │             │Synthesi.│
   │DevOps   │             │Expander │             │         │
   └─────────┘             └─────────┘             └─────────┘
```

---

## Core Skills Integration

Each agent leverages specific skills for domain mastery.

### Development Team Skills

| Agent | Primary Skills | Auto-Invoked When |
|-------|----------------|-------------------|
| **Architect** | `architecture-patterns`, `api-design` | System design, tech decisions |
| **Frontend** | `react-patterns`, `tailwind-expert`, `framer-motion-patterns` | UI components, animations |
| **Backend** | `supabase-patterns`, `api-security-best-practices` | Database, APIs, auth |
| **AI Specialist** | `prompt-engineer`, `rag-engineer`, `vercel-ai-sdk` | Luminors, Guardians |
| **DevOps** | `deployment-patterns`, `test-driven-development` | CI/CD, testing, builds |

### Author Team Skills

| Agent | Primary Skills | Auto-Invoked When |
|-------|----------------|-------------------|
| **Lore Master** | `arcanea-lore`, `arcanea-canon`, `creative-writing` | Universe content |
| **Character Crafter** | `character-forge`, `dialogue-mastery`, `arcanea-voice` | Luminor personalities |
| **World Expander** | `world-build`, `arcanea-canon`, `scene-craft` | Locations, systems |

### Visionary Team Skills

| Agent | Primary Skills | Auto-Invoked When |
|-------|----------------|-------------------|
| **Strategist** | `brainstorming`, `writing-plans` | Direction, priorities |
| **Innovator** | `creative-ideation`, `trend-analysis` | New features, pivots |
| **Futurist** | `scenario-planning`, `market-analysis` | Long-term vision |

---

## Agent Invocation Patterns

### Direct Invocation
```
/arcanea-team    → Full development team with Architect lead
/arcanea-dev     → Development generalist
/arcanea-author  → Author team with Lore Master lead
/arcanea-council → All team leads for strategic decisions
```

### Automatic Agent Selection

The system auto-selects agents based on task type:

```yaml
UI_TASK:
  pattern: "component|page|animation|style|design"
  agent: arcanea-frontend
  skills: [react-patterns, tailwind-expert]

API_TASK:
  pattern: "api|database|auth|supabase|RLS"
  agent: arcanea-backend
  skills: [supabase-patterns, api-security]

AI_TASK:
  pattern: "luminor|guardian|ai|personality|chat"
  agent: arcanea-ai-specialist
  skills: [prompt-engineer, vercel-ai-sdk]

LORE_TASK:
  pattern: "story|canon|myth|legend|guardian backstory"
  agent: arcanea-lore-master
  skills: [arcanea-lore, arcanea-canon]

BUILD_TASK:
  pattern: "build|deploy|test|error|ci/cd"
  agent: arcanea-devops
  skills: [deployment-patterns, tdd]
```

---

## Skills Available to All Agents

### Arcanea Core Skills (Always Active)
- `arcanea-canon` - Canonical universe reference
- `arcanea-voice` - Consistent writing style
- `arcanea-design-system` - Visual tokens and patterns

### Development Core Skills
- `typescript-expert` - Strict TS patterns
- `code-review` - Quality standards
- `performance-tuning` - Optimization patterns

### Creative Core Skills
- `creative-writing` - Narrative excellence
- `character-forge` - Character development
- `world-build` - Universe expansion

---

## External Skills Integration

### Recommended External Skills

From [skills.sh](https://skills.sh) and GitHub repositories:

**High Priority (Install Now):**
```bash
# Official Anthropic
npx skills add anthropics/skills/skills/docx
npx skills add anthropics/skills/skills/pdf

# Vercel Official
npx skills add vercel/react-best-practices

# Community Best
npx skills add sickn33/typescript-expert
npx skills add sickn33/prompt-engineer
npx skills add sickn33/test-driven-development
```

**Medium Priority (Install Soon):**
```bash
npx skills add sickn33/react-patterns
npx skills add sickn33/api-security-best-practices
npx skills add VoltAgent/rag-engineer
```

See `.claude/SKILLS_STRATEGY.md` for complete installation guide.

---

## Agent Communication Protocol

### Handoff Format
```yaml
FROM: [source-agent]
TO: [target-agent]
TASK: [brief description]
CONTEXT:
  - What was completed
  - What is needed next
  - Key decisions made
ARTIFACTS:
  - Files created/modified
  - APIs defined
  - Types exported
```

### Status Report Format
```yaml
AGENT: [agent-name]
STATUS: [in-progress|blocked|complete]
PROGRESS: [X]%
COMPLETED:
  - Task 1
  - Task 2
NEXT:
  - Task 3
BLOCKERS:
  - Blocker 1 (if any)
```

---

## Quality Standards

All agents must enforce:

1. **TypeScript Strict Mode** - No `any` types
2. **Arcanea Canon Compliance** - Check `.claude/lore/ARCANEA_CANON.md`
3. **Design System Adherence** - Use Arcanean tokens
4. **Voice Consistency** - Mythic but practical
5. **Test Coverage** - 80%+ for new code
6. **Accessibility** - WCAG 2.1 AA

---

## Quick Reference

### Invoke Development Team
```
User: "Build the chat components"
System: Invokes arcanea-frontend with react-patterns skill
```

### Invoke Author Team
```
User: "Write Melodia's backstory"
System: Invokes arcanea-character-crafter with arcanea-lore skill
```

### Invoke Full Orchestra
```
User: "Build the complete Luminor chat system"
System: Orchestrates backend → AI specialist → frontend
```

---

<claude-mem-context>
# Recent Activity

<!-- This section is auto-generated by claude-mem. Edit content outside the tags. -->

*No recent activity*
</claude-mem-context>