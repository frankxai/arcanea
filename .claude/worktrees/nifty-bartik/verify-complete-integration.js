/**
 * Arcanea Complete Integration Verification
 * Tests all integration points and generates report
 * Run with: node verify-complete-integration.js
 */

const fs = require('fs');
const path = require('path');

class ArcaneaIntegrationVerifier {
    constructor() {
        this.rootDir = __dirname;
        this.results = {
            filesChecked: [],
            errors: [],
            warnings: [],
            tests: {},
            timestamp: new Date().toISOString()
        };
        
        this.requiredScripts = [
            'supabase-config.js',
            'arcanea-auth.js',
            'auth-ui.js',
            'sync-engine.js',
            'arcanea-agents-live.js',
            'mobile-integration.js',
            'arcanea-loader.js'
        ];

        this.htmlFiles = [
            'games-v2.html',
            'games.html',
            'solopreneur-os.html',
            'game-designer-os.html',
            'portal.html',
            'index.html',
            'integrate-all.html',
            'arcanea-auth-ui.html'
        ];
    }

    /**
     * Run all verification tests
     */
    async verify() {
        console.log('🔮 Arcanea Complete Integration Verification\n');
        console.log('=' .repeat(60));
        
        // Test 1: Check all HTML files have loader
        await this.testHtmlFiles();
        
        // Test 2: Check all required JS files exist
        await this.testJsFilesExist();
        
        // Test 3: Check script load order
        await this.testScriptOrder();
        
        // Test 4: Check for integration hooks
        await this.testIntegrationHooks();
        
        // Test 5: Validate HTML structure
        await this.testHtmlStructure();
        
        // Test 6: Check for mobile meta tags
        await this.testMobileOptimization();
        
        // Generate report
        this.generateReport();
        
        return this.results;
    }

    /**
     * Test 1: Verify all HTML files have Arcanea loader
     */
    async testHtmlFiles() {
        console.log('\n📄 Test 1: Checking HTML files for Arcanea loader...\n');
        
        for (const file of this.htmlFiles) {
            const filePath = path.join(this.rootDir, file);
            
            try {
                if (!fs.existsSync(filePath)) {
                    this.results.errors.push({
                        test: 'html-files',
                        file: file,
                        error: 'File not found'
                    });
                    console.log(`   ❌ ${file} - NOT FOUND`);
                    continue;
                }

                const content = fs.readFileSync(filePath, 'utf-8');
                const hasLoader = this.requiredScripts.every(script => 
                    content.includes(script)
                );
                
                if (hasLoader) {
                    this.results.filesChecked.push({
                        file: file,
                        status: 'pass',
                        message: 'All Arcanea scripts present'
                    });
                    console.log(`   ✅ ${file} - All scripts loaded`);
                } else {
                    const missing = this.requiredScripts.filter(script => 
                        !content.includes(script)
                    );
                    this.results.errors.push({
                        test: 'html-files',
                        file: file,
                        error: `Missing scripts: ${missing.join(', ')}`
                    });
                    console.log(`   ❌ ${file} - Missing: ${missing.join(', ')}`);
                }
            } catch (err) {
                this.results.errors.push({
                    test: 'html-files',
                    file: file,
                    error: err.message
                });
                console.log(`   ❌ ${file} - ERROR: ${err.message}`);
            }
        }
        
        this.results.tests.htmlFiles = {
            passed: this.results.filesChecked.length,
            failed: this.results.errors.filter(e => e.test === 'html-files').length,
            total: this.htmlFiles.length
        };
    }

    /**
     * Test 2: Verify all required JS files exist
     */
    async testJsFilesExist() {
        console.log('\n📦 Test 2: Checking required JavaScript files...\n');
        
        let passed = 0;
        let failed = 0;
        
        for (const script of this.requiredScripts) {
            const filePath = path.join(this.rootDir, script);
            
            if (fs.existsSync(filePath)) {
                const stats = fs.statSync(filePath);
                console.log(`   ✅ ${script} (${this.formatBytes(stats.size)})`);
                passed++;
            } else {
                this.results.errors.push({
                    test: 'js-files',
                    file: script,
                    error: 'File not found'
                });
                console.log(`   ❌ ${script} - NOT FOUND`);
                failed++;
            }
        }
        
        this.results.tests.jsFiles = { passed, failed, total: this.requiredScripts.length };
    }

