import { NgTemplateOutlet } from '@angular/common';
import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  DestroyRef,
  ElementRef,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { ElListItemDef } from './list-item-def';
import { listRowId, listVirtualWindow } from './list-virtual';

export type ElListAppearance = 'outlined' | 'plain';
export type ElListSize = 'sm' | 'md' | 'lg';

export { ElListItem } from './list-item';
export { ElListItemDef, type ElListItemContext } from './list-item-def';

@Component({
  selector: 'el-list',
  imports: [NgTemplateOutlet],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-list-host',
    '[class.el-list-host--virtual]': 'virtual()',
    '(scroll)': 'onHostScroll($event)',
  },
})
export class ElList {
  readonly appearance = input<ElListAppearance>('outlined');
  readonly size = input<ElListSize>('md');
  readonly divided = input(true, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();
  readonly virtual = input(false, { transform: booleanAttribute });
  readonly items = input<readonly object[]>([]);
  readonly track = input('id');
  readonly itemHeight = input(56, { transform: numberAttribute });
  readonly overscan = input(5, { transform: numberAttribute });

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly itemDef = contentChild(ElListItemDef);

  private readonly scrollTop = signal(0);
  private readonly viewportHeight = signal(0);
  private resizeObserver: ResizeObserver | null = null;
  private watchedHost: HTMLElement | null = null;

  protected readonly itemTemplate = computed(
    () => this.itemDef()?.template ?? null,
  );

  protected readonly virtualWindow = computed(() =>
    listVirtualWindow({
      scrollTop: this.scrollTop(),
      viewportHeight: this.viewportHeight(),
      itemCount: this.items().length,
      itemHeight: this.itemHeight(),
      overscan: this.overscan(),
    }),
  );

  protected readonly visibleItems = computed(() => {
    const rows = this.items();
    const track = this.track();
    const lastIndex = rows.length - 1;
    if (!this.virtual()) {
      return [];
    }
    const win = this.virtualWindow();
    return rows.slice(win.start, win.end).map((row, offset) => {
      const index = win.start + offset;
      return {
        row,
        index,
        id: listRowId(row, index, track),
        last: index === lastIndex,
      };
    });
  });

  protected readonly rootClass = computed(() => ({
    'el-list': true,
    [`el-list--${this.appearance()}`]: true,
    [`el-list--${this.size()}`]: true,
    'el-list--divided': this.divided(),
    'el-list--virtual': this.virtual(),
  }));

  constructor() {
    this.destroyRef.onDestroy(() => this.disconnectViewport());

    afterRenderEffect(() => {
      if (!this.virtual()) {
        this.disconnectViewport();
        return;
      }
      const el = this.host.nativeElement;
      this.attachViewport(el);
      this.viewportHeight.set(el.clientHeight);
      this.scrollTop.set(el.scrollTop);
    });
  }

  protected onHostScroll(event: Event): void {
    if (!this.virtual()) {
      return;
    }
    const el = event.target;
    if (!(el instanceof HTMLElement)) {
      return;
    }
    this.scrollTop.set(el.scrollTop);
  }

  private attachViewport(el: HTMLElement): void {
    if (this.watchedHost === el) {
      return;
    }
    this.disconnectViewport();
    this.watchedHost = el;
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
    this.watchedHost = null;
  }
}
