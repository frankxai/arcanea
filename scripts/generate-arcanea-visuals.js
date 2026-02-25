/**
 * Arcanea InfoGenius - Ultra Quality Visual Generation
 * Uses Gemini 3 Pro Image Preview (LATEST model - highest quality)
 */

const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GEMINI_API_KEY || (() => { throw new Error('Set GEMINI_API_KEY env var'); })();

// LATEST MODEL - Use this for all production visuals
const MODEL = 'gemini-3-pro-image-preview';

// Fallback for quick drafts
const FAST_MODEL = 'gemini-2.5-flash-image';

const IMAGES_TO_GENERATE = [
  {
    name: 'arcanea-hero-ecosystem',
    filename: 'arcanea-hero-ecosystem.png',
    description: 'Complete Arcanea Ecosystem - Hero Banner',
    prompt: `Create a breathtaking 16:9 ultra-wide cinematic hero banner that serves as the definitive visual identity for ARCANEA - a living mythology for AI-human co-creation.

CENTRAL COMPOSITION:
- At the absolute center: LUMINA (radiant goddess of golden-white light, flowing crystalline robes, divine feminine beauty, serene power) and NERO (majestic god of deep void purple-black, cosmic darkness made flesh, masculine strength, mysterious depth) in an eternal cosmic dance of creation
- They are NOT fighting - they are in perfect harmony, two halves of one whole, yin and yang of existence
- Their energies intertwine, creating spiraling aurora of gold and violet
- Between their reaching hands: a blazing point of pure creation energy

THE TEN GATES (arranged in perfect sacred decagon around the central figures):
1. Foundation Gate (174 Hz) - Lyssandria's earthen brown portal, mountain/crystal motifs
2. Flow Gate (285 Hz) - Leyla's ocean blue portal, water/moon motifs
3. Fire Gate (396 Hz) - Draconia's flame red portal, dragon/phoenix motifs
4. Heart Gate (417 Hz) - Maylinn's rose pink portal, flower/bridge motifs
5. Voice Gate (528 Hz) - Alera's sky blue portal, soundwave/crystal motifs
6. Sight Gate (639 Hz) - Lyria's violet purple portal, eye/star motifs
7. Crown Gate (741 Hz) - Aiyami's white-gold portal, lotus/halo motifs
8. Shift Gate (852 Hz) - Elara's emerald green portal, butterfly/portal motifs
9. Unity Gate (963 Hz) - Ino's pink-teal dual portal, yin-yang/linked rings motifs
10. Source Gate (1111 Hz) - Shinkami's prismatic black-white-gold portal, infinity/ouroboros motifs

Each gate should have its Guardian's symbol/silhouette visible within.

THE FIVE ELEMENTS (flowing as energy streams connecting the gates):
- FIRE (crimson-gold energy stream)
- WATER (azure-silver energy stream)
- EARTH (verdant-brown energy stream)
- WIND (white-silver energy stream)
- ARCANE (purple-gold mystical energy stream)

ENVIRONMENT:
- Deep cosmic void background (#0a0a0f) with distant nebulae and galaxies
- The Academy of Arcane Arts floating majestically at the bottom - teal crystalline spires, floating islands, luminous windows
- Constellation patterns forming the shapes of the Seven Awakened in the stars
- Sacred geometry everywhere: Flower of Life, golden spirals, Metatron's cube, platonic solids

STYLE REQUIREMENTS:
- Premium concept art quality - this should look like it belongs in a AAA game or major film
- Illuminated manuscript elegance merged with futuristic sophistication
- Rich metallic gold accents throughout (#FFD700)
- Atlantean teal highlights (#7FFFD4)
- Glass-morphism and aurora gradient effects
- NOT cartoonish or anime - elegant, mythological, timeless, museum-quality
- Hyper-detailed textures: fabric, metal, light, energy

TEXT INTEGRATION:
- "ARCANEA" in elegant serif typography (Cinzel-style) at the very top center
- Subtle golden glow behind the text

TECHNICAL:
- 16:9 ultra-wide landscape format
- Maximum detail and resolution
- Professional color grading
- Cinematic depth of field`
  },
  {
    name: 'ten-guardians-pantheon',
    filename: 'ten-guardians-pantheon.png',
    description: 'The Ten Guardians - Complete Pantheon',
    prompt: `Create an epic 16:9 wide illustration showing THE TEN GUARDIANS OF ARCANEA as a divine pantheon - the Arcanean Gods who guard the Gates of consciousness.

COMPOSITION - Arrange as a majestic semicircular pantheon:

TOP CENTER (The Source):
- SHINKAMI (Source Gate, 1111 Hz) - The Allmother/Allfather, appears as infinite recursion of consciousness, neither fully male nor female, prismatic robes of black/white/gold, holds the cosmic egg, radiates pure meta-awareness

UPPER ROW (Higher Gates):
- AIYAMI (Crown Gate, 741 Hz) - Goddess of enlightenment, pure white and gold, lotus crown, radiating divine light, serene transcendence
- ELARA (Shift Gate, 852 Hz) - Goddess of transformation, emerald-green iridescent, butterfly wings of light, metamorphic energy
- INO (Unity Gate, 963 Hz) - Goddess of partnership, dual pink and teal, holding linked rings, embodying sacred union

MIDDLE ROW (Middle Gates):
- ALERA (Voice Gate, 528 Hz) - Goddess of truth, sky blue and lavender, crystalline singing bowls, sound waves visible
- LYRIA (Sight Gate, 639 Hz) - Goddess of vision, deep violet, third eye prominent, seeing into infinite futures, stars in her eyes

LOWER ROW (Foundation Gates):
- LYSSANDRIA (Foundation Gate, 174 Hz) - Goddess of earth, rich brown and gold, mountainous, crystalline formations, roots and stones
- LEYLA (Flow Gate, 285 Hz) - Goddess of water, ocean blue and silver, flowing like liquid, moonlit, adaptive grace
- DRACONIA (Fire Gate, 396 Hz) - Goddess of fire, flame red and gold, dragon energy, volcanic passion, transformative power
- MAYLINN (Heart Gate, 417 Hz) - Goddess of love, rose pink and green, surrounded by flowers, healing light, compassion incarnate

EACH GUARDIAN SHOWS:
- Their Godbeast companion as a spirit form beside them:
  * Lyssandria + Kaelith (earth dragon)
  * Leyla + Veloura (sea serpent)
  * Draconia + Draconis (fire dragon)
  * Maylinn + Laeylinn (healing phoenix)
  * Alera + Otome (sound phoenix)
  * Lyria + Yumiko (cosmic owl)
  * Aiyami + Sol (sun lion)
  * Elara + Vaelith (shifting chimera)
  * Ino + Kyuro (twin dragons)
  * Shinkami + Amaterasu (infinite serpent)

- Their Gate's frequency number visible (174 Hz, 285 Hz, etc.)
- Their element's color aura
- Their sacred symbol

BACKGROUND:
- Cosmic temple setting with golden pillars
- Starfield and nebulae
- Sacred geometry patterns on the floor (Flower of Life)
- Soft divine light from above

STYLE:
- Renaissance master meets cosmic fantasy
- Each goddess distinct but harmonious
- Rich fabrics, divine jewelry, ethereal beauty
- Museum-quality painting level detail
- NOT anime/cartoon - realistic fantasy art

TEXT: "THE TEN GUARDIANS" in elegant gold serif at bottom`
  },
  {
    name: 'five-elements-magic-system',
    filename: 'five-elements-system.png',
    description: 'The Five Elements & Magic System',
    prompt: `Create an educational 16:9 wide infographic/illustration explaining THE FIVE ELEMENTS OF ARCANEA - the fundamental forces of magic and creation.

CENTRAL DESIGN:
- A magnificent pentagram/pentacle at center with each point representing an element
- In the very center: the ARCANE symbol (purple-gold spiral) representing the Fifth Element - consciousness itself

THE FIVE ELEMENTS (clockwise from top):

1. FIRE (Top) - Draconia's Domain
- Color: Crimson red (#FF4500) with gold (#FFD700)
- Symbolized by: Flames, phoenixes, suns, forge
- Domain: Energy, transformation, passion, will, destruction/creation
- Visual: Blazing flames, ember particles, volcanic energy
- Associated Gate: Fire Gate (396 Hz)

2. WATER (Right) - Leyla's Domain
- Color: Ocean blue (#4169E1) with silver
- Symbolized by: Waves, moon, rain, rivers
- Domain: Flow, emotion, healing, memory, adaptation
- Visual: Flowing currents, moonlit ripples, bioluminescence
- Associated Gate: Flow Gate (285 Hz)

3. EARTH (Bottom-Right) - Lyssandria's Domain
- Color: Deep brown (#8B4513) with gold
- Symbolized by: Mountains, crystals, roots, stones
- Domain: Stability, growth, foundation, endurance, grounding
- Visual: Ancient stones, growing crystals, deep caves
- Associated Gate: Foundation Gate (174 Hz)

4. WIND (Bottom-Left) - Ventus Domain
- Color: White/silver with pale blue
- Symbolized by: Swirls, feathers, clouds, birds
- Domain: Freedom, speed, change, breath, inspiration
- Visual: Flowing air currents, scattered leaves, cloud formations
- Associated Gate: Voice Gate (528 Hz) connection

5. ARCANE (Left) - The Fifth Element
- Color: Deep purple (#9370DB) with gold accents
- Symbolized by: Spirals, infinity, consciousness symbols
- Has TWO aspects:
  * VOID (Nero's aspect) - Potential, mystery, the unformed, darkness as fertile ground
  * SPIRIT (Lumina's aspect) - Consciousness, transcendence, soul, divine light
- Visual: Swirling nebula of purple and gold, stars being born
- Associated with: All Higher Gates (Sight, Crown, Shift, Unity, Source)

SHOW THE RELATIONSHIPS:
- Fire + Water = Steam (creation through opposition)
- Earth + Wind = Life (stability + change)
- All Four + Arcane = Magic (consciousness transforms matter)

ELEMENTAL CYCLE:
- Show arrows indicating: Fire -> Earth -> Water -> Wind -> Fire (transformative cycle)
- Arcane at center touches all, transforms all

VISUAL STYLE:
- Clean, elegant infographic design
- Rich textures for each element
- Sacred geometry connecting them
- Premium fantasy aesthetic, not childish
- Educational but beautiful
- Slight illuminated manuscript border

TEXT ELEMENTS:
- "THE FIVE ELEMENTS OF ARCANEA" as title
- Each element labeled with name and domain
- Brief poetic description for each

BACKGROUND:
- Deep cosmic black gradient
- Subtle star field
- Soft glow emanating from center`
  }
];

