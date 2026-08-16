import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

export type ElGridGap = '1' | '2' | '3' | '4' | '5' | '6' | '8';

@Component({
  selector: 'el-grid',
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-grid',
    '[style.gap]': 'gapCss()',
    '[style.grid-template-columns]': 'templateColumns()',
  },
})
export class ElGrid {
  readonly columns = input(1, { transform: numberAttribute });
  readonly gap = input<ElGridGap>('4');
  readonly minItemWidth = input<string>();

  protected readonly gapCss = computed(() => `var(--el-space-${this.gap()})`);

  protected readonly templateColumns = computed(() => {
    const min = this.minItemWidth()?.trim();
    if (min) {
      return `repeat(auto-fit, minmax(${min}, 1fr))`;
    }

    const cols = Math.max(1, Math.floor(this.columns()) || 1);
    return `repeat(${cols}, minmax(0, 1fr))`;
  });
}
