import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

export type ElLabelVariant = 'default' | 'muted' | 'error';

@Component({
  selector: 'el-label',
  templateUrl: './label.html',
  styleUrl: './label.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElLabel {
  readonly variant = input<ElLabelVariant>('default');
  readonly htmlFor = input('');
  readonly required = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
}
