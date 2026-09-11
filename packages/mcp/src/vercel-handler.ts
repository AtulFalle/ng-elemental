import { createMcpHandler } from '@modelcontextprotocol/server';
import { createNgElementalServer } from './lib/server';

/**
 * ESM HTTP handler bundled to api/mcp.mjs for Vercel.
 * Node always treats .mjs as ESM, which avoids the CJS `import` crash.
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
