import { execFileSync, execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { cp, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateBuiltRegistry } from '../lib/registry-validation';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../../../..');
const fixtureDir = join(repoRoot, 'e2e/fixtures/consumer-app');
const registryUrlFile = join(repoRoot, 'tmp/local-registry/registry-url.txt');

function localRegistryUrl(): string {
  const fromEnv = process.env['npm_config_registry'];
  if (fromEnv && !fromEnv.includes('registry.npmjs.org')) {
    return fromEnv;
  }
  if (existsSync(registryUrlFile)) {
    return readFileSync(registryUrlFile, 'utf8').trim();
  }
  return 'http://localhost:4873';
}

function run(command: string, args: string[], cwd: string): string {
  try {
    return execFileSync(command, args, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    });
  } catch (error) {
    const err = error as { stdout?: string; stderr?: string; message: string };
    throw new Error(
      `${command} ${args.join(' ')} failed\n${err.stdout ?? ''}\n${err.stderr ?? err.message}`,
    );
  }
}

function npmInstall(args: string[], cwd: string): string {
  const command = ['npm', ...args].map((arg) => (arg.includes(' ') ? `"${arg}"` : arg)).join(' ');
  try {
    return execSync(command, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    });
  } catch (error) {
    const err = error as { stdout?: string; stderr?: string; message: string };
    throw new Error(
      `${command} failed\n${err.stdout ?? ''}\n${err.stderr ?? err.message}`,
    );
  }
}

function expectValidInstalledRegistry(installedRoot: string): void {
  const errors = validateBuiltRegistry(join(installedRoot, 'registry'));
  expect(errors, errors.join('\n')).toEqual([]);
}

describe('add button e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElButton', async () => {
    const registry = localRegistryUrl();
    const tmp = await mkdtemp(join(tmpdir(), 'ng-elemental-e2e-'));

    try {
      await cp(fixtureDir, tmp, { recursive: true });

      npmInstall(
        ['install', '@ng-elemental/cli@e2e', '--registry', registry, '--no-fund', '--no-audit'],
        tmp,
      );

      const installedRoot = join(tmp, 'node_modules/@ng-elemental/cli');
      const cliBin = join(installedRoot, 'index.cjs');
      expect(existsSync(cliBin), `Installed CLI missing at ${cliBin}`).toBe(true);
      expectValidInstalledRegistry(installedRoot);

      const installedPkg = JSON.parse(await readFile(join(installedRoot, 'package.json'), 'utf8')) as {
        name?: string;
        bin?: Record<string, string>;
        dependencies?: Record<string, string>;
      };
      expect(installedPkg.name).toBe('@ng-elemental/cli');
      expect(installedPkg.bin?.['ng-elemental']).toBe('./index.cjs');
      expect(installedPkg.dependencies?.['@angular/core']).toBeUndefined();

      run(process.execPath, [cliBin, 'init', '--yes'], tmp);

      const config = JSON.parse(await readFile(join(tmp, 'elemental.json'), 'utf8')) as {
        componentsDir: string;
      };
      expect(config.componentsDir).toBe('src/app/ui');

      run(process.execPath, [cliBin, 'add', 'button'], tmp);

      const buttonTs = await readFile(join(tmp, 'src/app/ui/button/button.ts'), 'utf8');
      expect(buttonTs).toContain("selector: 'el-button'");
      expect(buttonTs).toContain('export class ElButton');

      const buttonHtml = await readFile(join(tmp, 'src/app/ui/button/button.html'), 'utf8');
      expect(buttonHtml).toContain('el-button');
      expect(buttonHtml).toContain('<ng-content');

      const buttonScss = await readFile(join(tmp, 'src/app/ui/button/button.scss'), 'utf8');
      expect(buttonScss).toContain('.el-button');
      expect(buttonScss).toContain('--el-font-sans');

      expect(existsSync(join(tmp, 'src/app/ui/button/button.stories.ts'))).toBe(false);
    } finally {
      await rm(tmp, { recursive: true, force: true });
    }
  });
});

describe('add label e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElLabel', async () => {
    const registry = localRegistryUrl();
    const tmp = await mkdtemp(join(tmpdir(), 'ng-elemental-e2e-'));

    try {
      await cp(fixtureDir, tmp, { recursive: true });

      npmInstall(
        ['install', '@ng-elemental/cli@e2e', '--registry', registry, '--no-fund', '--no-audit'],
        tmp,
      );

      const installedRoot = join(tmp, 'node_modules/@ng-elemental/cli');
      const cliBin = join(installedRoot, 'index.cjs');
      expect(existsSync(cliBin), `Installed CLI missing at ${cliBin}`).toBe(true);
      expectValidInstalledRegistry(installedRoot);

      run(process.execPath, [cliBin, 'init', '--yes'], tmp);
      run(process.execPath, [cliBin, 'add', 'label'], tmp);

      const labelTs = await readFile(join(tmp, 'src/app/ui/label/label.ts'), 'utf8');
      expect(labelTs).toContain("selector: 'el-label'");
      expect(labelTs).toContain('export class ElLabel');
      expect(labelTs).toContain("ElLabelVariant = 'default' | 'muted' | 'error'");

      const labelHtml = await readFile(join(tmp, 'src/app/ui/label/label.html'), 'utf8');
      expect(labelHtml).toContain('el-label');
      expect(labelHtml).toContain('<ng-content');
      expect(labelHtml).toContain('[attr.for]');

      const labelScss = await readFile(join(tmp, 'src/app/ui/label/label.scss'), 'utf8');
      expect(labelScss).toContain('.el-label');
      expect(labelScss).toContain('--el-font-sans');

      expect(existsSync(join(tmp, 'src/app/ui/label/label.stories.ts'))).toBe(false);
    } finally {
      await rm(tmp, { recursive: true, force: true });
    }
  });
});

