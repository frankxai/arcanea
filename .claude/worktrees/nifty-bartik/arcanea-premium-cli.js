const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const boxen = require('boxen');
const gradient = require('gradient-string');

// Arcanea Premium CLI Interface
// Beautiful terminal UI with rich visuals

class ArcaneaPremiumCLI {
  constructor() {
    this.colors = {
      primary: '#F59E0B',
      secondary: '#8B5CF6',
      success: '#10B981',
      error: '#EF4444',
      info: '#3B82F6',
      guardian: {
        draconia: '#EF4444',
        leyla: '#3B82F6',
        lyssandria: '#10B981',
        alera: '#8B5CF6',
        elara: '#6B7280',
        ino: '#F59E0B'
      }
    };
  }

  // 🎨 Premium header display
  showHeader() {
    console.log('\n');
    console.log(
      gradient(['#F59E0B', '#F97316', '#EF4444'])(
        '    ╔════════════════════════════════════════════════════════╗\n' +
        '    ║                                                        ║\n' +
        '    ║           🔮 ARCANEA LIBRARY PREMIUM 🔮               ║\n' +
        '    ║                                                        ║\n' +
        '    ║     Multi-Dimensional File Intelligence System        ║\n' +
        '    ║           Built with opencode + FrankX               ║\n' +
        '    ║                                                        ║\n' +
        '    ╚════════════════════════════════════════════════════════╝'
      )
    );
    console.log('\n');
  }

  // 📊 Premium progress display
  async showProgress(message, callback) {
    const spinner = ora({
      text: chalk.hex(this.colors.primary)(message),
      spinner: 'dots',
      color: 'yellow'
    }).start();

    try {
      const result = await callback();
      spinner.succeed(chalk.hex(this.colors.success)(message));
      return result;
    } catch (error) {
      spinner.fail(chalk.hex(this.colors.error)(message));
      throw error;
    }
  }

