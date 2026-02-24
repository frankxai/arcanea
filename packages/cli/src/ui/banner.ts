import pc from 'picocolors';

export function printBanner(): void {
  const banner = `
${pc.cyan('  ╭──────────────────────────────────────╮')}
${pc.cyan('  │')}                                      ${pc.cyan('│')}
${pc.cyan('  │')}   ${pc.bold(pc.white('A R C A N E A'))}                      ${pc.cyan('│')}
${pc.cyan('  │')}   ${pc.dim('Imagine a Good Future. Build It.')}   ${pc.cyan('│')}
${pc.cyan('  │')}                                      ${pc.cyan('│')}
${pc.cyan('  ╰──────────────────────────────────────╯')}
`;
  console.log(banner);
}

export function printSuccess(message: string): void {
  console.log(`  ${pc.green('\u2713')} ${message}`);
}

export function printError(message: string): void {
  console.log(`  ${pc.red('\u2717')} ${message}`);
}

export function printInfo(message: string): void {
  console.log(`  ${pc.cyan('\u2192')} ${message}`);
}

export function printWarning(message: string): void {
  console.log(`  ${pc.yellow('!')} ${message}`);
}

export function printDivider(): void {
  console.log(pc.dim('  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500'));
}
