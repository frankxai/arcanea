# .arc File Format Specification

**Version**: 1.0
**Last Updated**: 2025-10-14

## Overview

The `.arc` format is the Arcanean standard for world-building entity files. It combines:
- **YAML frontmatter** for structured metadata
- **Markdown content** for human-readable descriptions
- **JSON metadata** for AI processing and quality tracking

## File Extension

`.arc` = **Arc**anean **R**ich **C**ontent

## Structure

Every .arc file follows this three-part structure:

```markdown
---
[YAML Frontmatter - Metadata]
---

[Markdown Content - Human-Readable]

---

<!-- AI Metadata -->
<arcanean-metadata>
[JSON - Processing Data]
</arcanean-metadata>
```

---

## Part 1: YAML Frontmatter

### Required Fields

```yaml
arc_version: "1.0"                # Format version
entity_type: "[type]"             # See Entity Types below
created: "2025-10-14T10:00:00Z"   # ISO 8601 timestamp
modified: "2025-10-14T12:00:00Z"  # ISO 8601 timestamp
creator: "Author Name"            # Original creator
world: "World Name"               # Which world this belongs to
status: "draft"                   # draft|canon|deprecated
```

### Entity Types

Valid `entity_type` values:
- `character` - People, beings, NPCs
- `location` - Places, cities, landmarks
- `culture` - Societies, civilizations
- `magic` - Magic systems, spells
- `artifact` - Magical or significant items
- `event` - Historical events, quests
- `species` - Races, creatures
- `phenomenon` - Natural or magical occurrences

### Optional Common Fields

```yaml
# Relationships to other entities
related_entities:
  - type: "entity_type"           # Type of related entity
    id: "entity-slug"             # Slug/filename without extension
    relationship: "relationship"   # Type of relationship

# Searchable metadata
tags: ["tag1", "tag2"]            # Freeform tags
categories: ["cat1", "cat2"]      # Hierarchical categories

# Arcanean economy integration
remix_lineage:
  original_creator: "Author Name"
  remix_count: 0
  arc_value: 100
```

### Entity-Specific Fields

#### Character

```yaml
character_type: "protagonist|antagonist|supporting|minor|npc"
species: "human|elf|dragon|etc"
culture: "culture-id"
age: "number or descriptor"
pronouns: "they/she/he/etc"
birthplace: "location-id"
current_location: "location-id"
```

#### Location

```yaml
parent_location: "realm-id or region-id"
location_type: "realm|region|city|village|landmark|building"
coordinates:
  latitude: "number or null"
  longitude: "number or null"
climate: "tropical|temperate|arctic|arid|etc"
terrain: "mountains|plains|forest|desert|coastal|etc"
```

#### Artifact

```yaml
artifact_type: "weapon|tool|armor|jewelry|book|etc"
power_level: "minor|significant|major|legendary"
current_status: "active|dormant|destroyed|lost"
```

#### Event/Quest

```yaml
quest_type: "main|side|personal|faction|recurring"
difficulty: "trivial|easy|moderate|hard|legendary"
quest_status: "available|in-progress|completed|failed|expired"
```

---

## Part 2: Markdown Content

The body uses standard Markdown with Arcanean extensions.

### Required Sections

All entities must have:

```markdown
# [Entity Name]

## Overview
[2-3 sentence summary]
```

### Entity-Specific Sections

#### Character

```markdown
## Appearance
## Personality
## Backstory
## Relationships
## Skills & Abilities
## Motivations & Goals
## Story Role
```

#### Location

```markdown
## Geography
## Climate
## Natural Resources
## Inhabitants
## History
## Points of Interest
## Strategic Significance
## Story Hooks
```

See department agent files for complete templates.

### Markdown Extensions

**Internal Links**:
```markdown
[Character Name](../characters/character-slug.arc)
[Location Name](../geography/locations/location-slug.arc)
```

**Relationship Callouts**:
```markdown
> **Mentor**: [Character Name](path/to/character.arc)
> **Enemy**: [Character Name](path/to/character.arc)
```

