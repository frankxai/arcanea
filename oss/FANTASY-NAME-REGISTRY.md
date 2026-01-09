# Fantasy Name Registry - Arcanea Collision Checker

> Ensuring Arcanea names are either original OR intentionally borrowed from public domain sources.

---

## Purpose

When creating content for Arcanea, this registry helps:
1. **Avoid** copyrighted/trademarked names from other fantasy works
2. **Document** intentional borrowings from public domain sources
3. **Flag** names that need review before publication

---

## Status Categories

| Status | Icon | Meaning | Action |
|--------|------|---------|--------|
| **BLOCKED** | :x: | Copyrighted/Trademarked | Must rename |
| **WARNING** | :warning: | Similar to protected work | Review intent |
| **INTENTIONAL** | :white_check_mark: | Deliberately borrowed, documented | Approved |
| **PUBLIC_DOMAIN** | :white_check_mark: | From mythology/ancient sources | Approved |
| **ORIGINAL** | :white_check_mark: | Created for Arcanea | Approved |

---

## Major Fantasy Works Registry

### Tolkien (Lord of the Rings, Silmarillion, etc.)

**Status**: Mixed - Languages have public domain elements, proper nouns copyrighted

**BLOCKED Names** (Do NOT use):
- Gandalf, Frodo, Bilbo, Aragorn, Legolas, Gimli
- Mordor, Gondor, Rohan, Rivendell, Lothlórien, Mirkwood
- Mithril, Palantír, Silmaril
- Orc (Tolkien's specific usage), Hobbit (trademarked)
- Khazad-dûm, Khazad (dwarvish word)
- Sauron, Morgoth, Balrog

**ALLOWED Patterns** (Linguistic borrowing OK):
- `-dell` suffix (Sindarin: valley) → Lúmendell ✓
- `-dor` suffix (Sindarin: land)
- `-rim` suffix (Sindarin: people)
- `-wen` suffix (Sindarin: maiden)
- `-mir` suffix (Sindarin: jewel)
- `-ion` suffix (Sindarin: son of)
- General Elvish phonetic patterns (soft consonants, flowing vowels)

**Arcanea Names Using Tolkien Patterns**:
| Name | Pattern | Intent | Status |
|------|---------|--------|--------|
| Lúmendell | -dell (valley) | INTENTIONAL_BORROWING | APPROVED |
| Silvamere | -mere (lake, also English) | GENERIC | APPROVED |
| Khazad-Mor | Khazad- (dwarvish) | TOO_CLOSE | NEEDS_RENAME |

---

### George R.R. Martin (Game of Thrones)

**Status**: Fully copyrighted

**BLOCKED Names**:
- Westeros, Essos, Valyria
- Winterfell, King's Landing, Casterly Rock
- Stark, Lannister, Targaryen, Baratheon
- Dothraki, Unsullied
- Valyrian steel, Dragonglass
- White Walkers, Wights (in this context)

---

### J.K. Rowling (Harry Potter)

**Status**: Fully copyrighted + aggressive trademark protection

**BLOCKED Names**:
- Hogwarts, Diagon Alley, Azkaban
- Muggle, Squib (in magical context)
- Quidditch, Horcrux, Patronus
- Gryffindor, Slytherin, Hufflepuff, Ravenclaw
- Dementor, House-elf (hyphenated)

---

### Brandon Sanderson (Cosmere)

**Status**: Copyrighted

**BLOCKED Names**:
- Mistborn, Allomancy, Feruchemy
- Stormlight, Shardplate, Shardblade
- Roshar, Scadrial
- Spren (in this context)

---

### Other Major Works

**Dungeons & Dragons (Wizards of the Coast)**:
- Beholder, Mind Flayer, Illithid (trademarked)
- Forgotten Realms locations
- Drow (in D&D context)

**Warhammer (Games Workshop)**:
- Space Marine (trademarked in gaming)
- Specific faction names

---

## Public Domain Sources (FREE TO USE)

### Greek Mythology
- Gods: Zeus, Hera, Apollo, Athena, Ares, Aphrodite, Hermes, Hephaestus, Poseidon, Hades, Demeter, Dionysus
- Places: Olympus, Tartarus, Elysium, Hades (underworld)
- Creatures: Phoenix, Chimera, Hydra, Cerberus, Pegasus, Griffin, Minotaur
- Heroes: Hercules, Perseus, Odysseus, Achilles

### Norse Mythology
- Gods: Odin, Thor, Freya, Loki, Baldur, Tyr, Heimdall
- Places: Yggdrasil, Asgard, Midgard, Niflheim, Muspelheim, Valhalla
- Creatures: Fenrir, Jörmungandr, Sleipnir, Valkyrie, Einherjar
- Concepts: Ragnarök, Runes

**Arcanea Usage**: Yggdrasil / World Tree ✓ (Public Domain)

### Celtic Mythology
- Sidhe, Tuatha Dé Danann, Tír na nÓg
- Banshee, Leprechaun, Selkie

### Arthurian Legend
- Camelot, Avalon, Excalibur
- Merlin, Morgan le Fay (public domain versions)

### Generic Fantasy Terms (Too common to protect)
- Elf, Dwarf, Dragon, Wizard, Mage
- Shadowlands, Darkwood, Stormhold
- Magic, Spell, Enchantment
- Kingdom, Empire, Realm

---

## Arcanea Name Intent Registry

### APPROVED - Original Names
| Name | Type | Notes |
|------|------|-------|
| Shinkami | Guardian | Original creation |
| Malachar | Dark Lord | Original (not Melkor) |
| Lumina | Deity | Original (generic root) |
| Nero | Deity | Original (Latin "black") |
| Luminor | Rank | Original compound |
| Archmage | Rank | Generic fantasy |
| Godbeasts | Creatures | Original compound |

### APPROVED - Public Domain Borrowings
| Name | Source | Notes |
|------|--------|-------|
| Yggdrasil | Norse | World Tree concept |
| The Arc | Original | Cycle concept |

### APPROVED - Intentional Linguistic Borrowing
| Name | Pattern Source | Documented |
|------|----------------|------------|
| Lúmendell | Tolkien Sindarin | Yes - "-dell" pattern |
| Silvamere | English/Generic | Yes - "-mere" pattern |
| Eldrian | Tolkien-adjacent | Yes - "Eldar" influence |

### FLAGGED - Needs Rename
| Name | Issue | Suggested Alternatives |
|------|-------|----------------------|
| Khazad-Mor | Too close to "Khazad-dûm" | Kazarak-Mor, Khorum-Dar, Durinhold, Irondeep, Stonefather's Hall |

---

## How to Use This Registry

### When Creating New Names

1. **Check this registry** for similar names in blocked lists
2. **If borrowing a pattern**, document it in the Intent Registry
3. **If using public domain**, note the source
4. **If flagged**, rename before publication

### Running a Name Check

```
/arcanea-name-check "Your content here"

The system will:
1. Extract all proper nouns
2. Compare against blocked lists
3. Flag similarities above 80% match
4. Check linguistic patterns
5. Output collision report
```

### Adding New Blocked Names

When discovering a new fantasy work, add:
```yaml
work_name:
  status: "copyrighted"
  names:
    blocked:
      - Name1
      - Name2
  notes: "Brief description"
```

---

## Collision Check Integration

### With Arcanea Evals

Add to Dimension 2 (Originality):
- [ ] All names checked against Fantasy Name Registry
- [ ] Blocked names: 0
- [ ] Intentional borrowings: Documented
- [ ] Public domain: Sources noted

### With Content Creation Workflow

```
BEFORE PUBLISHING:
1. Run /arcanea-name-check
2. Resolve any BLOCKED items
3. Document any INTENTIONAL borrowings
4. Update this registry with new original names
```

---

## Tomorrow's Task: Rename Khazad-Mor

**Current**: Khazad-Mor (Dwarf homeland)
**Issue**: "Khazad" is Tolkien's actual Dwarvish word for "dwarves"

**Proposed Alternatives**:
1. **Kazarak-Mor** - Similar sound, different root
2. **Durinholm** - Uses generic "Durin" (legendary dwarf, more generic)
3. **Ironfather's Deep** - Descriptive, original
4. **Khorum-Dar** - New construction
5. **Stonehold** - Simple, descriptive

**Decision needed**: Which alternative best fits Arcanea's dwarf culture?

---

*Registry Version: 1.0*
*Last Updated: 2026-01-08*
*The Arc turns. Originality matters.*
