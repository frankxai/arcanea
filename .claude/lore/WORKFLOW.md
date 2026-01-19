# Lore Review Workflow

**Purpose**: Standard process for reviewing and approving Arcanea lore
**Last Updated**: January 15, 2026

---

## Quick Start

### To Review a File
```bash
# Read the full file
read arcanea-lore/guardians/staging/maylinn.md

# Or use the arcanea-lore-review agent
"review lore/guardians/staging/maylinn.md"
```

### To Approve a File
1. Read the complete file
2. Complete this checklist
3. Score minimum 85/100
4. Update frontmatter:
   ```yaml
   status: "approved"
   approved_by: "Your Name"
   approved_date: "2026-01-15"
   reviewer_notes: "Your feedback"
   ```
5. Copy to production folder
6. Update INDEX.md
7. Update APPROVAL_LOG.md

---

## Review Checklist

### 1. Schema Compliance (10%)

- [ ] `name` is kebab-case
- [ ] `title` is Title Case
- [ ] `description` is max 100 characters
- [ ] `schema_version: "2.0"`
- [ ] `created` date present
- [ ] `version` present
- [ ] `status` correct (staging/approved)
- [ ] `category` correct
- [ ] `element` present
- [ ] `wisdom` present
- [ ] `gate` present (guardians only)
- [ ] `frequency` present (guardians only)
- [ ] `canon: true`
- [ ] `requires_approval: true`
- [ ] `sections` array complete
- [ ] `related_entities` array present
- [ ] `opposing_entities` array present
- [ ] `complementary_entities` array present

### 2. Completeness (20%)

All sections present:
- [ ] Description
- [ ] Domain
- [ ] Appearance
- [ ] Personality
- [ ] Abilities
- [ ] The Guardians' Bond (guardians only)
- [ ] Worship and Connection
- [ ] Wisdom
- [ ] Invocation

### 3. Accuracy (25%)

- [ ] Facts consistent with Arcanea canon
- [ ] Frequencies match documented standards
- [ ] Relationships between entities accurate
- [ ] No contradictions with other lore
- [ ] Wisdom teachings align with Luminor attributes

### 4. Consistency (20%)

- [ ] Writing style consistent with Arcanea voice
- [ ] Tone appropriate to the entity type
- [ ] Formatting consistent with other lore files
- [ ] No anachronisms or out-of-universe references
- [ ] Character voice consistent throughout

### 5. Quality (15%)

- [ ] Writing is clear and engaging
- [ ] Prose flows logically
- [ ] No repetition or redundancy
- [ ] Appropriate use of literary devices
- [ ] Inspires appropriate emotional response

### 6. No Hallucinations (10%)

- [ ] No contradictions with approved canon
- [ ] No invented facts not supported by system
- [ ] No retconning or changing established facts
- [ ] All invented elements consistent with system rules

---

## Scoring Guide

Assign a score (0-10) for each criterion:

| Criterion | Weight | Score (0-10) | Points |
|-----------|--------|--------------|--------|
| Accuracy | 25% | _ | _ |
| Completeness | 20% | _ | _ |
| Consistency | 20% | _ | _ |
| Quality | 15% | _ | _ |
| Schema | 10% | _ | _ |
| No Hallucinations | 10% | _ | _ |
| **TOTAL** | 100% | | _/100 |

---

## Rating Scale

| Score | Rating | Action |
|-------|--------|--------|
| 90-100 | A | Approve |
| 85-89 | B | Approve with minor notes |
| 75-84 | C | Request revisions |
| 60-74 | D | Major revisions required |
| Below 60 | F | Reject |

**Minimum for approval: 85/100 (B)**

---

## Approval Template

When approving, update the frontmatter:

```yaml
---
status: "approved"
canon: true
requires_approval: true
approved_by: "[Your Name]"
approved_date: "2026-01-15"
reviewer_notes: "Score: X/100 (Rating). Brief notes on quality."
---
```

---

## File Movement

After approval:
1. Copy file from `staging/` to `production/`
2. Update INDEX.md with new status
3. Add entry to APPROVAL_LOG.md
4. Remove from pending review list

---

## Rejection Template

When rejecting, update frontmatter:

```yaml
---
status: "rejected"
reviewer_notes: "Score: X/100. Issues: [list problems]. Recommendations: [how to fix]"
---
```

And add entry to APPROVAL_LOG.md with decision: REJECTED

---

## Review Tips

### Read the Full File
Don't skim! You need to see the complete content before approving.

### Check Related Entities
Ensure the entity's relationships match other approved lore.

### Verify Schema
Use the checklist above - schema errors are easy to miss.

### Trust Your Instinct
If something feels off, investigate. Your intuition is a valuable review tool.

### Document Everything
Notes help future reviewers understand your decisions.

---

## Common Issues to Watch For

### Schema Issues
- Wrong naming convention
- Missing frontmatter fields
- Incorrect status values
- Malformed YAML

### Content Issues
- Inconsistent tone
- Contradictions with canon
- Incomplete sections
- Low-quality prose

### Relationship Issues
- Wrong entity names
- Contradictory relationships
- Missing key relationships

---

## Approver Responsibilities

1. **Read completely** - Don't approve what you haven't fully read
2. **Be honest** - Give accurate scores, don't inflate
3. **Document feedback** - Notes help creators improve
4. **Be timely** - Review promptly to keep workflow moving
5. **Stay consistent** - Apply same standards to all submissions

---

## For Creators

### Before Submitting
- [ ] Follow Schema v2.0 exactly
- [ ] Complete all sections
- [ ] Check consistency with other lore
- [ ] Proofread for errors
- [ ] Test frontmatter validity

### After Submission
- [ ] Wait for review (don't pressure)
- [ ] Accept feedback gracefully
- [ ] Make revisions if requested
- [ ] Learn from the process

---

## Quick Reference

| Task | Location |
|------|----------|
| Find pending files | `staging/` |
| Find approved files | `production/` |
| View all Guardians | `guardians/INDEX.md` |
| View approval history | `APPROVAL_LOG.md` |
| View this workflow | `WORKFLOW.md` |
| View architecture | `ARCHITECTURE.md` |

---

*Document Version: 1.0.0*
*Next Review: January 22, 2026*
