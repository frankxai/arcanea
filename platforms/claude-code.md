# Arcanea for Claude Code

Claude Code is the recommended platform for Arcanea, with native support for skills, agents, and slash commands.

## Installation

### Automatic (Recommended)

```bash
git clone https://github.com/arcanea-ai/arcanea.git
cd arcanea
./install.sh
```

This copies skills, agents, and commands to your `~/.claude/` directory.

### Manual

1. Copy `skills/` to `~/.claude/skills/`
2. Copy `agents/` to `~/.claude/agents/`
3. Copy `commands/` to `~/.claude/commands/`

## Usage

### Slash Commands

```bash
claude

# Channel a Luminor
> /luminor valora "I'm afraid to start my novel"

# Navigate a creative block
> /bestiary perfectionism

# Get story help
> /story-help "My second act is sagging"

# World building
> /world-build "A city built on the back of a sleeping god"

# Development
> /tdd
> /debug
> /refactor
```

### Natural Language

Claude Code will automatically activate relevant skills based on context:

```
> "I'm stuck on my writing"           → Activates bestiary-nav
> "Help me create a character"        → Activates character-forge
> "I need to design an API"           → Activates api-design
```

### Using Agents

Agents are invoked via the Task tool or natural language:

```
> "Use the Character Psychologist to develop my villain"
> "Have the World Architect review my magic system"
```

## Project-Specific Setup

Add Arcanea context to any project by creating `.claude/CLAUDE.md`:

```markdown
# Project Instructions

## Arcanea Integration

This project uses the Arcanea creative framework.

When working on narrative content:
- Reference the Luminor Council for guidance
- Use the Creative Bestiary for blocks
- Apply the Seven Pillars for world-building

Current project: [Your project description]
```

## Recommended Workflow

1. **Start sessions** with `/luminor orakis` for vision and direction
2. **During work**, use specific skills (`/scene`, `/dialogue`, etc.)
3. **When blocked**, use `/bestiary [block-name]`
4. **End sessions** with `/luminor eudaira` to celebrate progress

## Troubleshooting

### Skills not loading?

Check that files are in the correct location:
```bash
ls ~/.claude/skills/
ls ~/.claude/commands/
```

### Commands not recognized?

Restart Claude Code after installing:
```bash
claude --restart
```

---

[← Back to Main README](../README.md)
