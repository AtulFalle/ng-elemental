import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add sheet e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElSheet', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'sheet');

      const sheetTs = await readFile(
        componentUiPath(tmp, 'sheet', 'sheet.ts'),
        'utf8',
      );
      expect(sheetTs).toContain("selector: 'el-sheet'");
      expect(sheetTs).toContain('export class ElSheet');
      expect(sheetTs).toContain('ElIcon');

      const closeTs = await readFile(
        componentUiPath(tmp, 'sheet', 'sheet-close.ts'),
        'utf8',
      );
      expect(closeTs).toContain("selector: '[elSheetClose]'");
      expect(closeTs).toContain('ElSheetRef');

      const serviceTs = await readFile(
        componentUiPath(tmp, 'sheet', 'sheet.service.ts'),
        'utf8',
      );
      expect(serviceTs).toContain('export class ElSheetService');
      expect(serviceTs).toContain("providedIn: 'root'");
      expect(serviceTs).toContain('open<');
      expect(serviceTs).toContain('EL_SHEET_DATA');

      const refTs = await readFile(
        componentUiPath(tmp, 'sheet', 'sheet-ref.ts'),
        'utf8',
      );
      expect(refTs).toContain('export class ElSheetRef');
      expect(refTs).toContain('afterClosed');

      const outletTs = await readFile(
        componentUiPath(tmp, 'sheet', 'sheet-outlet.ts'),
        'utf8',
      );
      expect(outletTs).toContain("selector: 'el-sheet-outlet'");

      const sheetHtml = await readFile(
        componentUiPath(tmp, 'sheet', 'sheet.html'),
        'utf8',
      );
      expect(sheetHtml).toContain('role="dialog"');
      expect(sheetHtml).toContain('elSheetContent');
      expect(sheetHtml).toContain('el-sheet__content');
      expect(sheetHtml).toContain('xmark');

      const sheetScss = await readFile(
        componentUiPath(tmp, 'sheet', 'sheet.scss'),
        'utf8',
      );
      expect(sheetScss).toContain('.el-sheet');
      expect(sheetScss).toContain('--el-color-surface');
      expect(sheetScss).toContain('overflow-y: auto');
      expect(sheetScss).toContain('100dvh');

      expect(existsSync(componentUiPath(tmp, 'sheet', 'sheet.stories.ts'))).toBe(
        false,
      );
    });
  });
});
