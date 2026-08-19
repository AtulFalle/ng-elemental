import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElButton,
  ElSegmentedButton,
  ElSegmentedButtonItem,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-segmented-button-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElSegmentedButton,
    ElSegmentedButtonItem,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './segmented-button-doc.html',
  styleUrl: './page.scss',
})
export class SegmentedButtonDocPage {
  protected readonly heroPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly variantsPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly disabledPanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly view = signal('list');
  protected readonly primaryDemo = signal('list');
  protected readonly disabledDemo = signal('list');

  protected readonly addCode = `npx @ng-elemental/cli add segmented-button`;

  protected readonly importCode = `import {
  ElSegmentedButton,
  ElSegmentedButtonItem,
} from './ui/segmented-button/segmented-button';

@Component({
  imports: [ElSegmentedButton, ElSegmentedButtonItem],
  template: \`
    <el-segmented-button [(value)]="view" ariaLabel="View mode">
      <el-segmented-button-item value="list">List</el-segmented-button-item>
      <el-segmented-button-item value="grid">Grid</el-segmented-button-item>
    </el-segmented-button>
  \`,
})
export class MyComponent {}`;

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
