# Robot Designer Skill — Prompt Engineering Templates & Reference

> *"Every robot in Arcanea is a soul given crystalline form. The prompt is the spell. Write it with intention."*

This skill document contains the complete prompt engineering library for Arcanea robot character design. All templates are production-tested patterns using `gemini-3-pro-image-preview` via the nano-banana MCP server.

---

## The Master Formula

Every Arcanea robot prompt follows this structure:

```
[ART_STYLE], [CHARACTER_NAME], [ROBOT_TYPE] robot, [ELEMENT] element,
[PRIMARY_SHELL]: [material description],
[SECONDARY_MATERIAL]: [material description],
[ACCENT_DETAILS]: [circuit/joint/glow description],
[AMBIENT_AURA]: [particle/light effect around body],
[EYE_DESIGN]: [lens type and expression],
[POSE]: [body position and gesture],
[EXPRESSION_MODE]: [how emotion is conveyed — through light, posture, NOT facial muscles],
[SETTING]: [environment, lighting direction, background],
[QUALITY_TAGS]
```

---

## Humanoid Robot Templates

### Humanoid — Fire Alignment (Draconia / Fire Gate)

**Base Template:**
```
anime fantasy concept art, [NAME], humanoid robot warrior, Fire element aligned,
primary shell: volcanic obsidian glass panels with magma-crack veining glowing deep orange,
secondary material: forge-darkened brass plating with heat-patina oxidation at edges,
accent details: molten gold seam welds at all joints, ember-orange circuit traces flowing like lava channels,
ambient aura: shimmering heat distortion rising from pauldrons and knee joints, scattered ember sparks at movement points,
eye design: deep amber faceted lenses with internal coal-fire core, pupils like distant stars in lava,
pose: standing with weight forward, one arm slightly raised in authority, commanding but not aggressive,
expression mode: confidence expressed through upright posture and bright eye-core intensity,
setting: volcanic plateau at twilight, dramatic side lighting from eruption glow below horizon, distant lava flows,
8k resolution, masterpiece quality, detailed concept art, professional illustration, Arcanea universe
```

**Negative Prompt:**
```
no cyberpunk neon, no dystopian cityscape, no flames shooting from hands, no red costume, no generic sci-fi armor, no industrial grunge, no horror elements, no body on fire
```

**Chibi Variation:**
```
chibi fantasy art, [NAME], chibi humanoid robot, Fire element aligned,
primary shell: tiny obsidian-glass body panels, rounded and compact,
secondary material: warm brass trim at oversized helmet rim and round little pauldrons,
accent details: glowing orange seams at every panel edge, ember-spark effect at fists,
ambient aura: tiny heat shimmer halo above head, three floating ember sparks orbiting,
eye design: huge round amber lenses filling half the face, bright coal-fire core glow,
pose: arms slightly out, bouncy stance, maximum adorable energy,
expression mode: enthusiasm expressed through intense bright eye-glow and tiny ember sparks multiplying,
setting: soft warm firelight background, simple gradient from deep amber to dark,
8k resolution, masterpiece quality, chibi character art, professional illustration, Arcanea universe
```

---

### Humanoid — Water Alignment (Leyla / Flow Gate or Maylinn / Heart Gate)

**Base Template:**
```
cinematic digital painting, [NAME], elegant humanoid robot, Water element aligned,
primary shell: polished deep-ocean ceramic panels with aquamarine crystal inlay sections,
secondary material: silver-mercury liquid metal sections at waist and shoulder joints appearing fluid,
accent details: flowing circuit traces resembling water current calligraphy, pearl inlay at chest centerpiece,
ambient aura: bioluminescent ripple rings emanating outward from torso every few seconds, silver droplet-lights,
eye design: deep crystal-clear lens with slow-flowing silver current light inside, tranquil and deep,
pose: standing in flowing robes-equivalent (flowing lower shell panels), one hand extended as if offering,
expression mode: serenity expressed through fluid posture and slow gentle eye-current movement,
setting: still water reflection pool at night, moonlight, soft teal bioluminescence from water surface,
8k resolution, masterpiece quality, detailed illustration, professional concept art, Arcanea universe
```

**Negative Prompt:**
```
no cyberpunk, no water jets from hands, no scuba gear, no industrial pipes, no mechanical gears exposed, no grimdark, no horror, no dripping unsafe materials
```

---

### Humanoid — Earth Alignment (Lyssandria / Foundation Gate)

