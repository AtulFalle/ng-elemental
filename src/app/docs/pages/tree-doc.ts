import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElButton,
  ElIcon,
  ElTab,
  ElTabContent,
  ElTabs,
  ElTree,
  ElTreeItem,
  ElTreeNodeDef,
  type ElTreeNode,
  type ElTreeSize,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { DocsExample } from '../ui/docs-example';
import { DocsPager } from '../ui/docs-pager';
import { DocsSnippet } from '../ui/docs-snippet';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-tree-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElIcon,
    ElTree,
    ElTreeItem,
    ElTreeNodeDef,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './tree-doc.html',
  styleUrl: './page.scss',
})
export class TreeDocPage {
  protected readonly installTab = signal('cli');

  protected readonly sizes: ElTreeSize[] = ['lg', 'md', 'sm'];
  protected readonly expanded = signal(['docs']);
  protected readonly checked = signal<string[]>([]);
  protected readonly lazyExpanded = signal(['archive']);
  protected readonly lazyLoading = signal<string[]>([]);
  protected readonly lazyNodes = signal<ElTreeNode[]>([
    { id: 'projects', label: 'Projects', icon: 'folder', hasChildren: true },
    {
      id: 'archive',
      label: 'Archive',
      icon: 'folder',
      hasMore: true,
      children: [
        { id: 'old-1', label: '2024.zip', icon: 'file' },
        { id: 'old-2', label: '2023.zip', icon: 'file' },
      ],
    },
  ]);

