#!/bin/bash

export GEMINI_API_KEY="AIzaSyA0_gKlBROiIEc2SIvCIcP-RmmwU_mJ1PI"

echo "🐉 Generating Arcanea Draconia Fire Guardian..."

# Generate the image
echo '{"jsonrpc": "2.0", "id": 4, "method": "tools/call", "params": {"name": "generate_image", "arguments": {"prompt": "Draconia Fire Guardian from Arcanea Intelligence OS - Majestic dragon Guardian with golden scales surrounded by transformative flames, 528 Hz frequency energy emanating from within, sacred geometry patterns in fire, powerful orange and red aura, cinematic fantasy art style, ultra detailed, epic composition"}}}' | npx nano-banana-mcp