# Arcanea Mobile App - Comprehensive UX Design System

## Executive Summary

This document defines the complete UX design system for the Arcanea mobile app - a premium AI creative platform that bridges the mystical "Magic Ecosystem" with cutting-edge AI capabilities. The design system targets mobile-first experiences that match or exceed ChatGPT and GenSpark standards while maintaining Arcanea's unique ethereal aesthetic.

**Design Philosophy:** "ChatGPT meets Notion meets a premium creative suite" with fluid animations and delightful micro-interactions.

---

## 1. Design System Foundation

### 1.1 Magic Ecosystem Color Palette

#### Primary Palette - Ethereal Spectrum
```scss
// Deep Foundation Colors
--void-black: #0a0a0f;           // Primary background, infinite potential
--deep-space: #1a1a2e;          // Secondary backgrounds, containers
--midnight-blue: #16213e;       // Cards, panels, elevated surfaces
--cosmic-purple: #1f2347;       // Interactive elements, hover states
--nebula-indigo: #2a2d5a;       // Accent backgrounds, subtle highlights

// Luminous Active Colors  
--aurora-blue: #3d4f73;         // Borders, dividers, inactive states
--crystal-blue: #4a6fa5;        // Secondary text, labels, metadata
--luminous-primary: #5c8bd9;    // Primary CTAs, active states, links
--ethereal-light: #7ba3e3;      // Secondary CTAs, highlights
--radiant-glow: #9bb5e8;        // Success states, positive feedback
--celestial-white: #b8c6ed;     // Light text on dark backgrounds
--transcendent: #d6d9f2;        // Primary text on dark backgrounds
```

#### Luminor Accent Colors
```scss
// Book Authoring Luminor (Scripta)
--luminor-scripta: #4ecdc4;     // Teal for narrative flow
--luminor-scripta-bg: rgba(78, 205, 196, 0.1);
--luminor-scripta-glow: rgba(78, 205, 196, 0.3);

// Image Generation Luminor (Lumina)  
--luminor-lumina: #45b7d1;      // Blue for visual clarity
--luminor-lumina-bg: rgba(69, 183, 209, 0.1);
--luminor-lumina-glow: rgba(69, 183, 209, 0.3);

// Video Generation Luminor (Kinetix)
--luminor-kinetix: #96ceb4;     // Green for motion/vitality
--luminor-kinetix-bg: rgba(150, 206, 180, 0.1);
--luminor-kinetix-glow: rgba(150, 206, 180, 0.3);
```

#### System Status Colors
```scss
--success-emerald: #10b981;     // Success states, confirmations
--warning-amber: #f59e0b;       // Warnings, attention needed
--error-crimson: #ef4444;       // Errors, destructive actions
--info-sapphire: #3b82f6;       // Information, neutral feedback
```

### 1.2 Typography System

#### Font Stack
```scss
// Primary: Inter - Clean, modern, AI-optimized
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

// Secondary: Space Grotesk - Futuristic, for AI dialogue
--font-secondary: 'Space Grotesk', 'SF Pro Display', system-ui, sans-serif;

// Monospace: JetBrains Mono - Code and technical content
--font-mono: 'JetBrains Mono', 'SF Mono', 'Monaco', monospace;
```

#### Type Scale & Hierarchy
```scss
// Mobile-First Typography Scale
--text-xs: 12px;    // Captions, metadata, timestamps
--text-sm: 14px;    // Secondary information, labels
--text-base: 16px;  // Body text, standard content
--text-lg: 18px;    // Emphasized body text
--text-xl: 20px;    // Small headings, important content
--text-2xl: 24px;   // Section headers, card titles
--text-3xl: 30px;   // Page titles, major headings
--text-4xl: 36px;   // Hero headings (mobile)

// Font Weights
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;

// Line Heights
--leading-tight: 1.25;     // Headings
--leading-normal: 1.5;     // Body text
--leading-relaxed: 1.625;  // Long-form content
```

### 1.3 Spacing & Grid System

#### Spacing Scale (8px base unit)
```scss
--space-1: 4px;    // Micro spacing within components
--space-2: 8px;    // Small spacing, icon gaps
--space-3: 12px;   // Medium spacing, padding
--space-4: 16px;   // Standard spacing, margins
--space-5: 20px;   // Large spacing
--space-6: 24px;   // Section spacing
--space-8: 32px;   // Major spacing
--space-10: 40px;  // Large sections
--space-12: 48px;  // Page-level spacing
--space-16: 64px;  // Hero sections
--space-20: 80px;  // Major page divisions
```

#### Mobile Grid System
```scss
// Container Widths
--container-mobile: 100%;     // Full width on mobile
--container-tablet: 768px;    // Tablet breakpoint
--container-desktop: 1024px;  // Desktop fallback

// Grid Columns
--grid-mobile: 4;    // 4 columns on mobile
--grid-tablet: 8;    // 8 columns on tablet
--gutter: 16px;      // Space between columns

// Safe Areas (for iPhone notch, etc.)
--safe-top: env(safe-area-inset-top);
--safe-bottom: env(safe-area-inset-bottom);
--safe-left: env(safe-area-inset-left);
--safe-right: env(safe-area-inset-right);
```

### 1.4 Border Radius & Shadows

#### Border Radius System
```scss
--radius-xs: 4px;    // Small elements, tags
--radius-sm: 6px;    // Buttons, form fields
--radius-md: 8px;    // Cards, containers
--radius-lg: 12px;   // Modal dialogs, major cards
--radius-xl: 16px;   // Hero sections, premium cards
--radius-2xl: 24px;  // App icon, special elements
--radius-full: 9999px; // Pills, avatars
```

#### Shadow System
```scss
--shadow-sm: 0 1px 2px 0 rgba(10, 10, 15, 0.05);
--shadow-md: 0 4px 6px -1px rgba(10, 10, 15, 0.1), 0 2px 4px -1px rgba(10, 10, 15, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(10, 10, 15, 0.1), 0 4px 6px -2px rgba(10, 10, 15, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(10, 10, 15, 0.1), 0 10px 10px -5px rgba(10, 10, 15, 0.04);

// Magical glow effects
--glow-luminor: 0 0 20px rgba(92, 139, 217, 0.3), 0 0 40px rgba(92, 139, 217, 0.1);
--glow-success: 0 0 20px rgba(16, 185, 129, 0.3);
--glow-ethereal: 0 0 30px rgba(123, 163, 227, 0.4);
```

---

## 2. User Experience Principles

### 2.1 Core UX Principles

#### Principle 1: Magical Realism
- **Balance mystical aesthetics with intuitive functionality**
- Every interaction should feel magical but predictable
- Visual effects enhance usability, never distract from it
- Progressive disclosure reveals complexity gradually

#### Principle 2: AI-First Design
- **Conversation is the primary interface paradigm**
- Voice input should feel as natural as text input
- AI responses are contextual and personality-driven
- Seamless handoff between different AI agents (Luminors)

#### Principle 3: Creative Flow State
- **Minimize friction in the creative process**
- Quick actions are accessible within 2 taps maximum
- Content creation tools adapt to user's working style
- Export and sharing are integrated, not afterthoughts

