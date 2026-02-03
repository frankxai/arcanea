/**
 * Arcanea PREMIUM Visual Generation
 * Following the strategic pivot: Confident minimalism with moments of magic
 *
 * Model: gemini-3-pro-image-preview (LATEST)
 * Aesthetic: Linear/Vercel/Notion quality - NOT fantasy illustration
 */

const fs = require('fs');
const path = require('path');

const API_KEY = 'AIzaSyBv2def7r-0VqmWQ6fkUqgS1q2eR9MjKdc';
const MODEL = 'gemini-3-pro-image-preview';

const PREMIUM_IMAGES = [
  {
    name: 'arcanea-hero-premium',
    filename: 'arcanea-hero-premium.png',
    description: 'Premium Hero - Abstract Ten Gates',
    prompt: `Create an ultra-premium, minimalist hero image for Arcanea - a creative operating system.

CONCEPT:
Ten concentric rings (representing the Ten Gates) rendered in elegant thin gold lines on a deep black background. The rings are not solid - they're made of delicate geometric patterns. At the center: a single luminous point of teal light (#7fffd4).

STYLE REFERENCE:
- The precision of astronomical diagrams
- The elegance of Linear and Vercel branding
- Apple product photography lighting
- Luxury watch marketing

COMPOSITION:
- 16:9 ultra-wide format
- Perfect symmetry
- The ten rings grow larger from center, each slightly more complex in pattern
- Subtle gradient from pure black (#0a0a0f) at edges to slightly lighter at center
- One accent: the teal core glow
- MAYBE one or two rings have a subtle gold (#ffd700) glow

WHAT THIS IS NOT:
- Not fantasy illustration
- No characters, no guardians, no dragons
- No cosmic nebulae or galaxy backgrounds
- No glowing magical effects everywhere
- No ornate frames or decorations

QUALITY:
- Clean, vector-like precision
- Museum-quality minimalism
- The kind of image that would look at home on Stripe or Notion's homepage
- Timeless, not trendy
- Premium, not pretty

The image should feel like: "This is serious creative infrastructure" not "This is a fantasy game."

Text: None. Pure visual.`
  },
  {
    name: 'arcanea-gates-diagram',
    filename: 'arcanea-gates-diagram.png',
    description: 'Premium Gates Framework Diagram',
    prompt: `Create a premium infographic showing the Ten Gates of Arcanea as a professional framework diagram.

CONCEPT:
A vertical progression diagram showing 10 levels/gates, styled like a premium SaaS product diagram or a professional certification pathway.

DESIGN LANGUAGE:
- Clean, geometric, almost architectural
- Think: Linear roadmap UI, Notion's minimal illustrations
- Each gate is a horizontal bar or node, not a fantasy portal
- Connected by thin elegant lines

THE TEN GATES (bottom to top):
1. Foundation - represented by a stable square
2. Flow - represented by a wave pattern
3. Fire - represented by a triangle/arrow up
4. Heart - represented by a circle
5. Voice - represented by sound wave bars
6. Sight - represented by an eye shape (geometric, not realistic)
7. Crown - represented by a simple arc
8. Shift - represented by transformation arrows
9. Unity - represented by interlocking shapes
10. Source - represented by an infinite loop or ouroboros

COLOR SCHEME:
- Background: #0d1117 (GitHub dark) or pure black
- Lines and shapes: Thin white or light gray
- One accent per gate (very subtle): teal for lower gates, transitioning to gold for Source
- Overall: 90% monochrome with strategic color

TYPOGRAPHY:
- Gate names in clean sans-serif (like Inter or Söhne)
- Placed elegantly beside each gate symbol
- No fantasy fonts

WHAT THIS IS NOT:
- Not a fantasy illustration
- No glowing magical effects
- No characters or figures
- No ornate decorations
- No crowded visual noise

The image should look like it belongs in a Y Combinator pitch deck or on Stripe's documentation, not on a fantasy book cover.

Format: 16:9 or 4:3 landscape
Quality: Vector-like precision, premium SaaS aesthetic`
  },
  {
    name: 'arcanea-wordmark',
    filename: 'arcanea-wordmark.png',
    description: 'Premium ARCANEA Typography',
    prompt: `Create a premium typographic hero image featuring the word "ARCANEA".

CONCEPT:
The word ARCANEA in elegant, confident typography - inspired by luxury brand wordmarks.

TYPOGRAPHY:
- Font style: Extended sans-serif or elegant serif (like Times New Roman but modern)
- Weight: Medium to bold, but not heavy
- Letter spacing: Generous, luxurious tracking
- All caps or title case - whichever feels more elegant

TREATMENT:
- The letters could have a subtle gradient: white to light teal
- OR pure white on black
- OR the 'A's could be slightly accented (teal or gold)
- Very subtle glow or shadow to give depth

BACKGROUND:
- Pure black (#0a0a0f) or very dark charcoal
- Could have extremely subtle geometric patterns (barely visible)
- Or texture like fine paper grain

COMPOSITION:
- Centered, generous margins
- The word should breathe
- Maybe a subtle line or minimal symbol below (like the ® or a thin line)

WHAT THIS IS NOT:
- Not fantasy script or medieval font
- No ornate decorations around the letters
- No cosmic swirls or magical effects
- No colors except black, white, teal, gold

REFERENCE BRANDS:
- Apple's product naming
- Anthropic's wordmark
- Linear's typography
- Notion's confident simplicity

Format: 16:9 or 2:1 wide
Quality: Typography should be pixel-perfect, logo-worthy`
  }
];

async function generateImage(config, index) {
  const { name, filename, description, prompt } = config;

  console.log(`\n[${index + 1}/${PREMIUM_IMAGES.length}] ${description}`);
  console.log(`    Model: ${MODEL}`);
  console.log(`    Generating with PREMIUM aesthetic...`);

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
            temperature: 0.9
          }
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error(`    ERROR: ${response.status}`);
      console.error(`    ${result.error?.message || JSON.stringify(result)}`);
      return null;
    }

    const candidates = result.candidates || [];
    for (const candidate of candidates) {
      const parts = candidate.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith('image/')) {
          const outputDir = path.join(__dirname, '..', 'assets', 'premium');
          fs.mkdirSync(outputDir, { recursive: true });

          const outputPath = path.join(outputDir, filename);
          const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
          fs.writeFileSync(outputPath, imageBuffer);

          console.log(`    SUCCESS: ${outputPath}`);
          console.log(`    Size: ${(imageBuffer.length / 1024).toFixed(0)} KB`);

          return { name, filename, path: outputPath, size: imageBuffer.length };
        }
        if (part.text) {
          console.log(`    Note: ${part.text.substring(0, 100)}...`);
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
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  ARCANEA PREMIUM VISUAL GENERATION');
  console.log('  Aesthetic: Linear/Vercel/Notion quality');
  console.log('  Model: gemini-3-pro-image-preview');
  console.log('═══════════════════════════════════════════════════════════════');

  const results = [];

  for (let i = 0; i < PREMIUM_IMAGES.length; i++) {
    const result = await generateImage(PREMIUM_IMAGES[i], i);
    if (result) results.push(result);

    if (i < PREMIUM_IMAGES.length - 1) {
      console.log('\n    Waiting 5s...');
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  console.log('\n');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`  COMPLETE: ${results.length}/${PREMIUM_IMAGES.length} generated`);
  console.log('═══════════════════════════════════════════════════════════════');

  results.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.filename} (${(r.size / 1024).toFixed(0)} KB)`);
  });

  console.log('\n  Output: assets/premium/');
  console.log('');
}

main().catch(console.error);
