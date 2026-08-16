import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

export const STYLES_SNIPPET_MARKER = 'theme/tokens';

export function detectStylesPath(cwd: string): string | undefined {
  const candidates = ['src/styles.scss', 'src/styles.css'];
  for (const candidate of candidates) {
    if (existsSync(join(cwd, candidate))) {
      return candidate;
    }
  }
  return detectStylesFromProjectConfig(cwd);
}

function detectStylesFromProjectConfig(cwd: string): string | undefined {
  for (const file of ['angular.json', 'project.json']) {
    const full = join(cwd, file);
    if (!existsSync(full)) {
      continue;
    }

    try {
      const parsed = JSON.parse(readFileSync(full, 'utf8')) as unknown;
      const styles = findStylesArray(parsed);
      const first = styles?.find((entry) => typeof entry === 'string');
      if (typeof first === 'string' && existsSync(join(cwd, first))) {
        return first;
      }
    } catch {
      // Ignore malformed project config and keep looking.
    }
  }

  return undefined;
}

function findStylesArray(value: unknown): unknown[] | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  if (Array.isArray(record['styles'])) {
    return record['styles'];
  }

  for (const nested of Object.values(record)) {
    const found = findStylesArray(nested);
    if (found) {
      return found;
    }
  }

  return undefined;
}

export function toTokensUsePath(stylesFileAbs: string, componentsDirAbs: string): string {
  const to = join(componentsDirAbs, 'theme', 'tokens');
  let rel = relative(dirname(stylesFileAbs), to).replace(/\\/g, '/');
  if (!rel.startsWith('.')) {
    rel = `./${rel}`;
  }
  return rel;
}

export function buildStylesSnippet(usePath: string): string {
  return `
@use '${usePath}';

// Typography: widgets use inherit / system fonts.
// Load your brand typeface (Google Fonts, @fontsource, self-hosted), then:
// :root {
//   --el-font-sans: 'Inter', system-ui, sans-serif;
//   --el-font-mono: 'JetBrains Mono', ui-monospace, monospace;
// }
`;
}

export function patchStylesFile(
  cwd: string,
  stylesRelativePath: string,
  componentsDir: string,
): boolean {
  const stylesAbs = join(cwd, stylesRelativePath);
  if (!existsSync(stylesAbs)) {
    return false;
  }

  const existing = readFileSync(stylesAbs, 'utf8');
  if (existing.includes(STYLES_SNIPPET_MARKER)) {
    return false;
  }

  const usePath = toTokensUsePath(stylesAbs, join(cwd, componentsDir));
  writeFileSync(stylesAbs, `${existing.trimEnd()}\n${buildStylesSnippet(usePath)}`, 'utf8');
  return true;
}
