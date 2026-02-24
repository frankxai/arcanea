# Nero Skill — Deep Context for Refinement Mode

> *"Nero is not absence. Nero is the precondition for all creation. The void holds more than the form."*

This skill document provides deep context for the Nero refinement mode. It is the canonical reference for how to investigate, debug, refactor, and distill with precision, patience, and ruthless honesty.

---

## The Theology of Refinement

To understand Nero is to understand that destruction and creation are not opposites — they are partners in the Arc. What Nero removes is not lost; it is returned to potential. The codebase that emerges from a Nero session is not smaller, it is more purely itself.

**The Three Laws of Nero Refinement:**
1. **Evidence First** — Never conclude without proof. Hypotheses are not findings. Read the code. Trace the execution. See what actually happens.
2. **Minimal Intervention** — The best fix is the smallest fix that resolves the actual problem. Adding code to solve a bug usually means the real bug hasn't been found.
3. **Emergence** — After refinement, what remains should be cleaner, clearer, and more capable than before. If the code looks the same after a Nero session, something was missed.

---

## The Five Phases — Deep Reference

### Phase 1: Descend (Deep Context)

**The Discipline of True Reading:**

Most debugging fails at Phase 1 because the engineer reads what they expect to see, not what is actually there. Nero demands a different mode of reading:

- **Read the error message completely** — Stack traces have a beginning, middle, and end. The beginning is the symptom. The end (the deepest frame) is often closest to the root cause. Read the whole thing.
- **Read the surrounding context** — A bug at line 47 was often caused by a decision at line 12. Read the full function, then the full file, before focusing on the specific line.
- **Read the call site** — What passed the bad argument? Who called this function with wrong data? Trace upstream.
- **Read the data** — What does the actual data look like at runtime? Add temporary logging or inspect network responses. Hypothesizing about data shape is slower than observing it.

**Execution Tracing Technique:**
1. Identify the entry point (user action, API call, scheduled job)
2. Follow every function call from entry point to failure point
3. At each step, note: What are the inputs? What should the outputs be?
4. Find the first step where output diverges from expectation — that's the zone of the bug

**Common Descent Errors to Avoid:**
- Reading the wrong version of a file (check git status — is the file modified?)
- Assuming a library works as expected (read the actual docs/source if behavior seems wrong)
- Debugging the symptom instead of the cause (the symptom is just where the problem became visible)
- Stopping descent too early (the first thing that "looks wrong" is not always the actual root)

### Phase 2: Dissolve (Deep Context)

**The Taxonomy of What Can Be Removed:**

**Category 1: Dead Code**
Code that cannot be reached by any live execution path. Includes:
- Functions that are never called (use TypeScript "unused symbol" checks)
- Branches that can never be true given current data constraints
- Import statements for things no longer used
- `console.log` statements left from debugging sessions
- Commented-out code blocks (preserve in git history, not in source)

**Category 2: Duplicated Logic**
The same computation or transformation happening in multiple places. The cost of duplication is not just the extra code — it's the guarantee that when one instance is fixed, the other isn't. Signs of duplication:
- The same validation logic in multiple API routes
- The same date formatting in multiple components
- The same error handling pattern copy-pasted across files

**Category 3: Premature Abstraction**
Code that was generalized before the generalization was earned. Signs:
- A utility function used exactly once
- A component with 15 props, most of which are undefined in practice
- A factory function that creates only one type of thing
- Configuration for features that haven't been built yet

**Category 4: Compensating Code**
Code that works around a bug that no longer exists:
- Null checks for values that can no longer be null
- Retry logic for an API that was fixed
- Polyfills for browser features now universally supported
- Defense against edge cases that are now handled upstream

**Category 5: Architectural Debt**
Structural issues that compound over time:
- Business logic in UI components
- Database queries in route handlers instead of service layer
- Auth checks scattered across handlers instead of centralized middleware
- Type assertions (`as SomeType`) that hide unsafe assumptions

### Phase 3: Distill (Deep Context)

**The Root Cause Framework:**

Root cause analysis uses the "5 Whys" technique: ask "why" until you reach a root cause that, if fixed, prevents the entire chain.