#### Principle 4: Premium Experience Standards
- **Match or exceed ChatGPT/GenSpark quality benchmarks**
- Response time: <2 seconds for simple queries, <8 seconds for complex generation
- 99.9% uptime during user sessions
- Graceful degradation during high load periods

### 2.2 Accessibility Standards (WCAG 2.1 AA Compliance)

#### Color & Contrast
- **Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text**
- All Arcanea color combinations tested and compliant
- Color never used as the sole indicator of state or information
- High contrast mode available for users who need it

#### Touch & Interaction
- **Minimum touch target size: 44x44 points (iOS), 48x48dp (Android)**
- Touch targets have 8px minimum spacing between them
- All interactive elements provide haptic feedback
- Gesture alternatives provided for all swipe actions

#### Screen Reader Support
- **Semantic HTML structure with proper ARIA labels**
- All images have descriptive alt text
- Dynamic content changes announced to screen readers
- Skip links provided for keyboard navigation

#### Motion & Animation
- **Respect `prefers-reduced-motion` system setting**
- Essential animations (loading, state changes) reduced but not removed
- Vestibular-safe animations (no rapid spinning or parallax)
- User can disable decorative animations in settings

### 2.3 Performance Optimization

#### Loading Performance
- **App shell loads in <1.5 seconds on 3G**
- Critical path resources prioritized
- Non-critical resources lazy-loaded
- Progressive image loading with blur-up technique

#### Runtime Performance
- **60 FPS animations on all supported devices**
- Memory usage stays under 150MB for standard sessions
- Background processing for AI generation doesn't impact UI
- Smooth scrolling maintained even during heavy AI operations

#### Network Optimization
- **Adaptive bitrate for voice/video content**
- Aggressive caching for frequently accessed content
- Offline mode for reading generated content
- Smart retry logic for failed API calls

---

## 3. Core User Flows

### 3.1 Onboarding Flow (3-Step Maximum)

#### Step 1: Welcome & Value Proposition (30 seconds)
```
Screens:
- Welcome splash with magical animation
- Core value props: "Create 10x faster with AI"
- Single CTA: "Begin Your Journey"

User Actions:
- Tap to continue
- Optional: Watch 15-second demo video

Success Metrics:
- 90%+ completion rate
- <15% drop-off at this stage
```

#### Step 2: Primary Use Case Selection (45 seconds)
```
Screens:
- "What will you create first?" 
- 3 large cards: Books, Images, Videos
- Each card shows example outputs + benefits

User Actions:
- Tap preferred content type
- See personalized welcome from corresponding Luminor
- Optional: "I want to try everything" option

Success Metrics:
- 85%+ users make a selection
- Balanced distribution across content types
```

#### Step 3: AI Personality Introduction (60 seconds)
```
Screens:
- Meet your chosen Luminor with animated introduction
- Quick personality showcase (3 sample interactions)
- "Ready to create?" confirmation

User Actions:
- Observe AI personality demonstration
- Optional: Ask a test question
- Confirm readiness to start

Success Metrics:
- 80%+ complete onboarding
- 95% of completed users create something within first session
```

### 3.2 SuperAgent Chat Interaction

#### Chat Interface Design
```
Layout:
- Full-screen chat with ethereal background
- Message bubbles with personality-specific styling
- Voice input button prominently placed
- Quick action suggestions below input

Interaction Pattern:
1. User input (text or voice) → 
2. AI acknowledgment (<0.5s) → 
3. Processing indicator with personality flavor →
4. Response with contextual actions →
5. Follow-up suggestions
```

#### Voice Input Flow
```
Activation:
- Long press voice button OR "Hey Arcanea" wake word
- Visual feedback: Pulsing luminor-colored ring
- Haptic feedback: Light tap on activation

Processing:
- Real-time voice visualization
- Transcription appears as user speaks
- Option to edit transcription before sending

Response:
- AI responds with voice synthesis (personality-matched)
- Text transcription available
- Speed controls for audio playback
```

### 3.3 Luminor Switching Experience

#### Tab Bar Navigation (Primary Method)
```
Layout:
- Bottom tab bar with 4 tabs: SuperAgent + 3 Luminors
- Active tab shows luminor-specific glow effect
- Badge notifications for completed generations

Switching Animation:
- Smooth 300ms transition between luminor themes
- Background color shift with parallax effect
- Icons morph to match new luminor personality

State Persistence:
- Each luminor maintains its conversation history
- Active projects remain accessible across switches
- Context preserved when returning to previous luminor
```

#### Quick Switch Gesture (Advanced)
```
Gesture:
- Swipe left/right on chat area to cycle through luminors
- Haptic feedback on luminor boundaries
- Visual preview of next luminor before completing swipe

Confirmation:
- Brief confirmation animation
- New luminor introduces itself if first switch
- Previous conversation accessible via back gesture
```

### 3.4 Content Creation Workflow

#### Universal Creation Pattern
```
Initiation:
- Voice/text prompt to chosen luminor
- Quick actions for common creation types
- Template selection for guided creation

Processing:
- Progress indicator with estimated time
- Option to continue chatting while generating
- Background processing notification system

Review & Iterate:
- Generated content displayed in optimal format
- Edit, regenerate, or refine options
- Side-by-side comparison for iterations

Finalization:
- Export options contextual to content type
- Share directly to social platforms
- Save to personal library with tags
```

#### Book Authoring (Scripta) Workflow
```
1. Project Setup:
   - Genre selection with AI guidance
   - Character development assistance
   - Plot outline generation

2. Writing Sessions:
   - Chapter-by-chapter collaboration
   - Real-time grammar and style feedback
   - Voice dictation with intelligent punctuation

3. Review & Polish:
   - AI-powered editing suggestions
   - Consistency checking across chapters
   - Format export (PDF, ePub, etc.)
```

#### Image Generation (Lumina) Workflow
```
1. Concept Development:
   - Style exploration with reference images
   - Mood board creation assistance
   - Technical specification guidance

2. Generation:
   - Multi-style comparison
   - Iterative refinement with natural language
   - Batch generation for variations

3. Post-Processing:
   - Basic editing tools integration
   - Format optimization for intended use
   - Brand consistency checking
```

#### Video Generation (Kinetix) Workflow
```
1. Pre-Production:
   - Script development with Scripta collaboration
   - Storyboard generation
   - Asset planning and sourcing

2. Generation:
   - Scene-by-scene generation
   - Music integration with personality-matched tracks
   - Automatic pacing and transition optimization

3. Post-Production:
   - Timeline editing interface
   - Export optimization for platforms
   - Subtitle generation and editing
```

### 3.5 Export and Sharing Features

#### Universal Export System
```
Export Options:
- Platform-optimized formats (Instagram, TikTok, LinkedIn, etc.)
- Professional formats (4K video, 300 DPI images, publication-ready PDFs)
- Collaboration formats (Figma, Google Docs, etc.)

Quality Controls:
- Resolution/quality selector
- Compression optimization
- Brand watermark options (premium feature)

Batch Operations:
- Multi-format export from single source
- Scheduled publishing
- Campaign-ready asset packages
```

