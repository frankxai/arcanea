import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyA0_gKlBROiIEc2SIvCIcP-RmmwU_mJ1PI';
const genAI = new GoogleGenerativeAI(API_KEY);

async function testGeminiModels() {
  console.log('Testing Gemini models...');
  
  try {
    // List available models
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const models = await response.json();
    
    console.log('Available models:');
    models.models?.forEach(model => {
      if (model.name.includes('image') || model.name.includes('vision') || model.name.includes('pro')) {
        console.log(`- ${model.name}: ${model.description || 'No description'}`);
      }
    });
    
    // Try to use gemini-2.0-flash-exp for image generation
    console.log('\nTesting image generation with gemini-2.0-flash-exp...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const result = await model.generateContent([
      "Generate an image of a majestic dragon Guardian surrounded by flames, golden scales, powerful aura, fantasy art style"
    ]);
    
    console.log('Generation result:', result.response.text());
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testGeminiModels();