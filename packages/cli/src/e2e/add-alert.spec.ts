import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add alert e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElAlert', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'alert');

      const alertTs = await readFile(
        componentUiPath(tmp, 'alert', 'alert.ts'),
        'utf8',
      );
      expect(alertTs).toContain("selector: 'el-alert'");
      expect(alertTs).toContain('export class ElAlert');
      expect(alertTs).toContain(
        "ElAlertColor = 'neutral' | 'success' | 'error' | 'warning' | 'info'",
      );
      expect(alertTs).toContain('dismissed');

      const alertHtml = await readFile(
        componentUiPath(tmp, 'alert', 'alert.html'),
        'utf8',
      );
      expect(alertHtml).toContain('el-alert__message');
      expect(alertHtml).toContain('<el-icon');

      const alertScss = await readFile(
        componentUiPath(tmp, 'alert', 'alert.scss'),
        'utf8',
      );
      expect(alertScss).toContain('.el-alert');
      expect(alertScss).toContain('--el-color-success-container');
      expect(alertScss).toContain('--el-color-error-container');

      expect(existsSync(componentUiPath(tmp, 'alert', 'alert.stories.ts'))).toBe(
        false,
      );
    });
  });
});
