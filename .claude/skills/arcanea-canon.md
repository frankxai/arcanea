---
name: Arcanea Canon
description: Pointer-first universe consistency and staging discipline
---

# Arcanea Canon Skill

## Prime directive

Before creating, editing, indexing, or approving lore, read in this order:

1. `.arcanea/lore/CANON_LOCKED.md`
2. `.arcanea/lore/MAGIC_SYSTEM.md` for spells or magical effects
3. the relevant approved production entity
4. STAGING proposals only when the task explicitly includes them

Do not treat this skill, generated sync trees, implementation types, root brainstorming documents, or memory retrieval as a substitute for the locked files.

## Hard invariants

- Lumina is the First Light: form, creation, order.
- Nero is primordial darkness as fertile potential and mystery. Nero is not evil.
- Shadow is Malachar's corruption of Void stripped of Spirit. Shadow is not a natural Element.
- The locked primary system is Fire, Water, Earth, Wind, and the Void/Spirit duality.
- Light is Fire's creation aspect, not another primary Element.
- The Ten Gates, unique frequencies, Arcanean Gods/Guardians, Godbeasts, and ranks come only from `CANON_LOCKED.md`.
- Guardian is a role; God/Goddess is the being's identity.
- Luminor is the rank for nine to ten opened Gates, not an entity type or artifact-granted title.
- The only spell disciplines are Attack, Defense, and Summoning.
- The only spell tiers are Light, Advanced, Greater, Sacred, Royal, Imperial, and Divine.
- An agent must not alter LOCKED truth without Frank's explicit approval.

## Additive artifact rules

When `.arcanea/lore/ARTIFACT_RESONANCE_SYSTEM.md` is present, treat it as STAGING until its header and approval log explicitly say otherwise.

- Derived Expressions compose locked Elements; they never add Elements.
- Nature/Verdance is Earth + Water + Spirit.
- Artifacts may grant bounded capability access but never rank, opened Gates, control, culture, or mastery.
- Permanent affinity change requires explicit consent, Sacred-or-higher authority, irreversible price, and a world profile that permits it.
- Agentive artifacts retain refusal and transfer rules.
- Every artifact needs price, boundary, failure, counterplay, provenance, rights record, and canon scope.
- Shadow artifacts remain restricted or quarantined and must never imply Nero is evil.

## Additive spirit rules

When .arcanea/lore/SPIRIT_ARCHETYPE_SYSTEM.md is present, treat it as STAGING until its header and approval log explicitly say otherwise.

- Uppercase Spirit is the locked Element. Lowercase spirit means a being, ecology, memory presence, ancestor, collective, or agentive work.
- A spirit is not automatically a god, Guardian, Godbeast, summon, monster, dead human, or spell.
- Guardian and Godbeast remain locked unique authorities; no generated spirit may inherit those offices.
- Archetypes are mutable narrative functions, never species, alignment, power tier, or destiny.
- Names authenticate bounded relationship. They never grant ownership or unconditional command.
- Every Accord requires consent, scope, duration, price, boundary, breach, repair, and release.
- Human afterlife remains unresolved unless a locked source explicitly decides it.
- Spirit-mediated abilities remain Gate-bound and never grant rank, opened Gates, or a spirit's domain authority.
- Predatory binding, involuntary imprisonment, identity severance, and Spirit-stripped Shadow entities are quarantined.
- Reference-corpus entities and living sacred beings are research-only and must never be projected as Arcanean canon.

## Canon status

- **LOCKED** — may be referenced; modification requires explicit Frank approval.
- **STAGING** — proposed and machine-valid may still be rejected or redesigned.
- **EVOLVING** — concept approved; listed details remain flexible.
- **EXPERIMENTAL** — excluded from default canon retrieval.
- **QUARANTINED** — unsafe, corrupted, contradictory, or rights-blocked; never blended into ordinary canon answers.

Only human approval recorded in Git can promote a record.

## Pre-commit checks

- [ ] Read the current locked source rather than a duplicate table.
- [ ] Nero is not portrayed as evil; Shadow is not portrayed as natural Void.
- [ ] Guardian, Godbeast, Gate, frequency, Element, rank, discipline, and tier values match locked authority.
- [ ] New lore has an explicit canon scope and non-approved status.
- [ ] Artifact effects are Gate-bound and cannot grant rank.
- [ ] Prices, limits, failures, counterplay, provenance, influence, and rights are present.
- [ ] Spirit is not confused with spirit-being, Guardian, Godbeast, summon, or human afterlife.
- [ ] Spirit records include need, refusal, boundary, price, release, identity, and persistence.
- [ ] Accords and spirit–artifact bonds preserve consent, repair, and exit.
- [ ] Reference proper nouns and living sacred beings remain outside projection.
- [ ] Generated memory or encyclopedia records retain source commit and content hash.
- [ ] No conflict-marked or legacy document was used as authority.
