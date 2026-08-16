import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElAvatar,
  ElButton,
  ElChip,
  ElIcon,
  ElList,
  ElListItem,
  ElListItemDef,
  type ElListSize,
} from '@ng-elemental/ui';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';

@Component({
  selector: 'app-list-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElAvatar,
    ElButton,
    ElChip,
    ElIcon,
    ElList,
    ElListItem,
    ElListItemDef,
    CodeBlock,
    Preview,
    PropsTable,
  ],
  templateUrl: './list-doc.html',
  styleUrl: './page.scss',
})
export class ListDocPage {
  protected readonly selectedId = signal('ada');
  protected readonly sizes: ElListSize[] = ['lg', 'md', 'sm'];
  protected readonly people = [
    { id: 'ada', name: 'Ada Lovelace', initials: 'AL', role: 'Mathematician' },
    { id: 'grace', name: 'Grace Hopper', initials: 'GH', role: 'Rear Admiral' },
    { id: 'alan', name: 'Alan Turing', initials: 'AT', role: 'Computer scientist' },
  ];

  protected readonly virtualPeople = Array.from({ length: 500 }, (_, i) => ({
    id: String(i + 1),
    name: `Person ${i + 1}`,
    initials: `P${(i % 99) + 1}`,
    role: i % 2 === 0 ? 'Engineer' : 'Designer',
  }));

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add list
# optional — for avatar / icon / chip / button slots:
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add avatar
npx @ng-elemental/cli add chip
npx @ng-elemental/cli add button`;

  protected readonly importCode = `import { ElList, ElListItem } from './ui/list/list';

@Component({
  imports: [ElList, ElListItem],
  template: \`
    <el-list ariaLabel="Inbox">
      <el-list-item>
        <span elListTitle>Ada Lovelace</span>
        <span elListDescription>Notes on the Analytical Engine</span>
      </el-list-item>
    </el-list>
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-list appearance="outlined" size="md" divided ariaLabel="Inbox">
  <el-list-item>
    <el-avatar elListLeading initials="AL" alt="Ada Lovelace" />
    <span elListTitle>Ada Lovelace</span>
    <span elListDescription>Notes on the Analytical Engine</span>
    <span elListTrailing>09:12</span>
  </el-list-item>
</el-list>`;

  protected readonly interactiveCode = `<el-list ariaLabel="People">
  @for (person of people; track person.id) {
    <el-list-item
      interactive
      [selected]="person.id === selectedId()"
      (activated)="selectedId.set(person.id)"
    >
      <el-avatar elListLeading [initials]="person.initials" [alt]="person.name" />
      <span elListTitle>{{ person.name }}</span>
      <span elListDescription>{{ person.role }}</span>
    </el-list-item>
  }
</el-list>`;

  protected readonly virtualCode = `<el-list
  virtual
  [items]="people"
  track="id"
  [itemHeight]="56"
  ariaLabel="People"
  style="max-height: 16rem"
>
  <ng-template elListItemDef let-person>
    <el-list-item interactive>
      <span elListTitle>{{ person.name }}</span>
    </el-list-item>
  </ng-template>
</el-list>`;

  protected readonly scopedTokensCode = `.inbox-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
}`;

  protected readonly listProps: PropDefinition[] = [
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
      description: 'Density for padding, type, and leading slot size.',
    },
    {
      name: 'divided',
      type: 'boolean',
      default: 'true',
      description: 'Hairline separators between items.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: '—',
      description: 'Accessible name for the list.',
    },
    {
      name: 'virtual',
      type: 'boolean',
      default: 'false',
      description: 'Render a window of items from [items]. Requires a max-height on the host.',
    },
    {
      name: 'items',
      type: 'readonly object[]',
      default: '[]',
      description: 'Data for virtual mode.',
    },
    {
      name: 'track',
      type: 'string',
      default: "'id'",
      description: 'Property used as the row identity in virtual mode.',
    },
    {
      name: 'itemHeight',
      type: 'number',
      default: '56',
      description: 'Fixed row height in pixels for the virtual window.',
    },
    {
      name: 'overscan',
      type: 'number',
      default: '5',
      description: 'Extra rows rendered above and below the viewport.',
    },
  ];

  protected readonly itemProps: PropDefinition[] = [
    {
      name: 'interactive',
      type: 'boolean',
      default: 'false',
      description: 'Makes the row focusable and emits activated on click/Enter/Space.',
    },
    {
      name: 'selected',
      type: 'boolean',
      default: 'false',
      description: 'Parent-owned highlight. Bind from the selected id.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Dim the row and block activation.',
    },
  ];

  protected readonly itemOutputs: PropDefinition[] = [
    {
      name: 'activated',
      type: 'void',
      default: '—',
      description: 'Fires when an interactive row is clicked or activated from the keyboard.',
    },
  ];

  protected readonly slots: PropDefinition[] = [
    {
      name: 'elListLeading',
      type: 'attribute',
      default: '—',
      description: 'Leading avatar, icon, or thumbnail.',
    },
    {
      name: 'elListTitle',
      type: 'attribute',
      default: '—',
      description: 'Primary line.',
    },
    {
      name: 'elListDescription',
      type: 'attribute',
      default: '—',
      description: 'Secondary line.',
    },
    {
      name: 'elListTrailing',
      type: 'attribute',
      default: '—',
      description: 'Meta, chip, or row action.',
    },
  ];
}
