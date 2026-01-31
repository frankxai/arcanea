# Chapter 10: When It Breaks

---

The system produces garbage.

Outputs contradict each other. Specialists work at cross-purposes. The source of truth isn't being consulted. Validation gates are being bypassed. Nothing is consistent.

This isn't theoretical. Every orchestration system eventually reaches this state. The question isn't whether failure happens. It's how to recover.

---

## Common Failure Modes

Five patterns account for most orchestration failures.

**Vague delegation** produces inconsistent output. Specialists operate without clear direction, producing work that technically satisfies prompts but doesn't serve actual needs. Reviewers spend more time fixing delegation than reviewing output.

**Missing validation** allows errors to propagate. An output passes through without checking. Subsequent work builds on error. The mistake compounds. By discovery, the error has infected multiple stages.

**No source of truth** creates contradictions. Parallel specialists produce incompatible outputs. There's no authoritative reference to resolve conflicts. The human spends more time arbitrating than orchestrating.

**Sequential bottlenecks** waste parallel potential. Work that could run simultaneously gets forced into sequence. Dependencies are assumed that don't actually exist. The system runs slower than it should.

**Over-orchestration** adds complexity without value. The system has components that don't contribute, coordination that doesn't coordinate, validation that doesn't validate. Complexity accumulates until no one understands the system.

Each failure mode has a clear cause. Each has a clear fix.

---

## The Three-Failure Rule

After three consecutive failures, stop.

This rule prevents cascading disaster.

When delegation fails repeatedly, continuing produces more garbage. The protocol needs revision, not repetition.

When validation fails repeatedly, continuing lets errors propagate. The validator needs recalibration, not continued operation.

When outputs contradict repeatedly, continuing produces more contradictions. The source of truth needs updating, not more production.

Stop. Revert to last known working state. Analyze what went wrong. Fix the root cause. Then continue.

The discipline prevents what could be a ten-hour disaster from becoming a hundred-hour recovery.

---

## Diagnostic Approach

When failure occurs, diagnose before fixing.

**Check delegation first.** Is the specialist clear on what's expected? Does the protocol contain all seven sections? Are constraints explicit? Vague delegation produces vague output — no amount of specialist capability compensates.

**Check validation second.** Is validation actually running? Is it checking the right criteria? Are failures feeding back into protocol improvement? Missing validation lets everything through.

**Check source of truth third.** Is it current? Is it accessible? Are specialists actually consulting it? An unused source of truth doesn't prevent contradictions.

**Check dependencies fourth.** Are tasks actually independent when assumed independent? Does parallel work integrate cleanly? Dependencies that don't exist on paper might exist in practice.

The sequence matters. Fixing delegation while validation is broken produces more garbage. Fixing validation while the source is inconsistent produces garbage that passes validation.

---

## Recovery Patterns

Specific failures require specific fixes.

**For vague delegation:** Rewrite the protocol with all seven sections explicit. Test with a simple task before returning to complex work. Validate that the specialist understands.

**For missing validation:** Insert validation gates. If gates exist but aren't running, start them. If they're running but not catching issues, recalibrate criteria.

**For no source of truth:** Establish one authoritative document. Migrate existing work into it. Add validation that checks against it. Accept that this is a one-time investment that pays ongoing returns.

**For sequential bottlenecks:** Re-analyze dependencies. What was assumed dependent might actually be independent. What was assumed independent might have hidden dependencies. The analysis might take longer than the parallelization saves — that's the trade-off to accept.

**For over-orchestration:** Simplify. Remove components that don't contribute. Reduce coordination that doesn't coordinate. Complexity is the enemy of reliability.

---

## When to Consult the Oracle

Some failures resist simple fixes.

After three consecutive attempts with no improvement, stop. Revert to known working state. Document what was tried and what failed.

Then consult the Oracle.

The Oracle isn't a specific tool. It represents expensive, high-quality reasoning that can see patterns simple analysis misses. This might be:

- A more capable AI model
- An expert human in the relevant domain
- A fresh perspective from someone unfamiliar with the problem

The Oracle helps when:

- The failure pattern isn't clear
- Multiple possible causes exist with equal probability
- Standard fixes have been tried without success
- The problem might be in the system design rather than execution

The Oracle isn't always necessary. Most failures respond to standard diagnostics. When they don't, the Oracle provides insight that routine analysis can't.

---

## The Wisdom of Limits

Not every problem has a solution within current resources.

Some orchestrations are overdesigned. The complexity required exceeds the capability to maintain it. The system can't be fixed — it needs redesign from fundamentals.

Some work isn't suitable for orchestration. The dependencies are too complex, the quality requirements too subtle, the integration too difficult. Sequential human work might be more effective.

Some failures indicate the problem is wrong. The goal might be unachievable, the timeline impossible, the quality standard unrealistic.

Recognizing these situations is wisdom. Continuing to struggle against fundamental limits is not.

When orchestration fails repeatedly, ask:

- Is this orchestration appropriate for this work?
- Is this problem solvable at this level of complexity?
- Is this goal achievable with available resources?

The answers might indicate redesign, simplification, or abandonment. All are valid responses to failure.

---

## Learning from Failure

Orchestration systems improve through failure analysis.

When a failure occurs, document:

- What was attempted
- What failed
- Why it failed
- What fix was applied
- Whether the fix worked

This documentation enables pattern recognition. Recurring failure types indicate systemic problems. One-time failures indicate execution problems.

The documentation also enables prevention. Understanding failure modes allows designing them out of future systems.

Systems that learn from failure outperform systems that ignore it. The choice to analyze, document, and improve is the choice to get better.

---

**Word Count: ~1,100 words**
**Draft: 1.0**

---

### Craft Notes

**Opening:** System produces garbage — visceral description of failure state.

**Structure:**

- Five common failure modes (what goes wrong)
- Three-failure rule (when to stop)
- Diagnostic approach (how to identify cause)
- Recovery patterns (specific fixes)
- When to consult the Oracle (when simple fixes fail)
- Wisdom of limits (when to give up)
- Learning from failure (how systems improve)

**Honest about failure:** Not all problems have solutions. Some orchestration is inappropriate.

**Practical guidance:**诊断 approach is actionable. Recovery patterns are specific.

**No self-reference:** Author never appears.

**What this chapter does:**

- Chapters 7-9 covered positive patterns
- Chapter 10 covers negative patterns (failure and recovery)
- Together: how to build, run, and fix systems

**Next:** Part IV — The Golden Age Manifests. The pattern extends beyond code.
