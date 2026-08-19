import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { EL_MENUBAR } from '../menu/menu.token';
import type { ElMenubarContext, ElMenubarMenu, ElMenubarSize } from '../menu/menu.token';

export type { ElMenubarSize } from '../menu/menu.token';

@Component({
  selector: 'el-menubar',
  templateUrl: './menubar.html',
  styleUrl: './menubar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_MENUBAR, useExisting: ElMenubar }],
  host: {
    class: 'el-menubar-host',
    role: 'menubar',
    '[attr.aria-label]': 'ariaLabel() || null',
  },
})
export class ElMenubar implements ElMenubarContext {
  readonly size = input<ElMenubarSize>('md');
  readonly ariaLabel = input<string>();

  private readonly menus = signal<ElMenubarMenu[]>([]);
  private readonly activeMenuId = signal<string | null>(null);

  protected readonly rootClass = computed(() => ({
    'el-menubar': true,
    [`el-menubar--${this.size()}`]: true,
  }));

  isOpen(menuId: string): boolean {
    return this.activeMenuId() === menuId;
  }

  anyOpen(): boolean {
    return this.activeMenuId() !== null;
  }

  toggle(menuId: string): void {
    if (this.activeMenuId() === menuId) {
      this.activeMenuId.set(null);
      return;
    }
    this.activeMenuId.set(menuId);
  }

  open(menuId: string): void {
    const current = this.activeMenuId();
    this.activeMenuId.set(menuId);
    if (current && current !== menuId) {
      this.menus()
        .find((menu) => menu.menuId === current)
        ?.close();
    }
  }

  close(menuId: string): void {
    if (this.activeMenuId() === menuId) {
      this.activeMenuId.set(null);
    }
  }

  closeAll(): void {
    this.activeMenuId.set(null);
  }

  registerMenu(menu: ElMenubarMenu): void {
    this.menus.update((menus) =>
      menus.some((existing) => existing.menuId === menu.menuId)
        ? menus
        : [...menus, menu],
    );
  }

  unregisterMenu(menuId: string): void {
    this.menus.update((menus) =>
      menus.filter((existing) => existing.menuId !== menuId),
    );
    this.close(menuId);
  }

  onTriggerEnter(menuId: string): void {
    if (this.activeMenuId() === null || this.activeMenuId() === menuId) {
      return;
    }
    this.open(menuId);
  }

  onTriggerKeydown(event: KeyboardEvent, menuId: string): void {
    const menus = this.menus();
    if (menus.length === 0) {
      return;
    }
    const index = menus.findIndex((menu) => menu.menuId === menuId);
    const resolved = index >= 0 ? index : 0;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.moveTo(menus, (resolved + 1) % menus.length);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.moveTo(menus, (resolved - 1 + menus.length) % menus.length);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.moveTo(menus, 0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.moveTo(menus, menus.length - 1);
    }
  }

  private moveTo(menus: readonly ElMenubarMenu[], index: number): void {
    const next = menus[index];
    if (this.activeMenuId() !== null) {
      this.open(next.menuId);
    }
    next.focusTrigger();
  }
}
