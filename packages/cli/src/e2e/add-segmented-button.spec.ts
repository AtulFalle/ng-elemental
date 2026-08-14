import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add segmented-button e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElSegmentedButton', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'segmented-button');

      const groupTs = await readFile(
        componentUiPath(tmp, 'segmented-button', 'segmented-button.ts'),
        'utf8',
      );
      expect(groupTs).toContain("selector: 'el-segmented-button'");
      expect(groupTs).toContain('export class ElSegmentedButton');
      expect(groupTs).toContain('export { ElSegmentedButtonItem }');

      const itemTs = await readFile(
        componentUiPath(tmp, 'segmented-button', 'segmented-button-item.ts'),
        'utf8',
      );
      expect(itemTs).toContain("selector: 'el-segmented-button-item'");
      expect(itemTs).toContain('export class ElSegmentedButtonItem');

      const groupHtml = await readFile(
        componentUiPath(tmp, 'segmented-button', 'segmented-button.html'),
        'utf8',
      );
      expect(groupHtml).toContain('<ng-content');

      const groupScss = await readFile(
        componentUiPath(tmp, 'segmented-button', 'segmented-button.scss'),
        'utf8',
      );
      expect(groupScss).toContain(':host');

      const itemScss = await readFile(
        componentUiPath(tmp, 'segmented-button', 'segmented-button-item.scss'),
        'utf8',
      );
      expect(itemScss).toContain(':host(.el-segmented-button-item--selected)');
    });
  });
});
