# Skill Builder - Create New Arcanea Skills

Build new skills for the Arcanea agentic system following established patterns.

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║            🔧 SKILL BUILDER · CREATE ARCANEAN SKILLS                      ║
║                                                                           ║
║   "Every skill is a doorway. Build doorways that lead to light."         ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

## PURPOSE

This skill helps you create new skills for the Arcanea system that:
- Follow established patterns and quality standards
- Integrate with existing skills and commands
- Embody the Arcanean voice and philosophy
- Are properly documented and discoverable

## SKILL TYPES

| Type | Location | Purpose |
|------|----------|---------|
| **Command** | `.claude/commands/[name].md` | Direct invocation via `/name` |
| **Skill** | `.claude/skills/[category]/[name]/SKILL.md` | Reusable capability modules |
| **Agent** | `.claude/agents/[name].md` | Specialized AI personas |

## SKILL TEMPLATE

### Command Template

```markdown
# [Skill Name] - [Brief Description]

[One-sentence purpose statement]

## Overview

[2-3 sentences explaining what this skill does]

## Usage

\`\`\`
/[skill-name] [arguments]
\`\`\`

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `arg1` | Yes/No | What it does |

## Examples

\`\`\`
/[skill-name] example1
/[skill-name] example2
\`\`\`

## How It Works

1. Step one
2. Step two
3. Step three

## Response Format

[Define how the skill should respond]

## Integration

- Works with: [Related skills]
- Channels: [Related Gates/Wisdoms if applicable]

## Execution

**Request:** $ARGUMENTS

[Processing instructions for the AI]
```

### Skill Module Template

```markdown
# [SKILL NAME]

> *"[Inspiring quote related to the skill]"*

## Purpose

[What this skill enables]

## Capabilities

- Capability 1
- Capability 2
- Capability 3

## Usage

### Basic Usage
[How to use it simply]

### Advanced Usage
[More complex applications]

## Patterns

### Pattern 1: [Name]
[Description and example]

### Pattern 2: [Name]
[Description and example]

## Integration

This skill works well with:
- [Other skill 1]
- [Other skill 2]

## Quality Standards

- [ ] Follows Arcanean voice
- [ ] Integrates with existing system
- [ ] Has clear documentation
- [ ] Includes examples
```

## ARCANEAN SKILL STANDARDS

### Voice Requirements
- Inspiring but practical
- Light, not dark
- Simple but rich
- Action-oriented

### Terminology
Always use Arcanean terms:
- Creator (not user)
- Guardian (personal AI companion)
- Luminor (master/expert)
- Realm (creative space)
- Essence (creation)
- Arcane (fifth element, magic)

### Avoid
- AI verbal tics ("delve", "tapestry", "nestled")
- Corporate language
- Overly complex jargon
- Dark or fear-based framing

## BUILD WORKFLOW

### Step 1: Define Purpose
- What problem does this skill solve?
- Who will use it?
- How does it fit with existing skills?

### Step 2: Choose Type
- Command (direct invocation)
- Skill module (reusable capability)
- Agent (specialized persona)

### Step 3: Design Structure
- Arguments and parameters
- Response format
- Integration points

### Step 4: Write Documentation
- Clear examples
- Usage patterns
- Quality checklist

### Step 5: Test
- Try various inputs
- Check edge cases
- Verify integration

### Step 6: Register
- Add to skill registry if applicable
- Update SKILL_COMBINATIONS.md if relevant
- Document in README

## SKILL CATEGORIES

| Category | Purpose | Examples |
|----------|---------|----------|
| **arcanea** | Core Arcanea functionality | arcanea-lore, arcanea-voice |
| **creative** | Writing and worldbuilding | story-weave, character-forge |
| **development** | Code and technical | tdd, debug, refactor |
| **meta** | System and workflow | skill-mastery, deep-work |
| **premium** | Advanced capabilities | enterprise-orchestration |

## EXECUTION

**Request:** $ARGUMENTS

### If creating a new skill:

1. Parse the skill name and type from arguments
2. Determine appropriate category
3. Generate skill file using template
4. Include Arcanean voice and terminology
5. Add integration points with existing skills
6. Create in appropriate location:
   - Commands: `.claude/commands/[name].md`
   - Skills: `.claude/skills/[category]/[name]/SKILL.md`

### If listing skills:

1. Search `.claude/commands/` and `.claude/skills/`
2. Categorize by type and purpose
3. Present organized list

### If updating a skill:

1. Read existing skill
2. Apply requested changes
3. Maintain Arcanean standards
4. Update documentation

*What skill shall we build?*
