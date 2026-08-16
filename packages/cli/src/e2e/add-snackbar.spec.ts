import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add snackbar e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElSnackbar', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'snackbar');

      const snackbarTs = await readFile(
        componentUiPath(tmp, 'snackbar', 'snackbar.ts'),
        'utf8',
      );
      expect(snackbarTs).toContain("selector: 'el-snackbar'");
      expect(snackbarTs).toContain('export class ElSnackbar');
      expect(snackbarTs).toContain('ElIcon');

      const snackbarHtml = await readFile(
        componentUiPath(tmp, 'snackbar', 'snackbar.html'),
        'utf8',
      );
      expect(snackbarHtml).toContain('el-snackbar__message');
      expect(snackbarHtml).toContain('el-snackbar__action');
      expect(snackbarHtml).toContain('elSnackbarActions');
      expect(snackbarHtml).toContain('<ng-content');
      expect(snackbarHtml).toContain('xmark');

      const snackbarScss = await readFile(
        componentUiPath(tmp, 'snackbar', 'snackbar.scss'),
        'utf8',
      );
      expect(snackbarScss).toContain('.el-snackbar');
      expect(snackbarScss).toContain('--el-color-inverse-surface');

      const serviceTs = await readFile(
        componentUiPath(tmp, 'snackbar', 'snackbar.service.ts'),
        'utf8',
      );
      expect(serviceTs).toContain('export class ElSnackbarService');
      expect(serviceTs).toContain("providedIn: 'root'");
      expect(serviceTs).toContain('open(');

      const refTs = await readFile(
        componentUiPath(tmp, 'snackbar', 'snackbar-ref.ts'),
        'utf8',
      );
      expect(refTs).toContain('export class ElSnackbarRef');
      expect(refTs).toContain('afterClosed');

      expect(
        existsSync(componentUiPath(tmp, 'snackbar', 'snackbar.stories.ts')),
      ).toBe(false);
    });
  });
});
