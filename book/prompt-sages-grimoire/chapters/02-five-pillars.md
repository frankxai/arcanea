# Chapter 2: The Five Pillars of APL

> *"The Arcanean Prompt Language rests on five pillars. Master one, and your prompts improve. Master all five, and you become a Sage."*

---

## The Five Pillars

The Arcanean Prompt Language (APL) is built on five fundamental principles. Each pillar addresses a different aspect of effective prompting:

```
╔═══════════════════════════════════════════════════════════════════╗
║                    THE FIVE PILLARS OF APL                         ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                    ║
║   I.   IDENTITY    │ Who is the AI in this context?              ║
║   II.  CONTEXT     │ What does the AI need to know?              ║
║   III. CONSTRAINT  │ What limits focus the output?               ║
║   IV.  EXEMPLAR    │ What does "good" look like?                 ║
║   V.   ITERATION   │ How will you refine?                        ║
║                                                                    ║
╚═══════════════════════════════════════════════════════════════════╝
```

Each pillar is a question. Answer all five, and you have a complete prompt.

---

## Pillar I: Identity

**Question: Who is the AI in this context?**

Identity is the first pillar because it shapes everything that follows. When you define an identity, you're not just giving the AI a role—you're activating a constellation of associated knowledge, behaviors, and quality standards.

### The Power of Identity

```
WITHOUT IDENTITY:
"Write a poem about loss."
→ Generic, could be written by anyone

WITH IDENTITY:
"You are Mary Oliver, writing a new poem about loss for a collection
that will be your last. Write in your distinctive style—precise
observations of nature that reveal emotional truth."
→ Specific voice, specific quality standard, specific approach
```

### Identity Types

**Expert Identity:**
```
You are a senior software architect with 20 years of experience
in distributed systems...
```

**Author Identity:**
```
You are Ursula K. Le Guin, writing a new story that explores
the theme of...
```

**Character Identity:**
```
You are a cynical medieval scribe forced to document the deeds
of a king you secretly despise...
```

**Hybrid Identity:**
```
You are a neuroscientist who writes like Oliver Sacks—combining
rigorous science with narrative flair...
```

### Identity Activates Knowledge

When you say "You are a senior software architect," you're not just assigning a role. You're activating:
- Technical vocabulary
- Best practices awareness
- Trade-off thinking
- System-level perspective
- Professional communication style

The identity becomes a filter through which all responses pass.

---

## Pillar II: Context

**Question: What does the AI need to know?**

Context is the background information that shapes interpretation. Without context, the AI must guess—and guessing leads to generic responses.

### The Context Hierarchy

```
GLOBAL CONTEXT: The big picture
"We're building a children's educational app focused on astronomy."

LOCAL CONTEXT: The immediate situation
"The user just asked about black holes and seemed confused by
the previous explanation."

PERSONAL CONTEXT: The specific user/audience
"The user is 8 years old and loves dinosaurs."
```

### Providing Context

**Project Context:**
```
# Project Context
This is for a meditation app targeting stressed professionals.
The tone should be calming but not condescending.
Users typically have 5-10 minutes for each session.
```

**Conversation Context:**
```
# Conversation So Far
User: "I'm trying to learn Python but I keep getting stuck."
AI: "What specific areas are causing trouble?"
User: "Loops. I don't understand when to use for vs while."

# Current Task
Explain the difference with a memorable analogy.
```

**Domain Context:**
```
# Domain Knowledge
In this world, magic is powered by emotional energy.
Positive emotions create light-based magic.
Negative emotions create shadow magic.
Neither is inherently good or evil.
```

---

## Pillar III: Constraint

**Question: What limits focus the output?**

Constraints are not restrictions—they are **liberation devices**. By limiting options, you force creativity within bounds, and bounded creativity is more creative than unbounded flailing.

### Types of Constraints

**Format Constraints:**
```
- Maximum 500 words
- Three paragraphs exactly
- Bullet points only
- Haiku structure
```

**Style Constraints:**
```
- No adverbs
- Present tense only
- Sentences under 15 words
- Avoid passive voice
```

**Content Constraints:**
```
- Must include a twist ending
- Must mention water
- Cannot use the word "beautiful"
- Must begin and end with the same word
```

**Audience Constraints:**
```
- Understandable by a 10-year-old
- No jargon
- Assumes no prior knowledge
- Written for experts who know the basics
```

### The Constraint Paradox

```
More constraints = MORE creativity (not less)

"Write a story" → Infinite options → Paralysis → Generic choice

"Write a 100-word story about loss, told entirely through
dialogue between strangers on a train, where neither character
ever names what was lost" → Specific challenge → Creative solution
```

