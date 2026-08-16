import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'el-aspect-ratio',
  templateUrl: './aspect-ratio.html',
  styleUrl: './aspect-ratio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-aspect-ratio',
    '[style.aspect-ratio]': 'ratio()',
  },
})
export class ElAspectRatio {
  readonly ratio = input('16/9');
}
