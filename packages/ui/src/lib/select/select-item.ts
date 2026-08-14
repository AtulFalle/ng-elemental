import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { ElIcon } from '../icon/icon';
import { EL_SELECT } from './select.token';

@Component({
  selector: 'el-select-item',
  imports: [ElIcon],
  templateUrl: './select-item.html',
  styleUrl: './select-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-select-item',
    '[class.el-select-item--selected]': 'selected()',
    '[class.el-select-item--disabled]': 'isDisabled()',
    '[class.el-select-item--active]': 'active()',
    '[class.el-select-item--multiple]': 'multiple()',
    role: 'option',
    '[id]': 'optionId',
    '[attr.aria-selected]': 'selected()',
    '[attr.aria-disabled]': 'isDisabled() || null',
    '[attr.tabindex]': 'tabIndex()',
    '(click)': 'onClick()',
    '(keydown.enter)': 'onActivate($event)',
    '(keydown.space)': 'onActivate($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ElSelectItem {
  private static nextId = 0;

  private readonly select = inject(EL_SELECT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly value = input.required<string>();
  readonly label = input('');
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly optionId = `el-select-option-${ElSelectItem.nextId++}`;

  readonly displayLabel = computed(() => this.label() || this.value());

  protected readonly multiple = computed(() => this.select.multiple());

  protected readonly selected = computed(() =>
    this.select.isSelected(this.value()),
  );

  protected readonly isDisabled = computed(() =>
    this.select.isItemDisabled(this.disabled()),
  );

  protected readonly active = computed(() =>
    this.select.isActive(this.optionId),
  );

  protected readonly tabIndex = computed(() =>
    this.isDisabled() ? -1 : this.active() ? 0 : -1,
  );

  constructor() {
    this.select.register(this);
    inject(DestroyRef).onDestroy(() => this.select.unregister(this));
  }

  protected onClick(): void {
    this.activate();
  }

  protected onActivate(event: Event): void {
    event.preventDefault();
    this.activate();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'Home' ||
      event.key === 'End'
    ) {
      this.select.onItemKeydown(event);
    }
  }

  private activate(): void {
    if (this.isDisabled()) {
      return;
    }

    if (this.multiple()) {
      this.select.toggle(this.value());
      return;
    }

    this.select.select(this.value());
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}
