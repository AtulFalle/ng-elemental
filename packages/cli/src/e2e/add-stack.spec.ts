import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add stack e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElStack', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'stack');

      const stackTs = await readFile(
        componentUiPath(tmp, 'stack', 'stack.ts'),
        'utf8',
      );
      expect(stackTs).toContain("selector: 'el-stack'");
      expect(stackTs).toContain('export class ElStack');
      expect(stackTs).toContain("ElStackDirection = 'row' | 'column'");
      expect(stackTs).toContain('gap');

      const stackHtml = await readFile(
        componentUiPath(tmp, 'stack', 'stack.html'),
        'utf8',
      );
      expect(stackHtml).toContain('<ng-content');

      const stackScss = await readFile(
        componentUiPath(tmp, 'stack', 'stack.scss'),
        'utf8',
      );
      expect(stackScss).toContain('.el-stack');
      expect(stackScss).toContain('flex-direction');

      expect(existsSync(componentUiPath(tmp, 'stack', 'stack.stories.ts'))).toBe(
        false,
      );
    });
  });
});
