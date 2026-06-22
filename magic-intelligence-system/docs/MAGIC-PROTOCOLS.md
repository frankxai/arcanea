# Magic Protocols

The rules that govern how Arcanean magic is classified, named, tiered, and gated. This is the
reference the spell schema and corpus enforce. Nothing here overrides `CANON_LOCKED.md`.

---

## 1. The four axes

Every spell is classified on four axes, all reusing locked canon.

### Element (6 — locked)
`fire | water | earth | wind | void | spirit`

Void is Nero's aspect (potential, the unformed); Spirit is Lumina's aspect (transcendence, soul).
Light is Fire's creation aspect; Shadow is corrupted Void — neither is a base element.

### Discipline (3)
The user's spine, evolving the old 5-category list:

| Discipline | German | School | Folds in |
|---|---|---|---|
| **Attack** | Angriffsmagie | Evocation | offensive |
| **Defense** | Verteidigungsmagie | Abjuration | defensive + **healing** (restoration/wards) |
| **Summoning** | Beschwörungsmagie | Conjuration | summoning |

`utility` is **not** a discipline — it is a cross-cutting `tag` (e.g. `mobility`, `divination`,
`enchantment`) on a spell whose primary intent is still attack/defense/summoning.

### Tier (7 — the power/sanctity scale)
Replaces the legacy `cantrip|invocation|ritual|arcanum|genesis` scale. Migration mapping:

| Legacy SpellTier | New tier |
|---|---|
| cantrip | `light` |
| invocation | `advanced` |
| ritual | `greater` |
| arcanum | `sacred` / `royal` |
| genesis | `divine` |

`imperial` is new — it sits between Royal and Divine (realm-scale, pre-Luminor).

### Gating (gate 1–10 + rank)
Tier is bound to the gate a caster must have opened and the locked Rank table:

| Tier | German | Gates | Rank | Sense |
|---|---|---|---|---|
| Light | leichte | 1–2 | Apprentice | foundational, low mana |
| Advanced | fortgeschritten | 3–4 | Mage | trained channeling |
| Greater | schwere | 5–6 | Master | heavy, ritual-grade |
| Sacred | heilige | 7 | Archmage | holy / Spirit-aspected |
| Royal | königliche | 8 | Archmage | dominion-grade |
| Imperial | kaiserliche | 9 | Luminor | realm-scale (Luminor, emergent) |
| Divine | göttliche | 10 | Luminor | genesis-class, all gates open (Luminor, complete) |

Per the locked Rank table, Luminor spans gates 9–10: Imperial is the emergent Luminor, Divine the
complete one.

---

## 2. Incantation grammar (by discipline)

Incantations are Latinate-Arcanean, two to three words, no real-world languages or deities.

- **Attack** — imperative verb + element root: *"Ignis Frange!"* (fire, break), *"Glacio Perfora!"*
- **Defense** — protective noun + binding: *"Aegis Aquaria"*, *"Mura Terrae"*, *"Sana Lumen"* (restoration)
- **Summoning** — name-binding + call: *"Voco Draconis"*, *"Venite Umbrae Vael"*

Higher tiers add a Gate invocation prefix (Sacred+): *"Per Portam Septimam — …"* ("through the
Seventh Gate"). Divine spells may name a Guardian as witness, never as the caster.

---

## 3. Discipline interactions (counters)

- **Defense abjures Attack** of equal-or-lower tier (a Greater ward stops a Greater or lower bolt).
- **Attack disrupts Summoning** mid-cast (an Evocation interrupts a Conjuration of lower tier).
- **Summoning overwhelms Defense** by attrition (summons outlast a static ward of lower tier).
A rock-paper-scissors triangle, modulated by tier and element affinity.

### Element affinity (advantage)
fire▸earth, earth▸wind, wind▸water, water▸fire (classical cycle); void and spirit are neutral to
the four and opposed to **each other** (Nero's aspect vs Lumina's aspect).

---

## 4. The discipline × tier matrix (completeness rule)

The corpus aims for at least one **signature spell per (discipline × tier)** cell, spread across
elements, so the encyclopedia has no empty rooms. 3 disciplines × 7 tiers = 21 signature cells.
`data/spells.json` seeds these; the rest are authored over time under the same schema.

---

## 5. Naming quality gate

A spell ships only if its name and incantation are Arcanean-quality (Lyssandria-tier): evocative,
internally consistent, free of generic RPG filler ("Magic Missile") and real-world religion. When a
proposed name fails, the system rejects and offers an in-canon alternative.

Built on SIP.
