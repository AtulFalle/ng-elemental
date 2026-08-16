import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'el-skeleton-cover',
  template: '',
  styleUrl: './skeleton-cover.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-skeleton-cover',
    'aria-hidden': 'true',
    '[class.el-skeleton-cover--animated]': 'animation()',
    '[class.el-skeleton-cover--fixed]': 'fixed()',
    '[style.left.px]': 'fixed() ? left() : null',
    '[style.top.px]': 'fixed() ? top() : null',
    '[style.width.px]': 'fixed() ? width() : null',
    '[style.height.px]': 'fixed() ? height() : null',
    '[style.border-radius]': 'radius()',
  },
})
export class ElSkeletonCover {
  readonly animation = input(true);
  readonly fixed = input(false);
  readonly left = input(0);
  readonly top = input(0);
  readonly width = input(0);
  readonly height = input(0);
  readonly radius = input('inherit');
}
