# Next.js Configuration Quick Reference

## Overview

Both Arcanea projects now have optimized Next.js 16 configurations with enterprise-grade features.

## Quick Commands

### Build & Test
```bash
# Web app (monorepo)
cd /mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea/apps/web
pnpm run build          # Production build
pnpm run dev            # Dev server on :3001
pnpm run type-check     # TypeScript validation

# arcanea.ai
cd /mnt/c/Users/frank/Arcanea/arcanea.ai
npm run build           # Production build
npm run dev             # Dev server on :3000
npm run type-check      # TypeScript validation
```

### Bundle Analysis (Optional)
```bash
# Install analyzer
pnpm add -D @next/bundle-analyzer  # or npm install -D

# Use the .with-analyzer.js config or add to existing config
ANALYZE=true pnpm run build
```

## Key Features Enabled

### Performance
- AVIF/WebP image optimization
- React 19 compiler
- Partial Prerendering (PPR)
- Package import optimization
- Deterministic module IDs

### Security
- Strict Transport Security (HSTS)
- XSS protection headers
- Frame options (clickjacking prevention)
- Content type sniffing prevention
- Permissions policy

### Developer Experience
- React strict mode
- Full fetch logging in dev
- Type checking enforced
- Linting enforced

## Troubleshooting

### Build Fails After Config Update

1. **Try disabling experimental features**:
```javascript
experimental: {
  // reactCompiler: true,  // Comment out
  // ppr: 'incremental',   // Comment out
}
```

2. **Check TypeScript errors**:
```bash
pnpm run type-check
```

3. **Check linting**:
```bash
pnpm run lint
```

### Image Loading Issues

If remote images fail to load, add the domain to `remotePatterns`:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-domain.com',
    },
  ],
}
```

### Three.js Build Errors (arcanea.ai only)

If shader imports fail, install required loaders:
```bash
npm install -D raw-loader glslify-loader
```

## Feature Flags

### Disable PPR
```javascript
experimental: {
  ppr: false,  // or remove the line
}
```

### Disable React Compiler
```javascript
experimental: {
  reactCompiler: false,  // or remove the line
}
```

### Allow Build Errors (NOT RECOMMENDED)
```javascript
typescript: {
  ignoreBuildErrors: true,  // Only for emergencies
},
eslint: {
  ignoreDuringBuilds: true,  // Only for emergencies
}
```

## Configuration Locations

- **Web app**: `/mnt/c/Users/frank/Arcanea/arcanea-ecosystem/arcanea/apps/web/next.config.js`
- **arcanea.ai**: `/mnt/c/Users/frank/Arcanea/arcanea.ai/next.config.js`
- **With analyzer (optional)**: `next.config.with-analyzer.js` (both projects)

## Performance Monitoring

After deploying, monitor these metrics in Vercel:

1. **Core Web Vitals**
   - LCP (Largest Contentful Paint) < 2.5s
   - FID (First Input Delay) < 100ms
   - CLS (Cumulative Layout Shift) < 0.1

2. **Build Metrics**
   - Build duration
   - Bundle sizes
   - Cache hit rate

3. **Runtime Metrics**
   - Error rates
   - Function execution time
   - Edge cache hit rate

## Security Headers Reference

| Header | Purpose | Value |
|--------|---------|-------|
| HSTS | Force HTTPS | 2 years |
| X-Frame-Options | Prevent embedding | SAMEORIGIN |
| X-Content-Type-Options | Prevent MIME sniffing | nosniff |
| Referrer-Policy | Control referrer info | origin-when-cross-origin |

## Next Steps

1. Test builds locally
2. Deploy to preview environment
3. Monitor Core Web Vitals
4. Consider enabling full PPR: `ppr: true`
5. Add bundle analyzer for ongoing monitoring

## Rollback

If you need to rollback to previous config:
```bash
git checkout HEAD -- next.config.js
```

## Support

For detailed information, see:
- `/mnt/c/Users/frank/Arcanea/NEXT_CONFIG_OPTIMIZATION_REPORT.md`
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Vercel Deployment Docs](https://vercel.com/docs)

---

*Last updated: 2026-02-02*
*DevOps Specialist: Arcanea*