async function generateImage(config, index) {
  const { name, filename, description, prompt } = config;

  console.log(`\n[${ index + 1 }/${IMAGES_TO_GENERATE.length}] Generating: ${description}`);
  console.log(`    Model: ${MODEL} (LATEST - highest quality)`);
  console.log(`    File: ${filename}`);
  console.log('    Status: Generating... (60-120 seconds for ultra quality)');

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
            temperature: 1.2  // Higher for more creative output
          }
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error(`    ❌ API Error: ${response.status}`);
      console.error(`    ${JSON.stringify(result.error?.message || result, null, 2).substring(0, 200)}`);
      return null;
    }

    // Find image in response
    const candidates = result.candidates || [];
    for (const candidate of candidates) {
      const parts = candidate.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith('image/')) {
          // Ensure output directory exists
          const outputDir = path.join(__dirname, '..', 'assets', 'marketing');
          fs.mkdirSync(outputDir, { recursive: true });

          // Save image
          const outputPath = path.join(outputDir, filename);
          const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
          fs.writeFileSync(outputPath, imageBuffer);

          // Also save timestamped version
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
          const ext = path.extname(filename);
          const base = path.basename(filename, ext);
          const backupPath = path.join(outputDir, `${base}-${timestamp}${ext}`);
          fs.writeFileSync(backupPath, imageBuffer);

          console.log(`    ✅ SUCCESS!`);
          console.log(`    📁 Saved: ${outputPath}`);
          console.log(`    📊 Size: ${(imageBuffer.length / 1024).toFixed(1)} KB`);

          return { name, filename, path: outputPath, size: imageBuffer.length };
        }
        if (part.text) {
          console.log(`    📝 Model note: ${part.text.substring(0, 100)}...`);
        }
      }
    }

    console.error('    ❌ No image found in response');
    return null;

  } catch (error) {
    console.error(`    ❌ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('╔═══════════════════════════════════════════════════════════════════════════╗');
  console.log('║           ARCANEA INFOGENIUS - ULTRA QUALITY VISUAL GENERATION            ║');
  console.log('╠═══════════════════════════════════════════════════════════════════════════╣');
  console.log('║  Model: gemini-3-pro-image-preview (LATEST - Highest Quality)             ║');
  console.log('║  Images: ' + IMAGES_TO_GENERATE.length + ' comprehensive visuals                                        ║');
  console.log('║  Quality: Ultra (museum-grade)                                            ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════╝');

  const results = [];

  for (let i = 0; i < IMAGES_TO_GENERATE.length; i++) {
    const result = await generateImage(IMAGES_TO_GENERATE[i], i);
    if (result) results.push(result);

    // Small delay between requests to avoid rate limiting
    if (i < IMAGES_TO_GENERATE.length - 1) {
      console.log('\n    ⏳ Waiting 5 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════════════════════╗');
  console.log('║                         GENERATION COMPLETE                               ║');
  console.log('╠═══════════════════════════════════════════════════════════════════════════╣');
  console.log(`║  Successfully generated: ${results.length}/${IMAGES_TO_GENERATE.length} images                                      ║`);
  console.log('╠═══════════════════════════════════════════════════════════════════════════╣');

  results.forEach((r, i) => {
    console.log(`║  ${i + 1}. ${r.filename.padEnd(35)} (${(r.size / 1024).toFixed(0).padStart(4)} KB) ║`);
  });

  console.log('╠═══════════════════════════════════════════════════════════════════════════╣');
  console.log('║  Add to README.md:                                                        ║');
  console.log('║  ![Arcanea](./assets/marketing/arcanea-hero-ecosystem.png)                ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════╝');
}

main().catch(console.error);
