import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElLabel, ElTab, ElTabContent, ElTabs } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { DocsExample } from '../ui/docs-example';
import { DocsPager } from '../ui/docs-pager';
import { DocsSnippet } from '../ui/docs-snippet';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-label-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElLabel,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './label-doc.html',
  styleUrl: './page.scss',
})
export class LabelDocPage {
  protected readonly installTab = signal('cli');

  protected readonly addCode = `npx @ng-elemental/cli add label`;

  protected readonly manualFilesCode = `ui/label/label.ts
ui/label/label.html
ui/label/label.scss`;

  protected readonly importSnippet = `import { ElLabel } from './ui/label/label';`;

  protected readonly usageSnippet = `<el-label htmlFor="email" variant="default">Email</el-label>
<input id="email" type="email" />`;

  protected readonly variantsCode = `<el-label variant="default">Default</el-label>
<el-label variant="muted">Muted</el-label>
<el-label variant="error">Error</el-label>`;

  protected readonly requiredCode = `<el-label htmlFor="email" [required]="true">Email</el-label>
<el-label [disabled]="true">Disabled label</el-label>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'variant',
      type: "'default' | 'muted' | 'error'",
      default: "'default'",
      description: 'Visual style of the label.',
    },
    {
      name: 'htmlFor',
      type: 'string',
      default: "''",
      description: 'Id of the associated form control.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Shows a required indicator when true.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Muted, non-interactive label state.',
    },
  ];
}
