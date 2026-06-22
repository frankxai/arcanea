---
title: The Monster System — Arcanea's Creature Taxonomy
status: staging
type: system
---

# The Monster System

> *"Not everything that breathes in Arcanea was given a name by a God. Some things named themselves. Some things were never meant to wake."*

This is the framework that orders every living thing in Arcanea — from the faintest elemental wisp to the titans that roam outside the Ten Gates. It is **additive and reversible**: it slots new creatures into a ladder without disturbing the locked canon above it. The Ten Gate Godbeasts (Kaelith, Veloura, Draconis, Laeylinn, Otome, Yumiko, Sol, Vaelith, Kyuro, and the Source Godbeast) sit at the top, untouched. Everything new attaches below them.

The ladder runs by two questions: **how large is the thing**, and **was it ever bonded to a God**. Scale climbs as you rise. Bonding only happens at the very top.

---

## The Class Ladder

| Tier | Class | Scale | Bonding | Element behavior |
|------|-------|-------|---------|------------------|
| **T0** | Motes | Tiny (insect to bird) | None | Ambient — drift along resonance |
| **T1** | Beasts | Small to large fauna | None | Single-element, attuned to a region |
| **T2** | Shades | Symbolic / mind-scaled | None | No frequency — they feed on its absence |
| **T3** | Leviathans / Wild Godbeasts | Titan to planet-scale | **Unbonded** | Dual-element, sub-Gate resonance |
| **T4** | Gate Godbeasts | Continental, divine | **Bonded (the Ten)** | One Gate frequency, locked |

---

### T0 — Motes

The smallest expression of the Five Elements: wisps, sparks, drifting embers of Fire; dewmotes and tideflecks of Water; pebble-sprites of Earth; gust-flickers of Wind; and the rare dimmotes of Void that wink in and out of being. Motes are ambient. They gather where a region's elemental resonance runs strong — a forge, a tidepool, a ley-vein — and scatter when it fades.

- **In world:** atmosphere and omen. A bloom of fire-motes warns of a coming Ember Fall; tideflecks gather before a storm.
- **In game:** ambient particles, harvest nodes, low-tier crafting reagents. Never a real threat alone.

### T1 — Beasts

Elemental fauna — the living animals of Arcanea, shaped by the element of the land they were born to. These are the standard outputs of the `generateCreature` pipeline: flame-maned hunters of the Pyros wastes, current-sleek swimmers of the Aqualis depths, stoneback grazers of the Terra plains. A Beast carries one element and behaves like the creature it resembles, only sharpened by resonance.

- **In world:** the ecosystem. Hunted, herded, feared, befriended.
- **In game:** the bulk of overworld encounters, mounts, tamed companions, RPG trash-and-mid mobs.

### T2 — Shades

The existing **psychological bestiary** — the creative-block creatures of `book/bestiary-of-creation/`. Shades are not made of element; they are made of its **absence**. They have no frequency to resonate at. The Imposter Shade, the Overwhelm Leviathan, the creatures that rise when a Creator stalls — these are Shades, and this tier exists to give them a home in the taxonomy **without rewriting a word of them**.

> The "Overwhelm Leviathan" of the bestiary is a Shade by name and a metaphor by nature. It shares no canon with the T3 Leviathans below — the collision of words is intentional, a reminder that the inner monster and the outer one rhyme.

- **In world:** they live in the Creator's path, not on the map. They manifest where will falters.
- **In game:** inner-journey encounters, ritual challenges, the obstacles of the Library's teaching layer.

### T3 — Leviathans / Wild Godbeasts — NEW

A **Wild Godbeast** is a beast of Nero's Unformed that was never bonded to a God. Where the Ten were drawn from the same primordial stock and fused to a divine partner at a Gate, the Wild Godbeasts were left in the deep places of the world — titanic, unbonded, ungated. They are not corrupt. Nero is the fertile unknown, not the Shadow, and his Unformed birthed wonders the Gates never claimed. A Wild Godbeast roams a **region**, not a Gate. It carries **two elements**, and it resonates **below the audible Gate scale** — a sub-frequency hum that the Solfeggio ladder never reaches.

The flagship and first of this tier is **Nethyssa, the Abyss That Dreams** — the planet-scale abyssal kraken of the Drowned Deep, dual-element Water and Void, kin-adjacent to the Flow Godbeast Veloura. Where Veloura flows, Nethyssa drowns and dreams.

- **In world:** world-shaping powers. Their movements are flood myths and lost continents.
- **In game:** world-bosses, raids, oceanic world-events, legendary summons.
- **Tier status:** **OPEN** — future Leviathans may join Nethyssa, but only with Creator approval (see *How to add a new monster* below).

### T4 — Gate Godbeasts — LOCKED

The Ten. Bonded to the Ten Gods, keyed to the Ten Gate frequencies (174–1111 Hz), each the divine partner of a Gate-keeper. **This tier is closed and referenced here only for completeness.** No file in the Monster System modifies it. See `lore/godbeasts/` and `CANON_LOCKED.md` Tier 2.

---

## The Corruption Track

Running alongside the ladder — not above or below it — is the **Corruption Track**: the Shadow-touched variant of a creature at *any* tier. Shadow is corrupted Void, the Dark Lord Malachar's perversion of Nero's gift. When his influence reaches a creature, it does not climb the ladder; it inverts on the spot.

| Base | Shadow-touched | Inversion |
|------|----------------|-----------|
| Fire-mote (T0) | Hollow-mote | Drinks heat instead of giving it |
| Stoneback Beast (T1) | Husk | Body kept moving by Shadow, mind gone |
| Imposter Shade (T2) | Devouring Shade | No longer a teacher — now it consumes |
| **Nethyssa (T3)** | **The Drowned Shadow** | The dream becomes nightmare — extinction-tier |

**The T3 example — the Drowned Shadow.** When Malachar's Shadow infects Nethyssa's dream, the dream curdles into nightmare. The drowned-dead rise. Her gentle Ink-of-Forgetting becomes the **Ink-of-Unmaking** — it does not erase memory, it erases the thing remembered. This parallels how the Ten Gate Temples, when the Fall reached them, twisted into dungeons: the gift held the seed of the curse, and corruption only had to turn it. The Drowned Shadow is the worst case the Monster System contemplates, and the reason the **Tidesong** ritual exists — Leyla and Veloura's faithful sing the Lullaby of the Deep to keep the Abyss dreaming peacefully.

---

## How to Add a New Monster

The taxonomy is additive, but the canon above it is locked. New creatures enter through the same path as all Arcanean lore:

1. **Intake** — bring the proposal through the **Hermes intake** flow. Name it to Arcanean standard (Lyssandria-tier), give it a tier, a scale, an element pair (or single), and a habitat.
2. **`canon-check`** — run the canon-check skill. It verifies the creature does not contradict locked truths (the Ten, the Five Elements, the Lumina/Nero duality, Malachar as the sole true antagonist) and that any new name has Arcanean quality.
3. **`lock-decision`** — only the Creator (Frank) moves a creature from STAGING to LOCKED. T0–T2 additions are routine. T3 Leviathans are **Creator-gated** — a new titan reshapes the world's myth, so it waits for explicit approval. T4 is closed entirely.

> Motes and Beasts grow the world. Shades teach the Creator. Leviathans are events. The Gate Godbeasts are gods. Know which one you are making before you name it.
