/**
 * arcanea create — Generate creative templates for characters, scenes, and magic systems
 */

import { Command } from 'commander';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { printSuccess, printInfo, printError } from '../ui/banner.js';

const TEMPLATES: Record<string, { dir: string; generate: (name: string) => string }> = {
  character: {
    dir: 'characters',
    generate: (name: string) => `# Character Profile: ${name}

## The Character Diamond

### Want (External Goal)
<!-- What does ${name} actively pursue? The visible quest. -->

### Wound (Internal Pain)
<!-- What past trauma or fear drives them? The hidden truth. -->

### Mask (False Self)
<!-- How does ${name} present themselves to the world? The performance. -->

### Need (True Growth)
<!-- What must ${name} learn or accept? The transformation. -->

---

## Identity

| Attribute | Value |
|-----------|-------|
| **Full Name** | ${name} |
| **Age** | |
| **Element** | |
| **Academy** | |
| **Rank** | |
| **Godbeast Bond** | |

## Appearance
<!-- Physical description, distinctive features, style -->

## Personality
### Strengths
-
### Flaws
-
### Quirks
-

## Voice
<!-- How does ${name} speak? Formal? Casual? Metaphor-heavy? Terse? -->
**Sample dialogue**: "${name} would say..."

## Backstory
### Origin
<!-- Where did they come from? -->

### Defining Moment
<!-- What event changed everything? -->

### Current Situation
<!-- Where are they now? What do they want? -->

## Relationships
| Character | Relationship | Dynamic |
|-----------|-------------|---------|
| | | |

## Arc
### Starting State
<!-- Who is ${name} at the beginning? -->

### Catalyst
<!-- What disrupts their world? -->

### Transformation
<!-- How do they change? -->

### Ending State
<!-- Who does ${name} become? -->

---
*"Every character carries a wound. Every wound carries a gift."*
*— The Character Diamond, Arcanea Academy Handbook*`,
  },

  scene: {
    dir: 'scenes',
    generate: (name: string) => `# Scene: ${name}

## Scene Header
| Element | Value |
|---------|-------|
| **Location** | |
| **Time** | |
| **POV Character** | |
| **Scene Goal** | What must happen in this scene? |
| **Conflict** | What opposes the goal? |
| **Outcome** | How does the scene end? (success/failure/twist) |

## The Five Senses
Anchor the reader in the physical world:

### Sight
<!-- What does the POV character see? Light, color, movement? -->

### Sound
<!-- What do they hear? Silence can be as powerful as noise. -->

### Touch / Feel
<!-- Temperature, texture, pain, comfort? -->

### Smell
<!-- Scents carry memory and emotion. -->

### Taste (if relevant)
<!-- Sometimes taste grounds a scene unexpectedly. -->

## Characters Present
| Character | Want (this scene) | Emotion | Secret |
|-----------|------------------|---------|--------|
| | | | |

## Scene Beats
1. **Opening image**:
2. **Inciting moment**:
3. **Rising tension**:
4. **Crisis point**:
5. **Resolution/Cliffhanger**:

## Emotional Arc
- **Start**: Character feels ___
- **Middle**: Tension shifts to ___
- **End**: Character feels ___

## Subtext
<!-- What is NOT being said? What do characters mean vs. what they say? -->

## Scene Connections
- **Follows from**:
- **Leads to**:
- **Foreshadows**:

---
*"A scene is a unit of change. If nothing changes, cut the scene."*
*— Scene Craft, Arcanea Academy Handbook*`,
  },

  'magic-system': {
    dir: 'magic',
    generate: (name: string) => `# Magic System: ${name}

## The Five Elements Framework

### Source
<!-- Where does the magic come from? -->
- [ ] Elemental (Fire, Water, Earth, Wind, Void)
- [ ] Divine (granted by gods or guardians)
- [ ] Internal (innate energy, willpower)
- [ ] External (artifacts, ley lines, celestial alignment)
- [ ] Hybrid (combination)

### Rules
Every magic system needs clear rules. Define yours:

| Rule | Description |
|------|-------------|
| **What it CAN do** | |
| **What it CANNOT do** | |
| **Hard limits** | |
| **Soft limits** | |

### Cost
<!-- All magic has a price. What is it? -->

| Cost Type | Description | Severity |
|-----------|-------------|----------|
| **Physical** | (exhaustion, pain, aging) | |
| **Mental** | (memory loss, madness, corruption) | |
| **Material** | (reagents, fuel, rare elements) | |
| **Spiritual** | (soul debt, karma, life force) | |
| **Social** | (taboo, isolation, fear) | |

### Scale
How powerful can magic get?

| Tier | Ability | Practitioner Level |
|------|---------|-------------------|
| **Cantrip** | Small effects | Apprentice |
| **Spell** | Moderate effects | Mage |
| **Ritual** | Large effects | Master |
| **Miracle** | World-altering | Archmage |
| **Transcendence** | Reality-bending | Luminor |

### Schools / Disciplines
| School | Element | Focus | Philosophy |
|--------|---------|-------|-----------|
| | Fire | | "Power through transformation" |
| | Water | | "Strength through adaptation" |
| | Earth | | "Endurance through foundation" |
| | Wind | | "Freedom through movement" |
| | Void | | "Potential through release" |

## Practitioners

### How is magic learned?
<!-- Academy? Apprenticeship? Innate awakening? Blood inheritance? -->

### Who cannot use magic?
<!-- Is anyone excluded? Why? Is this just or unjust? -->

## Forbidden Magic
<!-- What is considered too dangerous? Who polices this? -->

## Interactions
### Magic + Technology
<!-- How does magic interact with technology in your world? -->

### Magic + Society
<!-- How does magic shape social structures? -->

### Magic + Nature
<!-- How does magic affect the natural world? -->

---
*"A magic system is a promise to the reader: these are the rules of wonder."*
*— The Five Elements Framework, Arcanea Academy Handbook*`,
  },
};

export const createCommand = new Command('create')
  .description('Generate creative templates (character, scene, magic-system)')
  .argument('<type>', 'Template type: character, scene, magic-system')
  .argument('<name>', 'Name for the creation')
  .option('-d, --dir <path>', 'Output directory', process.cwd())
  .action(async (type: string, name: string, options: { dir: string }) => {
    try {
    const template = TEMPLATES[type];

    if (!template) {
      console.log('\n  Available templates:\n');
      for (const [key, t] of Object.entries(TEMPLATES)) {
        console.log(`    ${key.padEnd(14)} → .arcanea/${t.dir}/{name}.md`);
      }
      console.log('\n  Usage: arcanea create character "Elena Stormweaver"\n');
      return;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const outDir = join(options.dir, '.arcanea', template.dir);
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

    const content = template.generate(name);
    const filePath = join(outDir, `${slug}.md`);
    writeFileSync(filePath, content);

    printSuccess(`${type} template created: .arcanea/${template.dir}/${slug}.md`);
    printInfo(`Fill in the template to bring "${name}" to life`);
    console.log('');
    } catch (err) {
      printError(`Create failed: ${err instanceof Error ? err.message : String(err)}`);
      process.exitCode = 1;
    }
  });
