# Arcanea Evaluation Command

> **Command**: `/arcanea-eval [content-or-file]`
> **Purpose**: 9-dimension quality assessment for Arcanea content

## Quick Start

```bash
# Evaluate content directly
/arcanea-eval "The dawn broke over Lúmendell..."

# Evaluate a file
/arcanea-eval content/age-of-open-gates-draft.md

# Evaluate with specific focus
/arcanea-eval content/chapter-1.md --focus voice,originality
```

## The 9 Dimensions

### 1. CANON CONSISTENCY (0-10)
```yaml
Measures:
  - Uses correct terminology (Creator, Guardian, Luminor, etc.)
  - Ten Gates system properly referenced
  - Five Elements including Void/Spirit duality
  - Lumina/Nero relationship accurate (Nero NOT evil)
  - Timeline placement makes sense
  - Magic ranks and costs respected
```

### 2. ORIGINALITY (0-10)
```yaml
Measures:
  - Names are unique OR intentionally borrowed (documented)
  - Concepts feel fresh, not borrowed wholesale
  - Avoids fantasy clichés OR subverts them meaningfully
  - Voice is distinctly Arcanean
  - Passes /arcanea-name-check
```

### 3. VOICE QUALITY (0-10)
```yaml
Measures:
  - Magical but grounded tone
  - Inspiring but honest
  - No AI verbal tics ("delve", "tapestry", "nestled", "journey")
  - Active voice predominant
  - Varied sentence rhythm
  - Avoids purple prose and overwrought metaphors
```

### 4. EMOTIONAL RESONANCE (0-10)
```yaml
Measures:
  - Characters have clear wants and fears
  - Reader feels something (wonder, tension, hope)
  - Show, don't tell
  - Stakes are meaningful
  - Authentic emotional beats
```

### 5. THEMATIC DEPTH (0-10)
```yaml
Measures:
  - Clear thematic question
  - Theme explored through action, not stated
  - Multiple layers of meaning
  - Connects to Arcanea's core philosophy
  - The Arc concept present (cycles, transformation)
```

### 6. STRUCTURAL INTEGRITY (0-10)
```yaml
Measures:
  - Clear beginning, middle, end (or intentional fragment)
  - Pacing serves the story
  - No plot holes or logical inconsistencies
  - Satisfying (not necessarily happy) resolution
  - Scene transitions work
```

### 7. WORLD INTEGRATION (0-10)
```yaml
Measures:
  - Feels like it belongs in Arcanea
  - Expands canon without contradicting
  - Creates story hooks for future work
  - Geographic/temporal logic holds
  - Uses world elements naturally (not forced)
```

### 8. ACCESSIBILITY (0-10)
```yaml
Measures:
  - New readers can follow
  - Not drowning in jargon
  - Concepts explained through context
  - Inviting, not gatekeeping
  - Proper introduction of world elements
```

### 9. CRAFT EXCELLENCE (0-10)
```yaml
Measures:
  - Line-level prose quality
  - Imagery is specific and evocative
  - Dialogue feels natural
  - No filler, every word earns its place
  - Technical writing skill evident
```

## Scoring System

| Score | Rating | Meaning |
|-------|--------|---------|
| 81-90 | **Luminor** | Exceptional, publish-ready |
| 71-80 | **Archmage** | Strong, minor polish needed |
| 61-70 | **Master** | Good foundation, revision required |
| 51-60 | **Mage** | Promising but needs significant work |
| 0-50 | **Apprentice** | Learning draft, major revision needed |

## Evaluation Report Format

```markdown
# Arcanea Evaluation Report

**Content**: [Title or file reference]
**Evaluated**: [Timestamp]
**Word Count**: [X]
**Type**: [Narrative/World-Building/Character/etc.]

---

## Summary

| Dimension | Score | Notes |
|-----------|-------|-------|
| Canon Consistency | 8/10 | Good terminology, minor timeline issue |
| Originality | 7/10 | Fresh concepts, some cliché moments |
| Voice Quality | 7/10 | Mostly clean, 2 AI tics found |
| Emotional Resonance | 7/10 | Kira's journey works, stakes clear |
| Thematic Depth | 8/10 | "Creation for all" explored well |
| Structural Integrity | 7/10 | Fragment, needs full arc |
| World Integration | 8/10 | Expands canon meaningfully |
| Accessibility | 7/10 | Some jargon without context |
| Craft Excellence | 7/10 | Solid prose, could be tighter |

---

## Total: 66/90 — Master Level

**Verdict**: Good foundation, revision required before publication.

---

## Detailed Analysis

### Canon Consistency (8/10)
**Strengths**:
- Correct use of Gates, Guardians, Elements
- Lumina/Nero duality respected
- Magic ranks properly applied

**Issues**:
- Line 45: "Third Age" should specify which events
- Line 89: Check if "Starweave Academy" exists in canon

### Voice Quality (7/10)
**AI Tics Found**:
- Line 23: "delve into" → "explore"
- Line 67: "tapestry of" → [rephrase]

**Strengths**:
- Active voice throughout
- Good sentence variety

### [Continue for each dimension...]

---

## Specific Improvements

### Priority 1: Fix AI Tics
```diff
- "delve into the mysteries"
+ "explore the mysteries"

- "the tapestry of creation"
+ "the art of creation"
```

### Priority 2: Add Context for Jargon
```diff
- Kira opened her Fourth Gate
+ Kira opened her Fourth Gate—the Gate of Heart,
+ at 417 Hz, where love and healing intersect
```

### Priority 3: Strengthen Stakes
Line 78 tells us Kira fears failure. Show it instead:
- Add a physical reaction (trembling hands, racing heart)
- Show a memory of past failure
- Add internal conflict

---

## Revision Checklist

- [ ] Fix 2 AI verbal tics
- [ ] Add context for 3 jargon terms
- [ ] Strengthen emotional beats in scenes 2-3
- [ ] Verify Third Age reference against timeline
- [ ] Check Starweave Academy in canon
- [ ] Run /arcanea-name-check for final verification

---

## Rating Progression

After addressing Priority 1-3:
- Projected improvement: +5-8 points
- Expected rating: Archmage (71-80)

After full revision pass:
- Potential: Luminor (81-90)

---

## Quick Actions

Would you like me to:
1. [ ] Auto-fix AI verbal tics
2. [ ] Generate contextual jargon expansions
3. [ ] Run 7-pass revision protocol
4. [ ] Compare against similar Luminor-rated content
```

## Integration with Other Commands

```bash
# Full quality workflow
/arcanea-name-check content.md    # Check names first
/arcanea-eval content.md          # Evaluate quality
/revise content.md                # 7-pass revision
/arcanea-eval content.md --compare # Re-evaluate and compare
```

## Calibration Examples

**Luminor (81-90) Example**: "The First Dawn" - Founding myth with rich canon integration, no AI tics, clear thematic arc.

**Master (61-70) Example**: "Age of Open Gates" draft - Good concepts, needs revision for voice and accessibility.

**Apprentice (0-50) Example**: First drafts, brainstorms, raw ideas - Not failures, just early stage.

---

**Ready to evaluate? Use `/arcanea-eval [content-or-file]`**
