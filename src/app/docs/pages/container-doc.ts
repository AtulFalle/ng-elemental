import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElContainer } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-container-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElContainer, CodeBlock, Preview, PropsTable],
  templateUrl: './container-doc.html',
  styleUrl: './page.scss',
})
export class ContainerDocPage {
  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add container`;

  protected readonly importCode = `import { ElContainer } from './ui/container/container';

@Component({
  imports: [ElContainer],
  template: \`<el-container size="lg">Page content</el-container>\`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-container size="md">Narrower column</el-container>
<el-container size="full" [padded]="false">Bleed to the edges</el-container>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-space-4: 1.25rem;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
      default: "'lg'",
      description: 'Max width: 40rem, 48rem, 64rem, 80rem, or none.',
    },
    {
      name: 'padded',
      type: 'boolean',
      default: 'true',
      description: 'Horizontal padding using --el-space-4.',
    },
  ];
}