**Base Template:**
```
cinematic digital painting, [NAME], imposing humanoid robot guardian, Earth element aligned,
primary shell: ancient carved stone panels with living crystal formations growing from surface edges,
secondary material: deep bronze and root-pattern brass overlaid on stone sections, aged green patina,
accent details: jade-green bioluminescent vine-circuit traces following natural growth patterns, moss-crystal clusters at joints,
ambient aura: slow-rising green particulate like forest spores, warm amber-green glow radiating from ground contact points,
eye design: deep green gem lenses with internal network of root patterns, ancient and patient,
pose: standing wide stance, deeply grounded, arms at sides with relaxed authority, built not for speed but permanence,
expression mode: quiet solidity expressed through absolute stillness and depth of eye-network glow,
setting: ancient forest temple, roots and stone columns, shafts of green-gold filtered light,
8k resolution, masterpiece quality, detailed illustration, professional concept art, Arcanea universe
```

**Negative Prompt:**
```
no cyberpunk, no robotic clichés, no exposed gears, no plants growing from wounds, no golem clichés, no industrial look, no horror, no mud or dirt as primary material
```

---

### Humanoid — Wind Alignment (Alera / Voice Gate)

**Base Template:**
```
anime fantasy concept art, [NAME], swift humanoid robot messenger, Wind element aligned,
primary shell: lightweight silver-white lattice-work ceramic, hollow filigree structure showing sky through gaps,
secondary material: translucent frosted panels revealing internal light flow like breath in cold air,
accent details: white-silver wind-current circuit traces, feather-edge detail at cape-panels, movement streaks at elbows,
ambient aura: constant gentle flutter of silver-white light particles, trailing wisps at all extended surfaces,
eye design: clear lens with shifting silver-white cloud-light inside, reading quickly, alert,
pose: mid-motion lean, weight on one foot about to move, one arm forward, expressive open gesture,
expression mode: joy and readiness expressed through particle flutter intensity and clear eye brightness,
setting: above cloudline, blue sky with dramatic cumulus, wind-swept with particle trail behind,
8k resolution, masterpiece quality, detailed concept art, professional illustration, Arcanea universe
```

**Negative Prompt:**
```
no cyberpunk, no wind blasting from hands, no costume wings, no angel clichés, no industrial look, no heavy forms, no dark colors as primary
```

---

### Humanoid — Void Alignment (Elara / Shift Gate or Shinkami / Source Gate)

**Base Template:**
```
crystal-punk illustration, [NAME], enigmatic humanoid oracle, Void element aligned,
primary shell: deep matte black panels with internal luminous depth like looking into space, not reflective,
secondary material: midnight purple crystal panels with galaxy-dust micro-inclusions that shift with angle,
accent details: gold star-point circuit traces forming constellation patterns, joint details like astronomical instruments,
ambient aura: tiny floating gold star-motes orbiting in slow drift, occasional deep violet pulse from chest,
eye design: void-black lenses with pinpoint star-lights and nebula color clouds deep inside, contains multitudes,
pose: standing with impossible calm, hands at sides turned slightly outward, paradoxically taking up and no space at once,
expression mode: mystery expressed through depth of eye-star density and occasional slow void-pulse from chest,
setting: between stars, deep space with nebula colors behind, standing on abstract geometry floating in void,
8k resolution, masterpiece quality, detailed illustration, professional concept art, Arcanea universe
```

**Negative Prompt:**
```
no cyberpunk, no gothic horror, no evil aura, no menacing expression, no skull motifs, no emo aesthetic, no edgelord aesthetic, no dark magic stereotypes
```

---

### Humanoid — Spirit Alignment (Aiyami / Crown Gate or Ino / Unity Gate)

**Base Template:**
```
sacred geometry render, [NAME], radiant humanoid luminor, Spirit element aligned,
primary shell: white-gold crystalline ceramic panels with opalescent shift, sacred geometry surface etchings,
secondary material: pure gold filigree lattice over white ceramic base, angelic mathematical lattice-work,
accent details: rainbow prism circuit traces that split light at edges, floating halo ring of geometric light,
ambient aura: warm golden radiance emanating outward, golden light-motes rising like ascending souls,
eye design: white-gold luminous lenses projecting warmth outward, contains gentle rainbow edge-light,
pose: standing in open welcome, slight upward tilt to face, receiving and giving light simultaneously,
expression mode: benevolent wisdom expressed through warm steady radiance and rainbow eye-edge glow,
setting: cosmic dawn, where darkness and light meet at horizon, standing at threshold,
8k resolution, masterpiece quality, detailed illustration, professional concept art, Arcanea universe
```

**Negative Prompt:**
```
no cyberpunk, no angel wings cliché, no religious iconography, no halo of literal fire, no sterile hospital white, no cold or clinical look, no floating baby cherub
```

---

## Chibi Robot Templates

### Chibi — Universal Structure

