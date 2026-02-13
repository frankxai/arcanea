# Arcane Arcade Template 🎮
## Fire Element 2D Action Game - Phaser + Next.js

> *"Explosive arcade action with Fire element magic"*

### **Template Overview**
The Arcane Arcade template creates fast-paced 2D action games using Phaser.js and Next.js. Perfect for bullet hell shooters, platformer action, and intense arcade experiences.

### **Core Features**
- **60fps Action**: Smooth, responsive gameplay optimized for mobile and desktop
- **Combat System**: Integrated Draconia Combat System with hitbox perfection
- **Particle Effects**: Explosive visual feedback for every action
- **Adaptive Difficulty**: Real-time challenge adjustment based on player performance
- **Arcade Scoring**: Leaderboards, achievements, and competitive features

### **Technology Stack**
```json
{
  "gameEngine": "Phaser.js 3.80",
  "framework": "Next.js 14",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "deployment": "Vercel",
  "database": "Supabase"
}
```

### **Quick Start**
```bash
# Clone template
npx create-arcanea-game arcane-arcade my-game

# Enter directory
cd my-game

# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build
```

### **Project Structure**
```
my-game/
├── 🎮 src/
│   ├── game/              # Phaser game logic
│   │   ├── scenes/       # Game scenes (menu, game, gameover)
│   │   ├── entities/     # Game objects (player, enemies, bullets)
│   │   ├── systems/      # Core game systems (combat, scoring)
│   │   └── utils/        # Helper functions
│   ├── components/         # React UI components
│   ├── pages/            # Next.js pages
│   └── styles/           # Global styles
├── 🔧 public/
│   ├── assets/           # Game assets (sprites, sounds)
│   └── game/            # Phaser game container
├── 📚 docs/             # Game documentation
└── ⚙️ config/            # Build and deployment config
```

### **Core Game Mechanics**

#### **Player Controller**
```typescript
// src/game/entities/Player.ts
export class Player extends Phaser.GameObjects.Sprite {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: any;
  private combatSystem!: DraconiaCombat;
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    
    // Enable physics
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    
    // Setup controls
    this.setupControls();
    
    // Setup combat
    this.setupCombat();
  }
  
  private setupControls() {
    // Keyboard controls
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.wasd = scene.input.keyboard.addKeys('W,S,A,D');
    
    // Touch controls for mobile
    scene.input.addPointer(3);
  }
  
  private setupCombat() {
    this.combatSystem = new DraconiaCombat({
      character: this,
      damage: 25,
      knockback: 150,
      abilities: ['dragon-strike', 'fire-breath']
    });
  }
  
  update(time: number, delta: number) {
    // Movement
    this.handleMovement(delta);
    
    // Combat
    this.handleCombat();
    
    // Animation
    this.updateAnimations();
  }
  
  private handleMovement(delta: number) {
    const speed = 200;
    let velocityX = 0;
    let velocityY = 0;
    
    // Arrow keys
    if (this.cursors.left.isDown) velocityX = -speed;
    else if (this.cursors.right.isDown) velocityX = speed;
    
    if (this.cursors.up.isDown) velocityY = -speed;
    else if (this.cursors.down.isDown) velocityY = speed;
    
    // WASD support
    if (this.wasd.A.isDown) velocityX = -speed;
    else if (this.wasd.D.isDown) velocityX = speed;
    
    if (this.wasd.W.isDown) velocityY = -speed;
    else if (this.wasd.S.isDown) velocityY = speed;
    
    // Apply movement
    this.setVelocity(velocityX, velocityY);
    
    // Normalize diagonal movement
    if (velocityX !== 0 && velocityY !== 0) {
      const normalizedSpeed = speed * 0.707; // 1/sqrt(2)
      this.setVelocity(
        velocityX > 0 ? normalizedSpeed : -normalizedSpeed,
        velocityY > 0 ? normalizedSpeed : -normalizedSpeed
      );
    }
  }
  
  private handleCombat() {
    // Attack on space or click/touch
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      this.combatSystem.executeAttack('dragon-strike');
    }
    
    // Special attack with shift
    if (Phaser.Input.Keyboard.JustDown(this.scene.input.keyboard.addKey('SHIFT'))) {
      this.combatSystem.executeAttack('fire-breath');
    }
  }
}
```

