import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { componentUiPath, withCliConsumer } from './helpers';

describe('add infinite-scroll e2e', () => {
  it('installs @ng-elemental/cli from npm and adds ElInfiniteScroll', async () => {
    await withCliConsumer(async ({ tmp, runCli }) => {
      runCli('add', 'infinite-scroll');

      const scrollTs = await readFile(
        componentUiPath(tmp, 'infinite-scroll', 'infinite-scroll.ts'),
        'utf8',
      );
      expect(scrollTs).toContain("selector: '[elInfiniteScroll]'");
      expect(scrollTs).toContain('export class ElInfiniteScroll');
      expect(scrollTs).toContain('@Directive');
      expect(scrollTs).toContain('loadMore');
      expect(scrollTs).toContain('complete');
      expect(scrollTs).toContain('IntersectionObserver');
      expect(scrollTs).toContain("ElInfiniteScrollRoot = 'host' | 'viewport'");
      expect(scrollTs).toContain('el-infinite-scroll__sentinel');

      expect(
        existsSync(
          componentUiPath(tmp, 'infinite-scroll', 'infinite-scroll.stories.ts'),
        ),
      ).toBe(false);
    });
  });
});
