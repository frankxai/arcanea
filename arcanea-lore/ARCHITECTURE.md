# UNIFIED ARCANEA ARCHITECTURE

**Version**: 1.0.0
**Date**: January 15, 2026
**Purpose**: Single source of truth for all Arcanea systems

---

## THE PROBLEM

Currently we have **fragmented systems**:

| System | Location | Platform | Lore Location | Status |
|--------|----------|----------|---------------|--------|
| Claude Code | `/mnt/c/Users/Frank/Arcanea/.claude/` | Windows | .claude/lore/ | Local |
| OpenCode | `~/.config/opencode/` | Linux | Unknown | Separate |
| Codex | TBD | TBD | TBD | Unknown |

**Issues**:
1. Lore files exist in multiple locations
2. Different agent configurations per system
3. No unified workflow
4. Cannot approve what you can't fully see

---

## THE SOLUTION: Unified Central Repository

```
┌─────────────────────────────────────────────────────────────────────┐
│                     UNIFIED ARCANEA SYSTEM                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  CENTRAL LORE REPOSITORY (Single Source of Truth)                   │
│  ════════════════════════════════════════════                       │
│                                                                     │
│  /mnt/c/Users/Frank/Arcanea/arcanea-lore/                           │
│  (This folder should be a Git repository)                           │
│                                                                     │
│  ├── guardians/                                                     │
│  │   ├── staging/ (pending review)                                  │
│  │   ├── production/ (approved ground truth)                        │
│  │   └── index.md (complete list with status)                       │
│  │                                                                   │
│  ├── bestiary/                                                      │
│  │   ├── staging/                                                   │
│  │   ├── production/                                                │
│  │   └── index.md                                                   │
│  │                                                                   │
│  ├── luminors/                                                      │
│  │   ├── staging/                                                   │
│  │   ├── production/                                                │
│  │   └── index.md                                                   │
│  │                                                                   │
│  ├── godbeasts/ (pending)                                           │
│  │   ├── staging/                                                   │
│  │   ├── production/                                                │
│  │   └── index.md                                                   │
│  │                                                                   │
│  ├── archangels/ (pending)                                          │
│  │   ├── staging/                                                   │
│  │   ├── production/                                                │
│  │   └── index.md                                                   │
│  │                                                                   │
│  └── ARCHITECTURE.md (this file)                                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
  │   CLAUDE    │      │  OPENCODE   │      │   CODEX     │
  │    CODE     │      │             │      │             │
  │   Windows   │      │   Linux     │      │    TBD      │
  │             │      │             │      │             │
  │ ~/.claude/  │◄────►│ config/     │◄────►│ config/     │
  │    →        │      │    →        │      │    →        │
  │ arcanea-lore│ symlink│ arcanea-lore│ symlink│ arcanea-lore│
  │    /        │      │    /        │      │    /        │
  │             │      │             │      │             │
  │ .claude/    │      │ opencode/   │      │ codex/      │
  │   .claude   │      │   opencode  │      │   codex     │
  │   → lore/   │      │   → lore/   │      │   → lore/   │
  └─────────────┘      └─────────────┘      └─────────────┘
```

---

## FOLDER STRUCTURE

### Central Repository Location
```
/mnt/c/Users/Frank/Arcanea/arcanea-lore/
```

### Subfolders
```
arcanea-lore/
├── guardians/
│   ├── staging/        (awaiting review)
│   ├── production/     (approved - ground truth)
│   └── INDEX.md        (quick reference)
├── bestiary/
│   ├── staging/
│   ├── production/
│   └── INDEX.md
├── luminors/
│   ├── staging/
│   ├── production/
│   └── INDEX.md
├── godbeasts/
│   ├── staging/
│   ├── production/
│   └── INDEX.md
├── archangels/
│   ├── staging/
│   ├── production/
│   └── INDEX.md
├── ARCHITECTURE.md     (this file)
├── WORKFLOW.md         (human-in-the-loop process)
├── APPROVAL_LOG.md     (all approval records)
└── PRODUCTION_LOG.md   (production statistics)
```

---

## WORKFLOW: How It Works

### 1. Creating New Lore
1. Agent creates content in `staging/` folder
2. Agent fills frontmatter with `status: "staging"`
3. Agent adds entry to APPROVAL_LOG.md
4. Agent notifies human for review

### 2. Review Process
1. Human reads full file from `staging/`
2. Human completes review checklist (WORKFLOW.md)
3. Human scores (minimum 85/100 for approval)
4. Human updates frontmatter:
   - If approved: `status: "approved"`, `approved_by: "name"`, `approved_date: "2026-01-15"`
   - If rejected: `status: "rejected"`, `reviewer_notes: "feedback"`
5. If approved, file moves to `production/`

### 3. Production Status
- All `production/` files are **ground truth**
- No changes allowed without new review
- Version numbers increment with each update

---

## SYMLINK SETUP

