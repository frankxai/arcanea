---
title: Nethyssa — Game Design Spec
status: staging
type: game-design
---

# Nethyssa — Game Design

> *"You will not slay the Abyss. The best you can hope for is to leave it dreaming."*

Game-integration spec for **Nethyssa, the Abyss That Dreams** — the flagship Tier 3 Leviathan (lore: [`nethyssa.md`](./nethyssa.md)). Nethyssa is not a creature you grind down. She is a **planet-scale world-event** whose every phase is a different kind of danger, and whose true "victory" is a draw: she returns to sleep. This document maps her lore abilities to mechanics and shows how she surfaces across the existing game types.

---

## Encounter Type

Nethyssa is a **convergent encounter** — she appears as more than one thing depending on the surface:

- **Oceanic world-event** — the default. The Drowned Deep stirs; coasts fog over; Krakenlings surface. A region-wide event the world reacts to.
- **World-boss / raid** — the apex form. A coordinated party of high-rank Creators attempts to lull the waking Abyss before she sinks the coast.
- **Legendary summon** — in the training/summon layer, a fragment of her dream can be *invited* (never commanded) as a rare, volatile ally — a Leviathan you channel, not own.

She is **never** a tameable mount or a standard mob. She is an event with weather.

---

## Gate-Rank Gating

Facing Nethyssa requires **Master rank or higher** — at least **5 Gates open**. Below Master, the Deep Call alone is lethal: lesser-ranked minds are lulled and walk into the sea (see Drowned Heralds). The world enforces this narratively — under-ranked Creators are turned back by the Tidesong wardens, or simply cannot perceive the rift.

| Gates Open | Rank | Access to Nethyssa |
|------------|------|---------------------|
| 0–2 | Apprentice | None — the fog turns you away |
| 3–4 | Mage | Periphery only (Krakenling skirmishes) |
| 5–6 | **Master** | **Eligible** — may enter the Sunless Fathom |
| 7–8 | Archmage | Full raid roles, can lead the Tidesong |
| 9–10 | Luminor | Can attempt the true draw (return her to dreaming) |

---

## Phase Ladder

Nethyssa runs through four phases. The party's goal across the first three is to **avoid waking her further**; the fourth is the failure state, where Malachar's cult has corrupted the dream.

| Phase | State | Dominant ability | What the party does |
|-------|-------|------------------|---------------------|
| **1. Dreaming** | Asleep, mostly still | **Abyssal Dreaming** — shared hallucination, false memory, fog | Navigate illusion; resist the dream rewriting their perception |
| **2. Stirring** | Half-roused | **Deep Call** — subsonic song that lulls and compels | Hold the line against compulsion; keep low-rank allies from the water |
| **3. Waking** | Roused, hostile | **Tidewrath** (maelstroms, tsunamis) + **Maelstrom Crown** (defensive vortex) | Survive the wave; the Crown swallows light, sound, and projectiles — punishes ranged DPS |
| **4. Drowned-Shadow (enrage)** | Nightmare — corrupted | **Ink-of-Unmaking** — erases the thing remembered; drowned-dead rise | Extinction-tier. Sever the corruption or flee. The fight to *prevent* this is the real fight |

**Ink-of-Forgetting → Ink-of-Unmaking.** In phases 1–3 her void-ink is the **Ink-of-Forgetting**: it erases memory — names, faces, the way home (a debuff that scrambles the minimap, hides ally names, removes waypoints). When the dream is corrupted into the Drowned Shadow, it becomes the **Ink-of-Unmaking**: it deletes the referent itself (a true-damage, summon-killing, terrain-erasing hazard).

**The win condition is not a kill.** A "clear" returns Nethyssa to Phase 1 (Dreaming) via the **Tidesong** — the Lullaby of the Deep. Reaching Phase 4 is the wipe condition for the region, not just the party.

---

## Elemental Weakness & Resist

| Vector | Effect | Why |
|--------|--------|-----|
| **Fire** | Weakness — boils the shallows, disrupts the Maelstrom Crown | Fire is the one element the drowned deep cannot answer; it transforms what Water preserves |
| **Spirit / Song** | Weakness (soothe / stun) — the **Tidesong** lulls and staggers her | Spirit is Lumina's aspect; the Lullaby of the Deep is the canon counter to the Deep Call |
| **Water** | Resist | She *is* the deep |
| **Void** | Resist | Her second element; the Unformed does not wound the Unformed |
| **Physical / projectile** | Resist | The Maelstrom Crown swallows projectiles whole |

Design read: a balanced raid pairs **Fire damage** (a Pyros/Draconia core to break the Crown and boil the water) with a **Spirit/Song support line** (the Tidesong choir to soothe and stun, holding phases down). Pure ranged-physical comps fail against the Crown.

