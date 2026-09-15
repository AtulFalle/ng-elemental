import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  input,
  model,
  untracked,
} from '@angular/core';
import { ElNavItem } from './navigation-item';
import {
  EL_NAV,
  type ElNavAppearance,
  type ElNavContext,
  type ElNavExpandMode,
  type ElNavSize,
} from './navigation.token';

export type { ElNavAppearance, ElNavExpandMode, ElNavSize } from './navigation.token';
export {
  ElNavItem,
  ElNavLeadingSlot,
  ElNavLabelSlot,
  ElNavSublabelSlot,
} from './navigation-item';
export { ElNavHeading } from './navigation-heading';

@Component({
  selector: 'el-nav',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_NAV, useExisting: ElNav }],
  host: {
    class: 'el-nav-host',
    role: 'navigation',
    '[class.el-nav-host--rail]': 'appearance() === "rail"',
    '[class.el-nav-host--soft]': 'appearance() === "soft"',
    '[class.el-nav-host--disabled]': 'disabled()',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-disabled]': 'disabled() ? true : null',
  },
})
export class ElNav implements ElNavContext {
  private static nextId = 0;

  readonly appearance = input<ElNavAppearance>('rail');
  readonly size = input<ElNavSize>('md');
  readonly expandMode = input<ElNavExpandMode>('multiple');
  readonly autoExpand = input(true, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();

  readonly value = model('');
  readonly expanded = model<string[]>([]);

  private readonly uid = ElNav.nextId++;
  private readonly rootItems = contentChildren(ElNavItem, {
    descendants: false,
  });

  protected readonly rootClass = computed(() => ({
    'el-nav': true,
    [`el-nav--${this.appearance()}`]: true,
    [`el-nav--${this.size()}`]: true,
    'el-nav--disabled': this.disabled(),
  }));

  constructor() {
    effect(() => {
      if (!this.autoExpand()) {
        return;
      }
      const active = this.value();
      if (!active) {
        return;
      }
      const ancestors = this.findAncestorIds(active);
      if (ancestors.length === 0) {
        return;
      }
      untracked(() => this.mergeExpanded(ancestors));
    });
  }

  isActive(itemValue: string): boolean {
    return this.value() === itemValue;
  }

  isExpanded(itemValue: string): boolean {
    return this.expanded().includes(itemValue);
  }

  isItemDisabled(itemDisabled: boolean): boolean {
    return this.disabled() || itemDisabled;
  }

  activate(itemValue: string): void {
    if (this.disabled()) {
      return;
    }
    const item = this.findItem(itemValue);
    if (item?.disabled()) {
      return;
    }
    this.value.set(itemValue);
    if (this.autoExpand()) {
      this.mergeExpanded(this.findAncestorIds(itemValue));
    }
  }

  toggleExpanded(itemValue: string): void {
    if (this.disabled()) {
      return;
    }

    const item = this.findItem(itemValue);
    if (!item || item.disabled()) {
      return;
    }

    const open = this.isExpanded(itemValue);
    let next = [...this.expanded()];

    if (this.expandMode() === 'single') {
      const parent = this.findParentItem(itemValue);
      const siblingIds = parent
        ? parent.nestedItems().map((item) => item.value())
        : this.rootItems().map((item) => item.value());
      const active = this.value();
      next = next.filter((id) => {
        if (id === itemValue) {
          return true;
        }
        if (!siblingIds.includes(id)) {
          return true;
        }
        return this.isAncestorOf(id, active);
      });
    }

    if (open) {
      next = next.filter((id) => id !== itemValue);
    } else {
      next = [...next, itemValue];
    }

    this.expanded.set(next);
  }

  groupId(itemValue: string): string {
    return `el-nav-${this.uid}-group-${this.idPart(itemValue)}`;
  }

  private mergeExpanded(ids: readonly string[]): void {
    if (ids.length === 0) {
      return;
    }
    const current = this.expanded();
    const missing = ids.filter((id) => !current.includes(id));
    if (missing.length > 0) {
      this.expanded.set([...current, ...missing]);
    }
  }

  private isAncestorOf(ancestorValue: string, target: string): boolean {
    if (!target || ancestorValue === target) {
      return false;
    }
    return this.findAncestorIds(target).includes(ancestorValue);
  }

  private findAncestorIds(target: string): string[] {
    const path: string[] = [];
    if (this.findPath(this.rootItems(), target, path)) {
      return path.slice(0, -1);
    }
    return [];
  }

  private findPath(
    items: readonly ElNavItem[],
    target: string,
    path: string[],
  ): boolean {
    for (const item of items) {
      path.push(item.value());
      if (item.value() === target) {
        return true;
      }
      if (this.findPath(item.nestedItems(), target, path)) {
        return true;
      }
      path.pop();
    }
    return false;
  }

  private findItem(target: string): ElNavItem | null {
    return this.findItemInList(this.rootItems(), target);
  }

  private findItemInList(
    items: readonly ElNavItem[],
    target: string,
  ): ElNavItem | null {
    for (const item of items) {
      if (item.value() === target) {
        return item;
      }
      const nested = item.nestedItems();
      if (nested.length > 0) {
        const found = this.findItemInList(nested, target);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  private findParentItem(target: string): ElNavItem | null {
    return this.findParentInList(this.rootItems(), target, null);
  }

  private findParentInList(
    items: readonly ElNavItem[],
    target: string,
    parent: ElNavItem | null,
  ): ElNavItem | null {
    for (const item of items) {
      if (item.value() === target) {
        return parent;
      }
      const nested = item.nestedItems();
      if (nested.length > 0) {
        const found = this.findParentInList(nested, target, item);
        if (found !== null) {
          return found;
        }
      }
    }
    return null;
  }

  private idPart(itemValue: string): string {
    return itemValue.replace(/[^a-zA-Z0-9_-]/g, '-') || 'item';
  }
}
