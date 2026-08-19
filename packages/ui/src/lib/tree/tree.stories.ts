import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ElButton } from '../button/button';
import { ElIcon } from '../icon/icon';
import { ElTree, ElTreeNodeDef, type ElTreeNode } from './tree';
import { ElTreeItem } from './tree-item';

const TREE_IMPORTS = [ElTree, ElTreeItem, ElIcon, ElButton];

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
    appearance: 'outlined',
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
        ariaLabel="Files"
        style="max-width: 22rem"
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
      </el-tree>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElTree>;

export const Default: Story = {};

export const WithActions: Story = {
  render: () => ({
    moduleMetadata: { imports: TREE_IMPORTS },
    template: `
      <el-tree ariaLabel="Project files" style="max-width: 24rem">
        <el-tree-item value="src" label="src">
          <el-icon elTreeLeading name="folder" />
          <el-button
            elTreeActions
            variant="ghost"
            size="sm"
            iconStart="ellipsis-vertical"
            aria-label="src actions"
          />
          <el-tree-item value="app" label="app.ts">
            <el-icon elTreeLeading name="file" />
            <el-button
              elTreeActions
              variant="ghost"
              size="sm"
              iconStart="ellipsis-vertical"
              aria-label="app.ts actions"
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
      ariaLabel="Selectable files"
      style="max-width: 22rem"
    >
      <el-tree-item value="docs" label="Documents">
        <el-icon elTreeLeading name="folder" />
        <el-tree-item value="resume" label="Resume.pdf">
          <el-icon elTreeLeading name="file" />
        </el-tree-item>
        <el-tree-item value="notes" label="Notes.md">
          <el-icon elTreeLeading name="file" />
        </el-tree-item>
      </el-tree-item>
      <el-tree-item value="media" label="Media">
        <el-icon elTreeLeading name="folder" />
        <el-tree-item value="photo" label="Photo.png">
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

function virtualFiles(): ElTreeNode[] {
  return Array.from({ length: 80 }, (_, i) => ({
    id: `folder-${i + 1}`,
    label: `Folder ${i + 1}`,
    icon: 'folder',
    children: Array.from({ length: 6 }, (__, j) => ({
      id: `file-${i + 1}-${j + 1}`,
      label: `File ${i + 1}.${j + 1}.ts`,
      icon: 'file',
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
      checkbox
      [nodes]="nodes"
      [(expanded)]="expanded"
      [(checked)]="checked"
      [itemHeight]="36"
      ariaLabel="Virtual files"
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
  protected readonly nodes = virtualFiles();
  protected readonly expanded = signal(['folder-1']);
  protected readonly checked = signal<string[]>([]);
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
      ariaLabel="Lazy folders"
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

  protected onLoadChildren(node: ElTreeNode): void {
    this.loadingIds.update((ids) => [...ids, node.id]);
    window.setTimeout(() => {
      this.nodes.update((list) =>
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
                  { id: 'old-3', label: '2022.zip', icon: 'file' },
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
          <el-tree-item value="docs" label="Documents">
            <el-icon elTreeLeading name="folder" />
            <el-tree-item value="readme" label="README.md">
              <el-icon elTreeLeading name="file" />
            </el-tree-item>
          </el-tree-item>
        </el-tree>
      </div>
    `,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const tree = canvas.getByRole('tree', { name: 'Keyboard tree' });
    const checkboxTree = canvas.getByRole('tree', { name: 'Selectable files' });
    const documents = canvas.getAllByRole('treeitem', { name: /Documents/i })[0];

    await step('Tree exposes treeitem roles and expands with keyboard', async () => {
      documents.focus();
      await expect(documents).toHaveFocus();
      await userEvent.keyboard('{ArrowRight}');
      await expect(documents).toHaveAttribute('aria-expanded', 'true');
    });

    await step('Checkbox tree toggles with Space', async () => {
      const resume = canvas.getByRole('treeitem', { name: /Resume\.pdf/i });
      resume.focus();
      await userEvent.keyboard(' ');
      const checkbox = resume.querySelector('input[type="checkbox"]');
      await expect(checkbox).toBeChecked();
      await expect(checkboxTree).toHaveAttribute('aria-multiselectable', 'true');
    });

    await step('Tree region is labelled', async () => {
      await expect(tree).toHaveAttribute('aria-label', 'Keyboard tree');
    });
  },
};
