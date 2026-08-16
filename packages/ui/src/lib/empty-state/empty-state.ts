import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { ElIcon } from '../icon/icon';

@Component({
  selector: 'el-empty-state',
  imports: [ElIcon],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-empty-state-host',
    role: 'status',
  },
})
export class ElEmptyState {
  readonly icon = input('');
  readonly title = input('');
  readonly description = input('');
}
