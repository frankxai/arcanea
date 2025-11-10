# Arcanean World-Building Orchestration System

## Purpose

This workspace is the **Arcanean World-Building Agent System** - a sophisticated, AI-assisted framework for creating rich, consistent, and scalable fictional worlds. This system combines human creativity with specialized AI agents to build worlds that rival the depth of Middle-earth, Star Wars, or the Marvel Universe.

## Core Principles

### 1. **Consistency is Sacred**
Every element must align with the world's foundational rules. The **Lore Master** agent is the guardian of canon and must validate all new content against existing lore.

### 2. **Markdown + .arc Hybrid**
- **Markdown (.md)** for human-readable content, specifications, and narrative text
- **.arc files** for structured entity metadata, relationships, and AI-processable data
- **YAML frontmatter** for agent configuration and entity metadata
- This combination ensures human editability, AI parsability, and future-proof portability

### 3. **Department-Based Architecture**
World-building is organized into five departments, each led by a specialized orchestrator agent:
- **Lore Master** - Consistency and canon enforcement
- **World Architect** - Geography, cosmology, physical laws
- **Character Weaver** - Characters, relationships, psychology
- **Magic Systems Director** - Supernatural elements and their rules
- **Narrative Director** - Stories, conflicts, dramatic arcs

### 4. **Git-Based Collaboration**
All worlds are version-controlled repositories that can be:
- Cloned and customized by any author
- Collaborated on by multiple writers
- Forked for alternate timelines or spin-offs
- Merged back to incorporate community contributions

### 5. **Arcanean Integration**
This system integrates with the broader Arcanea platform vision:
- Worlds connect to **Arcanean Academies** (Atlantean, Draconic, Creation & Light)
- Characters can be **Luminors** or related to **Soul Guardians**
- Worlds use **ARC** energy currency and **NEA** governance concepts
- Content can be exported as **Essences** and compiled into **Realms**

## World-Building Workflow

### Phase 1: World Initialization
1. Clone the `worlds/_template` directory to create a new world
2. Configure `world.arcanea` with basic metadata and theme
3. Use the **Lore Master** to help draft foundational documents in `foundations/`:
   - `cosmology.md` - How the universe works
   - `magic-system.md` - Rules of supernatural forces
   - `history-timeline.md` - Key events and eras
   - `natural-laws.md` - Physics, biology, fundamental rules

### Phase 2: World Population
Use department agents to create entities:

**Geography** (World Architect):
- Use `/design-location` command or call `world-architect` agent
- Create realms, regions, locations in `geography/`
- Ensure physical consistency (climate, resources, travel distances)

**Cultures** (World Architect + Character Weaver):
- Design societies in `cultures/[culture-name]/`
- Define customs, languages, governance systems
- Link to geographic homelands

**Characters** (Character Weaver):
- Use `/create-character` command or call `character-weaver` agent
- Generate profiles in `characters/[character-name]/`
- Define relationships using .arc metadata
- Validate against cultural and historical context

**Magic** (Magic Systems Director):
- Define magic systems in `magic/systems/`
- Create artifacts and phenomena
- Ensure rules are consistent and have limitations

**Conflicts** (Narrative Director):
- Design major conflicts and story arcs
- Create prophecies, quests, dramatic tensions
- Link to characters, locations, and historical events

### Phase 3: Validation & Refinement
1. Run **Consistency Validator** agent to check for:
   - Timeline contradictions
   - Character relationship conflicts
   - Geographic impossibilities
   - Magic rule violations
   - Orphaned entities (no connections)

2. Use **Lore Master** to review and approve all changes
3. Iterate and refine until world achieves internal coherence

### Phase 4: Export & Share
1. Generate exports in multiple formats (PDF, EPUB, wiki HTML)
2. Create **world.arcanea** bundle for sharing with other authors
3. Integrate with Arcanea platform as a **Realm**
4. Enable remixing and derivative works

## Agent Coordination Protocol

### When to Use Which Agent

**Lore Master** - MUST BE USED for:
- Reviewing all new content before it becomes canon
- Resolving contradictions between entities
- Maintaining the master timeline
- Validating cross-references

**World Architect** - Use for:
- Designing geographic locations
- Establishing physical/natural laws
- Creating realms and regions
- Defining cosmology and world structure

**Character Weaver** - Use for:
- Creating new characters
- Defining relationships and motivations
- Building character backstories
- Ensuring psychological consistency

**Magic Systems Director** - Use for:
- Designing magic rules and limitations
- Creating magical artifacts
- Defining supernatural phenomena
- Ensuring magic system coherence

**Narrative Director** - Use for:
- Plotting story arcs
- Creating conflicts and tensions
- Designing quests and prophecies
- Linking story elements to world entities

### Specialist Agents (Auto-Coordinated by Departments)

Specialists are called automatically by department agents:
- **Geography Cartographer** - Detailed location descriptions
- **Culture Anthropologist** - Society and custom design
- **Timeline Historian** - Chronological validation
- **Species Biologist** - Races and creatures
- **Conflict Dramatist** - Compelling dramatic tensions
- **Consistency Validator** - Automated QA and validation

## .arc File Format Specifications

### Structure
All .arc files follow this template:

