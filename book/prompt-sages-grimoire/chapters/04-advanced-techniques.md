# Chapter IV: Advanced Techniques

> *"The journeyman knows the pillars. The master knows when to transcend them."*

---

## The Art of Constraint

### The Paradox of Limitation

The untrained mind believes that more freedom yields more creativity. The Sage knows the opposite: **constraint is the crucible of creativity**.

When you tell the AI "write something good," you have given it everything and therefore nothing. When you say "write a haiku about loss, using only words a child would know," you have created a space where brilliance can emerge.

### The Seven Constraint Types

```
1. FORMAT CONSTRAINTS
   "In exactly 100 words..."
   "As a numbered list with no more than 5 items..."
   "In the form of a dialogue between two people..."

2. VOCABULARY CONSTRAINTS
   "Using only words from the 1000 most common English words..."
   "Without using the word 'is' or 'are'..."
   "In the vocabulary of a Victorian naturalist..."

3. STRUCTURAL CONSTRAINTS
   "Following the structure: problem, failed solution, insight, resolution..."
   "Each paragraph must begin with a question..."
   "The last sentence of each section must echo the first..."

4. PERSPECTIVE CONSTRAINTS
   "From the perspective of someone who has never seen color..."
   "As if explaining to a civilization that has no concept of money..."
   "Written by someone who loves the subject but must criticize it..."

5. TEMPORAL CONSTRAINTS
   "As if written in 1850 about events in 2024..."
   "In present tense, experiencing the discovery for the first time..."
   "Looking back from 100 years in the future..."

6. EMOTIONAL CONSTRAINTS
   "With barely contained rage beneath a polite surface..."
   "With the joy of someone who just received good news..."
   "With the melancholy of a beautiful ending..."

7. KNOWLEDGE CONSTRAINTS
   "Knowing everything except the one crucial fact..."
   "With expertise in the field but blindness to the obvious..."
   "As a beginner discovering principles an expert takes for granted..."
```

### Stacking Constraints

The most powerful prompts combine multiple constraint types:

```
WEAK:
"Write about climate change."

STRONG:
"Write a letter from 2075 (temporal)
from a grandmother to her grandchildren (perspective)
explaining what the world was like before the changes (knowledge)
in exactly 500 words (format)
with tenderness but not sentimentality (emotional)
each paragraph beginning with 'I remember when...' (structural)."
```

---

## The Technique of Exemplars

### Why Exemplars Work

The AI learns patterns from examples faster than from descriptions. When you show rather than tell, you bypass the ambiguity of language.

### The Exemplar Ladder

```
LEVEL 1: SINGLE EXEMPLAR
"Write product descriptions like this one:
[example]"

LEVEL 2: MULTIPLE EXEMPLARS
"Write product descriptions like these examples:
[example 1]
[example 2]
[example 3]"

LEVEL 3: ANNOTATED EXEMPLARS
"Write product descriptions following this pattern:
[example with annotations explaining why each element works]"

LEVEL 4: CONTRASTIVE EXEMPLARS
"Write like THIS:
[good example]
NOT like this:
[bad example with explanation of what's wrong]"

LEVEL 5: PROGRESSIVE EXEMPLARS
"Start here (basic):
[simple example]
Evolve toward this (advanced):
[sophisticated example]"
```

### The Anti-Pattern Technique

Sometimes the clearest way to define what you want is to show what you don't want:

```
"Write a cover letter. Here are patterns to AVOID:

AVOID: 'I am writing to express my interest in...'
(This is generic and passive)

AVOID: 'I believe I would be a great fit for your team.'
(This is assertion without evidence)

AVOID: 'I am a hard worker and team player.'
(These are meaningless clichés)

Instead, begin with a specific connection to the company's work,
lead with your most relevant achievement,
and demonstrate your value through concrete examples."
```

---

## The Dialogue Technique

### Prompting as Conversation

The most sophisticated prompting is not instruction—it is dialogue. You are not commanding a tool; you are collaborating with an intelligence.

### The Iterative Dance