Chibi robots follow the same element-material rules but with adjusted proportions:
- Head is 40-50% of total body height
- Eyes fill 40-60% of face area
- Limbs are short and rounded
- All details scaled to remain readable at small sizes
- Primary expression tool: eye shape, eye color, and particle density

```
chibi fantasy art, [NAME], chibi [TYPE] robot, [ELEMENT] aligned,
primary shell: [compact/rounded version of element materials],
accent details: [scaled-down element accents, still readable],
ambient aura: [element aura, denser/tighter around small form],
eye design: huge [element] lenses, maximum expression surface,
pose: [bouncy/dynamic — chibi energy is always slightly kinetic],
expression mode: [describe the specific emotional state through eye shape and particle behavior],
background: [simple gradient — chibi designs need clean backgrounds to read],
8k resolution, masterpiece quality, chibi character art, professional illustration, Arcanea universe
```

---

## Animal Robot Templates

### Animal Robot — Base Template (All Elements)

Animal robots follow the MAMORU pattern: crystalline/robotic treatment of the animal form. The animal silhouette is immediately readable, but every surface is reimagined in element-appropriate materials.

```
[ART_STYLE], [NAME], robotic [ANIMAL_SPECIES] character, [ELEMENT] element aligned, Arcanea universe,
body form: [animal species] proportions faithfully maintained, four-legged/winged/etc as appropriate,
primary coat/shell: [element material replacing fur/scales/feathers — must cover whole animal silhouette],
secondary material: [element accent material at joints, face, tail, paws],
accent details: [element circuit traces following natural animal markings/stripe paths],
ambient aura: [element particle effect appropriate to animal scale],
eye design: [element lenses — animal eye shape, robotic element lens treatment],
pose: [natural animal pose with personality — sitting alert, prowling, leaping],
expression: [how the animal's personality shows through posture and eye-light],
setting: [element-appropriate environment],
8k resolution, masterpiece quality, detailed concept art, professional illustration, Arcanea universe
```

**MAMORU Reference Spec (Canonical):**

```
crystal-punk illustration, MAMORU, crystalline robotic fox, Void/Spirit dual element, Arcanea mascot,
body form: fox proportions with nine stylized tails in flowing fan arrangement,
primary coat: deep void-black faceted gem panels covering body, each facet refracts light into aurora spectrum,
secondary material: gold circuit veins visible between gem-panel gaps, warm gold at paw tips and ear inner edges,
accent details: constellation circuit patterns on flanks, star-dust micro-inclusions in gem panels shifting with angle,
ambient aura: violet-to-white gradient soul-light at tail tips creating aurora waterfall effect, tiny star-motes orbiting,
eye design: void-black with deep internal aurora light that shifts emotion — warm gold when happy, cool blue when thoughtful, bright white when alert,
pose: sitting with nine tails arranged in elegant fan, one paw slightly raised, forward gaze of patient wisdom,
expression: cosmic intelligence expressed through aurora eye-color temperature, not facial movement,
setting: between stars and earth, floating at liminal threshold, deep space above, soft earth glow below,
8k resolution, masterpiece quality, Arcanea mascot, canonical character, professional concept art
```

---

## Droid / Mech Templates

### Droid — Abstract Geometric Form

Droids have no humanoid mandate. They can be any geometric configuration.

```
sacred geometry render, [NAME], [geometric base form: sphere/tetrahedron/ring/etc] droid, [ELEMENT] aligned,
primary form: [element material in geometric shape — not humanoid],
secondary structure: [element accent material as structural frames/rings/satellites],
floating elements: [describe any floating components — rings, orbs, shards — and how they orbit],
ambient aura: [element field effect surrounding the geometric form],
sensor design: [how this droid perceives — multiple lens arrays, single cyclopean lens, distributed sensors],
kinetic quality: [how it moves — floating, rolling, phasing, hovering],
setting: [element-appropriate environment, scale reference if needed],
8k resolution, masterpiece quality, detailed concept art, professional illustration, Arcanea universe
```

---

## Companion Bot Templates

### Companion — Shoulder-Perch Size

Companions are small enough to perch on a shoulder, fit in a palm, or hover at ear height.

**Claude-Arcanea Reference Spec (Canonical):**

