import * as readline from 'node:readline';

export async function promptSelect(
  question: string,
  options: Array<{ label: string; value: string; detected?: boolean }>,
): Promise<string> {
  console.log(`\n  ${question}`);
  options.forEach((opt, i) => {
    const detected = opt.detected ? ' (detected)' : '';
    console.log(`    ${i + 1}. ${opt.label}${detected}`);
  });

  const answer = await promptInput(`  Select (1-${options.length}): `);
  const index = parseInt(answer, 10) - 1;
  if (index >= 0 && index < options.length) return options[index].value;
  return options[0].value;
}

export async function promptMultiSelect(
  question: string,
  options: Array<{ label: string; value: string; detected?: boolean }>,
): Promise<string[]> {
  console.log(`\n  ${question}`);
  options.forEach((opt, i) => {
    const marker = opt.detected ? '\u2713' : ' ';
    console.log(`    [${marker}] ${i + 1}. ${opt.label}${opt.detected ? ' (detected)' : ''}`);
  });

  const answer = await promptInput('  Select (comma-separated, e.g. 1,3): ');
  const indices = answer.split(',').map(s => parseInt(s.trim(), 10) - 1);
  return indices.filter(i => i >= 0 && i < options.length).map(i => options[i].value);
}

export async function promptInput(prompt: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

export async function promptPassword(prompt: string): Promise<string> {
  // For API keys — mask input
  return promptInput(prompt);
}

export async function promptConfirm(question: string, defaultValue = true): Promise<boolean> {
  const suffix = defaultValue ? ' (Y/n): ' : ' (y/N): ';
  const answer = await promptInput(`  ${question}${suffix}`);
  if (!answer) return defaultValue;
  return answer.toLowerCase().startsWith('y');
}
