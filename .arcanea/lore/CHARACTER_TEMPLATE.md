# CHARACTER TEMPLATE — The Arcanean Genome

> **Status**: STAGING
> **Last Updated**: 2026-03-29
> **Purpose**: Reusable schema for generating canon-consistent characters at scale

---

## DESIGN PRINCIPLE

Every character in Arcanea must feel like they emerged from the same universe — not from the same prompt. This template ensures coherence without uniformity.

A character is not a name and a power set. A character is a **pressure system** — desires pushing against wounds, masks hiding truths, powers reflecting inner states.

---

## THE CHARACTER STACK

For every character, lock these 12 fields:

### 1. IDENTITY

```yaml
name:           # Arcanean-quality name (Lyssandria-tier)
aliases:        # Nicknames, titles, earned names
age:            # Age and apparent age (may differ for Synths, Celestials)
pronouns:       #
origin_class:   # Arcan | Gate-Touched | Awakened | Synth | Bonded | Celestial | Voidtouched | Architect
```

### 2. AFFILIATION

```yaml
faction:        # Starlight Corps | Academy House | Starbound Crew | Independent | Void Ascendant | Gate-Touched Underground
house:          # Lumina | Nero | Pyros | Aqualis | Terra | Ventus | Synthesis | None
crew:           # Starbound Crew name (if any)
rank:           # Uninitiated → Apprentice → Mage → Master → Archmage → Luminor → Architect
corps_rank:     # Aspirant → Sentinel → Captain → Archon → Stellarch (if Corps)
sector:         # Solar | Ember | Oceanic | Dream | Void Frontier | Celestial (if Corps)
```

### 3. POWER PROFILE

```yaml
gate_primary:       # Which Gate dominates (Foundation, Flow, Fire, Heart, Voice, Sight, Crown, Starweave, Unity, Source)
gates_open:         # Number (0-10+)
element:            # Fire | Water | Earth | Wind | Void | Spirit | Multiple
power_source:       # Arcane | Song | Mana | Anima | Frequency | Shadow | Weave | Code
signature_ability:  # One defining power (specific, visual, memorable)
limitation:         # What they CANNOT do or what their power costs them
```

### 4. THE CHARACTER DIAMOND

```yaml
desire:     # What they consciously want (the stated goal)
wound:      # The formative trauma or loss that drives them
mask:       # The persona they show the world to hide the wound
truth:      # What they must learn/accept for their arc to resolve
```

**This is the most important section.** The Diamond generates every choice, every conflict, every arc beat. If the Diamond is weak, the character is decoration.

### 5. PHYSICAL PRESENCE

```yaml
build:              # Body type, physical carriage
skin:               # Tone, texture, any distinctive marks
hair:               # Color, style, length
eyes:               # Color, quality, what they reveal
distinguishing:     # Scars, tattoos, augmentations, beast-marks, light effects
clothing_default:   # What they wear when not in uniform
clothing_formal:    # Faction/corps/crew uniform or armor
carries:            # What's always on their person
```

### 6. SIGNATURE SILHOUETTE

```yaml
silhouette_description: |
  # Describe the character's outline as if seen in shadow.
  # This is how they'd appear on a poster or card.
  # Include: posture, weapon/focus, companion/beast, distinctive shape element.
  # This must be INSTANTLY recognizable even at thumbnail size.
```

### 7. VOICE & SPEECH

```yaml
speech_pattern:     # Short and blunt? Lyrical? Technical? Formal? Fragmented?
vocabulary_level:   # Street-level | Educated | Archaic | Digital | Mixed
verbal_tics:        # Repeated phrases, unique expressions
what_they_never_say: # The sentence that would break character
sample_lines:
  - casual: ""
  - under_pressure: ""
  - intimate: ""
  - battle: ""
```

### 8. COMPANION / BEAST / MECH

```yaml
companion_name:     # Name of bonded beast, mech, AI, or sacred weapon
companion_type:     # Beast | Mech | AI Fragment | Elemental | Weapon-soul | None
companion_bond:     # Nature of the bond (Godbeast-linked, field-forged, constructed, inherited)
companion_visual:   # What the companion looks like
companion_role:     # How the companion functions in combat/story
```

