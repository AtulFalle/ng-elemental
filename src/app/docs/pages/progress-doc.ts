import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElButton, ElProgress, ElProgressCircle } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-progress-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
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
  protected readonly heroPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly lineSizesPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly indeterminatePanel = signal<'preview' | 'code' | 'standards'>('preview');

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

  protected readonly heroCode = `<el-progress [value]="42" showValue />
<el-progress-circle [value]="72" showValue />
<el-progress-circle indeterminate />`;

  protected readonly lineSizesCode = `<el-progress size="sm" [value]="40" showValue />
<el-progress size="md" [value]="60" showValue />
<el-progress size="lg" [value]="80" showValue />`;

  protected readonly indeterminateCode = `<el-progress indeterminate />
<el-progress-circle indeterminate size="lg" />`;

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
