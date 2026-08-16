import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const SERVER_INSTRUCTIONS =
  'Use NgElemental MCP for El* widgets. Call get_guidelines first, then search_components, get_component, and add_components. Do not invent parallel CSS or SVG widgets. Never import from @ng-elemental/ui in a consumer app.';

export const GET_GUIDELINES_DESCRIPTION =
  'Call this before adding or implementing NgElemental UI. Returns design rules and the page-integration playbook.';

export function loadGuidelines(): string {
  return readFileSync(guidelinesPath(), 'utf8');
}

function guidelinesPath(): string {
  const here = __dirname;
  const candidates = [
    join(here, 'guidelines.md'),
    join(here, 'src/lib/guidelines.md'),
    join(here, '../src/lib/guidelines.md'),
    join(here, '../../src/lib/guidelines.md'),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error(`NgElemental guidelines.md not found (looked next to ${here})`);
}