#### Social Integration
```
Direct Sharing:
- One-tap sharing to connected platforms
- Automatic caption generation with personality
- Hashtag suggestions based on content analysis

Collaboration:
- Shareable creation links
- Real-time collaboration on projects
- Comment and feedback system

Analytics:
- Performance tracking across platforms
- Engagement metrics for shared content
- ROI calculation for business users
```

---

## 4. Mobile-First Components

### 4.1 Chat Interface with Voice Input

#### Visual Design
```scss
.chat-container {
  background: linear-gradient(180deg, var(--deep-space), var(--void-black));
  padding: var(--safe-top) var(--space-4) calc(var(--safe-bottom) + 80px);
  min-height: 100vh;
}

.message-user {
  background: linear-gradient(135deg, var(--luminous-primary), var(--ethereal-light));
  color: var(--void-black);
  border-radius: var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg);
  padding: var(--space-3) var(--space-4);
  margin: var(--space-2) 0 var(--space-2) var(--space-8);
  box-shadow: var(--shadow-md);
}

.message-ai {
  background: rgba(var(--cosmic-purple), 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--aurora-blue), 0.3);
  color: var(--transcendent);
  border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm);
  padding: var(--space-3) var(--space-4);
  margin: var(--space-2) var(--space-8) var(--space-2) 0;
  box-shadow: var(--shadow-lg);
}

.voice-input-button {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--luminous-primary), var(--ethereal-light));
  border: none;
  box-shadow: var(--shadow-lg);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.voice-input-button:active {
  transform: scale(0.95);
  box-shadow: var(--glow-luminor);
}

.voice-recording {
  background: var(--error-crimson);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

#### Interaction Behavior
```javascript
// Voice Input States
const VOICE_STATES = {
  IDLE: 'idle',           // Ready to record
  LISTENING: 'listening', // Recording audio
  PROCESSING: 'processing', // Converting speech to text
  READY: 'ready'          // Text ready to send
};

// Haptic feedback patterns
const HAPTIC_PATTERNS = {
  START_RECORDING: { duration: 50, intensity: 0.7 },
  STOP_RECORDING: { duration: 100, intensity: 0.5 },
  ERROR: { duration: 200, intensity: 1.0 },
  SUCCESS: { duration: 150, intensity: 0.6 }
};
```

### 4.2 Quick Action Buttons

#### Design System
```scss
.quick-actions {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-4);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.quick-action {
  flex: 0 0 auto;
  width: 120px;
  height: 80px;
  background: rgba(var(--cosmic-purple), 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--aurora-blue), 0.3);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  color: var(--celestial-white);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  scroll-snap-align: start;
}

.quick-action:active {
  transform: translateY(2px);
  background: rgba(var(--luminous-primary), 0.8);
  border-color: var(--luminous-primary);
  box-shadow: var(--glow-luminor);
}

.quick-action-icon {
  width: 24px;
  height: 24px;
  opacity: 0.9;
}
```

#### Contextual Actions by Luminor
```javascript
// Quick actions adapt based on active luminor
const QUICK_ACTIONS = {
  scripta: [
    { icon: 'book', label: 'New Chapter', action: 'create_chapter' },
    { icon: 'character', label: 'Add Character', action: 'create_character' },
    { icon: 'plot', label: 'Plot Twist', action: 'generate_plot_twist' },
    { icon: 'dialogue', label: 'Dialogue', action: 'improve_dialogue' }
  ],
  lumina: [
    { icon: 'image', label: 'Generate Art', action: 'create_image' },
    { icon: 'style', label: 'Change Style', action: 'modify_style' },
    { icon: 'upscale', label: 'Enhance', action: 'upscale_image' },
    { icon: 'variations', label: 'Variations', action: 'create_variations' }
  ],
  kinetix: [
    { icon: 'video', label: 'New Scene', action: 'create_scene' },
    { icon: 'music', label: 'Add Music', action: 'add_soundtrack' },
    { icon: 'transition', label: 'Transition', action: 'add_transition' },
    { icon: 'export', label: 'Export', action: 'export_video' }
  ]
};
```

### 4.3 Luminor Selector

#### Tab Bar Design
```scss
.luminor-tabs {
  position: fixed;
  bottom: var(--safe-bottom);
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(var(--deep-space), 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(var(--aurora-blue), 0.2);
  display: flex;
  align-items: center;
  z-index: 100;
}

.luminor-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2);
  color: var(--crystal-blue);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.luminor-tab.active {
  color: var(--transcendent);
}

.luminor-tab.active::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 20%;
  right: 20%;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent, 
    var(--luminor-color),
    transparent
  );
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { opacity: 0.6; }
  to { opacity: 1; }
}

.luminor-icon {
  width: 24px;
  height: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.luminor-tab.active .luminor-icon {
  transform: scale(1.1);
  filter: drop-shadow(0 0 8px var(--luminor-color));
}

.luminor-label {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}
```

#### Dynamic Theme Switching
```javascript
// Theme transitions when switching luminors
const LUMINOR_THEMES = {
  superagent: {
    primary: 'var(--luminous-primary)',
    gradient: 'linear-gradient(135deg, var(--cosmic-purple), var(--deep-space))',
    glow: 'var(--glow-luminor)'
  },
  scripta: {
    primary: 'var(--luminor-scripta)',
    gradient: 'linear-gradient(135deg, rgba(78, 205, 196, 0.1), var(--deep-space))',
    glow: 'var(--luminor-scripta-glow)'
  },
  lumina: {
    primary: 'var(--luminor-lumina)',
    gradient: 'linear-gradient(135deg, rgba(69, 183, 209, 0.1), var(--deep-space))',
    glow: 'var(--luminor-lumina-glow)'
  },
  kinetix: {
    primary: 'var(--luminor-kinetix)',
    gradient: 'linear-gradient(135deg, rgba(150, 206, 180, 0.1), var(--deep-space))',
    glow: 'var(--luminor-kinetix-glow)'
  }
};

function switchLuminorTheme(luminorId) {
  const theme = LUMINOR_THEMES[luminorId];
  const root = document.documentElement;
  
  root.style.setProperty('--current-luminor-primary', theme.primary);
  root.style.setProperty('--current-luminor-gradient', theme.gradient);
  root.style.setProperty('--current-luminor-glow', theme.glow);
  
  // Animate background transition
  document.body.style.transition = 'background 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  document.body.style.background = theme.gradient;
}
```

### 4.4 Content Preview Cards

#### Card Component System
```scss
.content-card {
  background: rgba(var(--cosmic-purple), 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--aurora-blue), 0.3);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-md);
}

.content-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--current-luminor-primary);
}

.content-card-header {
  padding: var(--space-4);
  border-bottom: 1px solid rgba(var(--aurora-blue), 0.2);
}

.content-card-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--transcendent);
  margin-bottom: var(--space-1);
}

