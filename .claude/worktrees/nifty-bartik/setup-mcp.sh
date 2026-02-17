#!/bin/bash

echo "🔧 MCP Configuration Setup"
echo "=========================="
echo ""

# Create MCP config directories
mkdir -p ~/.config/claude-desktop
mkdir -p ~/.config/mcp

# Copy configuration files
echo "📝 Setting up Claude Code MCP configuration..."
cp mcp-config.json ~/.config/claude-desktop/claude_desktop_config.json

# Also create for general MCP usage
echo "📝 Setting up general MCP configuration..."
cp mcp-config.json ~/.config/mcp/servers.json

echo "✅ MCP Configuration Complete!"
echo ""
echo "📍 Configuration Files Created:"
echo "   Claude Code: ~/.config/claude-desktop/claude_desktop_config.json"
echo "   General MCP: ~/.config/mcp/servers.json"
echo ""
echo "🌟 Enabled MCP Servers:"
echo "   ✅ arcanea-infogenius - Guardian AI enhanced visual generation"
echo "   ✅ nano-banana - Official image generation"
echo "   ✅ arcanea-opencode - Enhanced development tools"
echo "   ✅ starlight-intelligence - Arcanea's AI consciousness"
echo ""
echo "🔄 Next Steps:"
echo "1. Restart Claude Code (if using)"
echo "2. Test with: /arcanea-visual 'test concept'"
echo "3. Check images in: C:\\Users\\frank\\Documents\\nano-banana-images\\"
echo ""
echo "🎯 MCP servers ready to use!"