---

## Drop Table

| Drop | Rarity | Source |
|------|--------|--------|
| **the Nethyss Pearl** | Legendary | Nethyssa — abyssal nacre from her mantle; pressure-reactive (inert at the surface, luminous in the deep). The Leviathan-tier analogue of the Vael Crystals; stores dreams and memory under pressure |
| **Abyssal Nacre Shard** | Rare | Nethyssa — minor crafting reagent, fragment of the Pearl |
| **Krakenling Hide** | Uncommon | Krakenlings — armor/crafting material |
| **Severed Tendril Core** | Uncommon | Abyssal Tendrils — reagent, holds residual animation |
| **Herald's Sea-Glass** | Rare | Drowned Heralds — carries a trace of Ink-of-Forgetting; quest/lore item, handle with care |

---

## Surfacing Across Game Types

Mapped to the four game types in the `arcanea-game-development` skill:

- **Elemental Challenges (Browser)** — a **Water Flow / Void Shift** hybrid: a puzzle-routing challenge where the player steers a small craft through Nethyssa's dream-fog. The Ink-of-Forgetting hides the route as you go; Fire-motes you collect burn the fog clear. Single-player, arcade-scale, no rank gate — this is the world *teaching* the Abyss before the real raid.
- **Agent Training Arena (Summon)** — the **legendary summon**: a dream-fragment of Nethyssa channeled as a volatile ally with the Tidewrath ability on a long cooldown. Unstable — overuse risks a Deep Call backlash on the summoner. Master-rank to wield.
- **Story Quests (RPG boss)** — the canonical encounter. A branching quest culminating in the **Sunless Fathom** raid, where the party runs the phase ladder. The branch that matters: do they kill (impossible, and the attempt accelerates toward Phase 4) or do they sing her back down (the Tidesong path)? Ties directly to the **Drowned Shadow** cult plot.
- **Multiplayer Arenas (raid / world-event)** — the **oceanic world-event**: a server-wide timed event where Archmage- and Luminor-rank Creators coordinate the Tidesong choir against the clock, racing to hold Nethyssa below Phase 4 before Malachar's cultists corrupt the dream.

---

## Stat Blocks

### Nethyssa, the Abyss That Dreams

| Field | Value |
|-------|-------|
| **tier** | T3 — Leviathan / Wild Godbeast (unbonded) |
| **scale** | Planet-scale — body kilometers across, continental tentacle-span |
| **health (relative)** | 100 (raid baseline — the reference all others scale against) |
| **abilities** | Abyssal Dreaming, Deep Call, Tidewrath, Maelstrom Crown, Ink-of-Forgetting → Ink-of-Unmaking (Phase 4) |
| **drops** | the Nethyss Pearl (legendary), Abyssal Nacre Shard (rare) |
| **elementalWeaknesses** | Fire, Spirit/Song (Tidesong) |
| **habitat** | The Drowned Deep — the abyssal rift called the Sunless Fathom |

### Krakenling

| Field | Value |
|-------|-------|
| **tier** | T1 — Beast (Nethyssa's brood; juvenile kraken) |
| **scale** | Large — pack-hunter, ship-sized |
| **health (relative)** | 8 |
| **abilities** | Pack Surge (coordinated grapple), Ink Spit (short-range Ink-of-Forgetting) |
| **drops** | Krakenling Hide (uncommon) |
| **elementalWeaknesses** | Fire, Wind |
| **habitat** | The Drowned Deep shallows; surface during world-events |

### Abyssal Tendril

| Field | Value |
|-------|-------|
| **tier** | T1 — Beast (autonomous severed tentacle-creature) |
| **scale** | Medium — ambush predator |
| **health (relative)** | 5 |
| **abilities** | Burrow-Ambush, Constrict, Death-Throe (lashes on defeat) |
| **drops** | Severed Tendril Core (uncommon) |
| **elementalWeaknesses** | Fire, Earth |
| **habitat** | Sunken reefs and dead cities on Nethyssa's back; the Sunless Fathom floor |

### Drowned Herald

| Field | Value |
|-------|-------|
| **tier** | T1 — Beast (humanoid thrall; tragic — once people who heard the Deep Call) |
| **scale** | Human-scaled |
| **health (relative)** | 6 |
| **abilities** | Lull (minor Deep Call echo), Ink-Touch (Ink-of-Forgetting carrier), Mournful Advance |
| **drops** | Herald's Sea-Glass (rare) |
| **elementalWeaknesses** | Fire, Spirit/Song (a Herald can be *freed* by the Tidesong rather than killed) |
| **habitat** | Coastlines near the Drowned Deep; they walk out of the sea during Stirring |

> *"Bring Fire to break the Crown, and Song to close the Call. Bring neither, and you will forget why you came."*
