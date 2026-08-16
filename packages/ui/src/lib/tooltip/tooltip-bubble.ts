import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

export type ElTooltipPosition = 'top' | 'bottom' | 'start' | 'end';

@Component({
  selector: 'el-tooltip-bubble',
  templateUrl: './tooltip-bubble.html',
  styleUrl: './tooltip-bubble.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-tooltip-bubble',
    role: 'tooltip',
    '[id]': 'tooltipId()',
    '[class.el-tooltip-bubble--fixed]': 'fixed()',
    '[class.el-tooltip-bubble--top]': 'position() === "top"',
    '[class.el-tooltip-bubble--bottom]': 'position() === "bottom"',
    '[class.el-tooltip-bubble--start]': 'position() === "start"',
    '[class.el-tooltip-bubble--end]': 'position() === "end"',
    '[style.left.px]': 'left()',
    '[style.top.px]': 'top()',
    '[style.--el-tooltip-arrow]': 'arrowOffset()',
  },
})
export class ElTooltipBubble {
  readonly text = input('');
  readonly position = input<ElTooltipPosition>('top');
  readonly tooltipId = input('');
  readonly fixed = input(false);
  readonly left = input<number | null>(null);
  readonly top = input<number | null>(null);
  /** Pixel offset of the arrow along the facing edge, e.g. `48px`. */
  readonly arrowOffset = input('50%');
}
