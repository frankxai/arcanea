import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file at the project root
dotenv.config({ path: path.resolve(process.cwd(), '../../../.env') });

export const config = {
  // API keys
  claudeApiKey: process.env.CLAUDE_API_KEY || '',
  
  // API endpoints
  claudeApiEndpoint: 'https://api.anthropic.com/v1/messages',
  
  // Default models
  defaultModel: 'claude-4-sonnet',
  
  // Thread-specific settings
  threadSettings: {
    obsidian: {
      model: 'claude-4-sonnet',
      temperature: 0.7,
      maxTokens: 1000,
    },
    flame: {
      model: 'claude-4-sonnet',
      temperature: 0.8,
      maxTokens: 800,
    },
    solar: {
      model: 'claude-4-sonnet',
      temperature: 0.7,
      maxTokens: 1200,
    },
    verdant: {
      model: 'claude-4-sonnet',
      temperature: 0.6,
      maxTokens: 600,
    },
    sonic: {
      model: 'claude-4-sonnet',
      temperature: 0.7,
      maxTokens: 800,
    },
    dream: {
      model: 'claude-4-sonnet',
      temperature: 0.9,
      maxTokens: 1000,
    },
    crown: {
      model: 'claude-4-sonnet',
      temperature: 0.7,
      maxTokens: 1200,
    },
    infinity: {
      model: 'claude-4-sonnet',
      temperature: 0.8,
      maxTokens: 1000,
    },
    unity: {
      model: 'claude-4-sonnet',
      temperature: 0.6,
      maxTokens: 1000,
    },
    architect: {
      model: 'claude-4-sonnet',
      temperature: 0.7,
      maxTokens: 1500,
    },
  }
};