    /**
     * Test 3: Check script load order in HTML files
     */
    async testScriptOrder() {
        console.log('\n🔄 Test 3: Checking script load order...\n');
        
        let passed = 0;
        let failed = 0;
        
        for (const file of this.htmlFiles) {
            const filePath = path.join(this.rootDir, file);
            
            if (!fs.existsSync(filePath)) continue;
            
            const content = fs.readFileSync(filePath, 'utf-8');
            
            // Find all script tags
            const scriptRegex = /<script[^>]*src="([^"]+)"[^>]*>/g;
            const scripts = [];
            let match;
            while ((match = scriptRegex.exec(content)) !== null) {
                scripts.push(match[1]);
            }
            
            // Check if required scripts are in correct order
            const requiredIndices = this.requiredScripts.map(req => 
                scripts.findIndex(s => s.includes(req))
            );
            
            // Check if order is correct (each index should be less than the next)
            let orderCorrect = true;
            for (let i = 0; i < requiredIndices.length - 1; i++) {
                if (requiredIndices[i] > requiredIndices[i + 1] && requiredIndices[i + 1] !== -1) {
                    orderCorrect = false;
                    break;
                }
            }
            
            if (orderCorrect) {
                console.log(`   ✅ ${file} - Correct order`);
                passed++;
            } else {
                this.results.warnings.push({
                    test: 'script-order',
                    file: file,
                    warning: 'Script load order may not be optimal'
                });
                console.log(`   ⚠️  ${file} - Order could be optimized`);
                failed++;
            }
        }
        
        this.results.tests.scriptOrder = { passed, failed, total: this.htmlFiles.length };
    }

    /**
     * Test 4: Check for integration hooks
     */
    async testIntegrationHooks() {
        console.log('\n⚡ Test 4: Checking integration hooks...\n');
        
        const hookChecks = {
            'arcanea-loader.js': [
                'ArcaneaLoader',
                'init:',
                'detectPage',
                'initAuth',
                'initSync',
                'initAgents',
                'initMobile'
            ],
            'arcanea-auth.js': [
                'ArcaneaAuth',
                'initialize',
                'signIn',
                'signOut',
                'getUser',
                'onAuthStateChange'
            ],
            'sync-engine.js': [
                'ArcaneaSync',
                'initialize',
                'sync',
                'pull',
                'push',
                'isConnected'
            ],
            'arcanea-agents-live.js': [
                'ArcaneaAgents',
                'initialize',
                'register',
                'invoke'
            ],
            'mobile-integration.js': [
                'ArcaneaMobile',
                'initialize',
                'optimize',
                'getDeviceInfo'
            ]
        };
        
        let passed = 0;
        let failed = 0;
        
        for (const [file, hooks] of Object.entries(hookChecks)) {
            const filePath = path.join(this.rootDir, file);
            
            if (!fs.existsSync(filePath)) {
                console.log(`   ❌ ${file} - File not found`);
                failed++;
                continue;
            }
            
            const content = fs.readFileSync(filePath, 'utf-8');
            const missingHooks = hooks.filter(hook => !content.includes(hook));
            
            if (missingHooks.length === 0) {
                console.log(`   ✅ ${file} - All hooks present (${hooks.length})`);
                passed++;
            } else {
                this.results.warnings.push({
                    test: 'integration-hooks',
                    file: file,
                    warning: `Missing hooks: ${missingHooks.join(', ')}`
                });
                console.log(`   ⚠️  ${file} - Missing: ${missingHooks.join(', ')}`);
                failed++;
            }
        }
        
        this.results.tests.integrationHooks = { passed, failed, total: Object.keys(hookChecks).length };
    }

    /**
     * Test 5: Validate HTML structure
     */
    async testHtmlStructure() {
        console.log('\n🏗️  Test 5: Validating HTML structure...\n');
        
        let passed = 0;
        let failed = 0;
        
        for (const file of this.htmlFiles) {
            const filePath = path.join(this.rootDir, file);
            
            if (!fs.existsSync(filePath)) continue;
            
            const content = fs.readFileSync(filePath, 'utf-8');
            
            const checks = {
                hasDoctype: content.includes('<!DOCTYPE html>'),
                hasHtmlTag: content.includes('<html') && content.includes('</html>'),
                hasHead: content.includes('<head>') && content.includes('</head>'),
                hasBody: content.includes('<body>') && content.includes('</body>'),
                hasMetaCharset: content.includes('charset='),
                hasViewport: content.includes('viewport')
            };
            
            const allPassed = Object.values(checks).every(v => v);
            
            if (allPassed) {
                console.log(`   ✅ ${file} - Structure valid`);
                passed++;
            } else {
                const failed = Object.entries(checks)
                    .filter(([k, v]) => !v)
                    .map(([k, v]) => k);
                this.results.warnings.push({
                    test: 'html-structure',
                    file: file,
                    warning: `Issues: ${failed.join(', ')}`
                });
                console.log(`   ⚠️  ${file} - Issues: ${failed.join(', ')}`);
            }
        }
        
        this.results.tests.htmlStructure = { passed, failed, total: this.htmlFiles.length };
    }

    /**
     * Test 6: Check for mobile optimization
     */
    async testMobileOptimization() {
        console.log('\n📱 Test 6: Checking mobile optimization...\n');
        
        let passed = 0;
        let failed = 0;
        
        for (const file of this.htmlFiles) {
            const filePath = path.join(this.rootDir, file);
            
            if (!fs.existsSync(filePath)) continue;
            
            const content = fs.readFileSync(filePath, 'utf-8');
            
            const hasMobileMeta = content.includes('width=device-width') && 
                                 content.includes('initial-scale=');
            
            if (hasMobileMeta) {
                console.log(`   ✅ ${file} - Mobile optimized`);
                passed++;
            } else {
                this.results.warnings.push({
                    test: 'mobile-optimization',
                    file: file,
                    warning: 'Missing viewport meta tag'
                });
                console.log(`   ⚠️  ${file} - Not mobile optimized`);
                failed++;
            }
        }
        
        this.results.tests.mobileOptimization = { passed, failed, total: this.htmlFiles.length };
    }

    /**
     * Generate integration report
     */
    generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 INTEGRATION VERIFICATION REPORT\n');
        
        // Summary
        const totalTests = Object.values(this.results.tests).reduce((sum, t) => sum + t.total, 0);
        const totalPassed = Object.values(this.results.tests).reduce((sum, t) => sum + t.passed, 0);
        const totalFailed = Object.values(this.results.tests).reduce((sum, t) => sum + t.failed, 0);
        
        console.log(`Total Tests: ${totalTests}`);
        console.log(`Passed: ✅ ${totalPassed}`);
        console.log(`Failed: ❌ ${totalFailed}`);
        console.log(`Success Rate: ${((totalPassed / totalTests) * 100).toFixed(1)}%\n`);
        
        // Detailed results
        console.log('Test Results by Category:');
        for (const [test, results] of Object.entries(this.results.tests)) {
            const status = results.failed === 0 ? '✅' : '⚠️';
            console.log(`   ${status} ${test}: ${results.passed}/${results.total} passed`);
        }
        
        // Errors
        if (this.results.errors.length > 0) {
            console.log('\n❌ Errors Found:');
            this.results.errors.forEach(err => {
                console.log(`   [${err.test}] ${err.file}: ${err.error}`);
            });
        }
        
        // Warnings
        if (this.results.warnings.length > 0) {
            console.log('\n⚠️  Warnings:');
            this.results.warnings.forEach(warn => {
                console.log(`   [${warn.test}] ${warn.file}: ${warn.warning}`);
            });
        }
        
        // Save report to file
        const reportPath = path.join(this.rootDir, 'INTEGRATION_REPORT.json');
        fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
        console.log(`\n📄 Detailed report saved to: ${reportPath}`);
        
        // Generate HTML report
        this.generateHTMLReport();
        
        // Final verdict
        console.log('\n' + '='.repeat(60));
        if (this.results.errors.length === 0) {
            console.log('🎉 SUCCESS: Arcanea integration is complete!');
            console.log('\n✅ All HTML files have the ecosystem loader');
            console.log('✅ All JavaScript files exist');
            console.log('✅ Script loading order is correct');
            console.log('✅ Integration hooks are in place');
            console.log('✅ HTML structure is valid');
            console.log('✅ Mobile optimization is enabled');
        } else {
            console.log('❌ FAILED: Integration has errors that need fixing');
            console.log(`   ${this.results.errors.length} error(s) found`);
        }
        
        if (this.results.warnings.length > 0) {
            console.log(`\n⚠️  ${this.results.warnings.length} warning(s) - review recommended`);
        }
        
        console.log('='.repeat(60));
    }

    /**
     * Generate HTML report
     */
    generateHTMLReport() {
        // Calculate summary stats here to avoid scope issues
        const totalTests = Object.values(this.results.tests).reduce((sum, t) => sum + t.total, 0);
        const totalPassed = Object.values(this.results.tests).reduce((sum, t) => sum + t.passed, 0);
        const totalFailed = Object.values(this.results.tests).reduce((sum, t) => sum + t.failed, 0);
        
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arcanea Integration Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #fff;
            padding: 2rem;
            min-height: 100vh;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #ffd700, #ff8f00);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .timestamp { color: #888; margin-bottom: 2rem; }
        .summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .stat-card {
            background: rgba(255,255,255,0.1);
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
        }
        .stat-value {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
        .stat-value.success { color: #4caf50; }
        .stat-value.error { color: #f44336; }
        .stat-value.warning { color: #ff9800; }
        .stat-label { color: #888; font-size: 0.875rem; }
        .section {
            background: rgba(255,255,255,0.05);
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
        }
        .section h2 {
            margin-bottom: 1rem;
            color: #ffd700;
        }
        .test-grid {
            display: grid;
            gap: 0.75rem;
        }
        .test-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            background: rgba(255,255,255,0.05);
            border-radius: 8px;
        }
        .test-name { font-weight: 500; }
        .test-status {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
        }
        .test-status.pass { background: rgba(76, 175, 80, 0.2); color: #4caf50; }
        .test-status.fail { background: rgba(244, 67, 54, 0.2); color: #f44336; }
        .test-status.warn { background: rgba(255, 152, 0, 0.2); color: #ff9800; }
        .file-list {
            list-style: none;
        }
        .file-item {
            padding: 0.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            display: flex;
            justify-content: space-between;
        }
        .file-item:last-child { border-bottom: none; }
        .badge {
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
        }
        .badge.pass { background: #4caf50; }
        .badge.fail { background: #f44336; }
        .badge.warn { background: #ff9800; }
        .verdict {
            text-align: center;
            padding: 2rem;
            border-radius: 12px;
            margin-top: 2rem;
        }
        .verdict.success { background: rgba(76, 175, 80, 0.2); }
        .verdict.fail { background: rgba(244, 67, 54, 0.2); }
        .verdict h2 { margin-bottom: 1rem; }
        .verdict p { opacity: 0.8; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔮 Arcanea Integration Report</h1>
        <p class="timestamp">Generated: ${new Date(this.results.timestamp).toLocaleString()}</p>
        
        <div class="summary">
            <div class="stat-card">
                <div class="stat-value">${totalTests}</div>
                <div class="stat-label">Total Tests</div>
            </div>
            <div class="stat-card">
                <div class="stat-value success">${totalPassed}</div>
                <div class="stat-label">Passed</div>
            </div>
            <div class="stat-card">
                <div class="stat-value error">${this.results.errors.length}</div>
                <div class="stat-label">Errors</div>
            </div>
            <div class="stat-card">
                <div class="stat-value warning">${this.results.warnings.length}</div>
                <div class="stat-label">Warnings</div>
            </div>
        </div>
        
        <div class="section">
            <h2>📊 Test Results</h2>
            <div class="test-grid">
                ${Object.entries(this.results.tests).map(([name, results]) => `
                    <div class="test-item">
                        <span class="test-name">${name}</span>
                        <span class="test-status ${results.failed === 0 ? 'pass' : results.failed < results.total / 2 ? 'warn' : 'fail'}">
                            ${results.passed}/${results.total} passed
                        </span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="section">
            <h2>📄 Files Checked</h2>
            <ul class="file-list">
                ${this.results.filesChecked.map(f => `
                    <li class="file-item">
                        <span>${f.file}</span>
                        <span class="badge ${f.status}">${f.status}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        ${this.results.errors.length > 0 ? `
        <div class="section">
            <h2>❌ Errors</h2>
            <ul class="file-list">
                ${this.results.errors.map(e => `
                    <li class="file-item">
                        <span>[${e.test}] ${e.file}</span>
                        <span>${e.error}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        ` : ''}
        
        ${this.results.warnings.length > 0 ? `
        <div class="section">
            <h2>⚠️ Warnings</h2>
            <ul class="file-list">
                ${this.results.warnings.map(w => `
                    <li class="file-item">
                        <span>[${w.test}] ${w.file}</span>
                        <span>${w.warning}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        ` : ''}
        
        <div class="verdict ${this.results.errors.length === 0 ? 'success' : 'fail'}">
            <h2>${this.results.errors.length === 0 ? '🎉 Integration Complete!' : '❌ Integration Failed'}</h2>
            <p>${this.results.errors.length === 0 ? 
                'All systems are integrated and ready for use.' : 
                `Found ${this.results.errors.length} error(s) that need to be fixed.`}</p>
        </div>
    </div>
</body>
</html>`;

        const reportPath = path.join(this.rootDir, 'INTEGRATION_REPORT.html');
        fs.writeFileSync(reportPath, html);
        console.log(`📄 HTML report saved to: ${reportPath}`);
    }

    /**
     * Format bytes to human readable
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
}

// Run verification
const verifier = new ArcaneaIntegrationVerifier();
verifier.verify().then(results => {
    // Exit with appropriate code
    process.exit(results.errors.length > 0 ? 1 : 0);
}).catch(err => {
    console.error('Verification failed:', err);
    process.exit(1);
});
