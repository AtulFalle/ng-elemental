import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add file-upload e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElFileUpload', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'icon');
      runCli('add', 'button');
      runCli('add', 'form-error');
      runCli('add', 'attachment');
      runCli('add', 'file-upload');

      const uploadTs = await readFile(
        componentUiPath(tmp, 'file-upload', 'file-upload.ts'),
        'utf8',
      );
      expect(uploadTs).toContain("selector: 'el-file-upload'");
      expect(uploadTs).toContain('export class ElFileUpload');
      expect(uploadTs).toContain('files = model');
      expect(uploadTs).toContain('multiple');
      expect(uploadTs).toContain('ElAttachment');

      const uploadHtml = await readFile(
        componentUiPath(tmp, 'file-upload', 'file-upload.html'),
        'utf8',
      );
      expect(uploadHtml).toContain('dropzoneClass()');
      expect(uploadHtml).toContain('type="file"');
      expect(uploadHtml).toContain('el-attachment');
      expect(uploadHtml).toContain('el-form-error');

      const uploadScss = await readFile(
        componentUiPath(tmp, 'file-upload', 'file-upload.scss'),
        'utf8',
      );
      expect(uploadScss).toContain('.el-file-upload');
      expect(uploadScss).toContain('.el-file-upload__dropzone');
      expect(uploadScss).toContain('--el-color-outline-variant');
      expect(uploadScss).toContain('&--active');

      expect(
        existsSync(
          componentUiPath(tmp, 'file-upload', 'file-upload.stories.ts'),
        ),
      ).toBe(false);
      expect(
        existsSync(
          componentUiPath(tmp, 'file-upload', 'file-upload-utils.ts'),
        ),
      ).toBe(true);
    });
  });
});
