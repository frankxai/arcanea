const fs = require('fs');
const path = require('path');

const API_KEY = 'AIzaSyBv2def7r-0VqmWQ6fkUqgS1q2eR9MjKdc';

// LATEST MODEL: gemini-3-pro-image-preview (highest quality)
// Alternative: gemini-2.5-flash-image (faster, lower quality)
const MODEL = 'gemini-3-pro-image-preview';

const prompt = `Generate a premium 16:9 wide hero banner image for the Arcanea project.

COMPOSITION:
- Central cosmic scene: luminous golden-white goddess figure (Lumina) and void purple-black god figure (Nero) in elegant cosmic dance, balanced duality NOT fighting
- Ten glowing sacred gates arranged in sacred geometric decagon pattern around them, each different color: earth brown, ocean blue, flame red, rose pink, sky blue, violet purple, white-gold, emerald green, pink-teal, black-white-gold prismatic
- Five elemental energy streams flowing: fire-red, water-blue, earth-green, wind-white, arcane-purple-gold
- Majestic fantasy academy castle silhouette with floating islands in lower background
- Subtle constellation star patterns
- Premium glass-morphism and aurora gradient effects
- Sacred geometry: golden ratio spirals, Flower of Life patterns

STYLE:
- Illuminated medieval manuscript elegance + epic fantasy concept art + futuristic sophistication
- Rich metallic gold accents throughout
- Deep cosmic black (#0a0a0f) with luminous highlights
- Atlantean teal (#7fffd4) and celestial gold (#ffd700) as accent colors
- Professional, premium, sophisticated aesthetic
- NOT cartoonish - elegant, mythological, timeless
- Museum-quality ultra-detailed
- Wide 16:9 landscape format

Leave space at top for elegant ARCANEA typography.`;

async function generateImage() {
  console.log('╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║         ARCANEA INFOGENIUS - GENERATING HERO BANNER               ║');
  console.log('╠═══════════════════════════════════════════════════════════════════╣');
  console.log('║  Model: Gemini 2.5 Flash Image                                    ║');
  console.log('║  Quality: Ultra                                                   ║');
  console.log('║  Aspect: 16:9 (GitHub README banner)                              ║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('Generating... This may take 30-60 seconds...');
  console.log('');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ['IMAGE', 'TEXT'],
          temperature: 1.0
        }
      })
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.error('API Error:', response.status);
    console.error(JSON.stringify(result, null, 2));
    return;
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

        // Save main image
        const outputPath = path.join(outputDir, 'arcanea-hero-banner.png');
        const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
        fs.writeFileSync(outputPath, imageBuffer);

        // Also save timestamped version
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
        const backupPath = path.join(outputDir, `arcanea-hero-banner-${timestamp}.png`);
        fs.writeFileSync(backupPath, imageBuffer);

        console.log('╔═══════════════════════════════════════════════════════════════════╗');
        console.log('║                    SUCCESS! IMAGE GENERATED                       ║');
        console.log('╠═══════════════════════════════════════════════════════════════════╣');
        console.log(`║  Path: ${outputPath}`);
        console.log(`║  Size: ${(imageBuffer.length / 1024).toFixed(1)} KB`);
        console.log(`║  Type: ${part.inlineData.mimeType}`);
        console.log('╠═══════════════════════════════════════════════════════════════════╣');
        console.log('║  Add to README.md:                                                ║');
        console.log('║  ![Arcanea](./assets/marketing/arcanea-hero-banner.png)           ║');
        console.log('╚═══════════════════════════════════════════════════════════════════╝');
        return;
      }
      if (part.text) {
        console.log('Model note:', part.text.substring(0, 300));
      }
    }
  }

  // If no image found, show full response for debugging
  console.log('No image found in response. Full response:');
  console.log(JSON.stringify(result, null, 2).substring(0, 3000));
}

generateImage().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
