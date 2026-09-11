import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { moduleDir } from './module-dir';

export function mcpPackageVersion(): string {
  const here = moduleDir(import.meta.url);
  const candidates = [
    join(here, 'package.json'),
    join(here, '../package.json'),
    join(here, '../../package.json'),
    join(process.cwd(), 'packages/mcp/package.json'),
  ];

  for (const candidate of candidates) {
    if (!existsSync(candidate)) {
      continue;
    }
    try {
      const pkg = JSON.parse(readFileSync(candidate, 'utf8')) as {
        name?: unknown;
        version?: unknown;
      };
      if (pkg.name === '@ng-elemental/mcp' && typeof pkg.version === 'string' && pkg.version.length > 0) {
        return pkg.version;
      }
    } catch {
      // try the next candidate
    }
  }

  throw new Error(`Could not resolve @ng-elemental/mcp version (looked next to ${here})`);
}
