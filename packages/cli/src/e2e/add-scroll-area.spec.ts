import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add scroll-area e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElScrollArea', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'scroll-area');

      const ts = await readFile(
        componentUiPath(tmp, 'scroll-area', 'scroll-area.ts'),
        'utf8',
      );
      expect(ts).toContain("selector: 'el-scroll-area'");
      expect(ts).toContain('export class ElScrollArea');
      expect(ts).toContain(
        "ElScrollAreaOrientation = 'vertical' | 'horizontal' | 'both'",
      );

      const html = await readFile(
        componentUiPath(tmp, 'scroll-area', 'scroll-area.html'),
        'utf8',
      );
      expect(html).toContain('<ng-content');

      const scss = await readFile(
        componentUiPath(tmp, 'scroll-area', 'scroll-area.scss'),
        'utf8',
      );
      expect(scss).toContain('.el-scroll-area');
      expect(scss).toContain('--el-color-outline-variant');
      expect(scss).toContain('--el-radius-full');

      expect(
        existsSync(componentUiPath(tmp, 'scroll-area', 'scroll-area.stories.ts')),
      ).toBe(false);
    });
  });
});
