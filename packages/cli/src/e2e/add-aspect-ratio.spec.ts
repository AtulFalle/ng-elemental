import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add aspect-ratio e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElAspectRatio', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'aspect-ratio');

      const ts = await readFile(
        componentUiPath(tmp, 'aspect-ratio', 'aspect-ratio.ts'),
        'utf8',
      );
      expect(ts).toContain("selector: 'el-aspect-ratio'");
      expect(ts).toContain('export class ElAspectRatio');
      expect(ts).toContain('ratio');

      const html = await readFile(
        componentUiPath(tmp, 'aspect-ratio', 'aspect-ratio.html'),
        'utf8',
      );
      expect(html).toContain('el-aspect-ratio__slot');
      expect(html).toContain('<ng-content');

      const scss = await readFile(
        componentUiPath(tmp, 'aspect-ratio', 'aspect-ratio.scss'),
        'utf8',
      );
      expect(scss).toContain('.el-aspect-ratio__slot');
      expect(scss).toContain('position: absolute');

      expect(
        existsSync(
          componentUiPath(tmp, 'aspect-ratio', 'aspect-ratio.stories.ts'),
        ),
      ).toBe(false);
    });
  });
});
