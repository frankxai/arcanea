#!/bin/bash

# Set the API key
: "${GEMINI_API_KEY:?Set GEMINI_API_KEY in your environment}"
export GEMINI_API_KEY

echo "Generating Arcanea Guardian-themed image..."

# Generate image with Draconia's Fire Guardian theme
echo '{"jsonrpc": "2.0", "id": 4, "method": "tools/call", "params": {"name": "generate_image", "arguments": {"prompt": "Draconia Fire Guardian from Arcanea - A majestic dragon Guardian surrounded by flames, with golden dragon scales, fiery orange and red energy, transformation power emanating from within, sacred geometry patterns, 528 Hz frequency resonance, magical aura, cinematic fantasy art style"}}}' | npx nano-banana-mcp