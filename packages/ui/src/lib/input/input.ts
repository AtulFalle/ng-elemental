import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  effect,
  ElementRef,
  input,
  model,
  viewChild,
} from '@angular/core';

export type ElInputSize = 'sm' | 'md' | 'lg';
export type ElInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'url'
  | 'search'
  | 'number';

const MASK_TOKENS: Record<string, RegExp> = {
  '0': /\d/,
  A: /[a-zA-Z]/,
  '*': /[a-zA-Z0-9]/,
};

function isMaskToken(char: string): boolean {
  return char in MASK_TOKENS;
}

/** Formats `value` with an optional mask. Empty mask returns `value` unchanged. */
export function applyInputMask(value: string, mask: string): string {
  if (!mask) {
    return value;
  }

  let result = '';
  let valueIndex = 0;

  for (const maskChar of mask) {
    if (valueIndex >= value.length && !isMaskToken(maskChar)) {
      break;
    }

    if (!isMaskToken(maskChar)) {
      if (valueIndex >= value.length) {
        break;
      }

      result += maskChar;
      if (value[valueIndex] === maskChar) {
        valueIndex += 1;
      }
      continue;
    }

    const pattern = MASK_TOKENS[maskChar];
    while (valueIndex < value.length && !pattern.test(value[valueIndex])) {
      valueIndex += 1;
    }

    if (valueIndex >= value.length) {
      break;
    }

    result += value[valueIndex];
    valueIndex += 1;
  }

  return result;
}

@Directive({
  selector: '[elInputPrefix]',
})
export class ElInputPrefix {}

@Directive({
  selector: '[elInputSuffix]',
})
export class ElInputSuffix {}

@Component({
  selector: 'el-input',
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-input',
    '[class.el-input--sm]': 'size() === "sm"',
    '[class.el-input--md]': 'size() === "md"',
    '[class.el-input--lg]': 'size() === "lg"',
    '[class.el-input--disabled]': 'disabled()',
    '[class.el-input--readonly]': 'readOnly()',
    '[class.el-input--error]': 'error()',
    '(click)': 'onHostClick($event)',
  },
})
export class ElInput {
  readonly value = model('');
  readonly type = input<ElInputType>('text');
  readonly mask = input('');
  readonly size = input<ElInputSize>('md');
  readonly placeholder = input('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readOnly = input(false, { transform: booleanAttribute });
  readonly error = input(false, { transform: booleanAttribute });
  readonly inputId = input('');
  readonly name = input('');
  readonly autocomplete = input('');
  readonly ariaLabel = input<string>();

  private readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('input');

  private readonly activeMask = computed(() =>
    this.type() === 'number' ? '' : this.mask(),
  );

  constructor() {
    effect(() => {
      const formatted = applyInputMask(this.value(), this.activeMask());
      const input = this.inputRef()?.nativeElement;
      if (input && input.value !== formatted) {
        input.value = formatted;
      }
    });
  }

  protected onInput(event: Event): void {
    if (this.disabled() || this.readOnly()) {
      return;
    }

    const input = event.target as HTMLInputElement;
    const next = applyInputMask(input.value, this.activeMask());
    const caret = input.selectionStart ?? next.length;
    const atEnd = caret >= input.value.length;

    this.value.set(next);

    if (input.type === 'number') {
      return;
    }

    const pos = atEnd ? next.length : Math.min(caret, next.length);
    queueMicrotask(() => {
      this.inputRef()?.nativeElement.setSelectionRange(pos, pos);
    });
  }

  protected onHostClick(event: Event): void {
    if (this.disabled()) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest('button, a, input, textarea, select')) {
      return;
    }

    this.inputRef()?.nativeElement.focus();
  }
}
