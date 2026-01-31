# Agent Team Optimization Prompt for Claude
**Purpose:** Design a highly skilled, specialized agent department structure for completing the Arcanea platform build

---

## Context for Claude

You are designing a sophisticated multi-agent system to complete the Arcanea platform - a magical AI-powered creative ecosystem with three academies (Music, Story, Visual), AI companions (Guardians & Luminors), social features, and an economy system.

**Current Progress:**
- ✅ World-building & lore (enhanced to 1,500+ lines)
- ✅ Technical architecture (Next.js + Supabase + Prisma)
- ✅ AI integration layer (Suno, Gemini, Claude providers)
- ✅ Marketing strategy
- ⏸️ UI/UX design system
- ⏸️ Frontend implementation
- ⏸️ Backend API implementation
- ⏸️ Academy content creation
- ⏸️ Testing & deployment

**Technology Stack:**
- Frontend: Next.js 14, Tailwind CSS, TypeScript
- Backend: Supabase (PostgreSQL), Prisma ORM
- AI: Anthropic Claude, Google Gemini, Suno
- Deployment: Vercel + Supabase
- Monorepo: Turborepo with pnpm

**Project Location:** `/mnt/c/Users/Frank/Arcanea`

---

## Your Task

Design an optimal **agent department structure** for completing this project with maximum efficiency and quality.

### Requirements:

1. **Create 5-7 specialized departments**
   - Each department should have a clear focus area
   - Departments should coordinate but not overlap significantly

2. **Each department has 3-5 specialized agents**
   - Total: 20-35 agents across all departments
   - Each agent has a specific, focused role
   - Agents within a department collaborate closely

3. **For each department, provide:**
   - Department name and mission
   - Department lead agent (coordinator role)
   - 3-5 specialized agent roles with:
     - Agent name/title
     - Specific responsibilities
     - Key deliverables
     - Skills/expertise required
     - Tools they use (Claude Code tools, MCP servers, etc.)

4. **Define coordination strategy:**
   - How departments communicate
   - Dependency management
   - Handoff protocols
   - Progress tracking

5. **Execution workflow:**
   - Which departments run in parallel
   - Which require sequential execution
   - Estimated timeline for each department
   - Critical path identification

---

## Output Format

Please structure your response as:

```markdown
# Arcanea Agent Department Structure

## Executive Summary
[Overview of the structure, total agents, estimated timeline]

## Department 1: [Name]
**Mission:** [Clear mission statement]
**Lead Agent:** [Coordinator role]
**Timeline:** [Estimated days]
**Dependencies:** [What this department needs from others]

### Agent 1.1: [Role Name]
**Responsibilities:**
- [Specific task 1]
- [Specific task 2]

**Deliverables:**
- [File/system 1]
- [File/system 2]

**Skills Required:**
- [Skill 1]
- [Skill 2]

**Tools:**
- [Claude Code tool 1]
- [MCP server 1]

**Coordinates With:**
- [Agent X from Department Y]

[Repeat for agents 1.2, 1.3, etc.]

---

## Department 2: [Name]
[Same structure]

---

## Coordination Strategy
[How departments work together]

## Execution Plan
### Phase 1: [Days X-Y]
- Department A (parallel)
- Department B (parallel)

### Phase 2: [Days Y-Z]
- Department C (depends on A, B)
- Department D (parallel with C)

[etc.]

## Success Metrics
[How to measure completion]

## Risk Mitigation
[Potential bottlenecks and solutions]
```

---

## Consider These Aspects

### **Department Ideas:**
- Frontend Engineering
- Backend Engineering
- AI/ML Systems
- Design & UX
- Content Creation
- QA & Testing
- DevOps & Infrastructure
- Product Management
- Data Engineering
- Security & Compliance

### **Specialized Roles to Consider:**
- Component library developer
- API endpoint developer
- Database migration specialist
- Luminor personality engineer
- Curriculum designer
- Visual designer
- Animation specialist
- Integration tester
- Performance optimizer
- Documentation writer
- Deployment engineer
- Security auditor

### **Key Deliverables Remaining:**
- Complete UI component library
- All Next.js app implementations (web, academy, studio, realms)
- API endpoints for all 114 specified endpoints
- Database migrations and seed data
- Academy curricula (50+ lessons per academy)
- Luminor conversation scripts
- Guardian bonding flows
- Onboarding UX implementation
- Social features (discovery, profiles, remix)
- ARC/NEA economy implementation
- Testing suite
- Deployment pipeline
- Documentation

---

## Optimization Goals

Your department structure should optimize for:

1. **Speed:** Maximum parallel execution
2. **Quality:** Specialized expertise per area
3. **Coordination:** Clear handoffs and dependencies
4. **Flexibility:** Easy to scale up/down agent count
5. **Clarity:** Each agent knows exactly what to build
6. **Completeness:** All aspects of Arcanea covered

---

## Example Department (for inspiration)

```markdown
## Department 3: AI Intelligence Systems

**Mission:** Build all AI-powered features including Luminors, Guardians, and creation tools

**Lead Agent:** AI Systems Architect
**Timeline:** 5-7 days
**Dependencies:** Database schema from Backend Dept, API specs from Platform Dept

### Agent 3.1: Luminor Conversation Engineer
**Responsibilities:**
- Implement conversational AI for all 4 Luminors
- Create personality-specific prompt templates
- Build context-aware response generation
- Integrate with Claude/GPT APIs

**Deliverables:**
- `/packages/ai-core/luminors/conversations/`
- Luminor chat API endpoints
- Personality prompt library
- Testing suite for AI responses

**Skills Required:**
- Prompt engineering
- Conversational AI design
- TypeScript/Node.js
- LLM API integration

**Tools:**
- Claude API (via mcp__anthropic)
- Notion for documentation (via mcp__notion)
- GitHub for code management (via mcp__github)

**Coordinates With:**
- Agent 2.3 (API Developer) for endpoint integration
- Agent 4.2 (UI Developer) for chat interface
- Agent 5.1 (Content Writer) for personality scripts

### Agent 3.2: Guardian Learning System Engineer
[Similar structure]

[etc.]
```

---

## Final Note

Be creative and think about the optimal way to organize 20-35 highly skilled agents to build a production-ready AI-powered creative platform in 10-14 days. Consider modern software development practices, AI-first development workflows, and the unique aspects of building a magical user experience.

**Your goal:** Design the most efficient, highest-quality agent organization possible.

---

**END OF PROMPT**

---

## How to Use This Prompt

1. Copy this entire file content
2. Start a fresh Claude conversation
3. Paste the prompt
4. Review the agent department structure Claude provides
5. Refine based on your preferences
6. Use the optimized structure for Session 2 of Arcanea build

---

*Prepared for Frank's Arcanea project - Session 1 complete, Session 2 planning*
