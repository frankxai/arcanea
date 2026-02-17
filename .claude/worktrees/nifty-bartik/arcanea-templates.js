#!/usr/bin/env node

/**
 * Arcanea Project Templates
 * Pre-built templates for rapid project creation
 * 
 * Usage: node arcanea-templates.js <template-name>
 */

const fs = require('fs');
const path = require('path');

const Templates = {
    // Creative Writing Template
    'novel-project': {
        name: 'Novel Project',
        description: 'Complete novel writing workspace',
        structure: {
            '00-Planning': {
                'outline.md': '# Novel Outline\n\n## Story Arc\n- [ ] Act 1: Setup\n- [ ] Act 2: Confrontation\n- [ ] Act 3: Resolution\n\n## Characters\n- [ ] Protagonist profile\n- [ ] Antagonist profile\n- [ ] Supporting cast\n\n## World Building\n- [ ] Setting details\n- [ ] Rules of the world\n- [ ] History & lore',
                'timeline.md': '# Timeline\n\n## Major Events\n1. Inciting Incident\n2. First Plot Point\n3. Midpoint\n4. Climax\n5. Resolution',
                'research.md': '# Research Notes\n\n## Topics to Research\n- [ ] Historical context\n- [ ] Technical details\n- [ ] Cultural references'
            },
            '01-Drafts': {
                'chapter-01.md': '# Chapter 1\n\n[Write first chapter here]',
                'chapter-02.md': '# Chapter 2\n\n[Continue story...]'
            },
            '02-Characters': {
                'protagonist.md': '# Protagonist\n\n**Name:** \n**Age:** \n**Goal:** \n**Conflict:** \n**Personality:** ',
                'antagonist.md': '# Antagonist\n\n**Name:** \n**Motivation:** \n**Methods:** \n**Weakness:** '
            },
            '03-World': {
                'setting.md': '# Setting\n\n## Location\n- Time period:\n- Geography:\n- Climate:\n- Culture:',
                'magic-system.md': '# Magic System\n\n## Rules\n1. \n2. \n3. \n\n## Limitations',
                'history.md': '# History\n\n## Major Events\n- \n- \n- '
            },
            '04-Editing': {
                'revision-notes.md': '# Revision Notes\n\n## First Pass\n- [ ] Plot consistency\n- [ ] Character arcs\n- [ ] Pacing\n\n## Second Pass\n- [ ] Dialogue polish\n- [ ] Description enhancement\n- [ ] Grammar check'
            },
            'README.md': '# Novel Project\n\nStarted: [DATE]\nTarget Word Count: 80,000\nGenre: [GENRE]\n\n## Quick Links\n- [Outline](00-Planning/outline.md)\n- [First Chapter](01-Drafts/chapter-01.md)\n- [Protagonist](02-Characters/protagonist.md)\n\n## Progress\n- [ ] Planning complete\n- [ ] First draft\n- [ ] Revision\n- [ ] Final polish'
        }
    },

    // Game Development Template
    'indie-game': {
        name: 'Indie Game Project',
        description: 'Complete game development workspace',
        structure: {
            '01-Design': {
                'GDD.md': '# Game Design Document\n\n## Overview\n**Title:** \n**Genre:** \n**Platform:** \n**Target Audience:** \n\n## Core Mechanics\n1. \n2. \n3. \n\n## Progression System\n\n## Art Style',
                'story.md': '# Story & Narrative\n\n## Synopsis\n\n## Characters\n\n## Plot Points',
                'level-design.md': '# Level Design\n\n## Level 1: Tutorial\n- Objectives:\n- Enemies:\n- Rewards:\n\n## Level 2: First Challenge'
            },
            '02-Art': {
                'concept-art': {},
                'sprites': {},
                'animations': {},
                'tilesets': {}
            },
            '03-Audio': {
                'music': {},
                'sfx': {},
                'voice': {}
            },
            '04-Code': {
                'src': {},
                'scripts': {}
            },
            '05-Testing': {
                'test-plans.md': '# Test Plans\n\n## Unit Tests\n\n## Integration Tests\n\n## Playtest Sessions',
                'bug-tracker.md': '# Bug Tracker\n\n| ID | Description | Severity | Status |\n|---|---|---|---|',
                'feedback.md': '# Playtest Feedback\n\n## Session 1\nDate: \nTester: \nNotes:'
            },
            '06-Marketing': {
                'pitch.md': '# Elevator Pitch\n\n[One sentence description]\n\n## Key Features\n1. \n2. \n3.',
                'trailer-script.md': '# Trailer Script\n\n## Scene 1\n[Description]\n\n## Scene 2',
                'screenshots': {}
            },
            '07-Release': {
                'launch-checklist.md': '# Launch Checklist\n\n## Pre-Launch\n- [ ] Final testing\n- [ ] Trailer complete\n- [ ] Store pages ready\n- [ ] Press kit\n\n## Launch Day\n- [ ] Social media posts\n- [ ] Community announcements\n- [ ] Monitor feedback',
                'post-mortem.md': '# Post-Mortem\n\n## What Went Well\n\n## What Could Improve\n\n## Metrics'
            },
            'README.md': '# Indie Game Project\n\n**Engine:** [Unity/Godot/Unreal]\n**Genre:** \n**Target Release:** \n\n## Quick Start\n1. Review [GDD](01-Design/GDD.md)\n2. Check [Art](02-Art/)\n3. Run [Tests](05-Testing/)\n\n## Team\n- Designer: \n- Artist: \n- Programmer: \n- Audio: '
        }
    },

    // Business Launch Template
    'business-launch': {
        name: 'Business Launch',
        description: 'Solopreneur business setup template',
        structure: {
            '01-Planning': {
                'business-plan.md': '# Business Plan\n\n## Executive Summary\n\n## Target Market\n\n## Value Proposition\n\n## Revenue Model',
                'brand-guidelines.md': '# Brand Guidelines\n\n## Logo\n## Colors\n## Typography\n## Voice & Tone',
                'competitive-analysis.md': '# Competitive Analysis\n\n| Competitor | Strengths | Weaknesses | Our Advantage |\n|---|---|---|---|'
            },
            '02-Setup': {
                'legal.md': '# Legal Setup\n\n- [ ] Business registration\n- [ ] Tax ID/EIN\n- [ ] Business license\n- [ ] Insurance',
                'finance.md': '# Financial Setup\n\n- [ ] Business bank account\n- [ ] Accounting software\n- [ ] Payment processor\n- [ ] Invoicing system',
                'tools.md': '# Tools & Software\n\n## Project Management\n## Communication\n## Design\n## Development'
            },
            '03-Services': {
                'service-offerings.md': '# Service Offerings\n\n## Service 1\n**Price:** \n**Deliverables:** \n**Timeline:** \n\n## Service 2',
                'packages.md': '# Service Packages\n\n### Starter Package\n- Features:\n- Price:\n- Timeline:\n\n### Professional Package\n\n### Enterprise Package'
            },
            '04-Marketing': {
                'marketing-plan.md': '# Marketing Plan\n\n## Goals\n## Channels\n## Content Strategy\n## Budget',
                'website-content.md': '# Website Content\n\n## Home Page\n## About Page\n## Services Page\n## Contact Page',
                'social-media.md': '# Social Media Strategy\n\n## Platforms\n## Posting Schedule\n## Content Types'
            },
            '05-Operations': {
                'workflows.md': '# Standard Workflows\n\n## Client Onboarding\n1. Initial contact\n2. Discovery call\n3. Proposal\n4. Contract\n5. Kickoff\n\n## Project Delivery\n\n## Invoice Collection',
                'templates': {
                    'proposal-template.md': '# Proposal Template\n\n## Client: [NAME]\n## Project: [TITLE]\n## Date: [DATE]\n\n### Scope\n\n### Timeline\n\n### Investment\n\n### Terms',
                    'contract-template.md': '# Contract Template\n\n## Parties\n\n## Scope of Work\n\n## Payment Terms\n\n## Intellectual Property\n\n## Signatures'
                }
            },
            '06-Clients': {
                'client-1': {
                    'brief.md': '# Client Brief\n\n**Name:** \n**Industry:** \n**Goals:** ',
                    'contracts': {},
                    'deliverables': {}
                }
            },
            'README.md': '# Business Launch\n\n**Business Name:** \n**Owner:** \n**Launch Date:** \n\n## Quick Links\n- [Business Plan](01-Planning/business-plan.md)\n- [Services](03-Services/service-offerings.md)\n- [Marketing](04-Marketing/marketing-plan.md)\n\n## Current Status\n- [ ] Planning\n- [ ] Setup\n- [ ] Services defined\n- [ ] Marketing active\n- [ ] First client'
        }
    },

    // Course/Education Template
    'online-course': {
        name: 'Online Course',
        description: 'Complete course creation workspace',
        structure: {
            '01-Planning': {
                'course-outline.md': '# Course Outline\n\n## Target Audience\n\n## Learning Objectives\nBy the end, students will be able to:\n1. \n2. \n3. \n\n## Prerequisites',
                'module-breakdown.md': '# Module Breakdown\n\n### Module 1: Introduction\n- Lesson 1.1\n- Lesson 1.2\n- Quiz\n\n### Module 2: Fundamentals',
                'curriculum-map.md': '# Curriculum Map\n\n| Module | Lessons | Exercises | Duration |\n|---|---|---|---|'
            },
            '02-Content': {
                'module-01': {
                    'lesson-01.md': '# Lesson 1.1: [Title]\n\n## Learning Objective\n\n## Content\n\n## Key Takeaways',
                    'lesson-02.md': '# Lesson 1.2: [Title]',
                    'exercise.md': '# Exercise 1\n\n## Instructions\n\n## Solution',
                    'quiz.md': '# Quiz: Module 1\n\n1. Question?\n   a) \n   b) \n   c) \n   d) '
                },
                'slides': {},
                'transcripts': {}
            },
            '03-Resources': {
                'worksheets': {},
                'cheat-sheets': {},
                'templates': {},
                'references.md': '# References & Resources\n\n## Books\n## Articles\n## Tools\n## Communities'
            },
            '04-Production': {
                'scripts': {
                    'intro-video.md': '# Intro Video Script\n\n[0:00-0:30] Hook\n[0:30-1:00] What you\'ll learn\n[1:00-1:30] Course structure',
                    'module-01-script.md': '# Module 1 Script'
                },
                'recording-notes.md': '# Recording Notes\n\n## Equipment\n## Setup\n## Best Practices',
                'editing-timeline.md': '# Editing Timeline\n\n| Video | Raw | Edit | Review | Final |\n|---|---|---|---|---|'
            },
            '05-Platform': {
                'platform-setup.md': '# Platform Setup\n\n## Learning Management System\n## Pricing\n## Landing Page\n## Email Integration',
                'launch-strategy.md': '# Launch Strategy\n\n## Pre-Launch\n## Launch Week\n## Post-Launch'
            },
            '06-Student-Success': {
                'faq.md': '# Frequently Asked Questions\n\nQ: \nA:',
                'support-guidelines.md': '# Support Guidelines\n\n## Response Time\n## Common Issues\n## Escalation Process',
                'community-guidelines.md': '# Community Guidelines'
            },
            'README.md': '# Online Course\n\n**Title:** \n**Instructor:** \n**Launch Date:** \n**Price:** \n\n## Quick Links\n- [Course Outline](01-Planning/course-outline.md)\n- [Module 1](02-Content/module-01/)\n- [Resources](03-Resources/)\n\n## Production Status\n- [ ] Planning complete\n- [ ] All content written\n- [ ] Videos recorded\n- [ ] Platform setup\n- [ ] Beta tested\n- [ ] Launched'
        }
    },

    // Research Project Template
    'research-project': {
        name: 'Research Project',
        description: 'Academic or market research workspace',
        structure: {
            '01-Proposal': {
                'research-proposal.md': '# Research Proposal\n\n## Title\n\n## Research Questions\n1. \n2. \n3. \n\n## Hypothesis\n\n## Methodology\n\n## Timeline\n\n## Budget',
                'literature-review.md': '# Literature Review\n\n## Key Sources\n1. \n2. \n3. \n\n## Gaps in Research\n\n## Theoretical Framework'
            },
            '02-Data': {
                'raw-data': {},
                'processed-data': {},
                'interviews': {},
                'surveys': {}
            },
            '03-Analysis': {
                'analysis-notes.md': '# Analysis Notes\n\n## Methods Used\n\n## Key Findings\n\n## Unexpected Results',
                'visualizations': {},
                'code': {}
            },
            '04-Writing': {
                'drafts': {
                    'introduction.md': '# Introduction\n\n## Background\n## Problem Statement\n## Research Objectives',
                    'methodology.md': '# Methodology\n\n## Research Design\n## Data Collection\n## Analysis Methods',
                    'results.md': '# Results\n\n## Findings\n## Data Presentation',
                    'discussion.md': '# Discussion\n\n## Interpretation\n## Implications\n## Limitations',
                    'conclusion.md': '# Conclusion\n\n## Summary\n## Future Research'
                },
                'references.bib': '% Bibliography\n\n@article{key,\n  author = {},\n  title = {},\n  journal = {},\n  year = {}\n}'
            },
            '05-Presentation': {
                'presentation-slides': {},
                'poster-design': {},
                'talk-script.md': '# Talk Script\n\n## Opening (2 min)\n\n## Methods (3 min)\n\n## Results (5 min)\n\n## Q&A Prep'
            },
            'README.md': '# Research Project\n\n**Title:** \n**Researcher:** \n**Institution:** \n**Start Date:** \n**Expected Completion:** \n\n## Quick Links\n- [Proposal](01-Proposal/research-proposal.md)\n- [Literature Review](01-Proposal/literature-review.md)\n- [Data](02-Data/)\n- [Analysis](03-Analysis/)\n- [Drafts](04-Writing/drafts/)\n\n## Status\n- [ ] Proposal approved\n- [ ] Data collection complete\n- [ ] Analysis done\n- [ ] First draft\n- [ ] Revisions\n- [ ] Final submission'
        }
    }
};

