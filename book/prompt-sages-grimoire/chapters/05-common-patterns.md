# Chapter V: The Pattern Compendium

> *"A pattern is a problem that has been solved so many times that the solution has become a shape."*

---

## The Essential Patterns

These patterns appear across domains. Master them and you master the core of prompting.

---

### Pattern 1: The Expert Persona

**Purpose**: Invoke specific expertise and communication style.

**Structure**:
```
You are a [specific expert type] with [years] of experience in [domain].
Your specialty is [narrow focus].
You communicate like [communication style].
[Optional: specific knowledge or perspective to include/exclude]
```

**Example**:
```
You are a senior data scientist with 15 years of experience in financial services.
Your specialty is detecting fraud patterns in transaction data.
You communicate in clear, non-jargon terms because you often present to executives.
Assume I have basic statistical knowledge but no machine learning background.
```

**Anti-Pattern**:
```
You are an expert. (Too vague—in what? how expert? what style?)
```

---

### Pattern 2: The Structured Output

**Purpose**: Get consistently formatted, easy-to-use results.

**Structure**:
```
Provide your response in the following format:

[SECTION 1 NAME]
[What goes here]

[SECTION 2 NAME]
[What goes here]

[SECTION 3 NAME]
[What goes here]
```

**Example**:
```
Analyze this business idea. Structure your response as:

## OPPORTUNITY
[What market problem does this solve?]

## DIFFERENTIATION
[How is this different from existing solutions?]

## RISKS
[Top 3 risks, each with mitigation strategies]

## VERDICT
[One paragraph assessment with a score from 1-10]
```

**Anti-Pattern**:
```
Tell me what you think. (No structure = inconsistent, hard-to-use output)
```

---

### Pattern 3: The Few-Shot

**Purpose**: Teach through examples rather than explanation.

**Structure**:
```
[Task description]

Examples:
Input: [example input 1]
Output: [example output 1]

Input: [example input 2]
Output: [example output 2]

Now:
Input: [actual input]
Output:
```

**Example**:
```
Convert formal sentences to casual ones while keeping the meaning.

Examples:
Input: "I would be grateful if you could provide me with information regarding the project timeline."
Output: "Hey, any updates on when the project wraps up?"

Input: "Please be advised that the meeting has been rescheduled to Thursday at 2 PM."
Output: "Heads up—meeting moved to Thursday at 2."

Now:
Input: "We regret to inform you that your application has been unsuccessful on this occasion."
Output:
```

**Anti-Pattern**:
```
Make it casual. (The AI's idea of "casual" may differ from yours)
```

---

### Pattern 4: The Chain of Thought

**Purpose**: Improve reasoning by making thinking explicit.

**Structure**:
```
[Task]

Think through this step by step:
1. First, [initial analysis step]
2. Then, [deeper analysis step]
3. Consider [potential complications]
4. Finally, [synthesis step]

Then provide your conclusion.
```

**Example**:
```
Should we expand into the European market?

Think through this step by step:
1. First, identify the key factors that determine success in European expansion
2. Then, assess our current capabilities against each factor
3. Consider the risks specific to European operations (regulatory, cultural, logistical)
4. Finally, weigh the opportunity against the risks and our strategic priorities

Then provide your recommendation with confidence level.
```

**Anti-Pattern**:
```
Just give me the answer. (For complex questions, reasoning improves quality)
```

---

### Pattern 5: The Contrastive

**Purpose**: Clarify what you want by showing what you don't want.

**Structure**:
```
[Task description]

DO:
- [Positive example or characteristic]
- [Positive example or characteristic]

DON'T:
- [Negative example or characteristic]
- [Negative example or characteristic]
```

**Example**:
```
Write a performance review for a high-performing employee.

DO:
- Use specific examples of achievements
- Connect their work to business outcomes
- Suggest meaningful growth opportunities

DON'T:
- Use vague phrases like "great team player"
- Focus only on soft skills without concrete accomplishments
- Include any hint of criticism (this is for a top performer)
```

**Anti-Pattern**:
```
Write a good performance review. (What's "good"? The AI doesn't know your standards)
```

---

### Pattern 6: The Constraint Set

**Purpose**: Define boundaries that shape the output.

**Structure**:
```
[Task description]

Constraints:
- Length: [word/character count]
- Tone: [specific tone descriptor]
- Audience: [who will read this]
- Must include: [required elements]
- Must avoid: [forbidden elements]
```

**Example**:
```
Write a product announcement for our new project management tool.

Constraints:
- Length: 200-250 words
- Tone: Excited but not hyperbolic
- Audience: Existing customers who use our other products
- Must include: Three specific features, availability date, call to action
- Must avoid: Comparisons to competitors, technical jargon, price information
```

**Anti-Pattern**:
```
Announce our new product. (Length? Tone? Audience? All undefined)
```

---

### Pattern 7: The Role Play

**Purpose**: Simulate a specific context or interaction.

**Structure**:
```
I want you to act as [role].
Context: [situation setup]
I am [my role in the scenario].

When I [describe my action], you should [describe expected response type].

Let's begin. [First action or statement]
```

**Example**:
```
I want you to act as a skeptical investor hearing a startup pitch.
Context: I'm presenting my Series A pitch for a B2B SaaS company.
I am the founder.

When I present parts of my pitch, you should ask tough but fair questions
that a real investor would ask. Point out weak spots but stay constructive.

Let's begin. My company, MetricFlow, is solving the $50B analytics problem...
```

