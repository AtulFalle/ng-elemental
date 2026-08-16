import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add resizable e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElResizable', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'resizable');

      const groupTs = await readFile(
        componentUiPath(tmp, 'resizable', 'resizable.ts'),
        'utf8',
      );
      expect(groupTs).toContain("selector: 'el-resizable'");
      expect(groupTs).toContain('export class ElResizable');
      expect(groupTs).toContain('EL_RESIZABLE');
      expect(groupTs).toContain('contentChildren');

      const panelTs = await readFile(
        componentUiPath(tmp, 'resizable', 'resizable-panel.ts'),
        'utf8',
      );
      expect(panelTs).toContain("selector: 'el-resizable-panel'");
      expect(panelTs).toContain('defaultSize');

      const handleTs = await readFile(
        componentUiPath(tmp, 'resizable', 'resizable-handle.ts'),
        'utf8',
      );
      expect(handleTs).toContain("selector: 'el-resizable-handle'");
      expect(handleTs).toContain("role: 'separator'");
      expect(handleTs).toContain('setPointerCapture');

      const groupHtml = await readFile(
        componentUiPath(tmp, 'resizable', 'resizable.html'),
        'utf8',
      );
      expect(groupHtml).toContain('<ng-content');

      const handleHtml = await readFile(
        componentUiPath(tmp, 'resizable', 'resizable-handle.html'),
        'utf8',
      );
      expect(handleHtml).toContain('el-resizable-handle__line');
      expect(handleHtml).toContain('<ng-content');

      const scss = await readFile(
        componentUiPath(tmp, 'resizable', 'resizable.scss'),
        'utf8',
      );
      expect(scss).toContain('.el-resizable');

      const handleScss = await readFile(
        componentUiPath(tmp, 'resizable', 'resizable-handle.scss'),
        'utf8',
      );
      expect(handleScss).toContain('--el-color-outline-variant');
      expect(handleScss).toContain('--el-color-primary');

      const utils = await readFile(
        componentUiPath(tmp, 'resizable', 'resizable-utils.ts'),
        'utf8',
      );
      expect(utils).toContain('normalizeSizes');
      expect(utils).toContain('applyResize');

      expect(
        existsSync(componentUiPath(tmp, 'resizable', 'resizable.stories.ts')),
      ).toBe(false);
    });
  });
});
