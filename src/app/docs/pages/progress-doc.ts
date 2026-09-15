import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElProgress,
  ElProgressCircle,
  ElTab,
  ElTabContent,
  ElTabs,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { DocsExample } from '../ui/docs-example';
import { DocsPager } from '../ui/docs-pager';
import { DocsSnippet } from '../ui/docs-snippet';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-progress-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElProgress,
    ElProgressCircle,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './progress-doc.html',
  styleUrl: './page.scss',
})
export class ProgressDocPage {
  protected readonly installTab = signal('cli');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add progress`;

  protected readonly manualFilesCode = `ui/progress/progress.ts
ui/progress/progress.html
ui/progress/progress.scss
ui/progress/progress-circle.ts
ui/progress/progress-circle.html
ui/progress/progress-circle.scss
ui/progress/progress-utils.ts`;

  protected readonly importSnippet = `import { ElProgress } from './ui/progress/progress';
import { ElProgressCircle } from './ui/progress/progress-circle';`;

  protected readonly usageSnippet = `<el-progress [value]="42" showValue />
<el-progress-circle [value]="72" showValue />`;

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
