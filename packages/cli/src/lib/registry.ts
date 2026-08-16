import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function getRegistryRoot(): string {
  const bundled = join(__dirname, 'registry');
  if (existsSync(bundled)) {
    return bundled;
  }

  const fromBuiltCli = join(__dirname, '../../../../dist/packages/cli/registry');
  if (existsSync(fromBuiltCli)) {
    return fromBuiltCli;
  }

  return bundled;
}

export function getComponentRegistryDir(name: string): string {
  return join(getRegistryRoot(), name);
}
