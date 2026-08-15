import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElProgress, ElProgressCircle } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-progress-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElProgress,
    ElProgressCircle,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './progress-doc.html',
  styleUrl: './page.scss',
})
export class ProgressDocPage {
  protected readonly lineValue = signal(42);
  protected readonly circleValue = signal(72);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add progress`;

  protected readonly importCode = `import { ElProgress } from './ui/progress/progress';
import { ElProgressCircle } from './ui/progress/progress-circle';

@Component({
  imports: [ElProgress, ElProgressCircle],
  template: \`
    <el-progress [value]="42" showValue />
    <el-progress-circle [value]="72" showValue />
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-progress [value]="42" [max]="100" showValue />
<el-progress indeterminate />

<el-progress-circle [value]="72" showValue size="lg" />
<el-progress-circle indeterminate />`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'value',
      type: 'number',
      default: '0',
      description: 'Current progress amount (clamped to 0…max).',
    },
    {
      name: 'max',
      type: 'number',
      default: '100',
      description: 'Upper bound. Non-positive values fall back to 100.',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      default: 'false',
      description: 'Animated unknown progress; hides the percent label.',
    },
    {
      name: 'showValue',
      type: 'boolean',
      default: 'false',
      description: 'Show rounded percent when determinate.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Track thickness (line) or diameter (circle).',
    },
  ];
}
