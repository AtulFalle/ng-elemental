import { createInterface } from 'node:readline/promises';

export function isInteractive(yes?: boolean): boolean {
  return Boolean(process.stdin.isTTY) && !yes;
}

export async function promptText(
  question: string,
  defaultValue: string,
  interactive: boolean,
): Promise<string> {
  if (!interactive) {
    return defaultValue;
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await rl.question(`${question} (${defaultValue}): `);
    return answer.trim() || defaultValue;
  } finally {
    rl.close();
  }
}

export async function promptYesNo(
  question: string,
  defaultYes: boolean,
  interactive: boolean,
): Promise<boolean> {
  if (!interactive) {
    return defaultYes;
  }

  const hint = defaultYes ? 'Y/n' : 'y/N';
  const answer = await promptText(`${question} [${hint}]`, defaultYes ? 'y' : 'n', true);
  const normalized = answer.trim().toLowerCase();
  if (normalized === 'y' || normalized === 'yes') {
    return true;
  }
  if (normalized === 'n' || normalized === 'no') {
    return false;
  }
  return defaultYes;
}
