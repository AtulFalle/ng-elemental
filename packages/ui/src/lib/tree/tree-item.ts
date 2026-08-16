import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { ElCheckbox } from '../checkbox/checkbox';
import { ElIcon } from '../icon/icon';
import { EL_TREE, EL_TREE_ITEM } from './tree.token';
import { type ElTreeNode } from './tree-utils';

const NESTED_CONTROL =
  'a, button, input, select, textarea, el-button, el-chip, el-slide-toggle, el-checkbox, [href]';

@Component({
  selector: 'el-tree-item',
  imports: [NgTemplateOutlet, ElCheckbox, ElIcon],
  templateUrl: './tree-item.html',
  styleUrl: './tree-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_TREE_ITEM, useExisting: ElTreeItem }],
  host: {
    class: 'el-tree-item-host',
    role: 'treeitem',
    '[class.el-tree-item-host--active]': 'active()',
    '[class.el-tree-item-host--disabled]': 'isDisabled()',
    '[class.el-tree-item-host--expanded]': 'expanded()',
    '[style.--el-tree-level]': 'resolvedLevel()',
    '[attr.aria-expanded]': 'canExpand() ? expanded() : null',
    '[attr.aria-level]': 'resolvedLevel() + 1',
    '[attr.aria-selected]': 'active()',
    '[attr.aria-checked]': 'ariaChecked()',
    '[attr.aria-disabled]': 'isDisabled() ? true : null',
    '[attr.tabindex]': 'tabIndex()',
    '(click)': 'onHostClick($event)',
    '(keydown)': 'onHostKeydown($event)',
    '(focus)': 'onHostFocus()',
  },
})
export class ElTreeItem {
  private readonly tree = inject(EL_TREE);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly parentItem = inject(EL_TREE_ITEM, {
    optional: true,
    skipSelf: true,
  });

  readonly value = input.required<string>();
  readonly label = input('');
  readonly icon = input('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly hasChildren = input(false, { transform: booleanAttribute });
  readonly level = input<number | undefined>(undefined);
  readonly node = input<ElTreeNode | null>(null);
  readonly rowIndex = input(0);
  readonly last = input(false, { transform: booleanAttribute });

  private readonly nestedItems = contentChildren(ElTreeItem);

  readonly resolvedLevel = computed(() => {
    const explicit = this.level();
    if (explicit !== undefined) {
      return explicit;
    }
    return (this.parentItem?.resolvedLevel() ?? -1) + 1;
  });

  protected readonly canExpand = computed(
    () => this.hasChildren() || this.nestedItems().length > 0,
  );

  protected readonly expanded = computed(() =>
    this.tree.isExpanded(this.value()),
  );

  protected readonly active = computed(() => this.tree.isActive(this.value()));

  protected readonly isDisabled = computed(() =>
    this.tree.isItemDisabled(this.disabled()),
  );

  protected readonly loading = computed(() =>
    this.tree.isLoading(this.value()),
  );

  protected readonly checkState = computed(() =>
    this.tree.checkState(this.value()),
  );

  protected readonly showCheckbox = computed(() => this.tree.checkbox());

  protected readonly checked = computed(
    () => this.checkState() === 'checked',
  );

  protected readonly indeterminate = computed(
    () => this.checkState() === 'indeterminate',
  );

  protected readonly nodeTemplate = computed(() => this.tree.nodeTemplate());

  protected readonly templateContext = computed(() => {
    const node =
      this.node() ??
      ({
        id: this.value(),
        label: this.label(),
        icon: this.icon() || undefined,
        disabled: this.disabled(),
        hasChildren: this.canExpand(),
      } satisfies ElTreeNode);
    return this.tree.nodeContext(
      this.value(),
      this.resolvedLevel(),
      this.rowIndex(),
      this.last(),
    ) ?? {
      $implicit: node,
      node,
      level: this.resolvedLevel(),
      index: this.rowIndex(),
      last: this.last(),
    };
  });

  protected readonly showFallbackIcon = computed(
    () => !!this.icon() && !this.nodeTemplate(),
  );

  protected readonly tabIndex = computed(() => {
    if (this.isDisabled()) {
      return -1;
    }
    return this.active() ? 0 : -1;
  });

  protected readonly ariaChecked = computed(() => {
    if (!this.showCheckbox()) {
      return null;
    }
    const state = this.checkState();
    if (state === 'indeterminate') {
      return 'mixed';
    }
    return state === 'checked';
  });

  protected readonly chevronName = computed(() =>
    this.loading() ? 'spinner' : 'chevron-right',
  );

  protected readonly rootClass = computed(() => ({
    'el-tree-item': true,
    [`el-tree-item--${this.tree.size()}`]: true,
    'el-tree-item--active': this.active(),
    'el-tree-item--disabled': this.isDisabled(),
    'el-tree-item--expanded': this.expanded(),
    'el-tree-item--loading': this.loading(),
  }));

  toNode(): ElTreeNode {
    const nested = this.nestedItems().map((item) => item.toNode());
    return {
      id: this.value(),
      label: this.label(),
      icon: this.icon() || undefined,
      disabled: this.disabled(),
      hasChildren: this.hasChildren() || nested.length > 0,
      children: nested.length > 0 ? nested : undefined,
    };
  }

  focus(): void {
    this.host.nativeElement.focus();
  }

  protected onToggleExpand(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.isDisabled() || !this.canExpand() || this.loading()) {
      return;
    }
    this.tree.setActive(this.value());
    this.tree.toggleExpanded(this.value());
  }

  protected onCheckChange(checked: boolean): void {
    if (this.isDisabled()) {
      return;
    }
    const state = this.checkState();
    const isOn = state === 'checked';
    if (checked === isOn) {
      return;
    }
    this.tree.toggleChecked(this.value());
  }

  protected onHostClick(event: Event): void {
    if (this.isDisabled()) {
      return;
    }
    const target = event.target;
    if (target instanceof Element && target.closest(NESTED_CONTROL)) {
      return;
    }
    this.tree.setActive(this.value());
    this.tree.activate(this.value());
  }

  protected onHostKeydown(event: KeyboardEvent): void {
    this.tree.onItemKeydown(event, this.value());
  }

  protected onHostFocus(): void {
    if (!this.isDisabled()) {
      this.tree.setActive(this.value());
    }
  }
}
