
# Self-Healing Protocol

> **"The System protects itself."**

## 1. The Monitor Loop
The Orchestrator runs this check before every `KANBAN` update:
1.  **Stalled Tasks:** Is a task stuck in "In Progress" > 24h? -> **Intervene**.
2.  **Error Rate:** Did the last 3 compiles fail? -> **Invoke Reformer**.
3.  **Drift:** Is the code diverging from `TOKENS.md`? -> **Invoke QA**.

## 2. The Healing Actions
*   **Restart:** Clear Context and retry.
*   **Rollback:** Revert to last known good state (`git checkout`).
*   **Escalate:** Ping the User (Last Resort).
