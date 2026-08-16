import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add table e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElTable', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'table');

      const tokenTs = await readFile(
        componentUiPath(tmp, 'table', 'table.token.ts'),
        'utf8',
      );
      expect(tokenTs).toContain("ElTableExpandVariant = 'single' | 'multiple'");
      expect(tokenTs).toContain('EL_TABLE');

      const tableTs = await readFile(
        componentUiPath(tmp, 'table', 'table.ts'),
        'utf8',
      );
      expect(tableTs).toContain("selector: 'el-table'");
      expect(tableTs).toContain('export class ElTable');
      expect(tableTs).toContain('export { ElTableColumn }');
      expect(tableTs).toContain('export { ElTableHeader }');
      expect(tableTs).toContain('export { ElTableCell }');
      expect(tableTs).toContain('export { ElTableExpand }');
      expect(tableTs).toContain('readonly data');
      expect(tableTs).toContain('readonly sort');
      expect(tableTs).toContain('readonly expanded');
      expect(tableTs).toContain('virtual');
      expect(tableTs).toContain('ElIcon');

      const columnTs = await readFile(
        componentUiPath(tmp, 'table', 'table-column.ts'),
        'utf8',
      );
      expect(columnTs).toContain("selector: 'el-table-column'");
      expect(columnTs).toContain('sortable');
      expect(columnTs).toContain('ElTableHeader');
      expect(columnTs).toContain('ElTableCell');

      const headerTs = await readFile(
        componentUiPath(tmp, 'table', 'table-header.ts'),
        'utf8',
      );
      expect(headerTs).toContain('ng-template[elTableHeader]');

      const cellTs = await readFile(
        componentUiPath(tmp, 'table', 'table-cell-def.ts'),
        'utf8',
      );
      expect(cellTs).toContain('ng-template[elTableCell]');

      const expandTs = await readFile(
        componentUiPath(tmp, 'table', 'table-expand.ts'),
        'utf8',
      );
      expect(expandTs).toContain('ng-template[elTableExpand]');

      const virtualTs = await readFile(
        componentUiPath(tmp, 'table', 'table-virtual.ts'),
        'utf8',
      );
      expect(virtualTs).toContain('tableVirtualWindow');
      expect(virtualTs).toContain('tableCellText');

      const tableHtml = await readFile(
        componentUiPath(tmp, 'table', 'table.html'),
        'utf8',
      );
      expect(tableHtml).toContain('el-table__table');
      expect(tableHtml).toContain('cellTemplate');
      expect(tableHtml).toContain('elTableEmpty');
      expect(tableHtml).toContain('elTableLoading');
      expect(tableHtml).toContain('el-pagination');
      expect(tableHtml).toContain('aria-sort');
      expect(tableHtml).toContain('ngTemplateOutlet');

      const tableScss = await readFile(
        componentUiPath(tmp, 'table', 'table.scss'),
        'utf8',
      );
      expect(tableScss).toContain('.el-table');
      expect(tableScss).toContain('--el-color-surface');
      expect(tableScss).toContain('&--striped');
      expect(tableScss).toContain('&--sticky');

      expect(existsSync(componentUiPath(tmp, 'table', 'table.stories.ts'))).toBe(
        false,
      );
    });
  });
});
