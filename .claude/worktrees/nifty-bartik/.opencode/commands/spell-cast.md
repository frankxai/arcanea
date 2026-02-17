---
name: spell-cast
description: Cast an .arc spell file
---

# Cast Arcanea Spell

## Usage

```
/spell-cast <path-to-spell-file>
```

## What is a Spell?

An `.arc` file contains:
- Agent invocation configuration
- Parameter definitions
- Template implementation
- Execution instructions

## Example Spell File

```arc
@spell character-profile
@description "Generate a complete character profile"
@agent depth
@frequency 396Hz

@parameters {
  "name": "string",
  "archetype": "string",
  "conflict": "string"
}

@implementation
Create a character profile for {{name}} who is a {{archetype}}.
Their core conflict: {{conflict}}.

Include:
- Psychological profile
- Backstory summary
- Motivations and fears
- Character arc potential
@end
```

## Casting Process

1. Load `.arc` file
2. Parse @spell metadata
3. Extract @parameters
4. Prompt user for parameter values (or use defaults)
5. Build final prompt with @implementation template
6. Invoke specified @agent
7. Return formatted output

## Usage Examples

### Cast from file
```
/spell-cast spells/character-profile.arc
```

### With inline parameters
```
/spell-cast spells/character-profile.arc --name "Kira" --archetype "rebel"
```

### Interactive (prompts for parameters)
```
/spell-cast spells/character-profile.arc --interactive
```

## Creating Spells

Create a new `.arc` file in `spells/` directory:

```bash
# Template
@spell <name>
@description "<description>"
@agent <agent-name>
@frequency <freq>Hz

@parameters {
  "param1": "type",
  "param2": "type"
}

@implementation
{{template with {{param1}} substitutions}}
@end
```

## Spell Library

Built-in spells:
- `character-profile.arc` - Full character generation
- `world-overview.arc` - World building summary
- `plot-outline.arc` - Story structure
- `dialogue-scene.arc` - Conversation writing
- `magic-system.arc` - Magic system design

User spells in:
- `./spells/` (project-specific)
- `~/.arcanea/spells/` (user library)

## Advanced: Spell Composition

Spells can chain agents:

```arc
@spell epic-world
@description "Create complete world with multiple agents"

@workflow
phase1: @structure - foundation
phase2: @vision + @depth (parallel) - exploration
phase3: @fusion - synthesis
phase4: @refinement - polish
@end
```
