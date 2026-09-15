import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElButton,
  ElInput,
  ElSkeleton,
  ElSkeletonDirective,
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
  selector: 'app-skeleton-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElSkeleton,
    ElSkeletonDirective,
    ElInput,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './skeleton-doc.html',
  styleUrl: './page.scss',
})
export class SkeletonDocPage {
  protected readonly installTab = signal('cli');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add skeleton`;

  protected readonly manualFilesCode = `ui/skeleton/skeleton.ts
ui/skeleton/skeleton.html
ui/skeleton/skeleton.scss
ui/skeleton/skeleton-cover.ts
ui/skeleton/skeleton-cover.scss
ui/skeleton/skeleton-target.ts`;

  protected readonly importSnippet = `import { ElSkeleton, ElSkeletonDirective } from './ui/skeleton/skeleton';`;

  protected readonly usageSnippet = `<div aria-busy="true" aria-live="polite">
  <el-skeleton [lines]="3" />
</div>
<button [elSkeleton]="loading">Save</button>`;

  protected readonly textCode = `<div aria-busy="true" aria-live="polite" style="width: 16rem">
  <el-skeleton [lines]="4" />
</div>`;

  protected readonly shapesCode = `<div class="docs-row" style="align-items: flex-start">
  <el-skeleton variant="circular" />
  <el-skeleton variant="rectangular" height="6rem" style="flex: 1" />
</div>`;

  protected readonly hostCode = `<div aria-busy="true" class="docs-stack" style="max-width: 16rem">
  <el-button elSkeleton>Save changes</el-button>
  <el-input elSkeleton placeholder="Email" />
</div>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-surface-container-highest: #e5e7eb;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'variant',
      type: "'text' | 'circular' | 'rectangular'",
      default: "'text'",
      description: 'Placeholder shape (el-skeleton).',
    },
    {
      name: 'animation',
      type: 'boolean',
      default: 'true',
      description: 'Shimmer animation on el-skeleton. Honors prefers-reduced-motion.',
    },
    {
      name: 'lines',
      type: 'number',
      default: '1',
      description: 'Number of bars for the text variant.',
    },
    {
      name: 'width',
      type: 'string',
      default: '—',
      description: 'CSS width such as 100% or 2.5rem.',
    },
    {
      name: 'height',
      type: 'string',
      default: '—',
      description: 'CSS height for circular and rectangular variants.',
    },
    {
      name: 'elSkeleton',
      type: 'boolean',
      default: 'false',
      description:
        'On any host: covers that element with a matching skeleton while true.',
    },
    {
      name: 'elSkeletonAnimation',
      type: 'boolean',
      default: 'true',
      description: 'Shimmer on the host cover. Honors prefers-reduced-motion.',
    },
  ];
}
