import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElScrollArea } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-scroll-area-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElScrollArea, CodeBlock, Preview, PropsTable],
  templateUrl: './scroll-area-doc.html',
  styleUrl: './page.scss',
})
export class ScrollAreaDocPage {
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

  protected readonly usageCode = `<el-scroll-area orientation="horizontal" ariaLabel="Timeline">
  Wide content…
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
