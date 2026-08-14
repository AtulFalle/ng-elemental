import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add button e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElButton', async () => {
    await withCliConsumer(async ({ tmp, installedRoot, runCli }) => {
      const installedPkg = JSON.parse(
        await readFile(join(installedRoot, 'package.json'), 'utf8'),
      ) as {
        name?: string;
        bin?: Record<string, string>;
        dependencies?: Record<string, string>;
      };
      expect(installedPkg.name).toBe('@ng-elemental/cli');
      expect(installedPkg.bin?.['ng-elemental']).toBe('./index.cjs');
      expect(installedPkg.dependencies?.['@angular/core']).toBeUndefined();

      const config = JSON.parse(await readFile(join(tmp, 'elemental.json'), 'utf8')) as {
        componentsDir: string;
      };
      expect(config.componentsDir).toBe('src/app/ui');

      runCli('add', 'button');

      const buttonTs = await readFile(componentUiPath(tmp, 'button', 'button.ts'), 'utf8');
      expect(buttonTs).toContain("selector: 'el-button'");
      expect(buttonTs).toContain('export class ElButton');

      const buttonHtml = await readFile(componentUiPath(tmp, 'button', 'button.html'), 'utf8');
      expect(buttonHtml).toContain('el-button');
      expect(buttonHtml).toContain('<ng-content');

      const buttonScss = await readFile(componentUiPath(tmp, 'button', 'button.scss'), 'utf8');
      expect(buttonScss).toContain('.el-button');
      expect(buttonScss).toContain('--el-font-sans');

      expect(existsSync(componentUiPath(tmp, 'button', 'button.stories.ts'))).toBe(false);
    });
  });
});
