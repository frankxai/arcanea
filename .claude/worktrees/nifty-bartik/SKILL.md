# Arcanea Skill System

Skills are discrete, reusable capabilities that agents invoke. Each skill has clear inputs, outputs, and purpose.

## Skill Categories

| Category | Purpose | Example Skills |
|----------|---------|----------------|
| **Creative** | Generate new content | write.narrative, design.concept, create.character |
| **Analytical** | Evaluate and understand | analyze.coherence, research.thematic, evaluate.audience |
| **Structural** | Organize and architect | design.structure, plan.timeline, organize.information |
| **Expressive** | Communicate and voice | write.dialogue, translate.complex, narrate.voice |
| **Transformative** | Adapt and evolve | transform.style, evolve.concept, adapt.medium |
| **Integration** | Coordinate and combine | orchestrate.workflow, synthesize.outputs, coordinate.team |

## Skill Definition Format

Skills are defined in `.arc` format:

```arc
@skill write.narrative
@version 1.0.0
@category creative
@mode create

@description
  Creates flowing narrative content with emotional resonance.

@parameters
  type: story | poem | script | article
  tone: string        # emotional quality
  length: number      # word count target
  structure: string   # narrative arc type

@output
  format: markdown
  metadata: [word_count, reading_time, themes]

@example
  @invoke write.narrative
  @with {
    type: "short_story",
    tone: "melancholic",
    length: 2000
  }
```

## Core Skills

### Creative Skills

**write.narrative**
```arc
@invoke write.narrative
@with { type: "story", tone: "hopeful", length: 1500 }
```

**design.concept**
```arc
@invoke design.concept
@with { subject: "character", style: "minimalist", variations: 3 }
```

**create.character**
```arc
@invoke create.character
@with {
  archetype: "mentor",
  traits: ["wise", "scarred", "hopeful"],
  role: "supporting"
}
```

### Analytical Skills

**analyze.coherence**
```arc
@invoke analyze.coherence
@with {
  target: "./chapter-3.md",
  aspects: [logic, timeline, character],
  strictness: "standard"
}
```

**research.thematic**
```arc
@invoke research.thematic
@with {
  content: "./manuscript.md",
  depth: "deep",
  framework: "psychological"
}
```

### Structural Skills

**design.structure**
```arc
@invoke design.structure
@with {
  content_type: "narrative",
  scale: "book",
  requirements: ["three-act", "dual-timeline"]
}
```

**plan.timeline**
```arc
@invoke plan.timeline
@with {
  project: "novel-draft",
  phases: ["outline", "draft", "revision", "polish"],
  milestones: ["chapter-complete", "beta-ready"]
}
```

### Expressive Skills

**write.dialogue**
```arc
@invoke write.dialogue
@with {
  characters: ["protagonist", "antagonist"],
  situation: "confrontation",
  subtext: "hidden respect"
}
```

**translate.complex**
```arc
@invoke translate.complex
@with {
  content: "./technical-doc.md",
  audience: "general",
  preserve: ["accuracy", "core-meaning"]
}
```

### Transformative Skills

**transform.style**
```arc
@invoke transform.style
@with {
  content: "./draft.md",
  target_style: "hemingway",
  degree: "moderate"
}
```

**evolve.concept**
```arc
@invoke evolve.concept
@with {
  seed: "time-traveling detective",
  direction: "darker",
  iterations: 5
}
```

## Skill Composition

Skills can be combined into workflows:

```arc
@workflow character-creation

  @stage 1
    @invoke create.character
    @output → raw_character

  @stage 2
    @invoke analyze.coherence
    @input raw_character
    @output → validated

  @stage 3
    @invoke write.narrative
    @with { type: "backstory" }
    @input validated
    @output → final

@return final
```

## Triggers

Skills can be auto-invoked by triggers:

```arc
@trigger on-file-create
@pattern "*.character.arc"
@invoke analyze.coherence
@with { aspects: [consistency, depth] }
```

```arc
@trigger scheduled
@cron "0 9 * * *"
@invoke research.thematic
@with { content: "./current-project/" }
```

## Creating New Skills

```arc
@skill my.custom-skill
@version 1.0.0
@category creative
@mode create

@description
  Brief description of what this skill does.

@parameters
  param1: type    # description
  param2: type    # description

@output
  format: output-type

@implementation
  1. Validate parameters
  2. Execute core logic
  3. Format output
  4. Return result
```

## Skill Registry

Skills are registered in `core/skills/` with this structure:

```
core/skills/
├── creative/
│   ├── write.narrative.arc
│   ├── design.concept.arc
│   └── create.character.arc
├── analytical/
│   ├── analyze.coherence.arc
│   └── research.thematic.arc
├── structural/
│   ├── design.structure.arc
│   └── plan.timeline.arc
├── expressive/
│   ├── write.dialogue.arc
│   └── translate.complex.arc
├── transformative/
│   ├── transform.style.arc
│   └── evolve.concept.arc
└── integration/
    ├── orchestrate.workflow.arc
    └── synthesize.outputs.arc
```

## Best Practices

1. **Single purpose** - Each skill does one thing well
2. **Clear parameters** - Document what each input means
3. **Composable** - Skills should chain naturally
4. **Testable** - Include example invocations
5. **Versioned** - Track changes over time

---

For the full .arc language specification, see `spec/arc-language.md`.
