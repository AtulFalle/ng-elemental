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
}

export async function initCommand(options: InitOptions): Promise<void> {
  const { cwd } = options;

  if (!isAngularProject(cwd)) {
    throw new Error(
      'This does not look like an Angular project. Expected @angular/core in package.json, or angular.json / project.json.',
    );
  }

  const interactive = isInteractive(options.yes);
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

  if (!existing) {
    writeConfig(cwd, { componentsDir });
    ensureComponentsDir(cwd, componentsDir);
    console.log(`Created ${CONFIG_FILENAME}`);
    console.log(`Components directory: ${componentsDir}`);
  } else {
    ensureComponentsDir(cwd, existing.componentsDir);
    console.log(`${CONFIG_FILENAME} already exists. Components directory: ${existing.componentsDir}`);
  }

  const installTheme = options.skipTheme
    ? false
    : await promptYesNo('Install theme tokens now? (recommended)', true, interactive);

  if (!installTheme) {
    console.log('Skipped theme. Run `npx @ng-elemental/cli add theme` later to copy tokens.');
    return;
  }

  const copied = copyRegistryComponent(cwd, 'theme', { skipIfExists: true });
  if (copied) {
    console.log(`Added theme to ${componentsDir}/theme`);
  } else {
    console.log(`Theme already installed at ${componentsDir}/theme`);
  }

  const detected = options.styles ?? detectStylesPath(cwd);
  const stylesPath =
    options.styles ??
    (detected ? await promptText('Global stylesheet to import tokens', detected, interactive) : undefined);

  if (stylesPath && existsSync(join(cwd, stylesPath))) {
    const patched = patchStylesFile(cwd, stylesPath, componentsDir);
    if (patched) {
      console.log(`Updated ${stylesPath} with theme tokens`);
    }
  } else {
    printStylesSnippet(cwd, componentsDir);
  }

  printThemeNextSteps(componentsDir);
}

function printStylesSnippet(cwd: string, componentsDir: string): void {
  const usePath = toTokensUsePath(join(cwd, 'src/styles.scss'), join(cwd, componentsDir));
  console.log('No global stylesheet found. Add this to your styles file (for example src/styles.scss):');
  console.log(buildStylesSnippet(usePath));
}

function printThemeNextSteps(componentsDir: string): void {
  console.log('');
  console.log('Next steps:');
  console.log(`  1. Edit the BRAND block in ${componentsDir}/theme/tokens.scss`);
  console.log("  2. Optional dark mode: provideElTheme({ mode: 'light' }) in app.config.ts");
  console.log('  3. Add components: npx @ng-elemental/cli add button');
}
