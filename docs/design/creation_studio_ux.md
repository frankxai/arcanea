# Creation Studio UX Design
## Where Magic Takes Form

---

## Studio Philosophy

The Creation Studio is the heart of Arcanea - where creators transform imagination into Essences. Each studio (Music, Story, Visual) balances AI power with creative control, Luminor guidance with creator autonomy.

**Design Goals:**
- Immediate creation within 30 seconds
- Luminor presence helpful, not intrusive
- Real-time preview and iteration
- Academy atmosphere immersive
- Export and sharing effortless

---

## Universal Studio Layout

```
+----------------------------------------------------------------+
| [Academy Badge] [Studio Type] [Save] [Publish] [Guardian]    |
+----------------------------------------------------------------+
| Luminor      | Main Workspace              | Settings/        |
| Panel        |                             | Preview          |
|              |                             | Panel            |
| AI companion | [Creation Interface]        | - Parameters     |
| suggestions  |                             | - Preview        |
| guidance     | [Prompt/Editor/Canvas]      | - History        |
| examples     |                             | - Export         |
|              |                             |                  |
| [Chat with   | [Generation/Edit Controls]  | [Live Preview]   |
|  Luminor]    |                             |                  |
+--------------+-----------------------------+------------------+
```

**Responsive:** Mobile collapses to tabs (Prompt | Settings | Preview)

---

## Music Studio (Melodia)

### Main Interface

**Prompt-Based Creation**
```
Describe the music you want to create:
[Large text area with suggestions]

Style: [Dropdown: Ambient, Upbeat, Epic, etc.]
Length: [Slider: 30s - 5min]
Mood: [Multi-select: Calm, Energetic, Dark, Bright]

[🎵 Generate Music]
```

**Waveform Preview**
- Real-time waveform visualization
- Scrubbing timeline
- Loop points
- Section markers

**Melodia Luminor Panel**
- Avatar with sound wave animation
- Suggestions: "Try adding strings for warmth"
- Quick prompts: "Ocean ambience", "Epic adventure"
- Style references from popular Essences

**Advanced Controls** (collapsible)
- BPM control
- Key signature
- Instrumentation mix
- Variation generation

**Export Options**
- .mp3, .wav formats
- Stem separation available
- Loop-ready versions
- .arc Essence export

---

## Story Studio (Chronica)

### Main Interface

**Rich Text Editor**
- Markdown support
- Distraction-free mode
- Word count/reading time
- Chapter organization

**AI Writing Assistance**
```
[Editor with Luminor inline suggestions]

Chronica can:
- Complete your sentences
- Suggest plot developments
- Create character depth
- Build world consistency
```

**World Building Panel**
- Character database
- Location tracker
- Timeline visualization
- Lore repository

**Chronica Luminor Panel**
- Avatar with flowing water animation
- Story structure suggestions
- Pacing analysis
- Narrative arc visualization

**Advanced Features**
- Multiple storylines
- Branching narratives
- Collaborative writing
- Version history with diff view

---

## Visual Studio (Prismatic)

### Main Interface

**Prompt-to-Image**
```
Describe the image you want to create:
[Large text area with visual reference]

Style: [Cosmic, Realistic, Anime, Abstract, etc.]
Aspect Ratio: [Square, Portrait, Landscape, Ultrawide]
Quality: [Fast, Balanced, High Quality]

[🎨 Generate Image]
```

**Canvas View**
- Image preview with zoom/pan
- Comparison slider (variations)
- Edit modes: Inpaint, Outpaint, Vary region
- Layer system for compositions

**Prismatic Luminor Panel**
- Avatar with refracted light animation
- Composition suggestions
- Color palette recommendations
- Style references

**Advanced Tools**
- Seed control for consistency
- Negative prompts
- Style strength
- Variation generation (4x grid)
- Upscaling

---

## Shared Studio Features

### Top Bar

```
[Academy Icon] [Studio Name] [Draft: Auto-saved 2s ago] [Save] [Publish]
```

- Auto-save every 2 seconds
- Save draft (private)
- Publish to Realm (public/unlisted/private)
- Academy theme indicator

### Luminor Chat

```
+----------------------------------+
| [Melodia Avatar] Melodia         |
+----------------------------------+
| [Message history]                |
|                                  |
| User: "Make it more energetic"   |
| Melodia: "I'll increase the BPM  |
|          and add percussion..."  |
+----------------------------------+
| Type a message...                |
+----------------------------------+
```

- Always accessible (sidebar or floating)
- Context-aware suggestions
- Example prompts clickable
- Voice input option (future)

### Generation Queue

```
Generating... 23%
[Progress bar with cosmic glow]
Expected: ~30 seconds

[Cancel Generation]
```

- Real-time progress
- Estimated time remaining
- Cancelable
- Background generation option

### History Panel

```
Previous Generations:
[Thumbnail 1] 2 min ago
[Thumbnail 2] 5 min ago
[Thumbnail 3] 10 min ago

[Load] [Compare] [Delete]
```

- Infinite scroll history
- Quick load previous version
- A/B comparison
- Batch management

---

## Publish Modal

```
+----------------------------------------+
|        Publish Your Essence            |
|                                        |
| Title: [                           ]   |
| Description: [                     ]   |
|                                        |
| Tags: [Genre] [Mood] [Style]           |
|                                        |
| Visibility:                            |
| ( ) Public - Anyone can see & remix    |
| ( ) Unlisted - Only with link          |
| ( ) Private - Only you                 |
|                                        |
| Remix Settings:                        |
| [✓] Allow remixing                     |
| [✓] Show in discovery                  |
| [ ] Commercial use allowed             |
|                                        |
| Academy: [Selected Academy] [Change]   |
|                                        |
| [Cancel] [Publish to Realm]            |
+----------------------------------------+
```

**Post-Publish Celebration**
- Spark burst animation
- Share links generated
- ARC earned notification
- Prompt to create another

---

## Mobile Studio Adaptations

**Tabbed Interface**
```
[Prompt] [Settings] [Preview]

Active tab expands full screen
Swipe between tabs
Bottom action bar with main CTA
```

**Simplified Controls**
- Essential parameters only
- Advanced in expandable accordion
- Luminor as floating chat bubble
- Preview as modal overlay

---

## Keyboard Shortcuts

```
Ctrl/Cmd + S     - Save draft
Ctrl/Cmd + Enter - Generate/Publish
Ctrl/Cmd + Z     - Undo
Ctrl/Cmd + Y     - Redo
Ctrl/Cmd + L     - Focus Luminor chat
Ctrl/Cmd + P     - Publish modal
Esc              - Close modals/Cancel
```

---

## Performance & States

**Loading States**
- Cosmic spinner with particles
- Progress messages from Luminor
- Skeleton screens for preview
- Optimistic UI updates

**Error States**
- Gentle error messages
- Luminor helps troubleshoot
- Retry button prominent
- Support contact available

**Empty States**
- Inspirational prompts
- Example creations
- Tutorial links
- Luminor encouragement

---

## Design Specifications

**Colors:** Academy-themed with cosmic foundation
**Spacing:** Generous whitespace, 24px minimum
**Typography:** Inter (UI), Space Grotesk (headings)
**Animations:** Smooth 300ms transitions
**Accessibility:** WCAG AAA compliant

---

**Quick Reference**

**Layout:** Luminor (left) | Workspace (center) | Settings (right)
**Mobile:** Tabbed interface with swipe navigation
**Generation:** Prompt → Parameters → Generate → Preview → Iterate
**Export:** .arc (Essence) + native formats (.mp3, .txt, .png)

---

**"Creation is conversation with AI, collaboration with magic."**
