import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add skeleton e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElSkeleton', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'skeleton');

      const skeletonTs = await readFile(
        componentUiPath(tmp, 'skeleton', 'skeleton.ts'),
        'utf8',
      );
      expect(skeletonTs).toContain("selector: 'el-skeleton'");
      expect(skeletonTs).toContain('export class ElSkeleton');
      expect(skeletonTs).toContain(
        "ElSkeletonVariant = 'text' | 'circular' | 'rectangular'",
      );
      expect(skeletonTs).toContain('ElSkeletonDirective');

      const skeletonHtml = await readFile(
        componentUiPath(tmp, 'skeleton', 'skeleton.html'),
        'utf8',
      );
      expect(skeletonHtml).toContain('el-skeleton__bar');

      const skeletonScss = await readFile(
        componentUiPath(tmp, 'skeleton', 'skeleton.scss'),
        'utf8',
      );
      expect(skeletonScss).toContain('.el-skeleton');
      expect(skeletonScss).toContain('--el-color-surface-container-highest');

      const targetTs = await readFile(
        componentUiPath(tmp, 'skeleton', 'skeleton-target.ts'),
        'utf8',
      );
      expect(targetTs).toContain("selector: '[elSkeleton]'");
      expect(targetTs).toContain('export class ElSkeletonDirective');
      expect(targetTs).toContain('createComponent');

      const coverTs = await readFile(
        componentUiPath(tmp, 'skeleton', 'skeleton-cover.ts'),
        'utf8',
      );
      expect(coverTs).toContain("selector: 'el-skeleton-cover'");
      expect(coverTs).toContain('export class ElSkeletonCover');

      expect(
        existsSync(componentUiPath(tmp, 'skeleton', 'skeleton.stories.ts')),
      ).toBe(false);
    });
  });
});
