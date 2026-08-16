import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add menubar e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElMenubar', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'menubar');

      const menubarTs = await readFile(
        componentUiPath(tmp, 'menubar', 'menubar.ts'),
        'utf8',
      );
      expect(menubarTs).toContain("selector: 'el-menubar'");
      expect(menubarTs).toContain('export class ElMenubar');
      expect(menubarTs).toContain('EL_MENUBAR');
      expect(menubarTs).toContain("from '../menu/menu.token'");

      const menubarHtml = await readFile(
        componentUiPath(tmp, 'menubar', 'menubar.html'),
        'utf8',
      );
      expect(menubarHtml).toContain('<ng-content');

      const menubarScss = await readFile(
        componentUiPath(tmp, 'menubar', 'menubar.scss'),
        'utf8',
      );
      expect(menubarScss).toContain('.el-menubar');
      expect(menubarScss).toContain('--el-color-surface');

      expect(
        existsSync(componentUiPath(tmp, 'menubar', 'menubar.stories.ts')),
      ).toBe(false);
    });
  });
});
