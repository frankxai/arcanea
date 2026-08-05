# HOLDFAST — look & sound

> Filled from the `film-design.md` template in the `film-excellence` pack —
> [`frankxai/claude-skills-library`](https://github.com/frankxai/claude-skills-library)
> `packs/film-excellence/film-design.md`. The pack also carries `film-taste.md`
> (refusals), `LANGUAGE.md` (the Spoken Law), and the `film-release-gate` skill.
> Craft lives there so it is reusable across productions; canon lives here.
>
> This file and the local refusals below outrank every skill in the pack for
> this production.

---

```yaml
film:
  title: HOLDFAST
  runtime_target: "04:14"        # 4:10 picture (beats 1-14) + 0:04 end card
  runtime_picture: "04:10"
  aspect: 1.85:1
  frame_rate: 24
  track: series-episode

formal_rule:
  camera: >
    The camera never rises above standing eye-height, and the ground is in frame
    or implied in every shot. It breaks exactly once, on the final shot.
  color: >
    Two desaturated families only — Academy warm gold and yard grey-green. One
    forbidden saturated color, spent once.
  sound: >
    A 174 Hz sine bed runs unbroken from frame one and never swells. It stops at
    3:58 and does not return.
  where_it_hurt:
    - "beat 10 — the reveal wants a crane; solved with a rack focus instead"
    - "beat 14 — the rise had to be earned by 167 seconds of refusal"

palette:
  base: ["#5C6357", "#8A8F84", "#2A2724"]   # wet stone, weathered lime, shadow
  accent: "#C9A44C"                          # Academy gold, always distant, always out of focus
  forbidden_color:
    hex: "#FFD9A0"                           # amber-white, the seam light
    total_screen_time: 4
    appears_at: ["2:47", "3:44", "4:02"]
  grade_notes: >
    Cool-neutral, lifted blacks, low saturation throughout. No teal/orange.
    Highlights roll off soft — this is overcast daylight, not a lighting rig.
    The Academy gold never sharpens: it exists only as defocused window light
    at the top of frame, the life she is excluded from, permanently out of reach
    and permanently out of focus. Rack it into focus at no point in the film.

lens:
  primary: 40mm
  secondary: 75mm
  rules:
    - "40mm carries the film. Human eye. No wide-angle grandeur anywhere."
    - "75mm only on hands and on the instrument. Never on a face before 2:31."
    - "No lens wider than 40mm exists in this production."
  depth_of_field: >
    Deep in the yard, shallow on hands. The single rack focus at 2:47 is the
    only focus pull in the film that carries story.

light:
  key_quality: soft
  sources_in_world: ["overcast sky", "Academy windows (distant, defocused)", "the seam under the door"]
  direction_law: >
    All light comes from above and behind until 2:47. After the reveal, the seam
    light comes from below — House Terra's own visual law per VISUAL_DOCTRINE.md
    ("light comes from below"). The film's light inverts at the turn and the
    audience feels it without naming it.

texture:
  grain: >
    Fine, consistent, present in the shadows. Slight halation on the seam light
    only — the one place the image is allowed to bloom.
  imperfections:
    - shot: "beat 2"
      what: "rain on the lens, six seconds, unwiped"
    - shot: "beat 7"
      what: "focus misses the shaking hands and hunts back over one breath"
    - shot: "beat 12"
      what: "dust gust obscures both faces 1.5s at the peak of the beat"
  hands:
    - shot: "beat 1"
      task: "setting and seating a stone — bed, seat, thumb away the spall"
    - shot: "beat 9"
      task: "Vesk turning her left hand over, reading the callus pattern"
    - shot: "beat 12"
      task: "his palm onto Kaelith Stone; the tremor arriving in four seconds"

sound:
  bed:
    - location: "the yard"
      description: >
        174 Hz sine at -32 LUFS — below conscious threshold on laptop speakers,
        physically present on anything with low end. Under it: wind across open
        stone, distant water, no birds. There are no birds in this film.
    - location: "the door"
      description: >
        The same 174 Hz, +4 dB and slightly detuned, as if the room is not quite
        agreeing with itself. Only within two metres of the door.
  foley_priority:
    - "stone seating into its bed — dry, granular, close"
    - "the brass instrument: catch, click, needle settling"
    - "cloth and breath — both characters, mic'd close, especially at beat 12"
  music:
    in_point: null
    out_point: null
    instrumentation: "none"
  # Speech-free = nobody is talking. That is the 20% budget, and it says nothing
  # about what the bed is doing. Total silence = no signal at all. The second is
  # a SUBSET of the first, not a sibling of it: beat 14 is speech-free AND
  # signal-free, so it is counted once here and described once below. On beats
  # 1, 7, and 13 the 174 Hz bed runs underneath; on beat 14 it stops. That
  # difference is the film, which is why the two fields must not be collapsed.
  speech_free:
    budget_seconds: 50           # floor (20% of 254s picture)
    actual_seconds: 86           # 33.9% — beats 1+2+7+13+14
    beats: [1, 2, 7, 13, 14]     # 14 is also total_silence — deliberate overlap
    bed_running_on: [1, 2, 7, 13]
    bed_stopped_on: [14]
    first_spoken_word_at: "0:40" # beats 1-2 carry the film alone for 40 seconds
  total_silence:
    at: "3:58"
    duration: 12
    function: >
      The 174 Hz stops. The audience's body has carried it for four minutes
      without knowing. Its removal is the film's climax — physical relief, not
      an emotional cue. Nothing may be laid over it.

typography:
  title_card: "Myth-tech minimalism per VISUAL_DOCTRINE.md — wide tracking, light weight, no serif ornament"
  placement: "end only, centred, small"
  rule: "One card. Four seconds. Silence under it. No logo animation, no sting."

cast_locks:
  - name: "Kess Andal"
    character_id: "<filled at stage 7>"
    description: >
      A nineteen-year-old woman, House Terra apprentice. Short dark hair, cut by
      herself, uneven at the back. Broad through the shoulders and forearms from
      stone work, thin everywhere else. Grey-green work canvas over a rough
      undershirt, sleeves pushed to the elbow. Stone dust in the creases of her
      knuckles and along the forearms. Deep shadow under both eyes, permanent,
      not makeup. Chapped lower lip. Left hand: last two fingers curled, will
      not straighten. Never smiles. Watches the floor when spoken to.
    asymmetry: "left hand, last two fingers, permanently curled"
  - name: "Sentinel Orin Vesk"
    character_id: "<filled at stage 7>"
    description: >
      A man in his fifties, Starlight Corps sentinel, five-point star insignia at
      the collar. Grey stubble, close-cropped grey hair receding at the temples.
      Badly set break across the bridge of the nose. Left eye wet, wiped often
      with the back of the wrist. Starlight-silver coat over dark field uniform,
      worn at the cuffs, immaculately kept. Carries a brass-and-crystal measuring
      instrument on a strap. Reading glasses he puts on only to write.
    asymmetry: "badly set nasal break; left eye waters"
```

---

## No music, and why

This film has no score. Not "sparse" — none.

The 174 Hz bed is doing the work a score would do, and it is doing it *in canon*
— it is the Foundation Gate's own frequency, so the film's entire sonic identity
is a canon fact rather than a composer's choice. Adding music on top would be
covering the film's most original asset with its least.

It also converts the ending from a musical resolution into a physical one, which
is the difference between an audience being told the film is over and an
audience noticing that their chest has stopped humming.

**If the cut feels thin without music, the problem is the picture.** Adding
music will hide that and the gate will not certify it.

---

## Local refusals (appended to `film-taste.md`)

- **No wide shot of Kaelith.** Ever. Eleven frames of an unresolvable shape and
  nothing more. The instinct to show the Godbeast is the single most expensive
  mistake available to this production.
- **No Academy interior.** The warm gold stays out of focus at the top of frame
  for the entire film. We never go inside. The one place the audience wants to
  go is the one place we refuse.
- **No spell, no glow-hands, no visible magic effect.** The only magic in this
  film is a door that is closed and two people who are tired. The moment
  something glows in a palm, the film joins four thousand others.
- **No flashback to when she was six.** It is stated once and never shown. The
  image the audience builds is better than any we can generate.
- **No score. No swell. No braaam.** See above.
- **No slow-motion.** Not one frame.

---

Built on SIP.
