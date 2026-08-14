import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElButton,
  ElChip,
  ElIcon,
  ElSelect,
  ElSelectGroup,
  ElSelectItem,
  ElSelectValue,
} from '@ng-elemental/ui';
import { SELECT_TOKENS } from '../theme-tokens';
import type { PropDefinition } from '../nav';
import { CodeBlock } from '../ui/code-block';
import { Preview } from '../ui/preview';
import { PropsTable } from '../ui/props-table';
import { TokensTable } from '../ui/tokens-table';

@Component({
  selector: 'app-select-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElButton,
    ElChip,
    ElIcon,
    ElSelect,
    ElSelectGroup,
    ElSelectItem,
    ElSelectValue,
    CodeBlock,
    Preview,
    PropsTable,
    TokensTable,
  ],
  templateUrl: './select-doc.html',
  styleUrl: './page.scss',
})
export class SelectDocPage {
  protected readonly selectTokens = SELECT_TOKENS;
  protected readonly city = signal('pune');
  protected readonly cities = signal<string[]>(['pune']);
  protected readonly produce = signal('apple');
  protected readonly nestedCity = signal('tokyo');
  protected readonly user = signal('ada');
  protected readonly tags = signal<string[]>(['angular', 'signals']);
  protected readonly smCity = signal('pune');
  protected readonly mdCity = signal('mumbai');
  protected readonly lgCity = signal('delhi');

  protected readonly addCode = `npx @ng-elemental/cli add theme
npx @ng-elemental/cli add icon
npx @ng-elemental/cli add select`;

  protected readonly importCode = `import {
  ElSelect,
  ElSelectItem,
} from './ui/select/select';

@Component({
  imports: [ElSelect, ElSelectItem],
  template: \`
    <el-select [(value)]="city" placeholder="Choose a city" ariaLabel="City">
      <el-select-item value="pune" label="Pune">Pune</el-select-item>
      <el-select-item value="mumbai" label="Mumbai">Mumbai</el-select-item>
    </el-select>
  \`,
})
export class MyComponent {}`;

  protected readonly usageCode = `<el-select [(value)]="city" size="md" placeholder="Choose a city" ariaLabel="City">
  <el-select-item value="pune" label="Pune">Pune</el-select-item>
  <el-select-item value="mumbai" label="Mumbai">Mumbai</el-select-item>
</el-select>

<el-select multiple [(value)]="cities" placeholder="Choose cities" ariaLabel="Cities">
  <el-select-item value="pune" label="Pune">Pune</el-select-item>
  <el-select-item value="mumbai" label="Mumbai">Mumbai</el-select-item>
</el-select>`;

  protected readonly valueTemplateCode = `<el-select #select multiple [(value)]="tags" ariaLabel="Tags">
  <ng-template elSelectValue let-selected>
    @for (item of selected; track item.value) {
      <el-chip
        type="suggestion"
        appearance="filled"
        [removable]="true"
        (removed)="select.toggle(item.value)"
      >{{ item.label }}</el-chip>
    }
  </ng-template>
  <el-select-item value="angular" label="Angular">Angular</el-select-item>
</el-select>`;

  protected readonly globalTokensCode = `:root {
  --el-select-trigger-border: #79747e;
  --el-select-item-selected-bg: #eff6ff;
  --el-select-focus-ring: #6750a4;
}`;

  protected readonly selectProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string | string[]',
      default: "''",
      description:
        'Two-way bindable selection. Use a string for single select and string[] when multiple is set.',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description:
        'Enables checkboxes on every item and a Select all / Unselect all toolbar.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Trigger size.',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "'Select'",
      description: 'Shown in the trigger when nothing is selected (default string template).',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the trigger and all items.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'undefined',
      description: 'Accessible name for the combobox.',
    },
  ];

  protected readonly itemProps: PropDefinition[] = [
    {
      name: 'value',
      type: 'string',
      default: 'required',
      description: 'Value stored when this item is selected.',
    },
    {
      name: 'label',
      type: 'string',
      default: "''",
      description:
        'Trigger text for this item. Falls back to value when omitted.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Non-interactive option.',
    },
  ];

  protected readonly groupProps: PropDefinition[] = [
    {
      name: 'label',
      type: 'string',
      default: 'required',
      description: 'Group heading. The group itself is not selectable.',
    },
  ];

  protected onUserAction(event: Event): void {
    event.stopPropagation();
  }
}
