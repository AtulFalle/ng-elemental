import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add select e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElSelect', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'select');

      const selectTs = await readFile(componentUiPath(tmp, 'select', 'select.ts'), 'utf8');
      expect(selectTs).toContain("selector: 'el-select'");
      expect(selectTs).toContain('export class ElSelect');
      expect(selectTs).toContain("ElSelectSize = 'sm' | 'md' | 'lg'");

      const itemTs = await readFile(
        componentUiPath(tmp, 'select', 'select-item.ts'),
        'utf8',
      );
      expect(itemTs).toContain("selector: 'el-select-item'");
      expect(itemTs).toContain('export class ElSelectItem');
      expect(itemTs).toContain('ElIcon');

      const groupTs = await readFile(
        componentUiPath(tmp, 'select', 'select-group.ts'),
        'utf8',
      );
      expect(groupTs).toContain("selector: 'el-select-group'");

      const valueTs = await readFile(
        componentUiPath(tmp, 'select', 'select-value.ts'),
        'utf8',
      );
      expect(valueTs).toContain('ng-template[elSelectValue]');

      const selectHtml = await readFile(
        componentUiPath(tmp, 'select', 'select.html'),
        'utf8',
      );
      expect(selectHtml).toContain('el-select');
      expect(selectHtml).toContain('<ng-content');
      expect(selectHtml).toContain('Select all');
      expect(selectHtml).toContain('el-icon');
      expect(selectHtml).toContain('chevron-down');

      const selectScss = await readFile(
        componentUiPath(tmp, 'select', 'select.scss'),
        'utf8',
      );
      expect(selectScss).toContain('.el-select');
      expect(selectScss).toContain('--el-color-outline-variant');

      expect(existsSync(componentUiPath(tmp, 'select', 'select.stories.ts'))).toBe(
        false,
      );
    });
  });
});
