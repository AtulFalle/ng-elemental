import { createMcpHandler } from '@modelcontextprotocol/server';
import { createNgElementalServer } from '../packages/mcp/src/lib/server';

/**
 * Vercel Function for the NgElemental MCP server (stateless Streamable HTTP).
 *
 * Public URL: https://ng-elemental.vercel.app/mcp (rewritten from /api/mcp)
 *
 * `.mts` compiles to `.mjs` so Node loads this as ESM even if the Lambda
 * package.json does not copy `"type": "module"`.
 */
const mcp = createMcpHandler(
  () => createNgElementalServer(),
  { legacy: 'stateless' },
);

export default {
  fetch(request: Request): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return Promise.resolve(new Response(null, { status: 204 }));
    }
    return mcp.fetch(request);
  },
};
