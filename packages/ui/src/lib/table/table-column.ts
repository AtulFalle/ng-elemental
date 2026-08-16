import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
} from '@angular/core';
import { ElTableCell } from './table-cell-def';
import { ElTableHeader } from './table-header';
import type { ElTableAlign } from './table.token';

export { ElTableCell } from './table-cell-def';
export { ElTableHeader } from './table-header';

@Component({
  selector: 'el-table-column',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-table-column',
  },
  styles: `
    :host {
      display: none;
    }
  `,
})
export class ElTableColumn {
  readonly name = input.required<string>();
  readonly label = input('');
  readonly sortable = input(false, { transform: booleanAttribute });
  readonly width = input('');
  readonly align = input<ElTableAlign>('start');

  private readonly headerDef = contentChild(ElTableHeader);
  private readonly cellDef = contentChild(ElTableCell);

  readonly headerTemplate = computed(() => this.headerDef()?.template);
  readonly cellTemplate = computed(() => this.cellDef()?.template);

  readonly headerText = computed(() => this.label() || this.name());
}
