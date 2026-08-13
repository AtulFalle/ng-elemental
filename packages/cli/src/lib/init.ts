import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  CONFIG_FILENAME,
  DEFAULT_COMPONENTS_DIR,
  ensureComponentsDir,
  isAngularProject,
  readConfig,
  writeConfig,
} from './config';

export interface InitOptions {
  cwd: string;
  yes?: boolean;
}

export function initCommand(options: InitOptions): void {
  const { cwd } = options;

  if (!isAngularProject(cwd)) {
    throw new Error(
      'This does not look like an Angular project. Expected @angular/core in package.json, or angular.json / project.json.',
    );
  }

  const configPath = join(cwd, CONFIG_FILENAME);
  if (existsSync(configPath)) {
    const existing = readConfig(cwd);
    ensureComponentsDir(cwd, existing.componentsDir);
    console.log(`${CONFIG_FILENAME} already exists. Components directory: ${existing.componentsDir}`);
    return;
  }

  const config = { componentsDir: DEFAULT_COMPONENTS_DIR };
  writeConfig(cwd, config);
  ensureComponentsDir(cwd, config.componentsDir);
  console.log(`Created ${CONFIG_FILENAME}`);
  console.log(`Components directory: ${config.componentsDir}`);
}
