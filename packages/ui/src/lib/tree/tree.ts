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
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { ElButton } from '../button/button';
import { ElTreeItem } from './tree-item';
import { ElTreeNodeDef, type ElTreeNodeContext } from './tree-node-def';
import {
  EL_TREE,
  type ElTreeAppearance,
  type ElTreeContext,
  type ElTreeSize,
} from './tree.token';
import {
  buildTreeIndex,
  checkState as nodeCheckState,
  findNode,
  flattenVisible,
  nodeHasChildren,
  toggleChecked as toggleCheckedIds,
  toggleExpanded as toggleExpandedIds,
  type ElTreeCheckState,
  type ElTreeNode,
  type ElTreeVisibleRow,
} from './tree-utils';
import { treeVirtualWindow } from './tree-virtual';

export type { ElTreeAppearance, ElTreeSize } from './tree.token';
export type { ElTreeCheckState, ElTreeNode, ElTreeVisibleRow } from './tree-utils';
export { ElTreeItem } from './tree-item';
export { ElTreeNodeDef, type ElTreeNodeContext } from './tree-node-def';

@Component({
  selector: 'el-tree',
  imports: [ElButton, ElTreeItem],
  templateUrl: './tree.html',
  styleUrl: './tree.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_TREE, useExisting: ElTree }],
  host: {
    class: 'el-tree-host',
    role: 'tree',
    '[class.el-tree-host--virtual]': 'virtual()',
    '[class.el-tree-host--disabled]': 'disabled()',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-multiselectable]': 'checkbox() ? true : null',
    '[attr.aria-disabled]': 'disabled() ? true : null',
    '(scroll)': 'onHostScroll($event)',
  },
})
export class ElTree implements ElTreeContext {
  readonly appearance = input<ElTreeAppearance>('outlined');
  readonly size = input<ElTreeSize>('md');
  readonly ariaLabel = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly checkbox = input(false, { transform: booleanAttribute });
  readonly virtual = input(false, { transform: booleanAttribute });
  readonly hasMore = input(false, { transform: booleanAttribute });
  readonly nodes = input<readonly ElTreeNode[]>([]);
  readonly loadingIds = input<readonly string[]>([]);
  readonly itemHeight = input(36, { transform: numberAttribute });
  readonly overscan = input(5, { transform: numberAttribute });

  readonly expanded = model<string[]>([]);
  readonly checked = model<string[]>([]);

  readonly loadChildren = output<ElTreeNode>();
  readonly loadMore = output<ElTreeNode | null>();
  readonly activated = output<string>();

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly itemDef = contentChild(ElTreeNodeDef);
  private readonly rootItems = contentChildren(ElTreeItem);
  private readonly projectedItems = contentChildren(ElTreeItem, {
    descendants: true,
  });
  private readonly viewItems = viewChildren(ElTreeItem);

  private readonly scrollTop = signal(0);
  private readonly viewportHeight = signal(0);
  private readonly activeId = signal('');
  private resizeObserver: ResizeObserver | null = null;
  private watchedHost: HTMLElement | null = null;

  protected readonly dataMode = computed(
    () => this.virtual() || this.nodes().length > 0,
  );

  protected readonly sourceNodes = computed((): readonly ElTreeNode[] => {
    if (this.dataMode()) {
      return this.nodes();
    }
    return this.rootItems().map((item) => item.toNode());
  });

  protected readonly treeIndex = computed(() =>
    buildTreeIndex(this.sourceNodes()),
  );

  protected readonly flattened = computed(() =>
    flattenVisible(this.sourceNodes(), this.expanded(), {
      rootHasMore: this.hasMore() && this.dataMode(),
    }),
  );

  protected readonly virtualWindow = computed(() =>
    treeVirtualWindow({
      scrollTop: this.scrollTop(),
      viewportHeight: this.viewportHeight(),
      itemCount: this.flattened().length,
      itemHeight: this.itemHeight(),
      overscan: this.overscan(),
    }),
  );

  protected readonly visibleRows = computed((): ElTreeVisibleRow[] => {
    const rows = this.flattened();
    if (!this.virtual() || !this.dataMode()) {
      return rows;
    }
    const win = this.virtualWindow();
    return rows.slice(win.start, win.end);
  });

  protected readonly visibleNodeIds = computed(() =>
    this.flattened()
      .filter((row) => row.kind === 'node')
      .map((row) => row.id),
  );

  readonly nodeTemplate = computed(
    () => this.itemDef()?.template ?? null,
  );

  protected readonly loadingSet = computed(() => new Set(this.loadingIds()));

  protected readonly rootClass = computed(() => ({
    'el-tree': true,
    [`el-tree--${this.appearance()}`]: true,
    [`el-tree--${this.size()}`]: true,
    'el-tree--virtual': this.virtual(),
    'el-tree--checkbox': this.checkbox(),
    'el-tree--disabled': this.disabled(),
  }));

