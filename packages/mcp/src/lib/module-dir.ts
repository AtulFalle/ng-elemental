import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Directory of the calling module.
 *
 * The CJS esbuild bundle (npx @ng-elemental/mcp) empties `import.meta`, so we
 * read `__dirname` there. The Vercel function compiles this file as ESM, where
 * `__dirname` is missing and `import.meta.url` is the real file URL.
 */
export function moduleDir(importMetaUrl: string): string {
  const cjsDir = readCjsDirname();
  if (cjsDir) {
    return cjsDir;
  }
  if (typeof importMetaUrl === 'string' && importMetaUrl.length > 0) {
    return dirname(fileURLToPath(importMetaUrl));
  }
  throw new Error('Cannot resolve module directory');
}

function readCjsDirname(): string | undefined {
  try {
    // Direct eval sees CJS `__dirname`. In ESM it throws ReferenceError.
    const dir = eval('__dirname') as unknown;
    return typeof dir === 'string' && dir.length > 0 ? dir : undefined;
  } catch {
    return undefined;
  }
}
