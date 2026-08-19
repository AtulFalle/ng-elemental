import { parseArgs } from 'node:util';
import { MCP_CLIENTS, writeClientConfig, type McpClient } from './clients';
import { createNgElementalServer } from './server';

export async function run(argv: string[]): Promise<void> {
  const [command, ...rest] = argv;

  if (!command) {
    await startStdio();
    return;
  }

  if (command === '-h' || command === '--help') {
    printUsage();
    return;
  }

  if (command === 'init') {
    const flags = parseInitArgv(rest);
    const path = writeClientConfig(process.cwd(), flags.client, { url: flags.url });
    console.log(`Wrote ${flags.client} MCP config to ${path}`);
    return;
  }

  throw new Error(`Unknown command "${command}". Use --help to see available commands.`);
}

export function parseInitArgv(args: string[]): { client: McpClient; url?: string } {
  const { values } = parseArgs({
    args,
    options: {
      client: { type: 'string' },
      url: { type: 'string' },
    },
    strict: true,
    allowPositionals: false,
  });

  const client = values.client;
  if (!client) {
    throw new Error(
      `Usage: ng-elemental-mcp init --client <${MCP_CLIENTS.join('|')}> [--url <https://...>]`,
    );
  }
  if (!MCP_CLIENTS.includes(client as McpClient)) {
    throw new Error(
      `Unknown client "${client}". Use one of: ${MCP_CLIENTS.join(', ')}`,
    );
  }

  const url = values.url;
  if (url !== undefined && !/^https?:\/\/.+/.test(url)) {
    throw new Error(`--url must be a valid http/https URL, got: ${url}`);
  }

  return url !== undefined
    ? { client: client as McpClient, url }
    : { client: client as McpClient };
}

async function startStdio(): Promise<void> {
  const { serveStdio } = await import('@modelcontextprotocol/server/stdio');
  serveStdio(() => createNgElementalServer(), {
    onerror: (error) => {
      console.error(error);
    },
  });
}

function printUsage(): void {
  console.log(`@ng-elemental/mcp — MCP server for NgElemental components

Usage:
  npx @ng-elemental/mcp
  npx @ng-elemental/mcp init --client cursor|claude|vscode|codex [--url <https://...>]

Commands:
  (default)   Start the stdio MCP server
  init        Write MCP client config for this project

Options (init):
  --client    MCP client to configure (cursor, claude, vscode, codex)
  --url       Use an HTTP/HTTPS URL instead of the local npx command.
              Pass your Vercel deployment URL, e.g.:
              --url https://<project>.vercel.app/mcp
`);
}
