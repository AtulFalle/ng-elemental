import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElContainer, ElTab, ElTabContent, ElTabs } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { DocsExample } from '../ui/docs-example';
import { DocsPager } from '../ui/docs-pager';
import { DocsSnippet } from '../ui/docs-snippet';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-container-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElContainer,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './container-doc.html',
  styleUrl: './page.scss',
})
export class ContainerDocPage {
  protected readonly installTab = signal('cli');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add container`;

  protected readonly manualFilesCode = `ui/container/container.ts
ui/container/container.html
ui/container/container.scss`;

  protected readonly importSnippet = `import { ElContainer } from './ui/container/container';`;

  protected readonly usageSnippet = `<el-container size="lg">Page content</el-container>`;

  protected readonly defaultCode = `<el-container size="sm">
  Constrained to 40rem
</el-container>`;

  protected readonly fullCode = `<el-container size="full" [padded]="false">
  Bleed to the edges
</el-container>`;

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
