import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function findRepoRoot(): string {
  let dir = process.cwd();
  while (!existsSync(join(dir, 'nx.json'))) {
    const parent = join(dir, '..');
    if (parent === dir) {
      return process.cwd();
    }
    dir = parent;
  }
  return dir;
}
