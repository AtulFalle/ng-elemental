import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add icon e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElIcon', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'icon');

      const iconTs = await readFile(componentUiPath(tmp, 'icon', 'icon.ts'), 'utf8');
      expect(iconTs).toContain("selector: 'el-icon'");
      expect(iconTs).toContain('export class ElIcon');

      const iconScss = await readFile(componentUiPath(tmp, 'icon', 'icon.scss'), 'utf8');
      expect(iconScss).toContain('.el-icon');

      expect(existsSync(componentUiPath(tmp, 'icon', 'fontawesome.scss'))).toBe(true);
      expect(existsSync(componentUiPath(tmp, 'icon', 'icon.stories.ts'))).toBe(false);
    });
  });
});
