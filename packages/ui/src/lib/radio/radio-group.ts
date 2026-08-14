import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  input,
  model,
} from '@angular/core';
import { ElRadio } from './radio';
import { EL_RADIO_GROUP } from './radio.token';

export type ElRadioGroupDirection = 'vertical' | 'horizontal';

export { ElRadio, type ElRadioLabelPosition } from './radio';
export { EL_RADIO_GROUP } from './radio.token';

@Component({
  selector: 'el-radio-group',
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: EL_RADIO_GROUP, useExisting: ElRadioGroup }],
  host: {
    class: 'el-radio-group',
    '[class.el-radio-group--vertical]': 'direction() === "vertical"',
    '[class.el-radio-group--horizontal]': 'direction() === "horizontal"',
    '[class.el-radio-group--disabled]': 'disabled()',
    '[class.el-radio-group--error]': 'error()',
    role: 'radiogroup',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.aria-invalid]': 'error() ? true : null',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ElRadioGroup {
  private static nextId = 0;

  readonly value = model<string>('');
  readonly direction = input<ElRadioGroupDirection>('vertical');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly error = input(false, { transform: booleanAttribute });
  readonly name = input('');
  readonly ariaLabel = input<string>();

  private readonly generatedName = `el-radio-group-${ElRadioGroup.nextId++}`;
  private readonly radios = contentChildren(ElRadio);

  groupName(): string {
    return this.name() || this.generatedName;
  }

  select(itemValue: string): void {
    if (this.disabled()) {
      return;
    }
    this.value.set(itemValue);
  }

  isSelected(itemValue: string): boolean {
    return this.value() === itemValue;
  }

  isItemDisabled(itemDisabled: boolean): boolean {
    return this.disabled() || itemDisabled;
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    const enabledRadios = this.radios().filter(
      (radio) => !this.isItemDisabled(radio.disabled()),
    );
    if (enabledRadios.length === 0) {
      return;
    }

    const currentIndex = enabledRadios.findIndex((radio) =>
      this.isSelected(radio.value()),
    );
    const resolvedIndex = currentIndex >= 0 ? currentIndex : 0;
    const isHorizontal = this.direction() === 'horizontal';

    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

    if (event.key === nextKey) {
      event.preventDefault();
      const nextIndex = (resolvedIndex + 1) % enabledRadios.length;
      this.selectAndFocus(enabledRadios, nextIndex);
      return;
    }

    if (event.key === prevKey) {
      event.preventDefault();
      const nextIndex =
        (resolvedIndex - 1 + enabledRadios.length) % enabledRadios.length;
      this.selectAndFocus(enabledRadios, nextIndex);
    }
  }

  private selectAndFocus(
    radios: readonly ElRadio[],
    index: number,
  ): void {
    const radio = radios[index];
    this.select(radio.value());
    radio.focus();
  }
}
