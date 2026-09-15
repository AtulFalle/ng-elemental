import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElAspectRatio, ElTab, ElTabContent, ElTabs } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { DocsExample } from '../ui/docs-example';
import { DocsPager } from '../ui/docs-pager';
import { DocsSnippet } from '../ui/docs-snippet';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-aspect-ratio-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElAspectRatio,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './aspect-ratio-doc.html',
  styleUrl: './page.scss',
})
export class AspectRatioDocPage {
  protected readonly installTab = signal('cli');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add aspect-ratio`;

  protected readonly manualFilesCode = `ui/aspect-ratio/aspect-ratio.ts
ui/aspect-ratio/aspect-ratio.html
ui/aspect-ratio/aspect-ratio.scss`;

  protected readonly importSnippet = `import { ElAspectRatio } from './ui/aspect-ratio/aspect-ratio';`;

  protected readonly usageSnippet = `<el-aspect-ratio ratio="16/9">
  <img src="/cover.jpg" alt="" style="width: 100%; height: 100%; object-fit: cover" />
</el-aspect-ratio>`;

  protected readonly wideCode = `<el-aspect-ratio ratio="16/9" style="max-width: 22rem">
  <img src="/cover.jpg" alt="Trail overlook" style="width: 100%; height: 100%; object-fit: cover" />
</el-aspect-ratio>`;

  protected readonly squareCode = `<el-aspect-ratio ratio="1/1" style="max-width: 10rem">
  <div style="height: 100%; display: flex; align-items: center; justify-content: center">
    1 / 1
  </div>
</el-aspect-ratio>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-radius-sm: 0.25rem;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'ratio',
      type: 'string',
      default: "'16/9'",
      description: 'CSS aspect-ratio value.',
    },
  ];
}
