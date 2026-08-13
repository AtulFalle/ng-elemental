import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const CONFIG_FILENAME = 'elemental.json';
export const DEFAULT_COMPONENTS_DIR = 'src/app/ui';

export interface ElementalConfig {
  componentsDir: string;
}

export function isAngularProject(cwd: string): boolean {
  const packageJsonPath = join(cwd, 'package.json');
  if (existsSync(packageJsonPath)) {
    try {
      const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
      };
      if (pkg.dependencies?.['@angular/core'] || pkg.devDependencies?.['@angular/core']) {
        return true;
      }
    } catch {
      // Fall through to angular.json / project.json detection.
    }
  }

  return existsSync(join(cwd, 'angular.json')) || existsSync(join(cwd, 'project.json'));
}

export function readConfig(cwd: string): ElementalConfig {
  const configPath = join(cwd, CONFIG_FILENAME);
  if (!existsSync(configPath)) {
    throw new Error(
      `No ${CONFIG_FILENAME} found. Run \`npx @ng-elemental/cli init\` first.`,
    );
  }

  const parsed = JSON.parse(readFileSync(configPath, 'utf8')) as Partial<ElementalConfig>;
  if (!parsed.componentsDir || typeof parsed.componentsDir !== 'string') {
    throw new Error(
      `${CONFIG_FILENAME} is invalid. Expected a string "componentsDir" field.`,
    );
  }

  return { componentsDir: parsed.componentsDir };
}

export function writeConfig(cwd: string, config: ElementalConfig): void {
  writeFileSync(
    join(cwd, CONFIG_FILENAME),
    `${JSON.stringify(config, null, 2)}\n`,
    'utf8',
  );
}

export function ensureComponentsDir(cwd: string, componentsDir: string): void {
  mkdirSync(join(cwd, componentsDir), { recursive: true });
}
