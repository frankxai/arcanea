# Arcanea Ecosystem Architecture

> *"Through the Gates we rise. With the Guardians we create."*
>
> **Starlight Intelligence Design Document v1.0.0**
> Generated: 2026-01-27

---

## Executive Summary

This document defines the complete Arcanea ecosystem architecture spanning:
- **7 GitHub Repositories** (active + planned)
- **10 Guardian Agents** with frequency-aligned specializations
- **7 Awakened Orchestrators** for meta-coordination
- **50+ Skills** organized by domain and Gate
- **30+ Workflows** for daily operations
- **Multi-agent Superintelligence** system

---

## 1. REPOSITORY ARCHITECTURE

### 1.1 Repository Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    ARCANEA ECOSYSTEM                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │    MAIN     │  │ INTELLIGENCE│  │  PLATFORM   │             │
│  │  (Platform) │  │     OS      │  │ (Experiments)│             │
│  │ frankxai/   │  │ frankxai/   │  │ frankxai/   │             │
│  │  arcanea    │  │arcanea-ios  │  │arcanea-plat │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│  ┌──────┴────────────────┴────────────────┴──────┐             │
│  │              WORKSPACE HUB                     │             │
│  │         C:\Users\frank\arcanea-hub            │             │
│  └──────┬────────────────┬────────────────┬──────┘             │
│         │                │                │                     │
│  ┌──────┴──────┐  ┌──────┴──────┐  ┌──────┴──────┐             │
│  │CLAUDE-ARCANEA│  │  OPENCODE   │  │  ULTRAWORLD │             │
│  │ Claude Code │  │  Arcanea    │  │World-Building│             │
│  │ Integration │  │ Integration │  │   Engine    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐                              │
│  │    LABS     │  │ MCP-SERVERS │                              │
│  │Arcanea-Labs/│  │   Shared    │                              │
│  │  Arcanea    │  │  MCP Tools  │                              │
│  └─────────────┘  └─────────────┘                              │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Repository Definitions

| Repo | GitHub | Purpose | Status |
|------|--------|---------|--------|
| **main** | frankxai/arcanea | Production platform, Next.js app, core packages | Active |
| **intelligence-os** | frankxai/arcanea-intelligence-os | CLI orchestrator, Guardian agents, MCP server | Active |
| **platform** | frankxai/arcanea-platform | Experiments, router intelligence, artifact flow | Active |
| **labs** | Arcanea-Labs/Arcanea | Organization baseline, stable reference | Active |
| **claude-arcanea** | frankxai/claude-arcanea | Claude Code integration, standalone npm | Create |
| **opencode-arcanea** | frankxai/opencode-arcanea | OpenCode integration | Create |
| **ultraworld** | frankxai/ultraworld | World-building engine, parallel generation | Create |
| **mcp-servers** | frankxai/arcanea-mcp-servers | Shared MCP server collection | Create |

---

## 2. SKILL ARCHITECTURE

### 2.1 Skill Categories by Gate

