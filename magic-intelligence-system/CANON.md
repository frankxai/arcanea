# CANON

> Per SIP Layer 1. Declares this subsystem's canon posture.

## Decision

**The Magic Intelligence System composes upstream canon and declares none of its own cosmology.**

It operationalizes the Arcanea magic cosmology into a structured spell taxonomy. It introduces a
classification layer (disciplines, tiers, gating, spell records) — **not** new lore. Every element,
gate, guardian, and rank it references is owned upstream.

## Composes

- **SIP** — the Starlight Intelligence Protocol. Inherits attestation + sovereignty discipline.
- **Arcanea canon** — `../.arcanea/lore/CANON_LOCKED.md`. The Five Elements, Ten Gates + Guardians,
  Magic Ranks (Apprentice→Luminor), Lumina/Nero duality, and Malachar are LOCKED upstream and are
  treated as immutable here.

## Declines

This system declines to author cosmology. It adds no element, gate, guardian, deity, or rank. The
one new structural surface it owns — the **spell taxonomy** — is itself proposed to Arcanea canon as
STAGING (`../.arcanea/lore/MAGIC_SYSTEM.md`), pending Frank's approval before it is treated as LOCKED.

## Terms this subsystem defines (taxonomy only)

| Term | Definition |
|---|---|
| **Spell** | A discrete magical effect classified on the four axes. |
| **Discipline** | One of `attack` (Evocation), `defense` (Abjuration: wards + restoration), `summoning` (Conjuration). |
| **Tier** | Power/sanctity level: `light → advanced → greater → sacred → royal → imperial → divine`. |
| **Incantation** | The spoken trigger; grammar varies by discipline (see protocols). |
| **Gating** | The gate (1–10) + derived rank a caster needs to wield a spell. |
| **Counter** | A discipline interaction (e.g. Defense abjures Attack of equal-or-lower tier). |

These are classification terms, not cosmological claims.

---

Built on SIP.
