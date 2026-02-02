# Knowledge Base Governance and Trust Schema

<doc type="kb-governance" version="1.0">

## Purpose
Create a single source of truth that all agents consult, with explicit trust levels and change control.

## Structure
- `docs/kb/GLOSSARY.md` — canonical lexicon and naming rules.
- `docs/kb/canon/` — VERIFIED lore, brand voice, principles.
- `docs/kb/specs/` — product specs and feature definitions (VERIFIED/DRAFT).
- `docs/kb/adr/` — Architectural Decision Records (VERIFIED once approved).
- `docs/kb/ideation/` — explorations and proposals (IDEATION only).

## Trust Levels
- VERIFIED: reviewed and approved by Lead Architect and Knowledge Steward.
- DRAFT: work-in-progress; may be used behind feature flags.
- IDEATION: cannot be implemented without promotion to DRAFT or VERIFIED.

## XML-like Header Block
Place at the top of each KB file:
```xml
<arcanea:doc
  id="KB-0001"
  title="Arcanea Brand Voice"
  version="1.2"
  trust="VERIFIED"
  owners="brand,knowledge"
  updated="2025-09-09"
  links="ADR-006,GLOSSARY"
  />
```

## Glossary Entry Template
```xml
<arcanea:term id="TERM-001" status="VERIFIED">
  <name>Luminors</name>
  <definition>Six archetypal forces guiding creative intelligence.</definition>
  <usage>Capitalize; singular: Luminor.</usage>
  <related>Realms, Spells</related>
</arcanea:term>
```

## Change Control
- PR must update header trust status and changelog section.
- Knowledge Steward is required reviewer for any trust changes.

## Enforcement
- Pre-commit hook validates XML-like headers.
- CI fails if a term is used in code without a glossary entry.

</doc>

