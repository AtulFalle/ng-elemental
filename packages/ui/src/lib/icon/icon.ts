import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type ElIconVariant = 'solid' | 'regular' | 'brands';
export type ElIconSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'el-icon',
  template: `<span
    [class]="classes()"
    [attr.aria-hidden]="decorative() ? 'true' : null"
    [attr.aria-label]="decorative() ? null : label() || null"
    role="img"
  ></span>`,
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-icon-host',
  },
})
export class ElIcon {
  /** Font Awesome icon name without the `fa-` prefix (e.g. `check`, `xmark`). */
  readonly name = input.required<string>();
  readonly variant = input<ElIconVariant>('solid');
  readonly size = input<ElIconSize>('md');
  readonly label = input('');
  readonly decorative = input(true, { transform: booleanAttribute });

  protected readonly classes = computed(() => {
    const variantClass = {
      solid: 'fa-solid',
      regular: 'fa-regular',
      brands: 'fa-brands',
    }[this.variant()];

    const rawName = this.name().trim();
    const iconClass = rawName.startsWith('fa-') ? rawName : `fa-${rawName}`;

    return ['el-icon', `el-icon--${this.size()}`, variantClass, iconClass].join(
      ' ',
    );
  });
}
