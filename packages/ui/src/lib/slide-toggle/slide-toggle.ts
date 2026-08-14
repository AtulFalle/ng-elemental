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

export type ElSlideToggleSize = 'sm' | 'md' | 'lg';
export type ElSlideToggleLabelPosition = 'left' | 'right';

@Component({
  selector: 'el-slide-toggle',
  templateUrl: './slide-toggle.html',
  styleUrl: './slide-toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElSlideToggle {
  readonly checked = model(false);
  readonly size = input<ElSlideToggleSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly labelPosition = input<ElSlideToggleLabelPosition>('right');
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
