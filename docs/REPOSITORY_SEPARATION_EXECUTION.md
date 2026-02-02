# 🚀 Repository Separation Execution Plan

## 🎯 **Current Status: Ready for Execution**

All workspace reorganization is complete and committed. Now executing the repository separation strategy.

## 📋 **Execution Steps**

### **Phase 1: Mobile App Extraction**
**Target:** `frankxai/arcanea-mobile`

#### **Steps:**
1. **Create GitHub Repository:**
   ```bash
   gh repo create frankxai/arcanea-mobile --public --description "Arcanea Mobile App - React Native"
   ```

2. **Extract Mobile Content:**
   ```bash
   # Create clean mobile repo
   mkdir ../arcanea-mobile
   cd ../arcanea-mobile
   git init
   git remote add origin https://github.com/frankxai/arcanea-mobile.git

   # Copy mobile app content
   cp -r ../arcanea/apps/mobile/* .

   # Add mobile-specific files
   echo "# Arcanea Mobile App" > README.md
   echo "node_modules/\n.expo/\n*.log" > .gitignore

   # Initial commit
   git add .
   git commit -m "🚀 Initial mobile app extraction from main repo"
   git push -u origin main
   ```

3. **Update Main Repo:**
   ```bash
   # Remove mobile from main repo
   cd ../arcanea
   rm -rf apps/mobile

   # Add mobile as submodule or npm dependency
   # Update package.json to reference mobile repo
   ```

### **Phase 2: Prompt Language Extraction**
**Target:** `frankxai/arcanea-prompt-language`

#### **Content to Extract:**
- `research/experiments/Arcanea-Prompt-Language-System/`
- Create parser, documentation, examples structure

#### **Steps:**
1. **Create Repository:**
   ```bash
   gh repo create frankxai/arcanea-prompt-language --public --description "Arcanea Prompt Language - DSL for AI Prompting"
   ```

2. **Structure Content:**
   ```
   arcanea-prompt-language/
   ├── docs/
   │   ├── specification.md       # Language spec
   │   ├── getting-started.md     # Quick start
   │   └── examples.md           # Usage examples
   ├── parser/                   # Language parser
   ├── examples/                 # .arc example files
   ├── tools/                    # Development tools
   ├── tests/                    # Language tests
   ├── package.json             # NPM package config
   └── README.md                # Project overview
   ```

### **Phase 3: Library Content Extraction**
**Target:** `frankxai/arcanean-library`

#### **Content to Extract:**
- `content/legacy/library-content/`
- `frank-input/truths/` (as reference, not moved)

#### **Repository Structure:**
```
arcanean-library/
├── content/
│   ├── codex/                # The main Arcanean texts
│   ├── philosophy/           # Philosophical works
│   ├── guides/              # Practical guides
│   └── canon/               # Official canon
├── interactive/             # Interactive experiences
├── tools/                   # Content management
├── api/                     # Content API
└── README.md               # Library overview
```

## 🔄 **Integration Strategy**

### **1. Main Repo Dependencies**
Update `package.json` in main repo:
```json
{
  "dependencies": {
    "@arcanea/prompt-language": "^1.0.0",
    "@arcanea/library-content": "^2.0.0"
  },
  "scripts": {
    "dev:mobile": "cd ../arcanea-mobile && npm run dev",
    "build:mobile": "cd ../arcanea-mobile && npm run build"
  }
}
```

### **2. Cross-Repo CI/CD**
- **Main repo builds:** Trigger tests in dependent repos
- **Standalone repos:** Publish to npm as packages
- **Version coordination:** Synchronized major releases

### **3. Documentation Links**
- Cross-reference between repositories
- Unified documentation site
- Consistent branding and messaging

## ⚡ **Quick Execution Commands**

For immediate execution:

```bash
# 1. Create mobile repo
gh repo create frankxai/arcanea-mobile --public --description "Arcanea Mobile - React Native App"

# 2. Create prompt language repo
gh repo create frankxai/arcanea-prompt-language --public --description "Arcanea Prompt Language - DSL for AI"

# 3. Create library repo
gh repo create frankxai/arcanean-library --public --description "Arcanean Library - Philosophical Content System"

# 4. Extract and push content (detailed steps in each phase above)
```

## 🎯 **Benefits After Separation**

### **For Development:**
- **Faster builds:** Each repo builds independently
- **Focused development:** Clear separation of concerns
- **Independent deployment:** Mobile app, language, library evolve separately

### **For Community:**
- **Lower barrier:** Contributors can focus on specific areas
- **Reusability:** Other projects can use prompt language or library
- **Specialized expertise:** Language designers, content creators, mobile devs

### **For Frank:**
- **Maintained control:** Main repo remains source of truth for strategy
- **Broader impact:** Components can build their own communities
- **Cleaner organization:** Each repo has focused purpose

## ✅ **Success Metrics**
- [ ] All repositories created on GitHub
- [ ] Content properly extracted and organized
- [ ] Cross-repo integration working
- [ ] Documentation updated and linked
- [ ] CI/CD pipelines established
- [ ] npm packages published (where applicable)

---

**Ready for immediate execution. All preparation complete.**