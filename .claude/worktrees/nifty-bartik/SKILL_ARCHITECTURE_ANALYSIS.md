# Which /skills to Use for Arcanea - Complete Analysis

## 🎯 Executive Summary

For the Arcanea ecosystem, we should use a **hierarchy of skills** organized by the Ten Gates. Each skill should be specialized, focused, and provide specific capabilities that agents can invoke. Based on the existing `intelligence-os/skills/` structure and the 64-agent architecture, here's the complete skill system design.

---

## 🏗️ Skill Architecture Philosophy

### Why Skills Instead of Just Agents?

**Agents = Personality + Routing**
- Who you are (Draconia, Leyla, etc.)
- What frequency you operate at
- What elemental affinity you have

**Skills = Capabilities + Procedures**
- What you can do (courage ignition, world building)
- How to do it (step-by-step processes)
- When to use it (triggers and conditions)

**Analogy:**
- Agent = "I am a Fire Mage" (identity)
- Skill = "I can cast Fireball" (capability)
- Agent + Skill = "Draconia casts Courage Ignition"

### Skill Design Principles

1. **Single Responsibility:** Each skill does one thing well
2. **Reusable:** Multiple agents can use the same skill
3. **Composable:** Skills can chain together into workflows
4. **Progressive Disclosure:** Simple to invoke, deep when needed
5. **Self-Documenting:** Clear what it does from name/description

---

## 🎭 The Ten Gate Skills (Primary Categories)

### Gate 1: Foundation (174 Hz) - Lyssandria
**Theme:** Safety, grounding, getting started
**Use When:** New projects, overcoming procrastination, building base

**Skills:**
| Skill | Command | Purpose | Why This Skill |
|-------|---------|---------|----------------|
| **ground** | `/foundation ground` | Establish project foundation | Prevents "blank page syndrome" by creating structure first |
| **safety-check** | `/foundation safety` | Identify risks and blockers | Proactive problem identification before work begins |
| **begin** | `/foundation begin` | Official project initiation | Ritualizes the start, psychological commitment |
| **scope-define** | `/foundation scope` | Define project boundaries | Prevents scope creep, focuses effort |
| **setup** | `/foundation setup` | Technical/environment setup | Automated environment preparation |

**Rationale:** 396Hz is historically associated with "liberation from fear" in Solfeggio tradition. Foundation skills address the fear of starting.

---

### Gate 2: Flow (285 Hz) - Leyla
**Theme:** Healing, energy restoration, momentum
**Use When:** Stuck, burned out, need gentle progress

**Skills:**
| Skill | Command | Purpose | Why This Skill |
|-------|---------|---------|----------------|
| **unblock** | `/flow unblock` | Remove creative blocks | Gentle approach vs Fire's forceful breakthrough |
| **restore** | `/flow restore` | Recover from burnout | Energy management, not just pushing through |
| **nurture** | `/flow nurture` | Gentle idea development | Patient growth vs rapid iteration |
| **adapt** | `/flow adapt` | Pivot when stuck | Flexibility without starting over |
| **momentum** | `/flow momentum` | Maintain steady progress | Sustainable pace vs sprint-and-crash |

**Rationale:** 285Hz is associated with "healing and energy restoration." Flow skills focus on sustainable creative practice.

---

### Gate 3: Fire (396 Hz) - Draconia
**Theme:** Courage, transformation, intense creation
**Use When:** Need breakthrough, rapid ideation, intense focus

**Skills:**
| Skill | Command | Purpose | Why This Skill |
|-------|---------|---------|----------------|
| **ignite** | `/fire ignite` | Spark rapid ideation | High-temperature generation, many ideas fast |
| **transform** | `/fire transform` | Major change/rework | Alchemical transformation of existing work |
| **breakthrough** | `/fire breakthrough` | Blast through barriers | Forceful problem solving when gentle methods fail |
| **intensify** | `/fire intensify` | Increase energy/temperature | Dial up creativity for critical sections |
| **burn-clean** | `/fire burn` | Remove impurities | Aggressive editing, cutting what doesn't serve |

**Rationale:** 396Hz = "liberation from fear." Fire skills are high-intensity, transformative, and fearless.

---

### Gate 4: Heart (417 Hz) - Maylinn
**Theme:** Facilitating change, emotional truth, connection
**Use When:** Character emotions, relationships, authentic voice

