import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { EL_MENU, EL_MENUBAR } from './menu.token';

@Directive({
  selector: '[elMenuTrigger]',
  host: {
    '[attr.aria-haspopup]': '"menu"',
    '[attr.aria-expanded]': 'menu.isOpen()',
    '[attr.aria-controls]': 'menu.isOpen() ? menu.panelId : null',
    '[attr.aria-disabled]': 'menu.disabled() || null',
    '[attr.tabindex]':
      'menu.trigger() === "contextmenu" && !menu.isSubmenu() ? 0 : null',
    '(click)': 'onClick($event)',
    '(contextmenu)': 'onContextMenu($event)',
    '(keydown)': 'onKeydown($event)',
    '(pointerenter)': 'onPointerEnter()',
  },
})
export class ElMenuTrigger {
  private readonly host = inject(ElementRef<HTMLElement>);
  protected readonly menu = inject(EL_MENU);
  private readonly menubar = inject(EL_MENUBAR, { optional: true });

  constructor() {
    this.menu.registerTrigger(this.host.nativeElement);
    inject(DestroyRef).onDestroy(() =>
      this.menu.unregisterTrigger(this.host.nativeElement),
    );
  }

  protected onClick(event: Event): void {
    if (this.menu.disabled()) {
      return;
    }
    if (this.menu.trigger() === 'contextmenu' && !this.menu.isSubmenu()) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.menu.toggle();
  }

  protected onContextMenu(event: MouseEvent): void {
    if (this.menu.disabled() || this.menu.trigger() !== 'contextmenu') {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.menu.setAnchorPoint({ x: event.clientX, y: event.clientY });
    this.menu.openPanel();
  }

  protected onPointerEnter(): void {
    this.menu.onTriggerPointerEnter();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.menu.disabled()) {
      return;
    }

    if (this.menubar && !this.menu.isSubmenu()) {
      this.menubar.onTriggerKeydown(event, this.menu.menuId);
    }

    if (
      this.menu.trigger() === 'contextmenu' &&
      !this.menu.isSubmenu() &&
      (event.key === 'ContextMenu' ||
        (event.key === 'F10' && event.shiftKey))
    ) {
      event.preventDefault();
      this.openContextMenuAtHost();
      return;
    }

    if (
      event.key === 'ArrowDown' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      this.menu.openPanel();
    }

    if (event.key === 'ArrowUp' && !this.menu.isSubmenu()) {
      event.preventDefault();
      this.menu.openPanel('last');
    }

    if (event.key === 'ArrowRight' && this.menu.isSubmenu()) {
      event.preventDefault();
      this.menu.openPanel();
    }
  }

  private openContextMenuAtHost(): void {
    const rect = this.host.nativeElement.getBoundingClientRect();
    this.menu.setAnchorPoint({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    this.menu.openPanel();
  }
}
