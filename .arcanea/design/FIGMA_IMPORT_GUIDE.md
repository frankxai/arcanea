# Arcanea Figma Design System Import Guide

> How to populate the Arcanea Figma file with world-class design essentials.

## Figma Files

- **Arcanea Master**: https://www.figma.com/design/w6mWTgmTFJBVm9Q12zMdZv/Arcanea
- **Material UI Reference**: https://www.figma.com/design/gCDmp5XhRD6DPogZHvx1fm/Material-UI
- **Apple Reference**: https://www.figma.com/design/69bcWBXfAJzKezS31cioHg/Apple

---

## Step 1: Set Up Figma Variables

Create these variable collections in the Arcanea Figma file:

### Collection: Cosmic Palette
```
cosmic/void:      #0b0e14
cosmic/deep:      #121826
cosmic/surface:   #1a2332
cosmic/raised:    #242f42
cosmic/elevated:  #2d3a52
cosmic/overlay:   #364562
```

### Collection: Brand
```
brand/primary:    #8b5cf6
brand/accent:     #7fffd4
brand/gold:       #ffd700
brand/secondary:  #78a6ff
```

### Collection: Elements
```
crystal/standard: #7fffd4
crystal/bright:   #99ffe0
crystal/deep:     #5ce6b8
fire/standard:    #ff6b35
fire/bright:      #ff8c5a
fire/deep:        #d94e1f
water/standard:   #78a6ff
water/bright:     #9dbfff
water/deep:       #5a8ce6
void/standard:    #9966ff
void/bright:      #b38cff
void/deep:        #7a4dcc
gold/standard:    #ffd700
gold/bright:      #ffe44d
gold/deep:        #ccac00
```

### Collection: Text
```
text/primary:     #e6eefc
text/secondary:   #9bb1d0
text/muted:       #708094
text/disabled:    #515b6b
```

### Collection: Semantic
```
success:          #20cc73
warning:          #ffa500
error:            #f52952
info:             #26b8e6
```

---

## Step 2: Typography Styles

Create these text styles:

| Style Name | Font | Weight | Size | Line Height |
|------------|------|--------|------|-------------|
| Display/Hero | Cinzel | 700 | 56px | 0.9 |
| Display/H1 | Cinzel | 700 | 40px | 1.1 |
| Display/H2 | Cinzel | 600 | 32px | 1.2 |
| Heading/H3 | Inter | 600 | 24px | 1.3 |
| Heading/H4 | Inter | 600 | 20px | 1.4 |
| Body/Large | Inter | 400 | 18px | 1.6 |
| Body/Base | Inter | 400 | 16px | 1.6 |
| Body/Small | Inter | 400 | 14px | 1.5 |
| Body/Caption | Inter | 400 | 12px | 1.4 |
| Narrative/Large | Crimson Pro | 400 | 20px | 1.7 |
| Narrative/Base | Crimson Pro | 400 | 18px | 1.7 |
| Code/Base | JetBrains Mono | 400 | 14px | 1.5 |
| Code/Small | JetBrains Mono | 400 | 12px | 1.4 |
| Label/Default | Inter | 500 | 14px | 1.0 |
| Label/Small | Inter | 500 | 12px | 1.0 |

---

## Step 3: Effect Styles

### Glass Effects
| Style | Background | Blur | Border |
|-------|-----------|------|--------|
| Glass/Subtle | rgba(18,24,38,0.4) | 8px | crystal at 6% |
| Glass/Standard | rgba(18,24,38,0.65) | 16px | crystal at 12% |
| Glass/Strong | rgba(18,24,38,0.85) | 24px | crystal at 18% |
| Liquid Glass | see DESIGN_BIBLE.md | 40px | white at 10% |
| Liquid Glass/Elevated | see DESIGN_BIBLE.md | 60px | white at 15% |