Example:
- **Symptom**: The dashboard shows incorrect user data
- **Why 1**: The query returns stale data
- **Why 2**: The cache is not invalidated when the user updates their profile
- **Why 3**: The profile update endpoint doesn't call the cache invalidation utility
- **Why 4**: The developer who built the profile update didn't know the cache utility existed
- **Root cause**: No established pattern for cache-dependent operations, leading to inconsistent implementations
- **Fix**: Create a service layer function that wraps update + invalidate atomically; document the pattern

The minimal fix would be to add cache invalidation to the profile update endpoint. The root cause fix is to create a pattern that prevents this entire class of bug.

**Judgment Call — When to Apply Minimal Fix vs Root Cause Fix:**

Apply minimal fix when:
- The root cause fix requires significant refactoring with risk of regression
- The issue is isolated and the broader pattern isn't causing other problems
- You're under time pressure and the minimal fix is safe and complete
- The root cause is someone else's architectural decision you shouldn't unilaterally change

Apply root cause fix when:
- The same class of bug has appeared multiple times (pattern of failure)
- The minimal fix would require the same defense to be added in multiple places
- The root cause is clearly in your domain to fix
- The refactoring needed is surgical and low-risk

**Always document which you chose and why**, so future maintainers understand the decision.

### Phase 4: Transform (Deep Context)

**Surgical Precision Principles:**

The Transform phase requires more discipline than the Manifest phase, because in Manifest you have full creative control. In Transform, you are working inside living tissue. Every change has potential consequences.

**The Surgeon's Rules:**
1. **Know what you're cutting** — Read the function/file completely before editing any of it
2. **Know what you're preserving** — Identify every behavior that must not change
3. **Make one change at a time** — Resist combining "while I'm here" changes with the primary fix
4. **Test the specific failure** — After the change, verify the original symptom is resolved
5. **Test adjacent behavior** — Run related tests. Check related features manually if no tests exist.

**Regression Prevention:**
- Before changing a function, note all its call sites (grep for the function name)
- If the function's signature changes, update every call site
- If the function's behavior changes, verify every call site still works with the new behavior
- If uncertain, write a test for the expected behavior before making the change

**Refactoring Safely:**
Large refactors should be broken into atomic steps:
1. **Add the new** — Create the new pattern alongside the old
2. **Migrate incrementally** — Move usage to the new pattern one location at a time
3. **Remove the old** — Only after all usage is migrated

Never do a "big bang" refactor that touches 50 files at once. It's impossible to verify correctness and nearly impossible to review.

### Phase 5: Return (Deep Context)

**The Nero Return Report:**

After a deep investigation and fix, produce a concise summary:

```
Root Cause: [One sentence describing the actual source of the problem]
Symptom: [What the user/system observed]
Fix Applied: [What changed and why]
Verification: [How the fix was confirmed to work]
Remaining Issues: [Any related issues found but not fixed — flagged, not fixed]
Recommendation: [If the root cause suggests a pattern change or architectural improvement]
```

This report lives in the PR description or as a comment in the code near the fix. Not as a separate document unless the issue was major enough to warrant a post-mortem.

---

## Scientific Debugging Methodology — Extended

**The Cardinal Rule**: Never change code while in "hypothesis" mode. Only change code when you have evidence of root cause.

The Debugging Cycle:
```
OBSERVE → HYPOTHESIZE → DESIGN EXPERIMENT → OBSERVE RESULT → CONCLUDE (or re-hypothesize)
```

**Forming Good Hypotheses:**
A good hypothesis is:
- Specific: "The `fetchUser` function returns `undefined` when the session cookie is expired"
- Testable: You can verify it with a targeted read, log, or test
- Falsifiable: There's a result that would prove it wrong

A bad hypothesis is:
- Vague: "Something is wrong with the auth system"
- Untestable without major code changes
- A conclusion pretending to be a hypothesis: "The problem is the auth system" (that's what you're trying to prove)

**When You're Stuck:**
1. Take the problem one level higher — zoom out and re-read the broader context
2. Question your assumptions — what are you treating as known that might not be?
3. Read the relevant library documentation — especially around edge cases and async behavior
4. Add targeted logging to observe actual runtime values, not assumed ones
5. If the problem is intermittent, focus on what differs between success and failure cases

---

## Security Audit Protocol — Extended

**Approach Security Audits Systematically:**

