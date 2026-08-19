import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElButton, ElScrollArea } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-scroll-area-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElButton, ElScrollArea, CodeBlock, Preview, PropsTable],
  templateUrl: './scroll-area-doc.html',
  styleUrl: './page.scss',
})
export class ScrollAreaDocPage {
  protected readonly verticalPanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add scroll-area`;

  protected readonly importCode = `import { ElScrollArea } from './ui/scroll-area/scroll-area';

@Component({
  imports: [ElScrollArea],
  template: \`
    <el-scroll-area ariaLabel="Notes" style="height: 12rem">
      Long content…
    </el-scroll-area>
  \`,
})
export class MyComponent {}`;

  protected readonly verticalCode = `<el-scroll-area
  ariaLabel="Example notes"
  style="height: 10rem; border: var(--el-border-width) solid var(--el-color-outline-variant); border-radius: var(--el-radius-sm); padding: var(--el-space-3)"
>
  <p>Line 1</p>
  <p>Line 2</p>
  <!-- more lines -->
</el-scroll-area>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-outline-variant: #d6d3d1;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'orientation',
      type: "'vertical' | 'horizontal' | 'both'",
      default: "'vertical'",
      description: 'Overflow axis. Native scrolling only.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: '—',
      description: 'Accessible name for the region.',
    },
  ];
}
