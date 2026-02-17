/**
 * Arcanea MCP Live Client
 * Production-ready MCP client for browser
 * Version: 3.0.0
 */

(function(global) {
    'use strict';

    /**
     * MCP Live Client - Connects to MCP servers for tool invocation
     */
    const MCPLiveClient = {
        config: {
            serverUrl: '',
            apiKey: '',
            timeout: 30000,
            retryAttempts: 3,
            retryDelay: 1000
        },

        connectionState: 'disconnected',
        healthStatus: null,
        lastHealthCheck: null,

        /**
         * Initialize MCP client
         */
        initialize(options = {}) {
            // Load from global config or options
            const globalConfig = global.ARCANEA_CONFIG || {};
            
            this.config = {
                ...this.config,
                serverUrl: options.serverUrl || globalConfig.MCP_SERVER_URL || 'http://localhost:3000',
                apiKey: options.apiKey || globalConfig.MCP_API_KEY || '',
                ...options
            };

            if (!this.config.serverUrl) {
                console.warn('⚠️ MCP server URL not configured');
                return false;
            }

            console.log('✅ MCP Live Client initialized');
            console.log(`   Server: ${this.config.serverUrl}`);
            
            // Perform initial health check
            this.checkHealth();
            
            return true;
        },

        /**
         * Check server health
         */
        async checkHealth() {
            try {
                const response = await this._makeRequest('/health', {
                    method: 'GET',
                    timeout: 5000
                });

                this.healthStatus = response;
                this.lastHealthCheck = new Date();
                this.connectionState = 'connected';

                return {
                    healthy: true,
                    status: response,
                    timestamp: this.lastHealthCheck
                };
            } catch (error) {
                this.connectionState = 'error';
                console.warn('⚠️ MCP health check failed:', error.message);
                
                return {
                    healthy: false,
                    error: error.message,
                    timestamp: new Date()
                };
            }
        },

        /**
         * Generate image using MCP
         */
        async generateImage(params) {
            const {
                prompt,
                style = 'fantasy',
                size = '1024x1024',
                n = 1,
                quality = 'standard',
                onProgress
            } = params;

            if (!prompt) {
                return { success: false, error: 'Prompt is required' };
            }

            try {
                const result = await this._invokeTool('image_generation', {
                    prompt,
                    style,
                    size,
                    n,
                    quality
                }, { onProgress });

                return {
                    success: true,
                    images: result.images || [result],
                    prompt,
                    metadata: {
                        style,
                        size,
                        quality,
                        timestamp: new Date().toISOString()
                    }
                };
            } catch (error) {
                console.error('Image generation failed:', error);
                return {
                    success: false,
                    error: error.message,
                    fallback: this._getMockImage(prompt, style)
                };
            }
        },

        /**
         * Analyze code using MCP
         */
        async analyzeCode(params) {
            const {
                code,
                language = 'javascript',
                analysisType = 'full' // 'full' | 'security' | 'performance' | 'style'
            } = params;

            if (!code) {
                return { success: false, error: 'Code is required' };
            }

            try {
                const result = await this._invokeTool('code_analysis', {
                    code,
                    language,
                    analysis_type: analysisType
                });

                return {
                    success: true,
                    analysis: {
                        language: result.language || language,
                        quality_score: result.quality_score || 0,
                        issues: result.issues || [],
                        suggestions: result.suggestions || [],
                        metrics: result.metrics || {},
                        summary: result.summary || ''
                    },
                    metadata: {
                        lines_analyzed: code.split('\n').length,
                        timestamp: new Date().toISOString()
                    }
                };
            } catch (error) {
                console.error('Code analysis failed:', error);
                return {
                    success: false,
                    error: error.message,
                    analysis: this._getBasicCodeAnalysis(code, language)
                };
            }
        },

        /**
         * Search documentation using MCP
         */
        async searchDocs(params) {
            const {
                query,
                source = 'all',
                limit = 10
            } = params;

            if (!query) {
                return { success: false, error: 'Query is required' };
            }

            try {
                const result = await this._invokeTool('documentation_search', {
                    query,
                    source,
                    limit
                });

                return {
                    success: true,
                    results: result.results || [],
                    query,
                    total: result.total || result.results?.length || 0,
                    metadata: {
                        source,
                        timestamp: new Date().toISOString()
                    }
                };
            } catch (error) {
                console.error('Documentation search failed:', error);
                return {
                    success: false,
                    error: error.message,
                    results: []
                };
            }
        },

        /**
         * Process data using MCP
         */
        async processData(params) {
            const {
                data,
                operation = 'transform',
                options = {}
            } = params;

            try {
                const result = await this._invokeTool('data_processing', {
                    data,
                    operation,
                    options
                });

                return {
                    success: true,
                    result: result.data || result,
                    operation,
                    metadata: {
                        timestamp: new Date().toISOString()
                    }
                };
            } catch (error) {
                console.error('Data processing failed:', error);
                return {
                    success: false,
                    error: error.message
                };
            }
        },

        /**
         * Generate text/completion using MCP
         */
        async generateText(params) {
            const {
                prompt,
                model = 'gpt-4',
                maxTokens = 1000,
                temperature = 0.7,
                systemPrompt = null,
                stream = false,
                onChunk
            } = params;

            if (!prompt) {
                return { success: false, error: 'Prompt is required' };
            }

            try {
                const payload = {
                    prompt,
                    model,
                    max_tokens: maxTokens,
                    temperature,
                    system_prompt: systemPrompt,
                    stream
                };

                if (stream && onChunk) {
                    return await this._streamText(payload, onChunk);
                }

                const result = await this._invokeTool('text_generation', payload);

                return {
                    success: true,
                    text: result.text || result.content || result,
                    usage: result.usage || {},
                    model: result.model || model,
                    metadata: {
                        timestamp: new Date().toISOString()
                    }
                };
            } catch (error) {
                console.error('Text generation failed:', error);
                return {
                    success: false,
                    error: error.message
                };
            }
        },

        /**
         * Stream text generation
         */
        async _streamText(payload, onChunk) {
            try {
                const response = await fetch(`${this.config.serverUrl}/tools/text_generation`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Key': this.config.apiKey,
                        'Accept': 'text/event-stream'
                    },
                    body: JSON.stringify({ ...payload, stream: true })
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let fullText = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split('\n');

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            if (data === '[DONE]') continue;
                            
                            try {
                                const parsed = JSON.parse(data);
                                const content = parsed.choices?.[0]?.delta?.content || '';
                                fullText += content;
                                onChunk(content, fullText);
                            } catch (e) {
                                // Ignore parse errors for incomplete chunks
                            }
                        }
                    }
                }

                return {
                    success: true,
                    text: fullText,
                    streamed: true
                };
            } catch (error) {
                throw error;
            }
        },

        /**
         * Core tool invocation method with retry logic
         */
        async _invokeTool(toolName, params, options = {}) {
            const { onProgress, timeout = this.config.timeout } = options;
            let lastError;

            for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
                try {
                    const response = await this._makeRequest(`/tools/${toolName}`, {
                        method: 'POST',
                        body: params,
                        timeout,
                        onProgress
                    });

                    return response;
                } catch (error) {
                    lastError = error;
                    console.warn(`⚠️ MCP attempt ${attempt} failed:`, error.message);

                    if (attempt < this.config.retryAttempts) {
                        const delay = this.config.retryDelay * Math.pow(2, attempt - 1);
                        console.log(`🔄 Retrying in ${delay}ms...`);
                        await this._sleep(delay);
                    }
                }
            }

            throw lastError || new Error('All retry attempts failed');
        },

        /**
         * Make HTTP request to MCP server
         */
        async _makeRequest(endpoint, options = {}) {
            const {
                method = 'GET',
                body = null,
                timeout = this.config.timeout,
                onProgress
            } = options;

            const url = `${this.config.serverUrl}${endpoint}`;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            try {
                const fetchOptions = {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Key': this.config.apiKey,
                        'X-Client-Version': '3.0.0'
                    },
                    signal: controller.signal
                };

                if (body && method !== 'GET') {
                    fetchOptions.body = JSON.stringify(body);
                }

                const response = await fetch(url, fetchOptions);
                clearTimeout(timeoutId);

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
                }

                const contentType = response.headers.get('content-type');
                
                if (contentType && contentType.includes('application/json')) {
                    return await response.json();
                } else {
                    return await response.text();
                }
            } catch (error) {
                clearTimeout(timeoutId);
                
                if (error.name === 'AbortError') {
                    throw new Error('Request timeout');
                }
                
                throw error;
            }
        },

        /**
         * Sleep utility
         */
        _sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        /**
         * Get mock image for fallback
         */
        _getMockImage(prompt, style) {
            const hash = this._hashString(prompt);
            return {
                url: `https://placehold.co/1024x1024/1a1a28/ff6b35?text=${encodeURIComponent(prompt.substring(0, 30))}`,
                mock: true,
                prompt,
                style
            };
        },

        /**
         * Get basic code analysis for fallback
         */
        _getBasicCodeAnalysis(code, language) {
            const lines = code.split('\n');
            const issues = [];

            // Basic checks
            if (lines.length > 100) {
                issues.push({
                    severity: 'info',
                    message: 'Consider breaking this into smaller modules',
                    line: 1
                });
            }

            if (!code.includes('//') && lines.length > 20) {
                issues.push({
                    severity: 'warning',
                    message: 'Add documentation comments',
                    line: 1
                });
            }

            return {
                language,
                lines: lines.length,
                quality_score: 70,
                issues,
                suggestions: [
                    'Add JSDoc comments for functions',
                    'Consider error handling',
                    'Add unit tests'
                ],
                mock: true
            };
        },

        /**
         * Simple string hash
         */
        _hashString(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return Math.abs(hash).toString(36);
        },

        /**
         * Get client status
         */
        getStatus() {
            return {
                connected: this.connectionState === 'connected',
                state: this.connectionState,
                health: this.healthStatus,
                lastHealthCheck: this.lastHealthCheck,
                config: {
                    serverUrl: this.config.serverUrl,
                    timeout: this.config.timeout
                }
            };
        },

        /**
         * Update configuration
         */
        updateConfig(newConfig) {
            Object.assign(this.config, newConfig);
            console.log('✅ MCP config updated');
        }
    };

    /**
     * MCP Tool Registry - Predefined tool configurations
     */
    const MCPTools = {
        imageGeneration: (params) => MCPLiveClient.generateImage(params),
        codeAnalysis: (params) => MCPLiveClient.analyzeCode(params),
        docSearch: (params) => MCPLiveClient.searchDocs(params),
        dataProcessing: (params) => MCPLiveClient.processData(params),
        textGeneration: (params) => MCPLiveClient.generateText(params)
    };

    // Export to global scope
    global.ArcaneaMCP = MCPLiveClient;
    global.ArcaneaMCPTools = MCPTools;

    // Auto-initialize
    document.addEventListener('DOMContentLoaded', () => {
        MCPLiveClient.initialize();
    });

})(window);
