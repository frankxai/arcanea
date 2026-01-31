#!/usr/bin/env node

const { ArcaneaDB } = require('../lib/database');
const { AssetScanner } = require('../lib/scanner');
const path = require('path');

async function scanAssets() {
  console.log('🔍 CACOS Arcanea Library - Asset Scanner');
  console.log('==========================================');

  try {
    // Initialize database
    const db = new ArcaneaDB();
    await db.initialize();
    console.log('✅ Database initialized');

    // Initialize scanner
    const scanner = new AssetScanner(db);

    // Scan Arcanea directory
    const arcaniaPath = path.join(__dirname, '../..');
    console.log(`📁 Scanning: ${arcaniaPath}`);
    
    await scanner.scanDirectory(arcaniaPath);
    
    console.log('🎉 Scan completed successfully!');
    
    // Close database connection
    await db.close();
    
  } catch (error) {
    console.error('❌ Scan failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  scanAssets();
}

module.exports = { scanAssets };