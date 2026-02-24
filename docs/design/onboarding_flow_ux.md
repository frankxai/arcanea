# Arcanean Onboarding Flow
## The Creator's Arrival - Visual UX Design

---

## Onboarding Philosophy

Onboarding to Arcanea is not a tutorial - it's a magical initiation. Creators arrive from scattered platforms, seeking a home. The first experience must feel like crossing a threshold into the Kingdom of Light, where their creative potential finally has form.

**Goals:**
1. Create immediate sense of wonder and belonging
2. Identify creator's primary creative interest (academy)
3. Introduce Guardian AI companion
4. Enable first creation within 5 minutes
5. Showcase remix culture and community
6. Set up creator profile and realm foundation

**Design Principles:**
- Beautiful before functional (but both)
- Progressive disclosure (don't overwhelm)
- Personalization immediate (no generic experience)
- Skip-friendly (creators can dive straight in)
- Celebration moments (spark ceremonies)

---

## Flow Overview

```
Landing → Sign Up → Academy Choice → Guardian Bond →
First Creation → Realm Foundation → Community Discovery → Dashboard
```

**Total Time**: 5-7 minutes (2 minutes minimum path)
**Completion Rate Target**: 85%+
**Skip Options**: Available after step 3

---

## Screen 1: Landing Page

### Visual Design

**Hero Section**
- Full-viewport cosmic background
- Animated star particles drifting
- Central headline with prismatic shimmer
- Subheadline with typing animation
- Dual CTA (Sign Up / Learn More)

```
+----------------------------------------------------------+
|                    [Logo: Arcanea]                       |
|                                                          |
|         The Platform Where Anyone Creates Anything       |
|                    Through Magic                         |
|                                                          |
|     Your scattered creations finally have a home.        |
|        One identity. Infinite worlds. Pure magic.        |
|                                                          |
|      [Get Started - Cosmic gradient button]             |
|      [Watch Video - Ghost button]                        |
|                                                          |
|  🌊 Story    🐉 Visual    ✨ Music    🔄 Remix          |
+----------------------------------------------------------+
```

**Design Specifications:**

**Background:**
```css
background: radial-gradient(ellipse at center,
  #1f2347 0%,
  #16213e 40%,
  #0a0a0f 100%
);
```
- Animated particles (40-50 stars)
- Slow cosmic drift animation
- Subtle nebula glow effects

**Headline:**
```
Font: Space Grotesk Bold
Size: 64px (desktop) / 36px (mobile)
Color: Transcendent (#d6d9f2)
Effect: Subtle prismatic shimmer on hover
Letter-spacing: -0.02em
Line-height: 1.1
```

**Subheadline:**
```
Font: Inter Regular
Size: 24px (desktop) / 18px (mobile)
Color: Celestial (#b8c6ed)
Line-height: 1.6
Typing animation: 40ms per character
```

**Primary CTA:**
```css
background: linear-gradient(135deg, #5c8bd9 0%, #7ba3e3 100%);
padding: 16px 48px;
border-radius: 12px;
font-size: 20px;
font-weight: 700;
box-shadow: 0 8px 32px rgba(91, 139, 217, 0.4),
            0 0 48px rgba(91, 139, 217, 0.2);
transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);

&:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(91, 139, 217, 0.5),
              0 0 64px rgba(91, 139, 217, 0.3);
}
```

**Academy Preview Icons:**
- 48px icon size
- Academy-colored glows
- Hover to see academy name
- Subtle bounce animation on load

**Below Fold:**
- Feature showcase (3 columns on desktop)
- Creator testimonials
- Sample creations carousel
- Stats (creators, essences, realms)

---

## Screen 2: Sign Up

### Visual Design

**Modal Layout**
- Centered on cosmic background
- Blurred backdrop
- Card with glow effect
- Academy colors subtle in background

```
+----------------------------------------+
|            Welcome, Creator            |
|                                        |
|  Choose your path to begin your magic  |
|                                        |
|  [Continue with Google]                |
|  [Continue with Discord]               |
|  [Continue with Email]                 |
|                                        |
|  Or create with email:                 |
|  [Email Input                      ]   |
|  [Password Input                   ]   |
|  [Create Account]                      |
|                                        |
|  Already have an account? [Sign In]    |
+----------------------------------------+
```

**Design Specifications:**

**Modal Card:**
```css
background: rgba(22, 33, 62, 0.95);
backdrop-filter: blur(16px);
border: 2px solid #5c8bd9;
border-radius: 24px;
padding: 48px;
max-width: 480px;
box-shadow: 0 24px 64px rgba(91, 139, 217, 0.3),
            0 0 96px rgba(91, 139, 217, 0.2);
```

**Heading:**
```
Font: Space Grotesk Bold
Size: 32px
Color: Transcendent (#d6d9f2)
Margin-bottom: 16px
Text-align: center
```

**Social Auth Buttons:**
```css
display: flex;
align-items: center;
justify-content: center;
gap: 12px;
padding: 14px 24px;
background: #1f2347;
border: 1px solid #3d4f73;
border-radius: 12px;
font-size: 16px;
transition: all 200ms ease;

&:hover {
  border-color: #5c8bd9;
  background: #2a2d5a;
  box-shadow: 0 0 16px rgba(91, 139, 217, 0.2);
}
```

**Input Fields:**
```css
background: #1f2347;
border: 2px solid #3d4f73;
border-radius: 8px;
padding: 14px 16px;
font-size: 16px;
color: #b8c6ed;

&:focus {
  outline: none;
  border-color: #5c8bd9;
  box-shadow: 0 0 24px rgba(91, 139, 217, 0.2);
}
```

**Features:**
- Password strength indicator with cosmic glow
- Real-time email validation
- Error messages with gentle shake animation
- Loading state with cosmic spinner
- Privacy policy link (subtle, footer)

---

## Screen 3: Academy Choice

### Visual Design

**Full-Screen Academy Selection**
- Three large academy cards
- Animated on entry
- Hover effects rich and magical
- Each card reveals academy personality

```
+----------------------------------------------------------+
|              Choose Your First Academy                    |
|                                                          |
|  Where will your creative journey begin?                 |
|  (You can explore all academies later)                   |
|                                                          |
|  +---------------+  +---------------+  +---------------+ |
|  | 🌊 Atlantean |  | 🐉 Draconic  |  | ✨ Creation  | |
|  |   Academy    |  |   Academy    |  |   & Light    | |
|  |              |  |              |  |              | |
|  | Storytelling |  |    Visual    |  |    Music     | |
|  |   & Lore     |  |   Creation   |  |    & Audio   | |
|  |              |  |              |  |              | |
|  | Weave worlds |  | Breathe fire |  |  Channel     | |
|  |   through    |  |     into     |  | frequencies  | |
|  |   narrative  |  |    vision    |  |  into sound  | |
|  |              |  |              |  |              | |
|  | [Begin   →]  |  | [Begin   →]  |  | [Begin   →]  | |
|  +---------------+  +---------------+  +---------------+ |
|                                                          |
|                    [Skip - Choose Later]                 |
+----------------------------------------------------------+
```

**Design Specifications:**

**Academy Cards:**
```css
width: 360px;
height: 480px;
background: Academy-specific gradient with 10% opacity;
border: 2px solid Academy-color;
border-radius: 16px;
padding: 32px;
position: relative;
overflow: hidden;
transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);

/* Animated background effect */
&::before {
  content: '';
  position: absolute;
  inset: 0;
  background: Academy-specific texture/pattern;
  opacity: 0.05;
  animation: subtle-drift 20s ease-in-out infinite;
}

&:hover {
  transform: translateY(-12px) scale(1.05);
  border-width: 3px;
  box-shadow: 0 24px 64px rgba(Academy-color, 0.4),
              0 0 96px rgba(Academy-color, 0.3);
}
```

**Atlantean Card Specific:**
```css
background: linear-gradient(135deg,
  rgba(13, 58, 82, 0.1) 0%,
  rgba(17, 138, 178, 0.1) 100%
);
border-color: #118ab2;

&::before {
  background: url('water-texture.svg');
  animation: water-flow 8s ease-in-out infinite;
}

&:hover {
  box-shadow: 0 24px 64px rgba(17, 138, 178, 0.4),
              0 0 96px rgba(6, 174, 213, 0.3);
}
```

**Draconic Card Specific:**
```css
background: linear-gradient(135deg,
  rgba(139, 38, 53, 0.1) 0%,
  rgba(230, 57, 70, 0.1) 100%
);
border-color: #e63946;

&::before {
  background: url('scales-texture.svg');
  animation: fire-flicker 3s ease-in-out infinite;
}

&:hover {
  box-shadow: 0 24px 64px rgba(230, 57, 70, 0.4),
              0 0 96px rgba(244, 162, 97, 0.3);
}
```

**Creation & Light Card Specific:**
```css
background: linear-gradient(135deg,
  rgba(255, 215, 0, 0.05) 0%,
  rgba(183, 148, 246, 0.05) 100%
);
border-color: #ffd700;

&::before {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: prismatic-pulse 4s ease-in-out infinite;
}

&:hover {
  box-shadow: 0 24px 64px rgba(255, 215, 0, 0.4),
              0 0 96px rgba(183, 148, 246, 0.3);
}
```

**Academy Icon:**
- 80px size
- Academy color
- Animated entrance (scale in + glow)
- Subtle hover animation

**Academy Title:**
```
Font: Space Grotesk Bold
Size: 28px
Color: Academy-color
Margin-bottom: 12px
```

**Academy Description:**
```
Font: Inter Regular
Size: 16px
Color: Celestial
Line-height: 1.6
```

**Selection Animation:**
- Card grows and centers
- Other cards fade out
- Particle burst effect
- Transition to next screen

---

## Screen 4: Guardian Bond

### Visual Design

**Guardian Introduction**
- Full-screen with academy-themed background
- Guardian avatar animates in
- Typing animation for greeting
- Personality quiz (3-4 questions)

```
+----------------------------------------------------------+
|                                                          |
|              [Guardian Avatar - Animated]                |
|                                                          |
|              "Hello, Creator. I am your                  |
|               personal Guardian companion."              |
|                                                          |
|     "I'll learn your creative style and help you         |
|      manifest your visions into reality."                |
|                                                          |
|           Let's get to know each other...                |
|                                                          |
|  What brings you to Arcanea today?                       |
|                                                          |
|  ( ) I want to create music                              |
|  ( ) I want to tell stories                              |
|  ( ) I want to create visuals                            |
|  ( ) I want to build a world                             |
|  ( ) I want to explore and remix                         |
|                                                          |
|                         [Continue →]                     |
+----------------------------------------------------------+
```

**Design Specifications:**

**Guardian Avatar:**
- 120px circular avatar
- Subtle glow with academy colors
- Breathing animation (scale pulse)
- Eye contact simulation (subtle movement)

```css
.guardian-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid var(--academy-color);
  box-shadow: 0 0 32px rgba(var(--academy-color-rgb), 0.5),
              0 0 64px rgba(var(--academy-color-rgb), 0.3);
  animation: guardian-breathe 4s ease-in-out infinite;
}

@keyframes guardian-breathe {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 32px rgba(var(--academy-color-rgb), 0.5);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 48px rgba(var(--academy-color-rgb), 0.7);
  }
}
```

**Guardian Speech:**
```
Font: Space Grotesk Medium
Size: 20px
Color: Academy-color
Line-height: 1.6
Text-align: center
Max-width: 600px
Typing animation: 30ms per character
```

**Question Options:**
```css
.option-card {
  background: rgba(31, 35, 71, 0.6);
  border: 2px solid #3d4f73;
  border-radius: 12px;
  padding: 20px 24px;
  cursor: pointer;
  transition: all 200ms ease;

  &:hover {
    border-color: var(--academy-color);
    background: rgba(31, 35, 71, 0.8);
    box-shadow: 0 0 24px rgba(var(--academy-color-rgb), 0.2);
  }

  &.selected {
    border-color: var(--academy-color);
    background: rgba(var(--academy-color-rgb), 0.1);
    box-shadow: 0 0 32px rgba(var(--academy-color-rgb), 0.3);
  }
}
```

**Questions Flow:**
1. What brings you here? (creative goal)
2. What's your experience level? (beginner/intermediate/advanced)
3. What inspires you most? (nature/technology/emotion/stories)

**Features:**
- Each answer remembered and influences future suggestions
- Guardian responds to each answer with personalized message
- Smooth transitions between questions
- Progress indicator (3/3 steps)

---

## Screen 5: First Creation

### Visual Design

**Simplified Creation Studio**
- Minimal interface focusing on prompt input
- Guardian presence constant
- Real-time generation preview
- Celebration on completion

```
+----------------------------------------------------------+
|  [Guardian] "Let's create your first Essence together."  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  Describe what you want to create...              |  |
|  |                                                    |  |
|  |  [Large text input area with placeholder]         |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|  [Guardian Suggestion Button] "Try a suggested prompt"  |
|                                                          |
|  Style: [Dropdown - Optional]                            |
|  Length: [Slider - Optional]                             |
|                                                          |
|             [✨ Generate Essence]                        |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |         [Preview Area - Generating...]            |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
+----------------------------------------------------------+
```

**Design Specifications:**

**Prompt Input:**
```css
.prompt-input {
  background: #1f2347;
  border: 2px solid #5c8bd9;
  border-radius: 12px;
  padding: 20px;
  font-size: 18px;
  color: #b8c6ed;
  min-height: 120px;
  resize: vertical;

  &::placeholder {
    color: #7ba3e3;
    opacity: 0.6;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 32px rgba(91, 139, 217, 0.3);
  }
}
```

**Guardian Suggestion:**
- Small button with Guardian avatar
- Click to populate prompt with suggestion
- Multiple suggestions available
- Tooltip on hover showing what it does

**Generation Process:**
1. Button transforms to loading state
2. Cosmic loader appears in preview
3. Progress messages from Guardian
4. Preview gradually reveals (fade in)
5. Completion celebration (sparkle burst)

**Celebration Modal:**
```
+----------------------------------------+
|          ✨ Essence Created! ✨       |
|                                        |
|    [Preview of created essence]        |
|                                        |
|  "Congratulations! You've created     |
|   your first Essence in Arcanea."     |
|                                        |
|  This is now part of the Kingdom      |
|  of Light, and part of your Realm.    |
|                                        |
|  [Add to Realm] [Create Another]      |
+----------------------------------------+
```

---

## Screen 6: Realm Foundation

### Visual Design

**Realm Setup**
- Name your realm
- Choose realm theme
- Add first essence automatically
- Introduction to realm concept

```
+----------------------------------------------------------+
|              🌟 Your Realm Awaits 🌟                     |
|                                                          |
|  A Realm is your creative universe - a home for all     |
|  your Essences, visible to the Arcanean community.      |
|                                                          |
|  Realm Name:                                             |
|  [Input: "My Arcanean Realm"]                            |
|                                                          |
|  Choose a theme:                                         |
|  +------------+  +------------+  +------------+          |
|  |  Cosmic    |  | Atlantean  |  |  Draconic  |          |
|  |   Night    |  |   Depths   |  |    Fire    |          |
|  +------------+  +------------+  +------------+          |
|                                                          |
|  Your first Essence has been added to your Realm!        |
|                                                          |
|  [Preview of realm with first essence]                   |
|                                                          |
|                  [Create My Realm →]                     |
+----------------------------------------------------------+
```

**Design Specifications:**

**Theme Cards:**
```css
.theme-card {
  width: 200px;
  height: 160px;
  border-radius: 12px;
  border: 2px solid transparent;
  background: Theme-specific preview;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 300ms ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: Theme gradient;
    opacity: 0;
    transition: opacity 300ms ease;
  }

  &:hover::before,
  &.selected::before {
    opacity: 0.3;
  }

  &.selected {
    border-color: Theme-color;
    box-shadow: 0 0 32px rgba(Theme-color, 0.4);
  }
}
```

**Realm Preview:**
- Simple canvas showing essence card
- Academy-themed background
- Gentle animations
- "You can add more later" message

---

## Screen 7: Community Discovery

### Visual Design

**Community Introduction**
- Showcase remix culture
- Suggest creators to follow
- Show trending essences
- Introduce ARC system

```
+----------------------------------------------------------+
|           Welcome to the Arcanean Community              |
|                                                          |
|  Remix, collaborate, and inspire. That's how magic       |
|  spreads in Arcanea.                                     |
|                                                          |
|  Trending Essences:                                      |
|  +-------------+  +-------------+  +-------------+       |
|  | [Essence 1] |  | [Essence 2] |  | [Essence 3] |       |
|  +-------------+  +-------------+  +-------------+       |
|                                                          |
|  Suggested Creators:                                     |
|  +-------------+  +-------------+  +-------------+       |
|  | [Creator 1] |  | [Creator 2] |  | [Creator 3] |       |
|  | [Follow]    |  | [Follow]    |  | [Follow]    |       |
|  +-------------+  +-------------+  +-------------+       |
|                                                          |
|  💎 You've earned 100 ARC for creating your first        |
|  Essence! Use ARC to unlock advanced features.           |
|                                                          |
|              [Explore Community →]                       |
|              [Skip to Dashboard]                         |
+----------------------------------------------------------+
```

**Design Specifications:**

**Essence Cards (Small):**
- 280px x 240px
- Thumbnail preview
- Creator name
- Remix button visible on hover
- Academy badge in corner

**Creator Cards:**
```css
.creator-card {
  width: 200px;
  background: #16213e;
  border: 1px solid #3d4f73;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
}

.creator-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 12px;
  border: 2px solid var(--academy-color);
}

.follow-button {
  width: 100%;
  padding: 8px 16px;
  background: #5c8bd9;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
}
```

**ARC Notification:**
```css
.arc-earned {
  background: linear-gradient(135deg, #ffd700 0%, #feca57 100%);
  color: #1a1a2e;
  padding: 20px 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 8px 32px rgba(255, 215, 0, 0.3);
  animation: slide-in-bottom 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Screen 8: Dashboard

### Visual Design

**Creator Dashboard**
- Personalized welcome
- Quick actions prominent
- Recent activity
- Next steps suggestions
- Guardian always accessible

```
+----------------------------------------------------------+
| [Nav Bar] Home | Create | Explore | Realm | Profile      |
+----------------------------------------------------------+
|                                                          |
|  Welcome back, [Creator Name] 👋                         |
|  You're part of the [Academy Name] Academy               |
|                                                          |
|  +----------------------+  +-------------------------+   |
|  | Quick Create        |  | Your Latest Essence     |   |
|  |                     |  | [Preview]               |   |
|  | 🎵 Music            |  | "First Creation"        |   |
|  | 📖 Story            |  | 42 views, 3 remixes     |   |
|  | 🎨 Visual           |  +-------------------------+   |
|  +----------------------+                                |
|                                                          |
|  Recent Activity:                                        |
|  • Creator X remixed your Essence                        |
|  • You earned 50 ARC                                     |
|  • New lesson available in Atlantean Academy             |
|                                                          |
|  Next Steps:                                             |
|  ⭐ Create your second Essence                           |
|  ⭐ Explore other creators                               |
|  ⭐ Join a Remix Festival                                |
|                                                          |
|  [Guardian Avatar] "Ready to create something magical?"  |
+----------------------------------------------------------+
```

**Onboarding Complete!**

---

## Mobile Adaptations

All screens adapt to mobile:
- Single column layouts
- Larger touch targets
- Swipe gestures for navigation
- Bottom-sheet modals
- Simplified academy selection (vertical stack)
- Thumb-zone optimized CTAs

---

## Success Metrics

**Key Performance Indicators:**
- Completion rate: 85%+ target
- Time to first creation: < 5 minutes
- Academy selection rate: 90%+ make choice
- First essence creation: 80%+ complete
- Realm creation: 75%+ complete
- Follow 1+ creator: 60%+

**Tracking Points:**
1. Landing page view
2. Sign up start
3. Sign up complete
4. Academy selected
5. Guardian bond complete
6. First essence created
7. Realm created
8. Community explored
9. Dashboard reached

---

## Quick Reference

**Flow**: Landing → Sign Up → Academy → Guardian → Create → Realm → Community → Dashboard

**Total Time**: 5-7 minutes (2 min minimum)

**Skip Points**: After academy choice

**Celebration Moments**: Academy choice, first creation, realm creation, ARC earned

**Academy Colors**: Atlantean (#118ab2) | Draconic (#e63946) | Creation (#ffd700)

---

**"The first moments define the entire journey. Make them magical."**