### Glow Shadows
| Style | Value |
|-------|-------|
| Glow/SM | 0 0 10px rgba(127,255,212,0.15) |
| Glow/MD | 0 0 20px rgba(127,255,212,0.25) |
| Glow/LG | 0 0 40px rgba(127,255,212,0.35) |
| Glow/Brand | 0 0 20px rgba(139,92,246,0.3) |

### Elevation Shadows
| Style | Value |
|-------|-------|
| Elevation/1 | 0 2px 8px rgba(0,0,0,0.2) |
| Elevation/2 | 0 4px 16px rgba(0,0,0,0.3) |
| Elevation/3 | 0 8px 32px rgba(0,0,0,0.4) |
| Elevation/4 | 0 16px 64px rgba(0,0,0,0.5) |

---

## Step 4: Component Library

Build these components in Figma:

### Atoms
- [ ] Button (Primary, Secondary, Ghost, Crystal, Destructive) - all states
- [ ] Input (Default, Focus, Error, Disabled)
- [ ] Badge (Default, Crystal, Fire, Gold, Void)
- [ ] Avatar (SM, MD, LG, XL)
- [ ] Icon Button (SM, MD, LG)
- [ ] Toggle / Switch
- [ ] Checkbox
- [ ] Radio
- [ ] Tooltip
- [ ] Tag / Chip

### Molecules
- [ ] Card (Standard, Featured, Minimal)
- [ ] Navigation Item (Default, Active, Hover)
- [ ] Search Bar
- [ ] Dropdown Menu
- [ ] Modal / Dialog
- [ ] Toast / Notification
- [ ] Tabs (Underline, Pill)
- [ ] Breadcrumb
- [ ] Progress Bar
- [ ] Stat Card

### Organisms
- [ ] Top Navigation Bar (Desktop + Mobile)
- [ ] Sidebar Navigation
- [ ] Hero Section
- [ ] Feature Grid (4-col)
- [ ] Pricing Table
- [ ] Footer
- [ ] CTA Section
- [ ] Testimonial Section

### Pages
- [ ] Landing Page
- [ ] Dashboard
- [ ] Library Browser
- [ ] Guardian Profile
- [ ] Settings
- [ ] Auth (Login / Register)

---

## Step 5: Import from Libraries

### From Material UI (gCDmp5XhRD6DPogZHvx1fm)
Import and adapt:
- Grid system
- Spacing scale
- Icon sizing conventions
- State patterns (hover, focus, active, disabled)
- Form field anatomy
- Dialog/modal patterns

### From Apple (69bcWBXfAJzKezS31cioHg)
Import and adapt:
- Glass/frosted material effects
- Typography hierarchy (adapt to our fonts)
- Navigation patterns
- Sidebar patterns
- Sheet/panel transitions
- Safe area handling

### Additional Libraries to Import
- **Lucide Icons** - https://www.figma.com/community/plugin/939567362549682242
- **shadcn/ui** - https://www.figma.com/community/file/1203061493325953101
- **Radix Primitives** - for accessible component patterns

---

## Step 6: Grid System

### Layout Grid
- 12-column grid
- Max width: 1280px (7xl)
- Gutter: 32px (desktop), 16px (mobile)
- Margin: 32px (desktop), 16px (mobile)

### Breakpoints
Create frames at: 375px, 640px, 768px, 1024px, 1280px, 1536px

---

## Step 7: Icon System

### Lucide Icons to Include
Navigation: Home, Search, Menu, X, ChevronDown, ChevronRight, ArrowLeft, ArrowRight
Actions: Plus, Edit, Trash, Copy, Share, Download, Upload, Settings
Status: Check, AlertCircle, Info, AlertTriangle, XCircle
Content: Book, FileText, Image, Video, Music, Code, Terminal
Social: Github, Twitter, Linkedin, Discord
Arcanea: Sparkles, Flame, Droplets, Mountain, Wind, Eye, Crown, Zap, Users, Star

---

*Use this guide to populate the Arcanea Figma file. Every component should follow the Design Bible.*