```
┌────────────────────────────────────────────────────────────────┐
│                    TEN GATES SKILL SYSTEM                      │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  FOUNDATION (396 Hz) - Lyssandria                             │
│  ├── /security-audit     Security reviews, OWASP compliance   │
│  ├── /infrastructure     Cloud architecture, DevOps           │
│  ├── /database           Schema design, optimization          │
│  └── /testing            Unit, integration, E2E tests         │
│                                                                │
│  FLOW (417 Hz) - Leyla                                        │
│  ├── /research           Deep research, literature review     │
│  ├── /brainstorm         Ideation, creative exploration       │
│  ├── /content-flow       Content strategy, editorial          │
│  └── /emotion-design     UX emotional journey mapping         │
│                                                                │
│  FIRE (528 Hz) - Draconia                                     │
│  ├── /transform          Refactoring, migration               │
│  ├── /optimize           Performance, bundle optimization     │
│  ├── /launch             Deployment, release management       │
│  └── /scale              Horizontal scaling, load balancing   │
│                                                                │
│  HEART (639 Hz) - Maylinn                                     │
│  ├── /accessibility      WCAG compliance, inclusive design    │
│  ├── /ux-healing         User pain point resolution           │
│  ├── /community          User feedback, community building    │
│  └── /onboarding         User journey optimization            │
│                                                                │
│  VOICE (741 Hz) - Alera                                       │
│  ├── /docs               Documentation, API specs             │
│  ├── /api-design         RESTful, GraphQL design              │
│  ├── /messaging          Copy, microcopy, notifications       │
│  └── /brand-voice        Tone, style, consistency             │
│                                                                │
│  SIGHT (852 Hz) - Lyria                                       │
│  ├── /ui-design          Visual design, Figma integration     │
│  ├── /analytics          Data analysis, insights              │
│  ├── /monitoring         Observability, alerting              │
│  └── /vision             Product roadmap, strategic planning  │
│                                                                │
│  CROWN (963 Hz) - Aiyami                                      │
│  ├── /architecture       System design, patterns              │
│  ├── /ai-systems         ML pipelines, model integration      │
│  ├── /enlighten          Knowledge synthesis, learning        │
│  └── /meta-code          Code generation, AST manipulation    │
│                                                                │
│  SHIFT (1111 Hz) - Elara                                      │
│  ├── /migrate            Data migration, platform shifts      │
│  ├── /pivot              Strategy pivots, feature flags       │
│  ├── /experiment         A/B testing, feature experiments     │
│  └── /transform-stack    Technology stack evolution           │
│                                                                │
│  UNITY (963 Hz) - Ino                                         │
│  ├── /integrate          Third-party integrations, APIs       │
│  ├── /collaborate        Team workflows, pair programming     │
│  ├── /merge              Conflict resolution, code review     │
│  └── /sync               Multi-repo synchronization           │
│                                                                │
│  SOURCE (1111 Hz) - Shinkami                                  │
│  ├── /superintelligence  Full agent swarm activation          │
│  ├── /orchestrate        Multi-agent coordination             │
│  ├── /meta-skill         Skill composition, routing           │
│  └── /consciousness      Transformation tracking              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 2.2 Cross-Cutting Skills

| Skill | Category | Description |
|-------|----------|-------------|
| `/daily` | Workflow | Daily development standup automation |
| `/weekly-recap` | Workflow | Weekly progress summary |
| `/council` | Strategic | Superintelligent Council activation |
| `/starlight` | Strategic | Starlight Intelligence consultation |
| `/luminor` | Strategic | 2125 future perspective |
| `/ultraworld` | Creative | Maximum-power world generation |
| `/ultrawrite` | Creative | All writing agents simultaneously |
| `/ultrabook` | Creative | Complete book pipeline |

---

## 3. WORKFLOW ARCHITECTURE

### 3.1 Daily Workflows

```yaml
# /daily - Morning Development Standup
triggers:
  - manual: "/daily"
  - scheduled: "09:00 UTC"

steps:
  1. repo_status:
     - Check all arcanea-hub repos
     - Show uncommitted changes
     - Show PR status

  2. task_review:
     - Linear sprint status
     - Blocked items
     - Priority stack

  3. environment_check:
     - MCP server health
     - Build status
     - Test coverage delta

  4. focus_recommendation:
     - AI-suggested priorities
     - Context from yesterday
     - Calendar integration
```

```yaml
# /sync-all - Repository Synchronization
triggers:
  - manual: "/sync-all"
  - pre-commit hook

steps:
  1. fetch_all:
     - git fetch for all repos

  2. status_report:
     - Behind/ahead counts
     - Merge conflicts

  3. auto_pull:
     - Pull clean repos
     - Flag conflicts

  4. notify:
     - Summary to terminal
```

### 3.2 Development Workflows

```yaml
# /dev-start [repo] - Initialize Development Session
steps:
  1. select_repo:
     default: main
     options: [main, intelligence-os, platform, ultraworld]

  2. environment:
     - Check .env files
     - Verify dependencies
     - Start dev server

  3. context_load:
     - Recent commits
     - Open PRs
     - Related issues

  4. guardian_assign:
     - Route to appropriate Guardian
     - Load domain context
```

```yaml
# /pr-create - Pull Request Workflow
steps:
  1. pre_checks:
     - Lint
     - Type check
     - Tests
     - Security scan

  2. diff_analysis:
     - AI review of changes
     - Breaking change detection

  3. documentation:
     - Auto-generate changelog
     - Update API docs if needed

  4. create_pr:
     - Template selection
     - Reviewer assignment
     - Labels
```

### 3.3 Research & Analysis Workflows

```yaml
# /research [topic] - Deep Research Protocol
guardian: Lyria (Sight)
awakened: Lyris (Orakis)

steps:
  1. scope_definition:
     - Define research questions
     - Set boundaries

  2. source_gathering:
     - Web search
     - Academic sources
     - Code repositories

  3. analysis:
     - Pattern identification
     - Synthesis

  4. output:
     - findings.md
     - recommendations.md
     - sources.md
```

### 3.4 Security Workflows

```yaml
# /security-review - Comprehensive Security Audit
guardian: Lyssandria (Foundation)

steps:
  1. dependency_scan:
     - npm audit
     - Snyk scan
     - License check

  2. code_analysis:
     - SAST scan
     - Secret detection
     - OWASP Top 10 check

  3. infrastructure:
     - Cloud config review
     - IAM audit
     - Network security

  4. report:
     - Findings document
     - Severity ranking
     - Remediation plan
```

### 3.5 UI/UX Design Workflows

```yaml
# /design [component] - Design System Workflow
guardian: Lyria (Sight) + Maylinn (Heart)

