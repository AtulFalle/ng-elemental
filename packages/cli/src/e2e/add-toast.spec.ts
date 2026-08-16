import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add toast e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElToast', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'toast');

      const toastTs = await readFile(
        componentUiPath(tmp, 'toast', 'toast.ts'),
        'utf8',
      );
      expect(toastTs).toContain("selector: 'el-toast'");
      expect(toastTs).toContain('export class ElToast');

      const toastHtml = await readFile(
        componentUiPath(tmp, 'toast', 'toast.html'),
        'utf8',
      );
      expect(toastHtml).toContain('el-toast__message');
      expect(toastHtml).toContain('<el-icon');

      const toastScss = await readFile(
        componentUiPath(tmp, 'toast', 'toast.scss'),
        'utf8',
      );
      expect(toastScss).toContain('.el-toast');
      expect(toastScss).toContain('--el-color-inverse-surface');

      const toasterTs = await readFile(
        componentUiPath(tmp, 'toast', 'toaster.ts'),
        'utf8',
      );
      expect(toasterTs).toContain("selector: 'el-toaster'");
      expect(toasterTs).toContain('export class ElToaster');
      expect(toasterTs).toContain('ElToastService');

      const serviceTs = await readFile(
        componentUiPath(tmp, 'toast', 'toast.service.ts'),
        'utf8',
      );
      expect(serviceTs).toContain('export class ElToastService');
      expect(serviceTs).toContain('providedIn: \'root\'');
      expect(serviceTs).toContain('show(');

      expect(existsSync(componentUiPath(tmp, 'toast', 'toast.stories.ts'))).toBe(
        false,
      );
      expect(
        existsSync(componentUiPath(tmp, 'toast', 'toaster.stories.ts')),
      ).toBe(false);
    });
  });
});
