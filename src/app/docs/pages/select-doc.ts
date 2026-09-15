import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ElChip,
  ElSelect,
  ElSelectItem,
  ElSelectValue,
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
  selector: 'app-select-doc-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ElChip,
    ElSelect,
    ElSelectItem,
    ElSelectValue,
    ElTabs,
    ElTab,
    ElTabContent,
    CodeBlock,
    DocsExample,
    DocsPager,
    DocsSnippet,
    PropsTable,
  ],
  templateUrl: './select-doc.html',
  styleUrl: './page.scss',
})
export class SelectDocPage {
  protected readonly installTab = signal('cli');

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

  protected readonly manualFilesCode = `ui/select/select.ts
ui/select/select.html
ui/select/select.scss
ui/select/select-item.ts
ui/select/select-item.html
ui/select/select-item.scss
ui/select/select-group.ts
ui/select/select-group.html
ui/select/select-group.scss
ui/select/select-value.ts
ui/select/select.token.ts`;

  protected readonly importSnippet = `import {
  ElSelect,
  ElSelectItem,
} from './ui/select/select';`;

  protected readonly usageSnippet = `<el-select [(value)]="city" size="md" placeholder="Choose a city" ariaLabel="City">
  <el-select-item value="pune" label="Pune">Pune</el-select-item>
  <el-select-item value="mumbai" label="Mumbai">Mumbai</el-select-item>
</el-select>`;

  protected readonly heroCode = `<el-select [(value)]="city" size="md" placeholder="Choose a city" ariaLabel="City">
  <el-select-item value="pune" label="Pune">Pune</el-select-item>
  <el-select-item value="mumbai" label="Mumbai">Mumbai</el-select-item>
</el-select>`;

  protected readonly multipleExampleCode = `<el-select multiple [(value)]="cities" placeholder="Choose cities" ariaLabel="Cities">
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

  protected readonly scopedTokensCode = `.checkout-panel {
  --el-color-primary: #059669;
  --el-color-on-primary: #ffffff;
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
      name: 'error',
      type: 'boolean',
      default: 'false',
      description: 'Error border on the trigger and aria-invalid. Pair with el-form-error for message text.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'undefined',
      description: 'Accessible name for the combobox when ariaLabelledby is not set.',
    },
    {
      name: 'ariaLabelledby',
      type: 'string',
      default: "''",
      description: 'Ids of visible label elements linked via aria-labelledby.',
    },
    {
      name: 'ariaDescribedby',
      type: 'string',
      default: "''",
      description: 'Ids of helper or error elements linked via aria-describedby.',
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
