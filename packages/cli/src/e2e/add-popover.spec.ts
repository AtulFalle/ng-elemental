import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add popover e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElPopover', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'popover');

      const popoverTs = await readFile(
        componentUiPath(tmp, 'popover', 'popover.ts'),
        'utf8',
      );
      expect(popoverTs).toContain("selector: 'el-popover'");
      expect(popoverTs).toContain('export class ElPopover');
      expect(popoverTs).toContain('EL_POPOVER');

      const panelTs = await readFile(
        componentUiPath(tmp, 'popover', 'popover-panel.ts'),
        'utf8',
      );
      expect(panelTs).toContain("selector: 'el-popover-panel'");
      expect(panelTs).toContain('export class ElPopoverPanel');

      const triggerTs = await readFile(
        componentUiPath(tmp, 'popover', 'popover-trigger.ts'),
        'utf8',
      );
      expect(triggerTs).toContain("selector: '[elPopoverTrigger]'");

      const panelHtml = await readFile(
        componentUiPath(tmp, 'popover', 'popover-panel.html'),
        'utf8',
      );
      expect(panelHtml).toContain('role="dialog"');
      expect(panelHtml).toContain('elPopoverTitle');

      const panelScss = await readFile(
        componentUiPath(tmp, 'popover', 'popover-panel.scss'),
        'utf8',
      );
      expect(panelScss).toContain('.el-popover-panel');
      expect(panelScss).toContain('--el-color-surface');

      expect(
        existsSync(componentUiPath(tmp, 'popover', 'popover.stories.ts')),
      ).toBe(false);
    });
  });
});