**Story Hooks Box**:
```markdown
### Story Hooks
1. **[Hook Name]**: [Description]
2. **[Hook Name]**: [Description]
```

---

## Part 3: Arcanean Metadata

Appended after content, not displayed to readers:

```html
---

<!-- AI Metadata - Not displayed to readers -->
<arcanean-metadata>
{
  "generation_params": {
    "agent": "character-weaver|world-architect|etc",
    "model": "claude-sonnet-4.5",
    "prompt_pack": "character-creation-v1",
    "version": "1.0"
  },
  "quality_scores": {
    "consistency": 0.95,          // 0.0-1.0
    "originality": 0.87,
    "integration": 0.92,
    "completeness": 0.88
  },
  "validation_status": "pending|approved|rejected",
  "last_validated": "2025-10-14T15:00:00Z",
  "validator_notes": "Optional notes from lore-master"
}
</arcanean-metadata>
```

---

## Naming Conventions

### File Names

- Lowercase with hyphens: `melodia-soul-guardian.arc`
- No spaces, no special characters except hyphen
- ID in frontmatter must match filename (without .arc)

**Examples**:
- `melodia-soul-guardian.arc` → `id: melodia-soul-guardian`
- `academy-of-creation.arc` → `id: academy-of-creation`

### Entity IDs

Used in `related_entities` to reference other entities:
- Must exactly match the filename (without extension)
- Case-sensitive
- Use hyphens, not underscores or spaces

---

## Relationship Types

Common `relationship` values for `related_entities`:

### Character Relationships

`parent`, `child`, `sibling`, `spouse`, `friend`, `rival`, `enemy`, `mentor`, `student`, `lover`, `ally`, `subordinate`, `superior`

### Location Relationships

`within`, `contains`, `neighbor`, `ruled-by`, `inhabited-by`, `origin`, `current-location`

### Cultural Relationships

`member-of`, `founded-by`, `enemy-culture`, `allied-culture`, `ancestor-culture`

### Artifact Relationships

`owned-by`, `created-by`, `located-at`, `powered-by`, `contains`

### General

`from`, `related-to`, `connected-to`, `opposed-by`, `supports`

---

## Validation Rules

### YAML Frontmatter

✅ **MUST**:
- Be valid YAML syntax
- Start file with `---` delimiter
- End with `---` delimiter
- Include all required fields
- Use ISO 8601 for timestamps
- Use valid entity_type

❌ **MUST NOT**:
- Have duplicate keys
- Have invalid YAML syntax
- Omit required fields

### Related Entities

✅ **MUST**:
- Reference entities that exist
- Use correct entity type
- Use exact filename as ID

**Reciprocity**: If A lists B as a relationship, B should list A
- Exception: Can be asymmetric if intentional (unrequited love, unknown enemy, etc)

### Markdown Content

✅ **MUST**:
- Include `# [Entity Name]` heading
- Include `## Overview` section
- Use valid Markdown syntax

❌ **SHOULD AVOID**:
- Contradicting frontmatter metadata
- Breaking the fourth wall
- Inconsistent entity names

### Arcanean Metadata

✅ **MUST**:
- Be valid JSON
- Be inside `<arcanean-metadata>` tags
- Come after `---` separator at file end

---

## Examples

See:
- `worlds/_template/characters/melodia-example.arc` - Full character example
- Department agent files for entity-specific templates
- `claude.md` for integration guidance

---

## Version History

**1.0** (2025-10-14):
- Initial specification
- Core entity types defined
- Metadata structure established

---

## Extending the Format

To add new entity types:

1. Define in this specification
2. Create agent template (if needed)
3. Add to `entity_type` validation
4. Document entity-specific fields
5. Update consistency-validator agent

---

## Tools & Validation

**Automated Validation**:
- `consistency-validator` agent checks .arc file structure
- YAML parser validates frontmatter
- Relationship checker ensures reciprocity

**Manual Review**:
- `lore-master` agent for canon approval
- Human author final review

---

**This specification is living and will evolve with the Arcanean ecosystem.**
