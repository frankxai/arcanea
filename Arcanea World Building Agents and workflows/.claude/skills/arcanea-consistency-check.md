# Arcanea Consistency Check Skill

> **Trigger**: Before any content achieves `status: canon`
> **Purpose**: Comprehensive validation of new content against world rules

## Overview

This skill provides a systematic consistency validation workflow. It must be invoked before any draft content can become canon.

## Activation Triggers

Invoke this skill when:
- User says "validate", "check consistency", or "review for canon"
- Content is ready to move from `draft` to `canon` status
- Lore Master requests validation
- `/validate-entity` command is used

## Validation Checklist

### 1. Structural Validation
```yaml
Required fields check:
  - arc_version: present and valid
  - entity_type: matches allowed types
  - created: valid ISO timestamp
  - modified: valid ISO timestamp
  - creator: present
  - world: matches world name
  - status: draft (should be, if being validated)
```

### 2. Timeline Validation
```bash
# Load master timeline
Read foundations/history-timeline.md

# Extract all dates from entity
Grep "[0-9]+ (year|age|born|died|founded)" [entity-file]

# For each date, verify:
# - Falls within world's historical range
# - Doesn't contradict established events
# - Character ages are mathematically consistent
```

### 3. Relationship Validation
```bash
# Extract relationships
Grep "related_entities" [entity-file] --output_mode content

# For each relationship:
# 1. Verify target file exists
# 2. Check reciprocal relationship exists
# 3. Validate relationship type makes sense
```

### 4. Geographic Validation
```bash
# If entity references locations
Grep "location\|parent_location\|homeland" [entity-file]

# For each location:
# 1. Verify location file exists in geography/
# 2. Check climate/terrain consistency
# 3. Validate travel times if mentioned
```

### 5. Magic System Validation
```bash
# If entity involves magic
Read foundations/magic-system.md
Grep "magic\|spell\|enchant\|supernatural" [entity-file]

# Verify:
# - Magic usage follows established rules
# - Costs/limitations are respected
# - Power levels are consistent with world
```

### 6. Cultural Validation
```bash
# If entity references cultures
Grep "culture\|custom\|tradition\|religion" [entity-file]

# Verify:
# - Referenced cultures exist
# - Behaviors align with cultural norms
# - Language/naming follows patterns
```

## Validation Report Format

After running all checks, produce:

```markdown
# Consistency Validation Report

**Entity**: [Name]
**File**: [Path]
**Validated**: [Timestamp]

## Summary
- **Status**: ✅ APPROVED / ⚠️ NEEDS REVISION / ❌ REJECTED
- **Critical Issues**: [Count]
- **Warnings**: [Count]

## Structural Check
[Results]

## Timeline Check
[Results]

## Relationship Check
[Results]

## Geographic Check
[Results]

## Magic Check
[Results]

## Cultural Check
[Results]

## Required Actions
1. [Action if any]
2. [Action if any]

## Recommendation
[APPROVE for canon / REVISE with specific changes / REJECT with reason]
```

## Parallel Validation Pattern

For faster validation, fire specialists in parallel:

```typescript
// Fire all validators simultaneously
background_task("timeline-historian", "Validate timeline for [entity]...")
background_task("consistency-validator", "Run structural checks on [entity]...")
background_task("geography-cartographer", "Verify geographic references in [entity]...")

// Collect results
const timelineResult = await background_output(task1)
const structureResult = await background_output(task2)
const geoResult = await background_output(task3)

// Synthesize final report
```

## Escalation Path

If validation finds issues:

1. **Minor issues** → Provide specific fixes, author can self-correct
2. **Major issues** → Escalate to Lore Master for resolution strategy
3. **Fundamental conflicts** → Escalate to The Weaver (orchestrator) for architectural decision

## Auto-Fix Capabilities

Some issues can be auto-fixed:
- Missing `modified` timestamp → Update to current time
- Non-reciprocal relationship → Add reciprocal to target file
- Missing required field → Prompt for value or use default

Issues requiring human decision:
- Timeline conflicts
- Lore contradictions
- Character motivation inconsistencies
