import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  numberAttribute,
} from '@angular/core';
import { ElButton, type ElButtonSize } from '../button/button';
import { ElSelect, ElSelectItem } from '../select/select';
import {
  paginationItems,
  paginationPageCount,
} from './pagination-utils';

export type ElPaginationSize = ElButtonSize;

@Component({
  selector: 'el-pagination',
  imports: [ElButton, ElSelect, ElSelectItem],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-pagination',
    '[class.el-pagination--sm]': 'size() === "sm"',
    '[class.el-pagination--md]': 'size() === "md"',
    '[class.el-pagination--lg]': 'size() === "lg"',
    role: 'navigation',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class ElPagination {
  readonly page = model(1);
  readonly pageSize = model(20);
  readonly total = input(0, { transform: numberAttribute });
  readonly pageSizeOptions = input<readonly number[]>([10, 20, 50]);
  readonly siblingCount = input(1, { transform: numberAttribute });
  readonly showFirstLast = input(true, { transform: booleanAttribute });
  readonly showPageSize = input(false, { transform: booleanAttribute });
  readonly size = input<ElPaginationSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input('Pagination');

  protected readonly pageCount = computed(() =>
    paginationPageCount(this.total(), this.pageSize()),
  );

  protected readonly currentPage = computed(() =>
    Math.min(Math.max(1, this.page()), this.pageCount()),
  );

  protected readonly items = computed(() =>
    paginationItems(
      this.currentPage(),
      this.pageCount(),
      this.siblingCount(),
    ),
  );

  protected readonly atStart = computed(() => this.currentPage() <= 1);
  protected readonly atEnd = computed(
    () => this.currentPage() >= this.pageCount(),
  );

  protected readonly pageSizeValue = computed(() => String(this.pageSize()));

  protected readonly showSizeSelect = computed(
    () => this.showPageSize() && this.pageSizeOptions().length > 0,
  );

  protected goTo(page: number): void {
    if (this.disabled()) {
      return;
    }
    const next = Math.min(Math.max(1, page), this.pageCount());
    this.page.set(next);
  }

  protected prev(): void {
    this.goTo(this.currentPage() - 1);
  }

  protected next(): void {
    this.goTo(this.currentPage() + 1);
  }

  protected first(): void {
    this.goTo(1);
  }

  protected last(): void {
    this.goTo(this.pageCount());
  }

  protected onPageSizeChange(value: string | string[]): void {
    const raw = Array.isArray(value) ? value[0] : value;
    const size = Number(raw);
    if (!Number.isFinite(size) || size <= 0) {
      return;
    }
    this.pageSize.set(size);
    this.page.set(1);
  }

  protected isCurrent(page: number): boolean {
    return page === this.currentPage();
  }

  protected isEllipsis(item: number | 'ellipsis'): item is 'ellipsis' {
    return item === 'ellipsis';
  }
}
