import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add empty-state e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElEmptyState', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'empty-state');

      const emptyTs = await readFile(
        componentUiPath(tmp, 'empty-state', 'empty-state.ts'),
        'utf8',
      );
      expect(emptyTs).toContain("selector: 'el-empty-state'");
      expect(emptyTs).toContain('export class ElEmptyState');
      expect(emptyTs).toContain('ElIcon');

      const emptyHtml = await readFile(
        componentUiPath(tmp, 'empty-state', 'empty-state.html'),
        'utf8',
      );
      expect(emptyHtml).toContain('elEmptyStateMedia');
      expect(emptyHtml).toContain('elEmptyStateActions');
      expect(emptyHtml).toContain('el-empty-state__title');

      const emptyScss = await readFile(
        componentUiPath(tmp, 'empty-state', 'empty-state.scss'),
        'utf8',
      );
      expect(emptyScss).toContain('.el-empty-state');
      expect(emptyScss).toContain('--el-color-on-surface');

      expect(
        existsSync(componentUiPath(tmp, 'empty-state', 'empty-state.stories.ts')),
      ).toBe(false);
    });
  });
});
