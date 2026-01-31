#!/bin/bash

export GEMINI_API_KEY="AIzaSyA0_gKlBROiIEc2SIvCIcP-RmmwU_mJ1PI"

echo "📋 Listing BigCookie Nano Banana Tools..."

# Initialize then list tools
(echo '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2024-11-05", "capabilities": {"tools": {}}, "clientInfo": {"name": "arcanea-test", "version": "1.0.0"}}}' && sleep 1 && echo '{"jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {}}') | npx @bigcookie/mcp-nano-banana-image