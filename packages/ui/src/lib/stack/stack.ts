import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type ElStackDirection = 'row' | 'column';
export type ElStackGap = '1' | '2' | '3' | '4' | '5' | '6' | '8';
export type ElStackAlign = 'start' | 'center' | 'end' | 'stretch';
export type ElStackJustify = 'start' | 'center' | 'end' | 'between';

@Component({
  selector: 'el-stack',
  templateUrl: './stack.html',
  styleUrl: './stack.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-stack',
    '[class.el-stack--row]': 'direction() === "row"',
    '[class.el-stack--column]': 'direction() === "column"',
    '[class.el-stack--align-start]': 'align() === "start"',
    '[class.el-stack--align-center]': 'align() === "center"',
    '[class.el-stack--align-end]': 'align() === "end"',
    '[class.el-stack--align-stretch]': 'align() === "stretch"',
    '[class.el-stack--justify-start]': 'justify() === "start"',
    '[class.el-stack--justify-center]': 'justify() === "center"',
    '[class.el-stack--justify-end]': 'justify() === "end"',
    '[class.el-stack--justify-between]': 'justify() === "between"',
    '[class.el-stack--wrap]': 'wrap()',
    '[style.gap]': 'gapCss()',
  },
})
export class ElStack {
  readonly direction = input<ElStackDirection>('column');
  readonly gap = input<ElStackGap>('4');
  readonly align = input<ElStackAlign>('stretch');
  readonly justify = input<ElStackJustify>('start');
  readonly wrap = input(false, { transform: booleanAttribute });

  protected readonly gapCss = computed(() => `var(--el-space-${this.gap()})`);
}