  constructor() {
    this.destroyRef.onDestroy(() => this.disconnectViewport());

    afterRenderEffect(() => {
      if (!this.virtual() || !this.dataMode()) {
        this.disconnectViewport();
        return;
      }
      const el = this.host.nativeElement;
      this.attachViewport(el);
      this.viewportHeight.set(el.clientHeight);
      this.scrollTop.set(el.scrollTop);
    });
  }

  isExpanded(id: string): boolean {
    return this.expanded().includes(id);
  }

  isActive(id: string): boolean {
    const active = this.activeId();
    if (active) {
      return active === id;
    }
    return this.visibleNodeIds()[0] === id;
  }

  isLoading(id: string): boolean {
    return this.loadingSet().has(id);
  }

  isItemDisabled(itemDisabled: boolean): boolean {
    return this.disabled() || itemDisabled;
  }

  checkState(id: string): ElTreeCheckState {
    if (!this.checkbox()) {
      return 'unchecked';
    }
    return nodeCheckState(id, this.checked(), this.treeIndex());
  }

  nodeContext(
    id: string,
    level: number,
    index: number,
    last: boolean,
  ): ElTreeNodeContext | null {
    const node = findNode(this.sourceNodes(), id);
    if (!node) {
      return null;
    }
    return { $implicit: node, node, level, index, last };
  }

  toggleExpanded(id: string): void {
    if (this.disabled()) {
      return;
    }
    const node = findNode(this.sourceNodes(), id);
    if (!node || node.disabled) {
      return;
    }
    const wasOpen = this.isExpanded(id);
    this.expanded.set(toggleExpandedIds(this.expanded(), id));
    if (
      !wasOpen &&
      nodeHasChildren(node) &&
      !(node.children?.length) &&
      !this.isLoading(id)
    ) {
      this.loadChildren.emit(node);
    }
  }

  toggleChecked(id: string): void {
    if (this.disabled() || !this.checkbox()) {
      return;
    }
    this.checked.set(toggleCheckedIds(this.checked(), id, this.sourceNodes()));
  }

  activate(id: string): void {
    if (this.disabled()) {
      return;
    }
    const node = findNode(this.sourceNodes(), id);
    if (node?.disabled) {
      return;
    }
    this.setActive(id);
    this.activated.emit(id);
  }

  setActive(id: string): void {
    if (this.disabled()) {
      return;
    }
    this.activeId.set(id);
  }

  onItemKeydown(event: KeyboardEvent, id: string): void {
    if (this.disabled()) {
      return;
    }

    const ids = this.visibleNodeIds();
    const current = ids.indexOf(id);
    const node = findNode(this.sourceNodes(), id);
    const parentId = this.treeIndex().parentId.get(id) ?? null;

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        this.focusAt(ids, current + 1);
        return;
      }
      case 'ArrowUp': {
        event.preventDefault();
        this.focusAt(ids, current - 1);
        return;
      }
      case 'Home': {
        event.preventDefault();
        this.focusAt(ids, 0);
        return;
      }
      case 'End': {
        event.preventDefault();
        this.focusAt(ids, ids.length - 1);
        return;
      }
      case 'ArrowRight': {
        event.preventDefault();
        if (node && nodeHasChildren(node) && !this.isExpanded(id)) {
          this.toggleExpanded(id);
          return;
        }
        const children = this.treeIndex().children.get(id) ?? [];
        const firstVisible = children.find((child) => ids.includes(child));
        if (firstVisible) {
          this.focusRow(firstVisible);
        }
        return;
      }
      case 'ArrowLeft': {
        event.preventDefault();
        if (node && nodeHasChildren(node) && this.isExpanded(id)) {
          this.toggleExpanded(id);
          return;
        }
        if (parentId) {
          this.focusRow(parentId);
        }
        return;
      }
      case 'Enter': {
        event.preventDefault();
        this.activate(id);
        return;
      }
      case ' ': {
        const target = event.target;
        if (target instanceof Element && target.closest('el-checkbox')) {
          return;
        }
        event.preventDefault();
        if (this.checkbox()) {
          this.toggleChecked(id);
          return;
        }
        this.activate(id);
        return;
      }
      default:
        return;
    }
  }

  requestLoadMore(parent: ElTreeNode | null): void {
    if (this.disabled()) {
      return;
    }
    this.loadMore.emit(parent);
  }

  protected isRowLoading(row: ElTreeVisibleRow): boolean {
    if (!row.parentId) {
      return this.loadingSet().has('__root');
    }
    return this.loadingSet().has(row.parentId);
  }

  protected onLoadMoreClick(row: ElTreeVisibleRow): void {
    this.requestLoadMore(row.node);
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

  private focusAt(ids: readonly string[], index: number): void {
    if (ids.length === 0) {
      return;
    }
    const next = Math.max(0, Math.min(ids.length - 1, index));
    this.focusRow(ids[next]);
  }

  private focusRow(id: string): void {
    this.setActive(id);
    const match =
      this.viewItems().find((item) => item.value() === id) ??
      this.projectedItems().find((item) => item.value() === id);
    match?.focus();
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
