# Arcanea Lore Manager - Terminal Workflow Guide

**Version**: 1.0.0
**Date**: January 15, 2026

---

## Quick Start

```bash
cd /mnt/c/Users/Frank/Arcanea/arcanea-lore
./menu.sh
```

This opens an interactive menu for managing Arcanea lore from the terminal.

---

## Available Commands

### View Lore

```bash
# View complete index of all lore
./tools/view-lore.sh --index

# List guardians
./tools/view-lore.sh guardians staging    # Pending review
./tools/view-lore.sh guardians production # Approved

# View specific file with full content
./tools/view-lore.sh guardians staging maylinn
```

### Approve/Reject Lore

```bash
# List all pending approvals
./tools/approve-lore.sh --list

# Approve a file
./tools/approve-lore.sh guardians maylinn

# Reject a file
./tools/approve-lore.sh --reject maylinn
```

### Interactive Menu

```bash
./menu.sh
```

Provides a text-based menu for all operations.

---

## Workflow

### 1. View Pending Files

```bash
./tools/approve-lore.sh --list
```

Shows all files awaiting review.

### 2. Read Full Content

```bash
./tools/view-lore.sh guardians staging maylinn
```

Uses `less` for pagination - press arrow keys to navigate, `q` to quit.

### 3. Approve or Reject

```bash
# Approve
./tools/approve-lore.sh guardians maylinn
# You'll be asked for your name and optional notes

# Reject
./tools/approve-lore.sh --reject maylinn
# You'll be asked for reason and your name
```

### 4. Verify Production

After approval:
- File copied to `production/` folder
- Frontmatter updated with approval status
- INDEX.md updated
- APPROVAL_LOG.md updated

---

## File Locations

```
arcanea-lore/
├── guardians/
│   ├── staging/     # Files awaiting review
│   ├── production/  # Approved files (canon)
│   └── INDEX.md     # Quick reference
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
├── tools/
│   ├── view-lore.sh     # View files
│   └── approve-lore.sh  # Approve/reject
├── menu.sh              # Interactive menu
├── ARCHITECTURE.md       # System architecture
├── WORKFLOW.md          # Detailed workflow
├── APPROVAL_LOG.md      # Approval history
└── README.md           # This file
```

---

## Review Checklist

When reviewing manually:

1. ✅ Schema v2.0 compliance (frontmatter complete)
2. ✅ All sections present
3. ✅ Consistent with Arcanea canon
4. ✅ Quality writing
5. ✅ No hallucinations (no contradictions)

Minimum score: 85/100

---

## Syncing Across Systems

### Claude Code (Windows)
```bash
# Already set up - symlink exists
ls -la .claude/lore  # Should point to arcanea-lore
```

### OpenCode (Linux)
```bash
# In OpenCode config directory
ln -s /mnt/c/Users/Frank/Arcanea/arcanea-lore lore
```

### Future Systems
```bash
# In any system's config directory
ln -s /mnt/c/Users/Frank/Arcanea/arcanea-lore lore
```

---

## Tips

- Use `./menu.sh` for an interactive interface
- Files open in `less` - use arrow keys, `Ctrl+F` forward, `Ctrl+B` back, `q` quit
- Frontmatter is displayed at the top for quick reference
- Word count shown to gauge file size
- Always read full content before approving

---

## Common Issues

### "File not found"
- Check category spelling (guardians, not guardian)
- Check status (staging, not staged)
- Check filename (maylinn, not maylinn.md)

### Permission denied
```bash
chmod +x tools/*.sh menu.sh
```

### Symlink already exists
- That's fine - the symlink is already set up

---

## Next Steps

1. ⏳ Review and approve remaining 7 Guardians
2. ⏳ Create Godbeast profiles
3. ⏳ Create Archangel profiles
4. ✅ Set up terminal workflow (DONE)
5. ⏳ Set up Git version control

---

*Document Version: 1.0.0*
