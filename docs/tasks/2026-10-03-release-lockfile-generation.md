# Release lockfile generation

Source: the active Arcanea estate processing goal, Codex session
`01a1020e-e898-7093-b301-b31684ccb819`. Tracking: issue #142; related release: PR #136.
Implementation base: `f9c6c2d2352b78d1cac3560184af9e53b6119087`.

## Failure and behavior

The generated release at `5eff985b7f424bdeeb00c88319cf829b9b64c38e`
changes workspace dependency ranges without updating `pnpm-lock.yaml`.
An isolated copy of its complete 46-project manifest set fails with
`ERR_PNPM_OUTDATED_LOCKFILE`; the first reported mismatch is the AIOS
dependency on core, `^0.1.0` in the lockfile versus `^0.2.0` in its manifest.
PR #136 must not merge in that state.

Reuse the existing `version-packages` command. After Changesets changes versions,
regenerate the lockfile without lifecycle scripts, then verify it with a frozen
lockfile-only install. Command chaining refuses a failed stage before Changesets
can commit the generated release. Ordinary installation remains frozen.
The publishing workflow calls this same command. Packages CI exercises it once
on Node 20 after its compiled package tests; the runner does not commit or publish.
The existing Node 20/22 tests and source secret checks remain enabled.

This fixes generation rather than manually editing a bot-owned release payload
that the next Changesets run would overwrite. It is release infrastructure work;
creator creation, app deployment, canon acceptance and marketplace readiness have
their existing gates and remain separate.

## Verification and open work

- Complete source manifest reproduction: refused the stale lockfile, no new
  `node_modules`, sandbox cleaned.
- Source-derived regression fixture: eight actual before/after package identities,
  versions and internal dependency graphs, pnpm 8.15.0. The old lockfile was
  refused; regeneration and the subsequent frozen check passed. External
  dependencies and lifecycle scripts were omitted from this narrower fixture.
- Full workspace regeneration cannot complete offline locally: the store lacks
  an `@turbo/gen` tarball. That result is retained. Cloud CI must exercise the
  actual command with the full dependency graph at the candidate revision.
- Source review and native CI remain pending until their receipts exist.
- Do not merge PR #136 or claim publication from this patch. Once this workflow
  change is accepted, refresh the generated release from current main, verify its
  matching lockfile and exact revision checks, and apply its release gates.

Machine storage is bounded below 15% free. No new worktree, dependency installation,
local build fanout, media run or global CLI configuration change was performed.
