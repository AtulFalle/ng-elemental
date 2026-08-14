import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add radio e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElRadio', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'radio');

      const radioTs = await readFile(componentUiPath(tmp, 'radio', 'radio.ts'), 'utf8');
      expect(radioTs).toContain("selector: 'el-radio'");
      expect(radioTs).toContain('export class ElRadio');
      expect(radioTs).toContain("ElRadioLabelPosition = 'left' | 'right'");

      const radioGroupTs = await readFile(
        componentUiPath(tmp, 'radio', 'radio-group.ts'),
        'utf8',
      );
      expect(radioGroupTs).toContain("selector: 'el-radio-group'");
      expect(radioGroupTs).toContain('export class ElRadioGroup');
      expect(radioGroupTs).toContain("ElRadioGroupDirection = 'vertical' | 'horizontal'");

      const radioHtml = await readFile(componentUiPath(tmp, 'radio', 'radio.html'), 'utf8');
      expect(radioHtml).toContain('el-radio');
      expect(radioHtml).toContain('type="radio"');
      expect(radioHtml).toContain('<ng-content');

      const radioScss = await readFile(componentUiPath(tmp, 'radio', 'radio.scss'), 'utf8');
      expect(radioScss).toContain('.el-radio');
      expect(radioScss).toContain('--el-radio-size');

      expect(existsSync(componentUiPath(tmp, 'radio', 'radio.stories.ts'))).toBe(false);
    });
  });
});
