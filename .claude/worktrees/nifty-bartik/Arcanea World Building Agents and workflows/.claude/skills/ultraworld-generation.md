# Ultraworld Generation Skill

> **Trigger**: "ultraworld" or "ulw" keyword
> **Purpose**: Full parallel orchestration for comprehensive world generation

## Overview

The Ultraworld protocol activates maximum parallel processing for world-building. When triggered, ALL relevant department agents fire simultaneously, creating comprehensive content in a single coordinated burst.

## Activation

Triggered by:
- User says "ultraworld" or "ulw"
- `/ultraworld` slash command
- Explicit request for "full world generation"

## The Ultraworld Protocol

### Phase 1: Foundation Check (Sequential)
Before parallel generation, verify foundations exist:

```bash
# MUST exist before ultraworld can proceed
Read foundations/cosmology.md       # World structure
Read foundations/natural-laws.md    # Physics rules
Read foundations/magic-system.md    # Magic system
Read foundations/history-timeline.md # Timeline
```

If foundations missing → Create them first (cannot parallelize without base rules)

### Phase 2: Parallel Department Burst

Fire ALL department agents simultaneously:

```typescript
// THE ULTRAWORLD BURST - All departments in parallel
const tasks = [
  background_task("world-architect", `
    Create comprehensive geography for [realm]:
    - 3 major regions with distinct climates
    - Key cities and landmarks
    - Trade routes and borders
    - Natural resources distribution
    Reference: foundations/cosmology.md, foundations/natural-laws.md
  `),
  
  background_task("character-weaver", `
    Create key figures for [realm]:
    - 1 major leader/ruler
    - 1 legendary hero/villain
    - 3 supporting characters (diverse roles)
    - Relationship web between them
    Reference: foundations/history-timeline.md
  `),
  
  background_task("magic-systems", `
    Expand magic system for [realm]:
    - Regional magical traditions
    - 2 unique spells/abilities
    - 1 magical artifact
    - Magic's role in society
    Reference: foundations/magic-system.md
  `),
  
  background_task("narrative-director", `
    Create story framework for [realm]:
    - 1 major ongoing conflict
    - 3 quest hooks
    - 1 prophecy or legend
    - Dramatic tensions between factions
    Reference: All foundations
  `),
  
  background_task("lore-master", `
    Prepare validation framework:
    - Index all existing canon
    - Note potential conflict points
    - Prepare cross-reference checks
    - Ready for integration review
  `)
]

// All fire simultaneously - don't wait between them
```

### Phase 3: Specialist Swarm

While departments work, fire specialists for detail:

```typescript
// Specialists fill in the details
background_task("geography-cartographer", "Detail terrain for generated locations...")
background_task("culture-anthropologist", "Design cultures for generated regions...")
background_task("timeline-historian", "Place generated events in timeline...")
background_task("species-biologist", "Define creatures for generated ecosystems...")
background_task("conflict-dramatist", "Enrich generated conflicts with moral complexity...")
```

### Phase 4: Integration (Sequential)

Once all agents complete:

```typescript
// Collect all results
const results = await Promise.all(tasks.map(t => background_output(t.id)))

// Integration steps (must be sequential)
1. Lore Master reviews all generated content
2. Consistency Validator runs full check
3. Conflicts identified and resolved
4. Cross-references established
5. Status updated to 'canon' for approved content
```

## Output Structure

Ultraworld generates a complete package:

```
[realm-name]/
├── geography/
│   ├── realms/[realm-name].arc
│   ├── regions/[region-1].arc
│   ├── regions/[region-2].arc
│   ├── regions/[region-3].arc
│   └── locations/[cities...].arc
├── characters/
│   ├── [leader]/profile.arc
│   ├── [hero]/profile.arc
│   └── [supporting...]/profile.arc
├── cultures/
│   ├── [culture-1].arc
│   └── [culture-2].arc
├── magic/
│   ├── traditions/[regional-magic].arc
│   ├── spells/[spell-1].arc
│   └── artifacts/[artifact].arc
├── conflicts/
│   ├── major-conflicts.md
│   ├── prophecies.md
│   └── quests/[quest-hooks...].arc
└── _integration/
    ├── cross-references.md
    └── validation-report.md
```

## Performance Expectations

With full parallel execution:
- **Department agents**: 5 running simultaneously
- **Specialist agents**: 5-6 running simultaneously
- **Total generation time**: ~2-3 minutes for full realm
- **Without ultraworld**: ~15-20 minutes sequential

## Safety Rails

Even in ultraworld mode:
1. **Foundations are immutable** - Never modify during generation
2. **Conflicts are flagged** - Don't auto-resolve, surface for review
3. **Status stays 'draft'** - Nothing becomes canon without human approval
4. **Rollback ready** - All changes can be reverted

## Usage Example

```
User: ultraworld - Create the Shattered Isles, an archipelago realm 
      recovering from an ancient magical cataclysm

[Ultraworld activates]
[5 department agents fire]
[6 specialist agents fire]
[Results collected and integrated]
[Validation report generated]

Output: Complete realm package with:
- 12 location files
- 5 character profiles
- 2 culture documents
- 3 magic tradition files
- 1 major conflict
- 3 quest hooks
- 1 prophecy
- Full cross-reference map
- Validation report (ready for human review)
```

## Integration with Slash Commands

Ultraworld can be scoped:
- `/ultraworld realm [name]` - Full realm generation
- `/ultraworld region [name]` - Region-level generation
- `/ultraworld faction [name]` - Faction-focused generation
- `/ultraworld era [name]` - Historical era generation
