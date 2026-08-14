import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add progress e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElProgress + ElProgressCircle', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'progress');

      const progressTs = await readFile(
        componentUiPath(tmp, 'progress', 'progress.ts'),
        'utf8',
      );
      expect(progressTs).toContain("selector: 'el-progress'");
      expect(progressTs).toContain('export class ElProgress');
      expect(progressTs).toContain('showValue');
      expect(progressTs).toContain('indeterminate');

      const progressHtml = await readFile(
        componentUiPath(tmp, 'progress', 'progress.html'),
        'utf8',
      );
      expect(progressHtml).toContain('el-progress__track');
      expect(progressHtml).toContain('el-progress__fill');

      const progressScss = await readFile(
        componentUiPath(tmp, 'progress', 'progress.scss'),
        'utf8',
      );
      expect(progressScss).toContain('.el-progress');
      expect(progressScss).toContain('--el-progress-track-bg');
      expect(progressScss).toContain('--el-progress-fill-bg');

      const circleTs = await readFile(
        componentUiPath(tmp, 'progress', 'progress-circle.ts'),
        'utf8',
      );
      expect(circleTs).toContain("selector: 'el-progress-circle'");
      expect(circleTs).toContain('export class ElProgressCircle');

      const circleHtml = await readFile(
        componentUiPath(tmp, 'progress', 'progress-circle.html'),
        'utf8',
      );
      expect(circleHtml).toContain('el-progress-circle__svg');
      expect(circleHtml).toContain('stroke-dashoffset');

      const utilsTs = await readFile(
        componentUiPath(tmp, 'progress', 'progress-utils.ts'),
        'utf8',
      );
      expect(utilsTs).toContain('progressPercent');
      expect(utilsTs).toContain("ElProgressSize = 'sm' | 'md' | 'lg'");

      expect(existsSync(componentUiPath(tmp, 'progress', 'progress.stories.ts'))).toBe(
        false,
      );
    });
  });
});
