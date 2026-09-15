import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElBadge,
  ElButton,
  ElIcon,
  ElMenu,
  ElMenuItem,
  ElMenuPanel,
  ElMenuSeparator,
  ElMenuTrigger,
  ElSegmentedButton,
  ElSegmentedButtonItem,
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

interface ExplorerEntry {
  label: string;
  kind: string;
  size: string;
  modified: string;
  icon: string;
}

interface ActionFile {
  id: string;
  label: string;
  icon: string;
}

interface ActionFolder {
  id: string;
  label: string;
  children: ActionFile[];
}

const LIBRARY_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

@Component({
  selector: 'app-tree-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    RouterLink,
    ElBadge,
    ElButton,
    ElIcon,
    ElMenu,
    ElMenuItem,
    ElMenuPanel,
    ElMenuSeparator,
    ElMenuTrigger,
    ElSegmentedButton,
    ElSegmentedButtonItem,
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
  protected readonly explorerExpanded = signal(['src', 'app']);
  protected readonly selectedId = signal('src');
  protected readonly actionsExpanded = signal(['src']);
  protected readonly lastAction = signal(
    'Hover a row and open its menu to rename, download, or delete.',
  );
  protected readonly slotsExpanded = signal(['prod']);
  protected readonly shareExpanded = signal(['docs']);
  protected readonly shareChecked = signal<string[]>([]);
  protected readonly driveExpanded = signal(['archive']);
  protected readonly driveLoading = signal<string[]>([]);
  protected readonly libraryExpanded = signal(['album-0']);
  protected readonly density = signal<ElTreeSize>('md');
  protected readonly densityExpanded = signal(['src']);

  protected readonly explorerEntries: Record<string, ExplorerEntry> = {
    src: {
      label: 'src',
      kind: 'Folder',
      size: '2 items',
      modified: 'Today, 4:18 PM',
      icon: 'folder',
    },
    app: {
      label: 'app',
      kind: 'Folder',
      size: '3 items',
      modified: 'Today, 4:18 PM',
      icon: 'folder',
    },
    'app-ts': {
      label: 'app.ts',
      kind: 'TypeScript',
      size: '4.2 KB',
      modified: 'Today, 4:18 PM',
      icon: 'file-code',
    },
    'app-html': {
      label: 'app.html',
      kind: 'HTML',
      size: '1.1 KB',
      modified: 'Today, 3:02 PM',
      icon: 'file-code',
    },
    'app-scss': {
      label: 'app.scss',
      kind: 'SCSS',
      size: '2.8 KB',
      modified: 'Yesterday',
      icon: 'file-lines',
    },
    assets: {
      label: 'assets',
      kind: 'Folder',
      size: '1 item',
      modified: 'Mon',
      icon: 'folder',
    },
    logo: {
      label: 'logo.svg',
      kind: 'SVG image',
      size: '6.4 KB',
      modified: 'Mon',
      icon: 'image',
    },
    pkg: {
      label: 'package.json',
      kind: 'JSON',
      size: '1.9 KB',
      modified: 'Today, 9:14 AM',
      icon: 'file-lines',
    },
    readme: {
      label: 'README.md',
      kind: 'Markdown',
      size: '3.5 KB',
      modified: 'Today, 9:14 AM',
      icon: 'file-lines',
    },
  };

  protected readonly selectedEntry = computed(
    () => this.explorerEntries[this.selectedId()] ?? null,
  );

  protected readonly actionFolders: ActionFolder[] = [
    {
      id: 'src',
      label: 'src',
      children: [
        { id: 'app-ts', label: 'app.ts', icon: 'file-code' },
        { id: 'app-html', label: 'app.html', icon: 'file-code' },
        { id: 'styles', label: 'styles.scss', icon: 'file-lines' },
      ],
    },
    {
      id: 'public',
      label: 'public',
      children: [{ id: 'logo', label: 'logo.svg', icon: 'image' }],
    },
  ];

  protected readonly shareNames: Record<string, string> = {
    docs: 'Documents',
    q3: 'Q3-report.pdf',
    contract: 'Contract.pdf',
    photos: 'Photos',
    headshot: 'headshot.jpg',
    readme: 'README.md',
  };

  protected readonly shareLabel = computed(() => {
    const ids = this.shareChecked();
    if (ids.length === 0) {
      return 'Select files to share';
    }
    if (ids.length === 1) {
      return `${this.shareNames[ids[0]] ?? ids[0]} selected`;
    }
    return `${ids.length} items selected`;
  });

  protected readonly driveNodes = signal<ElTreeNode[]>([
    { id: 'eng', label: 'Engineering', icon: 'folder', hasChildren: true },
    { id: 'design', label: 'Design', icon: 'folder', hasChildren: true },
    {
      id: 'archive',
      label: 'Archive',
      icon: 'folder',
      hasMore: true,
      children: [
        { id: 'q4', label: 'Q4-2025.zip', icon: 'file-zipper' },
        { id: 'q3-zip', label: 'Q3-2025.zip', icon: 'file-zipper' },
      ],
    },
  ]);

  protected readonly libraryNodes: ElTreeNode[] = Array.from(
    { length: 18 },
    (_, i) => {
      const year = i < 12 ? 2025 : 2026;
      const month = LIBRARY_MONTHS[i % 12];
      return {
        id: `album-${i}`,
        label: `${month} ${year}`,
        icon: 'folder',
        children: Array.from({ length: 8 }, (__, j) => ({
          id: `img-${i}-${j}`,
          label: `IMG_${String(i * 8 + j + 1).padStart(4, '0')}.jpg`,
          icon: 'image',
        })),
      };
    },
  );

  protected folderIcon(id: string, expanded: readonly string[]): string {
    return expanded.includes(id) ? 'folder-open' : 'folder';
  }

  protected selectExplorer(id: string): void {
    this.selectedId.set(id);
  }

  protected runAction(action: string, name: string): void {
    this.lastAction.set(`${action} ${name}`);
  }

  protected onDensity(value: string): void {
    if (value === 'sm' || value === 'md' || value === 'lg') {
      this.density.set(value);
    }
  }

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add tree
# required — chevron, checkbox, and load-more actions:
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add checkbox
npx @ng-elemental/cli add button
# optional — counts and status pills in elTreeMeta:
npx @ng-elemental/cli add badge`;

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

  protected readonly usageSnippet = `<el-tree [(expanded)]="open" ariaLabel="Project files">
  <el-tree-item value="src" label="src">
    <el-icon elTreeLeading name="folder" />
    <el-tree-item value="app-ts" label="app.ts">
      <el-icon elTreeLeading name="file-code" />
    </el-tree-item>
  </el-tree-item>
</el-tree>`;

  protected readonly heroCode = `<div class="docs-tree-explorer">
  <div class="docs-tree-explorer__sidebar">
    <p class="docs-tree-explorer__caption">ng-elemental</p>
    <el-tree
      [(expanded)]="explorerExpanded"
      (activated)="selectExplorer($event)"
      ariaLabel="Project files"
    >
      <el-tree-item value="src" label="src">
        <el-icon elTreeLeading [name]="folderIcon('src', explorerExpanded())" />
        <el-tree-item value="app" label="app">
          <el-icon elTreeLeading [name]="folderIcon('app', explorerExpanded())" />
          <el-tree-item value="app-ts" label="app.ts">
            <el-icon elTreeLeading name="file-code" />
          </el-tree-item>
          <el-tree-item value="app-html" label="app.html">
            <el-icon elTreeLeading name="file-code" />
          </el-tree-item>
          <el-tree-item value="app-scss" label="app.scss">
            <el-icon elTreeLeading name="file-lines" />
          </el-tree-item>
        </el-tree-item>
        <el-tree-item value="assets" label="assets">
          <el-icon elTreeLeading [name]="folderIcon('assets', explorerExpanded())" />
          <el-tree-item value="logo" label="logo.svg">
            <el-icon elTreeLeading name="image" />
          </el-tree-item>
        </el-tree-item>
      </el-tree-item>
      <el-tree-item value="pkg" label="package.json">
        <el-icon elTreeLeading name="file-lines" />
      </el-tree-item>
      <el-tree-item value="readme" label="README.md">
        <el-icon elTreeLeading name="file-lines" />
      </el-tree-item>
    </el-tree>
  </div>
  <div class="docs-tree-explorer__pane">
    @if (selectedEntry(); as file) {
      <el-icon
        class="docs-tree-explorer__icon"
        [name]="file.icon"
        size="lg"
      />
      <p class="docs-tree-explorer__name">{{ file.label }}</p>
      <p class="docs-tree-explorer__meta">{{ file.kind }}</p>
      <p class="docs-tree-explorer__meta">
        {{ file.size }} · {{ file.modified }}
      </p>
    }
  </div>
</div>`;

  protected readonly actionsCode = `<div class="docs-tree-demo">
  <el-tree
    [(expanded)]="actionsExpanded"
    ariaLabel="Workspace files"
  >
    @for (folder of actionFolders; track folder.id) {
      <el-tree-item [value]="folder.id" [label]="folder.label">
        <el-icon elTreeLeading [name]="folderIcon(folder.id, actionsExpanded())" />
        <span elTreeActions>
          <ng-container
            [ngTemplateOutlet]="rowMenu"
            [ngTemplateOutletContext]="{ name: folder.label, kind: 'folder' }"
          />
        </span>
        @for (file of folder.children; track file.id) {
          <el-tree-item [value]="file.id" [label]="file.label">
            <el-icon elTreeLeading [name]="file.icon" />
            <span elTreeActions>
              <ng-container
                [ngTemplateOutlet]="rowMenu"
                [ngTemplateOutletContext]="{ name: file.label, kind: 'file' }"
              />
            </span>
          </el-tree-item>
        }
      </el-tree-item>
    }
  </el-tree>
  <p class="docs-tree-demo__status">{{ lastAction() }}</p>
</div>
<ng-template #rowMenu let-name="name" let-kind="kind">
  <el-menu [ariaLabel]="name + ' actions'">
    <el-button
      elMenuTrigger
      variant="ghost"
      size="sm"
      iconStart="ellipsis-vertical"
      [ariaLabel]="name + ' actions'"
    />
    <el-menu-panel>
      @if (kind === 'folder') {
        <el-menu-item icon="file" (selected)="runAction('New file in', name)">
          New file
        </el-menu-item>
        <el-menu-item
          icon="folder-plus"
          (selected)="runAction('New folder in', name)"
        >
          New folder
        </el-menu-item>
      } @else {
        <el-menu-item
          icon="folder-open"
          (selected)="runAction('Opened', name)"
        >
          Open
        </el-menu-item>
        <el-menu-item
          icon="download"
          (selected)="runAction('Downloaded', name)"
        >
          Download
        </el-menu-item>
      }
      <el-menu-item icon="pen" (selected)="runAction('Rename', name)">
        Rename
      </el-menu-item>
      <el-menu-separator />
      <el-menu-item
        variant="danger"
        icon="trash"
        (selected)="runAction('Deleted', name)"
      >
        Delete
      </el-menu-item>
    </el-menu-panel>
  </el-menu>
</ng-template>`;

  protected readonly slotsCode = `<div class="docs-tree-demo docs-tree-demo--meta">
  <el-tree [(expanded)]="slotsExpanded" ariaLabel="Service health">
    <el-tree-item value="prod" label="production">
      <el-icon
        elTreeLeading
        [name]="folderIcon('prod', slotsExpanded())"
      />
      <el-badge
        elTreeMeta
        [count]="2"
        size="sm"
        color="error"
        ariaLabel="2 unhealthy services"
      />
      <el-tree-item value="api" label="api-gateway">
        <el-badge
          elTreeLeading
          [count]="3"
          size="sm"
          color="error"
          ariaLabel="3 failing checks"
        >
          <el-icon name="server" />
        </el-badge>
        <el-badge
          elTreeMeta
          content="Disconnected"
          size="sm"
          color="error"
        />
        <span elTreeMeta class="docs-tree-status docs-tree-status--error">
          <el-icon
            name="link-slash"
            size="sm"
            [decorative]="false"
            label="No network"
          />
        </span>
      </el-tree-item>
      <el-tree-item value="checkout" label="checkout-api">
        <el-icon elTreeLeading name="server" />
        <el-icon elTreeLeading name="lock" />
        <el-badge
          elTreeMeta
          content="Broken"
          size="sm"
          color="warning"
        />
        <span elTreeMeta class="docs-tree-status docs-tree-status--warning">
          <el-icon
            name="triangle-exclamation"
            size="sm"
            [decorative]="false"
            label="Broken upstream"
          />
        </span>
      </el-tree-item>
      <el-tree-item value="workers" label="workers">
        <el-icon elTreeLeading name="gear" />
        <el-badge
          elTreeMeta
          [count]="12"
          size="sm"
          color="neutral"
          ariaLabel="12 jobs"
        />
        <el-badge elTreeMeta content="Live" size="sm" color="success" />
        <span elTreeMeta class="docs-tree-status docs-tree-status--success">
          <el-icon
            name="circle-check"
            size="sm"
            [decorative]="false"
            label="Healthy"
          />
        </span>
      </el-tree-item>
    </el-tree-item>
  </el-tree>
</div>`;

  protected readonly checkboxCode = `<div class="docs-tree-demo">
  <div class="docs-tree-demo__bar">
    <p class="docs-tree-demo__status">{{ shareLabel() }}</p>
    <el-button
      size="sm"
      [disabled]="shareChecked().length === 0"
    >
      Share
    </el-button>
  </div>
  <el-tree
    checkbox
    [(expanded)]="shareExpanded"
    [(checked)]="shareChecked"
    ariaLabel="Files to share"
  >
    <el-tree-item value="docs" label="Documents">
      <el-icon elTreeLeading [name]="folderIcon('docs', shareExpanded())" />
      <el-tree-item value="q3" label="Q3-report.pdf">
        <el-icon elTreeLeading name="file" />
      </el-tree-item>
      <el-tree-item value="contract" label="Contract.pdf">
        <el-icon elTreeLeading name="file" />
      </el-tree-item>
    </el-tree-item>
    <el-tree-item value="photos" label="Photos">
      <el-icon elTreeLeading [name]="folderIcon('photos', shareExpanded())" />
      <el-tree-item value="headshot" label="headshot.jpg">
        <el-icon elTreeLeading name="image" />
      </el-tree-item>
    </el-tree-item>
    <el-tree-item value="readme" label="README.md">
      <el-icon elTreeLeading name="file-lines" />
    </el-tree-item>
  </el-tree>
</div>`;

  protected readonly lazyCode = `<div class="docs-tree-demo">
  <p class="docs-tree-demo__status">Team Drive</p>
  <el-tree
    [nodes]="driveNodes()"
    [loadingIds]="driveLoading()"
    [(expanded)]="driveExpanded"
    (loadChildren)="onLoadChildren($event)"
    (loadMore)="onLoadMore($event)"
    ariaLabel="Team Drive"
  >
    <ng-template elTreeNodeDef let-node>
      <el-icon [name]="node.icon ?? 'folder'" size="sm" />
      {{ node.label }}
    </ng-template>
  </el-tree>
</div>`;

  protected readonly virtualCode = `<div class="docs-tree-demo docs-tree-demo--wide">
  <el-tree
    virtual
    [nodes]="libraryNodes"
    [(expanded)]="libraryExpanded"
    [itemHeight]="36"
    ariaLabel="Photo library"
    style="max-height: 18rem; width: 100%"
  >
    <ng-template elTreeNodeDef let-node>
      <el-icon [name]="node.icon ?? 'file'" size="sm" />
      {{ node.label }}
    </ng-template>
  </el-tree>
</div>`;

  protected readonly densityCode = `<div class="docs-tree-demo">
  <el-segmented-button
    size="sm"
    [value]="density()"
    (valueChange)="onDensity($event)"
    ariaLabel="Tree density"
  >
    <el-segmented-button-item value="sm">Compact</el-segmented-button-item>
    <el-segmented-button-item value="md">Default</el-segmented-button-item>
    <el-segmented-button-item value="lg">
      Comfortable
    </el-segmented-button-item>
  </el-segmented-button>
  <el-tree
    [size]="density()"
    [(expanded)]="densityExpanded"
    ariaLabel="Density preview"
  >
    <el-tree-item value="src" label="src">
      <el-icon elTreeLeading [name]="folderIcon('src', densityExpanded())" />
      <el-tree-item value="app-ts" label="app.ts">
        <el-icon elTreeLeading name="file-code" />
      </el-tree-item>
      <el-tree-item value="app-html" label="app.html">
        <el-icon elTreeLeading name="file-code" />
      </el-tree-item>
    </el-tree-item>
    <el-tree-item value="readme" label="README.md">
      <el-icon elTreeLeading name="file-lines" />
    </el-tree-item>
  </el-tree>
</div>`;

  protected readonly scopedTokensCode = `.file-browser {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected onLoadChildren(node: ElTreeNode): void {
    this.driveLoading.update((ids) => [...ids, node.id]);
    window.setTimeout(() => {
      this.driveNodes.update((list) =>
        list.map((item) =>
          item.id === node.id
            ? {
                ...item,
                children: this.driveChildren(node.id),
              }
            : item,
        ),
      );
      this.driveLoading.update((ids) => ids.filter((id) => id !== node.id));
    }, 500);
  }

  protected onLoadMore(parent: ElTreeNode | null): void {
    if (!parent) {
      return;
    }
    this.driveLoading.update((ids) => [...ids, parent.id]);
    window.setTimeout(() => {
      this.driveNodes.update((list) =>
        list.map((item) =>
          item.id === parent.id
            ? {
                ...item,
                hasMore: false,
                children: [
                  ...(item.children ?? []),
                  { id: 'q2-zip', label: 'Q2-2025.zip', icon: 'file-zipper' },
                ],
              }
            : item,
        ),
      );
      this.driveLoading.update((ids) => ids.filter((id) => id !== parent.id));
    }, 400);
  }

  private driveChildren(id: string): ElTreeNode[] {
    if (id === 'eng') {
      return [
        { id: 'eng-src', label: 'src', icon: 'folder' },
        { id: 'eng-tests', label: 'tests', icon: 'folder' },
        { id: 'eng-guide', label: 'CONTRIBUTING.md', icon: 'file-lines' },
      ];
    }
    return [
      { id: 'design-brand', label: 'brand', icon: 'folder' },
      { id: 'design-art', label: 'illustrations', icon: 'folder' },
      { id: 'design-tokens', label: 'tokens.json', icon: 'file-lines' },
    ];
  }

  protected readonly treeProps: PropDefinition[] = [
    {
      name: 'appearance',
      type: "'outlined' | 'plain'",
      default: "'plain'",
      description: 'Flush rows by default. Use outlined for a boxed picker.',
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
      description: 'Leading icon, thumbnail, or overlay badge. Repeat as needed.',
    },
    {
      name: 'elTreeMeta',
      type: 'attribute',
      default: '—',
      description:
        'Always-visible trailing badges, status icons, or chips. Repeat as needed.',
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
