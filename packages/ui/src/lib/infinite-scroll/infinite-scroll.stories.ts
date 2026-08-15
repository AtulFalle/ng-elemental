import type { Meta, StoryObj } from '@storybook/angular-vite';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { ElList } from '../list/list';
import { ElListItem } from '../list/list-item';
import { ElProgress } from '../progress/progress';
import { ElInfiniteScroll } from './infinite-scroll';

type InboxItem = { id: number; title: string; description: string };

const PAGE_SIZE = 12;
const TOTAL_ITEMS = 60;

@Component({
  selector: 'el-infinite-scroll-story-host',
  imports: [ElInfiniteScroll, ElList, ElListItem, ElProgress],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .el-infinite-scroll-demo {
      max-width: 28rem;
      max-height: 24rem;
      overflow: auto;
    }

    .el-infinite-scroll-demo__status {
      margin: 0;
      padding: 0.75rem 1rem 1rem;
      color: var(--el-color-on-surface-variant);
      font-family: var(--el-font-sans);
      font-size: 0.75rem;
      text-align: center;
    }

    .el-infinite-scroll-demo__status--loading {
      padding-block: 0.5rem 1rem;
    }
  `,
  template: `
    <div
      class="el-infinite-scroll-demo"
      elInfiniteScroll
      [disabled]="loading()"
      [complete]="complete()"
      (loadMore)="onLoadMore()"
    >
      <el-list appearance="plain" ariaLabel="Notifications">
        @for (item of items(); track item.id) {
          <el-list-item>
            <span elListTitle>{{ item.title }}</span>
            <span elListDescription>{{ item.description }}</span>
          </el-list-item>
        }
      </el-list>
      @if (loading()) {
        <div class="el-infinite-scroll-demo__status el-infinite-scroll-demo__status--loading">
          <el-progress indeterminate size="sm" />
        </div>
      } @else if (complete()) {
        <p class="el-infinite-scroll-demo__status">End of list</p>
      }
    </div>
  `,
})
class InfiniteScrollStoryHost {
  protected readonly items = signal<InboxItem[]>([]);
  protected readonly loading = signal(false);
  protected readonly complete = signal(false);
  private nextId = 1;

  protected onLoadMore(): void {
    if (this.loading() || this.complete()) {
      return;
    }
    this.loading.set(true);
    window.setTimeout(() => {
      const page: InboxItem[] = [];
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
    }, 650);
  }
}

const meta: Meta = {
  title: 'Components/Infinite Scroll',
  render: () => ({
    moduleMetadata: { imports: [InfiniteScrollStoryHost] },
    template: `<el-infinite-scroll-story-host />`,
  }),
};

export default meta;
type Story = StoryObj;

export const WithList: Story = {};