---

## Pillar IV: Exemplar

**Question: What does "good" look like?**

Exemplars are examples of the output you want. They're the most powerful teaching tool in prompting because they show rather than tell.

### Using Exemplars

**Style Exemplar:**
```
# Style to Match
Write in this style:
"The old man stood at the window. Rain fell. Memory, too,
fell—slower, heavier. He had stood at this window forty years
ago, watching the same rain. Different man. Same questions."

Now write a paragraph about a woman returning to her childhood home.
```

**Format Exemplar:**
```
# Output Format
Present information like this:

**Concept**: [Name]
**Definition**: [One sentence]
**Example**: [Concrete illustration]
**Common Mistake**: [What people get wrong]

Now explain "recursion" in this format.
```

**Quality Exemplar:**
```
# Quality Standard
This is the level of analysis I expect:

[Include a passage of high-quality analysis]

Now analyze [your topic] at this level.
```

### Exemplar Selection

Choose exemplars that demonstrate:
- The style you want
- The depth you want
- The format you want
- The quality threshold

---

## Pillar V: Iteration

**Question: How will you refine?**

Iteration is the acknowledgment that first attempts are drafts. The Prompt Sage expects to refine and builds refinement into the process.

### The Iteration Mindset

```
AMATEUR:
Write prompt → Accept output → Done

SAGE:
Write prompt → Evaluate output → Diagnose gap →
Refine prompt → Repeat until excellent
```

### Iteration Techniques

**Diagnose Before Fixing:**
```
What's wrong with this output?
- Too generic? (Need more constraints)
- Wrong tone? (Need better identity/exemplar)
- Missing context? (Need more context)
- Wrong format? (Need format constraints)
```

**Incremental Refinement:**
```
Prompt v1 → Output lacks depth
Prompt v2 → Add "explore underlying causes" → Better depth
Prompt v3 → Add word limit → Focused depth
Prompt v4 → Add exemplar → Right style
```

**The Feedback Loop:**
```
"That's good, but I want you to:
- Go deeper on the emotional impact
- Remove the second paragraph entirely
- Make the ending more ambiguous"
```

---

## The Pillars in Practice

Here's a complete prompt using all five pillars:

```markdown
# Identity (Pillar I)
You are a Pulitzer-winning journalist known for making complex
technical topics accessible to general audiences without dumbing
them down.

# Context (Pillar II)
You're writing an article about quantum computing for a magazine
with educated but non-technical readers. They're curious,
skeptical, and busy—they need to understand why this matters
to their lives.

# Constraints (Pillar III)
- 800 words maximum
- No jargon without immediate explanation
- Must include at least one concrete example from everyday life
- Must acknowledge current limitations honestly
- Opening sentence must hook a skeptical reader

# Exemplar (Pillar IV)
Write in the style of this opening:
"Nobody expected the revolution to start in a climate-controlled
basement in California, surrounded by equipment that looks less
like the future than like the world's most expensive refrigerator."

# Task
Write the first section of this article, explaining what quantum
computing is and why it matters.

# Iteration Note (Pillar V)
After the first draft, I'll ask you to revise the ending to be
more forward-looking.
```

---

## Pillar Diagnostics

When output disappoints, use this diagnostic:

```
□ Is the Identity clear and appropriate?
  → If not, the voice and approach will be wrong

□ Is the Context sufficient?
  → If not, the AI is guessing at background

□ Are the Constraints specific enough?
  → If not, the output will be unfocused

□ Is there an Exemplar to learn from?
  → If not, quality and style are undefined

□ Have you planned for Iteration?
  → If not, you're hoping for luck
```

---

## Exercise: The Five-Pillar Prompt

Take a simple task: "Explain photosynthesis."

Now build a complete prompt using all five pillars:

1. **Identity**: Who is explaining?
2. **Context**: To whom? In what situation?
3. **Constraints**: What limits will focus it?
4. **Exemplar**: What style should it match?
5. **Iteration**: What will you refine?

Write the full prompt. Run it. Compare to the simple version.

---

## Key Takeaways

```
□ Identity shapes voice, approach, and quality
□ Context prevents guessing
□ Constraints liberate through limitation
□ Exemplars teach through demonstration
□ Iteration expects and plans for refinement
□ All five pillars together = complete prompt
```

---

*"A prompt built on all five pillars stands firm. A prompt missing any pillar will wobble."*

---

**Next Chapter: [The Prompt Sage's Mindset](03-mindset.md)**
