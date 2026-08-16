import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add breadcrumb e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElBreadcrumb', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'breadcrumb');

      const breadcrumbTs = await readFile(
        componentUiPath(tmp, 'breadcrumb', 'breadcrumb.ts'),
        'utf8',
      );
      expect(breadcrumbTs).toContain("selector: 'el-breadcrumb'");
      expect(breadcrumbTs).toContain('export class ElBreadcrumb');

      const breadcrumbHtml = await readFile(
        componentUiPath(tmp, 'breadcrumb', 'breadcrumb.html'),
        'utf8',
      );
      expect(breadcrumbHtml).toContain('el-breadcrumb__list');
      expect(breadcrumbHtml).toContain('<ng-content');

      const itemTs = await readFile(
        componentUiPath(tmp, 'breadcrumb', 'breadcrumb-item.ts'),
        'utf8',
      );
      expect(itemTs).toContain("selector: 'el-breadcrumb-item'");
      expect(itemTs).toContain('export class ElBreadcrumbItem');
      expect(itemTs).toContain('ElIcon');

      const itemHtml = await readFile(
        componentUiPath(tmp, 'breadcrumb', 'breadcrumb-item.html'),
        'utf8',
      );
      expect(itemHtml).toContain('el-breadcrumb-item__sep');
      expect(itemHtml).toContain('chevron-right');

      const itemScss = await readFile(
        componentUiPath(tmp, 'breadcrumb', 'breadcrumb-item.scss'),
        'utf8',
      );
      expect(itemScss).toContain('.el-breadcrumb-item');
      expect(itemScss).toContain('--el-color-primary');

      expect(
        existsSync(componentUiPath(tmp, 'breadcrumb', 'breadcrumb.stories.ts')),
      ).toBe(false);
    });
  });
});
