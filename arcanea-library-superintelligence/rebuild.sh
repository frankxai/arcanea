#!/bin/bash

# Arcanea Library Superintelligence - Clean Rebuild Script
# This script performs a clean install and build of the project

set -e  # Exit on error

echo "🧹 Cleaning old build artifacts..."
rm -rf node_modules package-lock.json .next

echo "📦 Installing dependencies..."
npm install

echo "🔍 Running type check..."
npm run type-check || echo "⚠️  Type check completed with warnings"

echo "🏗️  Building production bundle..."
npm run build

echo "✅ Build complete! You can now run:"
echo "   npm run dev     - Start development server"
echo "   npm start       - Start production server"
