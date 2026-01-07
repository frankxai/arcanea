# Arcanea Canon Knowledge Skill

> **Trigger**: Automatically loaded when working with any Arcanea world
> **Purpose**: Lazy-load full canon reference for consistency

## Overview

This skill provides instant access to all canonical knowledge for an Arcanea world. It should be loaded whenever:
- Creating new content that must align with existing canon
- Validating content against world rules
- Answering questions about established lore

## Activation

Load this skill when you see:
- References to existing characters, locations, or events
- Questions about "what exists" in the world
- Need to check consistency with established content

## Canon Source Hierarchy

**Priority order for resolving conflicts**:

1. **Foundations** (Highest authority)
   - `foundations/cosmology.md` - Universal structure
   - `foundations/natural-laws.md` - Physics and rules
   - `foundations/magic-system.md` - Magic rules
   - `foundations/history-timeline.md` - Master timeline

2. **Canon Entities** (Established content)
   - Files with `status: canon` in frontmatter
   - Sorted by `modified` date (newer = authoritative if conflict)

3. **Draft Entities** (Work in progress)
   - Files with `status: draft` 
   - NOT authoritative - may contradict canon

## Loading Process

When skill activates:

```bash
# Step 1: Load foundations (ALWAYS)
Read foundations/cosmology.md
Read foundations/natural-laws.md
Read foundations/magic-system.md
Read foundations/history-timeline.md

# Step 2: Index canon entities
Grep "status: canon" **/*.arc --output_mode files_with_matches

# Step 3: Load relevant canon based on current task
# (Only load what's needed for the specific query)
```

## Quick Reference Commands

### Find All Canon
```bash
Grep "status: canon" **/*.arc
```

### Find Entity by Name
```bash
Grep "[entity-name]" **/*.arc --output_mode files_with_matches
```

### Check Timeline
```bash
Read foundations/history-timeline.md
Grep "[year or event]" foundations/history-timeline.md
```

### Find Relationships
```bash
Grep "related_entities" [entity-file].arc --output_mode content
```

## Consistency Rules

When creating content, ALWAYS verify:

1. **Names don't conflict** - Search for name before using
2. **Dates align with timeline** - Check history-timeline.md
3. **Magic follows rules** - Reference magic-system.md
4. **Geography makes sense** - Check parent locations exist
5. **Relationships are reciprocal** - Both entities reference each other

## Integration with Agents

This skill is automatically consulted by:
- **Lore Master**: For all validation tasks
- **Character Weaver**: When checking backstory consistency
- **World Architect**: When placing locations
- **Narrative Director**: When creating story events
- **All Specialists**: When their domain intersects with existing canon

## Output

When this skill is loaded, you have access to:
- Complete world foundation rules
- Index of all canon entities
- Ability to quickly reference any established content
- Authority hierarchy for resolving conflicts