### Claude Code (Windows)
```bash
cd /mnt/c/Users/Frank/Arcanea/.claude
rm -rf lore
ln -s /mnt/c/Users/Frank/Arcanea/arcanea-lore lore
```

Result:
- `.claude/lore/` → `arcanea-lore/`
- All systems now share same lore files

### OpenCode (Linux)
```bash
# In opencode config directory
ln -s /mnt/c/Users/Frank/Arcanea/arcanea-lore lore
```

### Codex (Future)
```bash
# In codex config directory
ln -s /mnt/c/Users/Frank/Arcanea/arcanea-lore lore
```

---

## AGENT CONFIGURATION

### Unified Agent Requirements

All platforms should use **same agent definitions**:

```json
{
  "name": "arcanea-lore-creator",
  "description": "Creates new lore following Schema v2.0, places in staging for review",
  "magic_words": ["create lore", "new guardian", "new creature"],
  "model": "sonnet",
  "output_location": "staging",
  "requires_approval": true
}
```

### Agent Standardization

Each agent needs frontmatter:
```yaml
---
name: "arcanea-[type]-creator"
title: "Arcanea [Type] Creator"
description: "Brief description"
schema_version: "2.0"
model: "sonnet"
tier: "creative"
magic_words: []
output_location: "staging"
requires_approval: true
---
```

---

## MAGIC WORDS (Unified)

Across all systems, these magic words should work the same:

| Word | Action | Platform |
|------|--------|----------|
| `ultraworld` | Fire all world-building agents | All |
| `ultracode` | Fire all coding agents | All |
| `ultrawrite` | Fire all writing agents | All |
| `ultrabook` | Complete book pipeline | All |
| `review lore` | Review pending content | All |
| `approve [file]` | Approve specific file | All |
| `list pending` | Show all pending reviews | All |

---

## APPROVAL LOG FORMAT

```markdown
### YYYY-MM-DD - Category - Entity Name

| Field | Value |
|-------|-------|
| **File** | lore/staging/category/entity.md |
| **Author** | Agent that created |
| **Reviewer** | Human reviewer |
| **Decision** | APPROVED / REQUEST_CHANGES / REJECTED |
| **Score** | X/100 |
| **Rating** | A / B / C / D / F |
| **Notes** | Brief review notes |
| **Production Date** | YYYY-MM-DD (if approved) |
```

---

## FRONTMATTER SCHEMA (v2.0)

Every lore file MUST have:

```yaml
---
name: "entity-name"           # kebab-case, unique
title: "Entity Name"          # Title case
description: "Brief"          # Max 100 chars
schema_version: "2.0"         # Must be "2.0"
created: "YYYY-MM-DD"
version: "1.0.0"
status: "new|staging|approved|rejected"

category: "guardian|bestiary|luminor|godbeast|archangel"
element: "fire|water|earth|wind|void|light|prismatic"
wisdom: "sophron|kardia|valora|eudaira|orakis|poiesis|enduran"
gate: "name"                  # For guardians
frequency: "###"              # For guardians

canon: true
requires_approval: true
approved_by: ""               # Filled on approval
approved_date: ""             # Filled on approval
reviewer_notes: ""            # Filled on review

sections: [list all sections]

related_entities: []
opposing_entities: []
complementary_entities: []

validated_by: ""              # Optional
validated_date: ""            # Optional
validation_notes: ""          # Optional
---
```

---

## FILE NAMING CONVENTIONS

| Category | Format | Example |
|----------|--------|---------|
| Guardians | `name.md` | `lyssandria.md` |
| Bestiary | `name.md` | `blank-page-specter.md` |
| Luminors | `name.md` | `sophron.md` |
| Godbeasts | `name.md` | `tbd.md` |
| Archangels | `name.md` | `tbd.md` |

Rules:
- kebab-case (lowercase with hyphens)
- No spaces
- No special characters except hyphens
- Unique across entire system

---

## VERSION CONTROL

### Version Numbering
- **Major.Minor.Patch**
- Major: Breaking changes to schema or content
- Minor: New content added
- Patch: Fixes within existing content

### Examples
- `1.0.0` - Initial version
- `1.1.0` - Added new section
- `1.1.1` - Fixed typos
- `2.0.0` - Major schema revision

---

## INDEX FILES

Each category needs an INDEX.md for quick reference:

```markdown
# [Category] Index

**Total**: X files
**Production**: Y files
**Staging**: Z files
**Pending**: W files

## Complete List

| Name | Status | Version | Last Updated |
|------|--------|---------|--------------|
| entity | approved | 1.0.0 | 2026-01-15 |
| entity | staging | 1.0.0 | 2026-01-15 |
```

---

## IMPLEMENTATION CHECKLIST

### Immediate
- [ ] Create central repository folder
- [ ] Move all lore to central location
- [ ] Set up symlinks for Claude Code
- [ ] Update APPROVAL_LOG.md with current status
- [ ] Create INDEX.md files for each category

