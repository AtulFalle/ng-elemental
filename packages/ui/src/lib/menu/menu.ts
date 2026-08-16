import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import type {
  ElMenuAnchor,
  ElMenuContext,
  ElMenuItemLike,
  ElMenuTriggerKind,
  ElMenubarMenu,
} from './menu.token';
import { EL_MENU, EL_MENUBAR } from './menu.token';

export type { ElMenuTriggerKind, ElMenuItemType, ElMenuItemVariant } from './menu.token';
export { EL_MENU, EL_MENUBAR } from './menu.token';
export { ElMenuTrigger } from './menu-trigger';
export { ElMenuPanel } from './menu-panel';
export { ElMenuItem } from './menu-item';
export { ElMenuSeparator } from './menu-separator';
export { ElMenuLabel } from './menu-label';

@Component({
  selector: 'el-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_MENU, useExisting: ElMenu }],
  host: {
    class: 'el-menu-host',
    '(document:pointerdown)': 'onDocumentPointerDown($event)',
    '(document:keydown)': 'onDocumentKeydown($event)',
  },
})
export class ElMenu implements ElMenuContext, ElMenubarMenu {
  private static nextId = 0;

  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly parentMenu = inject(EL_MENU, {
    skipSelf: true,
    optional: true,
  });
  private readonly menubar = inject(EL_MENUBAR, { optional: true });

  readonly menuId = `el-menu-${ElMenu.nextId++}`;
  readonly panelId = `${this.menuId}-panel`;

  readonly open = model(false);
  readonly trigger = input<ElMenuTriggerKind>('click');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();

  private readonly items = signal<ElMenuItemLike[]>([]);
  private readonly submenus = signal<ElMenuContext[]>([]);
  private readonly activeItemId = signal<string | null>(null);
  private readonly anchor = signal<ElMenuAnchor | null>(null);
  private triggerEl: HTMLElement | null = null;
  private panelEl: HTMLElement | null = null;
  private typeahead = '';
  private typeaheadTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (this.menubar && !this.parentMenu) {
      this.menubar.registerMenu(this);
    }
    if (this.parentMenu) {
      this.parentMenu.registerSubmenu(this);
    }

