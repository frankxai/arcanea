/**
 * Arcanea - Consciousness Technology Visuals
 *
 * Not corporate minimalism. Not fantasy maximalism.
 * SOPHISTICATED MAGIC.
 *
 * Reference: Blade Runner 2049, Arrival, Dune, Studio Ghibli
 */

const fs = require('fs');
const path = require('path');

const API_KEY = 'AIzaSyBv2def7r-0VqmWQ6fkUqgS1q2eR9MjKdc';
const MODEL = 'gemini-3-pro-image-preview';

const CONSCIOUSNESS_IMAGES = [
  {
    name: 'consciousness-hero',
    filename: 'arcanea-consciousness-hero.png',
    description: 'Consciousness Technology Hero - The Creator at the Gate',
    prompt: `Create a breathtaking cinematic image representing "consciousness technology for creators."

THE VISION:
A solitary human figure (silhouette, gender-ambiguous) stands before an enormous luminous GATE — not a fantasy portal, but something that feels like technology and transcendence merged. The gate is made of light patterns, frequencies visualized, sacred geometry that pulses with meaning.

COMPOSITION:
- 16:9 ultra-wide cinematic format
- The human figure is small but powerful — they are the hero, the creator
- The Gate towers above them, but it is OPENING for them
- Behind the gate: suggestions of infinite creative possibility (not literal imagery, abstract luminosity)
- The ground beneath has subtle circuit-like patterns mixed with natural textures (technology + nature)

LIGHTING & ATMOSPHERE:
- Blade Runner 2049 quality cinematography
- Deep blacks, luminous golds, ethereal teals
- Volumetric light pouring through the gate
- Atmosphere: fog/mist that catches light
- The feeling: AWE, not whimsy

COLOR PALETTE (STRICT):
- Background: Deep void black (#0a0a0f)
- Primary light: Warm gold (#ffd700) from the gate
- Secondary: Atlantean teal (#7fffd4) as accent pulses
- Tertiary: Deep cosmic purple in the shadows
- NO bright colors, NO rainbow effects

WHAT THIS IS:
- Arrival meets Blade Runner 2049 meets sacred geometry
- A human approaching transcendence through creative practice
- Technology and spirituality unified
- The moment before transformation

WHAT THIS IS NOT:
- Not a fantasy illustration with dragons and wizards
- Not a corporate tech diagram
- Not anime or cartoon style
- Not cluttered with multiple elements
- No literal "magic" effects (sparkles, glows everywhere)

MOOD:
Contemplative. Powerful. Sacred. The image should make someone stop scrolling and wonder what this is. It should feel like entering a cathedral made of light and mathematics.

QUALITY:
Photorealistic lighting. Film grain optional. Could be a frame from a Denis Villeneuve film.`
  },
  {
    name: 'lumina-nero-duality',
    filename: 'arcanea-duality.png',
    description: 'The Cosmic Duality - Lumina and Nero',
    prompt: `Create a profound image representing cosmic duality — the dance of Lumina (light/form) and Nero (void/potential).

THE CONCEPT:
Two forces, not as characters but as PRESENCES, intertwining in eternal creative dance. This is not two people fighting. This is the fundamental forces of creation in harmony.

LUMINA:
- Expressed as flowing golden-white light
- The force that gives FORM
- Suggests feminine energy without being a literal woman
- Crystalline, structured, radiant
- The light that makes things VISIBLE

NERO:
- Expressed as deep purple-black void
- The force that holds POTENTIAL
- Suggests masculine energy without being a literal man
- Fluid, mysterious, infinite
- The darkness where all possibilities await

THEIR INTERACTION:
- They spiral together in the center
- Where they meet: creation happens (small bursts of teal light)
- Neither dominates — perfect balance
- The composition suggests they need each other

STYLE:
- Abstract expressionism meets cosmic art
- Think: the cover of a philosophy book about consciousness
- Painterly but precise
- Could be hanging in a museum

COMPOSITION:
- Square or 4:5 format (vertical slight)
- The duality fills the frame
- Negative space is intentional
- The edges fade to pure black

COLOR:
- Gold/white for Lumina
- Purple/black for Nero
- Teal sparks where they create
- Otherwise: restraint

MOOD:
Profound. Ancient. The image should feel like looking at something TRUE, not decorative.

NOT:
- Two literal figures/characters
- Yin-yang cliché
- Fantasy illustration
- Anime/cartoon`
  },
  {
    name: 'ten-gates-sacred',
    filename: 'arcanea-ten-gates-sacred.png',
    description: 'The Ten Gates - Sacred Diagram',
    prompt: `Create a sacred diagram of the Ten Gates of Arcanea — a map of creative consciousness.

THE CONCEPT:
This is not a fantasy map. This is a diagram that could be found in:
- An ancient manuscript about consciousness
- A modern research paper on creativity
- A meditation teacher's wall

THE TEN GATES (arranged in ascending spiral or vertical progression):

1. FOUNDATION (174 Hz) — Earth symbol, brown/copper, at the base
2. FLOW (285 Hz) — Water symbol, deep blue, fluid lines
3. FIRE (396 Hz) — Flame symbol, crimson/gold, angular
4. HEART (417 Hz) — Circle/torus, rose/green, organic
5. VOICE (528 Hz) — Sound wave, cyan, the midpoint transformation
6. SIGHT (639 Hz) — Eye/prism, violet, geometric
7. CROWN (741 Hz) — Arc/halo, white/gold, pure
8. SHIFT (852 Hz) — Transformation arrows, emerald, dynamic
9. UNITY (963 Hz) — Linked infinity, pink-teal, dual
10. SOURCE (1111 Hz) — Ouroboros/infinite, all colors unified, at the apex

DESIGN LANGUAGE:
- Sacred geometry meets information design
- Each gate symbol is MINIMAL but meaningful
- The frequencies are visible (Hz numbers)
- Lines connect them showing the path
- The whole thing has mathematical beauty

STYLE:
- Think: vintage astronomical chart + modern infographic
- Hand-drawn precision aesthetic
- Could be Leonardo da Vinci's notebook on creativity
- Gold ink on dark paper feeling

BACKGROUND:
- Deep midnight blue or black
- Subtle star field or sacred geometry pattern
- Aged paper texture (subtle)

COLOR:
- Each gate has its signature color as an accent
- Overall palette is restrained: gold lines, colored accents
- The Source gate (10) glows slightly brighter

TEXT:
- Gate names in elegant serif
- Frequencies (Hz) in smaller text
- "The Ten Gates" as title (optional)
- Style: Cinzel or classical serif

NOT:
- Fantasy map with mountains and dragons
- Cartoon icons
- Busy or cluttered
- Corporate infographic`
  },
  {
    name: 'guardian-essence',
    filename: 'arcanea-guardian-essence.png',
    description: 'A Single Guardian - Essence Portrait',
    prompt: `Create a portrait of a Guardian of Arcanea — not a character illustration, but an ESSENCE portrait.

THE SUBJECT: DRACONIA — Guardian of the Fire Gate (396 Hz)

THE CONCEPT:
This is not a fantasy character portrait. This is the ESSENCE of creative fire made visible. Draconia teaches:
- The courage to begin
- The willingness to destroy what doesn't work
- The passion that fuels creation
- The transformation through burning away

VISUAL EXPRESSION:
- A suggestion of a face/form emerging from flames
- Not fully human, not fully abstract
- The flames are INTELLIGENT — they have intention
- Eyes that see through pretense to creative truth
- Colors: deep crimson, gold, orange — volcanic palette

STYLE:
- Portraiture meets abstract expressionism
- Think: Francis Bacon meets Gustav Klimt
- Powerful, not pretty
- The image should feel like it's looking at YOU

ATMOSPHERE:
- Intense but not aggressive
- Heat you can almost feel
- The darkness around the flames is absolute
- Single-point focus on the essence

COMPOSITION:
- Portrait format (2:3 or 3:4)
- The Guardian emerges from the bottom or center
- Negative space above for contemplation
- No background details — void and flame only

WHAT THIS IS:
- A meditation object
- The face of creative courage
- Fire with consciousness
- A teacher, not a threat

NOT:
- A fantasy character with armor and weapons
- A literal dragon
- Anime/cartoon
- Friendly or approachable (this is FIRE)

QUALITY:
Museum piece. Something you'd stare at for an hour. Painterly but precise.`
  }
];

