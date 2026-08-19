import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { ElCheckbox } from '../checkbox/checkbox';
import { ElChip } from '../chip/chip';
import { ElIcon } from '../icon/icon';
import { ElPagination } from '../pagination/pagination';
import {
  ElTable,
  ElTableCell,
  ElTableColumn,
  ElTableExpand,
  ElTableHeader,
  type ElTableExpanded,
  type ElTableSort,
} from './table';

const USERS = [
  {
    id: '1',
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    role: 'Math',
    status: 'Active',
    bio: 'Notes on the Analytical Engine.',
  },
  {
    id: '2',
    name: 'Grace Hopper',
    email: 'grace@example.com',
    role: 'Navy',
    status: 'Away',
    bio: 'Compiler progress update.',
  },
  {
    id: '3',
    name: 'Alan Turing',
    email: 'alan@example.com',
    role: 'CS',
    status: 'Active',
    bio: 'On computable numbers.',
  },
  {
    id: '4',
    name: 'Katherine Johnson',
    email: 'kathy@example.com',
    role: 'NASA',
    status: 'Active',
    bio: 'Orbital mechanics.',
  },
];

const TABLE_IMPORTS = [
  ElTable,
  ElTableColumn,
  ElTableHeader,
  ElTableCell,
  ElTableExpand,
];

