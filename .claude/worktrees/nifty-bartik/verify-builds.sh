#!/bin/bash
# Arcanea TypeScript Packages - Build Verification Script
# Verifies all 4 packages built successfully

# Don't exit on error, we want to test all packages
set +e

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║          ARCANEA PACKAGES - BUILD VERIFICATION                ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

SUCCESS_COUNT=0
TOTAL_COUNT=4

# Test claude-arcanea
echo "📦 Testing claude-arcanea..."
cd claude-arcanea
if [ -f "dist/index.js" ] && [ -f "dist/cli.js" ]; then
    RESULT=$(node -e "const pkg = require('./dist/index.js'); console.log(pkg.guardians.length);" 2>&1)
    if [ "$RESULT" = "10" ]; then
        echo "   ✅ SUCCESS - 10 guardians exported"
        ((SUCCESS_COUNT++))
    else
        echo "   ❌ FAILED - Expected 10 guardians, got: $RESULT"
    fi
else
    echo "   ❌ FAILED - dist files missing"
fi
cd ..
echo ""

# Test codex-arcanea
echo "📦 Testing codex-arcanea..."
cd codex-arcanea
if [ -f "dist/index.js" ]; then
    RESULT=$(node -e "const pkg = require('./dist/index.js'); console.log(Object.keys(pkg).length);" 2>&1)
    if [ "$RESULT" -ge "8" ]; then
        echo "   ✅ SUCCESS - $RESULT exports available"
        ((SUCCESS_COUNT++))
    else
        echo "   ❌ FAILED - Expected 8+ exports, got: $RESULT"
    fi
else
    echo "   ❌ FAILED - dist files missing"
fi
cd ..
echo ""

# Test gemini-arcanea
echo "📦 Testing gemini-arcanea..."
cd gemini-arcanea
if [ -f "dist/index.js" ]; then
    RESULT=$(node --input-type=module -e "import('./dist/index.js').then(pkg => console.log(Object.keys(pkg).length));" 2>&1 | tail -1)
    if [ "$RESULT" -ge "9" ]; then
        echo "   ✅ SUCCESS - $RESULT exports available"
        ((SUCCESS_COUNT++))
    else
        echo "   ❌ FAILED - Expected 9+ exports, got: $RESULT"
    fi
else
    echo "   ❌ FAILED - dist files missing"
fi
cd ..
echo ""

# Test intelligence-os
echo "📦 Testing intelligence-os..."
cd intelligence-os
if [ -f "dist/index.js" ] && [ -f "dist/index.mjs" ]; then
    # Test CommonJS
    RESULT=$(node -e "const aios = require('./dist/index.js'); console.log(aios.listGuardians().length);" 2>&1)
    if [ "$RESULT" = "10" ]; then
        echo "   ✅ SUCCESS (CJS) - 10 guardians exported"

        # Test ESM
        ESM_RESULT=$(node --input-type=module -e "import('./dist/index.mjs').then(aios => console.log(Object.keys(aios.GATES).length));" 2>&1 | tail -1)
        if [ "$ESM_RESULT" = "10" ]; then
            echo "   ✅ SUCCESS (ESM) - 10 gates exported"
            ((SUCCESS_COUNT++))
        else
            echo "   ⚠️  ESM test warning - Expected 10 gates, got: $ESM_RESULT"
        fi
    else
        echo "   ❌ FAILED - Expected 10 guardians, got: $RESULT"
    fi
else
    echo "   ❌ FAILED - dist files missing"
fi
cd ..
echo ""

# Summary
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                         SUMMARY                                ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "Packages Verified: $SUCCESS_COUNT / $TOTAL_COUNT"
echo ""

if [ $SUCCESS_COUNT -eq $TOTAL_COUNT ]; then
    echo "🎉 ALL PACKAGES BUILT SUCCESSFULLY!"
    echo ""
    echo "✅ claude-arcanea    - CLI + SDK"
    echo "✅ codex-arcanea     - OpenAI integration"
    echo "✅ gemini-arcanea    - Gemini vision"
    echo "✅ intelligence-os   - Core AIOS library"
    echo ""
    echo "Ready for deployment! 🚀"
    exit 0
else
    echo "⚠️  $((TOTAL_COUNT - SUCCESS_COUNT)) PACKAGE(S) FAILED"
    echo ""
    echo "Run individual tests for more details."
    exit 1
fi
