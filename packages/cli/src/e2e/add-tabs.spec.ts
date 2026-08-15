import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add tabs e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElTabs', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'tabs');

      const tabsTs = await readFile(componentUiPath(tmp, 'tabs', 'tabs.ts'), 'utf8');
      expect(tabsTs).toContain("selector: 'el-tabs'");
      expect(tabsTs).toContain('export class ElTabs');
      expect(tabsTs).toContain('export { ElTab, ElTabContent, ElTabLabel }');
      expect(tabsTs).toContain('ElIcon');

      const tabTs = await readFile(componentUiPath(tmp, 'tabs', 'tab.ts'), 'utf8');
      expect(tabTs).toContain("selector: 'el-tab'");
      expect(tabTs).toContain('export class ElTab');

      const contentTs = await readFile(
        componentUiPath(tmp, 'tabs', 'tab-content.ts'),
        'utf8',
      );
      expect(contentTs).toContain('ng-template[elTabContent]');

      const labelTs = await readFile(
        componentUiPath(tmp, 'tabs', 'tab-label.ts'),
        'utf8',
      );
      expect(labelTs).toContain('ng-template[elTabLabel]');

      const tabsHtml = await readFile(
        componentUiPath(tmp, 'tabs', 'tabs.html'),
        'utf8',
      );
      expect(tabsHtml).toContain('el-tabs__list');
      expect(tabsHtml).toContain('el-tabs__arrow');
      expect(tabsHtml).toContain('chevron-left');
      expect(tabsHtml).toContain('chevron-right');
      expect(tabsHtml).toContain('ngTemplateOutlet');
      expect(tabsHtml).toContain('<ng-content');

      const tabsScss = await readFile(
        componentUiPath(tmp, 'tabs', 'tabs.scss'),
        'utf8',
      );
      expect(tabsScss).toContain('.el-tabs');
      expect(tabsScss).toContain('--el-color-primary');
      expect(tabsScss).toContain('overflow-x: auto');
      expect(tabsScss).toContain('scrollbar-width: none');

      expect(existsSync(componentUiPath(tmp, 'tabs', 'tabs.stories.ts'))).toBe(
        false,
      );
    });
  });
});
