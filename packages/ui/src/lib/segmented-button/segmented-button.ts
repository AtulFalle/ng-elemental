import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  input,
  model,
} from '@angular/core';
import type { ElButtonVariant } from '../button/button';
import { ElSegmentedButtonItem } from './segmented-button-item';
import { EL_SEGMENTED_BUTTON } from './segmented-button.token';

export type ElSegmentedButtonSize = 'sm' | 'md' | 'lg';
export type ElSegmentedButtonVariant = ElButtonVariant;

export { ElSegmentedButtonItem } from './segmented-button-item';
export { EL_SEGMENTED_BUTTON } from './segmented-button.token';

@Component({
  selector: 'el-segmented-button',
  templateUrl: './segmented-button.html',
  styleUrl: './segmented-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_SEGMENTED_BUTTON, useExisting: ElSegmentedButton }],
  host: {
    class: 'el-segmented-button',
    '[class.el-segmented-button--primary]': 'variant() === "primary"',
    '[class.el-segmented-button--secondary]': 'variant() === "secondary"',
    '[class.el-segmented-button--ghost]': 'variant() === "ghost"',
    '[class.el-segmented-button--sm]': 'size() === "sm"',
    '[class.el-segmented-button--md]': 'size() === "md"',
    '[class.el-segmented-button--lg]': 'size() === "lg"',
    '[class.el-segmented-button--disabled]': 'disabled()',
    role: 'radiogroup',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-disabled]': 'disabled() || null',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ElSegmentedButton {
  readonly value = model<string>('');
  readonly variant = input<ElSegmentedButtonVariant>('secondary');
  readonly size = input<ElSegmentedButtonSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();

  private readonly items = contentChildren(ElSegmentedButtonItem);

  select(itemValue: string): void {
    if (this.disabled()) {
      return;
    }
    this.value.set(itemValue);
  }

  isItemDisabled(itemDisabled: boolean): boolean {
    return this.disabled() || itemDisabled;
  }

  isSelected(itemValue: string): boolean {
    return this.value() === itemValue;
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    const enabledItems = this.items().filter(
      (item) => !this.isItemDisabled(item.disabled()),
    );
    if (enabledItems.length === 0) {
      return;
    }

    const currentIndex = enabledItems.findIndex((item) =>
      this.isSelected(item.value()),
    );
    const resolvedIndex = currentIndex >= 0 ? currentIndex : 0;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (resolvedIndex + 1) % enabledItems.length;
      this.selectAndFocus(enabledItems, nextIndex);
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex =
        (resolvedIndex - 1 + enabledItems.length) % enabledItems.length;
      this.selectAndFocus(enabledItems, nextIndex);
    }
  }

  private selectAndFocus(
    items: readonly ElSegmentedButtonItem[],
    index: number,
  ): void {
    const item = items[index];
    this.select(item.value());
    item.focus();
  }
}
