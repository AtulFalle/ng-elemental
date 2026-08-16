import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add separator e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElSeparator', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'separator');

      const ts = await readFile(
        componentUiPath(tmp, 'separator', 'separator.ts'),
        'utf8',
      );
      expect(ts).toContain("selector: 'el-separator'");
      expect(ts).toContain('export class ElSeparator');
      expect(ts).toContain(
        "ElSeparatorOrientation = 'horizontal' | 'vertical'",
      );
      expect(ts).toContain('decorative');

      const scss = await readFile(
        componentUiPath(tmp, 'separator', 'separator.scss'),
        'utf8',
      );
      expect(scss).toContain('.el-separator');
      expect(scss).toContain('--el-color-outline-variant');
      expect(scss).toContain('--el-border-width');

      expect(
        existsSync(componentUiPath(tmp, 'separator', 'separator.stories.ts')),
      ).toBe(false);
    });
  });
});
