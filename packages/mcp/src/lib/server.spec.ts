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
