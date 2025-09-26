# Standards and Templates

<doc type="standards" version="1.0">

## Naming and Lexicon
- Product folders/packages: kebab-case.
- Canonical brand terms live in `docs/kb/GLOSSARY.md`.

## Commit and PR
- Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
- PR must include: scope (ARC-####), checklist, screenshots/tests, and KB updates.

## ADR Template (ADR-xxx)
```
# ADR-XXX: Title
Status: Proposed | Accepted | Superseded
Date: YYYY-MM-DD
Context
Decision
Consequences
Links
```

## KB Header Validator (concept)
- Node script parses top XML-like header and enforces fields and trust.

## Glossary Starter
```
# GLOSSARY

<arcanea:term id="TERM-LUMINORS" status="VERIFIED">
  <name>Luminors</name>
  <definition>Six archetypal forces guiding creative intelligence.</definition>
  <usage>Capitalize; singular: Luminor.</usage>
</arcanea:term>
```

</doc>

