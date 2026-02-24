# Shared Assets

Root-level assets accessible to all apps in the monorepo.

## Directory Structure

```
shared-assets/
├── brand/           # Cross-app brand assets
└── temp-uploads/    # Temporary upload storage (gitignored)
```

## Usage

All apps can reference these assets:
```tsx
// From any app
<img src="/shared-assets/brand/logo.png" alt="Arcanea" />
```

## Notes

- `temp-uploads/` is gitignored and used for development
- Production uploads should go to Supabase Storage
- Brand assets here are fallbacks for core branding