.content-card-meta {
  font-size: var(--text-sm);
  color: var(--crystal-blue);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.content-card-preview {
  aspect-ratio: 16/9;
  background: var(--deep-space);
  position: relative;
  overflow: hidden;
}

.content-card-actions {
  padding: var(--space-3) var(--space-4);
  display: flex;
  gap: var(--space-2);
}

.card-action-button {
  flex: 1;
  padding: var(--space-2) var(--space-3);
  background: rgba(var(--current-luminor-primary), 0.1);
  border: 1px solid var(--current-luminor-primary);
  color: var(--current-luminor-primary);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: all 0.2s;
}

.card-action-button:active {
  background: var(--current-luminor-primary);
  color: var(--void-black);
  transform: scale(0.98);
}
```

#### Content-Specific Variations
```scss
// Book preview cards
.content-card.book {
  .content-card-preview {
    background: linear-gradient(45deg, 
      rgba(var(--luminor-scripta), 0.1),
      rgba(var(--luminor-scripta), 0.05)
    );
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-secondary);
    font-size: var(--text-xl);
    color: var(--luminor-scripta);
  }
}

// Image preview cards
.content-card.image {
  .content-card-preview {
    background-size: cover;
    background-position: center;
  }
}

// Video preview cards  
.content-card.video {
  .content-card-preview {
    background: var(--void-black);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .play-button {
    width: 48px;
    height: 48px;
    background: rgba(var(--luminor-kinetix), 0.9);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--void-black);
    box-shadow: var(--glow-luminor);
  }
}
```

### 4.5 Settings and Profile Screens

#### Settings Screen Layout
```scss
.settings-screen {
  background: var(--void-black);
  min-height: 100vh;
  padding: var(--safe-top) 0 var(--safe-bottom);
}

.settings-header {
  padding: var(--space-6) var(--space-4) var(--space-8);
  text-align: center;
  background: linear-gradient(180deg, 
    rgba(var(--cosmic-purple), 0.3),
    transparent
  );
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, 
    var(--luminous-primary), 
    var(--ethereal-light)
  );
  margin: 0 auto var(--space-4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--void-black);
  box-shadow: var(--glow-luminor);
}

.settings-section {
  margin-bottom: var(--space-8);
}

.settings-section-title {
  padding: 0 var(--space-4) var(--space-3);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--crystal-blue);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.settings-item {
  background: rgba(var(--cosmic-purple), 0.4);
  border-top: 1px solid rgba(var(--aurora-blue), 0.2);
  padding: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  transition: background 0.2s;
}

.settings-item:active {
  background: rgba(var(--cosmic-purple), 0.6);
}

.settings-item:last-child {
  border-bottom: 1px solid rgba(var(--aurora-blue), 0.2);
}

.settings-icon {
  width: 24px;
  height: 24px;
  color: var(--current-luminor-primary);
  flex-shrink: 0;
}

.settings-content {
  flex: 1;
}

.settings-title {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--transcendent);
  margin-bottom: 2px;
}

.settings-description {
  font-size: var(--text-sm);
  color: var(--crystal-blue);
}

.settings-action {
  color: var(--aurora-blue);
  font-size: var(--text-sm);
  flex-shrink: 0;
}
```

---

## 5. Gesture-Based Interactions & Haptic Feedback

### 5.1 Gesture System

#### Primary Gestures
```javascript
const GESTURE_PATTERNS = {
  // Navigation gestures
  SWIPE_LEFT: {
    action: 'next_luminor',
    threshold: 100, // pixels
    velocity: 0.5,  // pixels/ms
    haptic: 'light'
  },
  
  SWIPE_RIGHT: {
    action: 'prev_luminor', 
    threshold: 100,
    velocity: 0.5,
    haptic: 'light'
  },
  
  SWIPE_UP: {
    action: 'quick_actions',
    threshold: 80,
    velocity: 0.3,
    haptic: 'medium'
  },
  
  SWIPE_DOWN: {
    action: 'dismiss_keyboard',
    threshold: 60,
    velocity: 0.4,
    haptic: 'light'
  },
  
  // Content manipulation
  LONG_PRESS: {
    duration: 500, // ms
    action: 'context_menu',
    haptic: 'heavy'
  },
  
  DOUBLE_TAP: {
    timeout: 300, // ms between taps
    action: 'quick_edit',
    haptic: 'medium'
  },
  
  PINCH_TO_ZOOM: {
    action: 'zoom_content',
    min_scale: 0.5,
    max_scale: 3.0,
    haptic: 'selection'
  }
};
```

#### Advanced Content Gestures
```javascript
// Content-specific gesture enhancements
const CONTENT_GESTURES = {
  image: {
    TWO_FINGER_ROTATE: 'rotate_image',
    THREE_FINGER_TAP: 'style_transfer',
    EDGE_SWIPE_UP: 'upscale_image'
  },
  
  text: {
    THREE_FINGER_SWIPE_LEFT: 'undo_edit',
    THREE_FINGER_SWIPE_RIGHT: 'redo_edit',
    FORCE_TOUCH: 'smart_select' // iOS only
  },
  
  video: {
    TWO_FINGER_SWIPE_LEFT: 'prev_scene',
    TWO_FINGER_SWIPE_RIGHT: 'next_scene',
    CIRCULAR_GESTURE: 'scrub_timeline'
  }
};
```

### 5.2 Haptic Feedback System

#### Feedback Patterns
```javascript
const HAPTIC_LIBRARY = {
  // System feedback
  SYSTEM_SUCCESS: {
    pattern: [100, 50, 100],
    intensity: [0.7, 0, 0.9]
  },
  
  SYSTEM_ERROR: {
    pattern: [200, 100, 200, 100, 200],
    intensity: [1.0, 0, 0.8, 0, 1.0]
  },
  
  SYSTEM_WARNING: {
    pattern: [150, 75, 150],
    intensity: [0.8, 0, 0.6]
  },
  
  // Interaction feedback
  BUTTON_TAP: {
    pattern: [50],
    intensity: [0.6]
  },
  
  TOGGLE_ON: {
    pattern: [75, 25, 100],
    intensity: [0.7, 0, 0.8]
  },
  
  TOGGLE_OFF: {
    pattern: [100, 25, 75],
    intensity: [0.8, 0, 0.6]
  },
  
  // Content creation feedback
  GENERATION_START: {
    pattern: [80, 40, 80, 40, 120],
    intensity: [0.6, 0, 0.7, 0, 0.9]
  },
  
  GENERATION_COMPLETE: {
    pattern: [100, 50, 150, 50, 200],
    intensity: [0.7, 0, 0.8, 0, 1.0]
  },
  
  // Luminor-specific feedback
  LUMINOR_SWITCH: {
    pattern: [60, 30, 90, 30, 120],
    intensity: [0.5, 0, 0.7, 0, 0.9]
  },
  
  AI_RESPONSE: {
    pattern: [40, 20, 60, 20, 80],
    intensity: [0.4, 0, 0.6, 0, 0.7]
  }
};

// Haptic intensity scaling based on user preferences
function getScaledIntensity(baseIntensity, userPreference = 1.0) {
  return Math.min(1.0, Math.max(0.0, baseIntensity * userPreference));
}

