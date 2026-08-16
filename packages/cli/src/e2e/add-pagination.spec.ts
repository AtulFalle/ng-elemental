import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add pagination e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElPagination', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'pagination');

      const paginationTs = await readFile(
        componentUiPath(tmp, 'pagination', 'pagination.ts'),
        'utf8',
      );
      expect(paginationTs).toContain("selector: 'el-pagination'");
      expect(paginationTs).toContain('export class ElPagination');
      expect(paginationTs).toContain('readonly page');
      expect(paginationTs).toContain('readonly pageSize');
      expect(paginationTs).toContain('readonly total');
      expect(paginationTs).toContain('ElButton');
      expect(paginationTs).toContain('ElSelect');
      expect(paginationTs).toContain("role: 'navigation'");

      const utilsTs = await readFile(
        componentUiPath(tmp, 'pagination', 'pagination-utils.ts'),
        'utf8',
      );
      expect(utilsTs).toContain('paginationItems');
      expect(utilsTs).toContain('paginationPageCount');

      const paginationHtml = await readFile(
        componentUiPath(tmp, 'pagination', 'pagination.html'),
        'utf8',
      );
      expect(paginationHtml).toContain('el-button');
      expect(paginationHtml).toContain('chevron-left');
      expect(paginationHtml).toContain('aria-current');
      expect(paginationHtml).toContain('el-select');

      const paginationScss = await readFile(
        componentUiPath(tmp, 'pagination', 'pagination.scss'),
        'utf8',
      );
      expect(paginationScss).toContain('.el-pagination');
      expect(paginationScss).toContain('--el-color-on-surface');

      expect(
        existsSync(componentUiPath(tmp, 'pagination', 'pagination.stories.ts')),
      ).toBe(false);
    });
  });
});
