import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { ElIcon, type ElIconSize, type ElIconVariant } from '../icon/icon';

export type ElButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ElButtonSize = 'sm' | 'md' | 'lg';
export type ElButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'el-button',
  imports: [ElIcon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElButton {
  readonly variant = input<ElButtonVariant>('primary');
  readonly size = input<ElButtonSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly type = input<ElButtonType>('button');
  readonly iconStart = input('');
  readonly iconEnd = input('');
  readonly iconVariant = input<ElIconVariant>('solid');

  protected readonly iconSize = computed((): ElIconSize => this.size());
}
