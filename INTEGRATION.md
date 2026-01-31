# Arcanea Ecosystem Integration Guide

Complete guide for setting up the production-ready Arcanea ecosystem with Supabase backend, AI agents, MCP integration, and mobile optimization.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Setup](#step-by-step-setup)
4. [Integration into HTML Files](#integration-into-html-files)
5. [Configuration](#configuration)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)
8. [API Reference](#api-reference)

---

## Quick Start

For experienced developers who want to get running quickly:

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env

# 3. Edit .env with your credentials
# - Add Supabase URL and keys
# - Add OpenAI API key (optional)

# 4. Run SQL setup in Supabase (see setup-supabase.sql)

# 5. Add integration script to your HTML files
# Copy contents of integrate-all.html into <head>

# 6. Serve your files
npm run dev
```

---

## Prerequisites

Before starting, ensure you have:

- **Node.js 18+** installed
- **Supabase account** (free tier works fine)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **Text editor** (VS Code recommended)

Optional but recommended:
- **OpenAI API key** (for AI agents)
- **Anthropic Claude API key** (alternative AI)
- **MCP Server** (for extended capabilities)

---

## Step-by-Step Setup

### Step 1: Install Dependencies

```bash
npm install
```

This installs:
- `@supabase/supabase-js` - Database and auth client
- `axios` - HTTP client
- `openai` - AI integration (Node.js scripts)

### Step 2: Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Enter project name: "arcanea-ecosystem"
4. Choose region closest to your users
5. Wait for project creation (1-2 minutes)

### Step 3: Get Supabase Credentials

1. In Supabase dashboard, go to **Project Settings** → **API**
2. Copy these values:
   - **URL** (e.g., `https://abcdefgh12345678.supabase.co`)
   - **anon public** key (starts with `eyJhbGciOiJIUzI1NiIs...`)
   - **service_role** key (keep this secret!)

### Step 4: Configure Environment

1. Copy the template:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your credentials:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_KEY=your-service-key-here
   OPENAI_API_KEY=sk-your-openai-key  # Optional
   ```

3. **IMPORTANT**: Never commit `.env` to git!
   ```bash
   echo ".env" >> .gitignore
   ```

### Step 5: Setup Database

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Open `setup-supabase.sql` from this folder
4. Copy ALL contents and paste into SQL Editor
5. Click **Run**
6. Wait for "Success. No rows returned" message

This creates:
- All required tables (profiles, game_state, business_state, etc.)
- Row Level Security policies
- Triggers and functions
- Indexes for performance
- Default challenge templates

### Step 6: Enable Realtime (Important!)

1. Go to **Database** → **Replication**
2. Toggle **Realtime** to ON
3. Under "Source", click **tables**
4. Enable realtime for these tables:
   - ✅ `profiles`
   - ✅ `game_state`
   - ✅ `business_state`
   - ✅ `gamedev_state`
   - ✅ `agents`
   - ✅ `skills`
   - ✅ `challenges`
   - ✅ `manifestations`

### Step 7: Setup Auth Providers (Optional)

For Google Sign-In:
1. Go to **Authentication** → **Providers**
2. Enable **Google**
3. Add your Google Client ID (from Google Cloud Console)

For GitHub Sign-In:
1. Go to **Authentication** → **Providers**
2. Enable **GitHub**
3. Add your GitHub Client ID and Secret

### Step 8: Configure Site URL

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your production URL (e.g., `https://yourdomain.com`)
3. Add redirects (for local development):
   - `http://localhost:3000`
   - `http://localhost:5500`
   - `http://127.0.0.1:3000`

---

## Integration into HTML Files

### Method 1: Copy Integration Script (Recommended)

For each HTML file (index.html, games-v2.html, solopreneur-os.html, etc.):

1. Open the file
2. Find the `<head>` section
3. Add this line at the BEGINNING of `<head>`:
   ```html
   <!-- Arcanea Integration -->
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/dist/umd/supabase.min.js"></script>
   
   <script>
     window.ARCANEA_CONFIG = {
       SUPABASE_URL: 'https://your-project.supabase.co',
       SUPABASE_ANON_KEY: 'your-anon-key-here'
     };
   </script>
   
   <script src="supabase-config.js"></script>
   <script src="arcanea-auth.js"></script>
   <script src="auth-ui.js"></script>
   <script src="sync-engine.js"></script>
   <script src="arcanea-mcp-live.js"></script>
   <script src="arcanea-agents-live.js"></script>
   <script src="mobile-integration.js"></script>
   <script src="arcanea-storage.js"></script>
   ```

4. Add this to the `<body>` where you want the user menu:
   ```html
   <div id="user-menu-container"></div>
   ```

5. Add this for sync status indicator:
   ```html
   <div id="sync-status-container"></div>
   ```

### Method 2: Use Include (Server-side)

If your server supports includes (PHP, Node.js, etc.):

```html
<!-- At top of each HTML file -->
<?php include 'integrate-all.html'; ?>
```

Or with Node.js/Express:
```javascript
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});
```

### Files to Update

Update these 8 HTML files:
1. ✅ `index.html` - Main portal
2. ✅ `games-v2.html` - Game system
3. ✅ `solopreneur-os.html` - Business OS
4. ✅ `game-designer-os.html` - GameDev OS
5. ✅ `portal.html` - Navigation portal
6. ✅ `library-visualization.html` - Library (if exists)
7. ✅ `infogenius/index.html` - InfoGenius (if exists)
8. ✅ Any other HTML files in your project

---

## Configuration

### Required Configuration

These must be set in `window.ARCANEA_CONFIG`:

| Key | Description | Required |
|-----|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | ✅ Yes |
| `SUPABASE_ANON_KEY` | Your Supabase anon key | ✅ Yes |
| `OPENAI_API_KEY` | OpenAI API key for AI agents | ❌ No |
| `ANTHROPIC_API_KEY` | Claude API key (alternative) | ❌ No |
| `MCP_SERVER_URL` | Your MCP server URL | ❌ No |
| `DEBUG_MODE` | Enable debug logging | ❌ No |

### Advanced Configuration

```javascript
window.ARCANEA_CONFIG = {
  // Basic (required)
  SUPABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: 'your-anon-key',
  
  // AI (optional)
  OPENAI_API_KEY: 'sk-your-key',
  ANTHROPIC_API_KEY: 'sk-ant-your-key',
  
  // MCP (optional)
  MCP_SERVER_URL: 'http://localhost:3000',
  MCP_API_KEY: 'your-mcp-key',
  
  // Sync settings
  SYNC_INTERVAL: 5000,        // Milliseconds between syncs
  OFFLINE_MODE_ENABLED: true, // Enable offline queue
  MAX_OFFLINE_QUEUE: 100,     // Max queued operations
  
  // App settings
  APP_NAME: 'Arcanea',
  APP_URL: window.location.origin,
  DEFAULT_THEME: 'dark',
  
  // Mobile
  ENABLE_TOUCH_GESTURES: true,
  ENABLE_PWA: true,
  
  // Debug
  DEBUG_MODE: false
};
```

---

## Testing

### Test 1: Check Configuration

Open browser console (F12) and run:
```javascript
checkArcaneaStatus()
```

Expected output:
```javascript
{
  supabase: true,
  auth: false,  // Not logged in yet
  user: null,
  sync: { isOnline: true, queueLength: 0, ... },
  mcp: { connected: false, ... },
  ai: { initialized: true, agents: 38, ... },
  mobile: { type: 'desktop', ... }
}
```

### Test 2: User Registration

1. Click "Sign In" button (or call `AuthUI.open()`)
2. Click "Sign up" link
3. Enter:
   - Name: Test User
   - Email: test@example.com
   - Password: testpassword123
4. Click "Create Account"

Expected: Success message and account created

Check Supabase dashboard:
- **Authentication** → **Users** - should see new user
- **Table Editor** → **profiles** - should see profile row

### Test 3: Sign In

1. Sign out (if logged in)
2. Enter credentials
3. Click "Sign In"

Expected: Redirect and UI updates to show logged-in state

### Test 4: Data Sync

1. Log in
2. Make changes in games-v2.html (complete a challenge)
3. Check Supabase **Table Editor** → **game_state**

Expected: Data should appear in database within 5 seconds

### Test 5: Real-time Sync

1. Open games-v2.html in two different browsers
2. Log in as same user in both
3. Make change in Browser A

Expected: Change appears in Browser B automatically

### Test 6: Offline Mode

1. Log in
2. Go offline (DevTools → Network → Offline)
3. Make some changes
4. Check console - should see "📴 Offline mode"
5. Go back online

Expected: Changes sync automatically when back online

### Test 7: AI Agents

In console:
```javascript
// Summon an agent
ArcaneaAI.summonAgent('dragon-forge')

// Send message
ArcaneaAI.sendMessage('dragon-forge', 'How do I overcome creative blocks?')
  .then(response => console.log(response.message))
```

Expected: AI response (or mock response if no API key)

### Test 8: Mobile Responsiveness

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone or Android device
4. Refresh page

Expected: Layout adapts, touch gestures work, bottom nav appears

---

## Troubleshooting

### Issue: "Supabase client not initialized"

**Cause**: ARCANEA_CONFIG not set or invalid

**Solution**:
1. Check browser console for config errors
2. Verify SUPABASE_URL and SUPABASE_ANON_KEY are set
3. Ensure config is set BEFORE loading supabase-config.js

```javascript
// Correct order:
<script>window.ARCANEA_CONFIG = { ... }</script>
<script src="supabase-config.js"></script>
```

### Issue: "RLS Policy Violation"

**Cause**: Row Level Security blocking access

**Solution**:
1. Re-run setup-supabase.sql completely
2. Check RLS policies in Supabase **Table Editor** → **Policies**
3. Verify policies allow authenticated users to access their own data

### Issue: "Auth provider not enabled"

**Cause**: OAuth provider not configured in Supabase

**Solution**:
1. Go to **Authentication** → **Providers**
2. Enable Google/GitHub/etc
3. Add client ID and secret

### Issue: "Rate limit exceeded"

**Cause**: Too many API requests

**Solution**:
- Wait 1 minute for rate limit to reset
- Reduce SYNC_INTERVAL in config
- Implement client-side caching

### Issue: "CORS error"

**Cause**: Domain not allowed in Supabase

**Solution**:
1. Go to **Authentication** → **URL Configuration**
2. Add your domain to allowed origins
3. Include http://localhost:3000 for development

### Issue: Changes not syncing

**Cause**: Realtime not enabled or network issue

**Solution**:
1. Enable Realtime in Supabase (see Step 6)
2. Check browser console for WebSocket errors
3. Verify user is authenticated
4. Check RLS policies

### Issue: AI agents not responding

**Cause**: No API key or rate limit

**Solution**:
1. Add OPENAI_API_KEY to config
2. Check console for rate limit messages
3. Verify API key is valid at https://platform.openai.com

---

## API Reference

### ArcaneaAuth

```javascript
// Initialize
await ArcaneaAuth.initialize()

// Sign up
const result = await ArcaneaAuth.signUp(email, password, { fullName: 'User' })

// Sign in
const result = await ArcaneaAuth.signIn(email, password)

// Sign out
await ArcaneaAuth.signOut()

// Check status
ArcaneaAuth.isAuthenticated() // boolean
ArcaneaAuth.getUser() // user object or null

// Listen for changes
ArcaneaAuth.onAuthStateChange((event, data) => {
  console.log(event) // 'SIGNED_IN', 'SIGNED_OUT', etc.
})
```

### ArcaneaSync

```javascript
// Initialize
await ArcaneaSync.initialize()

// Save game state
await ArcaneaSync.saveGameState({ level: 5, xp: 1000 })

// Save business state
await ArcaneaSync.saveBusinessState({ revenue: { monthly: 5000 } })

// Force sync
await ArcaneaSync.forceSync()

// Check status
ArcaneaSync.getStatus()
// { isOnline, isSyncing, status, queueLength, lastSync }
```

### ArcaneaAI (Agents)

```javascript
// Initialize
ArcaneaAI.initialize()

// Get all agents
const agents = ArcaneaAI.getAgents()

// Get agents by element
const fireAgents = ArcaneaAI.getAgentsByElement('fire')

// Summon an agent
ArcaneaAI.summonAgent('dragon-forge')

// Send message
const response = await ArcaneaAI.sendMessage('dragon-forge', 'Hello!')
console.log(response.message)

// Increase bond
ArcaneaAI.increaseBond('dragon-forge', 5)
```

### ArcaneaMCP

```javascript
// Initialize
ArcaneaMCP.initialize()

// Generate image
const result = await ArcaneaMCP.generateImage({
  prompt: 'A fire dragon',
  style: 'fantasy'
})

// Analyze code
const result = await ArcaneaMCP.analyzeCode({
  code: 'function add(a, b) { return a + b; }',
  language: 'javascript'
})

// Check status
ArcaneaMCP.getStatus()
```

### AuthUI

```javascript
// Open auth modal
AuthUI.open() // default: login
AuthUI.open('signup')
AuthUI.open('reset')

// Close modal
AuthUI.close()

// Create user menu
AuthUI.createUserMenu('user-menu-container')
```

### ArcaneaMobile

```javascript
// Initialize
ArcaneaMobile.initialize()

// Get device info
const info = ArcaneaMobile.getDeviceInfo()
// { type, isMobile, isTouch, orientation, screen, ... }

// Create mobile nav
ArcaneaMobile.createMobileNav([
  { id: 'home', label: 'Home', icon: '🏠', href: '/', active: true },
  { id: 'games', label: 'Games', icon: '🎮', href: '/games' },
  { id: 'business', label: 'Business', icon: '💼', href: '/business' }
])

// Vibrate
ArcaneaMobile.vibrate(100)
```

---

## Deployment Checklist

Before deploying to production:

- [ ] Supabase project created and configured
- [ ] Database SQL executed successfully
- [ ] RLS policies tested and working
- [ ] Realtime enabled for all tables
- [ ] Auth providers configured (if using OAuth)
- [ ] Environment variables set correctly
- [ ] Integration script added to all HTML files
- [ ] User menu and sync status added to pages
- [ ] Mobile navigation configured
- [ ] All 8 HTML files tested
- [ ] Sign up flow tested
- [ ] Sign in flow tested
- [ ] Data sync tested
- [ ] Offline mode tested
- [ ] AI agents tested (if using)
- [ ] MCP tools tested (if using)
- [ ] Mobile responsiveness tested
- [ ] Error handling verified
- [ ] .env file NOT in git
- [ ] Site URL configured in Supabase
- [ ] Rate limits appropriate for usage

---

## Support

For issues or questions:

1. Check browser console for error messages
2. Review this guide's Troubleshooting section
3. Check Supabase logs in dashboard
4. Verify all setup steps completed

---

**Version**: 3.0.0  
**Last Updated**: 2026-01-31  
**License**: MIT
