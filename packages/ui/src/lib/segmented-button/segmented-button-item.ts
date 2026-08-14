import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { EL_SEGMENTED_BUTTON } from './segmented-button.token';

@Component({
  selector: 'el-segmented-button-item',
  templateUrl: './segmented-button-item.html',
  styleUrl: './segmented-button-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-segmented-button-item',
    '[class.el-segmented-button-item--selected]': 'selected()',
    role: 'radio',
    '[attr.aria-checked]': 'selected()',
    '[attr.tabindex]': 'tabIndex()',
    '[attr.aria-disabled]': 'isDisabled() || null',
    '(click)': 'select()',
    '(keydown.enter)': 'select()',
    '(keydown.space)': 'onSpace($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ElSegmentedButtonItem {
  private readonly group = inject(EL_SEGMENTED_BUTTON);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly value = input.required<string>();
  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly selected = computed(
    () => this.group.value() === this.value(),
  );

  protected readonly isDisabled = computed(() =>
    this.group.isItemDisabled(this.disabled()),
  );

  protected readonly tabIndex = computed(() =>
    this.isDisabled() ? -1 : this.selected() ? 0 : -1,
  );

  select(): void {
    if (this.isDisabled()) {
      return;
    }
    this.group.select(this.value());
  }

  onSpace(event: Event): void {
    event.preventDefault();
    this.select();
  }

  onKeydown(event: KeyboardEvent): void {
    if (
      event.key === 'ArrowRight' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowUp'
    ) {
      this.group.onKeydown(event);
    }
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}