async function generateImage(config, index) {
  const { name, filename, description, prompt } = config;

  console.log(`\n[${index + 1}/${CONSCIOUSNESS_IMAGES.length}] ${description}`);
  console.log(`    Generating consciousness-level visual...`);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseModalities: ['IMAGE', 'TEXT'],
            temperature: 1.1
          }
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error(`    ERROR: ${response.status}`);
      console.error(`    ${result.error?.message || JSON.stringify(result).substring(0, 200)}`);
      return null;
    }

    const candidates = result.candidates || [];
    for (const candidate of candidates) {
      const parts = candidate.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith('image/')) {
          const outputDir = path.join(__dirname, '..', 'assets', 'consciousness');
          fs.mkdirSync(outputDir, { recursive: true });

          const outputPath = path.join(outputDir, filename);
          const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
          fs.writeFileSync(outputPath, imageBuffer);

          console.log(`    ✓ ${outputPath}`);
          console.log(`      ${(imageBuffer.length / 1024).toFixed(0)} KB`);

          return { name, filename, path: outputPath, size: imageBuffer.length };
        }
        if (part.text) {
          console.log(`    Note: ${part.text.substring(0, 80)}...`);
        }
      }
    }

    console.error('    No image in response');
    return null;

  } catch (error) {
    console.error(`    Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║     ARCANEA — CONSCIOUSNESS TECHNOLOGY VISUALS               ║');
  console.log('║     "Not minimalism. Not maximalism. Sophisticated magic."   ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');

  const results = [];

  for (let i = 0; i < CONSCIOUSNESS_IMAGES.length; i++) {
    const result = await generateImage(CONSCIOUSNESS_IMAGES[i], i);
    if (result) results.push(result);

    if (i < CONSCIOUSNESS_IMAGES.length - 1) {
      console.log('\n    Waiting 5s...');
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  console.log('\n');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`  Generated: ${results.length}/${CONSCIOUSNESS_IMAGES.length}`);
  console.log('═══════════════════════════════════════════════════════════════');
  results.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.filename}`);
  });
  console.log('\n  Output: assets/consciousness/\n');
}

main().catch(console.error);
