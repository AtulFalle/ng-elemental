import { GET_GUIDELINES_DESCRIPTION, SERVER_INSTRUCTIONS } from './guidelines';
import { createNgElementalServer } from './server';

describe('MCP server', () => {
  it('registers catalog tools, guidelines, and the guidelines resource', () => {
    const server = createNgElementalServer();
    expect(server).toBeTruthy();
    expect(server.isConnected()).toBe(false);
  });

  it('advertises short instructions that point agents at get_guidelines first', () => {
    expect(SERVER_INSTRUCTIONS).toContain('El*');
    expect(SERVER_INSTRUCTIONS).toContain('get_guidelines');
    expect(SERVER_INSTRUCTIONS).toContain('search_components');
    expect(SERVER_INSTRUCTIONS).toContain('add_components');
    expect(SERVER_INSTRUCTIONS).toMatch(/CSS|SVG/);
    expect(GET_GUIDELINES_DESCRIPTION).toBe(
      'Call this before adding or implementing NgElemental UI. Returns design rules and the page-integration playbook.',
    );
  });
});
