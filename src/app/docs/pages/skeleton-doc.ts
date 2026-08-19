import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElButton,
  ElInput,
  ElSkeleton,
  ElSkeletonDirective,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
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
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './skeleton-doc.html',
  styleUrl: './page.scss',
})
export class SkeletonDocPage {
  protected readonly textPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly shapesPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly hostPanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add skeleton`;

  protected readonly importCode = `import { ElSkeleton, ElSkeletonDirective } from './ui/skeleton/skeleton';

@Component({
  imports: [ElSkeleton, ElSkeletonDirective],
  template: \`
    <div aria-busy="true" aria-live="polite">
      <el-skeleton [lines]="3" />
    </div>
    <button [elSkeleton]="loading">Save</button>
  \`,
})
export class MyComponent {}`;

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
