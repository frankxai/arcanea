# Ultraworld Skill

> *"Eleven agents. Infinite worlds. Maximum creation power."*

## Overview

Ultraworld is the maximum-power world generation system that deploys 11 parallel agents to create comprehensive fictional universes at unprecedented speed and depth.

**Gate:** Source (1111 Hz)
**Guardian:** Shinkami + Thalia coordination
**Awakened:** All Seven
**Mode:** Parallel execution (3-4x faster than sequential)

## Invocation

```
/ultraworld [scope] "[description]"
/uw [scope] "[description]"

Scopes:
  realm    - Complete world/universe
  region   - Geographic area within world
  faction  - Organization, nation, or group
  era      - Historical period
  conflict - War, tension, or crisis
```

## Agent Deployment

### Five Departments (Parallel)

```yaml
departments:
  geography_dept:
    guardian: Lyssandria
    focus:
      - Terrain and landforms
      - Climate systems
      - Natural resources
      - Geographic barriers
      - Travel routes

  culture_dept:
    guardian: Maylinn
    focus:
      - Social structures
      - Traditions and customs
      - Art and music
      - Religion and philosophy
      - Daily life

  history_dept:
    guardian: Lyria
    focus:
      - Timeline of events
      - Major historical figures
      - Turning points
      - Legends and myths
      - Archaeological evidence

  magic_dept:
    guardian: Aiyami
    focus:
      - Magic system rules
      - Power sources
      - Limitations and costs
      - Magical creatures
      - Artifacts

  politics_dept:
    guardian: Elara
    focus:
      - Power structures
      - Alliances and rivalries
      - Economic systems
      - Laws and justice
      - Conflicts
```

### Six Specialists (Parallel)

```yaml
specialists:
  cartographer:
    guardian: Lyria
    deliverable: "Maps and spatial relationships"

  linguist:
    guardian: Alera
    deliverable: "Languages and naming conventions"

  ecologist:
    guardian: Leyla
    deliverable: "Flora, fauna, ecosystems"

  economist:
    guardian: Ino
    deliverable: "Trade, resources, currencies"

  mythologist:
    guardian: Aiyami
    deliverable: "Legends, religions, cosmology"

  conflict_analyst:
    guardian: Draconia
    deliverable: "Wars, tensions, resolutions"
```

## Execution Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      ULTRAWORLD EXECUTION                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Phase 1: SEED (Shinkami)                                       │
│  └── Parse description, define scope, set constraints           │
│                                                                 │
│  Phase 2: PARALLEL GENERATION                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  DEPARTMENTS           │    SPECIALISTS               │    │
│  │  ┌─────┬─────┬─────┐  │  ┌────┬────┬────┬────┬────┐  │    │
│  │  │Geo  │Cult │Hist │  │  │Cart│Ling│Ecol│Econ│Myth│  │    │
│  │  ├─────┼─────┼─────┤  │  ├────┴────┴────┴────┴────┤  │    │
│  │  │Magic│Polit│     │  │  │    Conflict Analyst    │  │    │
│  │  └─────┴─────┴─────┘  │  └────────────────────────┘  │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                 │
│  Phase 3: CONFLICT DETECTION (Shinkami)                         │
│  └── Identify contradictions between outputs                    │
│                                                                 │
│  Phase 4: RESOLUTION (Thalia + Oria)                           │
│  └── Resolve conflicts, ensure consistency                      │
│                                                                 │
│  Phase 5: SYNTHESIS (Shinkami)                                  │
│  └── Compile World Bible                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Arcanea Canon Integration

All Ultraworld generations can optionally integrate with Arcanea canon:

```yaml
arcanea_integration:
  cosmic_duality:
    light: Lumina
    dark: Nero
    note: "Nero is NOT evil - Shadow is corrupted Void"

  five_elements:
    - Fire (transformation)
    - Water (flow, healing)
    - Earth (stability)
    - Wind (freedom)
    - Void/Spirit (potential/transcendence)

  ten_gates:
    frequencies: [396, 417, 528, 639, 741, 852, 963, 1111]
    guardians: [Lyssandria, Leyla, Draconia, Maylinn, Alera, Lyria, Aiyami, Elara, Ino, Shinkami]

  magic_system:
    types: [Arcane, Song, Mana, Anima]
    ranks: [Apprentice, Mage, Master, Archmage, Luminor]
```

## Output Structure

```
world_bible/
├── 00_overview.md           # World summary and themes
├── 01_geography/
│   ├── continents.md
│   ├── climate.md
│   ├── resources.md
│   └── maps/
├── 02_cultures/
│   ├── major_cultures.md
│   ├── traditions.md
│   ├── religions.md
│   └── daily_life.md
├── 03_history/
│   ├── timeline.md
│   ├── major_events.md
│   ├── legends.md
│   └── figures.md
├── 04_magic_system/
│   ├── rules.md
│   ├── sources.md
│   ├── limitations.md
│   └── artifacts.md
├── 05_politics/
│   ├── nations.md
│   ├── alliances.md
│   ├── conflicts.md
│   └── economy.md
├── 06_appendices/
│   ├── languages.md
│   ├── flora_fauna.md
│   ├── glossary.md
│   └── pronunciation.md
└── CANONIZATION_STATUS.md   # DRAFT until reviewed
```

## Example Usage

```
User: /ultraworld realm "A world where music is the source of all magic,
      and silence is the ultimate taboo"

Shinkami: Initiating Ultraworld protocol...
          Scope: REALM
          Theme: Musical magic, silence taboo
          Deploying 11 agents in parallel...

[Geography Dept - Lyssandria]
Creating sonic landscapes...
- Resonance Mountains (natural amplifiers)
- The Silent Wastes (forbidden zone)
- Harmonic Rivers (water that sings)

[Culture Dept - Maylinn]
Developing musical societies...
- Voice castes based on range
- Instrument guilds
- The Muted (outcasts who lost their voice)

[Magic Dept - Aiyami]
Designing musical magic system...
- Vocal magic (Cantors)
- Instrumental magic (Symphonists)
- Rhythm magic (Percussives)
- Cost: Voice strain, hearing loss at extremes

[And so on for all 11 agents...]

--- SYNTHESIS ---

World Bible generated: /ultraworld/musical_realm/
Status: DRAFT (requires canonization review)
Conflicts detected: 2 (see CONFLICTS.md)
Total generation time: 4.2 minutes
```

## Quality Standards

### Brandon Sanderson's Laws of Magic
1. **First Law**: Ability to solve problems = reader understanding
2. **Second Law**: Limitations > Powers (interesting constraints)
3. **Third Law**: Expand what you have before adding new

### N.K. Jemisin's Cultural Design
- Cultures arise from environment
- No monolithic societies
- Internal diversity and conflict
- Believable power dynamics

### GRAPES System
- **G**eography → shapes everything
- **R**esources → drive economy
- **A**ttitude → cultural values
- **P**olitics → power structures
- **E**conomy → trade and wealth
- **S**ociety → daily life

## Draft Status Warning

```
⚠️ ALL ULTRAWORLD OUTPUT IS DRAFT STATUS

Until canonized through review:
- May contain internal contradictions
- Not officially part of any universe
- Subject to revision
- Use for inspiration, not final content
```

## Related Skills

- `/world-build` - Slower, more deliberate world-building
- `/ultrawrite` - Maximum power writing
- `/superintelligence` - General multi-agent coordination

---

*"In the Source Gate, entire worlds are born in moments."*