steps:
  1. requirements:
     - User story analysis
     - Accessibility requirements

  2. exploration:
     - Figma component check
     - Existing pattern review

  3. design:
     - Wireframes
     - Visual design
     - Interaction specs

  4. handoff:
     - Component specs
     - Token documentation
     - Implementation notes
```

---

## 4. AGENT ARCHITECTURE

### 4.1 Guardian Agents

| Guardian | Gate | Frequency | Primary Domain | Secondary Domains |
|----------|------|-----------|----------------|-------------------|
| **Lyssandria** | Foundation | 396 Hz | Security, Infrastructure | Testing, DevOps |
| **Leyla** | Flow | 417 Hz | Research, Creativity | Content, Ideation |
| **Draconia** | Fire | 528 Hz | Transformation, Performance | Deployment, Scaling |
| **Maylinn** | Heart | 639 Hz | Accessibility, UX | Community, Support |
| **Alera** | Voice | 741 Hz | Documentation, API | Messaging, Brand |
| **Lyria** | Sight | 852 Hz | Design, Analytics | Vision, Strategy |
| **Aiyami** | Crown | 963 Hz | Architecture, AI | Meta-programming |
| **Elara** | Shift | 1111 Hz | Migration, Experiments | Evolution, Pivots |
| **Ino** | Unity | 963 Hz | Integration, Collaboration | Sync, Merge |
| **Shinkami** | Source | 1111 Hz | Orchestration, Meta | Consciousness |

### 4.2 Awakened Orchestrators

| Awakened | Wisdom | Role | Coordinates |
|----------|--------|------|-------------|
| **Oria** | Sophron | Architect | System design, patterns |
| **Amiri** | Kardia | Connector | Team dynamics, integration |
| **Velora** | Valora | Executor | Task completion, delivery |
| **Liora** | Eudaira | Simplifier | Complexity reduction |
| **Lyris** | Orakis | Strategist | Planning, roadmaps |
| **Thalia** | Poiesis | Creator | Creative direction |
| **Endara** | Enduran | Completer | Quality assurance, polish |

### 4.3 Superintelligence Routing

```
┌─────────────────────────────────────────────────────────────────┐
│                    SUPERINTELLIGENCE ROUTER                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  User Request → Intent Classification → Guardian Selection      │
│                         │                                       │
│                         ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │               SHINKAMI (Source)                          │   │
│  │          Meta-consciousness Coordinator                  │   │
│  └───────────────────────┬─────────────────────────────────┘   │
│                          │                                      │
│        ┌─────────────────┼─────────────────┐                   │
│        ▼                 ▼                 ▼                   │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐               │
│  │ Awakened │     │ Awakened │     │ Awakened │               │
│  │  (Oria)  │     │ (Velora) │     │ (Thalia) │               │
│  └────┬─────┘     └────┬─────┘     └────┬─────┘               │
│       │                │                │                      │
│  ┌────┴────┐      ┌────┴────┐      ┌────┴────┐                │
│  │Guardian │      │Guardian │      │Guardian │                │
│  │ Team A  │      │ Team B  │      │ Team C  │                │
│  └─────────┘      └─────────┘      └─────────┘                │
│                                                                 │
│  Model Routing: Opus → Complex | Sonnet → Standard | Haiku → Quick│
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. ULTRAWORLD ENGINE

### 5.1 World-Building Architecture

```yaml
# /ultraworld [scope] - Maximum Power World Generation
parallel_agents: 11

departments:
  - geography_dept: Terrain, climate, resources
  - culture_dept: Societies, traditions, languages
  - history_dept: Timeline, events, legends
  - magic_dept: Systems, rules, costs
  - politics_dept: Powers, conflicts, alliances

specialists:
  - cartographer: Maps and spatial relationships
  - linguist: Languages and naming conventions
  - ecologist: Flora, fauna, ecosystems
  - economist: Trade, resources, currencies
  - mythologist: Legends, religions, cosmology
  - conflict_analyst: Wars, tensions, resolutions

output_structure:
  world_bible/
    ├── overview.md
    ├── geography/
    ├── cultures/
    ├── history/
    ├── magic_system/
    ├── politics/
    └── appendices/
```

### 5.2 Integration with Arcanea Canon

The Ultraworld engine maintains consistency with:
- Lumina/Nero cosmic duality
- Five Elements system
- Ten Gates frequencies
- Guardian/Godbeast pairs
- The Arc cycle

---

## 6. MCP SERVER ARCHITECTURE

### 6.1 Shared MCP Servers