```
ROUND 1: EXPLORATION
Human: "I'm working on a story about regret. What forms does regret typically take in literature?"
AI: [Explores the terrain]

ROUND 2: FOCUSING
Human: "The third form you mentioned—regret about paths not taken—that's closest. But I want it to feel not melancholy but almost liberating. How might that work?"
AI: [Narrows and reframes]

ROUND 3: GENERATING
Human: "Yes, exactly that. Now give me three opening paragraphs that capture this—each taking a different approach to establishing this liberated-regret tone."
AI: [Produces options]

ROUND 4: REFINING
Human: "The second one has the right tone but the wrong setting. Keep the voice but move it to a train station at dawn."
AI: [Refines the chosen direction]

ROUND 5: POLISHING
Human: "Almost there. The phrase 'fading possibilities' is too on-the-nose. Find a more oblique way to suggest it."
AI: [Final polish]
```

### The Rubber Duck Technique

Sometimes the best prompt is simply thinking out loud:

```
"I'm trying to figure out how to structure a presentation about our product launch. The audience is investors who are technically sophisticated but don't know our specific domain. I need to explain the technology without being condescending, show the market opportunity without being hyperbolic, and convey urgency without seeming desperate. I'm not sure if I should lead with the problem or the solution. What's your read on this?"
```

This invites the AI into your thinking process rather than demanding an answer.

---

## The Meta-Prompt

### Prompting About Prompts

The advanced practitioner uses the AI to improve their own prompts:

```
"I want to prompt an AI to write marketing copy for a meditation app.
Here's my current prompt:
[your prompt]

How could this prompt be improved? What ambiguities might cause problems?
What constraints or context might help?"
```

### The Prompt Critique Framework

```
REQUEST:
"Analyze this prompt across five dimensions:

1. CLARITY: Is the task unambiguous?
2. CONTEXT: Is there enough background?
3. CONSTRAINTS: Are the boundaries clear?
4. CRITERIA: Will I know if the output is good?
5. CAPABILITY: Is this achievable in one response?

For each dimension, score 1-5 and explain.
Then provide a revised prompt."
```

---

## The Chain of Thought

### Thinking Before Answering

For complex tasks, ask the AI to think before it acts:

```
"Before writing the email, first:
1. Identify the recipient's likely concerns
2. Determine the key points to address
3. Consider potential objections
4. Plan the emotional arc of the message
Then write the email."
```

### The Structured Reasoning Request

```
"I need to decide between three marketing strategies.
For each one:
- List the top 3 potential benefits
- List the top 3 potential risks
- Estimate the likelihood of success (and explain your reasoning)
- Identify the key uncertainties

Then synthesize: which strategy is best given my risk tolerance
(which is moderate) and timeline (which is 6 months)?"
```

---

## The Pattern Library

### Building Your Own Patterns

As you develop prompts that work, save them. A pattern library is the Sage's spellbook.

```
PATTERN: The Perspective Shift
"Explain [topic] as if you were [unusual perspective].
Maintain that perspective consistently.
Include at least one insight that would only be visible from that angle."

PATTERN: The Steelman
"Present the strongest possible argument for [position you disagree with].
Do not strawman or subtly undermine it.
Make it genuinely persuasive."

PATTERN: The Synthesis
"Here are three different approaches to [problem]:
[approach 1]
[approach 2]
[approach 3]
Find what each does well, identify their weaknesses,
and synthesize a new approach that combines their strengths
while avoiding their weaknesses."

PATTERN: The Calibration
"Give me [output] but at three levels:
- A quick, casual version (1 minute of effort)
- A solid, professional version (15 minutes of effort)
- An exceptional, polished version (1 hour of effort)
I'll decide which level matches my actual need."
```

---

## The Sage's Warning

### When Technique Becomes Trap

The advanced techniques are powerful. But power without wisdom leads to:

**Over-engineering**: Prompts so complex they confuse rather than guide.

**Technique obsession**: Focusing on the prompt more than the output.

**False precision**: Believing that the perfect prompt exists.

The master knows: a simple, clear prompt often outperforms a clever one. The techniques serve the outcome, not the other way around.

---

*"The ultimate technique is knowing when to set technique aside and simply speak."*
