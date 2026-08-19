import { InjectionToken, type Signal } from '@angular/core';

export type ElMenuTriggerKind = 'click' | 'contextmenu';
export type ElMenuItemType = 'item' | 'checkbox' | 'radio';
export type ElMenuItemVariant = 'default' | 'danger';
export type ElMenubarSize = 'sm' | 'md' | 'lg';

export interface ElMenuAnchor {
  readonly x: number;
  readonly y: number;
}

export interface ElMenuItemLike {
  readonly itemId: string;
  readonly disabled: Signal<boolean>;
  label(): string;
  focus(): void;
}

export interface ElMenubarMenu {
  readonly menuId: string;
  focusTrigger(): void;
  close(): void;
}

export interface ElMenuContext {
  readonly menuId: string;
  readonly panelId: string;
  trigger(): ElMenuTriggerKind;
  disabled(): boolean;
  isOpen(): boolean;
  isSubmenu(): boolean;
  parent(): ElMenuContext | null;
  isActive(itemId: string): boolean;
  setActive(itemId: string): void;
  ariaLabel(): string | undefined;
  registerTrigger(el: HTMLElement): void;
  unregisterTrigger(el: HTMLElement): void;
  registerPanel(el: HTMLElement): void;
  unregisterPanel(el: HTMLElement): void;
  triggerElement(): HTMLElement | null;
  panelElement(): HTMLElement | null;
  anchorPoint(): ElMenuAnchor | null;
  registerItem(item: ElMenuItemLike): void;
  unregisterItem(item: ElMenuItemLike): void;
  registerSubmenu(menu: ElMenuContext): void;
  unregisterSubmenu(menu: ElMenuContext): void;
  closeOtherSubmenus(except: ElMenuContext): void;
  setAnchorPoint(point: ElMenuAnchor | null): void;
  toggle(): void;
  openPanel(focus?: 'first' | 'last'): void;
  close(): void;
  closeTree(): void;
  focusTrigger(): void;
  onTriggerPointerEnter(): void;
  onItemKeydown(event: KeyboardEvent): void;
  activateLeaf(closeTree: boolean): void;
}

export interface ElMenubarContext {
  size(): ElMenubarSize;
  ariaLabel(): string | undefined;
  isOpen(menuId: string): boolean;
  anyOpen(): boolean;
  toggle(menuId: string): void;
  open(menuId: string): void;
  close(menuId: string): void;
  closeAll(): void;
  registerMenu(menu: ElMenubarMenu): void;
  unregisterMenu(menuId: string): void;
  onTriggerEnter(menuId: string): void;
  onTriggerKeydown(event: KeyboardEvent, menuId: string): void;
}

export const EL_MENU = new InjectionToken<ElMenuContext>('ElMenu');
export const EL_MENUBAR = new InjectionToken<ElMenubarContext>('ElMenubar');
