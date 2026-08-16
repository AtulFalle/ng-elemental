import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { ElIcon } from '../icon/icon';

export type ElChipType = 'assist' | 'filter' | 'suggestion';
export type ElChipAppearance = 'outlined' | 'filled' | 'elevated';
export type ElChipColor = 'neutral' | 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'el-chip',
  imports: [ElIcon],
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-chip-host',
  },
})
export class ElChip {
  readonly type = input<ElChipType>('assist');
  readonly appearance = input<ElChipAppearance>('outlined');
  readonly color = input<ElChipColor>('neutral');
  /** Font Awesome icon name for the start icon (without `fa-` prefix). */
  readonly iconStart = input('');
  readonly selected = model(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly removable = input(false, { transform: booleanAttribute });
  readonly removeLabel = input('Remove');

  readonly removed = output<void>();

  protected readonly isFilter = computed(() => this.type() === 'filter');
  protected readonly isSelected = computed(
    () => this.isFilter() && this.selected(),
  );

  protected readonly startIconName = computed(() => {
    if (this.isSelected()) {
      return 'check';
    }

    return this.iconStart() || null;
  });

  protected readonly surface = computed((): ElChipAppearance => {
    if (this.isFilter()) {
      return this.selected() ? 'filled' : 'outlined';
    }

    return this.appearance();
  });

  protected readonly chipModifiers = computed(() => ({
    'el-chip--assist': this.type() === 'assist',
    'el-chip--filter': this.type() === 'filter',
    'el-chip--suggestion': this.type() === 'suggestion',
    'el-chip--outlined': this.surface() === 'outlined',
    'el-chip--filled': this.surface() === 'filled',
    'el-chip--elevated': this.surface() === 'elevated',
    'el-chip--selected': this.isSelected(),
    'el-chip--disabled': this.disabled(),
    'el-chip--with-icon-start': !!this.startIconName(),
    [`el-chip--${this.color()}`]: this.color() !== 'neutral',
  }));

  protected onChipClick(): void {
    if (this.disabled() || !this.isFilter()) {
      return;
    }

    this.selected.update((value) => !value);
  }

  protected onRemoveClick(event: Event): void {
    event.stopPropagation();

    if (this.disabled()) {
      return;
    }

    this.removed.emit();
  }
}
