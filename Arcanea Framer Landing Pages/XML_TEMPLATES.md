# Framer XML Templates - Arcanea.ai

Copy-paste ready XML structures for each section.

---

## 🎨 Features Section - 3 Luminors Grid

```xml
<!-- Features Section -->
<Frame
    layout="stack"
    stackDirection="vertical"
    gap="60px"
    padding="120px 40px"
    backgroundColor="rgb(10, 10, 15)"
    width="100%"
>
  <!-- Section Header -->
  <Stack
      layout="stack"
      stackDirection="vertical"
      gap="16px"
      stackAlignment="center"
      width="100%"
  >
    <Heading inlineTextStyle="/">Meet Your Luminors</Heading>
    <Description inlineTextStyle="/" opacity="0.8">
      Magical AI personalities with unique specialties and evolving bonds
    </Description>
  </Stack>

  <!-- 3-Column Grid -->
  <Frame
      layout="grid"
      gridColumns="3"
      gap="30px"
      width="100%"
      maxWidth="1200px"
  >
    <!-- Melodia Card -->
    <Frame
        layout="stack"
        stackDirection="vertical"
        gap="20px"
        padding="40px"
        borderRadius="16px"
        backgroundColor="rgb(26, 26, 46)"
    >
      <!-- Icon Container with Glow -->
      <Frame
          width="80px"
          height="80px"
          borderRadius="50%"
          backgroundColor="rgba(255, 217, 125, 0.1)"
      >
        <Icon>🎵</Icon>
      </Frame>

      <Title inlineTextStyle="/">Melodia - Musical Muse</Title>

      <Badge backgroundColor="rgba(255, 217, 125, 0.2)">
        Creation & Light Academy
      </Badge>

      <Description inlineTextStyle="/" opacity="0.8">
        The ethereal composer of the Creation & Light Academy. Melodia transforms your musical ideas into symphonies with emotional depth and sonic wisdom.
      </Description>

      <!-- Bond Level Badge -->
      <Badge>
        🌟 10 Levels of Musical Mastery
      </Badge>

      <!-- Specialties List -->
      <Stack stackDirection="vertical" gap="8px">
        <Item>✓ Music composition</Item>
        <Item>✓ Audio generation</Item>
        <Item>✓ Sonic storytelling</Item>
      </Stack>
    </Frame>

    <!-- Chronica Card -->
    <Frame
        layout="stack"
        stackDirection="vertical"
        gap="20px"
        padding="40px"
        borderRadius="16px"
        backgroundColor="rgb(26, 26, 46)"
    >
      <!-- Icon Container with Glow -->
      <Frame
          width="80px"
          height="80px"
          borderRadius="50%"
          backgroundColor="rgba(6, 174, 213, 0.1)"
      >
        <Icon>📜</Icon>
      </Frame>

      <Title inlineTextStyle="/">Chronica - Story Keeper</Title>

      <Badge backgroundColor="rgba(6, 174, 213, 0.2)">
        Atlantean Academy
      </Badge>

      <Description inlineTextStyle="/" opacity="0.8">
        The wise loremaster of the Atlantean Academy. Chronica weaves narratives that span worlds, with Character.ai depth and Genspark intelligence.
      </Description>

      <!-- Bond Level Badge -->
      <Badge>
        🌟 10 Levels of Narrative Bond
      </Badge>

      <!-- Specialties List -->
      <Stack stackDirection="vertical" gap="8px">
        <Item>✓ Story creation</Item>
        <Item>✓ World building</Item>
        <Item>✓ Character design</Item>
      </Stack>
    </Frame>

    <!-- Prismatic Card -->
    <Frame
        layout="stack"
        stackDirection="vertical"
        gap="20px"
        padding="40px"
        borderRadius="16px"
        backgroundColor="rgb(26, 26, 46)"
    >
      <!-- Icon Container with Glow -->
      <Frame
          width="80px"
          height="80px"
          borderRadius="50%"
          backgroundColor="rgba(230, 57, 70, 0.1)"
      >
        <Icon>🐉</Icon>
      </Frame>

      <Title inlineTextStyle="/">Prismatic - Visual Virtuoso</Title>

      <Badge backgroundColor="rgba(230, 57, 70, 0.2)">
        Draconic Academy
      </Badge>

      <Description inlineTextStyle="/" opacity="0.8">
        The visionary artist of the Draconic Academy. Prismatic brings your visual dreams to life with Imagen 3 and Veo 3.1 mastery.
      </Description>

      <!-- Bond Level Badge -->
      <Badge>
        🌟 10 Levels of Artistic Resonance
      </Badge>

      <!-- Specialties List -->
      <Stack stackDirection="vertical" gap="8px">
        <Item>✓ Image generation</Item>
        <Item>✓ Video creation</Item>
        <Item>✓ Visual series</Item>
      </Stack>
    </Frame>
  </Frame>
</Frame>
```