**Anti-Pattern**:
```
Pretend you're an investor. (How skeptical? What stage? What focus?)
```

---

### Pattern 8: The Iterative Refinement

**Purpose**: Build toward excellence through multiple passes.

**Structure**:
```
Round 1: [Initial generation request]
Round 2: [Refinement direction]
Round 3: [Further refinement]
...continue until satisfied...
```

**Example**:
```
Round 1: "Write a tagline for a meditation app targeting stressed professionals."

[AI generates options]

Round 2: "The third option is closest. Make it shorter—max 5 words—
and make 'peace' the key word."

[AI refines]

Round 3: "Good, but it sounds too passive. Make it feel more empowering—
like the user is taking control, not just receiving calm."

[AI refines further]
```

**Anti-Pattern**:
```
Write a perfect tagline. (Perfection emerges through iteration, not instruction)
```

---

### Pattern 9: The Evaluation Request

**Purpose**: Get analysis and assessment rather than just generation.

**Structure**:
```
Evaluate [subject] using these criteria:

1. [Criterion 1]: [Definition or rubric]
2. [Criterion 2]: [Definition or rubric]
3. [Criterion 3]: [Definition or rubric]

For each criterion:
- Score [scale]
- Explain your reasoning
- Suggest one improvement

Then provide an overall assessment.
```

**Example**:
```
Evaluate this landing page copy using these criteria:

1. Clarity: How immediately understandable is the value proposition?
2. Urgency: Does it create a reason to act now?
3. Proof: Is there evidence that this works?
4. Differentiation: Is it clear how this differs from alternatives?

For each criterion:
- Score 1-10
- Explain your reasoning
- Suggest one specific improvement

Then provide an overall assessment with priority recommendations.
```

**Anti-Pattern**:
```
Is this good? (Good by what measure? For what purpose?)
```

---

### Pattern 10: The Synthesis

**Purpose**: Combine multiple inputs into something new.

**Structure**:
```
I'm going to give you [number] different [inputs].

Your task: [synthesis goal]

Approach: [how to combine them]

[Input 1]
[Input 2]
[Input 3]
...

Now synthesize according to the approach above.
```

**Example**:
```
I'm going to give you three different product positioning statements
we're considering for our launch.

Your task: Create a fourth option that combines the best elements of all three.

Approach: Identify what each does well, what each lacks,
and synthesize a new statement that keeps the strengths and fills the gaps.

Option A: "MetricFlow: Analytics that think for you."
Option B: "Turn data into decisions in seconds."
Option C: "The last dashboard you'll ever need."

Now synthesize according to the approach above.
```

**Anti-Pattern**:
```
Combine these ideas. (How? What's the goal? What's the priority?)
```

---

## Domain Patterns

These patterns are optimized for specific use cases.

### Writing Patterns

```
PATTERN: Voice Match
"Analyze the writing style of [sample text].
Then write [new content] matching that voice precisely.
After writing, list which elements of the original voice you preserved."

PATTERN: Editing Pass
"Review this text for [specific issue].
For each instance found:
1. Quote the problematic text
2. Explain the issue
3. Provide a revised version
At the end, summarize patterns you noticed."

PATTERN: Perspective Shift
"Rewrite this [content] from the perspective of [new viewpoint].
Keep the core information but change the emphasis, word choice,
and framing to match how [persona] would see it."
```

### Analysis Patterns

```
PATTERN: SWOT+
"Analyze [subject] using extended SWOT:
- Strengths (with evidence)
- Weaknesses (with impact assessment)
- Opportunities (with probability and timeline)
- Threats (with severity and mitigation options)
Then: Strategic recommendations based on the analysis."

PATTERN: Root Cause
"[Describe problem]
Work backward through potential causes:
1. What directly caused this? (Proximate cause)
2. What caused that cause? (Second level)
3. What caused that? (Third level)
Continue until you reach actionable root causes.
For each root cause, suggest an intervention."

PATTERN: Decision Matrix
"I need to decide between [options].
Create a decision matrix:
1. Identify the 5 most important criteria for this decision
2. Weight each criterion (must total 100%)
3. Score each option on each criterion (1-10)
4. Calculate weighted scores
5. Recommend with caveats about the methodology."
```

### Creative Patterns

```
PATTERN: Brainstorm Burst
"Generate 20 ideas for [topic/challenge].
Rules:
- First 10: Obvious ideas (establish baseline)
- Next 5: Unusual combinations (mix unexpected elements)
- Final 5: Impossible ideas (remove all constraints)
Then: Pick the 3 most promising from any category and develop each briefly."

PATTERN: Opposite Game
"Take [conventional approach/idea].
1. Identify its core assumptions
2. Invert each assumption
3. Build a viable alternative based on the inversions
4. Identify what you learn from the contrast"

PATTERN: Constraint Cascade
"I need creative solutions for [challenge].
Generate one solution under each constraint:
1. With zero budget
2. In 24 hours or less
3. Using only existing resources
4. That a child could understand
5. That's never been tried before"
```

---

*"Learn the patterns. Use the patterns. Eventually, forget the patterns—and let them emerge naturally from your intent."*