#### **Combat Integration**
```typescript
// src/game/systems/CombatSystem.ts
export class CombatSystem {
  private scene: Phaser.Scene;
  private particles: Phaser.GameObjects.Particles.ParticleEmitter;
  private explosions: Phaser.GameObjects.Group;
  
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.setupParticleEffects();
    this.setupExplosions();
  }
  
  private setupParticleEffects() {
    this.particles = scene.add.particles('fire-particles');
    
    // Configure for hit effects
    this.particles.createEmitter({
      speed: { min: 50, max: 200 },
      scale: { start: 0.5, end: 0 },
      alpha: { start: 1, end: 0 },
      lifespan: 1000,
      quantity: 20,
      blendMode: 'ADD'
    });
  }
  
  createHitEffect(x: number, y: number) {
    // Create explosion particle burst
    this.particles.explode(20, x, y);
    
    // Screen shake
    scene.cameras.main.shake(100, 0.01);
    
    // Hit stop (brief pause)
    scene.physics.world.pause();
    scene.time.delayedCall(50, () => {
      scene.physics.world.resume();
    });
  }
  
  checkHitCollision(attacker: Player, defender: Enemy) {
    const hitbox = this.createHitbox(attacker);
    const hurtbox = this.createHurtbox(defender);
    
    // Check overlap
    if (Phaser.Geom.Rectangle.Overlaps(hitbox, hurtbox)) {
      this.resolveHit(attacker, defender);
    }
  }
  
  private resolveHit(attacker: Player, defender: Enemy) {
    // Apply damage
    defender.takeDamage(25);
    
    // Knockback
    const angle = Phaser.Math.Angle.Between(
      attacker.x, attacker.y,
      defender.x, defender.y
    );
    const knockbackForce = 150;
    defender.setVelocity(
      Math.cos(angle) * knockbackForce,
      Math.sin(angle) * knockbackForce
    );
    
    // Visual feedback
    this.createHitEffect(defender.x, defender.y);
    
    // Score
    attacker.scene.registry.values.score += 100;
    
    // Screen flash
    scene.cameras.main.flash(100, 255, 100, 0, false);
  }
}
```

#### **Adaptive Difficulty System**
```typescript
// src/game/systems/AdaptiveDifficulty.ts
export class AdaptiveDifficultySystem {
  private playerPerformance: PerformanceTracker;
  private difficultySettings: DifficultySettings;
  
  constructor() {
    this.playerPerformance = new PerformanceTracker();
    this.difficultySettings = new DifficultySettings();
  }
  
  updatePerformance(playerAction: PlayerAction) {
    this.playerPerformance.recordAction(playerAction);
    
    // Adjust difficulty every 30 seconds
    if (this.playerPerformance.getTimeSinceLastAdjustment() > 30000) {
      this.adjustDifficulty();
      this.playerPerformance.resetAdjustmentTimer();
    }
  }
  
  private adjustDifficulty() {
    const performance = this.playerPerformance.calculatePerformanceScore();
    
    if (performance > 0.8) {
      // Player doing very well - increase difficulty
      this.increaseDifficulty();
    } else if (performance < 0.3) {
      // Player struggling - decrease difficulty
      this.decreaseDifficulty();
    }
    // Otherwise, maintain current difficulty
  }
  
  private increaseDifficulty() {
    this.difficultySettings.enemySpeed *= 1.1;
    this.difficultySettings.enemyHealth *= 1.05;
    this.difficultySettings.enemyFireRate *= 1.1;
    this.difficultySettings.powerupSpawnRate *= 0.9;
  }
  
  private decreaseDifficulty() {
    this.difficultySettings.enemySpeed *= 0.9;
    this.difficultySettings.enemyHealth *= 0.95;
    this.difficultySettings.enemyFireRate *= 0.9;
    this.difficultySettings.powerupSpawnRate *= 1.1;
  }
}
```

