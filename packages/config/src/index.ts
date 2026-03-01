import { z } from 'zod';

export const ArcanePlatformConfigSchema = z.object({
  app: z.object({
    name: z.string().default('Arcanea'),
    url: z.string().url().default('https://app.arcanea.ai'),
    environment: z.enum(['development', 'staging', 'production']).default('development'),
  }),
  database: z.object({
    supabaseUrl: z.string().url(),
    supabaseAnonKey: z.string(),
    supabaseServiceKey: z.string().optional(),
  }),
  auth: z.object({
    secret: z.string().min(32),
    providers: z.object({
      google: z.object({ clientId: z.string(), clientSecret: z.string() }).optional(),
      github: z.object({ clientId: z.string(), clientSecret: z.string() }).optional(),
    }).optional(),
  }),
  storage: z.object({
    provider: z.enum(['supabase', 'r2', 'vercel-blob']).default('supabase'),
    bucket: z.string().default('arcanea-files'),
  }),
  ai: z.object({
    defaultProvider: z.enum(['openai', 'anthropic', 'google', 'ollama', 'deepseek', 'groq', 'openrouter']).default('anthropic'),
    defaultModel: z.string().default('claude-sonnet-4-6'),
    apiKeys: z.record(z.string()).optional(),
  }),
  features: z.object({
    agentGroups: z.boolean().default(true),
    mcpHub: z.boolean().default(true),
    knowledgeBase: z.boolean().default(true),
    marketplace: z.boolean().default(false),
    gateway: z.boolean().default(false),
    cronJobs: z.boolean().default(true),
    voice: z.boolean().default(false),
  }),
});

export type ArcanePlatformConfig = z.infer<typeof ArcanePlatformConfigSchema>;

export function loadConfig(env: Record<string, string | undefined> = process.env): ArcanePlatformConfig {
  return ArcanePlatformConfigSchema.parse({
    app: {
      name: env.NEXT_PUBLIC_APP_NAME,
      url: env.NEXT_PUBLIC_APP_URL,
      environment: env.NODE_ENV,
    },
    database: {
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseServiceKey: env.SUPABASE_SERVICE_ROLE_KEY,
    },
    auth: {
      secret: env.AUTH_SECRET ?? env.BETTER_AUTH_SECRET ?? '',
    },
    storage: {
      provider: env.STORAGE_PROVIDER as 'supabase' | 'r2' | 'vercel-blob' | undefined,
      bucket: env.STORAGE_BUCKET,
    },
    ai: {
      defaultProvider: env.DEFAULT_AI_PROVIDER as ArcanePlatformConfig['ai']['defaultProvider'] | undefined,
      defaultModel: env.DEFAULT_AI_MODEL,
    },
    features: {
      agentGroups: env.FEATURE_AGENT_GROUPS !== 'false',
      mcpHub: env.FEATURE_MCP_HUB !== 'false',
      knowledgeBase: env.FEATURE_KNOWLEDGE_BASE !== 'false',
      marketplace: env.FEATURE_MARKETPLACE === 'true',
      gateway: env.FEATURE_GATEWAY === 'true',
      cronJobs: env.FEATURE_CRON_JOBS !== 'false',
      voice: env.FEATURE_VOICE === 'true',
    },
  });
}
