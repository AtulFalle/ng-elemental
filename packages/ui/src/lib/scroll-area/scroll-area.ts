import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ElScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

@Component({
  selector: 'el-scroll-area',
  templateUrl: './scroll-area.html',
  styleUrl: './scroll-area.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-scroll-area',
    '[class.el-scroll-area--vertical]': 'orientation() === "vertical"',
    '[class.el-scroll-area--horizontal]': 'orientation() === "horizontal"',
    '[class.el-scroll-area--both]': 'orientation() === "both"',
    role: 'region',
    '[attr.aria-label]': 'ariaLabel() || null',
  },
})
export class ElScrollArea {
  readonly orientation = input<ElScrollAreaOrientation>('vertical');
  readonly ariaLabel = input<string>();
}
