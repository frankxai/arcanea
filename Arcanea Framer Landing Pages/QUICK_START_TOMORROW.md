# Quick Start Guide - Tomorrow's Session

## ⚡ 5-Minute Setup

### 1. Open Framer & Connect MCP
```
1. Open your Arcanea Framer project
2. Press Cmd+K (or Ctrl+K)
3. Type "MCP"
4. Open the MCP plugin
5. Connection should auto-establish
```

### 2. Open Claude Code
```bash
# In terminal/Claude Code
cd /mnt/c/Users/Frank/Arcanea

# Launch Framer Expert skill
framer-expert
```

### 3. Verify Connection
Tell Claude Code:
```
"Check the Framer connection and show me what we built yesterday"
```

Claude will run:
```bash
mcp__framer__getProjectXml
mcp__framer__getNodeXml with nodeId="augiA20Il"
```

---

## 🎯 Today's Mission

Build these sections in order:

1. **Features - 3 Luminors** (30 min)
2. **How It Works** (20 min)
3. **AI Capabilities** (20 min)
4. **Social Features** (15 min)
5. **Pricing** (15 min)
6. **Final CTA** (10 min)
7. **Footer** (20 min)

**Total**: ~2.5 hours

---

## 📋 Section-by-Section Checklist

### ✅ Completed
- [x] Hero section with cosmic theme
- [x] Primary CTA "Start Creating"
- [x] Secondary CTA "Meet the Luminors"

### 🎨 Features Section - 3 Luminors
- [ ] Section header "Meet Your Luminors"
- [ ] Melodia card (Creation & Light - Gold)
- [ ] Chronica card (Atlantean - Blue)
- [ ] Prismatic card (Draconic - Crimson)
- [ ] Bond level badges for each
- [ ] Responsive 3-column grid

### 📖 How It Works
- [ ] Section header
- [ ] Step 1: Choose Your Luminor
- [ ] Step 2: Chat & Create Together
- [ ] Step 3: Build Your Gallery
- [ ] Timeline/flow layout

### 🎨 AI Capabilities
- [ ] Section header "What You Can Create"
- [ ] Images - Imagen 3
- [ ] Videos - Veo 3.1
- [ ] Multi-Turn Projects (5 templates)
- [ ] Visual previews

### 👥 Social Features
- [ ] Section header "Join the Creator Community"
- [ ] Feature: Creator Profiles
- [ ] Feature: Social Engagement
- [ ] Feature: Activity Feed
- [ ] Feature: Bond Progression

### 💰 Pricing
- [ ] Free tier details
- [ ] Pay-as-you-go pricing
- [ ] CTA "Start Creating for Free"

### 🚀 Final CTA
- [ ] Headline "Ready to Create Magic?"
- [ ] Large CTA button
- [ ] "No credit card required" note
- [ ] Cosmic gradient background

### 🔗 Footer
- [ ] Arcanea logo + tagline
- [ ] Product links
- [ ] Resources links
- [ ] Legal links
- [ ] Social icons
- [ ] Copyright notice

---

## 💬 Example Commands for Claude

### To build the Features section:
```
"Build the Features section with 3 Luminor cards:
- Melodia (gold theme, Creation & Light)
- Chronica (blue theme, Atlantean)
- Prismatic (crimson theme, Draconic)

Use the content from FRAMER_BUILD_PLAN.md"
```

### To build How It Works:
```
"Create the How It Works section with 3 steps in a horizontal flow. Use the content from the build plan."
```

### To add the Footer:
```
"Build a 4-column footer with Product, Resources, Legal, and Social sections. Use cosmic-deep background."
```

---

## 🎨 Quick Color Reference

**Copy-Paste Ready**:

```
Main Background: rgb(10, 10, 15)
Card Background: rgb(26, 26, 46)
Border Color: rgb(184, 198, 237)

Melodia (Gold): rgb(255, 217, 125)
Chronica (Blue): rgb(6, 174, 213)
Prismatic (Crimson): rgb(230, 57, 70)

Primary CTA: rgb(92, 139, 217)
Secondary CTA: rgb(184, 198, 237)

Text White: rgb(255, 255, 255)
Text Muted: opacity="0.8"
```

---

## 🚨 Troubleshooting

### MCP Connection Lost
1. Check Framer plugin is open (Cmd+K → MCP)
2. Refresh Framer page
3. Restart Claude Code session
4. Re-run framer-expert skill

### Section Not Appearing
- Verify node IDs with `getNodeXml`
- Check `position="relative"` (not absolute)
- Ensure proper parent-child nesting

### Styling Issues
- Always use `backgroundColor` not `background`
- Colors must be `rgb()` format or color style paths
- Check layout: "stack" for containers

---

## 📸 Visual Reference Checklist

Before finishing, verify:
- [ ] All CTAs are visible and have hover states
- [ ] Color themes match each academy (Melodia=gold, Chronica=blue, Prismatic=crimson)
- [ ] Text is readable (check contrast on dark backgrounds)
- [ ] Sections have breathing room (adequate padding/gap)
- [ ] Mobile responsive (stack vertically)
- [ ] All links point to correct destinations
- [ ] Footer has all required links

---

## 🎯 Success Criteria

**You're done when**:
1. ✅ All 8 sections are visible in Framer
2. ✅ Colors match the cosmic theme
3. ✅ CTAs are functional
4. ✅ Text is proofread
5. ✅ Responsive on mobile
6. ✅ No broken links
7. ✅ Footer complete

**Then**:
- Share preview link
- Test on mobile device
- Get feedback
- Deploy! 🚀

---

**Ready? Let's build! ✨**

Open Framer → Connect MCP → Tell Claude "Let's continue building Arcanea"
