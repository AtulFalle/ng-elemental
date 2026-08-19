import { NgTemplateOutlet } from '@angular/common';
import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  numberAttribute,
  signal,
  viewChild,
} from '@angular/core';
import { ElIcon } from '../icon/icon';
import { ElTableColumn } from './table-column';
import { ElTableExpand } from './table-expand';
import {
  EL_TABLE,
  type ElTableAppearance,
  type ElTableContext,
  type ElTableExpanded,
  type ElTableExpandVariant,
  type ElTableSize,
  type ElTableSort,
} from './table.token';
import {
  tableCellText,
  tableRowId,
  tableVirtualWindow,
} from './table-virtual';

export type {
  ElTableAlign,
  ElTableAppearance,
  ElTableContext,
  ElTableExpanded,
  ElTableExpandVariant,
  ElTableSize,
  ElTableSort,
  ElTableSortDirection,
} from './table.token';
export { EL_TABLE } from './table.token';
export { ElTableColumn } from './table-column';
export { ElTableHeader } from './table-header';
export { ElTableCell } from './table-cell-def';
export { ElTableExpand } from './table-expand';

@Component({
  selector: 'el-table',
  imports: [NgTemplateOutlet, ElIcon],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_TABLE, useExisting: ElTable }],
  host: {
    class: 'el-table-host',
    '[class.el-table-host--virtual]': 'virtual()',
  },
})
export class ElTable implements ElTableContext {
  private static nextId = 0;

  readonly data = input<readonly object[]>([]);
  readonly track = input('id');
  readonly size = input<ElTableSize>('md');
  readonly appearance = input<ElTableAppearance>('outlined');
  readonly striped = input(false, { transform: booleanAttribute });
  readonly stickyHeader = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly empty = input(false, { transform: booleanAttribute });
  readonly expandVariant = input<ElTableExpandVariant>('single');
  readonly virtual = input(false, { transform: booleanAttribute });
  readonly itemHeight = input(44, { transform: numberAttribute });
  readonly overscan = input(5, { transform: numberAttribute });
  readonly caption = input('');
  readonly ariaLabel = input<string>();

  readonly sort = model<ElTableSort>(null);
  readonly expanded = model<ElTableExpanded>('');

  private readonly destroyRef = inject(DestroyRef);
  private readonly uid = ElTable.nextId++;
  private readonly columnsQuery = contentChildren(ElTableColumn);
  private readonly expandDef = contentChild(ElTableExpand);
  private readonly viewportRef =
    viewChild<ElementRef<HTMLElement>>('viewport');

  private readonly scrollTop = signal(0);
  private readonly viewportHeight = signal(0);
  private resizeObserver: ResizeObserver | null = null;
  private watchedViewport: HTMLElement | null = null;

  protected readonly columns = computed(() => this.columnsQuery());
  protected readonly expandTemplate = computed(
    () => this.expandDef()?.template,
  );

  protected readonly canExpand = computed(
    () => !!this.expandTemplate() && !this.virtual(),
  );

  protected readonly colSpan = computed(() => {
    const n = this.columns().length;
    return this.canExpand() ? n + 1 : n;
  });

  protected readonly hasWidths = computed(() =>
    this.columns().some((column) => !!column.width()),
  );

  protected readonly showEmpty = computed(
    () => !this.loading() && (this.empty() || this.data().length === 0),
  );

  protected readonly showStatus = computed(
    () => this.loading() || this.showEmpty(),
  );

  protected readonly virtualWindow = computed(() =>
    tableVirtualWindow({
      scrollTop: this.scrollTop(),
      viewportHeight: this.viewportHeight(),
      itemCount: this.data().length,
      itemHeight: this.itemHeight(),
      overscan: this.overscan(),
    }),
  );

  protected readonly visibleRows = computed(() => {
    const rows = this.data();
    const track = this.track();
    if (this.showStatus()) {
      return [];
    }
    const toItem = (row: object, index: number) => ({
      row,
      index,
      id: tableRowId(row, index, track),
    });
    if (!this.virtual()) {
      return rows.map(toItem);
    }
    const win = this.virtualWindow();
    return rows.slice(win.start, win.end).map((row, offset) =>
      toItem(row, win.start + offset),
    );
  });

  protected readonly rootClass = computed(() => ({
    'el-table': true,
    [`el-table--${this.appearance()}`]: true,
    [`el-table--${this.size()}`]: true,
    'el-table--striped': this.striped(),
    'el-table--sticky': this.stickyHeader(),
    'el-table--virtual': this.virtual(),
    'el-table--fixed': this.hasWidths(),
  }));

  constructor() {
    this.destroyRef.onDestroy(() => this.disconnectViewport());

    afterRenderEffect(() => {
      if (!this.virtual()) {
        this.disconnectViewport();
        return;
      }
      const el = this.viewportRef()?.nativeElement;
      if (!el) {
        return;
      }
      this.attachViewport(el);
      this.viewportHeight.set(el.clientHeight);
      this.scrollTop.set(el.scrollTop);
    });
  }

  toggleSort(name: string): void {
    const current = this.sort();
    if (!current || current.name !== name) {
      this.sort.set({ name, direction: 'asc' });
      return;
    }
    if (current.direction === 'asc') {
      this.sort.set({ name, direction: 'desc' });
      return;
    }
    this.sort.set(null);
  }

  isExpanded(rowId: string): boolean {
    const current = this.expanded();
    if (Array.isArray(current)) {
      return current.includes(rowId);
    }
    return current === rowId;
  }

  toggleExpand(rowId: string): void {
    if (!this.canExpand()) {
      return;
    }
    if (this.expandVariant() === 'single') {
      this.expanded.set(this.isExpanded(rowId) ? '' : rowId);
      return;
    }
    const current = this.expanded();
    const open = Array.isArray(current)
      ? [...current]
      : current
        ? [current]
        : [];
    const index = open.indexOf(rowId);
    if (index >= 0) {
      open.splice(index, 1);
    } else {
      open.push(rowId);
    }
    this.expanded.set(open);
  }

  protected cellText(row: object, name: string): string {
    return tableCellText(row, name);
  }

  protected sortIcon(name: string): string {
    const current = this.sort();
    if (!current || current.name !== name) {
      return 'sort';
    }
    return current.direction === 'asc' ? 'chevron-up' : 'chevron-down';
  }

  protected ariaSort(name: string): string | null {
    const current = this.sort();
    if (!current || current.name !== name) {
      return 'none';
    }
    return current.direction === 'asc' ? 'ascending' : 'descending';
  }

  protected sortButtonLabel(name: string, headerText: string): string {
    const sort = this.ariaSort(name);
    if (sort === 'ascending') {
      return `Sort by ${headerText}, currently ascending`;
    }
    if (sort === 'descending') {
      return `Sort by ${headerText}, currently descending`;
    }
    return `Sort by ${headerText}`;
  }

  protected rowExpandId(rowId: string): string {
    return `el-table-${this.uid}-expand-${rowId}`;
  }

  protected onViewportScroll(event: Event): void {
    const el = event.target;
    if (!(el instanceof HTMLElement)) {
      return;
    }
    this.scrollTop.set(el.scrollTop);
  }

  private attachViewport(el: HTMLElement): void {
    if (this.watchedViewport === el) {
      return;
    }
    this.disconnectViewport();
    this.watchedViewport = el;
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    this.resizeObserver = new ResizeObserver(() => {
      this.viewportHeight.set(el.clientHeight);
    });
    this.resizeObserver.observe(el);
  }

  private disconnectViewport(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.watchedViewport = null;
  }
}
