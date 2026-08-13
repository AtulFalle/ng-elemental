import { join } from 'node:path';

export function getRegistryRoot(): string {
  return join(__dirname, 'registry');
}

export function getComponentRegistryDir(name: string): string {
  return join(getRegistryRoot(), name);
}
