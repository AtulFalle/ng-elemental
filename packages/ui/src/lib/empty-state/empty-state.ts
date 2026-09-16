import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { ElIcon, type ElIconSize } from '../icon/icon';

export type ElEmptyStateSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'el-empty-state',
  imports: [ElIcon],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-empty-state-host',
    '[class.el-empty-state-host--sm]': 'size() === "sm"',
    '[class.el-empty-state-host--md]': 'size() === "md"',
    '[class.el-empty-state-host--lg]': 'size() === "lg"',
    role: 'status',
  },
})
export class ElEmptyState {
  readonly icon = input('');
  readonly title = input('');
  readonly description = input('');
  readonly size = input<ElEmptyStateSize>('md');

  protected readonly iconSize = computed((): ElIconSize => {
    if (this.size() === 'sm') {
      return 'md';
    }
    return 'lg';
  });
}