    this.destroyRef.onDestroy(() => {
      this.clearTypeahead();
      this.menubar?.unregisterMenu(this.menuId);
      this.parentMenu?.unregisterSubmenu(this);
    });
  }

  isSubmenu(): boolean {
    return this.parentMenu !== null;
  }

  parent(): ElMenuContext | null {
    return this.parentMenu;
  }

  isOpen(): boolean {
    if (this.disabled()) {
      return false;
    }
    if (this.parentMenu && !this.parentMenu.isOpen()) {
      return false;
    }
    if (this.menubar && !this.parentMenu) {
      return this.menubar.isOpen(this.menuId);
    }
    return this.open();
  }

  isActive(itemId: string): boolean {
    return this.activeItemId() === itemId;
  }

  setActive(itemId: string): void {
    this.activeItemId.set(itemId);
    this.closeOtherSubmenusExceptActive();
  }

  registerTrigger(el: HTMLElement): void {
    this.triggerEl = el;
  }

  unregisterTrigger(el: HTMLElement): void {
    if (this.triggerEl === el) {
      this.triggerEl = null;
    }
  }

  registerPanel(el: HTMLElement): void {
    this.panelEl = el;
  }

  unregisterPanel(el: HTMLElement): void {
    if (this.panelEl === el) {
      this.panelEl = null;
    }
  }

  triggerElement(): HTMLElement | null {
    return this.triggerEl;
  }

  panelElement(): HTMLElement | null {
    return this.panelEl;
  }

  anchorPoint(): ElMenuAnchor | null {
    return this.anchor();
  }

  registerItem(item: ElMenuItemLike): void {
    this.items.update((items) =>
      items.some((existing) => existing.itemId === item.itemId)
        ? items
        : [...items, item],
    );
  }

  unregisterItem(item: ElMenuItemLike): void {
    this.items.update((items) =>
      items.filter((existing) => existing.itemId !== item.itemId),
    );
  }

  registerSubmenu(menu: ElMenuContext): void {
    this.submenus.update((menus) =>
      menus.includes(menu) ? menus : [...menus, menu],
    );
  }

  unregisterSubmenu(menu: ElMenuContext): void {
    this.submenus.update((menus) => menus.filter((existing) => existing !== menu));
  }

  setAnchorPoint(point: ElMenuAnchor | null): void {
    this.anchor.set(point);
  }

  toggle(): void {
    if (this.disabled()) {
      return;
    }
    if (this.isOpen()) {
      this.close();
      return;
    }
    this.openPanel();
  }

  close(): void {
    this.closePanel();
  }

  closeTree(): void {
    if (this.parentMenu) {
      this.parentMenu.closeTree();
      return;
    }
    this.closePanel();
  }

  onTriggerPointerEnter(): void {
    if (this.disabled()) {
      return;
    }
    if (this.parentMenu) {
      this.parentMenu.closeOtherSubmenus(this);
      this.openPanel();
      return;
    }
    this.menubar?.onTriggerEnter(this.menuId);
  }

  activateLeaf(closeTree: boolean): void {
    if (closeTree) {
      this.closeTree();
    }
  }

  onItemKeydown(event: KeyboardEvent): void {
    if (!this.isOpen() || this.disabled()) {
      return;
    }

    const enabled = this.enabledItems();
    if (enabled.length === 0) {
      return;
    }

    const currentIndex = enabled.findIndex(
      (item) => item.itemId === this.activeItemId(),
    );
    const resolved = currentIndex >= 0 ? currentIndex : 0;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusItemAt(enabled, (resolved + 1) % enabled.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusItemAt(
        enabled,
        (resolved - 1 + enabled.length) % enabled.length,
      );
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.focusItemAt(enabled, 0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.focusItemAt(enabled, enabled.length - 1);
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.openActiveSubmenu();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (this.parentMenu) {
        this.closePanel();
        this.parentMenu.focusTrigger();
      } else {
        this.menubar?.onTriggerKeydown(event, this.menuId);
      }
      return;
    }

    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      this.matchTypeahead(event.key);
    }
  }

  focusTrigger(): void {
    this.triggerEl?.focus();
  }

  protected onDocumentPointerDown(event: Event): void {
    if (!this.isOpen() || this.parentMenu) {
      return;
    }
    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }
    if (this.containsTree(target)) {
      return;
    }
    this.closePanel();
  }

  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.isOpen() || this.parentMenu) {
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      const nestedOpen = this.submenus().find((menu) => menu.isOpen());
      if (nestedOpen) {
        nestedOpen.close();
        this.focusTrigger();
        return;
      }
      this.closePanel();
      this.focusTrigger();
      return;
    }
    if (event.key === 'Tab') {
      this.closePanel();
    }
  }

  openPanel(): void {
    if (this.disabled()) {
      return;
    }
    this.parentMenu?.closeOtherSubmenus(this);
    if (this.menubar && !this.parentMenu) {
      this.menubar.open(this.menuId);
    } else {
      this.open.set(true);
    }
    const enabled = this.enabledItems();
    const first = enabled[0];
    this.activeItemId.set(first?.itemId ?? null);
    queueMicrotask(() => first?.focus());
  }

  private closePanel(): void {
    for (const child of this.submenus()) {
      child.close();
    }
    this.anchor.set(null);
    this.activeItemId.set(null);
    this.clearTypeahead();
    if (this.menubar && !this.parentMenu) {
      this.menubar.close(this.menuId);
      return;
    }
    this.open.set(false);
  }

  /** Close sibling submenus when opening this one. Called by nested menus. */
  closeOtherSubmenus(except: ElMenuContext): void {
    for (const child of this.submenus()) {
      if (child !== except) {
        child.close();
      }
    }
  }

  private enabledItems(): ElMenuItemLike[] {
    return this.items().filter((item) => !item.disabled());
  }

  private focusItemAt(items: readonly ElMenuItemLike[], index: number): void {
    const item = items[index];
    this.activeItemId.set(item.itemId);
    item.focus();
    this.closeOtherSubmenusExceptActive();
  }

  private closeOtherSubmenusExceptActive(): void {
    for (const child of this.submenus()) {
      if (child.isOpen() && child.triggerElement()) {
        const trigger = child.triggerElement();
        const active = this.activeItemId();
        if (trigger && active && !this.itemHostsId(trigger, active)) {
          child.close();
        }
      }
    }
  }

  private itemHostsId(el: HTMLElement, itemId: string): boolean {
    return el.id === itemId;
  }

  private openActiveSubmenu(): void {
    const active = this.activeItemId();
    if (!active) {
      return;
    }
    const child = this.submenus().find((menu) => {
      const trigger = menu.triggerElement();
      return trigger ? trigger.id === active : false;
    });
    child?.openPanel();
  }

  private matchTypeahead(char: string): void {
    const next = `${this.typeahead}${char.toLowerCase()}`;
    this.typeahead = next;
    if (this.typeaheadTimer) {
      clearTimeout(this.typeaheadTimer);
    }
    this.typeaheadTimer = setTimeout(() => {
      this.typeahead = '';
      this.typeaheadTimer = null;
    }, 500);

    const enabled = this.enabledItems();
    const match = enabled.find((item) =>
      item.label().toLowerCase().startsWith(next),
    );
    if (match) {
      this.activeItemId.set(match.itemId);
      match.focus();
    }
  }

  private clearTypeahead(): void {
    this.typeahead = '';
    if (this.typeaheadTimer) {
      clearTimeout(this.typeaheadTimer);
      this.typeaheadTimer = null;
    }
  }

  private containsTree(target: Node): boolean {
    if (this.elementRef.nativeElement.contains(target)) {
      return true;
    }
    if (this.triggerEl?.contains(target) || this.panelEl?.contains(target)) {
      return true;
    }
    return this.submenus().some((menu) => {
      const panel = menu.panelElement();
      const trigger = menu.triggerElement();
      return !!(panel?.contains(target) || trigger?.contains(target));
    });
  }
}
