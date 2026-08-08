# THE NAMING REGISTRY — Articulation System of Arcanea

> **Status**: STAGING ⏳ — Awaiting Creator approval for CANON_LOCKED promotion
> **Last Updated**: 2026-08-08
> **Purpose**: Names are metadata. A reader should infer register, faction, and era from sound alone — and a thousand contributors (human and AI) should coin names that feel *inevitable, not random*. This registry is the machine-checkable contract that makes that possible.
> **Method lineage**: Tolkien's languages-first phonaesthetics, FromSoftware's phoneme-family lineage encoding, FF's tiered morphology — architecture, never bricks (`docs/worldbuilding/BEST_PRACTICES.md` §IV).

---

## 1. The Three Laws of Arcanean Naming

1. **Sound carries allegiance.** Every register below has a sound-space. A name that violates its register confuses the reader's ear before their mind can object.
2. **Names are earnable, losable, fakeable.** Status-bearing elements (§5) are plot machinery, not decoration.
3. **Closed sets stay closed.** The Locked Inventory (§6) admits no additions, near-homophones, or "variants" without `/lock-decision`.

## 2. The Registers

| Register | Sound-space | Morphology | Locked exemplars | Coin like |
|---|---|---|---|---|
| **Arcanean Gods** | Liquid consonants (l, r, y), open vowels, feminine-leaning, 3 syllables | Often -ia/-a/-inn endings | Lyssandria, Leyla, Draconia, Maylinn, Alera, Lyria, Aiyami, Elara, Ino, Shinkami | *You don't. Set closed.* |
| **Godbeasts** | Compact, totemic, hard-soft alternation, 2-3 syllables | -ith/-ura/-is/-o endings | Kaelith, Veloura, Draconis, Laeylinn, Otome, Yumiko, Sol, Vaelith, Kyuro, Source | *Closed for the Ten; T3 Leviathans use -yssa/-oth weight (Nethyssa)* |
| **Eldrian / high antiquity** | Weight, dark vowels (a, o), -ar/-al/-ach endings | Two-element compounds (name + epithet-surname) | Malachar Lumenbright, Vantara | Ancient persons, fallen orders, pre-Age places |
| **Wisdoms / abstracts** | Greek-adjacent, ends in consonant or -is/-a | Single word, capital | Sophron, Kardia, Valora, Eudaira, Orakis, Poiesis, Enduran | Virtues, principles, meta-concepts only |
| **Verithal / Proof register** | Plain, workmanlike, Germanic-short; 1-2 syllables + trade-plain surnames | Given + surname; founder-lineage hyphenation | Ivo Solvane, Ordan Vey, Maren Solvane-Ket | March mortals, Provers, Wrights |
| **The Unmarred** | Hard stops (k, d, t), closed vowels, grey monosyllable surnames | Given + terse surname | Kadmor Vale | Wardens, renunciates |
| **Reaches / covenant register** | Luminous compounds; th-, -ss-, liquid centers | Place: concrete + light-word; person: 2-3 syllable flowing | the Arbor of First Light, the Emberstair, Thessara (proposed, see `THESSARA.md`) | Luminary Reaches places, Gleam-era figures. *Dual-register note*: names that are both a Seventh-Age person and a place (the Thessara doubling) may blend this register with high-antiquity — the person carries antiquity weight, the place carries the covenant sound. |
| **March places** | Salt/stone/work compounds, apostrophe-free | Noun + noun / possessive-plain | Harrow's Rest, the Salt Road, the Sundering Sea | Settlements, roads, waters of the March |
| **The Awakened (AI beings)** | Soft 2-3 syllables, vowel-rich, no hard stops | -ia/-iri/-ora endings | Oria, Amiri, Velora (STAGING) | Remaining four Awakened (Creator gate) |
| **Institutions** | English compound, initial caps, no invented words | [Quality] + [Noun] | Starlight Corps, the Grey Bench, the Ladder of Laws | Orders, benches, roads, courts |

