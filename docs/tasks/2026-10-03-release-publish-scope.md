# Release publishing scope

Source goal: Codex 01a1020e-e898-7093-b301-b31684ccb819; issue #142 and release #136.

At release f97f087, the public registry lacked 26 versions across 43 non-private
workspaces, including 14 outside the 12 version-bumped targets. Changesets 2.29.7
checks every non-private workspace, including the premium app and tools. Its
publisher has no supported selection flag. A passing release diff therefore
does not establish the scope of its resulting npm operation.

Keep the supported Changesets publisher. The shared version command snapshots
workspace identities, executes the existing version/regenerate/frozen sequence,
then atomically records `.changeset/release-plan.json` only after success. It
records version-changed public packages, source commit, consumed changesets and
canonical LF hashes of all workspace manifests, existing changelogs and the generated lock.
With no pending changesets, it preserves the existing plan for a publication retry.

Both the root release script and the publishing action invoke `release:publish`.
Its guard requires a source-matched, clean release tree, exact generated metadata,
and no pending changesets. Default, scoped and per-package registry overrides
must match the public endpoint. It reads exact public-registry versions with four
concurrent requests and eight-second request deadlines. Any unknown HTTP/network
result or unpublished version outside the recorded plan exits nonzero before
the stock publisher starts. Existing published versions allow partial retries.
The guard does not rewrite package privacy, repositories or registry settings.

The alternative of temporarily changing non-selected manifests to private would
mutate the source tree during publication and require restoration after failure.
An independent selective publisher would replace Changesets' tagging and retry
behavior. This implementation rejects the unexpected surface while retaining
the existing publisher. It supports future release groups through their actual
version changes; it does not permanently hardcode this release's twelve names.

The source-derived fixture retains both source revisions and registry observation.
Regression checks cover the actual 26/14 mismatch, partial retry, registry denial,
identity substitution, concurrency, real pnpm discovery/Git history, metadata
drift, committed source drift, registry overrides, atomic failure preservation,
new changesets and missing-plan refusal. The old
offline lockfile refusal/recovery tests remain in the same suite. CI also retains
the generated plan beside its lockfile evidence. No local dependencies are installed.

This is publication-scope enforcement for these supported scripts. It is not an
independent-review verifier, artifact/customer acceptance, authenticated registry
proof, or interception of someone invoking the raw publisher. Registry observations
can change between preflight and publication; Changesets still performs its own
checks. Implementation, canon, rights, source collision and customer gates remain.

Release #136 stays open. Its unrelated unpublished workspaces must be reconciled
through source review and deliberate package disposition before release. Do not
fill the plan with arbitrary names, fabricate historical changelog entries or
transfer the preceding delta WARN into product/publication approval. Exact-revision
CI and independent source review of this implementation are required before merge.

## Review corrections, 4 October 2026

Complete eight-file independent native review of `39362eb` returned WARN with two
findings. The original verdict and timed-out delivery attempts are retained.
Inspection of the integrity-verified published `@changesets/cli@2.29.7` source
shows its registry resolver reads `publishConfig["@scope:registry"]` before the
default manifest registry. The guard now validates both fields against normalized
public npm URLs. The source is available from
`https://registry.npmjs.org/@changesets%2fcli/2.29.7`.

The review's proposed per-name registry keys are not read by that resolver.
With the default-registry environment inherited from pinned pnpm 8.15.0 (also set
explicitly by Changesets), default selection stays public. A package-local scoped
registry can still override the root scope setting.
The guard now validates resolved default and scope keys from both the root and
every public package directory. The regression reproduces that package-local
scoped override and the scoped manifest field before the corresponding corrections.

A no-pending-changesets retry now exits before versioning, lock generation or
workspace commands, preserving the existing release plan and lock byte for byte.
A missing plan continues to refuse publication; no speculative replan is added.
Both genuine defects were reproduced before the corrections. Current local,
Node 20/22 CI and complete exact-source review results belong on PR #144.
These corrections do not authorize npm publication or disposition of the 14
unversioned candidates. Dependencies, workspace membership and lockfile are unchanged.
