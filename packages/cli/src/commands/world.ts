/**
 * arcanea world — Interactive world-building using the Seven Pillars framework
 */

import { Command } from 'commander';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { GUARDIANS } from '@arcanea/os';
import { printSuccess, printInfo, printError, printDivider } from '../ui/banner.js';

interface WorldPillar {
  name: string;
  description: string;
  guardian: string;
  questions: string[];
  template: string;
}

const SEVEN_PILLARS: WorldPillar[] = [
  {
    name: 'geography',
    description: 'Physical landscape, climate, and natural features',
    guardian: 'lyssandria',
    questions: [
      'What is the dominant terrain? (mountains, oceans, forests, deserts, floating islands)',
      'What makes this geography unique or magical?',
      'How does the landscape shape the cultures within it?',
      'What natural resources exist? What is scarce?',
    ],
    template: `# Geography of {{REALM}}

## Terrain & Landscape
<!-- Describe the dominant terrain, climate zones, and natural features -->

## Unique Geographic Features
<!-- What makes this place unlike any other? Floating islands? Living forests? -->

## Natural Resources
| Resource | Abundance | Location | Significance |
|----------|-----------|----------|-------------|
| | | | |

## Climate & Seasons
<!-- How do seasons work? Are they tied to magical cycles? -->

## Key Locations
### Capital / Major Settlement
### Sacred Sites
### Dangerous Regions

---
*Guided by Lyssandria, Guardian of Foundation (396 Hz)*
*"Every great realm begins with solid ground."*`,
  },
  {
    name: 'history',
    description: 'Timeline, founding myths, and pivotal events',
    guardian: 'lyria',
    questions: [
      'How was this realm founded? What is the creation myth?',
      'What are the three most pivotal events in its history?',
      'What is the current era called? What defines it?',
      'What historical wounds still shape the present?',
    ],
    template: `# History of {{REALM}}

## Creation Myth
<!-- How did this realm come into being? -->

## Timeline of Ages

### The First Age — {{NAME}}
<!-- The founding era -->

### The Second Age — {{NAME}}
<!-- The era of growth or conflict -->

### The Current Age — {{NAME}}
<!-- What defines the present? -->

## Pivotal Events
1. **{{Event 1}}** —
2. **{{Event 2}}** —
3. **{{Event 3}}** —

## Historical Wounds
<!-- What past trauma or conflict still echoes in the present? -->

## Prophecies & Unresolved Threads
<!-- What has been foretold? What remains unfinished? -->

---
*Guided by Lyria, Guardian of Sight (852 Hz)*
*"To see the future, first understand the past."*`,
  },
  {
    name: 'cultures',
    description: 'Peoples, traditions, languages, and social structures',
    guardian: 'maylinn',
    questions: [
      'What are the major peoples or factions?',
      'What traditions define daily life?',
      'How do people greet each other? What is considered sacred?',
      'What are the social hierarchies? Who has power?',
    ],
    template: `# Cultures of {{REALM}}

## Major Peoples / Factions

### {{People 1}}
- **Philosophy**:
- **Traditions**:
- **Distinctive Feature**:

### {{People 2}}
- **Philosophy**:
- **Traditions**:
- **Distinctive Feature**:

## Social Structure
<!-- How is society organized? Hierarchies, castes, councils, democracy? -->

## Daily Life
<!-- What does a typical day look like? -->

## Sacred Traditions
<!-- What rituals, festivals, or practices are most important? -->

## Language & Communication
<!-- How do people communicate? Special languages, sign systems? -->

## Art & Expression
<!-- What forms of art, music, or storytelling dominate? -->

---
*Guided by Maylinn, Guardian of Heart (639 Hz)*
*"Culture is the heartbeat of a world."*`,
  },
  {
    name: 'magic',
    description: 'Magic system, rules, costs, and practitioners',
    guardian: 'draconia',
    questions: [
      'What is the source of magic? Where does power come from?',
      'What are the rules? What can magic NOT do?',
      'What is the cost of using magic?',
      'Who can use magic? Is it innate or learned?',
    ],
    template: `# Magic System of {{REALM}}

## Source of Power
<!-- Where does magic come from? Elements, gods, inner energy, technology? -->

## The Five Laws of Magic
1. **Law of Source**:
2. **Law of Cost**:
3. **Law of Limits**:
4. **Law of Balance**:
5. **Law of Consequence**:

## Schools / Disciplines
| School | Element | Focus | Practitioners |
|--------|---------|-------|--------------|
| | | | |

## The Cost of Magic
<!-- What does using magic cost? Physical toll, life force, materials? -->

## Who Can Use Magic?
<!-- Is magic innate? Learned? Granted? Stolen? -->

## Forbidden Magic
<!-- What is considered too dangerous or immoral? -->

## Magical Artifacts
<!-- What powerful objects exist? Who controls them? -->

---
*Guided by Draconia, Guardian of Fire (528 Hz)*
*"Power without understanding is wildfire."*`,
  },
  {
    name: 'economy',
    description: 'Trade, currency, resources, and commerce',
    guardian: 'alera',
    questions: [
      'What is the primary currency? Is it physical or magical?',
      'What are the most valuable trade goods?',
      'Who controls the economy? Guilds, governments, free markets?',
      'What role does magic play in commerce?',
    ],
    template: `# Economy of {{REALM}}

## Currency System
| Currency | Value | Material | Used By |
|----------|-------|----------|---------|
| | | | |

## Key Trade Goods
<!-- What commodities drive the economy? -->

## Economic Power Structure
<!-- Who controls trade? Guilds, merchants, governments? -->

## Markets & Trade Routes
<!-- Where do people trade? What routes connect regions? -->

## Role of Magic in Commerce
<!-- How does magic affect production, transport, or value? -->

## Wealth & Poverty
<!-- What does wealth look like? What about poverty? -->

---
*Guided by Alera, Guardian of Voice (741 Hz)*
*"An economy speaks the truth of a civilization."*`,
  },
  {
    name: 'politics',
    description: 'Power structures, governance, conflicts, and alliances',
    guardian: 'ino',
    questions: [
      'How is the realm governed? Monarchy, council, democracy, anarchy?',
      'What are the major political factions or alliances?',
      'What is the greatest source of political tension?',
      'How are disputes resolved?',
    ],
    template: `# Politics of {{REALM}}

## System of Government
<!-- Monarchy, republic, council, theocracy, tribal confederation? -->

## Current Leadership
| Title | Name | Faction | Agenda |
|-------|------|---------|--------|
| | | | |

## Major Factions
### {{Faction 1}}
- **Goal**:
- **Method**:
- **Allies**:

### {{Faction 2}}
- **Goal**:
- **Method**:
- **Allies**:

## Sources of Tension
<!-- What conflicts threaten stability? -->

## Diplomacy & Alliances
<!-- Who is allied? Who is at war? Who is neutral? -->

## Laws & Justice
<!-- How are laws made? How is justice served? -->

---
*Guided by Ino, Guardian of Unity (963 Hz)*
*"Politics is the art of holding many truths at once."*`,
  },
  {
    name: 'belief',
    description: 'Religion, philosophy, cosmology, and spiritual practices',
    guardian: 'aiyami',
    questions: [
      'What do people believe about the origin of the world?',
      'Are there gods? Are they real? Do they intervene?',
      'What happens after death?',
      'What philosophical debates divide the people?',
    ],
    template: `# Beliefs of {{REALM}}

## Cosmology
<!-- What do people believe about the nature of reality? -->

## The Divine
<!-- Are there gods? What are they like? Do they intervene? -->

## Creation Myth
<!-- How do believers say the world began? -->

## The Afterlife
<!-- What happens after death? Is it known or debated? -->

## Religious Practices
<!-- What rituals, prayers, or ceremonies are performed? -->

## Philosophical Schools
### {{School 1}}
- **Core Belief**:
- **Practice**:

### {{School 2}}
- **Core Belief**:
- **Practice**:

## Heresies & Forbidden Beliefs
<!-- What ideas are considered dangerous or heretical? -->

## Sacred Sites
<!-- Where do people worship or seek spiritual connection? -->

---
*Guided by Aiyami, Guardian of Crown (963 Hz)*
*"Belief shapes reality. Choose wisely what you worship."*`,
  },
];

