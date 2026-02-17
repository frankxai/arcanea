---
name: check-continuity
description: Validate consistency across chapters and against canon
---

# /check-continuity

Run comprehensive continuity validation across chapters and against established canon.

## Usage

```
/check-continuity [scope]
```

## Examples

```
/check-continuity                    # Check entire manuscript
/check-continuity chapters/1-5       # Check chapters 1-5
/check-continuity --character Kira   # Focus on specific character
/check-continuity --timeline         # Focus on timeline issues
```

## What This Command Does

1. **Continuity Guardian** performs comprehensive consistency check
2. **Archivist** provides canon reference data
3. **Scout** locates all relevant passages
4. **Lore Master** validates world-building consistency

## Check Categories

### Physical Consistency
- Character descriptions match across scenes
- Location layouts remain consistent
- Objects stay where they were placed
- Weather and time of day track correctly

### Timeline Validation
- Day/night progression makes sense
- Travel times are feasible
- Character ages are consistent
- Events occur in logical order

### Knowledge Tracking
- Characters only know what they've learned
- Secrets remain secret until revealed
- Information revealed consistently

### Relational Consistency
- How characters address each other
- Relationship status at each point
- Alliances and conflicts track

## Output Structure

```markdown
## Continuity Report

### Scope
[What was checked]

### Status: [CLEAN / X ISSUES FOUND]

### Issues by Severity

**BREAKING** (Must fix):
1. [Issue description]
   - Location: [Chapter X, paragraph Y]
   - Conflict: [What contradicts what]
   - Suggested fix: [How to resolve]

**MAJOR** (Should fix):
1. [Issue description]
   ...

**MINOR** (Consider fixing):
1. [Issue description]
   ...

### Timeline Validation
[Visual timeline if complex]

### Character Tracking
[Summary of each character's arc across chapters]

### Canon Compliance
[World-building facts verified against canon]

### Recommendations
- [Priority fixes]
- [Optional improvements]
```

## Workflow

```
User → /check-continuity
     ↓
Scout gathers all relevant content
     ↓
Archivist provides canon database
     ↓
Continuity Guardian analyzes
     ↓
Lore Master validates world-building
     ↓
Comprehensive report delivered
```

## Flags

- `--character [name]`: Focus on specific character
- `--timeline`: Focus on timeline issues
- `--location [name]`: Focus on specific location
- `--chapter [X]`: Check single chapter against rest
- `--deep`: More thorough analysis
- `--fix`: Suggest specific text fixes
