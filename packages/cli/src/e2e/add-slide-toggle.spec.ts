import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add slide-toggle e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElSlideToggle', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'slide-toggle');

      const slideToggleTs = await readFile(
        componentUiPath(tmp, 'slide-toggle', 'slide-toggle.ts'),
        'utf8',
      );
      expect(slideToggleTs).toContain("selector: 'el-slide-toggle'");
      expect(slideToggleTs).toContain('export class ElSlideToggle');
      expect(slideToggleTs).toContain("ElSlideToggleSize = 'sm' | 'md' | 'lg'");
      expect(slideToggleTs).toContain("ElSlideToggleLabelPosition = 'left' | 'right'");

      const slideToggleHtml = await readFile(
        componentUiPath(tmp, 'slide-toggle', 'slide-toggle.html'),
        'utf8',
      );
      expect(slideToggleHtml).toContain('el-slide-toggle');
      expect(slideToggleHtml).toContain('role="switch"');
      expect(slideToggleHtml).toContain('<ng-content');
      expect(slideToggleHtml).toContain('[elSlideToggleTrackOnIcon]');
      expect(slideToggleHtml).toContain('[elSlideToggleTrackOffIcon]');
      expect(slideToggleHtml).toContain('[elSlideToggleThumbOnIcon]');
      expect(slideToggleHtml).toContain('[elSlideToggleThumbOffIcon]');

      const slideToggleScss = await readFile(
        componentUiPath(tmp, 'slide-toggle', 'slide-toggle.scss'),
        'utf8',
      );
      expect(slideToggleScss).toContain('.el-slide-toggle');
      expect(slideToggleScss).toContain('--el-slide-toggle-track-on-bg');
      expect(slideToggleScss).toContain('--el-slide-toggle-track-off-bg');

      expect(existsSync(componentUiPath(tmp, 'slide-toggle', 'slide-toggle.stories.ts'))).toBe(
        false,
      );
    });
  });
});
