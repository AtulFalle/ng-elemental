import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add navigation e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElNav', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'navigation');

      const tokenTs = await readFile(
        componentUiPath(tmp, 'navigation', 'navigation.token.ts'),
        'utf8',
      );
      expect(tokenTs).toContain("ElNavAppearance = 'rail' | 'soft'");
      expect(tokenTs).toContain('EL_NAV');

      const navTs = await readFile(
        componentUiPath(tmp, 'navigation', 'navigation.ts'),
        'utf8',
      );
      expect(navTs).toContain("selector: 'el-nav'");
      expect(navTs).toContain('export class ElNav');
      expect(navTs).toContain("appearance = input<ElNavAppearance>('rail')");
      expect(navTs).toContain('ElNavItem');
      expect(navTs).toContain('ElNavLeadingSlot');
      expect(navTs).toContain('export { ElNavHeading }');

      const itemTs = await readFile(
        componentUiPath(tmp, 'navigation', 'navigation-item.ts'),
        'utf8',
      );
      expect(itemTs).toContain("selector: 'el-nav-item'");
      expect(itemTs).toContain('export class ElNavItem');
      expect(itemTs).toContain('ElIcon');
      expect(itemTs).toContain('elNavLeading');
      expect(itemTs).toContain('elNavLabel');
      expect(itemTs).toContain('elNavSublabel');

      const itemHtml = await readFile(
        componentUiPath(tmp, 'navigation', 'navigation-item.html'),
        'utf8',
      );
      expect(itemHtml).toContain('el-nav-item__control');
      expect(itemHtml).toContain('el-nav-item__chevron');
      expect(itemHtml).toContain('chevron-right');
      expect(itemHtml).toContain('aria-current');
      expect(itemHtml).toContain('aria-expanded');
      expect(itemHtml).toContain('el-nav-item__group');
      expect(itemHtml).toContain('elNavBadge');
      expect(itemHtml).toContain('elNavActions');
      expect(itemHtml).toContain('el-nav-item__badge');
      expect(itemHtml).toContain('el-nav-item__actions');

      const headingTs = await readFile(
        componentUiPath(tmp, 'navigation', 'navigation-heading.ts'),
        'utf8',
      );
      expect(headingTs).toContain("selector: 'el-nav-heading'");

      const itemScss = await readFile(
        componentUiPath(tmp, 'navigation', 'navigation-item.scss'),
        'utf8',
      );
      expect(itemScss).toContain('.el-nav-item');
      expect(itemScss).toContain('--el-color-primary');
      expect(itemScss).toContain('prefers-reduced-motion');

      expect(
        existsSync(componentUiPath(tmp, 'navigation', 'navigation.stories.ts')),
      ).toBe(false);
    });
  });
});