// Template Manager
const TemplateManager = {
    list() {
        console.log('📦 Available Templates\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        Object.entries(Templates).forEach(([key, template]) => {
            console.log(`${key.padEnd(20)} ${template.name}`);
            console.log(`                     ${template.description}\n`);
        });
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\nUsage: node arcanea-templates.js <template-name> [project-name]');
        console.log('Example: node arcanea-templates.js novel-project my-novel\n');
    },

    create(templateName, projectName) {
        const template = Templates[templateName];
        
        if (!template) {
            console.log(`❌ Template "${templateName}" not found.`);
            console.log('Run without arguments to see available templates.');
            return;
        }

        projectName = projectName || `${templateName}-project`;
        const projectPath = path.join(process.cwd(), projectName);

        if (fs.existsSync(projectPath)) {
            console.log(`❌ Directory "${projectName}" already exists.`);
            return;
        }

        console.log(`🚀 Creating ${template.name}...\n`);
        console.log(`   Project: ${projectName}`);
        console.log(`   Location: ${projectPath}\n`);

        this.createStructure(projectPath, template.structure);
        
        console.log('\n✅ Project created successfully!\n');
        console.log('Next steps:');
        console.log(`   cd ${projectName}`);
        console.log('   Open README.md to get started\n');
    },

    createStructure(basePath, structure, currentPath = '') {
        Object.entries(structure).forEach(([name, content]) => {
            const itemPath = path.join(basePath, currentPath, name);
            
            if (typeof content === 'object' && !content.toString().startsWith('#')) {
                // It's a directory
                fs.mkdirSync(itemPath, { recursive: true });
                console.log(`   📁 ${path.join(currentPath, name)}`);
                this.createStructure(basePath, content, path.join(currentPath, name));
            } else {
                // It's a file
                fs.writeFileSync(itemPath, content);
                console.log(`   📄 ${path.join(currentPath, name)}`);
            }
        });
    },

    info(templateName) {
        const template = Templates[templateName];
        
        if (!template) {
            console.log(`❌ Template "${templateName}" not found.`);
            return;
        }

        console.log(`\n📋 ${template.name}\n`);
        console.log(`Description: ${template.description}\n`);
        console.log('Structure:');
        this.printStructure(template.structure);
        console.log('');
    },

    printStructure(structure, indent = '') {
        Object.entries(structure).forEach(([name, content]) => {
            if (typeof content === 'object' && !content.toString().startsWith('#')) {
                console.log(`${indent}📁 ${name}/`);
                this.printStructure(content, indent + '  ');
            } else {
                console.log(`${indent}📄 ${name}`);
            }
        });
    }
};

// CLI
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === 'list' || command === '--help' || command === '-h') {
    TemplateManager.list();
} else if (command === 'info') {
    TemplateManager.info(args[1]);
} else {
    TemplateManager.create(command, args[1]);
}
