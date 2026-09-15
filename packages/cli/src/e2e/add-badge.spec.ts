import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add badge e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElBadge', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'badge');

      const badgeTs = await readFile(
        componentUiPath(tmp, 'badge', 'badge.ts'),
        'utf8',
      );
      expect(badgeTs).toContain("selector: 'el-badge'");
      expect(badgeTs).toContain('export class ElBadge');
      expect(badgeTs).toContain("ElBadgeVariant = 'auto' | 'overlay' | 'pill'");
      expect(badgeTs).toContain('showZero');
      expect(badgeTs).toContain('placement');
      expect(badgeTs).toContain('optionalNumberAttribute');
      expect(badgeTs).not.toContain('afterRenderEffect');

      const badgeHtml = await readFile(
        componentUiPath(tmp, 'badge', 'badge.html'),
        'utf8',
      );
      expect(badgeHtml).toContain('el-badge__anchor');
      expect(badgeHtml).toContain('el-badge__indicator');
      expect(badgeHtml).toContain('el-badge__label');
      expect(badgeHtml).toContain('<ng-content');
      expect(badgeHtml).toContain('indicatorRole()');
      expect(badgeHtml).not.toContain('title');

      const badgeScss = await readFile(
        componentUiPath(tmp, 'badge', 'badge.scss'),
        'utf8',
      );
      expect(badgeScss).toContain('.el-badge');
      expect(badgeScss).toContain('text-overflow: ellipsis');
      expect(badgeScss).toContain('--el-color-error');
      expect(badgeScss).toContain('--el-color-primary');
      expect(badgeScss).toContain('el-badge-host--overlay');
      expect(badgeScss).toContain('el-badge-host--pill');
      expect(badgeScss).toContain(':has(.el-badge__anchor > *)');
      expect(badgeScss).toContain(':dir(rtl)');

      expect(existsSync(componentUiPath(tmp, 'badge', 'badge.stories.ts'))).toBe(
        false,
      );
    });
  });
});
