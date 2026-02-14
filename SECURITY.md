# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Arcanea, please report it responsibly.

**Do not open a public issue.** Instead:

1. Email **security@arcanea.ai** with a description of the vulnerability
2. Include steps to reproduce, impact assessment, and any suggested fixes
3. Allow up to 72 hours for initial response

## Scope

This policy covers:
- The Arcanea monorepo and all packages
- API routes and authentication flows
- Supabase RLS policies and data access
- AI model routing and prompt handling
- MCP server integrations

## Supported Versions

| Version | Supported |
|:--------|:----------|
| main    | Yes       |
| < main  | No        |

## Security Measures

Arcanea implements:
- TypeScript strict mode with no `any` types
- Supabase Row Level Security on all tables
- OIDC authentication on Vercel (zero API keys in production)
- Input sanitization on all user-facing endpoints
- Rate limiting on API routes
- Trivy vulnerability scanning in CI
- npm audit on every build

## Acknowledgments

We credit all security researchers who report valid vulnerabilities in our release notes.
