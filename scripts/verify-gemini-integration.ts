/**
 * Gemini Integration Verification Script
 * Tests all components of the Gemini integration
 */

import {
  createGeminiChatProvider,
  createImagenProvider,
  createVeoProvider,
  createUnifiedProvider,
} from '../packages/ai-core/providers';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'skip';
  duration?: number;
  error?: string;
  details?: any;
}

const results: TestResult[] = [];

async function test(name: string, fn: () => Promise<any>): Promise<void> {
  const start = Date.now();
  console.log(`\n🧪 Testing: ${name}...`);

  try {
    const result = await fn();
    const duration = Date.now() - start;

    results.push({
      name,
      status: 'pass',
      duration,
      details: result,
    });

    console.log(`✅ PASS: ${name} (${duration}ms)`);
  } catch (error) {
    const duration = Date.now() - start;

    results.push({
      name,
      status: 'fail',
      duration,
      error: error instanceof Error ? error.message : String(error),
    });

    console.log(`❌ FAIL: ${name} (${duration}ms)`);
    console.error(error);
  }
}

async function runTests() {
  console.log('🚀 Starting Gemini Integration Verification...\n');
  console.log('=' .repeat(60));

  // Check environment variables
  await test('Environment Variables', async () => {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY or GOOGLE_API_KEY not set');
    }
    return { apiKeySet: true };
  });

  // Test Chat Provider
  await test('Chat Provider: Initialization', async () => {
    const gemini = createGeminiChatProvider();
    return { provider: gemini.name, model: gemini.model };
  });

  await test('Chat Provider: Simple Chat', async () => {
    const gemini = createGeminiChatProvider();
    const response = await gemini.chat('Say "Hello" in exactly one word.');

    if (!response.text) {
      throw new Error('No text in response');
    }

    return {
      text: response.text,
      cost: response.cost,
      tokensUsed: response.tokensUsed,
    };
  });

  await test('Chat Provider: Streaming', async () => {
    const gemini = createGeminiChatProvider();
    let chunks = 0;
    let text = '';

    for await (const chunk of gemini.streamText('Count from 1 to 3.')) {
      chunks++;
      text += chunk;
    }

    if (chunks === 0) {
      throw new Error('No chunks received');
    }

    return { chunks, text };
  });

  await test('Chat Provider: System Prompt', async () => {
    const gemini = createGeminiChatProvider();
    const response = await gemini.chat('What are you?', {
      systemPrompt: 'You are a dragon expert from the Draconic Academy.',
    });

    return { text: response.text.substring(0, 100) };
  });

  await test('Chat Provider: Session', async () => {
    const gemini = createGeminiChatProvider();
    const session = gemini.startSession({
      systemPrompt: 'You are a helpful assistant.',
    });

    await session.sendMessage('My name is Frank.');
    const response = await session.sendMessage('What is my name?');

    return { text: response.text };
  });

  // Test Image Provider
  await test('Image Provider: Initialization', async () => {
    const imagen = createImagenProvider();
    return { provider: imagen.name, model: imagen.model };
  });

  // Skip actual image generation in tests (costs money)
  console.log('\n⏭️  Skipping Image Generation (costs $0.04)');
  results.push({
    name: 'Image Provider: Generation',
    status: 'skip',
  });

  // Test Video Provider
  await test('Video Provider: Initialization', async () => {
    const veo = createVeoProvider();
    return { provider: veo.name, model: veo.model };
  });

  // Skip actual video generation in tests (costs $6.00)
  console.log('\n⏭️  Skipping Video Generation (costs $6.00)');
  results.push({
    name: 'Video Provider: Generation',
    status: 'skip',
  });

  // Test Unified Provider
  await test('Unified Provider: Initialization', async () => {
    const ai = createUnifiedProvider({
      maxConcurrentRequests: 5,
    });

    const stats = ai.getUsageStats();
    const queue = ai.getQueueStatus();

    return {
      stats,
      queue,
      chatEnabled: true,
      imagesEnabled: true,
      videosEnabled: true,
    };
  });

  await test('Unified Provider: Chat', async () => {
    const ai = createUnifiedProvider();
    const response = await ai.chat('Say hello in one word.');

    return {
      text: response.text,
      cost: response.cost,
    };
  });

  await test('Unified Provider: Usage Stats', async () => {
    const ai = createUnifiedProvider();
    await ai.chat('Hello');
    const stats = ai.getUsageStats();

    if (stats.totalRequests === 0) {
      throw new Error('No requests tracked');
    }

    return stats;
  });

  await test('Unified Provider: Queue Management', async () => {
    const ai = createUnifiedProvider({
      maxConcurrentRequests: 2,
    });

    const status = ai.getQueueStatus();

    return {
      maxConcurrent: status.maxConcurrent,
      activeJobs: status.activeJobs,
      queuedJobs: status.queuedJobs,
    };
  });

  // Test Streaming Utilities
  await test('Streaming: SSE Response Creation', async () => {
    const { createStreamResponse } = await import('../packages/ai-core/streaming');

    async function* generator() {
      yield 'Hello ';
      yield 'World';
    }

    const stream = createStreamResponse(generator());

    if (!stream) {
      throw new Error('Stream not created');
    }

    return { created: true };
  });

  // Print Results
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Test Results:\n');

  const passed = results.filter((r) => r.status === 'pass').length;
  const failed = results.filter((r) => r.status === 'fail').length;
  const skipped = results.filter((r) => r.status === 'skip').length;
  const total = results.length;

  console.log(`✅ Passed:  ${passed}/${total}`);
  console.log(`❌ Failed:  ${failed}/${total}`);
  console.log(`⏭️  Skipped: ${skipped}/${total}`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed! Integration is ready.');
  } else {
    console.log('\n⚠️  Some tests failed. Check errors above.');
  }

  // Detailed results
  console.log('\n📋 Detailed Results:\n');
  results.forEach((r) => {
    const icon = r.status === 'pass' ? '✅' : r.status === 'skip' ? '⏭️' : '❌';
    const duration = r.duration ? ` (${r.duration}ms)` : '';
    console.log(`${icon} ${r.name}${duration}`);

    if (r.error) {
      console.log(`   Error: ${r.error}`);
    }
  });

  console.log('\n' + '='.repeat(60));

  // Exit with appropriate code
  process.exit(failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch((error) => {
  console.error('Fatal error running tests:', error);
  process.exit(1);
});
