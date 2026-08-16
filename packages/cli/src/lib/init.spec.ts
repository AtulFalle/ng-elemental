import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { addCommand } from './add';
import { initCommand } from './init';

async function makeAngularApp(options?: {
  stylesPath?: string;
  stylesContent?: string;
}): Promise<string> {
  const tmp = await mkdtemp(join(tmpdir(), 'el-init-'));
  await writeFile(
    join(tmp, 'package.json'),
    `${JSON.stringify({ dependencies: { '@angular/core': '22.0.0' } })}\n`,
  );
  if (options?.stylesPath) {
    const full = join(tmp, options.stylesPath);
    await mkdir(join(full, '..'), { recursive: true });
    await writeFile(full, options.stylesContent ?? '/* app */\n');
  }
  return tmp;
}

describe('initCommand', () => {
  let tmp: string;

  afterEach(async () => {
    if (tmp) {
      await rm(tmp, { recursive: true, force: true });
    }
  });

  it('writes elemental.json with the default path and skips prompts when --yes is set', async () => {
    tmp = await makeAngularApp();
    await initCommand({ cwd: tmp, yes: true, skipTheme: true });

    const config = JSON.parse(readFileSync(join(tmp, 'elemental.json'), 'utf8')) as {
      componentsDir: string;
    };
    expect(config.componentsDir).toBe('src/app/ui');
    expect(existsSync(join(tmp, 'src/app/ui'))).toBe(true);
  });

  it('writes --path to elemental.json', async () => {
    tmp = await makeAngularApp();
    await initCommand({ cwd: tmp, yes: true, path: 'libs/ui', skipTheme: true });

    const config = JSON.parse(readFileSync(join(tmp, 'elemental.json'), 'utf8')) as {
      componentsDir: string;
    };
    expect(config.componentsDir).toBe('libs/ui');
    expect(existsSync(join(tmp, 'libs/ui'))).toBe(true);
  });

  it('does not overwrite an existing componentsDir', async () => {
    tmp = await makeAngularApp();
    writeFileSync(
      join(tmp, 'elemental.json'),
      `${JSON.stringify({ componentsDir: 'existing/ui' }, null, 2)}\n`,
    );
    await mkdir(join(tmp, 'existing/ui'), { recursive: true });

    await initCommand({ cwd: tmp, yes: true, path: 'libs/ui', skipTheme: true });

    const config = JSON.parse(readFileSync(join(tmp, 'elemental.json'), 'utf8')) as {
      componentsDir: string;
    };
    expect(config.componentsDir).toBe('existing/ui');
    expect(existsSync(join(tmp, 'libs/ui'))).toBe(false);
  });

  it('does not copy theme when --skip-theme is set', async () => {
    tmp = await makeAngularApp();
    await initCommand({ cwd: tmp, yes: true, skipTheme: true });
    expect(existsSync(join(tmp, 'src/app/ui/theme'))).toBe(false);
  });

  it('copies theme tokens without font files when --yes is set', async () => {
    tmp = await makeAngularApp();
    await initCommand({ cwd: tmp, yes: true });

    const themeDir = join(tmp, 'src/app/ui/theme');
    expect(existsSync(join(themeDir, 'tokens.scss'))).toBe(true);
    expect(existsSync(join(themeDir, 'theme.ts'))).toBe(true);
    expect(existsSync(join(themeDir, 'theme.token.ts'))).toBe(true);

    const files = readdirSync(themeDir);
    expect(files.some((file) => file.endsWith('.woff2'))).toBe(false);
    expect(files).not.toContain('fonts.scss');
  });

  it('skips copying theme when it already exists', async () => {
    tmp = await makeAngularApp();
    await initCommand({ cwd: tmp, yes: true });
    await initCommand({ cwd: tmp, yes: true });

    expect(existsSync(join(tmp, 'src/app/ui/theme/tokens.scss'))).toBe(true);
  });

  it('appends a tokens @use and font comments to an existing stylesheet', async () => {
    tmp = await makeAngularApp({
      stylesPath: 'src/styles.scss',
      stylesContent: '/* app */\n',
    });
    await initCommand({ cwd: tmp, yes: true });

    const styles = readFileSync(join(tmp, 'src/styles.scss'), 'utf8');
    expect(styles).toContain("@use './app/ui/theme/tokens'");
    expect(styles).toContain('--el-font-sans');
    expect(styles).toContain('/* app */');
  });

  it('does not duplicate the tokens @use on a second init', async () => {
    tmp = await makeAngularApp({
      stylesPath: 'src/styles.scss',
      stylesContent: '/* app */\n',
    });
    await initCommand({ cwd: tmp, yes: true });
    await initCommand({ cwd: tmp, yes: true });

    const styles = readFileSync(join(tmp, 'src/styles.scss'), 'utf8');
    expect(styles.match(/theme\/tokens/g)?.length).toBe(1);
  });

  it('does not throw when no stylesheet exists', async () => {
    tmp = await makeAngularApp();
    await expect(initCommand({ cwd: tmp, yes: true })).resolves.toBeUndefined();
  });
});

describe('addCommand theme warning', () => {
  let tmp: string;

  afterEach(async () => {
    if (tmp) {
      await rm(tmp, { recursive: true, force: true });
    }
  });

  it('warns when adding a widget before theme is installed', async () => {
    tmp = await makeAngularApp();
    await initCommand({ cwd: tmp, yes: true, skipTheme: true });

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    addCommand({ cwd: tmp, name: 'button' });
    expect(warn).toHaveBeenCalledWith(expect.stringMatching(/theme/i));
    warn.mockRestore();
  });
});
