# Notion Setup Guide for Arcanea

**Step-by-step guide to connect Notion as your CMS**

---

## 📋 What We're Building

```
NOTION (Your Writing Space)
├─ Chapters database (write chapters here)
├─ Characters database
└─ Locations database
        ↓
    NOTION API
        ↓
NEXT.JS (apps/web)
├─ /read/[slug] (displays chapters)
├─ /characters (displays characters)
└─ /lore (displays world info)
```

---

## PART 1: Set Up Notion (15 minutes)

### Step 1: Create Notion Account

1. Go to https://notion.so
2. Click "Get Notion free"
3. Sign up with Google/Email
4. Choose "For myself" (free personal plan)

### Step 2: Create Arcanea Workspace

1. Click "New page" in sidebar
2. Name it: **"Arcanea Universe"**
3. Choose icon: 🌌 or ⚔️

### Step 3: Create Chapters Database

1. Inside "Arcanea Universe" page, type `/database`
2. Select "Table - Full page"
3. Name it: **"Chapters"**

4. Add these properties (columns):

**Click "+" to add properties:**

| Property Name | Type | Options |
|--------------|------|---------|
| Title | Title | (default) |
| Slug | Text | (for URL) |
| Chapter Number | Number | |
| Book | Select | Options: Book 1, Book 2, Book 3 |
| Status | Select | Options: Draft, Review, Published |
| Word Count | Number | |
| Published Date | Date | |
| Excerpt | Text | (short description) |

5. Click on the database title → "..." → Copy link
   - Save this URL, you'll need it

### Step 4: Create Characters Database

1. Go back to "Arcanea Universe" page
2. Type `/database` → Table - Full page
3. Name it: **"Characters"**

Add properties:

| Property Name | Type | Options |
|--------------|------|---------|
| Name | Title | (default) |
| Slug | Text | (for URL) |
| Race | Select | Human, Eldrian, Elf, etc. |
| Age | Number | |
| Element | Select | Fire, Water, Earth, Air, Void, All |
| Role | Select | Protagonist, Antagonist, Supporting |
| Status | Select | Alive, Deceased, Unknown |
| Bio | Text | (short bio) |

6. Copy database link, save it

### Step 5: Create Locations Database

1. Same process
2. Name: **"Locations"**

Properties:

| Property Name | Type | Options |
|--------------|------|---------|
| Name | Title | |
| Slug | Text | |
| Type | Select | City, Village, Realm, Building |
| Realm | Select | Heartlands, Stronghold, etc. |
| Description | Text | |

Save the link.

---

## PART 2: Create Notion Integration (10 minutes)

### Step 1: Create Internal Integration

1. Go to https://www.notion.so/my-integrations
2. Click "+ New integration"
3. Fill in:
   - **Name:** "Arcanea Website"
   - **Associated workspace:** (select your workspace)
   - **Type:** Internal integration
4. Click "Submit"

### Step 2: Copy Integration Token

