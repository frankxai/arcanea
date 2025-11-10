# Arcanea MVP - DevOps Documentation

Complete DevOps infrastructure for deploying and maintaining the Arcanea MVP platform.

## Documentation Overview

This directory contains all documentation needed to deploy, monitor, and maintain the Arcanea MVP in production.

### Quick Links

- **[Quick Start Guide](./QUICK_START.md)** - Get up and running in 30 minutes
- **[Deployment Guide](./DEPLOYMENT.md)** - Comprehensive deployment procedures
- **[Monitoring Guide](./MONITORING.md)** - Observability and performance tracking
- **[Security Guide](./SECURITY.md)** - Security best practices and configuration

---

## What's Included

### Infrastructure Files

Located in the project root:

```
/arcanea/
├── vercel.json                      # Vercel deployment configuration
├── .env.mvp.example                 # Environment variables template
├── .github/workflows/
│   └── mvp-deploy.yml              # CI/CD pipeline
└── docs/mvp/
    ├── README.md                   # This file
    ├── QUICK_START.md             # Fast deployment guide
    ├── DEPLOYMENT.md              # Detailed deployment guide
    ├── MONITORING.md              # Monitoring & observability
    └── SECURITY.md                # Security configuration
```

### Key Features

1. **Automated Deployment**
   - Push to main → Automatic production deploy
   - Pull Request → Automatic preview deploy
   - Zero-downtime deployments
   - Automatic rollback on failure

2. **Comprehensive Monitoring**
   - Real-time analytics
   - Performance tracking
   - Error monitoring
   - Cost tracking

3. **Security Hardened**
   - Row Level Security (RLS)
   - Rate limiting
   - CORS & CSP configuration
   - Secrets management

4. **Production Ready**
   - Health checks
   - Database migrations
   - Caching strategy
   - CDN configuration

---

## Architecture Overview

### Technology Stack

```
┌─────────────────────────────────────────────┐
│           Frontend (Next.js 14)              │
│  - React Server Components                   │
│  - App Router                                │
│  - TypeScript                                │
└──────────────┬──────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────┐
│         Hosting (Vercel)                     │
│  - Edge Network                              │
│  - Serverless Functions                      │
│  - Analytics                                 │
└──────────────┬──────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────┐
│       Database (Supabase)                    │
│  - PostgreSQL                                │
│  - Authentication                            │
│  - Storage                                   │
│  - Real-time                                 │
└──────────────┬──────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────┐
│           AI Services                        │
│  - Google Gemini (Images)                    │
│  - Anthropic Claude (Stories)                │
│  - OpenRouter (Fallback)                     │
└─────────────────────────────────────────────┘
```

### Deployment Flow

```
Developer → Git Push → GitHub
                          ↓
                    GitHub Actions
                          ↓
              ┌───────────┴───────────┐
              ↓                       ↓
        Security Audit          Type Check
              ↓                       ↓
           Linting                 Build
              ↓                       ↓
              └───────────┬───────────┘
                          ↓
                    Vercel Deploy
                          ↓
                   Health Check
                          ↓
              ┌───────────┴───────────┐
              ↓                       ↓
           Success              Rollback
```

---

## Getting Started

### Prerequisites

Before deploying, you need:

- [ ] GitHub account with repo access
- [ ] Vercel account (Pro recommended)
- [ ] Supabase account
- [ ] Node.js 18+ installed
- [ ] pnpm 8+ installed

### Initial Setup (Choose Your Path)

#### Fast Track (30 minutes)

Follow the **[Quick Start Guide](./QUICK_START.md)** for streamlined setup.

#### Comprehensive (2 hours)

Follow the **[Deployment Guide](./DEPLOYMENT.md)** for detailed setup with all options.

### Deployment Checklist

Use this checklist to ensure everything is configured:

- [ ] **Supabase Project Created**
  - [ ] Database initialized
  - [ ] RLS policies configured
  - [ ] Storage buckets created
  - [ ] Authentication enabled

