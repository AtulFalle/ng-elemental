import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { copyRegistryComponent } from './add';
import {
  CONFIG_FILENAME,
  DEFAULT_COMPONENTS_DIR,
  ensureComponentsDir,
  isAngularProject,
  readConfig,
  writeConfig,
} from './config';
import { isInteractive, promptText, promptYesNo } from './prompt';
import { buildStylesSnippet, detectStylesPath, patchStylesFile, toTokensUsePath } from './styles';

export interface InitOptions {
  cwd: string;
  yes?: boolean;
  path?: string;
  skipTheme?: boolean;
  styles?: string;
  quiet?: boolean;
}

export interface InitResult {
  componentsDir: string;
  createdConfig: boolean;
  themeInstalled: boolean;
  stylesPath?: string;
  stylesPatched: boolean;
}

export async function initCommand(options: InitOptions): Promise<InitResult> {
  const { cwd, quiet } = options;
  const log = (...args: unknown[]): void => {
    if (!quiet) {
      console.log(...args);
    }
  };

  if (!isAngularProject(cwd)) {
    throw new Error(
      'This does not look like an Angular project. Expected @angular/core in package.json, or angular.json / project.json.',
    );
  }

  const interactive = isInteractive(options.yes) && !quiet;
  const configPath = join(cwd, CONFIG_FILENAME);
  const existing = existsSync(configPath) ? readConfig(cwd) : undefined;

  const componentsDir =
    existing?.componentsDir ??
    options.path ??
    (await promptText(
      'Components directory (where El* source will be copied)',
      DEFAULT_COMPONENTS_DIR,
      interactive,
    ));

  const createdConfig = !existing;
  if (!existing) {
    writeConfig(cwd, { componentsDir });
    ensureComponentsDir(cwd, componentsDir);
    log(`Created ${CONFIG_FILENAME}`);
    log(`Components directory: ${componentsDir}`);
  } else {
    ensureComponentsDir(cwd, existing.componentsDir);
    log(`${CONFIG_FILENAME} already exists. Components directory: ${existing.componentsDir}`);
  }

  const installTheme = options.skipTheme
    ? false
    : await promptYesNo('Install theme tokens now? (recommended)', true, interactive);

  if (!installTheme) {
    log('Skipped theme. Run `npx @ng-elemental/cli add theme` later to copy tokens.');
    return {
      componentsDir,
      createdConfig,
      themeInstalled: existsSync(join(cwd, componentsDir, 'theme')),
      stylesPatched: false,
    };
  }

  const copied = copyRegistryComponent(cwd, 'theme', { skipIfExists: true });
  if (copied) {
    log(`Added theme to ${componentsDir}/theme`);
  } else {
    log(`Theme already installed at ${componentsDir}/theme`);
  }

  const detected = options.styles ?? detectStylesPath(cwd);
  const stylesPath =
    options.styles ??
    (detected ? await promptText('Global stylesheet to import tokens', detected, interactive) : undefined);

  let stylesPatched = false;
  if (stylesPath && existsSync(join(cwd, stylesPath))) {
    stylesPatched = patchStylesFile(cwd, stylesPath, componentsDir);
    if (stylesPatched) {
      log(`Updated ${stylesPath} with theme tokens`);
    }
  } else {
    printStylesSnippet(cwd, componentsDir, log);
  }

  printThemeNextSteps(componentsDir, log);

  return {
    componentsDir,
    createdConfig,
    themeInstalled: true,
    stylesPath,
    stylesPatched,
  };
}

function printStylesSnippet(
  cwd: string,
  componentsDir: string,
  log: (...args: unknown[]) => void,
): void {
  const usePath = toTokensUsePath(join(cwd, 'src/styles.scss'), join(cwd, componentsDir));
  log('No global stylesheet found. Add this to your styles file (for example src/styles.scss):');
  log(buildStylesSnippet(usePath));
}

function printThemeNextSteps(
  componentsDir: string,
  log: (...args: unknown[]) => void,
): void {
  log('');
  log('Next steps:');
  log(`  1. Edit the BRAND block in ${componentsDir}/theme/tokens.scss`);
  log("  2. Optional dark mode: provideElTheme({ mode: 'light' }) in app.config.ts");
  log('  3. Add components: npx @ng-elemental/cli add button');
}
