# Create Character Workflow

> **Command**: `/create-character [name] [--world world-name] [--role protagonist|antagonist|supporting]`
> **Agents**: character-weaver (lead) + specialists (parallel)
> **Output**: Complete character profile with relationships

## Quick Start

```
/create-character "Kael Stormborn" --world "Arcanea" --role protagonist
```

## Step 1: Character Concept

Provide a 1-2 sentence concept for your character:

**Example**: "A warrior haunted by the war they won, now seeking redemption through protecting others"

**Your Concept**:
[Describe your character idea here]

## Step 2: World Context

**World Name**: [Enter world name]
**Birthplace**: [Location name]
**Culture**: [Culture name]

## Step 3: Quick Profile

| Attribute | Value |
|-----------|-------|
| **Name** | [Full name] |
| **Role** | Protagonist / Antagonist / Supporting |
| **Age** | [Number or description] |
| **Species** | Human / [Other race] |
| **Occupation** | [What they do] |
| **Core Motivation** | [What drives them] |
| **Fatal Flaw** | [Their weakness] |

## Step 4: Parallel Agent Orchestration

```typescript
// Primary agent creates core profile
const mainTask = background_task("character-weaver", `
  Create comprehensive character profile for [name]:
  
  CONCEPT: [user's concept]
  WORLD: [world-name]
  BIRTHPLACE: [location]
  CULTURE: [culture]
  
  Include:
  - Full backstory aligned with world timeline
  - Personality using psychological frameworks
  - Goals, fears, and internal conflicts
  - Skills and abilities (balanced)
  - Physical description
  - Voice and speech patterns
  
  Reference:
  - foundations/history-timeline.md for age/events
  - cultures/[culture].arc for cultural behavior
  - foundations/magic-system.md if magical abilities
`)

// Parallel specialists add depth
background_task("culture-anthropologist", `
  Define how [culture] shapes [character]:
  - Cultural values they embody
  - Cultural values they reject
  - Naming conventions
  - Speech patterns
  - Customs they follow
`)

background_task("timeline-historian", `
  Place [character] in timeline:
  - Birth year calculation
  - Age at major world events
  - Personal milestones
  - Historical events they witnessed
`)

background_task("conflict-dramatist", `
  Design internal conflicts for [character]:
  - Central internal struggle
  - Moral dilemmas they face
  - Relationship tensions
  - Growth arc potential
`)

// If magical character
if (character_has_magic) {
  background_task("magic-systems", `
    Define magical abilities for [character]:
    - Elemental affinity
    - Power level and limitations
    - Costs they've paid
    - Magical training history
  `)
}
```

## Step 5: Relationship Mapping

After core profile, establish relationships:

```typescript
// Find existing characters in world
const existingCharacters = await grep("entity_type: character", "**/*.arc")

// Generate relationship suggestions
background_task("character-weaver", `
  Create relationships between [new-character] and existing cast:
  ${existingCharacters.map(c => `- ${c.name}: [suggested relationship]`).join('\n')}
  
  Include at least:
  - 1 ally/friend
  - 1 rival/enemy
  - 1 mentor or student
  - 1 romantic interest (if appropriate)
`)

// Ensure reciprocal relationships
for (relationship of new_relationships) {
  await add_reciprocal_relationship(relationship.target, new_character)
}
```

## Step 6: Validation & Integration

```typescript
// Validate character consistency
await invoke_agent("lore-master", `
  Validate [character] against world canon:
  - Timeline consistency
  - Cultural alignment
  - Magic system compliance
  - Relationship validity
`)

// Generate final files
await create_character_files(character, {
  profile: `characters/${slug}/profile.arc`,
  relationships: `characters/${slug}/relationships.md`,
  arc: `characters/${slug}/character-arc.md`
})

// Update indexes
await update_file("characters/_index.md", add_character_entry)
```

## Output Structure

```
characters/[character-slug]/
├── profile.arc           # Main character file (ARC format)
├── relationships.md      # Relationship map
├── character-arc.md      # Growth/story arc
└── gallery/              # Character images (if generated)
```

## Character Profile Template

The generated `.arc` file will include:

```yaml
---
arc_version: "1.0"
entity_type: "character"
created: "[timestamp]"
modified: "[timestamp]"
creator: "[author]"
world: "[world-name]"
status: "draft"

# Character basics
full_name: "[Name]"
aliases: ["[nickname]", "[title]"]
species: "[race]"
gender: "[gender]"
age: [number]
birth_year: "[world-year]"

# Affiliations
homeland: "[location-id]"
culture: "[culture-id]"
faction: "[faction-id]"
occupation: "[role]"

# Relationships
related_entities:
  - type: "character"
    id: "[ally-id]"
    relationship: "ally"
  - type: "location"
    id: "[homeland-id]"
    relationship: "birthplace"

tags: ["protagonist", "mage", "noble"]
categories: ["characters", "main-cast"]
---

# [Character Name]

## Overview
[2-3 paragraph summary]

## Physical Description
[Detailed appearance]

## Personality
[Psychological profile]

## Backstory
[Life history]

## Goals & Motivations
[What drives them]

## Relationships
[Key connections]

## Abilities & Skills
[Capabilities]

## Character Arc
[Growth potential]
```

---

**Ready to create your character? Provide the concept and confirm!**