1. After creation, you'll see "Internal Integration Token"
2. Click "Show" → "Copy"
3. **Save this token** (you'll paste it in .env file)
   - It looks like: `secret_abc123xyz...`

### Step 3: Share Databases with Integration

**For EACH database (Chapters, Characters, Locations):**

1. Open the database
2. Click "..." (top right)
3. Click "Connections" or "Add connections"
4. Find "Arcanea Website" integration
5. Click "Confirm"

Repeat for all 3 databases.

---

## PART 3: Get Database IDs (5 minutes)

### How to Find Database IDs

**From the URL you saved earlier:**

```
Example URL:
https://www.notion.so/frank/abc123def456?v=xyz789

The ID is: abc123def456
```

**Extract IDs for:**
- Chapters database → `CHAPTERS_DB_ID`
- Characters database → `CHARACTERS_DB_ID`
- Locations database → `LOCATIONS_DB_ID`

Save these somewhere, you'll need them next.

---

## PART 4: Connect to Next.js (20 minutes)

### Step 1: Install Notion SDK

```bash
cd /mnt/c/Users/Frank/Arcanea/apps/web
npm install @notionhq/client notion-to-md
npm install --save-dev @types/node
```

### Step 2: Add Environment Variables

Create/edit `.env.local`:

```bash
# In apps/web/.env.local
NOTION_TOKEN=secret_YOUR_TOKEN_HERE
NOTION_CHAPTERS_DB=YOUR_CHAPTERS_DB_ID
NOTION_CHARACTERS_DB=YOUR_CHARACTERS_DB_ID
NOTION_LOCATIONS_DB=YOUR_LOCATIONS_DB_ID
```

**Replace:**
- `secret_YOUR_TOKEN_HERE` → Your integration token
- `YOUR_CHAPTERS_DB_ID` → Chapters database ID
- `YOUR_CHARACTERS_DB_ID` → Characters database ID
- `YOUR_LOCATIONS_DB_ID` → Locations database ID

### Step 3: Test Environment Variables

```bash
# In apps/web/
npm run dev

# Should start without errors
# If you see "Missing environment variables" - check .env.local
```

---

## PART 5: Create Notion Client Library

I'll create these files for you. Tell me when you're ready!

**Files we'll create:**

```
apps/web/
├─ lib/
│  ├─ notion/
│  │  ├─ client.ts         # Notion client setup
│  │  ├─ chapters.ts       # Get chapters from Notion
│  │  ├─ characters.ts     # Get characters
│  │  └─ utils.ts          # Helper functions
│  └─ ...
└─ app/
   ├─ read/
   │  └─ [slug]/
   │     └─ page.tsx        # Display chapter
   └─ ...
```

---

## PART 6: Your First Chapter (Test)

### In Notion:

1. Open "Chapters" database
2. Click "+ New"
3. Fill in:
   - **Title:** "Eye of the Wolf"
   - **Slug:** "eye-of-the-wolf"
   - **Chapter Number:** 1
   - **Book:** Book 1
   - **Status:** Published
   - **Published Date:** (today)

4. Click on the chapter title to open full page
5. Write your chapter content (or paste this test):

```
The forest was dying.

Arion could feel it in the air, in the way the leaves hung limp and
colorless on their branches. The corruption was spreading.

He knelt beside the wolf pup, its white fur matted with blood...

[Write your actual chapter here]
```

6. Close the page (auto-saves)

---

## PART 7: Display on Website

### What Happens Next:

Once I create the integration code:

1. **You write in Notion** (comfortable writing interface)
2. **Change Status to "Published"**
3. **Website automatically shows it** at:
   - `http://localhost:3001/read/eye-of-the-wolf`
   - (or `arcanea.ai/read/eye-of-the-wolf` when deployed)

### The Flow:

```
┌─────────────────────────────────────────┐
│  YOU: Write in Notion                   │
│  ├─ Rich text editor                    │
│  ├─ Add images                          │
│  ├─ Format text                         │
│  └─ Change status: "Published"          │
└─────────────────────────────────────────┘
              ↓ (API)
┌─────────────────────────────────────────┐
│  NEXT.JS: Fetches content               │
│  ├─ lib/notion/chapters.ts              │
│  ├─ Converts to HTML                    │
│  └─ Caches for performance              │
└─────────────────────────────────────────┘
              ↓ (displays)
┌─────────────────────────────────────────┐
│  WEBSITE: Readers see chapter           │
│  ├─ Beautiful typography                │
│  ├─ Fast loading                        │
│  └─ SEO optimized                       │
└─────────────────────────────────────────┘
```

---

## 📊 What I Need From You

### Now (to continue setup):

1. ✅ **Notion account created?** (yes/no)
2. ✅ **Databases created?** (Chapters, Characters, Locations)
3. ✅ **Integration token copied?** (starts with `secret_`)
4. ✅ **Database IDs extracted?** (3 IDs from URLs)
5. ✅ **`.env.local` created with tokens?**

### Then:

Tell me when you've completed steps 1-5, and I'll:
- Create the Notion client library code
- Create the reading page
- Show you how to test it

---

## 🎯 Quick Checklist

**Before continuing, you should have:**

- [ ] Notion account (free)
- [ ] "Arcanea Universe" workspace
- [ ] Chapters database (with properties set up)
- [ ] Characters database
- [ ] Locations database
- [ ] Notion integration created
- [ ] Integration token (starts with `secret_`)
- [ ] All databases shared with integration
- [ ] 3 database IDs copied
- [ ] `.env.local` file created with all tokens
- [ ] One test chapter written in Notion

---

## 🚨 Common Issues & Fixes

### "Integration not found"
→ Make sure you shared each database with the integration

### "Invalid database ID"
→ Check the URL format, ID should be 32 characters (no dashes)

### "Unauthorized"
→ Double-check your NOTION_TOKEN in .env.local

### "Database is empty"
→ Make sure Status = "Published" on your chapter

---

## 📝 Next Steps

**Once you complete the checklist above, tell me and I'll:**

1. Create `lib/notion/client.ts` (Notion API setup)
2. Create `lib/notion/chapters.ts` (fetch chapters)
3. Create `app/read/[slug]/page.tsx` (display chapter)
4. Show you how to test it locally
5. Help you deploy to Vercel

**Ready to start?**

Let me know:
1. Do you have a Notion account already?
2. Should I walk you through creating the databases step-by-step?
3. Or are you good to follow the guide and tell me when you have the tokens?

I'm here to help! 🚀
