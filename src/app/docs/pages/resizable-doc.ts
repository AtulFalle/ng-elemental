import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElButton,
  ElResizable,
  ElResizableHandle,
  ElResizablePanel,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-resizable-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElResizable,
    ElResizablePanel,
    ElResizableHandle,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './resizable-doc.html',
  styleUrl: './page.scss',
})
export class ResizableDocPage {
  protected readonly heroPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly verticalPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly minMaxPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly customHandlePanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add resizable`;

  protected readonly importCode = `import {
  ElResizable,
  ElResizableHandle,
  ElResizablePanel,
} from './ui/resizable/resizable';

@Component({
  imports: [ElResizable, ElResizablePanel, ElResizableHandle],
  template: \`
    <el-resizable>
      <el-resizable-panel [defaultSize]="30" [min]="15">A</el-resizable-panel>
      <el-resizable-handle />
      <el-resizable-panel [min]="20">B</el-resizable-panel>
    </el-resizable>
  \`,
})
export class MyComponent {}`;

  protected readonly defaultCode = `<el-resizable>
  <el-resizable-panel [defaultSize]="32" [min]="15">Sidebar</el-resizable-panel>
  <el-resizable-handle />
  <el-resizable-panel [min]="20">Main</el-resizable-panel>
</el-resizable>`;

  protected readonly verticalCode = `<el-resizable orientation="vertical">
  <el-resizable-panel [min]="20">Top</el-resizable-panel>
  <el-resizable-handle />
  <el-resizable-panel>Bottom</el-resizable-panel>
</el-resizable>`;

  protected readonly minMaxCode = `<el-resizable-panel [defaultSize]="40" [min]="25" [max]="60">A</el-resizable-panel>`;

  protected readonly usageCode = `<el-resizable orientation="vertical">
  <el-resizable-panel [min]="20">Top</el-resizable-panel>
  <el-resizable-handle />
  <el-resizable-panel>Bottom</el-resizable-panel>
</el-resizable>`;

  protected readonly handleSlotCode = `<el-resizable-handle ariaLabel="Resize sidebar">
  <span style="display: inline-block; width: 0.25rem; height: 1.5rem; border-radius: var(--el-radius-full); background: var(--el-color-outline)"></span>
</el-resizable-handle>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-outline-variant: #d6d3d1;
}`;

  protected readonly groupProps: PropDefinition[] = [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Split axis.',
    },
  ];

  protected readonly panelProps: PropDefinition[] = [
    {
      name: 'defaultSize',
      type: 'number',
      default: 'equal share',
      description: 'Initial percent. Omitted panels split the remainder.',
    },
    {
      name: 'min',
      type: 'number',
      default: '10',
      description: 'Minimum percent.',
    },
    {
      name: 'max',
      type: 'number',
      default: '100',
      description: 'Maximum percent.',
    },
  ];

  protected readonly handleProps: PropDefinition[] = [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Blocks pointer and keyboard.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Resize'",
      description: 'Accessible name for the separator.',
    },
  ];
}
