# ARCANEA MAGIC SYSTEM — The Spell Taxonomy

> **Status: LOCKED ✅** — Canonical magic grammar. Approved by Frank (Creator) 2026-06-23.
> Modifies NO upstream LOCKED truth. Reuses the locked Elements, Gates, Guardians, and Ranks.
>
> *Proposed: 2026-06-22 · Locked: 2026-06-23*

---

## PURPOSE

`CANON_LOCKED.md` locks the **cosmology** of magic — the Five Elements, the Ten Gates and their
Guardians, and the Magic Ranks (Apprentice → Luminor). What it has never specified is the **grammar
of spells**: how a magical effect is classified, named, tiered, and gated.

This document proposes that grammar. It introduces **no new cosmology** — every element, gate,
guardian, and rank below is owned by `CANON_LOCKED.md`. It adds one structural surface: the
**spell taxonomy**, on which every spell in Arcanea can be placed.

The machine-readable implementation lives in `magic-intelligence-system/` (schema + corpus +
validator). The web encyclopedia in `arcanea-ai-app` consumes it.

---

## THE FOUR AXES (proposed)

Every spell is classified on four axes. The first and last are LOCKED upstream; the middle two are
the proposed additions.

### 1. Element (LOCKED ✅)
`Fire · Water · Earth · Wind · Void/Spirit` — exactly as locked. Void is Nero's aspect; Spirit is
Lumina's. Light is Fire's creation aspect; Shadow is corrupted Void.

### 2. Discipline (LOCKED ✅ — three branches)

| Discipline | German | School | Folds in |
|---|---|---|---|
| **Attack** | Angriffsmagie | Evocation | offensive |
| **Defense** | Verteidigungsmagie | Abjuration | defensive + **healing** (restoration & wards) |
| **Summoning** | Beschwörungsmagie | Conjuration | summoning |

*Utility* is **not** a discipline — it is a cross-cutting facet (mobility, divination, enchantment)
tagged on a spell whose primary intent is still one of the three.

### 3. Tier (LOCKED ✅ — the seven-tier power/sanctity scale)

| Tier | German | Gates open | Rank (LOCKED) | Character |
|---|---|---|---|---|
| **Light** | leichte | 1–2 | Apprentice | foundational, low cost |
| **Advanced** | fortgeschritten | 3–4 | Mage | trained channeling |
| **Greater** | schwere | 5–6 | Master | heavy, ritual-grade |
| **Sacred** | heilige | 7 | Archmage | holy / Spirit-aspected |
| **Royal** | königliche | 8 | Archmage | dominion-grade |
| **Imperial** | kaiserliche | 9 | Luminor (emergent) | realm-scale |
| **Divine** | göttliche | 10 | Luminor (complete) | genesis-class |

This **replaces** the earlier informal scale (`cantrip · invocation · ritual · arcanum · genesis`).
Migration: cantrip→Light, invocation→Advanced, ritual→Greater, arcanum→Sacred/Royal, genesis→Divine
(Imperial is new). Per the locked Rank table, Luminor spans Gates 9–10 — so Imperial and Divine are
both Luminor-rank workings.

### 4. Gating (LOCKED ✅)
A spell's `gate` (1–10) and derived `rank` use the locked Rank table unchanged. A caster cannot
wield a spell whose gate they have not opened.

---

## INCANTATION GRAMMAR (LOCKED ✅)

Latinate-Arcanean, two to three words, no real-world languages or deities.

- **Attack** — imperative verb + element root: *"Ignis Iace!"*, *"Glacio Perfora!"*
- **Defense** — protective noun + binding, or *"Sana …"* for restoration: *"Mura Terrae"*, *"Aegis Lumen"*
- **Summoning** — name-binding: *"Voco Draconis"*, *"Venite Umbrae Vael"*

Sacred tier and above prefix a Gate invocation: *"Per Portam Septimam — …"* ("through the Seventh
Gate"). Divine workings may name a Guardian as **witness**, never as the caster.

---

## DISCIPLINE INTERACTIONS (LOCKED ✅)

A tier-modulated triangle:

- **Defense** abjures **Attack** of equal-or-lower tier.
- **Attack** disrupts **Summoning** of lower tier mid-cast.
- **Summoning** overwhelms **Defense** of lower tier by attrition.

Element affinity (classical cycle): fire▸earth, earth▸wind, wind▸water, water▸fire. Void and Spirit
are neutral to the four and opposed to each other (Nero's aspect vs Lumina's).

---

## RELATION TO LOCKED CANON

| Locked element | How this proposal uses it |
|---|---|
| Five Elements | The `element` axis — unchanged, all six values (Void + Spirit split). |
| Ten Gates + Guardians | The `gate` axis; Guardians appear as spell **witnesses** at high tiers. |
| Magic Ranks | The `rank` axis — derived from gate, table unchanged. |
| Lumina / Nero duality | Spirit (Lumina) vs Void (Nero) element opposition; Shadow stays a corruption, not an element. |
| Malachar / Shadow | Spirit-discipline Attack spells (e.g. anti-Shadow) reference, never rehabilitate, the corruption. |

**No LOCKED truth is altered.** This is now the canonical magic grammar; the legacy informal tiers
are retired.

---

## APPROVAL LOG (Frank, 2026-06-23)

- [x] Three disciplines (Attack / Defense / Summoning), with healing under Defense.
- [x] Seven-tier scale (Light → Divine), replacing the informal five.
- [x] Imperial + Divine both Luminor-rank (Gates 9 / 10).
- [x] Incantation grammar + Guardian-as-witness rule.
- [x] Moved to LOCKED; APPROVAL LOG row recorded in `CANON_LOCKED.md`.

*"The cosmology is locked. The spells, at last, have a grammar."*