  // 🎯 Display file card (premium)
  showFileCard(file, index) {
    const guardian = file.analysis?.guardianAffinity?.primary || 'general';
    const guardianColor = this.colors.guardian[guardian] || this.colors.primary;
    const category = file.analysis?.primaryCategory || 'general';
    const quality = file.analysis?.quality || 0;
    const relevance = file.analysis?.arcaneaRelevance || 0;

    // Quality bar
    const qualityBar = '█'.repeat(Math.floor(quality / 10)) + '░'.repeat(10 - Math.floor(quality / 10));
    
    // Guardian icon
    const guardianIcons = {
      draconia: '🐉',
      leyla: '💧',
      lyssandria: '🌍',
      alera: '🌪️',
      elara: '⚫',
      ino: '✨',
      general: '✨'
    };

    console.log(
      boxen(
        `${chalk.hex(guardianColor).bold(guardianIcons[guardian] || '✨')} ${chalk.white.bold(file.filename)}\n` +
        `${chalk.gray('├─')} Path: ${chalk.cyan(file.relativePath)}\n` +
        `${chalk.gray('├─')} Guardian: ${chalk.hex(guardianColor)(guardian)} (${file.analysis?.guardianAffinity?.confidence || 0}% confidence)\n` +
        `${chalk.gray('├─')} Category: ${chalk.yellow(category)}\n` +
        `${chalk.gray('├─')} Quality: ${chalk.green(qualityBar)} ${quality}%\n` +
        `${chalk.gray('├─')} Relevance: ${chalk.magenta(relevance)}%\n` +
        `${chalk.gray('└─')} Tags: ${chalk.blue(file.analysis?.tags?.slice(0, 5).join(', ') || 'none')}`,
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: guardianColor,
          dimBorder: quality < 50
        }
      )
    );
  }

  // 📈 Display statistics dashboard
  showStatsDashboard(stats, library) {
    console.log('\n');
    console.log(
      chalk.hex(this.colors.primary).bold('📊 LIBRARY ANALYTICS DASHBOARD\n')
    );

    // Main stats cards
    const statCards = [
      { label: 'Total Files', value: stats.total, color: '#F59E0B', icon: '📁' },
      { label: 'Total Size', value: this.formatSize(stats.totalSize), color: '#3B82F6', icon: '💾' },
      { label: 'Categories', value: stats.categoryCount, color: '#8B5CF6', icon: '📂' },
      { label: 'Guardians', value: stats.guardianCount, color: '#10B981', icon: '🛡️' },
      { label: 'Avg Quality', value: `${stats.avgQuality}%`, color: '#F97316', icon: '⭐' },
      { label: 'Arcanea Score', value: `${stats.avgArcaneaRelevance}%`, color: '#EC4899', icon: '🔮' }
    ];

    // Display stats in 3-column grid
    console.log('┌────────────────────────────────────────────────────────────────────────┐');
    statCards.forEach((stat, i) => {
      const isLast = i === statCards.length - 1;
      const line = isLast ? '└' : '├';
      console.log(
        `${line}─ ${chalk.hex(stat.color)(stat.icon)} ${chalk.white.bold(stat.label.padEnd(15))} ${chalk.hex(stat.color).bold(stat.value.toString().padStart(10))}${isLast ? '' : ' │'}${isLast ? '' : ''}`
      );
    });
    console.log('└────────────────────────────────────────────────────────────────────────┘\n');

    // Category distribution chart
    console.log(chalk.hex(this.colors.secondary).bold('📁 Category Distribution\n'));
    const categories = Object.entries(stats.categoryDistribution || {});
    const maxCount = Math.max(...categories.map(([, count]) => count));
    
    categories.forEach(([cat, count]) => {
      const percentage = (count / stats.total) * 100;
      const barLength = Math.floor((count / maxCount) * 30);
      const bar = '█'.repeat(barLength) + '░'.repeat(30 - barLength);
      console.log(
        `${chalk.white(cat.padEnd(15))} ${chalk.hex(this.colors.primary)(bar)} ${chalk.white(count.toString().padStart(4))} (${percentage.toFixed(1)}%)`
      );
    });

    console.log('\n');

    // Guardian distribution
    console.log(chalk.hex(this.colors.secondary).bold('🛡️ Guardian Affinity Distribution\n'));
    const guardians = Object.entries(stats.guardianDistribution || {});
    
    guardians.forEach(([guard, count]) => {
      const color = this.colors.guardian[guard] || this.colors.primary;
      const percentage = (count / stats.total) * 100;
      const barLength = Math.floor((count / (stats.total * 0.3)) * 30);
      const bar = '█'.repeat(Math.min(barLength, 30)) + '░'.repeat(Math.max(30 - barLength, 0));
      const icon = { draconia: '🐉', leyla: '💧', lyssandria: '🌍', alera: '🌪️', elara: '⚫', ino: '✨', general: '✨' }[guard] || '✨';
      
      console.log(
        `${icon} ${chalk.white(guard.padEnd(12))} ${chalk.hex(color)(bar)} ${chalk.white(count.toString().padStart(4))} (${percentage.toFixed(1)}%)`
      );
    });

    console.log('\n');
  }

  // 🔍 Display search results (premium)
  showSearchResults(results, query) {
    console.log('\n');
    console.log(
      gradient(['#8B5CF6', '#EC4899'])(
        `🔍 Search Results for: "${query}"\n`
      )
    );
    
    if (results.length === 0) {
      console.log(
        boxen(
          chalk.gray('No results found. Try adjusting your search query.'),
          {
            padding: 1,
            borderStyle: 'round',
            borderColor: '#EF4444'
          }
        )
      );
      return;
    }

    console.log(chalk.hex(this.colors.info)(`Found ${results.length} results:\n`));

    // Show top 10 results with premium formatting
    results.slice(0, 10).forEach((result, index) => {
      const file = result.file;
      const relevance = Math.round(result.relevance * 100);
      
      console.log(
        `${chalk.hex(this.colors.primary)(`${index + 1}.`)} ${chalk.white.bold(file.filename)} ${chalk.gray(`(${relevance}% match)`)}`
      );
      console.log(`   ${chalk.gray('→')} ${chalk.cyan(file.relativePath)}`);
      console.log(`   ${chalk.gray('Guardian:')} ${chalk.yellow(file.analysis?.guardianAffinity?.primary || 'general')} | ${chalk.gray('Category:')} ${chalk.green(file.analysis?.primaryCategory || 'general')}`);
      console.log();
    });

    if (results.length > 10) {
      console.log(chalk.hex(this.colors.info)(`... and ${results.length - 10} more results\n`));
    }
  }

  // 🎯 Display recommendations
  showRecommendations(recommendations) {
    console.log('\n');
    console.log(
      chalk.hex(this.colors.primary).bold('🎯 Smart Recommendations\n')
    );

    recommendations.slice(0, 5).forEach((rec, index) => {
      const file = rec.file;
      
      console.log(
        boxen(
          `${chalk.white.bold(file.filename)}\n` +
          `${chalk.gray('Related files you might also need:')}\n\n` +
          rec.related.map(rel => 
            `  ${chalk.gray('→')} ${chalk.cyan(rel.file.filename)} ${chalk.gray(`(${Math.round(rel.similarity)}% similar)`)}`
          ).join('\n'),
          {
            padding: 1,
            borderStyle: 'round',
            borderColor: this.colors.secondary,
            title: chalk.hex(this.colors.primary)(`#${index + 1}`),
            titleAlignment: 'left'
          }
        )
      );
      console.log();
    });
  }

  // 🎨 Display learning status
  showLearningStatus(learningData) {
    console.log('\n');
    console.log(
      chalk.hex(this.colors.primary).bold('🧠 Agent Learning Status\n')
    );

    const corrections = Object.keys(learningData.userCorrections || {}).length;
    const preferences = Object.keys(learningData.preferredTags || {}).length;
    const searches = (learningData.searchHistory || []).length;
    
    console.log(
      boxen(
        `${chalk.white('The Arcanea Superintelligence gets smarter with each interaction.')}\n\n` +
        `${chalk.yellow('📚 Knowledge Base:')}\n` +
        `  ${chalk.gray('•')} User corrections: ${chalk.white(corrections)}\n` +
        `  ${chalk.gray('•')} Preferred tags: ${chalk.white(preferences)}\n` +
        `  ${chalk.gray('•')} Search history: ${chalk.white(searches)} entries\n\n` +
        `${chalk.green('✓')} Agent is actively learning and improving recommendations.`,
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: this.colors.success
        }
      )
    );
    console.log();
  }

  // 🚀 Display workflow menu
  showWorkflowMenu() {
    console.log('\n');
    console.log(
      gradient(['#10B981', '#3B82F6'])(
        '⚡ AUTOMATED WORKFLOWS\n'
      )
    );

    const workflows = [
      { id: 1, name: 'Auto-Organize', description: 'Intelligently sort files by Guardian affinity', icon: '🗂️' },
      { id: 2, name: 'Bulk Rename', description: 'Mass rename with intelligent patterns', icon: '📝' },
      { id: 3, name: 'Duplicate Finder', description: 'Find and manage duplicate files', icon: '🔍' },
      { id: 4, name: 'Export Collection', description: 'Export curated file collections', icon: '📦' },
      { id: 5, name: 'Generate Thumbnails', description: 'Create optimized preview images', icon: '🖼️' },
      { id: 6, name: 'Sync to Cloud', description: 'Backup to cloud storage', icon: '☁️' }
    ];

    workflows.forEach((wf, i) => {
      const isLast = i === workflows.length - 1;
      const prefix = isLast ? '└──' : '├──';
      console.log(
        `${chalk.gray(prefix)} ${chalk.hex(this.colors.primary)(wf.icon)} ${chalk.white.bold(wf.name.padEnd(20))} ${chalk.gray(wf.description)}`
      );
    });

    console.log('\n');
    console.log(chalk.hex(this.colors.info)('Run with: node arcanea-super-agent.js workflow <id>\n'));
  }

  // 💎 Display success message
  showSuccess(message) {
    console.log(
      boxen(
        chalk.hex(this.colors.success)(`✓ ${message}`),
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: this.colors.success,
          backgroundColor: '#064E3B'
        }
      )
    );
  }

  // ⚠️ Display error message
  showError(message) {
    console.log(
      boxen(
        chalk.hex(this.colors.error)(`✗ ${message}`),
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: this.colors.error,
          backgroundColor: '#450A0A'
        }
      )
    );
  }

  // ℹ️ Display info message
  showInfo(message) {
    console.log(chalk.hex(this.colors.info)(`ℹ️  ${message}`));
  }

  // 📏 Format file size
  formatSize(bytes) {
    if (!bytes) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  }

  // 🎨 Show help with premium formatting
  showHelp() {
    this.showHeader();
    
    console.log(
      chalk.hex(this.colors.primary).bold('📖 PREMIUM CLI COMMANDS\n')
    );

    const commands = [
      { cmd: 'scan', desc: 'Full library scan with visual progress', usage: 'node arcanea-super-agent.js scan' },
      { cmd: 'search <query>', desc: 'Semantic search with smart ranking', usage: 'node arcanea-super-agent.js search "draconia fire"' },
      { cmd: 'stats', desc: 'Premium analytics dashboard', usage: 'node arcanea-super-agent.js stats' },
      { cmd: 'analyze <file>', desc: 'Deep file analysis with visual card', usage: 'node arcanea-super-agent.js analyze ./image.png' },
      { cmd: 'recommend', desc: 'AI-powered file recommendations', usage: 'node arcanea-super-agent.js recommend' },
      { cmd: 'learn <file> <cat> <tags>', desc: 'Teach the agent your preferences', usage: 'node arcanea-super-agent.js learn ./file.jpg guardians "draconia,bold"' },
      { cmd: 'workflows', desc: 'View available automation workflows', usage: 'node arcanea-super-agent.js workflows' },
      { cmd: 'web', desc: 'Launch premium web interface', usage: 'npm run dev' }
    ];

    console.log('┌────────────────────────────────────────────────────────────────────────┐');
    commands.forEach((cmd, i) => {
      const isLast = i === commands.length - 1;
      const line = isLast ? '└' : '├';
      console.log(
        `${line}─ ${chalk.hex(this.colors.primary)(cmd.cmd.padEnd(25))} ${chalk.gray(cmd.desc)}`
      );
      console.log(`${isLast ? ' ' : '│'}  ${chalk.gray('Usage:')} ${chalk.cyan(cmd.usage)}${isLast ? '' : ''}`);
      if (!isLast) console.log('│');
    });
    console.log('└────────────────────────────────────────────────────────────────────────┘\n');

    console.log(
      chalk.hex(this.colors.secondary)('💡 Pro Tips:\n') +
      chalk.gray('  • Use quotes for multi-word searches\n') +
      chalk.gray('  • Combine filters: guardian + category + search\n') +
      chalk.gray('  • The agent learns from your corrections\n') +
      chalk.gray('  • Web UI available at http://localhost:3000/arcanea-premium\n')
    );
  }
}

module.exports = ArcaneaPremiumCLI;