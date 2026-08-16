import {
  addCommand,
  copyRegistryComponent,
  getCatalogEntry,
  listCatalog,
  readConfig,
  searchCatalog,
  toAppImportPath,
  type AddResult,
  type CatalogEntry,
  type ComponentKind,
  type ElementalConfig,
} from '@ng-elemental/cli';
import { existsSync } from 'node:fs';
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

export function addComponents(options: {
  names: string[];
  force?: boolean;
  cwd: string;
}): string {
  const { names, force, cwd } = options;
  if (names.length === 0) {
    throw new Error('Provide at least one component name.');
  }

  const config = readConfig(cwd);
  const extras = collectRegistryDependencies(names);
  for (const dep of extras) {
    if (!existsSync(join(cwd, config.componentsDir, dep))) {
      copyRegistryComponent(cwd, dep, { skipIfExists: true });
    }
  }

  const results: AddResult[] = [];
  for (const name of names) {
    results.push(addCommand({ cwd, name, force, quiet: true }));
  }

  return results
    .map((result) => {
      const entry = getCatalogEntry(result.name);
      return [
        JSON.stringify(
          {
            name: result.name,
            destDir: result.destDir,
            importPath: result.importPath,
            classNames: result.classNames,
            files: result.files,
            warnings: result.warnings,
            alsoAdd: [...entry.registryDependencies],
            npmDependencies: [...entry.npmDependencies],
          },
          null,
          2,
        ),
        formatWireIn(entry, result.importPath),
      ].join('\n\n');
    })
    .join('\n\n---\n\n');
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
  for (const name of names) {
    for (const dep of getCatalogEntry(name).registryDependencies) {
      if (!names.includes(dep)) {
        extras.add(dep);
      }
    }
  }
  return [...extras];
}
