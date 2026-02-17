# .arc Language Specification

Version 1.0.0

## Overview

`.arc` is a prompt programming language for defining executable AI workflows. It enables composable, versionable, portable AI instructions that work across Claude Code, Cursor, and other AI-enabled editors.

## Why .arc?

| Feature | Benefit |
|---------|---------|
| **Executable** | .arc files run directly in AI environments |
| **Composable** | Import and extend other .arc files |
| **Versionable** | Prompt workflows as code in git |
| **Portable** | Works across AI tools and editors |
| **Typed** | Validate workflows before execution |

## Basic Syntax

### Simple Invocation

```arc
@mode create
@task "Write a product description"
@output markdown
```

### With Parameters

```arc
@mode analyze
@task "Review this codebase"
@depth deep
@focus [security, performance, architecture]
@output {
  format: report
  sections: [summary, findings, recommendations]
}
```

## Directives

| Directive | Purpose | Example |
|-----------|---------|---------|
| `@mode` | Set operational mode | `@mode create` |
| `@task` | Define the task | `@task "Build a character"` |
| `@depth` | Processing depth | `@depth shallow\|medium\|deep` |
| `@focus` | Areas of attention | `@focus [narrative, psychology]` |
| `@output` | Output configuration | `@output markdown` |
| `@spawn` | Create sub-agent | `@spawn depth-analyst as depth` |
| `@synthesize` | Combine outputs | `@synthesize [a, b, c] → result` |
| `@import` | Include other .arc | `@import ./base.arc` |
| `@extend` | Modify imported | `@extend with { key: value }` |
| `@if/@else/@endif` | Conditional logic | See below |

## Modes

```arc
# 7 core modes
@mode create      # Generate, ideate, bold new work
@mode analyze     # Evaluate, research, understand
@mode refine      # Edit, polish, perfect
@mode structure   # Architect, organize, plan
@mode express     # Communicate, document, voice
@mode vision      # Future-sight, possibilities
@mode orchestrate # Multi-mode coordination
```

## Agent Spawning

```arc
@mode orchestrate
@task "Create complete character"

# Spawn specialized agents
@spawn concept-generator as concept
@spawn psychology-analyst as psych
@spawn arc-designer as arc
@spawn voice-crafter as voice

# Each agent works in parallel
# Results available as concept.output, psych.output, etc.

# Synthesize into final output
@synthesize [concept, psych, arc, voice] → character

@output {
  format: character-bible
  include: [concept.output, psych.output, arc.output, voice.output]
}
```

## Conditionals

```arc
@mode analyze
@task "Review code"

# Analyze complexity first
@analyze complexity → score

@if score > 0.7
  @spawn security-analyst
  @spawn architecture-reviewer
  @spawn performance-auditor
@else
  @spawn quick-reviewer
@endif
```

## Composition

### Base Template (templates/character.arc)
```arc
@mode create
@task "Create character"
@output character-bible

@spawn concept-generator
@spawn psychology-analyst
```

### Extension
```arc
@import ./templates/character.arc
@extend with {
  world: "cyberpunk-2077",
  tone: "noir",
  depth: deep
}

# Add additional agents
@spawn world-context-analyst
```

## Pipelines

```arc
@pipeline character-creation

  @stage concept
    @mode create
    @task "Generate character concept"
    @output → concept_data

  @stage psychology
    @mode analyze
    @input concept_data
    @task "Develop psychological profile"
    @output → psych_data

  @stage refinement
    @mode refine
    @input [concept_data, psych_data]
    @task "Polish and integrate"
    @output → final_character

@return final_character
```

## Variables and Context

```arc
@context {
  world: "arcanea",
  genre: "fantasy",
  tone: "epic"
}

@mode create
@task "Write scene in {context.world}"
# Variables interpolate at runtime
```

## Output Formats

```arc
# Simple
@output markdown

# Structured
@output {
  format: json
  schema: ./schemas/character.json
}

# Multiple outputs
@output [
  { format: markdown, file: ./output/character.md },
  { format: json, file: ./output/character.json }
]
```

## Error Handling

```arc
@mode create
@task "Generate content"

@on error
  @retry 3
  @fallback "Unable to generate. Try simpler prompt."
@end
```

## File Extension

- `.arc` - Standard Arcanea workflow file
- `.arcx` - Extended/experimental features
- `.arct` - Template file (meant for import)

## Tooling

### VS Code Extension (planned)
- Syntax highlighting
- Autocomplete for directives
- Agent name suggestions
- Validation on save
- Run .arc files directly

### CLI
```bash
arcanea run workflow.arc
arcanea validate workflow.arc
arcanea compile workflow.arc → workflow.json
```

## Best Practices

1. **One task per file** - Keep .arc files focused
2. **Use templates** - Common patterns in `templates/`
3. **Name agents clearly** - `@spawn security-analyst` not `@spawn agent1`
4. **Document with comments** - `# This handles edge cases`
5. **Version your workflows** - Treat .arc as code

## Examples

### Simple Content Generation
```arc
@mode create
@task "Write blog post about AI collaboration"
@depth medium
@output markdown
```

### Code Review
```arc
@mode analyze
@task "Review pull request"
@focus [security, performance, readability]
@output {
  format: review
  sections: [summary, issues, suggestions, approval]
}
```

### World Building
```arc
@mode orchestrate
@task "Design fantasy world"
@depth deep

@spawn geography-designer as geo
@spawn culture-creator as culture
@spawn history-weaver as history
@spawn magic-system-architect as magic

@synthesize [geo, culture, history, magic] → world

@output {
  format: world-bible
  sections: [overview, geography, cultures, history, magic, conflicts]
}
```

---

*".arc makes AI workflows reproducible, shareable, and beautiful."*
