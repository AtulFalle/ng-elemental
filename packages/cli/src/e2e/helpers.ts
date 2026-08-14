import { execFileSync, execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { cp, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateBuiltRegistry } from '../lib/registry-validation';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../../../..');
const fixtureDir = join(repoRoot, 'e2e/fixtures/consumer-app');
const registryUrlFile = join(repoRoot, 'tmp/local-registry/registry-url.txt');

export interface CliConsumerContext {
  tmp: string;
  cliBin: string;
  installedRoot: string;
  runCli: (...args: string[]) => string;
}

export function localRegistryUrl(): string {
  const fromEnv = process.env['npm_config_registry'];
  if (fromEnv && !fromEnv.includes('registry.npmjs.org')) {
    return fromEnv;
  }
  if (existsSync(registryUrlFile)) {
    return readFileSync(registryUrlFile, 'utf8').trim();
  }
  return 'http://localhost:4873';
}

export function run(command: string, args: string[], cwd: string): string {
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

export function npmInstall(args: string[], cwd: string): string {
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

export function expectValidInstalledRegistry(installedRoot: string): void {
  const errors = validateBuiltRegistry(join(installedRoot, 'registry'));
  expect(errors, errors.join('\n')).toEqual([]);
}

export async function withCliConsumer(
  fn: (ctx: CliConsumerContext) => Promise<void>,
): Promise<void> {
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

    const runCli = (...args: string[]) => run(process.execPath, [cliBin, ...args], tmp);
    runCli('init', '--yes');

    await fn({ tmp, cliBin, installedRoot, runCli });
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
}

export function componentUiPath(tmp: string, component: string, file: string): string {
  return join(tmp, 'src/app/ui', component, file);
}
