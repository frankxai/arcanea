
import { StarlightRuntime } from '../src/index';
import path from 'path';

// Mock Config
const config = {
    rootPath: path.resolve(__dirname, '../../../starlight-protocol')
};

const runtime = new StarlightRuntime(config);

console.log('🤖 Loading Starlight Context...');
const context = runtime.loadContext(
    'DEPT_ENGINEERING',
    'AGENT_PRINCIPAL.md',
    'SYSTEMS_THINKING.md'
);

const prompt = runtime.generateSystemPrompt(context);

console.log('✅ Generated System Prompt (Snippet):');
console.log(prompt.substring(0, 500) + '...');
console.log('\n✨ Integration Test Passed!');
