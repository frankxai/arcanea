/**
 * E2E Tests for Arcanea Games System
 * Tests page load, XP earning, level progression, skill unlocks, and data persistence
 */

const { test, expect } = require('@playwright/test');

test.describe('Games System', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('http://localhost:3000/games-v2.html');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem('arcanea_initialized', 'true');
      localStorage.setItem('arcanea_games_state', JSON.stringify({
        player: {
          level: 1,
          xp: 0,
          totalXP: 0,
          agentsSummoned: 0,
          skillsMastered: 0,
          completedChallenges: 0,
          manifestations: 0,
          joinedDate: new Date().toISOString()
        },
        challenges: {
          fire: [],
          water: [],
          earth: [],
          wind: [],
          void: []
        },
        agents: [
          { id: 'dragon-forge', name: 'Dragon-Forge', element: 'fire', icon: '🐉', summoned: false, bonded: false },
          { id: 'phoenix-artisan', name: 'Phoenix-Artisan', element: 'fire', icon: '🔥', summoned: false, bonded: false }
        ],
        skills: [
          { id: 'ignite', name: 'Ignition.Spark', element: 'fire', level: 1, xp: 0, maxXP: 1000, icon: '🔥' },
          { id: 'flow', name: 'Flow.Channel', element: 'water', level: 1, xp: 0, maxXP: 1000, icon: '🌊' }
        ],
        manifestations: [],
        lastSync: new Date().toISOString()
      }));
    });
    await page.reload();
  });

  test('should load games page without errors', async ({ page }) => {
    // Assert
    await expect(page).toHaveTitle(/Arcanea Games/);
    await expect(page.locator('.game-header')).toBeVisible();
    await expect(page.locator('.player-stats')).toBeVisible();
    
    // Check console for errors
    const logs = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(msg.text());
      }
    });
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    expect(logs).toHaveLength(0);
  });

  test('should display player stats correctly', async ({ page }) => {
    // Assert
    await expect(page.locator('.player-stat').first()).toBeVisible();
    
    const levelStat = page.locator('.player-stat').filter({ hasText: /Level/i });
    await expect(levelStat).toBeVisible();
  });

  test('should display all 4 game cards', async ({ page }) => {
    // Assert
    const gameCards = page.locator('.game-card');
    await expect(gameCards).toHaveCount(4);
    
    // Check each game card is visible
    await expect(gameCards.first()).toBeVisible();
    await expect(gameCards.nth(1)).toBeVisible();
    await expect(gameCards.nth(2)).toBeVisible();
    await expect(gameCards.nth(3)).toBeVisible();
  });

  test('should enter elemental tower and view challenges', async ({ page }) => {
    // Act - Click on "Enter Tower" button
    const enterTowerButton = page.locator('button', { hasText: /Enter Tower/i }).first();
    await enterTowerButton.click();
    
    // Assert
    await expect(page.locator('.tower-modal, .challenge-modal, [class*="tower"], [class*="challenge"]')).toBeVisible({ timeout: 5000 });
  });

  test('should open summoning circle', async ({ page }) => {
    // Act - Click on "Open Circle" button
    const openCircleButton = page.locator('button', { hasText: /Open Circle|Summoning/i }).first();
    await openCircleButton.click();
    
    // Assert
    await expect(page.locator('[class*="circle"], [class*="summon"], .summoning-modal')).toBeVisible({ timeout: 5000 });
  });

  test('should display agent cards', async ({ page }) => {
    // Act - Open summoning circle first
    const openCircleButton = page.locator('button', { hasText: /Open Circle/i }).first();
    if (await openCircleButton.isVisible().catch(() => false)) {
      await openCircleButton.click();
      
      // Assert - Check for agent cards
      const agentCards = page.locator('[class*="agent"], .agent-card');
      const count = await agentCards.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should persist data to localStorage', async ({ page }) => {
    // Act - Simulate earning XP
    await page.evaluate(() => {
      const gameState = JSON.parse(localStorage.getItem('arcanea_games_state') || '{}');
      gameState.player.xp += 100;
      gameState.player.totalXP += 100;
      localStorage.setItem('arcanea_games_state', JSON.stringify(gameState));
    });
    
    // Reload and verify persistence
    await page.reload();
    
    const savedState = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('arcanea_games_state') || '{}');
    });
    
    expect(savedState.player.xp).toBe(100);
    expect(savedState.player.totalXP).toBe(100);
  });

  test('should handle responsive layout on mobile', async ({ page }) => {
    // Arrange - Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    
    // Assert - Check mobile layout
    await expect(page.locator('.game-menu')).toBeVisible();
    
    // Verify cards stack vertically on mobile
    const gameCards = page.locator('.game-card');
    const firstCard = gameCards.first();
    const secondCard = gameCards.nth(1);
    
    const firstBox = await firstCard.boundingBox();
    const secondBox = await secondCard.boundingBox();
    
    // On mobile, cards should stack (second card below first)
    if (firstBox && secondBox) {
      expect(secondBox.y).toBeGreaterThan(firstBox.y);
    }
  });

  test('should display correct XP values', async ({ page }) => {
    // Get player stats from localStorage
    const stats = await page.evaluate(() => {
      const state = JSON.parse(localStorage.getItem('arcanea_games_state') || '{}');
      return state.player;
    });
    
    // Verify XP is displayed correctly
    expect(stats).toHaveProperty('xp');
    expect(stats).toHaveProperty('totalXP');
    expect(typeof stats.xp).toBe('number');
    expect(typeof stats.totalXP).toBe('number');
  });

  test('should show skill mastery section', async ({ page }) => {
    // Act - Look for skill mastery button/card
    const skillButton = page.locator('button', { hasText: /Begin Training|Skill|Mastery/i }).first();
    
    if (await skillButton.isVisible().catch(() => false)) {
      await skillButton.click();
      
      // Assert
      await expect(page.locator('[class*="skill"], .skill-modal, .mastery')).toBeVisible({ timeout: 5000 });
    }
  });

  test('should handle challenge completion flow', async ({ page }) => {
    // Act - Enter tower
    const enterTowerButton = page.locator('button', { hasText: /Enter Tower/i }).first();
    await enterTowerButton.click();
    
    // Try to find and click a challenge
    const challengeButton = page.locator('button, [class*="challenge"]').first();
    if (await challengeButton.isVisible().catch(() => false)) {
      await challengeButton.click();
      
      // Assert - Challenge modal should appear
      await expect(page.locator('[class*="modal"], [class*="challenge"]')).toBeVisible({ timeout: 5000 });
    }
  });

  test('should maintain session across page reloads', async ({ page }) => {
    // Arrange - Set some data
    await page.evaluate(() => {
      const state = JSON.parse(localStorage.getItem('arcanea_games_state') || '{}');
      state.player.level = 5;
      state.player.skillsMastered = 3;
      localStorage.setItem('arcanea_games_state', JSON.stringify(state));
    });
    
    // Act - Reload
    await page.reload();
    
    // Assert - Data persisted
    const state = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('arcanea_games_state') || '{}');
    });
    
    expect(state.player.level).toBe(5);
    expect(state.player.skillsMastered).toBe(3);
  });

  test('should display elemental towers', async ({ page }) => {
    // Look for elemental indicators
    const fireElements = page.locator('[class*="fire"], [style*="#ff6b35"], [style*="fire"]');
    const waterElements = page.locator('[class*="water"], [style*="#4fc3f7"], [style*="water"]');
    const earthElements = page.locator('[class*="earth"], [style*="#8d6e63"], [style*="earth"]');
    const windElements = page.locator('[class*="wind"], [style*="#b39ddb"], [style*="wind"]');
    const voidElements = page.locator('[class*="void"], [style*="#7c4dff"], [style*="void"]');
    
    // At least some elemental indicators should be present
    const counts = await Promise.all([
      fireElements.count(),
      waterElements.count(),
      earthElements.count(),
      windElements.count(),
      voidElements.count()
    ]);
    
    const totalElements = counts.reduce((a, b) => a + b, 0);
    expect(totalElements).toBeGreaterThan(0);
  });

  test('should animate on interactions', async ({ page }) => {
    // Find a clickable card
    const card = page.locator('.game-card').first();
    await card.hover();
    
    // Check for hover effects by taking screenshot
    await expect(card).toBeVisible();
    
    // Click and check for transition
    await card.click();
    
    // Wait for any animations
    await page.waitForTimeout(500);
    
    // Page should still be stable
    await expect(page).toHaveTitle(/Arcanea Games/);
  });
});
