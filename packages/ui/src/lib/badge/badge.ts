import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

export type ElBadgeVariant = 'auto' | 'overlay' | 'pill';
export type ElBadgeColor =
  | 'error'
  | 'primary'
  | 'success'
  | 'warning'
  | 'info'
  | 'neutral';
export type ElBadgeSize = 'sm' | 'md';
export type ElBadgePlacement =
  | 'top-end'
  | 'top-start'
  | 'bottom-end'
  | 'bottom-start';

function optionalNumberAttribute(value: unknown): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

@Component({
  selector: 'el-badge',
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-badge-host',
    '[class.el-badge-host--auto]': 'variant() === "auto"',
    '[class.el-badge-host--overlay]': 'variant() === "overlay"',
    '[class.el-badge-host--pill]': 'variant() === "pill"',
  },
})
export class ElBadge {
  readonly count = input<number | null, unknown>(null, {
    transform: optionalNumberAttribute,
  });
  readonly max = input(99, { transform: numberAttribute });
  readonly content = input('');
  readonly dot = input(false, { transform: booleanAttribute });
  readonly showZero = input(false, { transform: booleanAttribute });
  readonly variant = input<ElBadgeVariant>('auto');
  /** Empty string uses the layout default (error for overlay, primary for pill). */
  readonly color = input<ElBadgeColor | ''>('');
  readonly size = input<ElBadgeSize>('md');
  readonly placement = input<ElBadgePlacement>('top-end');
  readonly ariaLabel = input('');

  protected readonly indicatorText = computed((): string | null => {
    if (this.dot()) {
      return '';
    }

    const content = this.content().trim();
    if (content) {
      return content;
    }

    const count = this.count();
    if (count === null) {
      return null;
    }

    if (count === 0 && !this.showZero()) {
      return null;
    }

    const max = Math.max(0, this.max());
    if (count > max) {
      return `${max}+`;
    }

    return String(count);
  });

  protected readonly showIndicator = computed(() => {
    if (this.dot()) {
      const count = this.count();
      if (typeof count === 'number' && count <= 0 && !this.showZero()) {
        return false;
      }
      return true;
    }

    return this.indicatorText() !== null;
  });

  protected readonly accessibleName = computed(() => {
    const explicit = this.ariaLabel().trim();
    return explicit || null;
  });

  protected readonly indicatorRole = computed(() =>
    this.accessibleName() ? 'img' : null,
  );

  protected readonly indicatorHidden = computed(() => {
    if (!this.dot() || this.accessibleName()) {
      return null;
    }

    return true;
  });

  protected readonly rootClass = computed(() => {
    const color = this.color();

    return {
      'el-badge': true,
      'el-badge--dot': this.dot() && this.showIndicator(),
      'el-badge--sm': this.size() === 'sm',
      'el-badge--md': this.size() === 'md',
      [`el-badge--${color}`]: !!color,
      [`el-badge--${this.placement()}`]: true,
    };
  });
}
