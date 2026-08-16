import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add grid e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElGrid', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'grid');

      const gridTs = await readFile(
        componentUiPath(tmp, 'grid', 'grid.ts'),
        'utf8',
      );
      expect(gridTs).toContain("selector: 'el-grid'");
      expect(gridTs).toContain('export class ElGrid');
      expect(gridTs).toContain('minItemWidth');
      expect(gridTs).toContain('auto-fit');

      const gridHtml = await readFile(
        componentUiPath(tmp, 'grid', 'grid.html'),
        'utf8',
      );
      expect(gridHtml).toContain('<ng-content');

      const gridScss = await readFile(
        componentUiPath(tmp, 'grid', 'grid.scss'),
        'utf8',
      );
      expect(gridScss).toContain('display: grid');

      expect(existsSync(componentUiPath(tmp, 'grid', 'grid.stories.ts'))).toBe(
        false,
      );
    });
  });
});
