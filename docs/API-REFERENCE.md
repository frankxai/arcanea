# 📖 API-REFERENCE.md
## Arcanea Magical Agent API Documentation

**Version:** 3.0.0  
**Last Updated:** 2026-01-30  

---

## 🚀 Getting Started

### Installation

```javascript
const { ArcaneaMagicalAgent } = require('./arcanea-magical-agent');

const agent = new ArcaneaMagicalAgent({
  libraryPath: './library',
  cachePath: './.arcanea-cache',
  learningEnabled: true
});

await agent.initialize();
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `libraryPath` | string | './library' | Path to library directory |
| `cachePath` | string | './.arcanea-cache' | Path to cache directory |
| `learningEnabled` | boolean | true | Enable learning system |

---

## 📚 Core API

### Scan Library

Scan and analyze all files in the library.

```javascript
const results = await agent.scan({
  recursive: true,
  fileTypes: ['.md', '.txt', '.json']
});
```

**Parameters:**
- `recursive` (boolean): Scan subdirectories
- `fileTypes` (array): Filter by file extensions

**Returns:**
```javascript
{
  files: [
    {
      path: './file.md',
      metadata: { /* file metadata */ },
      analysis: { /* 7-dimension analysis */ }
    }
  ],
  analyzed: 42,
  guardians: { /* guardian counts */ },
  elements: { /* elemental distribution */ }
}
```

---

### Analyze File

Perform multi-dimensional analysis on a single file.

```javascript
const analysis = await agent.analyze('./my-file.md');
```

**Returns:**
```javascript
{
  file: './my-file.md',
  analysis: {
    timestamp: '2026-01-30T12:00:00Z',
    hash: 'a1b2c3d4...',
    dimensions: {
      content: { /* content analysis */ },
      semantic: { /* semantic analysis */ },
      visual: { /* visual analysis */ },
      temporal: { /* temporal analysis */ },
      relational: { /* relational analysis */ },
      guardian: { /* guardian affinity */ },
      cosmic: { /* cosmic patterns */ }
    },
    composite: {
      overallConfidence: 0.85,
      dimensionsAnalyzed: 7,
      primaryDimension: 'content',
      guardianAffinity: 'fire'
    }
  },
  insights: [
    'High complexity content',
    'Primary guardian: Dragon Forge'
  ],
  guardian: {
    dominantGuardian: 'Dragon Forge',
    dominantElement: 'fire',
    elementalBalance: { /* percentages */ }
  }
}
```

---

### Semantic Search

Search content using semantic understanding.

```javascript
const results = await agent.search('creative transformation', {
  threshold: 0.3,
  limit: 10,
  includeExcerpts: true
});
```

**Parameters:**
- `query` (string): Search query
- `threshold` (number): Minimum similarity score (0-1)
- `limit` (number): Maximum results

**Returns:**
```javascript
{
  query: 'creative transformation',
  results: [
    {
      id: './file1.md',
      similarity: 0.87,
      metadata: { /* file metadata */ },
      excerpt: 'This content discusses creative transformation...'
    }
  ],
  total: 15,
  suggestions: ['creative transformation fire', 'creative transformation guide']
}
```

---

### Get Recommendations

Generate personalized recommendations.

```javascript
const recommendations = await agent.recommend('user-123', {
  context: { recentFiles: ['./file1.md'] }
});
```

**Returns:**
```javascript
{
  forYou: [
    { id: 'rec1', title: 'Guardian Mastery', confidence: 0.9 }
  ],
  trending: [
    { id: 'trend1', title: 'Elemental Fusion', trend: 'rising' }
  ],
  basedOnHistory: [
    { contentId: 'file1', action: 'viewed', timeAgo: '2h ago' }
  ],
  elementalAlignment: {
    primary: 'fire',
    primaryPercentage: 45,
    balance: { fire: 45, water: 20, earth: 15, wind: 10, void: 10 }
  },
  guardianSuggestions: [
    {
      agent: 'Dragon Forge',
      command: '/dragon-forge',
      reason: 'Aligned with your fire affinity',
      specialty: 'Intense creative transformation'
    }
  ]
}
```

---

### Record Feedback

Record user feedback for the learning system.

```javascript
await agent.recordFeedback('content-id', {
  rating: 5,
  liked: true,
  tags: ['helpful', 'insightful']
}, 'user-123');
```

---

### Run Workflow

Execute an automated workflow.

```javascript
const result = await agent.runWorkflow('auto-scan', {
  path: './new-files'
});
```

**Returns:**
```javascript
{
  workflow: 'auto-scan',
  startTime: '2026-01-30T12:00:00Z',
  endTime: '2026-01-30T12:00:05Z',
  success: true,
  steps: [
    { step: 'scan', success: true, duration: 2000 },
    { step: 'analyze', success: true, duration: 2500 },
    { step: 'notify', success: true, duration: 100 }
  ]
}
```

---

## 🔮 Guardian API

### Get Guardian Info

```javascript
const guardian = agent.getGuardianInfo('dragon-forge');
```

**Returns:**
```javascript
{
  id: 'dragon-forge',
  name: 'Dragon Forge',
  command: '/dragon-forge',
  specialty: 'Intense creative transformation',
  element: 'fire',
  court: "Draconia's Court"
}
```

### Get All Guardians

```javascript
const allGuardians = agent.getAllGuardians();
```

**Returns:** Array of all 38 Guardian entities.

---

## 📊 System API

### Get Statistics

```javascript
const stats = agent.getStats();
```

**Returns:**
```javascript
{
  filesIndexed: 2847,
  interactions: 15432,
  feedbackCount: 892,
  workflows: 10,
  executions: 567
}
```

---

## 🎨 Multi-Dimensional Analysis API

### ContentDimension

```javascript
const contentAnalysis = {
  type: 'markdown',        // Detected content type
  language: 'english',     // Detected language
  complexity: {
    lines: 150,
    words: 1200,
    uniqueWords: 450,
    complexityScore: 7.5    // 0-10 scale
  },
  keywords: [
    { word: 'creative', count: 15 },
    { word: 'transform', count: 12 }
  ],
  entities: [
    { type: 'guardian', name: 'Dragon Forge', id: 'dragon-forge' }
  ],
  sentiment: {
    score: 3,
    label: 'positive',
    magnitude: 5
  }
};
```

### SemanticDimension

```javascript
const semanticAnalysis = {
  topics: [
    { name: 'Creative', relevance: 0.85 },
    { name: 'Technical', relevance: 0.65 }
  ],
  concepts: ['Creative Transformation', 'Dragon Forge', 'Fire Element'],
  intent: { type: 'instructional', confidence: 0.9 },
  category: [
    { element: 'fire', guardian: 'Draconia', affinity: 0.75 }
  ]
};
```

### GuardianDimension

```javascript
const guardianAnalysis = {
  dominantGuardian: 'Dragon Forge',
  dominantElement: 'fire',
  allAffinities: {
    fire: { score: 8.5, guardian: 'Draconia' },
    water: { score: 2.1, guardian: 'Leyla' },
    earth: { score: 3.2, guardian: 'Lyssandria' }
  },
  recommendedAgents: [
    { name: 'Dragon Forge', command: '/dragon-forge', ... },
    { name: 'Phoenix Artisan', command: '/phoenix-artisan', ... }
  ],
  elementalBalance: {
    fire: 45.5,
    water: 11.2,
    earth: 17.1,
    wind: 13.4,
    void: 12.8
  }
};
```

---

## ⚡ CLI Commands

### Available Commands

```bash
# Scan library
node arcanea-magical-agent.js scan

