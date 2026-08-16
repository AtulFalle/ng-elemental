import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { ElIcon } from '../icon/icon';

@Component({
  selector: 'el-breadcrumb-item',
  imports: [ElIcon],
  templateUrl: './breadcrumb-item.html',
  styleUrl: './breadcrumb-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-breadcrumb-item',
  },
})
export class ElBreadcrumbItem {
  readonly href = input<string>();
  readonly current = input(false, { transform: booleanAttribute });

  protected readonly isLink = computed(() => !!this.href() && !this.current());
}
