import { execFileSync, execSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../../../..');

function npm(args: string[], cwd: string): string {
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
    throw new Error(`${command} failed\n${err.stdout ?? ''}\n${err.stderr ?? err.message}`);
  }
}

function packedTarballName(packOutput: string): string {
  const parsed = JSON.parse(packOutput) as unknown;
  if (Array.isArray(parsed) && parsed[0] && typeof parsed[0] === 'object') {
    const filename = (parsed[0] as { filename?: unknown }).filename;
    if (typeof filename === 'string' && filename.length > 0) {
      return filename;
    }
  }
  throw new Error(`npm pack --json did not return a filename:\n${packOutput}`);
}

describe('MCP packed package', () => {
  it('installs CLI and MCP from dist tarballs and runs the published bin', () => {
    const cliDist = join(repoRoot, 'dist/packages/cli');
    const mcpDist = join(repoRoot, 'dist/packages/mcp');
    const tmp = mkdtempSync(join(tmpdir(), 'el-mcp-pack-'));

    try {
      const cliTgz = packedTarballName(npm(['pack', '--json', '--pack-destination', tmp], cliDist));
      const mcpTgz = packedTarballName(npm(['pack', '--json', '--pack-destination', tmp], mcpDist));

      const app = join(tmp, 'app');
      mkdirSync(app);
      writeFileSync(join(app, 'package.json'), `${JSON.stringify({ name: 'mcp-pack-app', private: true })}\n`);
      npm(
        ['install', join(tmp, cliTgz), join(tmp, mcpTgz), '--no-fund', '--no-audit'],
        app,
      );

      const installedMcp = join(app, 'node_modules/@ng-elemental/mcp');
      const installedCli = join(app, 'node_modules/@ng-elemental/cli');
      const bin = join(installedMcp, 'bin.cjs');

      const mcpPkg = JSON.parse(readFileSync(join(installedMcp, 'package.json'), 'utf8')) as {
        name: string;
        version: string;
        bin?: Record<string, string>;
        dependencies?: Record<string, string>;
      };
      expect(mcpPkg.name).toBe('@ng-elemental/mcp');
      expect(mcpPkg.bin?.['ng-elemental-mcp']).toBe('./bin.cjs');
      expect(mcpPkg.dependencies?.['@ng-elemental/cli']).toBe(mcpPkg.version);
      expect(readFileSync(join(installedCli, 'package.json'), 'utf8')).toContain('"name": "@ng-elemental/cli"');
      expect(readFileSync(join(installedMcp, 'guidelines.md'), 'utf8')).toContain('## Framework');

      const help = execFileSync(process.execPath, [bin, '--help'], {
        cwd: app,
        encoding: 'utf8',
        windowsHide: true,
      });
      expect(help).toContain('@ng-elemental/mcp');
      expect(help).toContain('init --client');

      execFileSync(process.execPath, [bin, 'init', '--client', 'cursor'], {
        cwd: app,
        encoding: 'utf8',
        windowsHide: true,
      });
      const cursor = JSON.parse(readFileSync(join(app, '.cursor/mcp.json'), 'utf8')) as {
        mcpServers: { 'ng-elemental': { command: string; args: string[] } };
      };
      expect(cursor.mcpServers['ng-elemental'].args).toEqual(['-y', '@ng-elemental/mcp']);

      const loaded = createRequire(import.meta.url)(join(installedMcp, 'index.cjs')) as {
        createNgElementalServer: () => { toolInputSchemaJson: (name: string) => unknown };
      };
      const server = loaded.createNgElementalServer();
      expect(server.toolInputSchemaJson('search_components')).toBeDefined();
      expect(server.toolInputSchemaJson('add_components')).toBeDefined();
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  }, 60_000);
});