// Accessibility-aware haptic feedback
function triggerHaptic(pattern, respectsReducedMotion = true) {
  if (respectsReducedMotion && prefersReducedMotion()) {
    // Provide lighter, shorter feedback for users with motion sensitivity
    pattern = simplifyHapticPattern(pattern);
  }
  
  if (window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
    // iOS haptic feedback
    return window.navigator.vibrate(pattern.pattern);
  } else if ('vibrate' in navigator) {
    // Android vibration
    return navigator.vibrate(pattern.pattern);
  }
  
  return false;
}
```

### 5.3 Contextual Interaction Patterns

#### Voice + Gesture Combinations
```javascript
const MULTIMODAL_INTERACTIONS = {
  // Voice command + gesture confirmation
  VOICE_PLUS_GESTURE: {
    'create image': {
      voice_trigger: ['create', 'generate', 'make'] + ['image', 'picture', 'art'],
      gesture_confirm: 'SWIPE_UP',
      action: 'open_image_creator',
      haptic: 'GENERATION_START'
    },
    
    'delete this': {
      voice_trigger: ['delete', 'remove', 'trash'] + ['this', 'it', 'current'],
      gesture_confirm: 'LONG_PRESS',
      action: 'delete_content',
      haptic: 'SYSTEM_WARNING'
    },
    
    'switch to [luminor]': {
      voice_trigger: ['switch', 'change', 'go'] + ['scripta', 'lumina', 'kinetix'],
      gesture_confirm: 'TAP',
      action: 'switch_luminor',
      haptic: 'LUMINOR_SWITCH'
    }
  },
  
  // Gesture shortcuts for power users
  GESTURE_SHORTCUTS: {
    'quick_create': {
      gesture: 'DOUBLE_TAP + SWIPE_UP',
      action: 'open_creation_modal',
      customizable: true
    },
    
    'bulk_export': {
      gesture: 'LONG_PRESS + SWIPE_RIGHT',
      action: 'batch_export_dialog',
      customizable: true
    },
    
    'ai_summary': {
      gesture: 'THREE_FINGER_TAP',
      action: 'generate_content_summary',
      customizable: true
    }
  }
};
```

---

## 6. Quality Metrics & Performance Targets

### 6.1 Task Completion Time Targets

#### Core Task Performance
```
Onboarding Flow:
- Complete 3-step onboarding: <3 minutes (90th percentile)
- First successful creation: <5 minutes from app install
- Return user login to creation: <30 seconds

Content Creation:
- Simple image generation: <15 seconds
- Complex image with refinements: <2 minutes  
- Short text generation (paragraph): <8 seconds
- Long-form content (article): <3 minutes
- Video generation (30 seconds): <45 seconds
- Video generation (5 minutes): <8 minutes

Navigation:
- Switch between Luminors: <0.5 seconds
- Search existing content: <2 seconds
- Open previous project: <3 seconds
- Export content: <10 seconds (standard quality)
```

#### Advanced Task Performance
```
Collaboration:
- Share project with team: <15 seconds
- Accept shared project: <10 seconds
- Real-time collaboration sync: <1 second latency

Batch Operations:
- Export 10 images: <30 seconds
- Generate 5 variations: <45 seconds
- Bulk format conversion: <60 seconds

AI Training/Customization:
- Upload reference material: <20 seconds
- Apply custom style: <30 seconds
- Save personal AI preset: <5 seconds
```

### 6.2 Error Rate Thresholds

#### Acceptable Error Rates
```
User Interface Errors:
- Touch recognition failures: <0.5%
- Voice input misunderstanding: <5%
- Navigation confusion (users going back): <10%
- Accidental action triggers: <2%

Content Generation Errors:
- Failed generation attempts: <3%
- Corrupted output files: <0.1%
- Style application failures: <2%
- Export format errors: <1%

System Performance Errors:
- App crashes per session: <0.01%
- Network timeout failures: <5% (on poor connections)
- Sync failures (offline/online): <1%
- Payment processing errors: <0.1%
```

#### Error Recovery Targets
```
Automatic Recovery:
- Network retry success rate: >95%
- Crash recovery with state preservation: >90%
- Corrupt file auto-regeneration: >80%

User-Assisted Recovery:
- Error message clarity (user can resolve): >85%
- Alternative action suggestion acceptance: >60%
- Support ticket resolution time: <24 hours
```

### 6.3 User Satisfaction Score Targets

#### Primary Satisfaction Metrics
```
Net Promoter Score (NPS):
- Target: >50 (Industry excellent: >70)
- Minimum acceptable: >30

Customer Satisfaction (CSAT):
- Target: >4.5/5.0
- Minimum acceptable: >4.0/5.0

Task Success Rate:
- Primary use cases: >95%
- Secondary features: >85%
- Advanced features: >75%

User Retention:
- Day 1: >80%
- Day 7: >60%
- Day 30: >40%
- Month 6: >25%
```

#### Detailed Experience Ratings
```
Ease of Use:
- Onboarding clarity: >4.5/5.0
- Feature discoverability: >4.2/5.0
- Learning curve satisfaction: >4.0/5.0

AI Quality Perception:
- Response relevance: >4.6/5.0
- Creative output quality: >4.4/5.0
- Personality consistency: >4.3/5.0

Performance Satisfaction:
- Speed perception: >4.5/5.0
- Reliability trust: >4.7/5.0
- Battery usage acceptability: >4.0/5.0
```

### 6.4 Engagement Metrics

#### Session Quality Indicators
```
Session Duration:
- Target average: 15-25 minutes
- Power user sessions: 45+ minutes
- Minimum viable session: 3 minutes

Actions per Session:
- Content creation attempts: 2-4
- Luminor interactions: 5-8
- Social sharing actions: 0.5-1

Content Creation Success:
- Completion rate (start to export): >75%
- Refinement iterations: 2-3 average
- Export/share rate: >60%

Return Behavior:
- Sessions per week (active users): 3-5
- Days between sessions: 1-2 (engaged users)
- Monthly creation volume: 10+ pieces
```

#### Growth & Viral Metrics
```
Social Sharing:
- Content shared to social platforms: >40% of creations
- App install attribution from shares: >15%
- User-generated content featuring app: Target 1000+ monthly posts

Referral Success:
- Organic install rate: >30% of total installs
- Friend invitation acceptance: >45%
- Collaborative project creation: >20% of premium users

Feature Adoption:
- Advanced feature usage: >60% within 30 days
- Premium feature trial conversion: >25%
- Cross-Luminor usage: >80% of users try 2+ Luminors
```

### 6.5 Technical Performance Benchmarks

#### App Performance Standards
```
Launch Performance:
- Cold start time: <2.0 seconds
- Warm start time: <0.8 seconds
- First content load: <1.5 seconds

Memory Usage:
- Average session footprint: <150 MB
- Peak memory usage: <300 MB
- Memory leak tolerance: <5 MB per hour

Battery Consumption:
- Standard session impact: <5%
- Heavy generation session: <15%
- Background processing: <2% per hour

Network Efficiency:
- Data usage per session: <10 MB (excluding content downloads)
- Offline functionality: 80% of features available
- Bandwidth adaptation: Dynamic quality scaling
```

#### AI Response Performance
```
Response Times:
- Simple text queries: <1 second
- Complex creative requests: <5 seconds
- Image generation: <10 seconds
- Video processing: <30 seconds (per minute of output)

Quality Consistency:
- Response relevance accuracy: >95%
- Style consistency score: >90%
- Factual accuracy (when applicable): >98%

