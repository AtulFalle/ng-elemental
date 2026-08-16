import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add drawer e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElDrawer', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'drawer');

      const drawerTs = await readFile(
        componentUiPath(tmp, 'drawer', 'drawer.ts'),
        'utf8',
      );
      expect(drawerTs).toContain("selector: 'el-drawer'");
      expect(drawerTs).toContain('export class ElDrawer');
      expect(drawerTs).toContain('ElIcon');

      const closeTs = await readFile(
        componentUiPath(tmp, 'drawer', 'drawer-close.ts'),
        'utf8',
      );
      expect(closeTs).toContain("selector: '[elDrawerClose]'");
      expect(closeTs).toContain('ElDrawerRef');

      const serviceTs = await readFile(
        componentUiPath(tmp, 'drawer', 'drawer.service.ts'),
        'utf8',
      );
      expect(serviceTs).toContain('export class ElDrawerService');
      expect(serviceTs).toContain("providedIn: 'root'");
      expect(serviceTs).toContain('open<');
      expect(serviceTs).toContain('EL_DRAWER_DATA');

      const refTs = await readFile(
        componentUiPath(tmp, 'drawer', 'drawer-ref.ts'),
        'utf8',
      );
      expect(refTs).toContain('export class ElDrawerRef');
      expect(refTs).toContain('afterClosed');

      const outletTs = await readFile(
        componentUiPath(tmp, 'drawer', 'drawer-outlet.ts'),
        'utf8',
      );
      expect(outletTs).toContain("selector: 'el-drawer-outlet'");

      const drawerHtml = await readFile(
        componentUiPath(tmp, 'drawer', 'drawer.html'),
        'utf8',
      );
      expect(drawerHtml).toContain('role="dialog"');
      expect(drawerHtml).toContain('elDrawerContent');
      expect(drawerHtml).toContain('el-drawer__content');
      expect(drawerHtml).toContain('xmark');

      const drawerScss = await readFile(
        componentUiPath(tmp, 'drawer', 'drawer.scss'),
        'utf8',
      );
      expect(drawerScss).toContain('.el-drawer');
      expect(drawerScss).toContain('--el-color-surface');
      expect(drawerScss).toContain('overflow-y: auto');
      expect(drawerScss).toContain('100dvh');

      expect(
        existsSync(componentUiPath(tmp, 'drawer', 'drawer.stories.ts')),
      ).toBe(false);
    });
  });
});
