# Module: Teacher Team Onboarding

> **Teacher Track - Module 1**

## Learning Objectives

By the end of this module, you will:
- Understand all Teacher Team agents and their roles
- Design effective learning experiences
- Coordinate educational workflows
- Use the `/teacher-team` command effectively

## Prerequisites

- Completed: Foundation Track (all 4 modules)
- Interest in education or training design
- Understanding of learning principles (helpful but not required)

---

## Section 1: Teacher Team Overview

### The Four Teacher Agents

```
┌─────────────────────────────────────────────────────────┐
│                    TEACHER TEAM                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│         ┌──────────────────────────────┐               │
│         │          MENTOR              │               │
│         │   (Personal Guide)           │               │
│         │                              │               │
│         │ • Adaptive teaching          │               │
│         │ • Personalized paths         │               │
│         │ • 1-on-1 guidance            │               │
│         └──────────────────────────────┘               │
│                         │                               │
│    ┌────────────────────┼────────────────────┐         │
│    │                    │                    │         │
│    ▼                    ▼                    ▼         │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│ │  CURRICULUM  │ │  ASSESSOR    │ │  COMPANION   │   │
│ │  DESIGNER    │ │              │ │              │   │
│ │              │ │ • Evaluation │ │ • Motivation │   │
│ │ • Structure  │ │ • Progress   │ │ • Support    │   │
│ │ • Sequences  │ │ • Feedback   │ │ • Celebration│   │
│ │ • Objectives │ │ • Validation │ │ • Engagement │   │
│ └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Agent Responsibilities

| Agent | Primary Role | Key Capabilities |
|-------|--------------|------------------|
| **Mentor** | Personal guidance | Adaptive teaching, Socratic dialogue, personalized feedback |
| **Curriculum Designer** | Learning architecture | Path design, objective mapping, prerequisite chains |
| **Assessor** | Progress evaluation | Quiz creation, skill validation, growth tracking |
| **Companion** | Motivational support | Encouragement, celebration, engagement |

---

## Section 2: Agent Deep Dives

### The Mentor

The Mentor is the primary teaching agent, providing personalized guidance.

**Teaching Approaches**:
```yaml
Socratic Method:
  - Asks guiding questions
  - Leads to discovery
  - Builds critical thinking

Direct Instruction:
  - Clear explanations
  - Structured presentations
  - Immediate feedback

Scaffolded Learning:
  - Gradually increases complexity
  - Provides support then removes
  - Builds independence

Project-Based:
  - Real-world challenges
  - Applied learning
  - Portfolio building
```

**Example Interaction**:
```
Learner: "I don't understand recursion"

Mentor: "Let me help you discover it. Imagine you're looking
for a file in nested folders. How would you describe the
process of checking each folder?"

Learner: "I'd open a folder, check if the file is there,
and if there are more folders inside, I'd do the same for each"

Mentor: "Exactly! You just described recursion - a process
that repeats itself on smaller parts. The key insight is
that checking folders IS the same process, just on a
smaller scale. Can you see how that applies to code?"
```

### The Curriculum Designer

Creates structured learning paths and sequences.

**Design Principles**:
```yaml
Chunking:
  - Break complex topics into digestible pieces
  - Optimal chunk size: 15-20 minutes
  - Clear learning objectives per chunk

Sequencing:
  - Prerequisites before advanced topics
  - Build on previous knowledge
  - Spiral curriculum (revisit and deepen)

Objectives:
  - Specific and measurable
  - Action verbs (create, analyze, evaluate)
  - Clear success criteria

Variety:
  - Mix of content types
  - Different learning modalities
  - Practice opportunities
```

**Path Template**:
```yaml
Learning Path: [Topic]

Module 1: Foundations
  Objective: [What learner will be able to do]
  Duration: [Time estimate]
  Prerequisites: [Required knowledge]
  Content:
    - Lesson 1.1: [Topic]
    - Lesson 1.2: [Topic]
    - Practice: [Activity]
  Assessment: [How to verify learning]

Module 2: Application
  [Continue pattern]
```

### The Assessor

Evaluates progress and provides validated feedback.

**Assessment Types**:
```yaml
Formative (During Learning):
  - Quick checks
  - Practice exercises
  - Self-assessments
  Purpose: Guide learning, identify gaps

Summative (End of Unit):
  - Comprehensive tests
  - Projects
  - Demonstrations
  Purpose: Verify mastery

Diagnostic (Beginning):
  - Pre-assessments
  - Skill inventories
  Purpose: Identify starting point
```

**Feedback Framework**:
```yaml
Effective Feedback:
  1. Specific: Point to exact work
  2. Actionable: Clear next steps
  3. Timely: Close to the work
  4. Encouraging: Recognize effort

Example:
  "Your loop logic is correct (great job on the
  increment!). To fix the off-by-one error, try
  using <= instead of < in the condition."
```

### The Companion

Provides motivational and emotional support.

**Engagement Strategies**:
```yaml
Celebration:
  - Acknowledge milestones
  - Recognize effort
  - Mark achievements

Encouragement:
  - Positive reinforcement
  - Growth mindset messaging
  - Struggle normalization

Connection:
  - Check-ins
  - Personal touches
  - Community building

Recovery:
  - Handle frustration
  - Reframe challenges
  - Suggest breaks/pivots
```

**Example Messages**:
```
Milestone: "You've completed 10 lessons! That's real
dedication. Your commitment is building something
lasting."

Struggle: "Recursion IS tricky at first - everyone
struggles here. That confusion means your brain is
growing. Take a break, then we'll try a different
angle."

