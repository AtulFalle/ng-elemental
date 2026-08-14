import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add label e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElLabel', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'label');

      const labelTs = await readFile(componentUiPath(tmp, 'label', 'label.ts'), 'utf8');
      expect(labelTs).toContain("selector: 'el-label'");
      expect(labelTs).toContain('export class ElLabel');
      expect(labelTs).toContain("ElLabelVariant = 'default' | 'muted' | 'error'");

      const labelHtml = await readFile(componentUiPath(tmp, 'label', 'label.html'), 'utf8');
      expect(labelHtml).toContain('el-label');
      expect(labelHtml).toContain('<ng-content');
      expect(labelHtml).toContain('[attr.for]');

      const labelScss = await readFile(componentUiPath(tmp, 'label', 'label.scss'), 'utf8');
      expect(labelScss).toContain('.el-label');
      expect(labelScss).toContain('--el-font-sans');

      expect(existsSync(componentUiPath(tmp, 'label', 'label.stories.ts'))).toBe(false);
    });
  });
});
