import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add accordion e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElAccordion', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'accordion');

      const tokenTs = await readFile(
        componentUiPath(tmp, 'accordion', 'accordion.token.ts'),
        'utf8',
      );
      expect(tokenTs).toContain("ElAccordionVariant = 'single' | 'multiple'");
      expect(tokenTs).toContain('EL_ACCORDION');

      const accordionTs = await readFile(
        componentUiPath(tmp, 'accordion', 'accordion.ts'),
        'utf8',
      );
      expect(accordionTs).toContain("selector: 'el-accordion'");
      expect(accordionTs).toContain('export class ElAccordion');
      expect(accordionTs).toContain("variant = input<ElAccordionVariant>('single')");
      expect(accordionTs).toContain('export { ElAccordionItem }');
      expect(accordionTs).toContain('export { ElAccordionTitle }');
      expect(accordionTs).toContain('export { ElAccordionContent }');
      expect(accordionTs).toContain('ElAccordionItem');

      const itemTs = await readFile(
        componentUiPath(tmp, 'accordion', 'accordion-item.ts'),
        'utf8',
      );
      expect(itemTs).toContain("selector: 'el-accordion-item'");
      expect(itemTs).toContain('export class ElAccordionItem');
      expect(itemTs).toContain('ElIcon');

      const titleTs = await readFile(
        componentUiPath(tmp, 'accordion', 'accordion-title.ts'),
        'utf8',
      );
      expect(titleTs).toContain('ng-template[elAccordionTitle]');

      const subtitleTs = await readFile(
        componentUiPath(tmp, 'accordion', 'accordion-subtitle.ts'),
        'utf8',
      );
      expect(subtitleTs).toContain('ng-template[elAccordionSubtitle]');

      const contentTs = await readFile(
        componentUiPath(tmp, 'accordion', 'accordion-content.ts'),
        'utf8',
      );
      expect(contentTs).toContain('ng-template[elAccordionContent]');

      const itemHtml = await readFile(
        componentUiPath(tmp, 'accordion', 'accordion-item.html'),
        'utf8',
      );
      expect(itemHtml).toContain('el-accordion-item__header');
      expect(itemHtml).toContain('el-accordion-item__panel');
      expect(itemHtml).toContain('chevron-down');
      expect(itemHtml).toContain('ngTemplateOutlet');
      expect(itemHtml).toContain('elAccordionActions');
      expect(itemHtml).toContain('<ng-content');
      expect(itemHtml).toContain('aria-expanded');

      const accordionScss = await readFile(
        componentUiPath(tmp, 'accordion', 'accordion.scss'),
        'utf8',
      );
      expect(accordionScss).toContain('.el-accordion--disabled');
      expect(accordionScss).toContain('--el-color-surface');

      const itemScss = await readFile(
        componentUiPath(tmp, 'accordion', 'accordion-item.scss'),
        'utf8',
      );
      expect(itemScss).toContain('.el-accordion-item');
      expect(itemScss).toContain('--el-color-hover');
      expect(itemScss).toContain('grid-template-rows');

      expect(
        existsSync(componentUiPath(tmp, 'accordion', 'accordion.stories.ts')),
      ).toBe(false);
    });
  });
});
