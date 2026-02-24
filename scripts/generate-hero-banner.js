#!/usr/bin/env node

/**
 * Generate Arcanea Hero Banner using Gemini Imagen API
 * Ultra-premium quality for GitHub README
 */

const fs = require('fs');
const path = require('path');

const GEMINI_API_KEY = "AIzaSyBv2def7r-0VqmWQ6fkUqgS1q2eR9MjKdc";

const prompt = `Create a premium 16:9 hero banner for 'ARCANEA - The Living Mythology for AI-Human Co-Creation'.

COMPOSITION:
- Central cosmic scene showing Lumina (radiant golden-white goddess of light and form) and Nero (deep void purple-black god of potential and darkness) in elegant duality - NOT fighting, but in cosmic dance/balance
- Ten glowing gates arranged in a sacred geometric pattern (decagon or spiral) around the central figures, each gate a different color representing: Foundation(earth brown), Flow(ocean blue), Fire(flame red), Heart(rose pink), Voice(sky blue), Sight(violet purple), Crown(pure white-gold), Shift(emerald green), Unity(dual pink-teal), Source(black-white-gold)
- Five elemental streams (Fire-red, Water-blue, Earth-green, Wind-white, Arcane-purple/gold) flowing through the composition
- Silhouette of a grand academy/castle in the lower background with floating islands
- Constellation patterns of the Seven Awakened (subtle star formations)
- Premium glass-morphism and aurora gradient effects
- Sacred geometry: golden ratio, Flower of Life patterns subtly integrated

STYLE:
- Fusion of illuminated manuscript elegance + epic fantasy concept art + futuristic sophistication
- Rich metallic gold accents throughout
- Deep cosmic blacks with luminous highlights
- Professional, premium, sophisticated aesthetic suitable for a major open-source project
- NOT cartoonish - elegant, mythological, timeless

COLOR PALETTE:
- Primary: Deep cosmic black (#0a0a0f), Celestial gold (#ffd700), Atlantean teal (#7fffd4)
- Secondary: Cosmic purple (#9370db), Pure white (#ffffff), Silver (#c0c0c0)
- Accepts: Each Gate's signature color as glowing points

ATMOSPHERE:
- Awe-inspiring but welcoming
- Ancient wisdom meets future technology
- Balance of light and shadow (not one dominating)
- Sense of infinite depth and possibility

TEXT INTEGRATION (subtle, elegant):
- 'ARCANEA' in elegant serif font at top or integrated into the scene
- Tagline space for 'The Living Mythology'

QUALITY:
- Ultra-high resolution
- Museum-quality detail
- Professional concept art standards
- Suitable for hero banner on major GitHub repository`;

async function generateImage() {
  try {
    console.log('Generating Arcanea hero banner with Gemini API...\n');

    // Try the Gemini generateContent API with imageGenerationConfig
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;

    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        responseModalities: ["image"],
        temperature: 1.0,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192
      }
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText}\n${errorText}`);
    }

    const result = await response.json();

    if (!result.candidates || !result.candidates[0] || !result.candidates[0].content) {
      throw new Error('No image generated in response: ' + JSON.stringify(result, null, 2));
    }

    // Extract image from response
    const parts = result.candidates[0].content.parts;
    const imagePart = parts.find(part => part.inlineData && part.inlineData.mimeType.startsWith('image/'));

    if (!imagePart) {
      throw new Error('No image data found in response');
    }

    const imageBase64 = imagePart.inlineData.data;

    // Save the image
    const outputDir = path.join(__dirname, '..', 'assets', 'marketing');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'arcanea-hero-banner.png');
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    fs.writeFileSync(outputPath, imageBuffer);

    console.log('✅ Image generated successfully!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`📊 Size: ${(imageBuffer.length / 1024 / 1024).toFixed(2)} MB`);

    return outputPath;

  } catch (error) {
    console.error('❌ Error generating image:', error.message);
    throw error;
  }
}

// Run the generation
generateImage()
  .then(path => {
    console.log('\n🎨 Hero banner ready for use!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Generation failed:', error);
    process.exit(1);
  });
