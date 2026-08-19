import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElButton, ElGrid } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-grid-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton, ElGrid, CodeBlock, Preview, PropsTable],
  templateUrl: './grid-doc.html',
  styleUrl: './page.scss',
})
export class GridDocPage {
  protected readonly columnsPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly autoFitPanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly columnItems = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
  protected readonly autoFitItems = ['A', 'B', 'C', 'D'];

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add grid`;

  protected readonly importCode = `import { ElGrid } from './ui/grid/grid';

@Component({
  imports: [ElGrid],
  template: \`
    <el-grid [columns]="3" gap="4">
      <div>One</div>
      <div>Two</div>
      <div>Three</div>
    </el-grid>
  \`,
})
export class MyComponent {}`;

  protected readonly columnsCode = `<el-grid [columns]="3" gap="3">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
</el-grid>`;

  protected readonly autoFitCode = `<el-grid minItemWidth="8rem" gap="3">
  <div>Responsive tile</div>
</el-grid>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-space-4: 1.25rem;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'columns',
      type: 'number',
      default: '1',
      description: 'Column count when minItemWidth is unset.',
    },
    {
      name: 'gap',
      type: "'1' | '2' | '3' | '4' | '5' | '6' | '8'",
      default: "'4'",
      description: 'Maps to --el-space-* density tokens.',
    },
    {
      name: 'minItemWidth',
      type: 'string',
      default: '—',
      description:
        'When set, uses auto-fit minmax and ignores columns (responsive).',
    },
  ];
}