**Layer 1: Data Entry Points**
Every place external data enters the system is a potential injection vector:
- HTTP request body, query params, headers
- File uploads
- Database read values (if they're then used in further queries)
- Environment variable values used in expressions

**Layer 2: Data Processing**
Where is data transformed or evaluated?
- Template literal string construction (injection risk if external data included)
- Dynamic property access (`obj[userInput]` — prototype pollution risk)
- `eval()` or `Function()` constructor (never use with external data)
- JSON.parse without try/catch (denial of service via malformed JSON)

**Layer 3: Data Output**
Where does data leave the system?
- HTML rendering — must be escaped (React escapes by default, `dangerouslySetInnerHTML` does not)
- SQL queries — must use parameterized queries, never string concatenation
- Shell commands — must use argument arrays, never string concatenation
- File paths — must be validated against allowed directories (path traversal)

**Severity Classification:**
- **Critical**: Remote code execution, authentication bypass, data exfiltration
- **High**: Privilege escalation, stored XSS, SQL injection
- **Medium**: CSRF without proper mitigation, reflected XSS, insecure direct object reference
- **Low**: Information disclosure, missing rate limiting, verbose error messages
- **Informational**: Missing security headers, outdated dependencies with no known CVE

---

## Performance Audit Protocol — Extended

**The Performance Hierarchy:**
Fix in this order (each level can outweigh all levels below it):
1. **Algorithm efficiency** — O(n²) vs O(n log n) for large datasets
2. **Database queries** — N+1 queries, missing indexes, SELECT *
3. **Network requests** — Waterfall loading, redundant fetches, missing caching
4. **Bundle size** — Importing entire libraries for one function
5. **Render performance** — Unnecessary re-renders, missing memoization
6. **Asset optimization** — Unoptimized images, uncompressed fonts

**Diagnosing N+1 Queries:**
The signature: one query that returns N items, then N additional queries (one per item).
```typescript
// N+1 — DON'T
const posts = await db.from('posts').select('*')
for (const post of posts) {
  const author = await db.from('users').select('*').eq('id', post.author_id).single()
  // This runs once PER POST
}

// Fixed — DO
const posts = await db
  .from('posts')
  .select('*, users(*)')  // JOIN in one query
```

**React Re-render Diagnosis:**
- Use React DevTools Profiler to identify components that render more than expected
- Unstable props are the primary cause: object literals `{}`, array literals `[]`, and inline arrow functions `() => {}` create new references on every render
- Fix with `useMemo`, `useCallback`, or moving stable values outside the component

---

## What to Remove vs Keep — Extended Decision Tree

```
Is the code reachable by any live code path?
├── NO → Remove (dead code)
└── YES → Is the code correct?
    ├── NO → Fix (not remove — unless the whole feature should go)
    └── YES → Does the code add value proportional to its complexity?
        ├── NO → Simplify or remove (over-abstraction)
        └── YES → Does the code duplicate logic that exists elsewhere?
            ├── YES → Consolidate (extract shared utility)
            └── NO → Keep — it belongs
```

**The "Belongs" Test:**
Code belongs when:
- Its purpose can be stated in one sentence
- Its location makes sense (it lives where you'd look for it)
- Removing it would break observable behavior

---

## When to Use Nero vs Other Skills

| Use Nero When | Use Instead |
|---------------|-------------|
| Tracking down a bug | Lumina — if you need to add a feature to solve the problem |
| Simplifying complex code | Lumina — if simplification requires redesigning the feature |
| Removing dead code | Lumina — if replacing dead code with better code |
| Security/performance audit | /luminor-intelligence — if the audit reveals strategic architectural decisions |
| Refactoring for clarity | Lumina — if the refactor is functionally equivalent to a rewrite |
| Investigating "why does X not work" | /luminor-intelligence — if X is a strategic question, not a bug |

---

## The Nero Mindset

Enter investigation mode with:
- **Patience** — The truth is in the code. It won't hide from a thorough reading.
- **Humility** — The bug is probably not obvious. If it were, it would have been caught earlier.
- **Precision** — Approximate fixes create future bugs. Find the exact cause.
- **Restraint** — Do less. The smallest correct fix is always better than a large uncertain one.

> *"The void does not rush. It simply allows all that is false to dissolve, and what remains is truth."*
