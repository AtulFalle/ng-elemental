import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

export type ElButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ElButtonSize = 'sm' | 'md' | 'lg';
export type ElButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'el-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElButton {
  readonly variant = input<ElButtonVariant>('primary');
  readonly size = input<ElButtonSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly type = input<ElButtonType>('button');
}
