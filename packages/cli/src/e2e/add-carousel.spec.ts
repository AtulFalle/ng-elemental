import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add carousel e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElCarousel', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'carousel');

      const carouselTs = await readFile(
        componentUiPath(tmp, 'carousel', 'carousel.ts'),
        'utf8',
      );
      expect(carouselTs).toContain("selector: 'el-carousel'");
      expect(carouselTs).toContain('export class ElCarousel');
      expect(carouselTs).toContain('autoplay');
      expect(carouselTs).toContain('peek');
      expect(carouselTs).toContain("aria-roledescription");
      expect(carouselTs).toContain("'el-carousel': true");

      const slideTs = await readFile(
        componentUiPath(tmp, 'carousel', 'carousel-slide.ts'),
        'utf8',
      );
      expect(slideTs).toContain("selector: 'el-carousel-slide'");
      expect(slideTs).toContain('export class ElCarouselSlide');

      const carouselHtml = await readFile(
        componentUiPath(tmp, 'carousel', 'carousel.html'),
        'utf8',
      );
      expect(carouselHtml).toContain('el-carousel-slide');
      expect(carouselHtml).toContain('chevron-left');
      expect(carouselHtml).toContain('chevron-right');
      expect(carouselHtml).toContain('el-carousel__dot');

      const slideHtml = await readFile(
        componentUiPath(tmp, 'carousel', 'carousel-slide.html'),
        'utf8',
      );
      expect(slideHtml).toContain('<ng-content');

      const utilsTs = await readFile(
        componentUiPath(tmp, 'carousel', 'carousel-utils.ts'),
        'utf8',
      );
      expect(utilsTs).toContain('nextIndex');
      expect(utilsTs).toContain('prevIndex');
      expect(utilsTs).toContain('indexFromDrag');

      const scss = await readFile(
        componentUiPath(tmp, 'carousel', 'carousel.scss'),
        'utf8',
      );
      expect(scss).toContain('.el-carousel');
      expect(scss).toContain('--el-color-primary');
      expect(scss).toContain('prefers-reduced-motion');

      expect(
        existsSync(componentUiPath(tmp, 'carousel', 'carousel.stories.ts')),
      ).toBe(false);
    });
  });
});