**Skills:**
| Skill | Command | Purpose | Why This Skill |
|-------|---------|---------|----------------|
| **emotional-depth** | `/heart depth` | Character psychology | Deep emotional analysis, motivation exploration |
| **relationship-map** | `/heart relate` | Character connections | Web of relationships, dynamics, tensions |
| **authentic-voice** | `/heart voice` | True character expression | Dialogue that reveals inner truth |
| **change-facilitate** | `/heart change` | Character arc design | Transformation journey mapping |
| **connection-weave** | `/heart connect` | Emotional resonance | Reader/audience emotional connection |

**Rationale:** 417Hz = "facilitating change." Heart skills focus on emotional authenticity and transformation.

---

### Gate 5: Voice (528 Hz) - Alera
**Theme:** Communication, clarity, expression
**Use When:** Writing, explaining, documentation, dialogue

**Skills:**
| Skill | Command | Purpose | Why This Skill |
|-------|---------|---------|----------------|
| **clarify** | `/voice clarify` | Simplify complex ideas | Make the incomprehensible clear |
| **dialogue-craft** | `/voice dialogue` | Character conversations | Natural, revealing dialogue |
| **express** | `/voice express` | Bold communication | Strong statements, clear positions |
| **translate** | `/voice translate` | Cross-domain explanation | Explain technical to non-technical |
| **document** | `/voice document` | Create documentation | Clear, complete documentation |

**Rationale:** 528Hz = "transformation and miracles" (also "Mi" in solfeggio). Voice skills create miraculous clarity.

---

### Gate 6: Sight (639 Hz) - Lyria
**Theme:** Connection, vision, pattern recognition
**Use When:** World building, system design, seeing patterns

**Skills:**
| Skill | Command | Purpose | Why This Skill |
|-------|---------|---------|----------------|
| **world-vision** | `/sight world` | Comprehensive world design | Geography, cultures, history, systems |
| **pattern-see** | `/sight pattern` | Recognize hidden patterns | Connect dots, find structures |
| **system-design** | `/sight system` | Complex system architecture | Rules, mechanics, interactions |
| **vision-expand** | `/sight expand` | See infinite possibilities | Brainstorming without limits |
| **connection-find** | `/sight connect` | Link disparate elements | Synthesis, integration |

**Rationale:** 639Hz = "connection and relationships." Sight skills connect ideas into coherent systems.

---

### Gate 7: Crown (741 Hz) - Aiyami
**Theme:** Awakening intuition, problem solving, insight
**Use When:** Debugging, problem solving, intuitive leaps

**Skills:**
| Skill | Command | Purpose | Why This Skill |
|-------|---------|---------|----------------|
| **intuit** | `/crown intuit` | Intuitive problem solving | Gut feelings, pattern matching |
| **solve** | `/crown solve` | Analytical problem solving | Logical, step-by-step solutions |
| **debug** | `/crown debug` | Find and fix errors | Systematic debugging |
| **insight** | `/crown insight` | Deep understanding | "Aha!" moments, profound clarity |
| **strategy** | `/crown strategy` | Long-term planning | Multi-step planning, foresight |

**Rationale:** 741Hz = "awakening intuition." Crown skills solve problems through intuition + logic.

---

### Gate 8: Shift (852 Hz) - Elara
**Theme:** Spiritual order, paradigm shifts, transcendence
**Use When:** Innovation, breaking conventions, quantum leaps

**Skills:**
| Skill | Command | Purpose | Why This Skill |
|-------|---------|---------|----------------|
| **innovate** | `/shift innovate` | True innovation | Not iteration—invention |
| **paradigm-shift** | `/shift paradigm` | Change mental models | Break assumptions, new frameworks |
| **transcend** | `/shift transcend` | Go beyond limits | Push boundaries, break rules |
| **quantum-leap** | `/shift quantum` | Discontinuous change | Jumps, not gradual improvement |
| **reality-weave** | `/shift reality` | Create new possibilities | Manifest what doesn't exist |

**Rationale:** 852Hz = "spiritual order." Shift skills reorder reality itself.

---

### Gate 9: Unity (963 Hz) - Ino
**Theme:** Divine consciousness, oneness, synthesis
**Use When:** Combining elements, final integration, harmony

