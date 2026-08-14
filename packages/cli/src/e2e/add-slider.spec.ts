import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add slider e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElSlider', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'slider');

      const sliderTs = await readFile(
        componentUiPath(tmp, 'slider', 'slider.ts'),
        'utf8',
      );
      expect(sliderTs).toContain("selector: 'el-slider'");
      expect(sliderTs).toContain('export class ElSlider');
      expect(sliderTs).toContain('showTicks');
      expect(sliderTs).toContain('showValue');
      expect(sliderTs).toContain('range');

      const sliderHtml = await readFile(
        componentUiPath(tmp, 'slider', 'slider.html'),
        'utf8',
      );
      expect(sliderHtml).toContain('el-slider__rail');
      expect(sliderHtml).toContain('el-slider__thumb');
      expect(sliderHtml).toContain('el-slider__fill');

      const sliderScss = await readFile(
        componentUiPath(tmp, 'slider', 'slider.scss'),
        'utf8',
      );
      expect(sliderScss).toContain('.el-slider');
      expect(sliderScss).toContain('--el-slider-track-bg');
      expect(sliderScss).toContain('--el-slider-fill-bg');

      const utilsTs = await readFile(
        componentUiPath(tmp, 'slider', 'slider-utils.ts'),
        'utf8',
      );
      expect(utilsTs).toContain('snapSliderValue');
      expect(utilsTs).toContain('sliderTickValues');
      expect(utilsTs).toContain("ElSliderSize = 'sm' | 'md' | 'lg'");

      expect(existsSync(componentUiPath(tmp, 'slider', 'slider.stories.ts'))).toBe(
        false,
      );
    });
  });
});
