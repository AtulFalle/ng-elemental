import { existsSync, readFileSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { writeClientConfig } from './clients';

describe('MCP client config writers', () => {
  let tmp: string;

  afterEach(async () => {
    if (tmp) {
      await rm(tmp, { recursive: true, force: true });
    }
  });

  async function sandbox(): Promise<string> {
    tmp = await mkdtemp(join(tmpdir(), 'el-mcp-client-'));
    return tmp;
  }

  it('writes Cursor, Claude, VS Code, and Codex configs', async () => {
    const cwd = await sandbox();

    expect(writeClientConfig(cwd, 'cursor')).toBe(join(cwd, '.cursor/mcp.json'));
    expect(writeClientConfig(cwd, 'claude')).toBe(join(cwd, '.mcp.json'));
    expect(writeClientConfig(cwd, 'vscode')).toBe(join(cwd, '.vscode/mcp.json'));
    expect(writeClientConfig(cwd, 'codex')).toBe(join(cwd, '.codex/config.toml'));

    const cursor = JSON.parse(readFileSync(join(cwd, '.cursor/mcp.json'), 'utf8')) as {
      mcpServers: { 'ng-elemental': { command: string; args: string[] } };
    };
    expect(cursor.mcpServers['ng-elemental'].command).toBe('npx');
    expect(cursor.mcpServers['ng-elemental'].args).toEqual(['-y', '@ng-elemental/mcp']);

    const vscode = JSON.parse(readFileSync(join(cwd, '.vscode/mcp.json'), 'utf8')) as {
      servers: { 'ng-elemental': { command: string } };
    };
    expect(vscode.servers['ng-elemental'].command).toBe('npx');

    const toml = readFileSync(join(cwd, '.codex/config.toml'), 'utf8');
    expect(toml).toContain('[mcp_servers.ng-elemental]');
    expect(toml).toContain('npx');
    expect(existsSync(join(cwd, '.mcp.json'))).toBe(true);
  });
});
