import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { EL_RADIO_GROUP } from './radio.token';

export type ElRadioLabelPosition = 'left' | 'right';

@Component({
  selector: 'el-radio',
  templateUrl: './radio.html',
  styleUrl: './radio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElRadio {
  private readonly group = inject(EL_RADIO_GROUP);

  readonly value = input.required<string>();
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly labelPosition = input<ElRadioLabelPosition>('right');
  readonly inputId = input('');

  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('input');

  protected readonly checked = computed(() =>
    this.group.isSelected(this.value()),
  );

  protected readonly isDisabled = computed(() =>
    this.group.isItemDisabled(this.disabled()),
  );

  protected readonly groupName = computed(() => this.group.groupName());

  constructor() {
    effect(() => {
      const input = this.inputRef()?.nativeElement;
      if (!input) {
        return;
      }

      input.checked = this.checked();
    });
  }

  protected onInputChange(): void {
    if (this.isDisabled()) {
      return;
    }

    this.group.select(this.value());
  }

  focus(): void {
    this.inputRef()?.nativeElement.focus();
  }
}