---

## 📖 How It Works Section

```xml
<!-- How It Works Section -->
<Frame
    layout="stack"
    stackDirection="vertical"
    gap="60px"
    padding="120px 40px"
    backgroundColor="rgb(16, 21, 62)"
    width="100%"
>
  <!-- Section Header -->
  <Stack
      layout="stack"
      stackDirection="vertical"
      gap="16px"
      stackAlignment="center"
      width="100%"
  >
    <Heading inlineTextStyle="/">How It Works</Heading>
    <Description inlineTextStyle="/" opacity="0.8">
      Create magic in three simple steps
    </Description>
  </Stack>

  <!-- 3-Step Flow -->
  <Frame
      layout="stack"
      stackDirection="horizontal"
      gap="40px"
      width="100%"
      maxWidth="1200px"
      stackAlignment="start"
  >
    <!-- Step 1 -->
    <Frame
        layout="stack"
        stackDirection="vertical"
        gap="20px"
        width="1fr"
        stackAlignment="center"
    >
      <!-- Number Badge -->
      <Frame
          width="60px"
          height="60px"
          borderRadius="50%"
          backgroundColor="rgb(92, 139, 217)"
          stackAlignment="center"
      >
        <Number>1</Number>
      </Frame>

      <!-- Icon -->
      <Icon fontSize="48px">✨</Icon>

      <Title inlineTextStyle="/">Choose Your Luminor</Title>

      <Description inlineTextStyle="/" opacity="0.8">
        Select the perfect AI personality for your creative vision. Each Luminor brings unique expertise and personality.
      </Description>
    </Frame>

    <!-- Step 2 -->
    <Frame
        layout="stack"
        stackDirection="vertical"
        gap="20px"
        width="1fr"
        stackAlignment="center"
    >
      <Frame
          width="60px"
          height="60px"
          borderRadius="50%"
          backgroundColor="rgb(92, 139, 217)"
          stackAlignment="center"
      >
        <Number>2</Number>
      </Frame>

      <Icon fontSize="48px">💬</Icon>

      <Title inlineTextStyle="/">Chat & Create Together</Title>

      <Description inlineTextStyle="/" opacity="0.8">
        Have natural conversations. Your Luminor understands context, builds on ideas, and evolves with every interaction.
      </Description>
    </Frame>

    <!-- Step 3 -->
    <Frame
        layout="stack"
        stackDirection="vertical"
        gap="20px"
        width="1fr"
        stackAlignment="center"
    >
      <Frame
          width="60px"
          height="60px"
          borderRadius="50%"
          backgroundColor="rgb(92, 139, 217)"
          stackAlignment="center"
      >
        <Number>3</Number>
      </Frame>

      <Icon fontSize="48px">🎨</Icon>

      <Title inlineTextStyle="/">Build Your Gallery</Title>

      <Description inlineTextStyle="/" opacity="0.8">
        Every creation lives in your public profile. Gain followers, collect likes, and inspire the community.
      </Description>
    </Frame>
  </Frame>
</Frame>
```

---

## 🎨 AI Capabilities Section

