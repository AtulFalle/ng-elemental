import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { readConfig } from './config';
import { getComponentRegistryDir } from './registry';

export const AVAILABLE_COMPONENTS = ['button'] as const;
export type AvailableComponent = (typeof AVAILABLE_COMPONENTS)[number];

export interface AddOptions {
  cwd: string;
  name: string;
  force?: boolean;
}

export function addCommand(options: AddOptions): void {
  const { cwd, name, force } = options;
  if (!AVAILABLE_COMPONENTS.includes(name as AvailableComponent)) {
    throw new Error(
      `Unknown component "${name}". Available: ${AVAILABLE_COMPONENTS.join(', ')}`,
    );
  }

  const config = readConfig(cwd);
  const destDir = join(cwd, config.componentsDir, name);
  if (existsSync(destDir) && !force) {
    throw new Error(
      `${config.componentsDir}/${name} already exists. Use --force to overwrite.`,
    );
  }

  const srcDir = getComponentRegistryDir(name);
  if (!existsSync(srcDir)) {
    throw new Error(
      `Registry is missing component "${name}". Rebuild or reinstall @ng-elemental/cli.`,
    );
  }

  copyComponentFiles(srcDir, destDir);

  const importPath = toAppImportPath(config.componentsDir, name);
  console.log(`Added ${name} to ${config.componentsDir}/${name}`);
  console.log('');
  console.log('Import it in your component:');
  console.log('');
  console.log(`  import { ElButton } from '${importPath}';`);
  console.log('');
  console.log('Then use:');
  console.log('');
  console.log('  <el-button variant="primary">Save</el-button>');
}

function copyComponentFiles(srcDir: string, destDir: string): void {
  mkdirSync(destDir, { recursive: true });
  for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
    if (!entry.isFile() || entry.name.includes('.stories.')) {
      continue;
    }
    copyFileSync(join(srcDir, entry.name), join(destDir, entry.name));
  }
}

function toAppImportPath(componentsDir: string, componentName: string): string {
  const normalized = componentsDir.replace(/\\/g, '/').replace(/^src\/app\/?/, '');
  const relative = normalized
    ? `${normalized}/${componentName}/${componentName}`
    : `${componentName}/${componentName}`;
  return `./${relative}`;
}
