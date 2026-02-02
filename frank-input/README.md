# 📁 Frank's Input Directory
## Everything Frank Needs to Provide for Arcanea Development

---

## 🔑 /apis/
**Store API keys and configurations here**

### Required for Stage 1 (MVP):
```
apis/
├── REQUIRED.md          # ← Start here! Lists all needed APIs
├── supabase.env         # Supabase project URL and keys
├── openai.env           # OpenAI API key (for AI features)
├── anthropic.env        # Anthropic/Claude API key
├── stripe.env           # Stripe keys (test & production)
└── vercel.env           # Vercel deployment token
```

### Required for Stage 2:
```
├── openrouter.env       # OpenRouter API key (multi-model access)
├── stability.env        # Stability AI for image generation
├── replicate.env        # Replicate for music/video models
└── redis.env            # Redis cloud connection
```

### Required for Stage 3:
```
├── discord.env          # Discord bot token
├── sendgrid.env         # Email service
├── cloudinary.env       # CDN and media optimization
└── analytics.env        # Mixpanel/Amplitude keys
```

---

## 📚 /content/
**Your existing content to import into the platform**

```
content/
├── philosophy/          # The Arcanean Library texts
│   ├── luminor-codices/ # Your 6 Luminor texts
│   ├── manifestos/      # Strategic manifestos
│   └── methods/         # The Arcanean Method chapters
├── music/               # Your music files
│   ├── completed/       # Finished tracks
│   ├── stems/           # Individual stems for remixing
│   └── metadata.json    # Song descriptions, themes
├── visuals/             # Images and artwork
│   ├── realm-art/       # Concept art for your realm
│   ├── logos/           # Branding assets
│   └── ui-concepts/     # Design inspirations
└── courses/             # Educational content
    ├── outlines/        # Course structures
    ├── scripts/         # Video/audio scripts
    └── materials/       # Supporting documents
```

---

## 📋 /requirements/
**Feature requests and specifications**

```
requirements/
├── priority-features.md  # What you want built first
├── user-stories.md       # "As a user, I want to..."
├── design-preferences.md # UI/UX preferences
├── integrations.md       # Tools you want integrated
└── constraints.md        # What to avoid, limitations
```

### Template for priority-features.md:
```markdown
# Priority Features for Arcanea

## Must Have (Week 1)
- [ ] Feature 1: Description
- [ ] Feature 2: Description

## Should Have (Month 1)
- [ ] Feature 3: Description

## Nice to Have (Future)
- [ ] Feature 4: Description
```

---

## 💬 /feedback/
**Your feedback on development progress**

```
feedback/
├── daily-notes.md       # Daily observations
├── bug-reports.md       # Issues you find
├── ux-feedback.md       # User experience notes
└── feature-ideas.md     # New ideas as they come
```

---

## 🎨 /assets/
**Design assets and brand materials**

```
assets/
├── brand/
│   ├── colors.md        # Hex codes, color philosophy
│   ├── fonts/           # Font files or Google Font names
│   ├── logo/            # Logo variations (SVG preferred)
│   └── guidelines.md    # How to use brand elements
├── examples/
│   ├── websites.md      # URLs of sites you like
│   ├── apps.md          # Apps with good UX
│   └── screenshots/     # Specific UI elements you like
└── mockups/
    ├── sketches/        # Hand drawings, wireframes
    └── tools/           # Figma links, etc.
```

---

## 🔐 /credentials/
**Account access (keep secure!)**

```
credentials/
├── .gitignore           # IMPORTANT: Ensures these aren't committed
├── domains.md           # Domain registrar access
├── hosting.md           # Vercel, Netlify accounts
├── services.md          # SaaS tool logins
└── social.md            # Social media accounts
```

---

## 📝 QUICK START CHECKLIST

### Week 1 Essentials:
- [ ] Create Supabase account and add keys to `/apis/supabase.env`
- [ ] Add OpenAI API key to `/apis/openai.env`
- [ ] Copy Arcanean Library texts to `/content/philosophy/`
- [ ] Write your top 5 features in `/requirements/priority-features.md`
- [ ] Add brand colors to `/assets/brand/colors.md`

### Week 2 Additions:
- [ ] Add Stripe keys for payments
- [ ] Upload any music files to `/content/music/`
- [ ] Provide design examples in `/assets/examples/`

### Ongoing:
- [ ] Daily feedback in `/feedback/daily-notes.md`
- [ ] New feature ideas as they come
- [ ] Bug reports when found

---

## 🚨 SECURITY NOTES

1. **Never commit API keys to Git**
   - The `.gitignore` file will prevent this
   - Use environment variables in production

2. **Sensitive Information**
   - Keep credentials folder local only
   - Use password manager for sharing

3. **File Format for Keys**
```env
# Example: /apis/openai.env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
OPENAI_ORG_ID=org-xxxxxxxxxxxxxxxxxxxx
```

---

## 💡 HOW I'LL USE THIS

Every time I work on Arcanea, I'll check this folder for:

1. **New API keys** → Enable new features
2. **New content** → Import into the platform  
3. **New requirements** → Adjust development priorities
4. **Your feedback** → Fix issues and improve UX
5. **Brand assets** → Maintain consistent design

---

## 🤝 COLLABORATION WORKFLOW

### Your Part:
1. Add files to appropriate folders
2. Update requirements as needed
3. Provide feedback regularly
4. Keep credentials secure

### My Part:
1. Check folder at session start
2. Implement based on priorities
3. Report progress
4. Ask for clarification when needed

---

## 📮 WHAT TO ADD FIRST

**Right Now:**
1. Your OpenAI/Anthropic API keys (we need these for AI features)
2. A list of your top 5 must-have features
3. Any existing Arcanea content you want imported
4. Color preferences (dark theme colors especially)

**This Week:**
5. Supabase project (I can help you set this up)
6. Examples of platforms you like
7. Your philosophy texts for the Archive

---

*This folder is your direct line to the development process. The more you provide, the better I can build YOUR vision of Arcanea.*