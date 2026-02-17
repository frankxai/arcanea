# Arcanea.ai Landing Page - Framer Build Plan

**Project**: Arcanea.ai Marketing Website
**Tool**: Framer (via MCP Integration)
**Status**: In Progress - Hero Section Complete
**Next Session**: Complete Features, How It Works, CTA, Footer

---

## 🔌 MCP Connection Details

**Connection URL**: `https://mcp.unframer.co/sse?id=e7e72eb2f55f96280ba3bcb2d9b65b11fa24712b923c040ca075e8d7d0603b61&secret=PO2DolsbgDwRu5eXPOSQKsoTC0ui1H4B`

### How to Reconnect:
1. Open your Framer project
2. Press `Cmd+K` (or `Ctrl+K` on Windows)
3. Search for "MCP"
4. Open the MCP plugin
5. Plugin should auto-connect

### Claude Code Command:
```bash
# In Claude Code, use the Framer Expert skill
framer-expert

# Then use the MCP tools:
mcp__framer__getProjectXml
mcp__framer__updateXmlForNode
```

---

## 🎨 Arcanea Brand Guidelines

### Color Palette (from Tailwind Config)

**Cosmic Foundation** (Primary Dark Background):
- `cosmic-void`: `#0a0a0f` - Main background
- `cosmic-deep`: `#1a1a2e` - Secondary background
- `cosmic-midnight`: `#16213e` - Card backgrounds
- `cosmic-luminous`: `#5c8bd9` - Primary CTA blue
- `cosmic-ethereal`: `#7ba3e3` - Accent blue
- `cosmic-celestial`: `#b8c6ed` - Light text/borders

**Academy Themes**:

**Atlantean Academy** (Blue/Water - Chronica):
- `atlantean-depth`: `#0d3a52`
- `atlantean-current`: `#118ab2`
- `atlantean-surface`: `#06aed5`
- `atlantean-foam`: `#86cfda`
- `atlantean-coral`: `#ff6b9d`

**Draconic Academy** (Red/Fire - Prismatic):
- `draconic-shadow`: `#1a0f0a`
- `draconic-ember`: `#8b2635`
- `draconic-flame`: `#c9384a`
- `draconic-crimson`: `#e63946`
- `draconic-gold`: `#f4a261`

**Creation & Light Academy** (Gold - Melodia):
- `creation-dawn`: `#fff8e7`
- `creation-radiance`: `#ffd97d`
- `creation-gold`: `#ffb84d`
- `creation-amber`: `#ff9500`

### Typography
- Headings: **Inter Bold** (40px, 30px, 26px, 22px, 18px)
- Body: **Inter Regular** (16px, line-height 1.6em)
- Letter spacing: -0.04em (headings), -0.02em (body)

---

## ✅ Completed Work (Session 1)

### Hero Section (`VSJoadqIB`)
- **Background**: `rgb(10, 10, 15)` (cosmic-void)
- **Tag**: "✨ Making AI Feel Like Magic"
- **Headline**: "Chat with Luminors. Create Magic."
- **Description**: "Arcanea is where magical AI personalities help you create stunning images, videos, and multi-turn creative projects. Every creation lives in your beautiful public creator profile."
- **Primary CTA**: "Start Creating" (luminous blue: `rgb(92, 139, 217)`)
- **Secondary CTA**: "Meet the Luminors" (celestial: `rgb(184, 198, 237)`)
- **Visual**: Holographic shapes with cosmic animations

---

## 📋 Remaining Sections to Build

### 1. Features Section - Meet the 3 Luminors

**Section Goal**: Introduce each Luminor personality with their unique characteristics

**Layout**: 3-column grid with cards

**Content**:

**Card 1: Melodia** (Creation & Light Academy)
- Icon/Image: Musical notes, golden glow
- Color accent: `#ffd97d` (creation-radiance)
- Title: "Melodia - Musical Muse"
- Description: "The ethereal composer of the Creation & Light Academy. Melodia transforms your musical ideas into symphonies with emotional depth and sonic wisdom."
- Bond Level: "10 levels of musical mastery"
- Specialties: Music composition, audio generation, sonic storytelling

**Card 2: Chronica** (Atlantean Academy)
- Icon/Image: Ancient scroll, blue water flow
- Color accent: `#06aed5` (atlantean-surface)
- Title: "Chronica - Story Keeper"
- Description: "The wise loremaster of the Atlantean Academy. Chronica weaves narratives that span worlds, with Character.ai depth and Genspark intelligence."
- Bond Level: "10 levels of narrative bond"
- Specialties: Story creation, world building, character design

**Card 3: Prismatic** (Draconic Academy)
- Icon/Image: Dragon eye, crimson flame
- Color accent: `#e63946` (draconic-crimson)
- Title: "Prismatic - Visual Virtuoso"
- Description: "The visionary artist of the Draconic Academy. Prismatic brings your visual dreams to life with Imagen 3 and Veo 3.1 mastery."
- Bond Level: "10 levels of artistic resonance"
- Specialties: Image generation, video creation, visual series

