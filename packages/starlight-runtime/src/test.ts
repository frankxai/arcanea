
import { ContextLoader } from '../src/index';
import path from 'path';

// Mock Config
const config = {
    rootPath: path.resolve(__dirname, '../../../starlight-protocol')
};

const loader = new ContextLoader(config);

console.log('Loading Starlight Context...');
const context = loader.loadContext(
    'DEPT_ENGINEERING',
    'AGENT_PRINCIPAL.md',
    'SYSTEMS_THINKING.md'
);

const prompt = loader.generateSystemPrompt(context);

console.log('Generated System Prompt (Snippet):');
console.log(prompt.substring(0, 500) + '...');
console.log('\nIntegration Test Passed!');