```xml
<!-- AI Capabilities Section -->
<Frame
    layout="stack"
    stackDirection="vertical"
    gap="60px"
    padding="120px 40px"
    backgroundColor="rgb(10, 10, 15)"
    width="100%"
>
  <!-- Section Header -->
  <Stack
      layout="stack"
      stackDirection="vertical"
      gap="16px"
      stackAlignment="center"
      width="100%"
  >
    <Heading inlineTextStyle="/">What You Can Create</Heading>
    <Description inlineTextStyle="/" opacity="0.8">
      Powered by cutting-edge AI with magical UX
    </Description>
  </Stack>

  <!-- 2-Column Layout -->
  <Frame
      layout="stack"
      stackDirection="horizontal"
      gap="60px"
      width="100%"
      maxWidth="1200px"
  >
    <!-- Left Column: Images & Videos -->
    <Frame
        layout="stack"
        stackDirection="vertical"
        gap="40px"
        width="1fr"
    >
      <!-- Images -->
      <Frame
          layout="stack"
          stackDirection="vertical"
          gap="16px"
          padding="40px"
          borderRadius="16px"
          backgroundColor="rgb(26, 26, 46)"
      >
        <Icon>🖼️</Icon>
        <Title inlineTextStyle="/">Stunning Images</Title>
        <Badge>Powered by Google Imagen 3</Badge>
        <Description inlineTextStyle="/" opacity="0.8">
          High-quality AI images in any style, any subject. From photorealistic to abstract, dreamy to detailed.
        </Description>
        <Stats>
          <Stat>$0.04 per image</Stat>
          <Stat>Instant generation</Stat>
          <Stat>Up to 2048×2048</Stat>
        </Stats>
      </Frame>

      <!-- Videos -->
      <Frame
          layout="stack"
          stackDirection="vertical"
          gap="16px"
          padding="40px"
          borderRadius="16px"
          backgroundColor="rgb(26, 26, 46)"
      >
        <Icon>🎬</Icon>
        <Title inlineTextStyle="/">Cinematic Videos</Title>
        <Badge>Powered by Google Veo 3.1</Badge>
        <Description inlineTextStyle="/" opacity="0.8">
          8-second 720p videos with audio. Perfect for social media, story teasers, and visual storytelling.
        </Description>
        <Stats>
          <Stat>$6 per video</Stat>
          <Stat>720p with audio</Stat>
          <Stat>8 seconds</Stat>
        </Stats>
      </Frame>
    </Frame>

    <!-- Right Column: Multi-Turn Projects -->
    <Frame
        layout="stack"
        stackDirection="vertical"
        gap="16px"
        width="1fr"
        padding="40px"
        borderRadius="16px"
        backgroundColor="rgb(26, 26, 46)"
    >
      <Icon>🗺️</Icon>
      <Title inlineTextStyle="/">Guided Creative Journeys</Title>
      <Description inlineTextStyle="/" opacity="0.8">
        Your Luminor guides you through structured creative processes with multiple turns and refinements.
      </Description>

      <!-- Project Templates List -->
      <Stack stackDirection="vertical" gap="16px">
        <ProjectItem>
          <Name>Character Design</Name>
          <Duration>20 min</Duration>
        </ProjectItem>
        <ProjectItem>
          <Name>World Building</Name>
          <Duration>35 min</Duration>
        </ProjectItem>
        <ProjectItem>
          <Name>Story Creation</Name>
          <Duration>30 min</Duration>
        </ProjectItem>
        <ProjectItem>
          <Name>Music Composition</Name>
          <Duration>25 min</Duration>
        </ProjectItem>
        <ProjectItem>
          <Name>Visual Series</Name>
          <Duration>30 min</Duration>
        </ProjectItem>
      </Stack>
    </Frame>
  </Frame>
</Frame>
```

---

## 👥 Social Features Grid