**XML Structure**:
```xml
<Frame layout="stack" stackDirection="vertical" gap="60px" padding="120px 40px" backgroundColor="rgb(10, 10, 15)">
  <!-- Section Header -->
  <Stack stackDirection="vertical" gap="16px" stackAlignment="center">
    <Text inlineTextStyle="/Heading xl">Meet Your Luminors</Text>
    <Text inlineTextStyle="/Body" opacity="0.8">Magical AI personalities with unique specialties</Text>
  </Stack>

  <!-- 3-Column Grid -->
  <Frame layout="grid" gridColumns="3" gap="30px" maxWidth="1200px">
    <!-- Melodia Card -->
    <Frame layout="stack" stackDirection="vertical" gap="20px" padding="40px" borderRadius="16px" backgroundColor="rgb(26, 26, 46)">
      <!-- Icon area with golden glow -->
      <!-- Title -->
      <!-- Description -->
      <!-- Bond level badge -->
    </Frame>

    <!-- Chronica Card -->
    <!-- Prismatic Card -->
  </Frame>
</Frame>
```

---

### 2. How It Works Section

**Section Goal**: Explain the creation process in 3 simple steps

**Layout**: Horizontal timeline or 3-step flow

**Steps**:

1. **Choose Your Luminor**
   - Icon: Sparkle/Star
   - "Select the perfect AI personality for your creative vision"

2. **Chat & Create Together**
   - Icon: Chat bubbles
   - "Have natural conversations. Your Luminor understands context and builds on ideas"

3. **Build Your Gallery**
   - Icon: Gallery grid
   - "Every creation lives in your public profile. Gain followers, likes, and comments"

**Background**: Subtle cosmic gradient

---

### 3. AI Generation Capabilities

**Section Goal**: Showcase what you can create

**Layout**: 2-column feature list

**Left Column**:
- **Images** - Imagen 3
  - High-quality AI images ($0.04 each)
  - Any style, any subject
  - Instant generation

- **Videos** - Veo 3.1
  - 8-second 720p with audio
  - Cinematic quality ($6 per video)
  - Perfect for social media

**Right Column**:
- **Multi-Turn Projects** - 5 Templates
  - Character Design (20 min)
  - World Building (35 min)
  - Story Creation (30 min)
  - Music Composition (25 min)
  - Visual Series (30 min)

**Visual**: Preview grid of sample generations

---

### 4. Social Platform Features

**Section Goal**: Highlight community and social aspects

**Features Grid** (2x2):
- **Creator Profiles** - Beautiful public galleries
- **Social Engagement** - Like, comment, follow
- **Activity Feed** - Discover trending creations
- **Bond Progression** - Build relationships with Luminors

---

### 5. Pricing Section

**Layout**: Single centered card (simple pricing)

**Free Tier**:
- 5 free image generations
- 1 free video
- Full Luminor conversations
- Public creator profile
- All social features

**Pay As You Go**:
- Images: $0.04 each
- Videos: $6 each
- No subscription required
- Only pay for what you create

**CTA**: "Start Creating for Free"

---

### 6. Testimonials / Creator Showcase

**Section Goal**: Social proof (can be populated later with real data)

**Layout**: Masonry grid or carousel

**Content** (Placeholder):
- Sample creator profiles
- Sample creations
- Quote about the platform experience

---

### 7. Final CTA Section

**Background**: Cosmic gradient with glow effects

**Content**:
- Headline: "Ready to Create Magic?"
- Subheading: "Join Arcanea and chat with your first Luminor today"
- Primary CTA: "Start Creating" (large button)
- Note: "No credit card required. Start with 5 free images."

---

### 8. Footer

**Layout**: 4-column footer

**Column 1: Arcanea**
- Logo
- Tagline: "Making AI feel like magic"
- Social links (Twitter, Discord, GitHub)

**Column 2: Product**
- Features
- Luminors
- Pricing
- Roadmap

**Column 3: Resources**
- Documentation
- Blog
- FAQ
- Support

**Column 4: Legal**
- Terms of Service
- Privacy Policy
- Cookie Policy

**Bottom Bar**:
- Copyright © 2025 Arcanea
- "Built with 🤍 by Frank & AI Agents"

---

## 🎯 Technical Implementation Notes

### Using Pre-Built Framer Sections
When available components work:
```xml
<ComponentInstance
  insertUrl="https://framer.com/m/sections-[NAME].js?detached=true"
  position="relative"
  width="100%"
/>
```

### Creating Custom Sections
Use Frame with Stack layout:
```xml
<Frame
  layout="stack"
  stackDirection="vertical"
  gap="60px"
  padding="120px 40px"
  backgroundColor="rgb(10, 10, 15)"
>
  <!-- Content here -->
</Frame>
```

