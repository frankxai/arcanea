#!/usr/bin/env node

/**
 * Generate Arcanea Hero Banner using DALL-E 3
 *
 * Setup:
 * 1. Get API key from https://platform.openai.com/api-keys
 * 2. Set OPENAI_API_KEY environment variable OR edit the key below
 * 3. Run: node scripts/generate-with-dalle3.js
 */

const fs = require('fs');
const path = require('path');

// CONFIGURATION
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "your-openai-api-key-here";

const prompt = `A premium 16:9 hero banner showcasing cosmic duality: luminous golden-white goddess Lumina and void purple-black god Nero performing an elegant cosmic dance in perfect balance. Ten radiant gates form a sacred geometric pattern around them - each glowing in distinct colors: earthy brown, ocean blue, flame red, rose pink, sky blue, deep violet, pristine white-gold, emerald green, pink-and-teal fusion, and pure monochrome. Five elemental energy streams weave through the scene in vivid colors: fiery red, aqua blue, verdant green, silvery white, and mystical purple-gold. Majestic fantasy academy silhouette with floating islands anchors the composition. Subtle star constellations. Premium glass-morphism effects with aurora gradients. Sacred geometric patterns: golden ratio spirals, Flower of Life mandalas. Art style fuses illuminated medieval manuscripts with epic fantasy concept art and sleek futuristic aesthetics. Rich metallic gold highlights. Deep cosmic black void with radiant light sources. Museum-quality professional detail. Elegant, mythological, timeless - never cartoonish. Space reserved for elegant serif 'ARCANEA' typography.`;

async function generateWithDALLE() {
  try {
    console.log('🎨 Generating Arcanea Hero Banner with DALL-E 3...\n');

    if (OPENAI_API_KEY === "your-openai-api-key-here") {
      throw new Error('Please set OPENAI_API_KEY environment variable or edit the script');
    }

    console.log('📝 Prompt length:', prompt.length, 'characters');
    console.log('⚙️  Model: DALL-E 3 HD');
    console.log('📐 Size: 1792x1024 (16:9 aspect ratio)');
    console.log('🚀 Sending request to OpenAI...\n');

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1792x1024', // Closest to 16:9
        quality: 'hd',
        style: 'vivid' // 'vivid' for more dramatic, 'natural' for more realistic
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`OpenAI API Error: ${JSON.stringify(result, null, 2)}`);
    }

    console.log('✅ Image generated successfully!');

    // DALL-E 3 often refines the prompt - show what it actually used
    if (result.data[0].revised_prompt) {
      console.log('\n📄 DALL-E 3 Revised Prompt:');
      console.log(result.data[0].revised_prompt);
    }

    const imageUrl = result.data[0].url;
    console.log('\n🔗 Image URL:', imageUrl);
    console.log('⏱️  URL expires in 1 hour - downloading now...\n');

    // Download the image
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Create output directory
    const outputDir = path.join(__dirname, '..', 'assets', 'marketing');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save with timestamp for version tracking
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    const outputPath = path.join(outputDir, 'arcanea-hero-banner.png');
    const versionPath = path.join(outputDir, `arcanea-hero-banner-${timestamp}.png`);

    fs.writeFileSync(outputPath, imageBuffer);
    fs.writeFileSync(versionPath, imageBuffer);

    console.log('💾 Image saved to:');
    console.log('   Main:', outputPath);
    console.log('   Backup:', versionPath);
    console.log(`\n📊 Size: ${(imageBuffer.length / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📏 Dimensions: 1792 x 1024 pixels`);

    // Save metadata
    const metadataPath = path.join(outputDir, `arcanea-hero-banner-${timestamp}.json`);
    fs.writeFileSync(metadataPath, JSON.stringify({
      generatedAt: new Date().toISOString(),
      model: 'dall-e-3',
      quality: 'hd',
      style: 'vivid',
      size: '1792x1024',
      originalPrompt: prompt,
      revisedPrompt: result.data[0].revised_prompt || null,
      url: imageUrl
    }, null, 2));

    console.log('📋 Metadata saved to:', metadataPath);
    console.log('\n✨ Done! Your hero banner is ready to use!');

    return outputPath;

  } catch (error) {
    console.error('\n❌ Error:', error.message);

    if (error.message.includes('API')) {
      console.error('\n💡 Troubleshooting:');
      console.error('1. Check your OpenAI API key is valid');
      console.error('2. Ensure you have credits in your OpenAI account');
      console.error('3. Visit https://platform.openai.com/account/billing');
    }

    throw error;
  }
}

// Execute
if (require.main === module) {
  generateWithDALLE()
    .then(() => {
      console.log('\n🎉 Generation complete!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 Generation failed');
      process.exit(1);
    });
}

module.exports = { generateWithDALLE };
