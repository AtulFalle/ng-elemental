import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add form-error e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElFormError', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'form-error');

      const formErrorTs = await readFile(
        componentUiPath(tmp, 'form-error', 'form-error.ts'),
        'utf8',
      );
      expect(formErrorTs).toContain("selector: 'el-form-error'");
      expect(formErrorTs).toContain('export class ElFormError');
      expect(formErrorTs).toContain("role: 'alert'");

      const formErrorHtml = await readFile(
        componentUiPath(tmp, 'form-error', 'form-error.html'),
        'utf8',
      );
      expect(formErrorHtml).toContain('el-form-error');
      expect(formErrorHtml).toContain('<ng-content');

      const formErrorScss = await readFile(
        componentUiPath(tmp, 'form-error', 'form-error.scss'),
        'utf8',
      );
      expect(formErrorScss).toContain('.el-form-error');
      expect(formErrorScss).toContain('--el-form-error-fg');

      expect(
        existsSync(componentUiPath(tmp, 'form-error', 'form-error.stories.ts')),
      ).toBe(false);
    });
  });
});