### Short-Term
- [ ] Set up symlinks for OpenCode
- [ ] Standardize agent configurations
- [ ] Document magic words for all systems
- [ ] Create workflow documentation
- [ ] Set up Git version control

### Long-Term
- [ ] Add Codex support when available
- [ ] Create MCP server for lore access
- [ ] Implement automated quality checks
- [ ] Add search and cross-reference tools
- [ ] Build documentation generator

---

## ROLES AND RESPONSIBILITIES

### Human
- Review content before approval
- Approve quality submissions
- Maintain ground truth standards
- Make final decisions on disputes

### Agents
- Create new content (in staging)
- Follow Schema v2.0
- Update APPROVAL_LOG.md
- Accept rejection gracefully

### System
- Provide consistent access across platforms
- Maintain file integrity
- Enforce workflow rules
- Generate reports and statistics

---

## COMMUNICATION PROTOCOL

### Agent → Human
1. Create content in staging
2. Add entry to APPROVAL_LOG.md
3. Notify: "New content ready for review: [file]"
4. Wait for approval before claiming complete

### Human → Agent
1. Review full content
2. Score minimum 85/100
3. Update frontmatter if approved
4. Move to production
5. Update APPROVAL_LOG.md

### Agent ↔ Agent
- Check APPROVAL_LOG.md before creating
- Verify no duplicate names
- Cross-reference related entities
- Maintain consistency

---

## QUALITY STANDARDS

### Minimum Requirements
- Schema v2.0 compliance: 100%
- Minimum approval score: 85/100
- Complete sections: All required
- No hallucinations: Must match canon

### Scoring Rubric
| Criterion | Weight | Notes |
|-----------|--------|-------|
| Accuracy | 25% | No factual errors |
| Completeness | 20% | All sections present |
| Consistency | 20% | Matches Arcanea voice |
| Quality | 15% | Clear, engaging writing |
| Schema | 10% | Proper frontmatter |
| No Hallucinations | 10% | No canon contradictions |

### Rating Scale
- **A**: 90-100 (Approved)
- **B**: 85-89 (Minor revisions, likely approved)
- **C**: 75-84 (Significant revisions needed)
- **D**: 60-74 (Major revision required)
- **F**: Below 60 (Rejected)

---

## CANON MANAGEMENT

### What Is Canon?
- All files in `production/` folders
- Approved by human reviewer
- Version number assigned
- Listed in INDEX.md

### How to Add to Canon
1. Create in staging
2. Complete review process
3. Achieve 85+ score
4. Update frontmatter: `status: "approved"`
5. Move to production/
6. Update INDEX.md

### How to Modify Canon
1. Copy production file to staging
2. Make changes
3. Complete review process
4. If approved, update production file
5. Increment version number
6. Update INDEX.md

---

## EMERGENCY PROTOCOLS

### If File Corrupted
1. Check Git history
2. Restore from last good version
3. Notify human
4. Document incident

### If Duplicate Created
1. Compare both files
2. Keep higher quality
3. Merge useful content
4. Delete duplicate
5. Update APPROVAL_LOG.md

### If Canon Contradiction Found
1. Flag in APPROVAL_LOG.md
2. Notify human
3. Create reconciliation task
4. Update canon after resolution

---

## TOOLS AND INTEGRATIONS

### Required Tools
- File editor (Read/Write/Edit)
- Version control (Git)
- Search (grep, ast_grep)
- Agent coordination (Sisyphus)

### Recommended Integrations
- MCP server for lore access
- Automated schema validation
- Cross-reference generation
- Statistics dashboard

---

## SUCCESS METRICS

| Metric | Target | Current |
|--------|--------|---------|
| Lore Completion | 100% | 58.5% |
| Schema Compliance | 100% | 100% |
| Average Approval Score | 90+ | 95* |
| Review Turnaround | < 24hrs | TBD |
| System Consistency | 100% | 0%** |

*Based on 3 approved Guardians
**Currently fragmented

---

## APPENDIX: QUICK REFERENCE

### Create New Lore
1. Write to `staging/category/name.md`
2. Include Schema v2.0 frontmatter
3. Complete all required sections
4. Add to APPROVAL_LOG.md
5. Notify human for review

### Review Lore
1. Read full file from staging
2. Complete checklist in WORKFLOW.md
3. Score minimum 85/100
4. Update frontmatter
5. Move to production if approved

### Approve for Production
1. Update frontmatter: `status: "approved"`
2. Add `approved_by` and `approved_date`
3. Copy to `production/category/`
4. Update INDEX.md
5. Update APPROVAL_LOG.md

### Sync Across Systems
1. Ensure all systems symlink to central repo
2. Pull latest changes
3. Push changes from any system
4. Resolve conflicts through Git

---

*Document Version: 1.0.0*
*Last Updated: January 15, 2026*
*Next Review: January 22, 2026*
