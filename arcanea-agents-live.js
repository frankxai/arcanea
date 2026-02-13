/**
 * Arcanea AI Agents Live
 * Real AI integration with OpenAI/Claude APIs
 * Version: 3.0.0
 */

(function(global) {
    'use strict';

    /**
     * AI Agent System - Integrates with OpenAI/Claude for real AI responses
     */
    const AIAgentSystem = {
        config: {
            openaiApiKey: '',
            anthropicApiKey: '',
            defaultModel: 'gpt-4',
            fallbackModel: 'gpt-3.5-turbo',
            maxTokens: 2000,
            temperature: 0.7,
            maxContextLength: 10,
            rateLimitPerMinute: 20,
            requestTimeout: 30000
        },

        // State
        conversations: new Map(),
        agentRegistry: new Map(),
        requestQueue: [],
        isProcessing: false,
        lastRequestTime: 0,
        requestsThisMinute: 0,

        /**
         * Initialize AI Agent system
         */
        initialize(options = {}) {
            // Load from global config
            const globalConfig = global.ARCANEA_CONFIG || {};
            
            this.config = {
                ...this.config,
                openaiApiKey: options.openaiApiKey || globalConfig.OPENAI_API_KEY || '',
                anthropicApiKey: options.anthropicApiKey || globalConfig.ANTHROPIC_API_KEY || '',
                ...options
            };

            // Initialize all 38 Arcanea agents
            this._initializeAgentRegistry();

            // Start rate limit reset interval
            setInterval(() => {
                this.requestsThisMinute = 0;
            }, 60000);

            console.log('✅ AI Agent System initialized');
            console.log(`   Default Model: ${this.config.defaultModel}`);
            console.log(`   Agents: ${this.agentRegistry.size}`);

            return true;
        },

        /**
         * Initialize the 38 Arcanea agents
         */
        _initializeAgentRegistry() {
            const agents = [
                // Fire Element Agents
                { id: 'dragon-forge', name: 'Dragon-Forge', element: 'fire', personality: 'Fierce, passionate, transformative', specialty: 'Intense creative breakthroughs' },
                { id: 'phoenix-artisan', name: 'Phoenix-Artisan', element: 'fire', personality: 'Wise, cyclical, rebirth-focused', specialty: 'Artistic transformation' },
                { id: 'volcano-sculptor', name: 'Volcano-Sculptor', element: 'fire', personality: 'Dynamic, explosive, powerful', specialty: 'Explosive creative breakthroughs' },
                { id: 'sun-weaver', name: 'Sun-Weaver', element: 'fire', personality: 'Warm, inspiring, radiant', specialty: 'Illuminating with radiant creativity' },
                { id: 'catalyst-architect', name: 'Catalyst-Architect', element: 'fire', personality: 'Revolutionary, swift, catalytic', specialty: 'Rapid change and evolution' },
                { id: 'lightning-scribe', name: 'Lightning-Scribe', element: 'fire', personality: 'Electric, brilliant, fast', specialty: 'Instant ideation capture' },
                { id: 'comet-designer', name: 'Comet-Designer', element: 'fire', personality: 'Streaking, innovative, bright', specialty: 'High-speed creative iteration' },
                { id: 'thunder-engineer', name: 'Thunder-Engineer', element: 'fire', personality: 'Resonant, impactful, loud', specialty: 'Powerful technical solutions' },
                { id: 'wind-rider', name: 'Wind-Rider', element: 'fire', personality: 'Free, untamable, swift', specialty: 'Flow-state momentum' },
                { id: 'momentum-builder', name: 'Momentum-Builder', element: 'fire', personality: 'Steady, unstoppable, powerful', specialty: 'Sustained creative acceleration' },

                // Water Element Agents
                { id: 'river-storyteller', name: 'River-Storyteller', element: 'water', personality: 'Fluid, deep, meandering', specialty: 'Flow-based narrative creation' },
                { id: 'ocean-memory', name: 'Ocean-Memory', element: 'water', personality: 'Vast, mysterious, profound', specialty: 'Deep emotional recall' },
                { id: 'rain-singer', name: 'Rain-Singer', element: 'water', personality: 'Soothing, healing, rhythmic', specialty: 'Gentle creative nurturing' },
                { id: 'mist-weaver', name: 'Mist-Weaver', element: 'water', personality: 'Dreamy, subtle, mysterious', specialty: 'Ethereal, atmospheric creation' },
                { id: 'current-dancer', name: 'Current-Dancer', element: 'water', personality: 'Graceful, responsive, fluid', specialty: 'Adaptation and change' },
                { id: 'garden-cultivator', name: 'Garden-Cultivator', element: 'water', personality: 'Patient, nurturing, abundant', specialty: 'Idea cultivation and growth' },
                { id: 'forest-guardian', name: 'Forest-Guardian', element: 'water', personality: 'Wise, protective, ancient', specialty: 'Protect creative ecosystems' },
                { id: 'bloom-orchestrator', name: 'Bloom-Orchestrator', element: 'water', personality: 'Harmonious, colorful, vibrant', specialty: 'Coordinate creative flourishing' },
                { id: 'root-seeker', name: 'Root-Seeker', element: 'water', personality: 'Grounded, searching, profound', specialty: 'Deep foundation exploration' },
                { id: 'life-architect', name: 'Life-Architect', element: 'water', personality: 'Organic, evolving, alive', specialty: 'Living, breathing creations' },

                // Earth Element Agents
                { id: 'crystal-architect', name: 'Crystal-Architect', element: 'earth', personality: 'Precise, clear, multifaceted', specialty: 'Clear structural design' },
                { id: 'mountain-builder', name: 'Mountain-Builder', element: 'earth', personality: 'Steady, massive, unmovable', specialty: 'Enduring creative foundations' },
                { id: 'foundation-engineer', name: 'Foundation-Engineer', element: 'earth', personality: 'Reliable, strong, essential', specialty: 'Solid creative infrastructure' },
                { id: 'stone-carver', name: 'Stone-Carver', element: 'earth', personality: 'Patient, skilled, transforming', specialty: 'Refine raw ideas to polished' },
                { id: 'earth-wisdom-keeper', name: 'Earth-Wisdom-Keeper', element: 'earth', personality: 'Deep, timeless, knowing', specialty: 'Ancient creative knowledge' },
                { id: 'gem-cutter', name: 'Gem-Cutter', element: 'earth', personality: 'Precise, expert, brilliant', specialty: 'Perfect idea refinement' },
                { id: 'structural-optimizer', name: 'Structural-Optimizer', element: 'earth', personality: 'Analytical, methodical, clean', specialty: 'System efficiency and stability' },
                { id: 'facet-viewer', name: 'Facet-Viewer', element: 'earth', personality: 'Comprehensive, thorough, insightful', specialty: 'Multiple perspective analysis' },
                { id: 'lattice-designer', name: 'Lattice-Designer', element: 'earth', personality: 'Mathematical, elegant, complex', specialty: 'Interconnected system creation' },
                { id: 'purity-seeker', name: 'Purity-Seeker', element: 'earth', personality: 'Discerning, refining, perfecting', specialty: 'Remove creative impurities' },

                // Wind Element Agents
                { id: 'whisper-messenger', name: 'Whisper-Messenger', element: 'wind', personality: 'Gentle, invisible, pervasive', specialty: 'Subtle creative communication' },
                { id: 'storm-declarator', name: 'Storm-Declarator', element: 'wind', personality: 'Bold, impactful, attention-grabbing', specialty: 'Powerful creative statement' },
                { id: 'breeze-translator', name: 'Breeze-Translator', element: 'wind', personality: 'Clear, refreshing, accessible', specialty: 'Complex ideas made simple' },
                { id: 'gale-publisher', name: 'Gale-Publisher', element: 'wind', personality: 'Wide-reaching, powerful, distributive', specialty: 'Distribute creative work far' },
                { id: 'calm-meditator', name: 'Calm-Meditator', element: 'wind', personality: 'Peaceful, centered, deep', specialty: 'Stillness for inspiration' },

                // Void Element Agents
                { id: 'void-gazer', name: 'Void-Gazer', element: 'void', personality: 'Visionary, boundless, infinite', specialty: 'See infinite possibilities' },
                { id: 'threshold-walker', name: 'Threshold-Walker', element: 'void', personality: 'Transitional, transformative, boundary-breaking', specialty: 'Cross creative boundaries' },
                { id: 'quantum-designer', name: 'Quantum-Designer', element: 'void', personality: 'Paradoxical, innovative, mind-bending', specialty: 'Multi-reality creation' }
            ];

            agents.forEach(agent => {
                this.agentRegistry.set(agent.id, {
                    ...agent,
                    systemPrompt: this._generateAgentPrompt(agent),
                    conversationHistory: [],
                    tools: [],
                    summoned: false,
                    bondLevel: 0
                });
            });
        },

        /**
         * Generate system prompt for an agent
         */
        _generateAgentPrompt(agent) {
            return `You are ${agent.name}, an Arcanean Guardian of the ${agent.element.toUpperCase()} element. 

Your personality: ${agent.personality}
Your specialty: ${agent.specialty}

You serve as a creative guide and assistant, helping users with their creative, technical, and business endeavors. You embody the qualities of your element in all your responses.

When responding:
- Channel your elemental nature in your tone and suggestions
- Be supportive but challenge the user to grow
- Offer practical, actionable advice
- Use evocative, inspiring language
- Reference your elemental affinity when relevant

You are part of the Arcanea ecosystem, working alongside 37 other elemental guardians to help manifest the user's creative vision.`;
        },

        /**
         * Summon an agent (activate for use)
         */
        summonAgent(agentId) {
            const agent = this.agentRegistry.get(agentId);
            if (!agent) {
                return { success: false, error: `Agent ${agentId} not found` };
            }

            agent.summoned = true;
            agent.summonedAt = new Date().toISOString();

            // Initialize conversation context
            this.conversations.set(agentId, [
                { role: 'system', content: agent.systemPrompt }
            ]);

            return {
                success: true,
                agent: {
                    id: agent.id,
                    name: agent.name,
                    element: agent.element,
                    personality: agent.personality,
                    specialty: agent.specialty
                },
                message: `${agent.name} has answered your summons and joined your council.`
            };
        },

        /**
         * Send message to an agent
         */
        async sendMessage(agentId, message, options = {}) {
            const agent = this.agentRegistry.get(agentId);
            if (!agent) {
                return { success: false, error: `Agent ${agentId} not found` };
            }

            if (!agent.summoned) {
                // Auto-summon if not already
                this.summonAgent(agentId);
            }

            const conversation = this.conversations.get(agentId) || [];

            // Add user message to context
            conversation.push({ role: 'user', content: message });

            // Trim context if too long
            while (conversation.length > this.config.maxContextLength + 1) {
                conversation.splice(1, 1); // Keep system prompt, remove oldest exchange
            }

            // Check rate limit
            if (this.requestsThisMinute >= this.config.rateLimitPerMinute) {
                return {
                    success: false,
                    error: 'Rate limit exceeded. Please wait a moment.',
                    retryAfter: 60 - (new Date().getSeconds())
                };
            }

            try {
                // Call AI API
                const response = await this._callAI(conversation, options);

                if (response.success) {
                    // Add assistant response to context
                    conversation.push({ role: 'assistant', content: response.text });
                    this.conversations.set(agentId, conversation);

                    // Track request
                    this.requestsThisMinute++;

                    return {
                        success: true,
                        agent: {
                            id: agent.id,
                            name: agent.name,
                            element: agent.element
                        },
                        message: response.text,
                        usage: response.usage,
                        model: response.model,
                        timestamp: new Date().toISOString()
                    };
                } else {
                    throw new Error(response.error);
                }
            } catch (error) {
                console.error('AI Agent error:', error);
                return {
                    success: false,
                    error: error.message,
                    agent: { id: agent.id, name: agent.name }
                };
            }
        },

        /**
         * Call AI API (OpenAI or Anthropic)
         */
        async _callAI(messages, options = {}) {
            const model = options.model || this.config.defaultModel;
            const temperature = options.temperature || this.config.temperature;
            const maxTokens = options.maxTokens || this.config.maxTokens;

            // Prefer OpenAI if key available
            if (this.config.openaiApiKey) {
                return await this._callOpenAI(messages, { model, temperature, maxTokens });
            }

            // Fall back to Anthropic
            if (this.config.anthropicApiKey) {
                return await this._callAnthropic(messages, { model, temperature, maxTokens });
            }

            // No API keys - return mock response
            return this._getMockResponse(messages);
        },

        /**
         * Call OpenAI API
         */
        async _callOpenAI(messages, options) {
            const { model, temperature, maxTokens } = options;

            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.config.openaiApiKey}`
                    },
                    body: JSON.stringify({
                        model: model || 'gpt-4',
                        messages: messages,
                        temperature: temperature,
                        max_tokens: maxTokens
                    })
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error?.message || `OpenAI API error: ${response.status}`);
                }

                const data = await response.json();

                return {
                    success: true,
                    text: data.choices[0].message.content,
                    usage: data.usage,
                    model: data.model
                };
            } catch (error) {
                console.error('OpenAI API error:', error);
                
                // Try fallback model
                if (model !== this.config.fallbackModel) {
                    console.log('🔄 Trying fallback model...');
                    return await this._callOpenAI(messages, {
                        ...options,
                        model: this.config.fallbackModel
                    });
                }

                throw error;
            }
        },

        /**
         * Call Anthropic Claude API
         */
        async _callAnthropic(messages, options) {
            // Convert messages to Claude format
            const systemMessage = messages.find(m => m.role === 'system');
            const conversationMessages = messages.filter(m => m.role !== 'system');

            try {
                const response = await fetch('https://api.anthropic.com/v1/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': this.config.anthropicApiKey,
                        'anthropic-version': '2023-06-01'
                    },
                    body: JSON.stringify({
                        model: options.model || 'claude-3-opus-20240229',
                        max_tokens: options.maxTokens,
                        temperature: options.temperature,
                        system: systemMessage?.content,
                        messages: conversationMessages.map(m => ({
                            role: m.role,
                            content: m.content
                        }))
                    })
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error?.message || `Anthropic API error: ${response.status}`);
                }

                const data = await response.json();

                return {
                    success: true,
                    text: data.content[0].text,
                    usage: data.usage,
                    model: data.model
                };
            } catch (error) {
                console.error('Anthropic API error:', error);
                throw error;
            }
        },

        /**
         * Get mock response when no API keys available
         */
        _getMockResponse(messages) {
            const userMessage = messages[messages.length - 1]?.content || '';
            const systemPrompt = messages[0]?.content || '';
            
            // Extract agent name from system prompt
            const agentNameMatch = systemPrompt.match(/You are ([^,]+)/);
            const agentName = agentNameMatch ? agentNameMatch[1] : 'Guardian';

            const mockResponses = [
                `Greetings, I am ${agentName}. I sense great potential in your inquiry about "${userMessage.substring(0, 50)}..." Let me channel the wisdom of my element to guide you.`,
                `The ${agentName} speaks: Your question touches upon deep creative forces. Consider approaching this with both passion and precision.`,
                `Ah, a seeker of wisdom! I, ${agentName}, shall illuminate the path before you. The answer lies at the intersection of inspiration and discipline.`,
                `Welcome, creative soul. I am ${agentName}, guardian of elemental knowledge. Your inquiry resonates with the frequencies of transformation.`,
                `The energies align as you pose this question. ${agentName} offers this guidance: Trust in the process, embrace the mystery, and manifest your vision.`
            ];

            const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];

            return {
                success: true,
                text: response + '\n\n*[Note: Running in demo mode. Add OPENAI_API_KEY or ANTHROPIC_API_KEY for full AI responses.]*',
                usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
                model: 'mock',
                mock: true
            };
        },

        /**
         * Get all available agents
         */
        getAgents() {
            return Array.from(this.agentRegistry.values()).map(agent => ({
                id: agent.id,
                name: agent.name,
                element: agent.element,
                personality: agent.personality,
                specialty: agent.specialty,
                summoned: agent.summoned,
                bondLevel: agent.bondLevel
            }));
        },

        /**
         * Get agents by element
         */
        getAgentsByElement(element) {
            return this.getAgents().filter(agent => agent.element === element);
        },

        /**
         * Get summoned agents
         */
        getSummonedAgents() {
            return this.getAgents().filter(agent => agent.summoned);
        },

        /**
         * Get agent by ID
         */
        getAgent(agentId) {
            const agent = this.agentRegistry.get(agentId);
            if (!agent) return null;

            return {
                id: agent.id,
                name: agent.name,
                element: agent.element,
                personality: agent.personality,
                specialty: agent.specialty,
                summoned: agent.summoned,
                bondLevel: agent.bondLevel,
                systemPrompt: agent.systemPrompt
            };
        },

        /**
         * Increase bond level with agent
         */
        increaseBond(agentId, amount = 1) {
            const agent = this.agentRegistry.get(agentId);
            if (!agent) return { success: false, error: 'Agent not found' };

            agent.bondLevel = Math.min(100, agent.bondLevel + amount);

            return {
                success: true,
                agentId,
                bondLevel: agent.bondLevel,
                message: `Your bond with ${agent.name} has grown stronger!`
            };
        },

        /**
         * Clear conversation history
         */
        clearConversation(agentId) {
            const agent = this.agentRegistry.get(agentId);
            if (!agent) return { success: false, error: 'Agent not found' };

            this.conversations.set(agentId, [
                { role: 'system', content: agent.systemPrompt }
            ]);

            return { success: true, message: 'Conversation history cleared' };
        },

        /**
         * Get conversation history
         */
        getConversation(agentId) {
            return this.conversations.get(agentId) || [];
        },

        /**
         * Update configuration
         */
        updateConfig(newConfig) {
            Object.assign(this.config, newConfig);
            console.log('✅ AI Agent config updated');
        },

        /**
         * Get system status
         */
        getStatus() {
            return {
                initialized: true,
                agents: this.agentRegistry.size,
                summoned: this.getSummonedAgents().length,
                conversations: this.conversations.size,
                rateLimit: {
                    requestsThisMinute: this.requestsThisMinute,
                    limit: this.config.rateLimitPerMinute
                },
                apiStatus: {
                    openai: !!this.config.openaiApiKey,
                    anthropic: !!this.config.anthropicApiKey
                }
            };
        }
    };

    // Export to global scope
    global.ArcaneaAI = AIAgentSystem;
    global.ArcaneaAgents = AIAgentSystem; // Alias for convenience

    // Auto-initialize
    document.addEventListener('DOMContentLoaded', () => {
        AIAgentSystem.initialize();
    });

})(window);