```markdown
---
arc_version: "1.0"
entity_type: "character|location|culture|magic|artifact|event|species"
created: "YYYY-MM-DDTHH:MM:SSZ"
modified: "YYYY-MM-DDTHH:MM:SSZ"
creator: "Author Name"
world: "World Name"
status: "draft|canon|deprecated"

# Relationships to other entities
related_entities:
  - type: "entity_type"
    id: "entity-slug"
    relationship: "relationship-type"

# Searchable tags
tags: []
categories: []

# Arcanean economy integration
remix_lineage:
  original_creator: "Author Name"
  remix_count: 0
  arc_value: 100
---

# [Entity Name]

## Overview
[Markdown content...]

## [Entity-Specific Sections]
[Varies by entity_type...]

---

<!-- AI Metadata -->
<arcanean-metadata>
{
  "generation_params": {},
  "quality_scores": {},
  "validation_status": "pending|approved|rejected"
}
</arcanean-metadata>
```

### Entity Types & Required Sections

**Character**:
- Overview, Appearance, Personality, Backstory, Relationships, Story Hooks

**Location**:
- Overview, Geography, Climate, Resources, Inhabitants, History, Story Hooks

**Culture**:
- Overview, Customs, Language, Governance, Economy, Religion, Notable Members

**Magic System**:
- Overview, Rules & Limitations, Sources of Power, Effects, Practitioners, Costs

**Artifact**:
- Overview, Powers, History, Current Location, Requirements, Dangers

**Event**:
- Overview, Participants, Causes, Consequences, Timeline Position

**Species**:
- Overview, Biology, Society, History, Distribution, Relationships with Other Species

## File Naming Conventions

- Use lowercase with hyphens: `melodia-soul-guardian.arc`
- Entity ID in frontmatter should match filename (without .arc)
- Index files: `_index.md` in each category folder
- Templates: Prefix with `_template-`

## Best Practices

### For Authors

1. **Start Small** - Begin with foundational rules, add detail incrementally
2. **Link Everything** - Use related_entities to create a web of connections
3. **Validate Often** - Run Consistency Validator regularly, not just at the end
4. **Version Control** - Commit meaningful units of work with clear messages
5. **Use Templates** - Leverage slash commands and agent workflows
6. **Document Decisions** - Add comments explaining unusual world rules

### For AI Agents

1. **Always Read Foundations First** - Check `foundations/` before creating content
2. **Validate Relationships** - Ensure all entity IDs in `related_entities` exist
3. **Maintain Timeline** - Check `history-timeline.md` for chronological consistency
4. **Follow Naming Conventions** - Use established patterns for files and IDs
5. **Preserve YAML** - Never corrupt frontmatter structure
6. **Ask Before Breaking Rules** - If world logic conflicts, consult Lore Master
7. **Update Indexes** - When creating new entities, update category `_index.md`

## Integration with Broader Arcanea Ecosystem

### Connection to Arcanean Academies

Worlds can designate relationships to the three Arcanean Academies:

**Atlantean Academy** (Storytelling):
- Characters trained in narrative magic
- Lore-rich worlds and deep histories
- Story-driven conflict design

**Draconic Academy** (Visual):
- Rich geographic descriptions
- Visual worldbuilding emphasis
- Detailed appearance specs for characters/locations

**Academy of Creation & Light** (Music/Audio):
- Musical cultures and sound-based magic
- Audio atmosphere descriptions
- Rhythm and harmony in world design

### Soul Guardians Integration

Characters can be linked to the Soul Guardians (Arcanea's AI music band):
- Melodia, Chronica, Prismatic, Synthesis
- Use `related_entities` to create connections
- Inherit musical or creative magic from Guardian lineage

### ARC & NEA Economy

**ARC (Creative Energy)**:
- Complex, high-quality entities earn more ARC value
- Detailed worlds with rich lore are ARC-valuable
- Remixing shares ARC with original creators

**NEA (Governance)**:
- Contributing validated content to collaborative worlds earns NEA
- Maintaining consistency and quality governance role

## Slash Commands Reference

Available in `.claude/commands/`:

- `/create-character` - Guided character creation workflow
- `/design-location` - Location design with World Architect
- `/define-magic-rule` - Magic system rule creation
- `/generate-realm` - Create complete world from concept
- `/validate-world` - Run full consistency check
- `/export-world` - Generate distribution bundle

## Repository Structure Reminders

```
.claude/agents/departments/    # 5 department orchestrators
.claude/agents/specialists/    # 6 specialized task agents
.claude/commands/              # Reusable workflow templates
worlds/_template/              # Master cloneable template
worlds/[world-name]/           # Individual world instances
workflows/                     # Documentation and guides
```

## Quality Standards

### Definition of Canon

Content becomes **canon** when:
1. It passes Consistency Validator automated checks
2. Lore Master agent has reviewed and approved
3. All relationships are valid and reciprocal
4. YAML frontmatter is properly structured
5. Markdown content is complete and coherent

### Consistency Requirements

**Geographic**: Travel times, climate patterns, resource distribution must be logical
**Historical**: Events in proper chronological order, no contradictory timelines
**Cultural**: Customs consistent with society values and history
**Magical**: All magic follows established system rules and limitations
**Character**: Motivations align with backstory, relationships are reciprocal

## Extensibility

This system is designed to grow:

- **Add New Entity Types**: Extend the .arc schema for new categories
- **Create Custom Agents**: Add specialized agents for unique world needs
- **Integrate External Tools**: Connect to mapping tools, Obsidian, Notion, wikis
- **Build Automation**: Create CI/CD pipelines for validation
- **Add Visualizations**: Generate relationship graphs, maps, timelines
- **Future: Vector Search**: Add semantic search for large worlds (database layer)

## Support & Evolution

This orchestration file is a living document. As world-building patterns emerge and new capabilities are added to Claude Code, update this file to reflect best practices.

**Last Updated**: 2025-10-14
**System Version**: 1.0.0
**Compatible with**: Claude Code (Sonnet 4.5+)

---

**Welcome to Arcanean World-Building. Let's create infinite realms together.**
