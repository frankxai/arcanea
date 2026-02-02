#!/usr/bin/env node

const { ArcaneaDB } = require('../lib/database');
const { VisionAnalyzer } = require('../lib/vision');

async function analyzeVision() {
  console.log('🧠 CACOS Arcanea Library - Vision Analysis');
  console.log('=============================================');

  try {
    // Initialize database
    const db = new ArcaneaDB();
    await db.initialize();
    console.log('✅ Database initialized');

    // Initialize vision analyzer
    const analyzer = new VisionAnalyzer(db);

    // Analyze assets
    await analyzer.batchAnalyze();
    
    console.log('🎯 Vision analysis completed successfully!');
    
    // Close database connection
    await db.close();
    
  } catch (error) {
    console.error('❌ Vision analysis failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  analyzeVision();
}

module.exports = { analyzeVision };