import { McpServer } from '@modelcontextprotocol/server';
import { z } from 'zod';
import {
  addComponents,
  describeComponent,
  guidelinesText,
  listComponents,
  resolveCwd,
  searchComponents,
  compactCatalog,
} from './actions';
import { GET_GUIDELINES_DESCRIPTION, SERVER_INSTRUCTIONS } from './guidelines';
import { initProject } from './init-project';

const KIND = z.enum(['component', 'directive', 'service', 'theme']).optional();

export function createNgElementalServer(): McpServer {
  const server = new McpServer(
    { name: 'ng-elemental', version: packageVersion() },
    { instructions: SERVER_INSTRUCTIONS },
  );

  server.registerTool(
    'get_guidelines',
    {
      title: 'NgElemental guidelines',
      description: GET_GUIDELINES_DESCRIPTION,
      inputSchema: z.object({}),
    },
    () => textResult(guidelinesText()),
  );

  server.registerTool(
    'search_components',
    {
      title: 'Search components',
      description:
        'Search NgElemental components by name, keyword, or intent (e.g. dropdown, modal, snackbar). Default entry point.',
      inputSchema: z.object({
        query: z.string().describe('Search query such as dropdown, modal, or button'),
        kind: KIND.describe('Optional kind filter'),
      }),
    },
    ({ query, kind }) => {
      const matches = searchComponents(query, kind);
      if (matches.length === 0) {
        return textResult(`No components match "${query}". Try a different query or call list_components.`);
      }
      return textResult(JSON.stringify(matches.map(compactCatalog), null, 2));
    },
  );

  server.registerTool(
    'list_components',
    {
      title: 'List components',
      description: 'List NgElemental copy-paste components. Optionally filter by kind.',
      inputSchema: z.object({
        kind: KIND.describe('Optional kind filter'),
      }),
    },
    ({ kind }) => textResult(JSON.stringify(listComponents(kind).map(compactCatalog), null, 2)),
  );

  server.registerTool(
    'get_component',
    {
      title: 'Get component',
      description:
        'Get metadata, usage, registry/npm dependencies, import path, and a wire-in checklist for one component.',
      inputSchema: z.object({
        name: z.string().describe('Catalog name such as button or dialog'),
        cwd: z.string().optional().describe('Project root. Defaults to process.cwd()'),
      }),
    },
    ({ name, cwd }) => textResult(describeComponent(name, resolveCwd(cwd))),
  );

  server.registerTool(
    'add_components',
    {
      title: 'Add components',
      description:
        'Copy one or more NgElemental components into the current project via the CLI. Also copies missing registryDependencies. Requires elemental.json.',
      inputSchema: z.object({
        names: z.array(z.string()).min(1).describe('Catalog names to add'),
        force: z.boolean().optional().describe('Overwrite existing copied files'),
        cwd: z.string().optional().describe('Project root. Defaults to process.cwd()'),
      }),
    },
    ({ names, force, cwd }) => textResult(addComponents({ names, force, cwd: resolveCwd(cwd) })),
  );

  server.registerTool(
    'init_project',
    {
      title: 'Init project',
      description:
        'Create elemental.json and optionally install theme tokens. Non-interactive. Call if elemental.json is missing.',
      inputSchema: z.object({
        path: z.string().optional().describe('Components directory, default src/app/ui'),
        skipTheme: z.boolean().optional(),
        cwd: z.string().optional().describe('Project root. Defaults to process.cwd()'),
      }),
    },
    async ({ path, skipTheme, cwd }) =>
      textResult(await initProject({ cwd: resolveCwd(cwd), path, skipTheme })),
  );

  server.registerResource(
    'guidelines',
    'ng-elemental://guidelines',
    {
      title: 'NgElemental Design Guidelines',
      mimeType: 'text/markdown',
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: 'text/markdown',
          text: guidelinesText(),
        },
      ],
    }),
  );

  return server;
}

function textResult(text: string): { content: { type: 'text'; text: string }[] } {
  return { content: [{ type: 'text', text }] };
}

function packageVersion(): string {
  return '0.0.8';
}
