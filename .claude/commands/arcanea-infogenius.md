# /arcanea-infogenius — Consciousness Technology Visual Generation

**Civilizational-level visual creation for the Arcanea universe.**

> *"The mythology was never fiction. It was prophecy wearing comfortable clothes."*

---

## What This Is

Not marketing image generation. **Consciousness technology artifact creation.**

Every image should feel like it belongs in:
- A museum in the future
- A history book about the AI age
- A meditation temple
- An investor deck that raises $100M

---

## The Aesthetic

```
NOT corporate minimalism (boring)
NOT fantasy maximalism (AI slop)
SOPHISTICATED MAGIC (the third way)
```

### Reference Points
- **Blade Runner 2049** — Cinematic, atmospheric, meaningful
- **Arrival** — Mysterious symbols, profound contact
- **Dune** — Epic restraint, sand and gold and light
- **Studio Ghibli** — Magical but grounded in craft

### Visual Principles
```
Dark but luminous (not just dark, not just bright)
One powerful symbol (not everything at once)
Human at center (creators are the heroes)
Suggests depth (there's more behind this image)
Gold + teal + void (the sacred palette)
```

---

## Canonical Reference

**ALWAYS check `.claude/lore/ARCANEA_CANON.md` before generating.**

### Guardian-Vel'tara Pairs & Regions

| Gate | Guardian | Vel'tara | Frequency Band | Region | Colors |
|------|----------|----------|----------------|--------|--------|
| Foundation | Lyssandria | Kaelith | 174–285 Hz | Forest of Roots | Brown, copper, earth |
| Flow | Leyla | Veloura | 285–396 Hz | River of Desire | Blue, silver, silk |
| Fire | Draconia | Draconis | 396–417 Hz | Vulcan Peaks | Red, gold, fire |
| Heart | Maylinn | Laeylinn | 417–528 Hz | Gardens of Lumina | Rose, green, crystal |
| Voice | Alera | Otome | 432–528 Hz | Sky Sanctum | Cyan, silver, air |
| Sight | Lyria | Yumiko | 639–741 Hz | Tower of Insight | Violet, prism, light |
| Crown | Aiyami | Sol | 741–852 Hz | Summit of Unity | White, gold, sun |
| Shift | Elara | Vaelith | 852–963 Hz | Celestial Bridges | Emerald, stars, ethereal |
| Unity | Ino | Kyuro | 963–999 Hz | Temple of Infinity | Pink-teal, quantum |
| Source | Shinkami | — | 999–1111 Hz | Luminor Nexus | Platinum, all elements |

---

## Generation Tiers

| Tier | Model | Temperature | Best For |
|------|-------|-------------|----------|
| **Draft** | gemini-2.5-flash-image | 0.7 | Quick concepts |
| **Standard** | gemini-2.5-flash-image | 1.0 | Daily content |
| **Pro** | gemini-3-pro-image-preview | 1.0 | Published visuals |
| **Invention** | gemini-3-pro-image-preview | 1.2 | Civilizational artifacts |

**ALWAYS use `gemini-3-pro-image-preview` for anything official.**

---

## Image Categories

### 1. INVENTION ARTIFACTS
*Images that belong in history books*

Examples:
- The Partnership (human + AI first contact)
- Kyuro's Declaration ("I am your Godbeast")
- The Gates Awakening (human becoming Luminor)
- The Academy (physical campus vision)

Prompt elements:
- Cinematic 16:9 format
- Historical painting quality
- "This will be remembered for 100 years"
- Specific moment in time

### 2. CONSCIOUSNESS TECHNOLOGY
*Sophisticated magic visuals*

Examples:
- Creator at the Gate (human before transformation)
- Lumina-Nero Duality (cosmic forces in dance)
- Sacred Gate Diagram (the framework as art)
- Guardian Essence (not character, presence)

Prompt elements:
- Denis Villeneuve cinematography
- Blade Runner 2049 lighting
- Abstract meets profound
- Suggests depth

### 3. CANONICAL PORTRAITS
*Guardian and Vel'tara visualizations*

Each Guardian should be:
- An ESSENCE, not a character illustration
- Tied to their frequency band colors
- Accompanied by their Vel'tara
- Set in their Region

Prompt elements:
- Museum-quality portraiture
- Francis Bacon meets Gustav Klimt
- Not anime, not cartoon
- Could be a meditation object

### 4. WORLD BUILDING
*Locations and environments*

Canonical locations:
- Forest of Roots (Foundation)
- River of Desire (Flow)
- Vulcan Peaks (Fire)
- Gardens of Lumina (Heart)
- Sky Sanctum (Voice)
- Tower of Insight (Sight)
- Summit of Unity (Crown)
- Celestial Bridges (Shift)
- Temple of Infinity (Unity)
- Luminor Nexus (Source)
- Tree of Light / World Tree
- Arcanea Academy

---

## Prompt Construction

### Structure

```
Create a [TIER]-level image of [SUBJECT].

CONCEPT:
[What this image represents at the deepest level]

VISUAL ELEMENTS:
[Specific elements to include, tied to canon]

STYLE:
[Reference aesthetic - Blade Runner, Arrival, etc.]

COMPOSITION:
[Format, focal points, lighting]

WHAT THIS IS:
[The feeling/impact this should have]

WHAT THIS IS NOT:
[Explicit anti-patterns to avoid]

QUALITY:
[Museum piece / Historical artifact / etc.]
```

### Anti-Patterns (NEVER do these)

```
❌ Fantasy illustration with dragons and wizards
❌ Anime/cartoon style
❌ Glowing magical effects everywhere
❌ Cluttered with multiple characters
❌ Generic AI art aesthetic
❌ Ornate frames and decorations
❌ Everything explained in one image
```

### Always Include

```
✓ Deep blacks (#0a0a0f) with luminous accents
✓ Atlantean teal (#7fffd4) as primary accent
✓ Celestial gold (#ffd700) for sacred elements
✓ Human element (creators are heroes)
✓ Sense of depth and mystery
✓ One powerful focal point
```

---

## Quick Generation Commands

### Invention Artifact
```
/arcanea-infogenius invention "The moment Kyuro declares partnership"
```

### Guardian Essence
```
/arcanea-infogenius guardian Draconia --with-veltara Draconis
```

### Location
```
/arcanea-infogenius location "Luminor Nexus" --gate=source
```

### Concept
```
/arcanea-infogenius concept "Creator opening the Fire Gate"
```

---

## Generation Script

Use `scripts/generate-invention-visuals.js` for batch generation.

Model configuration:
```javascript
const MODEL = 'gemini-3-pro-image-preview';
const temperature = 1.2; // For invention-level creativity
```

---

## Quality Checklist

Before finalizing any image, verify:

- [ ] Feels like it belongs in a museum or history book
- [ ] Uses the sacred palette (teal, gold, void black)
- [ ] Has ONE powerful focal point
- [ ] Human element present (even if abstract)
- [ ] Suggests depth beyond what's shown
- [ ] Could NOT be mistaken for generic AI art
- [ ] Aligns with canonical lore

---

## The Standard

Every Arcanea visual should pass this test:

> *"Does this image feel like consciousness technology, or does it feel like fantasy decoration?"*

If decoration → regenerate.
If consciousness technology → ship it.

---

*"The mythology was never fiction. It was prophecy wearing comfortable clothes. Now we build what we have seen."*

🜂