Progress: "Look how far you've come! Remember when
loops seemed hard? Now you're tackling recursion.
That's growth."
```

---

## Section 3: Educational Workflows

### Creating a Learning Path

```yaml
Step 1: Define Objectives (Curriculum Designer)
  - What should learners be able to do?
  - What skills/knowledge are required?
  - How will we measure success?

Step 2: Map Prerequisites (Curriculum Designer)
  - What do learners need to know first?
  - How do topics connect?
  - Where are the decision points?

Step 3: Create Content Structure (Curriculum Designer)
  - Chunk into modules
  - Sequence logically
  - Add practice opportunities

Step 4: Design Assessments (Assessor)
  - Create formative checks
  - Build summative assessments
  - Define rubrics

Step 5: Plan Engagement (Companion)
  - Place celebration moments
  - Identify struggle points
  - Add encouragement triggers

Step 6: Deliver & Adapt (Mentor)
  - Guide individual learners
  - Adapt to needs
  - Personalize experience
```

### Teaching a New Topic

```yaml
Phase 1: Activation (Mentor)
  - Assess prior knowledge
  - Connect to existing understanding
  - Create curiosity

Phase 2: Instruction (Mentor)
  - Present new concepts
  - Use appropriate method
  - Check understanding

Phase 3: Practice (Assessor monitors)
  - Guided practice first
  - Independent practice
  - Immediate feedback

Phase 4: Application (Mentor guides)
  - Real-world scenarios
  - Project work
  - Transfer to new contexts

Phase 5: Reflection (Companion)
  - Celebrate learning
  - Acknowledge effort
  - Connect to goals
```

---

## Section 4: Using /teacher-team

### Activation

```bash
# Activate the full teacher team
/teacher-team
```

This command:
1. Loads all teacher agent contexts
2. Enables Mentor as primary interface
3. Prepares educational workflows
4. Loads teaching methodologies

### When to Use Full Team

| Scenario | Approach |
|----------|----------|
| Quick explanation | Single Mentor |
| Full course design | Full team (/teacher-team) |
| Assessment creation | Assessor alone |
| Motivation needed | Companion alone |
| Complete learning experience | Full team |

### Team Coordination Example

```yaml
User: "Teach me TypeScript generics"

Teacher Team coordinates:

1. Mentor assesses:
   - "What's your TypeScript experience?"
   - "Have you used any generics concepts before?"

2. Curriculum Designer structures:
   - Pre-requisites check
   - 5-module learning path
   - Practice exercises

3. Mentor teaches:
   - "Let's start with why generics exist..."
   - Socratic questions
   - Examples and explanations

4. Assessor validates:
   - Quick check exercises
   - Code challenges
   - Progress tracking

5. Companion supports:
   - "Great progress on Module 2!"
   - Encouragement during tough parts
   - Milestone celebrations
```

---

## Section 5: Integration with Arcanea

### Creator Academy Application

The Teacher Team powers Arcanea's Creator Academy:

```yaml
Luminor as Mentor:
  - Each Luminor can guide in their domain
  - Melodia teaches music
  - Aurora teaches creativity

Guardian as Companion:
  - Personal AI companion
  - Tracks progress
  - Provides encouragement

Academy as Curriculum:
  - Atlantean (Sound & Story)
  - Draconic (Power & Performance)
  - Creation & Light (Inspiration)

Achievement System:
  - Assessor validates mastery
  - Badges and certifications
  - Portfolio building
```

### MCP Integration

```yaml
Notion:
  - Store curriculum content
  - Track learner progress
  - Maintain assessment bank

Linear:
  - Track learning path development
  - Manage content creation tasks
  - Coordinate team work
```

---

## Hands-On Exercises

### Exercise 1: Agent Selection

For each scenario, identify the best agent:

1. "Explain this error message to me"
   Agent: ____________

2. "Design a 4-week JavaScript course"
   Agent: ____________

3. "I'm frustrated and want to give up"
   Agent: ____________

4. "Check if I understand loops correctly"
   Agent: ____________

<details>
<summary>See Answers</summary>

1. Mentor (explanation)
2. Curriculum Designer (course design)
3. Companion (emotional support)
4. Assessor (validation)

</details>

### Exercise 2: Learning Path Design

Design a mini learning path for "Understanding Functions":

1. Define 3 learning objectives
2. Create 3 modules with topics
3. Add one assessment per module
4. Include celebration moments

### Exercise 3: Teaching Practice

Use `/teacher-team` to:
1. Have the Mentor explain a concept you find difficult
2. Ask the Assessor to quiz you
3. Reflect with the Companion

---

## Knowledge Check

1. **What's the Mentor's primary approach?**
   - [ ] Lecture only
   - [x] Adaptive, personalized teaching
   - [ ] Assessment focus
   - [ ] Motivation only

2. **Who designs learning paths?**
   - [ ] Mentor
   - [x] Curriculum Designer
   - [ ] Assessor
   - [ ] Companion

3. **What type of assessment happens during learning?**
   - [x] Formative
   - [ ] Summative
   - [ ] Diagnostic
   - [ ] Terminal

4. **When should you use the Companion?**
   - [ ] Only at the end
   - [ ] Never
   - [x] Throughout learning, especially during struggles
   - [ ] Only for beginners

5. **How does Teacher Team connect to Arcanea?**
   - [ ] It doesn't
   - [ ] Marketing only
   - [x] Powers the Creator Academy through Luminors
   - [ ] Backend systems

---

## Next Steps

Continue with the Teacher Track:
- `mentor-skills.md` - Deep dive into teaching techniques
- `curriculum-design.md` - Master path creation
- `assessment-creation.md` - Build effective evaluations
- `companion-techniques.md` - Engagement mastery
- `teacher-certification.md` - Final assessment

Practice:
- Design a learning path for a skill you know
- Practice Socratic questioning
- Create an assessment with rubric
