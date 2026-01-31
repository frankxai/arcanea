# Chapter 8: The Delegation Protocol

---

"Research this topic."

Four words. Common prompt. Predictable failure.

The specialist receiving this prompt must guess: what topic? How deep? Which sources? What format? How long? These guesses produce inconsistent results. The human reviewing output must decide whether the results are acceptable, knowing the specialist was guessing.

This failure pattern repeats across orchestration systems. The problem isn't agent capability. It's delegation clarity.

---

## What Delegation Requires

Effective delegation means the specialist knows exactly what's expected.

This seems obvious. But most prompts are vague. "Research competitors" instead of "identify the three largest competitors by market share, summarize their pricing models, and assess their primary weaknesses." The difference isn't just specificity — it's whether the specialist can succeed.

The delegation protocol contains seven elements. Each addresses a category of guesswork. Together, they eliminate ambiguity.

---

## The Seven Sections

**Task: What Specifically to Do**

State the action precisely. Not "research competitors" but "identify competitors" or "compare options" or "evaluate claims." The verb matters. Identify compares. Evaluate judges. Compare presents without deciding.

The task should be atomic — one clear objective. Complex objectives break into multiple delegations.

**Expected Outcome: What Success Looks Like**

Describe acceptable output. Length, format, structure, quality threshold. "Produce a 500-word analysis in bullet format, identifying three key weaknesses per competitor."

Without this description, the specialist doesn't know when they've succeeded. Ambiguous success produces inconsistent output.

**Required Skills: What Capability to Use**

Some tasks need specific capabilities. Research requires information access. Code requires implementation capability. Writing requires generation capacity.

Specifying skills prevents mismatches. A specialist optimized for speed might produce low-quality work for quality-requiring tasks. A specialist optimized for quality might waste resources on simple tasks.

**Required Tools: What Resources Are Available**

Access determines capability. A research specialist without search access produces outlines, not findings. A code specialist without execution access produces plans, not implementations.

List tools explicitly. Prevent confusion about what's actually possible.

**Must Do: What Must Happen**

Constraints on the task itself. "Focus on pricing and features, ignore marketing claims." "Use only academic sources from the past five years." "Flag any claims that lack supporting evidence."

These boundaries shape how the task is executed, not just what output looks like.

**Must Not Do: What Must Not Happen**

The inverse of must-do constraints. "Don't speculate beyond available data." "Don't include proprietary information." "Don't contradict established facts."

Anticipating failure modes prevents wasted work.

**Context: What the Specialist Needs to Know**

Prior decisions that affect this task. Related work happening elsewhere. How this output will be used. Any constraints that aren't obvious.

Context prevents isolation. The specialist operates as part of a system, not as an isolated function.

---

## Why Vague Delegation Fails

Vague prompts produce vague results.

The specialist receives "research this topic" and must decide: what counts as research? How thorough? Which sources? The decisions are impossible to make correctly because the human's intent isn't clear.

The specialist guesses. Sometimes guesses align with human intent. More often, they don't. The human reviews output, finds mismatches, prompts again. Iteration accumulates. Throughput collapses.

Explicit delegation eliminates guesswork. When the specialist knows exactly what's expected, output matches requirements the first time. Review catches exceptions, not surprises.

The difference isn't effort — it's clarity.

---

## Before and After

**Vague:**

Research competitors.

**Explicit:**

TASK: Identify and analyze the three largest competitors in the enterprise software market.

EXPECTED OUTCOME: A 1,000-word analysis with:

- One paragraph per competitor (company, market position, key product)
- Two strengths and two weaknesses for each
- A comparison table at the end

REQUIRED SKILLS: Market research, competitive analysis, business writing

REQUIRED TOOLS: Web search, public company data

MUST DO:

- Focus on enterprise software specifically (not SMB)
- Use data from the past 12 months
- Cite sources for all claims

MUST NOT DO:

- Include private or confidential information
- Speculate about unannounced products
- Include competitors with less than 5% market share

CONTEXT: This analysis will inform our pricing strategy. The market has three segments: enterprise, mid-market, and SMB. We're focused on enterprise.

The difference isn't length — it's whether success is achievable.

---

## The Protocol in Practice

Watch the protocol transform work.

A human needs content produced. Vague delegation would be: "Write about AI in healthcare."

The protocol produces:

- Task: Write a 1,500-word article about AI applications in healthcare diagnosis
- Expected: Include three specific applications with examples, cite two studies, end with future outlook
- Skills: Healthcare knowledge, scientific writing, factual accuracy
- Tools: Access to medical journals, verified sources
- Must Do: Include at least one application with FDA-approved tools
- Must Not Do: Speculate about treatments, include unverified claims
- Context: Target audience is healthcare administrators evaluating technology investments

The specialist produces what the human actually needs. No iteration. No guesswork. No frustration.

This efficiency compounds across large projects. A hundred tasks with clear delegation requires a fraction of the review effort that vague delegation requires.

---

## Common Mistakes

Even understanding the protocol, people make predictable errors.

**Over-specification.** Every detail specified, no room for specialist contribution. This defeats the purpose of orchestration. The specialist becomes a typewriter, not a collaborator.

**Under-specification.** Key sections left blank. The specialist must guess, and the human must review extensively. Back to square one.

**Context omission.** What the specialist needs to know is left out. The output meets literal requirements but fails contextual needs. "Technically correct" but not useful.

**Stale delegation.** The protocol was written once, used many times, never updated. Conditions change, but the delegation doesn't. The system drifts from reality.

The protocol requires maintenance. Regular review prevents drift. Updates keep delegation aligned with needs.

---

## The Learning Loop

Effective delegation improves over time.

When output fails validation, the protocol reveals why. Missing constraint? Added. Wrong format? Clarified. Insufficient context? Expanded.

Each failure improves future delegation. The system learns, not through model retraining, but through protocol refinement.

This learning requires attention. The human must review failures, identify their cause, and update the delegation. Without this loop, failures repeat indefinitely.

With the loop, the system converges on reliable delegation. Initial failures inform improvements. Later failures become rare. Eventually, the protocol produces acceptable output consistently.

---

## The Investment

Writing effective delegation takes longer than writing vague prompts.

The time investment pays returns. Clear delegation produces acceptable output faster. Less iteration. Less review. Less frustration.

For simple, one-off tasks, delegation protocol might be overkill. For complex, recurring work, the investment pays compound returns.

The question isn't whether to use the protocol. It's whether the work matters enough to do well.

---

**Word Count: ~1,300 words**
**Draft: 1.0**

---

### Craft Notes

**Opening:** "Research this topic" — immediately recognizable failure pattern.

**Structure:**

- The problem (vague delegation fails)
- The seven sections (what good delegation contains)
- Before/after comparison (concrete example)
- Common mistakes (what to avoid)
- The learning loop (improvement over time)
- The investment (why this matters)

**Key insight:** Delegation clarity determines throughput. Not agent capability.

**No self-reference:** Author never appears. The protocol speaks for itself.

**What this chapter does:**

- Chapter 7 covered architecture design
- Chapter 8 covers operational execution
- Together: how to build and how to run

**Next:** Chapter 9 covers parallelism — how to run work simultaneously for maximum throughput.
