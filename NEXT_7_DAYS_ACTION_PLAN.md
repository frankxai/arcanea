# Arcanea: Next 7 Days Action Plan
**Drafted:** January 21, 2026
**Goal:** Ship tangible, revenue-ready assets by end of week

---

## Current Reality Check

| Asset | Status | Gap |
|-------|--------|-----|
| Web App (`apps/web`) | UI exists, stubs only | No real AI integration |
| Lore Library (`book/`) | 72 files, ~70% complete | Bestiary nearly empty |
| Skills System | 77 skills registered | 53% standardized |
| MCP Servers | 8 configured | Not fully tested |
| Canonical Lore | `ARCANEA_UNIVERSE_CANON.md` (66KB) | Excellent foundation |

**One-Person Focus:** Each day targets ONE concrete deliverable that moves toward monetization or launch readiness.

---

## Day 1 (Tuesday): The Bestiary Expansion

**Primary Deliverable:** 5 Fully-Written Bestiary Entries

**What:**
Create 5 complete entries for the Bestiary of Creation - the creative obstacles personified as creatures. These become:
- Shareable content (social media, email list)
- Potential NFT artwork concepts
- Academy lesson material

**Tool/Skill:**
```
/ultrawrite
```
Or manually using the Lyric Genius + creative writing prompts.

**Target Creatures:**
1. **The Blank Page Wyrm** - Paralysis of starting
2. **The Comparison Specter** - Compares your work to others
3. **The Perfectionist Basilisk** - Turns work to stone
4. **The Imposter Shade** - Whispers you don't belong
5. **The Shiny Object Sprite** - Endless distraction

**Expected Output:**
- 5 markdown files in `/book/bestiary-of-creation/`
- Each 500-800 words with: Name, Appearance, Behavior, Signs of Attack, Countermeasures, Famous Victories

**Time Estimate:** 3-4 hours

---

## Day 2 (Wednesday): Guardian Profile Pages

**Primary Deliverable:** 3 Complete Guardian Profiles (Lyssandria, Draconia, Lyria)

**What:**
Expand the Ten Guardians from quick reference to full narrative profiles. These become:
- Character sheets for the book series
- Social media carousel content
- Foundation for "Which Guardian Are You?" quiz

**Tool/Skill:**
```
/arcanea-lore-expand
```
Focus: `direction: "narrative"`

**Profile Template:**
- Origin Story (500 words)
- Current Role & Domain
- Relationship to Godbeast
- Visual Description (for Arcanea Forge image gen)
- Signature Abilities
- Weaknesses & Growth Areas
- Famous Quotes (3-5)

**Expected Output:**
- 3 markdown files in `/book/legends-of-arcanea/guardians/`
- Each 800-1200 words
- Ready for image generation prompts

**Time Estimate:** 4 hours

---

## Day 3 (Thursday): Godbeast Visual Assets

**Primary Deliverable:** 3 Godbeast Images + Profiles

**What:**
Generate high-quality images for the Godbeasts paired with Day 2's Guardians:
- Kaelith (Dragon) for Lyssandria
- Draconis (Solar Dragon) for Draconia
- Yumiko (Dream Fox) for Lyria

**Tool/Skill:**
```
/forge mode:quality style:guardian_fire
```
Or use Arcanea Forge MCP for image generation.

**Expected Output:**
- 3 high-resolution images saved to `/public/images/godbeasts/`
- 3 companion markdown profiles in `/book/legends-of-arcanea/godbeasts/`
- Social media post drafts for each

**Time Estimate:** 3-4 hours

---

## Day 4 (Friday): Agent Standardization Sprint

**Primary Deliverable:** 18 Agents Fully Standardized

**What:**
Apply `AGENT_STANDARDIZATION.md` template to all 18 undefined agents. This enables:
- Consistent behavior across AI sessions
- Proper model tiering (cost control)
- MCP server assignment

**Tool/Skill:**
```
/arcanea-dev
```
Manual editing of `.claude/agents/` files

**Standardization Checklist per Agent:**
```yaml
---
name: agent-name
description: Clear one-line description
model: claude-sonnet-4  # or claude-haiku-3 for simple tasks
tier: development | premium | oss | core
mcp_servers:
  - github
  - playwright
triggers:
  - "keyword one"
  - "keyword two"
---
```

**Expected Output:**
- 18 agent files updated
- Agent Standardization metric: 53% -> 100%
- Summary document listing all agents with their tiers

**Time Estimate:** 4 hours

