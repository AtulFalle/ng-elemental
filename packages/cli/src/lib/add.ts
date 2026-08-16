import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { getCatalogEntry } from './catalog';
import { isRegistryFilenameAllowed } from './component-registry';
import { readConfig } from './config';
import { getComponentRegistryDir } from './registry';

export interface AddOptions {
  cwd: string;
  name: string;
  force?: boolean;
  quiet?: boolean;
}

export interface CopyRegistryOptions {
  force?: boolean;
  skipIfExists?: boolean;
}

export interface AddResult {
  name: string;
  destDir: string;
  importPath: string;
  classNames: string[];
  usage: string;
  files: string[];
  warnings: string[];
}

export function addCommand(options: AddOptions): AddResult {
  const { cwd, name, force, quiet } = options;
  const entry = getCatalogEntry(name);
  const config = readConfig(cwd);
  const destDir = `${config.componentsDir}/${name}`;
  const warnings: string[] = [];

  if (name !== 'theme' && !existsSync(join(cwd, config.componentsDir, 'theme'))) {
    const warning =
      'Warning: theme is not installed. Widgets will look unstyled. Run `npx @ng-elemental/cli add theme` or re-run init.';
    warnings.push(warning);
    if (!quiet) {
      console.warn(warning);
    }
  }

  copyRegistryComponent(cwd, name, { force });

  const importPath = toAppImportPath(config.componentsDir, name);
  const files = listCopiedFiles(join(cwd, destDir));
  const classNames = [...entry.classNames];

  if (!quiet) {
    console.log(`Added ${name} to ${destDir}`);
    console.log('');
    console.log('Import it in your component:');
    console.log('');
    console.log(`  import { ${classNames.join(', ')} } from '${importPath}';`);
    console.log('');
    console.log('Then use:');
    console.log('');
    console.log(`  ${entry.usage}`);
  }

  return {
    name,
    destDir,
    importPath,
    classNames,
    usage: entry.usage,
    files,
    warnings,
  };
}

export function copyRegistryComponent(
  cwd: string,
  name: string,
  options: CopyRegistryOptions = {},
): boolean {
  const config = readConfig(cwd);
  const destDir = join(cwd, config.componentsDir, name);
  if (existsSync(destDir)) {
    if (options.skipIfExists) {
      return false;
    }
    if (!options.force) {
      throw new Error(
        `${config.componentsDir}/${name} already exists. Use --force to overwrite.`,
      );
    }
  }

  const srcDir = getComponentRegistryDir(name);
  if (!existsSync(srcDir)) {
    throw new Error(
      `Registry is missing component "${name}". Rebuild or reinstall @ng-elemental/cli.`,
    );
  }

  copyComponentFiles(srcDir, destDir);
  return true;
}

function copyComponentFiles(srcDir: string, destDir: string): void {
  mkdirSync(destDir, { recursive: true });
  for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
    if (!entry.isFile() || !isRegistryFilenameAllowed(entry.name)) {
      continue;
    }
    copyFileSync(join(srcDir, entry.name), join(destDir, entry.name));
  }
}

export function toAppImportPath(componentsDir: string, componentName: string): string {
  const normalized = componentsDir.replace(/\\/g, '/').replace(/^src\/app\/?/, '');
  const relative = normalized
    ? `${normalized}/${componentName}/${componentName}`
    : `${componentName}/${componentName}`;
  return `./${relative}`;
}

function listCopiedFiles(destDir: string): string[] {
  if (!existsSync(destDir)) {
    return [];
  }
  return readdirSync(destDir)
    .filter((filename) => isRegistryFilenameAllowed(filename))
    .sort();
}
