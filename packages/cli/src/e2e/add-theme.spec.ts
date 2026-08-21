import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { withCliConsumer } from './helpers';

describe('add theme e2e', () => {
  it('copies theme tokens without font files after --skip-theme', async () => {
    await withCliConsumer(
      async ({ tmp, runCli }) => {
        runCli('init', '--yes', '--skip-theme');
        runCli('add', 'theme');

        const themeDir = join(tmp, 'src/app/ui/theme');
        const tokens = await readFile(join(themeDir, 'tokens.scss'), 'utf8');
        expect(tokens).toContain('--el-font-sans');
        expect(tokens).toContain('--el-text-h1-size');
        expect(tokens).not.toContain("@use './fonts'");
        expect(existsSync(join(themeDir, 'fonts.scss'))).toBe(false);
        expect(existsSync(join(themeDir, 'typography.scss'))).toBe(true);
      },
      { skipInit: true },
    );
  });
});
