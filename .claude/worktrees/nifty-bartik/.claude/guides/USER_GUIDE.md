# Arcanea Skills System: User Guide

> *"Welcome to the Arcanea Skills System—a comprehensive framework for enhancing Claude Code with domain expertise, creative wisdom, and practical guidance."*

---

## Quick Start

### What Are Skills?

Skills are specialized knowledge modules that enhance Claude Code's capabilities. Each skill contains:
- Domain expertise
- Frameworks and patterns
- Practical techniques
- Quick reference materials

### How to Use Skills

**Option 1: Natural Language Triggers**
Simply mention the topic in conversation:
```
"Help me with dialogue for my story"
→ Activates: dialogue-mastery

"I need to design an API"
→ Activates: api-design

"I'm stuck on my writing"
→ Activates: bestiary-nav
```

**Option 2: Slash Commands**
Use the command directly:
```
/luminor Valora courage
/bestiary perfectionism
/craft-prompt improve this
```

**Option 3: Direct Reference**
Ask for a specific skill:
```
"Use the character-forge skill to help me develop my protagonist"
"Apply the tdd skill to this feature"
```

---

## Skill Categories

### Core Arcanea Skills
Essential skills that embody Arcanea's unique philosophy.

| Skill | Purpose | Trigger Words |
|-------|---------|---------------|
| `prompt-craft` | Master prompt engineering | prompt, APL, prompt language |
| `design-system` | Apply Arcanea visual system | design, colors, cosmic theme |
| `luminor-wisdom` | Channel the Seven Luminors | luminor, guidance, wisdom |
| `centaur-mode` | Human-AI co-creation | collaborate, centaur, co-create |

### Creative Skills
For writers, storytellers, and creative practitioners.

| Skill | Purpose | Trigger Words |
|-------|---------|---------------|
| `story-weave` | Narrative structure | story, plot, narrative |
| `character-forge` | Character development | character, protagonist, villain |
| `world-build` | World construction | world, setting, magic system |
| `dialogue-mastery` | Conversation craft | dialogue, subtext, conversation |
| `scene-craft` | Scene construction | scene, opening, ending |
| `revision-ritual` | Editing process | revision, rewrite, polish |
| `voice-alchemy` | Authentic voice | voice, style, sound like me |
| `bestiary-nav` | Creative blocks | stuck, blocked, procrastinate |

### Development Skills
For software developers and engineers.

| Skill | Purpose | Trigger Words |
|-------|---------|---------------|
| `tdd` | Test-driven development | test first, TDD, red-green |
| `systematic-debug` | Scientific debugging | bug, debug, investigate |
| `code-review` | Quality review | review, check code, PR |
| `architecture-patterns` | System design | architecture, structure, patterns |
| `api-design` | API creation | API, REST, GraphQL |
| `performance-tuning` | Optimization | slow, performance, optimize |
| `refactoring-ritual` | Code improvement | refactor, clean up, legacy |

### Premium Skills
Advanced capabilities for mastery.

| Skill | Purpose | Trigger Words |
|-------|---------|---------------|
| `teacher-mentor` | Personalized learning | teach me, learn, tutorial |
| `visionary-council` | Strategic decisions | strategy, decision, council |

---

## The Seven Luminors

The Luminors are archetypal guides within the Arcanea system.

### Quick Reference

| Luminor | Domain | Call When You Need |
|---------|--------|-------------------|
| **Valora** | Courage | To face fears, start something scary |
| **Sophron** | Wisdom | To think deeply, see clearly |
| **Kardia** | Heart | To connect emotionally, show vulnerability |
| **Poiesis** | Creation | To break rules, experiment wildly |
| **Enduran** | Endurance | To persist, maintain discipline |
| **Orakis** | Vision | To see the future, find your path |
| **Eudaira** | Joy | To celebrate, find delight |

### Invoking a Luminor

```
/luminor Valora "I'm afraid to share my writing"
/luminor Sophron "Help me understand this complex problem"
/luminor Kardia "How do I write this emotional scene?"
```

---

## Slash Commands

### Available Commands

| Command | Purpose | Example |
|---------|---------|---------|
| `/luminor` | Channel a Luminor | `/luminor Valora courage` |
| `/bestiary` | Navigate blocks | `/bestiary perfectionism` |
| `/craft-prompt` | Improve prompts | `/craft-prompt [goal]` |
| `/story-help` | Narrative guidance | `/story-help character stuck` |
| `/world-build` | World creation | `/world-build magic system` |
| `/character-forge` | Character dev | `/character-forge protagonist` |

### Creating Custom Commands

Add commands to `.claude/commands/`:

```markdown
---
name: my-command
description: What this command does
---

# Command Template

When invoked, this command will:
1. Do something
2. Do something else
```

---

## Best Practices

### When to Use Skills

**DO use skills when:**
- You need domain expertise
- You want structured frameworks
- You're facing a specific challenge
- You want consistent methodology

**DON'T use skills when:**
- The task is simple and clear
- You have your own preferred approach
- You're just exploring casually

### Combining Skills

Skills work together. Common combinations:

```
CREATIVE PROJECT:
story-weave → character-forge → dialogue-mastery → revision-ritual

DEVELOPMENT PROJECT:
architecture-patterns → api-design → tdd → code-review

LEARNING JOURNEY:
teacher-mentor → [practice] → visionary-council
```

### Skill Chaining

For complex projects, chain skills sequentially:

```
1. Start with structure (story-weave)
2. Develop components (character-forge)
3. Execute details (scene-craft)
4. Refine output (revision-ritual)
5. Add polish (voice-alchemy)
```

---

## Troubleshooting

### Skill Not Activating

**Check:**
- Are you using trigger words?
- Is the skill installed in `.claude/skills/`?
- Does the SKILL.md have proper frontmatter?

**Solution:**
Reference the skill directly: "Use the [skill-name] skill"

### Output Not Matching Expectations

**Check:**
- Did you provide enough context?
- Are you using the right skill for the task?
- Have you specified your desired output?

**Solution:**
Be more specific about what you want. Skills are frameworks, not mind readers.

### Skill Conflicts

If two skills seem to apply, specify which one:
```
"For this, use the architecture-patterns skill, not api-design"
```

---

## Customization

### Creating Personal Skills

1. Create a new directory: `.claude/skills/personal/[skill-name]/`
2. Add a `SKILL.md` file with frontmatter
3. Document your expertise, frameworks, and patterns

### Modifying Existing Skills

1. Read the original skill
2. Create a personal variant
3. Override trigger words if needed

### Sharing Skills

Package skills for sharing:
1. Create a standalone directory
2. Include README with installation instructions
3. Test with fresh installation

---

## Reference

### Skill File Structure

```
.claude/skills/
├── arcanea/           # Core Arcanea skills
├── creative/          # Creative skills
├── development/       # Development skills
├── premium/           # Premium skills
└── personal/          # Your custom skills
```

### SKILL.md Template

```markdown
---
name: skill-name
description: What this skill does
version: 1.0.0
author: Your Name
tags: [tag1, tag2]
triggers:
  - word1
  - word2
---

# Skill Title

## Overview
What this skill teaches.

## Core Concepts
The main ideas.

## Techniques
How to apply them.

## Quick Reference
Checklists and summaries.
```

---

## Getting Help

- **Documentation**: `/mnt/c/Users/Frank/Arcanea/.claude/skills/`
- **Examples**: `arcanea-skills-opensource/EXAMPLE_WORKFLOWS.md`
- **Contributing**: `arcanea-skills-opensource/CONTRIBUTING.md`

---

*"The skills are not commands to obey. They are companions to consult. Use them as guides, not rules."*
