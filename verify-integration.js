/**
 * Arcanea Integration Verification Script
 * Tests all components to ensure proper setup
 * Version: 3.0.0
 */

const fs = require('fs');
const path = require('path');

const Verifier = {
    results: [],
    errors: [],

    async run() {
        console.log('🔍 Arcanea Ecosystem Verification\n');
        console.log('=' .repeat(60));

        // Check file existence
        await this.checkFiles();

        // Check package.json
        await this.checkPackageJson();

        // Check environment template
        await this.checkEnvTemplate();

        // Check SQL file
        await this.checkSQLFile();

        // Check integration script
        await this.checkIntegrationScript();

        // Print summary
        this.printSummary();

        return this.errors.length === 0;
    },

    async checkFiles() {
        console.log('\n📁 Checking Required Files...\n');

        const requiredFiles = [
            'package.json',
            '.env.example',
            'supabase-config.js',
            'arcanea-auth.js',
            'auth-ui.js',
            'sync-engine.js',
            'arcanea-mcp-live.js',
            'arcanea-agents-live.js',
            'mobile-integration.js',
            'setup-supabase.sql',
            'integrate-all.html',
            'INTEGRATION.md'
        ];

        let missingCount = 0;

        for (const file of requiredFiles) {
            const exists = fs.existsSync(path.join(process.cwd(), file));
            const status = exists ? '✅' : '❌';
            console.log(`  ${status} ${file}`);
            
            if (!exists) {
                missingCount++;
                this.errors.push(`Missing file: ${file}`);
            } else {
                // Check file size
                const stats = fs.statSync(file);
                const size = (stats.size / 1024).toFixed(1);
                console.log(`     └─ ${size} KB`);
            }
        }

        if (missingCount === 0) {
            console.log('\n✅ All required files present');
        } else {
            console.log(`\n❌ ${missingCount} file(s) missing`);
        }

        this.results.push({ check: 'Files', passed: missingCount === 0 });
    },

    async checkPackageJson() {
        console.log('\n📦 Checking package.json...\n');

        try {
            const content = fs.readFileSync('package.json', 'utf8');
            const pkg = JSON.parse(content);

            const requiredDeps = [
                '@supabase/supabase-js',
                'axios',
                'openai'
            ];

            let allPresent = true;

            for (const dep of requiredDeps) {
                const hasDep = pkg.dependencies && pkg.dependencies[dep];
                const status = hasDep ? '✅' : '❌';
                console.log(`  ${status} ${dep}`);
                
                if (!hasDep) {
                    allPresent = false;
                    this.errors.push(`Missing dependency: ${dep}`);
                }
            }

            if (allPresent) {
                console.log('\n✅ All dependencies present');
            } else {
                console.log('\n❌ Some dependencies missing');
                console.log('   Run: npm install @supabase/supabase-js axios openai');
            }

            this.results.push({ check: 'Dependencies', passed: allPresent });

        } catch (error) {
            console.log('❌ Error reading package.json:', error.message);
            this.errors.push('package.json read error');
            this.results.push({ check: 'Dependencies', passed: false });
        }
    },

    async checkEnvTemplate() {
        console.log('\n🔐 Checking .env.example...\n');

        try {
            const content = fs.readFileSync('.env.example', 'utf8');
            
            const requiredVars = [
                'SUPABASE_URL',
                'SUPABASE_ANON_KEY',
                'SUPABASE_SERVICE_KEY',
                'OPENAI_API_KEY',
                'MCP_SERVER_URL'
            ];

            let allPresent = true;

            for (const variable of requiredVars) {
                const hasVar = content.includes(variable);
                const status = hasVar ? '✅' : '❌';
                console.log(`  ${status} ${variable}`);
                
                if (!hasVar) {
                    allPresent = false;
                }
            }

            if (allPresent) {
                console.log('\n✅ Environment template complete');
            } else {
                console.log('\n⚠️  Some variables missing in template');
            }

            this.results.push({ check: 'Environment', passed: true });

        } catch (error) {
            console.log('❌ Error reading .env.example:', error.message);
            this.errors.push('.env.example read error');
            this.results.push({ check: 'Environment', passed: false });
        }
    },

    async checkSQLFile() {
        console.log('\n🗄️  Checking setup-supabase.sql...\n');

        try {
            const content = fs.readFileSync('setup-supabase.sql', 'utf8');
            
            const requiredTables = [
                'profiles',
                'game_state',
                'business_state',
                'gamedev_state',
                'agents',
                'skills',
                'challenges',
                'manifestations',
                'sync_queue',
                'activities'
            ];

            const requiredFeatures = [
                'CREATE TABLE',
                'ENABLE ROW LEVEL SECURITY',
                'CREATE POLICY',
                'CREATE INDEX',
                'CREATE TRIGGER',
                'CREATE FUNCTION'
            ];

            console.log('  Tables:');
            for (const table of requiredTables) {
                const hasTable = content.includes(`CREATE TABLE IF NOT EXISTS ${table}`) ||
                                content.includes(`CREATE TABLE ${table}`);
                const status = hasTable ? '✅' : '❌';
                console.log(`    ${status} ${table}`);
            }

            console.log('\n  Features:');
            for (const feature of requiredFeatures) {
                const hasFeature = content.includes(feature);
                const status = hasFeature ? '✅' : '❌';
                console.log(`    ${status} ${feature}`);
            }

            const hasRLS = content.includes('ENABLE ROW LEVEL SECURITY');
            const hasPolicies = content.includes('CREATE POLICY');
            
            if (hasRLS && hasPolicies) {
                console.log('\n✅ SQL file complete with RLS policies');
            } else {
                console.log('\n⚠️  SQL file may be incomplete');
            }

            this.results.push({ check: 'Database Schema', passed: hasRLS && hasPolicies });

        } catch (error) {
            console.log('❌ Error reading SQL file:', error.message);
            this.errors.push('SQL file read error');
            this.results.push({ check: 'Database Schema', passed: false });
        }
    },

    async checkIntegrationScript() {
        console.log('\n🔗 Checking integrate-all.html...\n');

        try {
            const content = fs.readFileSync('integrate-all.html', 'utf8');
            
            const requiredScripts = [
                'supabase.min.js',
                'ARCANEA_CONFIG',
                'supabase-config.js',
                'arcanea-auth.js',
                'auth-ui.js',
                'sync-engine.js',
                'arcanea-mcp-live.js',
                'arcanea-agents-live.js',
                'mobile-integration.js'
            ];

            let allPresent = true;

            for (const script of requiredScripts) {
                const hasScript = content.includes(script);
                const status = hasScript ? '✅' : '❌';
                console.log(`  ${status} ${script}`);
                
                if (!hasScript) {
                    allPresent = false;
                }
            }

            if (allPresent) {
                console.log('\n✅ Integration script complete');
            } else {
                console.log('\n⚠️  Integration script may be incomplete');
            }

            this.results.push({ check: 'Integration', passed: allPresent });

        } catch (error) {
            console.log('❌ Error reading integration file:', error.message);
            this.errors.push('Integration file read error');
            this.results.push({ check: 'Integration', passed: false });
        }
    },

    printSummary() {
        console.log('\n' + '='.repeat(60));
        console.log('\n📊 Verification Summary\n');

        let passed = 0;
        let failed = 0;

        for (const result of this.results) {
            const status = result.passed ? '✅ PASS' : '❌ FAIL';
            console.log(`  ${status}: ${result.check}`);
            
            if (result.passed) passed++;
            else failed++;
        }

        console.log('\n' + '='.repeat(60));
        console.log(`\n  Total: ${this.results.length} checks`);
        console.log(`  Passed: ${passed} ✅`);
        console.log(`  Failed: ${failed} ${failed > 0 ? '❌' : ''}`);

        if (this.errors.length > 0) {
            console.log('\n  Errors:');
            for (const error of this.errors) {
                console.log(`    ❌ ${error}`);
            }
        }

        console.log('\n' + '='.repeat(60));

        if (failed === 0) {
            console.log('\n🎉 All checks passed! Ecosystem is ready for integration.');
            console.log('\nNext steps:');
            console.log('  1. Run: npm install');
            console.log('  2. Copy .env.example to .env and add your credentials');
            console.log('  3. Run SQL in Supabase (see INTEGRATION.md)');
            console.log('  4. Add integration script to your HTML files');
            console.log('  5. Test locally with: npm run dev');
        } else {
            console.log('\n⚠️  Some checks failed. Please review errors above.');
        }

        console.log('');
    }
};

// Run verification
Verifier.run().then(success => {
    process.exit(success ? 0 : 1);
}).catch(error => {
    console.error('Verification failed:', error);
    process.exit(1);
});
