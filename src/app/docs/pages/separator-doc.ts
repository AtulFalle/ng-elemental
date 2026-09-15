import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElSeparator, ElTab, ElTabContent, ElTabs } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { DocsExample } from '../ui/docs-example';
import { DocsPager } from '../ui/docs-pager';
import { DocsSnippet } from '../ui/docs-snippet';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-separator-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElSeparator,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './separator-doc.html',
  styleUrl: './page.scss',
})
export class SeparatorDocPage {
  protected readonly installTab = signal('cli');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add separator`;

  protected readonly manualFilesCode = `ui/separator/separator.ts
ui/separator/separator.scss`;

  protected readonly importSnippet = `import { ElSeparator } from './ui/separator/separator';`;

  protected readonly usageSnippet = `<el-separator />`;

  protected readonly horizontalCode = `<div>Above</div>
<el-separator style="margin-block: var(--el-space-3)" />
<div>Below</div>`;

  protected readonly verticalCode = `<div style="display: flex; align-items: stretch; gap: var(--el-space-3); height: 2rem">
  <span>Left</span>
  <el-separator orientation="vertical" />
  <span>Right</span>
</div>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-outline-variant: #d6d3d1;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Axis of the rule.',
    },
    {
      name: 'decorative',
      type: 'boolean',
      default: 'true',
      description:
        'When true, aria-hidden. When false, role="separator" and aria-orientation.',
    },
  ];
}
