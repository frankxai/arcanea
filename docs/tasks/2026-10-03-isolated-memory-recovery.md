# Isolated state and recoverable local persistence

Source goal: Codex thread `01a1020e-e898-7093-b301-b31684ccb819`.
Owning issue: [arcanea#130](https://github.com/frankxai/arcanea/issues/130).
Base: `a88b76974a5a9778346c78861d7dc47f1dad7f8b`, `frankxai/arcanea` main.
Owner: one Codex lead on `agent/codex/isolated-memory-recovery-20261003`.

## Outcome and scope

An MCP author can save and reopen a complete creative session without exposing
an empty JSON file to readers. A failed save reports an error, retains the last
complete file, restores in-process session state and allows a later retry. Auth
credential writes get the same complete-file replacement and refusal to overwrite
unreadable data. Default state remains `~/.arcanea`; an explicit absolute
`ARCANEA_STATE_DIR` supports isolated installations and tests.

The eleven named files cover the two storage modules, their affected tests,
the test sandbox helper, the MCP test command, AGENTS.md and this record.
Existing app, Studio and reader proposals, canon, cryptographic derivation,
package versions, dependency pins and deployment settings retain their owners.

The serious alternative is issue #130's serial test runner. It removes one test
race but still writes user credentials and exposes incomplete files to other
readers. This implementation keeps parallel test processes and assigns each a
separate temporary store. No dependency installation or local workspace build
is required for the small source check.

## Implementation and recovery

Both storage modules write a unique sibling with exclusive creation, flush it,
close it and rename it over the destination. POSIX file mode is 0600. Windows
EPERM/EACCES/EBUSY replacement contention gets five retries, totaling at most
310 ms of requested waiting. Sustained contention fails without deleting the
destination. Temp cleanup only addresses the current save's filename.

Unreadable or unsupported memory files block session reads/mutations while file
diagnostics remain available. Repair requires preserving/restoring the file and
restarting the MCP process. Unreadable credential stores reject load/list/save/
delete; restoring their file permits a retry. No corrupt file is auto-deleted.
An interrupted process can leave its unique temporary sibling, which later
saves ignore and preserve. Concurrent writers still use independent snapshots;
atomic replacement does not merge their changes. Use one MCP writer per store.
The existing machine-derived encryption key is unchanged.

`scripts/test-state.mjs` creates one owned directory per test process before
storage imports. The affected tests no longer back up, restore or remove real
home files. File-format checks now exercise the actual module and require a
complete persisted session. AGENTS.md explains the real execution boundaries.

## Verification and release

Initial native source suite: 1 pass, 7 failures, 1 Windows mode skip. All child
processes had a fake home, so this reproduction could not touch real user state.
The first correction exposed real Windows rename contention. A bounded retry
was then checked against a saturated reader: successful or explicitly refused
saves preserve parseable files, followed by a successful retry after contention.
Earlier failing attempts remain in the source task evidence.

Use the compiled packages for the normal Node 20/22 CI suite:

```sh
node --test packages/arcanea-mcp/tests/persistence-recovery.test.mjs
node --test packages/arcanea-mcp/tests/*.test.mjs packages/auth/tests/auth.test.mjs
```

For a local Node runtime supporting TypeScript stripping:

```sh
ARCANEA_TEST_SOURCE=1 node --test packages/arcanea-mcp/tests/persistence-recovery.test.mjs
```

The local check covers real isolated files, child-process reopening, invalid
path/configuration refusal, write failure/rollback/retry, corruption preservation,
process interruption and concurrent reader safety. It does not prove package
compilation, marketplace installation, live account use or production release.
Full source-bound native CI and independent provider review remain required.
No release permission follows from loading these instructions. Keep the PR draft
until those checks and applicable acceptance pass. Rollback is a normal reviewed
revert; preserve existing user files and temporary evidence.
