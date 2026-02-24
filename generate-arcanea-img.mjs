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
    console.log('📝 Response:', response.text());
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    // Try with imagen instead
    console.log('🎨 Trying with Imagen 4.0...');
    try {
      const imagenModel = genAI.getGenerativeModel({ model: 'imagen-4.0-generate-001' });
      const imagenResult = await imagenModel.generateContent([prompt]);
      console.log('✅ Imagen generation successful!');
      console.log('📝 Response:', imagenResult.response.text());
    } catch (imagenError) {
      console.error('❌ Imagen error:', imagenError.message);
    }
  }
}

generateArcaneaImage();