  protected readonly fileNodes: ElTreeNode[] = Array.from(
    { length: 40 },
    (_, i) => ({
      id: `folder-${i + 1}`,
      label: `Folder ${i + 1}`,
      icon: 'folder',
      children: [
        {
          id: `file-${i + 1}-a`,
          label: `notes-${i + 1}.md`,
          icon: 'file',
        },
        {
          id: `file-${i + 1}-b`,
          label: `readme-${i + 1}.md`,
          icon: 'file',
        },
      ],
    }),
  );
  protected readonly virtualExpanded = signal(['folder-1']);
  protected readonly virtualChecked = signal<string[]>([]);

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add tree
# required — chevron, checkbox, and load-more actions:
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add checkbox
npx @ng-elemental/cli add button`;

  protected readonly manualIconCode = `npx @ng-elemental/cli add icon`;

  protected readonly manualFilesCode = `ui/tree/tree.ts
ui/tree/tree.html
ui/tree/tree.scss
ui/tree/tree-item.ts
ui/tree/tree-item.html
ui/tree/tree-item.scss
ui/tree/tree-node-def.ts
ui/tree/tree.token.ts
ui/tree/tree-utils.ts
ui/tree/tree-virtual.ts`;

  protected readonly importSnippet = `import { ElTree, ElTreeItem } from './ui/tree/tree'`;

  protected readonly usageSnippet = `<el-tree ariaLabel="Files">
  <el-tree-item value="docs" label="Documents">
    <el-tree-item value="resume" label="Resume.pdf" />
  </el-tree-item>
</el-tree>`;

  protected readonly heroCode = `<el-tree
  [(expanded)]="expanded"
  ariaLabel="Files"
  style="max-width: 22rem; width: 100%"
>
  <el-tree-item value="docs" label="Documents">
    <el-icon elTreeLeading name="folder" />
    <el-tree-item value="resume" label="Resume.pdf">
      <el-icon elTreeLeading name="file" />
    </el-tree-item>
    <el-tree-item value="cover" label="Cover letter.pdf">
      <el-icon elTreeLeading name="file" />
    </el-tree-item>
  </el-tree-item>
  <el-tree-item value="photos" label="Photos">
    <el-icon elTreeLeading name="folder" />
    <el-tree-item value="trip" label="Trip">
      <el-icon elTreeLeading name="folder" />
      <el-tree-item value="beach" label="Beach.jpg">
        <el-icon elTreeLeading name="image" />
      </el-tree-item>
    </el-tree-item>
  </el-tree-item>
</el-tree>`;

  protected readonly usageCode = `<el-tree [(expanded)]="open" [(checked)]="checked" checkbox ariaLabel="Files">
  <el-tree-item value="docs" label="Documents">
    <el-icon elTreeLeading name="folder" />
    <span elTreeActions>
      <el-button size="sm" variant="ghost" iconStart="ellipsis-vertical" />
    </span>
    <el-tree-item value="resume" label="Resume.pdf">
      <el-icon elTreeLeading name="file" />
    </el-tree-item>
  </el-tree-item>
</el-tree>`;

  protected readonly checkboxCode = `<el-tree checkbox [(expanded)]="open" [(checked)]="checked" ariaLabel="Files">
  <el-tree-item value="docs" label="Documents">
    <el-tree-item value="resume" label="Resume.pdf" />
  </el-tree-item>
</el-tree>`;

  protected readonly lazyCode = `<el-tree
  [nodes]="nodes"
  [loadingIds]="loading()"
  [(expanded)]="open"
  (loadChildren)="fetchChildren($event)"
  (loadMore)="fetchMore($event)"
  ariaLabel="Lazy folders"
>
  <ng-template elTreeNodeDef let-node>{{ node.label }}</ng-template>
</el-tree>`;

  protected readonly virtualCode = `<el-tree
  virtual
  checkbox
  [nodes]="nodes"
  [(expanded)]="open"
  [(checked)]="checked"
  ariaLabel="Files"
  style="max-height: 16rem"
>
  <ng-template elTreeNodeDef let-node>
    <el-icon [name]="node.icon ?? 'file'" size="sm" />
    {{ node.label }}
  </ng-template>
</el-tree>`;

  protected readonly infiniteCode = `<div
  elInfiniteScroll
  [disabled]="loading()"
  [complete]="done()"
  (loadMore)="loadPage()"
  style="max-height: 16rem; overflow: auto"
>
  <el-tree [nodes]="nodes" ariaLabel="Feed" />
</div>`;

  protected readonly scopedTokensCode = `.file-browser {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected onLoadChildren(node: ElTreeNode): void {
    this.lazyLoading.update((ids) => [...ids, node.id]);
    window.setTimeout(() => {
      this.lazyNodes.update((list) =>
        list.map((item) =>
          item.id === node.id
            ? {
                ...item,
                children: [
                  { id: `${node.id}-a`, label: 'README.md', icon: 'file' },
                  { id: `${node.id}-b`, label: 'package.json', icon: 'file' },
                ],
              }
            : item,
        ),
      );
      this.lazyLoading.update((ids) => ids.filter((id) => id !== node.id));
    }, 500);
  }

  protected onLoadMore(parent: ElTreeNode | null): void {
    if (!parent) {
      return;
    }
    this.lazyLoading.update((ids) => [...ids, parent.id]);
    window.setTimeout(() => {
      this.lazyNodes.update((list) =>
        list.map((item) =>
          item.id === parent.id
            ? {
                ...item,
                hasMore: false,
                children: [
                  ...(item.children ?? []),
                  { id: 'old-3', label: '2022.zip', icon: 'file' },
                ],
              }
            : item,
        ),
      );
      this.lazyLoading.update((ids) => ids.filter((id) => id !== parent.id));
    }, 400);
  }

  protected readonly treeProps: PropDefinition[] = [
    {
      name: 'appearance',
      type: "'outlined' | 'plain'",
      default: "'outlined'",
      description: 'Outlined bordered surface, or flush plain rows.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Density for row padding and type.',
    },
    {
      name: 'checkbox',
      type: 'boolean',
      default: 'false',
      description: 'Cascade checkboxes with a computed indeterminate parent.',
    },
    {
      name: 'expanded',
      type: 'string[]',
      default: '[]',
      description: 'Open node ids (model).',
    },
    {
      name: 'checked',
      type: 'string[]',
      default: '[]',
      description: 'Checked subtree roots (model). Descendants are implied.',
    },
    {
      name: 'nodes',
      type: 'ElTreeNode[]',
      default: '[]',
      description: 'Data mode. Required for virtual, lazy children, and hasMore.',
    },
    {
      name: 'virtual',
      type: 'boolean',
      default: 'false',
      description: 'Window flattened visible rows. Requires [nodes] and a max-height.',
    },
    {
      name: 'itemHeight',
      type: 'number',
      default: '36',
      description: 'Fixed row height in pixels for the virtual window.',
    },
    {
      name: 'overscan',
      type: 'number',
      default: '5',
      description: 'Extra rows rendered above and below the viewport.',
    },
    {
      name: 'loadingIds',
      type: 'string[]',
      default: '[]',
      description: 'Node ids currently loading children. Use "__root" for root load more.',
    },
    {
      name: 'hasMore',
      type: 'boolean',
      default: 'false',
      description: 'Show a root Load more control in data mode.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: '—',
      description: 'Accessible name for the tree.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Block expand, check, and activate.',
    },
  ];

  protected readonly treeOutputs: PropDefinition[] = [
    {
      name: 'activated',
      type: 'string',
      default: '—',
      description: 'Fires with the node id when a row is activated.',
    },
    {
      name: 'loadChildren',
      type: 'ElTreeNode',
      default: '—',
      description: 'Expanding a node with hasChildren and no children yet.',
    },
    {
      name: 'loadMore',
      type: 'ElTreeNode | null',
      default: '—',
      description: 'Load more children. null means the tree root.',
    },
  ];

  protected readonly itemProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      default: 'required',
      description: 'Node id used for expand, check, and keyboard focus.',
    },
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Default label when not projecting text.',
    },
    {
      name: 'icon',
      type: 'string',
      default: "''",
      description: 'Optional Font Awesome name when no leading slot is projected.',
    },
    {
      name: 'hasChildren',
      type: 'boolean',
      default: 'false',
      description: 'Show an expand chevron even before nested items exist.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Dim the row and block expand, check, and activate.',
    },
  ];

  protected readonly slots: PropDefinition[] = [
    {
      name: 'elTreeLeading',
      type: 'attribute',
      default: '—',
      description: 'Leading icon or thumbnail.',
    },
    {
      name: 'elTreeActions',
      type: 'attribute',
      default: '—',
      description: 'Trailing row actions. Clicks do not activate the row.',
    },
    {
      name: 'elTreeNodeDef',
      type: 'ng-template',
      default: '—',
      description: 'Custom node body in data/virtual mode (`let-node`, `level`).',
    },
  ];
}