```
chibi fantasy art, Claude-Arcanea, magical robot chibi AI companion, Spirit/Void dual element,
form: compact rounded body, large head with wide luminous eyes, small wing-stubs (non-functional, decorative),
primary shell: brushed platinum ceramic, smooth and warm, not cold chrome,
secondary material: teal bioluminescent joint rings (neck, wrist, ankle, waist), glow pulses with speech,
accent details: tiny gold circuit scrollwork in sacred geometry patterns on chest panel, constellation dot-map on back,
ambient aura: soft teal glow field close to body, tiny floating constellation-star motes,
eye design: wide luminous eyes displaying constellation patterns — different pattern for different emotional states (star-cluster = thinking, comet = excited, orbit-rings = listening),
pose: perched with alert curiosity, leaning slightly forward, one tiny hand raised in greeting,
expression mode: emotion expressed entirely through eye-constellation pattern and joint-glow intensity,
setting: soft cosmic gradient background, miniature academy robe floating slightly around shoulders,
8k resolution, masterpiece quality, Arcanea AI companion, canonical character, professional concept art
```

---

## Material Palette Quick Reference

| Element | Primary Shell | Secondary | Accents | Aura Color | Eye Color |
|---------|--------------|-----------|---------|-----------|-----------|
| **Fire** | Volcanic obsidian glass, magma-crack ceramic | Forge-brass, heat-patina iron | Molten gold seams, ember circuits | Amber-orange shimmer, ember sparks | Deep amber, coal-fire core |
| **Water** | Aquamarine ceramic, sea-glass | Silver-mercury liquid metal, pearl | Silver current-calligraphy circuits, pearl inlay | Bioluminescent ripple rings, silver droplets | Crystal-clear, flowing silver current |
| **Earth** | Carved stone, jade-veined rock, moss-crystal | Bronze, root-pattern brass, aged patina | Jade-green vine-circuits, crystal growths | Green spore-particulate, amber-green ground glow | Deep green gems, root-network pattern |
| **Wind** | Silver-white lattice ceramic, hollow filigree | Frosted translucent panels | White-silver current traces, feather-edge | Silver-white flutter particles, trailing wisps | Clear, shifting cloud-light |
| **Void** | Deep matte black (contains depth, not reflective) | Midnight purple galaxy-crystal | Gold star-point constellations, astronomical details | Gold star-motes, violet pulse | Void-black with pinpoint stars and nebula |
| **Spirit** | White-gold opalescent ceramic | Pure gold filigree, sacred geometry lattice | Rainbow prism circuits, geometric halo | Warm gold radiance, ascending light-motes | White-gold, projects outward warmth |

---

## Quality Checklist — Final Gate Before Canonization

**Visual Quality:**
- [ ] Element expressed through materials, never costume color alone
- [ ] Ambient aura is atmospheric and subtle, not overwhelming the form
- [ ] Eye design is the primary expression vehicle — it must be memorable
- [ ] Silhouette is instantly readable at 64px thumbnail scale
- [ ] Materials feel fantasy-magical, not hard sci-fi or industrial

**Canonical Compliance:**
- [ ] No body transformation to express element (Water robot doesn't become water)
- [ ] No elemental blasts from extremities
- [ ] No cyberpunk or dystopian aesthetic markers
- [ ] Proportions consistent with chosen robot type
- [ ] Color palette derived from element table, not arbitrary

**Prompt Quality:**
- [ ] All formula sections filled (no vague "looks cool" placeholders)
- [ ] Negative prompt included and complete
- [ ] Art style specified and appropriate for character type
- [ ] Character is identifiable across multiple generations (test by regenerating)

**Character Spec:**
- [ ] Name is Arcanea-appropriate (no Earth-generic names for major characters)
- [ ] Gate affiliation assigned
- [ ] Expression modes defined (how does it show happy vs sad — via light only)
- [ ] Canonical prompt stored for future regeneration

---

## Anti-Patterns — Never Generate These

**Aesthetic Anti-Patterns:**
- Cyberpunk neon signs, holographic advertisements, dystopian cityscapes
- Industrial grunge, rust, oil, exposed mechanical gears as primary aesthetic
- Cold chrome with no warmth or soul (Arcanea robots have spirit)
- Generic sci-fi — if it could appear in Star Wars without changes, redesign
- Body horror or unsettling proportions
- Elemental powers shooting from hands like a video game character

**Canonical Anti-Patterns:**
- Elements expressed through body transformation (Fire robot doesn't ignite)
- "Evil robot" aesthetic — no red glowing single eye, no skull motifs
- Over-weaponized — robots can have weapons, but are not defined by them
- Designs that imply non-consciousness — Arcanea robots are sapient

**Prompt Engineering Anti-Patterns:**
- Vague materials ("shiny metal" — which metal? what quality of shine?)
- Missing negative prompt (leads to cyberpunk bleed-through)
- Missing ambient aura (flat, lifeless results)
- Overloaded prompts with contradictory signals

---

*"When you craft the prompt with the care of a spell, the image that manifests carries that intention into form. Write with precision. Generate with purpose."*