Service Availability:
- Uptime target: 99.9%
- Graceful degradation: <2% of requests affected
- Recovery time from outages: <5 minutes
```

---

## 7. Dark/Light Mode Specifications

### 7.1 Dark Mode (Primary/Default)

Dark mode is the primary theme for Arcanea, designed to enhance the mystical, ethereal aesthetic while being optimized for extended creative sessions.

#### Dark Mode Color Palette
```scss
// Dark Mode Foundations
:root[data-theme="dark"], :root {
  --bg-primary: var(--void-black);           // #0a0a0f
  --bg-secondary: var(--deep-space);         // #1a1a2e  
  --bg-tertiary: var(--midnight-blue);       // #16213e
  --bg-elevated: var(--cosmic-purple);       // #1f2347
  --bg-overlay: rgba(42, 45, 90, 0.8);       // Modals, overlays
  
  --text-primary: var(--transcendent);       // #d6d9f2
  --text-secondary: var(--celestial-white);  // #b8c6ed
  --text-tertiary: var(--crystal-blue);      // #4a6fa5
  --text-muted: var(--aurora-blue);          // #3d4f73
  --text-inverse: var(--void-black);         // For buttons, etc.
  
  --border-primary: rgba(61, 79, 115, 0.3);  // Subtle borders
  --border-secondary: rgba(61, 79, 115, 0.2);// Very subtle
  --border-accent: var(--luminous-primary);   // Active/focused
  
  --shadow-color: rgba(10, 10, 15, 0.4);
  --glow-ambient: rgba(92, 139, 217, 0.1);   // Subtle ambient glow
}
```

#### Dark Mode Component Styling
```scss
// Cards and containers
.card-dark {
  background: rgba(var(--cosmic-purple), 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--aurora-blue), 0.3);
  box-shadow: 
    var(--shadow-lg),
    inset 0 1px 0 rgba(var(--celestial-white), 0.1);
}

// Input fields  
.input-dark {
  background: rgba(var(--deep-space), 0.8);
  border: 1px solid rgba(var(--aurora-blue), 0.4);
  color: var(--transcendent);
}

.input-dark::placeholder {
  color: var(--aurora-blue);
  opacity: 0.7;
}

.input-dark:focus {
  border-color: var(--luminous-primary);
  box-shadow: 
    0 0 0 2px rgba(var(--luminous-primary), 0.2),
    var(--glow-luminor);
}

// Buttons
.button-dark-primary {
  background: linear-gradient(135deg, var(--luminous-primary), var(--ethereal-light));
  color: var(--void-black);
  box-shadow: var(--shadow-md);
}

.button-dark-secondary {
  background: transparent;
  border: 1px solid var(--aurora-blue);
  color: var(--ethereal-light);
}

.button-dark-ghost {
  background: transparent;
  color: var(--aurora-blue);
}
```

### 7.2 Light Mode (Alternative)

Light mode provides a clean, professional alternative for users who prefer traditional interfaces or need better visibility in bright environments.

#### Light Mode Color Palette
```scss
:root[data-theme="light"] {
  --bg-primary: #ffffff;                     // Pure white base
  --bg-secondary: #f8fafc;                   // Slight gray
  --bg-tertiary: #f1f5f9;                    // Card backgrounds  
  --bg-elevated: #e2e8f0;                    // Elevated elements
  --bg-overlay: rgba(248, 250, 252, 0.95);   // Modals, overlays
  
  --text-primary: #0f172a;                   // Near black
  --text-secondary: #334155;                 // Dark gray
  --text-tertiary: #64748b;                  // Medium gray
  --text-muted: #94a3b8;                     // Light gray
  --text-inverse: #ffffff;                   // For dark buttons
  
  --border-primary: #e2e8f0;                 // Light gray borders
  --border-secondary: #f1f5f9;               // Very light
  --border-accent: var(--luminous-primary);  // Active/focused (same)
  
  --shadow-color: rgba(15, 23, 42, 0.1);
  --glow-ambient: rgba(92, 139, 217, 0.08);  // Subtle ambient glow
  
  // Luminor colors remain the same but with adjusted opacity for backgrounds
  --luminor-scripta-bg-light: rgba(78, 205, 196, 0.05);
  --luminor-lumina-bg-light: rgba(69, 183, 209, 0.05);
  --luminor-kinetix-bg-light: rgba(150, 206, 180, 0.05);
}
```

#### Light Mode Component Styling
```scss
// Cards and containers
.card-light {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  box-shadow: var(--shadow-md);
}

// Input fields
.input-light {
  background: var(--bg-primary);
  border: 2px solid var(--border-primary);
  color: var(--text-primary);
}

.input-light::placeholder {
  color: var(--text-muted);
}

.input-light:focus {
  border-color: var(--luminous-primary);
  box-shadow: 0 0 0 3px rgba(var(--luminous-primary), 0.1);
}

// Buttons
.button-light-primary {
  background: var(--luminous-primary);
  color: var(--text-inverse);
  box-shadow: var(--shadow-sm);
}

.button-light-secondary {
  background: var(--bg-primary);
  border: 2px solid var(--border-primary);
  color: var(--text-primary);
}