const meta: Meta<ElTable> = {
  title: 'Components/Table',
  component: ElTable,
  argTypes: {
    appearance: {
      control: 'select',
      options: ['outlined', 'plain'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    striped: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
  },
  args: {
    appearance: 'outlined',
    size: 'md',
    striped: false,
    stickyHeader: false,
  },
  render: (args) => ({
    props: { ...args, users: USERS },
    moduleMetadata: { imports: TABLE_IMPORTS },
    template: `
      <el-table
        [data]="users"
        [appearance]="appearance"
        [size]="size"
        [striped]="striped"
        [stickyHeader]="stickyHeader"
        ariaLabel="People"
      >
        <el-table-column name="name" label="Name" sortable width="12rem" />
        <el-table-column name="email" label="Email" />
        <el-table-column name="role" label="Role" />
      </el-table>
    `,
  }),
};

export default meta;
type Story = StoryObj<ElTable>;

export const Default: Story = {};

export const CustomCell: Story = {
  render: () => ({
    props: { users: USERS },
    moduleMetadata: { imports: [...TABLE_IMPORTS, ElChip] },
    template: `
      <el-table [data]="users" ariaLabel="People">
        <el-table-column name="name" label="Name" />
        <el-table-column name="email" label="Email" />
        <el-table-column name="status" label="Status">
          <ng-template elTableCell let-user>
            <el-chip>{{ user.status }}</el-chip>
          </ng-template>
        </el-table-column>
      </el-table>
    `,
  }),
};

@Component({
  selector: 'el-table-sort-story-host',
  imports: [ElTable, ElTableColumn, ElTableHeader, ElIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <el-table
      [data]="rows()"
      [(sort)]="sort"
      ariaLabel="Sortable people"
    >
      <el-table-column name="name" label="Name" sortable width="12rem">
        <ng-template elTableHeader>
          <el-icon name="user" size="sm" />
          Name
        </ng-template>
      </el-table-column>
      <el-table-column name="email" label="Email" sortable />
      <el-table-column name="role" label="Role" />
    </el-table>
  `,
})
class TableSortStoryHost {
  protected readonly sort = signal<ElTableSort>(null);
  protected readonly rows = computed(() => {
    const current = this.sort();
    const list = [...USERS];
    if (!current) {
      return list;
    }
    return list.sort((a, b) => {
      const left = String(a[current.name as keyof typeof a] ?? '');
      const right = String(b[current.name as keyof typeof b] ?? '');
      const cmp = left.localeCompare(right);
      return current.direction === 'asc' ? cmp : -cmp;
    });
  });
}

export const Sortable: Story = {
  render: () => ({
    moduleMetadata: { imports: [TableSortStoryHost] },
    template: `<el-table-sort-story-host />`,
  }),
};

@Component({
  selector: 'el-table-expand-story-host',
  imports: [ElTable, ElTableColumn, ElTableCell, ElTableExpand, ElChip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <el-table
      [data]="users"
      [(expanded)]="expanded"
      ariaLabel="Expandable people"
    >
      <el-table-column name="name" label="Name" />
      <el-table-column name="status" label="Status">
        <ng-template elTableCell let-user>
          <el-chip>{{ user.status }}</el-chip>
        </ng-template>
      </el-table-column>
      <ng-template elTableExpand let-user>
        {{ user.bio }}
      </ng-template>
    </el-table>
  `,
})
class TableExpandStoryHost {
  protected readonly users = USERS;
  protected readonly expanded = signal<ElTableExpanded>('');
}

export const Expandable: Story = {
  render: () => ({
    moduleMetadata: { imports: [TableExpandStoryHost] },
    template: `<el-table-expand-story-host />`,
  }),
};

@Component({
  selector: 'el-table-page-story-host',
  imports: [ElTable, ElTableColumn, ElPagination],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <el-table [data]="visible()" ariaLabel="Paged people">
      <el-table-column name="name" label="Name" />
      <el-table-column name="email" label="Email" />
      <el-table-column name="role" label="Role" />
      <el-pagination
        [(page)]="page"
        [(pageSize)]="pageSize"
        [total]="all.length"
        showPageSize
      />
    </el-table>
  `,
})
class TablePageStoryHost {
  protected readonly all = Array.from({ length: 48 }, (_, i) => ({
    id: String(i + 1),
    name: `Person ${i + 1}`,
    email: `p${i + 1}@example.com`,
    role: i % 2 ? 'Staff' : 'Lead',
  }));
  protected readonly page = signal(1);
  protected readonly pageSize = signal(10);
  protected readonly visible = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.all.slice(start, start + this.pageSize());
  });
}

export const WithPagination: Story = {
  render: () => ({
    moduleMetadata: { imports: [TablePageStoryHost] },
    template: `<el-table-page-story-host />`,
  }),
};

export const EmptyAndLoading: Story = {
  render: () => ({
    moduleMetadata: { imports: [ElTable, ElTableColumn] },
    template: `
      <div style="display: grid; gap: 1.5rem">
        <el-table [data]="[]" ariaLabel="Empty table">
          <el-table-column name="name" label="Name" />
          <el-table-column name="email" label="Email" />
          <p elTableEmpty>No people match this filter.</p>
        </el-table>
        <el-table [data]="[]" loading ariaLabel="Loading table">
          <el-table-column name="name" label="Name" />
          <el-table-column name="email" label="Email" />
        </el-table>
      </div>
    `,
  }),
};

export const StripedSticky: Story = {
  render: () => ({
    props: {
      users: Array.from({ length: 16 }, (_, i) => ({
        id: String(i + 1),
        name: `Person ${i + 1}`,
        email: `p${i + 1}@example.com`,
        role: 'Staff',
      })),
    },
    moduleMetadata: { imports: [ElTable, ElTableColumn] },
    template: `
      <el-table
        [data]="users"
        striped
        stickyHeader
        ariaLabel="Sticky header"
        style="max-height: 16rem"
      >
        <el-table-column name="name" label="Name" />
        <el-table-column name="email" label="Email" />
        <el-table-column name="role" label="Role" />
      </el-table>
    `,
  }),
};

@Component({
  selector: 'el-table-virtual-story-host',
  imports: [ElTable, ElTableColumn],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <el-table
      [data]="rows"
      virtual
      [itemHeight]="44"
      ariaLabel="Virtual people"
    >
      <el-table-column name="name" label="Name" />
      <el-table-column name="email" label="Email" />
      <el-table-column name="index" label="#" align="end" width="4rem" />
    </el-table>
  `,
})
class TableVirtualStoryHost {
  protected readonly rows = Array.from({ length: 1000 }, (_, i) => ({
    id: String(i + 1),
    name: `Person ${i + 1}`,
    email: `p${i + 1}@example.com`,
    index: i + 1,
  }));
}

export const Virtual: Story = {
  render: () => ({
    moduleMetadata: { imports: [TableVirtualStoryHost] },
    template: `<el-table-virtual-story-host />`,
  }),
};

@Component({
  selector: 'el-table-select-story-host',
  imports: [ElTable, ElTableColumn, ElTableCell, ElCheckbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <el-table [data]="users" ariaLabel="Selectable people">
      <el-table-column name="select" label="" width="3rem">
        <ng-template elTableCell let-user>
          <el-checkbox
            [checked]="selected().has(user.id)"
            (checkedChange)="toggle(user.id, $event)"
            [attr.aria-label]="'Select ' + user.name"
          />
        </ng-template>
      </el-table-column>
      <el-table-column name="name" label="Name" />
      <el-table-column name="email" label="Email" />
    </el-table>
  `,
})
class TableSelectStoryHost {
  protected readonly users = USERS;
  protected readonly selected = signal(new Set<string>());

  protected toggle(id: string, checked: boolean): void {
    const next = new Set(this.selected());
    if (checked) {
      next.add(id);
    } else {
      next.delete(id);
    }
    this.selected.set(next);
  }
}

export const SelectionRecipe: Story = {
  render: () => ({
    moduleMetadata: { imports: [TableSelectStoryHost] },
    template: `<el-table-select-story-host />`,
  }),
};

export const Interactions: Story = {
  name: 'Interactions',
  tags: ['!test'],
  render: () => ({
    moduleMetadata: { imports: [TableSortStoryHost, TableExpandStoryHost] },
    template: `
      <div style="display:grid;gap:1.5rem;max-width:36rem">
        <el-table-sort-story-host />
        <el-table-expand-story-host />
      </div>
    `,
  }),
  play: async ({ canvas, userEvent, step }) => {
    const sortButton = canvas.getByRole('button', {
      name: /Sort by Name/i,
    });
    const expandButton = canvas.getByRole('button', { name: /Expand row/i });

    await step('Sort buttons expose accessible names', async () => {
      await expect(sortButton).toHaveAttribute('aria-label', expect.stringContaining('Sort by Name'));
      await userEvent.click(sortButton);
      await expect(sortButton).toHaveAttribute(
        'aria-label',
        expect.stringContaining('ascending'),
      );
    });

    await step('Expand row is named and toggles', async () => {
      await userEvent.click(expandButton);
      await expect(
        canvas.getByRole('button', { name: /Collapse row/i }),
      ).toBeInTheDocument();
    });
  },
};
