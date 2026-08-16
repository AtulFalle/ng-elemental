import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add container e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElContainer', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'container');

      const containerTs = await readFile(
        componentUiPath(tmp, 'container', 'container.ts'),
        'utf8',
      );
      expect(containerTs).toContain("selector: 'el-container'");
      expect(containerTs).toContain('export class ElContainer');
      expect(containerTs).toContain(
        "ElContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'",
      );
      expect(containerTs).toContain('padded');

      const containerHtml = await readFile(
        componentUiPath(tmp, 'container', 'container.html'),
        'utf8',
      );
      expect(containerHtml).toContain('<ng-content');

      const containerScss = await readFile(
        componentUiPath(tmp, 'container', 'container.scss'),
        'utf8',
      );
      expect(containerScss).toContain('.el-container');
      expect(containerScss).toContain('--el-space-4');

      expect(
        existsSync(componentUiPath(tmp, 'container', 'container.stories.ts')),
      ).toBe(false);
    });
  });
});
