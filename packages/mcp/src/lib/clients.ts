import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export type McpClient = 'cursor' | 'claude' | 'vscode' | 'codex';

export const MCP_CLIENTS: readonly McpClient[] = ['cursor', 'claude', 'vscode', 'codex'];

const SERVER_NAME = 'ng-elemental';
const COMMAND = 'npx';
const ARGS = ['-y', '@ng-elemental/mcp'];

export interface WriteClientConfigOptions {
  /** Remote HTTP/HTTPS URL for clients that support URL-based transport. */
  url?: string;
}

export function writeClientConfig(
  cwd: string,
  client: McpClient,
  options: WriteClientConfigOptions = {},
): string {
  const { url } = options;
  switch (client) {
    case 'cursor':
      return writeJsonConfig(join(cwd, '.cursor/mcp.json'), 'mcpServers', url);
    case 'claude':
      return writeJsonConfig(join(cwd, '.mcp.json'), 'mcpServers', url);
    case 'vscode':
      return writeJsonConfig(join(cwd, '.vscode/mcp.json'), 'servers', url);
    case 'codex':
      return writeCodexConfig(join(cwd, '.codex/config.toml'), url);
  }
}

function writeJsonConfig(filePath: string, key: 'mcpServers' | 'servers', url?: string): string {
  const existing = readJsonObject(filePath);
  const group =
    existing[key] && typeof existing[key] === 'object' && !Array.isArray(existing[key])
      ? (existing[key] as Record<string, unknown>)
      : {};
  group[SERVER_NAME] = url
    ? { url }
    : { command: COMMAND, args: ARGS };
  existing[key] = group;
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(existing, null, 2)}\n`);
  return filePath;
}

function readJsonObject(filePath: string): Record<string, unknown> {
  if (!existsSync(filePath)) {
    return {};
  }
  try {
    const parsed = JSON.parse(readFileSync(filePath, 'utf8')) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('expected a JSON object');
    }
    return parsed as Record<string, unknown>;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid MCP config at ${filePath}: ${message}`);
  }
}

function writeCodexConfig(filePath: string, url?: string): string {
  const block = url
    ? `[mcp_servers.${SERVER_NAME}]\nurl = "${url}"\n`
    : `[mcp_servers.${SERVER_NAME}]\ncommand = "${COMMAND}"\nargs = ${JSON.stringify(ARGS)}\n`;
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