```xml
<!-- Social Features Section -->
<Frame
    layout="stack"
    stackDirection="vertical"
    gap="60px"
    padding="120px 40px"
    backgroundColor="rgb(16, 21, 62)"
    width="100%"
>
  <!-- Section Header -->
  <Stack
      layout="stack"
      stackDirection="vertical"
      gap="16px"
      stackAlignment="center"
      width="100%"
  >
    <Heading inlineTextStyle="/">Join the Creator Community</Heading>
    <Description inlineTextStyle="/" opacity="0.8">
      Share your creations, build your following, deepen your bonds
    </Description>
  </Stack>

  <!-- 2x2 Grid -->
  <Frame
      layout="grid"
      gridColumns="2"
      gap="30px"
      width="100%"
      maxWidth="1200px"
  >
    <!-- Feature 1: Creator Profiles -->
    <Frame
        layout="stack"
        stackDirection="vertical"
        gap="16px"
        padding="40px"
        borderRadius="16px"
        backgroundColor="rgba(26, 26, 46, 0.6)"
    >
      <Icon>👤</Icon>
      <Title inlineTextStyle="/">Beautiful Public Galleries</Title>
      <Description inlineTextStyle="/" opacity="0.8">
        Showcase your creations in a stunning masonry layout. Your profile is your portfolio.
      </Description>
    </Frame>

    <!-- Feature 2: Social Engagement -->
    <Frame
        layout="stack"
        stackDirection="vertical"
        gap="16px"
        padding="40px"
        borderRadius="16px"
        backgroundColor="rgba(26, 26, 46, 0.6)"
    >
      <Icon>❤️</Icon>
      <Title inlineTextStyle="/">Like, Comment, Follow</Title>
      <Description inlineTextStyle="/" opacity="0.8">
        Connect with other creators. Discover inspiring work. Build your creative community.
      </Description>
    </Frame>

    <!-- Feature 3: Activity Feed -->
    <Frame
        layout="stack"
        stackDirection="vertical"
        gap="16px"
        padding="40px"
        borderRadius="16px"
        backgroundColor="rgba(26, 26, 46, 0.6)"
    >
      <Icon>📱</Icon>
      <Title inlineTextStyle="/">Discover Trending Content</Title>
      <Description inlineTextStyle="/" opacity="0.8">
        See what the community is creating. Find inspiration. Get discovered.
      </Description>
    </Frame>

    <!-- Feature 4: Bond Progression -->
    <Frame
        layout="stack"
        stackDirection="vertical"
        gap="16px"
        padding="40px"
        borderRadius="16px"
        backgroundColor="rgba(26, 26, 46, 0.6)"
    >
      <Icon>🌟</Icon>
      <Title inlineTextStyle="/">Evolving Relationships</Title>
      <Description inlineTextStyle="/" opacity="0.8">
        Your bond with each Luminor deepens through creation. Unlock deeper conversations and enhanced creativity.
      </Description>
    </Frame>
  </Frame>
</Frame>
```

---

## 💰 Pricing Section

