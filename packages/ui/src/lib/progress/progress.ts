import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import {
  clampProgressValue,
  effectiveProgressMax,
  progressLabelPercent,
  progressPercent,
  type ElProgressSize,
} from './progress-utils';

export type { ElProgressSize } from './progress-utils';

@Component({
  selector: 'el-progress',
  templateUrl: './progress.html',
  styleUrl: './progress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-progress-host',
    role: 'progressbar',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'ariaMax()',
    '[attr.aria-valuenow]': 'ariaValueNow()',
  },
})
export class ElProgress {
  readonly value = input(0);
  readonly max = input(100);
  readonly indeterminate = input(false, { transform: booleanAttribute });
  readonly showValue = input(false, { transform: booleanAttribute });
  readonly size = input<ElProgressSize>('md');

  protected readonly ariaMax = computed(() => effectiveProgressMax(this.max()));

  protected readonly ariaValueNow = computed(() => {
    if (this.indeterminate()) {
      return null;
    }

    return clampProgressValue(this.value(), this.max());
  });

  protected readonly percent = computed(() =>
    progressPercent(this.value(), this.max()),
  );

  protected readonly labelText = computed(
    () => `${progressLabelPercent(this.value(), this.max())}%`,
  );

  protected readonly showLabel = computed(
    () => this.showValue() && !this.indeterminate(),
  );

  protected readonly rootClass = computed(() => ({
    'el-progress': true,
    'el-progress--sm': this.size() === 'sm',
    'el-progress--md': this.size() === 'md',
    'el-progress--lg': this.size() === 'lg',
    'el-progress--indeterminate': this.indeterminate(),
  }));
}
