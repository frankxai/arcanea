# Arcanea Project Instructions

## Next.js Development with MCP

When starting work on the Arcanea Next.js project:

1. **ALWAYS initialize next-devtools-mcp FIRST** by calling the `init` tool from the next-devtools MCP server
2. This establishes proper context for debugging, error tracking, and page metadata
3. Enables AI-assisted debugging with real-time access to:
   - Runtime and build errors
   - Development logs
   - Page and route metadata

## Project Overview

Arcanea is a social platform for magical creation, built with:
- Next.js 16 (with App Router)
- TypeScript
- Tailwind CSS
- Supabase backend

## Available MCP Servers

- **next-devtools**: Next.js runtime debugging and development tools
- **github**: Repository management, PRs, issues
- **figma-remote-mcp**: UI/UX designs and component specs
- **notion**: Project documentation and technical specs
- **linear-server**: Project management and sprint tracking
- **playwright**: Browser automation and E2E testing

## Development Workflow

1. Initialize next-devtools on session start
2. Check Linear for current sprint tasks
3. Review Notion docs for technical requirements
4. Use Figma for design references
5. Leverage Playwright for testing
