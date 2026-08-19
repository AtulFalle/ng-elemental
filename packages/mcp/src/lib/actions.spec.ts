import { existsSync } from 'node:fs';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  describeComponent,
  getComponentExamples,
  getComponentSource,
  getInstallInstructions,
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

describe('MCP install instructions', () => {
  let tmp: string;

  afterEach(async () => {
    if (tmp) {
      await rm(tmp, { recursive: true, force: true });
    }
  });

  it('returns CLI commands without elemental.json', () => {
    const output = getInstallInstructions(['button'], process.cwd());
    expect(output).toContain('npx @ng-elemental/cli add button');
    expect(output).toContain('## Wire it in');
    expect(output).toContain('ElButton');
    expect(output).toContain('Do NOT copy-paste');
  });

  it('includes npm install for components with npm deps', () => {
    const output = getInstallInstructions(['icon'], process.cwd());
    expect(output).toContain('npm install @fortawesome/fontawesome-free');
  });

  it('omits init command when elemental.json exists', async () => {
    tmp = await makeAngularApp();
    await initProject({ cwd: tmp, skipTheme: true });
    const output = getInstallInstructions(['button'], tmp);
    expect(output).not.toContain('npx @ng-elemental/cli init');
    expect(output).toContain('npx @ng-elemental/cli add button');
  });
});

describe('MCP component source and examples', () => {
  it('returns source code for a known component', () => {
    const source = getComponentSource('button');
    expect(source).toContain('# Button — Source Code');
    expect(source).toContain('ElButton');
    expect(source).toContain('.scss');
  });

  it('returns storybook examples for a known component', () => {
    const examples = getComponentExamples('button');
    expect(examples).toContain('# Button — Examples');
    expect(examples).toContain('stories');
  });
});
