# Domain Strategy: arcanea.ai vs arcanea.io

## 🌐 Domain Purpose & Positioning

### **arcanea.ai - Premium AI Experience**
**Focus:** AI-powered creation, premium spatial experience, Guardian entities
**Audience:** Individual creators, professionals, AI enthusiasts
**Vibe:** Premium, magical, transformative, cutting-edge

### **arcanea.io - Open-Source Community**
**Focus:** Community collaboration, sharing, templates, open-source tools
**Audience:** Worldbuilders, writers, D&D groups, collaborative creators
**Vibe:** Community-driven, accessible, collaborative, creative commons

---

## 🏗️ Technical Domain Architecture

### **Primary Domains**
```
arcanea.ai                    # Premium AI Experience (Main Product)
├── app.arcanea.ai           # Spatial studio application
├── api.arcanea.ai           # Premium API endpoints
├── developers.arcanea.ai    # Developer portal and documentation
├──cdn.arcanea.ai           # Static assets (3D models, images)
└──status.arcanea.ai         # System status and uptime

arcanea.io                   # Community Platform (Open Source)
├── www.arcanea.io          # Community landing page
├──explore.arcanea.io       # World and template gallery
├──collab.arcanea.io        # Collaborative worldbuilding
├──docs.arcanea.io          # Community documentation
└──github.arcanea.io        # Repository redirects
```

### **Subdomain Strategy**
```
# Authentication (Cross-Domain)
auth.arcanea.ai              # Single Sign-On service
accounts.arcanea.ai          # User management dashboard

# Infrastructure
infra.arcanea.ai             # Infrastructure monitoring
logs.arcanea.ai              # Application logs
metrics.arcanea.ai           # Performance metrics
```

---

## 🔄 User Flow Between Domains

### **Discovery Journey**
```
User discovers Arcanea
       ↓
 Lands on arcanea.ai (premium showcase)
       ↓
 Tries free Guardian-guided creation
       ↓
 Discovers arcanea.io for community content
       ↓
 Joins collaborative worldbuilding
       ↓
 Upgrades to premium for advanced features
       ↓
 Becomes community contributor
```

### **Cross-Domain Features**
- **Unified Authentication** - Single login across both domains
- **Seamless Navigation** - Links between premium tools and community content
- **Data Synchronization** - Creations sync between private and public spaces
- **Profile Integration** - Single user profile across ecosystem

---

## 🎯 Content Strategy by Domain

### **arcanea.ai Content Focus**
```
Primary Content:
├── Guardian Entity Showcase     # 3D interactive AI companions
├── Spatial Studio Demo           # Premium creation interface
├── Success Stories               # Professional creator testimonials
├── AI Technology Deep Dives     # Technical innovation articles
├── Pricing & Tiers              # Subscription information
└── Premium Features             # Advanced tool demonstrations

Marketing:
├── "Where AI Becomes Presence"   # Core messaging
├── "Guardian-Guided Creation"   # Unique value proposition
├── "Spatial Worldbuilding"       # Premium experience
└── "Transform Your Stories"      # Creator transformation
```

### **arcanea.io Content Focus**
```
Primary Content:
├── Community Gallery             # Showcase user creations
├── Template Marketplace          # Reusable frameworks
├── Collaborative Projects       # Active worldbuilding sessions
├── Community Forums             # Discussions and help
├── Open-Source Resources        # Free assets and tools
└── Community Events             # Jams, contests, meetups

Community Messaging:
├── "Build Worlds Together"      # Collaboration focus
├── "Share Your Universes"       # Community showcase
├── "Open Creative Ecosystem"    # Open-source philosophy
└── "Where Creators Unite"       # Community belonging
```

---

## 💰 Monetization by Domain

### **arcanea.ai Revenue Streams**
```
Premium Subscriptions:
├── Creator Tier ($19/mo)        # Full spatial studio, all Guardians
├── Professional Tier ($49/mo)   # API access, collaboration, export
└── Enterprise Tier (Custom)     # Custom agents, dedicated infrastructure

One-Time Purchases:
├── Premium Asset Packs          # High-quality 3D models, textures
├── Advanced Guardian Modules     # Specialized AI configurations
└── Professional Templates       # Premium worldbuilding frameworks

API Revenue:
├── Usage-Based Pricing          # Per-call API costs
├── Enterprise Contracts         # High-volume API deals
└── Partner Integrations         # Third-party platform deals
```

### **arcanea.io Revenue Strategy**
```
Community Value Capture:
├── Template Marketplace (70/30)   # Creator revenue share
├── Sponsorship Placements        # Featured tools and services
├── Premium Collaborations        # Paid collaborative sessions
└── Community Patrons             # Optional supporter program

Open-Source Value:
├── GitHub Sponsors              # Direct community funding
├── Corporate Partnerships        # Enterprise open-source support
├── Grant Applications           # Creative technology grants
└── Merchandise Store            # Community brand products
```

---

## 🛠️ Technical Implementation

