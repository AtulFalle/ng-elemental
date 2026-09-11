import { createMcpHandler } from '@modelcontextprotocol/server';
import { createNgElementalServer } from '../packages/mcp/src/lib/server';

/**
 * Vercel Function for the NgElemental MCP server (stateless Streamable HTTP).
 *
 * Public URL: https://ng-elemental.vercel.app/mcp (rewritten from /api/mcp)
 */
const handler = createMcpHandler(
  () => createNgElementalServer(),
  { legacy: 'stateless' },
);

export default handler;