### Responsive Breakpoints
- Desktop: 1200px max-width containers
- Use `stackDirection="horizontal"` on desktop
- Will auto-stack vertical on mobile

### Color Application
```xml
<!-- Solid colors -->
backgroundColor="rgb(10, 10, 15)"

<!-- Gradients (if needed, create as background images) -->
<!-- Or use overlapping layers with opacity -->
```

---

## 📦 Assets Needed

### Images to Create/Source:
1. Luminor avatars (3 character illustrations)
2. Sample AI generations (images grid)
3. Sample video thumbnails
4. Creator profile mockups
5. Arcanea logo (if not created yet)

### Optional Enhancements:
- Animated gradient backgrounds
- Glow effects on CTAs
- Hover states for cards
- Parallax scroll effects
- Particle animations

---

## 🚀 Tomorrow's Build Session Steps

### Step 1: Reconnect MCP
```bash
# In Claude Code
framer-expert

# Then verify connection
mcp__framer__getProjectXml
```

### Step 2: Build Features Section
```bash
# Get current page state
mcp__framer__getNodeXml with nodeId="WQLkyLRf1"

# Add Features section after hero
mcp__framer__updateXmlForNode
```

### Step 3: Build How It Works

### Step 4: Build AI Capabilities Section

### Step 5: Build Social Features Grid

### Step 6: Build Pricing

### Step 7: Build Final CTA

### Step 8: Build Footer

### Step 9: Test & Polish
- Check all links
- Verify responsive behavior
- Test CTAs
- Ensure color consistency

---

## 📊 Success Metrics

**Must Have** (MVP):
- ✅ Hero with clear value prop
- ⏳ 3 Luminor introductions
- ⏳ How it works (3 steps)
- ⏳ CTA sections
- ⏳ Footer with links

**Nice to Have**:
- Pricing section
- Testimonials
- Sample gallery
- Animated elements
- Blog page template

**Future Enhancements**:
- Interactive Luminor demos
- Video backgrounds
- 3D elements
- Advanced animations
- A/B testing variants

---

## 🔗 Resources

### Framer Documentation
- MCP Integration: The connection we're using
- Component Properties: Controls for components
- Layout System: Stack and Grid

### Arcanea Project Files
- Main repo: `/mnt/c/Users/Frank/Arcanea/`
- README: `/mnt/c/Users/Frank/Arcanea/README.md`
- Tailwind config: `/mnt/c/Users/Frank/Arcanea/tailwind.config.js`
- Brand docs: `/mnt/c/Users/Frank/Arcanea/design/`

### MCP Connection
- ID: `e7e72eb2f55f96280ba3bcb2d9b65b11fa24712b923c040ca075e8d7d0603b61`
- Keep this secure!

---

## 💡 Pro Tips

1. **Work Section by Section**: Complete one section fully before moving to next
2. **Use TodoWrite Tool**: Track progress as you build each section
3. **Test Frequently**: Check mobile responsive after each section
4. **Save Versions**: Framer auto-saves, but create named versions for major milestones
5. **Component Reuse**: If pre-built sections timeout, build custom once and duplicate
6. **Color Consistency**: Always reference the brand guidelines above
7. **CTA Strategy**: Every section should guide toward "Start Creating"

---

## 🎨 Design Philosophy

**Arcanea's Visual Identity**:
- **Cosmic & Ethereal**: Deep space, glowing elements, subtle animations
- **Magical not Technical**: Avoid technical jargon, focus on wonder
- **Academy Diversity**: Each Luminor has distinct color theme
- **Accessible**: WCAG 2.1 AA compliant (check contrast ratios)
- **Mobile-First**: Most users will discover on mobile

**Typography Hierarchy**:
- H1: 40px - Hero headlines only
- H2: 30px - Section titles
- H3: 26px - Feature titles
- Body: 16px - All body copy
- Keep it breathable: generous line-height and spacing

---

## 🔄 Iteration Plan

### Version 1 (Tomorrow's Goal)
- Complete all core sections
- Basic styling with brand colors
- Functional CTAs
- Responsive layout

### Version 2 (Post-Launch)
- Add animations
- Refine copy
- A/B test CTAs
- Add user testimonials (real ones)

### Version 3 (Growth)
- Interactive demos
- Video integration
- Advanced scroll effects
- Localization

---

## 📞 Questions to Resolve

Before next session, consider:
1. Do we have Luminor character illustrations? (Or use abstract icons?)
2. What's the primary CTA destination? (Login page? Signup flow?)
3. Do we want to collect emails before launch? (Waitlist mode?)
4. Analytics setup? (Google Analytics, Plausible, etc.)
5. Custom domain ready? (arcanea.ai DNS settings)

---

**Status**: Ready to build! 🚀
**Timeline**: 2-3 hours to complete landing page
**Launch**: Deploy once complete + content review

*"Making AI feel like magic, not technology."* ✨