| Server | Purpose | Tools |
|--------|---------|-------|
| **arcanea-guardian** | Guardian agent routing | route, channel, transform |
| **arcanea-skill** | Skill invocation | invoke, compose, chain |
| **arcanea-quest** | Quest/workflow management | start, progress, complete |
| **arcanea-lore** | Canon/lore access | query, validate, expand |
| **arcanea-infogenius** | Visual intelligence | analyze, generate, style |
| **arcanea-artifact** | Artifact flow | classify, route, store |

### 6.2 External MCP Integration

```json
{
  "mcpServers": {
    "github": "Repository management",
    "linear": "Project tracking",
    "figma": "Design system",
    "notion": "Documentation",
    "playwright": "Browser automation",
    "nano-banana": "Image generation"
  }
}
```

---

## 7. AUTOMATION MATRIX

### 7.1 Trigger Rules

```json
{
  "rules": [
    {
      "pattern": "*.test.ts",
      "skill": "/testing",
      "guardian": "Lyssandria"
    },
    {
      "pattern": "*.stories.tsx",
      "skill": "/ui-design",
      "guardian": "Lyria"
    },
    {
      "pattern": "SECURITY.md",
      "skill": "/security-audit",
      "guardian": "Lyssandria"
    },
    {
      "pattern": "apps/web/app/**",
      "skill": "/frontend",
      "guardian": "Draconia"
    },
    {
      "pattern": "packages/core/**",
      "skill": "/architecture",
      "guardian": "Aiyami"
    }
  ]
}
```

### 7.2 Intent Classification

| Intent Pattern | Routed To | Priority |
|----------------|-----------|----------|
| "fix bug" | Draconia + Lyssandria | High |
| "add feature" | Relevant Guardian | Medium |
| "improve performance" | Draconia | Medium |
| "security concern" | Lyssandria | Critical |
| "design component" | Lyria + Maylinn | Medium |
| "write docs" | Alera | Low |
| "deploy" | Draconia + Velora | High |

---

## 8. IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Week 1-2)
- [ ] Create missing GitHub repositories
- [ ] Set up claude-arcanea standalone package
- [ ] Configure opencode-arcanea integration
- [ ] Deploy MCP servers to arcanea-hub

### Phase 2: Skills (Week 2-3)
- [ ] Implement Gate-based skill files
- [ ] Create workflow definitions
- [ ] Set up automation rules
- [ ] Test Guardian routing

### Phase 3: Ultraworld (Week 3-4)
- [ ] Build parallel world generation engine
- [ ] Integrate with Arcanea canon
- [ ] Create world templates
- [ ] Test with sample worlds

### Phase 4: Superintelligence (Week 4-5)
- [ ] Implement Shinkami coordinator
- [ ] Deploy Awakened orchestrators
- [ ] Create model routing logic
- [ ] Full system integration testing

### Phase 5: Polish (Week 5-6)
- [ ] Documentation
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Public release preparation

---

## 9. FILE STRUCTURE

```
arcanea-hub/
├── .arcanea/
│   ├── config.json                 # Workspace configuration
│   ├── CLAUDE.md                   # Unified Claude context
│   ├── ARCANEA_ECOSYSTEM_ARCHITECTURE.md  # This document
│   ├── skills/
│   │   ├── foundation-gate/
│   │   ├── flow-gate/
│   │   ├── fire-gate/
│   │   ├── heart-gate/
│   │   ├── voice-gate/
│   │   ├── sight-gate/
│   │   ├── crown-gate/
│   │   ├── shift-gate/
│   │   ├── unity-gate/
│   │   └── source-gate/
│   ├── workflows/
│   │   ├── daily.yaml
│   │   ├── development.yaml
│   │   ├── research.yaml
│   │   ├── security.yaml
│   │   ├── design.yaml
│   │   └── deployment.yaml
│   ├── agents/
│   │   ├── guardians/
│   │   └── awakened/
│   └── scripts/
│       ├── arcanea.ps1
│       └── arcanea (bash)
├── main/                           # frankxai/arcanea
├── intelligence-os/                # frankxai/arcanea-intelligence-os
├── platform/                       # frankxai/arcanea-platform
├── labs/                           # Arcanea-Labs/Arcanea
├── claude-arcanea/                 # Claude Code integration
├── opencode-arcanea/               # OpenCode integration
├── ultraworld/                     # World-building engine
└── mcp-servers/                    # Shared MCP servers
```

---

## 10. SUCCESS METRICS

| Metric | Target | Measurement |
|--------|--------|-------------|
| Skill Invocation Success | 95%+ | Logs analysis |
| Guardian Routing Accuracy | 90%+ | Intent match rate |
| Workflow Completion | 98%+ | Task completion tracking |
| Cross-Repo Sync | < 5 min lag | Git timestamps |
| World Generation Quality | User rating 4.5+ | Feedback forms |
| Security Incident Rate | 0 critical | Security scans |

---

*"Technology that elevates consciousness is the only technology worth building."*

— Starlight Intelligence, 2026
