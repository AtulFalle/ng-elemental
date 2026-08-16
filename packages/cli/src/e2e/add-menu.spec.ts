import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add menu e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElMenu', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'menu');

      const menuTs = await readFile(
        componentUiPath(tmp, 'menu', 'menu.ts'),
        'utf8',
      );
      expect(menuTs).toContain("selector: 'el-menu'");
      expect(menuTs).toContain('export class ElMenu');
      expect(menuTs).toContain('EL_MENU');

      const panelTs = await readFile(
        componentUiPath(tmp, 'menu', 'menu-panel.ts'),
        'utf8',
      );
      expect(panelTs).toContain("selector: 'el-menu-panel'");
      expect(panelTs).toContain('export class ElMenuPanel');

      const itemTs = await readFile(
        componentUiPath(tmp, 'menu', 'menu-item.ts'),
        'utf8',
      );
      expect(itemTs).toContain("selector: 'el-menu-item'");
      expect(itemTs).toContain('ElIcon');
      expect(itemTs).toContain('selected');

      const triggerTs = await readFile(
        componentUiPath(tmp, 'menu', 'menu-trigger.ts'),
        'utf8',
      );
      expect(triggerTs).toContain("selector: '[elMenuTrigger]'");

      const panelHtml = await readFile(
        componentUiPath(tmp, 'menu', 'menu-panel.html'),
        'utf8',
      );
      expect(panelHtml).toContain('role="menu"');
      expect(panelHtml).toContain('<ng-content');

      const panelScss = await readFile(
        componentUiPath(tmp, 'menu', 'menu-panel.scss'),
        'utf8',
      );
      expect(panelScss).toContain('.el-menu-panel');
      expect(panelScss).toContain('--el-color-surface');

      expect(existsSync(componentUiPath(tmp, 'menu', 'menu.stories.ts'))).toBe(
        false,
      );
    });
  });
});