- [ ] **Environment Variables Set**
  - [ ] Supabase credentials
  - [ ] AI API keys
  - [ ] NextAuth secrets
  - [ ] Production URLs

- [ ] **Vercel Project Connected**
  - [ ] Repository linked
  - [ ] Environment variables added
  - [ ] Build settings configured
  - [ ] Custom domain added (optional)

- [ ] **GitHub Actions Configured**
  - [ ] Secrets added to repository
  - [ ] Workflows enabled
  - [ ] First deployment successful

- [ ] **Security Configured**
  - [ ] RLS enabled on all tables
  - [ ] Rate limiting implemented
  - [ ] CORS configured
  - [ ] Security headers set

- [ ] **Monitoring Setup**
  - [ ] Vercel Analytics enabled
  - [ ] Error tracking configured
  - [ ] Health checks working
  - [ ] Alerts configured

---

## Daily Operations

### Deployment

**Automatic (Recommended):**

```bash
# Push to main for production
git push origin main

# Create PR for preview
git push origin feature-branch
# Then create PR on GitHub
```

**Manual:**

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

### Monitoring

**Check Application Health:**

```bash
# Via API
curl https://arcanea.ai/api/health

# Via Vercel CLI
vercel logs --follow
```

**View Dashboards:**

1. **Vercel Dashboard** - [vercel.com/arcanea](https://vercel.com)
   - Analytics
   - Logs
   - Performance

2. **Supabase Dashboard** - [app.supabase.com](https://app.supabase.com)
   - Database health
   - API logs
   - Storage usage

3. **GitHub Actions** - [github.com/frankxai/arcanea/actions](https://github.com/frankxai/arcanea/actions)
   - CI/CD status
   - Build logs
   - Deployment history

### Maintenance

**Weekly:**
- [ ] Review error logs
- [ ] Check performance metrics
- [ ] Monitor API usage and costs
- [ ] Review security events

**Monthly:**
- [ ] Update dependencies
- [ ] Review and optimize database
- [ ] Check for security vulnerabilities
- [ ] Review and update documentation

**Quarterly:**
- [ ] Rotate API keys and secrets
- [ ] Database backup verification
- [ ] Capacity planning review
- [ ] Security audit

---

## Troubleshooting

### Quick Fixes

| Problem | Solution |
|---------|----------|
| **Build fails** | Check GitHub Actions logs, verify environment variables |
| **Site is down** | Check Vercel status, verify Supabase is active |
| **Slow performance** | Check Vercel Analytics, review database queries |
| **API errors** | Verify API keys, check provider dashboards |
| **Database errors** | Check Supabase logs, verify connection strings |

### Detailed Troubleshooting

See the **[Deployment Guide - Troubleshooting](./DEPLOYMENT.md#troubleshooting)** section for comprehensive debugging steps.

### Emergency Procedures

For critical issues:

1. **Check Health Status**
   ```bash
   curl https://arcanea.ai/api/health
   ```

2. **Review Recent Changes**
   ```bash
   git log --oneline -10
   ```

3. **Rollback if Needed**
   ```bash
   vercel rollback
   ```

4. **Contact Support**
   - Vercel: support@vercel.com
   - Supabase: Discord
   - Team: frank@arcanea.ai

---

## Cost Management

### Monthly Costs (Estimated)

| Service | Cost | Notes |
|---------|------|-------|
| **Vercel Pro** | $20 | Hosting + Analytics |
| **Supabase Pro** | $25 | Database + Auth + Storage |
| **Gemini API** | $50-100 | Image generation (varies) |
| **Anthropic** | $100-200 | Story generation (varies) |
| **OpenRouter** | $50 | Model routing (varies) |
| **Total** | **$245-395** | Moderate usage |

### Cost Optimization Tips

1. **Implement Caching**
   - Cache AI responses
   - Use CDN for static assets
   - Enable Turbo remote cache

2. **Rate Limiting**
   - Limit API calls per user
   - Implement request queuing
   - Use webhooks for async operations

3. **Monitor Usage**
   - Set up billing alerts
   - Track API usage per user
   - Identify expensive operations

4. **Optimize Queries**
   - Add database indexes
   - Use pagination
   - Implement data caching

---

## Security

### Security Layers

1. **Application Layer**
   - Input validation
   - Output sanitization
   - CSRF protection

2. **API Layer**
   - Rate limiting
   - API key authentication
   - Request validation

3. **Database Layer**
   - Row Level Security (RLS)
   - Parameterized queries
   - Encrypted connections

4. **Infrastructure Layer**
   - HTTPS only
   - Security headers
   - DDoS protection

### Security Checklist

- [ ] All secrets stored securely
- [ ] RLS enabled on all tables
- [ ] Rate limiting implemented
- [ ] Input validation everywhere
- [ ] CORS configured correctly
- [ ] Security headers set
- [ ] Dependencies up to date
- [ ] Security monitoring active

See **[Security Guide](./SECURITY.md)** for detailed configuration.

---

## Performance

### Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| **LCP** | < 2.5s | Check Analytics |
| **FID** | < 100ms | Check Analytics |
| **CLS** | < 0.1 | Check Analytics |
| **TTFB** | < 600ms | Check Analytics |

### Optimization Checklist

- [ ] Images optimized (WebP/AVIF)
- [ ] Code splitting enabled
- [ ] Caching configured
- [ ] Database queries optimized
- [ ] CDN enabled
- [ ] Compression enabled

See **[Monitoring Guide](./MONITORING.md#performance-monitoring)** for detailed metrics.

---

## Support & Resources

### Documentation

- [Quick Start Guide](./QUICK_START.md) - Fast deployment
- [Deployment Guide](./DEPLOYMENT.md) - Comprehensive setup
- [Monitoring Guide](./MONITORING.md) - Observability
- [Security Guide](./SECURITY.md) - Security hardening

### External Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Turbo Documentation](https://turbo.build/repo/docs)

### Community

- **GitHub Issues**: [github.com/frankxai/arcanea/issues](https://github.com/frankxai/arcanea/issues)
- **Vercel Discord**: [vercel.com/discord](https://vercel.com/discord)
- **Supabase Discord**: [discord.supabase.com](https://discord.supabase.com)

### Support Contacts

| Issue Type | Contact | Response Time |
|------------|---------|---------------|
| **Critical Issues** | frank@arcanea.ai | < 1 hour |
| **Platform Issues** | support@vercel.com | < 4 hours |
| **Database Issues** | Supabase Discord | < 24 hours |
| **General Questions** | GitHub Issues | < 48 hours |

---

## Changelog

### Version 1.0.0 (MVP) - 2025-10-23

**Infrastructure:**
- Vercel deployment configuration
- CI/CD pipeline with GitHub Actions
- Automated testing and deployment
- Health checks and monitoring

**Documentation:**
- Quick Start Guide
- Comprehensive Deployment Guide
- Monitoring and Observability Guide
- Security Configuration Guide

**Features:**
- One-command deployment
- Automatic preview deployments
- Production rollback capability
- Real-time monitoring

---

## Contributing

When updating infrastructure or documentation:

1. **Test Changes Locally**
   ```bash
   pnpm dev:web
   pnpm build
   ```

2. **Update Documentation**
   - Update relevant .md files
   - Update version numbers
   - Update changelog

3. **Submit Changes**
   ```bash
   git checkout -b infra/update-name
   git commit -m "docs: update deployment guide"
   git push origin infra/update-name
   ```

4. **Create Pull Request**
   - Describe changes
   - Link related issues
   - Request review

---

## License

MIT License - See [LICENSE](../../LICENSE) for details.

---

**Last Updated:** 2025-10-23
**Version:** 1.0.0 (MVP)
**Maintained By:** Arcanea DevOps Team
**Contact:** frank@arcanea.ai