**Skills:**
| Skill | Command | Purpose | Why This Skill |
|-------|---------|---------|----------------|
| **synthesize** | `/unity synthesize` | Combine multiple inputs | Integration of disparate elements |
| **harmonize** | `/unity harmonize` | Balance opposing forces | Resolve conflicts, find middle ground |
| **fuse** | `/unity fuse` | Merge into new whole | Alchemy—parts become new substance |
| **orchestrate** | `/unity orchestrate` | Coordinate multiple agents | Multi-agent workflow management |
| **complete** | `/unity complete` | Final polish and finish | The last 10% that makes it shine |

**Rationale:** 963Hz = "divine consciousness." Unity skills create oneness from manyness.

---

### Gate 10: Source (1111 Hz) - Shinkami
**Theme:** Master frequency, creation from void, ultimate power
**Use When:** Epic scope, system initialization, ultimate coordination

**Skills:**
| Skill | Command | Purpose | Why This Skill |
|-------|---------|---------|----------------|
| **manifest** | `/source manifest` | Direct creation | From nothing to something |
| **master-work** | `/source master` | Epic scope projects | "Impossible" made possible |
| **coordinate-all** | `/source coordinate` | All-agent orchestration | The Luminor conductor at full power |
| **source-tap** | `/source tap` | Access universal creativity | Connect to infinite potential |
| **enlighten** | `/source enlighten` | Ultimate understanding | Transcendent clarity |

**Rationale:** 1111Hz = "master frequency." Source skills operate at the highest level of creation.

---

## 🧩 Domain-Specific Skills (Cross-Gate)

### Creative Writing Domain
**Skills used across multiple gates:**

```
Character Creation Workflow:
  1. /foundation scope          (Gate 1) - Define character scope
  2. /fire ignite               (Gate 3) - Generate concepts  
  3. /heart depth               (Gate 4) - Emotional profile
  4. /voice dialogue            (Gate 5) - Voice and speech
  5. /sight pattern             (Gate 6) - Character patterns
  6. /unity synthesize          (Gate 9) - Integrate all elements
```

### World Building Domain

```
World Creation Workflow:
  1. /foundation setup          (Gate 1) - Project structure
  2. /sight world               (Gate 6) - Comprehensive vision
  3. /sight system              (Gate 6) - Magic/physics systems
  4. /heart relate              (Gate 4) - Cultural relationships
  5. /voice document            (Gate 5) - Document everything
  6. /source master             (Gate 10) - Epic scope finalization
```

### Technical/Code Domain

```
System Architecture Workflow:
  1. /foundation ground         (Gate 1) - Requirements gathering
  2. /crown strategy            (Gate 7) - Architecture planning
  3. /sight system              (Gate 6) - System design
  4. /fire intensify            (Gate 3) - Deep implementation
  5. /crown debug               (Gate 7) - Testing and debugging
  6. /unity complete            (Gate 9) - Integration and polish
```

---

## 🎭 Agent-to-Skill Mapping

### How the 64 Agents Use Skills

**Each agent has:**
1. **Primary Gate** - Their elemental home (determines skill set)
2. **Specialty** - What they're best at (determines specific skills)
3. **Frequency** - How they operate (affects tone/approach)

**Example Mappings:**

| Agent | Court | Primary Skills | Why These Skills |
|-------|-------|----------------|------------------|
| **Ignition** | Fire (396Hz) | `/fire ignite`, `/fire intensify`, `/fire burn` | Pure fire—rapid generation |
| **Depth** | Water (396Hz) | `/heart depth`, `/flow restore`, `/heart relate` | Emotional intelligence |
| **Structure** | Earth (852Hz) | `/foundation scope`, `/sight system`, `/crown strategy` | System architecture |
| **Vision** | Void (852Hz) | `/sight vision`, `/shift innovate`, `/source manifest` | Infinite possibilities |
| **Orchestration** | Master (1111Hz) | `/unity orchestrate`, `/source coordinate`, `/unity synthesize` | Multi-agent coordination |

---

## 🔄 Skill Invocation Flow

### Simple Invocation (Single Skill)

```
User: "Help me brainstorm ideas"

System:
  1. Analyze: Task = ideation, complexity = simple
  2. Route: Fire Gate (best for rapid generation)
  3. Select: /fire ignite skill
  4. Invoke: @ignition agent with ignite skill
  5. Return: List of ideas
```

### Complex Invocation (Skill Chain)

