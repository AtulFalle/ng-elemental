import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { EL_RESIZABLE } from './resizable.token';

@Component({
  selector: 'el-resizable-panel',
  templateUrl: './resizable-panel.html',
  styleUrl: './resizable-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-resizable-panel',
    '[style.flex]': 'flexCss()',
  },
})
export class ElResizablePanel {
  private readonly group = inject(EL_RESIZABLE);

  readonly defaultSize = input<number | undefined>(undefined);
  readonly min = input(10, { transform: numberAttribute });
  readonly max = input(100, { transform: numberAttribute });

  protected readonly flexCss = computed(
    () => `${this.group.sizeFor(this)} 1 0%`,
  );
}
