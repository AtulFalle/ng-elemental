import { run } from './cli';

describe('list command', () => {
  it('prints catalog names and titles', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    await run(['list']);
    const output = log.mock.calls.map((call) => String(call[0])).join('\n');
    expect(output).toContain('button');
    expect(output).toContain('Button');
    expect(output).toContain('dialog');
    log.mockRestore();
  });

  it('filters by --kind', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    await run(['list', '--kind', 'directive']);
    const output = log.mock.calls.map((call) => String(call[0])).join('\n');
    expect(output).toContain('tooltip');
    expect(output).toContain('infinite-scroll');
    expect(output).not.toContain('el-button');
    log.mockRestore();
  });
});