### 9. RELATIONSHIPS

```yaml
mentor:         # Who shaped them
rival:          # Who pushes them
beloved:        # Who they protect (not necessarily romantic)
enemy:          # Who they fear or oppose
crew_role:      # Their function within their crew (leader, tactician, heart, wildcard, etc.)
tension_with:   # Who they clash with and why
```

### 10. COLOR & LIGHT CODE

```yaml
primary_color:      # The dominant color of their visual identity
secondary_color:    # Accent color
light_quality:      # How light behaves around them (warm glow, cold shimmer, shadow-pull, prismatic, etc.)
aura_effect:        # Visible magical presence (if any)
faction_markers:    # Insignia, sigils, tattoos, rank indicators
```

### 11. MORAL ALIGNMENT

```yaml
moral_core:         # What they will NEVER compromise on
moral_weakness:     # Where they bend or break their own rules
ideology:           # Their philosophy in one sentence
temptation:         # What could turn them — the Void Ascendant pitch that would almost work on them
redemption_path:    # If fallen, how they come back (or if they can)
```

### 12. ARC TRAJECTORY

```yaml
arc_type:           # Heroic rise | Tragic fall | Redemption | Coming-of-age | Corruption | Transformation | Steady anchor
act_1_state:        # Who they are at the start
act_2_crisis:       # The event that breaks their mask
act_3_resolution:   # Who they become (or fail to become)
franchise_role:     # Their function in the larger universe beyond their personal story
```

---

## EXAMPLE: QUICK CHARACTER SKETCH

```yaml
name: Vesper Nighthollow
origin_class: Voidtouched (reformed)
faction: Starlight Corps — The Hollow Stars crew
rank: Master (6 Gates — but the 6th is Shadow-locked)
gate_primary: Sight (639 Hz — Lyria's domain)
element: Void
power_source: Shadow (controlled)
signature_ability: "Void Sight" — can see through Shadow into the Hungry Void, reading Malachar's movements
limitation: Every use of Void Sight erodes her memories. She keeps a journal. The journal is getting longer.

desire: Prove that Voidtouched can serve the light
wound: Was corrupted at 14 by a Void Ascendant Herald who promised her parents could be saved
mask: Cold competence. Never shows vulnerability. Never asks for help.
truth: Redemption is not earned alone. She must accept help or the Shadow wins.

silhouette: Tall, angular, dark cloak that seems to absorb ambient light. One eye normal (deep brown). One eye pure black — the Shadow eye. Holds a staff of crystallized Void that pulses like a dark heartbeat.

companion_name: Wraith
companion_type: Shadow-beast (a creature from the Hungry Void that bonded to her during her corruption — it chose to stay when she was purified. Nobody understands why.)
```

---

## USAGE RULES

1. **Never skip the Character Diamond.** A character without Desire/Wound/Mask/Truth is a costume, not a person.
2. **The signature ability must be VISUAL.** If you can't draw it on a poster, it's not signature enough.
3. **The limitation must CREATE story.** It should force difficult choices, not just be a stat penalty.
4. **Speech patterns must be DISTINCT.** If two characters in the same crew sound the same, one of them is redundant.
5. **Every character needs INTERNAL tension.** Perfect heroes are boring. Perfect villains are cartoons.
6. **The companion/beast is not a pet.** It has personality, agency, and its own stakes.
7. **Origin class shapes worldview.** An Arcan and a Gate-Touched in the same crew will disagree about EVERYTHING — and that's the drama.

---

## ANTI-PATTERNS (What NOT to Do)

- **No chosen ones.** No prophecies with names in them. Characters EARN their significance.
- **No power without cost.** Every ability must take something. Free power is boring.
- **No single-trait characters.** "The angry one" or "the smart one" is not a character. Add contradictions.
- **No aesthetic without substance.** A cool design with no Diamond is an NPC, not a hero.
- **No edgelords.** Dark ≠ interesting. Voidtouched characters must have WARMTH somewhere or they're just costumes.
- **No copies.** Every character must have at least one element that surprises — that breaks the pattern their origin class would predict.

---

*"A character is not what they can do. A character is what they choose when what they can do isn't enough."*
