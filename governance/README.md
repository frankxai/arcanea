# Arcanea governance control plane

This directory is the machine-readable control plane for Arcanea canon,
rights, names, mysteries, inventory, public claims, and releases. It does not
replace manuscripts or lore documents. It states which source is allowed to
control which decision.

## Precedence

For new work and public releases after 2026-08-27, resolve conflicts in this
order:

1. A release manifest with a named human approval.
2. An approved canon delta in `CANON_REGISTRY.yaml`.
3. `.arcanea/lore/CANON_LOCKED.md`.
4. Approved entity files under `.arcanea/lore/`.
5. Staging material under `.arcanea/lore/`.
6. Every legacy mirror, generated file, old manuscript, prompt, or marketing
   page.

An approval at one level does not silently promote dependent material. A
generated artifact is not canon. A published claim is not proof. A connector
receipt records an operation; it does not become a source of truth.

## Required registries

| Registry | Decision it controls |
|---|---|
| `CANON_REGISTRY.yaml` | Canon status, continuity, and approved deltas |
| `NAMING_REGISTRY.yaml` | Reserved, legacy, superseded, and collision-prone names |
| `MYSTERY_LEDGER.yaml` | Promised answers, reveal windows, and permanent mysteries |
| `RIGHTS_REGISTRY.yaml` | Ownership, licenses, provenance, and rights blockers |
| `CONTENT_INVENTORY.yaml` | Public content roots, counts, duplicates, and status |
| `PUBLIC_ESTATE_REGISTRY.yaml` | Repository-by-repository boundary and license exposure |
| `RELEASE_REGISTRY.yaml` | Stable release IDs and release-stage truth |

## Status vocabulary

- `locked`: approved truth that may ship.
- `approved_delta`: creator-approved change that overrides older material for
  new releases while migration is in progress.
- `staging`: usable for development, never described as public canon.
- `legacy`: historical source retained for provenance; not authoritative.
- `conflict`: two or more sources disagree; release is blocked where material.
- `deprecated`: do not use in new work.
- `planned`: a deliverable or operation exists only as a plan.
- `draft_complete`: a full draft exists; editing, proof, rights, or release
  gates remain open.
- `released`: public artifact, rights, distribution, and evidence are recorded.

## Change rule

Every consequential change must identify its evidence, owner, decision date,
affected releases, and migration work. Only the franchise owner may approve a
canon delta or release. Legal conclusions and chain-of-title transfers require
qualified counsel and signed documents; a registry entry is not a substitute.
