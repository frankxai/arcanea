import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyA0_gKlBROiIEc2SIvCIcP-RmmwU_mJ1PI';
const genAI = new GoogleGenerativeAI(API_KEY);

async function generateArcaneaImage() {
  console.log('🌟 Generating Arcanea Guardian Image...');
  
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-image' });
    
    const prompt = `Draconia Fire Guardian from Arcanea Intelligence OS
Majestic dragon Guardian with golden scales surrounded by transformative flames
528 Hz frequency energy emanating from within
Sacred geometry patterns in the fire
Powerful orange and red aura
Cinematic fantasy art style
Ultra detailed, epic composition`;

    console.log('🔥 Prompt:', prompt);
    console.log('⏳ Generating...');
    
    const result = await model.generateContent([prompt]);
    const response = result.response;
    
    console.log('✅ Generation successful!');
    console.log('🔗 Full response:', response);
    
    // Try to get candidate data
    if (response.candidates && response.candidates[0]) {
      const candidate = response.candidates[0];
      console.log('📸 Candidate:', JSON.stringify(candidate, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

generateArcaneaImage();