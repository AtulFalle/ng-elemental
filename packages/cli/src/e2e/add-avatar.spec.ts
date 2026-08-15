import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add avatar e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElAvatar', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'icon');
      runCli('add', 'avatar');

      const avatarTs = await readFile(
        componentUiPath(tmp, 'avatar', 'avatar.ts'),
        'utf8',
      );
      expect(avatarTs).toContain("selector: 'el-avatar'");
      expect(avatarTs).toContain('export class ElAvatar');
      expect(avatarTs).toContain('initials');
      expect(avatarTs).toContain("from '../icon/icon'");

      const avatarHtml = await readFile(
        componentUiPath(tmp, 'avatar', 'avatar.html'),
        'utf8',
      );
      expect(avatarHtml).toContain('el-avatar__image');
      expect(avatarHtml).toContain('el-avatar__initials');
      expect(avatarHtml).toContain('el-icon');

      const avatarScss = await readFile(
        componentUiPath(tmp, 'avatar', 'avatar.scss'),
        'utf8',
      );
      expect(avatarScss).toContain('.el-avatar');
      expect(avatarScss).toContain('--el-color-primary-container');
      expect(avatarScss).toContain('--el-color-outline');
      expect(avatarScss).toContain('&--fallback');

      expect(existsSync(componentUiPath(tmp, 'avatar', 'avatar.stories.ts'))).toBe(
        false,
      );
    });
  });
});
