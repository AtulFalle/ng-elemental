import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { GET_GUIDELINES_DESCRIPTION, SERVER_INSTRUCTIONS } from './guidelines';
import { mcpPackageVersion } from './package-info';
import { createNgElementalServer } from './server';

const pkg = JSON.parse(readFileSync(join(__dirname, '../../package.json'), 'utf8')) as {
  version: string;
};

describe('MCP server', () => {
  it('registers catalog tools, guidelines, and the guidelines resource', () => {
    const server = createNgElementalServer();
    expect(server.isConnected()).toBe(false);
    expect(mcpPackageVersion()).toBe(pkg.version);
    expect(server.toolInputSchemaJson('get_guidelines')).toBeDefined();
    expect(server.toolInputSchemaJson('search_components')).toBeDefined();
    expect(server.toolInputSchemaJson('list_components')).toBeDefined();
    expect(server.toolInputSchemaJson('get_component')).toBeDefined();
    expect(server.toolInputSchemaJson('install_components')).toBeDefined();
    expect(server.toolInputSchemaJson('get_component_source')).toBeDefined();
    expect(server.toolInputSchemaJson('get_component_examples')).toBeDefined();
    expect(server.toolInputSchemaJson('init_project')).toBeDefined();
  });

  it('ships a Vercel .mjs handler so Node loads the function as ESM', () => {
    const repoRoot = join(__dirname, '../../../..');
    const bundled = readFileSync(join(repoRoot, 'api/mcp.mjs'), 'utf8');
    const vercel = JSON.parse(readFileSync(join(repoRoot, 'vercel.json'), 'utf8')) as {
      functions?: Record<string, unknown>;
    };
    expect(bundled.startsWith('// packages/mcp/src/vercel-handler.ts')).toBe(true);
    expect(bundled).toContain('import { createMcpHandler }');
    expect(vercel.functions).toHaveProperty('api/mcp.mjs');
  });

  it('advertises short instructions that point agents at get_guidelines first', () => {
    expect(SERVER_INSTRUCTIONS).toContain('El*');
    expect(SERVER_INSTRUCTIONS).toContain('get_guidelines');
    expect(SERVER_INSTRUCTIONS).toContain('search_components');
    expect(SERVER_INSTRUCTIONS).toContain('install_components');
    expect(SERVER_INSTRUCTIONS).toMatch(/CSS|SVG/);
    expect(GET_GUIDELINES_DESCRIPTION).toBe(
      'Call this before adding or implementing NgElemental UI. Returns design rules and the page-integration playbook.',
    );
  });
});
