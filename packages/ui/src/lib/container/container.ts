import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

export type ElContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'el-container',
  templateUrl: './container.html',
  styleUrl: './container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-container',
    '[class.el-container--sm]': 'size() === "sm"',
    '[class.el-container--md]': 'size() === "md"',
    '[class.el-container--lg]': 'size() === "lg"',
    '[class.el-container--xl]': 'size() === "xl"',
    '[class.el-container--full]': 'size() === "full"',
    '[class.el-container--padded]': 'padded()',
  },
})
export class ElContainer {
  readonly size = input<ElContainerSize>('lg');
  readonly padded = input(true, { transform: booleanAttribute });
}
