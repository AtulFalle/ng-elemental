import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElInfiniteScroll,
  ElList,
  ElListItem,
  ElProgress,
  ElTab,
  ElTabContent,
  ElTabs,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { DocsExample } from '../ui/docs-example';
import { DocsPager } from '../ui/docs-pager';
import { DocsSnippet } from '../ui/docs-snippet';
import { PropsTable } from '../ui/props-table';

type FeedItem = { id: number; title: string; description: string };

const PAGE_SIZE = 8;
const TOTAL_ITEMS = 40;

@Component({
  selector: 'app-infinite-scroll-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElInfiniteScroll,
    ElList,
    ElListItem,
    ElProgress,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './infinite-scroll-doc.html',
  styleUrl: './page.scss',
})
export class InfiniteScrollDocPage {
  protected readonly installTab = signal('cli');

  protected readonly items = signal<FeedItem[]>([]);
  protected readonly loading = signal(false);
  protected readonly complete = signal(false);
  private nextId = 1;

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add infinite-scroll
# demo uses list; add it when rendering rows:
npx @ng-elemental/cli add list`;

  protected readonly manualFilesCode = `ui/infinite-scroll/infinite-scroll.ts`;

  protected readonly importSnippet = `import { ElInfiniteScroll } from './ui/infinite-scroll/infinite-scroll'`;

  protected readonly usageSnippet = `<div
  elInfiniteScroll
  [disabled]="loading()"
  [complete]="done()"
  (loadMore)="loadPage()"
  style="max-height: 24rem; overflow: auto"
>
  <el-list>
    @for (item of items(); track item.id) {
      <el-list-item>{{ item.title }}</el-list-item>
    }
  </el-list>
</div>`;

  protected readonly heroCode = `<div
  elInfiniteScroll
  [disabled]="loading()"
  [complete]="complete()"
  (loadMore)="onLoadMore()"
  style="width: 100%; max-width: 28rem; max-height: 24rem; overflow: auto"
>
  <el-list appearance="plain" ariaLabel="Notifications">
    @for (item of items(); track item.id) {
      <el-list-item>
        <span elListTitle>{{ item.title }}</span>
        <span elListDescription>{{ item.description }}</span>
      </el-list-item>
    }
  </el-list>
</div>`;

  protected readonly usageCode = `<div
  elInfiniteScroll
  [disabled]="loading()"
  [complete]="done()"
  (loadMore)="loadPage()"
  style="max-height: 24rem; overflow: auto"
>
  <el-list appearance="plain">
    @for (item of items(); track item.id) {
      <el-list-item>
        <span elListTitle>{{ item.title }}</span>
        <span elListDescription>{{ item.description }}</span>
      </el-list-item>
    }
  </el-list>
</div>`;

  protected readonly scopedTokensCode = `.feed-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description:
        'Skip loadMore while a page is in flight. Bind to your loading flag.',
    },
    {
      name: 'complete',
      type: 'boolean',
      default: 'false',
      description: 'Stop requesting when the last page is already loaded.',
    },
    {
      name: 'rootMargin',
      type: 'string',
      default: "'160px'",
      description: 'IntersectionObserver rootMargin for prefetch.',
    },
    {
      name: 'threshold',
      type: 'number',
      default: '0',
      description: 'IntersectionObserver threshold.',
    },
    {
      name: 'root',
      type: "'host' | 'viewport'",
      default: "'host'",
      description:
        'host uses this element as the scroll root (set overflow + max-height). viewport observes the window.',
    },
  ];

  protected readonly outputs: PropDefinition[] = [
    {
      name: 'loadMore',
      type: 'void',
      default: '—',
      description:
        'Fires when the sentinel is visible and disabled/complete are false. Parent owns pages.',
    },
  ];

  protected onLoadMore(): void {
    if (this.loading() || this.complete()) {
      return;
    }
    this.loading.set(true);
    window.setTimeout(() => {
      const page: FeedItem[] = [];
      for (let i = 0; i < PAGE_SIZE && this.nextId <= TOTAL_ITEMS; i += 1) {
        const id = this.nextId;
        this.nextId += 1;
        page.push({
          id,
          title: `Notification ${id}`,
          description: `Paginated row ${id} of ${TOTAL_ITEMS}`,
        });
      }
      this.items.update((current) => [...current, ...page]);
      this.complete.set(this.nextId > TOTAL_ITEMS);
      this.loading.set(false);
    }, 500);
  }
}
