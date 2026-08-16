import { existsSync } from 'node:fs';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  addComponents,
  describeComponent,
  guidelinesText,
  listComponents,
  searchComponents,
} from './actions';
import { GET_GUIDELINES_DESCRIPTION, loadGuidelines } from './guidelines';
import { initProject } from './init-project';

async function makeAngularApp(): Promise<string> {
  const tmp = await mkdtemp(join(tmpdir(), 'el-mcp-'));
  await writeFile(
    join(tmp, 'package.json'),
    `${JSON.stringify({ dependencies: { '@angular/core': '22.0.0' } })}\n`,
  );
  return tmp;
}

describe('MCP guidelines', () => {
  it('uses the exact get_guidelines description', () => {
    expect(GET_GUIDELINES_DESCRIPTION).toBe(
      'Call this before adding or implementing NgElemental UI. Returns design rules and the page-integration playbook.',
    );
  });

  it('includes design sections and the page-integration playbook', () => {
    const text = guidelinesText();
    expect(text).toBe(loadGuidelines());
    expect(text).toContain('Framework');
    expect(text).toContain('Styling');
    expect(text).toContain('Architecture');
    expect(text).toContain('Accessibility');
    expect(text).toContain('How to put a component on a page');
    expect(text).toContain('## Framework');
    expect(text).toContain('## Styling');
    expect(text).toContain('## Architecture');
    expect(text).toContain('## Accessibility');
    expect(text).toContain('## How to put a component on a page');
    expect(text).toContain("Never `import { ElButton } from '@ng-elemental/ui'");
  });

  it('loads guidelines.md next to the module in unit tests', () => {
    expect(existsSync(join(__dirname, 'guidelines.md'))).toBe(true);
  });
});

describe('MCP catalog tools', () => {
  it('maps intent search to the right component', () => {
    expect(searchComponents('modal').map((entry) => entry.name)).toContain('dialog');
  });

  it('lists components and can filter by kind', () => {
    expect(listComponents().map((entry) => entry.name)).toContain('button');
    expect(listComponents('directive').map((entry) => entry.name)).toEqual(
      expect.arrayContaining(['tooltip', 'infinite-scroll']),
    );
  });

  it('describes a component with a wire-in checklist', () => {
    const text = describeComponent('button', process.cwd());
    expect(text).toContain('"name": "button"');
    expect(text).toContain('ElButton');
    expect(text).toContain('## Wire it in');
    expect(text).toContain("import { ElButton } from './ui/button/button'");
    expect(text).toContain('imports: [ElButton]');
    expect(text).toContain('<el-button');
    expect(text).toContain('alsoAdd: icon');
    expect(text).toContain('Follow NgElemental Design Guidelines (call get_guidelines).');
  });

  it('includes npmDependencies in the wire-in checklist when present', () => {
    const text = describeComponent('icon', process.cwd());
    expect(text).toContain('## Wire it in');
    expect(text).toContain("import { ElIcon } from './ui/icon/icon'");
    expect(text).toContain('imports: [ElIcon]');
    expect(text).toContain('npmDependencies: @fortawesome/fontawesome-free');
    expect(text).toContain('Follow NgElemental Design Guidelines (call get_guidelines).');
    expect(text).not.toContain('alsoAdd:');
  });
});

describe('MCP init and add', () => {
  let tmp: string;

  afterEach(async () => {
    if (tmp) {
      await rm(tmp, { recursive: true, force: true });
    }
  });

  it('inits a project and adds a component with usage', async () => {
    tmp = await makeAngularApp();
    const init = JSON.parse(await initProject({ cwd: tmp, skipTheme: true })) as {
      componentsDir: string;
    };
    expect(init.componentsDir).toBe('src/app/ui');

    const output = addComponents({ cwd: tmp, names: ['button'] });
    expect(output).toContain('"name": "button"');
    expect(output).toContain('src/app/ui/button');
    expect(output).toContain('## Wire it in');
    expect(output).toContain("import { ElButton } from './ui/button/button'");
    expect(output).toContain('imports: [ElButton]');
    expect(output).toContain('alsoAdd: icon');
    expect(output).toContain('Follow NgElemental Design Guidelines (call get_guidelines).');
    expect(existsSync(join(tmp, 'src/app/ui/button/button.ts'))).toBe(true);
    expect(existsSync(join(tmp, 'src/app/ui/icon/icon.ts'))).toBe(true);
  });

  it('adds nested registry dependencies for compound widgets', async () => {
    tmp = await makeAngularApp();
    await initProject({ cwd: tmp, skipTheme: true });

    addComponents({ cwd: tmp, names: ['menubar'] });
    expect(existsSync(join(tmp, 'src/app/ui/menubar/menubar.ts'))).toBe(true);
    expect(existsSync(join(tmp, 'src/app/ui/menu/menu.ts'))).toBe(true);
    expect(existsSync(join(tmp, 'src/app/ui/icon/icon.ts'))).toBe(true);
    expect(existsSync(join(tmp, 'src/app/ui/button/button.ts'))).toBe(true);
  });
});
