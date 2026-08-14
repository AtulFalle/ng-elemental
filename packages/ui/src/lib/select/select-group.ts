import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'el-select-group',
  templateUrl: './select-group.html',
  styleUrl: './select-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-select-group',
    role: 'group',
    '[attr.aria-label]': 'label()',
  },
})
export class ElSelectGroup {
  readonly label = input.required<string>();
}
