# World Template

This is the master template for creating new Arcanean worlds. Clone this directory to start building your own universe.

## Quick Start

1. **Copy this template**:
   ```bash
   cp -r worlds/_template worlds/my-world-name
   cd worlds/my-world-name
   ```

2. **Configure your world**:
   Edit `world.arcanea` with your world's basic settings

3. **Build foundations**:
   Complete the files in `foundations/`:
   - `cosmology.md` - How your universe works
   - `magic-system.md` - Rules of magic (if applicable)
   - `history-timeline.md` - Key historical events
   - `natural-laws.md` - Physics, biology, fundamental rules

4. **Populate your world**:
   Use the slash commands or agents:
   - `/design-location` - Create places
   - `/create-character` - Add characters
   - `/define-magic-rule` - Expand magic
   - `/generate-realm` - Generate entire world

5. **Validate consistency**:
   Use the **lore-master** and **consistency-validator** agents

## Directory Structure

```
my-world/
├── world.arcanea          # World configuration
├── README.md              # This file - customize for your world
├── foundations/           # Core world rules
│   ├── cosmology.md
│   ├── magic-system.md
│   ├── history-timeline.md
│   └── natural-laws.md
├── geography/             # Places & locations
│   ├── _index.md
│   ├── realms/            # Continents, planets, planes
│   ├── regions/           # Countries, territories
│   └── locations/         # Cities, villages, landmarks
├── cultures/              # Societies & civilizations
│   └── [culture-name]/
│       ├── overview.md
│       ├── customs.arc
│       ├── language.arc
│       └── governance.arc
├── characters/            # People & beings
│   ├── _index.md
│   └── [character-name]/
│       ├── profile.md
│       ├── backstory.arc
│       └── relationships.arc
├── magic/                 # Supernatural elements
│   ├── systems/           # Magic categories
│   ├── artifacts/         # Magical items
│   └── phenomena/         # Magical events/places
├── conflicts/             # Stories & tensions
│   ├── major-conflicts.md
│   ├── prophecies.md
│   └── quests/            # Adventures & missions
├── artifacts/             # Non-magical items of significance
└── species/               # Races & creatures
```

## File Naming

- Use lowercase with hyphens: `melodia-soul-guardian.arc`
- Entity IDs match filenames (without extension)
- Index files: `_index.md` in each category
- Templates: Prefix with `_template-`

## Next Steps

Start with the foundations, then expand outward. Use the AI agents to help maintain consistency as your world grows.

**Welcome to world-building. Create something infinite.**
