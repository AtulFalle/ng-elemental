import { existsSync, readFileSync } from 'node:fs';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { addCommand } from './add';
import { initCommand } from './init';

async function makeAngularApp(): Promise<string> {
  const tmp = await mkdtemp(join(tmpdir(), 'el-add-result-'));
  await writeFile(
    join(tmp, 'package.json'),
    `${JSON.stringify({ dependencies: { '@angular/core': '22.0.0' } })}\n`,
  );
  return tmp;
}

describe('addCommand result', () => {
  let tmp: string;

  afterEach(async () => {
    if (tmp) {
      await rm(tmp, { recursive: true, force: true });
    }
  });

  it('returns dest path, import path, usage, and copied files', async () => {
    tmp = await makeAngularApp();
    await initCommand({ cwd: tmp, yes: true, skipTheme: true });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const result = addCommand({ cwd: tmp, name: 'button' });

    expect(result.name).toBe('button');
    expect(result.destDir).toBe('src/app/ui/button');
    expect(result.importPath).toBe('./ui/button/button');
    expect(result.classNames).toEqual(['ElButton']);
    expect(result.usage).toContain('el-button');
    expect(result.files).toContain('button.ts');
    expect(result.files).toContain('button.html');
    expect(result.files).toContain('button.scss');
    expect(result.warnings.some((warning) => /theme/i.test(warning))).toBe(true);
    expect(existsSync(join(tmp, result.destDir, 'button.ts'))).toBe(true);
    expect(readFileSync(join(tmp, result.destDir, 'button.ts'), 'utf8')).toContain(
      "selector: 'el-button'",
    );
    expect(log).toHaveBeenCalled();

    log.mockRestore();
    warn.mockRestore();
  });

  it('returns a structured result with quiet: true and writes no stdout', async () => {
    tmp = await makeAngularApp();
    await initCommand({ cwd: tmp, yes: true, skipTheme: true, quiet: true });
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const result = addCommand({ cwd: tmp, name: 'button', quiet: true });

    expect(result.name).toBe('button');
    expect(result.destDir).toBe('src/app/ui/button');
    expect(result.importPath).toBe('./ui/button/button');
    expect(result.classNames).toEqual(['ElButton']);
    expect(result.usage).toContain('el-button');
    expect(result.files).toContain('button.ts');
    expect(result.warnings.some((warning) => /theme/i.test(warning))).toBe(true);
    expect(log).not.toHaveBeenCalled();
    expect(warn).not.toHaveBeenCalled();

    log.mockRestore();
    warn.mockRestore();
  });
});
