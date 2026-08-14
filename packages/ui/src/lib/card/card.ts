import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type ElCardAppearance = 'outlined' | 'elevated';

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

  protected readonly rootClass = computed(() => ({
    'el-card': true,
    'el-card--outlined': this.appearance() === 'outlined',
    'el-card--elevated': this.appearance() === 'elevated',
  }));
}