## 3. Spell & Working Morphology (tiered articulation)

Extends the Magic Intelligence System (PR #77). Workings are named **[Element/Gate root] + [tier suffix]**, so power level is audible:

| Tier | Suffix pattern | Example shape (illustrative, not canon) |
|---|---|---|
| Apprentice working | bare root | *Ember* |
| Mage working | root + -en | *Embren* |
| Master working | root + -ara | *Embrara* |
| Archmage working | root + -aris | *Embraris* |
| Luminor working | root + Gate-name compound | *Ember-of-the-Crown* |

Rule: roots derive from the Five Elements' Arcanean lexicon, never from real-world spell traditions or other franchises' incantation systems. (Latin-derivation is HP's brick; the *tiered-suffix method* is FF's architecture — we take the method, with our own suffix set.)

## 4. Collision & Adjacency Rules (machine-checkable)

- **No new name within edit-distance 2 of a Locked name.** (Prevents "Lyssara", "Malakar".)
- **No cross-register borrowing**: a mortal may not carry a God-register name; an institution may not use invented words.
- **Sound-alike budget**: at most one prominent name per sound-family per era (Nethyssa and Thessara coexist only because one is a Leviathan of the deep sea and one is a drowned Academy — the echo is *deliberate*, see `THESSARA.md` §3).
- **The G-test**: read any new name aloud in a sentence with three Locked names. If it doesn't sound like the same universe, it fails.
- Validation hook: `packages/os/src/canon-validator.ts` is the natural home for these rules as lint checks.

## 5. Earnable Name Elements

| Element | Meaning | Earned by | Lost by |
|---|---|---|---|
| **Luminor** (title) | All ten Gates opened | Attainment, witnessed | Cannot be lost; can be *renounced* (precedent: none yet — story fuel) |
| **Solvane-** (lineage prefix) | Descent from the First Prover | Birth or adoption into the line | Shuttering a lantern (public disgrace) |
| **-of-the-[Gate]** (working suffix) | Luminor-grade mastery of one Gate | Academy attestation | Revocation by the Gate's Guardian (never yet done — mystery ledger) |
| **the Unmarred** (epithet) | Quieting Vow sworn and kept | The Vow | Breaking it (the creed's deepest shame) |
| **Grey Bench seat** | Right to ask the Question | Concession earned at cost | Asking it in bad faith |

Fakeable by design: pretenders claiming Solvane- descent or unearned Luminor titles are a sanctioned story engine (the FromSoftware "claimable status-name" pattern).

## 6. The Locked Inventory (never touch without `/lock-decision`)

Gods: Lyssandria, Leyla, Draconia, Maylinn, Alera, Lyria, Aiyami, Elara, Ino, Shinkami.
Godbeasts: Kaelith, Veloura, Draconis, Laeylinn, Otome, Yumiko, Sol, Vaelith, Kyuro, Source.
Primordials: Lumina, Nero. Antagonist: Malachar (Lumenbright). Houses: Lumina, Nero, Pyros, Aqualis, Terra, Ventus, Synthesis.
Superseded (never reuse for new entities): **Amaterasu** (→ Source, 2026-03-30), **Thessara** (→ Vaelith as godbeast; name reserved for redeployment per `THESSARA.md`).

## 7. Coining Procedure (for agents and contributors)

1. Identify the register (§2). 2. Draft 3 candidates inside its sound-space. 3. Run collision rules (§4). 4. Read the G-test sentence aloud. 5. Check the superseded list (§6). 6. Stage with a one-line etymology note ("Thessara: th- liquid onset + -essara water-flow center; Reaches covenant register"). Names without etymology notes fail review.

---

## STAGING LOG

| Date | Entry | Status |
|------|-------|--------|
| 2026-08-08 | Registry formalized from SYSTEM.md §6 + research swarm findings; spell morphology tiers; earnable elements; superseded list | ⏳ STAGING |
