import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

export type ElSeparatorOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'el-separator',
  template: '',
  styleUrl: './separator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-separator',
    '[class.el-separator--horizontal]': 'orientation() === "horizontal"',
    '[class.el-separator--vertical]': 'orientation() === "vertical"',
    '[attr.role]': 'decorative() ? null : "separator"',
    '[attr.aria-orientation]': 'decorative() ? null : orientation()',
    '[attr.aria-hidden]': 'decorative() ? "true" : null',
  },
})
export class ElSeparator {
  readonly orientation = input<ElSeparatorOrientation>('horizontal');
  readonly decorative = input(true, { transform: booleanAttribute });
}
