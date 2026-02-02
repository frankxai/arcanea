# Generate Realm Workflow

> **Command**: `/generate-realm [name] [--scope minimal|moderate|detailed|exhaustive]`
> **Agents**: ALL departments + specialists (parallel orchestration)
> **Output**: Complete world instance from template

## Quick Start

```
/generate-realm "The Shattered Isles" --scope detailed
```

## Step 1: World Vision

**World Name**: [Enter world name]

**Genre/Theme**:
- [ ] High Fantasy
- [ ] Low Fantasy
- [ ] Magical Realism
- [ ] Science Fantasy
- [ ] Dark Fantasy
- [ ] Urban Fantasy
- [ ] Other: [specify]

**Tone**:
- [ ] Epic & Heroic
- [ ] Dark & Gritty
- [ ] Light & Whimsical
- [ ] Realistic & Grounded
- [ ] Mysterious & Mystical
- [ ] Other: [specify]

**Core Concept**: [2-3 sentences describing your world's unique hook]

## Step 2: Foundational Questions

### Cosmology
**Universe Structure**: [Single world? Multiple planes? Floating islands?]
**Celestial Bodies**: [How many moons? Suns? Does this affect magic?]
**Size/Scale**: [Continent-sized? Planet? Multiverse?]

### Magic
**Does magic exist?**: [ ] Yes [ ] No [ ] Limited

If yes:
**Magic Source**: [Divine? Natural? Internal? Artifactual?]
**Prevalence**: [Rare? Common? Moderate?]
**Key Limitation**: [What can't magic do?]

### History
**Age of World**: [Ancient? Young? Timeless?]
**Current Era**: [Golden age? Dark times? Transition?]
**Defining Historical Event**: [What shaped the current world?]

## Step 3: Scope & Detail

How detailed should this world be initially?

| Scope | Files Created | Time Estimate |
|-------|---------------|---------------|
| **Minimal** | ~10 files | ~1 min |
| **Moderate** | ~25 files | ~2-3 min |
| **Detailed** | ~40 files | ~4-5 min |
| **Exhaustive** | ~60+ files | ~8-10 min |

## Step 4: Parallel Agent Orchestration

### Phase 1: Foundation Creation (Sequential - Required First)
```typescript
// These must complete before parallel generation
await create_file("foundations/cosmology.md", cosmology_content)
await create_file("foundations/natural-laws.md", natural_laws_content)
await create_file("foundations/magic-system.md", magic_content)
await create_file("foundations/history-timeline.md", timeline_content)
```

### Phase 2: Parallel Department Burst
```typescript
// ALL departments fire simultaneously
background_task("world-architect", `
  Create geography for [world]:
  - 1 primary realm
  - 3 major regions with distinct character
  - 5 key locations (cities, landmarks)
  - Climate zones and resources
  Reference foundations for consistency.
`)

background_task("character-weaver", `
  Create cast for [world]:
  - 1 central leader/ruler
  - 1 legendary figure (hero or villain)
  - 3 supporting characters
  - Relationship web between all
  Reference timeline for ages and events.
`)

background_task("magic-systems", `
  Expand magic for [world]:
  - Regional magical traditions (1 per region)
  - 3 signature spells or abilities
  - 2 magical artifacts
  - Magic's societal role
  Reference magic-system.md foundation.
`)

background_task("narrative-director", `
  Create story framework for [world]:
  - 1 major ongoing conflict
  - 5 quest hooks
  - 2 prophecies or legends
  - Faction tensions
  Reference all foundations.
`)

// Continue without waiting - all run in parallel
```

### Phase 3: Specialist Detail Pass
```typescript
// While departments work, fire specialists
background_task("geography-cartographer", "Add sensory detail to locations...")
background_task("culture-anthropologist", "Define cultures for each region...")
background_task("timeline-historian", "Place all events in timeline...")
background_task("species-biologist", "Define creatures and races...")
background_task("conflict-dramatist", "Add moral complexity to conflicts...")
```

### Phase 4: Integration & Validation
```typescript
// Collect all results
const allResults = await collect_all_background_tasks()

// Sequential validation
await invoke_agent("lore-master", "Review all generated content for consistency")
await invoke_agent("consistency-validator", "Run full validation suite")

// Resolve any conflicts
if (conflicts_found) {
  await resolve_conflicts_with_user()
}

// Finalize
await update_all_cross_references()
await generate_world_summary()
```

## Output Structure

```
worlds/[world-name]/
├── world.arcanea           # World config
├── foundations/
│   ├── cosmology.md
│   ├── natural-laws.md
│   ├── magic-system.md
│   └── history-timeline.md
├── geography/
│   ├── realms/[realm].arc
│   ├── regions/[3 regions].arc
│   └── locations/[5+ locations].arc
├── characters/
│   └── [5+ character folders]
├── cultures/
│   └── [3+ cultures].arc
├── magic/
│   ├── traditions/[regional magic].arc
│   ├── artifacts/[2+ artifacts].arc
│   └── phenomena/[magical events].arc
├── conflicts/
│   ├── major-conflicts.md
│   ├── prophecies.md
│   └── quests/[5+ quests].arc
└── _integration/
    ├── cross-references.md
    └── validation-report.md
```

## Arcanean Integration (Optional)

Connect to Arcanean ecosystem?

**Academy Affiliation**:
- [ ] Atlantean Academy (Storytelling focus)
- [ ] Draconic Academy (Visual focus)
- [ ] Academy of Creation & Light (Music/Audio focus)
- [ ] None (standalone world)

**Soul Guardians Link**:
- [ ] Include Soul Guardians characters
- [ ] Reference Soul Guardians lore
- [ ] Independent universe

---

**This operation creates 20-60 files depending on scope.**

Ready to generate your complete realm? Provide the details above and confirm!
