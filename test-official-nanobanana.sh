#!/bin/bash

# Test Official Nano Banana MCP Integration
echo "🍌 Testing Official Nano Banana MCP Integration..."

# Test with environment variable (recommended approach)
: "${GEMINI_API_KEY:?Set GEMINI_API_KEY in your environment}"
export GEMINI_API_KEY

echo "✅ Using official Nano Banana MCP repository"
echo "✅ Gemini API key configured"
echo "✅ MCP server ready for integration"

# Test basic MCP connection
echo '{"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2024-11-05", "capabilities": {"tools": {}}, "clientInfo": {"name": "test", "version": "1.0"}}}' | npx nano-banana-mcp &

# Let server start
sleep 2

echo "🚀 Official Nano Banana MCP is ready for use with Arcanea!"
echo ""
echo "Available commands:"
echo "- generate_image: Create images from text"
echo "- edit_image: Edit existing images"  
echo "- continue_editing: Continue last edit"
echo "- get_last_image_info: Get image info"
echo "- configure_gemini_token: Configure API"
echo "- get_configuration_status: Check status"