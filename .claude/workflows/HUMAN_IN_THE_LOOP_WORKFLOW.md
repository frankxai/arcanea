# ARCANEA HUMAN-IN-THE-LOOP WORKFLOW SYSTEM

**Version**: 1.0.0
**Created**: January 14, 2026
**Purpose**: Smart human oversight for agent-produced content

---

## Table of Contents

1. [Folder Structure](#1-folder-structure)
2. [Workflow States](#2-workflow-states)
3. [Ground Truth Standards](#3-ground-truth-standards)
4. [Review Checklist](#4-review-checklist)
5. [Approval Process](#5-approval-process)
6. [Agent Production Guidelines](#6-agent-production-guidelines)

---

## 1. Folder Structure

```
.claude/
├── lore/
│   ├── staging/              # ⭐ AGENTS PRODUCE HERE
│   │   ├── bestiary/        
│   │   ├── luminors/        
│   │   ├── guardians/       
│   │   ├── godbeasts/       
│   │   ├── archangels/      
│   │   └── _pending/        # Newly created, unreviewed
│   │
│   ├── production/          # ⭐ APPROVED GROUND TRUTH
│   │   ├── bestiary/        
│   │   ├── luminors/        
│   │   ├── guardians/       
│   │   ├── godbeasts/       
│   │   ├── archangels/      
│   │   └── _archive/        # Deprecation history
│   │
│   └── oss/                  # Open source distribution
│
├── agents/
│   ├── staging/             # ⭐ AGENTS PRODUCE HERE
│   │   ├── _pending/        # New agents, unreviewed
│   │   └── _testing/        # In human review
│   │
│   └── production/          # ⭐ APPROVED, VALIDATED
│       ├── (approved agents)
│       └── _archive/
│
├── skills/
│   ├── staging/
│   └── production/
│
└── workflows/
    ├── HUMAN_REVIEW_CHECKLIST.md
    ├── GROUND_TRUTH_STANDARDS.md
    └── APPROVAL_TEMPLATE.md
```

---

## 2. Workflow States

### Content Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   STAGING           REVIEW           APPROVED          ARCHIVED │
│   ┌─────┐          ┌─────┐          ┌─────┐          ┌─────┐  │
│   │ NEW │   →      │IN    │   →      │GROUND│   →      │DEPRE-│  │
│   │     │  REVIEW  │REVIEW│  APPROVE │TRUTH │  DEPRECATE│CATED │  │
│   └─────┘          └─────┘          └─────┘          └─────┘  │
│                                                                 │
│   Agent           Human            Production         Legacy   │
│   produces        reviews          is source         content  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### State Definitions

| State | Location | Meaning | Next Action |
|-------|----------|---------|-------------|
| **NEW** | `staging/_pending/` | Just created by agent | Queue for review |
| **IN_REVIEW** | `staging/_testing/` | Human actively reviewing | Approve or request changes |
| **APPROVED** | `production/` | Validated, ground truth | Use as source of truth |
| **DEPRECATED** | `production/_archive/` | No longer current | Historical reference only |

---

## 3. Ground Truth Standards

### Definition

**Ground Truth** = Content that has been validated by human review and can be trusted as accurate, consistent, and complete.

### Ground Truth Criteria

| Criterion | Description | Weight |
|-----------|-------------|--------|
| **Accuracy** | Factual correctness, no errors | 25% |
| **Completeness** | All required sections present | 20% |
| **Consistency** | Matches established Arcanea lore | 20% |
| **Quality** | Writing quality, clarity, depth | 15% |
| **Schema Compliance** | Follows required format | 10% |
| **No Hallucinations** | Doesn't contradict existing canon | 10% |

### Minimum Thresholds

| Content Type | Sections Required | Min Word Count | Schema Version |
|--------------|-------------------|----------------|----------------|
| **Bestiary Creature** | 10 sections | 1,500 words | 2.0 |
| **Luminor Profile** | 7 sections | 1,200 words | 2.0 |
| **Guardian Profile** | 8 sections | 1,500 words | 2.0 |
| **Godbeast Profile** | 8 sections | 1,500 words | 2.0 |
| **Archangel Profile** | 7 sections | 1,200 words | 2.0 |
| **Agent** | Frontmatter + body | 800 words | 1.0 |

### Schema Versioning

```yaml
# Frontmatter Schema Version 2.0 (required for all new lore)

---
name: "entity-name"           # kebab-case, unique
title: "Entity Name"          # Title case, display name
description: "Brief description"  # Max 100 chars

# REQUIRED FOR GROUND TRUTH
schema_version: "2.0"         # Must be "2.0" for new lore
created: "2026-01-14"         # ISO date
version: "1.0.0"              # Semantic version
status: "approved|deprecated"  # Will be "approved" after review

# Categorization
category: "bestiary|luminor|guardian|godbeast|archangel"
element: "fire|water|earth|wind|void|light|prismatic"
wisdom: "sophron|kardia|valora|eudaira|orakis|poiesis|enduran"

# Canon information
canon: true                   # Must be true for ground truth
requires_approval: true
approved_by: ""               # Will be filled after approval
approved_date: ""             # Will be filled after approval
reviewer_notes: ""            # Optional review feedback

# Content structure
sections:
  - "description"
  - "habitat"
  - "symptoms"
  - "lies"
  - "weakness"
  - "combat_tactics"
  - "prevention"
  - "recovery"
  - "wisdom"
  - "invocation"  # Optional

# Relationship mapping
related_entities: []         # Links to other lore entities
opposing_entities: []        # Entities that counter this one
complementary_entities: []   # Entities that work well with this one

# Validation
validated_by: ""
validated_date: ""
validation_notes: ""
---
```

---

## 4. Review Checklist

### Pre-Review Checklist

- [ ] File exists in `staging/_pending/`
- [ ] Filename follows naming convention
- [ ] Frontmatter is complete
- [ ] `schema_version: "2.0"` is present
- [ ] File has been scanned for "TODO" markers
- [ ] File length meets minimum threshold

### Content Review Checklist

| Category | Check | Pass/Fail |
|----------|-------|-----------|
| **Accuracy** | | |
| | No factual errors in Arcanea lore | ___ |
| | No contradictions with existing canon | ___ |
| | Names/spellings match established canon | ___ |
| **Completeness** | | |
| | All required sections present | ___ |
| | Each section has substantive content | ___ |
| | Meets minimum word count | ___ |
| **Consistency** | | |
| | Follows established voice/tone | ___ |
| | Formatting matches other documents | ___ |
| | Terminology matches Arcanea standards | ___ |
| **Quality** | | |
| | Writing is clear and engaging | ___ |
| | Prose flows logically | ___ |
| | No placeholder text | ___ |
| **Schema** | | |
| | Frontmatter complete | ___ |
| | Required fields present | ___ |
| | No missing fields | ___ |

### Review Outcome Options

| Outcome | Action |
|---------|--------|
| **APPROVE** | Move to `production/`, set status to "approved" |
| **REQUEST_CHANGES** | Move to `staging/_testing/` with feedback |
| **REJECT** | Move to `staging/_pending/` with rejection reason |

---

## 5. Approval Process

### Step 1: Agent Production

```bash
# Agent creates new lore in staging
# Example: Creating a Guardian profile

1. Agent receives task: "Create Guardian profile for Lyssandria"
2. Agent creates file: lore/staging/guardians/lyssandria.md
3. Agent sets frontmatter:
   - status: "new"
   - schema_version: "2.0"
   - created: today's date
4. Agent outputs completion message
```

### Step 2: Queue for Review

```
# Automatic queue entry created

File: lore/staging/guardians/lyssandria.md
Status: NEW
Created: 2026-01-14
Category: guardian
Schema: 2.0
```

### Step 3: Human Review

```
# Reviewer opens file

1. Read complete document
2. Complete review checklist
3. Record findings
4. Make decision
```

### Step 4: Approval or Changes

**If APPROVED:**
```bash
# Move to production
mv lore/staging/guardians/lyssandria.md lore/production/guardians/lyssandria.md

# Update frontmatter
status: "approved"
approved_by: "reviewer_name"
approved_date: "2026-01-14"

# Log approval
echo "lyssandria.md approved by reviewer_name on 2026-01-14" >> workflows/APPROVAL_LOG.md
```

**If REQUEST_CHANGES:**
```bash
# Move to testing with feedback
mv lore/staging/guardians/lyssandria.md lore/staging/_testing/lyssandria.md

# Create feedback file
echo "Feedback for lyssandria.md:" > lore/staging/_testing/lyssandria.feedback.md
# ... add feedback
```

### Step 5: Production

```
# Approved content becomes ground truth

Production Location: lore/production/guardians/lyssandria.md
Status: APPROVED (canon)
Usage: All agents reference this as source of truth
```

---

## 6. Agent Production Guidelines

### Before Creating Content

1. **Check existing canon**
   ```bash
   # Check if entity already exists
   grep -r "entity_name" lore/production/
   
   # Check naming conventions
   ls lore/production/{category}/
   ```

2. **Review schema requirements**
   ```bash
   # Read schema version
   head -10 lore/production/{category}/example.md
   ```

3. **Check for conflicts**
   ```bash
   # Search for related entities
   grep -r "related_entity" lore/production/
   ```

### Creating Content

```yaml
# FRONTMATTER (required)
---
name: "entity-name"
title: "Entity Name"
description: "Brief description"

schema_version: "2.0"
created: "2026-01-14"
version: "1.0.0"
status: "new"

category: "guardian"
element: "earth"
wisdom: "sophron"

canon: true
requires_approval: true

sections:
  - "description"
  - "habitat"
  - "abilities"
  - "personality"
  - "relationships"
  - "history"
  - "wisdom"
  - "invocation"

related_entities: []
opposing_entities: []
complementary_entities: []
---

# BODY CONTENT
[Follow existing document structure exactly]
```

### After Creating Content

1. **Self-validate**
   - [ ] All required sections present?
   - [ ] Word count meets minimum?
   - [ ] No "TODO" or "incomplete" markers?
   - [ ] Formatting consistent?

2. **Output location**
   ```bash
   # Move to staging
   cp new_entity.md lore/staging/{category}/new_entity.md
   
   # Create completion record
   echo "Created: lore/staging/{category}/new_entity.md" >> workflows/PRODUCTION_LOG.md
   ```

3. **Wait for approval**
   - Content stays in staging until human approves
   - Monitor `workflows/APPROVAL_LOG.md` for decisions

---

## Quick Reference: Commands

| Action | Command |
|--------|---------|
| Check existing entities | `ls lore/production/{category}/` |
| Search for entity | `grep -r "name" lore/production/` |
| Check schema | `head -10 lore/production/{category}/example.md` |
| View approval log | `cat workflows/APPROVAL_LOG.md` |
| View production log | `cat workflows/PRODUCTION_LOG.md` |

---

## Review Rating Scale

| Rating | Meaning | Action |
|--------|---------|--------|
| **A** | Excellent, publish as-is | Immediate approval |
| **B** | Good, minor tweaks | Approve with notes |
| **C** | Acceptable, needs work | Request specific changes |
| **D** | Major issues | Reject, requires rewrite |
| **F** | Does not meet standards | Reject entirely |

---

## Best Practices

### For Agents

1. **Always check canon first** - Don't contradict existing lore
2. **Follow schema exactly** - Frontmatter must be complete
3. **Use existing documents as templates** - Match structure and voice
4. **No hallucinations** - If unsure, note it in comments
5. **Complete all sections** - Partial content delays approval

### For Reviewers

1. **Be thorough** - Ground truth must be accurate
2. **Be timely** - Staging queue shouldn't grow too large
3. **Be specific** - Give actionable feedback for changes
4. **Be consistent** - Apply same standards to all content
5. **Document decisions** - Approval log tracks all choices

---

## Ground Truth Validation Score

When reviewing, calculate:

```
Accuracy (25%) + Completeness (20%) + Consistency (20%) + Quality (15%) + Schema (10%) + No Hallucinations (10%) = FINAL SCORE
```

**Minimum for Approval: 85%**

If score < 85%, either:
- Request changes (if close to threshold)
- Reject (if far from threshold)

---

*Document Version: 1.0.0*
*Status: HUMAN-IN-THE-LOOP WORKFLOW ESTABLISHED*
*Next: Begin creating Guardians with this system*
