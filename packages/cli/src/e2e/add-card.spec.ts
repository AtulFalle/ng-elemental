import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add card e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElCard', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'card');

      const cardTs = await readFile(
        componentUiPath(tmp, 'card', 'card.ts'),
        'utf8',
      );
      expect(cardTs).toContain("selector: 'el-card'");
      expect(cardTs).toContain('export class ElCard');
      expect(cardTs).toContain('appearance');
      expect(cardTs).toContain('size');
      expect(cardTs).toContain("ElCardAppearance = 'outlined' | 'elevated'");
      expect(cardTs).toContain("ElCardSize = 'default' | 'compact'");

      const cardHtml = await readFile(
        componentUiPath(tmp, 'card', 'card.html'),
        'utf8',
      );
      expect(cardHtml).toContain('elCardMedia');
      expect(cardHtml).toContain('elCardHeader');
      expect(cardHtml).toContain('elCardContent');
      expect(cardHtml).toContain('elCardFooter');
      expect(cardHtml).toContain('el-card__body');

      const cardScss = await readFile(
        componentUiPath(tmp, 'card', 'card.scss'),
        'utf8',
      );
      expect(cardScss).toContain('.el-card');
      expect(cardScss).toContain('--el-card-bg');
      expect(cardScss).toContain('--el-card-elevated-shadow');
      expect(cardScss).toContain('--el-card-compact-padding');
      expect(cardScss).toContain('&--outlined');
      expect(cardScss).toContain('&--compact');

      expect(existsSync(componentUiPath(tmp, 'card', 'card.stories.ts'))).toBe(
        false,
      );
    });
  });
});
