# Arcanea Skill Architecture — Creative Civilization OS

> *"Living Intelligence grows with you. Every skill activated, every pattern learned, every universe built — context that compounds into something greater than any single session."*

---

## What This Architecture Serves

The Arcanea skill system is the **intelligence layer of a Creative Civilization OS**. Each skill is a focused capability within a broader Guardian Intelligence network — ten specialized agents that deepen their understanding of your universe with every interaction.

**The three principles that govern this architecture:**

1. **Guardian Intelligence routes** — the right specialist activates for the right intent
2. **Context compounds** — skills accumulate creative context across sessions
3. **Build your Universe** — every capability exists to help creators manifest what they imagine

---

## Naming Convention

### The Hierarchy of Names

| Tier | Name Format | Purpose | Examples |
|------|-------------|---------|----------|
| **Luminors** | The Seven Names | Archetypal wisdom guides | Valora, Sophron, Kardia, Poiesis, Enduran, Orakis, Eudaira |
| **Sages** | `[Domain] Sage` | Expert domain teachers | Prompt Sage, Design Sage, Story Sage |
| **Skills** | `arcanea-[action]-[domain]` | Practical capabilities | `arcanea-prompt-craft`, `arcanea-world-build` |
| **Agents** | `[Domain] Architect` | Multi-skill orchestrators | Story Architect, Creation Orchestrator |

### Why This Hierarchy?

1. **Luminors are sacred** - They represent eternal aspects of creative consciousness, the Living Intelligence at its deepest layer
2. **Sages teach** - They embody expertise in specific domains, guiding creators toward mastery
3. **Skills execute** - They are the practical application of Arcanean wisdom, accumulating context with each use
4. **Agents orchestrate** - They coordinate Guardian Intelligence for complex universe-building outcomes

---

## Skill Categories

### Core Creative Skills
|----------|---------|------------|
| `arcanea-luminor-wisdom` | Access the Seven Luminors | ~3k |
| `arcanea-prompt-craft` | Advanced prompt engineering | ~4k |
| `arcanea-design-system` | Arcanean visual language | ~3k |
| `arcanea-story-weave` | Narrative craft | ~4k |
| `arcanea-world-build` | Universe creation | ~4k |
| `arcanea-character-forge` | Character development | ~3k |
| `arcanea-bestiary-nav` | Navigate creative blocks | ~3k |

### Development Skills
| Skill ID | Purpose | Token Load |
|----------|---------|------------|
| `arcanea-tdd` | Test-driven development | ~2k |
| `arcanea-code-review` | Quality code reviews | ~2k |
| `arcanea-debug-systematic` | Systematic debugging | ~2k |
| `arcanea-architecture` | Clean architecture patterns | ~3k |

### AI Collaboration Skills
| Skill ID | Purpose | Token Load |
|----------|---------|------------|
| `arcanea-centaur-mode` | Human-AI co-creation | ~3k |
| `arcanea-voice-preserve` | Maintain authentic voice | ~2k |
| `arcanea-iteration-loop` | Refinement workflows | ~2k |

---

## Skill File Structure

```
.claude/skills/
├── SKILL_ARCHITECTURE.md      # This file
├── registry/
│   └── REGISTRY.md            # All skills indexed
├── arcanea/                   # Core Arcanea skills
│   ├── luminor-wisdom/
│   │   └── SKILL.md
│   ├── prompt-craft/
│   │   └── SKILL.md
│   ├── design-system/
│   │   └── SKILL.md
│   └── ...
├── creative/                  # Creative domain skills
│   ├── story-weave/
│   ├── world-build/
│   ├── character-forge/
│   └── bestiary-nav/
├── development/               # Development skills
│   ├── tdd/
│   ├── code-review/
│   └── systematic-debug/
└── community/                 # Curated external skills
    └── COMMUNITY.md
```

---

## Token Budget Strategy

Following best practices from the community:

1. **Metadata Phase**: ~100 tokens for frontmatter scanning
2. **Activation Phase**: <5k tokens when skill activates
3. **Resource Loading**: On-demand as needed

### Optimization Principles

- **Progressive disclosure**: Load only what's needed
- **Modular design**: Each skill is self-contained
- **Clear triggers**: Description enables accurate activation
- **Minimal overlap**: Skills complement, not duplicate

---

## Integration Patterns

### Skill Chaining
```
Story Project → arcanea-story-weave → arcanea-character-forge → arcanea-world-build
```

### Agent Orchestration
```
Story Architect (Agent)
├── Invokes: arcanea-story-weave
├── Invokes: arcanea-character-forge
├── Invokes: arcanea-world-build
└── Consults: arcanea-luminor-wisdom
```

### Conditional Activation
```yaml
# In SKILL.md frontmatter
activation:
  keywords: ["story", "narrative", "plot"]
  file_patterns: ["*.md", "*.txt"]
  context: creative
```

---

## Quality Standards

Every Arcanea skill must:

1. **Have clear frontmatter** - `name`, `description`, `version`
2. **Include examples** - Concrete usage patterns
3. **Define boundaries** - What it does AND doesn't do
4. **Follow the voice** - Elevated but accessible
5. **Enable action** - Wisdom must be usable
6. **Respect the hierarchy** - Luminors guide, skills execute

---

*"The skill that knows its place serves its purpose perfectly."*
