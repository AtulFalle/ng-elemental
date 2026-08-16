import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add list e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElList', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'list');

      const listTs = await readFile(
        componentUiPath(tmp, 'list', 'list.ts'),
        'utf8',
      );
      expect(listTs).toContain("selector: 'el-list'");
      expect(listTs).toContain('export class ElList');
      expect(listTs).toContain('appearance');
      expect(listTs).toContain('divided');
      expect(listTs).toContain("ElListAppearance = 'outlined' | 'plain'");
      expect(listTs).toContain("export { ElListItem }");
      expect(listTs).toContain('ElListItemDef');
      expect(listTs).toContain('virtual');
      expect(listTs).toContain("role: 'list'");
      expect(listTs).toContain("'el-list': true");

      const itemTs = await readFile(
        componentUiPath(tmp, 'list', 'list-item.ts'),
        'utf8',
      );
      expect(itemTs).toContain("selector: 'el-list-item'");
      expect(itemTs).toContain('export class ElListItem');
      expect(itemTs).toContain('interactive');
      expect(itemTs).toContain('activated');

      const listHtml = await readFile(
        componentUiPath(tmp, 'list', 'list.html'),
        'utf8',
      );
      expect(listHtml).toContain('<ng-content');
      expect(listHtml).toContain('elListItemDef');
      expect(listHtml).toContain('virtual()');

      const itemDefTs = await readFile(
        componentUiPath(tmp, 'list', 'list-item-def.ts'),
        'utf8',
      );
      expect(itemDefTs).toContain('ng-template[elListItemDef]');
      expect(itemDefTs).toContain('export class ElListItemDef');

      const virtualTs = await readFile(
        componentUiPath(tmp, 'list', 'list-virtual.ts'),
        'utf8',
      );
      expect(virtualTs).toContain('listVirtualWindow');

      const itemHtml = await readFile(
        componentUiPath(tmp, 'list', 'list-item.html'),
        'utf8',
      );
      expect(itemHtml).toContain('elListLeading');
      expect(itemHtml).toContain('elListTitle');
      expect(itemHtml).toContain('elListDescription');
      expect(itemHtml).toContain('elListTrailing');

      const listScss = await readFile(
        componentUiPath(tmp, 'list', 'list.scss'),
        'utf8',
      );
      expect(listScss).toContain('.el-list');
      expect(listScss).toContain('--el-color-surface');
      expect(listScss).toContain('&--outlined');
      expect(listScss).toContain('&--divided');

      const itemScss = await readFile(
        componentUiPath(tmp, 'list', 'list-item.scss'),
        'utf8',
      );
      expect(itemScss).toContain('.el-list-item');
      expect(itemScss).toContain('--el-color-hover');
      expect(itemScss).toContain('&--selected');

      expect(existsSync(componentUiPath(tmp, 'list', 'list.stories.ts'))).toBe(
        false,
      );
    });
  });
});
