import {
  getCatalogEntry,
  listCatalog,
  readConfig,
  searchCatalog,
  toAppImportPath,
  type CatalogEntry,
  type ComponentKind,
  type ElementalConfig,
} from '@ng-elemental/cli';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadGuidelines } from './guidelines';

export function resolveCwd(cwd?: string): string {
  return cwd ?? process.cwd();
}

export function compactCatalog(entry: CatalogEntry): Record<string, unknown> {
  return {
    name: entry.name,
    title: entry.title,
    kind: entry.kind,
    description: entry.description,
    keywords: [...entry.keywords],
    selectors: [...entry.selectors],
    classNames: [...entry.classNames],
    docsPath: entry.docsPath,
    category: entry.category,
  };
}

export function searchComponents(query: string, kind?: ComponentKind): CatalogEntry[] {
  return searchCatalog(query, { kind });
}

export function listComponents(kind?: ComponentKind): CatalogEntry[] {
  return listCatalog({ kind });
}

export function formatWireIn(entry: CatalogEntry, importPath: string): string {
  const classList = entry.classNames.join(', ');
  const lines = [
    '## Wire it in',
    '',
    `import { ${classList} } from '${importPath}';`,
    '',
    `@Component({`,
    `  imports: [${classList}],`,
    `})`,
    '',
    entry.usage,
  ];
  if (entry.registryDependencies.length > 0) {
    lines.push('', `alsoAdd: ${entry.registryDependencies.join(', ')}`);
  }
  if (entry.npmDependencies.length > 0) {
    lines.push(`npmDependencies: ${entry.npmDependencies.join(', ')}`);
  }
  lines.push('', 'Follow NgElemental Design Guidelines (call get_guidelines).');
  return lines.join('\n');
}

export function describeComponent(name: string, cwd: string): string {
  const entry = getCatalogEntry(name);
  const config = tryReadConfig(cwd);
  const importPath = toAppImportPath(config?.componentsDir ?? 'src/app/ui', entry.name);
  const payload = {
    ...compactCatalog(entry),
    usage: entry.usage,
    registryDependencies: [...entry.registryDependencies],
    npmDependencies: [...entry.npmDependencies],
    importPath,
    componentsDir: config?.componentsDir ?? 'src/app/ui',
  };
  return `${JSON.stringify(payload, null, 2)}\n\n${formatWireIn(entry, importPath)}`;
}

export function getInstallInstructions(names: string[], cwd: string): string {
  if (names.length === 0) {
    throw new Error('Provide at least one component name.');
  }

  const config = tryReadConfig(cwd);
  const allDeps = collectRegistryDependencies(names);
  const npmDeps = new Set<string>();

  for (const name of [...names, ...allDeps]) {
    const entry = getCatalogEntry(name);
    for (const dep of entry.npmDependencies) {
      npmDeps.add(dep);
    }
  }

  const lines: string[] = [
    '## Installation Commands',
    '',
    'Ask the user to run the following commands in their terminal:',
    '',
  ];

  if (!config) {
    lines.push('```bash', '# Initialize NgElemental (creates elemental.json)', 'npx @ng-elemental/cli init', '```', '');
  }

  lines.push('```bash', `# Add component${names.length > 1 ? 's' : ''}`, `npx @ng-elemental/cli add ${names.join(' ')}`, '```');

  if (npmDeps.size > 0) {
    lines.push('', '```bash', '# Install required npm dependencies', `npm install ${[...npmDeps].join(' ')}`, '```');
  }

  lines.push('', '## After installation', '');
  for (const name of names) {
    const entry = getCatalogEntry(name);
    const importPath = toAppImportPath(config?.componentsDir ?? 'src/app/ui', entry.name);
    lines.push(formatWireIn(entry, importPath), '');
  }

  lines.push('> **Important**: Do NOT copy-paste component source files manually. Always use the CLI to ensure dependencies and configuration are handled correctly.');

  return lines.join('\n');
}

function resolveUiSourceDir(name: string): string | null {
  const candidates = [
    join(__dirname, 'ui-source', name),
    join(__dirname, '../ui-source', name),
    join(__dirname, '../../../../packages/ui/src/lib', name),
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) return dir;
  }
  return null;
}

export function getComponentSource(name: string): string {
  const entry = getCatalogEntry(name);
  const sourceDir = resolveUiSourceDir(name);

  if (!sourceDir) {
    return `Source files for "${name}" are not available in the MCP server context. Use get_component for metadata and usage instead.`;
  }

  const files = readdirSync(sourceDir).filter(
    (f) => /\.(ts|html|scss)$/.test(f) && !f.includes('.spec.') && !f.includes('.stories.'),
  );

  const sections: string[] = [`# ${entry.title} — Source Code\n`];

  for (const file of files.sort()) {
    const content = readFileSync(join(sourceDir, file), 'utf8');
    const ext = file.split('.').pop() ?? '';
    sections.push(`## ${file}\n\n\`\`\`${ext}\n${content}\n\`\`\`\n`);
  }

  return sections.join('\n');
}

export function getComponentExamples(name: string): string {
  const entry = getCatalogEntry(name);
  const sourceDir = resolveUiSourceDir(name);

  if (!sourceDir) {
    return `Examples for "${name}" are not available. Use the usage field from get_component instead.`;
  }

  const storyFiles = readdirSync(sourceDir).filter((f) => f.includes('.stories.'));

  if (storyFiles.length === 0) {
    return `# ${entry.title} — Examples\n\nNo Storybook stories found. Basic usage:\n\n\`\`\`html\n${entry.usage}\n\`\`\``;
  }

  const sections: string[] = [`# ${entry.title} — Examples (Storybook Stories)\n`];

  for (const file of storyFiles) {
    const content = readFileSync(join(sourceDir, file), 'utf8');
    sections.push(`## ${file}\n\n\`\`\`typescript\n${content}\n\`\`\`\n`);
  }

  return sections.join('\n');
}

export function guidelinesText(): string {
  return loadGuidelines();
}

function tryReadConfig(cwd: string): ElementalConfig | undefined {
  try {
    return readConfig(cwd);
  } catch {
    return undefined;
  }
}

function collectRegistryDependencies(names: string[]): string[] {
  const extras = new Set<string>();
  const visit = (name: string): void => {
    for (const dep of getCatalogEntry(name).registryDependencies) {
      if (!names.includes(dep) && !extras.has(dep)) {
        extras.add(dep);
        visit(dep);
      }
    }
  };
  for (const name of names) {
    visit(name);
  }
  return [...extras];
}
