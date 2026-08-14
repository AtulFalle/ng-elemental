import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type ElCardAppearance = 'outlined' | 'elevated';
export type ElCardSize = 'default' | 'compact';

@Component({
  selector: 'el-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-card-host',
  },
})
export class ElCard {
  readonly appearance = input<ElCardAppearance>('outlined');
  readonly size = input<ElCardSize>('default');

  protected readonly rootClass = computed(() => ({
    'el-card': true,
    'el-card--outlined': this.appearance() === 'outlined',
    'el-card--elevated': this.appearance() === 'elevated',
    'el-card--default': this.size() === 'default',
    'el-card--compact': this.size() === 'compact',
  }));
}
