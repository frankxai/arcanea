# Ultraworld Command

> **Command**: `/ultraworld [scope] [description]`
> **Agents**: ALL (maximum parallel orchestration)
> **Purpose**: Full-power world generation burst

## Overview

Ultraworld is the maximum-power command that activates ALL agents simultaneously for comprehensive world generation. Use when you want to create a complete, rich section of your world in one coordinated burst.

## Usage

```bash
# Full realm generation
/ultraworld realm "The Ashen Kingdoms - a land recovering from dragon wars"

# Region-focused generation
/ultraworld region "The Verdant Reach" --parent "Arcanea"

# Faction-focused generation
/ultraworld faction "The Silver Order" --type "knightly order"

# Era-focused generation
/ultraworld era "The Age of Sundering" --years "1000-1500"
```

## Scope Options

| Scope | What's Generated | Agents Used | Est. Time |
|-------|------------------|-------------|-----------|
| `realm` | Complete world/continent | All 5 departments + 6 specialists | 3-5 min |
| `region` | Territory within realm | 4 departments + 4 specialists | 2-3 min |
| `faction` | Organization/group | 3 departments + 3 specialists | 1-2 min |
| `era` | Historical period | 3 departments + 3 specialists | 1-2 min |
| `conflict` | War/tension | 2 departments + 3 specialists | 1-2 min |

## The Ultraworld Protocol

### Pre-Check (Automatic)
```typescript
// Verify foundations exist
const foundationsExist = await check_files([
  "foundations/cosmology.md",
  "foundations/natural-laws.md",
  "foundations/magic-system.md",
  "foundations/history-timeline.md"
])

if (!foundationsExist) {
  prompt("Foundations required. Create them first? [Y/n]")
  if (yes) await run_foundation_generation()
}
```

### Phase 1: Department Burst
```typescript
// ALL DEPARTMENTS FIRE SIMULTANEOUSLY
const departmentTasks = [
  background_task("world-architect", scope_specific_geography_prompt),
  background_task("character-weaver", scope_specific_character_prompt),
  background_task("magic-systems", scope_specific_magic_prompt),
  background_task("narrative-director", scope_specific_narrative_prompt),
  background_task("lore-master", "Prepare validation framework and index existing canon")
]

// DON'T WAIT - Continue immediately
console.log("5 department agents launched in parallel...")
```

### Phase 2: Specialist Swarm
```typescript
// SPECIALISTS FIRE IMMEDIATELY AFTER DEPARTMENTS
const specialistTasks = [
  background_task("geography-cartographer", detail_terrain_prompt),
  background_task("culture-anthropologist", culture_design_prompt),
  background_task("timeline-historian", timeline_integration_prompt),
  background_task("species-biologist", creature_ecosystem_prompt),
  background_task("conflict-dramatist", tension_complexity_prompt),
  background_task("consistency-validator", structure_validation_prompt)
]

console.log("6 specialist agents launched in parallel...")
console.log("Total: 11 agents working simultaneously")
```

### Phase 3: Result Collection
```typescript
// Wait for all agents (they've been working in parallel)
const allResults = await Promise.all([
  ...departmentTasks.map(t => background_output(t.id)),
  ...specialistTasks.map(t => background_output(t.id))
])

console.log("All 11 agents completed. Integrating results...")
```

### Phase 4: Integration
```typescript
// Sequential integration (must be ordered)
await integrate_geography(results.worldArchitect, results.cartographer)
await integrate_characters(results.characterWeaver, results.anthropologist)
await integrate_magic(results.magicSystems)
await integrate_narrative(results.narrativeDirector, results.conflictDramatist)
await integrate_timeline(results.historian)
await integrate_creatures(results.biologist)

// Final validation
const validation = await invoke_agent("consistency-validator", "Full validation scan")

if (validation.critical_issues > 0) {
  await surface_issues_for_resolution()
} else {
  await finalize_all_as_draft()
  console.log("Ultraworld generation complete. All content status: draft")
}
```

## Output Example

For `/ultraworld realm "The Shattered Isles"`:

```
Generated in 4m 23s:

Geography:
  ├── realms/shattered-isles.arc
  ├── regions/northern-reach.arc
  ├── regions/sunken-gardens.arc
  ├── regions/storm-peaks.arc
  └── locations/ (8 files)

Characters:
  ├── admiral-vex-stormrider/
  ├── the-drowned-queen/
  ├── keeper-of-tides/
  ├── corsair-captain-mar/
  └── the-lighthouse-sage/

Cultures:
  ├── isleborn-seafarers.arc
  ├── deep-dwellers.arc
  └── storm-callers.arc

Magic:
  ├── traditions/tide-magic.arc
  ├── traditions/storm-calling.arc
  ├── artifacts/trident-of-depths.arc
  └── phenomena/eternal-maelstrom.arc

Conflicts:
  ├── major-conflicts.md (3 conflicts)
  ├── prophecies.md (2 prophecies)
  └── quests/ (7 quest hooks)

Integration:
  ├── cross-references.md
  └── validation-report.md

Status: All files created as DRAFT
Next: Review and canonize with /validate-world
```

## Performance Metrics

Ultraworld leverages maximum parallelism:

| Metric | Sequential | Ultraworld |
|--------|------------|------------|
| Department work | 15-20 min | 3-4 min |
| Specialist work | 10-15 min | 2-3 min |
| Integration | 5 min | 5 min |
| **Total** | **30-40 min** | **10-12 min** |

**3-4x faster through parallel execution.**

## Safety Rails

Even at maximum power:
- ✅ Foundations are read-only (never modified by ultraworld)
- ✅ All output is `status: draft` (requires manual canonization)
- ✅ Conflicts are surfaced, not auto-resolved
- ✅ Validation report always generated
- ✅ Rollback possible (all files tracked)

## When to Use Ultraworld

**DO use when:**
- Starting a new world from scratch
- Expanding into a major new region
- Need comprehensive content quickly
- Want maximum creative output

**DON'T use when:**
- Making small targeted changes
- Need precise control over specifics
- Working on single character/location
- Debugging existing content

---

**Ready for maximum-power generation? Use `/ultraworld [scope] [description]`**
