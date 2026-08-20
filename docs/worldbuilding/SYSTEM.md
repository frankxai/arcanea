# SYSTEM.md — The Lore Knowledgebase Architecture

> The machine-readable contract for how Arcanea (and any world built on this method) organizes canonical knowledge. Modeled on what actually works at franchise scale: a private authoritative vault, a public fragment surface, and community encyclopedias that cite fragments as primary sources.

---

## 1. The three layers

```
LAYER 1 — THE VAULT (private, authoritative)
  CANON_LOCKED.md + staging docs. The "author's head-canon", written down.
  Never shipped verbatim. Changes only through the lock gate.

LAYER 2 — THE FRAGMENT SURFACE (public, diegetic)
  Legends, item texts, character speech, songs, environmental detail.
  Everything here has an in-world narrator and a bias. This is what
  readers/players actually receive.

LAYER 3 — THE ENCYCLOPEDIA (public, analytic)
  Wiki-style entity pages that cite Layer 2 fragments as primary sources.
  Speculation is quarantined and labeled. Community-editable.
```

The discipline that makes fragmentary storytelling coherent instead of sprawling: **Layer 2 may contradict itself (narrators lie); Layer 1 may not (the vault is truth).** A contradiction between fragments is a feature. A contradiction inside the vault is a bug.

## 2. Canon tiers (existing Arcanea practice, formalized)

| Tier | Marker | Meaning | Who can change it |
|---|---|---|---|
| LOCKED | ✅ | Canonical truth | Creator only, via `/lock-decision` |
| STAGING | ⏳ | Proposed, internally consistent, awaiting promotion | Agents propose; Creator promotes |
| EVOLVING | 🔧 | Approved concept, details flexible | Agents may extend within the concept |
| SPECULATION | 💬 | Theories, community readings | Anyone; never cited as fact |

Every lore file carries its tier in the header. Every claim in Layer 3 must be traceable to a tiered source or carry the SPECULATION label.

## 3. The small ontology rule

A universe stays coherent when every entity is expressible as a **stance toward ≤10 primitives**. Arcanea's primitives (all LOCKED): Lumina/Nero duality · Five Elements · Ten Gates · the Arc cycle · Seven Wisdoms · Malachar's corruption · the Gate-rank ladder.

**Test for any new concept**: state it as a stance toward existing primitives in one sentence. If you can't, it's either a new primitive (rare — Creator decision) or it doesn't belong.

- *Verithal* = "civilization built on Lumina's First Song where her second song (the Gates) fell silent."
- *The Unmarred* = "renunciates who mistake the Gates themselves for Malachar's corruption."
- *The Arbor/Dimmed* = "the covenant expression of the same belief-resonance that powers the Shadowfen seal."

## 4. Fragments — the unit of delivery

Author Layer-2 lore as **atoms of 1–4 sentences**, each tagged:

```yaml
fragment:
  id: cinder-salt-choir-03
  narrator: "Margin-port oral tradition"     # who says this, in-world
  bias: "Hostile to the Reaches' courts"     # what the narrator wants
  claims: [arbor.withdrawal-law.unjust]      # vault refs it bears on
  tier_basis: STAGING                        # what it derives from
  contradicts: [gleam-reader-testimony-01]   # deliberate tensions
```

**Redundancy rule**: every load-bearing fact appears in ≥3 independent fragments from different narrators. Assume any single consumer sees a random 20% of the corpus.

## 5. Timeline by precedence, not dates

Anchor events in a partial order (*X before Y because Z*), grouped into named eras (the Seven Ages → Eighth Age; within the March: Pre-Stilling → the Hush → the Thinning). Absolute dates only where structurally necessary. This keeps history extensible and preserves mystery at the edges.

## 6. The naming registry (phoneme families)

Names are metadata: a reader should infer faction/lineage from sound alone.

| Register | Sound-space | Examples |
|---|---|---|
| Arcanean Gods | Liquid, open-voweled, feminine-leaning | Lyssandria, Alera, Aiyami |
| Godbeasts | Compact, totemic | Kaelith, Otome, Kyuro |
| Eldrian/high antiquity | -ar/-al endings, weight | Malachar, Vantara |
| Verithal (Proof register) | Plain, workmanlike, one-or-two syllables | Ivo, Ordan Vey, Maren |
| The Unmarred | Hard consonants, closed vowels | Kadmor Vale |
| Places of the March | Salt/stone/work compounds | Harrow's Rest, the Salt Road |

**Machine check**: new names are validated against the register before merge (no god-register names on mortals, no register collisions with the LOCKED Ten). Status-bearing name elements (the Luminor rank; "Solvane-" as founder-lineage) are *earnable and losable* — naming as plot machinery.

## 7. The mystery ledger

An explicit, versioned list of questions with answer budgets:

- **Never answer** (load-bearing mysteries; e.g. what waits atop the Emberstair; whether an ember was ever offered to Malachar)
- **Oblique only** (answer through contradicting narrators, never in the vault's voice)
- **Resolvable** (fair-play questions stories may close)

AI generation loves to helpfully close mysteries. The ledger is the API contract that forbids it. Ledger lives beside the vault; every lore PR is checked against it.

## 8. Entity pages — two registers

Every entity gets a **functional record** (mechanics, product role, stats) and a **lore record** (fragments, relationships, timeline position), linked but never merged. Dense bidirectional cross-linking: entity ↔ fragment ↔ event ↔ location. The knowledge graph is the product.

## 9. Provenance & versioning

- Layer 3 claims cite fragments by id (the Fandom rule, adopted wholesale: unreferenced claims are speculation and must be labeled).
- The vault is versioned; renames and retcons carry a dated log entry (see the Godbeast rename precedent in `CANON_LOCKED.md`).
- Translations/adaptations are tracked as variants of the fragment, not new fragments.

---

*Copy the architecture, never the bricks.*
