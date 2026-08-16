import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add tree e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElTree', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'tree');

      const treeTs = await readFile(
        componentUiPath(tmp, 'tree', 'tree.ts'),
        'utf8',
      );
      expect(treeTs).toContain("selector: 'el-tree'");
      expect(treeTs).toContain('export class ElTree');
      expect(treeTs).toContain('checkbox');
      expect(treeTs).toContain('virtual');
      expect(treeTs).toContain('loadChildren');
      expect(treeTs).toContain("role: 'tree'");
      expect(treeTs).toContain("'el-tree': true");

      const itemTs = await readFile(
        componentUiPath(tmp, 'tree', 'tree-item.ts'),
        'utf8',
      );
      expect(itemTs).toContain("selector: 'el-tree-item'");
      expect(itemTs).toContain('export class ElTreeItem');
      expect(itemTs).toContain("role: 'treeitem'");
      expect(itemTs).toContain('chevron-right');

      const treeHtml = await readFile(
        componentUiPath(tmp, 'tree', 'tree.html'),
        'utf8',
      );
      expect(treeHtml).toContain('<ng-content');
      expect(treeHtml).toContain('elTreeNodeDef');
      expect(treeHtml).toContain('virtual()');
      expect(treeHtml).toContain('Load more');

      const itemHtml = await readFile(
        componentUiPath(tmp, 'tree', 'tree-item.html'),
        'utf8',
      );
      expect(itemHtml).toContain('elTreeLeading');
      expect(itemHtml).toContain('elTreeActions');
      expect(itemHtml).toContain('el-checkbox');
      expect(itemHtml).toContain('chevronName');

      const itemDefTs = await readFile(
        componentUiPath(tmp, 'tree', 'tree-node-def.ts'),
        'utf8',
      );
      expect(itemDefTs).toContain('ng-template[elTreeNodeDef]');
      expect(itemDefTs).toContain('export class ElTreeNodeDef');

      const tokenTs = await readFile(
        componentUiPath(tmp, 'tree', 'tree.token.ts'),
        'utf8',
      );
      expect(tokenTs).toContain('EL_TREE');

      const utilsTs = await readFile(
        componentUiPath(tmp, 'tree', 'tree-utils.ts'),
        'utf8',
      );
      expect(utilsTs).toContain('flattenVisible');
      expect(utilsTs).toContain('toggleChecked');
      expect(utilsTs).toContain('checkState');

      const virtualTs = await readFile(
        componentUiPath(tmp, 'tree', 'tree-virtual.ts'),
        'utf8',
      );
      expect(virtualTs).toContain('treeVirtualWindow');

      const treeScss = await readFile(
        componentUiPath(tmp, 'tree', 'tree.scss'),
        'utf8',
      );
      expect(treeScss).toContain('.el-tree');
      expect(treeScss).toContain('--el-color-outline-variant');
      expect(treeScss).toContain('&--outlined');

      const itemScss = await readFile(
        componentUiPath(tmp, 'tree', 'tree-item.scss'),
        'utf8',
      );
      expect(itemScss).toContain('.el-tree-item');
      expect(itemScss).toContain('--el-color-hover');
      expect(itemScss).toContain('el-tree-level');

      expect(existsSync(componentUiPath(tmp, 'tree', 'tree.stories.ts'))).toBe(
        false,
      );
    });
  });
});
