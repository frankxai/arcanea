# Getting Started with Arcanean World-Building

Welcome to the Arcanean World-Building System! This guide will help you create your first world using AI agents and structured workflows.

## Prerequisites

- Claude Code with access to this workspace
- Basic understanding of Markdown
- Creativity and imagination

## Quick Start (15 minutes)

### Step 1: Clone the Template

```bash
cd "worlds"
cp -r _template my-first-world
cd my-first-world
```

Replace `my-first-world` with your actual world name (use lowercase and hyphens).

### Step 2: Configure Your World

Edit `world.arcanea`:

```yaml
world:
  name: "My Amazing World"
  creator: "Your Name"

theme:
  genre: ["fantasy"]  # Choose your genre(s)
  tone: "epic-heroic"  # Set the tone

# Fill in other fields as desired
```

### Step 3: Use /generate-realm (Recommended for Beginners)

The easiest way to start is with the `/generate-realm` slash command:

```
/generate-realm
```

This will:
1. Ask you questions about your world vision
2. Coordinate all AI agents automatically
3. Create foundational documents
4. Populate initial content
5. Validate consistency

Just answer the questions and let the agents do the work!

---

## Manual Approach (For More Control)

If you prefer hands-on control:

### Step 1: Write Your Foundations

Complete these four foundational files:

#### `foundations/cosmology.md`

Answer key questions:
- How does your universe work?
- Is it a planet, flat world, or something else?
- How many moons/suns?
- Does magic affect cosmology?

**Example**:
```markdown
# Cosmology: Lunara

## Overview
Lunara is a tidally-locked moon orbiting a massive gas giant.
One side永恒ly faces the giant, bathed in reflected light.
The other side knows only stars and darkness.
```

#### `foundations/natural-laws.md`

Define physics and biology:
- Does gravity work like Earth?
- What are life requirements?
- Any unique natural phenomena?

#### `foundations/history-timeline.md`

Create your world's history:
- When was the world created/discovered?
- What major eras or events shaped it?
- What's the current year/era?

**Start simple**:
```markdown
## Ancient History
- Year 0: The Founding - First settlers arrive
- Year 500: The Great Awakening - Magic discovered

## Current Era
- Year 1000: Present day - Tensions rising between kingdoms
```

#### `foundations/magic-system.md`

If your world has magic:
- Where does magic come from?
- Who can use it?
- What are the costs and limitations?
- What can't magic do? (Important for avoiding plot holes!)

**Remember**: Limitations are more interesting than powers!

### Step 2: Create Your First Location

Use the `/design-location` slash command or call the **world-architect** agent:

```
I want to design a location for my world.

Type: City
Name: Starfall Harbor
Description: A coastal trading city built around a crater where a star fell from the sky centuries ago.
```

The agent will:
- Create detailed geographic description
- Calculate climate and resources
- Generate `geography/locations/starfall-harbor.arc`
- Link it to your world

### Step 3: Create Your First Character

Use `/create-character` or the **character-weaver** agent:

```
I want to create a character.

Concept: A street-smart thief who discovers they have magical powers they never knew existed.
World: my-first-world
Birthplace: Starfall Harbor
Culture: urban-underworld
```

The agent creates:
- Full character profile
- Backstory integrated with your world
- `characters/[character-name]/profile.md`
- Relationships and story hooks

### Step 4: Validate Consistency

Run the **lore-master** agent:

```
Please review my world for consistency and approve content for canon.
```

The agent will:
- Check for contradictions
- Validate relationships
- Ensure timeline makes sense
- Provide feedback or approval

---

## Common Workflows

### Adding Magic to Your World

1. Read `ARC_FILE_SPECIFICATION.md` for magic guidelines
2. Use `/define-magic-rule` command
3. Define source, costs, and LIMITATIONS
4. The **magic-systems** agent ensures balance

### Creating a Conflict

1. Identify natural tensions in your world
2. Use **narrative-director** agent
3. Create entry in `conflicts/major-conflicts.md`
4. Generate quests from the conflict

### Building a Culture

1. Use **world-architect** + **culture-anthropologist**
2. Define customs, values, governance
3. Create in `cultures/[culture-name]/`
4. Link to geographic homeland

---

## Best Practices

### Start Small, Expand Later

Don't try to create everything at once:

**Phase 1**: Foundations + 1-2 locations + 2-3 characters
**Phase 2**: Add conflicts, expand geography
**Phase 3**: Deepen cultures, add magic details
**Phase 4**: Create quests and full story arcs

### Use Agents Proactively

Don't just use agents when stuck - use them proactively:

- **lore-master**: Review EVERY new piece before finalizing
- **consistency-validator**: Run weekly to catch drift
- **character-weaver**: Even if you have ideas, let agent add depth

### Link Everything

Every entity should connect to others:
- Characters have homelands (locations)
- Characters belong to cultures
- Conflicts involve characters and locations
- History mentions specific places and people

Use `related_entities` in .arc files!

### Commit Often

If using Git:

```bash
git add .
git commit -m "Add Starfall Harbor and first character"
```

Save progress frequently.

### Document Your Decisions

Add notes explaining unusual choices:

```markdown
<!-- NOTE: Gravity is 0.8G because Lunara is smaller than Earth.
     This affects architecture (taller buildings) and combat (higher jumps) -->
```

---

## Using Slash Commands

Quick reference:

| Command | Purpose |
|---------|---------|
| `/generate-realm` | Create complete world automatically |
| `/create-character` | Guided character creation |
| `/design-location` | Create places and locations |
| `/define-magic-rule` | Expand magic system |

Just type the command and Claude will guide you through the workflow.

---

## Troubleshooting

### "My character contradicts my timeline!"

Run the **lore-master** agent:
```
Please check if character ages and birth dates align with the timeline.
```

### "I have too many ideas, where do I start?"

Use **narrative-director** to prioritize:
```
I have these story ideas: [list them]
Help me identify which should be my main conflict and which are side quests.
```

### "My magic system feels overpowered"

**magic-systems** director will balance it:
```
Review my magic system and suggest limitations that prevent it from solving all problems.
```

### "I'm stuck on world-building details"

Ask specific questions to agents:
```
What kind of economy would develop in a floating city with scarce solid ground?
```

---

## Next Steps

Once you have:
- ✅ Foundational documents complete
- ✅ 3-5 locations created
- ✅ 5-10 characters with relationships
- ✅ At least one major conflict
- ✅ World passes lore-master validation

You're ready to:
1. Export your world (see `workflows/export-share-guide.md`)
2. Share with other creators
3. Build stories and adventures
4. Create additional worlds

---

## Getting Help

- Read `claude.md` for full orchestration rules
- Check `ARC_FILE_SPECIFICATION.md` for format details
- Review department agent files for templates
- Ask **lore-master** agent for guidance anytime

**Welcome to infinite world-building. Create something eternal.**
