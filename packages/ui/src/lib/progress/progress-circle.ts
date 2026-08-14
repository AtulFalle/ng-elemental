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

/** Circle circumference for r=15.9155 in a 36×36 viewBox (~100). */
const CIRCLE_CIRCUMFERENCE = 100;

@Component({
  selector: 'el-progress-circle',
  templateUrl: './progress-circle.html',
  styleUrl: './progress-circle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-progress-circle-host',
    role: 'progressbar',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'ariaMax()',
    '[attr.aria-valuenow]': 'ariaValueNow()',
  },
})
export class ElProgressCircle {
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

  protected readonly dashOffset = computed(() => {
    if (this.indeterminate()) {
      return CIRCLE_CIRCUMFERENCE * 0.75;
    }

    return CIRCLE_CIRCUMFERENCE * (1 - this.percent() / 100);
  });

  protected readonly strokeDasharray = CIRCLE_CIRCUMFERENCE;

  protected readonly rootClass = computed(() => ({
    'el-progress-circle': true,
    'el-progress-circle--sm': this.size() === 'sm',
    'el-progress-circle--md': this.size() === 'md',
    'el-progress-circle--lg': this.size() === 'lg',
    'el-progress-circle--indeterminate': this.indeterminate(),
  }));
}
