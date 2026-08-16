import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add chip e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElChip', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'chip');

      const chipTs = await readFile(componentUiPath(tmp, 'chip', 'chip.ts'), 'utf8');
      expect(chipTs).toContain("selector: 'el-chip'");
      expect(chipTs).toContain('export class ElChip');
      expect(chipTs).toContain("ElChipType = 'assist' | 'filter' | 'suggestion'");
      expect(chipTs).toContain(
        "ElChipColor = 'neutral' | 'success' | 'error' | 'warning' | 'info'",
      );

      const chipHtml = await readFile(componentUiPath(tmp, 'chip', 'chip.html'), 'utf8');
      expect(chipHtml).toContain('el-chip');
      expect(chipHtml).toContain('<ng-content');
      expect(chipHtml).toContain('<el-icon');

      const chipScss = await readFile(componentUiPath(tmp, 'chip', 'chip.scss'), 'utf8');
      expect(chipScss).toContain('.el-chip');
      expect(chipScss).toContain('--el-color-outline');
      expect(chipScss).toContain('--el-color-success-container');

      expect(existsSync(componentUiPath(tmp, 'chip', 'chip.stories.ts'))).toBe(false);
    });
  });
});
