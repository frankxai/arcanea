# Artifact Protocols

> **Status: STAGING** · Machine implementation of `.arcanea/lore/ARTIFACT_RESONANCE_SYSTEM.md`.

## Authority order

1. `.arcanea/lore/CANON_LOCKED.md`
2. `.arcanea/lore/MAGIC_SYSTEM.md`
3. `.arcanea/lore/ARTIFACT_RESONANCE_SYSTEM.md` after explicit approval
4. validated world profiles
5. validated artifact records
6. Starlight Memory and encyclopedia projections

Lower layers may specialize upper layers; they may not contradict them.

## Record sets

| File | Role |
|---|---|
| `schemas/domain.schema.json` | Element references and derived Expression shape |
| `schemas/artifact.schema.json` | Artifact mechanics, story pressure, provenance, rights, and memory contract |
| `schemas/world-magic-profile.schema.json` | World-local magic and artifact ecology without cosmology forks |
| `data/domains.json` | Six locked references plus STAGING derived Expressions |
| `data/artifacts.json` | STAGING seed corpus |
| `data/world-magic-profiles.json` | Arcanea inheritance, Darkenia, and community template profiles |
| `scripts/validate-artifacts.mjs` | Cross-record semantic validation and memory-event generation |

The JSON files are the encyclopedia's structured input. The lore document is the human-readable decision surface. Neither becomes canon by being machine-valid.

## Canonical gate mapping

| Gate | Tier | Rank |
|---:|---|---|
| 1–2 | light | apprentice |
| 3–4 | advanced | mage |
| 5–6 | greater | master |
| 7 | sacred | archmage |
| 8 | royal | archmage |
| 9 | imperial | luminor |
| 10 | divine | luminor |

The validator rejects any artifact whose tier or rank disagrees with its Gate.

## Capability contract

An artifact capability must state:

- one grant mode: amplify, unlock, store, synthesize, summon, suppress, or transform;
- one mechanical effect distinguishable from its lore description;
- duration and scope;
- whether the change is permanent;
- the canonical disciplines and Gate that govern it.

Forbidden fields and claims:

- `grantsRank`, `opensGate`, `becomesLuminor`, or equivalents;
- “unlimited,” “omnipotent,” “uncounterable,” or “no cost”;
- Shadow as a primary Element or synonym for Void;
- a derived Expression whose required component Elements are absent;
- a permanent transformation without consent, identity/ecology price, Sacred-or-higher Gate, and world permission.

## Class contract

| Class | Required design proof |
|---|---|
| focus | identifies the affinity it amplifies and why no new access is created |
| key | names the single technique or narrow technique family unlocked |
| vessel | exposes capacity, depletion, overwrite, and leakage behavior |
| bridge | lists component Elements and the incompatibility being stabilized |
| pact | makes agency, consent, refusal, and transfer rules explicit |
| engine | exposes infrastructure, operators, beneficiaries, and externalities |
| seal | suppresses a bounded channel and preserves an exit or counter |
| assembly | identifies Core, Keystone, component limits, separation, and cumulative prices |

## Assembly algorithm

1. Validate every component independently.
2. Require exactly one Core and at most one Keystone.
3. Form the union of component Elements, Expressions, disciplines, prices, and incompatibilities.
4. Set base Gate to the highest component Gate.
5. Add one Gate for each unresolved elemental incompatibility, capped at ten.
6. Derive tier and rank from the resulting Gate; never average or vote.
7. Preserve every price. Compatible prices may transform but never cancel.
8. Reject when an agentive component refuses, a component world forbids export, or the Assembly has no physical separation path.
9. Store the resulting Assembly as its own versioned artifact record with component relations.

## Gate Debt

Gate Debt is a world-local consequence state, not a rank field.

An artifact creates Gate Debt when it conducts more complexity or duration than the bearer can sustainably authorize. A record that permits Gate Debt must name:

- the borrowed capability;
- the creditor: body, artifact, institution, relationship, or environment;
- the due condition;
- the consequence of nonpayment;
- the restoration path;
- why the debt cannot be mistaken for an opened Gate.

World profiles decide whether Gate Debt is forbidden, temporary, legal-and-costly, or unregulated. Core canon does not normalize it.

## World inheritance

Every world profile includes exact pointers to the locked cosmology, Elements, Gates, ranks, and spell grammar with `overridePolicy: forbidden`.

Worlds may localize:

- Expression names;
- availability and scarcity;
- artifact classes and portable tier ceiling;
- permanent imprint policy;
- Gate Debt policy;
- institutions, acquisition, repair, law, and portal rules;
- contribution licensing and remix rights.

Worlds may not localize primary Elements or redefine Nero, Void, Spirit, Shadow, Gates, Guardians, ranks, disciplines, or tiers.

## Status transitions

```text
experimental -> staging -> approved -> deprecated
                       \-> quarantined
```

- **experimental** — ideation; excluded from default retrieval.
- **staging** — schema-valid and awaiting human canon review.
- **approved** — explicitly accepted at its declared canon scope.
- **quarantined** — narratively or mechanically retained but unsafe, corrupted, or rights-blocked.
- **deprecated** — superseded; retained for lineage and migration.

Only a human approval recorded in Git may transition a record to `approved`.

## Originality gate

Every artifact carries `rights.inspirationIds`, similarity risk, at least two original mechanics, prohibited parallels, and review status.

Validation rules:

- high-risk records cannot be approved or projected;
- medium-risk records remain STAGING until human review;
- one artifact cannot depend on signature expression from a single protected source;
- names, silhouettes, counts, mappings, histories, and terminology remain source-specific and are never transferable craft principles.

## Authoring sequence

1. Choose a world and narrative pressure.
2. Select primary Elements and, when needed, one derived Expression.
3. Select class, form, substrate, discipline, Gate, tier, and rank.
4. Write one primary capability before adding secondary effects.
5. Add a real price, hard boundary, failure, and counterplay.
6. Define agency, bond, transfer, and combination behavior.
7. Write desire, temptation, fear, consequence, and history.
8. Record influence and prohibited parallels.
9. Validate.
10. Request human review; do not self-promote to canon.

## Validation

```bash
node magic-intelligence-system/scripts/validate-artifacts.mjs
node magic-intelligence-system/scripts/validate-artifacts.mjs --emit-memory /tmp/arcanea-artifact-memory.jsonl
```

The second command emits rebuildable Starlight Memory projection events only after every structural and semantic check passes.