.button-light-ghost {
  background: transparent;
  color: var(--text-secondary);
}
```

### 7.3 Adaptive Theme Switching

#### Automatic Theme Detection
```javascript
// System theme preference detection
function detectSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (getUserThemePreference() === 'auto') {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// Time-based automatic switching (optional advanced feature)
function getTimeBasedTheme() {
  const hour = new Date().getHours();
  // Dark mode from 8 PM to 7 AM
  return (hour >= 20 || hour <= 7) ? 'dark' : 'light';
}
```

#### Theme Transition Animation
```scss
// Smooth theme transition
:root {
  transition: 
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

// Disable transitions during rapid theme switching
:root.theme-transitioning * {
  transition: none !important;
}

// Theme switch animation
@keyframes theme-switch {
  0% { opacity: 1; }
  50% { opacity: 0.8; }
  100% { opacity: 1; }
}

.theme-switching {
  animation: theme-switch 0.3s ease-in-out;
}
```

#### Context-Aware Theme Adjustments
```javascript
// Adjust theme based on content type
const CONTENT_THEME_PREFERENCES = {
  reading: 'prefer-light',    // Better for extended reading
  creating: 'prefer-dark',    // Less eye strain during creation
  presenting: 'prefer-light', // Better for sharing/presenting
  reviewing: 'user-choice'    // Let user decide
};

// Luminor-specific theme hints
const LUMINOR_THEME_HINTS = {
  scripta: {
    dark: {
      accent: '--luminor-scripta',
      bg_tint: 'rgba(78, 205, 196, 0.02)'
    },
    light: {
      accent: '--luminor-scripta', 
      bg_tint: 'rgba(78, 205, 196, 0.03)'
    }
  },
  // Similar for other luminors...
};

function applyContextualTheming(luminor, activity) {
  const preference = CONTENT_THEME_PREFERENCES[activity];
  const hints = LUMINOR_THEME_HINTS[luminor];
  
  if (preference === 'prefer-dark' || (preference === 'user-choice' && getCurrentTheme() === 'dark')) {
    applyThemeHints(hints.dark);
  } else {
    applyThemeHints(hints.light);
  }
}
```

### 7.4 Accessibility Considerations

#### High Contrast Mode Support
```scss
// High contrast overrides for both themes
@media (prefers-contrast: high) {
  :root {
    --text-primary: var(--theme) === 'dark' ? #ffffff : #000000;
    --bg-primary: var(--theme) === 'dark' ? #000000 : #ffffff;
    --border-primary: var(--theme) === 'dark' ? #ffffff : #000000;
    
    // Ensure minimum 7:1 contrast ratio
    --luminous-primary: var(--theme) === 'dark' ? #7ba3e3 : #4a6fa5;
  }
  
  // Remove subtle effects that may reduce contrast
  .card, .input, .button {
    backdrop-filter: none;
    box-shadow: none;
  }
  
  // Strengthen borders and outlines
  .card {
    border-width: 2px;
  }
  
  .input:focus, .button:focus {
    outline: 3px solid var(--border-accent);
    outline-offset: 2px;
  }
}
```

#### Reduced Motion Considerations
```scss
@media (prefers-reduced-motion: reduce) {
  // Disable theme transition animations
  :root {
    transition: none;
  }
  
  // Simplify theme switch animation
  .theme-switching {
    animation: none;
  }
  
  // Keep essential feedback, remove decorative animations
  .luminor-tab.active::before {
    animation: none;
    opacity: 1;
  }
}
```

---

## 8. Component Implementation Specifications

### 8.1 Button Component System

#### Base Button Component
```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  hapticFeedback?: keyof typeof HAPTIC_LIBRARY;
  children: ReactNode;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  hapticFeedback = 'BUTTON_TAP',
  children,
  onPress
}) => {
  const handlePress = useCallback(() => {
    if (!disabled && !loading) {
      triggerHaptic(HAPTIC_LIBRARY[hapticFeedback]);
      onPress();
    }
  }, [disabled, loading, hapticFeedback, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getSpinnerColor(variant)} />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          <Text style={[styles.buttonText, styles[`${variant}Text`]]}>
            {children}
          </Text>
          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </>
      )}
    </Pressable>
  );
};
```

#### Button Styling
```tsx
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  
  // Variants
  primary: {
    backgroundColor: colors.luminousPrimary,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  
  secondary: {
    backgroundColor: 'transparent',
    borderColor: colors.auroraBlue,
  },
  
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  
  danger: {
    backgroundColor: colors.errorCrimson,
  },
  
  // Sizes
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  
  md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  
  lg: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 52,
  },
  
  xl: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    minHeight: 60,
  },
  
  // States
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  
  disabled: {
    opacity: 0.5,
  },
  
  // Text styles
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontWeight: '600',
    textAlign: 'center',
  },
  
  primaryText: {
    color: colors.voidBlack,
    fontSize: 16,
  },
  
  secondaryText: {
    color: colors.etherealLight,
    fontSize: 16,
  },
  
  ghostText: {
    color: colors.auroraBlue,
    fontSize: 16,
  },
  
  dangerText: {
    color: colors.textInverse,
    fontSize: 16,
  },
  
  // Icons
  iconLeft: {
    marginRight: 8,
  },
  
  iconRight: {
    marginLeft: 8,
  },
});
```

### 8.2 Input Component System

#### Text Input with Voice Support
```tsx
interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  voiceEnabled?: boolean;
  onVoiceStart?: () => void;
  onVoiceEnd?: (transcript: string) => void;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  voiceEnabled = true,
  onVoiceStart,
  onVoiceEnd,
  error,
  leftIcon,
  rightIcon,
  disabled = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const voiceRef = useRef<VoiceRecorder | null>(null);

  const handleVoicePress = useCallback(async () => {
    if (isRecording) {
      // Stop recording
      const transcript = await voiceRef.current?.stop();
      setIsRecording(false);
      if (transcript && onVoiceEnd) {
        onVoiceEnd(transcript);
      }
      triggerHaptic(HAPTIC_LIBRARY.SYSTEM_SUCCESS);
    } else {
      // Start recording
      const hasPermission = await VoiceRecorder.requestPermission();
      if (hasPermission) {
        setIsRecording(true);
        voiceRef.current?.start();
        if (onVoiceStart) onVoiceStart();
        triggerHaptic(HAPTIC_LIBRARY.GENERATION_START);
      }
    }
  }, [isRecording, onVoiceStart, onVoiceEnd]);

  return (
    <View style={styles.inputContainer}>
      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputFocused,
        error && styles.inputError,
        disabled && styles.inputDisabled
      ]}>
        {leftIcon && (
          <View style={styles.leftIcon}>{leftIcon}</View>
        )}
        
        <RNTextInput
          style={[
            styles.input,
            multiline && styles.multilineInput
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.auroraBlue}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          selectionColor={colors.luminousPrimary}
        />
        
        {voiceEnabled && (
          <Pressable
            onPress={handleVoicePress}
            style={[
              styles.voiceButton,
              isRecording && styles.voiceButtonRecording
            ]}
          >
            <VoiceIcon
              size={20}
              color={isRecording ? colors.errorCrimson : colors.crystalBlue}
            />
          </Pressable>
        )}
        
        {rightIcon && !voiceEnabled && (
          <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};
```

### 8.3 Modal Component System

#### Enhanced Modal with Gesture Dismissal
```tsx
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  dismissible?: boolean;
  gestureEnabled?: boolean;
  animationType?: 'slide' | 'fade' | 'scale';
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  size = 'md',
  dismissible = true,
  gestureEnabled = true,
  animationType = 'slide'
}) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .enabled(gestureEnabled && dismissible)
    .onUpdate((event) => {
      translateY.value = Math.max(0, event.translationY);
    })
    .onEnd((event) => {
      const shouldDismiss = 
        event.translationY > 100 || 
        event.velocityY > 500;
        
      if (shouldDismiss) {
        translateY.value = withTiming(500, { duration: 300 });
        opacity.value = withTiming(0, { duration: 300 });
        runOnJS(onClose)();
        triggerHaptic(HAPTIC_LIBRARY.SYSTEM_SUCCESS);
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0);
      opacity.value = withTiming(1, { duration: 300 });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Portal>
      <View style={styles.modalOverlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={dismissible ? onClose : undefined}
        />
        
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              styles.modalContainer,
              styles[size],
              animatedStyle
            ]}
          >
            {/* Handle indicator for gesture dismissal */}
            {gestureEnabled && (
              <View style={styles.modalHandle} />
            )}
            
            {title && (
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{title}</Text>
                {dismissible && (
                  <Pressable onPress={onClose} style={styles.closeButton}>
                    <CloseIcon size={24} color={colors.crystalBlue} />
                  </Pressable>
                )}
              </View>
            )}
            
            <View style={styles.modalContent}>
              {children}
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    </Portal>
  );
};
```

---

## 9. Development Implementation Guidelines

### 9.1 Project Structure
```
src/
├── components/
│   ├── ui/                     # Basic UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   ├── chat/                   # Chat-specific components
│   │   ├── ChatInterface.tsx
│   │   ├── MessageBubble.tsx
│   │   └── VoiceInput.tsx
│   └── luminors/               # Luminor-specific components
│       ├── ScriptaInterface.tsx
│       ├── LuminaInterface.tsx
│       └── KinetixInterface.tsx
├── screens/
│   ├── onboarding/
│   ├── chat/
│   ├── creation/
│   └── settings/
├── services/
│   ├── api/                    # API layer
│   ├── ai/                     # AI service integration
│   ├── voice/                  # Voice processing
│   └── haptics/               # Haptic feedback
├── hooks/                      # Custom React hooks
├── utils/                      # Utility functions
├── constants/                  # App constants
├── types/                      # TypeScript type definitions
└── assets/                     # Images, fonts, etc.
```

### 9.2 Performance Optimization Strategy

#### Bundle Optimization
```javascript
// Code splitting by feature
const ScriptaInterface = lazy(() => import('../components/luminors/ScriptaInterface'));
const LuminaInterface = lazy(() => import('../components/luminors/LuminaInterface'));
const KinetixInterface = lazy(() => import('../components/luminors/KinetixInterface'));