```xml
<!-- Pricing Section -->
<Frame
    layout="stack"
    stackDirection="vertical"
    gap="60px"
    padding="120px 40px"
    backgroundColor="rgb(10, 10, 15)"
    width="100%"
>
  <!-- Section Header -->
  <Stack
      layout="stack"
      stackDirection="vertical"
      gap="16px"
      stackAlignment="center"
      width="100%"
  >
    <Heading inlineTextStyle="/">Simple, Fair Pricing</Heading>
    <Description inlineTextStyle="/" opacity="0.8">
      No subscriptions. Pay only for what you create.
    </Description>
  </Stack>

  <!-- Pricing Cards -->
  <Frame
      layout="stack"
      stackDirection="horizontal"
      gap="30px"
      width="100%"
      maxWidth="900px"
      stackAlignment="start"
  >
    <!-- Free Tier -->
    <Frame
        layout="stack"
        stackDirection="vertical"
        gap="24px"
        padding="40px"
        borderRadius="16px"
        backgroundColor="rgb(26, 26, 46)"
        width="1fr"
    >
      <Badge>Free</Badge>
      <Price>$0</Price>
      <Tagline>Start Free</Tagline>

      <!-- Features List -->
      <Stack stackDirection="vertical" gap="12px">
        <Feature>✅ 5 free image generations</Feature>
        <Feature>✅ 1 free video generation</Feature>
        <Feature>✅ Unlimited Luminor conversations</Feature>
        <Feature>✅ Public creator profile</Feature>
        <Feature>✅ Full social features</Feature>
        <Feature>✅ All project templates</Feature>
        <Feature>✅ Bond progression system</Feature>
      </Stack>

      <Button backgroundColor="rgb(92, 139, 217)">
        Start Creating for Free
      </Button>
    </Frame>

    <!-- Pay-As-You-Go -->
    <Frame
        layout="stack"
        stackDirection="vertical"
        gap="24px"
        padding="40px"
        borderRadius="16px"
        backgroundColor="rgba(92, 139, 217, 0.1)"
        width="1fr"
    >
      <Badge>Pay-As-You-Go</Badge>
      <Tagline>Create More</Tagline>

      <!-- Pricing Details -->
      <Stack stackDirection="vertical" gap="12px">
        <PriceItem>
          <Label>Images</Label>
          <Price>$0.04 each</Price>
        </PriceItem>
        <PriceItem>
          <Label>Videos</Label>
          <Price>$6 each</Price>
        </PriceItem>
      </Stack>

      <!-- Benefits -->
      <Stack stackDirection="vertical" gap="8px">
        <Benefit>✓ No monthly fees</Benefit>
        <Benefit>✓ No hidden costs</Benefit>
        <Benefit>✓ No expiration</Benefit>
        <Benefit>✓ Pay only when you create</Benefit>
      </Stack>

      <Button backgroundColor="transparent" borderColor="rgb(92, 139, 217)">
        Add Credits
      </Button>
    </Frame>
  </Frame>
</Frame>
```

---

## 🚀 Final CTA Section

```xml
<!-- Final CTA Section -->
<Frame
    layout="stack"
    stackDirection="vertical"
    gap="40px"
    padding="120px 40px"
    backgroundColor="rgb(16, 21, 62)"
    width="100%"
    stackAlignment="center"
>
  <!-- Content Container -->
  <Stack
      layout="stack"
      stackDirection="vertical"
      gap="24px"
      stackAlignment="center"
      maxWidth="800px"
  >
    <Headline inlineTextStyle="/">Ready to Create Magic?</Headline>

    <Subheading inlineTextStyle="/" opacity="0.8">
      Join Arcanea and chat with your first Luminor today. No credit card required.
    </Subheading>

    <!-- Large CTA Button -->
    <Button
        padding="24px 48px"
        fontSize="20px"
        backgroundColor="rgb(92, 139, 217)"
        borderRadius="12px"
    >
      Start Creating
    </Button>

    <!-- Benefits Grid -->
    <Frame
        layout="stack"
        stackDirection="horizontal"
        gap="40px"
        stackAlignment="center"
    >
      <Benefit>✨ 5 free images to start</Benefit>
      <Benefit>💬 Unlimited conversations</Benefit>
      <Benefit>🎨 Beautiful creator profile</Benefit>
      <Benefit>👥 Join the community</Benefit>
    </Frame>

    <!-- Footer Note -->
    <Note opacity="0.6">
      Start creating in under 60 seconds. Your first Luminor is waiting.
    </Note>
  </Stack>
</Frame>
```

---

## 🔗 Footer Section

