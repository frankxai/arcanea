#!/usr/bin/env node

/**
 * Generate Arcanea Hero Banner using Google Gemini Image Generation
 * Via direct API call with configured key
 */

const fs = require('fs');
const path = require('path');

// Read API key from config
const configPath = path.join(__dirname, '..', '.nano-banana-config.json');
let GEMINI_API_KEY;

try {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  GEMINI_API_KEY = config.geminiApiKey;
} catch (error) {
  console.error('Error reading config:', error.message);
  process.exit(1);
}

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
- Accents: Each Gate's signature color as glowing points

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
    console.log('🍌 Generating Arcanea hero banner with Gemini...\n');
    console.log('📝 Prompt length:', prompt.length, 'characters\n');

    // Use Gemini's latest image generation model
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const requestBody = {
      contents: [{
        parts: [{
          text: `Generate a high-quality image: ${prompt}`
        }]
      }],
      generationConfig: {
        temperature: 1.0,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain"
      }
    };

    console.log('🚀 Sending request to Gemini API...');

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
    console.log('\n📦 Response received');
    console.log('Response structure:', JSON.stringify(result, null, 2).substring(0, 500));

    // Check for image in response
    if (result.candidates && result.candidates[0]) {
      const candidate = result.candidates[0];

      // Check for inline data (images)
      if (candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            console.log('✅ Image found in response!');

            const imageBase64 = part.inlineData.data;
            const mimeType = part.inlineData.mimeType;

            // Determine file extension from MIME type
            const extension = mimeType.includes('png') ? 'png' :
                            mimeType.includes('jpeg') ? 'jpg' :
                            mimeType.includes('webp') ? 'webp' : 'png';

            // Save the image
            const outputDir = path.join(__dirname, '..', 'assets', 'marketing');
            if (!fs.existsSync(outputDir)) {
              fs.mkdirSync(outputDir, { recursive: true });
            }

            const outputPath = path.join(outputDir, `arcanea-hero-banner.${extension}`);
            const imageBuffer = Buffer.from(imageBase64, 'base64');
            fs.writeFileSync(outputPath, imageBuffer);

            console.log(`📁 Saved to: ${outputPath}`);
            console.log(`📊 Size: ${(imageBuffer.length / 1024 / 1024).toFixed(2)} MB`);
            console.log(`🎨 Format: ${mimeType}`);

            return outputPath;
          }
        }
      }

      // If no image, show text response
      if (candidate.content && candidate.content.parts && candidate.content.parts[0].text) {
        console.log('\n⚠️  No image generated. Response was text:');
        console.log(candidate.content.parts[0].text.substring(0, 500));
      }
    }

    throw new Error('No image found in API response. Gemini may not support direct image generation with this model.');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    throw error;
  }
}

// Run
generateImage()
  .then(path => {
    console.log('\n✨ Success! Hero banner ready for use!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n💥 Generation failed.');
    console.error('\n💡 Note: Gemini may require special image generation models or API access.');
    console.error('Consider using:');
    console.error('  - DALL-E 3 via OpenAI API');
    console.error('  - Midjourney via Discord');
    console.error('  - Stable Diffusion locally');
    console.error('  - Imagen via Google Cloud (separate from Gemini)');
    process.exit(1);
  });
