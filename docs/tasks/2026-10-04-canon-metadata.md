# Resolve the Vaelith metadata conflict, 4 October 2026

Scope: resolve the existing index conflict and restore its missing Vaelith profile.
Owner: Codex; original release and platform recovery branches remain intact.

Authority: `frankxai/arcanea-ai-app` commit `79f3fb25ca8d34c22eae1210c7c92ae2ebe8ea0b`,
`.arcanea/lore/CANON_LOCKED.md`, Tier 2: Elara, Starweave, Vaelith.
The alternative Thessara spelling contradicts that accepted source.
`arcanea-lore/godbeasts/vaelith.md` is copied byte for byte from that revision's
`.arcanea/lore/godbeasts/vaelith.md`; existing pending details remain pending.

The resolved metadata keeps the original HEAD side and its four Vaelith references.
This is a conflict repair, not acceptance of the rest of the January index.
Its older frequencies, entity forms and pending entries still require reconciliation.
No locked source, app behavior, live database, package version or release workflow changes.

Acceptance: both repositories parse the YAML, contain no conflict markers in this index,
have a matching existing Vaelith target, retain prior branches, pass scoped secret checks,
and receive independent review of these exact three files before merge.
Rollback: revert this three-file change; preserve the accepted app and original branches.
Verification and exact review revision are recorded on the pull request and issue #41.