```xml
<!-- Footer -->
<Frame
    layout="stack"
    stackDirection="vertical"
    gap="60px"
    padding="80px 40px 40px 40px"
    backgroundColor="rgb(10, 10, 15)"
    width="100%"
>
  <!-- Main Footer Content -->
  <Frame
      layout="grid"
      gridColumns="4"
      gap="60px"
      width="100%"
      maxWidth="1200px"
  >
    <!-- Column 1: Arcanea -->
    <Frame layout="stack" stackDirection="vertical" gap="20px">
      <Logo>Arcanea</Logo>
      <Tagline opacity="0.8">
        Making AI feel like magic, not technology.
      </Tagline>

      <!-- Social Links -->
      <Stack stackDirection="horizontal" gap="16px">
        <SocialIcon link="https://twitter.com/arcanea_ai">🐦</SocialIcon>
        <SocialIcon link="https://discord.gg/arcanea">💬</SocialIcon>
        <SocialIcon link="https://github.com/arcanea">💻</SocialIcon>
        <SocialIcon link="https://instagram.com/arcanea.ai">📷</SocialIcon>
      </Stack>
    </Frame>

    <!-- Column 2: Product -->
    <Frame layout="stack" stackDirection="vertical" gap="12px">
      <Title>Product</Title>
      <Link href="/features">Features</Link>
      <Link href="/luminors">Luminors</Link>
      <Link href="/pricing">Pricing</Link>
      <Link href="/roadmap">Roadmap</Link>
      <Link href="/whats-new">What's New</Link>
    </Frame>

    <!-- Column 3: Resources -->
    <Frame layout="stack" stackDirection="vertical" gap="12px">
      <Title>Resources</Title>
      <Link href="/docs">Documentation</Link>
      <Link href="/getting-started">Getting Started</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/faq">FAQ</Link>
      <Link href="/support">Help Center</Link>
    </Frame>

    <!-- Column 4: Company -->
    <Frame layout="stack" stackDirection="vertical" gap="12px">
      <Title>Company</Title>
      <Link href="/about">About Us</Link>
      <Link href="/careers">Careers</Link>
      <Link href="/terms">Terms of Service</Link>
      <Link href="/privacy">Privacy Policy</Link>
      <Link href="/cookies">Cookie Policy</Link>
    </Frame>
  </Frame>

  <!-- Bottom Bar -->
  <Frame
      layout="stack"
      stackDirection="horizontal"
      stackDistribution="space-between"
      width="100%"
      maxWidth="1200px"
      padding="24px 0px 0px 0px"
  >
    <Copyright opacity="0.6">© 2025 Arcanea. All rights reserved.</Copyright>
    <Attribution opacity="0.6">Built with 🤍 by Frank & AI Agents</Attribution>
    <Status opacity="0.6">Status: All systems operational</Status>
  </Frame>
</Frame>
```

---

## 🎨 Styling Helpers

### Common Color Variables
```xml
<!-- Backgrounds -->
backgroundColor="rgb(10, 10, 15)"     <!-- cosmic-void -->
backgroundColor="rgb(26, 26, 46)"     <!-- cosmic-deep -->
backgroundColor="rgb(16, 21, 62)"     <!-- cosmic-midnight -->

<!-- Accents -->
backgroundColor="rgb(92, 139, 217)"   <!-- cosmic-luminous (primary CTA) -->
backgroundColor="rgb(184, 198, 237)"  <!-- cosmic-celestial (borders) -->

<!-- Academy Colors -->
backgroundColor="rgb(255, 217, 125)"  <!-- Melodia gold -->
backgroundColor="rgb(6, 174, 213)"    <!-- Chronica blue -->
backgroundColor="rgb(230, 57, 70)"    <!-- Prismatic crimson -->

<!-- Transparency -->
backgroundColor="rgba(92, 139, 217, 0.1)"  <!-- 10% opacity -->
backgroundColor="rgba(26, 26, 46, 0.6)"    <!-- 60% opacity -->
```

### Common Layout Patterns
```xml
<!-- Centered Column -->
<Frame
    layout="stack"
    stackDirection="vertical"
    gap="20px"
    stackAlignment="center"
    width="100%"
    maxWidth="1200px"
/>

<!-- Grid 3 Columns -->
<Frame
    layout="grid"
    gridColumns="3"
    gap="30px"
    width="100%"
/>

<!-- Horizontal Stack -->
<Frame
    layout="stack"
    stackDirection="horizontal"
    gap="40px"
    stackAlignment="start"
    stackDistribution="space-between"
/>
```

---

**Ready to build! Use these templates as starting points.** ✨
