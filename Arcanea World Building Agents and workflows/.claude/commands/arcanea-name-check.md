# Name Collision Check Command

> **Command**: `/arcanea-name-check [content-or-file]`
> **Purpose**: Check names against Fantasy Name Registry for copyright compliance

## Quick Start

```bash
# Check content directly
/arcanea-name-check "The warrior Gandark fought in the Khazad-Mor mountains"

# Check a file
/arcanea-name-check characters/new-character.arc

# Check all draft content
/arcanea-name-check --all-drafts
```

## What Gets Checked

### 1. Blocked Names (MUST RENAME)
Names directly copied from copyrighted works:
- Tolkien proper nouns (Gandalf, Mordor, Rivendell)
- GRRM names (Westeros, Winterfell, Targaryen)
- Rowling terms (Hogwarts, Muggle, Quidditch)
- Sanderson terms (Mistborn, Allomancy, Shardplate)
- D&D trademarked (Beholder, Mind Flayer)

### 2. Warning Names (REVIEW INTENT)
Similar to protected works (>80% match):
- Partial matches
- Phonetic similarities
- Pattern matches that might confuse readers

### 3. Intentional Borrowings (DOCUMENT)
Public domain linguistic patterns we USE intentionally:
- Tolkien linguistic patterns (Sindarin sounds)
- Suffix patterns (-dell, -mere, -dor)
- Phonetic aesthetics (flowing vowels)

### 4. Public Domain (FREE TO USE)
Ancient mythology and generic terms:
- Greek/Norse/Celtic mythology
- Generic fantasy terms (elf, dwarf, dragon)
- Arthurian legend

## Check Process

```typescript
// Step 1: Extract proper nouns
const nouns = extract_proper_nouns(content)

// Step 2: Load registry
const registry = await read("oss/FANTASY-NAME-REGISTRY.md")

// Step 3: Check each noun
for (const noun of nouns) {
  // Check against blocked lists
  if (registry.blocked.includes(noun)) {
    report.blocked.push({ name: noun, source: registry.source })
  }

  // Check similarity
  for (const blocked of registry.all_blocked) {
    if (similarity(noun, blocked) > 0.8) {
      report.warnings.push({ name: noun, similar_to: blocked })
    }
  }

  // Check if intentionally borrowed
  if (registry.intentional.includes(noun)) {
    report.documented.push({ name: noun, intent: registry.intent })
  }
}

// Step 4: Generate report
return generate_collision_report(report)
```

## Collision Report Format

```markdown
# Name Collision Report

**Content**: [File or input reference]
**Checked**: [Timestamp]
**Names Extracted**: 15

---

## Summary

| Category | Count | Status |
|----------|-------|--------|
| BLOCKED | 0 | None found |
| WARNING | 1 | Review needed |
| INTENTIONAL | 2 | Documented |
| PUBLIC_DOMAIN | 3 | Approved |
| ORIGINAL | 9 | Approved |

**Overall**: WARNING - Review 1 item

---

## BLOCKED Names (Must Rename)

None found.

---

## WARNING Names (Review Intent)

### 1. "Mithrandel"
**Similar to**: Mithrandir (Tolkien - Gandalf's Elvish name)
**Similarity**: 87%
**Suggestion**: If intentional Sindarin pattern, document in registry. If accidental, rename to avoid confusion.

---

## INTENTIONAL Borrowings (Documented)

### 1. "Lúmendell"
**Pattern**: -dell suffix (Sindarin: valley)
**Source**: Tolkien linguistic patterns
**Status**: APPROVED - Public domain linguistic element
**Documentation**: See oss/FANTASY-NAME-REGISTRY.md

### 2. "Silvamere"
**Pattern**: -mere suffix (English: lake/pool)
**Source**: Generic English/Old English
**Status**: APPROVED - Generic fantasy element

---

## PUBLIC DOMAIN Names

1. **Yggdrasil** - Norse mythology (World Tree)
2. **Phoenix** - Greek mythology (firebird)
3. **Valkyrie** - Norse mythology (battle maiden)

---

## ORIGINAL Names (No Collisions)

1. Shinkami
2. Malachar
3. Lumina
4. Nero
5. Luminor
6. Archmage
7. Kaelith
8. Veloura
9. Draconis

---

## Recommendations

1. **Review "Mithrandel"** - Consider documenting as intentional OR renaming
2. **All other names approved** - Ready for publication

---

## Quick Actions

Would you like me to:
1. [ ] Add "Mithrandel" to intentional borrowings (with documentation)
2. [ ] Suggest alternative names for "Mithrandel"
3. [ ] Run full originality analysis
```

## Registry Integration

The command reads from `oss/FANTASY-NAME-REGISTRY.md` which contains:
- Major fantasy works and their protected names
- Public domain mythological sources
- Arcanea's intentional borrowing documentation

### Adding New Entries

```bash
# After running check, add new original names to registry
/arcanea-name-check --register-original "Kaelith" "Veloura" "Draconis"

# Document intentional borrowing
/arcanea-name-check --register-intentional "Eldrian" --pattern "Tolkien Eldar influence"
```

## Pre-Publication Workflow

```yaml
Before Publishing:
  1. /arcanea-name-check [content]
  2. Resolve any BLOCKED items (REQUIRED)
  3. Review any WARNING items
  4. Document any INTENTIONAL borrowings
  5. Update registry with new ORIGINAL names
  6. Proceed with publication
```

## Arcanea Naming Philosophy

**Tolkien-Inspired Patterns: INTENTIONAL**

Arcanea deliberately uses linguistic patterns inspired by Tolkien's constructed languages:
- These patterns are beautiful and evocative
- Linguistic structures cannot be copyrighted
- This is homage and inspiration, not plagiarism
- DOCUMENT all intentional borrowings

**BLOCKED** (Never Use):
- Proper nouns from copyrighted works
- Trademarked terms
- Character/place names

**APPROVED** (With Documentation):
- Public domain phonetic patterns
- Generic suffix/prefix systems
- Mythological references

---

**Ready to check? Use `/arcanea-name-check [content-or-file]`**
