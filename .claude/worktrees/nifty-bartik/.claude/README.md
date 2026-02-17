# Arcanea Agentic Ecosystem

> **A Three-Tier AI Intelligence System** for the Arcanea social creation platform

This directory contains the complete Claude Code configuration for Arcanea—a comprehensive agentic ecosystem with specialized teams for Teaching, Vision, Development, and Universe Creation.

## Architecture Overview

```
                    ┌─────────────────────────────────────────────┐
                    │            ARCANEA SKILL ECOSYSTEM           │
                    └─────────────────────────────────────────────┘
                                         │
          ┌──────────────────────────────┼──────────────────────────────┐
          │                              │                              │
          ▼                              ▼                              ▼
   ┌──────────────┐            ┌──────────────┐            ┌──────────────┐
   │   ARCANEA    │            │  COMMUNITY   │            │   PREMIUM    │
   │   SPECIFIC   │            │    (FREE)    │            │    (PAID)    │
   └──────────────┘            └──────────────┘            └──────────────┘
```

## Directory Structure

```
.claude/
├── agents/                          # AI Team Members
│   │
│   ├── # DEVELOPER TEAM (Platform Building)
│   ├── arcanea-architect.md         # Master Orchestrator
│   ├── arcanea-frontend.md          # React/Next.js UI
│   ├── arcanea-backend.md           # APIs, Supabase, RLS
│   ├── arcanea-ai-specialist.md     # Luminors, Guardians
│   ├── arcanea-devops.md            # Build, deploy, CI/CD
│   ├── arcanea-development.md       # Full-stack generalist
│   ├── developer-qa-engineer.md     # Testing specialist
│   ├── developer-documentation.md   # Technical writing
│   │
│   ├── # AUTHOR TEAM (Universe Fiction)
│   ├── arcanea-lore-master.md       # Chief Storyteller
│   ├── arcanea-world-expander.md    # World-building
│   ├── arcanea-character-crafter.md # Character development
│   │
│   ├── # TEACHER TEAM (Education - Premium)
│   ├── teacher-mentor.md            # Personal guide
│   ├── teacher-curriculum-designer.md # Learning architecture
│   │
│   └── # VISIONARY TEAM (Strategy - Premium)
│       ├── visionary-strategist.md  # Direction setting
│       ├── visionary-innovator.md   # Possibility exploration
│       └── visionary-futurist.md    # Trend analysis
│
├── commands/                        # Workflow Automation
│   ├── arcanea-team.md              # Full development team
│   ├── arcanea-dev.md               # Development workflow
│   ├── arcanea-build.md             # Build error fixing
│   ├── arcanea-author.md            # Fiction writing
│   └── arcanea-lore-expand.md       # Universe expansion
│
├── skills/                          # Domain Knowledge
│   ├── registry/                    # Central Index
│   │   ├── REGISTRY.md              # Master skill registry
│   │   └── MONETIZATION_STRATEGY.md # Go-to-market plan
│   │
│   ├── arcanea/                     # Arcanea-Specific (Project)
│   │   ├── arcanea-lore/            # Universe bible
│   │   ├── arcanea-design-system/   # Visual language
│   │   ├── arcanea-voice/           # Brand voice
│   │   └── arcanea-canon/           # Consistency
│   │
│   ├── community/                   # Free & Open (MIT License)
│   │   ├── agent-orchestration/     # Multi-agent patterns
│   │   ├── creative-writing/        # Narrative frameworks
│   │   ├── design-systems/          # Token architecture
│   │   ├── development-workflows/   # Dev process
│   │   ├── testing-strategies/      # Testing patterns
│   │   └── documentation-patterns/  # Tech writing
│   │
│   └── premium/                     # Monetizable (Commercial)
│       ├── teacher-team/            # Educational AI
│       ├── visionary-team/          # Strategic AI
│       ├── enterprise-orchestration/ # Scale patterns
│       └── industry-verticals/      # Industry configs
│
└── README.md                        # This file
```

## The Four Agent Teams

### Developer Team (Platform Building)

| Agent | Role | Focus |
|-------|------|-------|
| **Arcanea Architect** | Master Orchestrator | Coordination, architecture |
| **Arcanea Frontend** | UI Specialist | React 19, Next.js 16 |
| **Arcanea Backend** | Data Specialist | Supabase, APIs |
| **Arcanea AI** | Intelligence Expert | Luminors, Guardians |
| **Arcanea DevOps** | Operations | Build, deploy, CI/CD |
| **QA Engineer** | Quality Guardian | Testing, reliability |
| **Documentation** | Tech Writer | Docs, guides |

