#!/bin/bash

# Direct Gemini API image generation test
GEMINI_API_KEY="AIzaSyA0_gKlBROiIEc2SIvCIcP-RmmwU_mJ1PI"

echo "Testing direct Gemini API for image generation..."

# Check available models first
echo "Checking available Gemini models..."
curl -H "Content-Type: application/json" \
     -H "x-goog-api-key: $GEMINI_API_KEY" \
     -X GET "https://generativelanguage.googleapis.com/v1beta/models?key=$GEMINI_API_KEY" \
     2>/dev/null | grep -o '"name":"[^"]*"' | head -10