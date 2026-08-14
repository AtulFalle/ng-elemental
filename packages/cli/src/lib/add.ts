import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  AVAILABLE_COMPONENTS,
  isRegistryFilenameAllowed,
  type AvailableComponent,
} from './component-registry';
import { readConfig } from './config';
import { getComponentRegistryDir } from './registry';

export { AVAILABLE_COMPONENTS, type AvailableComponent } from './component-registry';

const COMPONENT_EXAMPLES: Record<
  AvailableComponent,
  { className: string; usage: string }
> = {
  button: {
    className: 'ElButton',
    usage: '<el-button variant="primary">Save</el-button>',
  },
  label: {
    className: 'ElLabel',
    usage: '<el-label htmlFor="email" variant="default">Email</el-label>',
  },
  'segmented-button': {
    className: 'ElSegmentedButton, ElSegmentedButtonItem',
    usage: `<el-segmented-button [(value)]="view" ariaLabel="View mode">
  <el-segmented-button-item value="list">List</el-segmented-button-item>
  <el-segmented-button-item value="grid">Grid</el-segmented-button-item>
</el-segmented-button>`,
  },
};

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
  const example = COMPONENT_EXAMPLES[name as AvailableComponent];
  console.log(`Added ${name} to ${config.componentsDir}/${name}`);
  console.log('');
  console.log('Import it in your component:');
  console.log('');
  console.log(`  import { ${example.className} } from '${importPath}';`);
  console.log('');
  console.log('Then use:');
  console.log('');
  console.log(`  ${example.usage}`);
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

function toAppImportPath(componentsDir: string, componentName: string): string {
  const normalized = componentsDir.replace(/\\/g, '/').replace(/^src\/app\/?/, '');
  const relative = normalized
    ? `${normalized}/${componentName}/${componentName}`
    : `${componentName}/${componentName}`;
  return `./${relative}`;
}
