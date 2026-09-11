import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function getRegistryRoot(): string {
  const here = registryDir();
  const bundled = join(here, 'registry');
  if (existsSync(bundled)) {
    return bundled;
  }

  const fromBuiltCli = join(here, '../../../../dist/packages/cli/registry');
  if (existsSync(fromBuiltCli)) {
    return fromBuiltCli;
  }

  return bundled;
}

export function getComponentRegistryDir(name: string): string {
  return join(getRegistryRoot(), name);
}

function registryDir(): string {
  try {
    // Direct eval sees CJS `__dirname`. In ESM it throws ReferenceError.
    const dir = eval('__dirname') as unknown;
    if (typeof dir === 'string' && dir.length > 0) {
      return dir;
    }
  } catch {
    // Vercel compiles this file as ESM.
  }
  return dirname(fileURLToPath(import.meta.url));
}
