import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add dialog e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElDialog', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'dialog');

      const dialogTs = await readFile(
        componentUiPath(tmp, 'dialog', 'dialog.ts'),
        'utf8',
      );
      expect(dialogTs).toContain("selector: 'el-dialog'");
      expect(dialogTs).toContain('export class ElDialog');
      expect(dialogTs).toContain('ElIcon');

      const closeTs = await readFile(
        componentUiPath(tmp, 'dialog', 'dialog-close.ts'),
        'utf8',
      );
      expect(closeTs).toContain("selector: '[elDialogClose]'");
      expect(closeTs).toContain('ElDialogRef');

      const serviceTs = await readFile(
        componentUiPath(tmp, 'dialog', 'dialog.service.ts'),
        'utf8',
      );
      expect(serviceTs).toContain('export class ElDialogService');
      expect(serviceTs).toContain("providedIn: 'root'");
      expect(serviceTs).toContain('open<');
      expect(serviceTs).toContain('EL_DIALOG_DATA');

      const refTs = await readFile(
        componentUiPath(tmp, 'dialog', 'dialog-ref.ts'),
        'utf8',
      );
      expect(refTs).toContain('export class ElDialogRef');
      expect(refTs).toContain('afterClosed');

      const outletTs = await readFile(
        componentUiPath(tmp, 'dialog', 'dialog-outlet.ts'),
        'utf8',
      );
      expect(outletTs).toContain("selector: 'el-dialog-outlet'");

      const dialogHtml = await readFile(
        componentUiPath(tmp, 'dialog', 'dialog.html'),
        'utf8',
      );
      expect(dialogHtml).toContain('role="dialog"');
      expect(dialogHtml).toContain('elDialogContent');
      expect(dialogHtml).toContain('el-dialog__content');
      expect(dialogHtml).toContain('xmark');

      const dialogScss = await readFile(
        componentUiPath(tmp, 'dialog', 'dialog.scss'),
        'utf8',
      );
      expect(dialogScss).toContain('.el-dialog');
      expect(dialogScss).toContain('--el-color-surface');
      expect(dialogScss).toContain('overflow-y: auto');
      expect(dialogScss).toContain('100dvh');

      expect(existsSync(componentUiPath(tmp, 'dialog', 'dialog.stories.ts'))).toBe(
        false,
      );
    });
  });
});
