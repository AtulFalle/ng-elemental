import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export type McpClient = 'cursor' | 'claude' | 'vscode' | 'codex';

export const MCP_CLIENTS: readonly McpClient[] = ['cursor', 'claude', 'vscode', 'codex'];

const SERVER_NAME = 'ng-elemental';
const COMMAND = 'npx';
const ARGS = ['-y', '@ng-elemental/mcp'];

export function writeClientConfig(cwd: string, client: McpClient): string {
  switch (client) {
    case 'cursor':
      return writeJsonConfig(join(cwd, '.cursor/mcp.json'), 'mcpServers');
    case 'claude':
      return writeJsonConfig(join(cwd, '.mcp.json'), 'mcpServers');
    case 'vscode':
      return writeJsonConfig(join(cwd, '.vscode/mcp.json'), 'servers');
    case 'codex':
      return writeCodexConfig(join(cwd, '.codex/config.toml'));
  }
}

function writeJsonConfig(filePath: string, key: 'mcpServers' | 'servers'): string {
  const existing = existsSync(filePath)
    ? (JSON.parse(readFileSync(filePath, 'utf8')) as Record<string, unknown>)
    : {};
  const group =
    existing[key] && typeof existing[key] === 'object'
      ? (existing[key] as Record<string, unknown>)
      : {};
  group[SERVER_NAME] = {
    command: COMMAND,
    args: ARGS,
  };
  existing[key] = group;
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(existing, null, 2)}\n`);
  return filePath;
}

function writeCodexConfig(filePath: string): string {
  const block = `[mcp_servers.${SERVER_NAME}]
command = "${COMMAND}"
args = ${JSON.stringify(ARGS)}
`;
  mkdirSync(dirname(filePath), { recursive: true });
  if (!existsSync(filePath)) {
    writeFileSync(filePath, `${block}\n`);
    return filePath;
  }
  const current = readFileSync(filePath, 'utf8');
  if (current.includes(`[mcp_servers.${SERVER_NAME}]`)) {
    return filePath;
  }
  const separator = current.endsWith('\n') ? '\n' : '\n\n';
  writeFileSync(filePath, `${current}${separator}${block}\n`);
  return filePath;
}