### **DNS Configuration**
```dns
; arcanea.ai (Premium Experience)
arcanea.ai.          IN A     192.0.2.1
app.arcanea.ai.       IN A     192.0.2.2
api.arcanea.ai.       IN A     192.0.2.3
developers.arcanea.ai. IN A     192.0.2.4
cdn.arcanea.ai.       IN CNAME cdn.provider.net

; arcanea.io (Community Platform)
arcanea.io.           IN A     192.0.2.10
www.arcanea.io.       IN A     192.0.2.10
explore.arcanea.io.   IN A     192.0.2.11
collab.arcanea.io.    IN A     192.0.2.12
docs.arcanea.io.      IN CNAME github.io

; Authentication (Cross-Domain)
auth.arcanea.ai.      IN A     192.0.2.20
accounts.arcanea.ai.   IN A     192.0.2.20
```

### **SSL Configuration**
```yaml
# Primary SSL Certificates
- arcanea.ai (wildcard): *.arcanea.ai
- arcanea.io (wildcard): *.arcanea.io
- auth.arcanea.ai: Authentication service
```

### **Cross-Domain Headers**
```javascript
// arcanea.ai headers
{
  'Access-Control-Allow-Origin': 'https://arcanea.io',
  'Access-Control-Allow-Credentials': 'true',
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
}

// arcanea.io headers  
{
  'Access-Control-Allow-Origin': 'https://arcanea.ai',
  'Access-Control-Allow-Credentials': 'true',
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
}
```

---

## 📊 SEO & Analytics Strategy

### **Domain-Specific SEO**
```
arcanea.ai Target Keywords:
├── "AI worldbuilding"           # Primary competitive term
├── "3D creation tools"          # Spatial experience
├── "AI story writing"           # Narrative creation
├── "Guardian AI companions"     # Unique offering
└── "Premium creative AI"         # High-intent commercial

arcanea.io Target Keywords:
├── "Fantasy worldbuilding"       # Community term
├── "D&D world creator"           # RPG community
├── "Collaborative storytelling"  # Shared creation
├── "Open-source creative tools"   # Developer audience
└── "Worldbuilding community"      # Community focus
```

### **Analytics Implementation**
```javascript
// Cross-Domain Tracking
gtag('config', 'GA_MEASUREMENT_ID', {
  linked_domains: ['arcanea.ai', 'arcanea.io'],
  linker: {
    domains: ['arcanea.ai', 'arcanea.io']
  }
});

// Custom Events
trackEvent('user_flow', {
  from_domain: 'arcanea.ai',
  to_domain: 'arcanea.io',
  action: 'discovery_to_community'
});
```

---

## 🔄 Repository to Domain Mapping

### **Repository Organization**
```
# Core Systems (Open Source)
intelligence-os/          → Powers both domains via APIs
labs/                     → Shared packages and components
docs.arcanea.ai/          → Developer documentation site

# Premium Experience (Private)
arcanea.ai/               → Premium spatial studio web app
arcanea-assets/           → Premium 3D models and assets
arcanea-premium/          → Subscriber-only features

# Community Platform (Open Source)  
arcanea.io/               → Community platform web app
arcanea-templates/        → Community template library
arcanea-plugins/          → Community-built extensions
```

### **Deployment Pipeline**
```yaml
# CI/CD Workflow
environments:
  production:
    - arcanea.ai: premium.arcanea.ai
    - arcanea.io: www.arcanea.io
  staging:
    - arcanea.ai: premium-staging.arcanea.ai
    - arcanea.io: staging.arcanea.io
  development:
    - arcanea.ai: dev.arcanea.ai
    - arcanea.io: dev.arcanea.io
```

---

## 🚀 Launch Strategy

### **Phase 1: Foundation Launch (Week 1-4)**
```
Week 1-2: Domain Setup
├── Configure DNS and SSL for both domains
├── Set up hosting infrastructure
├── Implement cross-domain authentication
└── Create basic landing pages

Week 3-4: Core Features
├── Launch arcanea.ai with premium showcase
├── Launch arcanea.io with community basics
├── Enable cross-domain user accounts
└── Implement basic creation tools
```

### **Phase 2: Feature Expansion (Week 5-12)**
```
Month 2: Premium Experience
├── Full spatial studio launch
├── Guardian entity implementation
├── Premium subscription activation
└── API endpoint availability

Month 3: Community Growth
├── Template marketplace launch
├── Collaborative features activation
├── Community moderation system
└── Open-source repository connections
```

### **Phase 3: Ecosystem Growth (Week 13-24)**
```
Month 4-6: Developer Platform
├── Developer portal full launch
├── SDK and API documentation
├── Plugin ecosystem development
└── Third-party integrations

Month 7-12: Market Expansion
├── Mobile applications
├── VR/AR platform extensions
├── Enterprise partnerships
└── International market entry
```

---

## 🎯 Success Metrics

### **Domain Performance Indicators**
```
arcanea.ai KPIs:
├── Premium conversion rate: 15% free→paid
├── Average revenue per user: $35/month
├── Spatial session duration: 25+ minutes
└── Guardian interaction rate: 80% of sessions

arcanea.io KPIs:
├── Community active users: 50K+ by month 12
├── Template submissions: 1000+ by month 12
├── Collaborative sessions: 500+ daily
└── Community contribution rate: 25% of users

Cross-Domain KPIs:
├── Domain cross-over rate: 40% of users use both
├── Unified session duration: 45+ minutes
├── Creator retention: 70% month-over-month
└── API adoption: 1000+ developers by month 12
```

This domain strategy positions Arcanea to capture both premium AI tool revenue and community-driven growth, creating a comprehensive ecosystem that serves all segments of the creator market.