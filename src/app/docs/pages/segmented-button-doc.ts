import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElSegmentedButton,
  ElSegmentedButtonItem,
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
  selector: 'app-segmented-button-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElSegmentedButton,
    ElSegmentedButtonItem,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './segmented-button-doc.html',
  styleUrl: './page.scss',
})
export class SegmentedButtonDocPage {
  protected readonly installTab = signal('cli');
  protected readonly view = signal('list');
  protected readonly primaryDemo = signal('list');
  protected readonly disabledDemo = signal('list');

  protected readonly addCode = `npx @ng-elemental/cli add segmented-button`;

  protected readonly manualFilesCode = `ui/segmented-button/segmented-button.ts
ui/segmented-button/segmented-button.html
ui/segmented-button/segmented-button.scss
ui/segmented-button/segmented-button-item.ts
ui/segmented-button/segmented-button-item.html
ui/segmented-button/segmented-button-item.scss
ui/segmented-button/segmented-button.token.ts`;

  protected readonly importSnippet = `import {
  ElSegmentedButton,
  ElSegmentedButtonItem,
} from './ui/segmented-button/segmented-button';`;

  protected readonly usageSnippet = `<el-segmented-button [(value)]="view" ariaLabel="View mode">
  <el-segmented-button-item value="list">List</el-segmented-button-item>
  <el-segmented-button-item value="grid">Grid</el-segmented-button-item>
</el-segmented-button>`;

  protected readonly heroCode = `<el-segmented-button [(value)]="view" ariaLabel="View mode">
  <el-segmented-button-item value="list">List</el-segmented-button-item>
  <el-segmented-button-item value="grid">Grid</el-segmented-button-item>
  <el-segmented-button-item value="board">Board</el-segmented-button-item>
</el-segmented-button>`;

  protected readonly variantsCode = `<el-segmented-button variant="primary" [(value)]="view" ariaLabel="Primary">
  <el-segmented-button-item value="list">List</el-segmented-button-item>
  <el-segmented-button-item value="grid">Grid</el-segmented-button-item>
</el-segmented-button>`;

  protected readonly disabledCode = `<el-segmented-button value="list" [disabled]="true" ariaLabel="Disabled group">
  <el-segmented-button-item value="list">List</el-segmented-button-item>
  <el-segmented-button-item value="grid">Grid</el-segmented-button-item>
</el-segmented-button>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly groupProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      default: "''",
      description: 'Currently selected segment value. Supports two-way binding.',
    },
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'ghost'",
      default: "'secondary'",
      description: 'Visual style matching el-button variants.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size of the segmented control.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the entire control.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'undefined',
      description: 'Accessible label for the radiogroup when no visible label exists.',
    },
  ];

  protected readonly itemProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      default: '(required)',
      description: 'Unique value for this segment.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables this segment only.',
    },
  ];
}
