import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ElBreadcrumb, ElBreadcrumbItem, ElButton } from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-breadcrumb-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElBreadcrumb,
    ElBreadcrumbItem,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './breadcrumb-doc.html',
  styleUrl: './page.scss',
})
export class BreadcrumbDocPage {
  protected readonly defaultPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly currentPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly customPanel = signal<'preview' | 'code' | 'standards'>('preview');
  protected readonly longPanel = signal<'preview' | 'code' | 'standards'>('preview');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add breadcrumb`;

  protected readonly importCode = `import { ElBreadcrumb, ElBreadcrumbItem } from './ui/breadcrumb/breadcrumb';

@Component({
  imports: [ElBreadcrumb, ElBreadcrumbItem],
  template: \`
    <el-breadcrumb ariaLabel="Breadcrumb">
      <el-breadcrumb-item href="/">Home</el-breadcrumb-item>
      <el-breadcrumb-item current>Chip</el-breadcrumb-item>
    </el-breadcrumb>
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-breadcrumb ariaLabel="Breadcrumb">
  <el-breadcrumb-item href="/">Home</el-breadcrumb-item>
  <el-breadcrumb-item href="/docs">Components</el-breadcrumb-item>
  <el-breadcrumb-item current>Chip</el-breadcrumb-item>
</el-breadcrumb>`;

  protected readonly currentPageCode = `<el-breadcrumb>
  <el-breadcrumb-item href="/">Home</el-breadcrumb-item>
  <el-breadcrumb-item current>Overview</el-breadcrumb-item>
</el-breadcrumb>`;

  protected readonly customLinkCode = `<el-breadcrumb-item>
  <a routerLink="/docs">Docs</a>
</el-breadcrumb-item>
<el-breadcrumb-item current>Breadcrumb</el-breadcrumb-item>`;

  protected readonly longLabelCode = `<div style="max-width: 22rem;">
  <el-breadcrumb>
    <el-breadcrumb-item href="/">Home</el-breadcrumb-item>
    <el-breadcrumb-item current>
      Quarterly planning notes for the North American regional strategy review
    </el-breadcrumb-item>
  </el-breadcrumb>
</div>`;

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-on-surface: #111827;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Breadcrumb'",
      description: 'Accessible name for the navigation landmark (el-breadcrumb).',
    },
    {
      name: 'href',
      type: 'string',
      default: '—',
      description: 'Link target for el-breadcrumb-item. Ignored when current.',
    },
    {
      name: 'current',
      type: 'boolean',
      default: 'false',
      description: 'Marks the current page with aria-current="page" and skips the link.',
    },
  ];
}
