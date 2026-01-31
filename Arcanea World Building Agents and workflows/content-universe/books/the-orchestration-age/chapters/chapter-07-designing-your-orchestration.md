# Chapter 7: Designing Your Orchestration

---

In 1889, the Eiffel Tower didn't exist. By 1900, it was the tallest structure on earth.

The tower's design emerged from a competition. Gustave Eiffel's entry wasn't the most aesthetic — other designs looked more beautiful. It was the most buildable. Every beam, every rivet, every joint was engineered for construction. The architects who won competitions for prettier towers watched their projects stall when engineers realized they couldn't actually be built.

Eiffel's advantage wasn't artistry. It was systems thinking.

---

## Start With Outcomes, Not Agents

The common mistake in orchestration design is backward.

Most people begin: "What AI models do I need?" or "Which agents should I build?" These questions lead to capability catalogs and feature comparisons. They miss what matters.

Begin instead with outcomes. What does success look like? What work needs to happen? What quality standard must outputs meet? What timeline is acceptable?

These questions precede agent selection. A content operation that needs ten thousand articles monthly has different requirements than one that needs ten. A research function that must verify every claim against primary sources has different requirements than one that synthesizes secondary sources.

The agent architecture follows from the outcome requirements. Not the other way around.

---

## The TACO Framework

Orchestration systems contain four levels of agent sophistication. Understanding these levels helps match capability to need.

**Taskers** execute single instructions. They don't coordinate, don't context-switch, don't handle complexity. Give them one task, they complete it. Ask them to handle multi-step processes, they fail.

Taskers are appropriate for simple, bounded work: format this document, extract these names, summarize this text. Their limitation is their advantage — they're reliable for narrow scope because they have no scope to manage.

**Automators** handle sequential processes. They can execute a defined workflow: research, then draft, then validate. The sequence is fixed. Within each step, they operate independently. They don't decide when to skip steps or how to handle unexpected inputs.

Automators are appropriate for well-defined production pipelines. The steps are known in advance. The branching logic is minimal. The system runs until completion.

**Collaborators** engage in multi-turn interaction. They respond to feedback, adapt to new information, and handle ambiguity. They don't just execute workflows — they participate in them. The human direction shifts based on collaborator output; collaborator output shifts based on human direction.

Collaborators are appropriate for creative work. Writing, design, analysis — tasks where the direction emerges from doing, not the other way around.

**Orchestrators** manage other agents. They don't produce content directly — they direct production. They break complex tasks, assign components, collect outputs, and synthesize results. Their work is coordination, not creation.

Orchestrators are appropriate for complex projects that exceed any single agent's capacity. They scale by adding parallel execution rather than by extending individual capability.

Most effective orchestration systems combine all four levels. Taskers handle simple extraction. Automators run production pipelines. Collaborators do creative work. Orchestrators coordinate across the system.

---

## Model Selection Principles

Not all models suit all roles.

The temptation is simple: use the most capable model available. Claude Sonnet or GPT-4 for everything. This wastes resources and slows systems.

The principle is economic: match model capability to task requirements.

**Complex, open-ended work** requires capable models. Writing, analysis, synthesis — tasks where judgment matters and failure modes are subtle. These benefit from expensive, slow, high-quality models.

**Simple, bounded work** doesn't require capable models. Formatting, extraction, summarization — tasks where failure modes are obvious and quality is binary (correct or incorrect). These run faster and cheaper on smaller models.

**Parallel execution** amplifies this principle. When fifty simple tasks run simultaneously, the cost difference between expensive and cheap models compounds. A 0.01 task cost becomes 0.50 when multiplied by fifty. A 0.10 task cost becomes 5.00.

Design systems so simple work uses simple models. Complex work uses capable models. The architecture enables this without requiring human intervention for every task assignment.

---

## Background Versus Blocking

Some work can run in parallel. Some work must wait.

**Blocking work** has dependencies. Task B requires output from Task A. Task C requires output from Task B. These chain sequentially. The timeline equals the sum of individual durations.

**Background work** has no dependencies. Task A, Task B, and Task C can run simultaneously. The timeline equals the longest individual duration, not the sum.

The distinction determines orchestration structure. Breaking complex work into parallelizable components is where throughput gains emerge.

Consider a content project: research, draft, edit, format, publish. Sequential execution might take eight hours. Parallel execution could take three — research, drafting, and editing happen simultaneously, with formatting and publishing following.

The skill is decomposition: identifying what can run in parallel versus what must wait. This requires understanding dependencies, not just tasks.

---

## Practical Design Patterns

The principles above translate into architecture.

**Hierarchical orchestration** places orchestrators at multiple levels. A top-level orchestrator manages domain orchestrators (content, research, code). Each domain orchestrator manages specialists. This scales systems beyond what any single coordinator could handle.

**Pipeline automation** chains automators into production flows. Research automator produces output that feeds drafting automator, which feeds editing automator. The chain runs without intervention for known, stable workflows.

**Human-in-the-loop collaboration** uses collaborators for work requiring judgment. The human provides direction, reviews output, redirects as needed. The loop continues until quality meets standard.

**Validator gates** insert validation between production stages. No output advances without passing checks. This discipline maintains quality as systems scale.

Effective systems combine patterns. Hierarchical orchestration enables scale. Pipeline automation enables throughput. Collaboration enables creativity. Validation enables trust.

---

## The Systems Thinking Return

The Eiffel Tower's designers won not by imagining a beautiful tower but by engineering a buildable one. The beauty emerged from the buildability.

Orchestration design follows the same principle.

Start with outcomes, not capabilities. Match model to task, not to ego. Parallelize where possible, chain where necessary. Validate at every gate.

The result is systems that actually work — not in theory, but in practice. Not for simple demos, but for real production at real scale.

The architects who design buildable systems will shape what's possible. The ones who optimize for spectacle will watch their towers never rise.

---

**Word Count: ~1,150 words**
**Draft: 1.0**

---

### Craft Notes

**Opening:** Eiffel Tower competition — historical example of systems thinking over aesthetics. Readers recognize the story.

**Structure:**

- Start with outcomes (principle one)
- TACO framework (four levels)
- Model selection (economic matching)
- Blocking vs background (parallelism principle)
- Practical patterns (design translation)
- Return to opening (synthesis)

**First principles:**

- Outcomes before agents
- Match capability to requirement
- Parallel where possible, chain where necessary

**What this chapter does:**

- Chapter 6 explained why validation matters
- Chapter 7 shows how to design systems that work
- Practical, actionable, grounded

**No self-reference:** Author never appears. The principles speak for themselves.

**Next:** Chapter 8 goes deep on delegation — how to talk to agents effectively.
