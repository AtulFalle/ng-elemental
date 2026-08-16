import { parseInitArgv, run } from './cli';

describe('MCP CLI', () => {
  it('parses init --client', () => {
    expect(parseInitArgv(['--client', 'cursor'])).toEqual({ client: 'cursor' });
    expect(parseInitArgv(['--client', 'claude'])).toEqual({ client: 'claude' });
    expect(parseInitArgv(['--client', 'vscode'])).toEqual({ client: 'vscode' });
    expect(parseInitArgv(['--client', 'codex'])).toEqual({ client: 'codex' });
  });

  it('rejects init without a supported client', () => {
    expect(() => parseInitArgv([])).toThrow(/--client/);
    expect(() => parseInitArgv(['--client', 'notepad'])).toThrow(/Unknown client/);
  });

  it('prints usage for --help without starting stdio', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    await run(['--help']);
    const output = log.mock.calls.map((call) => String(call[0])).join('\n');
    expect(output).toContain('@ng-elemental/mcp');
    expect(output).toContain('init --client');
    log.mockRestore();
  });

  it('rejects unknown commands', async () => {
    await expect(run(['serve'])).rejects.toThrow(/Unknown command/);
  });
});
