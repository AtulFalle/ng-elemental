import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add attachment e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElAttachment', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'icon');
      runCli('add', 'button');
      runCli('add', 'attachment');

      const attachmentTs = await readFile(
        componentUiPath(tmp, 'attachment', 'attachment.ts'),
        'utf8',
      );
      expect(attachmentTs).toContain("selector: 'el-attachment'");
      expect(attachmentTs).toContain('export class ElAttachment');
      expect(attachmentTs).toContain('state');
      expect(attachmentTs).toContain('orientation');
      expect(attachmentTs).toContain("ElAttachmentState =");

      const actionTs = await readFile(
        componentUiPath(tmp, 'attachment', 'attachment-action.ts'),
        'utf8',
      );
      expect(actionTs).toContain("selector: 'el-attachment-action'");
      expect(actionTs).toContain('ElButton');

      const attachmentScss = await readFile(
        componentUiPath(tmp, 'attachment', 'attachment.scss'),
        'utf8',
      );
      expect(attachmentScss).toContain('.el-attachment');
      expect(attachmentScss).toContain('--el-attachment-bg');
      expect(attachmentScss).toContain('&--error');

      expect(
        existsSync(componentUiPath(tmp, 'attachment', 'attachment.stories.ts')),
      ).toBe(false);
      expect(
        existsSync(componentUiPath(tmp, 'attachment', 'attachment.token.ts')),
      ).toBe(true);
    });
  });
});