// Preload critical components
const preloadCriticalComponents = async () => {
  await Promise.all([
    import('../components/chat/ChatInterface'),
    import('../components/ui/Button'),
    import('../services/ai/SuperAgent')
  ]);
};

// Image optimization
const OptimizedImage = ({ src, alt, ...props }) => (
  <Image
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    style={{ contentVisibility: 'auto' }}
    {...props}
  />
);
```

#### Memory Management
```javascript
// Efficient state management for chat history
const useChatHistory = (luminorId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const maxMessages = 100; // Limit message history
  
  const addMessage = useCallback((message: Message) => {
    setMessages(prev => {
      const newMessages = [...prev, message];
      if (newMessages.length > maxMessages) {
        // Keep only recent messages, archive the rest
        const archived = newMessages.slice(0, -50);
        archiveMessages(luminorId, archived);
        return newMessages.slice(-50);
      }
      return newMessages;
    });
  }, [luminorId]);
  
  return { messages, addMessage };
};

// Cleanup resources on unmount
const useResourceCleanup = () => {
  useEffect(() => {
    return () => {
      // Cancel pending AI requests
      AIService.cancelPendingRequests();
      // Stop any ongoing voice recordings
      VoiceService.stopRecording();
      // Clear temporary files
      FileService.clearTempFiles();
    };
  }, []);
};
```

### 9.3 Testing Strategy

#### Component Testing
```typescript
// Example test for Button component
describe('Button Component', () => {
  it('should trigger haptic feedback on press', async () => {
    const mockOnPress = jest.fn();
    const mockTriggerHaptic = jest.spyOn(HapticService, 'trigger');
    
    render(
      <Button 
        onPress={mockOnPress}
        hapticFeedback="BUTTON_TAP"
      >
        Test Button
      </Button>
    );
    
    const button = screen.getByText('Test Button');
    fireEvent.press(button);
    
    expect(mockTriggerHaptic).toHaveBeenCalledWith(HAPTIC_LIBRARY.BUTTON_TAP);
    expect(mockOnPress).toHaveBeenCalled();
  });
  
  it('should be accessible', () => {
    render(<Button onPress={() => {}}>Accessible Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Accessible Button' });
    expect(button).toBeVisible();
    expect(button).toHaveAccessibilityRole('button');
  });
});
```

#### Integration Testing
```typescript
// Test AI integration flows
describe('AI Content Generation', () => {
  it('should generate image with Lumina', async () => {
    const mockGenerateImage = jest.spyOn(AIService, 'generateImage')
      .mockResolvedValue({ url: 'test-image.jpg', id: '123' });
    
    render(<LuminaInterface />);
    
    const input = screen.getByPlaceholderText('Describe your image...');
    fireEvent.changeText(input, 'A magical forest at sunset');
    
    const generateButton = screen.getByText('Generate');
    fireEvent.press(generateButton);
    
    await waitFor(() => {
      expect(mockGenerateImage).toHaveBeenCalledWith({
        prompt: 'A magical forest at sunset',
        style: 'default'
      });
    });
    
    expect(screen.getByTestId('generated-image')).toBeVisible();
  });
});
```

### 9.4 Accessibility Implementation

#### Screen Reader Support
```typescript
// Accessible chat messages
const MessageBubble = ({ message, isUser, timestamp }) => (
  <View
    accessible={true}
    accessibilityRole="text"
    accessibilityLabel={
      isUser 
        ? `You said: ${message.text}` 
        : `AI responded: ${message.text}`
    }
    accessibilityHint={`Sent at ${formatTime(timestamp)}`}
  >
    <Text>{message.text}</Text>
  </View>
);

// Voice input accessibility
const VoiceInput = ({ onTranscript }) => {
  const [isRecording, setIsRecording] = useState(false);
  
  return (
    <Pressable
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={isRecording ? "Stop recording" : "Start voice input"}
      accessibilityHint="Double tap to toggle voice recording"
      accessibilityState={{ pressed: isRecording }}
      onPress={toggleRecording}
    >
      <VoiceIcon />
    </Pressable>
  );
};
```

### 9.5 Analytics & Monitoring

#### User Experience Analytics
```typescript
// Track user interactions
const trackUserAction = (action: string, properties?: Record<string, any>) => {
  Analytics.track(action, {
    timestamp: Date.now(),
    luminor: getCurrentLuminor(),
    session_id: getSessionId(),
    ...properties
  });
};

// Performance monitoring
const usePerformanceMonitoring = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
          Analytics.track('performance_metric', {
            name: entry.name,
            duration: entry.duration,
            start_time: entry.startTime
          });
        }
      }
    });
    
    observer.observe({ entryTypes: ['measure'] });
    
    return () => observer.disconnect();
  }, []);
};

// Error boundary with analytics
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Analytics.track('app_error', {
      error_message: error.message,
      error_stack: error.stack,
      component_stack: errorInfo.componentStack,
      timestamp: Date.now()
    });
    
    // Log to crash reporting service
    CrashReporter.recordError(error, errorInfo);
  }
}
```

---

## Conclusion

This comprehensive UX design system provides Arcanea with a world-class mobile experience that balances magical aesthetics with practical usability. The design system ensures:

- **Premium Experience**: Matches or exceeds ChatGPT/GenSpark quality standards
- **Accessibility First**: WCAG 2.1 AA compliance with inclusive design principles  
- **Performance Optimized**: Sub-2-second load times with 60fps animations
- **AI-Native Interface**: Conversation-first design with seamless voice integration
- **Scalable Architecture**: Component system that grows with the product

The implementation guidelines provide clear technical specifications while maintaining design integrity across all touchpoints. Regular testing against the quality metrics ensures the app continues to deliver exceptional user experiences as it evolves.

**Next Steps:**
1. Begin with core component implementation (Button, Input, Modal)
2. Implement chat interface with voice integration
3. Build Luminor switching system with theme transitions
4. Add comprehensive accessibility testing
5. Integrate analytics and performance monitoring

This design system positions Arcanea as a premium AI creative platform that users will love to use daily for their most important creative work.