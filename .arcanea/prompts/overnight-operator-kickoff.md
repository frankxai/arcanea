Read `AGENTS.md`, `docs/ops/NIGHT_SHIFT_PROTOCOL_2026-04-03.md`, `docs/ops/AGENT_BRANCH_MATRIX_2026-04-03.md`, `docs/ops/OVERNIGHT_EXECUTION_QUEUE_2026-04-03.md`, and `docs/ops/MASSIVE_ACTION_LOG_2026-04-03.md`.

Use a clean worktree or promotion branch, not dirty `main`.

Pick the highest-priority non-overlapping slice from the overnight queue.

For each slice:

1. define a task contract with:
   - scope
   - owner
   - files
   - non-goals
   - acceptance criteria
   - verification
2. implement or review the slice
3. verify it
4. update shared state if repo reality changed
5. continue to the next highest-value non-overlapping slice instead of stopping after the first small win

Do not merge mixed branches wholesale.
Do not claim verification you did not run.
Preserve branch discipline and product-compounding priorities.
