import { initCommand } from '@ng-elemental/cli';

export async function initProject(options: {
  cwd: string;
  path?: string;
  skipTheme?: boolean;
}): Promise<string> {
  const result = await initCommand({
    cwd: options.cwd,
    yes: true,
    path: options.path,
    skipTheme: options.skipTheme,
    quiet: true,
  });
  return JSON.stringify(result, null, 2);
}
