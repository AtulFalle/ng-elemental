import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElCheckbox,
  ElChip,
  ElIcon,
  ElPagination,
  ElTable,
  ElTableCell,
  ElTableColumn,
  ElTableExpand,
  ElTableHeader,
  type ElTableExpanded,
  type ElTableSort,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

const PEOPLE = [
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

@Component({
  selector: 'app-table-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElTable,
    ElTableColumn,
    ElTableHeader,
    ElTableCell,
    ElTableExpand,
    ElChip,
    ElIcon,
    ElCheckbox,
    ElPagination,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './table-doc.html',
  styleUrl: './page.scss',
})
export class TableDocPage {
  protected readonly people = PEOPLE;
  protected readonly sort = signal<ElTableSort>(null);
  protected readonly expanded = signal<ElTableExpanded>('');
  protected readonly selected = signal(new Set<string>());
  protected readonly page = signal(1);
  protected readonly pageSize = signal(10);

  protected readonly allPaged = Array.from({ length: 37 }, (_, i) => ({
    id: String(i + 1),
    name: `Person ${i + 1}`,
    email: `p${i + 1}@example.com`,
    role: i % 2 ? 'Staff' : 'Lead',
  }));

  protected readonly sortedPeople = computed(() => {
    const current = this.sort();
    const list = [...PEOPLE];
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

  protected readonly pagedPeople = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.allPaged.slice(start, start + this.pageSize());
  });

  protected isSelected(id: string): boolean {
    return this.selected().has(id);
  }

  protected toggleSelected(id: string, checked: boolean): void {
    const next = new Set(this.selected());
    if (checked) {
      next.add(id);
    } else {
      next.delete(id);
    }
    this.selected.set(next);
  }

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add table
# optional — chips, checkboxes, pagination footer:
npx @ng-elemental/cli add chip
npx @ng-elemental/cli add checkbox
npx @ng-elemental/cli add pagination`;

  protected readonly importCode = `import { ElTable, ElTableColumn, ElTableCell } from './ui/table/table';

@Component({
  imports: [ElTable, ElTableColumn, ElTableCell],
  template: \`
    <el-table [data]="users">
      <el-table-column name="name" label="Name" sortable />
      <el-table-column name="status" label="Status">
        <ng-template elTableCell let-user>
          {{ user.status }}
        </ng-template>
      </el-table-column>
    </el-table>
  \`,
})
export class MyComponent {
  protected users = [{ id: '1', name: 'Ada', status: 'Active' }];
}`;

  protected readonly usageCode = `<el-table [data]="users">
  <el-table-column name="name" label="Name" sortable width="12rem" />
  <el-table-column name="email" label="Email" />
  <el-table-column name="status" label="Status">
    <ng-template elTableCell let-user>
      <el-chip>{{ user.status }}</el-chip>
    </ng-template>
  </el-table-column>
</el-table>`;

  protected readonly scopedTokensCode = `.settings-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly tableProps: PropDefinition[] = [
    {
      name: 'data',
      type: 'object[]',
      default: '[]',
      description: 'Visible rows. The table does not sort or page this array.',
    },
    {
      name: 'track',
      type: 'string',
      default: `'id'`,
      description: 'Row identity key for @for, expand, and virtualization.',
    },
    {
      name: 'sort',
      type: '{ name, direction } | null',
      default: 'null',
      description: 'Active sort. Two-way bindable. The table never reorders data.',
    },
    {
      name: 'expanded',
      type: 'string | string[]',
      default: `''`,
      description: 'Expanded row id(s). string for single, string[] for multiple.',
    },
    {
      name: 'expandVariant',
      type: `'single' | 'multiple'`,
      default: `'single'`,
      description: 'How many detail rows can stay open.',
    },
    {
      name: 'size',
      type: `'sm' | 'md' | 'lg'`,
      default: `'md'`,
      description: 'Cell padding and type size.',
    },
    {
      name: 'appearance',
      type: `'outlined' | 'plain'`,
      default: `'outlined'`,
      description: 'Bordered surface or unframed table.',
    },
    {
      name: 'striped',
      type: 'boolean',
      default: 'false',
      description: 'Alternate row backgrounds.',
    },
    {
      name: 'stickyHeader',
      type: 'boolean',
      default: 'false',
      description: 'Pin the header while the viewport scrolls.',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Shows the loading slot (or “Loading…”) instead of rows.',
    },
    {
      name: 'empty',
      type: 'boolean',
      default: 'false',
      description: 'Forces the empty slot. Also shown when data is empty.',
    },
    {
      name: 'virtual',
      type: 'boolean',
      default: 'false',
      description: 'Render only the visible window. Fixed row height. Not combined with expand.',
    },
    {
      name: 'itemHeight',
      type: 'number',
      default: '44',
      description: 'Row height in pixels when virtual is set.',
    },
    {
      name: 'overscan',
      type: 'number',
      default: '5',
      description: 'Extra virtual rows above and below the viewport.',
    },
    {
      name: 'caption',
      type: 'string',
      default: `''`,
      description: 'Visible table caption.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'undefined',
      description: 'Accessible name when there is no caption.',
    },
  ];

  protected readonly columnProps: PropDefinition[] = [
    {
      name: 'name',
      type: 'string',
      default: '(required)',
      description: 'Property key on each row. Used for string fallback and sort.',
    },
    {
      name: 'label',
      type: 'string',
      default: `''`,
      description: 'Header text. Falls back to name. Ignored when elTableHeader is set.',
    },
    {
      name: 'sortable',
      type: 'boolean',
      default: 'false',
      description: 'Renders a sort button. Cycles none → asc → desc.',
    },
    {
      name: 'width',
      type: 'string',
      default: `''`,
      description: 'Column width (e.g. 12rem, 20%). Enables fixed table layout.',
    },
    {
      name: 'align',
      type: `'start' | 'center' | 'end'`,
      default: `'start'`,
      description: 'Text alignment for header and body cells.',
    },
  ];
}
