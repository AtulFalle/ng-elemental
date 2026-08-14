import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add checkbox e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElCheckbox', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'checkbox');

      const checkboxTs = await readFile(componentUiPath(tmp, 'checkbox', 'checkbox.ts'), 'utf8');
      expect(checkboxTs).toContain("selector: 'el-checkbox'");
      expect(checkboxTs).toContain('export class ElCheckbox');
      expect(checkboxTs).toContain("ElCheckboxLabelPosition = 'left' | 'right'");

      const checkboxHtml = await readFile(
        componentUiPath(tmp, 'checkbox', 'checkbox.html'),
        'utf8',
      );
      expect(checkboxHtml).toContain('el-checkbox');
      expect(checkboxHtml).toContain('<ng-content');
      expect(checkboxHtml).toContain('labelPosition');

      const checkboxScss = await readFile(
        componentUiPath(tmp, 'checkbox', 'checkbox.scss'),
        'utf8',
      );
      expect(checkboxScss).toContain('.el-checkbox');
      expect(checkboxScss).toContain('--el-checkbox-size');

      expect(existsSync(componentUiPath(tmp, 'checkbox', 'checkbox.stories.ts'))).toBe(false);
    });
  });
});
