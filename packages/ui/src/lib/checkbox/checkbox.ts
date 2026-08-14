import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  model,
  viewChild,
} from '@angular/core';
import { ElIcon } from '../icon/icon';

export type ElCheckboxLabelPosition = 'left' | 'right';

@Component({
  selector: 'el-checkbox',
  imports: [ElIcon],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElCheckbox {
  readonly checked = model(false);
  readonly indeterminate = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly error = input(false, { transform: booleanAttribute });
  readonly labelPosition = input<ElCheckboxLabelPosition>('right');
  readonly name = input('');
  readonly value = input('');
  readonly inputId = input('');

  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('input');

  constructor() {
    effect(() => {
      const input = this.inputRef()?.nativeElement;
      if (!input) {
        return;
      }

      input.checked = this.checked();
      input.indeterminate = this.indeterminate();
    });
  }

  protected onInputChange(event: Event): void {
    if (this.disabled()) {
      return;
    }

    const target = event.target as HTMLInputElement;
    this.checked.set(target.checked);
  }
}
