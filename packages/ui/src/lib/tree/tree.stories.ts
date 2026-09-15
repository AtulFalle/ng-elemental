import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ElBadge } from '../badge/badge';
import { ElButton } from '../button/button';
import { ElIcon } from '../icon/icon';
import { ElMenu } from '../menu/menu';
import { ElMenuItem } from '../menu/menu-item';
import { ElMenuPanel } from '../menu/menu-panel';
import { ElMenuSeparator } from '../menu/menu-separator';
import { ElMenuTrigger } from '../menu/menu-trigger';
import { ElTree, ElTreeNodeDef, type ElTreeNode } from './tree';
import { ElTreeItem } from './tree-item';

const TREE_IMPORTS = [ElTree, ElTreeItem, ElIcon, ElButton];
const SLOT_IMPORTS = [...TREE_IMPORTS, ElBadge];
const MENU_IMPORTS = [
  ElMenu,
  ElMenuItem,
  ElMenuPanel,
  ElMenuSeparator,
  ElMenuTrigger,
];

const meta: Meta<ElTree> = {
  title: 'Components/Tree',
  component: ElTree,
  argTypes: {
    appearance: {
      control: 'select',
      options: ['outlined', 'plain'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    checkbox: { control: 'boolean' },
  },
  args: {
    appearance: 'plain',
    size: 'md',
    checkbox: false,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: TREE_IMPORTS },
    template: `
      <el-tree
        [appearance]="appearance"
        [size]="size"
        [checkbox]="checkbox"
        ariaLabel="Project files"
        style="max-width: 22rem"
      >
        <el-tree-item value="src" label="src">
          <el-icon elTreeLeading name="folder" />
          <el-tree-item value="app" label="app">
            <el-icon elTreeLeading name="folder" />
            <el-tree-item value="app-ts" label="app.ts">
              <el-icon elTreeLeading name="file-code" />
            </el-tree-item>
            <el-tree-item value="app-html" label="app.html">
              <el-icon elTreeLeading name="file-code" />
            </el-tree-item>
          </el-tree-item>
        </el-tree-item>
        <el-tree-item value="readme" label="README.md">
          <el-icon elTreeLeading name="file-lines" />
        </el-tree-item>
      </el-tree>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElTree>;

export const Default: Story = {};

export const WithActions: Story = {
  render: () => ({
    moduleMetadata: { imports: [...TREE_IMPORTS, ...MENU_IMPORTS] },
    template: `
      <el-tree ariaLabel="Workspace files" style="max-width: 24rem">
        <el-tree-item value="src" label="src">
          <el-icon elTreeLeading name="folder" />
          <el-menu elTreeActions ariaLabel="src actions">
            <el-button
              elMenuTrigger
              variant="ghost"
              size="sm"
              iconStart="ellipsis-vertical"
              ariaLabel="src actions"
            />
            <el-menu-panel>
              <el-menu-item icon="file">New file</el-menu-item>
              <el-menu-item icon="folder-plus">New folder</el-menu-item>
              <el-menu-separator />
              <el-menu-item variant="danger" icon="trash">Delete</el-menu-item>
            </el-menu-panel>
          </el-menu>
          <el-tree-item value="app-ts" label="app.ts">
            <el-icon elTreeLeading name="file-code" />
            <el-menu elTreeActions ariaLabel="app.ts actions">
              <el-button
                elMenuTrigger
                variant="ghost"
                size="sm"
                iconStart="ellipsis-vertical"
                ariaLabel="app.ts actions"
              />
              <el-menu-panel>
                <el-menu-item icon="folder-open">Open</el-menu-item>
                <el-menu-item icon="download">Download</el-menu-item>
                <el-menu-separator />
                <el-menu-item variant="danger" icon="trash">Delete</el-menu-item>
              </el-menu-panel>
            </el-menu>
          </el-tree-item>
        </el-tree-item>
      </el-tree>
    `,
  }),
};

export const WithSlots: Story = {
  render: () => ({
    moduleMetadata: { imports: SLOT_IMPORTS },
    template: `
      <el-tree ariaLabel="Service health" style="max-width: 28rem">
        <el-tree-item value="prod" label="production">
          <el-icon elTreeLeading name="folder-open" />
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
            <el-badge elTreeMeta content="Disconnected" size="sm" color="error" />
            <el-icon
              elTreeMeta
              name="link-slash"
              size="sm"
              [decorative]="false"
              label="No network"
            />
          </el-tree-item>
          <el-tree-item value="checkout" label="checkout-api">
            <el-icon elTreeLeading name="server" />
            <el-icon elTreeLeading name="lock" />
            <el-badge elTreeMeta content="Broken" size="sm" color="warning" />
            <el-icon
              elTreeMeta
              name="triangle-exclamation"
              size="sm"
              [decorative]="false"
              label="Broken upstream"
            />
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
            <el-icon
              elTreeMeta
              name="circle-check"
              size="sm"
              [decorative]="false"
              label="Healthy"
            />
          </el-tree-item>
        </el-tree-item>
      </el-tree>
    `,
  }),
};

@Component({
  selector: 'el-tree-checkbox-story-host',
  imports: [ElTree, ElTreeItem, ElIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <el-tree
      checkbox
      [(expanded)]="expanded"
      [(checked)]="checked"
      ariaLabel="Files to share"
      style="max-width: 22rem"
    >
      <el-tree-item value="docs" label="Documents">
        <el-icon elTreeLeading name="folder" />
        <el-tree-item value="q3" label="Q3-report.pdf">
          <el-icon elTreeLeading name="file" />
        </el-tree-item>
        <el-tree-item value="contract" label="Contract.pdf">
          <el-icon elTreeLeading name="file" />
        </el-tree-item>
      </el-tree-item>
      <el-tree-item value="photos" label="Photos">
        <el-icon elTreeLeading name="folder" />
        <el-tree-item value="headshot" label="headshot.jpg">
          <el-icon elTreeLeading name="image" />
        </el-tree-item>
      </el-tree-item>
    </el-tree>
  `,
})
class TreeCheckboxStoryHost {
  protected readonly expanded = signal(['docs']);
  protected readonly checked = signal<string[]>([]);
}

export const Checkbox: Story = {
  render: () => ({
    moduleMetadata: { imports: [TreeCheckboxStoryHost] },
    template: `<el-tree-checkbox-story-host />`,
  }),
};

function photoLibrary(): ElTreeNode[] {
  const months = [
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
  return Array.from({ length: 18 }, (_, i) => ({
    id: `album-${i}`,
    label: `${months[i % 12]} ${i < 12 ? 2025 : 2026}`,
    icon: 'folder',
    children: Array.from({ length: 8 }, (__, j) => ({
      id: `img-${i}-${j}`,
      label: `IMG_${String(i * 8 + j + 1).padStart(4, '0')}.jpg`,
      icon: 'image',
    })),
  }));
}

@Component({
  selector: 'el-tree-virtual-story-host',
  imports: [ElTree, ElTreeNodeDef, ElIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <el-tree
      virtual
      [nodes]="nodes"
      [(expanded)]="expanded"
      [itemHeight]="36"
      ariaLabel="Photo library"
      style="max-height: 16rem; max-width: 24rem"
    >
      <ng-template elTreeNodeDef let-node>
        <el-icon [name]="node.icon ?? 'file'" size="sm" />
        {{ node.label }}
      </ng-template>
    </el-tree>
  `,
})
class TreeVirtualStoryHost {
  protected readonly nodes = photoLibrary();
  protected readonly expanded = signal(['album-0']);
}

export const Virtual: Story = {
  render: () => ({
    moduleMetadata: { imports: [TreeVirtualStoryHost] },
    template: `<el-tree-virtual-story-host />`,
  }),
};

@Component({
  selector: 'el-tree-lazy-story-host',
  imports: [ElTree, ElTreeNodeDef, ElIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <el-tree
      [nodes]="nodes()"
      [loadingIds]="loadingIds()"
      [(expanded)]="expanded"
      (loadChildren)="onLoadChildren($event)"
      (loadMore)="onLoadMore($event)"
      ariaLabel="Team Drive"
      style="max-width: 22rem"
    >
      <ng-template elTreeNodeDef let-node>
        <el-icon [name]="node.icon ?? 'folder'" size="sm" />
        {{ node.label }}
      </ng-template>
    </el-tree>
  `,
})
class TreeLazyStoryHost {
  protected readonly expanded = signal<string[]>(['archive']);
  protected readonly loadingIds = signal<string[]>([]);
  protected readonly nodes = signal<ElTreeNode[]>([
    { id: 'eng', label: 'Engineering', icon: 'folder', hasChildren: true },
    { id: 'design', label: 'Design', icon: 'folder', hasChildren: true },
    {
      id: 'archive',
      label: 'Archive',
      icon: 'folder',
      hasMore: true,
      children: [
        { id: 'q4', label: 'Q4-2025.zip', icon: 'file-zipper' },
        { id: 'q3', label: 'Q3-2025.zip', icon: 'file-zipper' },
      ],
    },
  ]);

  protected onLoadChildren(node: ElTreeNode): void {
    this.loadingIds.update((ids) => [...ids, node.id]);
    window.setTimeout(() => {
      this.nodes.update((list) =>
        list.map((item) =>
          item.id === node.id
            ? {
                ...item,
                children: [
                  { id: `${node.id}-src`, label: 'src', icon: 'folder' },
                  { id: `${node.id}-readme`, label: 'README.md', icon: 'file-lines' },
                ],
              }
            : item,
        ),
      );
      this.loadingIds.update((ids) => ids.filter((id) => id !== node.id));
    }, 600);
  }

  protected onLoadMore(parent: ElTreeNode | null): void {
    if (!parent) {
      return;
    }
    this.loadingIds.update((ids) => [...ids, parent.id]);
    window.setTimeout(() => {
      this.nodes.update((list) =>
        list.map((item) =>
          item.id === parent.id
            ? {
                ...item,
                hasMore: false,
                children: [
                  ...(item.children ?? []),
                  { id: 'q2', label: 'Q2-2025.zip', icon: 'file-zipper' },
                ],
              }
            : item,
        ),
      );
      this.loadingIds.update((ids) => ids.filter((id) => id !== parent.id));
    }, 500);
  }
}

export const LazyLoad: Story = {
  render: () => ({
    moduleMetadata: { imports: [TreeLazyStoryHost] },
    template: `<el-tree-lazy-story-host />`,
  }),
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: () => ({
    moduleMetadata: { imports: [TreeCheckboxStoryHost, TREE_IMPORTS] },
    template: `
      <div style="display:grid;gap:1.5rem;max-width:24rem">
        <el-tree-checkbox-story-host />
        <el-tree ariaLabel="Keyboard tree" style="max-width:22rem">
          <el-tree-item value="src" label="src">
            <el-icon elTreeLeading name="folder" />
            <el-tree-item value="app-ts" label="app.ts">
              <el-icon elTreeLeading name="file-code" />
            </el-tree-item>
          </el-tree-item>
        </el-tree>
      </div>
    `,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const tree = canvas.getByRole('tree', { name: 'Keyboard tree' });
    const checkboxTree = canvas.getByRole('tree', { name: 'Files to share' });
    const src = canvas.getAllByRole('treeitem', { name: /^src$/i })[0];

    await step('Tree exposes treeitem roles and expands with keyboard', async () => {
      src.focus();
      await expect(src).toHaveFocus();
      await userEvent.keyboard('{ArrowRight}');
      await expect(src).toHaveAttribute('aria-expanded', 'true');
    });

    await step('Checkbox tree toggles with Space', async () => {
      const report = canvas.getByRole('treeitem', { name: /Q3-report\.pdf/i });
      report.focus();
      await userEvent.keyboard(' ');
      const checkbox = report.querySelector('input[type="checkbox"]');
      await expect(checkbox).toBeChecked();
      await expect(checkboxTree).toHaveAttribute('aria-multiselectable', 'true');
    });

    await step('Tree region is labelled', async () => {
      await expect(tree).toHaveAttribute('aria-label', 'Keyboard tree');
    });
  },
};
