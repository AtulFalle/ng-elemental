import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { ElIcon } from '../icon/icon';
import { EL_MENU } from './menu.token';
import type { ElMenuItemType, ElMenuItemVariant } from './menu.token';
import { ElMenuTrigger } from './menu-trigger';

@Component({
  selector: 'el-menu-item',
  imports: [ElIcon],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-menu-item-host',
    '[id]': 'itemId',
    '[class.el-menu-item-host--disabled]': 'isDisabled()',
    '[class.el-menu-item-host--active]': 'active()',
    '[class.el-menu-item-host--danger]': 'variant() === "danger"',
    '[attr.role]': 'role()',
    '[attr.aria-disabled]': 'isDisabled() || null',
    '[attr.aria-checked]': 'ariaChecked()',
    '[attr.tabindex]': 'tabIndex()',
    '(click)': 'onClick($event)',
    '(keydown)': 'onKeydown($event)',
    '(pointerenter)': 'onPointerEnter()',
  },
})
export class ElMenuItem {
  private static nextId = 0;

  private readonly nearestMenu = inject(EL_MENU);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly submenuTrigger = inject(ElMenuTrigger, {
    optional: true,
    self: true,
  });
  private readonly menu = this.itemOwner();

  readonly itemId = `el-menu-item-${ElMenuItem.nextId++}`;

  readonly disabled = input(false, { transform: booleanAttribute });
  readonly checked = input(false, { transform: booleanAttribute });
  readonly icon = input('');
  readonly shortcut = input('');
  readonly type = input<ElMenuItemType>('item');
  readonly variant = input<ElMenuItemVariant>('default');

  readonly selected = output<void>();

  label(): string {
    return this.elementRef.nativeElement.textContent?.trim() ?? '';
  }

  protected readonly isDisabled = computed(
    () => this.menu.disabled() || this.disabled(),
  );

  protected readonly active = computed(() => this.menu.isActive(this.itemId));

  protected readonly isSubmenuTrigger = computed(
    () => !!this.submenuTrigger && this.nearestMenu.isSubmenu(),
  );

  protected readonly role = computed(() => {
    if (this.type() === 'checkbox') {
      return 'menuitemcheckbox';
    }
    if (this.type() === 'radio') {
      return 'menuitemradio';
    }
    return 'menuitem';
  });

  protected readonly ariaChecked = computed(() => {
    if (this.type() === 'item') {
      return null;
    }
    return this.checked();
  });

  protected readonly tabIndex = computed(() => {
    if (this.isDisabled()) {
      return -1;
    }
    return this.active() ? 0 : -1;
  });

  protected readonly rootClass = computed(() => ({
    'el-menu-item': true,
    'el-menu-item--disabled': this.isDisabled(),
    'el-menu-item--active': this.active(),
    'el-menu-item--checked': this.checked(),
    'el-menu-item--danger': this.variant() === 'danger',
    'el-menu-item--submenu': this.isSubmenuTrigger(),
  }));

  constructor() {
    this.menu.registerItem(this);
    inject(DestroyRef).onDestroy(() => this.menu.unregisterItem(this));
  }

  protected onClick(event: Event): void {
    if (this.isSubmenuTrigger()) {
      return;
    }
    event.preventDefault();
    this.activate();
  }

  protected onPointerEnter(): void {
    if (this.isDisabled()) {
      return;
    }
    this.menu.setActive(this.itemId);
    this.elementRef.nativeElement.focus();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      if (this.isSubmenuTrigger()) {
        return;
      }
      event.preventDefault();
      this.activate();
      return;
    }
    this.menu.onItemKeydown(event);
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  private itemOwner() {
    if (this.submenuTrigger && this.nearestMenu.isSubmenu()) {
      return this.nearestMenu.parent() ?? this.nearestMenu;
    }
    return this.nearestMenu;
  }

  private activate(): void {
    if (this.isDisabled()) {
      return;
    }
    this.selected.emit();
    const persist = this.type() === 'checkbox' || this.type() === 'radio';
    this.menu.activateLeaf(!persist);
  }
}