### **UI Components**

#### **Game HUD**
```typescript
// src/components/GameHUD.tsx
import React from 'react';
import { useGameStore } from '../stores/gameStore';

export default function GameHUD() {
  const { score, health, combo, highScore } = useGameStore();
  
  return (
    <div className="fixed top-0 left-0 right-0 p-4 pointer-events-none z-50">
      <div className="flex justify-between items-start">
        {/* Score Display */}
        <div className="bg-black bg-opacity-50 rounded-lg p-3">
          <div className="text-white font-bold text-xl">SCORE</div>
          <div className="text-yellow-400 font-mono text-2xl">{score.toLocaleString()}</div>
        </div>
        
        {/* Health Bar */}
        <div className="bg-black bg-opacity-50 rounded-lg p-3">
          <div className="text-white font-bold text-xl mb-2">HEALTH</div>
          <div className="w-48 h-6 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300"
              style={{ width: `${health}%` }}
            />
          </div>
        </div>
        
        {/* Combo Display */}
        <div className="bg-black bg-opacity-50 rounded-lg p-3">
          <div className="text-white font-bold text-xl">COMBO</div>
          <div className="text-orange-400 font-mono text-2xl">
            {combo > 1 ? `${combo}x` : '--'}
          </div>
        </div>
      </div>
      
      {/* High Score */}
      <div className="fixed top-4 right-4 bg-black bg-opacity-50 rounded-lg p-3">
        <div className="text-white font-bold text-sm">HIGH SCORE</div>
        <div className="text-purple-400 font-mono text-lg">{highScore.toLocaleString()}</div>
      </div>
    </div>
  );
}
```

### **Deployment & Publishing**

#### **Vercel Configuration**
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "out"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

#### **Build Script**
```bash
#!/bin/bash
# build.sh - Production build script

echo "🔥 Building Arcane Arcade Game..."

# Next.js build
npm run build

# Optimize game assets
npm run optimize-assets

# Compress for web
npm run compress

echo "🚀 Build complete! Ready for deployment to Vercel."
```

### **Performance Optimization**

#### **Asset Management**
```typescript
// src/utils/AssetManager.ts
export class AssetManager {
  private loadedAssets: Map<string, any> = new Map();
  
  async preloadAssets(scene: Phaser.Scene) {
    const assets = [
      // Player assets
      { key: 'player', path: 'assets/sprites/player.png' },
      
      // Enemy assets
      { key: 'enemy', path: 'assets/sprites/enemy.png' },
      
      // Particle assets
      { key: 'fire-particles', path: 'assets/particles/fire.png' },
      
      // Sound effects
      { key: 'shoot-sound', path: 'assets/sounds/shoot.wav' },
      { key: 'explosion-sound', path: 'assets/sounds/explosion.wav' },
      { key: 'powerup-sound', path: 'assets/sounds/powerup.wav' }
    ];
    
    // Preload with progress tracking
    assets.forEach((asset, index) => {
      scene.load.image(asset.key, asset.path);
    });
  }
  
  optimizeForMobile() {
    // Reduce particle counts on mobile
    if (this.isMobile()) {
      this.setParticleCount(10);
      this.setQuality('low');
    }
  }
  
  private isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent);
  }
}
```

### **Community Features**

#### **Leaderboard System**
```typescript
// src/utils/LeaderboardManager.ts
export class LeaderboardManager {
  private supabase: any;
  
  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  
  async submitScore(playerName: string, score: number) {
    const { data, error } = await this.supabase
      .from('leaderboard')
      .insert([
        { player_name: playerName, score: score, timestamp: new Date() }
      ]);
    
    if (error) throw error;
    return data;
  }
  
  async getTopScores(limit: number = 10) {
    const { data, error } = await this.supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  }
}
```

---

**🔥 The Arcane Arcade template is your launchpad for creating electrifying 2D action games that pulse with Fire element energy!**

**Perfect for rapid prototyping, game jams, and commercial arcade games. Start creating your explosive masterpiece today!**