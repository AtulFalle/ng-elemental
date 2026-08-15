import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type ElListAppearance = 'outlined' | 'plain';
export type ElListSize = 'sm' | 'md' | 'lg';

export { ElListItem } from './list-item';

@Component({
  selector: 'el-list',
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-list-host',
    role: 'list',
    '[attr.aria-label]': 'ariaLabel() || null',
  },
})
export class ElList {
  readonly appearance = input<ElListAppearance>('outlined');
  readonly size = input<ElListSize>('md');
  readonly divided = input(true, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();

  protected readonly rootClass = computed(() => ({
    'el-list': true,
    [`el-list--${this.appearance()}`]: true,
    [`el-list--${this.size()}`]: true,
    'el-list--divided': this.divided(),
  }));
}
