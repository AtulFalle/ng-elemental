import { createMcpHandler } from '@modelcontextprotocol/server';
import { createNgElementalServer } from '../packages/mcp/src/lib/server';

/**
 * Vercel serverless function exposing the NgElemental MCP server over
 * the MCP Streamable HTTP transport (stateless per-request mode).
 *
 * Endpoint: GET/POST /mcp
 *
 * Compatible with any MCP client that supports the 2025-03-26 protocol
 * (Cursor, Claude Desktop, VS Code, etc.) configured with:
 *   url: https://<your-deployment>.vercel.app/mcp
 */
const handler = createMcpHandler(
  () => createNgElementalServer(),
  { legacy: 'stateless' },
);

export default handler;
