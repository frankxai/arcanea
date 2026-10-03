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
- Initial candidate `ae669538` passed native Packages CI `37138256527`, including
  the complete 50-workspace version, generation and frozen check. That proves this
  command execution, not preservation of unrelated resolutions or publication.
- Do not merge PR #136 or claim publication from this patch. Once this workflow
  change is accepted, refresh the generated release from current main, verify its
  matching lockfile and exact revision checks, and apply its release gates.

Storage was below 15% free at the initial implementation. The follow-up admission
measured 147.20 GiB / 15.47% free and 7,908 MB available RAM, with one interactive
workload allowed. No new worktree, dependency installation, local build fanout,
media run or global CLI configuration change was performed.

## Independent review follow-up

Grok 4.6/high completed a full four-file static review of `ae669538` with WARN.
It identified shallow CI history, the limits of `git diff --check`, possible
unrelated lockfile changes, incomplete publish trigger coverage, and the absence
of an in-repo regression fixture. The completed verdict and receipts remain in
the private review evidence and issue #142; the earlier timeouts remain recorded.

Packages CI now checks out full history like publishing, runs the in-repo
regression on Node 20 and 22, and runs an independent frozen verification after
the shared version command. The original command chain remains intact. Source
publishing workflow and root release-input changes now trigger publishing on main;
test-only and Packages CI-only changes trigger CI without invoking publication.
Pull request tests never publish or commit generated metadata.

The two regression cases use pnpm 8.15.0 and eight recorded source package
identities, versions and internal graphs. One reproduces stale-lock refusal,
regeneration, and a frozen check that leaves the generated lock unchanged. The
other refuses an impossible workspace version and proves the previous lock
survives. Both pass locally on Windows / Node 24.16.0 in 3.04 seconds. Fixtures
use unique temporary directories, offline lockfile-only installs, no lifecycle
scripts, no node_modules, and cleanup restricted to the created fixture.
External dependencies and Changesets versioning are outside that fixture;
the existing full-workspace CI command exercises those.

CI retains the original and generated locks, their exact diff, and the checked-out
commit as a seven-day artifact tied to the candidate head. It uploads available
evidence even if generation fails, but skips upload if an earlier step prevented
generation from starting. Only release metadata enters the artifact.

The baseline contains 52 lockfile importers for 50 current workspaces; obsolete
`packages/ai-agents` and `packages/contracts` entries remain preserved here.
Generated lockfile pruning and any changed external versions still need inspection
from the exact candidate artifact before a generated release can merge. The
alternative of directly repairing the bot branch remains rejected because the
next version run would overwrite that repair. This follow-up retains the shared
pipeline and provides repeatable failure checks plus its actual generated output.

Candidate `3f8c859` passed native Packages CI `37149965385`, including both
regression cases on Node 20/22 and the full 50-workspace pipeline on Node 20.
Suite `37149965252`, quality/build `37149965208`, workspace types, source secrets
and mechanical canon passed. Claude review `37149965231` failed with
`is_error:true`; it provides no approval.

Artifact `11283447045`, archive SHA256
`4050fcc407ac6c5ce3f3b78f23b42ee8222b1a6449c137c30d13e58a9af324d7`,
retains the original and generated locks. The original matches the candidate's
Git blob. There are no external importer specifier/version changes, and 18
internal workspace edges change. Regeneration removes the two obsolete importers,
522 snapshots and adds one snapshot. Of 188 changed common snapshots, 146 only
change development flags, and 42 remove the optional `supports-color@8.1.1`
peer binding from `debug@4.4.3`, retaining its version and integrity. Complete
reference traversal, including aliases, has zero unresolved references: 520
removed snapshots were outside the active graph; the two reachable removals
are the replaced debug peer variant and optional color peer. This analysis
does not establish vulnerability remediation or installation of the new graph.

The first full review request for `3f8c859` timed out at 180.39 seconds without
a verdict. A complete six-file packet with duplicate new-file text removed and
the actual CI/graph evidence completed in 137.05 seconds. Grok 4.6/high returned
WARN, with no source defect requiring changes in the recovery command or tests.
It identified publishing trigger scope and missing generated-graph installation
as remaining release risks. Native receipt cost $0.03787396 is unreconciled.

The next revision narrows publication triggers and adds an actual frozen install
of the generated graph on Node 20, followed by rebuilding core, MCP, auth,
overlays and CLI and rerunning their compiled core/overlay and CLI suites.
This checks the release graph after versioning, in addition to testing the
original checkout. The metadata artifact remains available if that later step
fails. It is package recovery evidence, not all-workspace or app/customer proof.

This revised exact source requires fresh native CI and independent review.
No previous verdict transfers to it. PR #136, npm publication, creator acceptance,
app production, and the other estate slices remain open under their own checks.
