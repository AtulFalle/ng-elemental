import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add tooltip e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElTooltip', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'tooltip');

      const tooltipTs = await readFile(
        componentUiPath(tmp, 'tooltip', 'tooltip.ts'),
        'utf8',
      );
      expect(tooltipTs).toContain("selector: '[elTooltip]'");
      expect(tooltipTs).toContain('export class ElTooltip');
      expect(tooltipTs).toContain('@Directive');
      expect(tooltipTs).toContain('elTooltipOpen');
      expect(tooltipTs).toContain('createComponent');

      const bubbleTs = await readFile(
        componentUiPath(tmp, 'tooltip', 'tooltip-bubble.ts'),
        'utf8',
      );
      expect(bubbleTs).toContain("selector: 'el-tooltip-bubble'");
      expect(bubbleTs).toContain('export class ElTooltipBubble');

      const bubbleScss = await readFile(
        componentUiPath(tmp, 'tooltip', 'tooltip-bubble.scss'),
        'utf8',
      );
      expect(bubbleScss).toContain('--el-color-inverse-surface');
      expect(bubbleScss).toContain('--el-color-inverse-on-surface');
      expect(bubbleScss).toContain('el-tooltip-bubble__arrow');

      expect(
        existsSync(componentUiPath(tmp, 'tooltip', 'tooltip.stories.ts')),
      ).toBe(false);
      expect(
        existsSync(
          componentUiPath(tmp, 'tooltip', 'tooltip-bubble.stories.ts'),
        ),
      ).toBe(false);
    });
  });
});