describe('add checkbox e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElCheckbox', async () => {
    const registry = localRegistryUrl();
    const tmp = await mkdtemp(join(tmpdir(), 'ng-elemental-e2e-'));

    try {
      await cp(fixtureDir, tmp, { recursive: true });

      npmInstall(
        ['install', '@ng-elemental/cli@e2e', '--registry', registry, '--no-fund', '--no-audit'],
        tmp,
      );

      const installedRoot = join(tmp, 'node_modules/@ng-elemental/cli');
      const cliBin = join(installedRoot, 'index.cjs');
      expect(existsSync(cliBin), `Installed CLI missing at ${cliBin}`).toBe(true);
      expectValidInstalledRegistry(installedRoot);

      run(process.execPath, [cliBin, 'init', '--yes'], tmp);
      run(process.execPath, [cliBin, 'add', 'checkbox'], tmp);

      const checkboxTs = await readFile(join(tmp, 'src/app/ui/checkbox/checkbox.ts'), 'utf8');
      expect(checkboxTs).toContain("selector: 'el-checkbox'");
      expect(checkboxTs).toContain('export class ElCheckbox');
      expect(checkboxTs).toContain("ElCheckboxLabelPosition = 'left' | 'right'");

      const checkboxHtml = await readFile(join(tmp, 'src/app/ui/checkbox/checkbox.html'), 'utf8');
      expect(checkboxHtml).toContain('el-checkbox');
      expect(checkboxHtml).toContain('<ng-content');
      expect(checkboxHtml).toContain('labelPosition');

      const checkboxScss = await readFile(join(tmp, 'src/app/ui/checkbox/checkbox.scss'), 'utf8');
      expect(checkboxScss).toContain('.el-checkbox');
      expect(checkboxScss).toContain('--el-checkbox-size');

      expect(existsSync(join(tmp, 'src/app/ui/checkbox/checkbox.stories.ts'))).toBe(false);
    } finally {
      await rm(tmp, { recursive: true, force: true });
    }
  });
});

describe('add segmented-button e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElSegmentedButton', async () => {
    const registry = localRegistryUrl();
    const tmp = await mkdtemp(join(tmpdir(), 'ng-elemental-e2e-'));

    try {
      await cp(fixtureDir, tmp, { recursive: true });

      npmInstall(
        ['install', '@ng-elemental/cli@e2e', '--registry', registry, '--no-fund', '--no-audit'],
        tmp,
      );

      const installedRoot = join(tmp, 'node_modules/@ng-elemental/cli');
      const cliBin = join(installedRoot, 'index.cjs');
      expect(existsSync(cliBin), `Installed CLI missing at ${cliBin}`).toBe(true);
      expectValidInstalledRegistry(installedRoot);

      run(process.execPath, [cliBin, 'init', '--yes'], tmp);
      run(process.execPath, [cliBin, 'add', 'segmented-button'], tmp);

      const groupTs = await readFile(
        join(tmp, 'src/app/ui/segmented-button/segmented-button.ts'),
        'utf8',
      );
      expect(groupTs).toContain("selector: 'el-segmented-button'");
      expect(groupTs).toContain('export class ElSegmentedButton');
      expect(groupTs).toContain('export { ElSegmentedButtonItem }');

      const itemTs = await readFile(
        join(tmp, 'src/app/ui/segmented-button/segmented-button-item.ts'),
        'utf8',
      );
      expect(itemTs).toContain("selector: 'el-segmented-button-item'");
      expect(itemTs).toContain('export class ElSegmentedButtonItem');

      const groupHtml = await readFile(
        join(tmp, 'src/app/ui/segmented-button/segmented-button.html'),
        'utf8',
      );
      expect(groupHtml).toContain('<ng-content');

      const groupScss = await readFile(
        join(tmp, 'src/app/ui/segmented-button/segmented-button.scss'),
        'utf8',
      );
      expect(groupScss).toContain(':host');

      const itemScss = await readFile(
        join(tmp, 'src/app/ui/segmented-button/segmented-button-item.scss'),
        'utf8',
      );
      expect(itemScss).toContain(':host(.el-segmented-button-item--selected)');
    } finally {
      await rm(tmp, { recursive: true, force: true });
    }
  });
});
