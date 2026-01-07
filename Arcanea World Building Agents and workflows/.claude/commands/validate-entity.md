# Validate Entity Command

> **Command**: `/validate-entity [path-or-name]`
> **Agents**: lore-master + consistency-validator + relevant specialists
> **Purpose**: Comprehensive validation before canonization

## Quick Start

```bash
# Validate by file path
/validate-entity characters/kael-stormborn/profile.arc

# Validate by name (searches for entity)
/validate-entity "Kael Stormborn"

# Validate all drafts
/validate-entity --all-drafts

# Validate specific type
/validate-entity --type character --status draft
```

## What Gets Validated

### 1. Structural Integrity
- YAML frontmatter is valid
- Required fields present
- `arc_version` is current
- Timestamps are valid ISO format

### 2. Timeline Consistency
- Dates fall within world's historical range
- Character ages match birth year and current year
- Events occur in logical sequence
- No temporal paradoxes

### 3. Relationship Validity
- All `related_entities` targets exist
- Relationships are reciprocal
- Relationship types are appropriate

### 4. Geographic Logic
- Locations exist in hierarchy
- Climate matches latitude/region
- Travel times are realistic
- No orphan locations

### 5. Magic Compliance
- Magic usage follows system rules
- Costs are specified
- Power levels are balanced
- Limitations respected

### 6. Cultural Alignment
- Character behaviors match culture
- Naming conventions followed
- Customs referenced exist

## Validation Process

```typescript
// Step 1: Load entity
const entity = await read_entity(path_or_name)

// Step 2: Load relevant context
const context = {
  timeline: await read("foundations/history-timeline.md"),
  magic: await read("foundations/magic-system.md"),
  relatedEntities: await load_related_entities(entity.related_entities)
}

// Step 3: Parallel validation
const validations = await Promise.all([
  background_task("consistency-validator", `
    Run structural checks on:
    ${entity.path}
    
    Verify:
    - YAML structure
    - Required fields
    - Timestamp validity
  `),
  
  background_task("timeline-historian", `
    Validate timeline for:
    ${entity.path}
    
    Check:
    - All dates against ${context.timeline}
    - Age calculations
    - Event sequences
  `),
  
  background_task("lore-master", `
    Full canon check for:
    ${entity.path}
    
    Verify against all existing canon.
    Flag any contradictions.
  `)
])

// Step 4: Compile report
const report = compile_validation_report(validations)
```

## Validation Report

```markdown
# Validation Report: [Entity Name]

**Entity**: [Name]
**Path**: [File path]
**Type**: [character|location|artifact|etc]
**Current Status**: draft
**Validated**: [Timestamp]

---

## Summary

| Check | Status | Issues |
|-------|--------|--------|
| Structural | ✅ Pass | 0 |
| Timeline | ⚠️ Warning | 1 |
| Relationships | ✅ Pass | 0 |
| Geographic | N/A | - |
| Magic | ✅ Pass | 0 |
| Cultural | ⚠️ Warning | 1 |

**Overall**: ⚠️ NEEDS REVISION (2 warnings)

---

## Issues Found

### Warning 1: Timeline
**Location**: Line 45, `birth_year: 1523`
**Issue**: Character would be 12 years old during the Battle of Sunken Fields (1535), but described as "veteran warrior"
**Suggestion**: Adjust birth year to 1510 or earlier, OR remove battle reference

### Warning 2: Cultural
**Location**: Line 78, `greeting: "May the stars guide you"`
**Issue**: This greeting belongs to the Celestine culture, but character is from Earthborn culture
**Suggestion**: Use Earthborn greeting "Stone endures" OR change cultural affiliation

---

## Passed Checks

✅ **Structural**
- YAML frontmatter valid
- All required fields present
- arc_version: 1.0 (current)
- Timestamps valid

✅ **Relationships**
- All 4 related_entities exist
- All relationships are reciprocal
- Relationship types appropriate

✅ **Magic**
- Fire affinity consistent with Earthborn culture
- Power level (7/10) balanced with training (15 years)
- Costs specified (exhaustion, burn scars)

---

## Recommendation

**Status**: ⚠️ NEEDS REVISION

Fix the 2 warnings above, then run validation again.
Once all checks pass, entity can be promoted to `status: canon`.

---

## Quick Fixes Available

Would you like me to:
1. [ ] Auto-fix birth year to 1505 (makes character 30 at battle)
2. [ ] Auto-fix greeting to match Earthborn culture
3. [ ] Show me the fixes to review first

Select options or type 'manual' to fix yourself.
```

## Bulk Validation

```bash
# Validate all drafts in world
/validate-entity --all-drafts --world "Arcanea"

# Output: Summary report with all issues across all drafts
```

```markdown
# Bulk Validation Report: Arcanea

**Drafts Scanned**: 23
**Passed**: 18
**Warnings**: 4
**Critical**: 1

## Critical Issues (Block Canonization)

1. **characters/orphan-knight/profile.arc**
   - Missing required field: `world`
   - Related entity `locations/lost-castle.arc` does not exist

## Warnings (Review Recommended)

1. **characters/storm-mage/profile.arc**
   - Timeline: Age inconsistency

2. **geography/northern-reach.arc**
   - Relationship: Non-reciprocal link to `characters/warden.arc`

3. **conflicts/border-war.arc**
   - Timeline: Start date before founding of involved faction

4. **magic/artifacts/flame-blade.arc**
   - Magic: No cost specified for legendary-tier artifact

## Ready for Canon (18 entities)

[List of entities that passed all checks]

---

**Next Steps**:
1. Fix 1 critical issue (required)
2. Review 4 warnings (recommended)
3. Run `/canonize --all-passed` to promote passing entities
```

## Integration with Hooks

Validation automatically triggers:
- `pre-write:canon-check` - Before any file gets `status: canon`
- `post-write:relationship-sync` - After validation passes

## Commands After Validation

```bash
# If validation passes
/canonize [entity-name]        # Promote single entity to canon
/canonize --all-passed         # Promote all passing entities

# If validation fails
/fix-entity [entity-name]      # Interactive fix wizard
/show-conflicts [entity-name]  # Detailed conflict analysis
```

---

**Ready to validate? Use `/validate-entity [path-or-name]`**
