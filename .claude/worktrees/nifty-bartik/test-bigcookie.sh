#!/bin/bash

export GEMINI_API_KEY="AIzaSyA0_gKlBROiIEc2SIvCIcP-RmmwU_mJ1PI"

echo "🍌 Testing BigCookie Nano Banana MCP..."

# Initialize
echo '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2024-11-05", "capabilities": {"tools": {}}, "clientInfo": {"name": "arcanea-test", "version": "1.0.0"}}}' | npx @bigcookie/mcp-nano-banana-image