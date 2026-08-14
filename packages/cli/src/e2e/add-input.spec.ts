import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add input e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElInput', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'input');

      const inputTs = await readFile(componentUiPath(tmp, 'input', 'input.ts'), 'utf8');
      expect(inputTs).toContain("selector: 'el-input'");
      expect(inputTs).toContain('export class ElInput');
      expect(inputTs).toContain("ElInputSize = 'sm' | 'md' | 'lg'");
      expect(inputTs).toContain("selector: '[elInputPrefix]'");
      expect(inputTs).toContain("selector: '[elInputSuffix]'");
      expect(inputTs).toContain('applyInputMask');

      const inputHtml = await readFile(componentUiPath(tmp, 'input', 'input.html'), 'utf8');
      expect(inputHtml).toContain('el-input');
      expect(inputHtml).toContain('<ng-content');
      expect(inputHtml).toContain('[elInputPrefix]');
      expect(inputHtml).toContain('[elInputSuffix]');

      const inputScss = await readFile(componentUiPath(tmp, 'input', 'input.scss'), 'utf8');
      expect(inputScss).toContain('.el-input');
      expect(inputScss).toContain('--el-input-border');

      expect(existsSync(componentUiPath(tmp, 'input', 'input.stories.ts'))).toBe(false);
    });
  });
});
