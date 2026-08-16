import { existsSync, readdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { withCliConsumer } from './helpers';

describe('init e2e', () => {
  it('copies theme tokens, patches styles.scss, and does not ship font files', async () => {
    await withCliConsumer(async ({ tmp, installedRoot }) => {
      const themeDir = join(tmp, 'src/app/ui/theme');
      expect(existsSync(join(themeDir, 'tokens.scss'))).toBe(true);
      expect(existsSync(join(themeDir, 'theme.ts'))).toBe(true);
      expect(existsSync(join(themeDir, 'fonts.scss'))).toBe(false);

      const themeFiles = readdirSync(themeDir);
      expect(themeFiles.some((file) => file.endsWith('.woff2'))).toBe(false);

      const installedTheme = readdirSync(join(installedRoot, 'registry/theme'));
      expect(installedTheme).not.toContain('fonts.scss');
      expect(installedTheme.some((file) => file.endsWith('.woff2'))).toBe(false);

      const styles = await readFile(join(tmp, 'src/styles.scss'), 'utf8');
      expect(styles).toContain("@use './app/ui/theme/tokens'");
      expect(styles).toContain('--el-font-sans');
    });
  });

  it('honors --path and --skip-theme', async () => {
    await withCliConsumer(
      async ({ tmp, runCli }) => {
        runCli('init', '--yes', '--path', 'libs/ui', '--skip-theme');

        const config = JSON.parse(await readFile(join(tmp, 'elemental.json'), 'utf8')) as {
          componentsDir: string;
        };
        expect(config.componentsDir).toBe('libs/ui');
        expect(existsSync(join(tmp, 'libs/ui'))).toBe(true);
        expect(existsSync(join(tmp, 'libs/ui/theme'))).toBe(false);
        expect(existsSync(join(tmp, 'src/app/ui'))).toBe(false);
      },
      { skipInit: true },
    );
  });
});