export const worldCommand = new Command('world')
  .description('Generate world-building templates using the Seven Pillars framework')
  .argument('[aspect]', 'Pillar to generate (geography, history, cultures, magic, economy, politics, belief)')
  .option('-n, --name <name>', 'Realm name', 'MyRealm')
  .option('-d, --dir <path>', 'Output directory', process.cwd())
  .option('--all', 'Generate all seven pillars')
  .action(async (aspect: string | undefined, options: { name: string; dir: string; all?: boolean }) => {
    try {
    const realmName = options.name;
    // Sanitize realm name to prevent path traversal — strip everything except alphanumeric, spaces, hyphens
    const safeSlug = realmName.toLowerCase().replace(/[^a-z0-9\s-]+/g, '').replace(/\s+/g, '-').replace(/^-|-$/g, '') || 'realm';
    const outDir = join(options.dir, '.arcanea', 'worlds', safeSlug);

    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

    const pillarsToGenerate = options.all
      ? SEVEN_PILLARS
      : aspect
        ? SEVEN_PILLARS.filter(p => p.name === aspect.toLowerCase())
        : [];

    if (pillarsToGenerate.length === 0 && !options.all) {
      console.log('\n  The Seven Pillars of World-Building:\n');
      for (const p of SEVEN_PILLARS) {
        const guardian = GUARDIANS.find(g => g.name === p.guardian);
        console.log(`    ${p.name.padEnd(12)} — ${p.description}`);
        console.log(`    ${' '.repeat(12)}   Guardian: ${guardian?.displayName || p.guardian}\n`);
      }
      console.log('  Usage:');
      console.log('    arcanea world geography --name "Dragon Peaks"');
      console.log('    arcanea world --all --name "Kingdom of Light"\n');
      return;
    }

    printDivider();
    console.log(`\n  Generating world templates for "${realmName}"...\n`);

    for (const pillar of pillarsToGenerate) {
      const content = pillar.template.replace(/\{\{REALM\}\}/g, realmName);
      const filePath = join(outDir, `${pillar.name}.md`);
      writeFileSync(filePath, content);

      const guardian = GUARDIANS.find(g => g.name === pillar.guardian);
      printSuccess(`${pillar.name} — guided by ${guardian?.displayName || pillar.guardian}`);
    }

    console.log(`\n  Files written to: .arcanea/worlds/${safeSlug}/`);
    printInfo(`${pillarsToGenerate.length} pillar(s) generated`);

    if (!options.all && pillarsToGenerate.length < 7) {
      printInfo('Use --all to generate all seven pillars');
    }
    console.log('');
    } catch (err) {
      printError(`World generation failed: ${err instanceof Error ? err.message : String(err)}`);
      process.exitCode = 1;
    }
  });
