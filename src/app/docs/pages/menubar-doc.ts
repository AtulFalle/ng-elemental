import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElButton,
  ElMenu,
  ElMenuItem,
  ElMenuPanel,
  ElMenuSeparator,
  ElMenuTrigger,
  ElMenubar,
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
  selector: 'app-menubar-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElMenu,
    ElMenuItem,
    ElMenuPanel,
    ElMenuSeparator,
    ElMenuTrigger,
    ElMenubar,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './menubar-doc.html',
  styleUrl: './page.scss',
})
export class MenubarDocPage {
  protected readonly installTab = signal('cli');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add button
npx @ng-elemental/cli add menu
npx @ng-elemental/cli add menubar`;

  protected readonly manualIconCode = `npx @ng-elemental/cli add icon`;

  protected readonly manualFilesCode = `ui/menubar/menubar.ts
ui/menubar/menubar.html
ui/menubar/menubar.scss`;

  protected readonly importSnippet = `import { ElMenubar } from './ui/menubar/menubar';
import {
  ElMenu,
  ElMenuPanel,
  ElMenuItem,
  ElMenuTrigger,
} from './ui/menu/menu';
import { ElButton } from './ui/button/button';`;

  protected readonly usageSnippet = `<el-menubar ariaLabel="Application">
  <el-menu>
    <el-button elMenuTrigger variant="ghost" size="sm">File</el-button>
    <el-menu-panel>
      <el-menu-item>New</el-menu-item>
    </el-menu-panel>
  </el-menu>
  <el-menu>
    <el-button elMenuTrigger variant="ghost" size="sm">Edit</el-button>
    <el-menu-panel>
      <el-menu-item>Undo</el-menu-item>
    </el-menu-panel>
  </el-menu>
</el-menubar>`;

  protected readonly sizesCode = `<el-menubar size="sm" ariaLabel="Compact">
  <!-- el-menu children -->
</el-menubar>
<el-menubar size="lg" ariaLabel="Comfortable">
  <!-- el-menu children -->
</el-menubar>`;

  protected readonly scopedTokensCode = `.app-shell {
  --el-color-outline-variant: #d1d5db;
}`;

  protected readonly props: PropDefinition[] = [
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Bar density.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: '—',
      description: 'Accessible name for the menubar.',
    },
  ];
}