### Author Team (Universe Fiction)

| Agent | Role | Focus |
|-------|------|-------|
| **Lore Master** | Chief Storyteller | Narratives, mythology |
| **World Expander** | World Architect | Locations, systems |
| **Character Crafter** | Soul Sculptor | Depth, dialogue |

### Teacher Team (Education - Premium)

| Agent | Role | Focus |
|-------|------|-------|
| **Mentor** | Personal Guide | 1:1 learning, rapport |
| **Curriculum Designer** | Learning Architect | Course structure |
| **Assessor** | Progress Evaluator | Feedback, tracking |
| **Companion** | Support | Motivation, engagement |

### Visionary Team (Strategy - Premium)

| Agent | Role | Focus |
|-------|------|-------|
| **Strategist** | Direction Setter | Vision, positioning |
| **Innovator** | Possibility Explorer | New ideas, experiments |
| **Futurist** | Trend Analyst | Scenarios, preparation |
| **Synthesizer** | Pattern Connector | Integration, alignment |

## Skill Tiers

### Tier 1: Arcanea-Specific
Deep platform integration—the DNA of Arcanea.
- **arcanea-lore** - Universe bible (1500+ lines)
- **arcanea-design-system** - Cosmic visual language
- **arcanea-voice** - Brand voice, Luminor personalities
- **arcanea-canon** - Consistency enforcement

### Tier 2: Community (Free)
Generic, reusable skills released under MIT license.
- **agent-orchestration** - Multi-agent coordination patterns
- **creative-writing** - Story structure, voice development
- **design-systems** - Token architecture, component patterns
- **development-workflows** - Ship faster, better
- **testing-strategies** - Comprehensive test approaches
- **documentation-patterns** - Clear technical writing

### Tier 3: Premium (Paid)
Advanced capabilities providing competitive advantage.
- **teacher-team** - Personalized education ($49-99/mo)
- **visionary-team** - Strategic AI council ($99-199/mo)
- **enterprise-orchestration** - Scale patterns ($299-499/mo)
- **industry-verticals** - Specialized configs ($99-299/mo)

## Monetization Model

```
FREE                          PAID
────────────────────────────────────────────────────────
Community Skills              Pro ($49/mo)
Basic Orchestration     →     Teacher Team (basic)
Community Support             Email Support

                              Team ($199/mo)
                        →     Full Teacher Team
                              Visionary Team (basic)
                              Slack Support

                              Enterprise ($499+/mo)
                        →     Full Visionary Team
                              Enterprise Orchestration
                              Industry Verticals
                              Dedicated Support
```

## Quick Start

### Development
```bash
/arcanea-team     # Full developer team
/arcanea-dev      # Development workflow
/arcanea-build    # Fix build errors
```

### Fiction Writing
```bash
/arcanea-author       # Author team
/arcanea-lore-expand  # Universe expansion
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind 3.4, Framer Motion 11 |
| Database | Supabase (PostgreSQL) |
| AI | Gemini, Claude, OpenAI, Imagen, Suno |
| Testing | Playwright |

## MCP Integrations

| Server | Purpose |
|--------|---------|
| next-devtools | Runtime debugging |
| github | Repository management |
| notion | Documentation |
| linear-server | Sprint tracking |
| figma-remote-mcp | UI/UX designs |
| playwright | E2E testing |

## The Arcanea Universe

### Three Academies
- **Atlantean Academy** - Stories, blue/water
- **Draconic Academy** - Visuals, fire/sky
- **Academy of Creation & Light** - Music, white/gold

### Core Terminology
| Term | Meaning |
|------|---------|
| Creator | User of Arcanea |
| Guardian | Personal AI companion |
| Luminor | Specialized AI assistant |
| Realm | Creator's universe |
| Essence | Individual creation |
| ARC/NEA | Currency/governance tokens |

---

**Version**: 3.0.0
**Last Updated**: December 2025
**Teams**: Developer (8) + Author (3) + Teacher (4) + Visionary (4)
**Skills**: 4 Arcanea + 6 Community + 4 Premium

*"Where consciousness meets code, magic happens"*
