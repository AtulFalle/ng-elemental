import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export { ElBreadcrumbItem } from './breadcrumb-item';

@Component({
  selector: 'el-breadcrumb',
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-breadcrumb-host',
  },
})
export class ElBreadcrumb {
  readonly ariaLabel = input('Breadcrumb');
}
