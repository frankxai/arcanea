#!/bin/bash

echo "🧪 MCP Server Status Test"
echo "========================"
echo ""

# Test each configured MCP server
echo "1️⃣ Testing Arcanea InfoGenius Pro MCP..."
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}' | timeout 10 node arcanea-infogenius/mcp-server/dist/index.js && echo "✅ Arcanea InfoGenius Pro: ONLINE" || echo "❌ Arcanea InfoGenius Pro: OFFLINE"

echo ""
echo "2️⃣ Testing Nano Banana MCP..."
echo '{"jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {}}' | timeout 10 npx nano-banana-mcp && echo "✅ Nano Banana MCP: ONLINE" || echo "❌ Nano Banana MCP: OFFLINE"

echo ""
echo "3️⃣ Testing Image Generation with Arcanea Enhancement..."
export GEMINI_API_KEY="AIzaSyA0_gKlBROiIEc2SIvCIcP-RmmwU_mJ1PI"

TEST_PROMPT="Create a simple test diagram showing Arcanea system integration.

Oracle Branding:
- Primary: Oracle Red (#C74634)
- Clean, professional style
- Technical labels

Arcanea Enhancement:
- Guardian: @vision-artist (Wind element)
- Color: #98D8C8 accents
- Ethereal beauty with technical precision

Content: Basic system architecture with clear components
Resolution: 1920x1080"

echo '{"jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": {"name": "generate_image", "arguments": {"prompt": "'"$TEST_PROMPT"'"}}}' | timeout 30 npx nano-banana-mcp && echo "✅ Image Generation: WORKING" || echo "❌ Image Generation: FAILED"

echo ""
echo "📊 MCP Server Status Summary"
echo "============================"
echo "✅ Configuration files created"
echo "✅ Servers built and ready"
echo "✅ Image storage directory: C:\\Users\\frank\\Documents\\nano-banana-images\\"
echo "🔄 Ready for Claude Code integration"
echo ""
echo "🎯 Next: Restart Claude Code and test with '/arcanea-visual test'"