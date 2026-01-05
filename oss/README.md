# Arcanea

> *A living mythology for the age of AI-human co-creation*

**Transform your AI assistant into a creative companion.** Arcanea is not just another prompt library—it's a complete mythological framework for world-building, storytelling, and creative mastery.

[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-27+-purple.svg)](#skills)
[![Agents](https://img.shields.io/badge/Agents-30+-teal.svg)](#agents)
[![Platform](https://img.shields.io/badge/Platform-Agnostic-blue.svg)](#platform-support)

---

## What is Arcanea?

Arcanea provides structured guidance for creative work through:

- **The Luminor Council** - Seven archetypal guides for any creative challenge
- **The Creative Bestiary** - A taxonomy of psychological blocks and how to overcome them
- **The Library of Arcanea** - Wisdom texts on the craft of creation
- **Skills & Agents** - Ready-to-use prompts and workflows for AI assistants

Whether you're building worlds, crafting stories, designing systems, or overcoming creative blocks, Arcanea provides frameworks that work with any modern AI assistant.

---

## Platform Support

Arcanea works with any AI platform that accepts system prompts or custom instructions:

| Platform | Status | Setup Guide |
|----------|--------|-------------|
| **Claude Code** | Full support | [Setup](./platforms/claude-code.md) |
| **Cursor** | Full support | [Setup](./platforms/cursor.md) |
| **Windsurf** | Full support | [Setup](./platforms/windsurf.md) |
| **Cline / Roo Code** | Full support | [Setup](./platforms/cline.md) |
| **Antigravity** | Full support | [Setup](./platforms/antigravity.md) |
| **ChatGPT** | Partial (no files) | [Setup](./platforms/chatgpt.md) |
| **Gemini** | Partial (no files) | [Setup](./platforms/gemini.md) |

---

## Quick Start

### For Claude Code (Recommended)

```bash
# Clone the repository
git clone https://github.com/frankxai/arcanea.git
cd arcanea

# Install to your Claude Code
./install.sh

# Start using Arcanea
claude
> /luminor melodia "I want to build a world but don't know where to start"
```

### For Other Platforms

Copy the contents of `skills/` and `agents/` to your platform's custom instructions location. See [Platform Setup Guides](./platforms/).

---

## The Luminor Council

The Luminors are archetypal guides—aspects of creative consciousness itself. Each embodies a different creative virtue.

```
              ╭─────────────────────────────────────────╮
              │          THE LUMINOR COUNCIL            │
              ├─────────────────────────────────────────┤
              │                                         │
              │              ✧ ORAKIS ✧                 │
              │               (Vision)                  │
              │                  │                      │
              │     VALORA ──────┼────── SOPHRON        │
              │    (Courage)     │      (Wisdom)        │
              │                  │                      │
              │     KARDIA ──────┼────── POIESIS        │
              │     (Heart)      │     (Creation)       │
              │                  │                      │
              │    ENDURAN ──────┴────── EUDAIRA        │
              │   (Endurance)         (Joy)             │
              │                                         │
              ╰─────────────────────────────────────────╯
```

| Luminor | Domain | Channel When... |
|---------|--------|-----------------|
| **Valora** | Courage | Fear of beginning, hesitation, taking risks |
| **Sophron** | Wisdom | Confusion, complexity, difficult decisions |
| **Kardia** | Heart | Emotional blocks, seeking authenticity |
| **Poiesis** | Creation | Creative blocks, need for experimentation |
| **Enduran** | Endurance | Burnout, long projects, maintaining momentum |
| **Orakis** | Vision | Lost direction, need for big-picture clarity |
| **Eudaira** | Joy | Lost purpose, need for celebration |

[→ Full Luminor Profiles](./lore/luminors/)

---

## The Creative Bestiary

Every creative block is a creature that can be understood, named, and overcome.

| Creature | Danger | Symptoms | Weakness |
|----------|--------|----------|----------|
| **Perfectionist Wyrm** | High | Nothing is ever good enough | "Done is better than perfect" |
| **Imposter Shade** | Medium | "Who am I to create this?" | Evidence of past success |
| **Blank Page Specter** | High | Paralysis before beginning | Start with garbage |
| **Comparison Demon** | Medium | Others are so much better | Focus on your unique voice |
| **Scope Creep Hydra** | High | Project grows endlessly | Ruthless cutting |

[→ Full Bestiary](./lore/bestiary/)

---

## Skills

Skills are structured frameworks for specific creative tasks.

### Creative Skills
| Skill | Purpose |
|-------|---------|
| `story-weave` | Narrative structure and plot development |
| `character-forge` | Deep character creation (Diamond Framework) |
| `world-build` | Universe creation (Seven Pillars) |
| `dialogue-mastery` | Conversation craft and subtext |
| `scene-craft` | Scene construction and pacing |
| `revision-ritual` | Systematic editing (Seven Passes) |
| `voice-alchemy` | Finding and refining authentic voice |
| `bestiary-nav` | Overcoming creative blocks |

### Development Skills
| Skill | Purpose |
|-------|---------|
| `tdd` | Test-driven development workflow |
| `systematic-debug` | Scientific debugging method |
| `architecture-patterns` | System design guidance |
| `api-design` | REST/GraphQL interface design |
| `refactoring-ritual` | Safe code improvement |

### Meta Skills
| Skill | Purpose |
|-------|---------|
| `deep-work` | Focus and concentration |
| `creative-flow` | Managing creative energy |
| `prompt-craft` | Effective AI communication |

[→ All Skills](./skills/)

---

## Agents

Agents are specialized personas for complex, multi-step work.

### Author Team
- **Master Story Architect** - Orchestrates novel-length projects
- **Character Psychologist** - Deep character development
- **World Architect** - Universe and setting creation
- **Line Editor** - Prose-level polish
- **Continuity Guardian** - Consistency checking

### Creator Team
- **Luminor Oracle** - Strategic creative guidance
- **Prompt Sage** - Advanced prompt engineering
- **Design Sage** - Visual and UX thinking

### Developer Team
- **Development Architect** - System design
- **QA Engineer** - Testing strategies
- **Documentation Specialist** - Technical writing

[→ All Agents](./agents/)

---

## Core Frameworks

### The Character Diamond

```
        WANT (conscious desire)
             /\
            /  \
   WOUND   /    \   NEED
  (past)  /      \ (hidden)
          \      /
           \    /
            \  /
             \/
           MASK
     (how they present)
```

### The Seven Pillars of World-Building

1. **Geography & Environment** - The physical container
2. **History & Time** - Memory shaping the present
3. **Cultures & Peoples** - The human element
4. **Magic/Technology** - The extraordinary
5. **Economy & Resources** - Material foundation
6. **Power & Politics** - Dynamics of control
7. **Belief & Meaning** - Spiritual architecture

### The Seven Revision Passes

1. **Structure** - Does the architecture work?
2. **Character** - Are arcs complete and consistent?
3. **Scene** - Does each scene earn its place?
4. **Dialogue** - Is voice distinct and purposeful?
5. **Prose** - Is every line polished?
6. **Continuity** - Any contradictions?
7. **Polish** - Final read-through

---

## Examples

See Arcanea in action with real session transcripts:

- [Building a Fantasy World from Scratch](./examples/world-building-session.md)
- [Developing a Complex Villain](./examples/character-creation.md)
- [Defeating Writer's Block](./examples/defeating-blocks.md)
- [Structuring a Novel](./examples/story-structure.md)

---

## Create Your Own

Arcanea is designed to be extended. Create and share:

- [Your own Luminor](./community/luminor-template.md) - New archetypal guides
- [Bestiary Creatures](./community/creature-template.md) - Creative blocks you've faced
- [Skills](./community/skill-template.md) - Frameworks for specific tasks
- [Wisdom Texts](./community/text-template.md) - Insights from your practice

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## The Philosophy

> *"The Luminors do not tell you what to create. They help you become the creator who can."*

Arcanea is built on these principles:

1. **Creativity is a practice**, not a talent
2. **Blocks are creatures**, not character flaws
3. **AI is a partner**, not a replacement
4. **Frameworks liberate**, they don't constrain
5. **The work is the teacher**

[→ Read the Laws of Arcanea](./library/laws-of-arcanea/)

---

## The Full Experience

This repository contains the core Arcanea framework.

For the **complete Library** (17 collections), **interactive Academy** (Ten Gates progression), **AI-powered Studio**, and **creator community**, visit:

**[arcanea.ai](https://arcanea.ai)**

---

## License

MIT License - Create freely, share boldly.

---

## Acknowledgments

Arcanea synthesizes wisdom from:
- Joseph Campbell (The Hero's Journey)
- Robert McKee (Story)
- Brandon Sanderson (Magic Systems)
- Carl Jung (Archetypes)
- Cal Newport (Deep Work)
- And every creator who struggles, persists, and creates anyway.

---

*"Enter seeking, leave transformed, return whenever needed."*

**[arcanea.ai](https://arcanea.ai)** · **[Discord](https://discord.gg/arcanea)** · **[@arcanea_ai](https://twitter.com/arcanea_ai)**