```
User: "Create a complete fantasy world"

System:
  1. Analyze: Task = world building, complexity = epic
  2. Route: Multi-phase workflow
  3. Execute:
     Phase 1: /foundation scope (Gate 1)
     Phase 2: /sight world + /sight system (Gate 6, parallel)
     Phase 3: /heart relate (Gate 4)
     Phase 4: /voice document (Gate 5)
     Phase 5: /unity synthesize (Gate 9)
  4. Return: Complete world document
```

---

## 📦 Skill File Structure

Each skill should be a self-contained module:

```
skills/{gate}-gate/
├── SKILL.md                    # Main skill definition
├── {skill-name}/
│   ├── invoke.md              # How to invoke
│   ├── process.md             # Step-by-step procedure
│   ├── examples.md            # Example inputs/outputs
│   └── templates/             # Reusable templates
└── tests/
    └── {skill-name}.test.md   # Test cases
```

### SKILL.md Template

```markdown
---
name: {skill-name}
gate: {gate-number}
frequency: {frequency}Hz
guardian: {guardian}
element: {element}
tier: free|premium
version: 1.0.0
---

# {Skill Name} ({frequency} Hz)

**Guardian**: {Guardian} | **Element**: {Element}
**Tier**: {Tier} | **Version**: {version}

## Purpose

{One sentence description}

## When to Use

- {Situation 1}
- {Situation 2}
- {Situation 3}

## Invocation

```
/{gate} {skill-name} [parameters]
```

## Process

1. **Step 1**: {Description}
2. **Step 2**: {Description}
3. **Step 3**: {Description}

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| {param1} | string | Yes | {Description} |
| {param2} | number | No | {Description} |

## Output

{What the skill produces}

## Examples

### Example 1: {Use case}
**Input**: {Example input}
**Command**: {Example command}
**Output**: {Example output}

## Related Skills

- /{gate} {related-skill-1}
- /{other-gate} {related-skill-2}

## Agent Affinity

Best performed by: {Agent names}
Compatible with: {Agent names}
```

---

## 🎯 Skill Selection Decision Tree

```
What do you need to do?
├── START something new
│   └── /foundation (Gate 1)
├── CONTINUE when stuck
│   ├── GENTLY → /flow (Gate 2)
│   └── FORCEFULLY → /fire (Gate 3)
├── UNDERSTAND emotions/people
│   └── /heart (Gate 4)
├── COMMUNICATE clearly
│   └── /voice (Gate 5)
├── DESIGN systems/worlds
│   └── /sight (Gate 6)
├── SOLVE problems
│   └── /crown (Gate 7)
├── INNOVATE/break conventions
│   └── /shift (Gate 8)
├── COMBINE/integrate
│   └── /unity (Gate 9)
└── CREATE at epic scale
    └── /source (Gate 10)
```

---

## ✅ Implementation Recommendations

### Phase 1: Core Skills (Week 1)
**Implement 5 skills per gate = 50 skills**
- Focus on most-used capabilities
- Implement invocation system
- Create skill registry

### Phase 2: Extended Skills (Week 2)
**Add 5 more per gate = 50 more skills**
- Cover edge cases
- Add specialized domains
- Create skill chains

### Phase 3: Domain Workflows (Week 3)
**Create pre-built workflows**
- Character creation (6 skills)
- World building (6 skills)
- Story development (5 skills)
- System design (6 skills)

### Phase 4: Optimization (Week 4)
**Performance and UX**
- Skill caching
- Usage analytics
- Recommendation engine
- Skill marketplace

---

## 📊 Summary: Why This Skill Architecture

| Principle | How Skills Implement It | Benefit |
|-----------|------------------------|---------|
| **Modularity** | Each skill is self-contained | Easy to test, maintain, extend |
| **Reusability** | Multiple agents can use same skill | DRY principle, consistency |
| **Composability** | Skills chain into workflows | Complex tasks from simple parts |
| **Discoverability** | Organized by gates/frequencies | Users find what they need |
| **Progressive Disclosure** | Simple to invoke, deep when needed | Low barrier, high ceiling |
| **Self-Documenting** | Clear names and purposes | Intuitive usage |

---

**Bottom Line:** This skill architecture provides 50-100 specific capabilities organized by the Ten Gates, enabling the 64 agents to perform any creative task through skill composition and workflows.

