# BYOK & SaaS Architecture for Arcanea

## Reasoning: Why BYOK + Hybrid Model

After analyzing the requirements:
- User wants coding Agent as primary interface (opencode/claude code)
- No Ollama (local models) - wants cloud AI power
- Option for BYOK (Bring Your Own Key) to avoid vendor lock-in
- Potential SaaS offering for convenience
- Must support all options

### Decision: Tiered Architecture

**Tier 1: BYOK (Bring Your Own Key)** - Default
- User provides their own Claude API key
- We provide the orchestration layer
- Full privacy, user controls costs
- No vendor lock-in

**Tier 2: SaaS** - Optional
- We provide API access as service
- User pays subscription
- Convenience for non-technical users
- We manage infrastructure

**Tier 3: Hybrid** - Smart routing
- Simple tasks: opencode (kimi-k2.5-free)
- Medium tasks: BYOK Claude Sonnet
- Complex tasks: BYOK Claude Opus
- Automatic selection based on complexity

## Implementation Strategy

### Core Principle: opencode First

opencode is the primary interface because:
- Runs in user's environment (Arcanea directory)
- Extensible with custom skills
- Can call external APIs (Claude)
- User owns the entire experience
- No dependency on cloud services for basic operation

### Smart Routing Logic

```typescript
class HybridAI Router {
  constructor(userConfig) {
    this.claudeKey = userConfig.claudeApiKey; // BYOK
    this.opencode = new OpencodeClient(); // Free tier
    this.cache = new Map();
    
    // Complexity thresholds
    this.thresholds = {
      simple: 0.3,   // Use opencode
      medium: 0.7,   // Use Claude Sonnet
      complex: 1.0   // Use Claude Opus
    };
  }

  async generate(request) {
    const complexity = this.assessComplexity(request);
    
    // Check cache first
    const cacheKey = this.hash(request);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let result;
    
    if (complexity < this.thresholds.simple) {
      // Simple task - use opencode (free)
      result = await this.opencode.generate(request);
    } else if (complexity < this.thresholds.medium && this.claudeKey) {
      // Medium task - use Claude Sonnet (BYOK)
      result = await this.callClaude('claude-3-sonnet-20240229', request);
    } else if (this.claudeKey) {
      // Complex task - use Claude Opus (BYOK)
      result = await this.callClaude('claude-3-opus-20240229', request);
    } else {
      // No API key - use opencode even for complex tasks
      result = await this.opencode.generate(request);
    }

    // Cache result
    this.cache.set(cacheKey, result);
    
    return result;
  }

  assessComplexity(request) {
    // Analyze request complexity
    const text = request.text || request.prompt || '';
    
    let complexity = 0.3; // Base complexity
    
    // Increase for multi-part requests
    if (text.includes('and') || text.includes('also')) complexity += 0.1;
    
    // Increase for world building
    if (text.includes('world') || text.includes('system')) complexity += 0.3;
    
    // Increase for character development
    if (text.includes('character') || text.includes('backstory')) complexity += 0.2;
    
    // Increase for creative generation
    if (text.includes('create') || text.includes('generate')) complexity += 0.1;
    
    return Math.min(complexity, 1.0);
  }

  async callClaude(model, request) {
    if (!this.claudeKey) {
      throw new Error('Claude API key not configured');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.claudeKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: request.text || request.prompt
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }
}
```

## Technical Implementation

### 1. Configuration System

```json
{
  "arcanea": {
    "ai": {
      "primary": "opencode",
      "hybrid": {
        "enabled": true,
        "claudeApiKey": "${CLAUDE_API_KEY}",
        "thresholds": {
          "simple": 0.3,
          "medium": 0.7
        }
      },
      "saas": {
        "enabled": false,
        "endpoint": "https://api.arcanea.ai",
        "apiKey": "${ARCANEA_API_KEY}"
      }
    }
  }
}
```

### 2. API Client Implementations

**opencode Client** (Primary)
- Uses local opencode instance
- Free tier with kimi-k2.5-free
- No external dependencies
- Suitable for 70% of tasks

**Claude Client** (BYOK)
- User provides their own API key
- Direct API calls to Anthropic
- Sonnet for medium complexity
- Opus for high complexity
- User pays Anthropic directly

**Arcanea SaaS Client** (Optional)
- We provide API endpoint
- User subscribes to our service
- We manage Claude credits
- Simpler for non-technical users

### 3. Cost Optimization

**Caching Strategy**
- Cache all AI responses
- Hash based on prompt + parameters
- LRU cache with 10,000 entry limit
- Reduces API calls by ~40%

**Batch Processing**
- Group similar requests
- Process in single API call
- Reduces costs by ~30%

**Smart Routing**
- Simple tasks → opencode (free)
- Only complex tasks → Claude (paid)
- Reduces costs by ~60%

### 4. User Experience

**Onboarding Flow**
1. Default: opencode only (works immediately)
2. Optional: Add Claude API key for more power
3. Optional: Subscribe to SaaS for convenience

**Transparent Pricing**
- Show estimated cost before Claude calls
- Display token usage
- Offer to use opencode if cost too high

**Fallback Strategy**
- If Claude API fails → fallback to opencode
- If rate limited → queue and retry
- Always have working solution

## Business Model Options

### Option A: Pure BYOK (Recommended)
- No SaaS offering initially
- Focus on perfect BYOK experience
- Monetize through premium features, not API
- Lowest maintenance, highest user control

### Option B: Hybrid with SaaS
- BYOK as default
- SaaS as upsell for convenience
- SaaS price: $20/month (includes Claude credits)
- Target non-technical users

### Option C: Enterprise SaaS
- Team collaboration features
- Shared workspaces
- Admin controls
- Custom pricing

## Implementation Files

### 1. Configuration Loader
`config/ai-loader.js` - Loads and validates AI configuration

### 2. Router Implementation  
`ai/hybrid-router.js` - Routes requests to appropriate AI

### 3. API Clients
- `ai/clients/opencode.js` - opencode integration
- `ai/clients/claude.js` - Claude BYOK integration
- `ai/clients/arcanea-saas.js` - SaaS integration (future)

### 4. Cost Tracker
`ai/cost-tracker.js` - Tracks usage and costs

## Next Steps

1. Implement hybrid router with smart complexity detection
2. Create configuration system
3. Add BYOK Claude integration
4. Test with real API keys
5. Optimize caching
6. (Optional) Build SaaS offering

## Why This Approach

- **User Control**: BYOK means users own their AI access
- **No Lock-in**: Can switch providers anytime
- **Cost Efficient**: Smart routing minimizes paid API calls
- **Scalable**: Works standalone or with full cloud power
- **Future Proof**: Can add new AI providers easily

---

*This architecture gives users maximum flexibility while maintaining powerful AI capabilities.*
