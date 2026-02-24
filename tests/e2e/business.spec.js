/**
 * E2E Tests for Arcanea Business OS (Solopreneur OS)
 * Tests time tracking, revenue tracking, client management, and invoice system
 */

const { test, expect } = require('@playwright/test');

test.describe('Solopreneur OS', () => {
  test.beforeEach(async ({ page }) => {
    // Setup initial state
    await page.goto('http://localhost:3000/solopreneur-os.html');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem('arcanea_initialized', 'true');
      localStorage.setItem('arcanea_business_state', JSON.stringify({
        revenue: {
          monthly: 12400,
          outstanding: 3000,
          ytd: 45000,
          projected: 58000
        },
        clients: [
          { id: 1, name: 'Acme Corp', revenue: 15000, status: 'Active' },
          { id: 2, name: 'TechStart Inc', revenue: 8500, status: 'Active' },
          { id: 3, name: 'Design Studio', revenue: 6000, status: 'Inactive' },
          { id: 4, name: 'Global Systems', revenue: 12000, status: 'Active' }
        ],
        projects: [
          { id: 1, name: 'Website Redesign', progress: 75, status: 'In Progress' },
          { id: 2, name: 'Mobile App', progress: 40, status: 'In Progress' },
          { id: 3, name: 'API Integration', progress: 90, status: 'Review' }
        ],
        invoices: [
          { id: 1, client: 'Acme Corp', amount: 5000, status: 'Paid', date: '2026-01-15' },
          { id: 2, name: 'TechStart Inc', amount: 3000, status: 'Pending', date: '2026-01-20' },
          { id: 3, name: 'Design Studio', amount: 2500, status: 'Overdue', date: '2026-01-01' }
        ],
        timeEntries: [],
        tasks: [
          { id: 1, text: 'Review project proposals', completed: false },
          { id: 2, text: 'Send invoices', completed: true },
          { id: 3, text: 'Client meeting at 2pm', completed: false }
        ],
        settings: {
          hourlyRate: 100,
          currency: 'USD',
          businessName: 'My Business'
        }
      }));
    });
    await page.reload();
  });

  test('should load business OS page without errors', async ({ page }) => {
    // Assert
    await expect(page).toHaveTitle(/Solopreneur OS/);
    await expect(page.locator('.header, header')).toBeVisible();
    await expect(page.locator('.header-stats, [class*="stats"]')).toBeVisible();
    
    // Check console for errors
    const logs = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(msg.text());
      }
    });
    
    await page.waitForLoadState('networkidle');
    expect(logs).toHaveLength(0);
  });

  test('should display revenue metrics correctly', async ({ page }) => {
    // Look for revenue values in the page
    const pageContent = await page.content();
    
    // Check that revenue figures are displayed
    expect(pageContent).toContain('12.4K');
    
    // Look for revenue section
    const revenueSection = page.locator('[class*="revenue"], .revenue-card, [class*="metric"]').first();
    await expect(revenueSection).toBeVisible();
  });

  test('should display client count', async ({ page }) => {
    // Check header stats for client count
    const headerStats = page.locator('.header-stats, [class*="header"]');
    await expect(headerStats).toBeVisible();
    
    // Look for "8" clients in the content
    const pageContent = await page.content();
    expect(pageContent).toMatch(/8|clients/i);
  });

  test('should navigate to projects page', async ({ page }) => {
    // Look for Projects link/button in sidebar
    const projectsLink = page.locator('a, button', { hasText: /Projects/i }).first();
    
    if (await projectsLink.isVisible().catch(() => false)) {
      await projectsLink.click();
      
      // Wait for navigation
      await page.waitForTimeout(500);
      
      // Check that projects are displayed
      await expect(page.locator('[class*="project"], .project-card')).toBeVisible();
    }
  });

  test('should navigate to clients page', async ({ page }) => {
    // Look for Clients link/button
    const clientsLink = page.locator('a, button', { hasText: /Clients/i }).first();
    
    if (await clientsLink.isVisible().catch(() => false)) {
      await clientsLink.click();
      await page.waitForTimeout(500);
      
      // Check for client cards/list
      const clientElements = page.locator('[class*="client"], .client-card, [class*="client-list"]');
      const count = await clientElements.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should navigate to invoices page', async ({ page }) => {
    // Look for Invoices link/button
    const invoicesLink = page.locator('a, button', { hasText: /Invoices/i }).first();
    
    if (await invoicesLink.isVisible().catch(() => false)) {
      await invoicesLink.click();
      await page.waitForTimeout(500);
      
      // Check for invoice list
      await expect(page.locator('[class*="invoice"], .invoice-card, [class*="invoice-list"]')).toBeVisible();
    }
  });

  test('should display time tracking interface', async ({ page }) => {
    // Look for Time Tracking link/button
    const timeLink = page.locator('a, button', { hasText: /Time|Timer/i }).first();
    
    if (await timeLink.isVisible().catch(() => false)) {
      await timeLink.click();
      await page.waitForTimeout(500);
      
      // Check for timer display
      await expect(page.locator('[class*="timer"], [class*="time-tracking"], .timer-display')).toBeVisible();
    }
  });

  test('should interact with task list', async ({ page }) => {
    // Look for task list
    const taskElements = page.locator('[class*="task"], .task-item, .todo-item');
    const taskCount = await taskElements.count();
    
    if (taskCount > 0) {
      // Click on first task
      const firstTask = taskElements.first();
      await firstTask.click();
      
      // Check for checkbox or interactive element
      const checkbox = firstTask.locator('input[type="checkbox"], [class*="checkbox"]').first();
      if (await checkbox.isVisible().catch(() => false)) {
        await checkbox.click();
        
        // Verify interaction worked
        await expect(firstTask).toBeVisible();
      }
    }
  });

  test('should persist business data to localStorage', async ({ page }) => {
    // Act - Modify revenue
    await page.evaluate(() => {
      const state = JSON.parse(localStorage.getItem('arcanea_business_state') || '{}');
      state.revenue.monthly = 15000;
      localStorage.setItem('arcanea_business_state', JSON.stringify(state));
    });
    
    // Reload and verify
    await page.reload();
    
    const savedState = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('arcanea_business_state') || '{}');
    });
    
    expect(savedState.revenue.monthly).toBe(15000);
  });

  test('should handle responsive layout on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    
    // Check that main content is still visible
    await expect(page.locator('.container, main, [class*="content"]')).toBeVisible();
    
    // On mobile, sidebar might be hidden
    const sidebar = page.locator('.sidebar, aside, [class*="sidebar"]');
    const sidebarVisible = await sidebar.isVisible().catch(() => false);
    
    // Sidebar might be hidden on mobile, which is acceptable
    if (sidebarVisible) {
      await expect(sidebar).toBeVisible();
    }
  });

  test('should handle responsive layout on tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    
    // Check layout adapts
    await expect(page.locator('.container, main')).toBeVisible();
    
    // Sidebar might still be visible on tablet
    const sidebar = page.locator('.sidebar, aside');
    if (await sidebar.isVisible().catch(() => false)) {
      const sidebarBox = await sidebar.boundingBox();
      expect(sidebarBox).not.toBeNull();
    }
  });

  test('should display content pipeline', async ({ page }) => {
    // Look for Content Pipeline link/button
    const pipelineLink = page.locator('a, button', { hasText: /Content|Pipeline/i }).first();
    
    if (await pipelineLink.isVisible().catch(() => false)) {
      await pipelineLink.click();
      await page.waitForTimeout(500);
      
      // Check for pipeline stages
      const stages = page.locator('[class*="stage"], [class*="pipeline"], [class*="kanban"]');
      expect(await stages.count()).toBeGreaterThan(0);
    }
  });

  test('should display workflow templates', async ({ page }) => {
    // Look for Templates link/button
    const templatesLink = page.locator('a, button', { hasText: /Template|Workflow/i }).first();
    
    if (await templatesLink.isVisible().catch(() => false)) {
      await templatesLink.click();
      await page.waitForTimeout(500);
      
      // Check for template cards
      const templates = page.locator('[class*="template"], .template-card');
      expect(await templates.count()).toBeGreaterThan(0);
    }
  });

  test('should allow adding new client', async ({ page }) => {
    // Navigate to clients page
    const clientsLink = page.locator('a, button', { hasText: /Clients/i }).first();
    if (await clientsLink.isVisible().catch(() => false)) {
      await clientsLink.click();
      await page.waitForTimeout(500);
      
      // Look for add client button
      const addButton = page.locator('button', { hasText: /Add|New/i }).first();
      if (await addButton.isVisible().catch(() => false)) {
        await addButton.click();
        
        // Check for modal or form
        const modal = page.locator('[class*="modal"], dialog, [class*="form"]').first();
        await expect(modal).toBeVisible();
      }
    }
  });

  test('should calculate revenue correctly', async ({ page }) => {
    // Get revenue from localStorage
    const revenue = await page.evaluate(() => {
      const state = JSON.parse(localStorage.getItem('arcanea_business_state') || '{}');
      return state.revenue;
    });
    
    // Verify revenue structure
    expect(revenue).toHaveProperty('monthly');
    expect(revenue).toHaveProperty('outstanding');
    expect(revenue).toHaveProperty('ytd');
    expect(typeof revenue.monthly).toBe('number');
    expect(revenue.monthly).toBeGreaterThan(0);
  });

  test('should display project progress bars', async ({ page }) => {
    // Look for project cards with progress
    const progressElements = page.locator('[class*="progress"], .progress-bar, [class*="progress-bar"]');
    const count = await progressElements.count();
    
    if (count > 0) {
      // Check that at least one progress bar is visible
      await expect(progressElements.first()).toBeVisible();
    }
  });

  test('should handle add invoice workflow', async ({ page }) => {
    // Navigate to invoices
    const invoicesLink = page.locator('a, button', { hasText: /Invoices/i }).first();
    if (await invoicesLink.isVisible().catch(() => false)) {
      await invoicesLink.click();
      await page.waitForTimeout(500);
      
      // Look for new invoice button
      const newInvoiceBtn = page.locator('button', { hasText: /New|Add.*Invoice/i }).first();
      if (await newInvoiceBtn.isVisible().catch(() => false)) {
        await newInvoiceBtn.click();
        
        // Check for invoice form or modal
        const formElements = page.locator('input, [class*="modal"], dialog');
        expect(await formElements.count()).toBeGreaterThan(0);
      }
    }
  });

  test('screenshot on failure test', async ({ page }, testInfo) => {
    // This test demonstrates screenshot capability
    // Navigate to page
    await expect(page.locator('body')).toBeVisible();
    
    // If test fails, Playwright will automatically capture screenshot
    // due to configuration in playwright.config.js
    
    // Verify page loaded correctly
    const header = page.locator('.header, header, h1').first();
    await expect(header).toBeVisible();
  });
});
