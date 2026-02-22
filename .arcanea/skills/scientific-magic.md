---
skill_type: "foundation"
context_size: "3kb"
load_trigger: "magic_system_design"
created: "2026-01-06"
---

# Scientific Magic Foundations

This skill provides the **Physics Engine** for Arcanea's magic. Use this when designing spells, artifacts, or magic systems.

## The 3 Laws of Creative Motion (Newtonian Magic)
1.  **Creative Inertia**: A system at rest stays at rest. Initiating a spell requires a "Kick" (Activation Energy). Sustaining it is easier.
    *   *Code Translation*: `start_cost > sustain_cost`
2.  **Creative Force**: `Force = Resistance × Change`.
    *   Big magic (high Change) in a skeptical area (high Resistance) requires massive Force.
    *   *Code Translation*: `mana_required = reality_resistance * magnitude_of_effect`
3.  **Creative Exchange**: Every action has an equal and opposite reaction.
    *   You cannot create fire without cooling something else. You cannot heal without taking on the burden.
    *   *Code Translation*: `effect.consequence = -effect.magnitude`

## Thermodynamics of Magic
1.  **Conservation**: Mana is never lost, only transformed. Failed spells don't vanish; the energy becomes heat/chaos (Backlash).
2.  **Entropy**: Complex spells degrade over time without maintenance. Enchantments fade.
    *   *Code Translation*: `enchantment_strength = initial_strength * (decay_rate ^ time)`

## The 5 Elements (Physics Aspect)
1.  **Fire**: Energy, Plasma, Transformation. (High Kinetic)
2.  **Water**: Flow, cohesion, memory. (Liquid State)
3.  **Earth**: Structure, stability, lattice. (Solid State)
4.  **Wind**: Gas, pressure, freedom. (Gaseous State)
5.  **Void**: Potential, vacuum, gravity. (Null State)

## Usage Instructions
When a user asks to "Design a Spell":
1.  Identify the **Effect** (Change).
2.  Identify the **Resistance** (Target/Environment).
3.  Calculate the **Cost** (Force).
4.  Determine the **Consequence** (Exchange/Backlash).
