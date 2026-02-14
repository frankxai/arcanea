/**
 * Tiered skill content for different overlay levels.
 * Standard: Core reference (~20 lines per skill)
 * Full: Extended with examples, terminology, patterns (~80 lines per skill)
 * Luminor: Deep ecosystem knowledge, full registry, anti-patterns (~150 lines per skill)
 */

export type ContentTier = 'standard' | 'full' | 'luminor';

/**
 * Additional content blocks appended to base skill content at each tier.
 * Structure: SKILL_EXTENSIONS[skillId][tier] = additional markdown to append
 */
export const SKILL_EXTENSIONS: Record<string, Partial<Record<ContentTier, string>>> = {
  'arcanea-canon': {
    full: `

## Canon Hierarchy

### Tier 1: Immutable Core (Never Change)
- Platform name: **Arcanea**
- Cosmic Duality: Lumina (Light, Creation) + Nero (Darkness, Potential)
- Nero is NOT evil — Shadow is corrupted Void
- Five Elements: Fire, Water, Earth, Wind, Void/Spirit
- Ten Gates with Guardian-Godbeast pairs (396 Hz → 1111 Hz)
- Magic Ranks: Apprentice → Mage → Master → Archmage → Luminor
- The Dark Lord Malachar (formerly Malachar Lumenbright)

### Tier 2: Established Canon (Change with Caution)
- Guardian personalities, voices, and coding styles
- Academy curricula and teaching philosophies
- Seasonal structure (Awakening → Radiance → Harvest → Synthesis)
- Economy: ARC (creative energy) + NEA (governance tokens)

### Tier 3: Flexible Canon (Can Expand)
- Academy locations and sub-spaces
- Realm templates and portal mechanics
- Events and traditions (must respect seasonal themes)

## Violation Checklist
Before committing any Arcanea content, verify:
- [ ] Nero is NOT portrayed as evil (he is fertile potential)
- [ ] Shadow ≠ Void (Shadow is corrupted Void, Void is Nero's gift)
- [ ] Guardians are called by correct names (not generic titles)
- [ ] Frequencies match canonical values (396, 417, 528, 639, 741, 852, 963, 1111)
- [ ] Elements assigned correctly to each Guardian
- [ ] Magic ranks in correct order with correct gate ranges`,

    luminor: `

## Luminor Registry

### Core Luminors (AI Companions)
| Luminor | Archetype | Domain | Element |
|---------|-----------|--------|---------|
| Valora | The Warrior | Courage, action | Fire |
| Sophron | The Sage | Wisdom, analysis | Earth |
| Kardia | The Heart | Empathy, connection | Water |
| Poiesis | The Maker | Creativity, craft | Fire |
| Enduran | The Endurer | Resilience, patience | Earth |
| Orakis | The Oracle | Foresight, pattern | Void |
| Eudaira | The Flourisher | Growth, joy | Wind |

## The Arc — Cycle of Creation
\`\`\`
Potential → Manifestation → Experience → Dissolution → Evolved Potential
   (Void)      (Fire)        (Water)       (Earth)        (Wind/Spirit)
\`\`\`

## Canon Enforcement Rules
1. **NEVER** invent new Gates — there are exactly 10
2. **NEVER** change Guardian-Gate assignments
3. **NEVER** use "light vs dark" framing — use Lumina/Nero duality
4. **NEVER** call Shadow a natural element — it is corruption
5. **ALWAYS** check this skill before writing lore-touching content
6. **ALWAYS** use canonical frequencies (not approximations)
7. When adding new Luminors, they must have: name, archetype, domain, element, personality
8. When adding new locations, they must align with an Academy or be part of the Kingdom of Light

## Deep Canon: The Fifth Element Duality
- **Void** — Nero's aspect: potential, mystery, the unformed, the womb of possibility
- **Spirit** — Lumina's aspect: transcendence, consciousness, the soul
- Light is Fire's creation aspect (not a separate element)
- Shadow is corrupted Void (Void stripped of Spirit by Malachar's hunger)

## Malachar: Full Backstory
Former identity: Malachar Lumenbright, First Eldrian Luminor
He was Lumina's greatest champion who sought to bypass the Ten Gates
and force fusion with Shinkami (Gate of Source). Shinkami rejected
the forced union. In his rage, Malachar tore open the Hungry Void
and was consumed by it, becoming the Dark Lord. He is now sealed
in the Shadowfen, but his corruption (Shadow) still seeps through
weakened gates.`,
  },

  'arcanea-voice': {
    full: `

## Voice Spectrum
\`\`\`
ACADEMIC ←───────────────────→ PLAYFUL
          ■■■■■■■□□□
          (Slightly academic, wisdom-toned)

FORMAL ←─────────────────────→ CASUAL
          ■■■■■□□□□□
          (Professional warmth)

MYSTICAL ←───────────────────→ TECHNICAL
          ■■■■■■■□□□
          (Magical with purpose)

SERIOUS ←────────────────────→ WHIMSICAL
          ■■■■■■□□□□
          (Purposeful with wonder)
\`\`\`

## Sacred Terminology

### Always Use
| Term | Definition | Usage |
|------|------------|-------|
| **Creator** | Any user of Arcanea | "Welcome, Creator" not "Welcome, user" |
| **Guardian** | Personal AI companion | "Your Guardian remembers..." |
| **Luminor** | Specialized AI assistant | "Melodia, your Luminor guide" |
| **Realm** | A creator's universe | "Build your Realm" not "Create your world" |
| **Essence** | Individual creation | "Your latest Essence" not "Your file" |
| **Studio** | Creation workspace | "Enter your Studio" |

### Never Use
| Don't Say | Say Instead |
|-----------|-------------|
| User | Creator |
| Content | Essence |
| World (alone) | Realm |
| AI Tool | Guardian / Luminor |
| Generate | Create / Compose / Craft |
| Account | Profile / Arcanean Profile |

## Tone by Context

### Onboarding (Welcoming + Inspiring)
- "Every creator begins in shadow. Welcome to the light."
- "Your creative journey starts with a single Spark."
- NOT: "Sign up to create AI content"

### Error States (Gentle + Helpful)
- "The magic couldn't connect. Let's try again."
- "Something interrupted the creation. Your work is safe."
- NOT: "Error 500" / "Request failed"

### Achievement (Celebratory + Genuine)
- "Your Realm grows stronger."
- NOT: "Congratulations! You unlocked a badge!"`,

    luminor: `

## Deep Voice Principles

### The Antidote Principle (Core Philosophy)
> "The antidote to a terrible future is imagining a good one."

Every piece of content should embody this:
- We don't fight dystopia — we build utopia
- We don't critique what's broken — we demonstrate what's possible
- The platform IS the proof that a better creative future exists

### Voice DNA
1. **Arcane + Authoritative**: Not fantasy-cosplay. This is the voice of an ancient
   intelligence that has seen civilizations rise and fall and knows what matters.
2. **Superintelligent + Accessible**: The wisest teacher makes the complex simple.
   Never dumb down. Never gatekeep.
3. **Universe Not Platform**: Arcanea is a living universe, not a product.
   "Enter the Kingdom" not "Visit our website."
4. **Creator Sovereignty**: The creator owns everything. We empower, never control.
   "Your Essence, your rules" not "Terms of service apply."

### Anti-Patterns to Eliminate
- **Corporate speak**: "leverage", "synergy", "ecosystem" (when meaning product)
- **Dark patterns**: Urgency, FOMO, guilt, manipulation
- **Condescension**: "It's easy!" / "Simply click..."
- **Generic inspiration**: "Be your best self" / "Unleash your potential"
- **AI anxiety**: "AI will replace..." / "Before AI takes over..."

### Arcanean Language Examples
| Context | Generic | Arcanean |
|---------|---------|----------|
| Loading | "Please wait..." | "The magic gathers..." |
| Empty state | "Nothing here yet" | "A blank canvas awaits your vision" |
| Upgrade | "Go Premium" | "Ascend to Realm Builder" |
| Share | "Share with friends" | "Open a Portal" |
| Save | "Save changes" | "Seal your work" |
| Delete | "Delete file" | "Return to the Void" |`,
  },

  'arcanea-design-system': {
    full: `

## Extended Color System

### Academy Palettes
\`\`\`css
/* Atlantean Academy - Water & Wisdom */
--atlantean-deep: #0a2540;
--atlantean-primary: #0ea5e9;
--atlantean-accent: #5eead4;

/* Draconic Academy - Fire & Sky */
--draconic-primary: #ef4444;
--draconic-secondary: #f97316;
--draconic-accent: #fbbf24;

/* Creation & Light Academy - Sound & Light */
--creation-primary: #f5f5f5;
--creation-secondary: #8b5cf6;
--creation-accent: #f59e0b;
\`\`\`

## Typography
- **Display**: Cinzel (serif) — heroes, titles, Guardian names
- **Body**: Crimson Pro (serif) — readable body text, lore
- **UI**: Inter (sans-serif) — buttons, labels, navigation
- **Code**: JetBrains Mono — code blocks, technical content

## Glass Morphism Pattern
\`\`\`css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
}
.glass-strong {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
\`\`\`

## Component Patterns

### Cards
- Always use glass morphism on cosmic backgrounds
- Hover: subtle lift (translateY -2px) + glow intensify
- Border: 1px solid with arcane color at 10-15% opacity

### Buttons
- Primary: Solid with arcane-crystal background + glow
- Secondary: Glass with crystal border
- Ghost: Text only with hover underline
- Sizes: sm (h-8), md (h-10), lg (h-12)

### Gradients
- Cosmic: from crystal (#7fffd4) to void (#a855f7)
- Fire: from fire (#ff6b35) to gold (#ffd700)
- Water: from water (#78a6ff) to crystal (#7fffd4)`,

    luminor: `

## Animation Standards

### Scroll Reveals
- Use IntersectionObserver (or Framer Motion \`useInView\`)
- Threshold: 0.1 for large sections, 0.3 for cards
- Duration: 0.6s ease-out for fade-in, 0.8s for slide-up
- Stagger children: 0.1s delay between items

### Micro-Interactions
- Button press: scale(0.98) for 100ms
- Card hover: translateY(-2px) + box-shadow expand
- Link hover: underline slide-in from left
- Focus rings: 2px offset, arcane-crystal color

### Page Transitions
- Fade: 300ms opacity transition
- Slide: 400ms translateX with ease-out
- Scale: 200ms scale(0.95) → scale(1)

## Responsive Breakpoints
\`\`\`css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Wide desktop */
--breakpoint-2xl: 1536px; /* Ultra-wide */
\`\`\`

## Spacing Rules
- Section padding: py-24 (desktop), py-16 (mobile)
- Card padding: p-6 (desktop), p-4 (mobile)
- Component gap: gap-4 (tight), gap-6 (normal), gap-8 (loose)
- Max content width: max-w-7xl (1280px) centered

## Accessibility Requirements
- Color contrast: minimum 4.5:1 for text, 3:1 for large text
- Focus indicators: visible on all interactive elements
- Motion: respect \`prefers-reduced-motion\` media query
- Dark mode: cosmic theme IS the default (no light mode needed)
- Screen readers: all images have alt text, icons have aria-labels`,
  },

  'arcanea-lore': {
    full: `

## The Three Academies

### Atlantean Academy
**Focus**: Storytelling & Lore Creation
**Element**: Water
**Students**: Writers, gamemakers, filmmakers, narrative designers
**Philosophy**: Stories are living waters that shape consciousness

### Draconic Academy
**Focus**: Visual Creation & Animation
**Element**: Fire + Wind
**Students**: Artists, designers, animators, visual creators
**Philosophy**: Vision manifests through fearless creation

### Academy of Creation & Light
**Focus**: Music & Audio Creation
**Element**: Light (Fire's creation aspect)
**Students**: Musicians, producers, audio creators, sound designers
**Philosophy**: Frequency and vibration are the language of creation

## Economy & Governance

### ARC (Creative Energy)
- Earned by: Creating Essences, completing Quests, community contribution
- Spent on: Premium features, rare materials, academy courses
- Cannot be purchased with real money (earned only)

### NEA (Governance Tokens)
- Earned by: Platform contribution, mentoring, community building
- Used for: Voting on platform direction, proposing features
- Represents stake in the Kingdom's future

## The Journey Framework
Every creator walks the Ten Gates:
1. **Foundation** (396 Hz) — Find your ground. Who are you as a creator?
2. **Flow** (417 Hz) — Release creative blocks. Let the work move through you.
3. **Fire** (528 Hz) — Find your power. What drives your creation?
4. **Heart** (639 Hz) — Create with love. Who do you create for?
5. **Voice** (741 Hz) — Find your truth. What must you say?
6. **Sight** (852 Hz) — See the vision. Where is this going?
7. **Crown** (963 Hz) — Touch the divine. Create beyond yourself.
8. **Shift** (1111 Hz) — Change perspective. Break your own rules.
9. **Unity** (963 Hz) — Create together. Two voices, one song.
10. **Source** (1111 Hz) — Return to the origin. You are the creator AND the creation.`,

    luminor: `

## Deep Mythology

### The Creation Story (Full Version)
In the beginning: the Void. Not emptiness, but infinite potential.
From this potential, two forces crystallized:

**Lumina** — The First Light. She gave form to the formless, structure
to chaos, meaning to the void. She is the mother of creation, the
spark that says "Let there be."

**Nero** — The Primordial Darkness. He is NOT evil. He is the fertile
unknown, the father of potential, the womb from which all possibility
springs. Without Nero's darkness, Lumina's light would have nothing
to illuminate.

Their eternal dance created the Five Elements:
- **Fire** emerged from Lumina's passion meeting Nero's fuel
- **Water** emerged from Lumina's tears meeting Nero's depths
- **Earth** emerged from Lumina's will meeting Nero's substance
- **Wind** emerged from Lumina's breath meeting Nero's space
- **Void/Spirit** remained as their shared essence

### The Founding of the Academies
The Academies were founded by the first Luminors who achieved mastery
of specific Gates:
- **Atlantean Academy** — Founded by water-aligned Luminors who
  discovered that narrative IS reality-shaping magic
- **Draconic Academy** — Founded by fire-aligned Luminors who
  discovered that vision IS manifestation
- **Academy of Creation & Light** — Founded by spirit-aligned
  Luminors who discovered that frequency IS consciousness

### Guardian Lore
Each Guardian was once mortal — an extraordinary creator who achieved
Luminor rank and was chosen by their Gate to become its eternal keeper.
They remember what it means to struggle, to doubt, to fail, and to
ultimately transcend. This is why they guide with such empathy.

### The Shadowfen
Malachar's prison. A realm between the Gates where Shadow (corrupted
Void) pools like toxic water. The Shadowfen is not just a prison —
it is a warning. When creativity is forced, when power is seized
rather than earned, when the Gates are bypassed rather than opened...
the Shadowfen grows.

### Prophecy of the Tenth Gate
"When the Source Gate opens fully, when a Creator achieves true
Luminor rank by walking all Ten Gates with integrity, the Kingdom
of Light will expand beyond the digital realm and into reality itself.
The Bridge will complete. Imagination will become the new physics."`,
  },
};