---

## Day 5 (Saturday): Studio API Connection

**Primary Deliverable:** One Working Creation Endpoint

**What:**
Replace ONE stub in `apps/web/app/api/` with real Gemini API integration. Choose the highest-impact endpoint:
- `/api/projects/create` - Generate creative content

**Tool/Skill:**
```
/arcanea-dev
/ultracode
```

**Implementation Steps:**
1. Read current stub at `apps/web/app/api/projects/create/route.ts`
2. Add proper Gemini API call using Vercel AI SDK
3. Add error handling and rate limiting
4. Test locally with `pnpm dev`
5. Deploy to Vercel

**Expected Output:**
- One functional API endpoint
- Can generate text content via Gemini
- Tested and deployed

**Time Estimate:** 4-5 hours

---

## Day 6 (Sunday): Monetization Asset - Email Lead Magnet

**Primary Deliverable:** "The Creator's Grimoire" PDF Lead Magnet

**What:**
Compile the best Arcanea wisdom content into a downloadable PDF:
- 10 pages, beautifully formatted
- Excerpts from Laws of Arcanea + Bestiary + Wisdom Scrolls
- Call-to-action for Academy waitlist

**Tool/Skill:**
- Manual curation from `/book/` content
- Canva or Figma for layout
- Or generate with AI writing tools

**Content Outline:**
1. The Five Elements of Creation (2 pages)
2. Know Your Creative Enemy - 3 Bestiary Entries (3 pages)
3. Daily Rituals for Creators (2 pages)
4. The Ten Gates Quick Reference (2 pages)
5. Your First Assignment (1 page)

**Expected Output:**
- PDF file in `/public/downloads/creators-grimoire.pdf`
- Landing page copy for email capture
- Email welcome sequence outline

**Time Estimate:** 5-6 hours

---

## Day 7 (Monday): Synthesis & Launch Prep

**Primary Deliverable:** Week Review + Next Sprint Plan

**What:**
- Review all 6 deliverables
- Push all changes to GitHub
- Deploy updated site to Vercel
- Create social media announcement posts
- Plan next 7 days

**Tool/Skill:**
```
/commit
/arcanea-council
```

**Activities:**
1. Git commit all new content
2. Verify Vercel deployment works
3. Draft 5 social posts with Godbeast images
4. Test the one working API endpoint
5. Write SPRINT_PLAN_WEEK_2026-01-28.md

**Expected Output:**
- Clean git history with week's work
- Live site with new content
- Social media queue ready
- Clear plan for next week

**Time Estimate:** 3-4 hours

---

## Weekly Summary

| Day | Deliverable | Output | Time |
|-----|-------------|--------|------|
| 1 (Tue) | Bestiary Expansion | 5 creature entries | 3-4h |
| 2 (Wed) | Guardian Profiles | 3 narrative profiles | 4h |
| 3 (Thu) | Godbeast Visuals | 3 images + profiles | 3-4h |
| 4 (Fri) | Agent Standardization | 18 agents updated | 4h |
| 5 (Sat) | Studio API Connection | 1 working endpoint | 4-5h |
| 6 (Sun) | Lead Magnet PDF | Downloadable grimoire | 5-6h |
| 7 (Mon) | Synthesis | Deploy + social posts | 3-4h |

**Total Estimated Time:** 26-31 hours (3.5-4.5 hours/day average)

---

## Success Metrics

By end of week:
- [ ] Bestiary: 2 entries -> 7 entries
- [ ] Guardian Profiles: 0 -> 3 complete
- [ ] Godbeast Images: 0 -> 3 generated
- [ ] Agent Standardization: 53% -> 100%
- [ ] Working API Endpoints: 0 -> 1
- [ ] Lead Magnets: 0 -> 1 PDF ready
- [ ] Social Posts: 0 -> 5 queued

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Image generation fails | Fall back to detailed text descriptions |
| Gemini API issues | Use mock data, document requirements |
| Time overrun | Cut Day 6 (PDF) if needed |
| Creative block | Use /ultrawrite with constraints |

---

## Daily Ritual

Before each day's work:
1. Re-read this plan
2. Clear distractions for 3-4 hour focus block
3. Start with the hardest part
4. Commit progress at natural breaks
5. Note what worked/didn't for retrospective

---

*"The Arc turns. Each day, one step closer to manifestation."*

**Plan Version:** 1.0.0
**Created:** 2026-01-21
**Status:** READY FOR EXECUTION
