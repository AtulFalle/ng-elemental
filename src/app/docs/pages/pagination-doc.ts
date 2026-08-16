import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElPagination } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-pagination-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ElPagination, CodeBlock, Preview, PropsTable],
  templateUrl: './pagination-doc.html',
  styleUrl: './page.scss',
})
export class PaginationDocPage {
  protected readonly page = signal(1);
  protected readonly pageSize = signal(10);
  protected readonly manyPage = signal(12);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button
npx @ng-elemental/cli add select
npx @ng-elemental/cli add pagination`;

  protected readonly importCode = `import { ElPagination } from './ui/pagination/pagination';

@Component({
  imports: [ElPagination],
  template: \`
    <el-pagination [(page)]="page" [total]="100" [pageSize]="10" />
  \`,
})
export class MyComponent {
  protected page = 1;
}`;

  protected readonly usageCode = `<el-pagination
  [(page)]="page"
  [(pageSize)]="pageSize"
  [total]="1000"
  [pageSizeOptions]="[10, 20, 50]"
  showPageSize
/>`;

  protected readonly scopedTokensCode = `.settings-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'page',
      type: 'number',
      default: '1',
      description: 'Current 1-based page. Two-way bindable.',
    },
    {
      name: 'pageSize',
      type: 'number',
      default: '20',
      description: 'Rows per page. Two-way bindable.',
    },
    {
      name: 'total',
      type: 'number',
      default: '0',
      description: 'Total item count. Used to compute page count.',
    },
    {
      name: 'pageSizeOptions',
      type: 'number[]',
      default: '[10, 20, 50]',
      description: 'Options for the page-size select when showPageSize is set.',
    },
    {
      name: 'siblingCount',
      type: 'number',
      default: '1',
      description: 'Pages shown on each side of the current page.',
    },
    {
      name: 'showFirstLast',
      type: 'boolean',
      default: 'true',
      description: 'First and last page buttons.',
    },
    {
      name: 'showPageSize',
      type: 'boolean',
      default: 'false',
      description: 'Rows-per-page select (requires select).',
    },
    {
      name: 'size',
      type: `'sm' | 'md' | 'lg'`,
      default: `'md'`,
      description: 'Control size, matching Button.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables every control.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: `'Pagination'`,
      description: 'Accessible name for the navigation landmark.',
    },
  ];
}
