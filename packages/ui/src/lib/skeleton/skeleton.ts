import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

export type ElSkeletonVariant = 'text' | 'circular' | 'rectangular';
export { ElSkeletonDirective } from './skeleton-target';

@Component({
  selector: 'el-skeleton',
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-skeleton-host',
    'aria-hidden': 'true',
    '[style.--el-skeleton-width]': 'width() || null',
    '[style.--el-skeleton-height]': 'height() || null',
  },
})
export class ElSkeleton {
  readonly variant = input<ElSkeletonVariant>('text');
  readonly animation = input(true, { transform: booleanAttribute });
  readonly lines = input(1, { transform: numberAttribute });
  readonly width = input<string>();
  readonly height = input<string>();

  protected readonly lineIndexes = computed(() => {
    const count = this.variant() === 'text' ? Math.max(1, Math.floor(this.lines())) : 1;
    return Array.from({ length: count }, (_, index) => index);
  });

  protected readonly rootClass = computed(() => ({
    'el-skeleton': true,
    [`el-skeleton--${this.variant()}`]: true,
    'el-skeleton--animated': this.animation(),
  }));
}