# Analyze file
node arcanea-magical-agent.js analyze <file-path>

# Search
node arcanea-magical-agent.js search <query>

# Get recommendations
node arcanea-magical-agent.js recommend [user-id]

# List guardians
node arcanea-magical-agent.js guardians

# Show stats
node arcanea-magical-agent.js stats

# List workflows
node arcanea-magical-agent.js workflows

# Run workflow
node arcanea-magical-agent.js run <workflow-name>
```

---

## 🛠️ Skill Configuration API

### Guardian Detection Skill

```javascript
{
  "configuration": {
    "detectionMode": "multi-dimensional",
    "confidenceThreshold": 0.6,
    "keywordWeight": 0.4,
    "semanticWeight": 0.3,
    "contextWeight": 0.3
  }
}
```

### Semantic Search Skill

```javascript
{
  "configuration": {
    "indexType": "inverted",
    "vectorDimension": 100,
    "similarityMetric": "cosine",
    "defaultThreshold": 0.3,
    "maxResults": 50
  }
}
```

---

## 🔧 Error Handling

### Common Errors

```javascript
try {
  const result = await agent.analyze('./nonexistent.md');
} catch (error) {
  console.error('Analysis failed:', error.message);
  // Error: ENOENT: no such file or directory
}
```

### Error Types

| Error | Cause | Solution |
|-------|-------|----------|
| `ENOENT` | File not found | Check file path |
| `EACCES` | Permission denied | Check file permissions |
| `TIMEOUT` | Operation timeout | Increase timeout limit |
| `PARSE_ERROR` | Invalid content | Check file format |

---

## 📈 Performance Tips

### Optimize Scan Performance

```javascript
// Limit file types
await agent.scan({
  fileTypes: ['.md', '.txt'],
  recursive: false  // Skip subdirectories if not needed
});
```

### Batch Operations

```javascript
// Analyze multiple files efficiently
const files = ['./file1.md', './file2.md'];
const analyses = await Promise.all(
  files.map(f => agent.analyze(f))
);
```

### Caching

```javascript
// Results are automatically cached
// Adjust cache duration in skill config
{
  "performance": {
    "cacheResults": true,
    "cacheDuration": 3600  // 1 hour
  }
}
```

---

## 🔒 Security

### Best Practices

```javascript
// Validate input paths
const path = require('path');
const safePath = path.resolve('./library', userInput);

// Check permissions
try {
  await fs.access(safePath, fs.constants.R_OK);
  const result = await agent.analyze(safePath);
} catch (error) {
  // Handle access error
}
```

---

## 🧪 Testing

### Example Test

```javascript
const { ArcaneaMagicalAgent } = require('./arcanea-magical-agent');

async function test() {
  const agent = new ArcaneaMagicalAgent();
  await agent.initialize();
  
  // Test scan
  const scanResults = await agent.scan();
  console.assert(scanResults.files.length >= 0);
  
  // Test search
  const searchResults = await agent.search('test');
  console.assert(Array.isArray(searchResults.results));
  
  console.log('✅ All tests passed');
}

test();
```

---

## 📚 Additional Resources

- **MAGICAL-GUIDE.md** - Complete user guide
- **QUALITY-REPORT.md** - System assessment
- **Skill Documentation** - Individual skill guides in `.arcanea/skills/`
- **Trigger Documentation** - Trigger configurations in `.arcanea/triggers/`

---

*For support and updates, visit the Arcanea repository.*

**Version:** 3.0.0  
**License:** MIT  
**Author:** FrankX  
