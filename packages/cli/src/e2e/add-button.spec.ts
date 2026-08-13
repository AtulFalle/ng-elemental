import { execFileSync, execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { cp, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

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
      expect(existsSync(join(installedRoot, 'registry/button/button.ts'))).toBe(true);
      expect(existsSync(join(installedRoot, 'registry/button/button.html'))).toBe(true);
      expect(existsSync(join(installedRoot, 'registry/button/button.scss'))).toBe(true);
      expect(existsSync(join(installedRoot, 'registry/button/button.stories.ts'))).toBe(false);

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
      expect(existsSync(join(installedRoot, 'registry/label/label.ts'))).toBe(true);
      expect(existsSync(join(installedRoot, 'registry/label/label.html'))).toBe(true);
      expect(existsSync(join(installedRoot, 'registry/label/label.scss'))).toBe(true);
      expect(existsSync(join(installedRoot, 'registry/label/label.stories.ts'))).toBe(false);

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
